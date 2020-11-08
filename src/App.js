import './App.css';
import React, {Component} from 'react';
import Home from './components/Home';
import Result from './components/Result';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      showResult: false,
      planets: [],
      vehicles: []
    }
    this.showResult = this.showResult.bind(this);
  }

  showResult(planets, vehicles){
    this.setState({
      showResult: true,
      planets: planets,
      vehicles: vehicles
    })
  }


  render() {
    return (
        
        <div className="App">
          <header>
            <h1>Finding Falcone</h1>
          </header>
        <div className="container falcone-container">
          
          {
            this.state.showResult 
            ? <Result planets={this.state.planets} vehicles={this.state.vehicles}></Result> 
            : <Home showResult={this.showResult}></Home>
          }
         
        </div>
        <footer>Coding challenge by Shippit</footer>
      </div>
      
    );
  }

}


export default App;
