import { Component, Input, QueryList, ContentChildren, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { IpfsComponent } from "../services/ipfs.component";
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { ChangeDetectorRef, EventEmitter, OnInit } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { SearchComponent } from '../services/search/search.component';
import { AppComponent } from "../app.component";
import { appendNgContent } from "@angular/core/src/view/ng_content";
import { UploadService } from '../services/uploads/shared/upload.service';
import { Upload } from '../services/uploads/shared/upload';
import { AngularFireList } from 'angularfire2/database';
import * as $ from 'jquery';


declare var window: any;



@Component({
    selector: 'anekdot-list',
    template: ` 
    
    <div class="anekdot" *ngIf="index<indexEnd" > index is ::: {{index}}</div>
    
   <div> template ist there </div>`,
    styleUrls: ['./anekdotList.css']

})
export class AnekdotListComponent implements OnInit {
   @Input() index: any;
   indexEnd: any;
    constructor() {
        this.indexEnd=this.index+10; 
        console.log(this.indexEnd);
    }
    ngOnInit() {
    

    }

}
