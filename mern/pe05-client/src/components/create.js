import React, { useState } from "react";
import { useNavigate } from "react-router";


export default function Create() {
 const [form, setForm] = useState({
   name: "",
   ingredients: "",
   instruction: "",
 });
 const navigate = useNavigate();
 
 // update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // handle the submission.
 async function onSubmit(e) {
  e.preventDefault();

  const newRecipe = { ...form };

  try {
    const response = await fetch("https://bookish-bassoon-gj5rrvg79q636ww-5050.app.github.dev/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    setForm({ name: "", ingredients: "", instruction: "" });
    navigate("/details");
  } catch (error) {
    console.error("Error creating recipe:", error);
    window.alert("An error occurred while creating the recipe.");
  }
}
 return (
   <div>
     <h3>Create A New Recipe</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name:  </label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
           style={{ width: "50%" }}
         />
       </div>
       <div className="form-group">
         <label htmlFor="ingredients">Ingredients: </label>
         <input
           type="text"
           className="form-control"
           id="ingredients"
           value={form.ingredients}
           onChange={(e) => updateForm({ ingredients: e.target.value })}
           style={{ width: "50%" }}
         />
       </div>
       <div className="form-group">
         <label htmlFor="instruction">Instruction: </label>
         <input
           type="text"
           className="form-control"
           id="instruction"
           value={form.instruction}
           onChange={(e) => updateForm({ instruction: e.target.value })}
           style={{ width: "50%" }}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create recipe"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}