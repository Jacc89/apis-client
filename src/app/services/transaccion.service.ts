import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, retry } from 'rxjs/operators';

import { Transaccion } from "../models/transaccion";

@Injectable({
  providedIn: "root",
})
export class TransaccionService {
  //URL for CRUD operations
  transaccionUrl = "http://localhost:3000";
  // transaccionUrl = "http://server3.azlogica.com:3200";
  //Create constructor to get Http instance
  constructor(protected http: HttpClient) {}

  //Fetch all Transacciones
  getAllTransacciones() {
    return this.http.get(`${this.transaccionUrl}/transaccion/get-transacciones`);
  }

  //Create transacciones
  createTransaccion(transaccion: Transaccion): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json");
    return this.http.post<any>(
      this.transaccionUrl + "/transaccion/create-transaccion",
      JSON.stringify(transaccion),
      { headers: headers }
    );
  }
   //Update article
   updateArticle(transaccion: Transaccion): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json");
    return this.http.put<any>(
      this.transaccionUrl + "/transaccion/update-transaccion",
      JSON.stringify(transaccion),
      { headers: headers }
    );   
  }
   //  la ip
    getIPAddress(){  
    return this.http.get("http://api.ipify.org/?format=json");  
  }  

  protected extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body;
  }
  protected handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
 
}
