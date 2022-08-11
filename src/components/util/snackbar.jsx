import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useRecoilState } from "recoil";
import { snackbar } from "../../recoils/snackbar.atom";

// TODO use Snackbar as independent component that can be prompted through Recoil State
// SnackbarWrapper is called once in App component and will make appear the Snackbar when needed
function SnackbarWrapper() {
  const [{ isVisible, message, severity }, setSnackbar] =
    useRecoilState(snackbar); // USE ONLY ONE FULL OBJECT: isVisible true to make snackbar appear

  // ALWAYS CLEAN FULL OBJECT, to avoid unecessary behaviour
  const cleanSnackbar = {
    isVisible: false,
    message: "",
    severity: "info", // Default info to avoid throwing error on client side
  };

  return (
    <Snackbar
      open={isVisible}
      autoHideDuration={5000}
      onClose={() => setSnackbar(cleanSnackbar)}
      onBlur={() => setSnackbar(cleanSnackbar)}
    >
      <MuiAlert severity={severity} elevation={6} variant="filled">
        {message}
      </MuiAlert>
    </Snackbar>
  );
}

export default SnackbarWrapper;
