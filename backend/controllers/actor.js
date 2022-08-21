const Actor = require("../models/actor");
const cloudinary = require("cloudinary");
const { isValidObjectId } = require("mongoose");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

// Create ACTOR Function
const createActor = async (req, res) => {
  try {
    const { name, about, gender } = req.body;
    const { file } = req;

    const newActor = new Actor({ name, about, gender });

    if (file) {
      const { secure_url, public_id } = await cloudinary.v2.uploader.upload(
        file?.path,
        {
          gravity: "face",
          height: 500,
          width: 500,
          crop: "thumb",
        }
      );
      newActor.avatar = { url: secure_url, public_id };
    }

    await newActor.save();

    res.status(201).json({
      id: newActor._id,
      name,
      about,
      gender,
      avatar: newActor.avatar?.url,
    });
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
    const { secure_url, public_id } = await cloudinary.v2.uploader.upload(
      file?.path,
      {
        gravity: "face",
        height: 500,
        width: 500,
        crop: "thumb",
      }
    );
    actor.avatar = { url: secure_url, public_id };
  }

  actor.name = name;
  actor.about = about;
  actor.gender = gender;

  await actor.save();

  res.status(201).json({
    id: actor._id,
    name,
    about,
    gender,
    avatar: actor.avatar?.url,
  });
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

// SEARCH ACTOR FUNCTION
const searchActor = async (req, res) => {
  const { query } = req;

  const result = await Actor.find({ $text: { $search: `"${query.name}"` } });
  res.json(result);
};

// GET LATEST 12 ACTORS FUNCTION
const getLatestActor = async (req, res) => {
  const result = await Actor.find({}).sort({ createdAt: "-1" }).limit(12);
  res.json(result);
};

// GET SINGLE ACTOR
const getSingleActor = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id))
    return res.json({ error: "No Actor Found With This Id!" });

  const actor = await Actor.findById(id);
  if (!actor)
    return res.status(404).json({ error: "Invalid Request, actor not found " });
  res.json(actor);
};

module.exports = {
  createActor,
  updateActor,
  deleteActor,
  searchActor,
  getLatestActor,
  getSingleActor,
};
