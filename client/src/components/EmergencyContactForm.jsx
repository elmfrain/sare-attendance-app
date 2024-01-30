import { useEffect, useState } from "react";

export default function EmergencyContactForm({ emergencyContact, setEmergencyContact, emWarning, setEMWarning}) {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  window.addEventListener("resize", () => { setIsMobile(window.innerWidth < 768); });
  
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

  function onPhoneInput(e) {
    const phone = e.target.value;

    if(!phone.length) {
      const { phone, ...rest } = emergencyContact;
      setEmergencyContact(rest);
      setEMWarning(null);
      e.target.classList.remove("is-invalid");
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

  return (
    <>
    <div className="d-flex gap-2 align-items-center">
      <hr className="my-0 flex-grow-1" />
      Emergency Contact
      <hr className="my-0 flex-grow-1" />
    </div>

    { isMobile ? (
      <div className="d-flex flex-column gap-2">
        <div className="input-group">
          <span className="input-group-text">Name</span>
          <input type="text" className="form-control" placeholder="First Last" defaultValue={emergencyContact.name} onChange={(e) => setEmergencyContact({ ...emergencyContact, name: e.target.value })} />
        </div>
        <div className="input-group">
          <span className="input-group-text">Rel</span>
          <input type="text" className="form-control" placeholder="Relationship" defaultValue={emergencyContact.relationship} onChange={(e) => setEmergencyContact({ ...emergencyContact, relationship: e.target.value })} />
        </div>
        <div className="input-group">
          <span className="input-group-text">Phone</span>
          <input type="text" className="form-control" placeholder="Phone Number" defaultValue={emergencyContact.phone} onChange={onPhoneInput} />
        </div>
      </div>
    ) : (
      <div className="input-group">
        <span className="input-group-text">Name</span>
        <input type="text" className="form-control" placeholder="First Last" defaultValue={emergencyContact.name} onChange={(e) => setEmergencyContact({ ...emergencyContact, name: e.target.value })} />
        <span className="input-group-text">Rel</span>
        <input type="text" className="form-control" placeholder="Relationship" defaultValue={emergencyContact.relationship} onChange={(e) => setEmergencyContact({ ...emergencyContact, relationship: e.target.value })} />
        <span className="input-group-text">Phone</span>
        <input type="text" className="form-control" placeholder="Phone Number" defaultValue={emergencyContact.phone} onChange={onPhoneInput} />
      </div>
    )}

    { emWarning ? <div className={`my-0 form-text text-${emWarning.startsWith("!") ? "danger" : "info"}`}>{emWarning.startsWith("!") ? emWarning.substring(1) : emWarning}</div> : null }
    </>
  )
}