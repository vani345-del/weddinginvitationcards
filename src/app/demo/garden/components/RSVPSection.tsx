"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MEALS = ["Filet Mignon", "Pan-Seared Salmon", "Wild Mushroom Risotto"];

export default function RSVPSection() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [meal, setMeal] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="w-full py-20 md:py-32" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="max-w-xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="block mb-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E" }}>
            RSVP
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#1A1614", lineHeight: 1.15, marginBottom: "1rem" }}>
            Will you join us?
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.9rem", color: "#8A7F75" }}>
            Kindly respond by May 1, 2026
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-10"
            >
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A96E" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  style={{
                    border: "none",
                    borderBottom: "1px solid #C9A96E",
                    background: "transparent",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                    fontSize: "1rem",
                    color: "#1A1614",
                    padding: "8px 0",
                    outline: "none",
                    width: "100%",
                  }}
                  onFocus={(e) => (e.target.style.borderBottom = "2px solid #C9A96E")}
                  onBlur={(e) => (e.target.style.borderBottom = "1px solid #C9A96E")}
                />
              </div>

              {/* Attending */}
              <div className="flex flex-col gap-4">
                <label style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A96E" }}>
                  Attending?
                </label>
                <div className="flex gap-4">
                  {[
                    { value: "yes", label: "Joyfully accepts" },
                    { value: "no", label: "Regretfully declines" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setAttending(opt.value as "yes" | "no")}
                      style={{
                        flex: 1,
                        padding: "10px 16px",
                        border: `1px solid ${attending === opt.value ? "#C9A96E" : "#D4A5A5"}`,
                        backgroundColor: attending === opt.value ? "#C9A96E" : "transparent",
                        color: attending === opt.value ? "#FAF7F2" : "#8A7F75",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                        fontSize: "0.8rem",
                        borderRadius: "100px",
                        cursor: "pointer",
                        transition: "all 0.3s",
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Meal — only if attending */}
              <AnimatePresence>
                {attending === "yes" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-col gap-4 overflow-hidden"
                  >
                    <label style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A96E" }}>
                      Meal Preference
                    </label>
                    <div className="flex flex-col gap-3">
                      {MEALS.map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setMeal(m)}
                          style={{
                            padding: "10px 20px",
                            border: `1px solid ${meal === m ? "#C9A96E" : "#D4A5A5"}`,
                            backgroundColor: meal === m ? "#C9A96E" : "transparent",
                            color: meal === m ? "#FAF7F2" : "#8A7F75",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 300,
                            fontSize: "0.875rem",
                            borderRadius: "100px",
                            cursor: "pointer",
                            transition: "all 0.3s",
                            textAlign: "left",
                          }}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Notes */}
              <div className="flex flex-col gap-2">
                <label style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A96E" }}>
                  Dietary Restrictions or Notes
                  <span style={{ color: "#8A7F75", textTransform: "none", letterSpacing: 0 }}> (optional)</span>
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Any allergies or special requests..."
                  style={{
                    border: "none",
                    borderBottom: "1px solid #C9A96E",
                    background: "transparent",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                    fontSize: "1rem",
                    color: "#1A1614",
                    padding: "8px 0",
                    outline: "none",
                    width: "100%",
                    resize: "none",
                  }}
                />
              </div>

              {/* Submit */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#C9A96E",
                    color: "#1A1614",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    padding: "16px 48px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = "#E8D5A3")}
                  onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = "#C9A96E")}
                >
                  Send with love →
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-16 gap-6"
            >
              {/* Wax seal */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "#C9A96E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 20px rgba(201,169,110,0.4)",
                }}
              >
                <span style={{ fontSize: "2rem" }}>✓</span>
              </motion.div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: "2.5rem", color: "#1A1614" }}>
                RSVP Received
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.9rem", color: "#8A7F75", maxWidth: "320px" }}>
                Thank you, {name || "dear guest"}. We cannot wait to celebrate with you.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
