//document.getElementById("xmr").addEventListener("click", showTiendasXMR);
document.getElementById("fetch").addEventListener("click", showTiendasFetch);
//document.getElementById("jquery").addEventListener("click", showTiendasJQuery);

var urlTiendas = "https://webapp-210130211157.azurewebsites.net/webresources/mitienda/";//change this shit when deployed

const optionsGet = {
    method: "GET"
};
/**
 * Deletes all chlidren from a specified nodes
 * @param {string} myNode 
 */
function deleteNodes(myNode) {
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
}
/**
 * Add the template inside main
 */
function initializeContent() {
    let t = document.getElementById("templatetiendas");
    var clone = document.importNode(t.content, true);
    document.body.firstElementChild.nextElementSibling.appendChild(clone);
    document.getElementById("newTienda").addEventListener("click",showForm);
    document.getElementById("searchById").addEventListener("click",getTiendaById);
}
/**
 * Get all tiendas with Fetch
 */
async function showTiendasFetch() {
    deleteNodes(document.body.firstElementChild.nextElementSibling);
    initializeContent();
    petitionFetch(urlTiendas, optionsGet);
}
/**
 * Get one tienda with Fetch
 */
async function getTiendaById() {
    deleteNodes(document.getElementById("tiendas"));
    var idTienda = document.getElementById("searchTienda").value;
    if(idTienda != null){
        petitionFetch(urlTiendas + idTienda , optionsGet);
    }
}
/**
 * Generic Fetch petition
 * @param {*} url 
 * @param {*} options 
 */
async function petitionFetch(url,options){
    //add loader here
    await fetch(url, options)
        .then(response => response.json())
        .then(data => buildList(data))
        .catch(error => {
            console.log(error);
        })
        //.finally
    //hide loader in .finally
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
function showForm(){
    document.getElementsByTagName("form")[0].style.display = "block";
}

