document.addEventListener('DOMContentLoaded', function () {
    var sedeItems = document.querySelectorAll('.sede-item');
    var mapIframe = document.getElementById('mapa');
    sedeItems.forEach(function (item) {
      item.addEventListener('click', function () {
        // Elimina la clase active de todos los elementos
        sedeItems.forEach(function (el) {
          el.classList.remove('active');
        });
        // Añade la clase active al elemento seleccionado
        this.classList.add('active');
        // Obtiene las coordenadas (data-lat y data-lng) de la sede seleccionada
        var lat = this.getAttribute('data-lat');
        var lng = this.getAttribute('data-lng');
        // Actualiza el atributo src del iframe para mostrar la nueva ubicación
        var newSrc = 'https://www.google.com/maps?q=' + lat + ',' + lng + '&hl=es&z=16&output=embed';
        mapIframe.src = newSrc;
      });
    });
  });