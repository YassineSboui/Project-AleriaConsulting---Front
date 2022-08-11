import {
  Grid,
  TextField,
  List,
  CircularProgress,
  Typography,
  Divider,
  Paper,
  InputAdornment,
} from "@material-ui/core";
import { GET_ALL_COMPANIES } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { useSnackbar } from "../../context/use-snackbar.hook";
import { MdSearch } from "react-icons/md";
import CompanyRow from "./companie-row";
import { useState } from "react";

export default function CompaniesList({ setCompanieID, changeView }) {
  const snackbar = useSnackbar();
  const { loading, data, error } = useQuery(GET_ALL_COMPANIES);
  if (error) {
    console.log(error);
    snackbar.error(
      "Erreur de récupération des données veuillez rafraichir la page "
    );
  }

  return (
    <Paper style={{ padding: "2%" }}>
      <Grid
        container
        spacing={2}
        style={{
          height: "100vh",
          alignContent: "baseline",
        }}
      >
        <Grid item xs={12} sm={12} md={12} xl={12}>
          <Typography variant="h6">Company enregistrées</Typography>
        </Grid>

        <Grid item xs={12} sm={12} md={12} xl={12}>
          <Divider />
          <Divider />
          <Divider />
        </Grid>

        <Grid item xs={12} sm={12} md={12} xl={12}>
          <TextField
            fullWidth
            label="Chercher"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdSearch size={24} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} xl={12}>
          {loading ? (
            <CircularProgress />
          ) : (
            <List>
              {data?.getAll ? (
                data?.getAll.map((element, index) => {
                  return (
                    <CompanyRow
                      changeView={changeView}
                      key={index++}
                      company={element}
                      setCompanieID={setCompanieID}
                    />
                  );
                })
              ) : (
                <Typography> No companie recorded</Typography>
              )}
            </List>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
