// esta clase es la equivalente para un tour o un servicio que se ofrece
export class Service {
  constructor(
    public _location?: string,
    public _name?: string,
    public _classification?: string,
    public _additional_info?: string,
    public _email?: string,
    public _website?: string,
    public _phones?: string,
    public _imgs?: Array<string>,
    public id_service?: number
  ) {}
}
