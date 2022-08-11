import {
  Grid,
  TableContainer,
  Table,
  TableBody,
  Paper,
  TableCell,
  Button,
  TableHead,
  TableRow,
  ButtonGroup,
} from "@material-ui/core";
import { useState } from "react";
import { GET_NOTIF_BY_COMANY_ID_NEW } from "../../../graphql/queries";
import { useQuery } from "@apollo/client";
import { useSnackbar } from "../../../context/use-snackbar.hook";
import NotificationRow from "./notification-row";

export default function NotificationList({ company_id }) {
  const snackbar = useSnackbar();
  const [status, setStatus] = useState("NEW");
  const { error, data, refetch } = useQuery(GET_NOTIF_BY_COMANY_ID_NEW, {
    variables: { company_id: company_id, status: status },
  });
  if (error) {
    console.log(error);
    snackbar.error(
      "Erreur de récupération des notifications veuillez rafraichir la page"
    );
  }
  return (
    <Grid container style={{ margin: "2%" }}>
      <Grid item xs={12} sm={12} md={4} xl={4}>
        <ButtonGroup variant="contained" fullWidth>
          <Button
            color={status === "NEW" ? "secondary" : "primary"}
            onClick={() => {
              setStatus("NEW");
              refetch({ company_id: company_id, status: "NEW" });
            }}
          >
            Non lues
          </Button>
          <Button
            color={status === "OPENED" ? "secondary" : "primary"}
            onClick={() => {
              setStatus("OPENED");
              refetch({ company_id: company_id, status: "OPENED" });
            }}
          >
            Lues
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={12} xl={12}>
        <Paper style={{ padding: "1%", marginRight: "3%", marginTop: "3%" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell> Date </TableCell>
                  <TableCell> Titre </TableCell>
                  <TableCell> Message </TableCell>
                  <TableCell> Entité concernée</TableCell>
                  <TableCell> Action </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.fincNotificationByCompanyIdAndStatus
                  ? data?.fincNotificationByCompanyIdAndStatus.map(
                      (element, index) => {
                        return (
                          <NotificationRow
                            refetch={refetch}
                            notification={element}
                            key={index++}
                          />
                        );
                      }
                    )
                  : []}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}
