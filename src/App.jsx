import { useState, useEffect } from "react"
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"


function App() {

  const [pacientes, setPacientes] = useState([]);
  {/*EN ESTE CASO LO USAREMOS PARA GESTIÓN DE LOS DATOS DE 1 PACIENTE */ }
  const [paciente, setPaciente] = useState({});


  {/*Haremos que se guarden los datos que introducimos en el formulario */ }
  useEffect(() => {
    const obtenerLS = () => {
      {/*Si no hay nada en LocalStorage, le asigno un array vacío */ }
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      setPacientes(pacientesLS)
    }
    obtenerLS();
  }, []); {/*Si la dependencia está vacía,sólo se ejecutará 1 vez */ }

  useEffect(() => {
    {/*JSON.stringify va a convertir lo que le pasemos a string */ }
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }, [pacientes])


  const eliminarPaciente = id => {
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id);
    setPacientes(pacientesActualizados)
  }

  return (
    <div className="container mx-auto mt-20">
      <Header />

      <div className="mt-12 md:flex">
        <Formulario
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>

    </div>
  )
}

export default App

