export class Tour {
  constructor(
    public name?: string,
    public description?: string,
    public phones?: string,
    public imgs?: Array<string>,
    public email?: string,
    public id_user?: number,
    public related_service?: number
    ) {}
    
}