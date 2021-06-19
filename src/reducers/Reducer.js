import { INITIALIZE_VEHICLES,
    INITIALIZE_VEHICLES_SELECTED,
    INITIALIZE_PLANETS,
    INITIALIZE_PLANETS_SELECTED,
    UPDATE_FINAL_ARRAY,
    GET_RESULT,
    RESET } from "./Action";

const initialstate = {

    vehicleslist: null,
    selectedvehicles:[],
    planetslist:null,
    selectedplanets:[],
    finalArray: [],
    resultData: [],
    
}

const Reducer = (state=initialstate, action)=>{

    if(action.type===INITIALIZE_VEHICLES){
        return ({
            ...state,
            vehicleslist: action.payload
        })
    }

    if(action.type===INITIALIZE_VEHICLES_SELECTED){
        return ({
            ...state,
            selectedvehicles: action.payload
        })
    }
    if(action.type===INITIALIZE_PLANETS){
        return ({
            ...state,
            planetslist: action.payload
        })
    }
    if(action.type===INITIALIZE_PLANETS_SELECTED){
        return ({
            ...state,
            selectedplanets: action.payload
        })
    }
    if(action.type===UPDATE_FINAL_ARRAY){
        return ({
            ...state,
            finalArray: action.payload
        })
    }
    if(action.type===GET_RESULT){
        return ({
            ...state,
            resultData: action.payload
        })
    }
    if(action.type===RESET){
        return ({
            vehicleslist: action.payload.vehicleslist,
            selectedvehicles: action.payload.selectedvehicles,
            planetslist:action.payload.planetslist,
            selectedplanets:action.payload.selectedplanets,
            finalArray: action.payload.finalArray,
            resultData: action.payload.resultData
        })
    }
    return state;
}

export default Reducer;