import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ArticleService } from "../../services/article.service";
import { Article } from "../../models/article";
import { TransaccionService } from "../../services/transaccion.service";
import { Transaccion } from "../../models/transaccion";
import { subscribeOn } from "rxjs/operators";
import { transition } from "@angular/animations";

@Component({
  selector: "app-transaccion",
  templateUrl: "./transaccion.component.html",
  styleUrls: ["./transaccion.component.css"],
})
export class TransaccionComponent implements OnInit {
  // Component properties
  allTransacciones: Transaccion[];
  statusCode: number;
  requestProcessing = false;
  transaccionIdToUpdate = null;
  processValidation = false;
  ipAddress: string = '';
  // Create constructor to get service instance
  constructor(
    private TransaccionService: TransaccionService,
    private router: Router
  ) {}
  // Create ngOnInit() 
  ngOnInit(): void {
    this.getAllTransacciones();    
       
  }
  // Fetch all transacciones

  public getAllTransacciones() {
    let subs = this.TransaccionService.getAllTransacciones().subscribe(
      (array: any) => {
        let transacciones: Transaccion[] = [];
        for (let index = 0; index < array.length; index++) {
          let transaccion = array[index] as Transaccion;
          transacciones.push(transaccion);
        }
        //   console.log("DATA::", data);
        this.allTransacciones = transacciones.sort(function (a, b) {
          if (a.fecha > b.fecha) {
            return -1;
          }
          if (a.fecha < b.fecha) {
            return 1;
          }
          return 0;
        });
      }
    );
  }

  public createTransaccion() {
    this.TransaccionService.getAllTransacciones().subscribe(
      (transaccion: any) => {
        // Create transaccion
        const subs = this.TransaccionService.createTransaccion(
          transaccion
        ).subscribe(
          (successCode: any) => {
            this.statusCode = successCode;
            this.getAllTransacciones();
            this.backToCreateTransaccion();
          },
          (errorCode) => (this.statusCode = errorCode)
        );
      }
    );
  }
   //    codigo imprime ip pc
   getIP()  
  {  
    this.TransaccionService.getIPAddress().subscribe((res:any)=>{  
      this.ipAddress=res.ip;  
    });  
  }

  // Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
  // Go back from update to create
  backToCreateTransaccion() {
    this.transaccionIdToUpdate = null;
    this.processValidation = false;
  }
 
}
