import {
  Grid,
  Paper,
  Divider,
  TextField,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";

import OverlayPanel from "../../util/modal";
import { useRecoilState } from "recoil";
import { modal } from "../../../recoils/modal.atom";
import { useEffect, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import RequestTableView from "./request-table-view";
export default function RequestList({
  requestList,
  refetch,
  isPanelDetail,
  filtredRequest,
}) {
  const [filtredList, setFiltredList] = useState(requestList);
  const [anchorEl, setAnchorEl] = useState(null);
  const [, setModal] = useRecoilState(modal);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (filtredRequest === 0) setFiltredList(requestList);
    else if (filtredRequest === 1)
      setFiltredList(filterByStatus("confirmed", requestList));
    else if (filtredRequest === 2)
      setFiltredList(filterByStatus("refused", requestList));
    else if (filtredRequest === 3)
      setFiltredList(filterByStatus("requested", requestList));
  }, [requestList, filtredRequest]);

  return (
    <Grid
      container
      alignContent="center"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      style={{ marginTop: "1%", marginBottom: "1%" }}
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
                <Button
                  endIcon={<MdExpandMore size={24} />}
                  variant="contained"
                  color="primary"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  Status
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() =>
                      setFiltredList(filterByStatus("requested", requestList))
                    }
                  >
                    Demandée
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      setFiltredList(filterByStatus("confirmed", requestList))
                    }
                  >
                    Confirmée
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      setFiltredList(filterByStatus("archived", requestList))
                    }
                  >
                    Archivée
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      setFiltredList(filterByStatus("refused", requestList))
                    }
                  >
                    Refusée
                  </MenuItem>
                </Menu>
              </Grid>

              <Grid item xs={3} md={3} xl={3} sm={3}>
                <TextField
                  variant="standard"
                  label="Nom du demandeur"
                  onChange={(event) =>
                    setFiltredList(
                      filterByName(event.target.value, requestList)
                    )
                  }
                />
              </Grid>

              <Grid item xs={9} md={9} xl={9} sm={9} />
              <Grid item xs={3} md={3} xl={3} sm={3}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setFiltredList(requestList)}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={11} md={11} sm={11} xm={11}>
        <RequestTableView
          filtredList={filtredList}
          setModal={setModal}
          refetch={refetch}
        />
        <Paper>{isPanelDetail ? null : <OverlayPanel />}</Paper>
      </Grid>
    </Grid>
  );
}

function filterByStatus(status, list) {
  return list.filter((element) =>
    element.status
      .toString()
      .toLowerCase()
      .includes(status.toString().toLowerCase())
  );
}

function filterByName(name, list) {
  return list.filter((element) =>
    element.name_require
      .toString()
      .toLowerCase()
      .includes(name.toString().toLowerCase())
  );
}
