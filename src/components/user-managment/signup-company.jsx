import React, { useState } from "react";
import {
  Avatar,
  CssBaseline,
  Grid,
  Typography,
  Container,
  Button,
  TextField,
} from "@material-ui/core";
import { useStyles } from "./style";
import { MdLock } from "react-icons/md";
import { useMutation } from "@apollo/client";
import { CLIENT_COMPANY_REGISTRATION } from "../../graphql/mutation";
import { dev } from "../../config.json";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "../../context/use-snackbar.hook";

export default function Signup_comp() {
  const [registercomp] = useMutation(CLIENT_COMPANY_REGISTRATION);
  const classes = useStyles();
  const history = useHistory();
  const snackbar = useSnackbar();
  const [company, setcompany] = useState({
    name: "",
    phone: "",
    trade_register_number: "",
    e_mail: "",
  });

  const signup_comp = (name, phone, trade_register_number, e_mail) => {
    const res = registercomp({
      variables: {
        company: {
          name: name,
          phone: phone,
          trade_register_number: trade_register_number,
          e_mail: e_mail,
        },
      },
    })
      .then((value) => {
        history.push({
          pathname:
            dev.route.customer.sign_up_auth_without_id +
            value.data.insertCompany._id,
        });
      })
      .catch((error) => {
        snackbar.error("Erreur interne veuillez contacter l'équipe de support");

        console.log(error);
      });
    return res;
  };
  const namehandler = (event) => {
    company.name = event.target.value;
    setcompany({ ...company });
  };
  const phonehandler = (event) => {
    company.phone = event.target.value;
    setcompany({ ...company });
  };
  const trade_register_numberhandler = (event) => {
    company.trade_register_number = event.target.value;
    setcompany({ ...company });
  };
  const e_mailhandler = (event) => {
    company.e_mail = event.target.value;
    setcompany({ ...company });
  };
  const validenumber = (number) => {
    return (number / 10000000 > 1) & (number / 100000000 < 1);
  };
  const signcompany = (name, phone, trade_register_number, e_mail) => {
    if (
      name === "" ||
      phone === "" ||
      trade_register_number === "" ||
      e_mail === ""
    ) {
      snackbar.error("veuillez remplir tous les champs");
    } else if (!e_mail.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      snackbar.error(e_mail + " n'est pas une adresse valide");
    } else if (!validenumber(phone)) {
      snackbar.error("veuillez saisir un numero de télèphone valide");
    } else {
      signup_comp(name, phone, trade_register_number, e_mail);
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
              variant="outlined"
              label="Nom de l'entreprise  "
              value={company.name}
              onChange={namehandler}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} xl={12}>
            <TextField
              fullWidth
              required
              variant="outlined"
              label="Numéro de téléphone"
              type="number"
              value={company.phone}
              onChange={phonehandler}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} xl={12}>
            <TextField
              required
              fullWidth
              variant="outlined"
              label="Numéro de registre du commerce"
              value={company.trade_register_number}
              onChange={trade_register_numberhandler}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} xl={12}>
            <TextField
              required
              fullWidth
              variant="outlined"
              label="E-mail"
              value={company.e_mail}
              onChange={e_mailhandler}
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() =>
            signcompany(
              company.name,
              company.phone,
              company.trade_register_number,
              company.e_mail
            )
          }
        >
          Suivant
        </Button>
      </div>
    </Container>
  );
}
