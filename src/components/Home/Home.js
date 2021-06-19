import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Spin,Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Header from '../Header/Header';
import Dropdown from '../Falcone/Dropdown';
import {NO_OF_DESTINATION} from "../../utilities/commonconstant/commonconstants";
import { findfalconeapi, generatetokenapi, planetapilist, vehiclesapilist } from '../../utilities/servicecall';
import { INITIALIZE_VEHICLES ,
         INITIALIZE_PLANETS, 
         GET_RESULT } from "../../reducers/Action";

import './home.css';

const antIcon = <LoadingOutlined style={{ fontSize: 45 }} spin />;

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            vehicles: [],
            planets: [],
            loading: false,
            totalTime: null,
            token: null,
        }
    }

    async componentDidMount(){
        
        //api call for planet list
        const planetsdata = await planetapilist(); 
        this.props.initializePlanets(planetsdata);
        this.setState({
             ...this.state,
             planets: planetsdata,
             
         });

        //api call for vehicle list
        const vehiclesdata= await vehiclesapilist();    
        this.props.initializeVehicles(vehiclesdata);
        this.setState({
                ...this.state,
                vehicles:vehiclesdata
        });
 
        //api call for token generation
        const generatetoken = await generatetokenapi(); 
        this.setState({token:generatetoken}) ;
            
        setTimeout(()=>{
            this.setState({loading: true})
        },2000);
    }

    //Time taken to reach planet
    calculatingTime = (data) => {

        let totalTime = 0;
        for(let i=0;i<data.length;i++){
            totalTime += data[i].distance/data[i].vehicle_speed;
        }
        this.setState({totalTime: totalTime})
    }

    //api call to finding the falcone
    async findingfalcone(payload){

    const findfalcone = await findfalconeapi(payload);
    if(findfalcone.status==="success")
    this.props.getResult(findfalcone);
    this.props.history.push('/result');

    }

    onClick = ()=>{
        const finalArray = this.props.finalArray;
        const vehicles = finalArray.map(item =>{
            return item.vehicle_name
        });
        const planets = finalArray.map(item=>{
            return item.planet_name
        });
        const payload = {
                token: this.state.token,
                planet_names: planets,
                vehicle_names: vehicles
            }  
        this.findingfalcone(payload);  
    }

    reset = ()=>{ 
        window.location.reload();
    }
    
    
    render() {
       
        return (
            <>
            <Header reset={this.reset} history={this.props.history} />
                {this.state.loading?
                <>
                    <div className='container-body'> 
                        <div className='container-dropdown'>
                            <Dropdown 
                                calculatingTime={this.calculatingTime} 
                                planets={this.state.planets} 
                                vehicles={this.state.vehicles} 
                            />
                        </div>
                       
                        <div className='container-timer'>
                            <div className='container-timer-content'>
                                <h2>Total Time</h2>
                                {this.state.totalTime&&<h3>{this.state.totalTime} Sec</h3>}
                            </div>
                        </div>
                    </div>
                    <div className='container-button'> 
                        <Button type="primary" danger
                                className='container-button-content'
                                disabled={this.props.finalArray.length!==NO_OF_DESTINATION}
                                onClick={this.onClick}               
                        >Find Falcone</Button>
                    </div>
                </> : <div className='container-spin'>
                        <Spin indicator={antIcon} />
                    </div>}
            </>
        )
    }
}

const mapStateToProps = (state)=>{
    return ({
        finalArray: state.finalArray,
    })
}

const mapDispatchToProps = (dispatch)=>{
    return ({
        initializeVehicles: data=>{ dispatch({type:INITIALIZE_VEHICLES, payload: data})},
        initializePlanets:data=>{ dispatch({type:INITIALIZE_PLANETS,payload:data})},
        getResult: data=>{ dispatch({type: GET_RESULT, payload: data})},
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
