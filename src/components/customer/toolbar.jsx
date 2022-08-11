import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import config from "../../config.json";
import { Grid, Link } from "@material-ui/core";
var confs;
if (process.env.REACT_APP_MILIEU !== "PROD") confs = config.dev;
else confs = config.prod;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexShrink: 2,
    zIndex: -40,
  },
  menuButton: {
    marginRight: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
  signInButton: {
    cursor: "pointer",
    margin: 8,
    color: "white",
    right: 0,
    top: 8,
    position: "absolute",
  },
}));

export default function CustomerToolbar({ history }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ zIndex: -40 }}>
        <Toolbar>
          <Grid container>
            <Grid item sm={12} xs={12} md={2} xl={2}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => history.push("/")}
              >
                <img
                  src={window.location.origin + "/logo.png"}
                  alt=""
                  width="100%"
                />
              </IconButton>
            </Grid>
            <Grid item sm={3} xs={3} md={1} xl={1}>
              <Link
                style={{ cursor: "pointer", margin: 8, color: "white" }}
                color="inherit"
                href={confs.route.customer.home}
              >
                <Typography variant="h6" color="inherit">
                  Accueil
                </Typography>
              </Link>
            </Grid>
            <Grid item sm={3} xs={3} md={1} xl={1}>
              <Link
                style={{ cursor: "pointer", margin: 8, color: "white" }}
                color="inherit"
                href={confs.route.customer.contact}
              >
                <Typography variant="h6" color="inherit">
                  Contact
                </Typography>
              </Link>
            </Grid>
            <Grid item sm={3} xs={3} md={2} xl={2}>
              <Link
                style={{ cursor: "pointer", margin: 8, color: "white" }}
                color="inherit"
                href={confs.route.customer.who}
              >
                <Typography variant="h6" color="inherit">
                  Qui sommes nous ?
                </Typography>
              </Link>
            </Grid>
            <Grid item md={5} xl={5} />
            <Grid item sm={3} xs={3} md={1} xl={1}>
              <Link
                color="inherit"
                href={confs.route.customer.sign_in}
                style={{ cursor: "pointer", margin: 8, color: "white" }}
              >
                <Typography variant="h6" color="inherit">
                  Signin
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
