import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { question } from '../interfaces/question.interface';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  gameRounds = 10
  constructor(private http: HttpClient) { }

  getQuestion() {
    return this.http.get<question>(`${environment.base_url}/question`)
  }

  getNextQuestion(currentQuestionID: string) {
    return this.http.get<question>(`${environment.base_url}/question/next/${currentQuestionID}`)
  }
  reset() {
    return this.http.get<question>(`${environment.base_url}/question/restart`)
  }
}
