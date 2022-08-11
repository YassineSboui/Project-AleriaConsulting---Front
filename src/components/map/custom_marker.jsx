import { useState } from "react";
import { Marker, Popup } from "react-map-gl";
import DetailsMarker from "./details_marker";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function CustomMarker({ pannel }) {
  const [isExpanded, setIsExapended] = useState(false);
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
  return (
    <>
      <Marker
        key={pannel?._id}
        className="cursor-pointer"
        longitude={parseFloat(pannel.longitude)}
        latitude={parseFloat(pannel.latitude)}
        offsetTop={-32}
        offsetLeft={-16}
      >
        <FaMapMarkerAlt
          onMouseEnter={() => setIsExapended(true)}
          onMouseLeave={() => setIsExapended(false)}
          size={32}
          color={"#e74c3c"}
          onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
          style={{ position: "absolute", cursor: "pointer" }}
        />
      </Marker>
      {(isHeaderExpanded || isExpanded) && (
        <Popup
          offsetTop={-32}
          offsetLeft={0}
          key={pannel?._id}
          longitude={parseFloat(pannel.longitude)}
          latitude={parseFloat(pannel.latitude)}
          closeButton={true}
          closeOnClick={false}
          onClose={() => {
            setIsExapended(false);
            setIsHeaderExpanded(false);
          }}
          anchor="bottom"
        >
          <DetailsMarker pannel={pannel} />
        </Popup>
      )}
    </>
  );
}
