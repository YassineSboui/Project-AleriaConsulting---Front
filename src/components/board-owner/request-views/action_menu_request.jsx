import { MdMenu } from "react-icons/md";
import { Menu, MenuItem } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CHECK_PANEL_AVAILABILITY } from "../../../graphql/mutation";
import { GET_PANEL_BY_ID } from "../../../graphql/queries";
import { useSnackbar } from "../../../context/use-snackbar.hook";
export default function MenuAction({ request, cancelRequest, confirmRequest }) {
  const snackbar = useSnackbar();
  const [anchorEl, setAnchorEl] = useState(null);
  const [panel, setPanel] = useState(null);
  useQuery(GET_PANEL_BY_ID, {
    variables: { id: request?.panel_id },
    onCompleted: (data) => {
      if (data?.getPanelById) {
        setPanel({ ...data?.getPanelById });
      }
    },
  });
  const [confirmEnabled, setConfirmEnabled] = useState(true);
  const [runMutation] = useMutation(CHECK_PANEL_AVAILABILITY);

  useEffect(() => {
    if (panel) {
      delete panel.__typename;
      delete panel.requests;
      runMutation({
        variables: {
          panel_update: panel,
          ending_date: request?.ending_date,
          starting_date: request?.starting_date,
        },
      })
        .then((value) => {
          if (value?.data?.checkPanelAvailability != null) {
            setConfirmEnabled(true);
          } else setConfirmEnabled(false);
        })
        .catch((error) => {
          console.log(error);
          snackbar.error(
            "Erreur interne veuillez contacter l'équipe de support"
          );
        });
    }
  }, [panel]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <MdMenu
        size={32}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => cancelRequest(request)}
          disabled={
            request?.status === "confirmed" || request?.status === "refused"
          }
        >
          Refuser
        </MenuItem>
        <MenuItem
          onClick={() => confirmRequest(request)}
          disabled={
            request?.status === "refused" ||
            request?.status === "confirmed" ||
            !confirmEnabled
          }
        >
          Confirmer
        </MenuItem>
      </Menu>
    </>
  );
}
