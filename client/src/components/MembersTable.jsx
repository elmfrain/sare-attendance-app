import { useState } from "react";

import RankTag from "./RankTag";
import SearchBar from "./SearchBar";
import { useQuery } from "@apollo/client";
import { LIST_MEMBERS } from "../utils/queries";

import dayjs from "dayjs/esm";
import advancedFormat from "dayjs/esm/plugin/advancedFormat";
dayjs.extend(advancedFormat);

function MemberRow({ member }) {
  return (
    <tr>
      <td><img className="sm-pfp" src="/assets/images/default-pfp.jpg"/>{`${member.firstName} ${member.lastName}`}</td>
      <td><RankTag rank={member.rank} showName={true} /></td>
      <td>{member.sareID}</td>
      <td>{dayjs(member.joinDate).format('MMMM Do, YYYY')}</td>
    </tr>
  );
}

export default function MembersTable() {
  const [sortBy, setSortBy] = useState("Rank");
  const [sortAscending, setSortAcending] = useState(false);

  const {loading: membersLoading, data: membersData} = useQuery(LIST_MEMBERS);

  function onSelectSort(e) {
    setSortBy(e.target.value);
  }

  function toggleSortOrder() {
    setSortAcending(!sortAscending);
  }

  return (
    <div className="card box-shadow">
      <div className="card-header d-flex align-items-center gap-2">
        <h4 className="my-0 text-body">Members</h4>
        <div className="input-group rounded-pill w-0 flex-shrink-0">
          <button className="btn btn-primary btn-sm" onClick={toggleSortOrder}><i className={sortAscending ? "fa fa-sort-up" : "fa fa-sort-down"} /></button>
          <select className="btn btn-outline-primary btn-sm" defaultValue="rank" onChange={onSelectSort}>
            <option value="name">Name</option>
            <option value="rank">Rank</option>
            <option value="join-time">Join Time</option>
            <option value="leave-time">Leave Time</option>
          </select>
        </div>
        <span className={`spinner-border spinner-border-sm ${ membersLoading ? "" : "d-none" }`} role="status" aria-hidden="true" />
        <div className="flex-grow-1" />
        <SearchBar />
      </div>
      <div className="card-body p-0">
        <table className="w-100 attendance-table">
          <thead>
            <tr><th className="w-40">Member</th><th>Rank</th><th>SARE ID</th><th>Join Date</th></tr>
          </thead>
          <tbody>
            { membersData ? membersData.members.map(member => <MemberRow member={member} key={member.sareID} />) : null }
          </tbody>
        </table>
      </div>
      <div className="card-footer d-flex align-items-center justify-content-center gap-2">
        <button className="btn btn-primary btn-sm"><i className="fa fa-chevron-left" /></button>
        <ul className="pagination pagination-sm m-0">
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item active" aria-current="page"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
        </ul>
        ...
        <button className="btn btn-primary btn-sm"><i className="fa fa-chevron-right" /></button>
      </div>
    </div>
  );
}