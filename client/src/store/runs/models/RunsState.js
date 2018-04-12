export class RunsState {
  constructor() {
    this.runsByUserId = {};
    this.fetchInProgress = false;
    this.fetchError = false;
  }
}

export default RunsState;
