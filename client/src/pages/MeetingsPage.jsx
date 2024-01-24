import MeetingItem from "../components/MeetingItem";
import NewMeetingForm from "../components/NewMeetingForm";

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
  return (
    <div className="d-flex flex-column gap-3 text-secondary">
      <NewMeetingForm />
      <Divider title="Past Meetings"/>
      <MeetingItem />
      <MeetingItem />
      <MeetingItem />
      <MeetingItem />
    </div>
  )
}