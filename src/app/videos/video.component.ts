import { Component, Input, HostListener, ChangeDetectorRef, EventEmitter, OnInit } from '@angular/core';


import { EventManager } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { SearchComponent } from '../services/search/search.component';
import { AppComponent } from "../app.component";
import { appendNgContent } from "@angular/core/src/view/ng_content";



import { FirebaseApp } from 'angularfire2';
import { Router } from '@angular/router';


import * as firebase from 'firebase/app';

import { AngularFireModule } from 'angularfire2';
import { AngularFireList } from 'angularfire2/database';



import { AngularFireDatabase } from 'angularfire2/database';
import { UploadService } from '../services/uploads/shared/upload.service';
import { Upload } from '../services/uploads/shared/upload';

import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


import { AngularFireAction } from 'angularfire2/database';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import * as $ from 'jquery';




declare const window: any;


@Component({
  selector: 'videos',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']

})
export class VideoComponent {
  @Input() anekdot: String = "";

  @Input() article: any;
  @Input() title: any;
  @Input() url: any;

  basePath: any = '/video';
  basetPathAnekdot: any = '/anekdot';

  // items: AngularFireList<String[]>;
  items: Observable<any[]>;
  itemsRef: AngularFireList<any>;

  itemsAnek: Observable<any[]>;
  itemsAnekRef: AngularFireList<any>;


  selectedFiles: FileList | null;
  currentUpload: Upload;

  itemsImages: string = "";
  show: boolean = false;
  clicked: boolean = false;
  insertActive: boolean = false;
  deletedActive: boolean = false;
  sent: boolean = false;

  index: any = 0;
  indexEnd: any = 10;
  indexArray: any;

  constructor(private af: AngularFireDatabase, private upSvc: UploadService, private sanitizer: DomSanitizer) {



    this.itemsRef = af.list(this.basePath);
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });



    this.itemsAnekRef = this.af.list(this.basetPathAnekdot);
    this.itemsAnek = this.itemsAnekRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });




    let i = 0;
    this.items.subscribe(data => {
        if (i < 1) {
            this.indexArray = data.length;
            if(this.indexArray>10) {
              this.indexEnd=10; 
            }
            else {
            this.indexEnd=data.length;
            }
            console.log(this.indexArray);
            this.index = 0;            
            i++;
        }
    });


  }
  ngOnInit() {

    let firefox = false;

    var objappVersion = navigator.appVersion;
    var objAgent = navigator.userAgent;
    var objbrowserName = navigator.appName;
    var objfullVersion = '' + parseFloat(navigator.appVersion);
    var objBrMajorVersion = parseInt(navigator.appVersion, 10);
    var objOffsetName, objOffsetVersion, ix;

    // In Chrome 
    if ((objOffsetVersion = objAgent.indexOf("Chrome")) != -1) {
      objbrowserName = "Chrome";
      objfullVersion = objAgent.substring(objOffsetVersion + 7);
    }
    // In Microsoft internet explorer

    else if ((objOffsetVersion = objAgent.indexOf("MSIE")) != -1) {
      objbrowserName = "Microsoft Internet Explorer";
      objfullVersion = objAgent.substring(objOffsetVersion + 5);
    }

    // In Firefox
    else if ((objOffsetVersion = objAgent.indexOf("Firefox")) != -1) {
      objbrowserName = "Firefox";
      console.log("its firefox:::))))");
      firefox = true;
    }


    try {
     
        let src = "../../assets/greetingRodion.ogg";
        let audio1 = new Audio();
        audio1.addEventListener('load', function () {
          audio1.play();
        }, true);

        audio1.src = src;
        audio1.autoplay = true;



        src = "../../assets/greetingNina.ogg";
        let audio2 = new Audio();
        audio2.addEventListener('ended', function () {
          audio2.pause();

        }, true);
        audio2.src = src;

        audio1.onended = function () {
          console.log("audio1 ended");
          audio2.play();
          audio2.autoplay = true;
        }      

    }
    catch (Exception) {

    }



  }



  uploadArticle() {
    this.insertActive = true;

    if (this.article != undefined && this.article != null && this.title != null && this.url != null) {

      const file = new File([""], "filename.txt", { type: "text/plain" });
      this.currentUpload = new Upload(file);
      this.currentUpload.content = { "title": this.title, "content": this.article, "urlRef": this.url };
      this.upSvc.basePath = this.basePath;
      this.upSvc.pushUpload(this.currentUpload);
      this.article = null;
      this.title = null;
      this.url = null;
      this.showMessage();
    }
    else {
      alert("Give title and content of the article. Дайте название, содержание");
    }
  }



  showMessage() {
    this.sent = true;
    var startTime = new Date().getTime();
    var interval = setInterval(() => {
      if (new Date().getTime() - startTime > 3000) {
        clearInterval(interval);
        this.sent = false;
        return;
      }
      //do whatever here..
    }, 3000);
  }

  loadAnekdot() {
    this.clicked = true;
    //this.items = af.list(this.basePath);
    this.itemsAnek.subscribe(data => {
      if (this.clicked) {
        let index = Math.floor(Math.random() * data.length);
        if (data[index]['title'] == 'anekdotImage') {
          this.itemsImages = data[index]['content'];
          this.anekdot = null;
          this.show = true;
        }
        else {
          this.anekdot = data[index]['content'];
          this.show = false;
        }
        this.clicked = false;
        return;
      }
    });
  }


  public getStyle() {
    if (this.anekdot.length < 50) {
      return 30;
    }
    else {
      return this.anekdot.length / 1.8;
    }
  }


  setModusActive() {
    this.insertActive = true;
  }

  setDeleteActive() {
    this.deletedActive = true;
  }

  deleteItem(item: any) {
    if (this.deletedActive) {
      let result = "";
      this.items.subscribe(data => {
        if (this.deletedActive) {
          let index = data.length - item - 1;
          let db = this.af.list("/video/");
          result = (data[index]['key']);
          console.log(result);
          this.af.object('/video/' + result).remove();
          console.log(result);


          this.basePath = '/video';
          const storageRef = firebase.storage().ref();
          storageRef.child(`${this.basePath}/${result}`).delete();
          this.deletedActive = false;
          return;
        }
      });
    }
  }

  showIndex(index: any) {
    console.log("index is " + index);
  }


  showNextPage(index: any) {
    console.log("total length " + this.indexArray);
    console.log("current index " + index);
    if (index == this.indexArray - 1) {
        return;
    }
    this.index = index;
    if (this.index + 11 <= this.indexArray) {
        this.indexEnd = this.index + 11;
        this.index += 1;
        $(".page").remove();
    }
    else {
        this.index = index + 1;
        this.indexEnd = this.indexArray;
    }
    console.log("this index " + this.index + ", indexEnde " + (this.indexEnd - 1));

}


showPreviousPage(index: any) {
    console.log("total length " + this.indexArray);
    console.log("current index " + index);
    if (index == this.indexArray - 1) {
        if (index - 9> 0) {
            this.index = index - 9;
            this.indexEnd = index;
        }
    }

    else if (index - 19 > 0) {
        this.index = index - 19;
        this.indexEnd = index - 9;
    }
    else {
        this.index = 0;
        this.indexEnd = 10;
    }
    console.log("this index " + this.index + ", indexEnde " + (this.indexEnd - 1));

    this.itemsRef = this.af.list(this.basePath);
    this.items = this.itemsRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    $(".page").remove();

}


}
