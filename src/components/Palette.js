import React, { Component } from "react";
import Colors from "./Colors";
import Form from "./Form";
import axios from "axios";

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palette: [],
      toggle: false,
      hex: "",
      name: "",
      img: "",
    };
    this.toggleScreen = this.toggleScreen.bind(this);
    this.handleChange = this.handleChange.bind(this);

 
    
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

  //This function isn't working
  updateColors(update){
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
      this.updateColors(response.data)  
        // this.setState({hex: "", name: "", img: "" });
      })
      .catch(error => {
        console.log(error);
      });
   
  }


  

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  

  render() {
    
    return (
      <div className="palette-component">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={this.toggleScreen} className="submit-button">
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
          this.state.palette.map((element, index) => {
            return (
           
                <Colors index={index} element={element} />
    
            );
          })
        )}
      </div>
    );
  }
}

export default Palette;
