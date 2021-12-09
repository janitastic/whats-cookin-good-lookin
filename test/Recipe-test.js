import { expect } from 'chai';
import Recipe from '../src/classes/RecipeRepository';
import recipeData from '../src/data/recipes';
import ingredientsData from '../src/data/ingredients';

describe.only('Recipe', () => {
  let recipe;

  beforeEach(() => {
    recipe = new Recipe(recipeData);
  });

  it('Should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe ', () => {
    expect(recipe).to.be.an.instanceof(Recipe);
  })

  it('should find recipe id', () => {
    expect(recipe.ingredients).to.equal()
  })
});