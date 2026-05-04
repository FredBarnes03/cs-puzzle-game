// ── LEVEL 3 – LOGIC GATES ─────────────────────
// ── GATE DATA ─────────────────────────────────
const GATE_DATA = [
  {
    id: "AND",
    name: "AND gate",
    inputs: 2,
    desc: "The AND gate outputs 1 only when ALL inputs are 1. Think of it like two switches in series — both must be on for the light to work.",
    fn: (a, b) => a & b,
    realWorld: "🔒 Real-world example: A security door that requires both a keycard AND a PIN — both must be correct.",
  },
  {
    id: "OR",
    name: "OR gate",
    inputs: 2,
    desc: "The OR gate outputs 1 when ANY input is 1. Like two switches in parallel — either one being on powers the light.",
    fn: (a, b) => a | b,
    realWorld: "🚨 Real-world example: A fire alarm triggered by a smoke sensor OR a heat sensor — either one sets it off.",
  },
  {
    id: "NOT",
    name: "NOT gate (inverter)",
    inputs: 1,
    desc: "The NOT gate flips the input. If A is 1, output is 0. If A is 0, output is 1. It has only one input.",
    fn: (a) => (a === 1 ? 0 : 1),
    realWorld: "💡 Real-world example: A night light — when the sensor detects daylight (1), the NOT gate outputs 0 to keep the light off.",
  },
  {
    id: "NAND",
    name: "NAND gate",
    inputs: 2,
    desc: "NAND = NOT AND. Outputs 0 only when ALL inputs are 1, and 1 for everything else. NAND is universal — any logic circuit can be built from NAND gates alone.",
    fn: (a, b) => ((a & b) === 1 ? 0 : 1),
    realWorld: "🏭 Real-world example: Used in RAM and Flash memory chips — NAND flash is what powers USB drives and SSDs.",
  },
  {
    id: "NOR",
    name: "NOR gate",
    inputs: 2,
    desc: "NOR = NOT OR. Outputs 1 only when ALL inputs are 0. Like NAND, NOR is also universal and can build any circuit on its own.",
    fn: (a, b) => ((a | b) === 1 ? 0 : 1),
    realWorld: "🌐 Real-world example: Early internet routers used NOR-based logic. Also used in first-generation space computers.",
  },
  {
    id: "XOR",
    name: "XOR gate (exclusive OR)",
    inputs: 2,
    desc: "XOR outputs 1 only when inputs are DIFFERENT. If both are the same (both 0 or both 1), output is 0. Essential in arithmetic circuits.",
    fn: (a, b) => a ^ b,
    realWorld: "➕ Real-world example: XOR gates form the core of binary adders in CPUs — adding two bits uses exactly one XOR gate and one AND gate.",
  },
];
 
// ── HELPERS ───────────────────────────────────
function computeGateValue(id, a, b) {
  switch (id) {
    case "AND":  return a & b;
    case "OR":   return a | b;
    case "NOT":  return a === 1 ? 0 : 1;
    case "XOR":  return a ^ b;
    case "NAND": return (a & b) === 1 ? 0 : 1;
    case "NOR":  return (a | b) === 1 ? 0 : 1;
    default:     return 0;
  }
}
 
function getTruthRows(gate) {
  if (gate.inputs === 1)
    return [[0, gate.fn(0)], [1, gate.fn(1)]];
  return [
    [0, 0, gate.fn(0, 0)],
    [0, 1, gate.fn(0, 1)],
    [1, 0, gate.fn(1, 0)],
    [1, 1, gate.fn(1, 1)],
  ];
}
 
// ── SVG GATE BODY PATH ────────────────────────
function gateBodyPath(id, gx, gy, gw, gh, cx, cy) {
  if (id === "AND" || id === "NAND")
    return `M ${gx} ${gy} L ${gx} ${gy+gh} L ${gx+gw/2} ${gy+gh} A ${gh/2} ${gh/2} 0 0 0 ${gx+gw/2} ${gy} Z`;
  if (id === "OR" || id === "NOR")
    return `M ${gx} ${gy} Q ${gx+gw*0.3} ${cy} ${gx} ${gy+gh} Q ${gx+gw*0.7} ${gy+gh} ${gx+gw} ${cy} Q ${gx+gw*0.7} ${gy} ${gx} ${gy}`;
  if (id === "XOR")
    return `M ${gx+10} ${gy} Q ${gx+gw*0.3+10} ${cy} ${gx+10} ${gy+gh} Q ${gx+gw*0.7+10} ${gy+gh} ${gx+gw+10} ${cy} Q ${gx+gw*0.7+10} ${gy} ${gx+10} ${gy}`;
  if (id === "NOT")
    return `M ${gx+10} ${gy} L ${gx+gw-10} ${cy} L ${gx+10} ${gy+gh} Z`;
  return "";
}
 
// ── CHALLENGE PUZZLES — 15 total ──────────────
 
