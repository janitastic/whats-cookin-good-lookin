import { expect } from 'chai';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';
import usersData from '../src/data/users';

/* May not need below imports */
import recipeData from '../src/data/recipes';
// import ingredientsData from '../src/data/ingredients';
describe.only('User', () => {
  let currentUser, favoriteRecipe;

  beforeEach(() => {
    currentUser = new User(usersData[0]);
    favoriteRecipe = new Recipe(recipeData[0]);
  });

  it('should instantiate a new User', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of a User', () => {
    expect(currentUser).to.be.an.instanceof(User);
  });

  it('should have a name', () => {
    expect(currentUser.name).to.equal("Saige O'Kon");
  });

  it('should have an id', () => {
    expect(currentUser.id).to.equal(1);
  });

  it('should have a pantry', () => {
    expect(currentUser.pantry.length).to.equal(35);
  });

  it('should have a list of favorite recipes', () => {
    expect(currentUser.favorites).to.deep.equal([]);
  });

  it('should have a list of recipes to cook', () => {
    expect(currentUser.toCook).to.deep.equal([]);
  });

  it('should be able to add to a list of favorites', () => {
    currentUser.addToFavorites(recipeData[0]);
    expect(currentUser.favorites).to.deep.equal([recipeData[0]]);
  });

  it('should be able to remove from a list of favorites', () => {
    currentUser.removeFromFavorites(recipeData[0]);
    expect(currentUser.favorites).to.deep.equal([]);
  });
})
