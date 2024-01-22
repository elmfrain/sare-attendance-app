export default function LoginForm() {
  return (
    <div id="signin-form" className="card">
      <div className="card-header">
        Admin Login
      </div>
      <form className="card-body">
        <div className="mb-3">
          <label className="form-label">Username or ID</label>
          <input type="text" className="form-control"/>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="text" className="form-control"/>
        </div>
        <hr/>
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}