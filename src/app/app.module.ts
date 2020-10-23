import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes } from '@angular/router';


//componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './components/article/article.component';
import { TransaccionComponent } from './components/transaccion/transaccion.component';

//servicios
import { ArticleService } from "src/app/services/article.service";
import { TransaccionService } from "src/app/services/transaccion.service";
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

//rutas
export const appRoutes: Routes = [
  {path: 'article', component: ArticleComponent},
  {path: 'transacciones', component: TransaccionComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    TransaccionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot(appRoutes)
   
  
  ],
  providers: [
    ArticleService,
    TransaccionService,
    Location, {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
