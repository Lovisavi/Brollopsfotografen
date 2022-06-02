//Hämtar kameran i datorn som sen kör serviceworker
//Pushar in bilderna i localstorage
const cameraButton = document.querySelector('#start-camera');
const videoElem = document.querySelector('#camera');
const takePicButton = document.querySelector('#take-image');
const canvas = document.querySelector('#img-canvas');
const notis = document.querySelector('#notify');

const ctx = canvas.getContext('2d');
let Stream;
let GalleryImgage = [];

//Service-Worker
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
        .then(() => { console.log('Service worker registered') })
        .catch(() => { console.log('Service worker not registered') });
    }
}
registerServiceWorker();

//Takes picture
window.addEventListener('load', async () => {
    if ('mediaDevices' in navigator) {
        Stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        console.log(Stream);
        videoElem.style.display = 'flex';
        videoElem.srcObject = Stream;

    }

    const oldImg = JSON.parse(localStorage.getItem('weddingApp'));
    oldImg.push(GalleryImgage)
    console.log(GalleryImgage)

});

takePicButton.addEventListener('click', () => {
    ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png'); 

    GalleryImgage.push({
        id: GalleryImgage.length,
        image: imageData        
    });

    localStorage.setItem('weddingApp', JSON.stringify(GalleryImgage));
    canvas.style.display = 'flex'

    //Notis
    notify.style.display = 'flex'

    setTimeout(function(){
        document.getElementById("notify").style.display = "none"; 
       }, 3000);

    setTimeout(function(){
        document.getElementById("img-canvas").style.display = "none"; 
       }, 3000);

});

//Changes to gallery
const galleryPage = document.querySelector('to-gallery');

function toGallery() {
    window.location.href="gallery.html";
}
    




