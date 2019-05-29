///////ADDING DELETE FUNCTIONALITY

//1. Add onClick to delete button:
<button
onClick={() => this.deleteColor(element.name)} className="delete-button">
Delete
</button>

//2.Add delete function to Palette component that will fire when button is clicked. Send the response data to the the updateColors function, which will be invoked and cause the page to update with the new data

deleteColor = color => {
  axios.delete(`/api/palette/${color}`).then(response => {
    this.updateColors(response.data);
  });
};

//3. Set up endpoint in server folder index.js
app.delete('/api/palette/:color', deletePalette)

//4. Set up controller with delete function

const deletePalette = (req, res) => {
  console.log(req.params.color)
  const index = colors.findIndex(color => color.name === req.params.color);
  colors.splice(index, 1);
  res.json(colors)
  }


  ////////ADDING EDIT FUNCTIONALITY

  //1. Set up a way to toggle into edit mode. Create an onClick in the edit button which toggles the display to show an edit form. We need to also send in an argument for which item we will be editing

  <button onClick={() => this.openEditor(element.name)}  className="edit-button">
  Edit
</button>

//2. Set up the function which will open editor mode. This will toggle the edit mode and it will also save to state which palette we will be editing. We will need that info when we make our put request

openEditor(palette) {
  this.setState({ editor: !this.state.editor, toEdit: palette }, () =>
    console.log(this.state.toEdit)
  );
}

//3. Create the EditForm component. We can basically use the same code as we used in the Form component, with a couple tweaks.

//=========>> Send props down (same as the Form, but also including the editPalette function (instead of the createPalette function, and including the toEdit from state))

<EditForm
hex={this.state.hex}
name={this.state.name}
img={this.state.img}
handleChange={this.handleChange}
editPalette={this.editPalette}
toEdit={this.state.toEdit}
/>

//=========>>  Change the title that displays in the form

<h3>Edit {this.props.toEdit}</h3>

//==========>> Change the button so that it will edit on submit

<button onClick={e => this.props.editPalette(e,  this.props.hex, this.props.name, this.props.img, this.props.toEdit)} className="submit-button">
Submit
</button>

//4. Create the edit function in the Palette Component

editPalette(e, hex, name, img, toEdit) {
  e.preventDefault();
  console.log(hex, name, img, toEdit);
  axios
    .put(`/api/palette/${toEdit}`, { hex: hex, name: name, img: img })
    .then(response => this.setState({ palette: response.data }));
}

//5. Set up the endpoint in the server

app.put('/api/palette/:name', editPalette)

//6.Set up the edit function in the controller

const editPalette = (req, res) => {
  const {hex, name, img} = req.body
  const index = colors.findIndex(element => {
    return element.name === req.params.name;
  });
  if (name !== "") {
    colors[index].name = name;
  }
  if (img !== "") {
    colors[index].img = img;
  }
  if (hex !== "") {
    colors[index].hex = hex;
  }

  res.json(colors);
}




/////Conditional Rendering of Edit Component
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

