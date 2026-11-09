import { useState } from "react";
import { profile as p } from "./data.js";
import Contact from "./components/Contact.jsx";

const dev = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
const techIcons = [
  ["HTML5", "html5/html5-original.svg"], ["CSS3", "css3/css3-original.svg"],
  ["JavaScript", "javascript/javascript-original.svg"], ["React", "react/react-original.svg"],
  ["Node.js", "nodejs/nodejs-original.svg"], ["Express", "express/express-original.svg"],
  ["MongoDB", "mongodb/mongodb-original.svg"], ["Docker", "docker/docker-original.svg"],
  ["Kubernetes", "kubernetes/kubernetes-plain.svg"], ["Git", "git/git-original.svg"],
  ["GitHub", "github/github-original.svg"], ["Cucumber", "cucumber/cucumber-plain.svg"],
];

const Section = ({ id, title, children }) => (
  <section id={id}><h2>{title}</h2>{children}</section>
);
const Pairs = ({ items }) => (
  <ul className="pairs">{items.map(([k, v]) => <li key={k}><strong>{k}:</strong> {v}</li>)}</ul>
);
const Tags = ({ items }) => (
  <div className="tags">{items.map((t) => <span key={t}>{t}</span>)}</div>
);

function Banner() {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    <div className="banner">
      <img src="/banner.jpg" alt="Karabo Mphafudi banner" />
    </div>
  );
}

function Avatar() {
  const [ok, setOk] = useState(true);
  return ok ? (
    <img src="/profile.jpg" alt="Karabo Mphafudi" className="profile-img" onError={() => setOk(false)} />
  ) : (
    <div className="profile-img initials">KM</div>
  );
}

export default function App() {
  return (
    <>
      <header className="hero">
        <Banner />
        <div className="wrap">
          <nav>
            <strong>{p.name}</strong>
            <div>
              {["tech", "about", "services", "availability", "rates", "projects", "contact"].map((id) => (
                <a key={id} href={`#${id}`}>{id}</a>
              ))}
            </div>
          </nav>
          <h1>{p.name}</h1>
          <p className="role">{p.role}</p>
          <p className="lead">{p.tagline}</p>
          <a className="btn" href="#contact">Hire me</a>
          <a className="btn ghost" href={p.github} target="_blank" rel="noopener noreferrer">View my GitHub</a>
        </div>
      </header>

      <main className="wrap">
        <Section id="tech" title="Technologies & Technical Tools">
          <div className="tech-grid">
            {techIcons.map(([name, path]) => (
              <div className="tech-card" key={name}>
                <img src={`${dev}/${path}`} alt={name} />
                <p>{name}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="about" title="About me">
          <div className="card about-card">
            <Avatar />
            <div className="about-text">
              <p style={{ marginTop: 0 }}><strong>Full name:</strong> {p.fullName} (I go by Karabo).</p>
              {p.about.map((t) => <p key={t}>{t}</p>)}
            </div>
          </div>
          <h3>Key strengths</h3>
          <ul>{p.strengths.map((s) => <li key={s}>{s}</li>)}</ul>
        </Section>

        <Section id="services" title="Services">
          <div className="grid">
            {p.services.map((s) => (
              <div className="card" key={s.title}><strong>{s.title}</strong><br />{s.text}</div>
            ))}
          </div>
          <h3>Skills I can confidently use</h3>
          <Tags items={p.skills} />
          <h3>Tools I know</h3>
          <Tags items={p.tools} />
          <h3>Who I help and the work I want</h3>
          <p>{p.wanted}</p>
        </Section>

        <Section id="availability" title="Availability"><Pairs items={p.availability} /></Section>
        <Section id="location" title="Work location"><Pairs items={p.location} /></Section>
        <Section id="why" title="Why hire me"><Pairs items={p.why} /></Section>

        <Section id="rates" title="Rates">
          <p>{p.ratesIntro}</p>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Service</th><th>Estimated time</th><th>Price (USD)</th></tr></thead>
              <tbody>
                {p.rates.map((r) => <tr key={r[0]}>{r.map((c) => <td key={c}>{c}</td>)}</tr>)}
              </tbody>
            </table>
          </div>
          <p className="note">{p.ratesNote}</p>
        </Section>

        <Section id="projects" title="Projects">
          {p.projects.map((pr) => (
            <div className="card project" key={pr.name}>
              <h3>{pr.name}</h3>
              <p>{pr.text}</p>
              <Tags items={pr.stack} />
              <a href={pr.link} target="_blank" rel="noopener noreferrer">{pr.linkText}</a>
            </div>
          ))}
        </Section>

        <Section id="contact" title="Contact">
          <p>Tell me about your project and I will reply with a clear plan.</p>
          <ul>
            <li><strong>Email:</strong> <a href={`mailto:${p.email}`}>{p.email}</a></li>
            <li><strong>Mobile:</strong> <a href="tel:+27631255829">{p.phone}</a></li>
            <li><strong>LinkedIn:</strong> <a href={p.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/karabomphafudi</a></li>
            <li><strong>GitHub:</strong> <a href={p.github} target="_blank" rel="noopener noreferrer">github.com/KaraboMphafudi</a></li>
          </ul>
          <Contact />
        </Section>
      </main>

      <footer><div className="wrap">&copy; 2026 {p.name}. Johannesburg, South Africa.</div></footer>
    </>
  );
}
