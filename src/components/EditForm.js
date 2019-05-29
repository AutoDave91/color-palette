import React, { Component } from "react";
import "../App.css";
import axios from "axios";

class EditForm extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="form-component">
        <form className="form-container">
          <h3>Edit {this.props.toEdit}</h3>
          <br />
          <h4>Hex Code</h4>
          <input
            name="hex"
            value={this.props.hex}
            onChange={e => {this.props.handleChange(e)}}
          />
          <h4>Name</h4>
          <input
            name="name"
            value={this.props.name}
            onChange={e => {
              this.props.handleChange(e);
            }}
          />
          <h4>Image</h4>
          <input
            name="img"
            value={this.props.img}
            onChange={e => {
              this.props.handleChange(e);
            }}
          />
          <br />
          <button onClick={e => this.props.editPalette(e,  this.props.hex, this.props.name, this.props.img, this.props.toEdit)} className="submit-button">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default EditForm;