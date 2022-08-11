import React from "react";
import { Grid } from "@material-ui/core";
import MapFragment from "../../components/map/map";
import { useRecoilValue } from "recoil";
import { selected_panel } from "../../recoils/panels_details.atom";
import { GET_ALL_PANELS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import SidePanelDetail from "../../components/board-owner/board-views/side_panel_detail";
import CustomerToolbar from "../../components/customer/toolbar";
import { useHistory } from "react-router-dom";

export default function Home() {
  const panel_detail = useRecoilValue(selected_panel);
  const { data } = useQuery(GET_ALL_PANELS);
  const history = useHistory();
  return (
    <>
      <CustomerToolbar history={history} />
      <Grid container style={{ position: "fixed", maxHeight: "100vh" }}>
        {panel_detail.isShowing ? (
          <Grid
            item
            xs={4}
            md={4}
            sm={4}
            xl={4}
            style={{
              overflowY: "scroll",
              height: "100vh",
              paddingBottom: "10%",
            }}
          >
            <Grid container spacing={2} justifyContent="space-between">
              <Grid item xs={12} md={12} sm={12} xl={12}>
                <SidePanelDetail panel={panel_detail.panel} />
              </Grid>
            </Grid>
          </Grid>
        ) : null}
        <Grid
          item
          xs={panel_detail.isShowing ? 8 : 12}
          md={panel_detail.isShowing ? 8 : 12}
          sm={panel_detail.isShowing ? 8 : 12}
          xl={panel_detail.isShowing ? 8 : 12}
        >
          <MapFragment
            conf={{ customer_view: true }}
            panels={data ? data?.getAllPanels : []}
          />
        </Grid>
      </Grid>
    </>
  );
}
