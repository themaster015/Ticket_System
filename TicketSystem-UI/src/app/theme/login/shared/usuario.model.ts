export class Usuario {
  constructor(
    public usuarioId: number,
    public userName: string,
    public userPassword: string,
    public empleadoId: number,
    public esAdministrador: boolean,
    public userPassword2: string,
    public estado: boolean
  ) {}
}
