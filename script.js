var previousPosition = null;

function calculateSpeed(newPosition, oldPosition, timeDifference) {
    if (!oldPosition || !timeDifference) {
        return 0;
    }
    
    var distance = calculateDistance(newPosition.coords.latitude, newPosition.coords.longitude, 
                                     oldPosition.coords.latitude, oldPosition.coords.longitude);
    
    return distance / timeDifference; // Speed in meters per second
}

function calculateSpeedInKmPerHr(speedInMetersPerSec) {
    return speedInMetersPerSec * 3.6; // Convert m/s to km/hr
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Earth radius in meters
    var φ1 = lat1 * Math.PI / 180;
    var φ2 = lat2 * Math.PI / 180;
    var Δφ = (lat2 - lat1) * Math.PI / 180;
    var Δλ = (lon2 - lon1) * Math.PI / 180;

    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var distance = R * c;

    return distance;
}

function positionUpdate(position) {
    var now = new Date().getTime();
    var timeDifference = (now - position.timestamp) / 1000; // Convert to seconds

    var speed = calculateSpeed(position, previousPosition, timeDifference);
    var speedKmPerHr = calculateSpeedInKmPerHr(speed);

    document.getElementById('speed').textContent = speedKmPerHr.toFixed(2);

    // Update previousPosition for the next calculation
    previousPosition = position;
}

function errorCallback(error) {
    console.log("Error getting geolocation: " + error.code);
}

if ("geolocation" in navigator) {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    navigator.geolocation.watchPosition(positionUpdate, errorCallback, options);
} else {
    console.log("Geolocation is not supported by this browser.");
}