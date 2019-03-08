# Ticket System
Pequeño proyecto de creacion de tickets

## Tecnologías Necesarias

1. Node Js versión recomendada 10.13 >  `https://nodejs.org/es/`
2. Visual Studio Code
3. Angular `https://angular.io/cli`
4. Visual Studio 2017 

## Preparaciones Previas

1. Crear una Base de Datos en Sql 2008r2 o mayor con el nombre TicketSystem.
2. En la estructura del proyecto hay una carpeta llamada assets y dentro una llamada Db, ejecutar los script en orden en la base de datos creada.
3. El script no.3 es para generar empleados de prueba por lo que no es necesario correrlo si no se requiere. 
4. En el proyecto TicketSystem.Api en el appsettings.json especificar las credenciales de conexion de la base de datos cambiando el usuario y la contraseña y el servidor donde se aloja la base de datos.

## Correr el Proyecto FrontEnd
1. Para el proyecto del frontEnd acceder a TicketSystem-UI y abrir esa ruta con Visual Studio Code.
2. Abrir el terminal de visual studio code y ejecutar `npm install` para cargar los paquetes que se requieren.
3. Luego de que todos los paquetes sean descargados ejecutar en la línea de comando `npm start` para iniciar el proyecto.

##  Correr el Proyecto Backend
1. El proyecto del backend acceder a la carpeta TiketSystem.Api y abrir la solución con visual studio 
2. Acceder a las propiedades del proyecto y en el area de debug especificar launch browser igual a `api/general`
2. especificar en el AppUrl `http://localhost:5021/`
ejecutarlo si todo está bien con la conexión el api responderá con un mensaje "usuario admin admin"

Para iniciar Sesión Utilizar el usuario admin y la clave admin.



## Pantallas

**Pantalla de Inicio de Sesión**
Aquí se introducen los credenciales para entrar al sistema, la sesión se mantendrá abierta hasta que se presione cerrar sesión.
![Login](https://github.com/themaster015/Ticket_System/blob/master/assets/images/1-login.png/1-login.png)

**Dasboard**
Pensado para dar informaciones generales con widges importantes como la cantidad de tickets por estado, los tickets por empleado etc. (comming soon)
![dashboard](https://github.com/themaster015/Ticket_System/blob/master/assets/images/1-login.png/2-dashboard.png)

**Listado de Empleados**
Muestra el listado de empleados con las opciones de, crear uno nuevo, editar uno existente, ver información general, cambiar de estado y borrar.
Se puede realizar búsqueda por estado, por nombre, apellido, cedula e email

![listadoEmpleado](https://github.com/themaster015/Ticket_System/blob/master/assets/images/1-login.png/3-empleado.png)

**Formulario de Empleado**
Se utiliza para registrar nuevos empleados
![formularioEmpleado](https://github.com/themaster015/Ticket_System/blob/master/assets/images/1-login.png/3-empleadoForm.png)

**Vista de Empleado**
Se utiliza para dar una vista general de los datos del empleado, también para ver la información de los tickets del empleado y poder acceder a ellos (coming soon)
![VistaEmpleado](https://github.com/themaster015/Ticket_System/blob/master/assets/images/1-login.png/3-empleadoView.png)

**Listado de Tickets**
Muestra el listado de los tickets con las opciones de, crear uno nuevo, crearle entradas a los tickets, editar uno existente, cambiar de estado y borrar.
Se puede realizar búsqueda por estado, por tema, empleado y descripción.
Este tiene dos Modalidades para ver la informacion una en lista y otra en cuadrícula
![listadoTicketCuadricula](https://github.com/themaster015/Ticket_System/blob/master/assets/images/1-login.png/4-ticketViewCuadricula)
![listadoTicket](https://github.com/themaster015/Ticket_System/blob/master/assets/images/1-login.png/4-ticketView.png)

**Vista Ticket**
Muestra información general del ticket, y también tiene acceso a los empleados y las entradas del mismo.

Empleados
![TicketViewEmpleado](https://github.com/themaster015/Ticket_System/blob/master/assets/images/1-login.png/4-ticketInfoEmpleado.png)

Entradas
![TicketViewEntrada](https://github.com/themaster015/Ticket_System/blob/master/assets/images/1-login.png/4-ticketInfoEntrada.png)

**Registro de Ticket**
Se utiliza para registrar nuevos tickets, los cuales pueden ser asignados a varios empleados, el ticket al ser registrado se registra en estado Pendiente.
![TicketForm](https://github.com/themaster015/Ticket_System/blob/master/assets/images/1-login.png/4-ticketForm.png)

**Registro de Entrada de Ticket**
Se utiliza para crearle entradas a un ticket si no se especifica ningún estado en esta entrada el ticket pasa a estado Abierto
Cuando se registra una entrada que fue cancelada o concluida ya no se pueden registrar más entrada al ticket
![TicketEntry1](https://github.com/themaster015/Ticket_System/blob/master/assets/images/1-login.png/5-ticketEntry1.png)
![TicketEntry2](https://github.com/themaster015/Ticket_System/blob/master/assets/images/1-login.png/5-ticketEntry2.png)

**Reporte**
Genera por empleado los tickets que ha trabajado y el tiempo que duro en ellos, se filtra por un rango de fechas y por empleado.
![reporte](https://github.com/themaster015/Ticket_System/blob/master/assets/images/1-login.png/6.report.png)

**Usuarios**
Manejo de usuarios
![reporte](https://github.com/themaster015/Ticket_System/blob/master/assets/images/1-login.png/7-User.png)