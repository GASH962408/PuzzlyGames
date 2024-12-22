import React, { useState } from "react";
import Checker from "./Checker"; // Importar el componente Checker

function Checkers() {
  const [jugador, setJugador] = useState(1); // Jugador actual
  const [celdas, setCeldas] = useState<string[][]>(Array(8).fill(null).map(() => Array(8).fill(""))); // Tablero 8x8 vacío

  // Función para inicializar el tablero con las fichas
  const empezarJuego = (): void => {
    const nuevoTablero = celdas.map((fila) => [...fila]); // Crear una copia del tablero actual

    // Poblar las filas 0, 1, 2 con fichas "O" (jugador 1)
    for (let fila = 0; fila < 3; fila++) {
      for (let columna = 0; columna < 8; columna++) {
        if ((fila % 2 === 0 && columna % 2 !== 0) || (fila % 2 !== 0 && columna % 2 === 0)) {
          nuevoTablero[fila][columna] = "O";
        }
      }
    }

    // Poblar las filas 5, 6, 7 con fichas "X" (jugador 2)
    for (let fila = 5; fila < 8; fila++) {
      for (let columna = 0; columna < 8; columna++) {
        if ((fila % 2 === 0 && columna % 2 !== 0) || (fila % 2 !== 0 && columna % 2 === 0)) {
          nuevoTablero[fila][columna] = "X";
        }
      }
    }
    setCeldas(nuevoTablero); // Actualiza el estado del tablero
  };

  // Función para manejar el clic en una celda
  const moverFicha = (fila: number, columna: number): void => {
    const nuevoTablero = celdas.map((fila) => [...fila]); // Crear una copia del tablero actual
    const ficha = celdas[fila][columna];

    if ((jugador === 1 && ficha === "O") || (jugador === 2 && ficha === "X")) {
      const direccion = jugador === 1 ? 1 : -1; // Jugador 1 avanza hacia abajo, Jugador 2 hacia arriba
      const posiblesMovimientos = [
        [fila + direccion, columna - 1], // Diagonal izquierda
        [fila + direccion, columna + 1], // Diagonal derecha
      ];

      for (const [nuevaFila, nuevaColumna] of posiblesMovimientos) {
        // Verificar si el movimiento está dentro del tablero y la celda está vacía
        if (
          nuevaFila >= 0 &&
          nuevaFila < 8 &&
          nuevaColumna >= 0 &&
          nuevaColumna < 8 &&
          nuevoTablero[nuevaFila][nuevaColumna] === ""
        ) {
          // Mover la ficha a la nueva posición
          nuevoTablero[nuevaFila][nuevaColumna] = ficha;
          nuevoTablero[fila][columna] = ""; // Vaciar la posición original
          setCeldas(nuevoTablero); // Actualizar el tablero
          setJugador(jugador === 1 ? 2 : 1); // Cambiar el turno
          return; // Solo se permite un movimiento por clic
        }
      }

      // Lógica para comer ficha (saltando sobre una ficha del oponente)
      const posiblesComer = [
        [fila + direccion * 2, columna - 2], // Diagonal izquierda (comer)
        [fila + direccion * 2, columna + 2], // Diagonal derecha (comer)
      ];

      for (const [nuevaFila, nuevaColumna] of posiblesComer) {
        const filaIntermedia = fila + direccion; // Fila intermedia para verificar la ficha contraria
        const columnaIntermedia = columna + (nuevaColumna - columna) / 2; // Columna intermedia

        // Verificar si la casilla intermedia tiene una ficha contraria y la casilla de destino está vacía
        if (
          nuevaFila >= 0 &&
          nuevaFila < 8 &&
          nuevaColumna >= 0 &&
          nuevaColumna < 8 &&
          nuevoTablero[nuevaFila][nuevaColumna] === "" &&
          nuevoTablero[filaIntermedia][columnaIntermedia] !== "" &&
          nuevoTablero[filaIntermedia][columnaIntermedia] !== ficha // La ficha intermedia debe ser contraria
        ) {
          // Comer la ficha contraria
          nuevoTablero[nuevaFila][nuevaColumna] = ficha;
          nuevoTablero[fila][columna] = ""; // Vaciar la posición original
          nuevoTablero[filaIntermedia][columnaIntermedia] = ""; // Eliminar la ficha contraria
          setCeldas(nuevoTablero); // Actualizar el tablero
          setJugador(jugador === 1 ? 2 : 1); // Cambiar el turno
          return; // Solo se permite un movimiento por clic
        }
      }
    }
  };

  // Función para verificar si hay un ganador
  const verificarGanador = (): string | null => {
    const jugador1Fichas = celdas.flat().filter(celda => celda === "O");
    const jugador2Fichas = celdas.flat().filter(celda => celda === "X");

    if (jugador1Fichas.length === 0) return "Jugador 2 ha ganado";
    if (jugador2Fichas.length === 0) return "Jugador 1 ha ganado";
    return null;
  };

  // Renderizar el tablero de damas
  return (
    <div>
      <button onClick={empezarJuego}>Empezar Juego</button>
      <div>
        {verificarGanador() ? (
          <div>{verificarGanador()}</div>
        ) : (
          <div>Turno del Jugador {jugador}</div>
        )}
      </div>
      <div className="tablero">
        {celdas.map((fila, filaIndex) => (
          <div key={filaIndex} className="fila">
            {fila.map((estado, columnaIndex) => (
              <Checker
                key={columnaIndex}
                estado={estado}
                movePiece={() => moverFicha(filaIndex, columnaIndex)} // Asignar la función para mover la ficha
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Checkers;
