import ParticlesBg from "particles-bg";
import Naviagtion from "./components/Navigation/Naviagtion";

import FacialRecognition from "./components/FacialRecognition/FacialRecognition";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank.components";
import { Component } from "react";
import SignIn from "./components/SignIn/SignIn.jsx";
import Register from "./components/Register/Register";

const handleFacelocation = (result) => {
  const image = document.getElementById("inputimage");
  const width = Number(image.width);
  const height = Number(image.height);

  const regions = result.outputs[0].data.regions[0];

  const boundingBox = regions.region_info.bounding_box;
  const topRow = boundingBox.top_row.toFixed(3);
  const leftCol = boundingBox.left_col.toFixed(3);
  const bottomRow = boundingBox.bottom_row.toFixed(3);
  const rightCol = boundingBox.right_col.toFixed(3);

  return {
    bottom: height - Number(bottomRow) * height,
    left: Number(leftCol) * width,
    right: width - Number(rightCol) * width,
    top: Number(topRow) * height,
  };
};
const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "SignIn",
  isSigned: false,
  profile: {
    id: "",
    email: "",
    name: "",
    entries: 0,
    date: "",
  },
};
class App extends Component {
  constructor() {
    super();

    this.state = initialState;
  }

  onChangeInput = (DataProvided) => {
    console.log(DataProvided);
    this.setState({
      imageUrl: DataProvided,
    });
  };

  currentUserSet = (currentUser) => {
    this.setState({
      profile: currentUser,
    });
  };

  displayBox = (box) => {
    this.setState({
      box: box,
    });
  };
  componentDidUpdate() {
    console.log(this.state.profile);
  }
  buttonOnSubmit = () => {
    fetch("https:54.191.253.12/imageaddress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        urlOfImage: this.state.imageUrl,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.outputs[0].data.regions[0].region_info);
        if (result) {
          fetch("https://54.191.253.12/image", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.profile.id,
            }),
          })
            .then((data) => data.json())
            .then((userCount) => {
              this.setState({
                profile: {
                  ...this.state.profile,
                  entries: userCount,
                },
              });
            });
        }
        this.displayBox(handleFacelocation(result));
      })
      .catch((error) => console.log("error", error));
  };

  onChangeRoute = (defineroute) => {
    if (defineroute === "home") {
      this.setState({
        isSigned: true,
      });
    } else if (defineroute === "SignIn") {
      this.setState(initialState);
    }
    this.setState({
      route: `${defineroute}`,
    });
  };

  render() {
    const { onChangeInput, onChangeRoute } = this;
    // console.log(faceSquarebracket());

    return (
      <div style={{ height: "100%" }}>
        <ParticlesBg
          color=""
          num={200}
          type="lines"
          bg={true}
          style={{
            position: "fixed",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
            height: "100vh",
          }}
        />
        <div>
          <Naviagtion
            ElninonChangeRoute={onChangeRoute}
            currentUserIsSignedIn={this.state.isSigned}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {this.state.route === "SignIn" ? (
              <SignIn
                ElninonChangeRoute={onChangeRoute}
                currentUserActiveNow={this.currentUserSet}
              />
            ) : this.state.route === "register" ? (
              <Register
                currentUserActiveNow={this.currentUserSet}
                ElninonChangeRoute={onChangeRoute}
              />
            ) : (
              <>
                <Rank
                  name={this.state.profile.name}
                  entries={this.state.profile.entries}
                />

                <ImageLinkForm
                  onChangeDataField={onChangeInput}
                  onSubmit={this.buttonOnSubmit}
                />
                <br />
                <FacialRecognition
                  jukebox={this.state.box}
                  imageFace={this.state.imageUrl}
                />
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
