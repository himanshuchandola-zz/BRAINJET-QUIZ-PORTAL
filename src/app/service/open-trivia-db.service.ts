import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class OpenTriviaDbService {
  private score = new BehaviorSubject<any>(0);
  questionURL = "https://opentdb.com/api.php?amount=10&type=multiple";

  setScore(points: number) {
    this.score.next(points);
  }

  getScore() {
    return this.score.value;
  }

  constructor(
    private http: HttpClient,
  ) { }

  getCategories() {
    const categoriesURL = 'https://opentdb.com/api_category.php';
    return this.http.get(categoriesURL, {responseType: 'json'}).pipe(
      catchError(this.handleError('getCategories', []))
    );
  }

  getQuiz(category:number, difficulty:string) {
    return this.http.get(this.questionURL + '&category=' + `${category}` + '&difficulty=' + `${difficulty}`, { responseType: 'json' }).pipe(
      catchError(this.handleError('getQuiz', []))
    );
  }

  private handleError(operation = 'operation', result?: any) {
    return (error: any) => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }

}
