import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipantService, participant } from 'src/app/services/participant.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {
  winner: participant
  constructor(
    public participantService: ParticipantService, private router: Router,
    public questionService: QuestionService
  ) {

  }
  ngOnInit(): void {
    if (this.participantService.participants.length === 0) {
      this.router.navigate(['register'])
      return
    }
    this.winner = this.participantService.participants.reduce((maxParticipant, currentParticipant) => {
      return currentParticipant.score > maxParticipant.score ? currentParticipant : maxParticipant;
    }, this.participantService.participants[0]);
  }

  reset() {
    this.questionService.reset()
  }


}
