import React, { useState } from "react";
import {
  Avatar,
  CssBaseline,
  Link,
  Grid,
  Typography,
  Container,
  Button,
  TextField,
} from "@material-ui/core";
import { useStyles } from "./style";
import { MdLock } from "react-icons/md";
import { dev } from "../../config.json";
import { useAuth } from "../../context/use-auth.hook";
import { useHistory, useParams } from "react-router-dom";
import { useSnackbar } from "../../context/use-snackbar.hook";

export default function Signup_aut() {
  const { id } = useParams();
  const classes = useStyles();
  const [mail, setmail] = useState("");
  const [password, setpasssword] = useState("");
  const [checkpassword, setcheckpasssword] = useState("");
  const verif = useAuth();
  const history = useHistory();
  const bcrypt = require("bcryptjs");
  const snackbar = useSnackbar();

  const emailhandler = (event) => {
    setmail(event.target.value);
  };
  const passswordhandler = (event) => {
    setpasssword(event.target.value);
  };
  const checkpasswordhandler = (event) => {
    setcheckpasssword(event.target.value);
  };

  const verifmdp = (mdp) => {
    return (
      mdp.match(/[0-9]/g) &&
      mdp.match(/[A-Z]/g) &&
      mdp.match(/[a-z]/g) &&
      mdp.length >= 8
    );
  };

  const authentification = (email, password, checkpassword) => {
    if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      snackbar.error(email + " n'est pas une adresse valide");
    } else if (!verifmdp(password)) {
      snackbar.error("veillez saisir un Mot de  passe valide");
    } else if (password !== checkpassword) {
      snackbar.error("Verifier votre mot de passe");
    } else {
      let hash = bcrypt.hashSync(password, 10);
      verif
        .signup_auth(email, hash)
        .then((value) => {
          if (value === 0)
            history.push(dev.route.customer.user_sign_up_without_id + id);
          else snackbar.error("E-mail déja utilisé");
        })
        .catch((error) => {
          snackbar.error(
            "Erreur interne veuillez contacter l'équipe de support"
          );

          console.log(error);
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
          Création compte
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} xl={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Addresse Email"
              autoComplete="email"
              value={mail}
              onChange={emailhandler}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} xl={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Mot de passe"
              type="password"
              value={password}
              onChange={passswordhandler}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} xl={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Verifier mot de passe"
              type="password"
              value={checkpassword}
              onChange={checkpasswordhandler}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} xl={12}>
            <Typography variant="caption" color="textSecondary">
              le mot de passe doit contenir au moins 8 caractères
              alphanumériques (Maj,Min,chiffre)
            </Typography>
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => authentification(mail, password, checkpassword)}
        >
          Suivant
        </Button>
      </div>
      <Grid container justifyContent="flex-end">
        <Grid item xs={12} sm={12} md={12} xl={12}>
          <Link href={dev.route.customer.sign_in} variant="body2">
            Vous avez déjà un compte? S'authentifier
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
