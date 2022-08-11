import React, { useState } from "react";
import mapboxgl from "mapbox-gl";
import ReactMapGL from "react-map-gl";
import { dev } from "../../config.json";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRecoilState } from "recoil";
import { modal } from "../../recoils/modal.atom";
import OverlayPanel from "../util/modal";
import CustomMarker from "./custom_marker";
import ConfirmationView from "../../components/util/confirmation_view";
import PanelForm from "../board-owner/board-views/panel_form";
import { ButtonGroup, Button } from "@material-ui/core";
import { MdLocationSearching, MdZoomIn, MdZoomOut } from "react-icons/md";

const mapStyle = {
  width: "100%",
  height: "90vh",
  display: "block",
};

mapboxgl.setRTLTextPlugin(
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
  null,
  
  true
);

export default function MapFragment({ panels, conf }) {
  const [isAddingEnabled, setIsAddingEnabled] = useState(false);
  const [, setModal] = useRecoilState(modal);
  const [lat] = useState(36.87249651);
  const [lng] = useState(10.321832046);
  const [zoom, setZoom] = useState(8);
  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: lng,
    zoom: zoom,
  });
  const getCursor = ({ isHovering, isDragging }) => {
    return isDragging ? "grabbing" : isAddingEnabled ? "crosshair" : "pointer";
  };
  const location_clicked = (longi, lati) => {
    setIsAddingEnabled(!isAddingEnabled);
    setModal({
      content: (
        <ConfirmationView
          title="Ajouter d'un panneau"
          message="Etes-vous sur de vouloire ajouter un pannea à la location sélectionner?"
          callback={() => {
            setModal({
              content: (
                <PanelForm
                  longitude={longi}
                  latitude={lati}
                  company_id={conf?.company_id}
                />
              ),
              isShowing: true,
            });
          }}
          cancelCallback={() => {
            setModal({ content: null, isShowing: false });
          }}
        />
      ),
      isShowing: true,
    });
  };
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <ReactMapGL
        getCursor={getCursor}
        mapboxgl={mapboxgl}
        onClick={
          conf?.customer_view
            ? null
            : isAddingEnabled
            ? (evt) => location_clicked(evt.lngLat[0], evt.lngLat[1])
            : null
        }
        mapboxApiAccessToken={dev.map_token}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        zoom={zoom}
        onViewportChange={setViewport}
        latitude={lat}
        longitude={lng}
        {...viewport}
        {...mapStyle}
      >
        {Array.isArray(panels)
          ? panels.map((element, index) => {
              return (
                <>
                  <CustomMarker pannel={element} key={index++} />
                </>
              );
            })
          : null}
      </ReactMapGL>
      {conf?.customer_view ? null : (
        <Button
          onClick={() => setIsAddingEnabled(!isAddingEnabled)}
          variant="contained"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            cursor: "pointer",
          }}
          color={isAddingEnabled ? "secondary" : "primary"}
          endIcon={<MdLocationSearching size={24} />}
        >
          {isAddingEnabled ? "Choisir l'emplacement" : "Ajouter Panneau"}
        </Button>
      )}
      <ButtonGroup
        style={{
          position: "absolute",
          top: 50,
          right: 50,
          cursor: "pointer",
        }}
        orientation="horizontal"
        color="primary"
        aria-label="vertical outlined primary button group"
        variant="contained"
      >
        <Button
          onClick={() => {
            let z = zoom;
            setZoom(z + 1);
            setViewport({ ...viewport, zoom: z + 1 });
          }}
        >
          <MdZoomIn size={24} />
        </Button>
        <Button
          onClick={() => {
            let z = zoom;
            setZoom(z - 1);
            setViewport({ ...viewport, zoom: z - 1 });
          }}
        >
          <MdZoomOut size={24} />
        </Button>
      </ButtonGroup>

      <OverlayPanel />
    </div>
  );
}
