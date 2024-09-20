import { FieldsResponse, GetSessionResponse } from "@fieldbee/api";
import { createContext } from "react";
import { LayerType } from "../../map/utils/consts";

export interface AppContextType {
  selectedField: null | FieldsResponse;
  layer: LayerType;
  setSelectedField: (field: FieldsResponse) => void;
  handleChangeLayer: (type: LayerType) => void;
  importSessionResponse: GetSessionResponse | null;
  handleSetImportSessionResponse: (response: GetSessionResponse | null) => void;
}

const AppContext: React.Context<AppContextType> = createContext<AppContextType>(
  {} as AppContextType
);

export default AppContext;
