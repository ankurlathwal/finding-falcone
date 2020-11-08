import './App.css';
import Battleground from './Components/Battleground';
import React, {Component} from 'react';
import Calculations from './lib/calculations';
import {getPlanets, getVehicles} from './lib/apiCalls';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      error: false,
      planets: [],
      vehicles: [],
      usedPlanets: [],
      usedVehicles: [],
      totalTime: 0
    }
    this.useVehicle = this.useVehicle.bind(this);
    this.increaseVehicle = this.increaseVehicle.bind(this);
    this.getData = this.getData.bind(this);
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
        vehicles: vehiclesData.data
      }, ()=>{
        console.log("state:");
        console.log(this.state.planets);
        console.log(this.state.vehicles);
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


  render(){
    return (
      <div className="App">
        <div className="container">
          
            <h1>Finding Falcone</h1>
            <small>Select planet you want to search in</small>
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
                <button type="button" class="btn btn-success">Go find falcon!</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

//const planets = [{ "name": "Donlon", "distance": 100 }, { "name": "Enchai", "distance": 200 }, { "name": "Jebing", "distance": 300 }, { "name": "Sapir", "distance": 400 }, { "name": "Lerbin", "distance": 500 }, { "name": "Pingasor", "distance": 600 }]
//const vehicles = [{"name":"Space pod","total_no":2,"max_distance":200,"speed":2},{"name":"Space rocket","total_no":1,"max_distance":300,"speed":4},{"name":"Space shuttle","total_no":1,"max_distance":400,"speed":5},{"name":"Space ship","total_no":2,"max_distance":600,"speed":10}];


export default App;
