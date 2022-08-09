import axios from "axios";

export function getDogs(){
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/dog");
        return dispatch({
            type:"GET_DOGS",
            payload:json.data
        })
    }
}


export function getTemperaments(){
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/temperament");
        return dispatch({
            type:"GET_TEMPERAMENTS",
            payload:json.data
        })
    }
}

export function getBreeds(){
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/dog");
        return dispatch({
            type: "GET_BREEDS",
            payload:json.data
        })
    }
}

export function filterByTemp(payload){
    return {
        type: "FILTER_BY_TEMP",
        payload
    }
}

export function filterByBreed(payload){
    return {
        type:"FILTER_BY_BREEDS",
        payload
    }
}

export function filterApiBd(payload){
    return {
        type:"FILTER_BY_API_BD",
        payload
    }
}

export function orderByName(payload){
    return{
        type:"ORDER_BY_NAME",
        payload
    }
}

export function orderByPeso(payload){
    return{
        type:"ORDER_BY_PESO",
        payload
    }
}



export function searchBarsearch(payload){
// console.log(payload)
    return async function(dispatch){
        try {
            const json = await axios.get(`http://localhost:3001/dog?name=${payload}`);
            // console.log(json.data)
            return dispatch({
                type:"SEARCH_BAR",
                payload:json.data
            })
        } catch (error) {
            return dispatch({
            type: "SEARCH_BAR",
            payload: "No se encontro ese perro"
            })
            
        }
    }
}

export function searchBarsearchBreed(payload){
    // console.log(payload)
        return async function(dispatch){
            try {
                const json = await axios.get(`http://localhost:3001/dog`);
                let dogsBreed= json.data.filter(e=>e.breed.toLowerCase().includes(payload.toLowerCase()))
                // console.log(json.data)
                return dispatch({
                    type:"SEARCH_BAR_BREED",
                    payload:dogsBreed
                })
            } catch (error) {
                return dispatch({
                type: "SEARCH_BAR_BREED",
                payload: "No se encontro ese perro"
                })
                
            }
        }
    }

    export function searchBarsearchTemp(payload){
        // console.log(payload)
            return async function(dispatch){
                try {
                    const json = await axios.get(`http://localhost:3001/dog`);
                    let dogsTemp= json.data.filter(e=>e.temperament.toLowerCase().includes(payload.toLowerCase()))
                    console.log(dogsTemp)
                    
                    // .includes(payload))
                    // console.log(json.data)
                    return dispatch({
                        type:"SEARCH_BAR_TEMP",
                        payload:dogsTemp
                    })
                } catch (error) {
                    return dispatch({
                    type: "SEARCH_BAR_TEMP",
                    payload: "No se encontro ese perro"
                    })
                    
                }
            }
        }


export function searchTemps(payload) {
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/temperament");
        const json2=payload==="" ? json.data : json.data.filter(e=>e.name.toLowerCase().includes(payload.toLowerCase())) 
        console.log(json2)
        return dispatch({
        type: "SEARCH_TEMPS",
        payload:json2
    })}
}

export function postDogs(payload){
    return async function(dispatch){
        // console.log(payload)
        payload.temperament=payload.temperament.toString().split(",").join(", ")
        // console.log(payload)
        if(!payload.heightmin && !payload.heightmax){
            payload.heightmax="No hay datos"
            payload.heightmin="No hay datos"
        }
        else if(!payload.heightmax) { 
            payload.heightmax=payload.heightmin;
            payload.heightmin="No hay datos"
        }
        else if (!payload.heightmin) {payload.heightmin="No hay datos"}
        
        if(payload.heightmax<payload.heightmin){
            let a=payload.heightmax
            payload.heightmax=payload.heightmin
            payload.heightmin=a
        }
        if(payload.weightmax<payload.weightmin){
            let a=payload.weightmax
            payload.weightmax=payload.weightmin
            payload.weightmin=a
        }

        if(!payload.weightmin && !payload.weightmax){
            payload.weightmax="No hay datos"
            payload.weightmin="No hay datos"
        }
        else if(!payload.weightmax) { 
            payload.weightmax=payload.weightmin;
            payload.weightmin="No hay datos"
        }
        else if (!payload.weightmin) {payload.weightmin="No hay datos"}

        if(!payload.image){payload.image="https://j.gifs.com/ygdY27.gif"}
        
        if(!payload.temperament){payload.temperament="Sin definir"}

        if(!payload.breed){payload.breed="Sin definir"}
        
        let a= payload.name.split("")
        a[0]=a[0].toUpperCase()
        payload.name=a.join("")

        let tempArray=[]
        let temperamentos=payload.temperament.split(",")
            temperamentos.forEach(e=>{
            e=e.trim()
            let a=e.split("")
            a[0]=a[0].toUpperCase()
            a=a.join("")
            tempArray.push(a)
            })
            payload.temperament=tempArray.toString()

            let b= payload.breed.split("")
            b[0]=b[0].toUpperCase()
            payload.breed=b.join("")
    

        const json = await axios.post("http://localhost:3001/dog", payload)
        // console.log(json)
        return json
    }
}



export function getDogById(payload){
    // console.log(payload,"1")
    return async function(dispatch){
        const json= await axios.get(`http://localhost:3001/dog/${payload}`)
        // console.log(json.data,"2")
        return dispatch({
            type: "GET_DOG_ID",
            payload: json.data[0]
        })
    }
}

export function delAgresives(payload){
    return {
        type: "NO_AGRESSIVES",
        payload
    }
}
// export function createTemp(payload,id){
// console.log(payload,id)
// return async function(dispatch){
// const json = await axios.post("http://localhost:3001/temperament", payload,id)
// console.log(json)
// return json
// }
// }
