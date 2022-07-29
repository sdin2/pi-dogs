import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { searchBarsearch } from "../actions"


function SearchBar() {
    const dispatch = useDispatch()
    const [input, setInput] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(searchBarsearch(input))
    }
    const handleOnChange = (e) => {
        e.preventDefault()
        setInput(e.target.value)
        dispatch(searchBarsearch(e.target.value))
    }
    return (
        <form id="searchBar" onSubmit={e => handleSubmit(e)} >
            <input type="text" placeholder='escribe aqui' onChange={handleOnChange} className="input" />
            <button type='submit'>buscar</button>
        </form>
    )
}

export default SearchBar