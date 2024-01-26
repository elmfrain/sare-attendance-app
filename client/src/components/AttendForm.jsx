import { useMutation } from "@apollo/client";
import { useRef, useState } from "react";
import { ATTEND } from "../utils/mutations";

export default function AttendForm({ meeting, refetch }) {
  const inputField = useRef();

  const [warning, setWarning] = useState(null);

  const [attend, {loading}] = useMutation(ATTEND);

  async function onSubmit(e) {
    e.preventDefault();

    const sareId = Number(inputField.current.value);
    if(!sareId) return;

    try {
      await attend({ variables: { meeting, sareId } });

      refetch();
    } catch (error) {
      setWarning(error.message);
    }

    inputField.current.value = "";
  }

  return (
    <div className="card box-shadow">
      <form className="card-body" onSubmit={onSubmit}>
        <div className="d-flex gap-3">
        <div className="input-group">
          <span className="input-group-text">SARE ID</span>
          <input ref={inputField} type="text" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">
          {loading ? <span className="spinner-border spinner-border-sm" /> : "Attend"}
        </button>
        </div>
        <div className="my-0 form-text text-danger">{warning}</div>
      </form>
    </div>
  );
}