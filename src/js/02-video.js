// 1 Іmport vimeo player from npm 
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';


//  2 Инициализируй плеер в файле скрипта (треба вказати айдішник з HTML)
const iframeRef=document.querySelector('#vimeo-player');
const player = new Player(iframeRef);

// 3 Check how it working
player.on('play', function() {
        console.log('played the video!');
    });

// 4 // Метод on() відстежуємо подію timeupdate обновлення часу запуску відео
player.on('timeupdate', throttle(onTimeUpdate, 1000));
// 5 Сохраняй время воспроизведения в локальное хранилище. Пусть ключом для хранилища будет строка "videoplayer-current-time".
function onTimeUpdate(data) {
    console.log(data);
    localStorage.setItem('videoplayer-current-time', JSON.stringify(data.seconds));
};

// 6 При перезагрузке страницы воспользуйся методом setCurrentTime() для того чтобы возобновить воспроизведение с сохраненной позиции.
const time = JSON.parse(localStorage.getItem('videoplayer-current-time'));
player.setCurrentTime(time).then(function (seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});