const VERIFIED_PUZZLES = [
 
  // ── TIER 1: Single gate — find the output (3 questions) ──
  {
    tier: 1, label: "Easy",
    type: "output", gate1: "AND",
    a: 0, b: 1, answer: 0,
    desc: "A = 0, B = 1  →  AND gate  →  output?",
    explain: "AND only outputs 1 when BOTH inputs are 1. A = 0, so output = 0 regardless of B.",
  },
  {
    tier: 1, label: "Easy",
    type: "output", gate1: "NAND",
    a: 1, b: 0, answer: 1,
    desc: "A = 1, B = 0  →  NAND gate  →  output?",
    explain: "NAND = NOT AND. AND(1,0) = 0, then NOT flips it to 1. NAND only outputs 0 when BOTH inputs are 1 — here B = 0 so output = 1.",
  },
  {
    tier: 1, label: "Easy",
    type: "output", gate1: "XOR",
    a: 0, b: 1, answer: 1,
    desc: "A = 0, B = 1  →  XOR gate  →  output?",
    explain: "XOR outputs 1 only when inputs are DIFFERENT. A = 0 and B = 1 are different, so output = 1.",
  },
 
  // ── TIER 2: Two-gate chain — find the final output (4 questions) ──
  {
    tier: 2, label: "Medium",
    type: "output", gate1: "AND", gate2: "NOT",
    a: 1, b: 1, answer: 0,
    desc: "A = 1, B = 1  →  AND  →  NOT  →  output?",
    explain: "Step 1: AND(1,1) = 1.  Step 2: NOT(1) = 0.  Final = 0.  AND followed by NOT is exactly what a NAND gate does.",
  },
  {
    tier: 2, label: "Medium",
    type: "output", gate1: "XOR", gate2: "NOT",
    a: 1, b: 0, answer: 0,
    desc: "A = 1, B = 0  →  XOR  →  NOT  →  output?",
    explain: "Step 1: XOR(1,0) = 1 (inputs are different).  Step 2: NOT(1) = 0.  Final = 0.",
  },
  {
    tier: 2, label: "Medium",
    type: "output", gate1: "OR", gate2: "AND",
    a: 1, b: 0, cInput: 1, answer: 1,
    desc: "A = 1, B = 0  →  OR  →  then AND with C = 1  →  output?",
    explain: "Step 1: OR(1,0) = 1 (at least one input is 1).  Step 2: AND(1,1) = 1.  Final = 1.",
  },
  {
    tier: 2, label: "Medium",
    type: "output", gate1: "NAND", gate2: "OR",
    a: 0, b: 0, cInput: 0, answer: 1,
    desc: "A = 0, B = 0  →  NAND  →  then OR with C = 0  →  output?",
    explain: "Step 1: NAND(0,0) = 1 (not both 1, so NAND gives 1).  Step 2: OR(1,0) = 1.  Final = 1.",
  },
 
  // ── TIER 3: Three-gate chain — find the final output (3 questions) ──
  {
    tier: 3, label: "Hard",
    type: "output", gate1: "AND", gate2: "OR", gate3: "XOR",
    a: 1, b: 0, cInput: 1, answer: 0,
    desc: "A=1, B=0 → AND → OR with C=1 → XOR with D=1 → output?",
    explain: "Step 1: AND(1,0)=0.  Step 2: OR(0,1)=1.  Step 3: XOR(1,1)=0 (same inputs).  Final = 0.",
  },
  {
    tier: 3, label: "Hard",
    type: "output", gate1: "NOR", gate2: "AND", gate3: "XOR",
    a: 0, b: 0, cInput: 1, answer: 0,
    desc: "A=0, B=0 → NOR → AND with C=1 → XOR with D=1 → output?",
    explain: "Step 1: NOR(0,0)=1 (both inputs 0, so NOR gives 1).  Step 2: AND(1,1)=1.  Step 3: XOR(1,1)=0 (same inputs).  Final = 0.",
  },
  {
    tier: 3, label: "Hard",
    type: "output", gate1: "NAND", gate2: "XOR", gate3: "AND",
    a: 1, b: 1, cInput: 1, answer: 1,
    desc: "A=1, B=1 → NAND → XOR with C=1 → AND with D=1 → output?",
    explain: "Step 1: NAND(1,1)=0.  Step 2: XOR(0,1)=1 (inputs differ).  Step 3: AND(1,1)=1.  Final = 1.",
  },
 
  // ── TIER 4: Identify the missing gate — output shown (3 questions) ──
  {
    tier: 4, label: "Hard",
    type: "identify",
    a: 1, b: 1, target: 1,
    answer: "OR",
    options: ["XOR", "NOR", "OR", "NAND"],
    desc: "A = 1, B = 1  →  ???  →  output = 1.  Which gate?",
    explain: "XOR(1,1)=0 ✗  NOR(1,1)=0 ✗  NAND(1,1)=0 ✗  OR(1,1)=1 ✓.  OR is the only gate in this list that outputs 1 when both inputs are 1.",
  },
  {
    tier: 4, label: "Hard",
    type: "identify",
    a: 0, b: 0, target: 1,
    answer: "NOR",
    options: ["AND", "OR", "XOR", "NOR"],
    desc: "A = 0, B = 0  →  ???  →  output = 1.  Which gate?",
    explain: "AND(0,0)=0 ✗  OR(0,0)=0 ✗  XOR(0,0)=0 ✗  NOR(0,0)=1 ✓.  NOR outputs 1 only when ALL inputs are 0.",
  },
  {
    tier: 4, label: "Hard",
    type: "identify",
    a: 0, b: 1, target: 0,
    answer: "AND",
    options: ["OR", "AND", "NAND", "XOR"],
    desc: "A = 0, B = 1  →  ???  →  output = 0.  Which gate?",
    explain: "OR(0,1)=1 ✗  XOR(0,1)=1 ✗  NAND(0,1)=1 ✗  AND(0,1)=0 ✓.  AND needs BOTH inputs to be 1 — since A = 0, output is always 0.",
  },
 
  // ── TIER 5: Identify missing gate in a chain — work backwards (2 questions) ──
  {
    tier: 5, label: "Expert",
    type: "identify_chain",
    gate2: "NOT",
    a: 1, b: 1, target: 1,
    answer: "NAND",
    options: ["AND", "NAND", "OR"],
    desc: "A=1, B=1 → ??? → NOT → final output = 1.  Which gate fills ???",
    explain: "Work backwards: NOT gives 1 only when its input is 0.  So gate 1 must output 0.  AND(1,1)=1 ✗  OR(1,1)=1 ✗  NAND(1,1)=0 ✓.  Only NAND gives 0 when both inputs are 1.",
  },
  {
    tier: 5, label: "Expert",
    type: "identify_chain",
    gate2: "NOT",
    a: 0, b: 1, target: 0,
    answer: "OR",
    options: ["AND", "NOR", "OR"],
    desc: "A=0, B=1 → ??? → NOT → final output = 0.  Which gate fills ???",
    explain: "Work backwards: NOT gives 0 only when its input is 1.  So gate 1 must output 1.  AND(0,1)=0 ✗  NOR(0,1)=0 ✗  OR(0,1)=1 ✓.  OR outputs 1 whenever at least one input is 1.",
  },
];
 
// SVG COMPONENTS
const WIRE_ON      = "#1D9E75";
const WIRE_OFF     = "#A32D2D";
const WIRE_NEUTRAL = "#6a7a9a";
const WIRE_Q       = "#378ADD";
const wireColor = (v) => (v === 1 ? WIRE_ON : WIRE_OFF);
 
