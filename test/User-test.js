import { expect } from 'chai';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';
import usersData from '../src/data/users';

/* May not need below imports */
import recipeData from '../src/data/recipes';
// import ingredientsData from '../src/data/ingredients';
describe.only('User', () => {
  let currentUser, recipe1, recipe2, recipe3;

  beforeEach(() => {
    currentUser = new User(usersData[0]);
    recipe1 = new Recipe(recipeData[0]);
    recipe2 = new Recipe(recipeData[1]);
    recipe3 = new Recipe(recipeData[2]);
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

  it('should be able to add and remove to a list of favorites', () => {
    currentUser.addToFavorites(recipe1);
    currentUser.addToFavorites(recipe2);
    currentUser.addToFavorites(recipe3);
    currentUser.removeFromFavorites(currentUser.favorites, recipe1);
    expect(currentUser.favorites.length).to.equal(2);
  });

  it('should be able to add to a list of recipes to cook', () => {
    currentUser.addToCook(recipe1);
    currentUser.addToCook(recipe2);
    currentUser.addToCook(recipe3);
    expect(currentUser.toCook.length).to.equal(3);
  });
})
