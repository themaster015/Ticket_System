
--truncate table organizacion.empresa 

declare @n int, @ide int, @fecha datetime, @number int, @estaActivo int
set @n = 1
set @ide = 0
set @fecha = GETDATE();

while @n <  1000 begin 
	
	set @fecha = DATEADD(day, 1, @fecha)
	
	if (@n % 2 = 0) begin 
		set @estaActivo = 1
	end else begin
		set @estaActivo = 0
	end 
	
	insert into Empleado(Identificador, Nombre, Apellido, Cedula, Email, Sexo, FechaNacimiento, FechaCreacion, Estado)
		      VALUES (RIGHT('0000' + Ltrim(Rtrim((@ide+ @n))), 5), 'Jose' + convert(varchar(9), @n), 'Perez', 
			  '032-' + RIGHT('000000' + Ltrim(Rtrim((@n))), 7) + '-1',  'Jose' + convert(varchar(9), @n) + '@hotmail.com', 'M', GETDATE(), GETDATE(),  @estaActivo)

	set @n = @n + 1 
end 
