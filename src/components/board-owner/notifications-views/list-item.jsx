import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { modal } from "../../../recoils/modal.atom";
import RequestDetail from "../request-views/request_details";
import { useMutation } from "@apollo/client";
import { UPDATE_NOTIFICATION } from "../../../graphql/mutation";
import { useSnackbar } from "../../../context/use-snackbar.hook";
export default function ListItem({ notification }) {
  const snackbar = useSnackbar();
  const [, setModal] = useRecoilState(modal);
  const [hover, setHover] = useState(false);
  const [mutate] = useMutation(UPDATE_NOTIFICATION);

  const [notif, setNotif] = useState({ ...notification });
  const updateNotification = () => {
    delete notif?.__typename;
    notif.status = "OPENED";
    setNotif(notif);
    mutate({
      variables: {
        notification_update: notif,
      },
    })
      .then((value) => value)
      .catch((error) => {
        console.log(error);
        snackbar.error("Erreur interne veuillez contacter l'équipe de support");
      });
  };

  return (
    <Card
      style={
        !hover
          ? { backgroundColor: "white", cursor: "pointer" }
          : {
              backgroundColor: "#bdc3c7",

              padding: 2,
              cursor: "pointer",
            }
      }
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
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
      <CardContent>
        <Typography variant="subtitle1" color="textPrimary">
          {notification?.title}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {notification?.message}
        </Typography>
      </CardContent>
    </Card>
  );
}
