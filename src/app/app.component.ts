import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SearchComponent } from './services/search/search.component';
import * as $ from 'jquery';


declare const window: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnDestroy, OnInit {
  @Input() input: any = "";

  scroll: boolean = false;
  scrollStart: boolean = false;
  start: any;
  htmlElement: any;

  eventSubject = new Subject<string>();
  eventListener = null;
  constructor(private searchService: SearchComponent) {
    this.eventListener = this.eventSubject.subscribe(s => {
      this.searchService.handle(s);
    });
    console.log('string ' + this.eventListener);



  }

  process(event: any) {
    this.input = event;
    console.log(event);
    console.log("Event triggered ************************************************"+this.input);
    this.eventSubject.next(event);
    this.searchService.handle(event);
  }



  ngOnInit (){
    $(document).ready(function(){
      $('.menu-trigger').click(function(){
        $('div.nav ul li').slideToggle(500);
        $('.link').click(function(){
          $('div.nav ul li').removeAttr('style');
        });
      });
      $(window).resize(function(){
        if($(window).width()>500){
          $('div.nav ul li').removeAttr('style');
          
        }
      })
    });

  }


  dropDown() {

  }



  detectScroll(event: any) {
    this.htmlElement = document.getElementById('menu');
    this.htmlElement.style.position = 'fixed';
    this.htmlElement.style.zIndex = '2';
    this.scroll = true;
    this.startInterval();
    console.log("scroll start and event"+ event); 
  }


  startInterval() {
    if (this.scroll && !this.scrollStart) {
      this.scrollStart = true;
      var startTime = new Date().getTime();
      var interval = setInterval(() => {
        if (new Date().getTime() - startTime > 2000) {
      
          clearInterval(interval);
          this.scrollStart = false;
          this.htmlElement.style.position = 'relative';
          this.htmlElement.style.zIndex = '-2';
          return;
        }
        //do whatever here..
      }, 3000);
    }
  }


  hideElements() {
    document.getElementById("contentMenu").style.visibility = "hidden";
    var startTime = new Date().getTime();
    var interval = setInterval(() => {
      if (new Date().getTime() - startTime > 200) {
        clearInterval(interval);
        document.getElementById("contentMenu").style.visibility = "visible";
        return;
      }
      //do whatever here..
    }, 200);

  }

ngOnDestroy(){
this.eventSubject.unsubscribe(); 
}



}
