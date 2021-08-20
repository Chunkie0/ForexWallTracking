import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  results: any;
  userInput = { currency: 'EUR/USD', apiKey: '', interval: 2 }
  userInputForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.userInputForm = new FormGroup({
      currency: new FormControl(this.userInput.currency, [Validators.minLength(7)]),
      apiKey: new FormControl(this.userInput.apiKey),
      interval: new FormControl(this.userInput.interval)
    })
  }

  onSubmit() {
    if (this.input.apiKey.value === "") {
      setInterval(() => {
        this.fetchCurrency(this.input.currency.value)
      }, this.userInput.interval * 1000)
    } else {
      setInterval(() => {
        this.fetchCurrency(this.input.currency.value, this.input.apiKey.value)
      }, this.userInput.interval * 1000)
    }
  }

  get input() { return this.userInputForm.controls }

  private async fetchCurrency(currency: string, API_KEY: string = '696cb5103decbd1a9cc7a96dffd0ee73'): Promise<any> {
    const getCurrency = await fetch(`https://financialmodelingprep.com/api/v3/fx/${currency.replace('/', '')}?apikey=${API_KEY}`)
    getCurrency.json().then(data => {
      this.results = data
    })
  }

  dateTime() {
    const today = new Date();
    return today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  }

}
