import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { option, question } from 'src/app/interfaces/question.interface';
import {
  ParticipantService,
  participant,
} from 'src/app/services/participant.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  question: question;
  answered: boolean = false;
  timer = interval(1000);

  remainingTime: number = 20;
  private timerSubscription: Subscription;
  showOptions: boolean = false;
  partyIsEnd: boolean = false;
  winner: participant;

  constructor(
    public questionService: QuestionService,
    public participantService: ParticipantService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  getQuestion() {
    this.showOptions = false;
    this.remainingTime = 20;
    this.stopTimer();
    this.questionService.getQuestion().subscribe((data) => {
      this.answered = false;
      // data.options = data.options.sort(() => Math.random() - 0.5);
      this.question = data;
    });
  }

  addScore(pos: number) {
    this.participantService.participants[pos].score += 10;
  }
  removeScore(pos: number) {
    if (this.participantService.participants[pos].score === 0) return;
    this.participantService.participants[pos].score -= 10;
  }

  nextQuestion() {
    if (!this.question) {
      return;
    }
    // this.questionService.getNextQuestion(this.question._id, this.questionService.area).subscribe(data => {
    //   this.answered = false
    //   data.options = data.options.sort(() => Math.random() - 0.5)
    //   this.question = data
    //   this.remainingTime = 30
    //   this.subscription.push(this.timer.subscribe(res => {
    //     if (this.remainingTime != 0) {
    //       this.remainingTime--;
    //     }
    //     if (this.remainingTime == 0) {
    //       this.remainingTime = 30;
    //     }
    //   }))

    // })
  }

  startTimer() {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        this.stopTimer();
      }
    });
  }
  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  solve(option: option) {
    
    this.questionService.solveQuestion(this.question._id).subscribe(_ => {
      this.answered = true;
      option.selected = true;
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showCloseButton: true,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      this.timerSubscription.unsubscribe();
      if (option.correct) {
        Toast.fire({
          icon: 'success',
          title: 'Respuesta correcta :)',
        });
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Respuesta incorrecta :(',
        });
      }
    })
  }
  startQuestion() {
    this.showOptions = true;
    this.startTimer();
  }
  endParty() {
    if (
      this.participantService.participants[0].score ===
      this.participantService.participants[1].score
    )
      return;
    this.winner = this.participantService.participants.sort(
      (a, b) => b.score - a.score
    )[0];
  }
  restart() {
    this.question = undefined;
    this.winner = undefined;
    this.participantService.participants[0].score = 0;
    this.participantService.participants[1].score = 0;
    this.questionService.reset().subscribe();
  }
}
