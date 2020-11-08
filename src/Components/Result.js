import React, {Component} from 'react';
import {findFalcone} from '../lib/apiCalls';

class Result extends Component{
    constructor(props){
        super(props);
        this.state = {
            error: false,
            result: {},
            loading: true
        }
    }

    componentDidMount(){
        this.getResult();
    }

    async getResult(){
        let result;
        try{
            result = await findFalcone(this.props.planets, this.props.vehicles);
            console.log(result);
        }
        catch(error){
            console.log(error);
            this.setState({
                error: true,
                loading: false
            })
        }
        this.setState({
            result: result.data,
            loading: false
        })
    }

    render(){
        if(this.state.loading){
            return (
                <div>
                    <h1>Result loading...</h1>
                </div>
            )
        }
        return(
            <div>
                {
                    this.state.error
                        ? <div>Sorry, there was an error finding results!</div>
                        : <div>
                            {this.state.result && this.state.result.status === "success"
                                ? <div>
                                    <h1>Falcone Found!!</h1>
                                    <p>Falcone was found on planet {this.state.result.planet_name}</p>
                                </div>
                                : <div>
                                    <h1>Oops! Falcone was not found! Mission unsunccesful!!</h1>
                                </div>
                            }
                        </div>
                }
            </div>
        )
    }
}

export default Result;