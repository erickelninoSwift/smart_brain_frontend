import React, { Component } from "react";
import "./SignIn.styles.css"; // Import the CSS file

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signInEmail: "",
      signInPassword: "",
    };
  }

  onEmailChange = (event) => {
    this.setState({
      signInEmail: event.target.value,
    });
  };

  onPasswordChange = (event) => {
    this.setState({
      signInPassword: event.target.value,
    });
  };

  onSubmitApplication = (e) => {
    e.preventDefault();
    fetch("https://jackpot-ai-application-backend.onrender.com/signin", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.id) {
          this.props.currentUserActiveNow({
            id: data.id,
            email: data.email,
            name: data.name,
            entries: data.entries,
            date: data.joined,
          });
          this.props.ElninonChangeRoute("home");
        } else {
          console.log("data user was not found ");
        }
      })
      .catch((err) => console.log("error was found while Sign in "));
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
              <legend className="f2 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6">Email</label>
                <input
                  autoComplete="false"
                  className="pa2 input-reset ba bg-black hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={(e) => this.onEmailChange(e)}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6">Password</label>
                <input
                  autoComplete="false"
                  className="b pa2 input-reset ba bg-black hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => this.onPasswordChange(e)}
                />
              </div>
            </fieldset>
            <div className="" style={{ color: "white" }}>
              <input
                style={{ color: "white" }}
                className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={(e) => this.onSubmitApplication(e)}
              />
            </div>
            <div className="lh-copy mt3" style={{ color: "white" }}>
              <a
                href="#0"
                className="f5 link dim black db"
                onClick={() => ElninonChangeRoute("register")}
                style={{ color: "white" }}
              >
                Register
              </a>
            </div>
          </form>
        </div>
      </article>
    );
  }
}

export default SignIn;
