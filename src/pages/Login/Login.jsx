import React, { useRef } from 'react'
import { storeItem } from '../../services/jwt.service';
import "./login.css"

function Login() {

  const usernameRef = useRef();

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    let time = new Date().toLocaleDateString(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
  })

    const userData = {
      username: usernameRef?.current.value,
      loginTime:time
    }

    storeItem(JSON.stringify(userData), "User Data")

  }
  
  

  console.log("username", usernameRef?.current?.value)

  return (
<section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid" alt="Sample image"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form onSubmit={handleLoginSubmit}>
          <h3>LIVE CHAT APP</h3>
        <p className="small fw-bold mb-3 pt-1 mb-0">Enter Your Name to Join Chat</p>

          <div className="form-outline mb-4">
            <input ref={usernameRef} type="text" id="form3Example3" className="form-control form-control-lg"
              placeholder="Enter Name" />
            <label className="form-label" htmlFor="form3Example3">Enter Name</label>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="submit" className="btn btn-primary btn-lg"
              style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}}>JOIN</button>
          </div>

        </form>
      </div>
    </div>
  </div>
  <div
    className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
    <div className="text-white mb-3 mb-md-0">
      Created with ❤️ by Henry Bentil
    </div>

 </div>
</section>
  )
}

export default Login