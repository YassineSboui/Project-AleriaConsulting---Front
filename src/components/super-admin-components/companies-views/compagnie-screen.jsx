import {
  Divider,
  Grid,
  Paper,
  ListItem,
  List,
  ListItemText,
  ListItemAvatar,
  Typography,
} from "@material-ui/core";
import { useQuery } from "@apollo/client";
import {
  GET_PANEL_BY_COMPANY_ID,
  GET_REQUEST_BY_COMPANY_ID,
  GET_USERS_BY_COMPANY_ID,
  GET_COMPANY_BY_ID,
} from "../../../graphql/queries";
import {
  MdAccountCircle,
  MdSatellite,
  MdFolderShared,
  MdAttachMoney,
} from "react-icons/md";
import GlobalViewRow from "./global-view-row";
import { useEffect, useState } from "react";
import UserPanelDetail from "../users-management-views/user-panel-detail";
import { convertDateToLocalDateFrench } from "../../util/date_fonrmater";

export default function CompanieScreen({ companie_id, setTitle }) {
  const [selectedUser, setselectedUser] = useState(null);
  const [totalAds, setTotalAds] = useState(0);
  const [income, setIncome] = useState(0);
  const [mail, setMail] = useState("");

  const { data: companyData } = useQuery(GET_COMPANY_BY_ID, {
    variables: { id: companie_id },
    onCompleted: (value) => {
      setTitle("Companie : " + value?.getCompanyByID?.[0].name);

      setMail(value?.getCompanyByID?.[0].e_mail);
    },
  });
  const { data: usersData, error: userError } = useQuery(
    GET_USERS_BY_COMPANY_ID,
    { variables: { id: companie_id } }
  );
  const { data: requestData } = useQuery(GET_REQUEST_BY_COMPANY_ID, {
    variables: { id: companie_id },
  });
  const { data: panelsData } = useQuery(GET_PANEL_BY_COMPANY_ID, {
    variables: { id: companie_id },
  });

  useEffect(() => {
    var incom = 0;
    var ads = 0;
    if (requestData?.findRequestByCompanyId) {
      requestData?.findRequestByCompanyId?.forEach((element) => {
        if (element.status === "confirmed") {
          incom += parseFloat(element.total_price);
          ads += 1;
        }
      });
      setIncome(incom);
      setTotalAds(ads);
    }
  }, [requestData]);

  return (
    <Grid
      container
      spacing={3}
      alignContent="flex-start"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Grid item xs={4} sm={4} xl={2} md={2}>
        <Typography variant="body1" color="textSecondary">
          email de contact
        </Typography>
      </Grid>

      <Grid item xs={4} sm={4} xl={10} md={10}>
        <Typography>{mail} </Typography>
      </Grid>
      <Grid
        container
        spacing={1}
        alignContent="center"
        justifyContent="center"
        alignItems="center"
      >
        <GlobalViewRow
          icon={<MdAccountCircle size={40} color="#3867d6" />}
          title={"Employé(e)s"}
          key={1}
          number={usersData?.getUserByCompanyId?.length}
        />

        <GlobalViewRow
          icon={<MdSatellite size={40} color="#a55eea" />}
          title={"Panneaux"}
          key={2}
          number={panelsData?.getPanelByCompanyID?.length}
        />

        <GlobalViewRow
          icon={<MdFolderShared size={40} color="#f7b731" />}
          title={"Annonces"}
          key={3}
          number={totalAds}
        />

        <GlobalViewRow
          icon={<MdAttachMoney size={40} color="#20bf6b" />}
          title={"Revenu"}
          key={4}
          number={income}
        />
      </Grid>
      <Grid item xs={12} md={12} sm={12} xl={12}>
        <Divider />
        <Divider />
        <Divider />
      </Grid>
      <Grid item xs={12} sm={12} md={5} sm={5} style={{ minHeight: 320 }}>
        <Typography variant="subtitle1" color="textSecondary">
          Liste du personnel
        </Typography>
        <Paper style={{ padding: "1%" }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} sm={12}>
              <div
                style={{
                  position: "sticky",
                  height: "50vh",
                  maxHeight: 400,
                  overflowY: "auto",
                }}
              >
                <List>
                  {usersData?.getUserByCompanyId?.map((element, index) => {
                    return (
                      <ListItem button onClick={() => setselectedUser(element)}>
                        <ListItemAvatar>
                          <MdAccountCircle size={64} color="#3867d6" />
                        </ListItemAvatar>
                        <ListItemText
                          style={{ marginLeft: "1%" }}
                          primary={
                            element?.first_name + "  " + element?.last_name
                          }
                          secondary={convertDateToLocalDateFrench(
                            element?.created_at
                          )}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={12} md={5} sm={5} style={{ minHeight: 320 }}>
        <Typography variant="subtitle1" color="textSecondary">
          information de l'utilisateur sélectionné
        </Typography>
        <Paper style={{ padding: "1%" }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <UserPanelDetail user={selectedUser} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
