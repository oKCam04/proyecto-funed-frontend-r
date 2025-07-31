import React, { useState } from 'react';
import CursoForm from '../components/CursoForm';
import CursoLista from '../components/CursoLista';

const CursosPage = () => {
  const [cursos, setCursos] = useState([]);
  
  const agregarCurso = (nuevoCurso) => {
    setCursos([...cursos, nuevoCurso]);
  };

  const eliminarCurso = (id) => {
    setCursos(cursos.filter(curso => curso.id !== id));
  };

  const editarCurso = (id, cursoActualizado) => {
    setCursos(cursos.map(curso => (curso.id === id ? cursoActualizado : curso)));
  };

  return (
    <div>
      <h1>Gestión de Cursos</h1>
      <CursoForm agregarCurso={agregarCurso} />
      <CursoLista cursos={cursos} eliminarCurso={eliminarCurso} editarCurso={editarCurso} />
    </div>
  );
};

export default CursosPage;