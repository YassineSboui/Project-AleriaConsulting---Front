import { useHistory } from "react-router";
import CustomerToolbar from "../../components/customer/toolbar";
import { Grid, Typography, Link } from "@material-ui/core";
import { MdChevronLeft } from "react-icons/md";
import { useState } from "react";
import MapFragment from "../../components/map/map";
import { Helmet } from "react-helmet";
const isNotHovered = {
  marginLeft: 10,
  alignSelf: "center",
  zIndex: 2,
  flex: 1,
  paddingLeft: 5,
  display: "flex",
  justifyItems: "center",
  alignItems: "center",
  width: 40,
  maxWidth: 40,
  position: "fixed",
  backgroundColor: "#3498db",
  borderTopLeftRadius: 30,
  borderBottomLeftRadius: 30,
  height: 50,
  justifySelf: "left",
  cursor: "pointer",
};

const isHover = {
  transform: "translate(-30px, 0)",
  marginLeft: 10,
  alignSelf: "center",
  zIndex: 2,
  flex: 1,
  paddingLeft: 5,
  display: "flex",
  justifyItems: "center",
  alignItems: "center",
  width: 70,
  maxWidth: 70,
  position: "fixed",
  backgroundColor: "#3498db",
  borderTopLeftRadius: 30,
  borderBottomLeftRadius: 30,
  height: 60,
  justifySelf: "left",
  cursor: "pointer",
};

export default function IntroductionScreen() {
  const history = useHistory();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Grid
      container
      spacing={0}
      justifyContent="space-between"
      style={{ overflow: "hidden" }}
    >
      <Helmet>
        <title> Page accueil </title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <Grid item xs={12} sm={12} xl={12} md={12}>
        <CustomerToolbar history={history} />
      </Grid>
      <Grid
        item
        xs={4}
        sm={4}
        md={4}
        xl={4}
        style={{ zIndex: "-3", marginTop: 32 }}
      >
        <Grid container spacing={2} style={{ height: "100%", padding: 0 }}>
          <Grid item xs={12} sm={12} md={12} xl={12}>
            <Typography variant="h6" component="h1">
              Qu'est ce que nom de l'application
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={12} xl={12}>
            <Typography variant="body1" component="p">
              Ceci sera la description de l'application. Une fois fournie je
              changerai le texte que vous êtes entrain de lire vers le text qui
              m'aura ^été communiqué d'ici là je n'ai aucune idée de quoi écrire
              ici alors je me conntent d'entrer ce dummy text pour tester
              l'affichage finale de la description qui me sera communiquer la
              suite
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={12} xl={12}>
            <Typography variant="subtitle1" component="h2">
              Mode d'emploie
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={12} xl={12}>
            <Typography variant="body1" component="p">
              1) sélèctionner un marqueur sur la carte
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} xl={12}>
            <Typography variant="body1" component="p">
              2) Cliquer sur le pop-up qui va s'afficher
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} xl={12}>
            <Typography variant="body1" component="p">
              3) Choisir les dates de début et de fin de votre promotions
              désirer
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} xl={12}>
            <Typography variant="body1" component="p">
              4) Si les dates sont disponibles vous pouvez passer commande en
              cliquant sur le boutton qui s'affichera
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            xl={12}
            style={{ alignSelf: "flex-end" }}
          >
            <div
              style={{
                backgroundColor: "#3498db",
                height: 50,
                zIndex: 10,
                width: "100vh",
                justifyContent: "flex-start",
                alignContent: "flex-start",
                display: "flex",
              }}
            >
              <Link
                style={{ color: "white", flex: 1, alignSelf: "center" }}
                href="https://aleriaconsulting.eu/"
                underline="hover"
              >
                AleriaConsulting.eu
              </Link>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8} sm={8} md={8} xl={8}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "flex-start",
            height: "100vh",
          }}
        >
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={isHovered ? isHover : isNotHovered}
            onClick={() => history.push("/home")}
          >
            <MdChevronLeft color="white" size={32} />
          </div>
          <div
            style={{
              display: "flex",
              margin: 0,
              right: 0,
              position: "fixed",
              width: "52vw",
              height: "100vh",
              borderTopLeftRadius: "50%",
              overflow: "hidden",
              zIndex: -1,
              justifySelf: "flex-end",
              alignSelf: "flex-end",
              flex: 0.5,
              boxShadow: "0 10px 20px #888888",
              transform: "scale(1.4)",
              borderBottomLeftRadius: "50%",
            }}
          >
            <div style={{ width: "100%" }}>
              <MapFragment conf={{ customer_view: true }} />
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
/*

<img
              src={window.location.origin + "/map-image-for-preview.PNG"}
              style={{
                height: "auto",
                width: "100%",
              }}
              alt="map-image-for-preview.PNG"
            />
            */
