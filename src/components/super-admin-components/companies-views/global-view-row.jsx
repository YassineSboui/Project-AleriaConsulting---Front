import { Grid, Paper, Typography } from "@material-ui/core";

export default function GlobalViewRow({
  title,
  number,
  icon,
  backgroundColor,
}) {
  return (
    <Paper
      style={{
        padding: "3%",
        margin: "1%",
        maxHeight: 200,
        maxWidth: 400,
        backgroundColor: backgroundColor,
      }}
    >
      <Grid
        container
        alignContent="center"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={9} sm={9} md={9} xl={9}>
          <Grid container alignContent="center">
            <Grid item xs={4} sm={4} md={4} xl={4}>
              <Typography variant="h6" color="textPrimary">
                {number}
              </Typography>
            </Grid>

            <Grid item xs={4} sm={4} md={4} xl={4} />
            <Typography variant="subtitle1" color="textSecondary">
              {title}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={3} sm={3} md={3} xl={3}>
          {icon}
        </Grid>
      </Grid>
    </Paper>
  );
}
