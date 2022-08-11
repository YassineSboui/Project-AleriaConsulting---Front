import {
  Grid,
  Typography,
  Paper,
  Divider,
  Button,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../graphql/mutation";
import { MdCancel, MdCreate, MdSave } from "react-icons/md";
import { useAuth } from "../../../context/use-auth.hook";
import UserRoleSelect from "../../util/users-role-select-widgets";
import MyDatePicker from "../../util/date-picker";
import { useSnackbar } from "../../../context/use-snackbar.hook";
export default function UserInfoPanel({ setModal, user, isLoggedUser }) {
  const snackbar = useSnackbar();
  const { sessionData } = useAuth();
  const [u, setUser] = useState({ ...user });
  const [mutate] = useMutation(UPDATE_USER);
  const [birthDate, setBirthDate] = useState(new Date());
  const [editable, setIsEditable] = useState(true);
  const isAdminOrOwner =
    sessionData?.user?.role === "admin" || user._id === sessionData?.user?._id;

  const setRole = (event) => {
    if (event.target.value === "Administrateur") {
      u.role = "admin";
      setUser({ ...u });
    } else {
      u.role = "users";
      setUser({ ...u });
    }
  };

  const runMutation = () => {
    delete u.__typename;
    delete u.created_at;

    mutate({ variables: { user: u, user_id: u._id } })
      .then((value) => {
        setIsEditable(!editable);
      })
      .catch((error) => {
        setIsEditable(!editable);
        console.log(error);
        snackbar.error("Erreur interne veuillez contacter l'équipe de support");
      });
  };

  return (
    <>
      <Grid item md={3} xl={3} />
      <Grid
        item
        xs={12}
        sm={12}
        md={isLoggedUser ? 12 : 6}
        xl={isLoggedUser ? 12 : 6}
      >
        <Paper style={{ margin: "2%", padding: "2%" }}>
          <Grid
            spacing={4}
            container
            alignContent="center"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={11} sm={11} md={11} xl={11}>
              <Typography variant="h6"> Détail(s) de l'utilisateur </Typography>
            </Grid>
            {isLoggedUser ? null : (
              <Grid item xs={1} sm={1} md={1} xl={1}>
                <MdCancel
                  size={24}
                  style={{ cursor: "pointer" }}
                  onClick={() => setModal({ content: false, isShowing: null })}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={12} md={1} xl={1} />
            <Grid item xs={7} sm={7} md={7} xl={7}>
              <>
                <Typography
                  variant="body1"
                  color={user?.is_activated ? "primary" : "secondary"}
                >
                  {user?.is_activated ? "Compte activé" : "Compte desactivé"}
                </Typography>
              </>
            </Grid>

            <Grid item xs={4} sm={4} md={4} xl={4}>
              {isAdminOrOwner ? (
                <Button
                  endIcon={
                    !editable ? <MdSave size={24} /> : <MdCreate size={24} />
                  }
                  fullWidth
                  color={editable ? "primary" : "secondary"}
                  variant="text"
                  onClick={
                    editable
                      ? () => setIsEditable(!editable)
                      : () => {
                          runMutation();
                        }
                  }
                >
                  {editable ? "Modifier" : "Sauvegarder"}
                </Button>
              ) : null}
            </Grid>
            <Grid item md={1} xl={1} />
            <Grid item sm={12} xs={12} md={10} xl={10}>
              <Grid
                spacing={2}
                container
                alignContent="center"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={12} xl={6} md={6}>
                  <TextField
                    defaultValue={user?.first_name}
                    fullWidth
                    label="Prénom"
                    variant="standard"
                    size="small"
                    disabled={editable}
                    onChange={(event) => {
                      u.first_name = event.target.value;
                      setUser(u);
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={12} xl={6} md={6}>
                  <TextField
                    defaultValue={user?.last_name}
                    fullWidth
                    label="Nom"
                    variant="standard"
                    size="small"
                    disabled={editable}
                    onChange={(event) => {
                      u.last_name = event.target.value;
                      setUser(u);
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={12} xl={6} md={6}>
                  <TextField
                    defaultValue={user?.e_mail}
                    fullWidth
                    label="E-mail"
                    variant="standard"
                    size="small"
                    onChange={(event) => {
                      u.e_mail = event.target.value;
                      setUser({ ...u });
                    }}
                    disabled={editable}
                  />
                </Grid>

                <Grid item xs={12} sm={12} xl={6} md={6}>
                  <TextField
                    defaultValue={user?.phone_num}
                    fullWidth
                    label="Numéro de téléphone"
                    variant="standard"
                    size="small"
                    onChange={(event) => {
                      u.phone_num = parseInt(event.target.value);
                      setUser({ ...u });
                    }}
                    disabled={editable}
                  />
                </Grid>

                <Grid item xs={12} sm={12} xl={6} md={6}>
                  <MyDatePicker
                    label="Date de naissance"
                    defaultValue={birthDate}
                    editable={editable}
                    setDate={setBirthDate}
                  />
                </Grid>

                <Grid item xs={12} sm={12} xl={6} md={6}>
                  {editable ? (
                    <TextField
                      defaultValue={user?.role}
                      fullWidth
                      label="Privilége"
                      variant="standard"
                      size="small"
                      disabled={editable}
                    />
                  ) : isLoggedUser ? null : (
                    <UserRoleSelect handlechange={setRole} />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={1} xl={1} />
          </Grid>
        </Paper>
      </Grid>
      <Grid item md={3} xl={3} />
    </>
  );
}
