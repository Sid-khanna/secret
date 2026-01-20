"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

type Theme = "berry" | "lavender" | "midnight";
type Review = { from: string; text: string; stars?: number };

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ------------------ terminal intro ------------------ */

const terminalLines = [
  "Booting Avni Connection OS...",
  "Loading: cute distraction system ✅",
  "Installing: eye-contact firewall ❌ (failed)",
  "Calibrating: teasing tolerance... low but improving",
  "Driver module: pending (passenger princess mode enabled)",
  "Ready. proceed carefully (i’m not normal about you).",
];

function useTypewriter(lines: string[], typingSpeed = 22, lineDelay = 300) {
  const [displayed, setDisplayed] = useState<string[]>([]);

  useEffect(() => {
    let active = true;

    const run = async () => {
      setDisplayed(Array(lines.length).fill(""));
      for (let i = 0; i < lines.length; i++) {
        if (!active) return;

        let current = "";
        for (let j = 0; j < lines[i].length; j++) {
          if (!active) return;
          current += lines[i][j];
          setDisplayed((prev) => {
            const copy = [...prev];
            copy[i] = current;
            return copy;
          });
          await new Promise((r) => setTimeout(r, typingSpeed));
        }
        await new Promise((r) => setTimeout(r, lineDelay));
      }
    };

    void run();
    return () => {
      active = false;
    };
  }, [lines, typingSpeed, lineDelay]);

  return displayed;
}

/* ------------------ page ------------------ */

