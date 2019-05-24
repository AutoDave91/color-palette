////Set-up component to get data from controller, then set that data to state

//front:
componentDidMount(){
    axios.get('/api/palette').then(response=> {
        console.log(response.data)
        this.setState({palette: response.data})
    })
}

//back (controller):
const getPalette = (req, res) => {
    res.json(colors)
}


/////////////////Set up post request to create a palette

  //front:
  createPalette(e) {
    e.preventDefault();
    axios
      .post("/api/palette", {
        hex: this.state.hex,
        name: this.state.name,
        img: this.state.img
      })
      .then(response => {
        this.setState({ colors: response.data, hex: '', name: '', img: '' });
      })
      .catch(error => {
        console.log(error);
      });
      
  }

//back:
  const createPalette = (req, res) =>{
    let color = req.body
    colors.push(color)
    res.json(colors)
}



////Turn map into its own component



import React from 'react'

function Colors(props){
return(<div>

     <div style={{border: 'solid 3px #5e85d4 ', display: 'flex', flexDirection:'column', alignItems: 'center'}} key={props.index}>
                    <div style={{backgroundColor: props.element.hex, width: '10vw', height:'5vh'}}>{props.element.hex}</div>
                    <h2>{props.element.name}</h2>
                    <img style={{height:'15vh', width: '15vh'}} src={props.element.img}/>
                </div>

</div>)
}

export default Colors