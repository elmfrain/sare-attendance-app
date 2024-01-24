import { useEffect, useRef, useState } from "react";
import CalendarDayItem from "./CalendarDayItem";
import dayjs from "../../node_modules/dayjs/esm";

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

export default function NewMeetingForm() {
  const dateSelector = useRef();
  const timeRangeSelector = useRef();
  const attendanceTypeSelectors = useRef();

  const[date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const[duration, setDuration] = useState("1 hour");

  function onDateChange(e) {
    const toTime = timeRangeSelector.current.querySelector("#to-time").value.split(":");
    const date = dayjs(e.target.value).hour(toTime[0]).minute(toTime[1]);

    if(date.isBefore(dayjs()))
      setDate(null);
    else
      setDate(e.target.value);
  }

  function onTimeRangeChange(e) {
    onDateChange({target: {value: dateSelector.current.value}});

    var fromTime = timeRangeSelector.current.querySelector("#from-time").value.split(":");
    var toTime = timeRangeSelector.current.querySelector("#to-time").value.split(":");

    fromTime = dayjs().hour(fromTime[0]).minute(fromTime[1]);
    toTime = dayjs().hour(toTime[0]).minute(toTime[1]);
    
    setDuration(getDuration(fromTime, toTime));
  }

  useEffect(() => {
    if(duration === null)
      timeRangeSelector.current.querySelectorAll("input").forEach(input => { input.classList.add("is-invalid"); });
    else
      timeRangeSelector.current.querySelectorAll("input").forEach(input => { input.classList.remove("is-invalid"); });
  }, [duration]);

  useEffect(() => {
    if(date === null)
      dateSelector.current.classList.add("is-invalid");
    else
      dateSelector.current.classList.remove("is-invalid");
  }, [date]);

  function handleSemiRadioButtonsClick(e) {
    if (e.target.tagName !== "INPUT")
      return;

    const allTeamsCheck = attendanceTypeSelectors.current.querySelector("#all-teams-check");

    if(attendanceTypeSelectors.current.querySelectorAll("input:checked").length === 0) {
      e.target.checked = true;
      return;
    }

    if(attendanceTypeSelectors.current.querySelectorAll("input:checked").length === 4 && !allTeamsCheck.checked) {
      attendanceTypeSelectors.current.querySelectorAll("input").forEach(checkbox => { checkbox.checked = false; });
      allTeamsCheck.checked = true;
      return;
    }
    if (e.target.id !== "all-teams-check" && e.target.checked) {
      attendanceTypeSelectors.current.querySelector("#all-teams-check").checked = false;
      return;
    }
    if (allTeamsCheck.checked) {
      attendanceTypeSelectors.current.querySelectorAll("input").forEach(checkbox => { checkbox.checked = false; });
      allTeamsCheck.checked = true;
      return;
    }
  }

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="card box-shadow">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h4 className="my-0">Create New Meeting</h4>
        <button className="btn btn-success">Save Template <i className="fa fa-file-export"/></button>
      </div>
    <form onSubmit={onSubmit}>
      <div className="card-body d-flex flex-column gap-3">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Meeting" />
          <span className="input-group-text" id="basic-addon1">@</span>
          <input type="text" className="form-control" placeholder="Room/URL" />
        </div>
        <div className="d-flex gap-3 align-items-center">
          <CalendarDayItem date={date} />
          <div className="d-flex flex-column gap-3 align-items-end flex-grow-1">
            <div className="input-group">
              <span className="input-group-text">Date</span>
              <input type="date" className="form-control" ref={dateSelector} onChange={onDateChange} min={dayjs().format('YYYY-MM-DD')} defaultValue={dayjs().format('YYYY-MM-DD')}/>
              <span className="input-group-text">Type</span>
              <select className="form-select">
                <option>On-site</option>
                <option>Remote</option>
              </select>
            </div>
            <div className="input-group" ref={timeRangeSelector} onChange={onTimeRangeChange}>
              <span className="input-group-text">From</span>
              <input id="from-time" type="time" className="form-control" defaultValue={dayjs().format('HH:mm')} />
              <span className="input-group-text">To</span>
              <input id="to-time" type="time" className="form-control" defaultValue={dayjs().add(1, 'hour').format('HH:mm')}/>
            </div>
            { duration && date ? (<div><strong>Duration: </strong>{duration}</div>) : <strong className="text-danger">{ !duration ? "Invalid time range" : "Past date and time"}</strong> }
          </div>
        </div>
        <div className="btn-group" ref={attendanceTypeSelectors} onClick={handleSemiRadioButtonsClick}>
          <input type="checkbox" className="btn-check" id="all-teams-check" autoComplete="off" defaultChecked={true} />
          <label className="btn btn-sm btn-outline-primary" htmlFor="all-teams-check">All teams</label>
          <input type="checkbox" className="btn-check" id="executive-check" autoComplete="off" />
          <label className="btn btn-sm btn-outline-primary" htmlFor="executive-check">Executive</label>
          <input type="checkbox" className="btn-check" id="telemetry-check" autoComplete="off" />
          <label className="btn btn-sm btn-outline-primary" htmlFor="telemetry-check">Telemetry</label>
          <input type="checkbox" className="btn-check" id="structures-check" autoComplete="off" />
          <label className="btn btn-sm btn-outline-primary" htmlFor="structures-check">Structures</label>
          <input type="checkbox" className="btn-check" id="research-check" autoComplete="off" />
          <label className="btn btn-sm btn-outline-primary" htmlFor="research-check">Research</label>
        </div>
        <div className="d-flex gap-2 align-items-center form-check">
          <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled />
          <label className="form-check-label" htmlFor="flexCheckDefault">Announce on Active Members WhatsApp group chat</label>
          <i className="fa-brands fa-whatsapp text-success fs-4" />
          <div className="text-secondary">(Not Implemented)</div>
        </div>
        <div className="d-flex gap-2 align-items-center form-check">
          <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled />
          <label className="form-check-label" htmlFor="flexCheckDefault">Announce on Nasaminds' Discord server</label>
          <i className="fa-brands fa-discord text-primary fs-4" />
          <div className="text-secondary">(Not Implemented)</div>
        </div>
      </div>
      <div className="card-footer d-flex justify-content-end">
        <button type="submit" className="btn btn-primary">Create</button>
      </div>
    </form>
    </div>
  )
}