class Champion {
  id: string;
  name: string;
  cost: number;
  traits: Trait[];

  constructor(id: string, name: string, cost: number, traits: Trait[]) {
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.traits = traits;
  }
}
