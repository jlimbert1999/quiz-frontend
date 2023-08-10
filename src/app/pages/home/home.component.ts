import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { question } from 'src/app/interfaces/question.interface';
import { ParticipantService, participant } from 'src/app/services/participant.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  started: boolean = false
  question: question
  answered: boolean = false
  currentRoud = 0


  showWarning: boolean = true;

  isQuizStarted: boolean = false;
  isQuizEnded: boolean = false;
  questionsList: any[] = [];
  currentQuestionNo: number = 0;

  remainingTime: number = 30;

  timer = interval(1000);
  subscription: Subscription[] = [];
  correctAnswerCount: number = 0;

  constructor(
    public questionService: QuestionService,
    public participantService: ParticipantService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
  }
  getQuestion() {
    this.questionService.getQuestion(this.questionService.area).subscribe(data => {
      data.options = data.options.sort(() => Math.random() - 0.5)
      this.question = data
      this.remainingTime = 30
    })
  }

  addScore(pos: number) {
    this.participantService.participants[pos].score += 10
  }
  removeScore(pos: number) {
    if (this.participantService.participants[pos].score === 0) return
    this.participantService.participants[pos].score -= 10
  }

  nextQuestion() {
    if (!this.question) {
      return
    }
    this.questionService.getNextQuestion(this.question._id, this.questionService.area).subscribe(data => {
      this.answered = false
      data.options = data.options.sort(() => Math.random() - 0.5)
      this.question = data
      this.remainingTime = 30
      this.subscription.push(this.timer.subscribe(res => {
        if (this.remainingTime != 0) {
          this.remainingTime--;
        }
        if (this.remainingTime == 0) {
          this.remainingTime = 30;
        }
      }))

    })
  }

  endMatch() {
    if (this.participantService.participants[0].score === this.participantService.participants[1].score) return
    this.router.navigate(['presentation'])
  }




  finish() {
    this.isQuizEnded = true;
    this.isQuizStarted = false;
  }




  selectOption(option: any) {
    this.subscription.forEach(element => {
      element.unsubscribe();
    });
    this.answered = true
    option.isSelected = true;
  }

  startQuiz() {
    if (this.questionService.area === '') return
    this.isQuizStarted = true;
    this.getQuestion()
    this.subscription.push(this.timer.subscribe(res => {
      if (this.remainingTime != 0) {
        this.remainingTime--;
      }
      if (this.remainingTime == 0) {
        this.getQuestion()
      }
    })
    )
  }


}
