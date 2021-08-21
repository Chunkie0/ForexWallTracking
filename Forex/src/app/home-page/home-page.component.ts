import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  results: any;
  userInput = { firstCurrency: '', secondCurrency: '', interval: 2 };
  userInputForm!: FormGroup;
  currencyArray: any[] = [];
  notInitialized: boolean = true;
  error: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.userInputForm = new FormGroup({
      firstCurrency: new FormControl(this.userInput.firstCurrency, Validators.required),
      secondCurrency: new FormControl(this.userInput.secondCurrency, Validators.required),
      interval: new FormControl(this.userInput.interval, [Validators.max(600)])
    })
  }

  onSubmit() {

    this.currencyArray.unshift([this.input.firstCurrency.value, this.input.secondCurrency.value].join(''))

    if (this.notInitialized) {
      this.fetchCurrency(this.currencyArray[0]);
      this.notInitialized = false;
    }

    if (this.currencyArray.length == 2) { this.currencyArray.pop() }

    if (this.error) {
      setInterval(() => {
        this.fetchCurrency(this.currencyArray[0])
      }, this.input.interval.value * 1000)
    }
  }

  get input() { return this.userInputForm.controls }

  private async fetchCurrency(currency: string): Promise<any> {
    const getCurrency = await fetch(`https://financialmodelingprep.com/api/v3/fx/${currency}?apikey=ae1fbf49d3a1c7c5111b74a1486776df`)
    getCurrency.json().then(data => {
      this.results = data
      if (this.results[0].ticker === null) {
        this.error = true
        alert("No such currency pair available. Try different one!:)")
      }
    })
  }

  dateTime() {
    const today = new Date();
    return today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  }

}
