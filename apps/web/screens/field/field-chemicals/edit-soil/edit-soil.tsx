import {
  Chemical,
  ChemicalProperty,
  FieldChemical,
  queryKeys,
  Status,
  useEditFieldChemicals,
  useQueryClient,
} from "@fieldbee/api";
import { t } from "i18next";
import { v4 as uuidv4 } from "uuid";
import { toast } from "../../../../helpers/toast";
import { PhrasesTranslationKeys } from "../../../../localization";
import EditSoilForm, { EditSoilFormSchema } from "./edit-soil-form";

export interface FieldChemicalWithStatus {
  propertyName: string;
  property: string;
  propertyValueFloat: number | undefined;
  uri: string;
  objectUri: string;
  status: Status;
}

interface Props {
  chemicals: Chemical[] | undefined;
  // open: boolean;
  // handleClose: () => void;
  chemicalProperties: ChemicalProperty[] | undefined;
  fieldUri: string;
}

interface NameValue {
  propertyName: string;
  value: number;
  status: Status;
}
export default function EditSoil({
  chemicals,
  chemicalProperties,
  // open,
  // handleClose,
  fieldUri,
}: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync: editFieldChemicals, isLoading } =
    useEditFieldChemicals();

  const fieldChemicalsWithStatus: FieldChemicalWithStatus[] | undefined =
    chemicalProperties?.map((x) => {
      const existingProperty = chemicals?.find(
        (chemical) =>
          chemical.propertyName.toLowerCase() === x.propertyName.toLowerCase()
      );
      if (existingProperty) {
        return {
          propertyName: x.propertyName,
          property: x.uri,
          propertyValueFloat: existingProperty.propertyValueFloat,
          uri: existingProperty.uri,
          status: Status.MODIFIED,
          objectUri: fieldUri,
        };
      }

      return {
        propertyName: x.propertyName,
        property: x.uri,
        propertyValueFloat: undefined,
        uri: `content://PROPERTY_VALUES/${uuidv4()}`,
        status: Status.NEW,
        objectUri: fieldUri,
      };
    });

  const onEditSoil = async (values: EditSoilFormSchema) => {
    const toSend: NameValue[] = Object.entries(values).map(([key, value]) => {
      if (
        chemicals?.find(
          (it) => it.propertyName.toLowerCase() === key.toLowerCase()
        )
      ) {
        return {
          propertyName: key,
          value,
          status: Status.MODIFIED,
        };
      } else {
        return {
          propertyName: key,
          value,
          status: Status.NEW,
        };
      }
    });
    const apiSend: FieldChemical[] = toSend.map((tt) => {
      const fullObj = fieldChemicalsWithStatus?.find(
        (chemical) =>
          chemical.propertyName.toLowerCase() === tt.propertyName.toLowerCase()
      );
      return {
        document: {
          objectUri: fullObj!.objectUri || "",
          propertyValueFloat: tt.value.toString(),
          property: fullObj!.property || "",
          uri: fullObj!.uri || "",
        },
        status: fullObj!.status || Status.NEW,
      };
    });

    if (apiSend) {
      await editFieldChemicals(apiSend, {
        onSuccess: async () => {
          await queryClient.refetchQueries({
            queryKey: queryKeys.getFieldChemicals(fieldUri),
          });
        },
        onError: () => {
          toast.error(t(PhrasesTranslationKeys.SomethingWentWrong));
        },
      });
    }
  };

  return (
    <EditSoilForm
      loading={isLoading}
      onSubmit={onEditSoil}
      handleClose={() => {}}
      chemicals={chemicals}
    />
  );
}
