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
  breakpoints: TraitBreakpoint[];

  constructor(
    id: string,
    name: string,
    activeCount: number,
    breakpoints: TraitBreakpoint[]
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

  currentBreakpointState() {
    for (let i = 0; i < this.breakpoints.length; i++) {
      const breakpoint = this.breakpoints[i];
      if (this.activeCount < breakpoint.championsRequired) {
        return {
          nextBreakpoint: this.breakpoints[i].championsRequired,
          currentColor: i === 0 ? 'unactivated' : this.breakpoints[i - 1].color,
        };
      }
    }
    return {
      nextBreakpoint: -1,
      currentColor: this.breakpoints[this.breakpoints.length - 1].color,
    };
  }
}

export type TraitBreakpoint = {
  championsRequired: number;
  color: string;
};
