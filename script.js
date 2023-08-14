// NASA APIs PAGE ==> https://api.nasa.gov/index.html#recovery
// GITHUB API REPOSITORY ==> https://github.com/nasa/apod-api

// input type: date (YYYY-MM-DD), start_date and end_date (YYYY-MM-DD), hd (true or false)

// date example: 2014-10-01, 2020-12-10, 2020-12-26

alert("PLEASE USE THE US DATE FORMAT and INSERT YOUR API KEY BEFORE YOU START")

const inputDate = document.getElementById("inputDate")
const start_date = document.getElementById("start_date")
const end_date = document.getElementById("end_date")
const inputCheckbox = document.getElementById("inputCheckbox")

const searchBtn = document.getElementById("searchBtn")
const secondSearchBtn = document.getElementById("secondSearchBtn")
const thirdSearchBtn = document.getElementById("thirdSearchBtn")

const mediaContainer = document.querySelector(".mediaContainer")

const API_KEY = "YOUR_NASA_API_KEY"

const fetchData = (userInput) => {
    try {
        clearMediaContainer()
        fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}${userInput}`)
        .then(response => response.json())
        .then(json => displayMedia(json))
    }
    catch (error) {
        console.log(error)
        alert("something went wrong...")
    }
}

const clearMediaContainer = () => {
    mediaContainer.innerHTML = ""
}

const uploadData = (nasaData) => {
    if (nasaData.media_type == "image") {
        const titleElement = document.createElement("h2")
        let date = nasaData.date
        let new_date = date.replace(/-/g, "/")
        titleElement.innerText = `${nasaData.title} (${new_date})`
        mediaContainer.appendChild(titleElement)

        if (inputCheckbox.checked == true) {
            const imageElement = document.createElement("img")
            console.log("hdurl:", nasaData.hdurl)
            imageElement.src = nasaData.hdurl
            mediaContainer.appendChild(imageElement)
        }
        else {
            const imageElement = document.createElement("img")
            console.log("url:", nasaData.hdurl)
            imageElement.src = nasaData.url
            mediaContainer.appendChild(imageElement)
        }
        
        const descriptionElement = document.createElement("p")
        descriptionElement.innerText = nasaData.explanation
        mediaContainer.appendChild(descriptionElement)
    }
    else if (nasaData.media_type == "video") {
        const titleElement = document.createElement("h2")
        let date = nasaData.date
        let new_date = date.replace(/-/g, "/")
        titleElement.innerText = `${nasaData.title} (${new_date})`
        mediaContainer.appendChild(titleElement)

        const videoElement = document.createElement("iframe")
        videoElement.src = nasaData.url
        mediaContainer.appendChild(videoElement)
        
        const descriptionElement = document.createElement("p")
        descriptionElement.innerText = nasaData.explanation
        mediaContainer.appendChild(descriptionElement)
    }
}

const displayMedia = (mediaData) => {
    console.log("Media Data:", mediaData)
    if (Array.isArray(mediaData)) {
        mediaData.forEach(media => uploadData(media))
    }
    else {
        uploadData(mediaData)
    }
}

searchBtn.onclick = () => {
    fetchData(`&date=${inputDate.value}`)
    inputDate.value = ""
}

secondSearchBtn.onclick = () => {
    fetchData(`&start_date=${start_date.value}&end_date=${end_date.value}`)
    start_date.value = ""
    end_date.value = ""
}



