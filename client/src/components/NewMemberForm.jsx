import { useState } from "react";
import dayjs from "../../node_modules/dayjs/esm";
import RankTag from "./RankTag";

const pfpStyle = {
  width: "1.5in",
  height: "1.5in",
  borderRadius: "50%",
  backgroundImage: `url(/assets/images/default-pfp.jpg)`,
  backgroundPosition: "center",
  backgroundSize: "cover",
}

export default function NewMemberForm() {
  const [rank, setRank] = useState("member");

  return (
    <div className="card box-shadow">
      <div className="card-header">
        <h4 className="my-0 fw-normal">Add New Member</h4>
      </div>
    <form>
      <div className="card-body d-flex flex-column gap-3">
        <div className="d-flex flex-row gap-3">
          <div className="d-flex justify-content-between align-items-end aspect-ratio-1" style={pfpStyle}>
            <div className="align-self-start"><RankTag rank={rank} showName={true} /></div>
            <button type="button" className="btn btn-success btn-sm rounded-circle"><i className="fa fa-camera" /></button>
          </div>
          <div className="d-flex flex-column gap-3 flex-grow-1">
            <div className="input-group">
              <span className="input-group-text">First</span>
              <input type="text" className="form-control" id="member-first-name" placeholder="First name" />
              <span className="input-group-text">Last</span>
              <input type="text" className="form-control" id="member-last-name" placeholder="Last name" />
            </div>
            <div className="input-group">
              <span className="input-group-text">Join Date</span>
              <input type="date" className="form-control" id="member-join-date" defaultValue={dayjs().format('YYYY-MM-DD')} />
              <span className="input-group-text">SARE ID</span>
              <input type="number" className="form-control" id="member-name" placeholder="School ID/Abritrary" />
            </div>
            <div className="input-group">
              <span className="input-group-text">Email</span>
              <input type="email" className="form-control" id="member-email" placeholder="Email" />
              <span className="input-group-text">Phone</span>
              <input type="tel" className="form-control" id="member-phone" placeholder="Phone" />
            </div>
          </div>
        </div>
        <div className="d-flex flex-column gap-3">
          <div className="input-group">
            <span className="input-group-text">Rank</span>
            <select className="form-select" id="member-rank" onChange={(e) => setRank(e.target.value)} defaultValue="member">
              <option value="president">President</option>
              <option value="executive">Executive</option>
              <option value="active-member">Active Member</option>
              <option value="member">Member</option>
            </select>
            <span className="input-group-text">Role</span>
            <input type="text" className="form-control" id="member-role" placeholder="Role" />
          </div>
          <div className="d-flex gap-2 align-items-center">
            <hr className="my-0 flex-grow-1" />
            Emergency Contact
            <hr className="my-0 flex-grow-1" />
          </div>
          <div className="input-group">
            <span className="input-group-text">Name</span>
            <input type="text" className="form-control" id="member-city" placeholder="First & Last" />
            <span className="input-group-text">Rel</span>
            <input type="text" className="form-control" id="member-state" placeholder="Mother/Son" />
            <span className="input-group-text">Phone</span>
            <input type="text" className="form-control" id="member-zip" placeholder="(123) 456 7890" />
          </div>
        </div>
      </div>
      <div className="card-footer d-flex justify-content-end">
        <button type="submit" className="btn btn-primary">Add Member</button>
      </div>
    </form>
    </div>
  );
}