import AttendanceTable from "../components/AttendanceTable";
import MeetingItem from "../components/MeetingItem";

export default function AttendancePage() {
  return (
    <div className="d-flex flex-column gap-3">
      <MeetingItem />
      <AttendanceTable />
    </div>
  );
}