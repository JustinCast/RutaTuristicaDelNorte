// esta clase es la equivalente para un tour o un servicio que se ofrece
export class Service {
  constructor(
    public location?: string,
    public name?: string,
    public classification?: string,
    public additional_info?: string,
    public phone?: string,
    public email?: string,
    public id?: number
  ) {}
}
