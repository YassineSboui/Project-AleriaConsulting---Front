import { Grid, Typography, Divider } from "@material-ui/core";
import { MdChevronLeft } from "react-icons/md";
import config from "../../../config.json";
import PanelAvailaiblityChecker from "./panel_availability_checker";
import { useRecoilState } from "recoil";
import { selected_panel } from "../../../recoils/panels_details.atom";
var confs;
if (process.env.REACT_APP_MILIEU !== "PROD") confs = config.dev;
else confs = config.prod;

export default function SidePanelDetail({ panel }) {
  const [, setPanel] = useRecoilState(selected_panel);
  return (
    <Grid
      container
      alignContent="center"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
      style={{
        padding: 0,
        margin: 0,
      }}
    >
      <Grid item xs={12} sm={12} md={12} xl={12}>
        <div
          style={{
            width: "100%",
            position: "relative",
            height: 350,
            padding: 0,
            overflow: "hidden",
            justifyContent: "center",
          }}
        >
          <img
            src={confs.route.PATH_TO_FILE_MS + panel._id}
            style={{ display: "block", width: "100%" }}
            alt=" "
          />
          <MdChevronLeft
            size={24}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              cursor: "pointer",
            }}
            color="#eb3b5a"
            onClick={() => setPanel({ isShowing: false, panel: null })}
          />
        </div>
      </Grid>

      <Grid item xs={12} sm={12} md={12} xl={12}>
        <Typography gutterBottom variant="subtitle1" component="h2">
          {panel?.title}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} xl={12}>
        <Divider style={{ marginTop: 8, marginBottom: 8 }} />
      </Grid>
      <Grid item xs={2} sm={2} md={2} xl={2} />
      <Grid item xs={8} sm={8} md={8} xl={8}>
        <Grid container>
          <Grid item xs={6} sm={6} md={6} xl={6}>
            <Typography
              gutterBottom
              variant="body1"
              component="p"
              color="textSecondary"
            >
              Pitch :
            </Typography>
          </Grid>

          <Grid item xs={6} sm={6} md={6} xl={6}>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="h2"
              color="textPrimary"
            >
              {panel?.pitch}
            </Typography>
          </Grid>

          <Grid item xs={6} sm={6} md={6} xl={6}>
            <Typography
              gutterBottom
              variant="body1"
              component="p"
              color="textSecondary"
            >
              Hauteur :
            </Typography>
          </Grid>

          <Grid item xs={6} sm={6} md={6} xl={6}>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="h2"
              color="textPrimary"
            >
              {panel?.heigh}
            </Typography>
          </Grid>

          <Grid item xs={6} sm={6} md={6} xl={6}>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="p"
              color="textSecondary"
            >
              Largeur :
            </Typography>
          </Grid>

          <Grid item xs={6} sm={6} md={6} xl={6}>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="h2"
              color="textPrimary"
            >
              {panel?.width}
            </Typography>
          </Grid>

          <Grid item xs={6} sm={6} md={6} xl={6}>
            <Typography
              gutterBottom
              variant="body1"
              component="p"
              color="textSecondary"
            >
              Prix :
            </Typography>
          </Grid>

          <Grid item xs={6} sm={6} md={6} xl={6}>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="h2"
              color="textPrimary"
            >
              {panel?.day_price}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2} sm={2} md={2} xl={2} />

      <Grid item xs={12} sm={12} md={12} xl={12}>
        <PanelAvailaiblityChecker panel={panel} />
      </Grid>
    </Grid>
  );
}
