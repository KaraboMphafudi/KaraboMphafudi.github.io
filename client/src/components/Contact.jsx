import { useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [status, setStatus] = useState({ type: "idle", text: "" });

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setStatus({ type: "sending", text: "Sending..." });
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not send.");
      setForm({ name: "", email: "", message: "", website: "" });
      setStatus({ type: "ok", text: "Thank you! I will reply soon." });
    } catch (err) {
      setStatus({ type: "error", text: err.message });
    }
  }

  return (
    <form onSubmit={submit} className="form">
      <label>Your name<input name="name" value={form.name} onChange={change} required maxLength={100} /></label>
      <label>Your email<input name="email" type="email" value={form.email} onChange={change} required /></label>
      <label>About your project<textarea name="message" rows="4" value={form.message} onChange={change} required maxLength={2000} /></label>
      <input name="website" value={form.website} onChange={change} className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" />
      <button className="btn" disabled={status.type === "sending"}>Send message</button>
      {status.text && <p className={`status ${status.type}`} role="status">{status.text}</p>}
    </form>
  );
}
