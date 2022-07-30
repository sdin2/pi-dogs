const inicialState = {
    dogs : [],
    allDogs:[],
    temps: [],
    breeds:[],
    allbreeds:[],
    detail:[],
}

function rootReducer (state=inicialState, action){
    switch(action.type){
        case "GET_DOGS":
            
            return{
                ...state,
                dogs:action.payload,
                allDogs:action.payload,
            }


        case "GET_TEMPERAMENTS":
            return{
                ...state,
                temps:action.payload
            }


        case "GET_BREEDS":
            const allBreds=state.allDogs
            const allBredsFilterMap=allBreds.filter((e)=>(e.breed && e.breed )).map(e=>(e.breed)).sort(function(a,b){
                if(a.toLowerCase() > b.toLowerCase()) {return  1}
                if(a.toLowerCase() < b.toLowerCase()) {return -1}
                return 0
            })
            const allBredsalone=new Set(allBredsFilterMap)
            const allBreedsFinal= [...allBredsalone]
            return{
                ...state,
                breeds:allBreedsFinal,
                allbreeds:allBreedsFinal
            }


        case "FILTER_BY_TEMP":
            const allDogs = state.allDogs
            // console.log(action.payload, allDogs)
            const filterByTemp= action.payload ==="all" ? allDogs : allDogs.filter(e=>e.temperament.split(",").some(e=>e.trim()===action.payload))
            // console.log(filterByTemp)
            return{
                ...state,
                dogs: filterByTemp
            }

        case "FILTER_BY_BREEDS":
            const allDogs2 = state.allDogs
            // console.log(action.payload, allDogs2)
            const filterByBreed= action.payload ==="all" ? allDogs2 : allDogs2.filter(e=>(
                e.breed && e.breed===action.payload
                ))
            
            // console.log(filterByBreed)
            return{
                ...state,
                dogs: filterByBreed
            }
        case "ORDER_BY_NAME":
            let orderByName1= action.payload==="asc" ? state.dogs.sort(function(a,b){
                if(a.name.toLowerCase() > b.name.toLowerCase()) {return 1}
                if(a.name.toLowerCase() < b.name.toLowerCase()) {return -1}
                if(a.name==="No hay datos") {return -1}
                if(b.name==="No hay datos") {return -1}
                return 0
            }) : state.dogs.sort(function(a,b){
                if(a.name.toLowerCase() > b.name.toLowerCase()) {return -1}
                if(a.name.toLowerCase() < b.name.toLowerCase()) {return 1}
                if(a.name==="No hay datos") {return -1}
                if(b.name==="No hay datos") {return -1}
                return 0
            }) 
            return {
                ...state,
                dogs: orderByName1
            }
        case "ORDER_BY_PESO":
            // let pushflat=[]
            // pushflat.push(state.allDogs)
            // let d=pushflat.flat(1)
            let orderByPeso = action.payload === "weight asc" ? state.dogs.sort(function(b,a) {
                if (a.weightmax!=="No hay datos" && b.weightmax!=="No hay datos"){return (b.weightmax - a.weightmax)}
                else if (a.weightmax==="No hay datos" || b.weightmax==="No hay datos") { return -1}
                return 0
                // a.weightmax!="No hay datos" && b.weightmax!="No hay datos" ? a.weightmax - b.weightmax : a!=="No hay datos"? a.weightmax : b.weightmax
            }) : state.dogs.sort(function(a,b) {
                if (a.weightmax!=="No hay datos" && b.weightmax!=="No hay datos"){return (b.weightmax - a.weightmax)}
                else if (a.weightmax==="No hay datos" || b.weightmax==="No hay datos") { return -1}
                return 0
                // a.weightmax!="No hay datos" && b.weightmax!="No hay datos" ? b.weightmax - a.weightmax : a!=="No hay datos"? a.weightmax : b.weightmax 
            }) 
            return {
                ...state,
                dogs:orderByPeso
            }
            case "SEARCH_BAR":
                return {
                ...state,
                dogs: action.payload===""? state.allDogs: action.payload
            }
            case "POST_DOG":
                return {
                    ...state
                }
            case "POST_TEMP":
                return{
                    ...state
                }
            case "GET_DOG_ID":
                console.log(action.payload,"3")
                return{
                    ...state,
                    detail: action.payload
                }
        case "FILTER_BY_API_BD":
            const filterCreated =action.payload==="all" ? state.allDogs : action.payload==="BD" ? state.allDogs.filter(e=>e.createInDb) : state.allDogs.filter(e=>!e.createInDb)
            return{
                ...state,
                dogs:filterCreated
            }
            case "SEARCH_BAR_BREED":
                console.log(action.payload)
                return {
                ...state,
                dogs: action.payload==="" ? state.allDogs: action.payload
            }
            case "SEARCH_BAR_TEMP":
                console.log(action.payload)
                return {
                ...state,
                dogs: action.payload==="" ? state.allDogs: action.payload
            }
          
    default:
    return state;
}
}


export default rootReducer;