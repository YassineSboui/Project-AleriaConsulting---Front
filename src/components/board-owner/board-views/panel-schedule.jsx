import {
  Grid,
  Tab,
  AppBar,
  Tabs,
  Paper,
  IconButton,
} from "@material-ui/core";
import Schedule from "../../util/calendar";
import RequestList from "../request-views/list_request";
import { useState } from "react";
import { MdCancel } from "react-icons/md";

export default function PanelSchedule({ requests, refetch, setModal }) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid item xl={2} md={2} />

      <Grid item xs={12} sm={12} xl={8} md={8}>
        <Paper>
          <AppBar
            position="static"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyItems: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Tabs
              style={{ flex: "2" }}
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="Calendrier des activitées" />
              <Tab label="List des requêtes" />
            </Tabs>

            <IconButton
              color="inherit"
              onClick={() => setModal({ isShowing: false, content: null })}
            >
              <MdCancel size={24} color="white" />
            </IconButton>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Grid container>
              <Schedule Requests={requests} setModal={setModal} />
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RequestList
              refetch={refetch}
              requestList={requests}
              isPanelDetail={true}
            />
          </TabPanel>
        </Paper>
      </Grid>
      <Grid item xl={2} md={2} />
    </>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid
          container
          alignContent="center"
          justifyContent="center"
          alignItems="center"
        >
          {children}
        </Grid>
      )}
    </div>
  );
}
