USE [TicketSystem]
GO
/****** Object:  Table [dbo].[Empleado]    Script Date: 7/3/2019 1:22:30 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Empleado](
	[EmpleadoId] [int] IDENTITY(1,1) NOT NULL,
	[Identificador] [varchar](20) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Apellido] [varchar](100) NOT NULL,
	[Cedula] [varchar](13) NOT NULL,
	[Email] [varchar](100) NULL,
	[Sexo] [varchar](1) NOT NULL,
	[FechaNacimiento] [datetime] NOT NULL,
	[FechaCreacion] [datetime] NOT NULL,
	[Estado] [bit] NOT NULL,
 CONSTRAINT [PK_Empleado] PRIMARY KEY CLUSTERED 
(
	[EmpleadoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Ticket]    Script Date: 7/3/2019 1:22:30 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Ticket](
	[TicketId] [int] IDENTITY(1,1) NOT NULL,
	[Numero] [varchar](10) NOT NULL,
	[Tema] [varchar](150) NOT NULL,
	[Descripcion] [text] NOT NULL,
	[FechaCreacion] [datetime] NOT NULL,
	[TicketEstadoId] [int] NOT NULL,
 CONSTRAINT [PK_Ticket] PRIMARY KEY CLUSTERED 
(
	[TicketId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TicketEmpleado]    Script Date: 7/3/2019 1:22:30 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TicketEmpleado](
	[TicketEmpleadoId] [int] IDENTITY(1,1) NOT NULL,
	[TicketId] [int] NOT NULL,
	[EmpleadoId] [int] NOT NULL,
 CONSTRAINT [PK_TicketEmpleado] PRIMARY KEY CLUSTERED 
(
	[TicketEmpleadoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TicketEntrada]    Script Date: 7/3/2019 1:22:30 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TicketEntrada](
	[TicketEntradaId] [int] IDENTITY(1,1) NOT NULL,
	[TicketId] [int] NOT NULL,
	[EmpleadoId] [int] NOT NULL,
	[FechaInicio] [datetime] NOT NULL,
	[FechaFinal] [datetime] NOT NULL,
	[Nota] [text] NOT NULL,
 CONSTRAINT [PK_TicketEntrada] PRIMARY KEY CLUSTERED 
(
	[TicketEntradaId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TicketEstado]    Script Date: 7/3/2019 1:22:30 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TicketEstado](
	[TicketEstadoId] [int] NOT NULL,
	[Descripcion] [varchar](100) NOT NULL,
 CONSTRAINT [PK_TicketEstado] PRIMARY KEY CLUSTERED 
(
	[TicketEstadoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 7/3/2019 1:22:30 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Usuario](
	[UsuarioId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](50) NOT NULL,
	[UserPassword] [varchar](50) NOT NULL,
	[EmpleadoId] [int] NOT NULL,
	[EsAdministrador] [bit] NOT NULL,
	[estado] [bit] NOT Null
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[UsuarioId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[Ticket]  WITH CHECK ADD  CONSTRAINT [FK_Ticket_TicketEstado] FOREIGN KEY([TicketEstadoId])
REFERENCES [dbo].[TicketEstado] ([TicketEstadoId])
GO
ALTER TABLE [dbo].[Ticket] CHECK CONSTRAINT [FK_Ticket_TicketEstado]
GO
ALTER TABLE [dbo].[TicketEmpleado]  WITH CHECK ADD  CONSTRAINT [FK_TicketEmpleado_Empleado] FOREIGN KEY([EmpleadoId])
REFERENCES [dbo].[Empleado] ([EmpleadoId])
GO
ALTER TABLE [dbo].[TicketEmpleado] CHECK CONSTRAINT [FK_TicketEmpleado_Empleado]
GO
ALTER TABLE [dbo].[TicketEmpleado]  WITH CHECK ADD  CONSTRAINT [FK_TicketEmpleado_Ticket] FOREIGN KEY([TicketId])
REFERENCES [dbo].[Ticket] ([TicketId])
GO
ALTER TABLE [dbo].[TicketEmpleado] CHECK CONSTRAINT [FK_TicketEmpleado_Ticket]
GO
ALTER TABLE [dbo].[TicketEntrada]  WITH CHECK ADD  CONSTRAINT [FK_TicketEntrada_Ticket] FOREIGN KEY([TicketId])
REFERENCES [dbo].[Ticket] ([TicketId])
GO
ALTER TABLE [dbo].[TicketEntrada] CHECK CONSTRAINT [FK_TicketEntrada_Ticket]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [FK_Usuario_Empleado] FOREIGN KEY([EmpleadoId])
REFERENCES [dbo].[Empleado] ([EmpleadoId])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [FK_Usuario_Empleado]
GO
