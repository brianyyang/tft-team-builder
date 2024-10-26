import { Champion } from './gameplay/champion';

export class Team {
  id?: string;
  name: string;
  champions: Champion[];

  constructor(name: string, champions: Champion[], id?: string) {
    this.name = name;
    this.champions = champions;
    this.id = id;
  }
}
