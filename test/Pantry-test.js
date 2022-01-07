import Pantry from '../src/classes/Pantry'
import { expect } from 'chai';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';
import usersData from '../src/data/users';

describe('Pantry', () => {
  let user;
  let myPantry;
   
  beforeEach(()=> {
    user = new User(usersData[0]);
    myPantry = new Pantry(user);
  })

  it('should instantiate a new pantry', () => {
    expect(Pantry).to.be.a('function');
  })

  it('should be an instance of Pantry', () => {
    expect(myPantry).to.be.an.instanceof(Pantry);
  });
  

}); 


