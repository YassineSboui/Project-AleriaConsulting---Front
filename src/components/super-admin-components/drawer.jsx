import React from "react";
import clsx from "clsx";
import {
  Grid,
  makeStyles,
  useTheme,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
} from "@material-ui/core";
import {
  MdMenu,
  MdAccountCircle,
  MdFolderShared,
  MdSatellite,
  MdInfo,
  MdDashboard,
} from "react-icons/md";
import { useState } from "react";
import UserList from "../../components/super-admin-components/users-management-views/users-accounts-list";
import CompanieScreen from "../../components/super-admin-components/companies-views/compagnie-screen";
import Dashboard from "./dashboard";
import AllRequestTable from "./requests-views/all-request-table";
import PanelsTables from "./panels-views/panels-table";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function SuperAdminDrawer({}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [companie_id, setCompanieID] = useState(null);
  const [view, setView] = useState(0);
  const [title, setTitle] = useState("Tableau de bord");
  const changeView = (val) => {
    setView(val);
  };

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBarShift}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={true}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Divider />
          <List>
            <ListItem
              button
              key={"Dashboard"}
              onClick={() => {
                setTitle("Tableau de bord");
                setView(0);
              }}
            >
              <ListItemIcon>
                <MdDashboard size={32} color="#be2edd" />
              </ListItemIcon>
              <ListItemText primary={"Tableau de bord"} />
            </ListItem>

            <Divider />

            <ListItem
              button
              key={"Comptes utilisateurs"}
              onClick={() => {
                setTitle("Listes des utilisateurs");
                setView(1);
              }}
            >
              <ListItemIcon>
                <MdAccountCircle size={32} color="#3867d6" />
              </ListItemIcon>
              <ListItemText primary={"Comptes d'utilisateurs"} />
            </ListItem>

            <Divider />

            <ListItem
              button
              key={"Requêtes"}
              onClick={() => {
                setTitle("Listes des requêtes");
                setView(2);
              }}
            >
              <ListItemIcon>
                <MdFolderShared size={32} color="#fa8231" />
              </ListItemIcon>
              <ListItemText primary={"Requêtes"} />
            </ListItem>
            <Divider />

            <ListItem
              button
              key={"Panneaux"}
              onClick={() => {
                setTitle("Listes des panneaux");
                setView(3);
              }}
            >
              <ListItemIcon>
                <MdSatellite size={32} color="#eb3b5a" />
              </ListItemIcon>
              <ListItemText primary={"Panneaux"} />
            </ListItem>

            <Divider />

            <ListItem
              button
              key={"Support"}
              onClick={() => {
                setView(4);
              }}
            >
              <ListItemIcon>
                <MdInfo size={32} color="#f7b731" />
              </ListItemIcon>
              <ListItemText primary={"Support"} />
            </ListItem>
          </List>
        </Drawer>

        <main className={classes.contentShift}></main>
        <div className={classes.drawerHeader} />
        <Grid container style={{ marginTop: "5%" }}>
          {resolveViewNumber(
            view,
            companie_id,
            setView,
            setCompanieID,
            setTitle
          )}
        </Grid>
      </div>
    </>
  );
}

function resolveViewNumber(
  view,
  companie_id,
  setView,
  setCompanieId,
  setTitle
) {
  switch (view) {
    case 0:
      return <Dashboard />;

    case 1:
      return <UserList setView={setView} setCompanieId={setCompanieId} />;
    case 2: {
      return <AllRequestTable />;
    }
    case 3:
      return <PanelsTables setView={setView} setCompanieId={setCompanieId} />;
    case 4:
      return <CompanieScreen companie_id={companie_id} setTitle={setTitle} />;
  }
}
