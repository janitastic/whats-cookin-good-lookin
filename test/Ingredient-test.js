import { expect } from 'chai';
import Ingredient from '../src/classes/Ingredient';
import ingredientsData from '../src/data/ingredients';


describe('Ingredient', () => {
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
  it('should store an id number', () => {
    expect(ingredient.id).to.equal(200801);
  })
  it('should store an ingredient name', () => {
    expect(ingredient.name).to.equal("wheat flour");
  })
  it('store an ingredient cost', () => {
    expect(ingredient.cost).to.equal(142);
  })
});