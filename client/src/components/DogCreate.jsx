import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { getTemperaments, getBreeds, postDogs, getDogs, searchTemps, tempCreate } from "../actions";
import { useNavigate } from 'react-router-dom';

let re1 = new RegExp("[0-9!·$%&/()=?¿´ç`+-.<>@|#~€¬}]");
let re2 = new RegExp("[a-zA-Z!·$%&/()=?¿´ç`+-.<>@|#~€¬}]");



function validate(input) {
    let error = {};
    if (!input.name) {
        error.name = "Se requiere un nombre"
    }
    else if (re1.test(input.name)) {
        error.name = "El nombre solo puede contener letras"
    }
    if (!input.temperament) {
        error.temperament = "Se requiere por lo menos un temperamento"
    }
    if (!input.heightmax) {
        error.heightmax = "Se requiere una altura maxima"
    }
    else if (re2.test(input.heightmax)) {
        error.heightmax = "La altura solo puede contener numeros"
    }
    if (!input.heightmin) {
        error.heightmin = "Se requiere una altura minima"
    }
    else if (re2.test(input.heightmin)) {
        error.heightmin = "La altura solo puede contener numeros"
    }
    if (!input.weightmax) {
        error.weightmax = "Se requiere un peso maximo"
    }
    else if (re2.test(input.weightmax)) {
        error.weightmax = "El peso solo puede contener numeros"
    }
    if (!input.weightmin) {
        error.weightmin = "Se requiere un peso minimo"
    }
    else if (re2.test(input.weightmin)) {
        error.weightmin = "El peso solo puede contener numeros"
    }
    if (input.breed === "") {
        error.breed = "Se requiere por lo menos una raza"
    }
    else if (re1.test(input.breed)) {
        error.breed = "La raza solo puede contener letras"
    }
    if (input.temperament.length === 0) {
        error.temperament = "Debe seleccionar por lo menos un temperamento"
    }
    return error
}



