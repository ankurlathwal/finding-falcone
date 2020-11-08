import React, {Component} from 'react';
import Battleground from './Battleground';
import Calculations from '../lib/calculations';
import {getPlanets, getVehicles} from '../lib/apiCalls';

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
          error: false,
          planets: [],
          originalVehicles: [],  
          vehicles: [],
          usedPlanets: [],
          usedVehicles: [],
          totalTime: 0,
          reset: false
        }
        this.useVehicle = this.useVehicle.bind(this);
        this.increaseVehicle = this.increaseVehicle.bind(this);
        this.getData = this.getData.bind(this);
        this.findFalcone = this.findFalcone.bind(this);
      }
    
      componentDidMount(){
          this.getData()
      }
    
      async getData(){
        let planetsData = [];
        let vehiclesData = []
          try{
            planetsData = await getPlanets();
            vehiclesData = await getVehicles();
          }
          catch(err){
            this.setState({
              error: true
            })
          }
          this.setState({
            planets: planetsData.data,
            vehicles: vehiclesData.data,
            originalVehicles: vehiclesData
          }, ()=>{
          })
      }
    
      useVehicle(usedVehicle, usedPlanet){
        // reduce the available vehicles
        let vehicles = [...this.state.vehicles];
        for(let vehicle of vehicles){
          if(vehicle.name === usedVehicle.name){
            vehicle.total_no--;
          }
        }
        let usedVehicles = [...this.state.usedVehicles];
        usedVehicles.push(usedVehicle.name);
    
        // add to Used Planet
        let usedPlanets = [...this.state.usedPlanets];
        usedPlanets.push(usedPlanet.name);
    
        let totalTime = this.state.totalTime;
        totalTime += Calculations.calculateTime(usedVehicle, usedPlanet);
    
        this.setState({
          vehicles: vehicles,
          usedVehicles: usedVehicles,
          usedPlanets: usedPlanets,
          totalTime: totalTime
        },()=>{
    
        })
      }
    
      increaseVehicle(increasedVehicle){
        let vehicles = [...this.state.vehicles];
        for(let vehicle of vehicles){
          if(vehicle.name === increasedVehicle.name){
            vehicle.total_no++;
          }
        }
        this.setState({
          vehicles: vehicles
        })
      }
    
      findFalcone(){
        this.props.showResult(this.state.usedPlanets, this.state.usedPlanets);
      }
    
      render(){
        return (
            <div>
                <p>Select planet you want to search in</p>
                <div>
                    Time Taken: <span className="badge badge-success">{this.state.totalTime}</span>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-8 offset-lg-2">
                        <Battleground
                            destinations={4}
                            planets={this.state.planets}
                            vehicles={this.state.vehicles}
                            usedPlanets={this.state.usedPlanets}
                            useVehicle={this.useVehicle}
                            increaseVehicle={this.increaseVehicle}
                        >
                        </Battleground>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-8 offset-lg-2">
                        <button type="button" class="btn btn-success" onClick={this.findFalcone}>Go find falcon!</button>
                    </div>
                </div>
            </div>
        );
      }
}

export default Home;