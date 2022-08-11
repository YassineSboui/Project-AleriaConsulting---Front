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
} from "@material-ui/core";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { PAGINATE_ACCEPTED_REQUEST } from "../../../graphql/queries";
import RequestRow from "./request-row";

export default function AcceptedRequestTable() {
  const [requestDatas, setRequestDatas] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { loading, data, error, fetchMore, refetch } = useQuery(
    PAGINATE_ACCEPTED_REQUEST,
    {
      variables: { pageSize: rowsPerPage },
      onCompleted: (values) =>
        setRequestDatas(values?.paginateAcceptedRequest?.requests),
    }
  );

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
    await fetchMore({
      variables: {
        after: newPage * rowsPerPage,
      },
    }).then((value) => {
      setRequestDatas(value?.data?.paginateAcceptedRequest?.requests);
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {requestDatas?.map((element, index) => {
                      return <RequestRow key={index++} request={element} />;
                    })}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[5, 10, 100]}
                component="div"
                count={data?.paginateAcceptedRequest?.size}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Paper>
      </Grid>
    </>
  );
}
