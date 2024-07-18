class Trait {
  name: string;
  description: string;
  effect: string;
  breakpoints: number[];

  constructor(
    name: string,
    description: string,
    effect: string,
    breakpoints: number[]
  ) {
    this.name = name;
    this.description = description;
    this.effect = effect;
    this.breakpoints = breakpoints;
  }
}
