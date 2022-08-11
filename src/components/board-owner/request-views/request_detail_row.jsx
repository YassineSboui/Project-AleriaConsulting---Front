import { Grid, Typography } from "@material-ui/core";

export default function RequestDetailRow({ title, label }) {
  return (
    <>
      <Grid item xs={6} sm={6} md={6} xl={6}>
        <Typography variant="subtitle1" color="textSecondary">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={6} sm={6} md={6} xl={6}>
        <Typography variant="subtitle1" color="textPrimary">
          {label}
        </Typography>
      </Grid>

    </>
  );
}
