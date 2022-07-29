import React from "react";
import { Link } from "react-router-dom"

export default function LandingPage() {
    return (
        <div className="landing">
            <h1 className="title">Bienvenidos</h1>
            <Link to="/Home">
                <button className="button-landing"> Ingresar </button>
            </Link>
        </div >
    )
}