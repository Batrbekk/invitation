import React, { useState } from "react";

const SurveyForm: React.FC = () => {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("");

  return (
    <form className="max-w-xl mx-auto bg-[#f9f9f9] rounded-lg p-8 flex flex-col items-center">
      <p className="text-2xl text-black mb-8 text-center font-snell">Қатысатыныңызды растаңыз!</p>
      <label className="text-xl text-black mb-2 text-center font-snell" htmlFor="name">
        Атыңызды және тегіңізді енгізіңіз
      </label>
      <input
        id="name"
        type="text"
        className="w-full max-w-md p-4 border border-gray-400 rounded-xl mb-6 text-lg focus:outline-none focus:border-black bg-transparent placeholder-gray-400 font-snell text-black"
        placeholder="Атыңыз"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <div className="flex flex-col gap-4 w-full max-w-md mb-8">
        <label className="flex items-center text-lg text-black font-snell">
          <input
            type="radio"
            name="attendance"
            value="kelu"
            checked={attendance === "kelu"}
            onChange={() => setAttendance("kelu")}
            className="mr-3 w-6 h-6 accent-black"
            required
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
            className="mr-3 w-6 h-6 accent-black"
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
            className="mr-3 w-6 h-6 accent-black"
          />
          Өкінішке орай, келе алмаймын
        </label>
      </div>
      <button
        type="submit"
        className="w-full max-w-md bg-black text-white text-xl rounded-full py-4 mt-2 hover:bg-black transition font-snell"
      >
        Жіберу
      </button>
    </form>
  );
};

export default SurveyForm; 