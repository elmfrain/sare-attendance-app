import CalendarDayItem from "./CalendarDayItem";

export default function MeetingItem({meeting}) {
  return (
    <div className="card box-shadow meeting-item">
      <div className="card-header d-flex align-items-center gap-2 text-secondary">
        <h4 className="my-0 text-body">Current Meeting</h4>
        |
        <span>Room 1.272</span>
        |
        <span>On-site</span>
        |
        <span>All teams</span>
      </div>
      <div className="card-body d-flex gap-3 align-items-center">
        <CalendarDayItem  />
        <table>
          <tbody>
            <tr><th>From:</th><td>9:00am (CST)</td></tr>
            <tr><th>To:</th><td>5:00pm (CST)</td></tr>
            <tr><th>Duration:</th><td>8 hours</td></tr>
          </tbody>
        </table>
        <div className="flex-grow-1" />
        <div className="d-flex flex-column align-items-start gap-1">
          <h4>Total Attendance: 18</h4>
          <table>
            <tbody>
              <tr><th>Executive:</th><td>10 / 15</td></tr>
              <tr><th>Members:</th><td>8</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}