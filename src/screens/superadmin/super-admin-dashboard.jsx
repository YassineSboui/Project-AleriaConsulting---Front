import { Grid } from "@material-ui/core";

import OverlayPanel from "../../components/util/modal";
import SuperAdminDrawer from "../../components/super-admin-components/drawer";

export default function SuperAdminDashboard() {
  return (
    <Grid container style={{ padding: "1%" }}>
      <Grid item xs={12} sm={12} md={12} xl={12}>
        <SuperAdminDrawer />
      </Grid>
      <OverlayPanel />
    </Grid>
  );
}
