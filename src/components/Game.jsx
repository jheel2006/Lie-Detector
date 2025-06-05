import { useState } from "react";
import { puzzles } from "../data/puzzles";
import "./Game.css";

const today = new Date().toISOString().split("T")[0];
const todayPuzzle = puzzles[today] || [];

export default function Game() {
    const [selected, setSelected] = useState(null);
    const [revealed, setRevealed] = useState(false);
    const [showDrumroll, setShowDrumroll] = useState(false);
    const [showResultPopup, setShowResultPopup] = useState(false);
    const [resultMessage, setResultMessage] = useState("");

    function handleGuess(index) {
        if (revealed || showDrumroll) return;
        setSelected(index);
        setShowDrumroll(true);

        setTimeout(() => {
            setShowDrumroll(false);
            setRevealed(true);

            const guessedCorrectly = todayPuzzle[index]?.isLie;
            setResultMessage(guessedCorrectly ? "🎉 Good job! You caught the lie!" : "😅 Better luck tomorrow.");
            setShowResultPopup(true);
        }, 2000); // 2s drumroll
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
                            <h2 className="subtitle">
                                {revealed ? "The Verdict" : "Daily Truth Challenge"}
                            </h2>
                            <p className="subtitle-desc">
                                {revealed
                                    ? "Here's what was true, and what wasn't."
                                    : "One of these four statements is false. Can you spot the lie among the truths?"}
                            </p>
                        </div>

                        {showDrumroll ? (
                            <div className="drumroll-text">Drumroll...</div>
                        ) : (
                            <div className="options">
                                {todayPuzzle.map((fact, i) => {
                                    const isSelected = i === selected;
                                    const showResult = revealed;
                                    const isLie = fact.isLie;

                                    return (
                                        <button
                                            key={i}
                                            onClick={() => handleGuess(i)}
                                            disabled={revealed || showDrumroll}
                                            className={`option-button ${isSelected ? "selected" : ""}`}
                                        >
                                            <div className="option-content">
                                                <div className="option-text">
                                                    {fact.text}
                                                    {showResult && (
                                                        <div className="option-explanation">{fact.explanation}</div>
                                                    )}
                                                </div>

                                                <div className="option-icon">
                                                    {showResult ? (
                                                        isLie ? (
                                                            <svg viewBox="0 0 24 24" className="icon-cross">
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M18.3 5.71a1 1 0 00-1.42 0L12 10.59 7.12 5.7a1 1 0 10-1.41 1.42L10.59 12l-4.88 4.88a1 1 0 101.41 1.41L12 13.41l4.88 4.88a1 1 0 001.41-1.41L13.41 12l4.88-4.88a1 1 0 000-1.41z"
                                                                />
                                                            </svg>
                                                        ) : (
                                                            <svg viewBox="0 0 24 24" className="icon-check">
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M9 16.17l-3.88-3.88a1 1 0 10-1.41 1.41l4.59 4.59a1 1 0 001.41 0l9.59-9.59a1 1 0 00-1.41-1.41L9 16.17z"
                                                                />
                                                            </svg>
                                                        )
                                                    ) : (
                                                        <div className="option-letter">{String.fromCharCode(65 + i)}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                <footer className="footer">
                    <p>A daily challenge of truth and deception</p>
                </footer>
            </main>

            {showResultPopup && (
                <div className="popup-overlay" onClick={() => setShowResultPopup(false)}>
                    <div className="popup" onClick={(e) => e.stopPropagation()}>
                        {/* Optional close X button */}
                        <button
                            className="popup-close-x"
                            onClick={() => setShowResultPopup(false)}
                            aria-label="Close"
                        >
                            ×
                        </button>

                        <div className="popup-content">
                            <div className={`popup-icon ${todayPuzzle[selected]?.isLie ? 'success' : 'failure'}`}>
                                {todayPuzzle[selected]?.isLie ? '🎉' : '😅'}
                            </div>

                            <h3 className="popup-title">
                                {todayPuzzle[selected]?.isLie ? 'Well Done!' : 'Nice Try!'}
                            </h3>

                            <p className="popup-message">
                                {todayPuzzle[selected]?.isLie
                                    ? 'You successfully spotted the lie! Your detective skills are sharp.'
                                    : 'That wasn\'t the lie, but don\'t give up! Come back tomorrow for a new challenge.'
                                }
                            </p>

                            <button
                                className={`popup-close ${todayPuzzle[selected]?.isLie ? 'success' : 'failure'}`}
                                onClick={() => setShowResultPopup(false)}
                            >
                                {todayPuzzle[selected]?.isLie ? 'Awesome!' : 'Try Again Tomorrow'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
