import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cleanState, getDogById } from "../actions";
import { useParams } from "react-router-dom";
import "./Detail.css"


export default function Detail() {
    const dispatch = useDispatch()
    const { id } = useParams()


    useEffect(() => {
        dispatch(getDogById(id))
        return () => {
            dispatch(cleanState())
        }
    }, [dispatch])


    let perroId = useSelector((state) => state.detail)

    console.log(perroId.id)
    console.log(id)

    while (id != perroId.id) {
        return (<div>
            <img
                src="http://northerntechmap.com/assets/img/loading-dog.gif"
                alt="loader"
                className={'w-50 mx-auto'}
            />
        </div>)
    }
    return (
        <div className="todo">
            <Link to="/home" ><button className="button-details">Volver atras</button></Link>
            <div>
            </div>
            <div class='reflection-content'></div>
            <div class='reflection-container'>
                <a class='reflection-grid-cell reflection-grid-cell-1'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-2'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-3'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-4'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-5'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-6'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-7'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-8'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-9'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-10'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-11'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-12'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-13'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-14'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-15'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-16'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-17'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-18'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-19'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-20'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-21'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-22'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-23'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-24'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-25'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-26'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-27'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-28'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-29'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-30'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-31'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-32'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-33'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-34'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-35'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-36'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-37'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-38'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-39'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-40'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-41'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-42'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-43'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-44'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-45'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-46'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-47'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-48'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-49'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-50'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-51'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-52'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-53'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-54'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-55'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-56'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-57'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-58'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-59'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-60'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-61'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-62'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-63'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-64'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-65'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-66'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-67'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-68'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-69'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-70'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-71'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-72'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-73'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-74'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-75'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-76'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-77'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-78'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-79'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-80'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-81'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-82'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-83'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-84'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-85'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-86'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-87'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-88'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-89'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-90'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-91'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-92'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-93'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-94'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-95'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-96'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-97'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-98'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-99'  ></a>
                <a class='reflection-grid-cell reflection-grid-cell-100'  ></a>
                <div className="reflection-content">
                    <h3>{perroId.name}</h3>
                    <img src={perroId.image} alt="image" className="image" id="img" />
                    <h5>{perroId.image === "https://j.gifs.com/ygdY27.gif" ? "Perrito llorando porque no se subió una imagen" : ""}</h5>
                    <h5>Altura: {perroId.heightmin === "No hay datos" ? "" : perroId.heightmin} {perroId.heightmin !== "No hay datos" ? "cm - " : ""}{perroId.heightmax} {perroId.heightmax !== "No hay datos" ? "cm" : ""}</h5>
                    <h5>Peso: {perroId.weightmin === "No hay datos" ? "" : perroId.weightmin} {perroId.weightmin !== "No hay datos" ? "kg - " : ""}{perroId.weightmax} {perroId.weightmax !== "No hay datos" ? "kg" : ""}</h5>
                    <h5>Tiempo de vida: {perroId.life_span ? perroId.life_span.split(" years")[0] : "Sin definir"} {perroId.life_span ? "años" : " "}</h5>
                    <h5>Temperamentos: {perroId.temperament}</h5>
                    <h5>Raza: {perroId.breed}</h5>
                </div>
            </div>

        </div>


    )

}