import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, retry } from 'rxjs/operators';

import { Article } from "../models/article";
import { TransaccionComponent } from "../components/transaccion/transaccion.component";
import { Transaccion } from "../models/transaccion";
import { Router } from '@angular/router';

@Injectable()
export class ArticleService {
  //URL for CRUD operations
  articleUrl = "http://localhost:3000";
  // articleUrl = "http://server3.azlogica.com:3200";
  transaccion: any;
 
  //Create constructor to get Http instancenpm start
  constructor(private http: HttpClient, router:Router) {}

  //Fetch all articles

  getAllArticles() {
    console.log("getAllarticle");
    return this.http.get(`${this.articleUrl}/article/get-article`);
  }
  //Create article
  createArticle(article: Article): Observable<any> {
    // let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        // return this.http.post(this.articleUrl + '/article/create-article', article);
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json");
    return this.http.post(
      this.articleUrl + "/article/create-article",
      JSON.stringify(article),
      { headers: headers }
    );
  }

  //Fetch article by id
  getArticleById(articleId: string) {
    let headers = new Headers({ "Content-Type": "application/json" });
    // let options = new HttpRequest({ headers: cpHeaders });
    console.log(this.articleUrl + "/get-article-by-id?id=" + articleId);
    return this.http.get(
      `${this.articleUrl}/article/get-article-by-id?id=${articleId}`
    );
  }
  //Update article
  updateArticle(article: Article) {
    // const cpHeaders = new Headers({ "Content-Type": "application/json" });
    // let options = new HttpRequest({ headers: cpHeaders });
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json");
    return this.http.put(
      this.articleUrl + "/article/update-article",
      JSON.stringify(article),
      { headers: headers }
    );
  }
  //Delete article
  deleteArticleById(articleId: string) {
    let cpHeaders = new Headers({ "Content-Type": "application/json" });
    // let options = new HttpRequest({ headers: cpHeaders });
    return this.http.delete(
      this.articleUrl + "/article/delete-article?id=" + articleId
    );
  }
  //  la ip
  getIPAddress(){  
    return this.http.get("http://api.ipify.org/?format=json");  
  }  

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body;
  }
  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

}
