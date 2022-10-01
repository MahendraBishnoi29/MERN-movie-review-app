const Actor = require("../models/actor");
const cloudinary = require("../utils/cloud");
const { isValidObjectId } = require("mongoose");
const { uploadImageToCloud, formatActor } = require("../utils/helper");

// Create ACTOR Function
const createActor = async (req, res) => {
  try {
    const { name, about, gender } = req.body;
    const { file } = req;

    const newActor = new Actor({ name, about, gender });

    if (file) {
      const { url, public_id } = await uploadImageToCloud(file?.path);
      newActor.avatar = { url, public_id };
    }

    await newActor.save();

    res.status(201).json({ actor: formatActor(newActor) });
  } catch (error) {
    console.log(error.message);
    res.json({ error: "Failed to create Actor" });
  }
};

// UPDATE ACTOR FUNCTION
const updateActor = async (req, res) => {
  const { name, about, gender } = req.body;
  const { file } = req;
  const { actorId } = req.params;

  if (!isValidObjectId(actorId))
    return res.json({ message: "Invalid Request!" });

  const actor = await Actor.findById(actorId);

  if (!actor) return res.json({ error: "No Actor Found With This ID" });

  const public_id = actor.avatar?.public_id;

  // Remove Old Image If There was Any
  if (public_id && file) {
    const { result } = await cloudinary.v2.uploader.destroy(public_id);
    if (result !== "ok") {
      res.json({ error: "Could Not Remove Image From Cloud!" });
    }
  }

  if (file) {
    const { url, public_id } = await uploadImageToCloud(file?.path);
    actor.avatar = { url, public_id };
  }

  actor.name = name;
  actor.about = about;
  actor.gender = gender;

  await actor.save();

  res.status(201).json({ actor: formatActor(actor) });
};

// DELETE ACTOR
const deleteActor = async (req, res) => {
  const { actorId } = req.params;

  if (!isValidObjectId(actorId))
    return res.json({ message: "Invalid Request!" });

  const actor = await Actor.findById(actorId);

  if (!actor) return res.json({ error: "No Actor Found With This ID" });

  const public_id = actor.avatar?.public_id;

  // Remove Old Image If There was Any
  if (public_id) {
    const { result } = await cloudinary.v2.uploader.destroy(public_id);
    if (result !== "ok") {
      res.json({ error: "Could Not Remove Image From Cloud!" });
    }
  }

  await Actor.findByIdAndDelete(actorId);
  res.json({ message: "Actor Deleted " });
};

// SEARCH ACTORS FUNCTION
const searchActor = async (req, res) => {
  const { name } = req.query;

  // const result = await Actor.find({ $text: { $search: `"${query.name}"` } });
  if (!name.trim()) return res.json({ error: "Plase Enter a Valid Keyword!" });

  const result = await Actor.find({
    name: { $regex: name, $options: "i" },
  });
  const actors = result.map((actor) => formatActor(actor));
  res.json({ results: actors });
};

// GET LATEST 12 ACTORS FUNCTION
const getLatestActor = async (req, res) => {
  const result = await Actor.find({}).sort({ createdAt: "-1" }).limit(12);
  const latestActor = result.map((actor) => formatActor(actor));
  res.json(latestActor);
};

// GET SINGLE ACTOR
const getSingleActor = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id))
    return res.json({ error: "No Actor Found With This Id!" });

  const actor = await Actor.findById(id);
  if (!actor)
    return res.status(404).json({ error: "Invalid Request, actor not found " });

  res.json({ actor: formatActor(actor) });
};

// Get Actors
const getActors = async (req, res) => {
  const { pageNo = 0, limit = 10 } = req.query;

  const actors = await Actor.find({})
    .sort({ createdAt: -1 })
    .skip(parseInt(pageNo) * parseInt(limit))
    .limit(parseInt(limit));

  const profiles = actors.map((actor) => formatActor(actor));

  res.json({
    profiles,
  });
};

module.exports = {
  createActor,
  updateActor,
  deleteActor,
  searchActor,
  getLatestActor,
  getSingleActor,
  getActors,
};
