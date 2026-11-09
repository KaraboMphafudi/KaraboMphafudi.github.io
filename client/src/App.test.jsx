import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App.jsx";
import { profile } from "./data.js";

describe("App rendering", () => {
  it("renders the profile name in the hero", () => {
    render(<App />);
    expect(screen.getAllByText(profile.name).length).toBeGreaterThan(0);
  });

  it("renders the role and tagline", () => {
    render(<App />);
    expect(screen.getByText(profile.role)).toBeInTheDocument();
    expect(screen.getByText(profile.tagline)).toBeInTheDocument();
  });

  it("renders the banner image with the correct src", () => {
    render(<App />);
    const banner = screen.getByAltText("Karabo Mphafudi banner");
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveAttribute("src", "/banner.jpg");
  });

  it("renders the profile photo with the correct src", () => {
    render(<App />);
    const img = screen.getByAltText("Karabo Mphafudi");
    expect(img).toHaveAttribute("src", "/profile.jpg");
  });

  it("shows the About section with the N6 / September 2026 paragraph", () => {
    render(<App />);
    expect(screen.getByText(/N6 qualification in Studio Work/i)).toBeInTheDocument();
    expect(screen.getByText(/September 2026/i)).toBeInTheDocument();
  });

  it("renders the rates note under the table with class 'note'", () => {
    render(<App />);
    const note = screen.getByText(profile.ratesNote);
    expect(note).toBeInTheDocument();
    expect(note).toHaveClass("note");
    expect(note.tagName).toBe("P");
  });

  it("renders every rate row", () => {
    render(<App />);
    for (const row of profile.rates) {
      expect(screen.getByText(row[0])).toBeInTheDocument();
      expect(screen.getByText(row[2])).toBeInTheDocument();
    }
  });

  it("renders the Springs Sunrise Primary project with demo link", () => {
    render(<App />);
    expect(screen.getByText("Springs Sunrise Primary")).toBeInTheDocument();
    const demo = screen.getByText("View live demo");
    expect(demo).toHaveAttribute("href", "https://springs-sunrise-primary.netlify.app");
    expect(demo).toHaveAttribute("target", "_blank");
  });

  it("renders all project cards by heading", () => {
    render(<App />);
    for (const p of profile.projects) {
      expect(screen.getByRole("heading", { name: p.name, level: 3 })).toBeInTheDocument();
    }
  });

  it("exposes anchor ids for every nav section", () => {
    render(<App />);
    for (const id of ["tech", "about", "services", "availability", "rates", "projects", "contact"]) {
      expect(document.querySelector(`#${id}`)).toBeInTheDocument();
    }
  });

  it("shows email, phone, GitHub, LinkedIn in contact section", () => {
    render(<App />);
    expect(screen.getByRole("link", { name: profile.email })).toHaveAttribute(
      "href",
      `mailto:${profile.email}`
    );
    expect(screen.getByRole("link", { name: profile.phone })).toHaveAttribute(
      "href",
      "tel:+27631255829"
    );
    expect(screen.getByRole("link", { name: /github\.com\/KaraboMphafudi/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /linkedin\.com\/in\/karabomphafudi/i })).toBeInTheDocument();
  });
});