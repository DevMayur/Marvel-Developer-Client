/*keys*/
var baseUrl = "";
var publicAPI = "3517d93a9e09c8b849525ffce1f66dea";
var privateAPI = "29660c66a665288bd61fbd97be3516d39fbd348b";

var title = document.getElementById("title");
var description = document.getElementById("description");
var descriptionPreview = document.getElementById("description-preview");
var descriptionText = document.getElementById("description-text");
var thumbnail = document.getElementById("thumbnail");
var header = document.getElementById("header");
var modified = document.getElementById("modified");

var charactersDiv = document.getElementById("characters");
var urlsDiv = document.getElementById("urls");
var seriesDiv = document.getElementById("series");
var variantsDiv = document.getElementById("variants");
var storiesDiv = document.getElementById("stories");
var eventsDiv = document.getElementById("events");
var creatorsDiv = document.getElementById("creators");

var charactersContainer = document.getElementById("characters-container");
var urlsContainer = document.getElementById("urls-container");
var seriesContainer = document.getElementById("series-container");
var variantsContainer = document.getElementById("variants-container");
var datesContainer = document.getElementById("date-container");
var pricesContainer = document.getElementById("price-container");
var storiesContainer = document.getElementById("stories-container");
var eventsContainer = document.getElementById("events-container");
var creatorsContainer = document.getElementById("creators-container");

var currentId = localStorage.getItem("2_currentId");
var result = JSON.parse(localStorage.getItem("2_" + currentId)).data.results[0];

title.textContent = result.title == "" ? "" : result.title;

description.textContent = result.description == "" ? "" : result.description;

if (result.thumbnail != null) {
    thumbnail.src =
        result.thumbnail == "" && result.thumbnail != null
            ? "No image found."
            : result.thumbnail.path + "." + result.thumbnail.extension;
}

header.textContent = result.name == "" ? "" : result.name;

var date = new Date("2014-04-29T14:18:17-0400").toLocaleDateString();
var time = new Date("2014-04-29T14:18:17-0400").toLocaleTimeString();
modified.textContent =
    result.modified == ""
        ? "No Modified date found."
        : " Modified on " + date + " at " + time;

addItems();

function addItems() {
    if (result.varients != undefined) {
        let charactersCount = result.characters.items.length;

        if (charactersCount != 0) {
            for (let i = 0; i < charactersCount; i++) {
                var varient = result.characters.items[i];
                charactersDiv.innerHTML += createItemsRow(
                    varient.name,
                    "",
                    varient.resourceURI
                );
            }
        } else {
            charactersContainer.style.display = "none";
            charactersDiv.style.display = "none";
        }
    } else {
        charactersContainer.style.display = "none";
        charactersDiv.style.display = "none";
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

    if (result.variants != undefined) {
        let variantsCount = result.variants.length;

        if (variantsCount != 0) {
            for (let i = 0; i < variantsCount; i++) {
                var varient = result.variants[i];
                variantsDiv.innerHTML += createItemsRow(
                    varient.name,
                    "",
                    varient.resourceURI
                );
            }
        } else {
            variantsContainer.style.display = "none";
            variantsDiv.style.display = "none";
        }
    } else {
        variantsContainer.style.display = "none";
        variantsDiv.style.display = "none";
    }

    if (result.series != undefined) {
        var series = result.series;
        seriesDiv.innerHTML += createItemsRow(
            series.name,
            "",
            series.resourceURI
        );
    } else {
        seriesContainer.style.display = "none";
        seriesDiv.style.display = "none";
    }

    if (result.textObjects != undefined) {
        if (result.textObjects.length >= 1) {
            descriptionPreview.innerHTML =
                result.textObjects[0].text == ""
                    ? ""
                    : result.textObjects[0].text;
            if (result.textObjects.length > 1) {
                descriptionText.innerHTML =
                    result.textObjects[1].text == ""
                        ? ""
                        : result.textObjects[1].text;
            }
        }
    }

    if (result.dates != undefined) {
        let datesCount = result.dates.length;
        for (let i = 0; i < datesCount; i++) {
            var date = result.dates[i];
            datesContainer.innerHTML += createDateItem(
                date.type,
                date.date,
                ""
            );
        }
    } else {
        datesContainer.style.display = "none";
    }

    if (result.prices != undefined) {
        let pricesCount = result.prices.length;
        for (let i = 0; i < pricesCount; i++) {
            var price = result.prices[i];
            pricesContainer.innerHTML += createDateItem(
                price.type,
                price.price,
                ""
            );
        }
    } else {
        pricesContainer.style.display = "none";
    }

    if (result.stories != undefined) {
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

    if (result.creators != undefined) {
        let creatorsCount = result.creators.items.length;

        if (creatorsCount != 0) {
            for (let m = 0; m < creatorsCount; m++) {
                var creator = result.creators.items[m];
                creatorsDiv.innerHTML += createItemsRow(
                    creator.role,
                    creator.name,
                    creator.resourceURI
                );
            }
        } else {
            creatorsContainer.style.display = "none";
            creatorsDiv.style.display = "none";
        }
    } else {
        creatorsContainer.style.display = "none";
        creatorsDiv.style.display = "none";
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

function createDateItem(mainHeader, itemHeader, resourceUrl) {
    return `<div class="date-item">
            <div class="date-label">${mainHeader} : </div>
            <div>${itemHeader}</div>
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

function openUrl(response) {
    window.open(decodeURIComponent(response), "_self");
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
