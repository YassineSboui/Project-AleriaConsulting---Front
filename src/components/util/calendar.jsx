import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import {
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import { MdCancel } from "react-icons/md";

export default function Schedule({ Requests, hideDetail, setModal }) {
  const events = (Resquest) => {
    var createevents;
    if (!hideDetail)
      createevents = Resquest.map((event) => {
        return {
          title: event.name_require,
          start: event.starting_date,
          end: event.ending_date,
          backgroundColor: getColor(),
        };
      });
    else
      createevents = Resquest.map((event) => {
        return {
          title: "Promotion programée",
          start: event.starting_date,
          end: event.ending_date,
          backgroundColor: getColor(),
        };
      });
    return createevents;
  };

  const calendar = (
    <FullCalendar
      eventTextColor={"#000000"}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locales={[frLocale]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      events={events(Requests)}
    ></FullCalendar>
  );

  return !hideDetail ? (
    <>
      <Grid item xs={1} sm={1} md={1} xl={1} />
      <Grid
        item
        xs={10}
        sm={10}
        md={10}
        xl={10}
        style={{ paddingTop: "2%", paddingBottom: "2%" }}
      >
        {calendar}
      </Grid>
      <Grid item xs={1} sm={1} md={1} xl={1} />
    </>
  ) : (
    <>
      <Grid item md={2} xl={2} />
      <Grid item xs={12} sm={12} md={8} xl={8}>
        <Paper
          style={{
            paddingTop: "2%",
            paddingBottom: "2%",
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={11}
              sm={11}
              md={11}
              xl={11}
              style={{
                paddingLeft: "2%",
                paddingRight: "2%",
              }}
            >
              <Typography variant="h6"> Planing </Typography>
            </Grid>
            <Grid item xs={1} sm={1} md={1} xl={1}>
              <IconButton
                onClick={() => setModal({ isShowing: null, content: null })}
              >
                <MdCancel />
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Divider />
              <Divider />
              <Divider />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              xl={12}
              style={{
                paddingLeft: "2%",
                paddingRight: "2%",
              }}
            >
              {calendar}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item md={2} xl={2} />
    </>
  );
}

function getColor() {
  return (
    "hsl(" +
    360 * Math.random() +
    "," +
    (25 + 70 * Math.random()) +
    "%," +
    (85 + 10 * Math.random()) +
    "%)"
  );
}
