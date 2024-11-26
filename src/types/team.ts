import { Champion } from './gameplay/champion';

export class Team {
  id?: string;
  name: string;
  champions: Champion[];
  setNumber: number;

  constructor(
    name: string,
    champions: Champion[],
    setNumber: number,
    id?: string
  ) {
    this.name = name;
    this.champions = champions;
    this.setNumber = setNumber;
    this.id = id;
  }
}
