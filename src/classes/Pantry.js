class Pantry  {
  constructor(currentUser) {
    this.user = currentUser;
    this.pantry = currentUser.pantry
    // this.hasIngredients = true;
  }

  compareIngredients(recipe) {
    return recipe.ingredients.every(ingredient =>
     this.pantry.find(pantryItem => ingredient.id === pantryItem.ingredient));
  }
}


export default Pantry
