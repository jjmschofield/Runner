export class UsersState {
  constructor() {
    this.usersById = {};
    this.fetchInProgress = false;
    this.fetchError = false;
  }
}

export default UsersState;
