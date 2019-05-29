import React, { Component } from "react";
import Colors from "./Colors";
import Form from "./Form";
import axios from "axios";
import EditForm from "./EditForm";

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palette: [],
      toggle: false,
      hex: "",
      name: "",
      img: "",
      editor: false,
      toEdit: ""
    };
    this.toggleScreen = this.toggleScreen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateColors = this.updateColors.bind(this);
    this.createPalette = this.createPalette.bind(this);
    this.editPalette = this.editPalette.bind(this);
  }
  ////Set-up component to get data from controller, then set that data to state

  componentDidMount() {
    axios.get("/api/palette").then(response => {
      console.log(response.data);
      this.setState({ palette: response.data });
    });
  }

  ///Set-up a toggleScreen function to toggle state to show different displays
  toggleScreen() {
    this.setState({ toggle: !this.state.toggle });
  }

  //This function causes page to re-render after delete, post, and edit changes are made
  updateColors(update) {
    this.setState({ palette: update });
  }

  //Set up post request to create a palette
  createPalette(e, hex, name, img) {
    e.preventDefault();
    axios
      .post("/api/palette", {
        hex: hex,
        name: name,
        img: img
      })
      .then(response => {
        //Need to make this work so it causes page to re-render and show updated data after the post has been made
        this.updateColors(response.data);
        this.setState({ toggle: !this.state.toggle });
      })
      .catch(error => {
        console.log(error);
      });
  }

  //Edit is working but update function is not working.
  editPalette(e, hex, name, img, toEdit) {
    e.preventDefault();
    console.log(hex, name, img, toEdit);
    axios
      .put(`/api/palette/${toEdit}`, { hex: hex, name: name, img: img })
      .then(response => this.updateColors(response.data));
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  deleteColor = color => {
    axios.delete(`/api/palette/${color}`).then(response => {
      this.updateColors(response.data);
    });
  };

  openEditor(palette) {
    this.setState({ editor: !this.state.editor, toEdit: palette }, () =>
      console.log(this.state.toEdit)
    );
  }

  render() {
    return (
      <div className="palette-component">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={this.toggleScreen} className="toggle-button">
            Toggle Display
          </button>
        </div>

        {/* Set up two components, one which shows the form and one which maps out the data */}
        {/* Basic logic: if this ? this : that */}
        {this.state.toggle === true ? (
          <Form
            hex={this.state.hex}
            name={this.state.name}
            img={this.state.img}
            handleChange={this.handleChange}
            createPalette={this.createPalette}
          />
        ) : (
          //Create a map function to map out the color data. You can create another component to display the JSX

          <div className="colors-component-container">
            {this.state.palette.map((element, index) => {
              return (
                <div key={index}>
                  <Colors index={index} element={element} />
                  <div className="delete-edit-buttons-container">
                    <button
                      onClick={() => this.deleteColor(element.name)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => this.openEditor(element.name)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div>
          {this.state.editor === true ? (
            <EditForm
              hex={this.state.hex}
              name={this.state.name}
              img={this.state.img}
              handleChange={this.handleChange}
              editPalette={this.editPalette}
              toEdit={this.state.toEdit}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Palette;
