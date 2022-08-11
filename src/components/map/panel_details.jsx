import { Typography } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { selected_panel } from "../../recoils/panels_details.atom";
import config from "../../config.json";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

var confs;
if (process.env.REACT_APP_MILIEU !== "PROD") confs = config.dev;
else confs = config.prod;

export default function PanelDetails({ pannel, conf }) {
  const [, setSelectedPanel] = useRecoilState(selected_panel);

  return (
    <>
      <CardActionArea
        onClick={() => setSelectedPanel({ isShowing: true, panel: pannel })}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div style={{ width: 250, height: 160, overflow: "hidden" }}>
          <img
            alt=""
            style={{ width: "100%", height: "auto", alignSelf: "center" }}
            src={confs.route.PATH_TO_FILE_MS + pannel._id}
          />
        </div>
        <CardContent>
          <Typography component="b" variant="h6" color="textPrimary">
            {pannel?.day_price + " "}
          </Typography>
          <Typography component="b" color="textSecondary">
            TND H.T / jour
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Dimmensions : {pannel?.heigh} X {pannel?.width}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            Pitch : {pannel?.pitch}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          ></Typography>
        </CardContent>
      </CardActionArea>
    </>
  );
}
