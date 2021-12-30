import React, { useEffect, useState } from "react";
import { format, isToday } from "date-fns";
import "./App.css";

function App() {
  const [active, setActive] = useState<string | null>(null);

  const check = () => {
    const stored = localStorage.getItem("ovenOff");
    if (stored && isToday(new Date(stored))) {
      setActive(new Date(stored).toISOString());
    } else if (stored) {
      localStorage.clear();
    }
  };

  useEffect(() => {
    check();
    const interval = setInterval(check, 2000);
    return () => clearInterval(interval);
  }, []);

  const save = () => {
    if (active) {
      localStorage.clear();
      setActive(null);
    } else {
      localStorage.setItem("ovenOff", new Date().toISOString());
      setActive(new Date().toISOString());
    }
  };

  return (
    <div className="App">
      <button className={`bigButton ${active ? "active" : ""}`} onClick={save}>
        {active ? "Oven off!" : "Oven off?"}
        <small>
          {active
            ? format(new Date(active), "d MMM hh:mmaaa")
            : "better go check"}
        </small>
      </button>
    </div>
  );
}

export default App;
