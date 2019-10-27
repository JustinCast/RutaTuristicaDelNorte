import { Rates } from './Rates';

export class Service {
  constructor(
    public _location?: string,
    public _name?: string,
    public _classification?: string,
    public _additional_info?: string,
    public _email?: string,
    public _website?: string,
    public _phones?: any,
    public imgs?: Array<string>,
    public _rates?: Rates,
    public id_service?: number,
    public _count?: number,
    public _imgs_lazy?: Array<any>
  ) {}
}
