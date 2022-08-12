import { useState } from "react";

//the function for Hook useVisualMode
export default function useVisualMode(initial) {
  //initialization of states of modes and the mode stack, the history
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //the function for mode transition forward among modes
  function transition(next, replace = false) {
    if (replace) {
      let newhistory = history.slice(0, -1).concat(next);

      setHistory(newhistory);

    } else {
      setHistory((prev) => [...prev, next]);

    }
    setMode(next);
  }

  //the function for mode transition backward among modes
  function back() {
    if (history.length === 0) {
      setMode(initial);
    }
    if (history.length > 1) {
      history.pop(); 
      setMode(history[history.length - 1]);
    }
  }

  //returning the object of the state management
  return { 
    mode,
    transition,
    back
  };
}