import {
  Grid,
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  CircularProgress,
  Typography,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { PAGINATE_REQUEST } from "../../../graphql/queries";
import RequestRow from "./request-row";

export default function AllRequestTable() {
  const [requestDatas, setRequestDatas] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { loading, data, error, fetchMore, refetch } = useQuery(
    PAGINATE_REQUEST,
    {
      variables: { pageSize: rowsPerPage },
      onCompleted: (values) =>
        setRequestDatas(values?.requestPagination?.requests),
    }
  );

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
    await fetchMore({
      variables: {
        after: newPage * rowsPerPage,
      },
    }).then((value) => {
      setRequestDatas(value?.data?.requestPagination?.requests);
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  return (
    <Grid
      container
      alignContent="stretch"
      alignItems="stretch"
      justifyContent="center"
      spacing={4}
    >
      <Grid item xs={12} sm={12} md={12} xl={12}>
        <Paper style={{ padding: "2%" }}>
          <Grid container spacing="2">
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Typography> Filtres </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={3} xl={2}>
              <TextField variant="standard" label="Not implemented yet " />
            </Grid>

            <Grid item xs={6} sm={6} md={3} xl={2}>
              <TextField variant="standard" label="Not implemented yet " />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12} md={12} xl={12}>
        <Paper>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nom complet</TableCell>
                      <TableCell>E-mail</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Date de demande </TableCell>
                      <TableCell>Durée</TableCell>
                      <TableCell> Revenu</TableCell>
                      <TableCell> Status </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {requestDatas?.map((element, index) => {
                      return (
                        <RequestRow
                          key={index++}
                          request={element}
                          isAllReuqest={true}
                        />
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[5, 10, 100]}
                component="div"
                count={data?.requestPagination?.size}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