// ── Practice mode: interactive diagram with clickable input circles ──
function GateDiagram({ gateId, inputA, inputB, output, onToggleA, onToggleB }) {
  const isSingle = gateId === "NOT";
  const bubble   = gateId === "NAND" || gateId === "NOR";
  const isXOR    = gateId === "XOR";
  const cx = 340, cy = 70, gw = 80, gh = 60;
  const gx = cx - gw/2, gy = cy - gh/2;
  const midA = isSingle ? cy : cy - 18;
  const midB = cy + 18;
  const bodyPath = gateBodyPath(gateId, gx, gy, gw, gh, cx, cy);
  const outX = gx + gw + (bubble ? 10 : 0) + (gateId === "NOT" ? 3 : 0);
 
  const [pulseKey, setPulseKey] = React.useState(0);
  React.useEffect(() => { setPulseKey(k => k + 1); }, [output]);
  const [showHint, setShowHint] = React.useState(true);
  React.useEffect(() => { const t = setTimeout(() => setShowHint(false), 3000); return () => clearTimeout(t); }, []);
 
  return (
    <>
      <style>{`
        @keyframes outputPulse { 0%{r:6;opacity:1} 40%{r:11;opacity:0.5} 100%{r:6;opacity:1} }
        .output-pulse { animation: outputPulse 0.35s ease-out; }
        .hint-fade { transition: opacity 1s ease; }
      `}</style>
      <svg width="100%" viewBox="0 0 680 160" style={{ marginBottom: 16, display: "block" }}>
 
        {/* Input A wire */}
        <line x1={gx-90} y1={midA} x2={isSingle ? gx+10 : gx} y2={midA}
          stroke={wireColor(inputA)} strokeWidth="2.5" strokeLinecap="round"
          style={{ transition: "stroke 0.2s" }} />
        <g style={{ cursor: "pointer" }} onClick={() => { playSound("click"); onToggleA(); }}>
          <circle cx={gx-90} cy={midA} r={8} fill={wireColor(inputA)} style={{ transition: "fill 0.2s" }} />
          <circle cx={gx-90} cy={midA} r={16} fill="transparent" />
          <text x={gx-90} y={midA+1} textAnchor="middle" dominantBaseline="central"
            fontSize={9} fontWeight="700" fontFamily="monospace" fill="white"
            style={{ pointerEvents: "none" }}>{inputA}</text>
        </g>
        <text x={gx-106} y={midA+4} textAnchor="end" fontSize={12} fontFamily="monospace" fill="var(--text-dim)">A</text>
        <text x={gx-90} y={midA+22} textAnchor="middle" fontSize={10} fontFamily="monospace"
          fill="var(--text-dim)" opacity={showHint ? 0.7 : 0} className="hint-fade"
          style={{ pointerEvents: "none" }}>click</text>
 
        {/* Input B wire */}
        {!isSingle && (
          <>
            <line x1={gx-90} y1={midB} x2={gx} y2={midB}
              stroke={wireColor(inputB)} strokeWidth="2.5" strokeLinecap="round"
              style={{ transition: "stroke 0.2s" }} />
            <g style={{ cursor: "pointer" }} onClick={() => { playSound("click"); onToggleB(); }}>
              <circle cx={gx-90} cy={midB} r={8} fill={wireColor(inputB)} style={{ transition: "fill 0.2s" }} />
              <circle cx={gx-90} cy={midB} r={16} fill="transparent" />
              <text x={gx-90} y={midB+1} textAnchor="middle" dominantBaseline="central"
                fontSize={9} fontWeight="700" fontFamily="monospace" fill="white"
                style={{ pointerEvents: "none" }}>{inputB}</text>
            </g>
            <text x={gx-106} y={midB+4} textAnchor="end" fontSize={12} fontFamily="monospace" fill="var(--text-dim)">B</text>
            <text x={gx-90} y={midB+22} textAnchor="middle" fontSize={10} fontFamily="monospace"
              fill="var(--text-dim)" opacity={showHint ? 0.7 : 0} className="hint-fade"
              style={{ pointerEvents: "none" }}>click</text>
          </>
        )}
 
        {/* Gate body */}
        <path d={bodyPath} fill="var(--surface2)" stroke="var(--text)" strokeWidth="1.5" strokeLinejoin="round"
          style={{ transition: "stroke 0.2s" }} />
        {isXOR && (
          <path d={`M ${gx} ${gy} Q ${gx+gw*0.25} ${cy} ${gx} ${gy+gh}`}
            fill="none" stroke="var(--text)" strokeWidth="1.5" opacity="0.5" />
        )}
        {(bubble || gateId === "NOT") && (
          <circle cx={gx+gw+(gateId==="NOT"?3:5)} cy={cy} r={5}
            fill="var(--bg)" stroke="var(--text)" strokeWidth="1.5" />
        )}
        <text x={cx} y={cy+4} textAnchor="middle" dominantBaseline="central"
          fontSize={12} fontWeight="500" fontFamily="monospace" fill="var(--text)">{gateId}</text>
 
        {/* Output wire — coloured because this is practice mode, not a puzzle */}
        <line x1={outX} y1={cy} x2={outX+90} y2={cy}
          stroke={wireColor(output)} strokeWidth="2.5" strokeLinecap="round"
          style={{ transition: "stroke 0.2s" }} />
        <circle key={pulseKey} cx={outX+90} cy={cy} r={8}
          fill={wireColor(output)} className="output-pulse" style={{ transition: "fill 0.2s" }} />
        <text x={outX+90} y={cy+1} textAnchor="middle" dominantBaseline="central"
          fontSize={9} fontWeight="700" fontFamily="monospace" fill="white"
          style={{ pointerEvents: "none" }}>{output}</text>
        <text x={outX+106} y={cy+4} fontSize={12} fontFamily="monospace" fill="var(--text-dim)">out</text>
      </svg>
    </>
  );
}
 
