export class Transaccion {     
    constructor(
     public id: number = null,
     public fecha: Date = null,
     public ip: string = null,
     public usuario: string = null,
     public estado: {} = null
   ) {}
}