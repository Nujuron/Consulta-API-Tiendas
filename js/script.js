document.getElementById("xmr").addEventListener("click",showTiendasXMR);
document.getElementById("fetch").addEventListener("click",showTiendasFetch);
document.getElementById("jquery").addEventListener("click",showTiendasJQuery);
var urlTiendas = "http://localhost:8080/EmprInfRs_BritoAdrian/webresources/tienda";
var urlTiendaAdd = "http://localhost:8080/EmprInfRs_BritoAdrian/webresources/tienda/add";
const optionsGet = {
    method: "GET"
};
async function showTiendasFetch(){
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
function buildList(tiendas){
    
}
function buildTienda(tienda){
    let divTienda = document.createElement("div");
    divTienda.classList.add("card");
    let name = tienda.nombre;
}