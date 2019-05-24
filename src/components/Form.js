import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import heart from "./compoen..."

class Form extends Component {
  constructor() {
    super();
    this.state = {
      hex: "",
      name: "",
      img: "",
      colors: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  


  //Set up post request to create a palette
  createPalette(e) {
    e.preventDefault();
    const {hex, name, img} = this.state
    axios
      .post("/api/palette", {
        hex: hex,
        name: name,
        img: img
      })
      .then(response => {
        this.setState({ colors: response.data, hex: '', name: '', img: '' });
      })
      .catch(error => {
        console.log(error);
      });
      this.props.updateColors() 
  }

  render() {
    console.log(this.props.updateColors)
    console.log(this.state.hex);
    console.log(this.state.colors)
    return (
      <div className="form-component">
        <form className="form-container">
          <h3>Create Palette</h3>
          <br />
          <h4>Hex Code</h4>
          <input
            name="hex"
            value={this.state.hex}
            onChange={e => {
              this.handleChange(e);
            }}
          />
          <h4>Name</h4>
          <input
            name="name"
            value={this.state.name}
            onChange={e => {
              this.handleChange(e);
            }}
          />
          <h4>Image</h4>
          <input
            name="img"
            value={this.state.img}
            onChange={e => {
              this.handleChange(e);
            }}
          />
          <br />
          <button
            onClick={e => this.createPalette(e)}
            className="submit-button"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default Form;
