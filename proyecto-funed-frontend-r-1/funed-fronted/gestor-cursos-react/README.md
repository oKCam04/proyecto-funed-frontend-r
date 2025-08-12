# Gestor de Cursos en React

Este proyecto es una aplicación web para gestionar cursos, permitiendo a los administradores crear, listar, editar y eliminar cursos de manera sencilla.

## Estructura del Proyecto

```
gestor-cursos-react
├── public
│   └── index.html          # Plantilla HTML principal
├── src
│   ├── components
│   │   ├── CursoForm.jsx   # Componente para crear y editar cursos
│   │   ├── CursoLista.jsx   # Componente para listar cursos
│   │   └── CursoItem.jsx    # Componente para un curso individual
│   ├── pages
│   │   └── CursosPage.jsx   # Página principal para la gestión de cursos
│   ├── App.jsx              # Componente raíz de la aplicación
│   ├── index.js             # Punto de entrada de la aplicación
│   └── styles
│       └── app.css         # Estilos CSS para la aplicación
├── package.json             # Configuración de npm
└── README.md                # Documentación del proyecto
```

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Navega al directorio del proyecto:
   ```
   cd gestor-cursos-react
   ```

3. Instala las dependencias:
   ```
   npm install
   ```

## Ejecución

Para iniciar la aplicación en modo de desarrollo, ejecuta:
```
npm start
```

La aplicación se abrirá en `http://localhost:3000`.

## Funcionalidades

- **Crear Cursos**: Los administradores pueden añadir nuevos cursos a través de un formulario.
- **Listar Cursos**: Se muestra una lista de todos los cursos disponibles.
- **Editar Cursos**: Los administradores pueden modificar los detalles de un curso existente.
- **Eliminar Cursos**: Se puede eliminar un curso de la lista.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.