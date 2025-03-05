import React from 'react'
import HFRecipe from './HFRecipe'
import IngredientsList from './IngredientsList'
import { getRecipeFromMistral } from './ai.js'

export default function MainPage() {
    const [ingredients, setIngredients] = React.useState([])
    //The useState hook initializes an empty array ([]) to store the list of ingredients.
    //ingredients holds the current list of ingredients
    //setIngredients is the function used to update this list

    const [recipe, setRecipe] = React.useState("")
    const recipeSection = React.useRef(null) //if using ref to set on a DOM node, its standard pratice to initialize it as null
    //the purpose of ref is so that we can call scrollIntoView on it, when the recipe loads so that the browser will automatically scroll down
    //check IngredientsList.jsx where its added

    React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({behavior: "smooth"})
        }
    }, [recipe]) //rerun whenever recipe changes

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }

    //This function extracts the ingredient name from the form’s formData.
    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient") //ingredient is the name of the input in the form
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]) //it is crucial for properly updating the ingredients state
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
                    ref={recipeSection}
                    ingredients={ingredients} //ingredients and toggleRecipeShown as props so they can be used in IngredientsList.jsx
                    getRecipe={getRecipe} />}
            {recipe && <HFRecipe recipe={recipe}/>} 
        </main>
        //{recipe && <HFRecipe />} means if recipe is true or in other words its not an empty string, display HFRecipe
    )
}