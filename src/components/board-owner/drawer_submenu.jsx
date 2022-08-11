import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import { Tooltip } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Submenu({ items, expand }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Collapse in={expand} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items?.map((element, index) => {
            return (
              <Tooltip key={index++} title={element?.title}>
                <ListItem
                  key={index++}
                  button
                  className={classes.nested}
                  onClick={element.action}
                >
                  <ListItemIcon> {element?.icons}</ListItemIcon>
                  <ListItemText primary={element?.title} />
                </ListItem>
              </Tooltip>
            );
          })}
        </List>
      </Collapse>
    </div>
  );
}
