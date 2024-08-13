export class Trait {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class ActiveTrait extends Trait {
  activeCount: number;
  breakpoints: number[];

  constructor(
    id: string,
    name: string,
    activeCount: number,
    breakpoints: number[]
  ) {
    super(id, name);
    this.activeCount = activeCount;
    this.breakpoints = breakpoints;
  }

  addChampion() {
    this.activeCount += 1;
  }

  removeChampion() {
    this.activeCount -= 1;
  }
}
