import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const SurveyForm: React.FC = () => {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isSubmitted = localStorage.getItem("survey_submitted");
      if (isSubmitted) {
        setSubmitted(true);
      }
      const savedName = localStorage.getItem("survey_name");
      if (savedName) {
        setName(savedName);
      }
      const savedAttendance = localStorage.getItem("survey_attendance");
      if (savedAttendance) {
        setAttendance(savedAttendance);
      }
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const attendanceLabels: Record<string, string> = {
    kelu: "Қуана-қуана келемін!",
    jup: "Отбасыммен келемін",
    kelmeymin: "Өкінішке орай, келе алмаймын",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const attendanceLabel = attendanceLabels[attendance] || attendance;
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, attendance: attendanceLabel }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Қате шықты");
      setSuccess(data.message || "Сәтті жіберілді");
      setSubmitted(true);
      setShowConfetti(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("survey_submitted", "1");
      }
      setTimeout(() => setShowConfetti(false), 5000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Қате шықты");
      } else {
        setError("Қате шықты");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showConfetti && windowSize.width > 0 && windowSize.height > 0 && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999, animation: 'fadeInConfetti 0.3s' }}>
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={800}
            gravity={0.7}
            wind={0.01}
            recycle={false}
          />
          <style>{`
            @keyframes fadeInConfetti {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}</style>
        </div>
      )}
      <form className="max-w-xl mx-auto bg-[#f9f9f9] rounded-lg p-8 flex flex-col items-center" onSubmit={handleSubmit}>
        <p className="text-2xl text-black mb-8 text-center font-snell">
          {submitted ? "Сіз бұл форманы бұрын толтырдыңыз. Рақмет!" : "Қатысатыныңызды растаңыз!"}
        </p>
        <label className="text-xl text-black mb-2 text-center font-snell" htmlFor="name">
          Атыңызды және тегіңізді енгізіңіз
        </label>
        <input
          id="name"
          type="text"
          className="w-full max-w-md p-4 border border-gray-400 rounded-xl mb-6 text-lg focus:outline-none focus:border-black bg-transparent placeholder-gray-400 font-snell text-black"
          placeholder="Атыңыз"
          value={name}
          onChange={e => {
            setName(e.target.value);
            if (typeof window !== "undefined") {
              localStorage.setItem("survey_name", e.target.value);
            }
          }}
          required
          disabled={submitted || loading}
        />
        <div className="flex flex-col gap-4 w-full max-w-md mb-8">
          <label className="flex items-center text-lg text-black font-snell">
            <input
              type="radio"
              name="attendance"
              value="kelu"
              checked={attendance === "kelu"}
              onChange={() => setAttendance("kelu")}
              onClick={() => {
                setAttendance("kelu");
                if (typeof window !== "undefined") {
                  localStorage.setItem("survey_attendance", "kelu");
                }
              }}
              className="mr-3 w-6 h-6 accent-black"
              required
              disabled={submitted || loading}
            />
            Қуана-қуана келемін!
          </label>
          <label className="flex items-center text-lg text-black font-snell">
            <input
              type="radio"
              name="attendance"
              value="jup"
              checked={attendance === "jup"}
              onChange={() => setAttendance("jup")}
              onClick={() => {
                setAttendance("jup");
                if (typeof window !== "undefined") {
                  localStorage.setItem("survey_attendance", "jup");
                }
              }}
              className="mr-3 w-6 h-6 accent-black"
              disabled={submitted || loading}
            />
            Отбасыммен келемін
          </label>
          <label className="flex items-center text-lg text-black font-snell">
            <input
              type="radio"
              name="attendance"
              value="kelmeymin"
              checked={attendance === "kelmeymin"}
              onChange={() => setAttendance("kelmeymin")}
              onClick={() => {
                setAttendance("kelmeymin");
                if (typeof window !== "undefined") {
                  localStorage.setItem("survey_attendance", "kelmeymin");
                }
              }}
              className="mr-3 w-6 h-6 accent-black"
              disabled={submitted || loading}
            />
            Өкінішке орай, келе алмаймын
          </label>
        </div>
        <button
          type="submit"
          className={`w-full max-w-md bg-black text-white text-xl rounded-full py-4 mt-2 font-snell transition ${
            submitted || loading ? "opacity-50 cursor-not-allowed" : "hover:bg-black"
          }`}
          disabled={submitted || loading}
        >
          {loading ? "Жіберілуде..." : submitted ? "Жіберілді" : "Жіберу"}
        </button>
        {error && <p className="text-red-600 text-lg mt-4">{error}</p>}
      </form>
    </>
  );
};

export default SurveyForm; 