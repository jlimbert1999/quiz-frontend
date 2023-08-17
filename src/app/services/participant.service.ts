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
  addScore(position: 0 | 1) {
    this.participants[position].score += 10
  }

  reduceScore(position: 0 | 1) {
    if (this.participants[position].score <= 0) return
    this.participants[position].score -= 10
  }
}
