import {Component, OnInit} from '@angular/core';
import {sleep} from './util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  game: GameState;

  ngOnInit(): void {
    this.resetGameState();
  }

  resetGameState(): void {
    this.game = {
    currentCardDeck: createShuffledDeck(),
    playerCards: [],
    bankCards: [],

    playersPoints : 0,
    bankPoints : 0,

    gameStarted : false,
    playersTurnFinished : false,
    banksTurnFinished : false,
    showRules : false,
    playerWon : false,
    bankWon : false,
    revealPlayerCard : false,
    revealBankCard : false,
    showPlayersHiddenCard : false,
    showBanksHiddenCard : false,
    };
  }

  toggleShowRules(): boolean {
    return this.game.showRules === true ? this.game.showRules = false : this.game.showRules = true;
  }

  async startGame(): Promise<void> {
    this.game.gameStarted = true;
    this.givingStartCards();
    await sleep(800);
    this.game.revealPlayerCard = true;
  }

  private pickRandomCardFromCurrentDeck(): Card {
    const randomCard = this.game.currentCardDeck[Math.floor(Math.random() * this.game.currentCardDeck.length)];
    this.game.currentCardDeck.splice(this.game.currentCardDeck.indexOf(randomCard), 1);
    return randomCard;
  }

  private givingStartCards(): void {
    this.game.playerCards.push(this.pickRandomCardFromCurrentDeck(), this.pickRandomCardFromCurrentDeck());
    this.game.bankCards.push(this.pickRandomCardFromCurrentDeck());
    this.getPoints();
  }

  private getPoints(): void {
    let sumPlayer = 0;
    this.game.playerCards.forEach((card) => {
      sumPlayer += card.value;
    });
    this.game.playersPoints = sumPlayer;

    let sumBank = 0;
    this.game.bankCards.forEach((card) => {
      sumBank += card.value;
    });
    this.game.bankPoints = sumBank;
  }

  private async nextCardForBank(): Promise<void> {
    this.game.showBanksHiddenCard = true;
    await sleep(500);
    this.game.showBanksHiddenCard = false;
    this.game.bankCards.push(this.pickRandomCardFromCurrentDeck());
    this.getPoints();
  }

  async nextCardForPlayer(): Promise<void> {
    this.game.showPlayersHiddenCard = true;
    await sleep(500);
    this.game.showPlayersHiddenCard = false;
    this.game.playerCards.push(this.pickRandomCardFromCurrentDeck());
    this.getPoints();
    if (this.game.playersPoints > 21) {
      await sleep(1200);
      await this.checkForWinner();
    }
  }

  async playerFinishedTurn(): Promise<void> {
    this.game.playersTurnFinished = true;
    await sleep(500);
    this.game.revealBankCard = true;
    this.getPoints();

    while (this.game.bankPoints < 17) {
      await sleep(1500 + Math.round(Math.random() * 1500));
      await this.nextCardForBank();
    }
    this.game.banksTurnFinished = true;
    await this.checkForWinner();
  }

  private async checkForWinner(): Promise<void> {
    this.getPoints();

    if (
      this.game.playersPoints === 21 && this.game.bankPoints !== 21 ||
      this.game.bankPoints > 21 && this.game.playersPoints < 21 ||
      (this.game.bankPoints < 21) && (this.game.playersPoints < 21) && (21 - this.game.bankPoints > 21 - this.game.playersPoints)
    ) {
      this.game.playerWon = true;
      await sleep(2000);

    } else if (
      this.game.bankPoints === 21 ||
      this.game.bankPoints < 21 && this.game.playersPoints > 21 ||
      (this.game.bankPoints < 21) && (this.game.playersPoints < 21) && (21 - this.game.bankPoints < 21 - this.game.playersPoints) ||
      this.game.playersPoints > 21 && this.game.bankPoints < 21
    ) {
      this.game.bankWon = true;

    } else {
      this.game.bankWon = true;
    }

    await this.endRound();
  }

  private async endRound(): Promise<void> {
    await sleep(2500);
    this.resetGameState();
  }
}

function createShuffledDeck(): Card[] {
  const shuffledCards = CARDS.sort(() => Math.random() < 0.5 ? -1 : 1);
  shuffledCards.sort(() => Math.random() < 0.5 ? -1 : 1);
  return shuffledCards;
}

export interface Card {
  suit: string;
  value: number;
  type: string;
  imgUrl?: string;
  entity: string;
}

interface GameState {
  currentCardDeck: Card[];
  playerCards: Card[];
  bankCards: Card[];

  playersPoints: number;
  bankPoints: number;

  gameStarted: boolean;
  playersTurnFinished: boolean;
  banksTurnFinished: boolean;
  showRules: boolean;
  playerWon: boolean;
  bankWon: boolean;
  revealPlayerCard: boolean;
  revealBankCard: boolean;
  showPlayersHiddenCard: boolean;
  showBanksHiddenCard: boolean;
}

const CARDS: Card[] = [
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



