import {NgModule, Input} from '@angular/core';
import {CommonModule} from '@angular/common';


import { AnekdotComponent} from './anekdots.component';
import { AnekdotListComponent } from './anekdotlist';

@NgModule({
    declarations: [AnekdotListComponent],
    exports: [AnekdotListComponent],
    imports:[CommonModule]

})
export class AnekdotModule {
}
