import React from 'react'
import Recipe from './Recipe'
import IngredientsList from './IngredientsList'
import getRecipeFromMistral from './ai'

export default function MainPage() {
    const [ingredients, setIngredients] = React.useState(["potatoes","pasta","main spices","quinoa"])
    //The useState hook initializes an empty array ([]) to store the list of ingredients.
    //ingredients holds the current list of ingredients
    //setIngredients is the function used to update this list

    const [recipeShown, setRecipeShown] = React.useState(false)
    
    function toggleRecipeShown() {
        setRecipeShown(prevShown => !prevShown)
    }

    //This function extracts the ingredient name from the form’s formData.
    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient") //ingredient is the name of the input in the form
        setIngredients(prevIngredient => [...prevIngredient, newIngredient]) //it is crucial for properly updating the ingredients state
    }
    //setIngredients(prevIngredient => [...prevIngredient, newIngredient]) updates the state by adding the new ingredient to the existing list.

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input 
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            {ingredients.length > 0 && 
                <IngredientsList 
                    ingredients={ingredients} //ingredients and toggleRecipeShown as props so they can be used in IngredientsList.jsx
                    toggleRecipeShown={toggleRecipeShown} />} 
            {recipeShown && <Recipe />}


        </main>

    )
}