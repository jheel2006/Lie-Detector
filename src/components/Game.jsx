import { useState } from "react";
import "./Game.css";

const puzzles = {
    "2025-06-03": [
        {
            text: "Sharks can live up to 500 years.",
            isLie: true,
            explanation: "Greenland sharks live long, but not quite 500 years.",
        },
        {
            text: "Octopuses have three hearts.",
            isLie: false,
            explanation: "Two pump blood to the gills, one to the body.",
        },
        {
            text: "The Eiffel Tower grows in summer.",
            isLie: false,
            explanation: "Heat expands the metal, adding up to 6 inches.",
        },
        {
            text: "Wombat poop is cube-shaped.",
            isLie: false,
            explanation: "It helps prevent it from rolling away.",
        },
    ],
};

const today = new Date().toISOString().split("T")[0];
const todayPuzzle = puzzles[today] || [];

export default function Game() {
    const [selected, setSelected] = useState(null);
    const [revealed, setRevealed] = useState(false);

    function handleGuess(index) {
        if (revealed) return;
        setSelected(index);
        setTimeout(() => setRevealed(true), 300);
    }

    const formatDate = () => {
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        return new Date().toLocaleDateString("en-US", options);
    };

    return (
        <div className="game-container">
            <header className="header">
                <div className="header-inner">
                    <h1 className="title">The Lie Detector</h1>
                    <div className="date">{formatDate()}</div>
                    <div className="underline"></div>
                </div>
            </header>

            <main className="main-content">
                <div className="card">
                    <div className="card-inner">
                        <div className="subtitle-container">
                            <h2 className="subtitle">Daily Truth Challenge</h2>
                            <p className="subtitle-desc">
                                One of these four statements is false. Can you spot the lie among the truths?
                            </p>
                        </div>

                        <div className="options">
                            {todayPuzzle.map((fact, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleGuess(i)}
                                    disabled={revealed}
                                    className={`option-button ${revealed && i === selected ? "selected" : ""
                                        }`}
                                >
                                    <div className="option-content">
                                        <div className="option-text">{fact.text}</div>
                                        <div className="option-letter">{String.fromCharCode(65 + i)}</div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {revealed && (
                            <div className="results">
                                <h3 className="verdict-title">The Verdict</h3>
                                <div className="result-items">
                                    {todayPuzzle.map((fact, i) => (
                                        <div
                                            key={i}
                                            className={`result-item ${fact.isLie ? "lie" : "truth"}`}
                                            style={{ animationDelay: `${i * 200}ms` }}
                                        >
                                            <div className="result-inner">
                                                <div className="result-icon">{fact.isLie ? "❌" : "✅"}</div>
                                                <div className="result-text">
                                                    <p className="result-fact">{fact.text}</p>
                                                    <p className="result-explanation">{fact.explanation}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="play-again-container">
                                    <button onClick={() => { setSelected(null); setRevealed(false); }} className="play-again-button">
                                        Play Again
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <footer className="footer">
                    <p>A daily challenge of truth and deception</p>
                </footer>
            </main>
        </div>
    );
}
