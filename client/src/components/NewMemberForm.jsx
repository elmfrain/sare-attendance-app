import { useEffect, useRef, useState } from "react";
import dayjs from "../../node_modules/dayjs/esm";
import RankTag from "./RankTag";
import { useQuery, useMutation } from "@apollo/client";
import { IS_EMAIL_TAKEN, IS_SAREID_TAKEN } from "../utils/queries";
import { CREATE_EMERGENCY_CONTACT, CREATE_MEMBER } from "../utils/mutations";

const pfpStyle = {
  width: "1.5in",
  height: "1.5in",
  borderRadius: "50%",
  backgroundImage: `url(/assets/images/default-pfp.jpg)`,
  backgroundPosition: "center",
  backgroundSize: "cover",
}

export default function NewMemberForm() {
  const [formState, setFormState] = useState({
    firstName: null,
    lastName: null,
    joinDate: dayjs().format('YYYY-MM-DD'),
    sareID: null,
    email: null,
    rank: "member"
  });
  const [emergencyContact, setEmergencyContact] = useState({});
  const [warning, setWarning] = useState(null);
  const [emWarning, setEMWarning] = useState(null);

  const { data: sareIDPoll, refetch: pollSareID } = useQuery(IS_SAREID_TAKEN);
  const { data: emailPoll, refetch: pollEmail } = useQuery(IS_EMAIL_TAKEN);

  const [createMember, { data: memberData, loading: newMemberLoading, error: newMemberError }] = useMutation(CREATE_MEMBER);
  const [createEmergencyContact, { data: emData, loading: newEmLoading, error: newEmError }] = useMutation(CREATE_EMERGENCY_CONTACT);

  const form = useRef();
  const addMemberButton = useRef();

  function onDateChange(e) {
    if(dayjs(e.target.value).isAfter(dayjs())) {
      setWarning("Join date is set in future");
      e.target.classList.add("is-invalid");
      setFormState({ ...formState, joinDate: null });
      return;
    }
    e.target.classList.remove("is-invalid");
    setWarning(null);
    setFormState({ ...formState, joinDate: e.target.value });
  }

  function onSareIDChange(e) {
    const sareID = Number(e.target.value);

    if(!sareID) {
      setWarning("Invalid SARE ID Number");
      e.target.classList.add("is-invalid");
      setFormState({ ...formState, sareID: null });
      return;
    }
    setWarning(null);
    e.target.classList.remove("is-invalid");
    setFormState({ ...formState, sareID });

    pollSareID({ sareID });
  }

  function onEmailInput(e) {
    const email = e.target.value;

    if(!email.length) {
      setFormState({ ...formState, email: null });
      return;
    }

    if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      setFormState({ ...formState, email: null });
      e.target.classList.add("is-invalid");
      setWarning("Invalid email");
      return;
    }
    setWarning(null);
    setFormState({ ...formState, email });
    e.target.classList.remove("is-invalid");

    pollEmail({ email });
  }

  function onPhoneInput(e) {
    const phone = e.target.value;

    if(!phone.length) {
      const { phone, ...rest } = formState;
      setFormState(rest);
      return;
    }

    if(!/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone)) {
      e.target.classList.add("is-invalid");
      setWarning("Invalid phone number");
      return;
    }
    setWarning(null);
    e.target.classList.remove("is-invalid");
    setFormState({ ...formState, phone });
  }

  useEffect(() => {
    if(!sareIDPoll) return;

    if(sareIDPoll.memberBySareID) {
      setWarning(`SARE ID ${sareIDPoll.memberBySareID.sareID} is already taken`);
      form.current.querySelector("#member-id").classList.add("is-invalid");
      setFormState({ ...formState, sareID: null });
      return;
    }
    form.current.querySelector("#member-id").classList.remove("is-invalid");
    setWarning(null);
  }, [sareIDPoll]);

  useEffect(() => {
    if(!emailPoll) return;

    if(emailPoll.memberByEmail) {
      setWarning(`Email ${emailPoll.memberByEmail.email} is already taken`);
      form.current.querySelector('#member-email').classList.add("is-invalid");
      setFormState({ ...formState, email: null });
      return;
    }
    form.current.querySelector('#member-email').classList.remove("is-invalid");
    setWarning(null);
  }, [emailPoll]);

  useEffect(() => {
    let disableAddMemberButton = false;
    Object.entries(formState).forEach(([key, value]) => { if(!value) disableAddMemberButton = true; });
    addMemberButton.current.disabled = disableAddMemberButton || emWarning;
  }, [formState, emWarning]);

  useEffect(() => {
    if(emergencyContact.name?.length === 0) {
      const { name, ...rest } = emergencyContact;
      setEmergencyContact(rest);
      setEMWarning(null);
      return;
    }

    if(emergencyContact.relationship?.length === 0) {
      const { relationship, ...rest } = emergencyContact;
      setEmergencyContact(rest);
      setEMWarning(null);
      return;
    }

    const entires = Object.entries(emergencyContact);
    if(entires.length === 0) return;

    if(!emergencyContact.name || !emergencyContact.phone) {
      setEMWarning("If you want to add emergency contact, please fill out at least name and phone number");
      return;
    }

    setEMWarning(null);
  }, [emergencyContact]);

  function onEMPhoneInput(e) {
    const phone = e.target.value;

    if(!phone.length) {
      const { phone, ...rest } = emergencyContact;
      setEmergencyContact(rest);
      e.target.classList.remove("is-invalid");
      setEMWarning(null);
      return;
    }

    if(!/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone)) {
      e.target.classList.add("is-invalid");
      setEMWarning("!Invalid phone number");
      return;
    }
    setEMWarning(null);
    e.target.classList.remove("is-invalid");
    setEmergencyContact({ ...emergencyContact, phone });
  }

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const newMeber = { ...formState };
      if(Object.entries(emergencyContact).length !== 0) {
        const { data } = await createEmergencyContact({ variables: { ...emergencyContact } });
        newMeber.emergencyContact = data.createEmergencyContact._id;
      }

      await createMember({ variables: newMeber });
    } catch(e) {
      setWarning(`!${e.message}`);
    }
  }

  return (
    <div className="card box-shadow">
      <div className="card-header">
        <h4 className="my-0 fw-normal">Add New Member</h4>
      </div>
    <form ref={form} onSubmit={onSubmit}>
      <div className="card-body d-flex flex-column gap-3">
        <div className="d-flex flex-row gap-3">
          <div className="d-flex justify-content-between align-items-end aspect-ratio-1" style={pfpStyle}>
            <div className="align-self-start"><RankTag rank={formState.rank} showName={true} /></div>
            <button type="button" className="btn btn-success btn-sm rounded-circle"><i className="fa fa-camera" /></button>
          </div>
          <div className="d-flex flex-column gap-3 flex-grow-1">
            <div className="input-group">
              <span className="input-group-text">First</span>
              <input type="text" className="form-control" id="member-first-name" placeholder="First name" onInput={(e) => setFormState({ ...formState, firstName: e.target.value })} />
              <span className="input-group-text">Last</span>
              <input type="text" className="form-control" id="member-last-name" placeholder="Last name" onInput={(e) => setFormState({ ...formState, lastName: e.target.value })} />
            </div>
            <div className="input-group">
              <span className="input-group-text">Join Date</span>
              <input type="date" className="form-control" id="member-join-date" onChange={onDateChange}  defaultValue={dayjs().format('YYYY-MM-DD')} />
              <span className="input-group-text">SARE ID</span>
              <input type="number" className="form-control" id="member-id" placeholder="School ID/Abritrary" onChange={onSareIDChange} />
            </div>
            <div className="input-group">
              <span className="input-group-text">Email</span>
              <input type="email" className="form-control" id="member-email" placeholder="Email" onChange={onEmailInput} />
              <span className="input-group-text">Phone</span>
              <input type="tel" className="form-control" id="member-phone" placeholder="Phone" onInput={onPhoneInput}/>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column gap-3">
          <div className="input-group">
            <span className="input-group-text">Rank</span>
            <select className="form-select" id="member-rank" onChange={(e) => setFormState({ ...formState, rank: e.target.value })} defaultValue="member">
              <option value="president">President</option>
              <option value="executive">Executive</option>
              <option value="active-member">Active Member</option>
              <option value="member">Member</option>
            </select>
            <span className="input-group-text">Role</span>
            <input type="text" className="form-control" id="member-role" placeholder="Role" onInput={(e) => setFormState({ ...formState, role: e.target.value })} />
          </div>
          { warning ? <div className="my-0 form-text text-danger">{warning}</div> : null }
          {/* Todo: Make separate component for emergency contact */}
          <div className="d-flex gap-2 align-items-center">
            <hr className="my-0 flex-grow-1" />
            Emergency Contact
            <hr className="my-0 flex-grow-1" />
          </div>
          <div className="input-group">
            <span className="input-group-text">Name</span>
            <input type="text" className="form-control" id="member-city" placeholder="First & Last" onInput={(e) => setEmergencyContact({ ...emergencyContact, name: e.target.value })}/>
            <span className="input-group-text">Rel</span>
            <input type="text" className="form-control" id="member-state" placeholder="Mother/Son" onInput={(e) => setEmergencyContact({ ...emergencyContact, relationship: e.target.value })} />
            <span className="input-group-text">Phone</span>
            <input type="text" className="form-control" id="member-zip" placeholder="(123) 456 7890" onInput={onEMPhoneInput} />
          </div>
          { emWarning ? <div className={`my-0 form-text text-${emWarning.startsWith("!") ? "danger" : "info"}`}>{emWarning.startsWith("!") ? emWarning.substring(1) : emWarning}</div> : null }
        </div>
      </div>
      <div className="card-footer d-flex justify-content-end">
        <button type="submit" className="btn btn-primary" ref={addMemberButton}>Add Member</button>
      </div>
    </form>
    </div>
  );
}