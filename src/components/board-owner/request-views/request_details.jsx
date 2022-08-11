import {
  Grid,
  Typography,
  Button,
  Paper,
  Divider,
  IconButton,
} from "@material-ui/core";
import { useQuery, useMutation } from "@apollo/client";
import { GET_REQUEST_BY_ID } from "../../../graphql/queries";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import { convertDateToLocalDateFrench } from "../../util/date_fonrmater";
import RequestDetailRow from "./request_detail_row";
import { GET_REQUEST_BY_COMPANY_ID } from "../../../graphql/queries";
import { UPDATE_REQUEST } from "../../../graphql/mutation";
import ConfirmationView from "../../util/confirmation_view";
import ConfirmRequest from "./confirm_request";
import ActionMenu from "./action_menu_request";
import { useSnackbar } from "../../../context/use-snackbar.hook";

export default function RequestDetail({ request_id, setModal }) {
  const snackbar = useSnackbar();
  const [request, setRequest] = useState(null);
  const { loading, error } = useQuery(GET_REQUEST_BY_ID, {
    variables: { id: request_id },
    onCompleted: (value) => {
      setRequest(value?.findRequestById[0]);
    },
  });
  const [updateRequest] = useMutation(UPDATE_REQUEST);
  const confirmRequest = (request) => {
    setModal({
      isShowing: true,
      content: <ConfirmRequest request={request} />,
    });
  };

  const cancelRequest = (request) => {
    setModal({
      isShowing: true,
      content: (
        <ConfirmationView
          cancelCallback={() => setModal({ isShowing: false })}
          title={"Requête de " + request.name_require}
          message="Êtes-vous sùr de vouloire rejeter cettes demande ?"
          callback={() => {
            let req = { ...request };
            req.status = "refused";
            delete req.__typename;
            updateRequest({
              variables: { request_update: req },
              awaitRefetchQueries: true,
              refetchQueries: [
                {
                  query: GET_REQUEST_BY_COMPANY_ID,
                  variables: { id: req.company_id },
                },
              ],
            })
              .then((val) => snackbar.success("La reuqête a été rejetée"))
              .catch((error) => {
                snackbar.error(
                  "Erreur interne veuillez contacter l'équipe de support"
                );

                console.log(error);
              });
            setModal({
              content: (
                <RequestDetail request_id={request_id} setModal={setModal} />
              ),
              isShowing: true,
            });
          }}
        />
      ),
    });
  };

  return (
    <>
      <Grid item md={3} xl={3} />
      <Grid item xl={6} md={6} xs={12} sm={12}>
        <Paper style={{ padding: "2%" }}>
          <Grid container spacing={4}>
            <Grid item xs={9} sm={9} md={9} xl={9}>
              <Typography variant="h6"> Demande de promotion</Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={1} xl={1}>
              <IconButton>
                <ActionMenu
                  cancelRequest={cancelRequest}
                  request={request}
                  confirmRequest={confirmRequest}
                />
              </IconButton>
            </Grid>
            <Grid item xs={1} sm={1} md={1} xl={1}>
              <IconButton
                onClick={() => setModal({ isShowing: false, content: null })}
              >
                <MdCancel size={24} />
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Divider />
            </Grid>
            <RequestDetailRow
              label={request?.name_require}
              title="Nom du demandeur"
            />

            <RequestDetailRow
              label={request?.social_reason}
              title="Raison social"
            />

            <RequestDetailRow label={request?.message} title="Message" />
            <RequestDetailRow
              label={request?.total_price}
              title="Revenue attendue"
            />
            <RequestDetailRow label={request?.status} title="Status" />

            <Grid item xs={1} sm={1} md={1} xl={1}>
              <Typography variant="subtitle1" color="textSecondary">
                Du
              </Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={4} xl={4}>
              <Typography variant="subtitle1" color="textPrimary">
                {convertDateToLocalDateFrench(request?.starting_date)}
              </Typography>
            </Grid>

            <Grid item xs={2} sm={2} md={2} xl={2}>
              <Typography variant="subtitle1" color="textSecondary">
                Jusqu'au
              </Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={4} xl={4}>
              <Typography variant="subtitle1" color="textPrimary">
                {convertDateToLocalDateFrench(request?.ending_date)}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item md={3} xl={3} />
    </>
  );
}
