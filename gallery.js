const galleryElem = document.querySelector('#gallery');

function toVideo() {
    window.location.href="index.html";
}


//Hämtar bilder från localstorage
function getImages() {
    const images = JSON.parse(localStorage.getItem('weddingApp'));

    for(const image of images) {
        createImage(image);
    }
}

//Event listener som tar bort bilderna och skapar element
function createImage(image) {
    const wrapp = document.createElement('article');
    wrapp.setAttribute('id', 'wrapp-button')
    const imageElem = document.createElement('img');
    imageElem.setAttribute('src', image.image);

    
    const removeElem = document.createElement('button');
    removeElem.setAttribute('id', 'remove-button')
    removeElem.addEventListener('click', () => {
        removePic(image);
        imageElem.remove();
        removeElem.remove();
    })

    wrapp.append(imageElem)
    wrapp.append(removeElem)
    galleryElem.append(wrapp);
}


//Tar bort bilder från localstorage och sen sparar de bilder som blir kvar
function removePic(image) {
    console.log(image)
    console.log(localStorage)

    let galleryRemove = JSON.parse(localStorage.getItem('weddingApp'));

    const id = galleryRemove.findIndex((x) => x.id == image.id)
    console.log(id)

    galleryRemove.splice(id, 1);
    galleryRemove = JSON.stringify(galleryRemove);

    localStorage.setItem('weddingApp', galleryRemove);
    
}
getImages();