// ── Challenge: single gate diagram ──
function ChallengeSVGSingle({ gate1, a, b, isIdentify, target }) {
  const isSingle = gate1 === "NOT";
  const bubble   = gate1 === "NAND" || gate1 === "NOR";
  const isXOR    = gate1 === "XOR";
  const cx = 340, cy = 70, gw = 80, gh = 60;
  const gx = cx - gw/2, gy = cy - gh/2;
  const midA = isSingle ? cy : cy - 18;
  const midB = cy + 18;
  const bodyPath = isIdentify ? null : gateBodyPath(gate1, gx, gy, gw, gh, cx, cy);
  const outX = gx + gw + (!isIdentify && bubble ? 10 : 0) + (!isIdentify && gate1 === "NOT" ? 3 : 0);
 
  return (
    <svg width="100%" viewBox="0 0 680 140" style={{ marginBottom: 16 }}>
      {/* Input A — always coloured, it's given information */}
      <line x1={gx-80} y1={midA} x2={isSingle && !isIdentify ? gx+10 : gx} y2={midA}
        stroke={wireColor(a)} strokeWidth="2" strokeLinecap="round" />
      <circle cx={gx-80} cy={midA} r={5} fill={wireColor(a)} />
      <text x={gx-88} y={midA+4} textAnchor="end" fontSize={12} fontFamily="monospace" fill="var(--text)">A={a}</text>
 
      {/* Input B */}
      {b !== null && (
        <>
          <line x1={gx-80} y1={midB} x2={gx} y2={midB} stroke={wireColor(b)} strokeWidth="2" strokeLinecap="round" />
          <circle cx={gx-80} cy={midB} r={5} fill={wireColor(b)} />
          <text x={gx-88} y={midB+4} textAnchor="end" fontSize={12} fontFamily="monospace" fill="var(--text)">B={b}</text>
        </>
      )}
 
      {/* Gate — real shape or ??? box */}
      {isIdentify ? (
        <>
          <rect x={gx} y={gy} width={gw} height={gh} rx={6}
            fill="var(--surface2)" stroke={WIRE_Q} strokeWidth="1.5" strokeDasharray="6 3" />
          <text x={cx} y={cy+4} textAnchor="middle" dominantBaseline="central"
            fontSize={13} fontWeight="700" fontFamily="monospace" fill={WIRE_Q}>???</text>
        </>
      ) : (
        <>
          <path d={bodyPath} fill="var(--surface2)" stroke="var(--text)" strokeWidth="1.5" />
          {isXOR && (
            <path d={`M ${gx} ${gy} Q ${gx+gw*0.25} ${cy} ${gx} ${gy+gh}`}
              fill="none" stroke="var(--text)" strokeWidth="1.5" opacity="0.5" />
          )}
          {(bubble || gate1 === "NOT") && (
            <circle cx={gx+gw+(gate1==="NOT"?3:5)} cy={cy} r={5}
              fill="var(--bg)" stroke="var(--text)" strokeWidth="1.5" />
          )}
          <text x={cx} y={cy+4} textAnchor="middle" dominantBaseline="central"
            fontSize={11} fontWeight="500" fontFamily="monospace" fill="var(--text)">{gate1}</text>
        </>
      )}
 
      {/* Output — shown for identify (known), dashed ? for output puzzles */}
      {isIdentify ? (
        <>
          <line x1={gx+gw} y1={cy} x2={gx+gw+80} y2={cy} stroke={wireColor(target)} strokeWidth="2" strokeLinecap="round" />
          <circle cx={gx+gw+80} cy={cy} r={8} fill={wireColor(target)} />
          <text x={gx+gw+80} y={cy+1} textAnchor="middle" dominantBaseline="central"
            fontSize={9} fontWeight="700" fontFamily="monospace" fill="white"
            style={{ pointerEvents: "none" }}>{target}</text>
          <text x={gx+gw+96} y={cy+4} fontSize={12} fontFamily="monospace" fill="var(--text-dim)">= {target}</text>
        </>
      ) : (
        <>
          <line x1={outX} y1={cy} x2={outX+80} y2={cy}
            stroke={WIRE_Q} strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" />
          <circle cx={outX+80} cy={cy} r={5} fill={WIRE_Q} />
          <text x={outX+88} y={cy+4} fontSize={12} fontFamily="monospace" fill={WIRE_Q}>?</text>
        </>
      )}
    </svg>
  );
}
 
// ── Challenge: two-gate chain diagram ──
function ChallengeSVGChain({ gate1, gate2, a, b, cInput, isIdentifyChain, target }) {
  const g1x = 170, g1y = 35, gw = 80, gh = 60;
  const g2x = 370, g2y = 35;
  const cy1 = g1y + gh/2, cy2 = g2y + gh/2;
  const notBubble = gate2 === "NOT" || gate2 === "NOR" || gate2 === "NAND";
  const outX2 = g2x + gw + (notBubble ? 10 : 0);
  const g1path = isIdentifyChain ? null : gateBodyPath(gate1, g1x, g1y, gw, gh, g1x+gw/2, cy1);
  const g2path = gateBodyPath(gate2, g2x, g2y, gw, gh, g2x+gw/2, cy2);
 
  return (
    <svg width="100%" viewBox="0 0 680 140" style={{ marginBottom: 16 }}>
      {/* Gate 1 inputs — coloured, they are given */}
      <line x1={80} y1={cy1-18} x2={g1x} y2={cy1-18} stroke={wireColor(a)} strokeWidth="2" strokeLinecap="round" />
      <circle cx={80} cy={cy1-18} r={5} fill={wireColor(a)} />
      <text x={72} y={cy1-14} textAnchor="end" fontSize={12} fontFamily="monospace" fill="var(--text)">A={a}</text>
 
      {b !== null && b !== undefined && (
        <>
          <line x1={80} y1={cy1+18} x2={g1x} y2={cy1+18} stroke={wireColor(b)} strokeWidth="2" strokeLinecap="round" />
          <circle cx={80} cy={cy1+18} r={5} fill={wireColor(b)} />
          <text x={72} y={cy1+22} textAnchor="end" fontSize={12} fontFamily="monospace" fill="var(--text)">B={b}</text>
        </>
      )}
 
      {/* Gate 1 — real shape or ??? box */}
      {isIdentifyChain ? (
        <>
          <rect x={g1x} y={g1y} width={gw} height={gh} rx={6}
            fill="var(--surface2)" stroke={WIRE_Q} strokeWidth="1.5" strokeDasharray="6 3" />
          <text x={g1x+gw/2} y={cy1+4} textAnchor="middle" dominantBaseline="central"
            fontSize={12} fontWeight="700" fontFamily="monospace" fill={WIRE_Q}>???</text>
        </>
      ) : (
        <>
          <path d={g1path} fill="var(--surface2)" stroke="var(--text)" strokeWidth="1.5" />
          {(gate1==="NAND"||gate1==="NOR") && (
            <circle cx={g1x+gw+5} cy={cy1} r={5} fill="var(--bg)" stroke="var(--text)" strokeWidth="1.5" />
          )}
          <text x={g1x+gw/2} y={cy1+4} textAnchor="middle" dominantBaseline="central"
            fontSize={10} fontWeight="500" fontFamily="monospace" fill="var(--text)">{gate1}</text>
        </>
      )}
 
      {/* Inter-gate wire — ALWAYS neutral grey, never reveals intermediate value */}
      <line
        x1={g1x + gw + (gate1==="NAND"||gate1==="NOR" ? 10 : 0)} y1={cy1}
        x2={gate2==="NOT" ? g2x+10 : g2x} y2={cy2}
        stroke={WIRE_NEUTRAL} strokeWidth="2" strokeLinecap="round"
        strokeDasharray={isIdentifyChain ? "4 3" : "none"}
      />
 
      {/* Optional C input for two-input gate2 */}
      {cInput !== undefined && cInput !== null && gate2 !== "NOT" && (
        <>
          <line x1={g2x-60} y1={cy2+18} x2={g2x} y2={cy2+18}
            stroke={wireColor(cInput)} strokeWidth="2" strokeLinecap="round" />
          <circle cx={g2x-60} cy={cy2+18} r={5} fill={wireColor(cInput)} />
          <text x={g2x-68} y={cy2+22} textAnchor="end" fontSize={12} fontFamily="monospace" fill="var(--text)">C={cInput}</text>
        </>
      )}
 
      {/* Gate 2 — always shown */}
      <path d={g2path} fill="var(--surface2)" stroke="var(--text)" strokeWidth="1.5" />
      {notBubble && (
        <circle cx={g2x+gw+(gate2==="NOT"?3:5)} cy={cy2} r={5}
          fill="var(--bg)" stroke="var(--text)" strokeWidth="1.5" />
      )}
      <text x={g2x+gw/2} y={cy2+4} textAnchor="middle" dominantBaseline="central"
        fontSize={10} fontWeight="500" fontFamily="monospace" fill="var(--text)">{gate2}</text>
 
      {/* Output — shown for identify_chain, dashed ? otherwise */}
      {isIdentifyChain ? (
        <>
          <line x1={outX2} y1={cy2} x2={outX2+70} y2={cy2}
            stroke={wireColor(target)} strokeWidth="2" strokeLinecap="round" />
          <circle cx={outX2+70} cy={cy2} r={8} fill={wireColor(target)} />
          <text x={outX2+70} y={cy2+1} textAnchor="middle" dominantBaseline="central"
            fontSize={9} fontWeight="700" fontFamily="monospace" fill="white"
            style={{ pointerEvents: "none" }}>{target}</text>
          <text x={outX2+86} y={cy2+4} fontSize={12} fontFamily="monospace" fill="var(--text-dim)">= {target}</text>
        </>
      ) : (
        <>
          <line x1={outX2} y1={cy2} x2={outX2+70} y2={cy2}
            stroke={WIRE_Q} strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" />
          <circle cx={outX2+70} cy={cy2} r={5} fill={WIRE_Q} />
          <text x={outX2+78} y={cy2+4} fontSize={12} fontFamily="monospace" fill={WIRE_Q}>?</text>
        </>
      )}
    </svg>
  );
}
 
