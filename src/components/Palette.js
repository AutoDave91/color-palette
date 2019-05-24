import React, { Component } from "react";
import Colors from "./Colors"
import Form from "./Form";
import axios from "axios";

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palette: [],
      toggle:false
    };
   
  }
  ////Set-up component to get data from controller, then set that data to state

  componentDidMount(){
      axios.get('/api/palette').then(response=> {
          console.log(response.data)
          this.setState({palette: response.data})
      })

      this.toggleScreen=this.toggleScreen.bind(this)
  }

///Set-up a toggleScreen function to toggle state to show different displays
  toggleScreen(){
    this.setState({toggle: !this.state.toggle})
  }

  render() {
     
    return (
      <div className='palette-component'>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        
        <button onClick={this.toggleScreen} className="submit-button">Toggle Display</button></div>

{/* Set up two components, one which shows the form and one which maps out the data */}
       {/* if this ? this : that */}
       {this.state.toggle===true ? 
        <Form
          hex={this.state.hex}
          name={this.state.name}
          img={this.state.img}
          handleChange={this.handleChange}
        />
        
        :
//Create a map function to map out the color data
         this.state.palette.map((element, index)=>{
            return(
           
               <div>
                   <Colors index={index} element={element}/>
               </div>
       
            )
        })  }
      </div>
    );
  }
}

export default Palette;
