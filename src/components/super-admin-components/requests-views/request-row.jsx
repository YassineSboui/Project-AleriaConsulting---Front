import { Button, TableCell, TableRow } from "@material-ui/core";
import StatusIcon from "../../board-owner/request-views/status_icons";
import { convertDateToLocalDateFrench } from "../../util/date_fonrmater";
import { useRecoilState } from 'recoil'
import { modal } from '../../../recoils/modal.atom'
import OverlayPanel from '../../util/modal'
import RequestDetail from "./request-detail";

export default function RequestRow({ request, isAllReuqest }) {
  const [, setModal] = useRecoilState(modal)
  return (
    <TableRow>
      <TableCell>{request?.name_require}</TableCell>

      <TableCell>{request?.email_requester}</TableCell>

      <TableCell>{request?.phone_require} </TableCell>
      <TableCell>{convertDateToLocalDateFrench(request?.created_at)}</TableCell>
      <TableCell>{request?.days_number}</TableCell>

      <TableCell>{request?.total_price}</TableCell>
      {isAllReuqest ? (
        <TableCell>
          <StatusIcon status={request?.status} />
        </TableCell>
      ) : null}
      <TableCell><Button variant="text" color="primary" onClick={() => setModal({ isShowing: true, content: <RequestDetail request={request} setModal={setModal} /> })}> Détail</Button></TableCell>
      <OverlayPanel />
    </TableRow>
  );
}
