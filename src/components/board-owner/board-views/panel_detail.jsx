import {
  Grid,
  Typography,
  Paper,
  CircularProgress,
  TextField,
  Button,
} from "@material-ui/core";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PANEL_BY_ID } from "../../../graphql/queries";
import { useState } from "react";
import { modal } from "../../../recoils/modal.atom";
import { useRecoilState } from "recoil";
import { UPDATE_PANEL } from "../../../graphql/mutation";
import { useSnackbar } from "../../../context/use-snackbar.hook";

export default function PanelDetail({ panel_id }) {
  const snackbar = useSnackbar();
  const [, setModal] = useRecoilState(modal);
  const [currentPanel, setCurrentPanel] = useState({});
  const { refetch } = useQuery(GET_PANEL_BY_ID, {
    variables: { id: panel_id },
    onCompleted: (value) => {
      setCurrentPanel({ ...value?.getPanelById });
    },
  });
  const [runMutation, { loading }] = useMutation(UPDATE_PANEL);

  const executeMutation = () => {
    delete currentPanel.__typename;
    delete currentPanel.requests;
    setCurrentPanel(currentPanel);
    runMutation({ variables: { panel_update: currentPanel } })
      .then((val) => {
        refetch().then((val) => {
          setCurrentPanel(val?.data?.getPanelById);
          snackbar.success("Mise à jour réussie");
        });
      })
      .catch((error) => {
        console.log(error);
        snackbar.error("Erreur interne veuillez contacter l'équipe de support");

      });
  };
  return (
    <>
      <Grid item md={3} xl={3} />
      <Grid item sm={12} xs={12} md={6} xl={6}>
        <Paper style={{ padding: "2%" }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            <Grid item xs={11} md={11} sm={11} xl={11}>
              <Typography variant="h5">Modification du panneau</Typography>
            </Grid>
            <Grid item xs={11} md={11} sm={11} xl={11}>
              {currentPanel ? (
                <Grid
                  container
                  alignContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item xs={4} sm={4} md={4} xl={4}>
                    <Typography variant="subtitle1" color="textSecondary">
                      Titre
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} xl={8}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Nom"
                      value={currentPanel?.title}
                      onChange={(event) => {
                        currentPanel.title = event.target.value;
                        setCurrentPanel({ ...currentPanel });
                      }}
                    />
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} xl={4}>
                    <Typography variant="subtitle1" color="textSecondary">
                      Largeur
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} xl={8}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Largeur"
                      value={currentPanel?.width}
                      onChange={(event) => {
                        currentPanel.width = event.target.value;
                        setCurrentPanel({ ...currentPanel });
                      }}
                    />
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} xl={4}>
                    <Typography variant="subtitle1" color="textSecondary">
                      Hauteur
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} xl={8}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Hauteur"
                      value={currentPanel?.heigh}
                      onChange={(event) => {
                        currentPanel.heigh = event.target.value;
                        setCurrentPanel({ ...currentPanel });
                      }}
                    />
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} xl={4}>
                    <Typography variant="subtitle1" color="textSecondary">
                      Pitch
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} xl={8}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Pitch"
                      onChange={(event) => {
                        currentPanel.pitch = event.target.value;
                        setCurrentPanel({ ...currentPanel });
                      }}
                      value={currentPanel?.pitch}
                    />
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} xl={4}>
                    <Typography variant="subtitle1" color="textSecondary">
                      Max promotion
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} xl={8}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Max prom."
                      onChange={(event) => {
                        currentPanel.maximum_actif_promotion_at_once =
                          event.target.value;
                        setCurrentPanel({ ...currentPanel });
                      }}
                      value={currentPanel?.maximum_actif_promotion_at_once}
                    />
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} xl={4}>
                    <Typography variant="subtitle1" color="textSecondary">
                      Address
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} xl={8}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Address"
                      value={currentPanel?.address}
                      onChange={(event) => {
                        currentPanel.address = event.target.value;
                        setCurrentPanel({ ...currentPanel });
                      }}
                    />
                  </Grid>
                  <Grid item md={1} xl={1} />

                  <Grid item xs={5} sm={5} md={5} xl={5}>
                    {loading ? (
                      <CircularProgress color="secondary" />
                    ) : (
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={executeMutation}
                      >
                        Sauvegarder
                      </Button>
                    )}
                  </Grid>

                  <Grid item xs={5} sm={5} md={5} xl={5}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        setModal({ isShowing: false, content: null });
                      }}
                    >
                      Annuler
                    </Button>
                  </Grid>
                  <Grid item md={1} xl={1} />
                </Grid>
              ) : (
                <CircularProgress />
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item md={3} xl={3} />
    </>
  );
}
