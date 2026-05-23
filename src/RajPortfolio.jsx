import { useState, useEffect, useRef } from "react";

const SKILLS = [
  { name: "HTML5", level: 92 },
  { name: "CSS3", level: 88 },
  { name: "JavaScript", level: 82 },
  { name: "Node.JS", level: 76 },
  { name: "Express.JS", level: 74 },
  { name: "React.JS", level: 62 },
  { name: "PHP", level: 52 },
  { name: "DBMS", level: 72 },
];

const PROJECTS = [
  {
    id: 1,
    title: "Restaurant Management System",
    type: "Full Stack",
    short: "Complete restaurant solution with digital menus, real-time table reservations, order processing, and a secure admin dashboard for inventory & staff management.",
    features: [
      "Digital menu with category management",
      "Real-time table reservation system",
      "Order processing & tracking",
      "Secure admin dashboard",
      "Inventory & staff management",
      "Payment integration support",
    ],
    tech: ["Node.JS", "Express.JS", "MySQL", "HTML5", "CSS3", "JavaScript"],
    num: "01",
    github: "https://github.com/rajbaidiyavadara/restaurant-management-system",
    live: null,
  },
  {
    id: 2,
    title: "Wibexs — Agricultural Import/Export",
    type: "Internship Project",
    short: "Responsive business website with interactive product carousel, customer inquiry form connected to PHP backend, and Bootstrap 5 offcanvas mobile navigation.",
    features: [
      "Fully responsive design with Bootstrap 5",
      "Interactive product carousel/slider",
      "Customer inquiry form with PHP backend",
      "Offcanvas mobile navigation",
      "Cross-browser compatible",
      "SEO-friendly structure",
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "PHP"],
    num: "02",
    github: "https://github.com/rajbaidiyavadara/wibexs-agricultural-website",
    live: null,
  },
  {
    id: 3,
    title: "Travelix — Travel Booking Platform",
    type: "Full Stack",
    short: "Feature-rich travel booking platform with bus seat selection, real-time booking, ticket cancellation with 75% refund system, and a complete admin dashboard.",
    features: [
      "Real-time bus seat selection & booking",
      "User registration & login system",
      "Ticket cancellation with 75% auto-refund",
      "Admin dashboard for bookings & messages",
      "Tour package booking system",
      "Contact & inquiry management",
    ],
    tech: ["Node.JS", "Express.JS", "MySQL", "HTML5", "CSS3", "JavaScript", "Bootstrap 5"],
    num: "03",
    github: "https://github.com/rajbaidiyavadara",
    live: null,
  },
  {
    id: 4,
    title: "UrbanStay — Hotel Management",
    type: "Full Stack",
    short: "Luxury hotel management system with room booking, in-room food ordering, user authentication, newsletter subscription, and an elegant dark-gold UI.",
    features: [
      "Room booking with check-in/check-out",
      "In-room food order system",
      "User login & registration",
      "Newsletter subscription",
      "Responsive dark luxury UI",
      "Admin data management",
    ],
    tech: ["Node.JS", "Express.JS", "MySQL", "HTML5", "CSS3", "JavaScript"],
    num: "04",
    github: "https://github.com/rajbaidiyavadara",
    live: null,
  },
];

const NAV = ["About", "Skills", "Experience", "Projects", "Contact"];

function useInView(threshold = 0.15) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function TypeWriter({ words }) {
  const [text, setText] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[wi];
    const t = setTimeout(() => {
      if (!del) {
        if (ci < w.length) { setText(w.slice(0, ci + 1)); setCi(c => c + 1); }
        else setTimeout(() => setDel(true), 2000);
      } else {
        if (ci > 0) { setText(w.slice(0, ci - 1)); setCi(c => c - 1); }
        else { setDel(false); setWi(i => (i + 1) % words.length); }
      }
    }, del ? 40 : 80);
    return () => clearTimeout(t);
  }, [ci, del, wi, words]);
  return <span style={{ color: "#c8a96e" }}>{text}<span style={{ animation: "blink 1s step-end infinite" }}>|</span></span>;
}

