import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpenTriviaDbService } from '../service/open-trivia-db.service';

@Component({
  selector: 'app-end-app-quiz',
  templateUrl: './end-app-quiz.component.html',
  styleUrls: ['./end-app-quiz.component.css']
})
export class EndAppQuizComponent implements OnInit {

  score = 0;

  constructor(private apiDB: OpenTriviaDbService, private router: Router) { }

  ngOnInit(): void {
    this.score = this.apiDB.getScore();
    console.log(this.score);
  }

  goToHome() {
    this.router.navigate(['']);
    this.apiDB.setScore(0);
  }

  goToGame() {
    this.router.navigate(['game']);
    this.apiDB.setScore(0);
  }
}
