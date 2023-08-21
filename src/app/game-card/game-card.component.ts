import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

export interface CardData {
  imageId: string;
  state: "default" | "flipped" | "matched";
}

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none'
      })),
      state('flipped', style({
        transform: 'rotateY(180deg)'
      })),
      transition('default => flipped', [
        animate('400ms')
      ]),
      transition('flipped => default', [
        animate('200ms')
      ])
    ])
  ]
})

export class GameCardComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  cards: CardData[] = [
    { imageId: "pDGNBK9A0sk", state: "default" },
    { imageId: "anotherId", state: "default" },
    { imageId: "anotherId", state: "default" },
    { imageId: "anotherId", state: "default" },
    { imageId: "anotherId", state: "default"}
    // ... Repeat for other cards
  ];

  cardClicked(card: CardData) {
    if (card.state === "default") {
      card.state = "flipped";
    } else if (card.state === "flipped") {
      card.state = "default";
    }
  }
}
