document.getElementById("xmr").addEventListener("click",showTiendasXMR);
document.getElementById("fetch").addEventListener("click",showTiendasFetch);
document.getElementById("jquery").addEventListener("click",showTiendasJQuery);
var urlTiendas = "http://localhost:8080/EmprInfRs_BritoAdrian/webresources/tienda";//change this shit when deployed
var urlTiendaAdd = "http://localhost:8080/EmprInfRs_BritoAdrian/webresources/tienda/add";
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
 * Get all tiendas with Fetch
 */
async function showTiendasFetch(){
    deleteNodes(document.body.firstElementChild.nextElementSibling);
    initializeContent();
    //add loader here
    var tiendas = await fetch(urlTiendas,optionsGet)
        .then(response => response.text())
        .then(data => {
            return jsonTiendas = JSON.parse(data);
        })
        .catch(error => {
            console.log(error);
        })
        .finally
    //hide loader in .finally
    buildList(tiendas);
}
function getTiendaById(){
    
}
/**
 * Call to build each tienda
 * @param {Json} tiendas 
 */
function buildList(tiendas){
    for(let tienda of tiendas){
        buildTienda(tienda);
    }
}
/**
 * Builds a card with the object information
 * @param {Object} tienda 
 */
function buildTienda(tienda){
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
/**
 * Add the template inside main
 */
function initializeContent(){
    let t = document.getElementsById("templatetiendas");
    var clone = document.importNode(t.content, true);
    document.body.firstElementChild.nextElementSibling.appendChild(clone);
}