import {
  Grid,
  TextField,
  Button,
  Paper,
  Typography,
  Divider,
} from "@material-ui/core";
import { useState } from "react";
import { MdCancel, MdSave } from "react-icons/md";
import { useMutation } from "@apollo/client";
import { CLIENT_USER_REGISTRATION } from "../../../graphql/mutation";
import { useSnackbar } from "../../../context/use-snackbar.hook";
import UserInfoForm from "./users-info-form";
const bcrypt = require("bcryptjs");

export default function UserForm({ company_id, setModal }) {
  const snackbar = useSnackbar();
  const [mutate] = useMutation(CLIENT_USER_REGISTRATION);
  const verifmdp = (mdp) => {
    return (
      mdp.match(/[0-9]/g) &&
      mdp.match(/[A-Z]/g) &&
      mdp.match(/[a-z]/g) &&
      mdp.length >= 8
    );
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkpassword, setCheckPassword] = useState("");

  const authentification = () => {
    if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      snackbar.error(email + " n'est pas une adresse valide");
    } else if (!verifmdp(password)) {
      snackbar.error("veillez saisir un Mot de  passe valide");
    } else if (password !== checkpassword) {
      snackbar.error("Verifier votre mot de passe");
    } else {
      let hash = bcrypt.hashSync(password, 10);

      mutate({ variables: { username: email, password: hash } })
        .then((value) => {
          if (value?.data !== null)
            setModal({
              isShowing: true,
              content: (
                <UserInfoForm
                  company_id={company_id}
                  setModal={setModal}
                  useAuthAnswer={value.data?.client_and_user}
                />
              ),
            });
          else snackbar.error("E-mail déja utilisé");
        })
        .catch((error) => {
          snackbar.error("Erreur interne ou e-mail dupliqués");
          console.log(error);
        });
    }
  };

  return (
    <>
      <Grid item md={4} xl={4} />
      <Grid item xs={12} sm={12} md={4} xl={4}>
        <Paper style={{ padding: "2%" }}>
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item sm={10} xs={10} md={10} xl={10}>
              <Typography variant="h6" color="textPrimary">
                Nouvel utilisateur
              </Typography>
            </Grid>
            <Grid item sm={2} xs={2} md={2} xl={2}>
              <MdCancel
                size={24}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setModal({ content: null, isShowing: false });
                }}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={12} xl={12}>
              <Divider />
            </Grid>
            <Grid item sm={12} xs={12} md={7} xl={7}>
              <TextField
                fullWidth
                label="Address e-mail"
                required
                onChange={(event) => setEmail(event.target.value)}
                variant="outlined"
                type="email"
              />
            </Grid>
            <Grid item sm={12} xs={12} md={7} xl={7}>
              <TextField
                fullWidth
                label="Mot de passe"
                required
                onChange={(event) => setPassword(event.target.value)}
                variant="outlined"
                type="password"
              />
            </Grid>
            <Grid item sm={12} xs={12} md={7} xl={7}>
              <TextField
                fullWidth
                onChange={(event) => setCheckPassword(event.target.value)}
                label="Confimer le mot de passe"
                required
                variant="outlined"
                type="password"
              />
            </Grid>

            <Grid item sm={12} xs={12} md={7} xl={7}>
              <Button
                endIcon={<MdSave size={24} />}
                fullWidth
                variant="contained"
                color="primary"
                onClick={authentification}
              >
                Sauvegarder
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item md={4} xl={4} />
    </>
  );
}
