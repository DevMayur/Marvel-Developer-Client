/*keys*/
var baseUrl = "";
var publicAPI = "3517d93a9e09c8b849525ffce1f66dea";
var privateAPI = "29660c66a665288bd61fbd97be3516d39fbd348b";

var title = document.getElementById("title");
var description = document.getElementById("description");
var thumbnail = document.getElementById("thumbnail");
var header = document.getElementById("header");
var modified = document.getElementById("modified");

var comicsDiv = document.getElementById("comics");
var seriesDiv = document.getElementById("series");
var storiesDiv = document.getElementById("stories");
var eventsDiv = document.getElementById("events");
var urlsDiv = document.getElementById("urls");

var comicsContainer = document.getElementById("comics-container");
var seriesContainer = document.getElementById("series-container");
var storiesContainer = document.getElementById("stories-container");
var eventsContainer = document.getElementById("events-container");
var urlsContainer = document.getElementById("urls-container");

var currentId = localStorage.getItem("1_currentId");
var result = JSON.parse(localStorage.getItem("1_" + currentId));

title.textContent = result.name == "" ? "No title found." : result.name;

description.textContent =
    result.description == "" ? "No description found." : result.description;

thumbnail.src =
    result.thumbnail == ""
        ? "No image found."
        : result.thumbnail.path + "." + result.thumbnail.extension;

header.textContent = result.name == "" ? "No title found." : result.name;

var date = new Date("2014-04-29T14:18:17-0400").toLocaleDateString();
var time = new Date("2014-04-29T14:18:17-0400").toLocaleTimeString();
modified.textContent =
    result.modified == ""
        ? "No Modified date found."
        : " Modified on " + date + " at " + time;

addItems();

function addItems() {
    if (result.comics != undefined) {
        let comicsCount = result.comics.items.length;
        if (comicsCount != 0) {
            for (let i = 0; i < comicsCount; i++) {
                var comic = result.comics.items[i];
                comicsDiv.innerHTML += createItemsRow(
                    comic.name,
                    "",
                    comic.resourceURI
                );
            }
        } else {
            comicsContainer.style.display = "none";
            comicsDiv.style.display = "none";
        }
    } else {
        comicsContainer.style.display = "none";
        comicsDiv.style.display = "none";
    }

    if (result.series != undefined) {
        let seriesCount = result.series.items.length;
        if (seriesCount != 0) {
            for (let j = 0; j < seriesCount; j++) {
                var series = result.series.items[j];
                seriesDiv.innerHTML += createItemsRow(
                    series.name,
                    "",
                    series.resourceURI
                );
            }
        } else {
            seriesContainer.style.display = "none";
            seriesDiv.style.display = "none";
        }
    } else {
        seriesContainer.style.display = "none";
        seriesDiv.style.display = "none";
    }

    if (result.stories != null) {
        let storiesCount = result.stories.items.length;
        if (storiesCount != 0) {
            for (let k = 0; k < storiesCount; k++) {
                var stories = result.stories.items[k];
                storiesDiv.innerHTML += createItemsRow(
                    stories.name,
                    "",
                    stories.resourceURI
                );
            }
        } else {
            storiesContainer.style.display = "none";
            storiesDiv.style.display = "none";
        }
    } else {
        storiesContainer.style.display = "none";
        storiesDiv.style.display = "none";
    }

    if (result.events != undefined) {
        let eventsCount = result.events.items.length;
        if (eventsCount != 0) {
            for (let l = 0; l < eventsCount; l++) {
                var events = result.events.items[l];
                eventsDiv.innerHTML += createItemsRow(
                    events.name,
                    "",
                    events.resourceURI
                );
            }
        } else {
            eventsContainer.style.display = "none";
            eventsDiv.style.display = "none";
        }
    } else {
        eventsContainer.style.display = "none";
        eventsDiv.style.display = "none";
    }

    if (result.urls != undefined) {
        let urlsCount = result.urls.length;
        if (urlsCount != 0) {
            for (let m = 0; m < urlsCount; m++) {
                var url = result.urls[m];
                urlsDiv.innerHTML += createUrlsRow("", url.type, url.url);
            }
        } else {
            urlsContainer.style.display = "none";
            urlsDiv.style.display = "none";
        }
    } else {
        urlsContainer.style.display = "none";
        urlsDiv.style.display = "none";
    }
}

function createItemsRow(mainHeader, itemHeader, resourceUrl) {
    return `<div class="card" onclick="getResource('${encodeURIComponent(
        resourceUrl
    )}')">
        <h4>${mainHeader}</h4>
        <p>${itemHeader}</p>
    </div>`;
}

function createUrlsRow(mainHeader, itemHeader, resourceUrl) {
    return `<div class="card" onclick="openUrl('${encodeURIComponent(
        resourceUrl
    )}')">
        <h4>${itemHeader}</h4>
    </div>`;
}

function getResource(resourceUrl) {
    apiCall({
        type: ApiType.plain,
        endpoint: decodeURIComponent(resourceUrl),
    });
}

//Repeted

/* API type */
const ApiType = {
    charactersList: 0,
    searchCharacters: 1,
    plain: 2,
};

/*endpoints*/

var charactersEndpoints = "/v1/public/characters";
var characterDetailsEndpoints =
    "/v1/public/characters"; /* add /${characterId} */

/*format endpoint*/
function apiCall(endpointData) {
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
        case ApiType.plain:
            submitJSON("", response.content, "");
            break;
    }
}

function submitJSON(path, data, postName) {
    // convert data to JSON
    console.log(data);
    localStorage.setItem("2_currentId", data.id);
    localStorage.setItem("2_" + data.id, JSON.stringify(data));
    window.location.href = "../details2/showItemContent.html";
}

function generateMD5(input) {
    var hash = CryptoJS.MD5(input);
    return hash;
}

function openUrl(response) {
    window.open(decodeURIComponent(response), "_self");
}
