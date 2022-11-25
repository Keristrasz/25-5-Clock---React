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

//reducer function and logic behind

function reducer(state: any, action: any) {
  switch (action.type) {
      
    //for clicking Play/Stop Button -> timer is running and counting
      
    case "startTimer":

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

    //setting both Sessions, Current and setsession, if and else condition is needed or case jumps to another case

    //incrementBreaks, incrementSessions, decrementBreaks, decrementSessions are morelikely the same, logic behind: if session/break change also the timer change, if not, change only the session/break. Alternative is to use two cases on button click instead of one, would have save some rows, but adds one more case.
      
    case "incrementSession":
      if (state.sessionThanBreak) {
        if (
          state.timerRunning === false &&
          state.timerCurrentSeconds != "00" &&
          state.sessionSetLength < 500
        ) {
          return {
            ...state,
            timerCurrentMinutes: state.timerCurrentMinutes + 2,
            sessionSetLength: state.sessionSetLength + 1,
            timerCurrentSeconds: "00",
          };
        } else if (
          state.timerRunning === false &&
          state.sessionSetLength < 500
        ) {
          return {
            ...state,
            timerCurrentMinutes: state.timerCurrentMinutes + 1,
            sessionSetLength: state.sessionSetLength + 1,
          };
        } else {
          return { ...state };
        }
      } else {
        if (state.timerRunning === false && state.sessionSetLength < 500) {
          return {
            ...state,
            sessionSetLength: state.sessionSetLength + 1,
          };
        } else {
          return { ...state };
        }
      }

    case "decrementSession":
      if (state.sessionThanBreak) {
        if (
          state.timerRunning === false &&
          state.timerCurrentSeconds != "00" &&
          state.sessionSetLength > 1
        ) {
          return {
            ...state,
            timerCurrentMinutes: state.timerCurrentMinutes,
            sessionSetLength: state.sessionSetLength - 1,
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

      } else {
        if (state.timerRunning === false && state.sessionSetLength > 1) {
          return {
            ...state,
            sessionSetLength: state.sessionSetLength - 1,
          };
        } else {
          return { ...state };
        }
      }

    case "incrementBreak":

      if (state.sessionThanBreak === false) {
        if (
          state.timerRunning === false &&
          state.timerCurrentSeconds != "00" &&
          state.breakLength < 500
        ) {
          return {
            ...state,
            timerCurrentMinutes: state.timerCurrentMinutes + 2,
            breakLength: state.breakLength + 1,
            timerCurrentSeconds: "00",
          };
        } else if (state.timerRunning === false && state.breakLength < 500) {
          return {
            ...state,
            timerCurrentMinutes: state.timerCurrentMinutes + 1,
            breakLength: state.breakLength + 1,
          };
        } else {
          return { ...state };
        }

      } else {
        if (state.timerRunning === false && state.breakLength < 500) {
          return {
            ...state,
            breakLength: state.breakLength + 1,
          };
        } else {
          return { ...state };
        }
      }
    case "decrementBreak":
      if (state.sessionThanBreak === false) {
        if (
          state.timerRunning === false &&
          state.timerCurrentSeconds != "00" &&
          state.breakLength > 1
        ) {
          return {
            ...state,
            timerCurrentMinutes: state.timerCurrentMinutes,
            breakLength: state.breakLength - 1,
            timerCurrentSeconds: "00",
          };
        } else if (state.timerRunning === false && state.breakLength > 1) {
          return {
            ...state,
            timerCurrentMinutes: state.timerCurrentMinutes - 1,
            breakLength: state.breakLength - 1,
          };
        } else {
          return { ...state };
        }

      } else {
        if (state.timerRunning === false && state.breakLength > 1) {
          return {
            ...state,
            breakLength: state.breakLength - 1,
          };
        } else {
          return { ...state };
        }
      }
      
    //start or stop button for timer to run or stop

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

    //timer color changes, if timer is below 1 minute
      
    case "timerColorChange":
      if (state.timerCurrentMinutes === 0) {
        return { ...state, timerColor: { color: "red" } };
      } else {
        return { ...state, timerColor: { color: "black" } };
      }

    //timer title changes depends if its session or break

    case "sessionOrBrake?":
      if (state.sessionThanBreak) {
        return { ...state, timerTitle: "Session is running" };
      } else {
        return { ...state, timerTitle: "Break is running" };
      }

    //reset to change everything to initialState

    case "reset":
      return {
        sessionSetLength: 25,
        timerCurrentMinutes: 25,
        timerCurrentSeconds: "00",
        breakLength: 5,
        timerRunning: false,
        sessionThanBreak: true,
        timerTitle: "Session",
        timerColor: { color: "black" },

      };

    //if session or break is finished -> change to break or session

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

  //These two functions are another method how to pass dispatch into html code below
  
  function incrementSession() {
    dispatch({ type: "incrementSession" });
  }

  function decrementSession() {
    dispatch({ type: "decrementSession" });
  }

  //beepSound to play when break or session finishes

  const beepSound = new Audio(
    "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
  );

  //useEffect for re-rendering every second or sound beep

  React.useEffect(() => {
    if (state.timerRunning && state.timerCurrentMinutes >= 0) {
      let mySessionInterval = setInterval(() => {
        dispatch({ type: "startTimer" });
        dispatch({ type: "timerColorChange" });
        dispatch({ type: "sessionOrBrake?" });
      }, 1000);


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
          <div className="d-flex align-items-center">
            <i
              className="bi bi-arrow-up icon-sm"
              id="break-increment"
              onClick={incrementSession}
            ></i>
            <div id="break-length">{state.sessionSetLength}</div>
            <i
              className="bi bi-arrow-down icon-sm"
              id="break-decrement"
              onClick={decrementSession}
            ></i>
          </div>
        </div>
        <div id="session-label">
          <div>Break Length</div>
          <div className="d-flex align-items-center">
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
