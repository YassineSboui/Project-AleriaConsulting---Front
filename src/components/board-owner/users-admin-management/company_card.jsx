import { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  List,
  Typography,
  CircularProgress,
  Divider,
  IconButton,
  TextField,
  AccordionSummary,
  AccordionDetails,
  Accordion,
} from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_COMPANY_BY_ID,
  GET_USERS_BY_COMPANY_ID,
} from "../../../graphql/queries";
import {
  MdCreate,
  MdExpandMore,
  MdAddCircle,
  MdSave,
  MdCancel,
} from "react-icons/md";
import UserRow from "./user-row";
import OverlayPanel from "../../util/modal";
import { useRecoilState } from "recoil";
import { modal } from "../../../recoils/modal.atom";
import UserForm from "./users-form";
import { useAuth } from "../../../context/use-auth.hook";
import { UPDATE_COMPANY } from "../../../graphql/mutation";
import { useSnackbar } from "../../../context/use-snackbar.hook";

export default function CompanyCard({ company_id }) {
  const snackbar = useSnackbar();
  const [, setModal] = useRecoilState(modal);
  const { sessionData } = useAuth();
  const [editable, setEditable] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const isAdmin = sessionData?.user?.role !== "admin";
  const { data, loading } = useQuery(GET_COMPANY_BY_ID, {
    variables: { id: company_id },
  });
  const { data: usersDate, error: usersError } = useQuery(
    GET_USERS_BY_COMPANY_ID,
    { variables: { id: company_id } }
  );

  const [company, setCompany] = useState();
  const [mutate, { loading: mutaitonLoading }] = useMutation(UPDATE_COMPANY);

  const persistCompanyUpdate = () => {
    delete company.__typename;
    mutate({
      variables: { company_update: company },
      refetchQueries: [
        { query: GET_COMPANY_BY_ID, variables: { id: company_id } },
      ],
      awaitRefetchQueries: true,
    })
      .catch((error) => {
        snackbar.error("Erreur interne veuillez essayer plus tard");
        console.log(error);
      })
      .then((value) => {
        setEditable(!editable);
        snackbar.success("Mise à jour effectuée avec succès");
      });
  };

  useEffect(() => {
    if (data?.getCompanyByID[0]) setCompany(data?.getCompanyByID[0]);
  }, [data]);

  if (usersError) console.log(usersError);

  return (
    <Paper style={{ margin: "2%", padding: "2%" }}>
      <Grid container spacing={1}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Grid item xs={10} sm={10} md={10} xl={10}>
              {editable ? (
                <Typography variant="h6">
                  {data?.getCompanyByID[0]?.name}
                </Typography>
              ) : (
                <TextField
                  label="Nom de la company"
                  onChange={(e) => {
                    company.name = e.target.value;
                    setCompany({ ...company });
                  }}
                  defaultValue={data?.getCompanyByID[0]?.name}
                />
              )}
            </Grid>
            <Grid item xs={1} sm={1} md={1} xl={1}>
              {mutaitonLoading ? (
                <CircularProgress color="primary" />
              ) : (
                <IconButton
                  color="primary"
                  disabled={isAdmin}
                  onClick={
                    editable
                      ? () => setEditable(!editable)
                      : persistCompanyUpdate
                  }
                >
                  {editable ? <MdCreate size={24} /> : <MdSave size={24} />}
                </IconButton>
              )}
            </Grid>

            <Grid item xs={1} sm={1} md={1} xl={1}>
              {!editable ? (
                <IconButton
                  color="secondary"
                  disabled={isAdmin}
                  onClick={() => setEditable(!editable)}
                >
                  <MdCancel size={24} />
                </IconButton>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Divider style={{ marginTop: "2%", marginBottom: "2%" }} />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              xl={6}
              style={{ marginTop: "2%", marginBottom: "2%" }}
            >
              <TextField
                label="Address mail"
                defaultValue={data?.getCompanyByID[0]?.e_mail}
                disabled={editable}
                onChange={(e) => {
                  company.e_mail = e.target.value;
                  setCompany({ ...company });
                }}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              xl={6}
              style={{ marginTop: "2%", marginBottom: "2%" }}
            >
              <TextField
                label="Numéro de télèphone"
                defaultValue={data?.getCompanyByID[0]?.phone}
                disabled={editable}
                variant="outlined"
                onChange={(e) => {
                  company.phone = e.target.value;
                  setCompany({ ...company });
                }}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={12} xl={12} md={12}>
              <Typography variant="h6">Liste du personnel</Typography>

              {!isAdmin ? (
                <IconButton
                  onClick={() =>
                    setModal({
                      isShowing: true,
                      content: (
                        <UserForm company_id={company_id} setModal={setModal} />
                      ),
                    })
                  }
                >
                  <MdAddCircle size={24} color="#00C853" />
                  <Typography
                    style={{ marginLeft: 8 }}
                    variant="subtitle1"
                    color="textPrimary"
                  >
                    Ajouter un employé
                  </Typography>
                </IconButton>
              ) : null}
              <List style={{ width: "100%", flex: 2 }}>
                {usersDate?.getUserByCompanyId
                  ? usersDate?.getUserByCompanyId.map((element, index) => {
                      return <UserRow user={element} key={index++} />;
                    })
                  : null}
              </List>
            </Grid>
          </>
        )}
        <OverlayPanel />
      </Grid>
    </Paper>
  );
}
