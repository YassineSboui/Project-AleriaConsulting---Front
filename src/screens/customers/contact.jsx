import { useState } from "react";
import {
  Grid,
  Typography,
  Paper,
  TextField,
  TextareaAutosize,
  Divider,
  IconButton,
  Link,
  Button,
  Tooltip,
} from "@material-ui/core";
import { MdSend } from "react-icons/md";
import CustomerToolbar from "../../components/customer/toolbar";
import { useHistory } from "react-router";
import { CONTACT_MAIL } from "../../graphql/mutation";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "../../context/use-snackbar.hook";
import {
  RiFacebookBoxFill,
  RiLinkedinBoxFill,
  RiPhoneFill,
} from "react-icons/ri";

export default function CustomerContact() {
  const [mutate] = useMutation(CONTACT_MAIL);
  const history = useHistory();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const snackbar = useSnackbar();
  const sendEmail = async () => {
    if (
      checkValue(name) &&
      checkValue(phone) &&
      checkValue(email) &&
      checkValue(message)
    ) {
      mutate({
        variables: {
          email_sender: email,
          message: message,
          phone_sender: phone,
          nom_complet: name,
        },
      })
        .then((value) => {
          snackbar.success("E-mail envoyé");
        })
        .catch((error) => {
          console.log(error);
          snackbar.error("Erreur interne veuillez essayer plus tard");
        });
    } else {
      snackbar.error(
        "LE formulaire est incomplet veuillez remplir tout les champs"
      );
    }
  };
  return (
    <>
      <CustomerToolbar history={history} />
      <Grid container spacing={2} style={{ padding: "1%" }}>
        <Grid item sm={12} xs={12} md={6} xl={6}>
          <Paper style={{ padding: "1%" }}>
            <Grid
              container
              justifyContent="center"
              alignContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item sm={9} xs={9} md={9} xl={9}>
                <Typography
                  variant="h6"
                  color="textPrimary"
                  style={{ marginLeft: "2%" }}
                >
                  Contact
                </Typography>
              </Grid>

              <Grid item sm={1} xs={1} md={1} xl={1}>
                <Tooltip title="+216 50 926 025">
                  <IconButton>
                    <RiPhoneFill color="#00c851" size={36} />
                  </IconButton>
                </Tooltip>
              </Grid>

              <Grid item sm={1} xs={1} md={1} xl={1}>
                <Tooltip title="Facebook">
                  <Link href="https://www.facebook.com/aleriaco">
                    <IconButton>
                      <RiFacebookBoxFill color="#33b5e5" size={36} />
                    </IconButton>
                  </Link>
                </Tooltip>
              </Grid>

              <Grid item sm={1} xs={1} md={1} xl={1}>
                <Tooltip title="LinkedIn">
                  <Link href="https://www.linkedin.com/company/al%C3%A9ria-consulting/">
                    <IconButton>
                      <RiLinkedinBoxFill color="#0099cc" size={36} />
                    </IconButton>
                  </Link>
                </Tooltip>
              </Grid>
              <Grid item sm={12} xs={12} md={12} xl={12}>
                <Divider />
              </Grid>
              <Grid item sm={12} xs={12} md={5} xl={5}>
                <Typography variant="subtitle1" color="textSecondary">
                  Nom Complet
                </Typography>
                <TextField
                  label="Nom complet "
                  variant="outlined"
                  fullWidth
                  onChange={(event) => setName(event.target.value)}
                />
              </Grid>
              <Grid item sm={12} xs={12} md={5} xl={5}>
                <Typography variant="subtitle1" color="textSecondary">
                  Numéro de Téléphones
                </Typography>
                <TextField
                  label="Téléphones"
                  variant="outlined"
                  fullWidth
                  onChange={(event) => setPhone(event.target.value)}
                />
              </Grid>
              <Grid item sm={12} xs={12} md={5} xl={5}>
                <Typography variant="subtitle1" color="textSecondary">
                  Address mail
                </Typography>
                <TextField
                  label="E-mail"
                  variant="outlined"
                  fullWidth
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item sm={12} xs={12} md={1} xl={1} />
              <Grid item sm={12} xs={12} md={10} xl={10}>
                <Typography variant="subtitle1" color="textSecondary">
                  Message
                </Typography>

                <TextareaAutosize
                  style={{ minWidth: "100%", maxWidth: "100%" }}
                  label="E-mail"
                  variant="outlined"
                  fullWidth
                  minRows={9}
                  maxRows={9}
                  minLength={12}
                  onChange={(event) => setMessage(event.target.value)}
                />
              </Grid>
              <Grid item sm={12} xs={12} md={1} xl={1} />
              <Grid item sm={12} xs={12} md={4} xl={4} />
              <Grid item sm={12} xs={12} md={4} xl={4}>
                <Button
                  endIcon={<MdSend size={24} />}
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => sendEmail()}
                >
                  Envoyer
                </Button>
              </Grid>
              <Grid item sm={12} xs={12} md={4} xl={4} />
            </Grid>
          </Paper>
        </Grid>

        <Grid item sm={12} xs={12} md={6} xl={6}>
          <Paper style={{ padding: "2%" }}>
            <Grid container>
              <Grid item sm={12} xs={12} md={12} xl={12}>
                <Typography
                  variant="h6"
                  color="textPrimary"
                  style={{ marginLeft: "2%" }}
                >
                  Question fréquentes
                </Typography>
                <Divider />
              </Grid>
              <Grid item sm={1} xs={1} md={1} xl={1}>
                <Typography variant="subtitle2" component="b" color="#c0392b">
                  Q1 :
                </Typography>
              </Grid>
              <Grid item sm={11} xs={11} md={11} xl={11}>
                <Typography
                  variant="subtitle2"
                  component="b"
                  color="textPrimary"
                >
                  Quel est la différence entre les types de sites?
                </Typography>
                <Typography component="b" color="textSecondary">
                  Le site vitrine est similaire à la vitrine d’une boutique d’un
                  magasin il est doncstatique contrairement au site dynamique
                  qui permet aux utilisateurs d’avoir des interactions.
                </Typography>
              </Grid>

              <Grid item sm={1} xs={1} md={1} xl={1}>
                <Typography variant="subtitle2" component="b" color="#c0392b">
                  Q2 :
                </Typography>
              </Grid>
              <Grid item sm={11} xs={11} md={11} xl={11}>
                <Typography variant="subtitle2" component="b">
                  Quel site choisir pour mon activité?
                </Typography>
                <Typography component="b" color="textSecondary">
                  Le choix du site dépend de votre activité et de l’objectif de
                  votre société, noussomme à votre disposition pour vous
                  conseiller au mieux dans vos choix.
                </Typography>
              </Grid>

              <Grid item sm={1} xs={1} md={1} xl={1}>
                <Typography variant="subtitle2" component="b">
                  Q1 :
                </Typography>
              </Grid>
              <Grid item sm={11} xs={11} md={11} xl={11}>
                <Typography variant="subtitle2" component="b">
                  Quels types de logiciels présentez-vous?
                </Typography>
                <Typography component="b" color="textSecondary">
                  Nous concevons des logiciels adaptés aux besoins de votre
                  entreprise afin de faciliter et améliorer votre activité.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

function checkValue(string) {
  return string !== "" && string !== null;
}
