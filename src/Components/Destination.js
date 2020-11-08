import Vehicles from './Vehicles';
import {useState} from 'react';

const Destination = (props) => {
    const [selectedPlanet, setSelectedPlanet] = useState(null);

    const getPlanetByName = (name) => {
        return props.planets.find((e)=>e.name===name);
    }

    const isPlanetUsed = (name) => {
        const index = props.usedPlanets.findIndex((e)=>e===name);
        if(index>-1){
            return true;
        }
        return false;
    }

    let planets;
    if(props.planets && props.planets.length){
        planets = props.planets.map((planet)=>{
            if(isPlanetUsed(planet.name)){
                return null;
            }
            return(<option key={planet.name} value={planet.name}>{planet.name}</option>)
        });
    }
    

    return(
        <div>
            <div className="row">
                <label for={"destinationSelect" + props.no}>Destination {props.no}</label>
                <select class="custom-select custom-select-sm" id={"destinationSelect" + props.no} onChange={(e)=>{setSelectedPlanet(getPlanetByName(e.target.value))}}>
                    <option value={null} selected>Select</option>
                    {planets}
                </select>
            </div>
            {selectedPlanet ? 
                <div className="row">
                    <div class="text-success"> {selectedPlanet.name} </div>
                    <Vehicles 
                        no={props.no} 
                        vehicles={props.vehicles} 
                        selectedPlanet={selectedPlanet} 
                        useVehicle={props.useVehicle} 
                        increaseVehicle={props.increaseVehicle}></Vehicles>
                </div>
            : null}
            
        </div>
    )
}

export default Destination;