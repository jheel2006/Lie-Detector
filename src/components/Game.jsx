import { useState } from "react";
import { puzzles } from "../data/puzzles";
import "./Game.css";

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
                            <h2 className="subtitle">{revealed ? "The Verdict" : "Daily Truth Challenge"}</h2>
                            <p className="subtitle-desc">
                                {revealed
                                    ? "Here's what was true, and what wasn't."
                                    : "One of these four statements is false. Can you spot the lie among the truths?"}
                            </p>
                        </div>

                        <div className="options">
                            {todayPuzzle.map((fact, i) => {
                                const isSelected = i === selected;
                                const showResult = revealed;
                                const isLie = fact.isLie;

                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleGuess(i)}
                                        disabled={revealed}
                                        className={`option-button ${isSelected ? "selected" : ""}`}
                                    >
                                        <div className="option-content">
                                            <div className="option-text">{fact.text}</div>
                                            <div className="option-letter">{String.fromCharCode(65 + i)}</div>
                                        </div>

                                        {showResult && (
                                            <div className="option-feedback">
                                                <div className="verdict-icon">
                                                    {isLie ? "❌ Lie" : "✅ Truth"}
                                                </div>
                                                <p className="option-explanation">{fact.explanation}</p>
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {revealed && (
                            <div className="play-again-container">
                                <button onClick={() => { setSelected(null); setRevealed(false); }} className="play-again-button">
                                    Play Again
                                </button>
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
