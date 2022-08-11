import { Grid, Button, Typography, Paper, Divider } from "@material-ui/core";
import { MdCancel } from "react-icons/md";

export default function ConfirmationView({
  title,
  message,
  callback,
  cancelCallback,
}) {
  return (
    <Grid container>
      <Grid item xs={4} md={4} xl={4} sm={4} />
      <Grid item xs={4} md={4} xl={4} sm={4}>
        <Paper style={{ padding: "6%" }}>
          <Grid
            container
            spacing={3}
            alignContent="center"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={8} sm={10} xl={10} md={10}>
              <Typography variant="subtitle1" color="textSecondary">
                {title}
              </Typography>
            </Grid>

            <Grid item xs={4} sm={2} xl={2} md={2}>
              <MdCancel
                size={24}
                style={{ cursor: "pointer" }}
                onClick={() => cancelCallback()}
              />
            </Grid>
            <Grid item xs={12} sm={12} xl={12} md={12}>
              <Divider />
              <Divider />
            </Grid>
            <Grid item xs={12} sm={12} xl={12} md={12}>
              <Typography variant="h6"> {message} </Typography>
            </Grid>
            <Grid item xs={1} md={1} xl={1} sm={1} />
            <Grid item xs={12} sm={4} xl={4} md={4}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => callback()}
              >
                Confirmer
              </Button>
            </Grid>
            <Grid item xs={2} md={2} xl={2} sm={2} />
            <Grid item xs={12} sm={4} xl={4} md={4}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={() => cancelCallback()}
              >
                Annuler
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={1} md={1} xl={1} sm={1} />
    </Grid>
  );
}
