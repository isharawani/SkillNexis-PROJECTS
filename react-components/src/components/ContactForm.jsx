import { useState } from "react";

function ContactForm() {
  const [name, setName] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (name.trim() === "") {
      alert("Please enter your name");
      return;
    }

    setSubmittedName(name);
    setName("");
  }

  return (
    <section className="contact-section">
      <h2>Contact Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      {submittedName && (
        <p>
          Thank you, {submittedName}! Your form was submitted successfully.
        </p>
      )}
    </section>
  );
}

export default ContactForm;