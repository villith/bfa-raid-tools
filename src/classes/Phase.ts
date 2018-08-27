interface IPhase {
  id: number;
  label: string;
  estimatedStartTime: number;
  startTime?: number;
  duration?: number;
  bossPercentage?: number;
}

class Phase {
  public id: number;
  public label: string;
  public timer: number;

  constructor(id: number, label: string, timer: number,
  ) {
    this.id = id;
    this.label = label;
    this.timer = timer;
  }
}

export { Phase, IPhase };
