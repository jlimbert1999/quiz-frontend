import { Injectable } from '@angular/core';
export interface participant {
  name: string
  score: number
}
@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  participants: participant[] = [
    {
      name: '',
      score: 0
    },
    {
      name: '',
      score: 0
    }
  ]
  constructor() { }


  addParticipant(name: string) {
    this.participants.push({ name, score: 0 })
  }

  getQuestion() {

  }
}
