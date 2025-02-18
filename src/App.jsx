import { useState } from "react";
import { det } from "mathjs";

const App = () => {
  const [taille, setTaille] = useState(2);
  const [matrix, setMatrix] = useState(
    Array.from({ length: 2 }, () => Array(2).fill(0))
  );
  const [result, setResult] = useState(null);

  const calculDeterminant = () => {
    try {
      const determinant = det(matrix);
      setResult(determinant);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (row, col, value) => {
    const newMatrix = matrix.map((r, i) =>
      i === row
        ? r.map((v, j) => (j === col ? parseInt(value, 10) || 0 : v))
        : r
    );
    setMatrix(newMatrix);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">
        Calculating the determinant of a matrix sucks... but lets make it
        easier!
      </h2>

      {/* Sélecteur de taille de la matrice */}
      <div className="flex items-center gap-2">
        <label className="font-medium">Taille :</label>
        <input
          value={taille}
          type="number"
          min="2"
          max="5"
          onChange={(e) => {
            const newTaille = parseInt(e.target.value, 10);
            setTaille(newTaille);
            setMatrix(
              Array.from({ length: newTaille }, () => Array(newTaille).fill(0))
            );
          }}
          className="w-16 text-center border border-gray-400 rounded-md p-1"
        />
      </div>

      {/* Matrice */}
      <div
        className={`grid gap-2 mt-6`}
        style={{ gridTemplateColumns: `repeat(${taille}, 60px)` }}
      >
        {matrix.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <input
              type="number"
              key={`${rowIndex}-${colIndex}`}
              value={value}
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
              className="w-14 h-14 text-center text-lg border border-gray-500 rounded-md shadow-sm"
            />
          ))
        )}
      </div>

      {/* Bouton Calculer */}
      <button
        onClick={calculDeterminant}
        className="mt-6 px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition"
      >
        Calculer le déterminant
      </button>

      {/* Affichage du résultat */}
      {result !== null && (
        <div className="mt-4 text-xl font-semibold text-gray-800">
          Le déterminant est : {result}
        </div>
      )}
    </div>
  );
};

export default App;