function SkillBar({ name, level, i }) {
  const [w, setW] = useState(0);
  const [ref, vis] = useInView(0.2);
  useEffect(() => { if (vis) setTimeout(() => setW(level), i * 80); }, [vis]);
  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: "#2d2d2d", letterSpacing: "0.06em", textTransform: "uppercase" }}>{name}</span>
        <span style={{ fontSize: 12, color: "#999" }}>{w}%</span>
      </div>
      <div style={{ height: 3, background: "#ede8e0", borderRadius: 2 }}>
        <div style={{ height: "100%", width: `${w}%`, background: "linear-gradient(90deg,#c8a96e,#a07840)", borderRadius: 2, transition: "width 1.1s cubic-bezier(.4,0,.2,1)" }} />
      </div>
    </div>
  );
}

function FadeUp({ children, delay = 0 }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function ProjectDetail({ project, onBack }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ minHeight: "100vh", background: "#faf8f5", paddingTop: 80 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 5vw" }}>
        <button
          onClick={onBack}
          style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#1a1a1a", color: "#faf8f5", border: "none", cursor: "pointer", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Georgia', serif", padding: "13px 28px", marginBottom: 52, transition: "background 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "#c8a96e"}
          onMouseLeave={e => e.currentTarget.style.background = "#1a1a1a"}
        >
          ← Back to Portfolio
        </button>

        <div style={{ marginBottom: 48 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8a96e", fontFamily: "'Courier New', monospace" }}>{project.type}</span>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 700, color: "#1a1a1a", fontFamily: "'Georgia', serif", margin: "12px 0 20px", lineHeight: 1.1 }}>{project.title}</h1>
          <p style={{ fontSize: 17, lineHeight: 1.9, color: "#555", maxWidth: 680 }}>{project.short}</p>
        </div>

        <div style={{ display: "flex", gap: 14, marginBottom: 56, flexWrap: "wrap" }}>
          <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <button style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", background: "#1a1a1a", color: "#faf8f5", border: "none", cursor: "pointer", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Georgia', serif" }}>
              ⌥ View on GitHub
            </button>
          </a>
        </div>

        <div style={{ width: "100%", height: 1, background: "#e8e0d4", marginBottom: 56 }} />

        <div style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8a96e", marginBottom: 12, fontFamily: "'Courier New', monospace" }}>Key Features</p>
          <div style={{ width: 48, height: 2, background: "#c8a96e", marginBottom: 28, borderRadius: 1 }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {project.features.map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "18px 20px", background: "#fff", border: "1px solid #e8e0d4" }}>
                <span style={{ color: "#c8a96e", fontSize: 16, marginTop: 1 }}>—</span>
                <span style={{ fontSize: 15, color: "#444", lineHeight: 1.6 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8a96e", marginBottom: 12, fontFamily: "'Courier New', monospace" }}>Tech Stack</p>
          <div style={{ width: 48, height: 2, background: "#c8a96e", marginBottom: 24, borderRadius: 1 }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {project.tech.map(t => (
              <span key={t} style={{ fontSize: 12, letterSpacing: "0.1em", padding: "8px 18px", background: "#1a1a1a", color: "#faf8f5", textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("About");
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  const handleBack = () => {
    setSelectedProject(null);
    setActive("Projects");
    setTimeout(() => {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  if (selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={handleBack} />;
  }

  const S = {
    root: { fontFamily: "'Georgia', 'Times New Roman', serif", background: "#faf8f5", color: "#1a1a1a", margin: 0, padding: 0, minHeight: "100vh" },
    nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(250,248,245,0.97)" : "transparent", borderBottom: scrolled ? "1px solid #e8e0d4" : "1px solid transparent", transition: "all 0.4s ease", padding: "0 5vw", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 },
    sectionLabel: { fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c8a96e", marginBottom: 12, fontFamily: "'Courier New', monospace" },
    h2: { fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, color: "#1a1a1a", margin: "0 0 56px", fontFamily: "'Georgia', serif", lineHeight: 1.15 },
    divider: { width: 48, height: 2, background: "#c8a96e", marginBottom: 20, borderRadius: 1 },
    section: { padding: "100px 5vw", maxWidth: 1100, margin: "0 auto" },
    chip: { display: "inline-block", fontSize: 11, letterSpacing: "0.1em", padding: "4px 12px", background: "#f0ebe3", color: "#7a6040", marginRight: 8, marginTop: 8, textTransform: "uppercase", fontFamily: "'Courier New', monospace" },
    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 },
  };

  return (
    <div style={S.root}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
        .proj-card { transition: all 0.25s ease; cursor: pointer; }
        .proj-card:hover { border-color: #c8a96e !important; transform: translateY(-4px); box-shadow: 0 12px 40px rgba(200,169,110,0.12); }
        .proj-card:hover .proj-arrow { opacity: 1 !important; transform: translateX(0) !important; }
        .nav-link:hover { color: #c8a96e !important; }
        .btn-hire:hover { background: #c8a96e !important; border-color: #c8a96e !important; color: #1a1a1a !important; }
        .proj-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media(max-width:680px){ .grid2{grid-template-columns:1fr !important;} .nav-links{display:none !important;} .proj-grid{grid-template-columns:1fr !important;} }
      `}</style>

      {/* NAV */}
      <nav style={S.nav}>
        <div style={{ fontFamily: "'Georgia', serif", fontSize: 19, fontWeight: 700, color: "#1a1a1a", letterSpacing: "0.04em", cursor: "pointer" }} onClick={() => scrollTo("about")}>R.B.</div>
        <ul style={{ display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0 }} className="nav-links">
          {NAV.map(n => (
            <li key={n} onClick={() => scrollTo(n)} className="nav-link" style={{ fontSize: 13, fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: active === n ? "#c8a96e" : "#555", cursor: "pointer", borderBottom: active === n ? "1px solid #c8a96e" : "1px solid transparent", paddingBottom: 2, transition: "color 0.2s" }}>{n}</li>
          ))}
        </ul>
        <div className="btn-hire" onClick={() => window.open("mailto:baidiyavadararaj@gmail.com")} style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#c8a96e", cursor: "pointer", border: "1px solid #c8a96e", padding: "7px 16px", transition: "all 0.2s" }}>
          Hire Me
        </div>
      </nav>

      {/* HERO */}
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 5vw", paddingTop: 64, background: "#faf8f5", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: "5vw", top: "50%", transform: "translateY(-50%)", fontSize: "22vw", fontWeight: 700, color: "#f0ebe3", fontFamily: "'Georgia', serif", userSelect: "none", lineHeight: 1, zIndex: 1 }}>RB</div>
        <div style={{ maxWidth: 760, zIndex: 2 }}>
          <div style={{ animation: "fadeIn 0.8s ease both" }}>
            <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8a96e", marginBottom: 20, fontFamily: "'Courier New', monospace" }}>Portfolio — Web Developer</p>
            <h1 style={{ fontSize: "clamp(2.8rem,6vw,5rem)", fontWeight: 700, lineHeight: 1.08, color: "#1a1a1a", margin: "0 0 18px", fontFamily: "'Georgia', serif" }}>Raj<br />Baidiyavadara</h1>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#555", maxWidth: 540, marginBottom: 36 }}>
              I build <TypeWriter words={["dynamic web apps.", "responsive UIs.", "full-stack solutions.", "clean, fast code."]} />
              <br />B.Sc. IT Student at Darshan University — passionate about turning ideas into polished digital experiences.
            </p>
            <div>
              <button style={{ padding: "13px 32px", background: "#1a1a1a", color: "#faf8f5", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", border: "none", fontFamily: "'Georgia', serif" }} onClick={() => scrollTo("Projects")}>View Work</button>
              <button style={{ padding: "12px 32px", background: "transparent", color: "#1a1a1a", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", border: "1px solid #1a1a1a", fontFamily: "'Georgia', serif", marginLeft: 14 }} onClick={() => scrollTo("Contact")}>Get In Touch</button>
            </div>
            <div style={{ display: "flex", gap: 32, marginTop: 48 }}>
              {[["CGPA", "7.76"], ["Projects", "4+"], ["Internship", "3 mo"]].map(([l, v]) => (
                <div key={l}>
                  <div style={{ fontSize: 26, fontWeight: 700, color: "#1a1a1a", fontFamily: "'Georgia', serif" }}>{v}</div>
                  <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#999" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div style={{ background: "#fff", borderTop: "1px solid #e8e0d4", borderBottom: "1px solid #e8e0d4" }}>
        <div id="about" style={S.section}>
          <FadeUp>
            <p style={S.sectionLabel}>01 — About</p>
            <div style={S.divider} />
          </FadeUp>
          <div style={{ ...S.grid2 }} className="grid2">
            <FadeUp delay={0.1}>
              <h2 style={{ ...S.h2, marginBottom: 24 }}>Passionate about building for the web.</h2>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: "#555", marginBottom: 18 }}>I'm a B.Sc. Information Technology student at Darshan University (2024–2026), currently holding a CGPA of 7.76. I specialize in building dynamic, user-friendly web applications with a strong foundation in both front-end and back-end technologies.</p>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: "#555" }}>I completed a 3-month internship at MDIDM Infoway, Jamnagar, where I developed a full production website. I speak English, Gujarati, and Hindi fluently.</p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div style={{ display: "flex", flexDirection: "column", gap: 20, paddingTop: 8 }}>
                {[["Location", "Rajkot, Gujarat, India"], ["Phone", "+91 63559 01117"], ["Email", "baidiyavadararaj@gmail.com"], ["University", "Darshan University"], ["Languages", "English · Gujarati · Hindi"]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", gap: 20, borderBottom: "1px solid #f0ebe3", paddingBottom: 16 }}>
                    <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#c8a96e", minWidth: 100, paddingTop: 2, fontFamily: "'Courier New', monospace" }}>{k}</span>
                    <span style={{ fontSize: 15, color: "#333" }}>{v}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* SKILLS */}
      <div id="skills" style={S.section}>
        <FadeUp>
          <p style={S.sectionLabel}>02 — Skills</p>
          <div style={S.divider} />
          <h2 style={S.h2}>Technical Expertise</h2>
        </FadeUp>
        <div style={{ ...S.grid2 }} className="grid2">
          <FadeUp delay={0.1}>{SKILLS.slice(0, 4).map((s, i) => <SkillBar key={s.name} {...s} i={i} />)}</FadeUp>
          <FadeUp delay={0.2}>{SKILLS.slice(4).map((s, i) => <SkillBar key={s.name} {...s} i={i} />)}</FadeUp>
        </div>
      </div>

      {/* EXPERIENCE */}
      <div style={{ background: "#fff", borderTop: "1px solid #e8e0d4", borderBottom: "1px solid #e8e0d4" }}>
        <div id="experience" style={S.section}>
          <FadeUp>
            <p style={S.sectionLabel}>03 — Experience</p>
            <div style={S.divider} />
            <h2 style={S.h2}>Work History</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div style={{ background: "#fff", border: "1px solid #e8e0d4", padding: "32px 36px", marginBottom: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a", fontFamily: "'Georgia', serif", marginBottom: 4 }}>Web Development Intern</div>
                  <div style={{ fontSize: 14, color: "#c8a96e", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>MDIDM Infoway, Jamnagar</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 13, color: "#999" }}>Nov 2025 — Feb 2026</div>
                  <div style={{ fontSize: 12, color: "#c8a96e", marginTop: 4 }}>3 Months</div>
                </div>
              </div>
              <div style={{ borderTop: "1px solid #f0ebe3", paddingTop: 20 }}>
                <p style={{ fontSize: 14, color: "#777", marginBottom: 16, fontStyle: "italic" }}>Project: Wibexs — Agricultural Import-Export Website</p>
                {["Developed responsive front-end using HTML5, CSS3, JavaScript, and Bootstrap 5.", "Built an interactive product carousel with smooth JavaScript animations.", "Designed customer inquiry form with PHP backend (POST method) data collection.", "Implemented Bootstrap offcanvas mobile navigation for seamless UX."].map((pt, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, marginBottom: 12 }}>
                    <span style={{ color: "#c8a96e", marginTop: 2, flexShrink: 0 }}>—</span>
                    <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7 }}>{pt}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div style={{ background: "#fff", border: "1px solid #e8e0d4", padding: "32px 36px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a", fontFamily: "'Georgia', serif", marginBottom: 4 }}>B.Sc. Information Technology</div>
                  <div style={{ fontSize: 14, color: "#c8a96e", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>Darshan University</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 13, color: "#999" }}>2024 — 2026</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginTop: 4 }}>CGPA: 7.76 / 10</div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* PROJECTS */}
      <div id="projects" style={S.section}>
        <FadeUp>
          <p style={S.sectionLabel}>04 — Projects</p>
          <div style={S.divider} />
          <h2 style={S.h2}>Selected Work</h2>
        </FadeUp>
        <div className="proj-grid">
          {PROJECTS.map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.1}>
              <div className="proj-card" onClick={() => setSelectedProject(p)} style={{ background: "#fff", border: "1px solid #e8e0d4", padding: "28px 28px", height: "100%" }}>
                <span style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 700, color: "#f0ebe3", fontFamily: "'Georgia', serif", lineHeight: 1, marginBottom: -8, display: "block" }}>{p.num}</span>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                  <div>
                    <span style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#c8a96e", fontFamily: "'Courier New', monospace" }}>{p.type}</span>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a", fontFamily: "'Georgia', serif", marginTop: 5, lineHeight: 1.3 }}>{p.title}</h3>
                  </div>
                  <span className="proj-arrow" style={{ fontSize: 20, color: "#c8a96e", opacity: 0, transform: "translateX(-8px)", transition: "all 0.25s ease", flexShrink: 0 }}>→</span>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "#777", marginBottom: 16 }}>{p.short}</p>
                <div style={{ borderTop: "1px solid #f0ebe3", paddingTop: 14 }}>
                  {p.tech.slice(0, 4).map(t => <span key={t} style={S.chip}>{t}</span>)}
                  {p.tech.length > 4 && <span style={{ ...S.chip, background: "#e8e0d4" }}>+{p.tech.length - 4}</span>}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* CONTACT */}
      <div style={{ background: "#1a1a1a", color: "#faf8f5" }}>
        <div id="contact" style={{ ...S.section, textAlign: "center" }}>
          <FadeUp>
            <p style={{ ...S.sectionLabel, color: "#c8a96e" }}>05 — Contact</p>
            <div style={{ width: 48, height: 2, background: "#c8a96e", margin: "0 auto 20px", borderRadius: 1 }} />
            <h2 style={{ ...S.h2, color: "#faf8f5", marginBottom: 18 }}>Let's Work Together</h2>
            <p style={{ fontSize: 17, color: "#aaa", maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.8 }}>I'm open to internships, freelance projects, and full-time opportunities. Let's build something great.</p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 40, marginBottom: 48 }}>
              {[["Email", "baidiyavadararaj@gmail.com", "mailto:baidiyavadararaj@gmail.com"], ["Phone", "+91 63559 01117", "tel:+916355901117"]].map(([label, val, href]) => (
                <a key={label} href={href} style={{ textDecoration: "none" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8a96e", marginBottom: 6, fontFamily: "'Courier New', monospace" }}>{label}</div>
                    <div style={{ fontSize: 15, color: "#faf8f5" }}>{val}</div>
                  </div>
                </a>
              ))}
            </div>
            <a href="mailto:baidiyavadararaj@gmail.com">
              <button style={{ padding: "13px 36px", background: "#c8a96e", color: "#1a1a1a", border: "none", cursor: "pointer", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, fontFamily: "'Georgia', serif" }}>
                Send Me a Message →
              </button>
            </a>
          </FadeUp>
        </div>
      </div>

      <div style={{ background: "#1a1a1a", borderTop: "1px solid #2a2a2a", padding: "32px 5vw", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "#555", letterSpacing: "0.05em" }}>© 2025 Raj Baidiyavadara — Designed & Built with passion.</p>
      </div>
    </div>
  );
}