import { Component, Input } from '@angular/core';
import { SectionNameData } from "../../interfaces/deep-dive.data";

@Component({
    selector: 'section-name-component',
    templateUrl: './app/fe-core/components/section-name/section-name.component.html',
})

export class SectionNameComponent{
  @Input() sectionName: SectionNameData;
}
