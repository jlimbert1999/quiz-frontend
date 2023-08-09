import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { question } from '../interfaces/question.interface';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  gameRounds = 10
  area: string = ''
  constructor(private http: HttpClient) { }

  getQuestion(area: string) {
    return this.http.get<question>(`${environment.base_url}/question/${area}`)
  }
  getAreas() {
    return this.http.get<string[]>(`${environment.base_url}/areas`)
  }

  getNextQuestion(currentQuestionID: string, area: string) {
    return this.http.get<question>(`${environment.base_url}/question/next/${currentQuestionID}/${area}`)
  }
  reset() {
    return this.http.get<question>(`${environment.base_url}/restart`)
  }
}
