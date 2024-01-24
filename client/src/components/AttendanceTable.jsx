import { useState } from "react";
import RankTag from "./RankTag";

export default function AttendanceTable() {
  const [showAbsent, setShowAbsent] = useState(false);
  const [sortBy, setSortBy] = useState("Rank");
  const [sortAscending, setSortAcending] = useState(false);

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
        <h4 className="my-0 text-body align-self-stretch d-flex align-items-center ">Attendance</h4>
        <button className={`btn btn-${showAbsent ? "warning" : "primary"} btn-sm py-1`} onClick={toggleShowAbsent}>{showAbsent ? "Absences" : "Present"}</button>
        <div className="input-group rounded-pill w-0">
          <button className="btn btn-primary btn-sm" onClick={toggleSortOrder}><i className={sortAscending ? "fa fa-sort-up" : "fa fa-sort-down"} /></button>
          <select className="btn btn-outline-primary btn-sm" defaultValue="rank" onChange={onSelectSort}>
            <option value="name">Name</option>
            <option value="rank">Rank</option>
            <option value="join-time">Join Time</option>
            <option value="leave-time">Leave Time</option>
          </select>
        </div>
        <div className="flex-grow-1" />
        <button className="btn btn-primary btn-sm"><i className="fa fa-plus" /></button>
        <button className="btn btn-success btn-sm"><i className="fa fa-file-export" /></button>
      </div>
      <div className="card-body p-0">
        <table className="w-100 attendance-table">
          <thead>
            <tr><th className="w-40">Member</th><th>SARE ID</th><th>Rank</th><th>Join Time</th><th>Leave Time</th></tr>
          </thead>
          <tbody>
            <tr><td>Ferdinando Herina</td><td>1234337</td><td><RankTag rank="president" /></td><td>10:01am</td><td>5:25pm</td></tr>
            <tr><td>Migul Torres</td><td>95695695</td><td><RankTag rank="executive" /></td><td>10:01am</td><td>5:25pm</td></tr>
            <tr><td>Jesus Nandez</td><td>8008135</td><td><RankTag rank="active-member" /></td><td>10:01am</td><td>5:25pm</td></tr>
            <tr><td>Josh Drake</td><td>11223344</td><td><RankTag rank="member" /></td><td>10:01am</td><td>5:25pm</td></tr>
            <tr><td>Random Ass Dude</td><td>0000000</td><td><RankTag /></td><td>-10:01am</td><td>50:60pm</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}