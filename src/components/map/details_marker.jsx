import { Grid } from "@material-ui/core";
import PanelDetail from "./panel_details";

export default function DetailsMarker({ pannel }) {
  return (
    <Grid
      container
      alignItems="center"
      alignContent="center"
      justifyContent="center"
    >
      <Grid item xs={12} sm={12} md={12} xl={12}>
        <PanelDetail
          pannel={pannel}
          conf={{ more_details: true, make_command: false }}
        />
      </Grid>
    </Grid>
  );
}
