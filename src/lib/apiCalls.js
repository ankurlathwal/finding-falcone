const axios = require('axios').default;
const base_url = 'https://findfalcone.herokuapp.com';

const getPlanets = async () => {
    let response;
    try{
        response = await axios.get(base_url + '/planets');
    }
    catch(error){
        console.log(error);
    }
    return response;
}

const getVehicles = async () => {
    let response;
    try{
        response = await axios.get(base_url + '/vehicles');
    }
    catch(error){
        console.log(error);
    }
    return response;
}

const findFalcone = async (planets, vehicles) => {
    let response;
    try{
        let token = await axios.get('https://5f5ff7f790cf8d00165573ed.mockapi.io/token',{});
        response = await axios.post('https://5f5ff7f790cf8d00165573ed.mockapi.io/find', {token: token, planet_names: planets, vehicle_names: vehicles});
        console.log(response);
    }
    catch(error){
        console.log(error);
    }
    return response;
}

module.exports = {
    getPlanets: getPlanets,
    getVehicles: getVehicles,
    findFalcone: findFalcone
}