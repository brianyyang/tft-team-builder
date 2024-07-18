class Ability {
  name: string;
  description: string;
  damage: number;
  manaCost: number;

  constructor(
    name: string,
    description: string,
    damage: number,
    manaCost: number
  ) {
    this.name = name;
    this.description = description;
    this.damage = damage;
    this.manaCost = manaCost;
  }
}