export default function DogCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const breeds = useSelector((state) => state.allbreeds)
    let temperament = useSelector((state) => state.temps)
    let temperamentPush = []
    temperamentPush.push(temperament)
    temperamentPush = temperamentPush.flat(1)
    const [render, setRender] = useState("")
    const [error, setError] = useState({})
    const [input, setInput] = useState({
        name: "",
        heightmax: "",
        heightmin: "",
        weightmax: "",
        weightmin: "",
        life_span: "",
        breed: "",
        image: "",
        temperament: [],
    })

    useEffect(() => {
        dispatch(getDogs())
        dispatch(getTemperaments())
        dispatch(getBreeds())
    }, [dispatch])



    function handleOnchange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleCheck(e) { // este es para el ratio
        e.target.checked ?
            setInput({
                ...input,
                breed: e.target.value
            }) :
            setError(validate({
                ...input,
                breed: e.target.value
            }))

        // console.log(input.breed)
    }


    function handleBreedCreator(e) {
        e.preventDefault()
        if (e.target.value === "") {
            alert("el campo no puede estar vacio")
        }
        // console.log(e.target.value)
        else if (re1.test(e.target.value)) {
            alert("no se puede escribir numeros")
            e.target.value = ""
        }
        else {
            let nameMayusc = e.target.value.toLowerCase().split("")
            nameMayusc[0] = nameMayusc[0].toUpperCase()
            e.target.value = nameMayusc.join("")
            breeds.filter(b => b === e.target.value).length === 0 ? breeds.push(e.target.value) : e.target.value = ""
            setRender({
                render: e.target.value
            })
            e.target.value = ""
        }
        setRender({
            render: e.target.value
        })
    }

    function handleTempCreator(e) {
        e.preventDefault();
        if (e.target.value === "") {
            return (
                alert("el campo no puede estar vacio")
            )
        }
        else if (re1.test(e.target.value)) {
            return (
                alert("no se puede escribir numeros"),
                e.target.value = "")
        }
        else {
            // console.log(e.target.value)
            let nameMayusc = e.target.value.toLowerCase().split("")
            nameMayusc[0] = nameMayusc[0].toUpperCase()
            e.target.value = nameMayusc.join("")
            let randomKey = Math.random()
            temperament.filter(b => b.name.toLowerCase() === e.target.value.toLowerCase()).length === 0 ? temperament.push({ name: e.target.value, id: randomKey })
                : e.target.value = ""
            setRender({
                randomKey
            })
            e.target.value = ""
        }
    }

    function handleSelect(e) { //este es para el checkbox
        // console.log(e.target.value)
        e.target.checked ? setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        }) : setInput({
            ...input,
            temperament: input.temperament.filter(b => e.target.value !== b)
        })
        setError(validate({
            ...input,
            temperament: e.target.value
        })
        )


        // console.log(input.temperament)

    }

    function handleUncheck(e) {
        e.preventDefault()
        let checkBox = document.querySelectorAll("input[type='checkbox']")
        // console.log(checkBox)
        for (let i = 0; i < checkBox.length; i++) {
            if (checkBox[i].checked === true) {
                checkBox[i].checked = false
            }
        }
        setInput({
            ...input,
            temperament: []
        })
    }

    let button = document.getElementsByClassName("button")

    function handleSubmit(e) {
        e.preventDefault(e)
        if (input.name === "" || input.heightmax === "" || input.heightmin === "" || input.weightmax === "" || input.weightmin === "" || input.temperament.length === 0 || input.breed === "") {
            button.disabled = true
        }
        else {
            button.disabled = false
            dispatch(postDogs(input))
            alert("Perro creado correctamente")
            let radio = document.querySelectorAll("input[type='radio']")
            console.log(radio)
            let checkBox = document.querySelectorAll("input[type='checkbox']")
            radio.forEach(e => {
                e.checked = false
            });
            for (let i = 0; i < checkBox.length; i++) {
                if (checkBox[i].checked === true) {
                    checkBox[i].checked = false
                }
            }
            setInput({
                name: "",
                heightmax: "",
                heightmin: "",
                weightmax: "",
                weightmin: "",
                life_span: "",
                breed: "",
                image: "",
                temperament: [],
            })
            // navigate('/home');
        }
    }
    function handleOnchangeTemperamentSearch(e) {
        dispatch(searchTemps(e.target.value))
    }

    return (
        <div className="dogCreate">
            <div className="container-dogCreate">
                <h1 className="h1-dogCreate">Creá a tu perro</h1>
                <img src="https://i.gifer.com/origin/52/52e4bb28d095ff93d3a4019d43d628bc.gif" className="image-dog" />
            </div>
            <Link to="/home" className="navlink"><button className="button">Volver</button></Link>
            <h4>Los campos con * son obligatorios</h4>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="cointainer3">
                    <label className="label">*Nombre: </label>
                    <input className="input" type="text" pattern="[A-Za-z *]{1,}" value={input.name} name="name" onChange={(e) => handleOnchange(e)} />
                    {error.name ?
                        <p className="error">{error.name}</p> : []
                    }

                    <label className="label">Imagen: </label>
                    <input className="input" type="text" value={input.image} name="image" onChange={(e) => handleOnchange(e)} />

                    <label className="label">*Altura maxima: <input className="input" type="number" min="1" pattern="[0-9]{1,}" value={input.heightmax} name="heightmax" onChange={(e) => handleOnchange(e)} />  cm</label>
                    {error.heightmax &&
                        <p className="error">{error.heightmax}</p>
                    }

                    <label className="label">*Altura minima: <input className="input" type="number" min="0" pattern="[0-9]{1,}" value={input.heightmin} name="heightmin" onChange={(e) => handleOnchange(e)} /> cm</label>
                    {error.heightmin &&
                        <p className="error">{error.heightmin}</p>
                    }
                    <label className="label">*Peso maximo: <input className="input" type="number" min="1" pattern="[0-9]{1,}" value={input.weightmax} name="weightmax" onChange={(e) => handleOnchange(e)} /> kg</label>
                    {error.weightmax &&
                        <p className="error">{error.weightmax}</p>
                    }

                    <label className="label"> *Peso minimo: <input className="input" type="number" min="0" pattern="[0-9]{1,}" value={input.weightmin} name="weightmin" onChange={(e) => handleOnchange(e)} /> kg</label>
                    {error.weightmin &&
                        <p className="error">{error.weightmin}</p>
                    }

                    <label className="label">Años de vida: <input className="input" type="text" value={input.life_span} name="life_span" onChange={(e) => handleOnchange(e)} />  años</label>
                </div>
                <div className="cointainer2">
                    <div className="container">
                        <label>*Razas: </label>
                        {
                            breeds.map(e => {
                                return (
                                    <label key={e}><input type="radio" value={e} name="breed" onChange={(e) => handleCheck(e)} />{e}</label>
                                )
                            })

                        }
                        <input type="text" placeholder="Crea tu propia raza" pattern="[A-Za-z]{3,}" onKeyDown={e => e.keyCode === 13 ? handleBreedCreator(e) : " "} />
                    </div>
                    <div className="container">
                        <label>*Temperamentos: </label>
                        <input placeholder="busca un temperamento" onChange={e => handleOnchangeTemperamentSearch(e)}></input>
                        {
                            temperamentPush.map(e => {
                                return (
                                    <label key={e.id}><input type="checkbox" value={e.name} name={e.name} onChange={(e) => handleSelect(e)} />{e.name}</label>
                                )

                            })
                        }
                        <input type="text" placeholder="Crea tu temperamento" pattern="[A-Za-z]{1,}" onKeyDown={e => e.keyCode === 13 ? handleTempCreator(e) : ""} />

                    </div>
                    <button onClick={e => handleUncheck(e)} className="button-clenser">Limpiar temperamentos</button>
                </div>
                <div className="temperaments">
                    {input.breed === "" ?
                        <p className="error">{error.breed}</p> : <h4 className="h4-temperaments">raza : {input.breed}</h4>
                    }
                </div>
                <div className="temperaments">
                    {input.temperament.length === 0 ? <p className="error">{error.temperament}</p> : <h4 className="h4-temperaments">Temperamentos checkeados: </h4>}
                    {input.temperament.length > 0 ? input.temperament.map(e =>
                        <h4 className="h4-temperaments" key={e}>{e}, </h4>
                    ) : false}
                </div>
                <button className="button" type="submit" id="button"> Crea a tu perro </button>
            </form>
        </div>
    )
}

