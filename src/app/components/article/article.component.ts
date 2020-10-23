import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ArticleService } from "../../services/article.service";
import { Article } from "../../models/article";
import { TransaccionService } from "src/app/services/transaccion.service";
import { Transaccion } from "../../models/transaccion";
import { TransaccionComponent } from "../transaccion/transaccion.component";
import { subscribeOn } from "rxjs/operators";
import { Console } from '@angular/core/src/console';
import { ipv4 } from 'ipify2';
import { ip } from 'address';

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.css"],
})
export class ArticleComponent implements OnInit {
  // Component properties
  allArticles: Article[];
  statusCode: number;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;
  validar = false;
  // Create form
  articleForm = new FormGroup({
    title: new FormControl("", Validators.required),
    category: new FormControl("", Validators.required),
  
  });
  ipAddress: any;

  // Create constructor to get service instance
  constructor(
    private articleService: ArticleService,
    private router: Router,
    private transaccionService: TransaccionService
  ) {}
  // Create ngOnInit() and and load articles
  ngOnInit(): void {
    this.getAllArticles();
  }
  // Fetch all articles

  getAllArticles() {
    const subs = this.articleService.getAllArticles().subscribe((array: any) => {
      let articles: Article[] = [];
        for (let index = 0; index < array.length; index++) {
          let article = array[index] as Article;
          articles.push(article);
        }
        //   console.log("DATA::", data);
        this.allArticles = articles.sort(function (a, b) {
          if (a.id > b.id) {
            return -1;
          }
          if (a.id < b.id) {
            return 1;
          }
          return 0;
        });
      // (this.allArticles = data),
      //   (errorCode: number) => (this.statusCode = errorCode);
    });
  }
  // Handle create and update article
  onArticleFormSubmit() {
    this.processValidation = true;
    if (this.articleForm.invalid) {
      return; // Validation failed, exit from method.
    }
    // Form is valid, now perform create or update
    this.preProcessConfigurations();
    let article = this.articleForm.value;
    if (this.articleIdToUpdate === null) {
      // Generate article id then create article
      this.articleService.getAllArticles().subscribe((articles: Article) => {
        // Create article
        const subs = this.articleService.createArticle(article).subscribe(
          (successCode: any) => {
            // this.statusCode = successCode;
            // this.getAllArticles();
            // this.backToCreateArticle();
            console.log(successCode);
            // variables para llamar el articulo en el estado
            console.log("article?", article)
            let articleData ={
              title: article.title,
              category: article.category
            };

            // variable de transaccion de articulo
            let tr: Transaccion = {
              id: null,
              fecha: new Date(),            
              ip: "127.0.0.0", 
              usuario: "Defaul",
              estado: "he was created  " + JSON.stringify(articleData)
            };
            this.transaccionService
              .createTransaccion(tr)
              .subscribe((transaccion: Transaccion) => {
                console.info(transaccion);
              });
            this.getAllArticles();
            this.articleForm.reset();
          },
          (errorCode) => (this.statusCode = errorCode)
        );
      });
    } else {
      // Handle update article
      article.id = this.articleIdToUpdate;
      const subs = this.articleService.updateArticle(article).subscribe(
        (successCode: any) => {
          this.statusCode = successCode;
          this.getAllArticles();
          this.backToCreateArticle();
        },
        (errorCode) => (this.statusCode = errorCode)
      );
    }
  }
  // Load article by id to edit
  loadArticleToEdit(articleId: string) {
    this.preProcessConfigurations();
    const subs = this.articleService.getArticleById(articleId).subscribe(
      (article: any) => {
        console.log("article?", article)
            let articleData = {
              id: article.id== 0, 
              title: article.title = article.title,
              category: article.category = article.category
            };

        let tr: Transaccion = {         
          id: null,
          fecha: new Date(),         
          ip: "127.0.0.0",        
          usuario: "Defaul",
          estado: " Se actualizo "+ JSON.stringify(articleData),
        };
        this.transaccionService
          .createTransaccion(tr)
          .subscribe((transaccion: Transaccion) => {
            console.info(transaccion);
          });
        console.log(article, "poiuytre");
        this.articleIdToUpdate = article.id;
        this.articleForm.setValue({
          title: article.title,
          category: article.category,
        });
        this.processValidation = true;
        this.requestProcessing = false;
      },
      (errorCode) => (this.statusCode = errorCode)
    );
  }
  // Delete article
  deleteArticle(articleId: string) {
    this.preProcessConfigurations();
    const subs = this.articleService.deleteArticleById(articleId).subscribe(
      (successCode) => {
        // this.statusCode = successCode;
        // Expecting success code 204 from server
        this.statusCode = 204;
        this.getAllArticles();
        this.backToCreateArticle();

        console.log("article?", articleId)
            let articleData = {
              articleId
            };
        let ipAddrees = this.getIP();
        let tr: Transaccion = {
          id: null,
          fecha: new Date(),
          ip: "127.0.0.0",
          usuario: "Defaul",
          estado:  " Se elimino "+ JSON.stringify(articleData),
        };
        this.transaccionService
          .createTransaccion(tr)
          .subscribe((transaccion: Transaccion) => {
            console.info(transaccion);
          });
      },
      (errorCode) => (this.statusCode = errorCode)
    );
  }
  //  Funcion ip
  getIP()  
  {  
    this.articleService.getIPAddress().subscribe((res:any)=>{  
      this.ipAddress=res.ip;  
    });  
  }  
  // Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
  // Go back from update to create
  backToCreateArticle() {
    this.articleIdToUpdate = null;
    this.articleForm.reset();
    this.processValidation = false;
  }
 
}
