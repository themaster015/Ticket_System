export class Empleado {
  constructor(
    public empleadoId: number,
    public identificador: string,
    public nombre: string,
    public apellido: string,
    public cedula: string,
    public email: string,
    public sexo: string,
    public fechaNacimiento: Date,
    public fechaCreacion: Date,
    public estado: boolean
  ) { }
}