//"{"name":"desat sdin","heightmax":"12","heightmin":"12","weightmax":"12","weightmin":"12","life_span":"12","breed":"","temperament":["Composed","Fearless","Lovable","Responsible","Wild"],"image":"adsf","status":"Mixed"}"

//"{"name":"desat sdin","heightmax":"12","heightmin":"11","weightmax":"19","weightmin":"4","life_span":"15 - 21","breed":"","temperament":["Bold","Docile","Great-hearted","Steady","Tolerant"],"image":"dsf","status":"Mixed"}"

//"{"name":"desat sdin","heightmax":"15","heightmin":"11","weightmax":"15","weightmin":"11","life_span":"12","breed":"Mixed","temperament":["Bossy","Affectionate","Companionable","Fearless","Responsible","Strong"],"image":"adsf"}"

//"{"name":"desat sdin","heightmax":"12","heightmin":"11","weightmax":"12","weightmin":"11","life_span":"12","breed":"Mixed","temperament":["Bold","Protective","Loving"],"image":"adsf"}"

//"{"name":"desat sdin","heightmax":"12","heightmin":"11","weightmax":"14","weightmin":"12","life_span":"14","breed":"Mixed","temperament":["Boisterous","Companionable","Familial","Great-hearted","Powerful","Responsive","Strong"],"image":"adsf"}"

//"{"name":"jose","heightmax":"No hay datos","heightmin":"No hay datos","weightmax":"1","weightmin":"No hay datos","life_span":"","breed":"Sin definir","image":"https://j.gifs.com/ygdY27.gif","temperament":"Sin definir"}"