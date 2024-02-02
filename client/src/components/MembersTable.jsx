import { useEffect, useState } from "react";

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

function MemberItem({ member }) {
  return (
    <div className="p-2 attendance-item">
      <div className="d-flex align-items-center gap-2">
        <h4 className="my-0 text-body">{`${member.firstName} ${member.lastName}`}</h4>
        <div className="flex-grow-1" />
        <RankTag rank={member.rank} showName={true} />
      </div>
      <div className="card-body d-flex align-items-center gap-3">
        <img className="md-pfp" src="/assets/images/default-pfp.jpg" />
        <div className="flex-grow-1">
          <div className="d-flex align-items-center gap-2">
            <span className="text-secondary">SARE ID:</span>
            <span>{member.sareID}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="text-secondary">Join Date:</span>
            <span>{dayjs(member.joinDate).format('MMMM Do, YYYY')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Table({ entries }) {
  return (
    <table className="w-100 attendance-table">
      <thead>
        <tr><th className="w-40">Member</th><th>Rank</th><th>SARE ID</th><th>Join Date</th></tr>
      </thead>
      <tbody>
        { entries ? entries.map(member => <MemberRow member={member} key={member.sareID} />) : null }
      </tbody>
    </table>
  );
}

function List({ entries }) {
  return (
    <div className="list-group list-group-flush">
      { entries ? entries.map(member => <MemberItem member={member} key={member.sareID} />) : null }
    </div>
  );
}

export default function MembersTable() {
  const [sortBy, setSortBy] = useState("rank");
  const [sortAscending, setSortAcending] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [entries, setEntries] = useState([]);

  const {loading: membersLoading, data: membersData, refetch} = useQuery(LIST_MEMBERS, { variables: { sortBy, order: sortAscending ? "ascending" : "decending" } });

  useEffect(() => {
    refetch({ sortBy, order: sortAscending ? "ascending" : "decending" });
  }, [sortBy, sortAscending]);

  useEffect(() => {
    if(membersData) {
      setEntries(membersData.members);
    }
  }, [membersData]);

  window.addEventListener("resize", () => {
    setIsMobile(window.innerWidth < 768);
  });

  function onSelectSort(e) {
    setSortBy(e.target.value);
  }

  function toggleSortOrder() {
    setSortAcending(!sortAscending);
  }

  function onSearch(query) {
    refetch({ search: query });
  }

  return (
    <div className="card box-shadow">
      <div className={`card-header d-flex gap-2 ${ isMobile ? "flex-column" : "align-items-center" }`}>
        <h4 className="my-0 text-body">Members</h4>
        <div className="input-group rounded-pill w-0 flex-shrink-0">
          <button className="btn btn-primary btn-sm" onClick={toggleSortOrder}><i className={sortAscending ? "fa fa-sort-up" : "fa fa-sort-down"} /></button>
          <select className="btn btn-outline-primary btn-sm" defaultValue="rank" onChange={onSelectSort}>
            <option value="first-name">First Name</option>
            <option value="last-name">Last Name</option>
            <option value="rank">Rank</option>
            <option value="join-date">Join Date</option>
          </select>
        </div>
        <span className={`spinner-border spinner-border-sm ${ membersLoading ? "" : "d-none" }`} role="status" aria-hidden="true" />
        <div className={ isMobile ? "d-none" : "flex-grow-1"} />
        <SearchBar onSearch={onSearch} />
      </div>
      <div className="card-body p-0">
        { isMobile ? (
            <List entries={entries} />
          ) : (
            <Table entries={entries} />
          )
        }
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