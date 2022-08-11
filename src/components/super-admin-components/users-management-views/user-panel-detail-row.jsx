import { Grid, Typography } from "@material-ui/core";

export default function UserPanelDetailRow({ title, value, color }) {
  return (
    <>
      <Grid item xs={4} sm={4} md={4} xl={4}>
        <Typography color="textSecondary" variant="subtitle1">
          {title + "  : "}
        </Typography>
      </Grid>

      <Grid item xs={7} sm={7} md={7} xl={7}>
        <Typography color={color ? color : "textPrimary"} variant="subtitle1">
          {value}
        </Typography>
      </Grid>
    </>
  );
}
