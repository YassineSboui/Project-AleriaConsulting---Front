import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { MdCancel } from "react-icons/md";
import { modal } from "../../../recoils/modal.atom";
import { useRecoilState } from "recoil";
import { INSERT_PANEL } from "../../../graphql/mutation";
import { GET_PANEL_BY_COMPANY_ID } from "../../../graphql/queries";
import PanelImageUploader from "./panel_image_uploader";
import { useSnackbar } from "../../../context/use-snackbar.hook";
import config from "../../../config.json";

var confs;
if (process.env.REACT_APP_MILIEU !== "PROD") confs = config.dev;
else confs = config.prod;

export default function PanelForm({ longitude, latitude, company_id }) {
  const snackbar = useSnackbar();
  const [panel, setPanel] = useState({
    company_id: company_id,
    longitude: longitude.toString(),
    latitude: latitude.toString(),
  });
  const [, setModal] = useRecoilState(modal);
  const [insert, { loading }] = useMutation(INSERT_PANEL);

  useEffect(() => {
    const url =
      confs.map_geocoding_first_part_url +
      longitude +
      "," +
      latitude +
      ".json" +
      confs.map_geocoding_second_part_url +
      confs.map_token;

    fetch(url, {
      method: "GET",
      headers: { "content-type": "application/x-www-form-urlencoded" },
    })
      .then((value) =>
        value.json().then((val) => {
          if (Array.isArray(val?.features) && val?.features[0]) {
            panel.address = val?.features[0]?.text;
            setPanel({ ...panel });
          } else {
            snackbar.info(
              "Aucune adresse associé n'a été trouvé, veuillez remplire l'adresse manuellement"
            );
          }
        })
      )
      .catch((error) => {
        console.log(error);
        snackbar.error("Erreur interne veuillez contacter l'équipe de support");
      });
  }, []);

  const runMutation = () => {
    if (validateForm(panel, snackbar)) {
      insert({
        variables: { panel: panel },
        awaitRefetchQueries: true,
        refetchQueries: [
          { query: GET_PANEL_BY_COMPANY_ID, variables: { id: company_id } },
        ],
      })
        .then((value) => {
          setModal({
            isShowing: true,
            content: <PanelImageUploader panel={value} />,
          });
        })
        .catch((error) => {
          console.log(error);
          snackbar.error(
            "Erreur interne veuillez contacter l'équipe de support"
          );
        });
    }
  };
  return (
    <>
      <Grid item xs={2} md={2} sm={2} xl={2} />
      <Grid item xs={8} md={8} sm={8} xl={8}>
        <Paper style={{ padding: "2%" }}>
          <Grid
            container
            alignContent="center"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Grid item xs={11} sm={11} md={11} xl={11}>
              <Typography variant="h6">Nouveau Panneau</Typography>
            </Grid>
            <Grid item xs={1} sm={1} md={1} xl={1}>
              <MdCancel
                size={24}
                style={{ cursor: "pointer" }}
                onClick={() => setModal({ content: null, isShowing: false })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Divider />
            </Grid>
            <Grid item xs={2} sm={1} md={2} xl={2} />
            <Grid item xs={12} sm={12} md={4} xl={4}>
              <TextField
                fullWidth
                label="Titre"
                variant="outlined"
                onChange={(event) => {
                  panel.title = event.target.value;
                  setPanel({ ...panel });
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} xl={4}>
              <TextField
                fullWidth
                label="Pitch"
                variant="outlined"
                onChange={(event) => {
                  panel.pitch = event.target.value;
                  setPanel({ ...panel });
                }}
              />
            </Grid>
            <Grid item xs={2} sm={2} md={2} xl={2} />

            <Grid item xs={2} sm={2} md={2} xl={2} />
            <Grid item xs={12} sm={12} md={4} xl={4}>
              <TextField
                fullWidth
                label="Largeur"
                variant="outlined"
                type="number"
                onChange={(event) => {
                  panel.width = event.target.value;
                  setPanel({ ...panel });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} xl={4}>
              <TextField
                fullWidth
                label="Hauteur"
                variant="outlined"
                type="number"
                onChange={(event) => {
                  panel.heigh = event.target.value;
                  setPanel({ ...panel });
                }}
              />
            </Grid>
            <Grid item xs={2} sm={2} md={2} xl={2} />

            <Grid item xs={2} sm={2} md={2} xl={2} />
            <Grid item xs={12} sm={12} md={4} xl={4}>
              <TextField
                fullWidth
                label="Prix journalier"
                variant="outlined"
                type="number"
                onChange={(event) => {
                  panel.day_price = event.target.value;
                  setPanel({ ...panel });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} xl={4}>
              <TextField
                fullWidth
                label="Nombre de jour avant remise"
                variant="outlined"
                type="number"
                onChange={(event) => {
                  panel.days_discount = event.target.value;
                  setPanel({ ...panel });
                }}
              />
            </Grid>
            <Grid item xs={2} sm={2} md={2} xl={2} />

            <Grid item xs={2} sm={2} md={2} xl={2} />
            <Grid item xs={12} sm={12} md={4} xl={4}>
              <TextField
                fullWidth
                label="Prix remise"
                variant="outlined"
                type="number"
                onChange={(event) => {
                  panel.discount_day_price = event.target.value;
                  setPanel({ ...panel });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} xl={4}>
              <TextField
                fullWidth
                label="Nombre maximum de pub actives"
                variant="outlined"
                type="number"
                onChange={(event) => {
                  panel.maximum_actif_promotion_at_once = event.target.value;
                  setPanel({ ...panel });
                }}
              />
            </Grid>
            <Grid item xs={2} sm={2} md={2} xl={2} />

            <Grid item xs={2} sm={2} md={2} xl={2} />

            <Grid item xs={12} sm={12} md={4} xl={4}>
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                type="text"
                value={panel?.address}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => {
                  panel.address = event.target.value;
                  setPanel({ ...panel });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} xl={6} />

            <Grid item xs={12} sm={12} md={4} xl={4}>
              {loading ? (
                <CircularProgress color="secondary" />
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => runMutation()}
                >
                  Valider
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={2} md={2} sm={2} xl={2} />
    </>
  );
}

function validateForm(panel, snackbar) {
  if (!panel?.title || panel?.title === "") {
    snackbar.error("Le titre du panneau est manquant");
  } else if (!panel?.pitch || panel?.pitch === "") {
    snackbar.error("Le Pitch du panneau est manquant");
  } else if (!panel?.width || parseInt(panel.width) === 0) {
    snackbar.error("La largeur du panneau est manquante");
  } else if (!panel?.heigh || parseInt(panel.heigh) === 0) {
    snackbar.error("La Hauteur du panneau est manquante");
  } else if (!panel?.day_price || parseInt(panel.day_price) === 0) {
    snackbar.error("Le prix journalier du panneau est manquant");
  } else if (
    !panel?.discount_day_price ||
    parseInt(panel.discount_day_price) === 0
  ) {
    snackbar.error(
      "Le prix journalier en discount n'a pas été saisie veuillez resaisir le même prix journalier si vous n'offrez aucun discount"
    );
  } else if (!panel?.days_discount || parseInt(panel.days_discount) === 0) {
    snackbar.error(
      "Le nombre de jours minimum avant que le discount ne soit prit en considération n'a pas été saisie "
    );
  } else if (
    !panel?.maximum_actif_promotion_at_once ||
    parseInt(panel.maximum_actif_promotion_at_once) === 0
  ) {
    snackbar.error(
      "Le nombre maximum de publicité actives simultanément sur ce panneau n'a pas été saisie"
    );
  } else return true;
}
