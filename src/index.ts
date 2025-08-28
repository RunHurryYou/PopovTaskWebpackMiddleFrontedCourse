import {data} from './data';
import './index.scss';

const soundsContainer = document.querySelector('.sounds-container');
const backFiltered = document.querySelector('.backfiltered');

let currentAudio = null;
let currentAudioId = null;
let audioPositions = {};

function playAudio(audioFile, id) {
    if(currentAudioId === id) {
        audioPositions[id] = currentAudio.currentTime;
        currentAudio.pause();
        
        const currentCard = document.querySelector(`.card[data-id="${id}"]`);
        if (currentCard) {
            const icon = currentCard.querySelector('img');
            if (icon) {
                const itemData = data.find(item => item.id === id);
                icon.src = `./assets/icons/${itemData.icon_name}`;
            }
        }
        
        currentAudio = null;
        currentAudioId = null;
        return;
    }
    
    if (currentAudio) {
        audioPositions[currentAudioId] = currentAudio.currentTime;
        currentAudio.pause();
        
        const prevCard = document.querySelector(`.card[data-id="${currentAudioId}"]`);
        if (prevCard) {
            const icon = prevCard.querySelector('img');
            if (icon) {
                const prevItemData = data.find(item => item.id === currentAudioId);
                icon.src = `./assets/icons/${prevItemData.icon_name}`;
            }
        }
    }
    
    currentAudio = new Audio(`./assets/sounds/${audioFile}`);
    currentAudio.loop = true;
    currentAudioId = id;
    
    if (audioPositions[id] !== undefined) {
        currentAudio.currentTime = audioPositions[id];
    } else {
        currentAudio.currentTime = 0;
    }
    
    const volumeSlider = document.querySelector('.volume-slider');
    if (volumeSlider) {
        currentAudio.volume = volumeSlider.value;
    }
    
    const currentCard = document.querySelector(`.card[data-id="${id}"]`);
    if (currentCard) {
        const icon = currentCard.querySelector('img');
        if (icon) {
            icon.src = "./assets/icons/pause.svg";
        }
    }
    
    currentAudio.play();
}

function renderItem(item){
    const div = document.createElement('div');
    div.classList.add('card');
    div.setAttribute('data-id', item.id);

    div.style.backgroundImage = `url("./assets/${item.background}")`;
    const iconSrc = `./assets/icons/${item.icon_name}`;

    div.innerHTML = `<img src="${iconSrc}" alt="${item.name || 'sound'}">`;
    
    div.onclick = function() {
        backFiltered.style.backgroundImage = `url("./assets/${item.background}")`;
        
        if (item.audio) {
            playAudio(item.audio, item.id);
        }
    };
    
    soundsContainer.appendChild(div);
}

function createVolumeControl() {
    const slider = document.querySelector('#volume-slider');
    
    slider.addEventListener('input', function() {
        if (currentAudio) {
            currentAudio.volume = this.value;
        }
    });
}

function main(){
    createVolumeControl();
    data.forEach(renderItem);
}

main();