import React from "react";
import { Route, Routes } from "react-router-dom"; // Removed unused Outlet import
import Navbar from "./components/navbar";
import RecipeList from "./components/recipeList";
import Edit from "./components/edit";
import Create from "./components/create";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/details" element={<RecipeList />} />
      </Routes>

    </div>
  );
};

export default App;
