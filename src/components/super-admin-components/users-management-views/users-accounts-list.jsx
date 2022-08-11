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
  TextField,
  Typography,
  Divider,
} from "@material-ui/core";
import UserCardRow from "./user-row";
import { PAGINATE_USERS } from "../../../graphql/queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";

export default function UserList({ setView, setCompanieId }) {
  const [userData, setUsersDatas] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, data, error, fetchMore, refetch } = useQuery(
    PAGINATE_USERS,
    {
      variables: { pageSize: rowsPerPage, query: searchQuery },
    }
  );

  if (error) console.log(error);
  useEffect(() => {
    if (data?.queryUsers?.users) setUsersDatas(data?.queryUsers?.users);

  }, [data]);

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
    await fetchMore({
      variables: {
        after: newPage * rowsPerPage,
        query: searchQuery,
      },
    }).then((value) => {
      setUsersDatas(value?.data?.queryUsers?.users);
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} xl={12}>
        <Paper style={{ padding: "1%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Typography variant="h6">Filtres</Typography>
              <Divider />
            </Grid>
            <Grid item xs={6} sm={6} md={4} xl={4}>
              <TextField
                variant="standard"
                label="Recherche"
                fullWidth
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={12} md={12} xl={12} style={{ width: "100%" }}>
        <Paper>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nom complet</TableCell>
                      <TableCell>E-mail</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Date de naissance </TableCell>
                      <TableCell>Date d'inscription</TableCell>

                      <TableCell>Companie</TableCell>
                      <TableCell> Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userData?.map((element, index) => {
                      return (
                        <UserCardRow
                          user={element}
                          key={index++}
                          refetch={refetch}
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
                count={data?.queryUsers?.size}
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
