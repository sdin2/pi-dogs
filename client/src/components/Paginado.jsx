import React from "react";

export default function Paginado({ dogsPerPage, allDogs, paginado, currentPage }) {
    const pageNumbers = []
    if (typeof allDogs === "object") {
        for (let i = 1; i <= Math.ceil(allDogs.length / dogsPerPage); i++) {
            pageNumbers.push(i)
        }
    }
    return (
        <nav className="paginado">
            {pageNumbers && pageNumbers.map(n => (
                <ul className="number" id={n} key={n} onClick={() => paginado(n)}>
                    <a>{n}</a>
                </ul>
            ))}
        </nav>
    )
}