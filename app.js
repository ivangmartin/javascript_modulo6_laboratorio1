// Constantes.
const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;

// Entrada.
const products = [
    {
        description: "Goma de borrar",
        price: 0.25,
        tax: LOWER_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Lápiz H2",
        price: 0.4,
        tax: LOWER_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Cinta rotular",
        price: 9.3,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Papelera plástico",
        price: 2.75,
        tax: REGULAR_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Escuadra",
        price: 8.4,
        tax: REGULAR_TYPE,
        stock: 3,
        units: 0,
    },
    {
        description: "Pizarra blanca",
        price: 5.95,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Afilador",
        price: 1.2,
        tax: LOWER_TYPE,
        stock: 10,
        units: 0,
    },
    {
        description: "Libro ABC",
        price: 19,
        tax: EXEMPT_TYPE,
        stock: 2,
        units: 0,
    },
];

var contador = 1;
var span;
var input;
var main;
var div;
var br;
var input_container;

var changeUnit = (evento) => {
    var pos = evento.id.slice(8);
    products[parseInt(pos)]["units"] = evento.value;
    isEnableButton(products);
}

for (var producto of products) {

    input_container = "input-container" + (contador -1);
    div = document.createElement("div");
    div.setAttribute("class","input-container");
    div.setAttribute("id",input_container);
    document.getElementById("main").appendChild(div);

    //numero que indica la posicion del prducto en tu carrito
    span = document.createElement("span");
    span.setAttribute("class", "product-number");
    span.innerText = contador + ".";
    main = document.getElementById(input_container);
    main.appendChild(span);

    //descripcion + precio unitario producto
    span = document.createElement("span");
    span.setAttribute("class", "product-description");
    span.innerText = producto.description + " - " + producto.price + "€/ud.";
    main = document.getElementById(input_container);
    main.appendChild(span);

    //numero de unidades de cada producto
    input = document.createElement("input");
    input.setAttribute("class", "product-unit");
    input.setAttribute("type", "number");
    input.setAttribute("max", producto.stock);
    input.setAttribute("min", 0);
    input.setAttribute("value", producto.units);
    input.setAttribute("id", "producto" + (contador - 1));
    input.addEventListener("change", event => {
        changeUnit(event.target);
    });

    main = document.getElementById(input_container);
    main.appendChild(input);

    br = document.createElement("br");
    document.getElementById(input_container).appendChild(br);



    contador++;
}


//funcion calcular subtotal carrito
var subtotal = products => {
    var total = 0;
    for (var aux of products) {
        total += aux.units * aux.price;
    }
    return total;
}

//funcion calcular iva total
var iva = products => {
    var total = 0;
    var subtotal = 0;
    for (var aux of products) {
        subtotal = aux.units * aux.price;
        total += subtotal * (aux.tax / 100);
    }
    return total;

}

//funcion calcular total carrito con iva
var total = products => {
    return subtotal(products) + iva(products);
}

//funcion que muestra los totales cuando se pulsa el boton
var showTotal = () => {
    document.getElementById("subtotal_price").innerText = subtotal(products) + " €";
    document.getElementById("iva_price").innerText = iva(products) + " €";
    document.getElementById("total_price").innerText = total(products) + " €";
}

//funcion para habilitar o deshabilitar boton
var isEnableButton = products => {
    var i = 0;
    while ((i < products.length) && (products[i].units === 0)) {
        i++;
    }
    if (i === products.length) {
        document.getElementById("button-calculate").disabled = true;
    } else {
        document.getElementById("button-calculate").disabled = false;
    }
}

isEnableButton(products);

//events

document.getElementById("button-calculate").addEventListener("click", showTotal);





