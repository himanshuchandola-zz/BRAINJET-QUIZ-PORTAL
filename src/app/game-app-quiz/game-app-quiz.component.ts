import { Component, OnInit, Renderer2 } from '@angular/core';
import { OpenTriviaDbService } from '../service/open-trivia-db.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-game-app-quiz',
  templateUrl: './game-app-quiz.component.html',
  styleUrls: ['./game-app-quiz.component.css']
})
export class GameAppQuizComponent implements OnInit {

  categories = new FormControl('', Validators.required);
  difficulty = new FormControl('', Validators.required);

  difficultyData = [
    {name: 'Easy', type: 'easy'},
    {name: 'Medium', type: 'medium'},
    {name: 'Hard', type: 'hard'},
  ];
  categoriesData: any;

  selectedCategory: any;
  selectedDifficulty: any;

  isOptionSelected = false;

  constructor(
    private apiDB: OpenTriviaDbService,
    private router: Router,
    private render: Renderer2,
  ) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.apiDB.getCategories().subscribe((resp: any) => {
      console.log(resp);
      this.categoriesData = resp.trivia_categories.map((res: any) => {
        let id = res.id;
        let name = res.name;
        // console.log(id, name);
        return {id, name}
      });
      console.log(this.categoriesData);
    });
  }

  playGame() {
    if (this.categories.value !== '' && this.difficulty.value !== '') {
      this.isOptionSelected = true;
    }
  }

  selectCategory() {
    this.selectedCategory = this.categories.value;
  }

  selectDifficulty() {
    this.selectedDifficulty = this.difficulty.value;
  }
}
