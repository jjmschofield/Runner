export class Run {
  constructor({ id, userId, duration, distance, kCalMin, date }) {
    this.id = id;
    this.userId = userId;
    this.duration = duration;
    this.distance = distance;
    this.kCalMin = kCalMin;
    this.date = date;
  }
}
