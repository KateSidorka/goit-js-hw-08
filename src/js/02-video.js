import Player from '@vimeo/player';
import throttle from 'lodash.throttle';


const player = new Player('vimeo-player');

const updateCurrentTime = throttle(function(data) {
    const currentTime = data.seconds;
    localStorage.setItem('videoplayer-current-time', currentTime);
  }, 1000);
  
  player.on('timeupdate', updateCurrentTime);
  
  window.addEventListener('DOMContentLoaded', function() {
    const savedTime = localStorage.getItem('videoplayer-current-time');
    if (savedTime) {
      player.setCurrentTime(savedTime);
    }
  });