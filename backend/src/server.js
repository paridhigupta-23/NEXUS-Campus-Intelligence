import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Event } from "./models/Event.js";
import { Issue } from "./models/Issue.js";
import { Resource } from "./models/Resource.js";
import { User } from "./models/User.js";

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/api/health", (_, res) => res.json({ ok: true, service: "NEXUS API" }));

app.get("/api/dashboard", async (_, res) => {
  try {
    const [students, events, issues, openIssues, eventStats] = await Promise.all([
      User.countDocuments({ role: "student" }),
      Event.countDocuments(),
      Issue.countDocuments(),
      Issue.countDocuments({ status: { $ne: "resolved" } }),
      Event.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ])
    ]);

    res.json({
      students,
      events,
      issues,
      openIssues,
      engagement: 94,
      eventStats
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/events", async (_, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }).limit(20);
    res.json(events);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/issues", async (_, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 }).limit(20);
    res.json(issues);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/issues", async (req, res) => {
  try {
    const issue = await Issue.create(req.body);
    res.status(201).json(issue);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/api/nearby", async (req, res) => {
  try {
    const lng = Number(req.query.lng);
    const lat = Number(req.query.lat);
    const radius = Number(req.query.radius || 1000);

    if (!Number.isFinite(lng) || !Number.isFinite(lat)) {
      return res.status(400).json({ error: "lng and lat are required" });
    }

    const resources = await Resource.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [lng, lat] },
          $maxDistance: radius
        }
      }
    }).limit(20);

    res.json(resources);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/recommendations", async (_, res) => {
  try {
    const events = await Event.find({ recommended: true }).sort({ match: -1 }).limit(5);
    res.json(events);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

async function start() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`NEXUS API running on http://localhost:${PORT}`));
}

start().catch(err => {
  console.error(err);
  process.exit(1);
});
