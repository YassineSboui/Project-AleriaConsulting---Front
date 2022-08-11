import {
  Grid,
  Typography,
  Paper,
  Divider,
  Button,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_REQUEST } from "../../../graphql/mutation";
import { GET_REQUEST_BY_COMPANY_ID } from "../../../graphql/queries";
import { MdCancel } from "react-icons/md";
import { modal } from "../../../recoils/modal.atom";
import { useRecoilState } from "recoil";
import { useSnackbar } from "../../../context/use-snackbar.hook";

export default function ConfirmRequest({ request, refetch }) {
  const snackbar = useSnackbar();
  const [update, { loading }] = useMutation(UPDATE_REQUEST);
  const [req, setRequest] = useState({ ...request });
  const [, setModal] = useRecoilState(modal);

  const closeModal = () => {
    setModal({ isShowing: false, content: null });
  };

  const runMutation = () => {
    req.status = "confirmed";
    setRequest({ ...req });
    delete req.__typename;
    update({
      variables: { request_update: req },
      refetchQueries: [
        { query: GET_REQUEST_BY_COMPANY_ID, variables: { id: req.company_id } },
      ],
      awaitRefetchQueries: true,
    })
      .then((val) => {
        if (refetch) refetch();
        closeModal();
      })
      .catch((error) => {
        console.log(error);
        snackbar.error("Erreur interne veuillez contacter l'équipe de support");
      });
  };

  return (
    <Grid container>
      <Grid item xs={4} sm={4} md={4} xl={4} />

      <Grid item xs={4} sm={4} md={4} xl={4}>
        <Paper style={{ padding: "2%" }}>
          <Grid
            spacing={2}
            container
            alignContent="center"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={11} sm={11} md={11} xl={11}>
              <Typography variant="subtitle1">
                {"Requête de " + request.name_require}
              </Typography>
            </Grid>
            <Grid item xs={1} sm={1} md={1} xl={1}>
              <MdCancel
                size={24}
                style={{ cursor: "pointer" }}
                onClick={closeModal}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Divider />
            </Grid>

            <Grid item xs={6} sm={6} md={5} xl={5}>
              <Typography variant="subtitle1" color="textSecondary">
                {"Nombre de jours : "}
              </Typography>
            </Grid>

            <Grid item xs={6} sm={6} md={5} xl={5}>
              <TextField
                variant="standard"
                size="small"
                disabled
                value={request?.days_number}
              />
            </Grid>

            <Grid item xs={6} sm={6} md={5} xl={5}>
              <Typography variant="subtitle1" color="textSecondary">
                {"Du : "}
              </Typography>
            </Grid>

            <Grid item xs={6} sm={6} md={5} xl={5}>
              <TextField
                variant="standard"
                size="small"
                value={new Date(request?.starting_date).toDateString()}
              />
            </Grid>

            <Grid item xs={6} sm={6} md={5} xl={5}>
              <Typography variant="subtitle1" color="textSecondary">
                {"Au : "}
              </Typography>
            </Grid>

            <Grid item xs={6} sm={6} md={5} xl={5}>
              <TextField
                variant="standard"
                size="small"
                value={new Date(request?.ending_date).toDateString()}
              />
            </Grid>

            <Grid item xs={6} sm={6} md={5} xl={5}>
              <Typography variant="subtitle1" color="textSecondary">
                {"Total  : "}
              </Typography>
            </Grid>

            <Grid item xs={6} sm={6} md={3} xl={3}>
              <Typography variant="subtitle1" color="textPrimary">
                {request?.total_price}
              </Typography>
            </Grid>

            <Grid item xs={6} sm={6} md={2} xl={2}>
              <Typography variant="subtitle1" color="textSecondary">
                {"DT"}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={4} xl={4} />

            <Grid item xs={4} sm={4} md={4} xl={4}>
              {loading ? (
                <CircularProgress color="secondary" />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={runMutation}
                >
                  Confirmer
                </Button>
              )}
            </Grid>
            <Grid item xs={3} sm={3} md={3} xl={3} />
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={4} sm={4} md={4} xl={4} />
    </Grid>
  );
}
