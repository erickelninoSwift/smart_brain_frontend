import React, { Component } from "react";
import "./Register.css"; // Import the CSS file
import { v4 as uuidv4 } from "uuid";
class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  onNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  onEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  onPasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  onSubmitUser = (e) => {
    e.preventDefault();
    fetch("https://jackpot-ai-application-backend.onrender.com/register", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        entries: 0,
      }),
    })
      .then((alldataSent) => alldataSent.json())
      .then((userRegistered) => {
        if (userRegistered) {
          this.props.currentUserActiveNow(userRegistered);
          this.props.ElninonChangeRoute("home");
        }
      })
      .catch((err) => {
        console.log("user could not be registered", err);
      });
  };

  render() {
    const { ElninonChangeRoute } = this.props;
    return (
      <article
        className="br3 ba mv4 w-100 w-50-m w-25-l mw6 shadow-3 center"
        style={{ color: "white" }}
      >
        <div className="pa4 black-80" style={{ color: "white" }}>
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6">Name</label>
                <input
                  autoComplete="false"
                  className="pa2 input-reset ba bg-black white-90 hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => this.onNameChange(e)}
                />
              </div>

              <div className="mt3" style={{ color: "white" }}>
                <label className="db fw6 lh-copy f6">Email</label>
                <input
                  autoComplete="false"
                  className="pa2 input-reset ba bg-black white-90 hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={(e) => this.onEmailChange(e)}
                />
              </div>
              <div className="mv3" style={{ color: "white" }}>
                <label className="db fw6 lh-copy f6">Password</label>
                <input
                  autoComplete="false"
                  className="b pa2 input-reset ba bg-black white-90 hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => this.onPasswordChange(e)}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                style={{ color: "white" }}
                className="b ph3 pv2 input-reset ba b--white white-90 bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
                onClick={this.onSubmitUser}
              />
            </div>
            <div className="lh-copy mt3">
              <a
                href="#0"
                className="f5 link dim black db pointer"
                onClick={() => ElninonChangeRoute("SignIn")}
                style={{ color: "white" }}
              >
                Back to Login
              </a>
            </div>
          </form>
        </div>
      </article>
    );
  }
}

export default Register;
