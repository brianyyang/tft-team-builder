export class Trait {
  id: string;
  name: string;
  iconPath: string;

  constructor(id: string, name: string, iconPath: string) {
    this.id = id;
    this.name = name;
    this.iconPath = iconPath;
  }
}

export class ActiveTrait extends Trait {
  activeCount: number;
  breakpoints: TraitBreakpoint[];

  constructor(
    id: string,
    name: string,
    iconPath: string,
    activeCount: number,
    breakpoints: TraitBreakpoint[]
  ) {
    super(id, name, iconPath);
    this.activeCount = activeCount;
    this.breakpoints = breakpoints;
  }

  addChampion() {
    this.activeCount += 1;
  }

  removeChampion() {
    this.activeCount -= 1;
  }

  /* 
    returns an object containing:
    - the next unachieved breakpoint for this trait
    - the current tier activated for this trait
  */
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

  // a comparator for two active traits that returns whether
  // this trait has higher tier activated than the given trait
  compareActiveTrait(otherTrait: ActiveTrait) {
    const thisBreakpointState = this.currentBreakpointState();
    const otherBreakpointState = otherTrait.currentBreakpointState();
    const thisTierValue = breakpointTierMap(thisBreakpointState.currentColor);
    const otherTierValue = breakpointTierMap(otherBreakpointState.currentColor);
    if (thisTierValue > otherTierValue) {
      return 1;
    } else if (thisTierValue === otherTierValue) {
      // if they are the same tier trait, the one with more units active is greater
      return this.activeCount - otherTrait.activeCount;
    } else {
      return -1;
    }
  }
}

// used to compare the different tiers of traits
const breakpointTierMap = (tier: string) => {
  switch (tier) {
    case 'unactivated':
      return 0;
    case 'bronze':
      return 1;
    case 'silver':
      return 2;
    case 'gold':
      return 3;
    case 'chromatic':
      return 4;
    case 'unique':
      return 5;
    default:
      return -1;
  }
};

export type TraitBreakpoint = {
  championsRequired: number;
  color: string;
};
