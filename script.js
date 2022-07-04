const body = document.querySelector('body')
const lightMode = document.querySelector('#lightMode')
const darkMode = document.querySelector('#darkMode')
const minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')
const playButton = document.querySelector('.play')
const stopButton = document.querySelector('.stop')
const moreButton = document.querySelector('.more')
const lessButton = document.querySelector('.less')
const natureCard = document.querySelector('.nature')
const rainCard = document.querySelector('.rain')
const coffeeShopCard = document.querySelector('.coffee-shop')
const fireplaceCard = document.querySelector('.fireplace')
const alertMessage = document.querySelector('.alertMessage')
let timerTimeOut
let minutes = Number(minutesDisplay.textContent)
let newMinutes
const natureSound = new Audio('./sounds/nature.wav')
const rainSound = new Audio('./sounds/rain.wav')
const coffeeShopSound = new Audio('./sounds/coffeeshop.wav')
const fireplaceSound = new Audio('./sounds/fireplace.wav')
const inputNature = document.querySelector('#input-nature')
const inputRain = document.querySelector('#input-rain')
const inputCoffee = document.querySelector('#input-coffee')
const inputFireplace = document.querySelector('#input-fireplace')
let element = document.querySelectorAll('input')
let volumeOnClick = 50
let resetVolume = 0

lightMode.addEventListener('click', function () {
  lightMode.classList.add('hide')
  darkMode.classList.remove('hide')
  body.classList.add('dark-mode')
})
darkMode.addEventListener('click', function () {
  lightMode.classList.remove('hide')
  darkMode.classList.add('hide')
  body.classList.remove('dark-mode')
})
function updateDisplay(newMinutes, seconds) {
  newMinutes = newMinutes === undefined ? minutes : newMinutes
  seconds = seconds === undefined ? 0 : seconds
  minutesDisplay.textContent = String(newMinutes).padStart(2, '0')
  secondsDisplay.textContent = String(seconds).padStart(2, '0')
}
function countdown() {
  timerTimeOut = setTimeout(function () {
    let minutes = Number(minutesDisplay.textContent)
    let seconds = Number(secondsDisplay.textContent)
    let endTime = minutes <= 0 && seconds <= 0

    if (endTime) {
      updateDisplay()
      return
    }

    if (seconds <= 0) {
      seconds = 60
      --minutes
    }
    updateDisplay(minutes, String(seconds - 1))
    countdown()
  }, 1000)
}
function reset() {
  updateDisplay(minutes, 0)
  clearTimeout(timerTimeOut)
}
function updateMinutes(newMinutes) {
  minutes = newMinutes
}
function showMinutesAlert() {
  alertMessage.classList.remove('hide')
  minutesDisplay.classList.add('minutesAlert')
  setTimeout(function () {
    alertMessage.classList.add('hide')
    minutesDisplay.classList.remove('minutesAlert')
  }, 2000)
}
function moreFiveMinutes() {
  newMinutes = minutes + 5
  updateMinutes(newMinutes)
  updateDisplay(newMinutes, 0)
}
function lessFiveMinutes() {
  newMinutes = minutes - 5
  if (newMinutes < 5) {
    showMinutesAlert()
    return
  }
  updateMinutes(newMinutes)
  updateDisplay(newMinutes, 0)
}
playButton.addEventListener('click', function () {
  countdown()
})
stopButton.addEventListener('click', function () {
  reset()
  cardReset()
})
moreButton.addEventListener('click', function () {
  moreFiveMinutes()
})
lessButton.addEventListener('click', function () {
  lessFiveMinutes()
})
function bgSoundPlay(track) {
  track.loop = true
  track.play()
}
function cardSoundStop() {
  natureSound.pause()
  rainSound.pause()
  coffeeShopSound.pause()
  fireplaceSound.pause()
  natureCard.lastElementChild.value = resetVolume
  rainCard.lastElementChild.value = resetVolume
  coffeeShopCard.lastElementChild.value = resetVolume
  fireplaceCard.lastElementChild.value = resetVolume
}
function selectedCard(element) {
  element.classList.add('box-clicked')
}
function cardReset() {
  natureCard.classList.remove('box-clicked')
  rainCard.classList.remove('box-clicked')
  coffeeShopCard.classList.remove('box-clicked')
  fireplaceCard.classList.remove('box-clicked')
  cardSoundStop()
}
function setVolume(element, sound) {
  volumeOnClick = element.value
  sound.volume = element.value / 100
}
function initialVolume(input, sound) {
  input.value = volumeOnClick
  sound.volume = volumeOnClick / 100
}
natureCard.addEventListener('click', function () {
  cardReset()
  initialVolume(inputNature, natureSound)
  bgSoundPlay(natureSound)
  selectedCard(natureCard)
})
rainCard.addEventListener('click', function () {
  cardReset()
  initialVolume(inputRain, rainSound)
  bgSoundPlay(rainSound)
  selectedCard(rainCard)
})
coffeeShopCard.addEventListener('click', function () {
  cardReset()
  initialVolume(inputCoffee, coffeeShopSound)
  bgSoundPlay(coffeeShopSound)
  selectedCard(coffeeShopCard)
})
fireplaceCard.addEventListener('click', function () {
  cardReset()
  initialVolume(inputFireplace, fireplaceSound)
  bgSoundPlay(fireplaceSound)
  selectedCard(fireplaceCard)
})
