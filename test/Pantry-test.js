import Pantry from '../src/classes/Pantry'
import { expect } from 'chai';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';
import usersData from '../src/data/users';
import recipeData from '../src/data/recipes';

describe.only('Pantry', () => {
  let user, myPantry, recipe1, recipe2, recipe3, recipe4, recipe5;

  beforeEach(()=> {
    user = new User(usersData[0]);
    myPantry = new Pantry(user);
    recipe1 = new Recipe(recipeData[0]);
    recipe2 = new Recipe(recipeData[1]);
    recipe3 = new Recipe(recipeData[2]);
    recipe4 = new Recipe(recipeData[3]);
    recipe5 = new Recipe({
      "id": 97979797,
      "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      "ingredients": [
        {
          "id": 19335,
          "quantity": {
            "amount": 0.5,
            "unit": "c"
          }
        },
        {
          "id": 1145,
          "quantity": {
            "amount": 0.5,
            "unit": "c"
          }
        },
        {
          "id": 2050,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        }
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

  it('should return a false value if there are not correct ingredients', () => {
    expect(myPantry.compareIngredients(recipeData[2])).to.equal(false);
  })

  it('should return a true value when there are correct ingredients' , () => {
    expect(myPantry.compareIngredients(recipe5)).to.equal(true);
  })
});
