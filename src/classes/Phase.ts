class Phase {
  public id: number;
  public label: string;
  public estimatedStartTime: number;
  public startTime?: number;
  public duration?: number;
  public bossPercentage?: number;

  constructor(id: number, label: string, estimatedStartTime: number,
    startTime?: number, duration?: number, bossPercentage?: number
  ) {
    this.id = id;
    this.label = label;
    this.estimatedStartTime = estimatedStartTime;  
    this.startTime = startTime;
    this.duration = duration;
    this.bossPercentage = bossPercentage;
  }
}

export { Phase };
