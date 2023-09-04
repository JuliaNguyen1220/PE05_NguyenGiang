import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Edit() {
  const [form, setForm] = useState({
    name: "",
    ingredients: "",
    instruction: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (!params.id) {
        return;
      }

      const id = params.id.toString();
      const response = await fetch(
        `https://bookish-bassoon-gj5rrvg79q636ww-5050.app.github.dev/details/${id}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record); 
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedRecipe = {
      name: form.name,
      ingredients: form.ingredients,
      instruction: form.instruction,
    };

    await fetch(
      `https://bookish-bassoon-gj5rrvg79q636ww-5050.app.github.dev/details/${params.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(editedRecipe),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    navigate("/");
  }

  return (
    <div>
      <h3>Update Recipe</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name: </label>
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
        <br />
        <div className="form-group">
          <input
            type="submit"
            value="Update Recipe"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
