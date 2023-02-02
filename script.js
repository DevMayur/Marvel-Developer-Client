/*keys*/
var baseUrl = "http://gateway.marvel.com/";
var publicAPI = "3517d93a9e09c8b849525ffce1f66dea";
var privateAPI = "29660c66a665288bd61fbd97be3516d39fbd348b";

/* API type */
const ApiType = {
    charactersList: 0,
    searchCharacters: 1,
};

/*endpoints*/

var charactersEndpoints = "/v1/public/characters";
var characterDetailsEndpoints =
    "/v1/public/characters"; /* add /${characterId} */

var characters;
var indexClickTracker = -1;

apiCall({
    endpoint: charactersEndpoints,
    type: ApiType.charactersList,
});

document
    .getElementById("search-submit")
    .addEventListener("click", function (event) {
        event.preventDefault();
        var searchInput = document.getElementById("search-input").value;
        apiCall({
            endpoint: charactersEndpoints,
            type: ApiType.searchCharacters,
            extraData: searchInput,
        });
    });

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

/*format endpoint*/
function apiCall(endpointData) {
    console.log(
        endpointData.type,
        " APITYPE == search : ",
        endpointData.type,
        ApiType.searchCharacters
    );
    console.log("request data *********************");
    let ts = Date.now();
    let formattedUrl =
        /* base url */ baseUrl + /* endpoint */ endpointData.endpoint;

    formattedUrl +=
        /* timestamp */ "?ts=" +
        ts +
        /* api key */ "&apikey=" +
        publicAPI +
        /* hashed ( timestamp + privateAPI + publicAPI ) */
        "&hash=" +
        generateMD5(ts + privateAPI + publicAPI);

    formattedUrl +=
        /*searchQuery*/ endpointData.type == ApiType.searchCharacters
            ? "&nameStartsWith=" + endpointData.extraData
            : "";

    console.log(formattedUrl);

    fetch(formattedUrl)
        .then(response => response.json())
        .then(data => {
            handleResponse({
                content: data,
                type: endpointData.type,
            });
        });
}

function handleResponse(response) {
    switch (response.type) {
        case ApiType.charactersList:
            populateCharactersToHtml(response.content);
            break;
        case ApiType.searchCharacters:
            populateCharactersToHtml(response.content);
            break;
        case ApiType.characterDetails:
            console.log(response.content);
            break;
    }
}

function generateMD5(input) {
    var hash = CryptoJS.MD5(input);
    return hash;
}

function populateCharactersToHtml(data) {
    characters = data;
    console.log(data);
    // generate HTML elements for each character
    let cardsHTML = "";
    for (let i = 0; i < data.data.results.length; i++) {
        var character = data.data.results[i];
        var htmlContent = getCharacterHtmlCard(character);
        cardsHTML += htmlContent;
    }

    document.querySelector(".grid-container").innerHTML = cardsHTML;
}

function getCharacterHtmlCard(data) {
    let elementId = data.id;

    var cardsHTML = `
        <div class="card" onclick="onCardClick(${elementId})">
          <img src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="${data.name}">
          <h5>${data.name}</h5>
          <p>${data.description}</p>
        </div>
      `;

    return cardsHTML;
}

function onCardClick(elementId) {
    Array.prototype.find.call(characters.data.results, x => {
        if (elementId === x.id) {
            submitJSON("showItemContent.html", x, "content");
        }
    });
}

function onFavourite(elementId) {
    Array.prototype.find.call(characters.data.results, x => {
        if (elementId === x.id) {
            addToFavourite("showItemContent.html", x, "content");
        }
    });
}

/*
    submit JSON as 'post' to a new page
    Parameters:
    path        (URL)   path to the new page
    data        (obj)   object to be converted to JSON and passed
    postName    (str)   name of the POST parameter to send the JSON
*/
function submitJSON(path, data, postName) {
    // convert data to JSON
    console.log(data);
    localStorage.setItem("1_currentId", data.id);
    localStorage.setItem("1_" + data.id, JSON.stringify(data));
    window.location.href = "details/showItemContent.html";
}

function addToFavourite(path, data, postName) {}

///v1/public/characters/1017100
