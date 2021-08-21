import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  results: any;
  userInput = { currency: 'EUR/USD', interval: 2 };
  userInputForm!: FormGroup;
  currencyArray: string[] = [];
  notInitialized: boolean = true;
  constructor() { }

  ngOnInit(): void {
    this.userInputForm = new FormGroup({
      currency: new FormControl(this.userInput.currency, [Validators.required, Validators.pattern(/^[A-z']{3}\/[A-z']{3}$/)]),
      interval: new FormControl(this.userInput.interval, [Validators.max(600)])
    })
  }

  onSubmit() {
    this.currencyArray.unshift(this.input.currency.value.toUpperCase())

    if (this.notInitialized) {
      this.fetchCurrency(this.currencyArray[0]);
      this.notInitialized = false;
    }

    if (this.currencyArray.length == 2) { this.currencyArray.pop() }

    setInterval(() => {
      this.fetchCurrency(this.currencyArray[0])
    }, this.input.interval.value * 1000)
  }

  get input() { return this.userInputForm.controls }

  private async fetchCurrency(currency: string): Promise<any> {
    const getCurrency = await fetch(`https://financialmodelingprep.com/api/v3/fx/${currency.replace('/', '')}?apikey=ae1fbf49d3a1c7c5111b74a1486776df`)
    getCurrency.json().then(data => {
      this.results = data
      console.log(data)
    })
  }

  dateTime() {
    const today = new Date();
    return today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  }

}
