import CalendarDayItem from "./CalendarDayItem";
import dayjs from "dayjs/esm";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(LocalizedFormat);

function getDuration(fromTime, toTime) {
  fromTime = dayjs(fromTime);
  toTime = dayjs(toTime);

  if(toTime.diff(fromTime, 'days') > 0)
    return toTime.diff(fromTime, 'days') + " days";
  if(toTime.diff(fromTime, 'hour') > 0)
    return toTime.diff(fromTime, 'hour') + " hours";
  if(toTime.diff(fromTime, 'minute') > 0)
    return toTime.diff(fromTime, 'minute') + " minutes";

  return null;
}

export default function MeetingItem({meeting}) {

  if(!meeting) {
    meeting = {
      title: "Meeting Title",
      date: dayjs().format('YYYY-MM-DD'),
      type: "on-site",
      teams: ["All teams"],
      at: "1.272",
      fromTime: "09:00",
      toTime: "17:00",
      execsAttended: 10,
      numExecs: 15,
      membersAttended: 8,
    }
  }

  let from = meeting.fromTime.split(":");
  from = dayjs().hour(from[0]).minute(from[1]);
  let to = meeting.toTime.split(":");
  to = dayjs().hour(to[0]).minute(to[1]);

  const duration = getDuration(from, to);

  const fromTime = from.format('LT');
  const toTime = to.format('LT');
  const type = meeting.type === "on-site" ? "On-site" : "Remote";

  return (
    <div className="card box-shadow meeting-item">
      <div className="card-header d-flex align-items-center gap-2 text-secondary">
        <h4 className="my-0 text-body">{meeting.title}</h4>
        { meeting.at ? (<>| <span>Room 1.272</span></>) : null }
        |
        <span>{type}</span>
        |
        <span>{meeting.teams.join(", ")}</span>
      </div>
      <div className="card-body d-flex gap-3 align-items-center">
        <CalendarDayItem date={meeting.date}  />
        <table>
          <tbody>
            <tr><th>From:</th><td>{fromTime}</td></tr>
            <tr><th>To:</th><td>{toTime}</td></tr>
            <tr><th>Duration:</th><td>{duration}</td></tr>
          </tbody>
        </table>
        <div className="flex-grow-1" />
        <div className="d-flex flex-column align-items-start gap-1">
          <h4>Total Attendance: {meeting.execsAttended + meeting.membersAttended}</h4>
          <table>
            <tbody>
              <tr><th>Executive:</th><td>{meeting.execsAttended} / {meeting.numExecs}</td></tr>
              <tr><th>Members:</th><td>{meeting.membersAttended}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}