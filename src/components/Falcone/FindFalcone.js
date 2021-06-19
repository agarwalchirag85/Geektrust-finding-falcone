import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select,Radio} from "antd";

import { INITIALIZE_VEHICLES,
    INITIALIZE_VEHICLES_SELECTED,
    INITIALIZE_PLANETS,
    INITIALIZE_PLANETS_SELECTED,
    UPDATE_FINAL_ARRAY
     } from "../../reducers/Action";

import './dropdown.css';
const { Option } = Select;

class FindFalcone extends Component {
    constructor(props){
        super(props);
        this.state={
            dropDownSelectedValue: null,
            radioSelectedValue: null,
        }
    }

    //Removing the selected planets from the dropdown menu
    removingSelectedPlanet(selectedplanets,planetslist) {

        let copy=JSON.parse(JSON.stringify(planetslist));
        let planetslistname=copy.map((ele)=>{return ele.name});
        selectedplanets.forEach((x) => {
    
            let index = planetslistname.indexOf(x);
            if (index > -1) {
                copy.splice(index, 1);
                planetslistname.splice(index, 1);
            }
          });
        return copy;
    }

    //Handeling the selected planet from the dropdown
    handleChangeplanetevent = (e)=>{
    
            let selectedarray=this.props.selectedplanets;
            selectedarray[this.props.index]=e;
            this.props.upadateplanetlist(selectedarray);
            let filterarray=this.removingSelectedPlanet(selectedarray,this.props.planetslist);
            this.props.upadateplanet(filterarray);
            this.setState({dropDownSelectedValue: e});      
    }

    //Reducing the count of vechicle after radio button check
    radioHandlerRemover(selectedvechicle,vehiclelist){

        let copy=JSON.parse(JSON.stringify(vehiclelist));
        let vehicleNamelist = copy.map((x) => {
            return x.name;
          });
        selectedvechicle.forEach((x) => {        
            let index = vehicleNamelist.indexOf(x);
            if (index > -1) {
              if (copy[index].total_no > 0) {
                copy[index].total_no -= 1;
              }
            }
          });
        return copy;
    }

    //handeling the radio button check 
    handlerRadioVechicleSelection = (e)=>{

        let {vehicles, planets} = this.props;
        let distance = ((planets.filter(planet=>planet.name===this.state.dropDownSelectedValue))
                        .map(item => item.distance))[0];

        let speed = ((vehicles.filter(vehicle=>vehicle.name===e.target.value)
                    .map(item => item.speed)))[0];

        let selectedvehicles=this.props.selectedvehicles;
        selectedvehicles[this.props.index]=e.target.value;
        this.props.upadatevehiclelist(selectedvehicles);

        let reducevehiclelist=this.radioHandlerRemover(selectedvehicles,this.props.vehicles);
        this.props.upadatevehicle(reducevehiclelist);

        this.setState({radioSelectedValue: e.target.value});
        this.mapingthefinalarray(speed,distance);
    }

    //creating the final array with slected planet and selected vehicle 
    mapingthefinalarray = (speed , distance)=>{
    
        let result = {
                    name: this.props.name,
                    vehicle_name: this.state.radioSelectedValue,
                    vehicle_speed: speed,
                    distance: distance,
                    planet_name: this.state.dropDownSelectedValue
                };
        let resultarray = this.props.finalArray;
        if(resultarray.some(person=>person.name===this.props.name)){
            let index;
            for(let i=0;i<resultarray.length;i++){
                if(resultarray[i].name===this.props.name){
                        index = i;
                    }
                }
                resultarray[index] = result;
            }
            else{
                resultarray.push(result);
            }
            this.props.updateFinalArray(resultarray);
            this.props.calculatingTime(this.props.finalArray);
    }

    createDropDown = (data)=>{
        let planetslistname=data.map((ele)=>{return ele.name});

        let element=planetslistname.filter((ele)=> !this.props.selectedplanets.includes(ele))
        .map((item,index) =><Option key={index} value={item} >{item}</Option>);

        return element;
    }

    createRadio = (data)=>{
        let elements = data.map((item, index) => {
            return (
            
                    <Radio name={this.props.name}
                     value={item.name}
                     checked={item.name===this.state.radioSelectedValue}
                    key={index}
                    disabled={ item.max_distance >= this.props.planets.filter(planet=>planet.name===this.state.dropDownSelectedValue)
                        .map(item => item.distance)[0] && item.total_no > 0
                        ? false
                        : true}
                    >
                    <label>{item.name} ({item.total_no})</label>
                    </Radio>
                 
            )
        });
        return elements;
    }

    render() {
       
        return (
            <>
                <Select className='container-drop-down' onChange={e => this.handleChangeplanetevent(e)} 
                    value={this.props.selectedplanets[this.props.index] && this.props.selectedplanets[this.props.index] }
                > 
                    {this.createDropDown(this.props.planets)}

                </Select>
                <div className='container-radio'>
                    <Radio.Group
                        onChange={e => this.handlerRadioVechicleSelection(e)} 
                    >
                        { this.state.dropDownSelectedValue!=='select' && 
                          this.state.dropDownSelectedValue &&
                          this.createRadio(this.props.vehicleslist) }

                    </Radio.Group>    
                </div>
            </>
        )
    }
}

const mapStateToProps = (state)=>{
    return ({
        finalArray: state.finalArray,
        selectedplanets:state.selectedplanets,
        planetslist:state.planetslist,
        selectedvehicles: state.selectedvehicles,
        vehicleslist:state.vehicleslist
    })
}

const mapDispatchToProps = (dispatch)=>{
    return ({
        updateFinalArray: data=>dispatch({type:UPDATE_FINAL_ARRAY, payload: data}),
        upadateplanetlist:data=>dispatch({type:INITIALIZE_PLANETS_SELECTED,payload:data}),
        upadateplanet:data=>dispatch({type:INITIALIZE_PLANETS,payload:data}),
        upadatevehiclelist:data=>dispatch({type:INITIALIZE_VEHICLES_SELECTED,payload:data}),
        upadatevehicle:data=>dispatch({type:INITIALIZE_VEHICLES,payload:data})
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(FindFalcone);
