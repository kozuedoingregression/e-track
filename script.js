let watchId;
let lastPosition;
let speedDisplay = document.querySelector('.speed');
let startButton = document.getElementById('startButton');
let stopButton = document.getElementById('stopButton');
let distanceDisplay = document.querySelector('.distance');

startButton.addEventListener('click', startSpeedometer);
stopButton.addEventListener('click', stopSpeedometer);

function startSpeedometer() {
    if ('geolocation' in navigator) {
        startButton.disabled = true;
        stopButton.disabled = false;
        watchId = navigator.geolocation.watchPosition(updateSpeed);
    } else {
        alert('Geolocation is not available in your browser.');
    }
}

function stopSpeedometer() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = undefined;
        speedDisplay.textContent = '0.00';
        startButton.disabled = false;
        stopButton.disabled = true;
    }
}

function updateSpeed(position) {
    if (lastPosition) {
        const lat1 = lastPosition.coords.latitude;
        const lon1 = lastPosition.coords.longitude;
        const lat2 = position.coords.latitude;
        const lon2 = position.coords.longitude;
        const distance = calculateDistance(lat1, lon1, lat2, lon2);
        const timeDiff = (position.timestamp - lastPosition.timestamp) / 1000; // Convert to seconds
        const speed = (distance / timeDiff) * 3.6; // Convert m/s to km/h
        speedDisplay.textContent = speed.toFixed(2);
        console.log("hello");
        console.log(distance);
        distanceDisplay.textContent = distance+"m";
    }
    lastPosition = position;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c;
}
