import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndAppQuizComponent } from './end-app-quiz/end-app-quiz.component';
import { GameAppQuizComponent } from './game-app-quiz/game-app-quiz.component';
import { HighscoreAppQuizComponent } from './highscore-app-quiz/highscore-app-quiz.component';
import { HomeAppQuizComponent } from './home-app-quiz/home-app-quiz.component';

const routes: Routes = [
  {path: '', component: HomeAppQuizComponent},
  {path: 'game', component: GameAppQuizComponent},
  {path: 'highscore', component: HighscoreAppQuizComponent},
  {path: 'result', component: EndAppQuizComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
