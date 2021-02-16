document.getElementById("xmr").addEventListener("click", showTiendasXMR);
document.getElementById("fetch").addEventListener("click", showTiendasFetch);
//document.getElementById("jquery").addEventListener("click", showTiendasJQuery);

var urlTiendas = "https://webapp-210130211157.azurewebsites.net/webresources/mitienda/";//change this shit when deployed

/**
 * Deletes all chlidren from a specified nodes
 * @param {string} myNode 
 */
function deleteNodes(myNode) {
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
}

function displayLoading() {
    const loader = document.getElementsByClassName("loading")[0];
    loader.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
    }, 5000);
}

// hiding loading 
function hideLoading() {
    const loader = document.getElementsByClassName("loading")[0];
    loader.classList.remove("display");
}
/**
 * Call to build each tienda
 * @param {Json} tiendas 
 */
function buildList(tiendas) {
    for (let tienda of tiendas) {
        buildTienda(tienda);
    }
}
/**
 * Builds a card with the object information
 * @param {Object} tienda 
 */
function buildTienda(tienda) {
    //usar template maybe
    let divTienda = document.createElement("div");
    divTienda.classList.add("card");
    let nameTienda = document.createElement("h2");
    nameTienda.textContent = tienda.nombreTienda;
    let directionTienda = document.createElement("p");
    directionTienda.textContent = `${tienda.direccion} + (${tienda.localidad})`;
    let phoneTienda = document.createElement("p");
    phoneTienda.textContent = tienda.telefono;
    divTienda.appendChild(nameTienda);
    divTienda.appendChild(directionTienda);
    divTienda.appendChild(phoneTienda);
    document.getElementById("tiendas").appendChild(divTienda);
}
function showForm() {
    document.getElementsByTagName("form")[0].style.display = "block";
}

//-----------------------------------FETCH-------------------------------------------------------------------------------
/**
 * Add the template inside main for fetch
 */
function initializeContentFetch() {
    let t = document.getElementById("templatetiendas");
    var clone = document.importNode(t.content, true);
    document.body.firstElementChild.nextElementSibling.appendChild(clone);
    document.getElementById("newTienda").addEventListener("click", showForm);
    document.getElementById("searchById").addEventListener("click", getTiendaByIdFetch);
}
/**
 * Get all tiendas with Fetch
 */
async function showTiendasFetch() {
    deleteNodes(document.body.firstElementChild.nextElementSibling);
    initializeContentFetch();
    requestFetch(urlTiendas);
}
/**
 * Get one tienda with Fetch
 */
async function getTiendaByIdFetch() {
    deleteNodes(document.getElementById("tiendas"));
    var idTienda = document.getElementById("searchTienda").value;
    if (idTienda != null) {
        requestFetchId(urlTiendas + idTienda);
    }
}
/**
 * Generic Fetch petition
 * @param {*} url 
 * @param {*} options 
 */
/*async function requestFetch(url, datos, method = 'GET') {

    const options = {
      method,
      body: JSON.stringify(datos),
      headers: {
        'Content-Type': 'application/json' // we will be sending JSON
      }
    };
  
    // if params exists and method is GET, add query string to url
    // otherwise, just add params as a "body" property to the options object
    
  
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return result;
  
}*/
async function requestFetch(url, datos, method = 'GET') {
    displayLoading();
    const options = {
        method,
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json' // we will be sending JSON
        }
    };
    await fetch(url, options)
        .then(response => response.json())
        .then(data => {
            buildList(data);
            hideLoading();
        })
        .catch(error => {
            console.log(error);
        })
}
async function requestFetchId(url, datos, method = 'GET') {
    displayLoading();
    const options = {
        method,
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json' // we will be sending JSON
        }
    };
    await fetch(url, options)
        .then(response => response.json())
        .then(data => {
            buildTienda(data);
            hideLoading();
        })
        .catch(error => {
            console.log(error);
        })
    //.finally
    //hide loader in .finally
}
//-----------------------------------XMR-------------------------------------------------------------------------------
/**
 * Add the template inside main
 */
function initializeContentXMR() {
    let t = document.getElementById("templatetiendas");
    var clone = document.importNode(t.content, true);
    document.body.firstElementChild.nextElementSibling.appendChild(clone);
    document.getElementById("newTienda").addEventListener("click", showForm);
    document.getElementById("searchById").addEventListener("click", getTiendaByIdXMR);
}
async function showTiendasXMR() {
    deleteNodes(document.body.firstElementChild.nextElementSibling);
    initializeContentXMR();
    const client = new XMLHttpRequest();

    client.addEventListener("readystatechange", () => {
        if (client.readyState === 4 && client.status === 200)
            buildList(JSON.parse(client.responseText));
    });

    client.open("GET", urlTiendas);
    client.send();
}
async function getTiendaByIdXMR() {
    deleteNodes(document.getElementById("tiendas"));
    var idTienda = document.getElementById("searchTienda").value;
    if (idTienda != null) {
        const client = new XMLHttpRequest();

        client.addEventListener("readystatechange", () => {
            if (client.readyState === 4 && client.status === 200)
                buildTienda(JSON.parse(client.responseText));
        });

        client.open("GET", urlTiendas + idTienda);
        client.send();
    }
}
