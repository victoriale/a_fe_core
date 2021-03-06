import {Component, Input} from '@angular/core';

@Component({
  selector: 'recommendations-component',
  templateUrl: './recommendations.component.html'

})

export class RecommendationsComponent {
  @Input() randomHeadlines:any;
  @Input() images:any;
  @Input() isAiArticle:boolean;
  @Input() isDeepDive:boolean = false;
}
