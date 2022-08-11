import {
  Grid,
  TableContainer,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { PAGINATE_PANELS } from "../../../graphql/queries";
import PanelListRow from "../../board-owner/board-views/panel_row";
import { useSnackbar } from "../../../context/use-snackbar.hook";
export default function PanelsTables({ setCompanieId, setView }) {
  const snackbar = useSnackbar();
  const [panelsData, setPanelDatas] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { loading, data, error, fetchMore, refetch } = useQuery(
    PAGINATE_PANELS,
    {
      variables: { pageSize: rowsPerPage },

      onError: (error) => {
        console.log(error);
        snackbar.error("Erreur interne lors de la récupération des données");
      },
    }
  );

  useEffect(() => {
    if (data?.paginatePanels?.panels)
      setPanelDatas(data?.paginatePanels?.panels);
  }, [data]);

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
    await fetchMore({
      variables: {
        after: newPage * rowsPerPage,
      },
    }).then((value) => {
      setPanelDatas(value?.data?.paginatePanels?.panels);
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid
      container
      alignContent="center"
      alignItems="center"
      justifyContent="center"
      spacing={3}
    >
      <Grid item xs={12} sm={12} md={12} xl={12}>
        <Paper style={{ padding: "2%" }}>
          <Grid container spacing={2}>
            <TextField label="Query" variant="standard" />
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12} md={12} xl={12}>
        <Paper>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Titre</TableCell>
                  <TableCell>Dimensions</TableCell>
                  <TableCell> Pitch</TableCell>

                  <TableCell> Prix loc. journalier</TableCell>
                  <TableCell> Address </TableCell>
                  <TableCell> Revenu</TableCell>
                  <TableCell> Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {panelsData.map((element, index) => {
                  return (
                    <PanelListRow
                      panel={element}
                      key={index++}
                      isSuperAdminView={true}
                      setCompanieId={setCompanieId}
                      setView={setView}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 100]}
            component="div"
            count={data?.paginatePanels?.size}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
