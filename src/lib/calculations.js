const vehiclePlanetCompatibility = (vehicle, planet) => {
    let compatible = false;
    try{
        if(planet.distance <= vehicle.max_distance){
            compatible = true;
        }
    }
    catch(error){
        console.log(error.message);
    }
    return compatible;
}

// calculates time taken by a vehicle to reach a planet
const calculateTime = (vehicle, planet) => {
    return planet.distance/vehicle.speed;
}

module.exports = {
    vehiclePlanetCompatibility: vehiclePlanetCompatibility,
    calculateTime: calculateTime
}