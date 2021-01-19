import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonMethods {

  stringCompare(a: string, b: string): number {
    /**
     * Sort string and returns 0 (equal), 1 (a greater), -1 (b greater)
     */
    console.log(a, b);
    a = a.toUpperCase();
    b = b.toUpperCase();
    if (a > b) { return 1; } else if (a < b) { return -1; } else { return 0; }
  }


  randomBetweenRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
