import { Grid, Typography } from "@material-ui/core";
import UserPanelDetailRow from "./user-panel-detail-row";
import { convertDateToLocalDateFrench } from "../../util/date_fonrmater";
export default function UserPanelDetail({ user }) {
  return (
    <Grid
      container
      spacing={2}
      alignContent="center"
      justifyContent="center"
      alignItems="center"
    >
      <UserPanelDetailRow
        title={"Nom complet"}
        value={user?.first_name + " " + user?.last_name}
      />
      <UserPanelDetailRow title="Address e-mail" value={user?.e_mail} />

      <UserPanelDetailRow title="Telephone" value={user?.phone_num} />

      <UserPanelDetailRow title="Rôle" value={user?.role} />

      <UserPanelDetailRow
        title="Date de creation"
        value={convertDateToLocalDateFrench(user?.created_at)}
      />

      <UserPanelDetailRow
        title="Compte bannie"
        value={user?.is_enabled ? "Active" : "Bannie"}
        color={user?.is_enabled ? "primary" : "secondary"}
      />

      <UserPanelDetailRow
        title="A été activé"
        value={user?.is_activated ? "A été activé" : "n'a pas été activé"}
        color={user?.is_activated ? "primary" : "secondary"}
      />

      <UserPanelDetailRow
        title="Date de naissance"
        value={convertDateToLocalDateFrench(user?.birth_date)}
      />
    </Grid>
  );
}
