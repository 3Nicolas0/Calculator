let internalValue = 0
let screenValue = '0'
let previousPress = null
const screen = document.querySelector('.screen')

document
.querySelector('.calc-buttons')
.addEventListener('click', (event) => {
    buttonClick(event.target.innerText)
})

const buttonClick = (value) => {
  if (isNaN(parseInt(value))) {
    symbolProcess(value)
  }
  else {
    numberProcess(value)
  }
  show()
}

function symbolProcess (value) {
  switch (value) {
    case 'C' :
      screenValue = '0'
      internalValue = 0
      previousPress = null
      show()
      break
    case 'BS' :
      if (screenValue.length === 1) {
        screenValue = '0'
      }
      else {
      screenValue = screenValue.slice(0, screenValue.length - 1)
      }
      show()
      break
    case '=':
      if (previousPress === null) {
        return
      }
      flushOperation(parseInt(screenValue))
      previousPress = null
      screenValue = "" + internalValue
      internalValue = 0
      show()
      break
    default:
      doMath(value)
      break
  }
}

function doMath(value) {
  const screenInteger = parseInt(screenValue)
  if (internalValue === 0) {
    internalValue = screenInteger
  }
  else {
    flushOperation(screenInteger)
  }

  previousPress = value

  screenValue = '0'
}

function flushOperation(screenInteger) {
  if (previousPress === "+") {
    internalValue += screenInteger
  }
  else if (previousPress === "-") {
    internalValue -= screenInteger
  }
  else if (previousPress === "x") {
    internalValue *= screenInteger
  }
  else {
    internalValue /= screenInteger
  }
}

function numberProcess (value) {
  console.log('current value: ', value, typeof value, screenValue, typeof screenValue);
  if (screenValue === '0') {
    screenValue = value
  }

  else {
    screenValue += value
  }
  show()
}

function show () {
  screen.innerText = screenValue
}
