import React from "react";
import "./tictactoe.css";

type tictactoeProps = {
  estado:string,
  cambiarEstado:() => void
}

//Esto es un componente funcional del tictac singular
//Las propiedades deben estar definidas dentro del componente
const tictactoe:React.FC<tictactoeProps> = ({estado,cambiarEstado}) => {
  return(
    <div className="single_container">
      <div className="tictac" onClick={cambiarEstado}>
        {estado}
      </div>

    </div>
  )
}
export default tictactoe;