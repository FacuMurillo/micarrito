
//* CARRITO

let carrito = [];

function agregarCarrito(e){
    
    console.log("Producto agregado con exito");
    let padre = e.target.parentNode
    let abuelo = e.target.parentNode.parentNode
        
    let nombreProducto = padre.querySelector("h5").textContent;
    console.log(nombreProducto);
    let precioProducto = padre.querySelector(".precio").textContent;
    console.log("El precio del producto es de",precioProducto);
    let imgProducto = abuelo.querySelector("img").src;


    let productoAcu = carrito.find(producto => producto.nombre === nombreProducto);
    if(productoAcu) {
        productoAcu.cantidad += 1;
    } else {
    let producto = {
        nombre:nombreProducto,
        precio:precioProducto,
        img: imgProducto,
        cantidad: 1
    };
    carrito.push(producto);}
                            
    console.log(carrito);
    
    let historialCarrito = JSON.stringify(carrito);
    localStorage.setItem("historialDelCarrito" , historialCarrito );
    
    agregarProducto();

    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "El producto fue agregado",
        showConfirmButton: false,
        timer: 1500,
        showClass:{
            popup: `
                animate__animated
                animate__bounceInRight
                animate__faster
            `
        }
      });
    
}
function agregarProducto(){

    let tabla = document.getElementById("tbody");
    tabla.innerHTML = "";
    
    let total = 0;

    for(let producto of carrito){
        let fila = document.createElement("tr");
        fila.innerHTML = `<td><img src="${producto.img}" style="width: 50px;"></td>
                        <td><p>${producto.nombre}</p></td>
                        <td><p>${producto.cantidad}</p></td>
                        <td>${producto.precio}</td>
                        <td><button class="btn btn-danger borrarElemento">x</button></td>`;
        tabla.append(fila);

        let precioConvertido = parseFloat(producto.precio.replace('$',''));
        let calcularProducto = producto.cantidad * precioConvertido;
        total += calcularProducto;
    }
    let filaTotal = document.createElement("tr");
    filaTotal.innerHTML = `
                        <td colspan="3"></td>
                        <td><strong>Total:</strong></td>
                        <td><strong>$${total}</strong></td>`;

    tabla.append(filaTotal);

    let btnBorrar = document.querySelectorAll(".borrarElemento");
    for(let btn of btnBorrar){

        btn.addEventListener("click" , borrarProducto);

    }

}
function borrarProducto(e){

    console.log("Producto eliminado");
    Swal.fire({
        position: "bottom-end",
        icon: "warning",
        title: "Producto eliminado",
        showConfirmButton: false,
        timer: 1500
      });
    let abuelo = e.target.parentNode.parentNode;
    abuelo.remove();

    let productoEliminar = abuelo.querySelector("p").textContent;

    function actualizarCarrito(producto){
        if(producto.nombre === productoEliminar){
    
            if(producto.cantidad > 1){

                producto.cantidad -= 1;
                return true;

            } else{

                return false;

            }
        }
        return true;
    }
    carrito = carrito.filter(actualizarCarrito);

    agregarProducto();

    localStorage.setItem("historialDelCarrito", JSON.stringify(carrito));
    console.log(carrito);
}

let btnCompra = document.querySelectorAll(".btnCompra");

for(let boton of btnCompra){
    boton.addEventListener("click" , agregarCarrito);
}

let btnCarrito = document.getElementById("botonCarrito");
btnCarrito.addEventListener("click" , mostrarCarrito);

function mostrarCarrito(){
    let carrito = document.getElementById("carrito");
    if(carrito.style.display == "none" || carrito.style.display == ""){
        carrito.style.display = "block";
    }else{
        carrito.style.display = "none";
    }
};

function mostrarClima(data) {
    let climaHTML = `
        <p><strong>Ubicación:</strong> ${data.name}</p>
        <p><strong>Temperatura:</strong> ${data.main.temp} °C</p>
        <p><strong>Condiciones:</strong> ${data.weather[0].description}</p>
        <p><strong>Viento:</strong> ${data.wind.speed} m/s</p>
        <p><strong>Humedad:</strong> ${data.main.humidity} %</p>
        <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
    `;
    
    Swal.fire({
        title: 'Clima Actual',
        html: climaHTML,
        icon: 'info',
        confirmButtonText: 'Cerrar'
    });
}

function mostrarPosicion(posicion) {
    let lat = posicion.coords.latitude;
    let long = posicion.coords.longitude;

    let APIKEY = "a0b9c1d5d348cda4b9463a3d0eaa547a";

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKEY}&units=metric&lang=es`)
    .then(response => response.json())
    .then(data => mostrarClima(data))
    .catch(error => console.error('Error al obtener el clima:', error));
}

document.getElementById('botonClima').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mostrarPosicion, (error) => {
            Swal.fire({
                title: 'Error',
                text: `No se pudo obtener la ubicación. Error: ${error.message}`,
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
        });
    } else {
        Swal.fire({
            title: 'Error',
            text: 'La geolocalización no está soportada por tu navegador.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }
});