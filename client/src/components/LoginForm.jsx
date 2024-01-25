import { useMutation } from "@apollo/client";
import { useState, useRef } from "react";
import { LOGIN_ADMIN } from "../utils/mutations";
import AuthService from "../utils/auth";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(null);
  const form = useRef();
 
  const [login, { data, loading, error }] = useMutation(LOGIN_ADMIN);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({variables: { username, password }}) ;

      AuthService.login(data.loginAdmin.token);
    } catch(e) {
      form.current.querySelectorAll("input").forEach(input => { input.value = "" });

      setWarning(e.message);
    }
  }

  return (
    <div id="signin-form" className="card">
      <div className="card-header">
        Admin Login
      </div>
      <form className="card-body" onSubmit={handleFormSubmit} ref={form}>
        <div className="mb-3">
          <label className="form-label">Username or ID</label>
          <input type="text" className="form-control" onInput={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="mb-2">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="my-0 form-text text-danger">{warning}</div>
        <hr/>
        { loading ? (
          <button type="submit" className="btn btn-primary" disabled>
            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span role="status">Logging In...</span>
          </button>          
        ) : (
          <button type="submit" className="btn btn-primary">Login</button>
        )}
      </form>
    </div>
  )
}