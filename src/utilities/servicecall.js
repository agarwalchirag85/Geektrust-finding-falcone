import { endpoint } from './config';

async function planetapilist(){

        let response;
        let URL = `${endpoint}planets`;
        response=await fetch(URL).then(value=> value.json()).catch(error=> alert(error));
        return response;
    
}

async function vehiclesapilist(){

    let response;
    let URL = `${endpoint}vehicles`;
    response=await fetch(URL).then(value=> value.json()).catch(error=> alert(error));
    return response;

}

async function generatetokenapi(){
    
    let response;
    let URL = `${endpoint}token`;
    response =await fetch(URL,{
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                        },
                        body: {},
                }).then(value =>value.json())
                .catch(error =>alert(error));

    return response;

}

async function findfalconeapi(payload)
{
   
    const data={
        token: (payload.token["token"]),
        planet_names:payload.planet_names,
        vehicle_names:payload.vehicle_names,
    }
    let response;
    let URL = `${endpoint}find`;
    response = fetch(URL,{
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type" : "application/json"
                        },
                        body:JSON.stringify(data),
                }).then(value=>value.json())
                .catch(error=>alert(error));

    return response;


}


export { planetapilist , vehiclesapilist , generatetokenapi , findfalconeapi};