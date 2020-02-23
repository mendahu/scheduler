import { useState } from "react";

const useVisualMode = function(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const back = function() {
    if (history.length > 1) {
      const newHist = history.slice(0, -1);
      setMode(newHist[newHist.length - 1]);
      setHistory(newHist);
    }
  };

  const transition = function(newMode, replace = false) {
    const newHist = (replace) ? history.slice(0, -1) : history;
    setHistory([...newHist, newMode]);
    setMode(newMode);
  };

  return { mode, transition, back };
};

export default useVisualMode;