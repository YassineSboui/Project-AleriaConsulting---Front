import { useEffect, useState } from "react";
import MapFragment from "../../components/map/map";
import { useAuth } from "../../context/use-auth.hook";
import { useQuery } from "@apollo/client";
import clsx from "clsx";
import {
  GET_PANEL_BY_COMPANY_ID,
  GET_REQUEST_BY_COMPANY_ID,
  GET_NOTIF_BY_COMANY_ID_NEW,
} from "../../graphql/queries";
import PanelList from "../../components/board-owner/board-views/panel_list";
import RequestList from "../../components/board-owner/request-views/list_request";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { MdMenu } from "react-icons/md";

import DrawerMini from "../../components/board-owner/drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import UserProfil from "../../components/board-owner/users-admin-management/user-profil";
import { Tooltip } from "@material-ui/core";
import NotificationMenuItem from "../../components/board-owner/notifications-views/notifications-menu-item";
import NotificationList from "../../components/board-owner/notifications-views/notifications-list";
import { useRecoilState } from "recoil";
import { notifs } from "../../recoils/notification-list.atom";
import NotificationWiget from "../../components/util/throw_web_notification";
const drawer_width = 360;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawer_width,
    width: `calc(100% - ${drawer_width}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 2,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
}));

export default function Dashboard() {
  const [filtredRequest, setFiltredRequset] = useState(0);
  const { sessionData } = useAuth();
  const [companyPanels, setCompanyPanels] = useState([]);
  const [, setNotifsList] = useRecoilState(notifs);
  const { data, refetch: refetchPanels } = useQuery(GET_PANEL_BY_COMPANY_ID, {
    variables: { id: sessionData?.user?.company_id },
    onError: (error) => {
      console.log(error);
    },
  });
  const { data: requestData, refetch } = useQuery(GET_REQUEST_BY_COMPANY_ID, {
    variables: { id: sessionData?.user?.company_id },
  });

  const {} = useQuery(GET_NOTIF_BY_COMANY_ID_NEW, {
    variables: { company_id: sessionData?.user?.company_id, status: "NEW" },
    onCompleted: (value) => {
      setNotifsList(value?.fincNotificationByCompanyIdAndStatus);
    },
  });
  const classes = useStyles();

  const [openDrawer, setOpendrawer] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    setCompanyPanels(data?.getPanelByCompanyID);
  }, [data?.getPanelByCompanyID]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
      >
        <Toolbar>
          <div className={classes.toolbar}>
            <Tooltip title="Ouvrire le menu">
              <IconButton onClick={() => setOpendrawer(!openDrawer)}>
                <MdMenu color="white" />
              </IconButton>
            </Tooltip>
          </div>

          <Typography variant="h6" className={classes.title}>
            {titleHandler(value)}
          </Typography>
          <div
            style={{
              alignSelf: "center",
              position: "fixed",
              right: 10,
              marginRight: "5%",
            }}
          >
            <NotificationMenuItem
              company_id={sessionData?.user?.company_id}
              setView={setValue}
            ></NotificationMenuItem>
          </div>
        </Toolbar>
      </AppBar>
      <DrawerMini
        userName={
          sessionData?.user?.first_name + "  " + sessionData?.user?.last_name
        }
        value={value}
        open={openDrawer}
        setOpen={setOpendrawer}
        setValue={setValue}
        setFiltredRequset={setFiltredRequset}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />

        {valueHandler(
          value,
          companyPanels,
          refetch,
          requestData?.findRequestByCompanyId,
          sessionData?.user?.company_id,
          refetchPanels,
          filtredRequest
        )}
      </main>
      <NotificationWiget company_id={sessionData?.user?.company_id} />
    </div>
  );
}

function valueHandler(
  value,
  listPanels,
  refetch,
  requestList,
  company_id,
  refetchPanels,
  filtredRequest
) {
  switch (value) {
    case 0:
      return <PanelList listPanels={listPanels} refetch={refetchPanels} />;
    case 1:
      return (
        <RequestList
          requestList={requestList}
          refetch={refetch}
          isPanelDetail={false}
          filtredRequest={filtredRequest}
        />
      );
    case 2:
      return (
        <MapFragment
          conf={{
            customer_view: false,
            company_id: company_id,
          }}
          panels={listPanels}
        />
      );
    case 3:
      return <UserProfil />;
    case 4:
      return <NotificationList company_id={company_id} />;
    default:
      return (
        <RequestList
          requestList={requestList}
          refetch={refetch}
          isPanelDetail={false}
        />
      );
  }
}

function titleHandler(value) {
  switch (value) {
    case 0:
      return "Listes des panneaux";
    case 1:
      return "Listes des requêtes";
    case 2:
      return "Carte";
    case 3:
      return "Profil";
    default:
      return "Dashboard";
  }
}
