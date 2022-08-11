import { Tooltip } from "@material-ui/core";
import { MdFeedback, MdCheckCircle, MdArchive, MdCancel } from "react-icons/md";

export default function StatusIconHandler({ status }) {
  switch (status) {
    case "requested":
      return (
        <Tooltip title={"Demandée"} className="cursor-pointer">
          <MdFeedback size={24} color={"#e67e22"} />
        </Tooltip>
      );
    case "confirmed":
      return (
        <Tooltip title={"Confirmée"} className="cursor-pointer">
          <MdCheckCircle color={"#27ae60"} size={24} />
        </Tooltip>
      );
    case "archived":
      return (
        <Tooltip title={"Archivée"} className="cursor-pointer">
          <MdArchive size={24} />
        </Tooltip>
      );
    case "refused":
      return (
        <Tooltip title={"Refusée"} className="cursor-pointer">
          <MdCancel size={24} color={"#e74c3c"} />
        </Tooltip>
      );
    default:
      return (
        <Tooltip title={"Archivée"} className="cursor-pointer">
          <MdArchive size={24} />
        </Tooltip>
      );
  }
}
