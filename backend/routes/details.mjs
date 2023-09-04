import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("details");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single recipe by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("details");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help to create a new recipe.
router.post("/", async (req, res) => {
  let newDocument = {
    name: req.body.name,
    ingredients: req.body.ingredients,
    instruction: req.body.instruction,
  };
  let collection = await db.collection("details");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a recipe by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      name: req.body.name,
      ingredients: req.body.ingredients,
      instruction: req.body.instruction,
    }
  };

  let collection = await db.collection("details");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("details");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;