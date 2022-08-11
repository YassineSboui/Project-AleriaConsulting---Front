import {
  Typography,
  TableRow,
  TableCell,
  ButtonGroup,
  Button,
  Tooltip,
} from "@material-ui/core";
import { convertDateToLocalDateFrench } from "../../util/date_fonrmater";
import { MdCreate, MdCheck, MdCancel, MdBusinessCenter } from "react-icons/md";
import { modal } from "../../../recoils/modal.atom";
import { useRecoilState } from "recoil";
import UserInfoPanel from "../../board-owner/users-admin-management/user-info-panel";
import ConfirmationView from "../../util/confirmation_view";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../graphql/mutation";
import { useEffect, useState } from "react";
import { useSnackbar } from "../../../context/use-snackbar.hook";

export default function UserCardRow({ user, refetch, setView, setCompanieId }) {
  const snackbar = useSnackbar();
  const [, setModal] = useRecoilState(modal);
  const [mutate] = useMutation(UPDATE_USER);
  const [userUpdatable, setUserUpdateble] = useState({ ...user });

  useEffect(() => {
    if (userUpdatable.__typename && userUpdatable.created_at) {
      delete userUpdatable.__typename;
      delete userUpdatable.created_at;
    }
  }, [userUpdatable]);

  const banUserAccount = () => {
    userUpdatable.is_enabled = false;
    setUserUpdateble({ ...userUpdatable });
    runMutation();
  };

  const debanAccount = () => {
    userUpdatable.is_enabled = true;
    setUserUpdateble({ ...userUpdatable });
    runMutation();
  };

  const runMutation = () => {
    mutate({ variables: { user_id: user?._id, user: userUpdatable } })
      .then((value) => {
        snackbar.success("Modification effectué avec succes ");
        setModal({ content: null, isShowing: false });
        refetch();
      })
      .catch((error) => {
        console.log(error);
        snackbar.error(
          "Erreur interne veuillez contacter sofiane the heckerman"
        );
        setModal({ content: null, isShowing: false });
      });
  };

  const prepareConfimartionView = (callback, message) => {
    setModal({
      content: (
        <ConfirmationView
          callback={callback}
          cancelCallback={() => setModal({ content: null, isShowing: false })}
          title={"Banissement/ rétablissement de compte"}
          message={message}
        />
      ),
      isShowing: true,
    });
  };

  return (
    <TableRow>
      <TableCell> {user?.first_name + " " + user?.last_name}</TableCell>
      <TableCell>{user?.e_mail} </TableCell>
      <TableCell>{user?.phone_num} </TableCell>
      <TableCell>{convertDateToLocalDateFrench(user?.birth_date)} </TableCell>
      <TableCell>{convertDateToLocalDateFrench(user?.created_at)} </TableCell>
      <TableCell>
        <Button
          onClick={() => {
            setCompanieId(user?.company_id);
            setView(4);
          }}
          variant="text"
          color="primary"
        >
          {user?.company?.name}
        </Button>
      </TableCell>
      <TableCell>
        <ButtonGroup variant="contained" color="inherit">
          <Tooltip title="Modifier les infos du comptes">
            <Button
              color="primary"
              onClick={() =>
                setModal({
                  content: (
                    <UserInfoPanel
                      isLoggedUser={false}
                      user={user}
                      setModal={setModal}
                    />
                  ),
                  isShowing: true,
                })
              }
            >
              <MdCreate size={24} />
            </Button>
          </Tooltip>

          <Tooltip title="Bannir restaurer compte">
            <Button
              color={user?.is_enabled ? "secondary" : "primary"}
              onClick={
                user?.is_enabled
                  ? () =>
                      prepareConfimartionView(
                        banUserAccount,
                        "Êtes-vous sur de vouloir bannir ce compte ?"
                      )
                  : () =>
                      prepareConfimartionView(
                        debanAccount,
                        "Êtes-vous sur de vouloir rétablir ce compte ?"
                      )
              }
            >
              {user?.is_enabled ? (
                <MdCancel size={24} />
              ) : (
                <MdCheck size={24} />
              )}
            </Button>
          </Tooltip>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
}
