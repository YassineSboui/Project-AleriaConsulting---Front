import {
  Popover,
  IconButton,
  Badge,
  Typography,
  Button,
} from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { MdNotifications } from "react-icons/md";
import NotificationRow from "./list-item";
import { NOTIFICATION_SUBSCRIPTION } from "../../../graphql/subscription";
import { useSubscription } from "@apollo/client";
import { useRecoilState } from "recoil";
import { notifs } from "../../../recoils/notification-list.atom";
import { useSnackbar } from "../../../context/use-snackbar.hook";

export default function NotificationMenuItem({ company_id, setView }) {
  const snackbar = useSnackbar();
  const [lastNotifTable, setLastNotifTable] = useRecoilState(notifs);
  const { data, loading, error } = useSubscription(NOTIFICATION_SUBSCRIPTION, {
    variables: { company_id: company_id },
    shouldResubscribe: true,
  });

  useEffect(() => {
    if (data?.notify) {
      if (data?.notify?.length > lastNotifTable.length) {
        setLastNotifTable(data?.notify);
      }
    }
  }, [data]);

  const menu_ref = useRef();
  const [open, setIsOpen] = useState(false);
  if (error) {
    console.log(error);
    snackbar.error("Erreur interne lors de la récupération des notifications");
  }

  return (
    <IconButton ref={menu_ref} onClick={() => setIsOpen(!open)} color="inherit">
      <Badge badgeContent={lastNotifTable?.length} color="secondary">
        <MdNotifications
          size={32}
          onClick={() => setIsOpen(!open)}
          style={{ cursor: "pointer" }}
        />
      </Badge>
      <Popover
        open={open}
        anchorEl={menu_ref.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        {lastNotifTable ? (
          <>
            {lastNotifTable?.map((element, index) => {
              if (index < 5)
                return <NotificationRow key={index++} notification={element} />;
            })}
            <Button
              fullWidth
              variant="text"
              color="primary"
              style={{ margin: "2%" }}
              onClick={() => setView(4)}
            >
              Voire toutes les notifications
            </Button>
          </>
        ) : (
          []
        )}
      </Popover>
    </IconButton>
  );
}
