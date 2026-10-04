import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  LayoutDashboard, CalendarDays, MapPin, AlertTriangle, BarChart3,
  Sparkles, Search, Bell, ArrowUpRight, Clock3, Users, Activity
} from "lucide-react";
import "./styles.css";

const API = "http://localhost:5000/api";

function App() {
  const [tab, setTab] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [events, setEvents] = useState([]);
  const [issues, setIssues] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
  setStats({
    students: 12482,
    events: 3821,
    openIssues: 14,
    engagement: 94
  });

  const demoEvents = [
    {
      _id: "1",
      title: "AI / ML Workshop",
      description: "Hands-on machine learning workshop.",
      category: "AI/ML",
      location: "Innovation Hub",
      registered: 84,
      capacity: 120,
      match: 92,
      date: new Date(Date.now() + 86400000)
    },
    {
      _id: "2",
      title: "Hackathon Meetup",
      description: "Meet builders and form your hackathon team.",
      category: "Hackathon",
      location: "Engineering Block",
      registered: 101,
      capacity: 150,
      match: 87,
      date: new Date(Date.now() + 172800000)
    },
    {
      _id: "3",
      title: "DSA Mock Interview",
      description: "Practice technical interview questions.",
      category: "DSA",
      location: "Library",
      registered: 62,
      capacity: 80,
      match: 81,
      date: new Date(Date.now() + 259200000)
    }
  ];

  setEvents(demoEvents);
  setRecommendations(demoEvents);

  setIssues([
    {
      _id: "1",
      title: "Projector malfunction",
      category: "Infrastructure",
      location: "Block A",
      priority: "high",
      status: "open"
    },
    {
      _id: "2",
      title: "Water dispenser maintenance",
      category: "Facilities",
      location: "Library",
      priority: "medium",
      status: "progress"
    }
  ]);
}, []);

  const nav = [
    ["dashboard", LayoutDashboard, "Dashboard"],
    ["events", CalendarDays, "Events"],
    ["nearby", MapPin, "Campus Map"],
    ["issues", AlertTriangle, "Issues"],
    ["analytics", BarChart3, "Analytics"]
  ];

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand"><div className="logo">N</div><div><b>NEXUS</b><span>Campus Intelligence</span></div></div>
        <nav>
          {nav.map(([id, Icon, label]) => (
            <button className={tab === id ? "nav active" : "nav"} onClick={() => setTab(id)} key={id}>
              <Icon size={18}/>{label}
            </button>
          ))}
        </nav>
        <div className="side-bottom">
          <div className="status-dot"><span/> Systems operational</div>
          <div className="profile"><div className="avatar">PG</div><div><b>Paridhi Gupta</b><small>Computer Science</small></div></div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="search"><Search size={18}/><input placeholder="Search campus, events, services..."/></div>
          <div className="top-actions"><button className="icon-btn"><Bell size={19}/><i/></button><div className="date">Saturday, 04 Oct 2026</div></div>
        </header>

        <div className="content">
          {tab === "dashboard" && <Dashboard stats={stats} recommendations={recommendations} events={events} issues={issues}/>}
          {tab === "events" && <Events events={events}/>}
          {tab === "nearby" && <Nearby/>}
          {tab === "issues" && <Issues issues={issues}/>}
          {tab === "analytics" && <Analytics stats={stats}/>}
        </div>
      </main>
    </div>
  );
}

