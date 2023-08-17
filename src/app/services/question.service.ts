import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { option, question } from '../interfaces/question.interface';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  gameRounds = 10
  area: string = ''
  constructor(private http: HttpClient) { }

  getQuestion() {
    return this.http.get<question>(`${environment.base_url}/question/${this.area}`).pipe(map(resp => {
      let { options, ...values } = resp
      options = options.map(option => {
        return { ...option, selected: false }
      })
      return { ...values, options }
    }))
  }
  solveQuestion(id_question: string) {
    return this.http.put<question>(`${environment.base_url}/question/solve/${id_question}`, undefined)
  }
  getAreas() {
    return this.http.get<string[]>(`${environment.base_url}/areas`)
  }


  reset() {
    return this.http.get<question>(`${environment.base_url}/restart`)
  }
}
