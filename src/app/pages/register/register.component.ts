import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipantService } from 'src/app/services/participant.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name: string = ''
  constructor(
    public participantService: ParticipantService,
    private router: Router
  ) {

  }

  addCompetitor() {
    if (this.participantService.participants.length === 2) return
    this.participantService.addParticipant(this.name)
    this.name = ''
  }
  removeCompetior(pos: number) {
    this.participantService.participants.splice(pos, 1)
  }

  start() {
    this.router.navigate(['home'])
  }
  get disableStart() {
    if (this.participantService.participants.length >= 2) {
      return false
    }
    return true
  }


}
