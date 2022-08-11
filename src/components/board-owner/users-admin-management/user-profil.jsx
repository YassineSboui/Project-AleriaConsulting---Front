import { Grid } from "@material-ui/core";
import CompanyCard from "./company_card";
import { useAuth } from "../../../context/use-auth.hook";
import OverlayPanel from "../../util/modal";
import UserInfoPanel from "./user-info-panel";
export default function UserProfil() {
  const { sessionData } = useAuth();

  return (
    <Grid container>
      <Grid item md={1} xl={1} />

      <Grid item sm={12} xs={12} md={10} xl={10}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} xl={6}>
            <CompanyCard company_id={sessionData?.user?.company_id} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} xl={6}>
            <UserInfoPanel user={sessionData?.user} isLoggedUser={true} />
          </Grid>
        </Grid>
      </Grid>
      <OverlayPanel />
      <Grid item md={1} xl={1} />
    </Grid>
  );
}
