class Champion {
  id: string;
  name: string;
  tier: number;
  traits: Trait[];
  iconPath: string;
  splashPath: string;

  constructor(
    id: string,
    name: string,
    tier: number,
    traits: Trait[],
    iconPath: string,
    splashPath: string
  ) {
    this.id = id;
    this.name = name;
    this.tier = tier;
    this.traits = traits;
    this.iconPath = iconPath;
    this.splashPath = splashPath;
  }
}
