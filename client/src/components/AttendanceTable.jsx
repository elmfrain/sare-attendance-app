import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import RankTag from "./RankTag";

import dayjs from "dayjs/esm";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { GET_ABSENTEES } from "../utils/queries";
dayjs.extend(LocalizedFormat);

function formatTimes(join, leave) {
  let from = join ? join.split(":") : null;
  from = from ? dayjs().hour(from[0]).minute(from[1]) : null;
  let to = leave ? leave.split(":") : null;
  to = to ? dayjs().hour(to[0]).minute(to[1]) : null;

  const joinTime = from ? from.format('LT') : "--";
  const leaveTime = to ? to.format('LT') : "--";

  return { joinTime, leaveTime };
}


function AttendanceRow({attendance}) {
  const { joinTime, leaveTime } = formatTimes(attendance.joinTime, attendance.leaveTime);

  return (
    <tr>
      <td>{attendance.member.firstName + " " + attendance.member.lastName}</td>
      <td>{attendance.member.sareID}</td>
      <td><RankTag rank={attendance.member.rank} /></td>
      <td>{joinTime}</td>
      <td>{leaveTime}</td>
    </tr>
  );
}

function AttendanceItem({attendance}) {
  const { joinTime, leaveTime } = formatTimes(attendance.joinTime, attendance.leaveTime);

  return (
    <div className="d-flex gap-3 align-items-center p-2 justify-content-between attendance-item">
      <div className="d-flex flex-column gap-1 align-items-start">
        <span>{attendance.member.firstName + " " + attendance.member.lastName}</span>
        <span><strong>SARE ID:</strong> {attendance.member.sareID}</span>
        <RankTag rank={attendance.member.rank} showName={true} />
      </div>
      <div className="d-flex flex-column gap-1 align-items-end">
        <strong>Join/Leave</strong>
        <span>{joinTime} / {leaveTime}</span>
      </div>
    </div>
  );
}

function Table({attendances}) {
  return (
    <table className="w-100 attendance-table">
      <thead>
        <tr><th className="w-40">Member</th><th>SARE ID</th><th>Rank</th><th>Join Time</th><th>Leave Time</th></tr>
      </thead>
      <tbody>
        { attendances.map(attendance => <AttendanceRow attendance={attendance} key={attendance._id} />) }
      </tbody>
    </table>
  );
}

function List({attendances}) {
  return (
    <div className="d-flex flex-column">
      { attendances.map(attendance => <AttendanceItem attendance={attendance} key={attendance._id} />) }
    </div>
  );
}

export default function AttendanceTable({attendances, refetch, meetingID}) {
  const [showAbsent, setShowAbsent] = useState(false);
  const [sortBy, setSortBy] = useState("rank");
  const [sortAscending, setSortAcending] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { data: absentData, loading: absentLoading, refetch: refetchAbsences } = useQuery(GET_ABSENTEES);
  const [entries, setEntries] = useState([]);

  window.addEventListener("resize", () => {
    setIsMobile(window.innerWidth < 768);
  });

  useEffect(() => {
    if(showAbsent && absentData){
      const absences = absentData.absentees.map(absentee => { return {_id: absentee._id, member: absentee, joinTime: null, leaveTime: null} });

      setEntries(absences);
    }
    else
      setEntries(attendances);
  }, [showAbsent, absentData, attendances]);

  useEffect(() => {
    if(showAbsent)
      refetchAbsences({meeting: meetingID, sortBy, order: sortAscending ? "ascending" : "descending"});
    else
      refetch({sortBy, order: sortAscending ? "ascending" : "descending"});
  }, [sortBy, sortAscending, showAbsent, meetingID]);

  function toggleShowAbsent() {
    setShowAbsent(!showAbsent);
  }

  function onSelectSort(e) {
    setSortBy(e.target.value);
  }

  function toggleSortOrder() {
    setSortAcending(!sortAscending);
  }

  return (
    <div className="card box-shadow">
      <div className="card-header d-flex gap-2 align-items-center">
        <div className="d-flex flex-wrap gap-2">
          <h4 className="my-0 text-body align-self-stretch d-flex align-items-center ">Attendance</h4>
          <div className="d-flex gap-2">
            <button className={`btn btn-${showAbsent ? "warning" : "primary"} btn-sm py-1`} onClick={toggleShowAbsent}>{showAbsent ? "Absences" : "Present"}</button>
            <div className="input-group rounded-pill w-0">
              <button className="btn btn-primary btn-sm" onClick={toggleSortOrder}><i className={sortAscending ? "fa fa-sort-up" : "fa fa-sort-down"} /></button>
              <select className="btn btn-outline-primary btn-sm" defaultValue="rank" onChange={onSelectSort}>
                <option value="first-name">First Name</option>
                <option value="last-name">Last Name</option>
                <option value="rank">Rank</option>
                <option value="join-time">Join Time</option>
                <option value="leave-time">Leave Time</option>
              </select>
            </div>
            {absentLoading ? <span className="spinner-border spinner-border-sm" /> : null}
          </div>
        </div>
        <div className="flex-grow-1" />
        <button className="btn btn-success btn-sm"><i className="fa fa-file-export" /></button>
      </div>
      <div className="card-body p-0">
        {isMobile ? (
          <List attendances={entries} />
        ) : (
          <Table attendances={entries} />
        )}
      </div>
    </div>
  );
}