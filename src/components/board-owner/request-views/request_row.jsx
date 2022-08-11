import { TableRow, TableCell, Button } from "@material-ui/core";
import StatusIcon from "./status_icons";
import { convertDateToLocalDateFrench } from "../../util/date_fonrmater";
import ActionMenu from "./action_menu_request";
import PanelDetail from "../board-views/panel_detail";
import { GET_REQUEST_BY_COMPANY_ID } from "../../../graphql/queries";
import ConfirmRequest from "./confirm_request";
import { useMutation } from "@apollo/client";
import { UPDATE_REQUEST } from "../../../graphql/mutation";
import ConfirmationView from "../../util/confirmation_view";
import { useSnackbar } from "../../../context/use-snackbar.hook";
export default function RequestRow({ request, setModal, isfull, refetch }) {
  const snackbar = useSnackbar();
  const [updateRequest] = useMutation(UPDATE_REQUEST);
  const confirmRequest = (request) => {
    setModal({
      isShowing: true,
      content: <ConfirmRequest request={request} refetch={refetch} />,
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
              .then((val) => refetch())
              .catch((error) => {
                console.log(error);
                snackbar.error(
                  "Erreur interne veuillez contacter l'équipe de support"
                );
              });
            setModal({ content: null, isShowing: false });
          }}
        />
      ),
    });
  };

  return (
    <TableRow key={request._id}>
      <TableCell> {request.total_price} </TableCell>
      <TableCell> {request.name_require} </TableCell>
      <TableCell>{request.social_reason}</TableCell>
      <TableCell> {request.message} </TableCell>
      <TableCell>{convertDateToLocalDateFrench(request.created_at)}</TableCell>

      <TableCell>
        {convertDateToLocalDateFrench(request.starting_date) +
          " jusqu'au " +
          convertDateToLocalDateFrench(request.ending_date)}
      </TableCell>
      <TableCell>
        <StatusIcon status={request.status} />
      </TableCell>
      {isfull ? (
        <>
          <TableCell>
            <Button
              variant="text"
              color="primary"
              onClick={() =>
                setModal({
                  isShowing: true,
                  content: <PanelDetail panel_id={request.panel_id} />,
                })
              }
            >
              Panneau
            </Button>
          </TableCell>
          <TableCell>
            <ActionMenu
              request={request}
              cancelRequest={cancelRequest}
              confirmRequest={confirmRequest}
            />
          </TableCell>
        </>
      ) : null}
    </TableRow>
  );
}
