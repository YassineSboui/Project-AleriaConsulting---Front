import {
  Grid,
  Button,
  Typography,
  Paper,
  Divider,
  TextField,
} from "@material-ui/core";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import ReqFormRow from "./request_form_row";
import ContactForm from "../../util/contact_form";
const service_price = parseFloat(320);

export default function RequestForm({ request, panel, setModal }) {
  const [req, setRequest] = useState(request);
  const moveForward = () => {
    req.total_price = parseFloat(
      parseFloat(req.total_price) + parseFloat(service_price)
    ).toFixed(3);
    delete req.__typename;
    setRequest(req);
    setModal({
      isShowing: true,
      content: <ContactForm demande={req} panel={panel} />,
    });
  };
  return (
    <>
      <Grid item xs={4} sm={4} md={4} xl={4} />
      <Grid item xs={12} sm={12} md={4} xl={4}>
        <Paper style={{ padding: 32 }}>
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={11} sm={11} md={11} xl={11}>
              <Typography variant="h6" component="p">
                Récapitulative de la commande
              </Typography>
            </Grid>
            <Grid item xs={1} sm={1} md={1} xl={1}>
              <MdCancel
                size={24}
                style={{ cursor: "pointer" }}
                onClick={() => setModal({ content: null, isShowing: false })}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Divider />
            </Grid>
            <Grid item xs={1} sm={1} md={1} xl={1}>
              <Typography variant="subtitle1" color="textSecondary">
                Du
              </Typography>
            </Grid>
            <Grid item xs={5} sm={5} md={5} xl={5}>
              <TextField
                variant="standard"
                disabled
                value={new Date(request?.starting_date).toDateString()}
              />
            </Grid>
            <Grid item xs={1} sm={1} md={1} xl={1}>
              <Typography variant="subtitle1" color="textSecondary">
                Au
              </Typography>
            </Grid>
            <Grid item xs={5} sm={5} md={5} xl={5}>
              <TextField
                variant="standard"
                disabled
                value={new Date(request?.ending_date).toDateString()}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} xl={12} />
            <ReqFormRow
              header={
                request?.days_number + " jours x " + panel?.day_price + " TND"
              }
              value={request?.total_price}
            />
            {request?.days_number > panel?.days_discount && (
              <ReqFormRow
                header={"prix jour discount"}
                value={panel?.discount_day_price}
              />
            )}
            <ReqFormRow header="Frais de service" value={service_price} />
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Divider />
            </Grid>
            <ReqFormRow
              header="Total"
              value={parseFloat(
                parseFloat(request?.total_price) + service_price
              ).toFixed(3)}
            />
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Divider />
            </Grid>
            <Grid item xs={8} sm={8} md={8} xl={8} />
            <Grid item xs={4} sm={4} md={4} xl={4}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                onClick={moveForward}
              >
                Confirmer
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={4} sm={4} md={4} xl={4} />
    </>
  );
}
