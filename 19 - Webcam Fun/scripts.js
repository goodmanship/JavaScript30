const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localMediaStream => {
      video.src = window.URL.createObjectURL(localMediaStream)
      video.play()
    })
    .catch(err => console.log(err))
}

function paintToCanvas() {
  const width = video.videoWidth
  const height = video.videoHeight
  canvas.width = width
  canvas.height = height

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height)
    let pixels = ctx.getImageData(0, 0, width, height)
    // pixels.data = redEffect(pixels.data)
    // pixels.data = rgbSplit(pixels.data)
    // ctx.globalAlpha = 0.1
    pixels.data = greenScreen(pixels.data)
    ctx.putImageData(pixels, 0, 0)
  }, 16)
}

function takePhoto() {
  snap.currentTime = 0
  snap.play()

  const data = canvas.toDataURL('image/jpeg')
  const link = document.createElement('a')
  link.href = data
  link.setAttribute('download', 'handsome')
  link.innerHTML = `<img src="${data}" alt="handsome bitch" />`
  strip.insertBefore(link, strip.firstChild)
}

function redEffect(pix) {
  for(i = 0; i < pix.length; i+=4) {
    pix[i] = pix[i] + 100
    pix[i + 1] = pix[i + 1] - 50
    pix[i + 2] = pix[i + 2] * 0.5
  }
  return pix
}

function rgbSplit(pix) {
  for(i = 0; i < pix.length; i+=4) {
    pix[i - 150] = pix[i]
    pix[i + 100] = pix[i + 1]
    pix[i - 150] = pix[i + 2]
  }
  return pix
}

function greenScreen(pix) {
  const levels = {}
  document.querySelectorAll('.rgb input').forEach(input => {
    levels[input.name] = input.value
  })

  for (i = 0; i < pix.length; i+=4) {
    red = pix[i]
    blue = pix[i + 1]
    green = pix[i + 2]
    alpha = pix[i + 3]
    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      pix[i + 3] = 0
    }
  }
  return pix
}
getVideo()
video.addEventListener('canplay', paintToCanvas)