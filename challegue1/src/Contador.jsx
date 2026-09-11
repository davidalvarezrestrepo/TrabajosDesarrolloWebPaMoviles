import { useState } from 'react'; //--> se importa para usar un estado
// es una funcion de react oo hook, 
function Contador() {
  const [contador, setContador] = useState<number>(0); //caja de estados con valor inicial 0
  //devuelve arreglo de el valor del estado, y una funcion, la unica permitida para camibiar el estado

  return (
    <>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>
          Sumar
      </button>
    </>
  );
}

export default Contador;
