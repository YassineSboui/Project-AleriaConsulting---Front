import { Grid, Typography } from "@material-ui/core";
import GlobalViewRow from "./companies-views/global-view-row";
import {
  MdAccountCircle,
  MdMonetizationOn,
  MdSatellite,
  MdFolderShared,
} from "react-icons/md";
import { useQuery } from "@apollo/client";
import {
  PAGINATE_USERS,
  GET_TOTAL_INCOM_AND_ACCEPTED_REQUEST,
  GET_ALL_PANELS,
} from "../../graphql/queries";

import AcceptedRequestTable from "./requests-views/request-table-view";

export default function Dashboard() {
  const { data: totalIncomAndDataAccetped } = useQuery(
    GET_TOTAL_INCOM_AND_ACCEPTED_REQUEST
  );
  const { data: paginateUser } = useQuery(PAGINATE_USERS, {
    variables: { pageSize: 1, query: "" },
  });
  const { data: getRegistredPanels } = useQuery(GET_ALL_PANELS);
  return (
    <Grid
      container
      spacing={2}
      alignContent="center"
      alignItems="center"
      justifyContent="center"
    >
      <GlobalViewRow
        number={paginateUser?.queryUsers?.size}
        title="Utilisateurs"
        icon={<MdAccountCircle size={40} color="#3867d6" />}
      />

      <GlobalViewRow
        number={parseFloat(
          totalIncomAndDataAccetped?.getRequestsTotalMoneyAndNumbers?.income
        ).toFixed(3)}
        title="Revenue"
        icon={<MdMonetizationOn size={40} color="#20bf6b" />}
      />

      <GlobalViewRow
        number={
          totalIncomAndDataAccetped?.getRequestsTotalMoneyAndNumbers?.totalAds
        }
        title="Annonces actives"
        icon={<MdFolderShared size={40} color="#f7b731" />}
      />

      <GlobalViewRow
        number={getRegistredPanels?.getAllPanels?.length}
        title="Panneaux"
        icon={<MdSatellite size={40} color="#a55eea" />}
      />
      <Grid item xs={12} sm={12} md={12} xl={12}>
        <Typography variant="h6"> Derniéres requêtes </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} xl={12}>
        <AcceptedRequestTable />
      </Grid>
    </Grid>
  );
}
