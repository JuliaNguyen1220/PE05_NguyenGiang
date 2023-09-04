import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './list.css';

const Recipe = (props) => {
  console.log("Instruction:", props.recipe.instruction);
  return (
  <tr>
    <td>{props.recipe.name}</td>
    <td>{props.recipe.ingredients}</td>
    <td>{props.recipe.instruction}</td>
    <td>
    <Link to={`/edit/${props.recipe._id}`} className="edit-btn-link">
        Edit
      </Link>{" "}
      |
      <button
        className="delete-btn-link"
        onClick={() => {
          props.deleteRecipe(props.recipe._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
  );
};

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  
  useEffect(() => {
    async function getRecipes() {
      try {
        const response = await fetch('https://bookish-bassoon-gj5rrvg79q636ww-5050.app.github.dev/details'); // Replace with your API URL

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        window.alert("An error occurred while fetching data.");
      }
    }

    getRecipes();
  }, []);

  // Delete a recipe
  async function deleteRecipe(id) {
    await fetch(`/api/recipes/${id}`, {
      method: "DELETE",
    });

    const updatedRecipes = recipes.filter((recipe) => recipe._id !== id);
    setRecipes(updatedRecipes);
  }

  // Map and render the recipe details.
  function renderRecipes() {
    return recipes.map((recipe) => (
      <Recipe
        key={recipe._id}
        recipe={recipe}
        deleteRecipe={() => deleteRecipe(recipe._id)}
      />
    ));
  }
  return (
    <div>
      <h3>Recipe List</h3>
      <table className="table table-striped" >
        <thead>
          <tr>
            <th>Name</th>
            <th>Ingredients</th>
            <th>Instruction</th>
          </tr>
        </thead>
        <tbody>{renderRecipes()}</tbody>
      </table>
    </div>
  );
}
