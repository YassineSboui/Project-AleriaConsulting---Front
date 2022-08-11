import {
  Grid,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Fab,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CHECK_PANEL_AVAILABILITY } from "../../../graphql/mutation";
import { MdWarning } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { modal } from "../../../recoils/modal.atom";
import OverlayPanel from "../../util/modal";
import { useRecoilState } from "recoil";
import RequestForm from "../request-views/request_form";
import { useSnackbar } from "../../../context/use-snackbar.hook";
import { GET_PANEL_BY_ID } from "../../../graphql/queries";
import Calendar from "../../util/calendar";
import MyDatePicker from "../../util/date-picker";

export default function PanelAvailaiblityChecker({ panel, isPanelRow }) {
  const {
    data: panel_data,
    loading: panel_detail_loading,
    error,
    refetch,
  } = useQuery(GET_PANEL_BY_ID, {
    variables: { id: panel._id },
  });
  const [selectedPanel, setSelectedPanel] = useState({ ...panel });
  const [starting_date, setStartingState] = useState(null);
  const [ending_date, setEndingDate] = useState(null);
  const [request, setRequest] = useState(null);
  const [mutate, { data }] = useMutation(CHECK_PANEL_AVAILABILITY);
  const [, setModal] = useRecoilState(modal);
  const snackbar = useSnackbar();

  const showCalendarModal = () => {
    if (panel_data?.getPanelById?.requests) {
      const request = panel_data?.getPanelById?.requests.filter(
        (element) => element.status === "confirmed"
      );
      setModal({
        isShowing: true,
        content: (
          <Calendar Requests={request} hideDetail={true} setModal={setModal} />
        ),
      });
    } else {
      console.log(error);
      refetch();
      snackbar.error(
        "Echec de chargement des données du panneau, veuillez rafraichir la page"
      );
    }
  };

  useEffect(() => {
    if (starting_date && ending_date) {
      delete selectedPanel.__typename;
      setSelectedPanel({ ...selectedPanel });

      mutate({
        variables: {
          panel_update: selectedPanel,
          ending_date: ending_date,
          starting_date: starting_date,
        },
      })
        .then((value) => {
          if (value?.data?.checkPanelAvailability !== null) {
            setRequest(value?.data?.checkPanelAvailability);
          }
        })
        .catch((erro) => console.log(erro));
    } else {
      snackbar.error("Les dates choisies sont incohérentes");
    }
  }, [starting_date, ending_date]);

  return (
    <Card style={{ margin: "auto" }}>
      <CardContent>
        <Grid
          container
          spacing={4}
          alignContent="center"
          justifyContent="center"
        >
          <Grid item xs={10} sm={10} md={10} xl={10}>
            <Typography variant="h6" component="p">
              Outil de disponibilité
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} xl={2}>
            {panel_detail_loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <Fab size="small" color="secondary">
                <FaRegCalendarAlt size={24} onClick={showCalendarModal} />
              </Fab>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={6} xl={6}>
            <MyDatePicker
              label="Date début"
              defaultValue={starting_date}
              setDate={setStartingState}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} xl={6}>
            <MyDatePicker
              label="Date fin"
              defaultValue={ending_date}
              setDate={setEndingDate}
            />
          </Grid>
          {panel_detail_loading ? (
            <>
              <Grid item xs={4} sm={4} md={4} xl={4} />
              <Grid>
                <CircularProgress color="secondary" />
              </Grid>
              <Grid item xs={4} sm={4} md={4} xl={4} />
            </>
          ) : null}
          {data?.checkPanelAvailability ? (
            <>
              <Grid item xs={6} sm={6} md={6} xl={6}>
                <Typography variant="subtitle1" color="textSecondary">
                  Prix
                </Typography>
              </Grid>

              <Grid item xs={4} sm={4} md={4} xl={4}>
                <Typography> {request?.total_price} </Typography>
              </Grid>

              <Grid item xs={2} sm={2} md={2} xl={2}>
                <Typography variant="subtitle1" color="textSecondary">
                  TND
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={12} xl={12} style={{ margin: 8 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={starting_date > ending_date}
                  onClick={() => {
                    setModal({
                      isShowing: true,
                      content: (
                        <RequestForm
                          request={request}
                          panel={panel}
                          setModal={setModal}
                        />
                      ),
                    });
                  }}
                >
                  Réserver
                </Button>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={2} sm={2} md={2} xl={2}>
                <MdWarning size={24} color={"#c0392b"} />
              </Grid>
              <Grid item xs={10} sm={10} md={10} xl={10}>
                <Typography variant="subtitle1" color="secondary">
                  Les dates choisies sont indisponibles
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
        {isPanelRow ? null : <OverlayPanel />}
      </CardContent>
    </Card>
  );
}
