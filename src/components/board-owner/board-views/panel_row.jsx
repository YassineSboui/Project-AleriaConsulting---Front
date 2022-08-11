import {
  TableRow,
  TableCell,
  CircularProgress,
  Collapse,
  Box,
  TableHead,
  TableBody,
  Paper,
  TableContainer,
  Table,
  IconButton,
  Typography,
  Tooltip,
  ButtonGroup,
  Button,
  Grid,
} from "@material-ui/core";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PANEL_BY_ID } from "../../../graphql/queries";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { modal } from "../../../recoils/modal.atom";
import PanelDetail from "./panel_detail";
import {
  MdCancel,
  MdCheck,
  MdCreate,
  MdLibraryAdd,
  MdBusinessCenter,
} from "react-icons/md";
import RequestRow from "../request-views/request_row";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import PanelSchedule from "./panel-schedule";
import { FaRegCalendarAlt } from "react-icons/fa";
import PanelAvailaiblityChecker from "./panel_availability_checker";
import { UPDATE_PANEL } from "../../../graphql/mutation";
import ConfirmationView from "../../util/confirmation_view";
import { useSnackbar } from "../../../context/use-snackbar.hook";
export default function PanelListRow({
  panel,
  isSuperAdminView,
  setView,
  setCompanieId,
}) {
  const snackbar = useSnackbar();
  const [actifProm, setActifProm] = useState(0);
  const [, setModal] = useRecoilState(modal);
  const [open, setOpen] = useState(false);
  const [requests, setResqest] = useState([]);

  const [updatablePanel, setUpdablePanel] = useState({ ...panel });
  const [mutate] = useMutation(UPDATE_PANEL);
  const { loading, refetch } = useQuery(GET_PANEL_BY_ID, {
    variables: { id: panel?._id },
    onCompleted: (value) => {
      if (value?.getPanelById?.requests) {
        const filtred = value?.getPanelById?.requests.filter((element) => {
          if (
            new Date(element?.starting_date).getDate() <=
              new Date().getDate() &&
            new Date(element?.ending_date).getDate() >= new Date().getDate() &&
            element.status === "confirmed"
          ) {
            return element;
          }
          return null;
        });
        setResqest(value?.getPanelById?.requests);
        setActifProm(filtred.length);
      }
    },
  });

  const prepareConfirmationView = (callBack, message) => {
    setModal({
      content: (
        <ConfirmationView
          callback={callBack}
          message={message}
          title="Desactivation/Activation"
          cancelCallback={() => setModal({ content: null, isShowing: false })}
        />
      ),
      isShowing: true,
    });
  };

  const activatePanel = () => {
    delete updatablePanel.__typename;
    updatablePanel.is_active = true;
    setUpdablePanel({ ...updatablePanel });
    runMutation();
  };

  const desactivatePanel = () => {
    delete updatablePanel.__typename;
    updatablePanel.is_active = false;
    setUpdablePanel({ ...updatablePanel });
    runMutation();
  };

  const runMutation = () => {
    mutate({ variables: { panel_update: updatablePanel } })
      .then((value) => {
        setModal({ content: null, isShowing: false });
        refetch();
      })
      .catch((error) => {
        console.log(error);
        snackbar.error("Erreur interne veuillez contacter l'équipe de support");
      });
  };

  const showCalendarModal = () => {
    if (requests) {
      setModal({
        isShowing: true,
        content: (
          <PanelSchedule
            requests={requests ? requests : []}
            refetch={refetch}
            setModal={setModal}
          />
        ),
      });
    } else {
      refetch();
    }
  };
  const addRequest = () => {
    setModal({
      isShowing: true,
      content: (
        <>
          <Grid md={3} xl={4} />
          <Grid item xs={12} sm={12} md={6} xl={4}>
            <PanelAvailaiblityChecker panel={panel} isPanelRow={true} />
          </Grid>

          <Grid md={3} xl={4} />
        </>
      ),
    });
  };

  return (
    <>
      <TableRow key={panel._id}>
        {isSuperAdminView ? null : (
          <TableCell>
            <Tooltip title="Promitions">
              {open ? (
                <IconButton onClick={() => setOpen(false)}>
                  <MdExpandLess />
                </IconButton>
              ) : (
                <IconButton onClick={() => setOpen(true)}>
                  <MdExpandMore />
                </IconButton>
              )}
            </Tooltip>
          </TableCell>
        )}
        <TableCell> {panel.title} </TableCell>
        <TableCell>{panel.heigh + " X " + panel.width}</TableCell>
        <TableCell> {panel.pitch} </TableCell>
        <TableCell> {panel.day_price} </TableCell>
        <TableCell> {panel.address} </TableCell>
        <TableCell>
          {loading ? (
            <CircularProgress
              size={24}
              color="secondary"
              style={{ marginLeft: "20%" }}
            />
          ) : (
            <>
              <Typography
                component="p"
                variant="subtitle1"
                style={{ display: "inline-block" }}
                color="textPrimary"
              >
                {actifProm}
              </Typography>
              <Typography
                component="p"
                variant="subtitle1"
                style={{ display: "inline-block" }}
                color="textSecondary"
              >
                {"/" + panel.maximum_actif_promotion_at_once}
              </Typography>
            </>
          )}
        </TableCell>

        <TableCell>
          <ButtonGroup variant="contained">
            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <Tooltip aria-label="Calendrier" title="Calendrier">
                <Button color="primary">
                  <FaRegCalendarAlt size={24} onClick={showCalendarModal} />
                </Button>
              </Tooltip>
            )}

            <Tooltip
              aria-label="Ajouter une requête"
              title="Ajouter une demande de promotion"
            >
              <Button color="primary">
                <MdLibraryAdd size={24} onClick={addRequest} />
              </Button>
            </Tooltip>

            <Tooltip aria-label="Modifier" title="Modifier les informations">
              <Button color="primary">
                <MdCreate
                  size={24}
                  className="cursor-pointer"
                  onClick={() => {
                    setModal({
                      isShowing: true,
                      content: <PanelDetail panel_id={panel._id} />,
                    });
                  }}
                />
              </Button>
            </Tooltip>

            {isSuperAdminView ? (
              <Tooltip title="Afficher les détail de la company">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    setCompanieId(panel?.company_id);
                    setView(4);
                  }}
                >
                  <MdBusinessCenter size={24} />
                </Button>
              </Tooltip>
            ) : null}
            {isSuperAdminView ? (
              <Tooltip title="désactiver/activer">
                <Button
                  variant="contained"
                  onClick={
                    panel?.is_active
                      ? () =>
                          prepareConfirmationView(
                            desactivatePanel,
                            "Êtes-vous sur de vouloir désactiver ce panneau ? "
                          )
                      : () =>
                          prepareConfirmationView(
                            activatePanel,
                            "Êtes-vous sur de vouloir activer ce panneau ? "
                          )
                  }
                  color={panel?.is_active ? "secondary" : "primary"}
                >
                  {panel?.is_active ? (
                    <MdCancel size={24} />
                  ) : (
                    <MdCheck size={24} />
                  )}
                </Button>
              </Tooltip>
            ) : null}
          </ButtonGroup>
        </TableCell>
      </TableRow>
      {isSuperAdminView ? null : (
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <TableRow>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={2}>
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableCell> Revenue prévue en DT </TableCell>
                      <TableCell> Nom </TableCell>
                      <TableCell> Société </TableCell>
                      <TableCell> Message</TableCell>
                      <TableCell> Date dépôt </TableCell>
                      <TableCell> Date début/fin</TableCell>
                      <TableCell> Status</TableCell>
                    </TableHead>
                    <TableBody>
                      {requests.map((element) => {
                        return <RequestRow request={element} isfull={false} />;
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Collapse>
          </TableRow>
        </TableCell>
      )}
    </>
  );
}
