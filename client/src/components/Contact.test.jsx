import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Contact from "./Contact.jsx";

describe("Contact form", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("submits name, email, message as JSON to /api/contact", async () => {
    const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });

    render(<Contact />);
    await userEvent.type(screen.getByLabelText(/your name/i), "Karabo");
    await userEvent.type(screen.getByLabelText(/your email/i), "k@example.com");
    await userEvent.type(screen.getByLabelText(/about your project/i), "Need a small site");
    await userEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(/thank you/i)
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, opts] = fetchMock.mock.calls[0];
    expect(url).toMatch(/\/api\/contact$/);
    expect(opts.method).toBe("POST");
    const body = JSON.parse(opts.body);
    expect(body).toEqual({
      name: "Karabo",
      email: "k@example.com",
      message: "Need a small site",
      website: "",
    });
  });

  it("sends the honeypot field when a bot fills it", async () => {
    const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });

    render(<Contact />);
    await userEvent.type(screen.getByLabelText(/your name/i), "Bot");
    await userEvent.type(screen.getByLabelText(/your email/i), "bot@example.com");
    await userEvent.type(screen.getByLabelText(/about your project/i), "spam");

    const hp = document.querySelector('input[name="website"]');
    expect(hp).toHaveClass("hp");
    await userEvent.type(hp, "http://spam.example");

    await userEvent.click(screen.getByRole("button", { name: /send message/i }));

    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.website).toBe("http://spam.example");
  });

  it("shows the server error message", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Please fill in your name, a valid email and a message." }),
    });

    render(<Contact />);
    await userEvent.type(screen.getByLabelText(/your name/i), "Karabo");
    await userEvent.type(screen.getByLabelText(/your email/i), "k@example.com");
    await userEvent.type(screen.getByLabelText(/about your project/i), "hi");
    await userEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(/please fill in/i)
    );
  });

  it("clears the fields after a successful send", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });

    render(<Contact />);
    const name = screen.getByLabelText(/your name/i);
    const email = screen.getByLabelText(/your email/i);
    const msg = screen.getByLabelText(/about your project/i);

    await userEvent.type(name, "Karabo");
    await userEvent.type(email, "k@example.com");
    await userEvent.type(msg, "hello");
    await userEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => expect(name).toHaveValue(""));
    expect(email).toHaveValue("");
    expect(msg).toHaveValue("");
  });
});