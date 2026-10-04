import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/User.js";
import { Event } from "./models/Event.js";
import { Issue } from "./models/Issue.js";
import { Resource } from "./models/Resource.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await Promise.all([
  User.deleteMany({}),
  Event.deleteMany({}),
  Issue.deleteMany({}),
  Resource.deleteMany({})
]);

await User.insertMany([
  {
    name: "Paridhi Gupta",
    email: "student@nexus.dev",
    role: "student",
    interests: ["AI/ML", "Hackathons", "DSA"],
    department: "Computer Science"
  },
  {
    name: "NEXUS Admin",
    email: "admin@nexus.dev",
    role: "admin",
    interests: [],
    department: "Administration"
  }
]);

await Event.insertMany([
  {
    title: "AI / ML Workshop",
    description: "Hands-on machine learning workshop.",
    category: "AI/ML",
    department: "CSE",
    date: new Date(Date.now() + 86400000),
    location: "Innovation Hub",
    capacity: 120,
    registered: 84,
    match: 92,
    recommended: true,
    point: { type: "Point", coordinates: [78.4867, 17.385] }
  },
  {
    title: "Hackathon Meetup",
    description: "Meet builders and form your hackathon team.",
    category: "Hackathon",
    department: "CSE",
    date: new Date(Date.now() + 172800000),
    location: "Engineering Block",
    capacity: 150,
    registered: 101,
    match: 87,
    recommended: true,
    point: { type: "Point", coordinates: [78.4872, 17.3855] }
  },
  {
    title: "DSA Mock Interview",
    description: "Practice technical interview questions.",
    category: "DSA",
    department: "CSE",
    date: new Date(Date.now() + 259200000),
    location: "Library",
    capacity: 80,
    registered: 62,
    match: 81,
    recommended: true,
    point: { type: "Point", coordinates: [78.4861, 17.3845] }
  }
]);

await Issue.insertMany([
  {
    title: "Projector malfunction",
    description: "Projector is not displaying content.",
    category: "Infrastructure",
    location: "Block A",
    priority: "high",
    status: "open",
    reportedBy: "student@nexus.dev"
  },
  {
    title: "Water dispenser maintenance",
    description: "Dispenser needs servicing.",
    category: "Facilities",
    location: "Library",
    priority: "medium",
    status: "progress",
    reportedBy: "student@nexus.dev"
  }
]);

await Resource.insertMany([
  {
    name: "Medical Centre",
    type: "health",
    description: "Campus medical assistance.",
    location: { type: "Point", coordinates: [78.4862, 17.3848] },
    locationText: "North Campus"
  },
  {
    name: "Library",
    type: "study",
    description: "Study and research resources.",
    location: { type: "Point", coordinates: [78.4861, 17.3845] },
    locationText: "Central Campus"
  },
  {
    name: "Help Desk",
    type: "support",
    description: "Student support and campus services.",
    location: { type: "Point", coordinates: [78.4870, 17.3851] },
    locationText: "Engineering Block"
  }
]);

console.log("NEXUS seed complete");
await mongoose.disconnect();
