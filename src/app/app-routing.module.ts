import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//componentes
import { ArticleComponent } from './components/article/article.component';
import { TransaccionComponent } from './components/transaccion/transaccion.component';


const routes: Routes = [
  { path: 'article', component: ArticleComponent },
  { path: 'transaccion', component: TransaccionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
