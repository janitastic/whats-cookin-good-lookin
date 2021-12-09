import { expect } from 'chai';
import Ingredient from '../src/classes/Ingredient';
import ingredientsData from '../src/data/ingredients';


describe.only('Ingredient', () => {
  let ingredient;

  beforeEach(() => {
    ingredient = new Ingredient(200801, "wheat flour", 142);
  });

  it('Should be a function', () => {
    expect(Ingredient).to.be.a('function');
  });

  it('should be an instance of Ingredient ', () => {
    expect(ingredient).to.be.an.instanceof(Ingredient);
  })
});