import {
  TableRow,
  TableCell,
  Button,
  Typography,
  ButtonGroup,
  Tooltip,
} from "@material-ui/core";
import { convertDateToLocalDateFrench } from "../../util/date_fonrmater";
import { MdVisibility, MdDelete } from "react-icons/md";
import OverFlowPanel from "../../util/modal";
import { useRecoilState } from "recoil";
import { modal } from "../../../recoils/modal.atom";
import RequestDetail from "../request-views/request_details";
import { useMutation } from "@apollo/client";
import { UPDATE_NOTIFICATION } from "../../../graphql/mutation";
import { useState } from "react";
import { useSnackbar } from "../../../context/use-snackbar.hook";

export default function NotificationRow({ notification, refetch }) {
  const snackbar = useSnackbar();
  const [, setModal] = useRecoilState(modal);
  const [notif, setNotif] = useState({ ...notification });
  const [mutate] = useMutation(UPDATE_NOTIFICATION);
  const updateNotification = () => {
    delete notif?.__typename;
    notif.status = "OPENED";
    setNotif(notif);
    mutate({
      variables: {
        notification_update: notif,
      },
    })
      .then((value) => {
        refetch();
      })
      .catch((error) => {
        snackbar.error("Erreur interne veuillez contacter l'équipe de support");
        console.log(error);
      });
  };

  return (
    <TableRow>
      <TableCell>
        <Typography variant="subtitle1" color="textSecondary">
          {convertDateToLocalDateFrench(notification?.issue_date)}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="subtitle2"> {notification?.title}</Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body1"> {notification?.message}</Typography>
      </TableCell>

      <TableCell>{notification?.entity_name}</TableCell>
      <TableCell>
        <ButtonGroup color="primary" variant="contained">
          <Tooltip title="Voir l'évenement concerné">
            <Button
              onClick={() => {
                updateNotification();
                setModal({
                  content: (
                    <RequestDetail
                      request_id={notification?.entity_id}
                      setModal={setModal}
                    />
                  ),
                  isShowing: true,
                });
              }}
            >
              <MdVisibility size={24} />
            </Button>
          </Tooltip>

          <Button
            onClick={updateNotification}
            disabled={notif?.status === "OPENED"}
          >
            <Tooltip title="Marker comme lue">
              <MdDelete size={24} />
            </Tooltip>
          </Button>
        </ButtonGroup>
      </TableCell>
      <OverFlowPanel />
    </TableRow>
  );
}
