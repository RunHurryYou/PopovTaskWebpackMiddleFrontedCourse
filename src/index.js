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
                if(id === 1) icon.src = "./assets/icons/cloud-rain.svg";
                else if(id === 2) icon.src = "./assets/icons/cloud-snow.svg";
                else if(id === 3) icon.src = "./assets/icons/sun.svg";
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
                if(currentAudioId === 1) icon.src = "./assets/icons/cloud-rain.svg";
                else if(currentAudioId === 2) icon.src = "./assets/icons/cloud-snow.svg";
                else if(currentAudioId === 3) icon.src = "./assets/icons/sun.svg";
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

    let iconSrc = '';
    
    if(item.id === 1){
        div.style.backgroundImage = 'url("./assets/rainy-bg.jpg")';
        iconSrc = './assets/icons/cloud-rain.svg';
    }
    else if(item.id === 2){
        div.style.backgroundImage = 'url("./assets/winter-bg.jpg")';
        iconSrc = './assets/icons/cloud-snow.svg';
    }
    else if(item.id === 3){
        div.style.backgroundImage = 'url("./assets/summer-bg.jpg")';
        iconSrc = './assets/icons/sun.svg';
    }

    div.innerHTML = `<img src="${iconSrc}" alt="${item.name || 'sound'}">`;
    
    div.onclick = function() {
        // Меняем фон
        if(item.id === 1){
            backFiltered.style.backgroundImage = 'url("./assets/rainy-bg.jpg")';
        }
        else if(item.id === 2){
            backFiltered.style.backgroundImage = 'url("./assets/winter-bg.jpg")';
        }
        else if(item.id === 3){
            backFiltered.style.backgroundImage = 'url("./assets/summer-bg.jpg")';
        }
        
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