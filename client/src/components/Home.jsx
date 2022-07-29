import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getDogs, getTemperaments, filterByTemp, getBreeds, filterByBreed, orderByName, orderByPeso, filterApiBd } from "../actions";
import { NavLink } from "react-router-dom"
import SearchBar from "./SearchBar";
import Paginado from "./Paginado";
import Card from "./Card";

export default function Home() {
    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)
    const allTemps = useSelector((state) => state.temps)
    const allBreds = useSelector((state) => state.breeds)
    //es lo mismo que usar max state to props pero mas facil...
    //el useselector trae todo lo que esta en estado de recipes
    const [orden, setOrden] = useState(" ")
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogPerPage] = useState(8)
    const indexOfLastDogs = currentPage * dogsPerPage
    const indexOfFirstDogs = indexOfLastDogs - dogsPerPage
    const currentDogs = allDogs.length ? allDogs.slice(indexOfFirstDogs, indexOfLastDogs) : []
    const paginado = (pageNumber) => { setCurrentPage(pageNumber) }


    useEffect(() => {
        dispatch(getDogs())
        dispatch(getTemperaments())
        dispatch(getBreeds())
    }, [dispatch])


    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs(), document.getElementById("form").reset(), document.getElementById("searchBar").reset())
        // setCurrentPage(1)
    }

    function handleFilterTemps(e) {
        dispatch(filterByTemp(e.target.value))
        document.getElementById("apiFilter").selectedIndex = 0
        document.getElementById("breedFilter").selectedIndex = 0
        setCurrentPage(1)
    }
    function handleFilterBreeds(e) {
        dispatch(filterByBreed(e.target.value))
        setCurrentPage(1)
        document.getElementById("apiFilter").selectedIndex = 0
        document.getElementById("tempFilter").selectedIndex = 0
    }

    function handleOrderName(e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(e.target.value)
    }
    function handleOrderPeso(e) {
        e.preventDefault()
        dispatch(orderByPeso(e.target.value))
        setCurrentPage(1)
        setOrden(e.target.value)
    }
    function handleFilterApiBd(e) {
        e.preventDefault()
        dispatch(filterApiBd(e.target.value))
        setCurrentPage(1)
    }



    return (
        <div>
            <NavLink to="/dogcreate"><button className="button-create">Crear un nuevo perro</button></NavLink>
            <h1>Busca a tu perro</h1>


            <form id="form">
                <select id="apiFilter" onChange={e => handleFilterApiBd(e)}>
                    <option hidden>Filtrar por api o Base de datos</option>
                    <option value="all">Todo</option>
                    <option value="api">Api</option>
                    <option value="BD">Base de datos</option>
                </select>
                <select id="tempFilter" onChange={e => handleFilterTemps(e)}>
                    <option hidden>Filtrar por temperamento</option>
                    <option value="all">Todos los temperamentos</option>
                    <option value="Sin definir">Sin definir</option>
                    {allTemps && allTemps.map(e => {
                        return (
                            <option value={e.name} key={e.id}>{e.name}</option>

                        )

                    })
                    }
                </select>
                <select id="breedFilter" onChange={e => handleFilterBreeds(e)}>
                    <option hidden>Filtrar por raza</option>
                    <option value="all">Todas las razas</option>
                    <option value="Sin definir">Sin definir</option>
                    {allBreds && allBreds.map(e => {
                        return (<option value={e} key={e}>{e}</option>)
                    })}
                </select>
                <select onChange={e => handleOrderPeso(e)}>
                    <option hidden>Ordenar por peso</option>
                    <option value="weight asc">Ordenar por peso ascendente</option>
                    <option value="weight desc">Ordenar por peso descendente</option>
                </select>
                <select onChange={e => handleOrderName(e)}>
                    <option hidden>Ordenar por nombre</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            </form>
            <button onClick={e => { handleClick(e) }} className="button-reset">
                Resetear filtros
            </button>
            <div>
                <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs} paginado={paginado} />
            </div>
            <SearchBar />
            <div className="cardsgrid">
                {
                    typeof currentDogs === "object" ? currentDogs.map(e => {
                        return (
                            <NavLink key={e.id} to={`${e.id}`} className="navlink" >
                                <Card name={e.name} heightmax={e.heightmax} weightmin={e.weightmin} heightmin={e.heightmin} weightmax={e.weightmax} id={e.id} life_span={e.life_span} image={e.image ? e.image : e.img} temperament={e.temperament} breed={e.breed} />
                            </NavLink>
                        )
                    }) : "No se encontraron perros con ese nombre"
                }
            </div>
            <div>
                <Paginado className="paginado" dogsPerPage={dogsPerPage} allDogs={allDogs} paginado={paginado} />
            </div>
        </div>
    )
}