export default function Home() {
  const [theme, setTheme] = useState<Theme>("berry");
  const [showIntro, setShowIntro] = useState(true);

  const [generated, setGenerated] = useState(
    "hit generate and i’ll give you something you can actually send."
  );
  const [toast, setToast] = useState<string | null>(null);

  // password unlock
  const [secretInput, setSecretInput] = useState("");
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const SECRET_PASSWORD = "mypassengerprincess";

    // date picker
  const dateOptions = useMemo(
    () => [
      "activate",
      "bubble planet",
      "trampoline park",
      "late-night drive + music",
      "movie night",
      "paint splatter",
      "rage room",
      "battleground",
      "pursuit",
      "dinner + drinks",
      "rec room",
      "bowling",
      "mini golf",
    ],
    []
  );

  const [dateMode, setDateMode] = useState<"choose" | "random">("choose");
  const [pickedDate, setPickedDate] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);

  function chooseDate(date: string) {
    setDateMode("choose");
    setPickedDate(date);
    setToast("locked in ✅");
    setTimeout(() => setToast(null), 1000);
  }

  function surpriseMe() {
    setDateMode("random");
    setSpinning(true);

    const spins = 14;
    let i = 0;

    const t = setInterval(() => {
      setPickedDate(pick(dateOptions));
      i++;
      if (i >= spins) {
        clearInterval(t);
        setSpinning(false);
        setToast("locked in ✅");
        setTimeout(() => setToast(null), 1000);
      }
    }, 90);
  }

  

  // floating status
  const statusLines = useMemo(
    () => [
    "status: waiting for your message (patiently… kind of)",
    "status: trying to focus (unsuccessful)",
    "status: smiling at my phone again",
    "status: missing you (a noticeable amount)",
    "status: soft thoughts, loud grin",
    "status: you’re living in my head (rent-free)",
    "status: passenger princess mode enabled",
    "status: accidentally checking my phone too often",
    "status: calm on the outside, smiling on the inside",
    "status: acting normal (failed quietly)",
    "status: currently a little too happy about you",
    "status: main character energy detected (it’s you)",
    ],
    []
  );
  const [statusIdx, setStatusIdx] = useState(0);
  const [statusFlash, setStatusFlash] = useState(false);

  const typedLines = useTypewriter(terminalLines);

  useEffect(() => {
    const total =
      terminalLines.reduce((acc, l) => acc + l.length * 22, 0) +
      terminalLines.length * 300 +
      900;
    const t = setTimeout(() => setShowIntro(false), total);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (showIntro) return;

    const tick = () => {
      setStatusIdx((i) => (i + 1) % statusLines.length);
      setStatusFlash(true);
      setTimeout(() => setStatusFlash(false), 380);
    };

    const t = setInterval(tick, 8500);
    return () => clearInterval(t);
  }, [showIntro, statusLines.length]);

  const palette = useMemo(() => {
    if (theme === "berry") {
      return {
        bg: "#05020a",
        glow1: "rgba(244,114,182,0.16)",
        glow2: "rgba(168,85,247,0.14)",
        glow3: "rgba(34,211,238,0.10)",
        text: "rgba(244,244,245,0.96)",
        muted: "rgba(244,244,245,0.72)",
        card: "rgba(255,255,255,0.045)",
        card2: "rgba(255,255,255,0.07)",
        border: "rgba(244,114,182,0.24)",
        borderStrong: "rgba(244,114,182,0.36)",
        accent:
          "linear-gradient(135deg, rgba(251,113,133,0.98), rgba(168,85,247,0.96))",
        accentSoft:
          "linear-gradient(135deg, rgba(251,113,133,0.16), rgba(168,85,247,0.12))",
      };
    }
    if (theme === "lavender") {
      return {
        bg: "#040512",
        glow1: "rgba(168,85,247,0.16)",
        glow2: "rgba(99,102,241,0.14)",
        glow3: "rgba(244,114,182,0.10)",
        text: "rgba(238,242,255,0.96)",
        muted: "rgba(238,242,255,0.72)",
        card: "rgba(255,255,255,0.045)",
        card2: "rgba(255,255,255,0.07)",
        border: "rgba(168,85,247,0.24)",
        borderStrong: "rgba(168,85,247,0.36)",
        accent:
          "linear-gradient(135deg, rgba(168,85,247,0.98), rgba(99,102,241,0.96))",
        accentSoft:
          "linear-gradient(135deg, rgba(168,85,247,0.14), rgba(99,102,241,0.12))",
      };
    }
    return {
      bg: "#020617",
      glow1: "rgba(34,211,238,0.14)",
      glow2: "rgba(244,114,182,0.12)",
      glow3: "rgba(168,85,247,0.10)",
      text: "rgba(229,231,235,0.96)",
      muted: "rgba(229,231,235,0.70)",
      card: "rgba(255,255,255,0.04)",
      card2: "rgba(255,255,255,0.07)",
      border: "rgba(34,211,238,0.20)",
      borderStrong: "rgba(34,211,238,0.34)",
      accent:
        "linear-gradient(135deg, rgba(34,211,238,0.98), rgba(244,114,182,0.92))",
      accentSoft:
        "linear-gradient(135deg, rgba(34,211,238,0.12), rgba(244,114,182,0.10))",
    };
  }, [theme]);

  /* ------------------ copy ------------------ */

  const badges = [
    "passenger princess agenda",
    "eye contact: unfair advantage",
    "banter: elite tier",
    "teasing privileges enabled",
  ];

  const heroIntro = {
    titleTop: "unofficial • fan-made",
    titleBottom: "cute-coded • roast privileges enabled",
    body: [
      "talking to you is dangerously fun.",
      "like… blink-and-it’s-been-hours fun.",
      "and yes: her eyes are an unfair advantage and her smile is a reset button.",
      
      "disclaimer: this is not me being dramatic (ok maybe a bit).",
      "i’m just leaning into the fact that you’re cute.",
      "also: you get teasing privileges.",
    ],
  };

  const highlightsAndPerks = [
    "the smile that makes me forget what i was saying (rude)",
    "conversations that turn into 3-hour marathons by accident",
    "the way you tease me and somehow it still feels safe",
    "eye contact that should come with a warning label",
    "passenger princess experiences (i drive, you pick the music)",
    "laughing enough that i forget to act cool",
  ];

  const greenFlags = [
    "funny without trying too hard (rare)",
    "deadly cute but also genuinely sharp",
    "listen like you actually care",
    "teasing that’s gentle but lethal",
    "makes me want to show up better (unfair but appreciated)",
  ];

  const redFlags = [
    "bullying as a love language (i am not insured for this)",
    "may permanently ruin my tolerance for boring conversation",
    "driving lore includes a scratched car (character development arc)",
    "likely to win the ‘who’s cuter’ argument forever",
  ];

  const knownBugs = [
    "may cause me to smile at my phone like i’m an idiot",
    "background process: thinking about you (cannot terminate)",
    "driver module: under construction (passenger princess mode: fully supported)",
    "may reply instantly",
  ];

  const references: Review[] = [
    { from: "me", text: "i fear i enjoy this connection a little too much.", stars: 5 },
    { from: "my brain", text: "stop thinking about her challenge (failed instantly).", stars: 5 },
    { from: "independent testers", text: "banter quality: unreasonably high.", stars: 5 },
    { from: "quality assurance", text: "user reports: ‘time moved faster than expected.’", stars: 5 },
    { from: "dev team", text: "we built a website again. she’s winning.", stars: 5 },
  ];

  const messagePool = {
    funny: [
      "quick update: my brain has decided you’re its favourite topic. i’d like a refund.",
      "i opened our chat and forgot what i was doing. impressive work.",
      "you keep making me laugh and it’s starting to feel like a problem.",
      "respectfully, your banter is a safety hazard for my focus.",
    ],
    flirty: [
      "you’re kind of a problem. like ‘smiling at my phone’ problem.",
      "you have this calm cute energy that pulls you in. it’s unfair.",
      "i’m pretending i’m chill but… yeah. you’re really fun.",
      "i swear i looked up and got lost in your eyes for a second. rude.",
    ],
    cute: [
      "your smile keeps popping into my head for no reason and i’m not even mad about it.",
      "talking to you feels like falling into a really good story i don’t want to pause.",
      "you tease me in a way that makes me laugh and forget to be cool. unfair.",
      "passenger princess activities soon? i’ll drive. you pick the music. deal?",
    ],
    sincere: [
      "i genuinely like talking to you. it’s been really nice.",
      "you make things feel easy, and i appreciate that more than i’m admitting.",
      "you’ve been a bright part of my week, honestly.",
      "i like the way we talk. it feels real.",
    ],
    chaotic: [
      "i’m one message away from building avni.app v2. please advise.",
      "this connection is starting to feel like a canon event.",
      "respectfully, i’m losing the ‘act normal’ challenge.",
      "release notes: avni has broken my focus and my standards.",
    ],
    closers: [
      "anyway. hi.",
      "ok your turn. what are you up to?",
      "tell me something funny right now.",
      "so… when do i get to see you again?",
      "i’ll stop flirting now. maybe.",
    ],
  };

  function generate() {
    const mode = pick(["funny", "flirty", "cute", "sincere", "chaotic"] as const);
    const body = pick(messagePool[mode]);
    const close = pick(messagePool.closers);
    setGenerated(`${body} ${close}`);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(generated);
      setToast("copied.");
      setTimeout(() => setToast(null), 1200);
    } catch {
      setToast("copy failed.");
      setTimeout(() => setToast(null), 1200);
    }
  }

  function tryUnlock() {
    if (secretInput.trim() === SECRET_PASSWORD) {
      setSecretUnlocked(true);
      setToast("unlocked.");
      setTimeout(() => setToast(null), 1200);
      return;
    }
    setToast("wrong password.");
    setTimeout(() => setToast(null), 1200);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: palette.bg,
        color: palette.text,
        fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
      }}
    >
      {/* background glows */}
      <div
        style={{
          pointerEvents: "none",
          position: "fixed",
          inset: 0,
          background:
            `radial-gradient(900px circle at 15% 10%, ${palette.glow1}, transparent 60%),` +
            `radial-gradient(900px circle at 85% 0%, ${palette.glow2}, transparent 62%),` +
            `radial-gradient(800px circle at 50% 100%, ${palette.glow3}, transparent 58%)`,
        }}
      />

      {/* floating status tab (right, follows scroll) */}
      {!showIntro && (
        <div
          style={{
            position: "fixed",
            right: 18,
            top: 120,
            zIndex: 50,
            width: 240,
            maxWidth: "70vw",
            borderRadius: 18,
            padding: 12,
            border: `1px solid ${statusFlash ? palette.borderStrong : palette.border}`,
            background: statusFlash ? palette.accentSoft : "rgba(0,0,0,0.38)",
            boxShadow: statusFlash
              ? "0 18px 55px rgba(0,0,0,0.55)"
              : "0 14px 45px rgba(0,0,0,0.45)",
            backdropFilter: "blur(12px)",
            transition: "all 260ms ease",
          }}
        >
          <div style={{ fontSize: 11, color: palette.muted, letterSpacing: 0.2 }}>
            current status
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 13,
              lineHeight: 1.5,
              color: palette.text,
            }}
          >
            {statusLines[statusIdx]}
          </div>
        </div>
      )}

      <main
        style={{
          position: "relative",
          maxWidth: 1080,
          margin: "0 auto",
          padding: "26px 18px 44px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {showIntro ? (
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}
          >
            <div
              style={{
                width: "100%",
                borderRadius: 22,
                padding: 18,
                border: `1px solid ${palette.borderStrong}`,
                background: "rgba(0,0,0,0.48)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 20px 80px rgba(0,0,0,0.55)",
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: 14,
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.78, marginBottom: 12 }}>
                SYSTEM TERMINAL · Avni Connection OS
              </div>

              {typedLines.map((l, i) => (
                <div key={i} style={{ display: "flex", gap: 10 }}>
                  <span style={{ color: "#22c55e" }}>{">"}</span>
                  <span>{l}</span>
                </div>
              ))}

              <div style={{ marginTop: 14, opacity: 0.55, fontSize: 12 }}>
                tip: keep eye contact to a safe minimum (optional, not recommended)
              </div>
            </div>
          </motion.section>
        ) : (
          <>
            {/* hero */}
            <section
              style={{
                borderRadius: 22,
                padding: 18,
                border: `1px solid ${palette.borderStrong}`,
                background: palette.card,
                backdropFilter: "blur(12px)",
                boxShadow: "0 18px 70px rgba(0,0,0,0.45)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ minWidth: 240 }}>
                  <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: -1.3 }}>
                    avni<span style={{ opacity: 0.72 }}>.app</span>
                  </div>

                  <div style={{ marginTop: 6, color: palette.muted, fontSize: 14 }}>
                    {heroIntro.titleTop} • {heroIntro.titleBottom}
                  </div>
                </div>

                <ThemeTabs theme={theme} setTheme={setTheme} border={palette.border} />
              </div>

              <div
                style={{
                  marginTop: 14,
                  display: "grid",
                  gap: 8,
                  maxWidth: 860,
                }}
              >
                <div
                  style={{
                    borderRadius: 18,
                    border: `1px solid ${palette.border}`,
                    background: palette.card2,
                    padding: 14,
                    lineHeight: 1.75,
                    color: palette.muted,
                    boxShadow: "0 12px 36px rgba(0,0,0,0.25)",
                  }}
                >
                  {heroIntro.body.map((line, idx) =>
                    line ? (
                      <div key={idx}>{line}</div>
                    ) : (
                      <div key={idx} style={{ height: 8 }} />
                    )
                  )}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {badges.map((b) => (
                    <Badge key={b} text={b} border={palette.border} />
                  ))}
                </div>
              </div>
            </section>

            {/* CONTENT: one column */}
            <section style={{ display: "grid", gap: 14 }}>
              {/* 1) highlights + perks */}
              <InfoCard
                title="highlights + perks"
                subtitle="the reasons i keep getting lost in this"
                border={palette.border}
                bg={palette.card}
              >
                <TileGrid items={highlightsAndPerks} />
              </InfoCard>

              {/* 2) flags split */}
              <InfoCard
                title="flags"
                subtitle="green flags. red flags. respectfully."
                border={palette.border}
                bg={palette.card}
              >
                <div style={{ display: "grid", gap: 14 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 900, marginBottom: 8 }}>
                      green flags
                    </div>
                    <TileGrid items={greenFlags.map((x) => `green: ${x}`)} />
                  </div>

                  <div>
                    <div style={{ fontSize: 13, fontWeight: 900, marginBottom: 8 }}>
                      red flags (respectfully)
                    </div>
                    <TileGrid items={redFlags.map((x) => `red: ${x}`)} />
                  </div>
                </div>

                <div style={{ marginTop: 10, fontSize: 12, color: palette.muted }}>
                  note: “red” still means cute. i’m just documenting for safety.
                </div>
              </InfoCard>

              {/* 3) known bugs */}
              <InfoCard
                title="known bugs"
                subtitle="side effects (harmless but loud)"
                border={palette.border}
                bg={palette.card}
              >
                <TileGrid items={knownBugs} />
                <div style={{ marginTop: 10, fontSize: 12, color: palette.muted }}>
                  status: unresolved. severity: cute.
                </div>
              </InfoCard>

              {/* 4) message generator */}
              <InfoCard
                title="message generator"
                subtitle="one click. funny/flirty/cute/sincere/chaotic. sendable."
                border={palette.borderStrong}
                bg={palette.card}
              >
                <div
                  style={{
                    borderRadius: 16,
                    border: `1px solid ${palette.border}`,
                    background: palette.card2,
                    padding: 14,
                    boxShadow: "0 12px 36px rgba(0,0,0,0.25)",
                  }}
                >
                  <div style={{ fontSize: 12, color: palette.muted }}>output</div>
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 15,
                      lineHeight: 1.75,
                      color: palette.text,
                      overflowWrap: "anywhere",
                      wordBreak: "break-word",
                    }}
                  >
                    {generated}
                  </div>
                </div>

                <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <PrimaryButton onClick={generate} accent={palette.accent}>
                    generate
                  </PrimaryButton>

                  <GhostButton onClick={copy} border={palette.border} text={palette.text}>
                    copy
                  </GhostButton>

                  <GhostButton
                    onClick={() =>
                      setGenerated("hit generate and i’ll give you something you can actually send.")
                    }
                    border={palette.border}
                    text={palette.text}
                  >
                    reset
                  </GhostButton>
                </div>

                <div
                  style={{
                    marginTop: 12,
                    borderRadius: 16,
                    border: `1px solid ${palette.border}`,
                    background: palette.accentSoft,
                    padding: 12,
                    color: palette.text,
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: 13 }}>pro tip</div>
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 13,
                      color: palette.muted,
                      lineHeight: 1.6,
                    }}
                  >
                    if it generates something too chaotic, hit generate again until it’s
                    “cute but not cringe.” that’s the sweet spot.
                  </div>
                </div>
              </InfoCard>

              {/* references */}
              <InfoCard
                title="references"
                subtitle="highly biased external validation"
                border={palette.border}
                bg={palette.card}
              >
                <div style={{ display: "grid", gap: 10 }}>
                  {references.map((r, i) => (
                    <div
                      key={i}
                      style={{
                        borderRadius: 16,
                        padding: 12,
                        border: `1px solid ${palette.border}`,
                        background: palette.card2,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                      }}
                    >
                      <div style={{ fontSize: 12, color: palette.muted }}>from: {r.from}</div>
                      <div
                        style={{
                          marginTop: 6,
                          fontSize: 14,
                          lineHeight: 1.6,
                          color: palette.text,
                        }}
                      >
                        {r.text}
                      </div>
                      <div style={{ marginTop: 8, fontSize: 12, color: palette.muted }}>
                        {"★★★★★".slice(0, r.stars ?? 5)}
                      </div>
                    </div>
                  ))}
                </div>
              </InfoCard>

              {/* password unlock (end) */}
              <InfoCard
                title="private"
                subtitle="for avni only (no pressure)"
                border={palette.borderStrong}
                bg={palette.card}
              >
                {!secretUnlocked ? (
                  <div style={{ display: "grid", gap: 10, width: "100%" }}>
                    <div style={{ fontSize: 13, color: palette.muted, lineHeight: 1.6 }}>
                      if you’re here, you get the little secret message.
                      it’s not deep. just… genuinely sweet.
                    </div>

                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", width: "100%" }}>
                      <input
                        value={secretInput}
                        onChange={(e) => setSecretInput(e.target.value)}
                        placeholder="password"
                        spellCheck={false}
                        style={{
                          flex: "1 1 420px",
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: 14,
                          border: `1px solid ${palette.border}`,
                          background: "rgba(0,0,0,0.28)",
                          color: palette.text,
                          outline: "none",
                          fontSize: 14,
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") tryUnlock();
                        }}
                      />
                      <PrimaryButton onClick={tryUnlock} accent={palette.accent}>
                        unlock
                      </PrimaryButton>
                    </div>

                    <div style={{ fontSize: 12, color: palette.muted }}>
                      hint: it’s literally <span style={{ opacity: 0.9 }}>mypassengerprincess</span>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.42, ease: "easeOut" }}
                    style={{
                      position: "relative",
                      borderRadius: 16,
                      border: `1px solid ${palette.border}`,
                      background: palette.accentSoft,
                      padding: 14,
                      maxWidth: 720,
                      overflow: "hidden",
                      boxShadow: "0 18px 60px rgba(0,0,0,0.45)",
                    }}
                  >
                    <SparkleBurst />

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.35 }}
                      style={{ fontSize: 12, color: palette.muted }}
                    >
                      unlocked
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                      style={{ marginTop: 8, fontSize: 15, lineHeight: 1.75, color: palette.text }}
                    >
                      ok. hi.
                      <br />
                      i’m not great at saying things without hiding behind a bit, so i’ll just say it clean:
                      <br />
                      being around you feels warm. like my day gets lighter on purpose.
                      <br />
                      you make me smile when i’m alone. you make me feel seen when we’re together.
                      <br />
                      and if you ever forget how lovable you are, i’ll be annoyingly consistent about reminding you.
                    </motion.div>

                    <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <GhostButton
                        onClick={() => {
                          setSecretUnlocked(false);
                          setSecretInput("");
                          setToast("locked.");
                          setTimeout(() => setToast(null), 900);
                        }}
                        border={palette.border}
                        text={palette.text}
                      >
                        lock again
                      </GhostButton>
                    </div>
                  </motion.div>

                )}
              </InfoCard>

                            {/* date picker (below private) */}
              <InfoCard
                title="pick our next date"
                subtitle="your choice… or you can make me choose."
                border={palette.borderStrong}
                bg={palette.card}
              >
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <PrimaryButton
                    onClick={() => setDateMode("choose")}
                    accent={palette.accent}
                  >
                    you choose
                  </PrimaryButton>

                  <GhostButton
                    onClick={surpriseMe}
                    border={palette.border}
                    text={palette.text}
                  >
                    surprise me
                  </GhostButton>

                  {pickedDate && (
                    <GhostButton
                      onClick={() => {
                        setPickedDate(null);
                        setToast("cleared.");
                        setTimeout(() => setToast(null), 900);
                      }}
                      border={palette.border}
                      text={palette.text}
                    >
                      clear
                    </GhostButton>
                  )}
                </div>

                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 12, color: palette.muted, marginBottom: 10 }}>
                    tap a bubble and it’s locked in.
                  </div>

                  <TileGrid
                    items={dateOptions}
                    selectedIndex={pickedDate ? dateOptions.indexOf(pickedDate) : null}
                    onItemClick={(idx) => chooseDate(dateOptions[idx])}
                  />

                  {(spinning || pickedDate) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      style={{
                        marginTop: 12,
                        borderRadius: 16,
                        border: `1px solid ${palette.border}`,
                        background: palette.accentSoft,
                        padding: 12,
                        maxWidth: 720,
                        boxShadow: "0 14px 45px rgba(0,0,0,0.35)",
                      }}
                    >
                      <div style={{ fontSize: 12, color: palette.muted }}>
                        {spinning ? "calculating vibes..." : "locked in"}
                      </div>
                      <div style={{ marginTop: 6, fontSize: 16, fontWeight: 900 }}>
                        {pickedDate ?? "…"}
                      </div>
                      {!spinning && pickedDate && (
                        <div style={{ marginTop: 6, fontSize: 13, color: palette.muted }}>
                          i’ll drive. you pick the vibe. 🤝
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </InfoCard>
            </section>

            <section
              style={{
                textAlign: "center",
                fontSize: 12,
                color: palette.muted,
                padding: "10px 0 16px",
              }}
            >
              built as a joke. unless it works. then it’s a case study.
            </section>
          </>
        )}
      </main>

      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 18,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 14px",
            borderRadius: 999,
            background: "rgba(0,0,0,0.62)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: palette.text,
            backdropFilter: "blur(12px)",
            fontSize: 13,
            boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
            zIndex: 60,
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}

