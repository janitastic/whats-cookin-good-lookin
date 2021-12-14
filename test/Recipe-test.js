import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import recipeData from '../src/data/recipes';
import ingredientsData from '../src/data/ingredients';

describe('Recipe', () => {
  let myRecipe;

  beforeEach(() => {
    myRecipe = new Recipe(recipeData[0]);
  });

  it('should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe ', () => {
    expect(myRecipe).to.be.an.instanceof(Recipe);
  });

  it('should return the names of ingredients in a recipe', () => {
    const expected = ['wheat flour', 'bicarbonate of soda', 'eggs', 'sucrose', 'instant vanilla pudding', 'brown sugar', 'salt', 'fine sea salt', 'semi sweet chips', 'unsalted butter', 'vanilla'];
    const actual = myRecipe.logIngredients(ingredientsData);
    expect(actual).to.deep.equal(expected);
  });

  it('should return recipe instructions', () => {
    expect(myRecipe.logRecipeDirections()).to.deep.equal(myRecipe.instructions);
  });

  it('should calculate recipe cost', () => {
    expect(myRecipe.logRecipeCost(ingredientsData)).to.deep.equal('177.76');
  });
});
