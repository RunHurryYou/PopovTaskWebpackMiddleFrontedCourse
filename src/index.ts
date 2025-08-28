import {data} from './data';
import './index.scss';
import { IAudioPositions, IDataItem } from './types/types';

const soundsContainer = document.querySelector('.sounds-container') as HTMLDivElement;
const backFiltered = document.querySelector('.backfiltered') as HTMLDivElement;

let currentAudio: HTMLAudioElement | null = null;
let currentAudioId: number | null = null;
let audioPositions: IAudioPositions = {};

function playAudio(audioFile: string, id: number) {
    if(currentAudioId === id && currentAudio !== null) {
        audioPositions[id] = currentAudio.currentTime;
        currentAudio.pause();
        const currentCard = document.querySelector(`.card[data-id="${id}"]`);
        if (currentCard) {
            const icon = currentCard.querySelector('img');
            if (icon) {
                const itemData = data.find(item => item.id === id);
                if(itemData)
                    icon.src = `./assets/icons/${itemData.icon_name}`;
            }
        }
        
        currentAudio = null;
        currentAudioId = null;
        return;
    }
    
    if (currentAudio) {
        if(currentAudioId!== null )
            audioPositions[currentAudioId] = currentAudio.currentTime;
        currentAudio.pause();
        
        const prevCard = document.querySelector(`.card[data-id="${currentAudioId}"]`);
        if (prevCard) {
            const icon = prevCard.querySelector('img');
            if (icon) {
                const prevItemData = data.find(item => item.id === currentAudioId);
                if(prevItemData)
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
    
    const volumeSlider = document.querySelector('.volume-slider') as HTMLInputElement;
    if (volumeSlider) {
        currentAudio.volume = parseFloat(volumeSlider.value);
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

function renderItem(item: IDataItem) {
    const div = document.createElement('div');
    div.classList.add('card');
    div.setAttribute('data-id', String(item.id));

    div.style.backgroundImage = `url("./assets/${item.background}")`;
    const iconSrc = `./assets/icons/${item.icon_name}`;

    div.innerHTML = `<img src="${iconSrc}" alt="${item.id || 'sound'}">`;
    
    div.onclick = function() {
        if(backFiltered !== null)
            backFiltered.style.backgroundImage = `url("./assets/${item.background}")`;
        
        if (item.audio) {
            playAudio(item.audio, item.id);
        }
    };
    
    soundsContainer.appendChild(div);
}

function createVolumeControl() {
    const slider = document.querySelector('#volume-slider') as HTMLInputElement;

    if(slider)
        slider.addEventListener('input', function() {
            if (currentAudio) {
                currentAudio.volume = parseFloat(this.value);
            }
        });
}

function main(){
    createVolumeControl();
    data.forEach(renderItem);
}

main();