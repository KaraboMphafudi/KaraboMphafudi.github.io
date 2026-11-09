import { useState } from "react";

const EMAIL = "Karabo.ekfm@gmail.com";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  function submit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Website enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={submit} className="form">
      <label>Your name<input name="name" value={form.name} onChange={change} required maxLength={100} /></label>
      <label>Your email<input name="email" type="email" value={form.email} onChange={change} required /></label>
      <label>About your project<textarea name="message" rows="4" value={form.message} onChange={change} required maxLength={2000} /></label>
      <button className="btn">Send message</button>
      {sent && (
        <p className="status ok" role="status">
          Your email app should open with the message ready to send. If nothing opens, email me at{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      )}
    </form>
  );
}