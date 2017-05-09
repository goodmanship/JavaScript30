const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('.timer__button')
let countdown

function timer(s) {
  clearInterval(countdown)
  const now = Date.now()
  const then = now + s * 1000
  displayTimeLeft(s)
  displayEndTime(then)
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now())/1000)
    if (secondsLeft < 0) {
      clearInterval(countdown)
      return
    }
    displayTimeLeft(secondsLeft)
  }, 1000)
}

function displayTimeLeft(s) {
  const min = Math.floor(s / 60)
  const remainingS = s % 60
  const display = `${min}:${remainingS < 10 ? '0' : ''}${remainingS}`
  timerDisplay.textContent = display
  document.title = display
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp)
  const hrs = end.getHours()
  const min = end.getMinutes()
  endTime.textContent = `Be back at ${hrs > 12 ? hrs - 12 : hrs}:${min < 10 ? '0' : ''}${min}`
}

function startTimer() {
  const seconds = parseInt(this.dataset.time)
  timer(seconds)
}

buttons.forEach(button => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault()
  const mins = this.minutes.value
  timer(mins * 60)
  this.reset()
})