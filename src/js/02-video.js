import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const throttled = throttle(onTimeUpdate, 1000);

function onTimeUpdate(data){
    localStorage.setItem('videoplayer-current-time', data.seconds);
    console.log(data);
};

player.on('timeupdate', throttled);

const initTime = localStorage.getItem('videoplayer-current-time') || 0;
player.setCurrentTime(initTime);