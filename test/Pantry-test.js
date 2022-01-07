import Pantry from '../src/classes/Pantry'
import { expect } from 'chai';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';
import usersData from '../src/data/users';
import recipeData from '../src/data/recipes';

describe('Pantry', () => {
  let user, myPantry, recipe1, recipe2, recipe3, recipe4;
   
  beforeEach(()=> {
    user = new User(usersData[0]);
    myPantry = new Pantry(user);
    recipe1 = new Recipe(recipeData[0]);
    recipe2 = new Recipe(recipeData[1]);
    recipe3 = new Recipe(recipeData[2]);
    recipe4 = new Recipe(recipeData[3]);
  })

  it('should instantiate a new pantry', () => {
    expect(Pantry).to.be.a('function');
  })

  it('should be an instance of Pantry', () => {
    expect(myPantry).to.be.an.instanceof(Pantry);
  });
  
  it('should have the correct amount of pantry items', () => {
    expect(myPantry.pantry.length).to.equal(35);
  })

  it('should have enough ingredients to make a recipe', () => {
    console.log(recipe1.ingredients)
    console.log(myPantry.pantry)
    expect(myPantry.compareIngredients(recipe2)).to.equal(true);
  })
}); 