// ── Challenge: three-gate chain diagram ──
function ChallengeSVGThreeChain({ gate1, gate2, gate3, a, b, cInput }) {
  const gw = 64, gh = 52;
  const g1x = 60,  g1y = 44, cy1 = g1y + gh/2;
  const g2x = 220, g2y = 44, cy2 = g2y + gh/2;
  const g3x = 400, g3y = 44, cy3 = g3y + gh/2;
  const nb1 = gate1==="NAND"||gate1==="NOR";
  const nb2 = gate2==="NAND"||gate2==="NOR"||gate2==="NOT";
  const nb3 = gate3==="NAND"||gate3==="NOR"||gate3==="NOT";
  const g1p = gateBodyPath(gate1, g1x, g1y, gw, gh, g1x+gw/2, cy1);
  const g2p = gateBodyPath(gate2, g2x, g2y, gw, gh, g2x+gw/2, cy2);
  const g3p = gateBodyPath(gate3, g3x, g3y, gw, gh, g3x+gw/2, cy3);
 
  return (
    <svg width="100%" viewBox="0 0 680 140" style={{ marginBottom: 16 }}>
      {/* Gate 1 inputs — coloured (given) */}
      <line x1={8} y1={cy1-14} x2={g1x} y2={cy1-14} stroke={wireColor(a)} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx={8} cy={cy1-14} r={4} fill={wireColor(a)} />
      <text x={12} y={cy1-10} fontSize={10} fontFamily="monospace" fill="var(--text)">A={a}</text>
      <line x1={8} y1={cy1+14} x2={g1x} y2={cy1+14} stroke={wireColor(b)} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx={8} cy={cy1+14} r={4} fill={wireColor(b)} />
      <text x={12} y={cy1+18} fontSize={10} fontFamily="monospace" fill="var(--text)">B={b}</text>
 
      {/* Gate 1 */}
      <path d={g1p} fill="var(--surface2)" stroke="var(--text)" strokeWidth="1.5" />
      {nb1 && <circle cx={g1x+gw+5} cy={cy1} r={4} fill="var(--bg)" stroke="var(--text)" strokeWidth="1.5" />}
      <text x={g1x+gw/2} y={cy1+3} textAnchor="middle" dominantBaseline="central"
        fontSize={9} fontWeight="500" fontFamily="monospace" fill="var(--text)">{gate1}</text>
 
      {/* G1→G2 wire — neutral grey */}
      <line x1={g1x+gw+(nb1?10:0)} y1={cy1} x2={gate2==="NOT"?g2x+8:g2x} y2={cy2}
        stroke={WIRE_NEUTRAL} strokeWidth="1.5" strokeLinecap="round" />
 
      {/* C input for gate 2 — coloured (given) */}
      {gate2 !== "NOT" && cInput !== undefined && cInput !== null && (
        <>
          <line x1={g2x-30} y1={cy2+14} x2={g2x} y2={cy2+14}
            stroke={wireColor(cInput)} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx={g2x-30} cy={cy2+14} r={4} fill={wireColor(cInput)} />
          <text x={g2x-34} y={cy2+18} textAnchor="end" fontSize={10} fontFamily="monospace" fill="var(--text)">C={cInput}</text>
        </>
      )}
 
      {/* Gate 2 */}
      <path d={g2p} fill="var(--surface2)" stroke="var(--text)" strokeWidth="1.5" />
      {nb2 && <circle cx={g2x+gw+(gate2==="NOT"?3:5)} cy={cy2} r={4} fill="var(--bg)" stroke="var(--text)" strokeWidth="1.5" />}
      <text x={g2x+gw/2} y={cy2+3} textAnchor="middle" dominantBaseline="central"
        fontSize={9} fontWeight="500" fontFamily="monospace" fill="var(--text)">{gate2}</text>
 
      {/* G2→G3 wire — neutral grey */}
      <line x1={g2x+gw+(nb2?8:0)} y1={cy2} x2={gate3==="NOT"?g3x+8:g3x} y2={cy3}
        stroke={WIRE_NEUTRAL} strokeWidth="1.5" strokeLinecap="round" />
 
      {/* D input for gate 3 — coloured (given) */}
      <line x1={g3x-30} y1={cy3+14} x2={g3x} y2={cy3+14}
        stroke={wireColor(1)} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx={g3x-30} cy={cy3+14} r={4} fill={wireColor(1)} />
      <text x={g3x-34} y={cy3+18} textAnchor="end" fontSize={10} fontFamily="monospace" fill="var(--text)">D=1</text>
 
      {/* Gate 3 */}
      <path d={g3p} fill="var(--surface2)" stroke="var(--text)" strokeWidth="1.5" />
      {nb3 && <circle cx={g3x+gw+(gate3==="NOT"?3:5)} cy={cy3} r={4} fill="var(--bg)" stroke="var(--text)" strokeWidth="1.5" />}
      <text x={g3x+gw/2} y={cy3+3} textAnchor="middle" dominantBaseline="central"
        fontSize={9} fontWeight="500" fontFamily="monospace" fill="var(--text)">{gate3}</text>
 
      {/* Output — dashed ? */}
      <line x1={g3x+gw+(nb3?8:0)} y1={cy3} x2={g3x+gw+(nb3?8:0)+60} y2={cy3}
        stroke={WIRE_Q} strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" />
      <circle cx={g3x+gw+(nb3?8:0)+60} cy={cy3} r={5} fill={WIRE_Q} />
      <text x={g3x+gw+(nb3?8:0)+68} y={cy3+4} fontSize={12} fontFamily="monospace" fill={WIRE_Q}>?</text>
    </svg>
  );
}
 
