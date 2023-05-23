import { cleanState, searchBarsearch, getDogs, searchBarsearchBreed, searchBarsearchTemp } from "../actions"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"


function SearchBar() {
    const dispatch = useDispatch()
    const [input, setInput] = useState("")
    const allDogsList = useSelector((state) => state.dogs)
    let allDogsPush = []
    allDogsPush.push(allDogsList)
    allDogsPush = allDogsPush.flat(1)
    let allDogsPush1 = []
    allDogsPush.forEach(e => allDogsPush1.push(e.name))
    let allBredsFilterMap = allDogsPush.filter((e) => (e.breed && e.breed)).map(e => (e.breed)).sort(function (a, b) {
        if (a.toLowerCase() > b.toLowerCase()) { return 1 }
        if (a.toLowerCase() < b.toLowerCase()) { return -1 }
        return 0
    })
    const allBreedsAlone = new Set(allBredsFilterMap)
    const allBreedsFinal = [...allBreedsAlone]

    let allTemsFilterMap = allDogsPush.filter((e) => (e.temperament && e.temperament)).map(e => (e.temperament.split(",")))
    allTemsFilterMap = allTemsFilterMap.flat(Infinity)
    let allTemsFilterMapTrim = allTemsFilterMap.map(e => e.trim())
    const allTempsAlone = new Set(allTemsFilterMapTrim)
    const allTempsFinal = [...allTempsAlone]
    // allDogsPush1.forEach(e => console.log(e))



    useEffect(() => {
        dispatch(getDogs())
        return () => {
            dispatch(cleanState())
        }
    }, [dispatch])
    // console.log(allDogsList)

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     dispatch(searchBarsearch(input))
    // }


    const handleOnChange = (e) => {
        e.preventDefault()
        setInput(e.target.value)
        dispatch(searchBarsearch(e.target.value))
    }

    const handleOnChangeBreed = (e) => {
        e.preventDefault()
        // console.log(e.target.value)
        setInput(e.target.value)
        dispatch(searchBarsearchBreed(e.target.value))
    }

    const handleOnChangeTemp = (e) => {
        e.preventDefault()
        // console.log(e.target.value)
        setInput(e.target.value)
        dispatch(searchBarsearchTemp(e.target.value))
    }



    return (
        <form id="searchBar">   {/* onSubmit={e => handleSubmit(e)}> */}
            <label>
                <input list="data" type="text" placeholder='Busca por nombre' onChange={handleOnChange} className="input" />
            </label>
            <datalist id="data">
                {allDogsPush1.map(e =>
                    <option key={e} value={e}></option>
                )}
            </datalist>
            {/* <button type='submit'>buscar</button> */}

            <label>
                <input list="dataBreed" type="text" placeholder='Busca por raza' onChange={e => handleOnChangeBreed(e)} className="input" />
            </label>
            <datalist id="dataBreed">
                {allBreedsFinal.map(e =>
                    <option key={e} value={e}></option>
                )}
            </datalist>
            <label>
                <input list="dataTemp" type="text" placeholder='Busca por temperamento' onChange={e => handleOnChangeTemp(e)} className="input" />
            </label>
            <datalist id="dataTemp">
                {allTempsFinal.map(e =>
                    <option key={e} value={e}></option>
                )}
            </datalist>
        </form>
    )
}

export default SearchBar