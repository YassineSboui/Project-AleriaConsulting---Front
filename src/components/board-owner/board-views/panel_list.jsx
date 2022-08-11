import {
  Grid,
  Paper,
  Divider,
  TextField,
  Button,
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";

import { MdExpandMore } from "react-icons/md";
import { useEffect, useState } from "react";
import OverflowPanel from "../../util/modal";
import PanelRow from "./panel_row";

export default function ListPanels({ listPanels, refetch }) {
  const [filtredList, setFiltredList] = useState(listPanels);
  useEffect(() => {
    setFiltredList(listPanels);
  }, [listPanels]);
  return (
    <Grid
      container
      alignContent="center"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      style={{ margin: "1%" }}
    >
      <Grid item xs={10} md={10} sm={10} xm={10}>
        <Accordion>
          <AccordionSummary
            expandIcon={<MdExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Filtre</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid
              container
              style={{ margin: "1%" }}
              spacing={2}
              alignContent="center"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} md={12} xl={12} sm={12}>
                <Divider />
              </Grid>

              <Grid item xs={3} md={3} xl={3} sm={3}>
                <TextField
                  variant="standard"
                  label="Titre"
                  onChange={(event) => {
                    setFiltredList(
                      filterByTitle(event.target.value, listPanels)
                    );
                  }}
                />
              </Grid>

              <Grid item xs={3} md={3} xl={3} sm={3}>
                <TextField
                  variant="standard"
                  label="Pitch"
                  onChange={(event) => {
                    setFiltredList(
                      filterByPitch(event.target.value, listPanels)
                    );
                  }}
                />
              </Grid>

              <Grid item xs={3} md={3} xl={3} sm={3}>
                <TextField
                  variant="standard"
                  label="Hauteur"
                  type="number"
                  onChange={(event) => {
                    setFiltredList(
                      filterByHeight(event.target.value, listPanels)
                    );
                  }}
                />
              </Grid>

              <Grid item xs={3} md={3} xl={3} sm={3}>
                <TextField
                  variant="standard"
                  label="Largeur"
                  type="number"
                  onChange={(event) => {
                    setFiltredList(
                      filterByWidth(event.target.value, listPanels)
                    );
                  }}
                />
              </Grid>
              <Grid item xs={9} md={9} xl={9} sm={9} />
              <Grid item xs={3} md={3} xl={3} sm={3}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setFiltredList(listPanels)}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={11} md={11} sm={11} xm={11}>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell> </TableCell>

                  <TableCell> Titre</TableCell>
                  <TableCell> Hauteur X Largeur</TableCell>
                  <TableCell> Pitch</TableCell>
                  <TableCell> Prix journalier</TableCell>
                  <TableCell> Adresse</TableCell>
                  <TableCell> Prom. actif / Prom max</TableCell>
                  <TableCell> Actions</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(filtredList)
                  ? filtredList.map((element, index) => {
                      return (
                        <PanelRow
                          panel={element}
                          refetch={refetch}
                          key={index++}
                        />
                      );
                    })
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
          <OverflowPanel />
        </Paper>
      </Grid>
    </Grid>
  );
}

function filterByTitle(query, list) {
  return list.filter((element) =>
    element.title
      .toString()
      .toLowerCase()
      .includes(query.toString().toLowerCase())
  );
}

function filterByPitch(query, list) {
  return list.filter((element) =>
    element.pitch
      .toString()
      .toLowerCase()
      .includes(query.toString().toLowerCase())
  );
}
function filterByHeight(query, list) {
  return list.filter(
    (element) => parseFloat(element.heigh) === parseFloat(query)
  );
}
function filterByWidth(query, list) {
  return list.filter(
    (element) => parseFloat(element.width) === parseFloat(query)
  );
}
