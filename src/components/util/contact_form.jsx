import React from "react";
import {
  Grid,
  Paper,
  Button,
  Typography,
  TextField,
  CircularProgress,
  TextareaAutosize,
} from "@material-ui/core";
import { MdCancel } from "react-icons/md";
import { modal } from "../../recoils/modal.atom";
import { useRecoilState } from "recoil";
import { useMutation } from "@apollo/client";
import { INSERT_REQUEST } from "../../graphql/mutation";
import { useSnackbar } from "../../context/use-snackbar.hook";

export default function FormContact({ demande }) {
  const [, setModal] = useRecoilState(modal);
  const [, setDemande] = React.useState(demande);
  const snackbar = useSnackbar();

  const [execute, { loading }] = useMutation(INSERT_REQUEST);
 
  const runMutation = () => {

    if (validateContactForm(demande, snackbar)) {
      execute({ variables: { request: demande } })
        .then((value) => {
          setModal({ isShowing: false, content: null });
          snackbar.success(
            "Votre requête a été enregistrée avec succés vous serez recontacter en cas de confirmation"
          );
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <Grid item xs={4} md={4} sm={4} xl={4} />
      <Grid item xs={4} md={4} sm={4} xl={4}>
        <Paper style={{ padding: 8 }}>
          <Grid
            container
            justifyContent="space-around"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={10} md={10} sm={10} xl={10}>
              <Typography variant="h6">Contact</Typography>
            </Grid>
            <Grid item xs={1} md={1} sm={1} xl={1}>
              <MdCancel
                size={24}
                style={{ cursor: "pointer" }}
                onClick={() => setModal({ isShowing: false, content: null })}
              />
            </Grid>
            <Grid item xs={1} md={1} sm={1} xl={1} />

            <Grid item xs={8} md={8} sm={8} xl={8}>
              <TextField
                fullWidth
                variant="outlined"
                label="Nom complet"
                onChange={(event) => {
                  demande.name_require = event.target.value;
                  setDemande({ ...demande });
                }}
              />
            </Grid>
            <Grid item xs={8} md={8} sm={8} xl={8}>
              <TextField
                fullWidth
                variant="outlined"
                label="Adresse mail"
                onChange={(event) => {
                  demande.email_requester = event.target.value;
                  setDemande({ ...demande });
                }}
              />
            </Grid>
            <Grid item xs={8} md={8} sm={8} xl={8}>
              <TextField
                fullWidth
                variant="outlined"
                label="Numero de téléphone"
                type="number"
                onChange={(event) => {
                  demande.phone_require = event.target.value;
                  setDemande({ ...demande });
                }}
              />
            </Grid>
            <Grid item xs={8} md={8} sm={8} xl={8}>
              <TextField
                fullWidth
                variant="outlined"
                label="Raison social"
                onChange={(event) => {
                  demande.social_reason = event.target.value;
                  setDemande({ ...demande });
                }}
              />
            </Grid>

            <Grid item xs={8} md={8} sm={8} xl={8}>
              <Typography variant="body1"> Message : </Typography>
              <TextareaAutosize
                fullWidth
                aria-label="Message..."
                minRows={3}
                maxRows={6}
                style={{ maxWidth: "100%" }}
                onChange={(event) => {
                  demande.message = event.target.value;
                  setDemande({ ...demande });
                }}
              />
            </Grid>

            <Grid item xs={5} md={5} sm={5} xl={5}></Grid>
            <Grid item xs={2} md={2} sm={2} xl={2}>
              {loading ? (
                <CircularProgress color="secondary" />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    runMutation();
                  }}
                >
                  Envoyer
                </Button>
              )}
            </Grid>
            <Grid item xs={5} md={5} sm={5} xl={5}></Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={4} md={4} sm={4} xl={4} />
    </>
  );
}

function validateContactForm(request, snackbar) {
  if (!request?.name_require || request?.name_require === "") {
    snackbar.error("Aucun nom n'a été saisie");
  } else if (!request?.email_requester || request?.email_requester === "") {
    snackbar.error("Aucun e-mail n'a été saisie");
  } else if (!request?.phone_require || request?.phone_require === "") {
    snackbar.error("Aucun numéro de télèphone n'a été saisie");
  } else if (!request?.phone_require || request?.phone_require === "") {
    snackbar.error("Aucun numéro de télèphone n'a été saisie");
  } else if (!request?.social_reason || request?.social_reason === "") {
    snackbar.error(
      "Aucune raison social ou nom d'entreprise  n'a été saisie, si il s'agit d'une requête veuiller remplire le champ avec Personel "
    );
  } else return true;
}
