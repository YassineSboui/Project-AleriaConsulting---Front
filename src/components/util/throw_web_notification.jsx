import WebNotification from "react-web-notifications";
import { useRecoilState } from "recoil";
import { notifs } from "../../recoils/notification-list.atom";
import { useSubscription } from "@apollo/client";
import { NOTIFICATION_SUBSCRIPTION } from "../../graphql/subscription";

export default function NotificationWiget({ company_id }) {
  const [notif] = useRecoilState(notifs);
  const { data } = useSubscription(NOTIFICATION_SUBSCRIPTION, {
    variables: { company_id: company_id },
    shouldResubscribe: true,
  });
  return notif.length < data?.notify?.length ? (
    <WebNotification
      title={data?.notify[data?.notify?.length - 1]?.title} // the title prop is required
      icon={window.location.origin + "/logo.png"}
      body={data?.notify[data?.notify?.length - 1]?.message}
      timeout={9000}
      onClickFn={() => window.open(window.location, "_blank")} // open your own site on notification click
    />
  ) : null;
}
