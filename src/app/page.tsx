import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <Hero />

      {/* Contact / Inquiry Form */}
      <section style={{ padding: "2rem 1rem", backgroundColor: "#f8fafc" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "2rem",
            color: "#0f172a",
            fontWeight: 700,
            marginBottom: "1rem",
          }}
        >
          Get in Touch
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "#475569",
            marginBottom: "2rem",
          }}
        >
          Have a question or want to plan your next journey? Fill out the form below
          and our team will contact you soon.
        </p>
        <ContactForm />
      </section>
    </main>
  );
}
