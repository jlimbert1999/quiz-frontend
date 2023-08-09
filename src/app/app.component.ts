import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { QuestionService } from './services/question.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  options: string[] = []
  title = 'quiz-frontend';
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  constructor(
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private questionService: QuestionService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.questionService.getAreas().subscribe(data => {
      this.options = data
    })
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  selectArea(value: string) {
    this.questionService.area = value
  }



}
