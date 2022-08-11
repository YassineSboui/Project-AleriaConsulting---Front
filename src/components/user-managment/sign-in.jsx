import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import { MdLock } from "react-icons/md";
import { useStyles } from "./style";
import { dev } from "../../config.json";
import { useAuth } from "../../context/use-auth.hook";
import { useHistory, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { CHECK_TOKEN } from "../../graphql/queries";
import { useSnackbar } from "../../context/use-snackbar.hook";

export default function SignIn() {
  const snackbar = useSnackbar();
  const classes = useStyles();
  const [client, setclient] = useState({
    e_mail: "",
    password: "",
  });
  const props = useLocation();
  const verif = useAuth();
  const history = useHistory();
  const [isLoading, setisloading] = useState(false);
  const { data, error } = useQuery(CHECK_TOKEN, {
    variables: { token: verif?.sessionData?.access_token },
  });

  useEffect(() => {
    if (verif.sessionData) {
      if (
        data?.checkAccesToken === "token is still valid" &&
        verif?.sessionData?.user?.is_activated &&
        verif?.sessionData?.user.is_enabled
      ) {
        if (props?.state && verif.sessionData) {
          history.push(props?.state.location.pathname);
        } else history.push(dev.route.customer.dasbhoard);
      } else if (error) {
        snackbar.error("Token expirés veuillez vous reconnecter");
      } else if (
        verif?.sessionData?.user &&
        !verif?.sessionData?.user?.is_activated &&
        verif?.sessionData?.user.is_enabled
      ) {
        history.push(dev.route.customer.account_activation, {
          user: verif?.sessionData?.user,
        });
      }
    }
  }, [data]);

  const emailhandler = (event) => {
    client.e_mail = event.target.value;
    setclient({ ...client });
  };

  const passwordhandler = (event) => {
    client.password = event.target.value;
    setclient({ ...client });
  };

  const Sidentifier = (email, password) => {
    setisloading(true);
    if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      snackbar.error(email + " n'est pas une adresse valide");
    } else if (password === "") {
      snackbar.error("Veuillez saisir le Mot de passe");
    } else {
      verif.signin(email, password).then((value) => {
        setisloading(false);
        if (typeof value === "object") {
          if (
            !value?.password_grant?.user?.is_activated &&
            value?.password_grant?.user?.is_enabled
          )
            history.push(dev.route.customer.account_activation, {
              user: value?.password_grant?.user,
            });
          else if (!value?.password_grant?.user?.is_enabled)
            snackbar.error(
              "Ce compte a été désactivé, veuillez contact contact@aleriaconsulting.eu pour plus d'information à ce sujet"
            );
          else history.push(dev.route.customer.dasbhoard);
        } else {
          setisloading(false);
          snackbar.error("Mot de passe ou e-mail incorrecte");
        }
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MdLock />
        </Avatar>
        <Typography component="h1" variant="h5">
          Connexion
        </Typography>
        <TextField
          required
          fullWidth
          variant="outlined"
          label="Addresse Email"
          autoComplete="email"
          value={client.e_mail}
          onChange={emailhandler}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Mot de passe"
          type="password"
          autoComplete="current-password"
          value={client.password}
          onChange={passwordhandler}
        />
        {isLoading ? (
          <CircularProgress color="primary" />
        ) : (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => Sidentifier(client.e_mail, client.password)}
          >
            S'identifier
          </Button>
        )}
        <Grid container>
          <Grid item>
            <Link href={dev.route.customer.company_register} variant="body2">
              {"Vous n'avez pas de compte ? S'inscrire"}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
