class Champion {
  name: string;
  cost: number;
  health: number;
  mana: number;
  armor: number;
  magicResist: number;
  attackDamage: number;
  attackSpeed: number;
  abilities: Ability[];
  traits: string[];

  constructor(
    name: string,
    cost: number,
    health: number,
    mana: number,
    armor: number,
    magicResist: number,
    attackDamage: number,
    attackSpeed: number,
    abilities: Ability[],
    traits: string[]
  ) {
    this.name = name;
    this.cost = cost;
    this.health = health;
    this.mana = mana;
    this.armor = armor;
    this.magicResist = magicResist;
    this.attackDamage = attackDamage;
    this.attackSpeed = attackSpeed;
    this.abilities = abilities;
    this.traits = traits;
  }
}
