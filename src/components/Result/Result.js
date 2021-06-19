import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import Header from '../Header/Header';
import {RESET} from "../../reducers/Action";

import './result.css';

class Result extends Component {
    
    onClick = ()=>{

        const initialstate = {
            vehicleslist: null,
            selectedvehicles:[],
            planetslist:null,
            selectedplanets:[],
            finalArray: [],
            resultData: [],   
        }

        this.props.resetstate(initialstate);
        this.props.history.push('/');

    }
    render() {
        return (
            <>
            <Header history={this.props.history} />
            <div className='wrapper-result'>
                <div className='container-result'>
                    <div className='content-result'>
                        {this.props.resultData && this.props.resultData.status?
                        <>
                        <h2>Success! Congratulation on Finding Falcano, King shan will be happy!!</h2>
                        <p>Planet Found: {this.props.resultData.planet_name}</p>
                        </>:
                        <h2>You couldn't find queen, King will be angry :(</h2>
                        }
                    </div>
                    <Button type="primary" danger
                            className='container-button-content'
                            onClick={this.onClick}
                    >
                        Start Again
                    </Button>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state)=>{
    return ({
        resultData: state.resultData, 
    })
}

const mapDispatchToProps = (dispatch)=>{
    return ({
        resetstate: data=>{dispatch({type:RESET,payload:data})},
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(Result);
