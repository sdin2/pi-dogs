import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogById } from "../actions";
import { useParams } from "react-router-dom";



export default function Detail() {
    const dispatch = useDispatch()
    const { id } = useParams()


    useEffect(() => {
        dispatch(getDogById(id))
    }, [dispatch])


    let perroId = useSelector((state) => state.detail)


    return (
        <div className="cardCointainer">
            <Link to="/home" ><button className="button-details">Volver atras</button></Link>

            <div className="card" >
                <h3>{perroId.name}</h3>
                <img src={perroId.image} alt="image" className="image" />
                <h5>{perroId.image === "https://j.gifs.com/ygdY27.gif" ? "Perrito llorando porque no se subió una imagen" : ""}</h5>
                <h5>Altura: {perroId.heightmin === "No hay datos" ? "" : perroId.heightmin} {perroId.heightmin !== "No hay datos" ? "cm - " : ""}{perroId.heightmax} {perroId.heightmax !== "No hay datos" ? "cm" : ""}</h5>
                <h5>Peso: {perroId.weightmin === "No hay datos" ? "" : perroId.weightmin} {perroId.weightmin !== "No hay datos" ? "kg - " : ""}{perroId.weightmax} {perroId.weightmax !== "No hay datos" ? "kg" : ""}</h5>
                <h5>Tiempo de vida: {perroId.life_span ? perroId.life_span.split(" years")[0] : "Sin definir"} {perroId.life_span ? "años" : " "}</h5>
                <h5>Temperamentos: {perroId.temperament}</h5>
                <h5>Raza: {perroId.breed}</h5>
            </div>
        </div>
    )

}