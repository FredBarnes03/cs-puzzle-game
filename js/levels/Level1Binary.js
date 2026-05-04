// ── LEVEL 1 - BINARY TO DECIMAL QUESTIONS ───────────────
function generateBinaryQuestions(count = 7) {
  const questions = [];
  const used = new Set();

  while (questions.length < count) {
    // random number between 1–31 (avoid 0 for simplicity)
    const max = questions.length < 3 ? 15 : 63; // harder later
    const num = Math.floor(Math.random() * max) + 1;

    if (used.has(num)) continue;
    used.add(num);

    const binary = num.toString(2);

    // build explanation dynamically
    const bits = binary.split("").reverse();
    const explanationParts = bits.map((bit, i) => {
      const value = 2 ** i;
      return `${bit}×${value}`;
    });

    questions.push({
      binary,
      answer: num,
      explanation: `${binary} = ${explanationParts.reverse().join(" + ")} = ${num}`
    });
  }

  return questions;
}

// ── LEVEL 1 – BINARY TO DECIMAL ───────────────
function Level1({ onComplete, onBack, onAchievement }) {
  const [started, setStarted] = useState(false);
  const [questions] = useState(() => generateBinaryQuestions(7));
  const [qIdx, setQIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [done, setDone] = useState(false);
  const [firstCorrect, setFirstCorrect] = useState(false);

  const q = questions[qIdx];
  const progress = (qIdx / questions.length) * 100;

  if (!started) {
    return (
      <div className="screen">
        <div className="victory-card">
          <div className="victory-title">BINARY → DECIMAL</div>

          <div style={{ color: "var(--text-dim)", marginBottom: 16 }}>
            Learn how computers convert binary numbers into decimal.
          </div>

          <div className="info-box" style={{ textAlign: "left" }}>
            <strong>How it works:</strong>
            <br /><br />
            Each position represents a power of 2:
            <br />
            <span style={{ color: "var(--accent)" }}>
              8 &nbsp;&nbsp; 4 &nbsp;&nbsp; 2 &nbsp;&nbsp; 1
            </span>
            <br /><br />
            Multiply each bit by its value, then add:
            <br /><br />
            <span style={{ color: "var(--accent3)" }}>
              1010 = 1×8 + 0×4 + 1×2 + 0×1 = 10
            </span>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => setStarted(true)}
          >
            Start Level →
          </button>
        </div>
      </div>
    );
  }

  function checkAnswer() {
    if (answered) return;

    const userValue = Number(answer.trim());
    const correct = userValue === q.answer;

    setAnswered(true);
    playSound(correct ? "correct" : "wrong");

    if (correct) {
      setScore(s => s + 100);

      if (!firstCorrect) {
        setFirstCorrect(true);
        if (onAchievement) onAchievement("first_blood");
      }
    } else {
      setMistakes(m => m + 1);
    }
  }

  function next() {
    if (qIdx + 1 >= questions.length) {
      setDone(true);
    } else {
      setQIdx(i => i + 1);
      setAnswer("");
      setAnswered(false);
    }
  }

  if (done) {
    const stars = score >= 500 ? "⭐⭐⭐" : score >= 300 ? "⭐⭐" : "⭐";

    return (
      <div className="screen">
        <div className="victory-card">
          <div className="victory-title">LEVEL COMPLETE!</div>
          <div className="stars">{stars}</div>
          <div style={{ color: "var(--text-dim)", marginBottom: 8 }}>
            Binary conversion mastered
          </div>
          <div className="victory-score">{score} pts</div>
          <div style={{ color: "var(--text-dim)", fontSize: "0.8rem", marginBottom: 24 }}>
            You converted binary values into decimal numbers.
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button className="btn btn-ghost" onClick={onBack}>
              ← Menu
            </button>
            <button
              className="btn btn-primary"
              onClick={() => onComplete(score, mistakes)}
            >
              Next Level →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-screen">
      <div className="game-header">
        <button
          className="btn btn-ghost"
          style={{ padding: "6px 12px", fontSize: "0.7rem" }}
          onClick={onBack}
        >
          ← Back
        </button>
        <div className="level-tag">LEVEL 1</div>
        <div className="game-title">Binary to Decimal</div>
        <div className="score-display">{score} pts</div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="info-box">
        Question {qIdx + 1} of {questions.length} — Convert this binary number into decimal.
      </div>

      <div className="code-block" style={{ textAlign: "center" }}>
        <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginBottom: 12 }}>
          Binary
        </div>
        <div style={{ fontSize: "3rem", color: "var(--accent)", letterSpacing: 8 }}>
          {q.binary}
        </div>
        <div style={{ marginTop: 14, fontSize: "0.8rem", color: "var(--text-dim)" }}>
          Use place values: 8, 4, 2, 1 for 4-bit numbers.
        </div>
      </div>

      <div className="hint-text">
        💡 Example: 1010 = 1×8 + 0×4 + 1×2 + 0×1 = 10
      </div>

      <div className="adventure-input-row">
        <span className="adventure-prompt">decimal&gt;</span>
        <input
          className="adventure-input"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && answer.trim() && !answered) {
              checkAnswer();
            }
          }}
          placeholder="type decimal answer..."
          disabled={answered}
          autoFocus
        />
      </div>

      {!answered && (
        <button className="btn btn-primary" onClick={checkAnswer} style={{ alignSelf: "flex-start" }}>
          Check Answer
        </button>
      )}

      {answered && (
        <>
          <div className={`feedback-box ${Number(answer.trim()) === q.answer ? "correct" : "wrong"}`}>
            <strong>
              {Number(answer.trim()) === q.answer ? "✅ Correct!" : `❌ Not quite — answer was ${q.answer}`}
            </strong>
            <br />
            {q.explanation}
          </div>

          <button className="btn btn-primary" onClick={next} style={{ alignSelf: "flex-end" }}>
            {qIdx + 1 >= questions.length ? "See Results →" : "Next →"}
          </button>
        </>
      )}
    </div>
  );
}