/* ------------------ UI components ------------------ */

function ThemeTabs({
  theme,
  setTheme,
  border,
}: {
  theme: Theme;
  setTheme: (t: Theme) => void;
  border: string;
}) {
  const tabs: Theme[] = ["berry", "lavender", "midnight"];

  return (
    <div
      style={{
        display: "inline-flex",
        border: `1px solid ${border}`,
        borderRadius: 999,
        padding: 4,
        background: "rgba(0,0,0,0.22)",
        gap: 4,
        alignSelf: "flex-start",
      }}
    >
      {tabs.map((t) => {
        const active = t === theme;
        return (
          <button
            key={t}
            onClick={() => setTheme(t)}
            style={{
              padding: "8px 12px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 800,
              color: active ? "rgba(0,0,0,0.88)" : "rgba(255,255,255,0.86)",
              background: active ? "rgba(255,255,255,0.92)" : "transparent",
              transition: "all 140ms ease",
              whiteSpace: "nowrap",
            }}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

function Badge({ text, border }: { text: string; border: string }) {
  return (
    <span
      style={{
        padding: "7px 12px",
        borderRadius: 999,
        border: `1px solid ${border}`,
        background: "rgba(0,0,0,0.26)",
        fontSize: 12,
        color: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(10px)",
      }}
    >
      {text}
    </span>
  );
}

function InfoCard({
  title,
  subtitle,
  children,
  border,
  bg,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  border: string;
  bg: string;
}) {
  return (
    <div
      style={{
        borderRadius: 22,
        padding: 16,
        background: bg,
        border: `1px solid ${border}`,
        backdropFilter: "blur(12px)",
        boxShadow: "0 14px 55px rgba(0,0,0,0.30)",
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: -0.2 }}>
        {title}
      </div>
      <div style={{ marginTop: 4, fontSize: 12, opacity: 0.78 }}>{subtitle}</div>
      <div style={{ marginTop: 12 }}>{children}</div>
    </div>
  );
}

/**
 * Hover-reactive bubbles:
 * - lift + glow on hover
 * - optional subtle gradient highlight following cursor
 */
function TileGrid({
  items,
  onItemClick,
  selectedIndex,
}: {
  items: string[];
  onItemClick?: (idx: number) => void;
  selectedIndex?: number | null;
}) {

  const [hovered, setHovered] = useState<number | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 12,
      }}
    >
      {items.map((x, idx) => {
        const isHover = hovered === idx;

        return (
          <div
            key={`${x}-${idx}`}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            onMouseMove={(e) => {
              const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
              const px = ((e.clientX - rect.left) / rect.width) * 100;
              const py = ((e.clientY - rect.top) / rect.height) * 100;
              setPos({ x: px, y: py });
            }}
            style={{
              padding: "12px 14px",
              borderRadius: 16,
              border: isHover ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(255,255,255,0.12)",
              fontSize: 14,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.92)",
              minHeight: 56,
              display: "flex",
              alignItems: "center",
              overflowWrap: "anywhere",
              wordBreak: "break-word",
              whiteSpace: "normal",
              cursor: "default",
              transform: isHover ? "translateY(-2px)" : "translateY(0px)",
              boxShadow: isHover ? "0 16px 40px rgba(0,0,0,0.35)" : "0 10px 28px rgba(0,0,0,0.22)",
              transition: "transform 140ms ease, box-shadow 180ms ease, border-color 180ms ease, background 180ms ease",
              background: isHover
                ? `radial-gradient(420px circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.12), rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.045) 80%)`
                : "rgba(255,255,255,0.06)",
            }}
          >
            {x}
          </div>
        );
      })}
    </div>
  );
}

function PrimaryButton({
  onClick,
  children,
  accent,
}: {
  onClick: () => void;
  children: React.ReactNode;
  accent: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 16px",
        borderRadius: 999,
        border: "none",
        background: accent,
        color: "#0b0612",
        fontWeight: 900,
        cursor: "pointer",
        fontSize: 14,
        boxShadow: "0 14px 38px rgba(0,0,0,0.35)",
      }}
    >
      {children}
    </button>
  );
}

function GhostButton({
  onClick,
  children,
  border,
  text,
}: {
  onClick: () => void;
  children: React.ReactNode;
  border: string;
  text: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 16px",
        borderRadius: 999,
        border: `1px solid ${border}`,
        background: "rgba(0,0,0,0.26)",
        color: text,
        cursor: "pointer",
        fontSize: 14,
        backdropFilter: "blur(10px)",
      }}
    >
      {children}
    </button>
  );
}

function SparkleBurst() {
  const dots = Array.from({ length: 10 });

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {dots.map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0.6],
            x: (Math.cos((i / dots.length) * Math.PI * 2) * 90) | 0,
            y: (Math.sin((i / dots.length) * Math.PI * 2) * 55) | 0,
          }}
          transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.02 }}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 6,
            height: 6,
            borderRadius: 999,
            background: "rgba(255,255,255,0.85)",
            boxShadow: "0 0 18px rgba(244,114,182,0.35)",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}
