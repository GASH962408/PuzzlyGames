import React from "react";

type CheckerProps = {
  estado: string; // Estado de la celda (vacío, ficha "O", ficha "X")
  onClick: () => void; // Acción al hacer clic en la ficha/celda
};

const Checker: React.FC<CheckerProps> = ({ estado, onClick }) => {
  return (
    <div className="checker" onClick={onClick}>
      {estado}
    </div>
  );
};

export default Checker;
