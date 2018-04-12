export class User {
  constructor({ id, profile, bios }) {
    this.id = id;
    this.profile = {
      givenName: profile.givenName,
      familyName: profile.familyName,
      dob: profile.dob,
      avatarUrl: profile.avatarUrl,
    };
    this.bios = {
      weight: bios.weight,
    };
  }
}
