

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else {
    document.getElementById('speed').textContent = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {

  document.getElementById('distance').textContent = position.coords.longitude;

  document.getElementById('speed').textContent = position.coords.speed;


}

