import {
  Grid,
  TextField,
  Button,
  Typography,
  Divider,
  Paper,
} from "@material-ui/core";
import { MdCancel, MdSave } from "react-icons/md";
import { useState } from "react";
import { SIGN_UP } from "../../../graphql/mutation";
import { useSnackbar } from "../../../context/use-snackbar.hook";
import { useMutation } from "@apollo/client";
import UserRoleSelect from "../../util/users-role-select-widgets";
import MyDatePicker from "../../util/date-picker";

export default function UserInfoForm({ company_id, setModal, useAuthAnswer }) {
  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("admin");
  const [signup] = useMutation(SIGN_UP);
  const snackbar = useSnackbar();

  const handlechange = (event) => {
    if (event.target.value === "Administrateur") setRole("admin");
    else setRole("users");
  };

  const handleSubmit = () => {
    if (last_name && birthDate && phone && name) {
      signup({
        variables: {
          user: {
            first_name: name,
            last_name: last_name,
            birth_date: birthDate,
            phone_num: parseInt(phone),
            e_mail: useAuthAnswer.username,
            auth_user_id: useAuthAnswer.user,
            company_id: company_id,
            role: role,
          },
        },
      })
        .then((value) => {
          if (typeof value.data === "object") {
            if (value?.data?.insertNewUser) {
              snackbar.success("L'employé sera notifié par e-mail");
              setModal({ isShowing: false, content: null });
            }
          }
        })
        .catch((error) => {
          console.log(error);
          snackbar.error(
            "Erreur interne veuillez contacter l'équipe de support"
          );
        });
    } else {
      snackbar.error("Veuillez remplir tout les champs");
    }
  };

  return (
    <>
      <Grid item md={2} xl={2} />
      <Grid item xs={12} sm={12} md={8} xl={8}>
        <Paper style={{ padding: "2%" }}>
          <Grid
            container
            spacing={2}
            alignContent="center"
            justifyContent="center"
          >
            <Grid item xs={12} sm={12} md={10} xl={10}>
              <Typography variant="h6" color="textPrimary">
                Information complémentaire
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={2} xl={2}>
              <MdCancel
                size={24}
                onClick={() => {
                  setModal({ content: null, isShowing: false });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Divider />
            </Grid>
            <Grid xs={12} sm={12} md={5} xl={5} item>
              <TextField
                fullWidth
                label="Nom"
                required
                variant="outlined"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>

            <Grid xs={12} sm={12} md={5} xl={5} item>
              <TextField
                fullWidth
                label="Prenom"
                required
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>

            <Grid xs={12} sm={12} md={5} xl={5} item>
              <TextField
                fullWidth
                label="Télèphone"
                required
                variant="outlined"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>

            <Grid xs={12} sm={12} md={5} xl={5} item>
              <MyDatePicker
                label="Date de naissance"
                setDate={setBirthDate}
                defaultValue={birthDate}
              />
            </Grid>

            <Grid xs={12} sm={12} md={5} xl={5} item>
              <UserRoleSelect handlechange={handlechange} />
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={5}
              xl={5}
              item
              style={{ padding: "auto" }}
            >
              <Button
                endIcon={<MdSave />}
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleSubmit()}
              >
                Sauvegarder
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item md={2} xl={2} />
    </>
  );
}
