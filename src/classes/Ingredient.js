import ingredientsData from '../data/ingredients';

class Ingredient {
  constructor(ingredientsData) {
    this.id = ingredientsData.id;
    this.name = ingredientsData.name;
    this.cost = ingredientsData.cost;
  }
}

export default Ingredient;