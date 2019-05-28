const colors = [
  {
    hex: "#29abe1",
    name: "dodgerblue",
    img:
      "https://dspncdn.com/a1/media/692x/b0/6c/5d/b06c5df85fffefdcd9c9677b57e39f1f.jpg"
  },
  {
    hex: "#fd5b60",
    name: "tomato",
    img:
      "https://dspncdn.com/a1/media/692x/1b/e6/ea/1be6ea0a6c511e5c74656442874d4c91.jpg"
  }
];

const createPalette = (req, res) => {
  console.log(req.body);
  let color = req.body;
  colors.push(color);
  res.json(colors);
};

const getPalette = (req, res) => {
  res.json(colors);
};

const deletePalette = (req, res) => {
console.log(req.params.color)
const index = colors.findIndex(color => color.name === req.params.color);
colors.splice(index, 1);
res.json(colors)
}

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

module.exports = { getPalette, createPalette, deletePalette, editPalette };
