import React, { useState } from "react";
import {
  Avatar,
  CssBaseline,
  Grid,
  Typography,
  Container,
  Button,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { useStyles } from "./style";
import { MdLock } from "react-icons/md";
import { useParams } from "react-router";
import { useAuth } from "../../context/use-auth.hook";
import { useHistory } from "react-router-dom";
import config from "../../config.json";
import { useSnackbar } from "../../context/use-snackbar.hook";
import MyDatePicker from "../util/date-picker";
var confs;
if (process.env.REACT_APP_MILIEU !== "PROD") confs = config.dev;
else confs = config.prod;

export default function Signup_info() {
  const history = useHistory();
  const { id } = useParams();
  const auth = useAuth();
  const classes = useStyles();
  const snackbar = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());

  const [user, setuser] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
    phone_num: "",
    company_id: id,
    role: "admin",
  });

  const firstnamehandler = (event) => {
    user.first_name = event.target.value;
    setuser({ ...user });
  };
  const lastnamehandler = (event) => {
    user.last_name = event.target.value;
    setuser({ ...user });
  };
  const phonenumhandler = (event) => {
    user.phone_num = event.target.value;
    setuser({ ...user });
  };
  const validenumber = (number) => {
    return (number / 10000000 > 1) & (number / 100000000 < 1);
  };

  const registerUser = () => {
    user.birth_date = birthDate.toString();
    setuser(birthDate);
    if (
      user.first_name === "" ||
      user.last_name === "" ||
      user.birth_date === "" ||
      user.phone_num === ""
    ) {
      snackbar.error("veuillez remplir tous les champs");
    } else if (!validenumber(user.phone_num)) {
      snackbar.error("veuillez saisir un numero de téléphone valide");
    } else {
      setIsLoading(true);
      auth
        .signup(
          user.first_name,
          user.last_name,
          user.birth_date,
          user.phone_num,
          user.company_id,
          user.role
        )
        .then((value) => {
          if (typeof value === "object") {
            if (value?.data?.insertNewUser) {
              history.push(confs.route.customer.sign_in, {
                user: value?.data?.insertNewUser,
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
          snackbar.error(
            "Erreur interne veuillez contacter l'équipe de support"
          );
        });
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MdLock />
        </Avatar>
        <Typography component="h1" variant="h5">
          Création compte
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} xl={12}>
            <TextField
              required
              fullWidth
              autoFocus
              variant="standard"
              label="Prénom "
              value={user.first_name}
              onChange={firstnamehandler}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} xl={12}>
            <TextField
              required
              fullWidth
              variant="standard"
              label="Nom"
              value={user.last_name}
              onChange={lastnamehandler}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} xl={12}>
            <MyDatePicker
              label="Date de naissance"
              defaultValue={birthDate}
              setDate={setBirthDate}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} xl={12}>
            <TextField
              fullWidth
              variant="standard"
              label="Numéro de téléphone"
              type="number"
              value={user.phone_num}
              onChange={phonenumhandler}
            />
          </Grid>
        </Grid>
        {isLoading ? (
          <CircularProgress color="primary" />
        ) : (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={registerUser}
            className={classes.submit}
          >
            S'inscrire
          </Button>
        )}
      </div>
    </Container>
  );
}
