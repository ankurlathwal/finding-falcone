import Destination from './Destination';

const Battleground = (props) => {
    const destinations = [];
    for(let i=0; i<props.destinations; i++){
        destinations.push(
            <div className="col-xs-12 col-md-3 col-sm-3 col-lg-3">
                <Destination
                    no={i + 1}
                    planets={props.planets}
                    vehicles={props.vehicles}
                    usedPlanets={props.usedPlanets}
                    useVehicle={props.useVehicle}
                    increaseVehicle={props.increaseVehicle}
                ></Destination>
            </div>
        );
    }

    return (
        <div className="row">
            {destinations}
        </div>
    )
}

export default Battleground;