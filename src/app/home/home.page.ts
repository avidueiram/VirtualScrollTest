import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public items: string[];
  public virtualItems: string[];

  @ViewChild('mainContainer', {read: ElementRef}) mainContainer: ElementRef;

  public rowHeight = 68;
  public containerHeight = 682; // TODO: Get from view
  public startIndex: number;
  public endIndex: number;

  constructor() {
    this.items = [];
    this.virtualItems = [];
    for (let i = 0; i < 10000; i++) {
      this.items.push(`Item #${i}`);
    }
  }


  onScroll($event: CustomEvent<any>) {
    this.startIndex = Math.floor($event.detail.scrollTop / this.rowHeight);
    this.endIndex = this.startIndex + Math.ceil(this.containerHeight / 68);
    if (this.endIndex >= this.items.length) {
      this.endIndex = this.items.length;
    }
    this.virtualItems = this.items.slice(this.startIndex, this.endIndex);
  }

  ngOnInit(): void {
    console.log(this.mainContainer);
    this.startIndex = 0;
    this.endIndex = Math.ceil(this.containerHeight / 68);
    this.virtualItems = this.items.slice(this.startIndex, this.endIndex);
  }
}
