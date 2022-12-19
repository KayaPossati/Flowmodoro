var stopped = false
var running = false
var interval
var minutes = 0
var seconds = 0
var sidehours = 0
var sideminutes = ''
var sideseconds = 0

function start() {
  if (!running) {
    startTimer()
  }
}

function switchPomodoro() {
  var pomoside = document.getElementById('pomoside')
  var flowside = document.getElementById('flowside')

  pomoside.classList.add('side-atv')
  flowside.classList.remove('side-atv')
}

function switchFlow() {
  var pomoside = document.getElementById('pomoside')
  var flowside = document.getElementById('flowside')

  flowside.classList.add('side-atv')
  pomoside.classList.remove('side-atv')
}

function startTimer() {
  running = true
  var mode = document.getElementById('mode')
  var timer = document.getElementById('time')
  var bg = document.getElementById('background')
  var sidetimer = document.getElementById('sidetime')

  if (mode.innerHTML == 'Work Time') {
    minutes = ''
    seconds = 0
    interval = setInterval(() => {
      seconds++
      sideseconds++

      if (seconds >= 60) {
        minutes++
        seconds = 0
      }
      if (sideseconds >= 60) {
        sideminutes++
        sideseconds = 0
      }
      if (sideminutes >= 60) {
        sidehours++
        sideminutes = 0
      }

      timer.innerHTML =
        (minutes < 1 ? '00' : minutes < 10 ? '0' : '') +
        minutes +
        ':' +
        (seconds < 10 ? '0' : '') +
        seconds
      sidetimer.innerHTML =
        (sidehours == 0 ? '' : sidehours + ':') +
        (sideminutes < 1 ? '00' : sideminutes < 10 ? '0'+sideminutes : sideminutes) +
        ':' +
        (sideseconds < 10 ? '0' : '') +
        sideseconds
    }, 1000)
  }

  if (mode.innerHTML == 'Break Time' && timer.innerHTML == '00:00') {
    mode.innerHTML = 'Work Time'
    bg.classList.add('work')
    bg.classList.remove('break')
  }

  if (mode.innerHTML == 'Break Time' && timer.innerHTML != '00:00') {
    var countDown = seconds + minutes * 60
    minutes = Math.round(countDown / 60)
    seconds = Math.round(countDown % 60)
    interval = setInterval(() => {
      seconds--
      if (seconds < 0) {
        minutes--
        seconds = 59
      }
      timer.innerHTML =
        (minutes < 1 ? '0' : minutes < 10 ? '0' : '') +
        minutes +
        ':' +
        (seconds < 10 ? '0' : '') +
        seconds
      if (minutes == 0 && seconds == 0) {
        stopTimer()
      }
    }, 1000)
  }
}

function stopTimer() {
  running = false
  clearInterval(interval)

  var mode = document.getElementById('mode')
  var timer = document.getElementById('time')
  var bg = document.getElementById('background')
  if (mode.innerHTML == 'Work Time') {
    mode.innerHTML = 'Break Time'
    bg.classList.add('break')
    bg.classList.remove('work')
    var time = seconds + minutes * 60
    var timeBreak = time / 5
    minutes = Math.round(timeBreak / 60)
    seconds = Math.round(timeBreak % 60)
    timer.innerHTML =
      (minutes < 1 ? '0' : minutes < 10 ? '0' : '') +
      minutes +
      ':' +
      (seconds < 10 ? '0' : '') +
      seconds
  } else {
    mode.innerHTML = 'Work Time'
    bg.classList.add('work')
    bg.classList.remove('break')
  }
}
