import styles from './vehicles.module.css';
import Calculations from '../lib/calculations';
import {useState} from 'react';

const Vehicles = (props) => {
    const [lastSelected, setLastSelected] = useState(null);

    const isCompatible = (vehicle) => {
        return Calculations.vehiclePlanetCompatibility(vehicle, props.selectedPlanet);
    }

    const isAvailable = (vehicle) => {
        if(vehicle.total_no > 0){
            return true;
        }
        return false;
    }

    const selectVehicleRadio = (vehicle) => {
        props.useVehicle(vehicle, props.selectedPlanet);
        handleLastSelected(vehicle);
    }

    const handleLastSelected = (vehicle) => {
        if(lastSelected){
            props.increaseVehicle(lastSelected)
        }
        setLastSelected(vehicle);
    }

    const vehicles = props.vehicles.map((vehicle)=>{
        return(
            <div className="form-check">
                <input 
                class="form-check-input" 
                type="radio" 
                name={"vehicles" + props.no} 
                id={"radio-" + vehicle.name} 
                value={vehicle.name} 
                disabled={isCompatible(vehicle) && isAvailable(vehicle) ? false : true} 
                onChange={(e)=>{selectVehicleRadio(vehicle)}}
                />
                <label class="form-check-label" for={"radio-" + vehicle.name}>
                    {vehicle.name}
                    <span class="badge badge-pill badge-success">  {vehicle.total_no}</span>
                </label>
            </div>
            
        )
    })
    return (
        <div className={styles.vehicleList}>
            {vehicles}
        </div>
    )
}

export default Vehicles;