import { useGetChemicalProperties, useGetFieldChemicals } from "@fieldbee/api";
import { Loader } from "@fieldbee/ui";
import EditSoil from "./field-chemicals/edit-soil/edit-soil";

interface Props {
  uri: string;
}

export default function FieldChem({ uri }: Props) {
  const { data: propertiesData, isLoading: propertiesLoading } =
    useGetChemicalProperties();

  const { data, isLoading } = useGetFieldChemicals(uri);

  if (isLoading || propertiesLoading) return <Loader />;

  return (
    <EditSoil
      chemicals={data}
      chemicalProperties={propertiesData}
      fieldUri={uri}
    />
  );
}
