import {
  Grid,
  TextField,
  Button,
  Paper,
  Typography,
  Divider,
  Link,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { useHistory, useLocation } from "react-router-dom";
import { UPDATE_USER, RESEND_ACTIVATION_CODE } from "../../graphql/mutation";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/use-auth.hook";
import config from "../../config.json";
import { useSnackbar } from "../../context/use-snackbar.hook";
var confs;
if (process.env.REACT_APP_MILIEU !== "PROD") confs = config.dev;
else confs = config.prod;

export default function AccountActivationView() {
  const snackbar = useSnackbar();
  const [mutation] = useMutation(RESEND_ACTIVATION_CODE);
  const location = useLocation();
  const history = useHistory();
  const { signout } = useAuth();
  const [users, setUser] = useState(location.state?.user);
  const [runMutation] = useMutation(UPDATE_USER);
  const [typedCode, setTypedCode] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [emResended, setEmailResended] = useState(false);

  useEffect(() => {
    setIsCorrect(typedCode.toString() === users.activation_code.toString());
  }, [typedCode]);

  const mutate = () => {
    delete users.__typename;
    users.is_activated = true;

    setUser(users);
    runMutation({ variables: { user_id: users._id, user: users } })
      .then((val) => {
        signout();
        history.push(confs.route.customer.sign_in);
      })
      .catch((error) => {
        console.log(error);
        snackbar.error("Erreur interne veuillez contacter l'équipe de support");
      });
  };

  return (
    <Grid container>
      <Grid item xs={3} sm={3} md={3} xl={3} />
      <Grid item xs={6} sm={6} md={6} xl={6}>
        <Paper style={{ padding: 16, marginTop: "20%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Typography variant="h6">
                Veuillez entrer le code que vous avez reçu dans votre boite mail
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Divider />
            </Grid>
            <Grid item xs={4} sm={4} md={4} xl={4} />

            <Grid item xs={4} sm={4} md={4} xl={4} style={{ padding: 8 }}>
              <TextField
                fullWidth
                error={!isCorrect}
                variant="standard"
                size="small"
                onChange={(event) => {
                  setTypedCode(event.target.value);
                }}
                label="Code d'activation"
              ></TextField>
            </Grid>
            <Grid item xs={4} sm={4} md={4} xl={4} />

            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Typography variant="body2" fullWidth color="textSecondary">
                {emResended
                  ? "Un autre e-mail a été envoyé si vous n'avez rien reçu vérifier votre rubrique spam"
                  : "Vous n'avez reçu aucun e-mail ? "}
              </Typography>
              {emResended ? null : (
                <Link
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={() => {
                    mutation({
                      variables: {
                        e_mail: users?.e_mail,
                        activation_code: users?.activation_code,
                      },
                    })
                      .then((val) => {
                        snackbar.success(
                          "Vous pouvez vérifier votre boite mail"
                        );
                        setEmailResended(true);
                      })
                      .catch((error) => {
                        console.log(error);
                        snackbar.error(
                          "Erreur interne veuillez essayer plus tard"
                        );
                      });
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Cliquer ici
                </Link>
              )}
            </Grid>

            <Grid item xs={4} sm={4} md={4} xl={4} />

            <Grid item xs={4} sm={4} md={4} xl={4}>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                disabled={!isCorrect}
                onClick={mutate}
              >
                Valider
              </Button>
            </Grid>
            <Grid item xs={3} sm={3} md={3} xl={3} />
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={3} sm={3} md={3} xl={3} />
    </Grid>
  );
}
