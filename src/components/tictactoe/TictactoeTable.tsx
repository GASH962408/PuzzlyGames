import React, { useState } from "react";
import Tictactoe from "./Tictactoe";
import "./tictac_table.css";

const TictacTable = () => {
  // Estado del tablero y del jugador
  const [casillas, setCasillas] = useState<string[]>(Array(9).fill(""));
  const [jugador, setJugador] = useState<number>(1);

  // Verificar si hay un ganador
  const verificarGanador = (casillas: string[], index: number): boolean => {
    const combinacionesGanadoras = [
      [0, 1, 2], // Fila 1
      [3, 4, 5], // Fila 2
      [6, 7, 8], // Fila 3
      [0, 3, 6], // Columna 1
      [1, 4, 7], // Columna 2
      [2, 5, 8], // Columna 3
      [0, 4, 8], // Diagonal principal
      [2, 4, 6], // Diagonal secundaria
    ];

    const combinacionesRelevantes = combinacionesGanadoras.filter(combinacion =>
      combinacion.includes(index)
    );

    for (const combinacion of combinacionesRelevantes) {
      const [a, b, c] = combinacion;
      if (
        casillas[a] !== "" && // No debe estar vacía
        casillas[a] === casillas[b] && // Todos deben ser iguales
        casillas[a] === casillas[c]
      ) {
        return true; // Hay un ganador
      }
    }

    return false; // Nadie ha ganado
  };

  // Cambiar el estado de una casilla específica
  const cambiarEstado = (index: number) => {
    if (casillas[index] === "") {
      const nuevoEstado = [...casillas];
      nuevoEstado[index] = jugador === 1 ? "X" : "O";
      setCasillas(nuevoEstado);

      // Verificar si hay un ganador
      if (verificarGanador(nuevoEstado, index)) {
        alert(`El jugador ${jugador} ha ganado`);
        return;
      }

      // Cambiar al siguiente jugador
      setJugador(jugador === 1 ? 2 : 1);
    }
  };

  // Reiniciar el juego
  const reiniciarJuego = () => {
    setCasillas(Array(9).fill(""));
    setJugador(1);
  };

  return (
    <div>
      <div className="table">
        {casillas.map((estado, index) => (
          <Tictactoe
            key={index}
            estado={estado}
            cambiarEstado={() => cambiarEstado(index)}
          />
        ))}
      </div>
      <button className="reset-button" onClick={reiniciarJuego}>
        Reiniciar Juego
      </button>
    </div>
  );
};

export default TictacTable;