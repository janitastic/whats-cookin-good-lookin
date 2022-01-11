import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import recipeData from '../src/data/recipes';
import ingredientsData from '../src/data/ingredients';

describe('RecipeRepo', () => {
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

  it('should filter by a tag', () => {
    expect(recipeRepository.filterByTag(['side dish']).length).to.equal(22);
  });

  it('should filter by 2 tags', () => {
    expect(recipeRepository.filterByTag(['side dish', 'antipasto']).length).to.equal(30);
  });

  it('should filter by name', () => {
    expect(recipeRepository.filterByName('Chocolate').length).to.equal(3);
  });

  it('should filter by ingredients',() => {
    expect(recipeRepository.filterByIngredients('onion powder', ingredientsData).length).to.equal(3);
  });
});
