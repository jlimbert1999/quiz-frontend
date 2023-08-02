import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { question } from 'src/app/interfaces/question.interface';
import { ParticipantService, participant } from 'src/app/services/participant.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  question: question
  answered: boolean = false
  currentRoud = 0
  constructor(
    public questionService: QuestionService,
    public participantService: ParticipantService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    if (this.participantService.participants.length === 0) {
      this.router.navigate(['register'])
      return
    }
    this.getQuestion()
  }
  getQuestion() {
    this.questionService.getQuestion().subscribe(data => {
      data.options = data.options.sort(() => Math.random() - 0.5)
      this.question = data
    })
  }

  addScore(pos: number) {
    this.participantService.participants[pos].score += 1
  }
  removeScore(pos: number) {
    if (this.participantService.participants[pos].score === 0) return
    this.participantService.participants[pos].score -= 1
  }

  nextQuestion() {
    if (!this.question || !this.answered) {
      return
    }
    this.questionService.getNextQuestion(this.question._id).subscribe(data => {
      this.answered = false
      data.options = data.options.sort(() => Math.random() - 0.5)
      this.question = data
    })
  }

  endMatch() {
    if (this.participantService.participants[0].score === this.participantService.participants[1].score) return
    this.router.navigate(['presentation'])

  }


}
