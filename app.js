const cols = document.querySelectorAll('.col')

//keydown event
document.addEventListener("keydown", (event) => {


//cancel default behavior
  event.preventDefault();

  if (event.code.toLowerCase() === "space") {
    setRandomColors();
  }
})

//click event 

document.addEventListener('click', (event) => {
  const type = event.target.dataset.type;

//icon class change on click
  if (type === "lock") {
    const node =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.children[0];

    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");


//copy text on click
  } else if (type === "copy") {
    copyToClikBoard(event.target.textContent);
  }
})


//random color generation function

function generatorRandomColor() { 

  const hexCods = '0123456789ABCDEF'
  let color = ''

  for (let i = 0; i < 6; i++) { 
    color += hexCods [Math.floor(Math.random() * hexCods.length)]
  }
  return '#' + color 
}


//copy color function on click

function copyToClikBoard(text) { 
  return navigator.clipboard.writeText(text)
}

function setRandomColors(isInitial) { 

//array of current colors to store in hash 
  const colors = isInitial ? getColorsFromHash() : []

  cols.forEach((col,index) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("h2");
    const button = col.querySelector("button");

    //column blocking
    if (isLocked) {
      colors.push(text.textContent);
      return;
    }

    //color generation using the chroma.js library

    const color = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random();

    if (!isInitial) {
      colors.push(color);
    }

    text.textContent = color;
    col.style.background = color;

    setTextColor(text, color);
    setTextColor(button, color);
  })

updateColorHash(colors)
}

//shade generation function

function setTextColor(text, color) { 
  const luminance = chroma(color).luminance()

  text.style.color = luminance > 0.5 ? "black" : "white"
}

//storing colors in hash

function updateColorHash(colors = []) { 
  document.location.hash = colors
    .map(col => col.toString().substring(1)).join('-')
}
//function to generate color from url

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split('-')
      .map(color => '#' + color)
    
  }
  return []
} 
  
  
  
setRandomColors(true);