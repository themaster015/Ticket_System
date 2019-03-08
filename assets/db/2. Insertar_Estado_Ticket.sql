Use TicketSystem
go 

IF NOT EXISTS(SELECT * FROM TicketEstado WHERE Descripcion = 'Pending') BEGIN 
	INSERT INTO TicketEstado (TicketEstadoId, Descripcion) VALUES (1, 'Pending');
END

IF NOT EXISTS(SELECT * FROM TicketEstado WHERE Descripcion = 'Open') BEGIN 
	INSERT INTO TicketEstado (TicketEstadoId, Descripcion) VALUES (2, 'Open');
END

IF NOT EXISTS(SELECT * FROM TicketEstado WHERE Descripcion = 'Concluded') BEGIN 
	INSERT INTO TicketEstado (TicketEstadoId, Descripcion) VALUES (3, 'Concluded');
END

IF NOT EXISTS(SELECT * FROM TicketEstado WHERE Descripcion = 'On Hold') BEGIN 
	INSERT INTO TicketEstado (TicketEstadoId, Descripcion) VALUES (4, 'On Hold');
END

IF NOT EXISTS(SELECT * FROM TicketEstado WHERE Descripcion = 'Cancelled') BEGIN 
	INSERT INTO TicketEstado (TicketEstadoId, Descripcion) VALUES (5, 'Cancelled');
END

