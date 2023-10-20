const submit = document.querySelector('input[type="submit"]');
const textInput = document.getElementById('dictWord');
const meaningContainer = document.getElementsByClassName('meaning')[0];
const carouselInner = document.createElement('div')
carouselInner.setAttribute('class', 'carousel-inner')


const getMeaning = async (word) => {
    try {
        let p = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word)
        let image = await fetch(`https://api.unsplash.com/search/photos?query=${word}&client_id=82rtlb0cOaUk4FhUMt8nCxap809rJm2yXTWIVZYEVVc`)
        if (p.ok && image.ok) {
            let response = await p.json();
            let mean = response[0]['meanings'][0]['definitions'];
            for (let i = 0; i < mean.length; i++) {
                let li = document.createElement('li');
                li.setAttribute('class', 'meaning-item text-xl w-full border-2 list-disc');
                li.innerHTML = mean[i]['definition']
                meaningContainer.appendChild(li)
            }
            meaningContainer.prepend(`Your Word is: ${word}`)
        } else {
            alert(`We Couldn't Found the Word.... ${word}`)
            meaningContainer.innerHTML = ''
        }
    }
    catch (error) {
        alert(`We are facing some technical glitch, unable to get meaning`)
    }
}

submit.addEventListener('click', (e) => {
    e.preventDefault();
    meaningContainer.innerHTML = ''
    if (textInput.value === '') {
        alert('Please Enter Something')
    } else if (/^\d+$/.test(textInput.value)) {
        alert('Please Enter valid Word!!!');
    } else {
        getMeaning(textInput.value);
    }
    let keyword = textInput.value;
    if (keyword !== '') {
        meaningContainer.innerHTML = `<div id="carouselExampleFade" class="carousel slide carousel-fade hidden">
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>`
        const carouselContainer = document.getElementById('carouselExampleFade')
        carouselContainer.prepend(carouselInner)
        carouselContainer.style.display = 'flex';
        // meaningContainer.innerHTML 
        carouselInner.innerHTML = ''
        searchImages(keyword);
    }
    textInput.value = '';
})

window.addEventListener('load', () => {
    textInput.focus();
})

function searchImages(keyword) {
    // Replace 'YOUR_ACCESS_KEY' with your Unsplash API access key
    const apiUrl = `https://api.unsplash.com/search/photos?query=${keyword}&client_id=82rtlb0cOaUk4FhUMt8nCxap809rJm2yXTWIVZYEVVc`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            displayImages(data.results);
        })
        .catch(() => {
            console.log("We couldn't find what you are looking for");
        });
}

function displayImages(images) {
    images.forEach((imageData) => {
        const imageElement = document.createElement('img');
        let carouselItem = document.createElement('div')
        carouselItem.setAttribute('class', 'carousel-item')
        imageElement.setAttribute('class', 'd-block w-100')
        imageElement.src = imageData.urls.small;
        carouselInner.appendChild(carouselItem)
        carouselInner.firstElementChild.classList.add('active')
        carouselItem.appendChild(imageElement);
    });
}