import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
} from "@material-ui/core";
import { useState } from "react";
import {
  MdDeleteForever,
  MdAccountCircle,
  MdAssignmentInd,
} from "react-icons/md";
import { useRecoilState } from "recoil";
import { modal } from "../../../recoils/modal.atom";
import UserInfoPanel from "./user-info-panel";

export default function UserRow({ user }) {
  const [open, setOpen] = useState(false);
  const [, setModal] = useRecoilState(modal);
  return (
    <>
      <ListItem button>
        <ListItemIcon>
          <MdAccountCircle size={32} />
        </ListItemIcon>
        <ListItemText
          onClick={() => setOpen(!open)}
          primary={user?.first_name + " " + user?.last_name}
          secondary={user?.role}
        />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            style={{ marginLeft: "4%" }}
            onClick={() =>
              setModal({
                content: (
                  <UserInfoPanel user_id={user._id} user={user} setModal={setModal} />
                ),
                isShowing: true,
              })
            }
          >
            <ListItemIcon>
              <MdAssignmentInd size={24} />
            </ListItemIcon>
            <ListItemText primary="Détail" />
          </ListItem>

          <ListItem button style={{ marginLeft: "4%" }}>
            <ListItemIcon>
              <MdDeleteForever size={24} />
            </ListItemIcon>
            <ListItemText primary="Supprimer" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}
