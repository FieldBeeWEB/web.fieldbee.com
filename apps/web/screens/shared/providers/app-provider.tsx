import {
  FieldsResponse,
  GetSessionResponse,
  TasksResponse,
} from "@fieldbee/api";
import * as React from "react";
import { LayerType } from "../../map/utils/consts";
import AppContext, { AppContextType } from "./app-context";

export interface AppState {
  selectedField: null | FieldsResponse;
  selectedTask: null | TasksResponse;
  layer: LayerType;
  importSessionResponse: GetSessionResponse | null;
}

type Props = React.PropsWithChildren;

const AppProvider: React.FunctionComponent<Props> = ({ children }) => {
  const [state, setState] = React.useState<AppState>({
    selectedField: null,
    selectedTask: null,
    layer: "satellite",
    importSessionResponse: null,
  });

  const contextValue = React.useMemo<AppContextType>(
    () => ({
      selectedField: state.selectedField,
      selectedTask: state.selectedTask,
      layer: state.layer,
      setSelectedField: (field: FieldsResponse) => {
        setState((prev) => ({
          ...prev,
          selectedField: field,
        }));
      },
      setSelectedTask: (task: TasksResponse) => {
        setState((prev) => ({
          ...prev,
          selectedTask: task,
        }));
      },
      handleChangeLayer: (type: LayerType) => {
        setState((prev) => ({
          ...prev,
          layer: type,
        }));
      },
      importSessionResponse: state.importSessionResponse,
      handleSetImportSessionResponse: (response: GetSessionResponse | null) => {
        setState((prev) => ({
          ...prev,
          importSessionResponse: response,
        }));
      },
    }),
    [
      state.selectedField,
      state.selectedTask,
      state.layer,
      state.importSessionResponse,
    ],
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
