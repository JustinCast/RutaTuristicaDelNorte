// esta clase es la equivalente para un tour o un servicio que se ofrece
export class Service {
  constructor(
    public id?: number,
    public location?: string,
    public name?: string,
    public clasification?: string,
    public additionalInfo?: string,
    public phone?: string,
    public email?: string
  ) {}
}
