const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
const count = 30;
const collections = 1270951;
const apiKey = 'QgF5GGfG8BlEQVl-qbxPa6vwBAIMQZ4sgb8_ULoUBsA';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&collections=${collections}`;


//Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;

    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;


    }
}
//Helper function to Set attributes on DOm Elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}


//Create elements for links & photos and add it to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;

    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');

        setAttributes(item, {
            // href: photo.links.html,
            // target: '_blank',
        });

        const img = document.createElement('img');

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a> and <a> inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });

}


//Get photos from Unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiURL);
        photosArray = await response.json();
      displayPhotos();
    }catch (error){
        //Catch Error 
    }
}

//Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', ()=> {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();

    }
});

//On Load
getPhotos();