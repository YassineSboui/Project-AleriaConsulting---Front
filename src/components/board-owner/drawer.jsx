import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useState } from "react";

import {
  MdNotifications,
  MdChevronLeft,
  MdMap,
  MdSatellite,
  MdFolderShared,
  MdAccountCircle,
  MdCheckCircle,
  MdCancel,
  MdFeedback,
  MdPowerSettingsNew,
} from "react-icons/md";
import Submenu from "./drawer_submenu";
import { modal } from "../../recoils/modal.atom";
import { useRecoilState } from "recoil";
import ConfirmationView from "../util/confirmation_view";
import { useAuth } from "../../context/use-auth.hook";
import { Tooltip } from "@material-ui/core";

const drawer_width = 360;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  hide: {
    display: "none",
  },
  drawer: {
    width: drawer_width,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawer_width,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
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
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function DrawerMini({
  open,
  setValue,
  setOpen,
  value,
  userName,
  setFiltredRequset,
}) {
  const [, setModal] = useRecoilState(modal);
  const { signout } = useAuth();
  const subMenuItems = [
    {
      icons: <MdCheckCircle size={24} color="#007e33" />,
      title: "Les demandes confirmées",
      action: () => setFiltredRequset(1),
    },
    {
      icons: <MdCancel size={24} color="#cc0000" />,
      title: "Les demandes rejetées",
      action: () => setFiltredRequset(2),
    },
    {
      icons: <MdFeedback size={24} color="#ff8800" />,
      title: "Les nouvelles demandes",
      action: () => setFiltredRequset(3),
    },
  ];
  const classes = useStyles();
  const [expand, setExpand] = useState(false);

  const handleClick = () => {
    setExpand(!expand);
  };
  return (
    <Drawer
      variant="permanent"
      open={false}
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <Tooltip title="Fermer le menu">
          <IconButton onClick={() => setOpen(!open)}>
            <MdChevronLeft />
          </IconButton>
        </Tooltip>
      </div>
      <Divider />
      <Divider />
      <List style={{ flex: 2 }}>
        <Tooltip title="Profil">
          <ListItem button onClick={() => setValue(3)}>
            <ListItemIcon>
              <MdAccountCircle
                size={32}
                color={value === 3 ? "#cc0000" : "#0d47a1"}
              />
            </ListItemIcon>
            <ListItemText primary={userName}> </ListItemText>
          </ListItem>
        </Tooltip>
        <Divider />

        <Tooltip title="Notifications">
          <ListItem button onClick={() => setValue(4)}>
            <ListItemIcon>
              <MdNotifications
                size={32}
                color={value === 4 ? "#cc0000" : "#0d47a1"}
              />
            </ListItemIcon>
            <ListItemText primary={"Notifications"}> </ListItemText>
          </ListItem>
        </Tooltip>
        <Divider />

        <Tooltip title="Listes des panneaux">
          <ListItem
            button
            key={"0"}
            onClick={() => {
              if (expand) handleClick();
              setValue(0);
            }}
          >
            <ListItemIcon>
              <MdSatellite
                size={32}
                color={value === 0 ? "#cc0000" : "#0d47a1"}
              />
            </ListItemIcon>

            <ListItemText primary={"Listes des panneaux"} />
          </ListItem>
        </Tooltip>
        <Divider />

        <Tooltip title="Listes des requêtes">
          <ListItem
            button
            onClick={() => {
              setValue(1);
              setFiltredRequset(0);
              handleClick();
            }}
          >
            <ListItemIcon>
              <MdFolderShared
                size={32}
                color={value === 1 ? "#cc0000" : "#0d47a1"}
              />
            </ListItemIcon>
            <ListItemText primary="Listes des requêtes" />
          </ListItem>
        </Tooltip>

        <Submenu expand={expand} items={subMenuItems} />
        <Divider />

        <Tooltip title="Carte">
          <ListItem
            button
            key={"3"}
            onClick={() => {
              if (expand) handleClick();
              setValue(2);
            }}
          >
            <ListItemIcon>
              <MdMap size={32} color={value === 2 ? "#cc0000" : "#0d47a1"} />
            </ListItemIcon>
            <ListItemText primary={"Map"} color="primary" />
          </ListItem>
        </Tooltip>

        <Divider />
      </List>
      <Divider />
      <Tooltip title="Déconnexion">
        <ListItem
          button
          key={"4"}
          onClick={() => {
            setModal({
              isShowing: true,
              content: (
                <ConfirmationView
                  callback={() => {
                    signout();
                    setModal({ isShowing: false, content: null });
                  }}
                  message="Voulez-vous vraiment vous déconecter ? "
                  title="Déconnexion"
                  cancelCallback={() =>
                    setModal({ isShowing: false, content: null })
                  }
                />
              ),
            });
          }}
        >
          <ListItemIcon>
            <MdPowerSettingsNew size={32} color={"#cc0000"} />
          </ListItemIcon>
          <ListItemText primary={"Déconnecter"} color="primary" />
        </ListItem>
      </Tooltip>
      <Divider />
    </Drawer>
  );
}
