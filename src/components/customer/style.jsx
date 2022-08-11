import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },

  root: {
    maxWidth: "100%",
    padding: 0,
    flexGrow: 1,
  },

  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },

  img: {
    width: "100%",
    maxHeight: "70vh",
    overflow: "hidden",

  },
}));