function Dashboard({stats, recommendations, events, issues}) {
  return <>
    <section className="hero">
      <div><p className="eyebrow">SATURDAY · CAMPUS OVERVIEW</p><h1>Good afternoon, Paridhi.</h1><p className="muted">Everything happening across your campus, in one intelligent view.</p></div>
      <button className="primary"><Sparkles size={16}/> Explore NEXUS</button>
    </section>

    <div className="stats">
      <Stat label="Students" value={stats?.students ?? "—"} change="+8.2%" icon={Users}/>
      <Stat label="Events" value={stats?.events ?? "—"} change="+12.4%" icon={CalendarDays}/>
      <Stat label="Open Issues" value={stats?.openIssues ?? "—"} change="-18.6%" icon={AlertTriangle}/>
      <Stat label="Engagement" value={stats?.engagement ? `${stats.engagement}%` : "—"} change="+4.1%" icon={Activity}/>
    </div>

    <div className="grid two">
      <section className="panel">
        <div className="panel-head"><div><p className="eyebrow">PERSONALIZED</p><h2>Recommended for you</h2></div><button className="text-btn">View all <ArrowUpRight size={15}/></button></div>
        <div className="recommendations">
          {(recommendations.length ? recommendations : events.slice(0,3)).map(e => <EventCard event={e} key={e._id || e.title}/>)}
        </div>
      </section>
      <section className="panel">
        <div className="panel-head"><div><p className="eyebrow">LIVE CAMPUS</p><h2>Recent activity</h2></div><span className="live"><i/> Live</span></div>
        {issues.slice(0,4).map(i => <div className="activity" key={i._id}><div className={`priority ${i.priority}`}/><div><b>{i.title}</b><small>{i.location} · {i.status}</small></div><Clock3 size={15}/></div>)}
      </section>
    </div>

    <section className="map-card">
      <div><p className="eyebrow">CAMPUS INTELLIGENCE</p><h2>Everything around you</h2><p className="muted">Discover events, services and active campus issues using MongoDB geospatial data.</p></div>
      <div className="fake-map"><div className="map-grid"/><div className="map-pin p1">AI</div><div className="map-pin p2">+</div><div className="map-pin p3">!</div><div className="map-label">Innovation Hub</div></div>
    </section>
  </>;
}

function Stat({label,value,change,icon:Icon}) {
  return <div className="stat"><div className="stat-icon"><Icon size={18}/></div><span>{label}</span><strong>{value}</strong><small className={change.startsWith("-") ? "down" : ""}>{change} vs last month</small></div>;
}

function EventCard({event}) {
  return <div className="event-card"><div className="event-icon"><Sparkles size={17}/></div><div className="event-info"><b>{event.title}</b><span>{event.category} · {event.location}</span><small>{event.match}% match</small></div><button className="round"><ArrowUpRight size={16}/></button></div>;
}

function Events({events}) {
  return <><PageTitle eyebrow="CAMPUS CALENDAR" title="Events & experiences" text="Find what's happening across campus."/><div className="event-list">{events.map(e => <div className="large-event" key={e._id}><div className="event-date"><b>{new Date(e.date).toLocaleDateString("en",{day:"2-digit"})}</b><span>{new Date(e.date).toLocaleDateString("en",{month:"short"}).toUpperCase()}</span></div><div><p className="eyebrow">{e.category}</p><h2>{e.title}</h2><p className="muted">{e.description}</p><span className="meta"><MapPin size={14}/> {e.location} &nbsp; · &nbsp; {e.registered}/{e.capacity} registered</span></div><button className="primary">Register</button></div>)}</div></>;
}

function Nearby() {
  return <><PageTitle eyebrow="GEOSPATIAL INTELLIGENCE" title="Campus Map" text="Nearby services powered by MongoDB 2dsphere queries."/><div className="big-map"><div className="map-grid"/><div className="map-center">YOU</div><div className="near-card"><b>Nearby now</b><span>Medical Centre · 180m</span><span>Library · 260m</span><span>Help Desk · 340m</span></div></div></>;
}

function Issues({issues}) {
  return <><PageTitle eyebrow="CAMPUS OPERATIONS" title="Issues & requests" text="Report problems and track campus resolution in real time."/><div className="issue-list">{issues.map(i => <div className="issue" key={i._id}><div className={`priority ${i.priority}`}/><div className="issue-main"><b>{i.title}</b><span>{i.category} · {i.location}</span></div><span className={`badge ${i.status}`}>{i.status}</span><ArrowUpRight size={17}/></div>)}</div></>;
}

function Analytics({stats}) {
  return <><PageTitle eyebrow="ADMIN INTELLIGENCE" title="Campus analytics" text="Aggregation-powered insights across the NEXUS ecosystem."/><div className="analytics-grid"><div className="panel chart"><p className="eyebrow">ACTIVITY BY AREA</p><h2>Campus engagement</h2><div className="bars">{[72,88,61,94,78,66,83].map((v,i)=><div key={i}><div style={{height:`${v}%`}}/><span>{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}</span></div>)}</div></div><div className="panel"><p className="eyebrow">KEY SIGNALS</p><h2>What needs attention</h2><div className="signal"><b>94%</b><span>student engagement</span></div><div className="signal"><b>{stats?.openIssues ?? "—"}</b><span>issues currently open</span></div><div className="signal"><b>3.8×</b><span>faster issue discovery</span></div></div></div></>;
}

function PageTitle({eyebrow,title,text}) { return <div className="page-title"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="muted">{text}</p></div>; }

createRoot(document.getElementById("root")).render(<App />);
