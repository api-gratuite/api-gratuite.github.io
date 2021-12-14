document.querySelector('button').addEventListener('click', function() {
    //document.querySelector('video').play();
    if( document.querySelector('video').paused ) {
        document.querySelector('button').innerHTML = '<i class="fad fa-pause"></i>';
        document.querySelector('video').play();
    } else {
        document.querySelector('button').innerHTML = '<i class="fad fa-play"></i>';
        document.querySelector('video').pause();
    }
});

setInterval(function(){
    document.querySelector('input').max = parseInt(document.querySelector('video').duration)
    document.querySelectorAll('span')[1].innerHTML = fancyTimeFormat(parseInt(document.querySelector('video').duration));
},1000);

document.querySelector('input').addEventListener('change', function(){
    document.querySelector('video').currentTime = this.value
});

document.querySelector('video').addEventListener('timeupdate', function(){
    document.querySelector('input').value = parseInt(document.querySelector('video').currentTime);
    if( parseInt(document.querySelector('video').currentTime) == parseInt(document.querySelector('video').duration) ) {
        document.querySelector('button').innerHTML = '<i class="fad fa-play"></i>';
    }
    document.querySelectorAll('span')[0].innerHTML =fancyTimeFormat(parseInt(document.querySelector('video').currentTime));
});

function fancyTimeFormat(seconds) {   
  const format = val => `0${Math.floor(val)}`.slice(-2)
  const hours = seconds / 3600
  const minutes = (seconds % 3600) / 60

  return [hours, minutes, seconds % 60].map(format).join(':')
}