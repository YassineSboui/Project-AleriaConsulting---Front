import {List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
  IconButton,
} from "@material-ui/core";
import {
  MdExpandLess,
  MdExpandMore,
  MdAccountCircle,
  MdSatellite,
  MdFolderShared,
} from "react-icons/md";
import { useState } from "react";
export default function CompanyRow({ company, changeView, setCompanieID }) {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={company.name} secondary={company?.e_mail} />
        <ListItemIcon>
          {open ? (
            <IconButton color="primary">
              <MdExpandLess size={24} />
            </IconButton>
          ) : (
            <IconButton color="primary">
              <MdExpandMore size={24} />
            </IconButton>
          )}
        </ListItemIcon>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          style={{ backgroundColor: "#ecf0f1" }}
        >
          <ListItem
            button
            onClick={() => {
              changeView(3);
              setCompanieID(company._id);
            }}
          >
            <ListItemIcon>
              <MdAccountCircle size={24} color="#44bd32" />
            </ListItemIcon>

            <ListItemText primary="Personel" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              changeView(1);
              setCompanieID(company._id);
            }}
          >
            <ListItemIcon>
              <MdSatellite size={24} color="#e1b12c" />
            </ListItemIcon>
            <ListItemText primary="Panneaux" />
          </ListItem>

          <ListItem
            button
            onClick={() => {
              changeView(2);
              setCompanieID(company._id);
            }}
          >
            <ListItemIcon>
              <MdFolderShared size={24} color="#0097e6" />
            </ListItemIcon>
            <ListItemText primary="Requêtes" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}
