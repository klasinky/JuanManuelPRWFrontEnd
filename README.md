# :money_with_wings: Control de Finanzas PRW Frontend :money_with_wings:

[![Netlify Status](https://api.netlify.com/api/v1/badges/76567e80-8671-4b87-b25d-ef83c4662861/deploy-status)](https://app.netlify.com/sites/musing-lichterman-b59f22/deploys)

![alt text](./financemanagement/src/assets/img/logo.svg#center)

---
## Autores :man_technologist:
- Manuel Gonzalez Leal (https://github.com/klasinky)
- Juan Daniel Padilla Obando (https://github.com/zclut)
---

## Instalación :computer:
```
npm install
```

---

## Bitácora

### :white_check_mark: Miércoles 31 de Marzo (2 horas) :white_check_mark:
    - Configuración del proyecto en Ionic
---

### :white_check_mark: Jueves 01 de Abril (5 horas) :white_check_mark:
    - Guards
        + LoggedIn
        + LoggedOn
    - Services
        + HttpService
        + AuthService
        + StorageService
    - ReactiveForms
        + Registro
        + Inicio de sesión
---

### :white_check_mark: Viernes 02 de Abril (5 horas) :white_check_mark:
    - Aprendizaje de ApexCharts
    - Configuración de gráfico (Donut)
---  

### :white_check_mark: Sabado 03 de Abril (5 horas) :white_check_mark:
    - Cambio de Ionic a Angular
    - Configuracion del proyecto en Angular
    - Modificación
        + StorageService
        + ReactiveForms
            * Registro
            * Inicio de sesión
    - Creación de modulo Auth con su routing
    - Creación de componentes dentro de Auth
        + Login
        + Register
        + Auth
    - Conexión a la API para:
        + Registrarse
        + Iniciar sesión
---

### :white_check_mark: Domingo 04 de Abril (2 horas) :white_check_mark:
    - Cambios en el SCSS en los componentes
        + Auth
        + Login
        + Register
    - Refactorizando código
    - Añadiendo canActivate en el routing de auth
    ```
        Para que un usuario logeado no pueda ir a las paginas
        de auth
    ```
    - Notificación al registrar e iniciar sesión (Toastr)
---

### :white_check_mark: Lunes 5 de Abril (4 horas) :white_check_mark:
    - Reestructuracion de carpetas y routing
    - Sidebar y Overview
    - Reactive form login y register
    - Toastr y Angular animations
    - Refactorizando y soluciando bugs

---

### :white_check_mark: Miercoles 7 de Abril (4 horas) :white_check_mark:
    - Creación de modulo(main, months)
    - Reestructuracion de carpetas y routing
    - List Detail de meses
    - Peticion para mostrar todos los meses
    - Crear Mes y solución bug en el login
    - Graficos del mes por categoria (Ingresos, Gastos)
    - Arreglando interfaces
    - Modal Agregar ingresos o gastos
---

### :white_check_mark: Sábado 10 de Abril (3 horas) :white_check_mark:
    - Listar por categoria los gastos e ingresos
    - Loader form (Entries and Expenses) y editar Navbar
---

### :white_check_mark: Domingo 23 de Abril (2 horas) :white_check_mark:
    - Graficos para la diferencia de ingresos y egresos
    - Botón de descargar XLS
---

### :white_check_mark: Lunes 26 de Abril (1 hora) :white_check_mark:
    - Creación del componente Profile
---

### :white_check_mark: Martes 27 de Abril (6 horas) :white_check_mark:
    - Cambiar contraseña (Componente Profile)
    - Cambios en los estilos y colores de la web
    - Creación del logo
    - Arreglos en la interfaz
    - List Detail, Boton eliminar el mes
    - Sidebar, Months (List, Delete)
    - Detalle del mes, Interface MonthDetail, Creación de componentes chartMonth, addAmountBase
    - Actualizar graficos cuando hay cambios
    - Listar por categoria los gastos e ingresos
    - Agregando estilos para los modales e restructura de columnas para el listado de ingresos y gastos
    - Graficos para la diferencia de ingresos y egresos
    - Creando el componente del perfil, Reactive Forms
    - Interfaz ChangePassword, Formulario Reactivo para cambiar la contraseña
---

### :white_check_mark: Miércoles 28 de Abril (2 horas) :white_check_mark:
    - Cambiar datos del perfil (Componente Profile)
    - Cambios en el Storage Service
---

### :white_check_mark: Viernes 29 de Abril (3 horas y 30 minutos) :white_check_mark:
    - Mensajes de error en el componente Profile al editar los datos del usuario
    - Loader
    - Cambiado el profile data, cambiado el Storage Service
    - Componente Acciones (List, Detail, Suscribe)
    - Refactor a funciones y arreglando el select al resetearlo
    - Estilos y colores cambiados, arreglo de la interfaz y logo
---

### :white_check_mark: Viernes 30 de Abril (3 horas y 30 minutos) :white_check_mark:
    - Paginación de la lista de meses
    - Refactor y agregando endpoints al fichero environment
    - Botones en el detalle del mes.
---

### :white_check_mark: Sábado 1 de Mayo (3 horas) :white_check_mark:
    - Refactor y agregando endpoints al fichero environment
    - Loading en el grafico del mes y estilos en los botones para crear y descargar entries-expenses
    - Estilos del gráfico del mes
    - Paginación en la lista de meses
    - DeleteMonth arreglado
    - Loader en el login
---

### :white_check_mark: Domingo 2 de Mayo (5 horas) :white_check_mark:
    - Estilos, actualización del componente, desuscribirse de una acción
    - Arreglando actualización del componente al agregar una acción
    - Centrando lista de meses
    - Post Detail y comentarios
    - Arreglar el contador de comentarios y ordenar la lista de comentarios
---

### :white_check_mark: Lunes 3 de Mayo (4 horas) :white_check_mark:
    - Componente para el mensaje
    - Refactor del css Post Detail (No completado)
    - Componente Like Button
---

### :white_check_mark: Sábado 8 de Mayo (2 horas) :white_check_mark:
    - Lista de Amounts (Componente terminado)
    - PrimeNG Agregado
    - Cambiando el componente category-detail, agregando endpoint de los amount
---

### :white_check_mark: Domingo 9 de Mayo (4 horas) :white_check_mark:
    - Endpoint guards
    - Filtros para el overview
    - Análisis del mes
---

### :white_check_mark: Lunes 10 de Mayo (2 horas) :white_check_mark:
    - Suscripción para actualizar los componentes en el month detail
    - Avatar en los post y skeleton
---

### :white_check_mark: Miércoles 12 de Mayo (4 horas) :white_check_mark:
    - Componente para listar los posts, filtros, skeleton, paginación
    - Botones de filtro y scroll
    - Componente crear post
    - Imagenes responsive
---

### :white_check_mark: Jueves 13 de Mayo (7 horas) :white_check_mark:
    - Reemplazar @ por enlaces en el body del post y los comentarios
    - Tags en el post detail
    - Borrar posts, comentarios, reestructura del componente post-comment-detail
    - Tutorial para las acciones, confirmación al borrar un post y comentario
    - Comentario arreglado
    - Skeleton de los tags
    - Tags Detail
    - Editar post
---

### :white_check_mark: Viernes 14 de Mayo (4 horas) :white_check_mark:
    - Lista de Post / Cambio de diseño
    - Checkbox de tags en crear post
    - UpdatedAt interface post
    - Arreglando multiplos confirm dialogs al borrar un comentario o posts
    -
---

### :white_check_mark: Miércoles 19 de Mayo (7 horas) :white_check_mark:
    - Cambiando colores
    - Arreglando estilo vista movil Login
    - Cambiando el sidebar para un navbar
    - Componente para el perfil publico
    - Refactor estilos, link a perfil público, componente para el perfil público
    - Cambiando los estilos para el componente de los comentarios
---

### :white_check_mark: Jueves 20 de Mayo (6 horas) :white_check_mark:
    - Recomendaciones de posts
    - Creación del componentes para el Top users
    - Reestructura de componente profile
    - Estilos en el post detail
    - Arreglando error al subir imagen de perfil
---

### :white_check_mark: Viernes 21 de Mayo (5 horas) :white_check_mark:
    - Notificaciones al recibir un follow, y cuando las personas que sigues crean un post
    - Agregando posicionamiento sticky al top users y tags
---

### :white_check_mark: Sabado 22 de Mayo (6 horas) :white_check_mark:
    - Estructura sobre el perfil publico
    - WebSocket para las notificaciones
---

### :white_check_mark: Domingo 23 de Mayo (9 horas) :white_check_mark:
    - Eliminar foto, colocar currency actual en el formulario
    - Colocando currency por del usuario en el formulario
    - Paginación de los posts en el perfil público
    - Tutorial para agregar acción
    - Fotos para componentes sin registros y sonido notificación
---

### :white_check_mark: Lunes 24 de Mayo (9 horas) :white_check_mark:
    - Filtro para buscar posts solo por los usuarios que sigues
    - Tutorial para importar archivos excel
    - Editando el componente crear post
    - Foto de usuario en el TOP, filtro para buscar por categoria en los posts
    - Estilos para el fondo de foto de perfil
    - Colocando uppercase al usuario sin imagen de perfil
    - Cambiando el color del modal de confirmación
    - Recargar componente cuando cambia el parametro de la ruta en el componente del perfil publico
---

### :white_check_mark: Martes 25 de Mayo (9 horas) :white_check_mark:
    - Agregando el componente footer
    - Cambiando href vacios
    - Creando botón para limpiar filtro de tags
    - Pipe currency, estilos de perfil, Mover la pantalla cuando cambie el router
    - Cambiando el nombre del componente para crear el mes y estilos del botones
---

### :white_check_mark: Miércoles 26 de Mayo (5 horas) :white_check_mark:
    - Documentación de código
    - Notificaciones de menciones
---