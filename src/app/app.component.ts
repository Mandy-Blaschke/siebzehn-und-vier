import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  cards: Card[] = [
    {suit: 'heart', value: 11, type: 'A', imgUrl: '', entity: '♥'},
    {suit: 'heart', value: 10, type: 'K', imgUrl: '', entity: '♥'},
    {suit: 'heart', value: 10, type: 'Q', imgUrl: '', entity: '♥'},
    {suit: 'heart', value: 10, type: 'J', imgUrl: '', entity: '♥'},
    {suit: 'heart', value: 10, type: '10', imgUrl: '', entity: '♥'},
    {suit: 'heart', value: 9, type: '9', imgUrl: '', entity: '♥'},
    {suit: 'heart', value: 8, type: '8', imgUrl: '', entity: '♥'},
    {suit: 'heart', value: 7, type: '7', imgUrl: '', entity: '♥'},
    {suit: 'heart', value: 6, type: '6', imgUrl: '', entity: '♥'},
    {suit: 'heart', value: 5, type: '5', imgUrl: '', entity: '♥'},
    {suit: 'heart', value: 4, type: '4', imgUrl: '', entity: '♥'},
    {suit: 'heart', value: 3, type: '3', imgUrl: '', entity: '♥'},
    {suit: 'heart', value: 2, type: '2', imgUrl: '', entity: '♥'},

    {suit: 'spades', value: 11, type: 'A', imgUrl: '', entity: '♠'},
    {suit: 'spades', value: 10, type: 'K', imgUrl: '', entity: '♠'},
    {suit: 'spades', value: 10, type: 'Q', imgUrl: '', entity: '♠'},
    {suit: 'spades', value: 10, type: 'J', imgUrl: '', entity: '♠'},
    {suit: 'spades', value: 10, type: '10', imgUrl: '', entity: '♠'},
    {suit: 'spades', value: 9, type: '9', imgUrl: '', entity: '♠'},
    {suit: 'spades', value: 8, type: '8', imgUrl: '', entity: '♠'},
    {suit: 'spades', value: 7, type: '7', imgUrl: '', entity: '♠'},
    {suit: 'spades', value: 6, type: '6', imgUrl: '', entity: '♠'},
    {suit: 'spades', value: 5, type: '5', imgUrl: '', entity: '♠'},
    {suit: 'spades', value: 4, type: '4', imgUrl: '', entity: '♠'},
    {suit: 'spades', value: 3, type: '3', imgUrl: '', entity: '♠'},
    {suit: 'spades', value: 2, type: '2', imgUrl: '', entity: '♠'},

    {suit: 'cross', value: 11, type: 'A', imgUrl: '', entity: '♣'},
    {suit: 'cross', value: 10, type: 'K', imgUrl: '', entity: '♣'},
    {suit: 'cross', value: 10, type: 'Q', imgUrl: '', entity: '♣'},
    {suit: 'cross', value: 10, type: 'J', imgUrl: '', entity: '♣'},
    {suit: 'cross', value: 10, type: '10', imgUrl: '', entity: '♣'},
    {suit: 'cross', value: 9, type: '9', imgUrl: '', entity: '♣'},
    {suit: 'cross', value: 8, type: '8', imgUrl: '', entity: '♣'},
    {suit: 'cross', value: 7, type: '7', imgUrl: '', entity: '♣'},
    {suit: 'cross', value: 6, type: '6', imgUrl: '', entity: '♣'},
    {suit: 'cross', value: 5, type: '5', imgUrl: '', entity: '♣'},
    {suit: 'cross', value: 4, type: '4', imgUrl: '', entity: '♣'},
    {suit: 'cross', value: 3, type: '3', imgUrl: '', entity: '♣'},
    {suit: 'cross', value: 2, type: '2', imgUrl: '', entity: '♣'},

    {suit: 'plaid', value: 11, type: 'A', imgUrl: '', entity: '♦'},
    {suit: 'plaid', value: 10, type: 'K', imgUrl: '', entity: '♦'},
    {suit: 'plaid', value: 10, type: 'Q', imgUrl: '', entity: '♦'},
    {suit: 'plaid', value: 10, type: 'J', imgUrl: '', entity: '♦'},
    {suit: 'plaid', value: 10, type: '10', imgUrl: '', entity: '♦'},
    {suit: 'plaid', value: 9, type: '9', imgUrl: '', entity: '♦'},
    {suit: 'plaid', value: 8, type: '8', imgUrl: '', entity: '♦'},
    {suit: 'plaid', value: 7, type: '7', imgUrl: '', entity: '♦'},
    {suit: 'plaid', value: 6, type: '6', imgUrl: '', entity: '♦'},
    {suit: 'plaid', value: 5, type: '5', imgUrl: '', entity: '♦'},
    {suit: 'plaid', value: 4, type: '4', imgUrl: '', entity: '♦'},
    {suit: 'plaid', value: 3, type: '3', imgUrl: '', entity: '♦'},
    {suit: 'plaid', value: 2, type: '2', imgUrl: '', entity: '♦'},
  ];
  currentCardDeck: Card[];
  playerCards: Card[] = [];
  bankCards: Card[] = [];

  playersValue = 0;
  bankValue = 0;

  gameStarted = false;
  playersTurnFinished = false;
  banksTurnFinished = false;
  showRules = false;
  playerWon = false;
  bankWon = false;

  ngOnInit(): void {
  }

  toggleShowRules(): boolean {
    return this.showRules === true ? this.showRules = false : this.showRules = true;
  }

  startGame(): void {
    this.gameStarted = true;
    this.createShuffledDeck();
    this.givingStartCards();
  }

  private createShuffledDeck(): void {
    const shuffledCards = this.cards.sort(() => Math.random() < 0.5 ? -1 : 1);
    shuffledCards.sort(() => Math.random() < 0.5 ? -1 : 1);
    this.currentCardDeck = shuffledCards;
  }

  private pickRandomCardFromCurrentDeck(): Card {
    const randomCard = this.currentCardDeck[Math.round(Math.random() * this.currentCardDeck.length)];
    this.currentCardDeck.splice(this.currentCardDeck.indexOf(randomCard), 1);
    return randomCard;
  }

  private givingStartCards(): void {
    this.playerCards.push(this.pickRandomCardFromCurrentDeck(), this.pickRandomCardFromCurrentDeck());
    this.bankCards.push(this.pickRandomCardFromCurrentDeck());
    this.getPoints();
  }

  private getPoints(): void {
    let sumPlayer = 0;
    this.playerCards.forEach((card) => {
      sumPlayer += card.value;
    });
    this.playersValue = sumPlayer;

    let sumBank = 0;
    this.bankCards.forEach((card) => {
      sumBank += card.value;
    });
    this.bankValue = sumBank;
  }

  nextCardForPlayer(): void {
    this.playerCards.push(this.pickRandomCardFromCurrentDeck());
    this.getPoints();
  }

  private nextCardForBank(): void {
    this.bankCards.push(this.pickRandomCardFromCurrentDeck());
    this.getPoints();
  }

  playerFinishedTurn(): void {
    this.playersTurnFinished = true;
    this.getPoints();

    while (this.bankValue < 17) {
      this.nextCardForBank();
    }
    this.banksTurnFinished = true;
  }

}

interface Card {
  suit: string;
  value: number;
  type: string;
  imgUrl?: string;
  entity: string;
}
