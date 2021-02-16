document.getElementById("xmr").addEventListener("click", showTiendasXHR);
document.getElementById("fetch").addEventListener("click", showTiendasFetch);
document.getElementById("jquery").addEventListener("click", showTiendasJQuery);

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
    directionTienda.textContent = `${tienda.direccion} (${tienda.localidad})`;
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
function createObjectTienda() {
    var nameTienda = document.getElementById("nombre").value;
    var direccionTienda = document.getElementById("direccion").value;
    var localidadTienda = document.getElementById("localidad").value;
    var tlfTienda = document.getElementById("tlf").value;
    var jsonData = {
        "nombreTienda": nameTienda, "direccion": direccionTienda, "localidad": localidadTienda, "telefono": tlfTienda
    };
    return JSON.stringify(jsonData);
}



function addEventListeners() {
    var nameShop = document.getElementById("nombre");
    function validateName() {
        const errorMsg = nameShop.nextElementSibling;

        if (nameShop.validity.valueMissing) {
            nameShop.classList.add("error");
            nameShop.classList.remove("success");
            errorMsg.textContent = "Este campo es obligatorio";
            errorMsg.classList.add("errormsg");
        } else {
            nameShop.classList.remove("error");
            nameShop.classList.add("success");
            errorMsg.textContent = "Todo correcto";
            errorMsg.classList.add("goodmsg");
            errorMsg.classList.remove("errormsg");

        }
    }


    var direccion = document.getElementById("direccion");
    function validateDireccion() {
        const errorMsg = direccion.nextElementSibling;

        if (direccion.validity.valueMissing) {
            direccion.classList.add("error");
            direccion.classList.remove("success");
            errorMsg.textContent = "Este campo es obligatorio";
            errorMsg.classList.add("errormsg");
        } else {
            direccion.classList.remove("error");
            direccion.classList.add("success");
            errorMsg.textContent = "Todo correcto";
            errorMsg.classList.add("goodmsg");
            errorMsg.classList.remove("errormsg");
        }
    }


    var localidad = document.getElementById("localidad");
    function validateLocalidad() {
        const errorMsg = localidad.nextElementSibling;

        if (localidad.validity.valueMissing) {
            localidad.classList.add("error");
            localidad.classList.remove("success");
            errorMsg.textContent = "Este campo es obligatorio";
            errorMsg.classList.add("errormsg");
        } else {
            localidad.classList.remove("error");
            localidad.classList.add("success");
            errorMsg.textContent = "Todo correcto";
            errorMsg.classList.add("goodmsg");
            errorMsg.classList.remove("errormsg");

        }
    }


    var phone = document.getElementById("tlf");
    function validatePhone() {
        const errorMsg = phone.nextElementSibling;

        if (phone.validity.valueMissing) {
            phone.classList.add("error");
            phone.classList.remove("success");
            errorMsg.textContent = "Este campo es obligatorio";
            errorMsg.classList.add("errormsg");
        } else if (phone.validity.patternMismatch) {
            phone.classList.add("error");
            phone.classList.remove("success");
            errorMsg.textContent = "Introduzca un numero de telefono valido";
            errorMsg.classList.add("errormsg");
        } else {
            phone.classList.remove("error");
            phone.classList.add("success");
            errorMsg.textContent = "Todo correcto";
            errorMsg.classList.add("goodmsg");
            errorMsg.classList.remove("errormsg");

        }

    }
    phone.addEventListener("input", validatePhone);
    localidad.addEventListener("input", validateLocalidad);
    direccion.addEventListener("input", validateDireccion);
    nameShop.addEventListener("input", validateName);
}

function checkForm() {
    var phone = document.getElementById("tlf");
    var localidad = document.getElementById("localidad");
    var direccion = document.getElementById("direccion");
    var nameShop = document.getElementById("nombre");
    let countFails = 0;
    if (!nameShop.validity.valid) {
        countFails++;
    }
    if (!direccion.validity.valid) {
        countFails++;
    }
    if (!localidad.validity.valid) {
        countFails++;
    }
    if (!phone.validity.valid) {
        countFails++;
    }
    if (countFails == 0) {
        return createObjectTienda();
    } else {
        return -1;
    }
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
    document.getElementById("sendTienda").addEventListener("click", postFetch);
    document.getElementById("searchById").addEventListener("click", getTiendaByIdFetch);
    addEventListeners();
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
async function postFetch() {
    let data = checkForm();
    if (data != -1) {
        fetch(urlTiendas, {
            method: 'POST',
            body: data
        })
            .then(function (response) {
                if (response.ok) {
                    return response.text()
                } else {
                    throw "Error en la llamada Ajax";
                }
            })
            .then(function (texto) {
                console.log(texto);
            })
            .catch(function (err) {
                console.log(err);
            });
    }
}

//-----------------------------------XHR-------------------------------------------------------------------------------

/**
 * Add the template inside main
 */
function initializeContentXHR() {
    let t = document.getElementById("templatetiendas");
    var clone = document.importNode(t.content, true);
    document.body.firstElementChild.nextElementSibling.appendChild(clone);
    document.getElementById("newTienda").addEventListener("click", showForm);
    document.getElementById("searchById").addEventListener("click", getTiendaByIdXHR);
    document.getElementById("sendTienda").addEventListener("click", postXHR);
    addEventListeners();
}
async function showTiendasXHR() {
    deleteNodes(document.body.firstElementChild.nextElementSibling);
    initializeContentXHR();
    const client = new XMLHttpRequest();

    client.addEventListener("readystatechange", () => {
        if (client.readyState === 4 && client.status === 200)
            buildList(JSON.parse(client.responseText));
    });

    client.open("GET", urlTiendas);
    client.send();
}
async function getTiendaByIdXHR() {
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
async function postXHR() {
    let data = checkForm();
    if (data != -1) {
        let http = new XMLHttpRequest();
        http.open('POST', urlTiendas, true);
        http.setRequestHeader('Content-type', 'application/json');
        http.onreadystatechange = function () {
            showTiendasXHR();
        }
        http.send(data);
        showTiendasXHR();
    }
}
//-----------------------------------Jquery-------------------------------------------------------------------------------
function initializeContentJquery() {
    let t = document.getElementById("templatetiendas");
    var clone = document.importNode(t.content, true);
    document.body.firstElementChild.nextElementSibling.appendChild(clone);
    document.getElementById("newTienda").addEventListener("click", showForm);
    document.getElementById("searchById").addEventListener("click", getTiendaByIdJquery);
    document.getElementById("sendTienda").addEventListener("click", postJquery);
    addEventListeners();
}
function showTiendasJQuery() {
    deleteNodes(document.body.firstElementChild.nextElementSibling);
    initializeContentJquery();
    getTiendasJquery(urlTiendas);
}
function getTiendaByIdJquery() {
    deleteNodes(document.getElementById("tiendas"));
    var idTienda = document.getElementById("searchTienda").value;
    if (idTienda != null) {
        getTiendaIdJquery(urlTiendas + idTienda);
    }
}
async function getTiendasJquery(url) {
    await $.get(url, function (json) {
        buildList(json);
    });
}
async function getTiendaIdJquery(url) {
    await $.get(url, function (json) {
        buildTienda(json);
    });
}
async function postJquery(){
    let data = checkForm();
    if (data != -1) {
        $.post( urlTiendas, data);
        showTiendasJQuery();
    }
    
}
