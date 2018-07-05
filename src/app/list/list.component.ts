import { Component, OnInit, Input } from '@angular/core';
import { LISTELEMENTS } from './list.mock';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() listElements;
  topPointer: number;
  leftPointer: number;
  columns = [0, 0, 0, 0, 0];
  mod = 10;

  constructor() {}

  ngOnInit() {
    this.topPointer = 9000;
    this.leftPointer = 0;
    this.loadElements();
  }

  loadElements(): void {
    this.listElements = LISTELEMENTS.reduce((list, item) => {
      const itemDisplayed = {
        ...item,
        position: { top: 20, left: 0 }
      };
      return list.concat(itemDisplayed);
    }, []);
  }

  displayElements(): void {
    this.columns = [0, 0, 0, 0, 0];
    let i = 0;
    this.topPointer = 0;
    this.leftPointer = 0;
    this.listElements.forEach(element => {
      if (i > this.mod) {
        document.getElementById('item' + i).classList.remove('invisible');
        element.position = this.whichColumn(String(i));
      } else {
        document.getElementById('item' + i).classList.add('invisible');
        element.position = { top: 0, left: 0 };
      }
      i++;
    });
    this.mod = Math.floor(Math.random() * 10) + 1;
  }

  whichColumn(id: string) {
    const index = this.columns.indexOf(Math.min(...this.columns));
    const topPosition = this.columns[index];
    this.columns[index] += document.getElementById('item' + id).offsetHeight;
    return { top: topPosition, left: index * (100 / 5) };
  }
}
