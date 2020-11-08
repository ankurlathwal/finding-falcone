const axios = require('axios').default;

const getPlanets = async () => {
    let response;
    try{
        response = await axios.get('https://findfalcone.herokuapp.com/planets');
        console.log(response);
    }
    catch(error){
        console.log(error);
    }
    return response;
}

const getVehicles = async () => {
    let response;
    try{
        response = await axios.get('https://findfalcone.herokuapp.com/vehicles');
        console.log(response);
    }
    catch(error){
        console.log(error);
    }
    return response;
}

// const findFalcone = async (planets, vehicles) => {

// }

module.exports = {
    getPlanets: getPlanets,
    getVehicles: getVehicles
}