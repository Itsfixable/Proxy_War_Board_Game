import React from "react";
import { motion, AnimatePresence } from "motion/react";
import usFlag from "./assets/flags/us.png";
import northFlag from "./assets/flags/northVietnam.png";
import southFlag from "./assets/flags/southVietnam.png";

function App() {
  const roles = {
    // Each role has a name, flag, and goal that reflects their perspective in the war
    us: {
      name: "United States",
      flag: usFlag,
      goal: "Stop communism while keeping public support.",

    },
    north: {
      name: "North Vietnam",
      flag: northFlag,
      goal: "Unify Vietnam through nationalism and resistance.",

    },
    south: {
      name: "South Vietnam",
      flag: southFlag,
      goal: "Survive political instability and foreign pressure.",

    }
  };

  const events = [
    // Each event has a title, description, historical meaning, and two choices with different effects on the three stats
    {
      title: "French Withdrawal",
      text: "Vietnam leaves French colonial rule, but the country becomes divided.",
      meaning:
        "This shows the war began with decolonization and nationalism, not only Cold War ideology.",
      choice1: "Focus on independence",
      effect1: [1, 0, 2],
      choice2: "Treat it as a Cold War battlefield",
      effect2: [-1, 1, -1]
    },

    {
      title: "Gulf of Tonkin Incident",
      text:
        "Reports of attacks on U.S. ships increase pressure for military action.",
      meaning:
        "Escalation helps military power short-term but hurts public trust.",
      choice1: "Escalate the war",
      effect1: [-1, 2, -2],
      choice2: "Seek diplomacy",
      effect2: [1, -1, 1]
    },

    {
      title: "U.S. Escalation",
      text:
        "The United States sends more troops and increases bombing campaigns.",
      meaning:
        "Military power alone cannot defeat nationalism or instability.",
      choice1: "Increase bombing",
      effect1: [-2, 2, -2],
      choice2: "Win civilian trust",
      effect2: [1, 0, 2]
    },

    {
      title: "Tet Offensive",
      text:
        "North Vietnam launches surprise attacks across South Vietnam.",
      meaning:
        "Even military strength cannot survive without public confidence.",
      choice1: "Keep fighting aggressively",
      effect1: [-1, 1, -3],
      choice2: "Rethink strategy",
      effect2: [0, -1, 2]
    },

    {
      title: "Anti-War Movement",
      text:
        "Protests grow as Americans question the cost and purpose of the war.",
      meaning:
        "Public opinion becomes a major factor in the war’s outcome.",
      choice1: "Ignore protests",
      effect1: [-1, 1, -3],
      choice2: "Respond to public concerns",
      effect2: [1, -1, 2]
    },

    {
      title: "Vietnamization",
      text:
        "The U.S. begins shifting responsibility to South Vietnamese forces.",
      meaning:
        "Long-term success depends on local stability and legitimacy.",
      choice1: "Withdraw rapidly",
      effect1: [-2, -1, 2],
      choice2: "Transition gradually",
      effect2: [1, 0, 1]
    },

    {
      title: "Fall of Saigon",
      text:
        "North Vietnam captures Saigon in 1975, ending the war.",
      meaning:
        "The final outcome shows nationalism and public support mattered deeply.",
      choice1: "See it mainly as a proxy war",
      effect1: [0, 1, -1],
      choice2: "See both proxy war and nationalism",
      effect2: [1, 0, 3]
    }
  ];

  //timeline of events
  const timeline = [
    "French Withdrawal",
    "Gulf of Tonkin",
    "U.S. Escalation",
    "Tet Offensive",
    "Anti-War Movement",
    "Vietnamization",
    "Fall of Saigon"
  ];


  //sets the initial state for the role, round, and the three stats that players must balance to succeed in the game
  const [role, setRole] = React.useState("");
  const [round, setRound] = React.useState(0);

  // The three stats represent different factors that influenced the war’s outcome. Players must balance them to succeed.
  const [stability, setStability] = React.useState(10);
  const [military, setMilitary] = React.useState(10);
  const [support, setSupport] = React.useState(10);

  //checks if the game is done to show the final results and reflection questions

  const [done, setDone] = React.useState(false);

  //makes sure the number stays between 0 and 20 to keep the game balanced and prevent extreme outcomes
  function keepInRange(number) {
    if (number < 0) return 0;
    if (number > 20) return 20;
    return number;
  }

  // When a player picks a choice, the effects of that choice are applied to the three stats. Then it moves to the next round or ends the game if it was the last event.
  function pickChoice(effect) {
    setStability(keepInRange(stability + effect[0]));
    setMilitary(keepInRange(military + effect[1]));
    setSupport(keepInRange(support + effect[2]));

    //checks if the current round is the last one in the events array. If it is, it sets the done state to true, which will trigger the display of the final results and reflection questions. If it's not the last round, it increments the round state by 1 to move to the next event.
    if (round === events.length - 1) {
      setDone(true);
    } else {
      setRound(round + 1);
    }
  }

  //resets all the states to their initial values, allowing the player to start a new game with a clean slate. This function is called when the player clicks the "Play Again" button at the end of the game.
  function restart() {
    setRole("");
    setRound(0);

    setStability(10);
    setMilitary(10);
    setSupport(10);

    setDone(false);
  }

  //algorithim to determine the final outcome based on the three stats. It calculates a final score that weights public support more heavily, and then uses conditional statements to determine which ending title and text to display based on the values of the three stats. This allows for multiple possible endings that reflect different strategies and outcomes in the Vietnam War simulation.
  const finalScore = stability + military + support * 2;

  //placeholders for the ending title and text that will be determined by the player's final stats
  let endingTitle = "";
  let endingText = "";

  //conditional statements to determine the ending based on the player's final stats. Each condition checks for different combinations of military success, public support, and stability to reflect different historical interpretations of the Vietnam War's outcome.
  if (military >= 14 && support <= 8) {
    endingTitle = "Military Power Was Not Enough";
    endingText =
      "Your choices focused heavily on military success, but public support dropped too low. This shows that the Vietnam War could not be won through force alone.";
  } else if (support >= 15 && military <= 13) {
    endingTitle = "Nationalism Changed the War";
    endingText =
      "Your choices showed that public support, nationalism, and local conditions were more important than military power alone.";
  } else if (military >= 14 && stability >= 12 && support >= 10) {
    endingTitle = "Cold War Escalation";
    endingText =
      "Your decisions reflected the Cold War struggle to contain communism, but the war still depended on stability and public opinion.";
  } else if (stability >= 12 && military >= 12 && support >= 12) {
    endingTitle = "Balanced Strategy";
    endingText =
      "Your strategy recognized that the Vietnam War was shaped by both Cold War proxy conflict and Vietnamese nationalism.";
  } else {
    endingTitle = "Unstable Outcome";
    endingText =
      "Your choices created mixed results. This shows how complicated the Vietnam War was because military, political, and public support factors all mattered.";
  }

  //sets the current event based on the round number, which will be used to display the event's title, text, meaning, and choices in the game interface. This allows the game to progress through the timeline of events in a structured way as the player makes decisions.
  const event = events[round];

  return (
    <div className="app">
      <motion.header
        className="hero"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        {/* <!--title/top header--> */}
        <p className="badge">AP WORLD HISTORY UNITS 8–9</p>
      {/* <!--Big title--> */}
        <h1>Vietnam War Board Game</h1>
      {/* <!--sub title--> */}
        <p className="subtitle">
          A digital board game showing how the Vietnam War was shaped by
          both Cold War proxy conflict and Vietnamese nationalism.
        </p>
      </motion.header>

      <AnimatePresence mode="wait">
        {/* <!--only displays when no role has been selected because !role is going to be true and the (...) is truthy--> */}
        {!role && (
          <motion.section
            className="roles"
            key="roles"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35 }}
          >
            {/* <!--maps through the roles object and creates a card for each role--> */}
            {Object.keys(roles).map(function (key, index) {
              return (
                <motion.div
                  className="card role"
                  onClick={() => setRole(key)}
                  key={key}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.1
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.03
                  }}
                  whileTap={{
                    scale: 0.97
                  }}
                >
                  <div className="flag"><img src={roles[key].flag} /></div>

                  <h2 className="role-name">{roles[key].name}</h2>

                  <p className="role-goal">{roles[key].goal}</p>
                </motion.div>
              );
            })}
          </motion.section>
        )}

        {/* <!--only displays when a role has been selected and the game is not done, os the main game function--> */}
        {role && !done && (
          <motion.section
            className="game"
            key="game"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35 }}
          >
            <motion.aside
              className="card scoreBox"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* <!--Displays the selected role's name and flag--> */}
              <h2 className="roleTitle">
                <img
                  src={roles[role].flag}
                  className="smallFlag"
                />

                {roles[role].name}
              </h2>
              {/* <!--Displays the scores--> */}
              <Score
                title="Stability"
                value={stability}
                color="green"
              />

              <Score
                title="Military Success"
                value={military}
                color="blue"
              />

              <Score
                title="Public Support"
                value={support}
                color="yellow"
              />
              
              <p className="note">
                Public Support counts double at the end because the
                simulation proves military power alone was not enough.
              </p>
            </motion.aside>

            <main>
              {/* <!--Displays the game board--> */}
              <div className="board">
                {/* <!--maps through the timeline array and creates a space for each item--> */}
                {timeline.map(function (space, index) {
                  return (
                    <motion.div
                    // dictates that if the index of the current space matches the round number, it will have the class "space active" to visually indicate the current event on the timeline. Otherwise, it will just have the class "space". This helps players keep track of their progress through the events of the Vietnam War as they make their choices.
                      className={
                        index === round ? "space active" : "space"
                      }
                      key={space}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{
                        opacity: 1,
                        scale: index === round ? 1.05 : 1
                      }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.04
                      }}
                    >
                      {space}
                      {/* adds a star token to indicate the current space */}
                      {index === round && (
                        <motion.div
                          className="token"
                          layoutId="player-token"
                          initial={{ scale: 0.7, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                          }}
                        >
                          ★
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  className="card event"
                  key={round}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -28 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* sets the round number */}
                  <p className="badge">
                    ROUND {round + 1} OF {events.length}
                  </p>
                  {/* sets the event title */}
                  <h2>{event.title}</h2>
                  {/* sets the prompt */}
                  <p>{event.text}</p>
                  {/* shows the meaning of this event */}
                  <p className="meaning">{event.meaning}</p>

                  {/* adds the choice buttons and provides logic for th effects. effects are added through the effect Arrays */}
                  <div className="buttons">
                    <motion.button
                      onClick={() => pickChoice(event.effect1)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      {event.choice1}
                    </motion.button>

                    <motion.button
                      className="secondary"
                      onClick={() => pickChoice(event.effect2)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      {event.choice2}
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </main>
          </motion.section>
        )}

        {/* checks if the game is done */}
        {done && (
          <motion.section
            className="card endingCard"
            key="ending"
            initial={{ opacity: 0, y: 35, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{
              duration: 0.45,
              type: "spring",
              stiffness: 160,
              damping: 18
            }}
          >
            <p className="badge">FINAL RESULTS</p>
            {/* displays the ending title */}
            <h2>{endingTitle}</h2>

            <motion.p
              className="finalScore"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.15,
                type: "spring",
                stiffness: 220,
                damping: 12
              }}
            >
              Final Score: {finalScore}
            </motion.p>

            <div className="endingStats">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <span>Stability</span>
                <strong>{stability}/20</strong>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <span>Military</span>
                <strong>{military}/20</strong>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <span>Public Support</span>
                <strong>{support}/20</strong>
              </motion.div>
            </div>

            <p className="endingText">{endingText}</p>
            {/* displays the ending text and overall meaning */}
            <p>
              Overall, the simulation shows that the Vietnam War was not only a
              Cold War proxy conflict. Public support, nationalism, and local
              stability were also extremely important in shaping the outcome.
            </p>

            <h3>Reflection Questions</h3>

            <ol>
              <li>Did military power guarantee success?</li>
              <li>How did public support affect your result?</li>
              <li>Was the Vietnam War only about Cold War ideology?</li>
              <li>How did nationalism shape the outcome?</li>
            </ol>
            {/* restart button */}
            <motion.button
              onClick={restart}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Play Again
            </motion.button>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

// The Score component is a reusable component that displays a score bar for each of the three stats (stability, military success, and public support). It takes in props for the title of the stat, its current value, and a color to visually differentiate the bars. The width of the filled portion of the bar is calculated based on the value, allowing players to easily see how their choices are affecting each stat throughout the game.
function Score(props) {
  return (
    <div>
      <div className="scoreName">
        <span>{props.title}</span>

        <span>{props.value}/20</span>
      </div>

      <div className="bar">
        <motion.div
          className={"fill " + props.color}
          initial={{ width: 0 }}
          animate={{
            width: props.value * 5 + "%"
          }}
          transition={{
            duration: 0.45,
            ease: "easeOut"
          }}
        ></motion.div>
      </div>
    </div>
  );
}

export default App;