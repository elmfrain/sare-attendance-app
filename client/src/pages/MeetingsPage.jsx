import { useQuery } from "@apollo/client";
import MeetingItem from "../components/MeetingItem";
import NewMeetingForm from "../components/NewMeetingForm";
import { LIST_MEETINGS } from "../utils/queries";

function Divider({title}) {
  return (
    <div className="d-flex align-items-center gap-2">
      <hr className="flex-grow-1"/>
      <h4 className="my-0 text-secondary">{title}</h4>
      <hr className="flex-grow-1"/>
    </div>
  )
}

export default function MeetingsPage() {
  const { data, loading, error } = useQuery(LIST_MEETINGS);

  return (
    <div className="d-flex flex-column gap-3 text-secondary">
      <NewMeetingForm />
      <Divider title="Past Meetings"/>
      <div className={`spinner-border ${ loading ? "" : "d-none"}`} />
      
      { data ? data.meetings.map(meeting => <MeetingItem meeting={meeting} key={meeting._id} />) : null }
    </div>
  )
}