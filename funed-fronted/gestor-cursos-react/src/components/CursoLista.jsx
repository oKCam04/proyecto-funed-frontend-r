import React from 'react'
import CursoItem from './CursoItem'

const CursoLista = ({ cursos, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Lista de Cursos</h2>
      <ul>
        {cursos.map(curso => (
          <CursoItem 
            key={curso.id} 
            curso={curso} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        ))}
      </ul>
    </div>
  )
}

export default CursoLista