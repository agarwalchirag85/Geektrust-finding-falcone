import React, { Component } from 'react';
import { connect } from 'react-redux';

import FindFalcone from "./FindFalcone";
import { NO_OF_DESTINATION } from "../../utilities/commonconstant/commonconstants";

import './dropdown.css';

class Dropdown extends Component {
    render() {

        return(
            <div className='container-component'>    
                { Array.apply(null, { length: NO_OF_DESTINATION }).map((e, i) => (
                <div className='container-drop-down-field'>
                    <label>Destination {i+1}</label>
                    <FindFalcone calculatingTime={this.props.calculatingTime} 
                        name={`visited-${i + 1}`}
                        planets={this.props.planets} 
                        vehicles={this.props.vehicles} 
                        index={i}
                        value={this.props.selectedplanets[i]}
                    />
                </div> ))}
            </div>);
    }

}

const mapStateToProps = (state)=>{
    return ({
        selectedplanets: state.selectedplanets,
    })
};

export default connect(mapStateToProps)(Dropdown);