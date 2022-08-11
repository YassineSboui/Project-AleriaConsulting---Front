import { Grid, Typography } from "@material-ui/core";

export default function ReqFormRow({ header, value }) {
  return (
    <Grid container>
      <Grid item xs={1} sm={1} md={1} xl={1} />
      <Grid item xs={6} sm={6} md={6} xl={6}>
        <Typography variant="subtitle1" color="textSecondary">
          {header}
        </Typography>
      </Grid>
      <Grid item xs={3} sm={3} md={3} xl={3}>
        <Typography variant="subtitle1" color="textPrimary">
          {value}
        </Typography>
      </Grid>
      <Grid item xs={2} sm={2} md={2} xl={2}>
        <Typography variant="subtitle1" color="textSecondary">
          TND
        </Typography>
      </Grid>
    </Grid>
  );
}
