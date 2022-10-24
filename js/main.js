const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btn_pCachorros = document.querySelector('.p_cachorros');
const btn_pAdultos = document.querySelector('.p_adultos');
const btn_gPequeños = document.querySelector('.g_pequeños');
const btnP_gAdultos = document.querySelector('.g_adultos');
const contenedorMascotas = document.querySelector('.contenedor__mascotas');
document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    contenedor__mascotas();
});

const eventos = () =>{
    menu.addEventListener('click',abrirMenu);
}

const abrirMenu = () =>{
     navegacion.classList.remove('ocultar');
     botonCerrar();
}

const botonCerrar = () =>{
    const btnCerrar = document.createElement('p');
    const overlay  = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');

    // while(navegacion.children[5]){
    //     navegacion.removeChild(navegacion.children[5]);
    // }
    navegacion.appendChild(btnCerrar);   
    cerrarMenu(btnCerrar,overlay);
    
}

const observer = new IntersectionObserver((entries, observer)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                const imagen = entry.target;
                imagen.src = imagen.dataset.src;
                observer.unobserve(imagen);
            }
        }); 
});


imagenes.forEach(imagen=>{
   
    observer.observe(imagen);
});

const cerrarMenu = (boton, overlay) =>{
    boton.addEventListener('click',()=>{
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add('ocultar');  
        boton.remove();
    }
}

const contenedor__mascotas = () =>{
    let arregloMascotas = [];
    const contenedor__mascotas = document.querySelectorAll('.mascot');

    contenedor__mascotas.forEach(mascot=> arregloMascotas = [...arregloMascotas,mascot]);

    const p_cachorros = arregloMascotas.filter(p_cachorro=> p_cachorro.getAttribute('data-mascot') === 'p_cachorro');
    const p_adultos = arregloMascotas.filter(p_adultos => p_adultos.getAttribute('data-mascot') === 'p_adultos');
    const g_pequeños = arregloMascotas.filter(g_pequeños => g_pequeños.getAttribute('data-mascot') === 'g_pequeños');
    const g_adultos = arregloMascotas.filter(g_adultos=> g_adultos.getAttribute('data-mascot') === 'g_adultos');

    mostrarMascotas(p_cachorros, p_adultos, g_pequeños, g_adultos, arregloMascotas);

}

const mostrarMascotas = (p_cachorros, p_adultos, g_pequeños, g_adultos, todos) =>{
    btn_pCachorros.addEventListener('click', ()=>{
        limpiarHtml(contenedorMascotas);
        p_cachorros.forEach(p_cachorro=> contenedorMascotas.appendChild(p_cachorro));
    });

    btn_pAdultos.addEventListener('click', ()=>{
        limpiarHtml(contenedorMascotas);
        p_adultos.forEach(p_adultos=> contenedorMascotas.appendChild(p_adultos));
    });

    btn_gPequeños.addEventListener('click', ()=>{
        limpiarHtml(contenedorMascotas);
        g_pequeños.forEach(g_pequeños=> contenedorMascotas.appendChild(g_pequeños));
    });

    btnP_gAdultos.addEventListener('click', ()=>{
        limpiarHtml(contenedorMascotas);
        g_adultos.forEach(g_adultos=> contenedorMascotas.appendChild(g_adultos));
    });

    btnTodos.addEventListener('click',()=>{
        limpiarHtml(contenedorMascotas);
        todos.forEach(todo=> contenedorMascotas.appendChild(todo));
    });
}

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}