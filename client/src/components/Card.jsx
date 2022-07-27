import React from "react";

export default function Card({ name, id, heightmax, heightmin, weightmax, weightmin, life_span, image, temperament, breed }) {
    return (
        <div className="cards">
            <h3 className="text">{name}</h3>
            <img src={image} alt="image" className="image" />
            <h5 className="text">{image === "https://j.gifs.com/ygdY27.gif" ? "Perrito llorando porque no se subió una imagen" : ""}</h5>
            <h5 className="text">Temperamentos: {temperament}</h5>
            <h5 className="text">Raza: {breed}</h5>
        </div>
    )
}