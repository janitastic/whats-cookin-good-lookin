import usersData from '../data/users';

class User {
  constructor(usersData) {
    this.name = usersData.name;
    this.id = usersData.id;
    this.pantry = usersData.pantry;
    this.favorites = [];
    this.toCook = [];
  }
}







export default User;
