var botonlogearse = "<a href='./StarScroll.zip' class='space-button'>Login</a>",
    botonregistrarse = "<a href='./StarScroll.zip' class='space-button'>Registrate</a>",
    cajaIntro = $('.star-wars-intro'),
    botonSkip = "<a class='botonSkip'>Saltar</a>";


//Nada mas se cargue la pagina
$(function () { 

    //Asignar al boton saltar la funcion para que salte la animacion
    botonSkip.click(pararAnimacion());
    
    //Comprobar que termina la animacion
    cajaIntro.toggleClass('change-size');
    cajaIntro.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',   
    function(e) {

    

  });

});

//Funcion para parar la animacion
function pararAnimacion(){
    cajaIntro.hide();
}


//Funcion para mostrar los botones de logearse y registrarse
function mostrarBotonesImportantes(){
    
}


