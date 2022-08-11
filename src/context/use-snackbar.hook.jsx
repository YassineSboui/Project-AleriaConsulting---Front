import { useRecoilState } from "recoil";
import { snackbar } from "../recoils/snackbar.atom";
import { createContext, useContext } from "react";

const snackbarContext = createContext();

export function ProvideSnackbar({ children }) {
  const snackbar = useProvideSnackbar();
  return (
    <snackbarContext.Provider value={snackbar}>
      {children}
    </snackbarContext.Provider>
  );
}

export function useSnackbar() {
  return useContext(snackbarContext);
}

function useProvideSnackbar() {
  const [, setSnackbar] = useRecoilState(snackbar);

  // TODO: depending on langage selected

  const error = (message) => {
    setSnackbar({ isVisible: true, severity: "error", message: message });
  };

  const warning = (message) => {
    setSnackbar({ isVisible: true, severity: "warning", message: message });
  };

  const info = (message) => {
    setSnackbar({ isVisible: true, severity: "info", message: message });
  };

  const success = (message) => {
    setSnackbar({ isVisible: true, severity: "success", message: message });
  };
  /*
  const getMessageByErrCode = (erroneos) => {
    for (var key of Object.keys(errors)) {
      if (errors[key].code === erroneos) return errors[key].message;
    }
  };
*/
  return {
    // errors,
    error,
    warning,
    info,
    success,
    // getMessageByErrCode,
  };
}