// LEVEL 3 — PRACTICE MODE
function Level3Practice({ onProceedToChallenge, onBack }) {
  const [gateIdx, setGateIdx]     = useState(0);
  const [inputA, setInputA]       = useState(0);
  const [inputB, setInputB]       = useState(0);
  const [showTable, setShowTable] = useState(false);
 
  const gate   = GATE_DATA[gateIdx];
  const output = gate.inputs === 1 ? gate.fn(inputA) : gate.fn(inputA, inputB);
  const rows   = getTruthRows(gate);
  const currentRowKey = gate.inputs === 1 ? `${inputA}` : `${inputA}${inputB}`;
 
  function selectGate(i) {
    setGateIdx(i);
    setInputA(0);
    setInputB(0);
    setShowTable(false);
    playSound("click");
  }
 
  return (
    <div className="game-screen">
      <div className="game-header">
        <button className="btn btn-ghost"
          style={{ padding: "6px 12px", fontSize: "0.7rem" }} onClick={onBack}>
          ← Back
        </button>
        <div className="level-tag">LEVEL 3 · PRACTICE</div>
        <div className="game-title">Logic Gates</div>
      </div>
 
      {/* Gate selector pills */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {GATE_DATA.map((g, i) => (
          <button key={g.id} onClick={() => selectGate(i)} style={{
            padding: "6px 16px", borderRadius: 999,
            border: `1px solid ${gateIdx===i ? "var(--accent)" : "var(--border)"}`,
            background: gateIdx===i ? "rgba(0,245,255,0.1)" : "var(--surface)",
            color: gateIdx===i ? "var(--accent)" : "var(--text-dim)",
            fontFamily: "monospace", fontSize: "0.8rem",
            cursor: "pointer", transition: "all 0.2s",
          }}>{g.id}</button>
        ))}
      </div>
 
      {/* Gate description */}
      <div className="code-block" style={{ marginBottom: 16 }}>
        <div style={{
          fontSize: "0.65rem", color: "var(--accent)",
          letterSpacing: 3, marginBottom: 8,
          fontFamily: "'Orbitron', sans-serif",
        }}>
          {gate.name.toUpperCase()}
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--text-dim)", lineHeight: 1.6, marginBottom: 0 }}>
          {gate.desc}
        </p>
      </div>
 
      <div className="info-box" style={{ marginBottom: 12 }}>
        💡 Click the <span style={{ color: "var(--accent3)" }}>input circles</span> on
        the diagram to toggle A and B live
      </div>
 
      {/* Interactive SVG */}
      <GateDiagram
        gateId={gate.id} inputA={inputA} inputB={inputB} output={output}
        onToggleA={() => setInputA(a => a===0 ? 1 : 0)}
        onToggleB={() => setInputB(b => b===0 ? 1 : 0)}
      />
 
      {/* Live output bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: "12px 16px", borderRadius: 8,
        background: "var(--surface)",
        border: `1px solid ${output ? "var(--accent3)" : "var(--accent2)"}`,
        marginBottom: 16, transition: "border-color 0.2s",
      }}>
        <div style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}>Output</div>
        <div style={{
          fontSize: "2rem", fontWeight: 700, fontFamily: "monospace",
          color: output ? "var(--accent3)" : "var(--accent2)",
          transition: "color 0.2s", minWidth: 28, textAlign: "center",
        }}>{output}</div>
        <div style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}>
          {output ? "HIGH — current flows" : "LOW — no current"}
        </div>
        <div style={{
          marginLeft: "auto", fontSize: "0.75rem",
          color: "var(--text-dim)", fontFamily: "monospace",
        }}>
          {gate.inputs === 2
            ? `${gate.id}(${inputA}, ${inputB}) = ${output}`
            : `${gate.id}(${inputA}) = ${output}`}
        </div>
      </div>
 
      {/* Truth table */}
      <button className="btn btn-ghost"
        style={{ marginBottom: 12, fontSize: "0.75rem", padding: "8px 16px" }}
        onClick={() => setShowTable(t => !t)}>
        {showTable ? "▲ Hide" : "▼ Show"} truth table
      </button>
 
      {showTable && (
        <div className="code-block" style={{ marginBottom: 16, padding: "12px 16px" }}>
          <table style={{
            width: "100%", borderCollapse: "collapse",
            fontFamily: "monospace", fontSize: "0.85rem",
          }}>
            <thead>
              <tr>
                <th style={{ padding: "6px 12px", color: "var(--text-dim)", textAlign: "center", borderBottom: "1px solid var(--border)" }}>A</th>
                {gate.inputs === 2 && (
                  <th style={{ padding: "6px 12px", color: "var(--text-dim)", textAlign: "center", borderBottom: "1px solid var(--border)" }}>B</th>
                )}
                <th style={{ padding: "6px 12px", color: "var(--text-dim)", textAlign: "center", borderBottom: "1px solid var(--border)" }}>Output</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const rowKey   = row.slice(0, -1).join("");
                const isActive = rowKey === currentRowKey;
                return (
                  <tr key={i} style={{
                    background: isActive ? "rgba(0,245,255,0.07)" : "transparent",
                    transition: "background 0.2s",
                  }}>
                    {row.map((v, j) => (
                      <td key={j} style={{
                        padding: "6px 12px", textAlign: "center",
                        borderBottom: "1px solid rgba(0,245,255,0.05)",
                        color: j===row.length-1
                          ? (v ? "var(--accent3)" : "var(--accent2)")
                          : isActive ? "var(--accent)" : "var(--text)",
                        fontWeight: isActive ? 700 : 400,
                        transition: "color 0.2s",
                      }}>{v}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ marginTop: 8, fontSize: "0.72rem", color: "var(--text-dim)" }}>
            ↑ Highlighted row = current inputs
          </div>
        </div>
      )}
 
      {/* Real-world example */}
      <div style={{
        padding: "10px 14px", borderRadius: 8,
        background: "rgba(255,214,10,0.07)",
        borderLeft: "3px solid var(--accent3)",
        fontSize: "0.8rem", color: "var(--text-dim)",
        lineHeight: 1.6, marginBottom: 24,
      }}>
        {gate.realWorld}
      </div>
 
      <button className="btn btn-primary" onClick={onProceedToChallenge}>
        Ready for the challenge? →
      </button>
    </div>
  );
}
 
// LEVEL 3 — CHALLENGE MODE
function Level3Challenge({ onComplete, onBack, onAchievement }) {
  const [pIdx, setPIdx]         = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);
  const [score, setScore]       = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [done, setDone]         = useState(false);
  const [firstCorrect, setFirstCorrect] = useState(false);
 
  const puzzles = VERIFIED_PUZZLES;
  const p = puzzles[pIdx];
 
  const isChain         = p.type === "output" && p.gate2 !== undefined && p.gate3 === undefined;
  const isThreeChain    = p.type === "output" && p.gate3 !== undefined;
  const isIdentify      = p.type === "identify";
  const isIdentifyChain = p.type === "identify_chain";
 
  const progress = (pIdx / puzzles.length) * 100;
  const tierColors = { 1: "#00f5ff", 2: "#ffd60a", 3: "#ff006e", 4: "#ff006e", 5: "#b66bff" };
  const tierColor  = tierColors[p.tier] || "var(--accent)";
 
  function checkAnswer(val) {
    if (answered) return;
    const correct = String(val) === String(p.answer);
    setSelected(val);
    setAnswered(true);
    playSound(correct ? "correct" : "wrong");
    if (correct) {
      setScore(s => s + (p.tier * 80));
      if (!firstCorrect) {
        setFirstCorrect(true);
        if (onAchievement) onAchievement("first_blood");
      }
    } else {
      setMistakes(m => m + 1);
    }
  }
 
  function next() {
    if (pIdx + 1 >= puzzles.length) setDone(true);
    else { setPIdx(i => i+1); setAnswered(false); setSelected(null); }
  }
 
  if (done) {
    const maxScore = puzzles.reduce((s, q) => s + q.tier * 80, 0);
    const pct   = Math.round(score / maxScore * 100);
    const stars = pct >= 90 ? "⭐⭐⭐" : pct >= 60 ? "⭐⭐" : "⭐";
    return (
      <div className="screen">
        <div className="victory-card">
          <div className="victory-title">CHALLENGE COMPLETE!</div>
          <div className="stars">{stars}</div>
          <div style={{ color: "var(--text-dim)", marginBottom: 8 }}>Logic Gates mastered</div>
          <div className="victory-score">{score} pts</div>
          <div style={{ color: "var(--text-dim)", fontSize: "0.8rem", marginBottom: 24 }}>
            {pct >= 80
              ? "Excellent — you can trace signals through complex circuits!"
              : pct >= 50
              ? "Good effort — revisit Practice mode to review any tricky gates."
              : "Keep going — head back to Practice and try each gate interactively."}
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button className="btn btn-ghost" onClick={onBack}>← Menu</button>
            <button className="btn btn-primary" onClick={() => onComplete(score, mistakes)}>
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
        <button className="btn btn-ghost"
          style={{ padding: "6px 12px", fontSize: "0.7rem" }} onClick={onBack}>
          ← Back
        </button>
        <div className="level-tag">LEVEL 3 · CHALLENGE</div>
        <div className="game-title">Logic Gates</div>
        <div className="score-display">{score} pts</div>
      </div>
 
      <div className="progress-bar">
        <div className="progress-fill" style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #ff006e, #ffd60a)",
        }} />
      </div>
 
      {/* Progress dots */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 16 }}>
        {puzzles.map((_, i) => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: "50%",
            background: i < pIdx
              ? "var(--accent3)"
              : i === pIdx ? "var(--accent)" : "var(--border)",
            transition: "background 0.2s",
          }} />
        ))}
      </div>
 
      {/* Tier badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{
          padding: "3px 10px", borderRadius: 999,
          border: `1px solid ${tierColor}`,
          fontSize: "0.65rem", letterSpacing: 2,
          color: tierColor, fontFamily: "'Orbitron', sans-serif",
        }}>
          {p.label || `TIER ${p.tier}`}
        </div>
        <div style={{ color: "var(--text-dim)", fontSize: "0.75rem" }}>
          Puzzle {pIdx+1} of {puzzles.length}
        </div>
      </div>
 
      <div className="info-box">{p.desc}</div>
 
      {/* Pick the correct SVG component */}
      {isThreeChain ? (
        <ChallengeSVGThreeChain
          gate1={p.gate1} gate2={p.gate2} gate3={p.gate3}
          a={p.a} b={p.b} cInput={p.cInput}
        />
      ) : isIdentifyChain ? (
        <ChallengeSVGChain
          gate1={null} gate2={p.gate2}
          a={p.a} b={p.b} cInput={p.cInput}
          isIdentifyChain={true} target={p.target}
        />
      ) : isChain ? (
        <ChallengeSVGChain
          gate1={p.gate1} gate2={p.gate2}
          a={p.a} b={p.b} cInput={p.cInput}
          isIdentifyChain={false} target={null}
        />
      ) : (
        <ChallengeSVGSingle
          gate1={p.gate1} a={p.a} b={p.b}
          isIdentify={isIdentify} target={p.target}
        />
      )}
 
      {/* Answer buttons */}
      {(isIdentify || isIdentifyChain) ? (
        <>
          <div className="hint-text">
            {isIdentifyChain
              ? "Which gate fills the ??? box to produce the shown output?"
              : "Which gate produces this output?"}
          </div>
          <div className="options-grid">
            {p.options.map(g => {
              let cls = "option-btn";
              if (answered) {
                if (g === p.answer) cls += " correct";
                else if (selected === g) cls += " wrong";
              }
              return (
                <button key={g} className={cls} onClick={() => checkAnswer(g)}>{g}</button>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="hint-text">What is the final output?</div>
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            {[0, 1].map(v => {
              let cls = "option-btn";
              if (answered) {
                if (v === p.answer) cls += " correct";
                else if (selected === v) cls += " wrong";
              }
              return (
                <button key={v} className={cls}
                  style={{ fontSize: "1.2rem", padding: "14px 32px" }}
                  onClick={() => checkAnswer(v)}>
                  {v}
                </button>
              );
            })}
          </div>
        </>
      )}
 
      {/* Feedback */}
      {answered && (
        <>
          <div className={`feedback-box ${String(selected)===String(p.answer) ? "correct" : "wrong"}`}>
            <strong>
              {String(selected)===String(p.answer) ? "✅ Correct!" : "❌ Not quite —"}
            </strong>
            {" "}{p.explain}
          </div>
          <button className="btn btn-primary" style={{ alignSelf: "flex-end" }} onClick={next}>
            {pIdx+1 >= puzzles.length ? "See Results →" : "Next →"}
          </button>
        </>
      )}
    </div>
  );
}
 
// LEVEL 3 WRAPPER — Practice | Challenge tabs
// This is the single component used for screen "level 3"
function Level3Wrapper({ onComplete, onBack, onAchievement }) {
  const [started, setStarted] = useState(false);
  const [tab, setTab] = useState("practice");
 
  const tabStyle = (active) => ({
    flex: 1, padding: "10px 0",
    border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
    borderRadius: 6,
    background: active ? "rgba(0,245,255,0.08)" : "var(--surface)",
    color: active ? "var(--accent)" : "var(--text-dim)",
    fontFamily: "'Orbitron', sans-serif",
    fontSize: "0.7rem", letterSpacing: 2,
    cursor: "pointer", transition: "all 0.2s", textAlign: "center",
  });

  if (!started) {
    return (
      <div className="screen">
        <div className="victory-card">
          <div className="victory-title">LOGIC GATES</div>

          <div style={{ color: "var(--text-dim)", marginBottom: 16 }}>
            Learn how binary inputs pass through logic gates to produce an output.
          </div>

          <div className="info-box" style={{ textAlign: "left" }}>
            <strong>Gate guide:</strong>
            <br /><br />
            AND → 1 only if both inputs are 1
            <br />
            OR → 1 if at least one input is 1
            <br />
            NOT → flips the input (1 → 0, 0 → 1)
            <br />
            NAND → opposite of AND (0 only if both are 1)
            <br />
            NOR → opposite of OR (1 only if both are 0)
            <br />
            XOR → 1 if inputs are different
          </div>
          <div className="hint-text">
            💡 Tip: NAND and NOR are just inverted versions of AND and OR.
          </div>

          <button className="btn btn-primary" onClick={() => setStarted(true)}>
            Start Level →
          </button>
        </div>
      </div>
    );
  }
 
  return (
    <div className="game-screen">
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <button style={tabStyle(tab === "practice")} onClick={() => setTab("practice")}>
          Practice
        </button>
        <button style={tabStyle(tab === "challenge")} onClick={() => setTab("challenge")}>
          Challenge
        </button>
      </div>
 
      {tab === "practice" && (
        <Level3Practice
          onProceedToChallenge={() => setTab("challenge")}
          onBack={onBack}
        />
      )}
      {tab === "challenge" && (
        <Level3Challenge
          onComplete={onComplete}
          onBack={onBack}
          onAchievement={onAchievement}
        />
      )}
    </div>
  );
}

function computeGate(gate, a, b) {
  switch (gate) {
    case "AND":
      return a & b;
    case "OR":
      return a | b;
    case "NOT":
      return a === 1 ? 0 : 1;
    case "XOR":
      return a ^ b;
    case "NAND":
      return (a & b) === 1 ? 0 : 1;
    case "NOR":
      return (a | b) === 1 ? 0 : 1;
    default:
      return 0;
  }
}

// ── LEVEL 3 – LOGIC GATES ─────────────────────
/*
function Level3({ onComplete, onBack }) {
  const [pIdx, setPIdx] = useState(0);
  const [selectedGate, setSelectedGate] = useState("AND");
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [mistakes, setMistakes] = useState(0);

  const p = GATE_PUZZLES[pIdx];
  const output = computeGate(selectedGate, p.a, p.b);
  const isCorrect = output === p.target;

  function check() {
    if (answered) return;
    playSound(isCorrect ? "correct" : "wrong");
    setAnswered(true);
    if (isCorrect) setScore((s) => s + 100);
    else setMistakes((m) => m + 1);
  }

  function next() {
    if (pIdx + 1 >= GATE_PUZZLES.length) {
      setDone(true);
    } else {
      setPIdx((i) => i + 1);
      setSelectedGate("AND");
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
            Logic Gates mastered
          </div>
          <div className="victory-score">{score} pts</div>
          <div
            style={{
              color: "var(--text-dim)",
              fontSize: "0.8rem",
              marginBottom: 24,
            }}
          >
            You understand AND, OR, XOR, NOR and more — like a real hardware
            engineer!
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
        <div className="level-tag">LEVEL 2</div>
        <div className="game-title">Logic Gates</div>
        <div className="score-display">{score} pts</div>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${(pIdx / GATE_PUZZLES.length) * 100}%`,
            background: "linear-gradient(90deg, #ff006e, #ffd60a)",
          }}
        />
      </div>

      <div className="info-box">
        Puzzle {pIdx + 1} of {GATE_PUZZLES.length} — Choose a gate so that the
        output equals{" "}
        <strong style={{ color: "var(--accent3)" }}>{p.target}</strong>
      </div>

      <div className="gates-container">
        <div className="gate-row">
          <div style={{ marginRight: 8 }}>
            <div
              style={{
                fontSize: "0.7rem",
                color: "var(--text-dim)",
                marginBottom: 6,
              }}
            >
              INPUTS
            </div>
            <div className="gate-inputs">
              <div className={`gate-input ${p.a ? "on" : "off"}`}>{p.a}</div>
              <div className={`gate-input ${p.b ? "on" : "off"}`}>{p.b}</div>
            </div>
          </div>

          <div style={{ fontSize: "1.5rem", color: "var(--text-dim)" }}>→</div>

          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "0.7rem",
                color: "var(--text-dim)",
                marginBottom: 6,
              }}
            >
              SELECT GATE
            </div>
            <select
              className="gate-select"
              value={selectedGate}
              onChange={(e) => {
                if (!answered) setSelectedGate(e.target.value);
              }}
            >
              {GATE_TYPES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div style={{ fontSize: "1.5rem", color: "var(--text-dim)" }}>→</div>

          <div>
            <div
              style={{
                fontSize: "0.7rem",
                color: "var(--text-dim)",
                marginBottom: 6,
              }}
            >
              OUTPUT
            </div>
            <div className={`gate-output ${output ? "on" : "off"}`}>
              {output}
            </div>
          </div>

          <div style={{ marginLeft: 16 }}>
            <div
              style={{
                fontSize: "0.7rem",
                color: "var(--text-dim)",
                marginBottom: 6,
              }}
            >
              NEED
            </div>
            <div className={`gate-output ${p.target ? "on" : "off"}`}>
              {p.target}
            </div>
          </div>
        </div>
      </div>

      <div className="hint-text">
        💡 Gate reference: <span style={{ color: "var(--accent)" }}>AND</span> =
        both 1 | <span style={{ color: "var(--accent2)" }}>OR</span> = at least
        one 1 | <span style={{ color: "var(--accent4)" }}>XOR</span> = different
        inputs | <span style={{ color: "var(--accent3)" }}>NOT</span> = flip
        input A
      </div>

      {!answered && (
        <button
          className="btn btn-primary"
          style={{ alignSelf: "flex-start" }}
          onClick={check}
        >
          Check Answer
        </button>
      )}

      {answered && (
        <>
          <div className={`feedback-box ${isCorrect ? "correct" : "wrong"}`}>
            <strong>
              {isCorrect
                ? "✅ Correct!"
                : `❌ Not quite — the correct gate was ${p.correct}`}
            </strong>
            <br />
            {p.hint}
          </div>
          <button
            className="btn btn-primary"
            onClick={next}
            style={{ alignSelf: "flex-end" }}
          >
            {pIdx + 1 >= GATE_PUZZLES.length ? "See Results →" : "Next →"}
          </button>
        </>
      )}
    </div>
  );
}*/