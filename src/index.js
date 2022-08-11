import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import frLocale from "date-fns/locale/fr";

ReactDOM.render(
  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
    <React.StrictMode>
      <RecoilRoot>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </RecoilRoot>
    </React.StrictMode>
  </MuiPickersUtilsProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
