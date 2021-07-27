import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { OpenTriviaDbService } from 'src/app/service/open-trivia-db.service';

@Component({
  selector: 'app-quiz-section',
  templateUrl: './quiz-section.component.html',
  styleUrls: ['./quiz-section.component.css']
})
export class QuizSectionComponent implements OnInit {
  @Input('selectedCategory') category:any = null;
  @Input('selectedDifficulty') difficulty: any = null;

  isLoading = false;
  isAcceptingAnswer = false;

  questions: any = []

  currentQuestion: any;
  availableQuestions: any;
  score = 0;
  questionCounter = 0;

  CORRECT_BONUS = 10;
  MAX_QUESTIONS = 5;

  progressBar: any;
  questionText: any;
  scoreText = 0;

  constructor(
    private router: Router,
    private render: Renderer2,
    private apiDB: OpenTriviaDbService,
  ) { }

  ngOnInit(): void {
    this.checkOptionsSelected();
  }

  checkOptionsSelected() {
    if (this.category['null'] && this.difficulty['null']) { return }
    else {
      this.getQuestion();
    }
  }

  getQuestion() {
    this.isLoading = true;
    this.apiDB.getQuiz(this.category, this.difficulty).subscribe((resp: any) => {
      // console.log(resp);
      this.questions = resp.results.map((res: any) => {
        // Tampung dulu question-nya terus buat answer dengan index random
        let ans: any = {
          question: res.question,
          answer: Math.floor(Math.random() * 4) + 1, // membuat pointer untuk answer
        };

        // tampung juga incorrect_answer
        const answerQuestion = [...res.incorrect_answers];

        // masukkan correct_answer ke array answerQuestion dengan pointer dari array ans.answer
        answerQuestion.splice(ans.answer - 1, 0, res.correct_answer);

        answerQuestion.forEach((choices: any, index) => {
          return ans["choice" + (index + 1)] = choices
          /*
            buat nama item array dengan choice + (index + 1)
            jadi misal indexnya = 0 maka, 0 + 1 = 1
            maka hasilnya choice1, choice2, dst.
            kemudian return ke object ans
          */
        });
        return ans
      });
      this.startGame();
      this.isLoading = false;
      console.log(this.questions);
    });
  }

  startGame() {
    this.questionCounter = 0;
    this.score = 0;
    this.availableQuestions = [... this.questions];
    this.getNewQuestion();
  };

  getNewQuestion() {
    if (this.availableQuestions.length === 0 || this.questionCounter >= this.MAX_QUESTIONS) {
      // pergi ke halaman terahir
      this.router.navigate(['result']);
    }
    this.questionCounter++;

    // update progress bar
    this.progressBar = (this.questionCounter / this.MAX_QUESTIONS) * 100;

    //  buat pointer untuk soal saat ini
    const questionIndex = Math.floor(Math.random() * this.availableQuestions.length);

    //  pilih soal saat ini berdasarkan soal yang tersedia menggunakan pointer questionIndex
    this.currentQuestion = this.availableQuestions[questionIndex];
    this.questionText = this.currentQuestion.question;
    // console.log(this.currentQuestion.answer);

    this.availableQuestions.splice(questionIndex, 1);

    this.isAcceptingAnswer = true;
  };

  chooseAnswer(data: number) {
    if (!this.isAcceptingAnswer) { return }
    this.isAcceptingAnswer = false;

    const target = event?.target;
    const classs = this.currentQuestion.answer === data ? "correct" : "incorrect"

    // to increment Score number in HUD
    if (classs === 'correct') {
      this.incrementScore(this.CORRECT_BONUS);
      this.apiDB.setScore(this.score);
    }
    // to relfect if the selected choice correct or incorrect
    this.render.addClass(target, classs);

    setTimeout(() => {
      this.render.removeClass(target, classs);
      this.getNewQuestion();
    }, 1000);
  }

  incrementScore(correct: number) {
    this.score += correct;
  }
}
