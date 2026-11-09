import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Contact from "./Contact.jsx";

describe("Contact form", () => {
  it("opens mailto: with prefilled subject and body on submit", async () => {
    const originalLocation = window.location;
    delete window.location;
    window.location = { href: "" };

    render(<Contact />);
    await userEvent.type(screen.getByLabelText(/your name/i), "Karabo");
    await userEvent.type(screen.getByLabelText(/your email/i), "k@example.com");
    await userEvent.type(screen.getByLabelText(/about your project/i), "Need a site");
    await userEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(window.location.href).toContain("mailto:Karabo.ekfm@gmail.com");
    expect(window.location.href).toContain("Website%20enquiry%20from%20Karabo");
    expect(window.location.href).toContain("Need%20a%20site");

    window.location = originalLocation;
  });

  it("shows the fallback email text after submit", async () => {
    delete window.location;
    window.location = { href: "" };

    render(<Contact />);
    await userEvent.type(screen.getByLabelText(/your name/i), "Karabo");
    await userEvent.type(screen.getByLabelText(/your email/i), "k@example.com");
    await userEvent.type(screen.getByLabelText(/about your project/i), "hi");
    await userEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByRole("status")).toHaveTextContent(/Karabo\.ekfm@gmail\.com/);
  });
});