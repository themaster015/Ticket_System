Use TicketSystem
go 


IF NOT EXISTS(SELECT TOP 1 EmpleadoId FROM Empleado) BEGIN 
	INSERT INTO Empleado (Identificador, Nombre, Apellido, Cedula, Email, Sexo, FechaNacimiento, FechaCreacion, Estado) VALUES 
		('00001', 'Jose Eduardo', 'Estrella Rodriguez','032-0038356-4', 'eduardo_1550@hotmail.com', 'M', '1988-06-03', GETDATE(), 1)
END

DECLARE @EmpleadoId int

SELECT @EmpleadoId = ISNULL(EmpleadoId,0) FROM Empleado WHERE Cedula = '032-0038356-4'

IF (@EmpleadoId > 0) BEGIN
	IF NOT EXISTS(SELECT UsuarioId FROM Usuario WHERE EmpleadoId = @EmpleadoId) BEGIN 
		INSERT INTO Usuario (UserName, UserPassword, EmpleadoId, EsAdministrador, estado) VALUES
		('admin', '21232f297a57a5a743894a0e4a801fc3', @EmpleadoId, 1, 1)
	END 
END 
