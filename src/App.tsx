import "./App.css";
import React from "react";

const initialState = {
  sessionSetLength: 25,
  timerCurrentMinutes: 25,
  timerCurrentSeconds: "00",
  breakLength: 5,
  timerRunning: false,
  sessionThanBreak: true,
  timerTitle: "Session",
  timerColor: { color: "black" },
};

//Tasks to do : break -> session currentminutes, color change
//reducer function and logic behind

function reducer(state: any, action: any) {
  switch (action.type) {
    //clicked play or stoppebutton, timer is running and counting
    //not sure if combination of case and if conditions is clear
    case "startTimer":
      state.sessionThanBreak
        ? (state.timerTitle = "Session is running")
        : (state.timerTitle = "Break is running");
      if (
        state.timerCurrentSeconds === 0 ||
        state.timerCurrentSeconds === "00"
      ) {
        return {
          ...state,
          timerCurrentMinutes: state.timerCurrentMinutes - 1,
          timerCurrentSeconds: 59,
        };
      } else if (state.timerCurrentSeconds < 11) {
        return {
          ...state,
          timerCurrentSeconds: "0" + (state.timerCurrentSeconds - 1).toString(),
        };
      } else {
        return {
          ...state,
          timerCurrentSeconds: state.timerCurrentSeconds - 1,
        };
      }

    //setting both sessions, current and set session, if and else condition is needed or case jumps to another case

    case "incrementAllSession":
      if (
        state.timerRunning === false &&
        state.timerCurrentSeconds != "00" &&
        state.sessionSetLength < 500
      ) {
        return {
          ...state,
          timerCurrentMinutes: state.timerCurrentMinutes + 1,
          sessionSetLength: state.timerCurrentMinutes + 1,
          timerCurrentSeconds: "00",
        };
      } else if (state.timerRunning === false && state.sessionSetLength < 500) {
        return {
          ...state,
          timerCurrentMinutes: state.timerCurrentMinutes + 1,
          sessionSetLength: state.sessionSetLength + 1,
        };
      } else {
        return { ...state };
      }
    case "decrementAllSession":
      if (
        state.timerRunning === false &&
        state.timerCurrentSeconds != "00" &&
        state.sessionSetLength > 1
      ) {
        return {
          ...state,
          timerCurrentMinutes: state.timerCurrentMinutes - 1,
          sessionSetLength: state.timerCurrentMinutes - 1,
          timerCurrentSeconds: "00",
        };
      } else if (state.timerRunning === false && state.sessionSetLength > 1) {
        return {
          ...state,
          timerCurrentMinutes: state.timerCurrentMinutes - 1,
          sessionSetLength: state.sessionSetLength - 1,
        };
      } else {
        return { ...state };
      }
    //setting breaklengths with sound

    case "incrementBreak":
      if (state.timerRunning === false && state.breakLength < 500) {
        return { ...state, breakLength: state.breakLength + 1 };
      } else {
        return { ...state };
      }
    case "decrementBreak":
      if (state.timerRunning === false && state.breakLength > 1) {
        return { ...state, breakLength: state.breakLength - 1 };
      } else {
        return { ...state };
      }
    //start or stop button

    case "startOrStop":
      if (state.timerRunning) {
        return {
          ...state,
          timerTitle: "Timer stopped",
          timerRunning: !state.timerRunning,
        };
      } else {
        return {
          ...state,
          timerTitle: "Timer is starting...",
          timerRunning: !state.timerRunning,
        };
      }

    case "reset":
      return {
        sessionSetLength: 25,
        timerCurrentMinutes: 25,
        timerCurrentSeconds: "00",
        breakLength: 5,
        timerRunning: false,
        timerTitle: "Clock restarted",
      };

    case "sessionFinished":
      return {
        ...state,
        timerTitle: "Break is running",
        timerCurrentMinutes: state.breakLength - 1,
        sessionThanBreak: false,
      };

    case "breakFinished":
      return {
        ...state,
        timerTitle: "Session is running",
        timerCurrentMinutes: state.sessionSetLength - 1,
        sessionThanBreak: true,
      };
    // case "changeTimerColor":
    //   return { ...state, timerColor: { color: "red" } };
    default:
      return state;
  }
  return {};
}

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  //These two functions means more code, but is recommended
  function incrementAllSession() {
    dispatch({ type: "incrementAllSession" });
  }

  function decrementAllSession() {
    dispatch({ type: "decrementAllSession" });
  }

  //beepSOund to play for break length

  const beepSound = new Audio(
    "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
  );

  React.useEffect(() => {
    if (state.timerRunning && state.timerCurrentMinutes >= 0) {
      let mySessionInterval = setInterval(() => {
        dispatch({ type: "startTimer" });
      }, 1000);

      // let myBreakInterval = setInterval(() => {
      //   console.log("beep");
      //
      // }, state.breakLength * 1000 * 60);

      return () => {
        clearInterval(mySessionInterval);
      };
    } else if (state.timerCurrentMinutes === -1) {
      beepSound.play();
      state.sessionThanBreak
        ? dispatch({ type: "sessionFinished" })
        : dispatch({ type: "breakFinished" });
    }
  }, [state.timerRunning, state.timerCurrentMinutes]);

  return (
    <main>
      <h2>25 + 5 Clock</h2>
      <div id="lengths">
        <div id="break-label">
          <div>Session Length</div>
          <div>
            <i
              className="bi bi-arrow-up icon-sm"
              id="break-increment"
              onClick={incrementAllSession}
            ></i>
            <div id="break-length">{state.sessionSetLength}</div>
            <i
              className="bi bi-arrow-down icon-sm"
              id="break-decrement"
              onClick={decrementAllSession}
            ></i>
          </div>
        </div>
        <div id="session-label">
          <div>Break Length</div>
          <div>
            <i
              className="bi bi-arrow-up icon-sm"
              id="session-increment"
              onClick={() => dispatch({ type: "incrementBreak" })}
            ></i>
            <div id="session-length">{state.breakLength}</div>
            <i
              className="bi bi-arrow-down icon-sm"
              id="session-decrement"
              onClick={() => dispatch({ type: "decrementBreak" })}
            ></i>
          </div>
        </div>
      </div>
      <div className="card border-dark mb-3" style={{ maxWidth: "18rem" }}>
        <div className="card-header" id="timer-label">
          {state.timerTitle}
        </div>
        <div className="card-body text-dark">
          <h1 className="card-title" id="time-left" style={state.timerColor}>
            {state.timerCurrentMinutes}:{state.timerCurrentSeconds}
          </h1>
        </div>
      </div>
      <div>
        <i
          className="bi bi-play-fill icon"
          id="start_stop"
          onClick={() => dispatch({ type: "startOrStop" })}
        ></i>
        <i
          className="bi bi-stop-fill icon"
          id="start_stop"
          onClick={() => dispatch({ type: "startOrStop" })}
        ></i>
        <i
          className="bi bi-arrow-repeat icon"
          id="reset"
          style={{ fontSize: "2.7em", marginLeft: "0.2em" }}
          onClick={() => dispatch({ type: "reset" })}
        ></i>
      </div>
    </main>
  );
}
