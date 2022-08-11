import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import RequestRow from "./request_row";

export default function RequestTableView({
  filtredList,
  setModal,
  refetch 
}) {

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> Revenu prévu DT </TableCell>
            <TableCell> Nom </TableCell>
            <TableCell> Société </TableCell>
            <TableCell> Message</TableCell>
            <TableCell> Date dépôt </TableCell>
            <TableCell> Date début/fin</TableCell>
            <TableCell> Status</TableCell>
            <TableCell> Panneau </TableCell>
            <TableCell> Action </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(filtredList)
            ? filtredList.map((element) => {
                return (
                  <RequestRow
                    refetch={refetch}
                    request={element}
                    setModal={setModal}
                    isfull={true}
                  />
                );
              })
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
