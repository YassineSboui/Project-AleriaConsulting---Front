import React, { useState, useEffect, useContext, createContext } from "react";
import { useCookies } from "react-cookie";
import { useMutation } from "@apollo/client";
import { ApolloUseContext } from "./Apollo_wrapper";
import {
  PASSWORD_GRANT,
  CLIENT_USER_REGISTRATION,
  SIGN_UP,
  LOG_OUT,
} from "../graphql/mutation";

import config from "../config.json";

var confs;
if (process.env.REACT_APP_MILIEU !== "PROD") confs = config.dev;
else confs = config.prod;

const session_storage = confs.session_storage;
const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [sessionData, setSessionData] = useState(null);
  const [userAuthData, setUserAuthData] = useState(null);
  const cont = ApolloUseContext();
  const [registerAuth] = useMutation(CLIENT_USER_REGISTRATION);
  const [registerData] = useMutation(SIGN_UP);
  const [authenticate] = useMutation(PASSWORD_GRANT);
  const [logOut] = useMutation(LOG_OUT);
  const [userCookies, setUserCookie, removeCookies] = useCookies(
    [session_storage.USER_INFO],
    "/"
  );
  const signin = (email, password) => {
    const res = authenticate({
      variables: {
        password: password,
        username: email,
      },
    })
      .then((value) => {
        if (
          value.data.password_grant === null ||
          (!value.data.password_grant.user &&
            !value.data.password_grant.access_token)
        ) {
          return -4;
        } else {
          cont.setUser(value.data.password_grant);
          setSessionData(value.data.password_grant);
          setUserCookie(session_storage.USER_INFO, value.data.password_grant);
          return value.data;
        }
      })
      .catch((err) => {
        console.log(err);
        return -3;
      });

    return res;
  };

  const signup_auth = (email, password) => {
    const res = registerAuth({
      variables: { password: password, username: email },
    })
      .then((value) => {
        if (value.data.client_and_user) {
          setUserAuthData(value.data.client_and_user);
          return 0;
        } else {
          return -1;
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.toString().includes("Cette e-mail est déja")) return -11;
        return -3;
      });

    return res;
  };

  const signup = (
    first_name,
    last_name,
    birth_date,
    phone_num,
    company_id,
    role
  ) => {
    const res = registerData({
      variables: {
        user: {
          first_name: first_name,
          last_name: last_name,
          e_mail: userAuthData.username,
          birth_date: birth_date,
          phone_num: parseInt(phone_num),
          auth_user_id: userAuthData.user,
          company_id: company_id,
          role: role,
        },
      },
    })
      .then((value) => {
        return value;
      })
      .catch((err) => {
        console.error(err);
        return -3;
      });

    return res;
  };

  const signout = () => {
    // TODO
    if (sessionData.access_token && sessionData.refresh_token) {
      logOut({
        variables: {
          token: sessionData?.access_token,
          refresh: sessionData?.refresh_token,
        },
      })
        .then((val) => {
          clearBrowsingHistory();
          cont.setUser(null);
          // history.push('/signin')
        })
        .then((error) => {
          console.log(error);
        });
    }
  };
  const clearBrowsingHistory = () => {
    removeCookies(session_storage.USER_INFO);
    setSessionData(null);
    setUserAuthData(null);
  };
  const sendPasswordResetEmail = (email) => {
    // TODO
  };

  const confirmPasswordReset = (code, password) => {
    // TODO
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    if (userCookies.USER_INFO) {
      cont.setUser(userCookies.USER_INFO);
      setSessionData(userCookies.USER_INFO);
    }
  }, [userCookies, cont]);

  // Return the user object and auth methods
  return {
    sessionData,
    userAuthData,
    clearBrowsingHistory,
    signin,
    signup_auth,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
