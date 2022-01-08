import Pantry from '../src/classes/Pantry'
import { expect } from 'chai';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';
import usersData from '../src/data/users';
import recipeData from '../src/data/recipes';

describe.only('Pantry', () => {
  let user, myPantry, recipe1, recipe2, recipe3, recipe4, fakeRecipe;

  beforeEach(()=> {
    user = new User(usersData[0]);
    myPantry = new Pantry(user);
    recipe1 = new Recipe(recipeData[0]);
    recipe2 = new Recipe(recipeData[1]);
    recipe3 = new Recipe(recipeData[2]);
    recipe4 = new Recipe(recipeData[3]);
    fakeRecipe = new Recipe({
      "id": 97979797,
      "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      "ingredients": [
        { id: 20081, quantity: { amount: 1.5, unit: 'c' } },
        { id: 18372, quantity: { amount: 0.5, unit: 'tsp' } },
        { id: 1123, quantity: { amount: 1, unit: 'large' } },
        { id: 19335, quantity: { amount: 0.5, unit: 'c' } },
        { id: 19206, quantity: { amount: 3, unit: 'Tbsp' } },
        // { id: 19334, quantity: { amount: 0.5, unit: 'c' } },//not in pantry
      ],
      "instructions": [
        {
          "instruction": "Pour into a bowl",
          "number": 1
        },
        {
          "instruction": "Stick into oven",
          "number": 2
        },
        {
          "instruction": "Serve hot.",
          "number": 3
        }
      ],
      "name": "Fake recipe",
      "tags": [
        "fake tag"
      ]
    })

  })

  it('should instantiate a new pantry', () => {
    expect(Pantry).to.be.a('function');
  })

  it('should be an instance of Pantry', () => {
    expect(myPantry).to.be.an.instanceof(Pantry);
  });

  it('should have the correct amount of pantry items', () => {
    expect(myPantry.pantry.length).to.equal(35);
  })

  it('should check the pantry for every ingredient needed in the recipe', () => {
    expect(myPantry.checkPantry(fakeRecipe)).to.equal(true);
    expect(myPantry.checkPantry(recipe3)).to.equal(false);
  })

  it('should be able to find some recipe ingredients in the pantry' , () => {
    expect()
  })

  // it('blah blah bloooo' , () => {
  //   expect(myPantry.checkIngredientAmounts(fakeRecipe)).to.equal(true);
  // })

  // it('blah blah blah' , () => {
  //   expect(myPantry.findMissingIngredients(recipe1)).to.equal(true);
  // })
});
