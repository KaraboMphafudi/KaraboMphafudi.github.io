import { describe, it, expect } from "vitest";
import { profile } from "./data.js";

describe("profile data integrity", () => {
  it("has the correct identity fields", () => {
    expect(profile.name).toBe("Karabo Mphafudi");
    expect(profile.fullName).toBe("Ignitious Karabo Mphafudi");
    expect(profile.role).toBe("Junior Full-Stack JavaScript (MERN) Developer");
  });

  it("has contact details and Johannesburg location", () => {
    expect(profile.email).toBe("Karabo.ekfm@gmail.com");
    expect(profile.phone).toBe("+27 63 125 5829");
    expect(profile.github).toMatch(/KaraboMphafudi/);
    expect(profile.linkedin).toMatch(/karabomphafudi/);
    expect(profile.location).toEqual(
      expect.arrayContaining([["Based in", "Johannesburg, Gauteng, South Africa"]])
    );
  });

  it("mentions N6 qualification and September 2026 in about", () => {
    const about = profile.about.join(" ");
    expect(about).toMatch(/N6/);
    expect(about).toMatch(/September 2026/);
  });

  it("includes Java software testing in Eclipse in tools", () => {
    expect(profile.tools).toContain("Java software testing in Eclipse");
  });

  it("has the exact ratesNote used by the App", () => {
    expect(profile.ratesNote).toBe("Prices are estimates and depend on the project.");
  });

  it("rates table has rows and every row has 3 cells", () => {
    expect(profile.rates.length).toBeGreaterThan(0);
    for (const row of profile.rates) expect(row).toHaveLength(3);
  });

  it("Springs Sunrise Primary has the live demo link", () => {
    const springs = profile.projects.find((p) => p.name === "Springs Sunrise Primary");
    expect(springs).toBeDefined();
    expect(springs.linkText).toBe("View live demo");
    expect(springs.link).toBe("https://springs-sunrise-primary.netlify.app");
    expect(springs.stack).toEqual(expect.arrayContaining(["HTML", "CSS", "JavaScript"]));
  });

  it("every project has name, text, stack, link, linkText", () => {
    for (const p of profile.projects) {
      expect(p.name).toBeTruthy();
      expect(p.text).toBeTruthy();
      expect(Array.isArray(p.stack)).toBe(true);
      expect(p.link).toMatch(/^https?:\/\//);
      expect(p.linkText).toBeTruthy();
    }
  });
});
