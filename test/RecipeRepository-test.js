import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import recipeData from '../src/data/recipes';
import ingredientsData from '../src/data/ingredients';

describe('Recipe', () => {
  let recipeRepository;

  beforeEach(() => {
    recipeRepository = new RecipeRepository(recipeData);
  });

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('should be an instance of Recipe Repository', () => {
    expect(recipeRepository).to.be.an.instanceof(RecipeRepository);
  });

  it('should filter by tag', () => {
    expect(recipeRepository.filterByTag(["side dish", "antipasto"]).length).to.equal(30);
  });

  it('should filter by name', () => {
    expect(recipeRepository.filterByName("Chocolate").length).to.equal(3);
  });

  it('should filter by ingredients', () => {
    expect(recipeRepository.filterByIngredients("chocolate").length).to.equal(2);
  });
})
