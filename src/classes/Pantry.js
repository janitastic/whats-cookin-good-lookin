class Pantry  {
  constructor(usersData) {
    this.userName = usersData.name;
    this.pantry = usersData.pantry
  }

  findIngredients(recipe) {
    // for each ingredient in recipe
    // find ingredient in this.ingredientsInPantry
    // if it exists and the quantity is enough - good
    // if it exists and the quantity is too low - show error
    // if it doesn't exist - show error
  }
}



export default Pantry