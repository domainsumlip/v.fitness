import { useState, useEffect } from "react";

function useWidth() {
  var _s = useState(typeof window !== "undefined" ? window.innerWidth : 800);
  var w = _s[0]; var set = _s[1];
  useEffect(function() {
    function h() { set(window.innerWidth); }
    window.addEventListener("resize", h);
    return function() { window.removeEventListener("resize", h); };
  }, []);
  return w;
}

function Icon({ d, size, color }) {
  return (
    <svg width={size || 16} height={size || 16} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

var icons = {
  target: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
  utensils: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7",
  activity: "M22 12h-4l-3 9L9 3l-3 9H2",
  calendar: "M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM16 2v4M8 2v4M3 10h18",
  clock: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2",
  chevDown: "M6 9l6 6 6-6",
  chevUp: "M18 15l-6-6-6 6",
  droplet: "M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z",
  trending: "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
  moon: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  heart: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
};

var tabList = [
  { key: "body", label: "Body", full: "Body Analysis", icon: "target" },
  { key: "nutrition", label: "Nutrition", full: "Nutrition", icon: "utensils" },
  { key: "training", label: "Training", full: "Training", icon: "activity" },
  { key: "roadmap", label: "Roadmap", full: "Roadmap", icon: "calendar" },
  { key: "daily", label: "Daily", full: "Daily Plan", icon: "clock" },
];

var accent = "#2563EB";
var accentLight = "#EFF6FF";
var bdr = "#E5E7EB";
var bgCard = "#FFFFFF";
var bgPage = "#F9FAFB";
var textP = "#111827";
var textS = "#6B7280";
var textM = "#9CA3AF";

function Section(props) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: textP, margin: "0 0 4px" }}>{props.title}</h2>
      {props.subtitle ? <p style={{ fontSize: 13, color: textS, margin: "0 0 14px", lineHeight: 1.5 }}>{props.subtitle}</p> : <div style={{ height: 10 }} />}
      {props.children}
    </div>
  );
}

function StatCard(props) {
  return (
    <div style={{ background: bgCard, border: "1px solid " + bdr, borderRadius: 10, padding: "12px 14px" }}>
      <div style={{ fontSize: 10, color: textM, fontWeight: 600, letterSpacing: 0.5, marginBottom: 3, textTransform: "uppercase" }}>{props.label}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: textP }}>{props.value}</div>
    </div>
  );
}

function InfoCard(props) {
  return (
    <div style={{ background: bgCard, border: "1px solid " + bdr, borderRadius: 10, padding: 14, borderLeft: "3px solid " + (props.ac || accent) }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: textP, marginBottom: 5 }}>{props.title}</div>
      <div style={{ fontSize: 13, color: textS, lineHeight: 1.6 }}>{props.body}</div>
    </div>
  );
}

function Btn(props) {
  var bg = props.active ? (props.color || accent) : bgCard;
  var bc = props.active ? (props.color || accent) : bdr;
  var fg = props.active ? "#fff" : textS;
  return (
    <button onClick={props.onClick} style={{
      background: bg, border: "1px solid " + bc, color: fg,
      borderRadius: 8, padding: "7px 14px", cursor: "pointer",
      fontSize: 12, fontWeight: 600, whiteSpace: "nowrap",
    }}>{props.label}</button>
  );
}

function BodySection() {
  var w = useWidth(); var sm = w < 600;
  var stats = [
    ["Height", "6'3\" / 190.5 cm"], ["Weight", "200 lbs / 90.7 kg"],
    ["Frame", "Meso-Ectomorph"], ["Maintenance", "~3,050 cal/day"],
    ["Target Weight", "188-198 lbs"], ["Target BF%", "10-12%"],
    ["Muscle Ceiling", "~215-225 lbs"], ["Timeline", "12-16 months"],
  ];
  var advantages = [
    ["Stride Length", "Longer limbs cover more ground per stride. With proper mechanics your top-end speed exceeds most people from physics alone."],
    ["Force at Lever End", "Longer arms generate more force at the contact point. Reach advantage cannot be trained into a shorter person."],
    ["Wingspan", "Arm span likely matches or exceeds height. Elite for catching, blocking, or reaching in any sport."],
    ["Muscle Volume", "Longer muscles have higher total volume potential. Genetic ceiling for lean mass is higher in absolute terms."],
  ];
  var challenges = [
    ["Long Femurs + Squats", "Thigh bones force excessive forward lean in back squats. Bulgarian split squats and hip hinges suit your levers far better."],
    ["Hip Flexor Tightness", "Tall frames accumulate tightness faster, directly capping sprint speed and jump height. Daily hip mobility is non-optional."],
    ["Greater Joint Range", "More ROM per rep means more joint stress. Push-ups, dips, and pull-ups require stricter form at full extension."],
    ["Slower Acceleration", "Taller athletes take longer to reach top speed. The first 5 yards need specific acceleration drills to close this gap."],
  ];
  return (
    <div>
      <Section title="Stats at a Glance">
        <div style={{ display: "grid", gridTemplateColumns: sm ? "1fr 1fr" : "repeat(auto-fill, minmax(160px, 1fr))", gap: 8 }}>
          {stats.map(function(s, i) { return <StatCard key={i} label={s[0]} value={s[1]} />; })}
        </div>
      </Section>
      <Section title="Frame Advantages" subtitle="Built-in physical edges at 6'3 that shorter athletes cannot replicate.">
        <div style={{ display: "grid", gridTemplateColumns: sm ? "1fr" : "repeat(auto-fill, minmax(260px, 1fr))", gap: 8 }}>
          {advantages.map(function(a, i) { return <InfoCard key={i} title={a[0]} body={a[1]} ac="#16A34A" />; })}
        </div>
      </Section>
      <Section title="Frame Challenges" subtitle="Structural realities to train around, not weaknesses, just different mechanics.">
        <div style={{ display: "grid", gridTemplateColumns: sm ? "1fr" : "repeat(auto-fill, minmax(260px, 1fr))", gap: 8 }}>
          {challenges.map(function(c, i) { return <InfoCard key={i} title={c[0]} body={c[1]} ac="#DC2626" />; })}
        </div>
      </Section>
      <Section title="Composition Reality Check">
        <div style={{ background: accentLight, border: "1px solid #BFDBFE", borderRadius: 10, padding: sm ? 14 : 20, fontSize: 13, color: "#1E40AF", lineHeight: 1.75 }}>
          At 200 lbs and 6'3", you're likely between <strong>15-22% body fat</strong>. During transformation the scale may barely move while your body completely changes shape. Your target is <strong>188-198 lbs at 10-12% BF</strong>, carrying ~168-178 lbs lean mass. A lean 190 looks dramatically different from a soft 200. Your natural ceiling is ~<strong>215-225 lbs lean</strong>. Reaching 60% puts you at 195-205 lbs of elite athletic mass.
        </div>
      </Section>
    </div>
  );
}

function NutritionSection() {
  var w = useWidth(); var sm = w < 600;
  var _s = useState("recomp"); var goal = _s[0]; var setGoal = _s[1];
  var goals = {
    recomp: { label: "Recomp", cals: 3050, carbs: 320, protein: 195, fat: 85, desc: "Eat at maintenance. Build muscle and lose fat simultaneously. Slower but no sacrifice required. Best starting point." },
    cut: { label: "Cut", cals: 2650, carbs: 240, protein: 200, fat: 75, desc: "400 calorie deficit. Prioritizes fat loss while preserving muscle. Lose 0.5-1 lb/week. Keep protein high." },
    bulk: { label: "Lean Bulk", cals: 3350, carbs: 400, protein: 195, fat: 90, desc: "300 calorie surplus. Prioritizes muscle growth with minimal fat gain. Best when already under 15% BF." },
  };
  var sel = goals[goal];
  var meals = [
    { time: "7:00 AM", name: "Power Start", items: ["4 whole eggs", "1 cup oats + berries", "2 tbsp hemp seeds", "Black coffee"], p: 34, carb: 58, f: 24, cal: 560 },
    { time: "10:00 AM", name: "Protein Bridge", items: ["Pea+rice protein shake", "Banana", "1 oz pumpkin seeds"], p: 30, carb: 38, f: 16, cal: 380 },
    { time: "12:30 PM", name: "Performance Fuel", items: ["150g seitan", "1.5 cups rice", "Edamame", "Mixed veg + lemon"], p: 45, carb: 65, f: 10, cal: 580 },
    { time: "Pre-WO", name: "Training Fuel", items: ["1 cup oats", "Soy yogurt", "Banana", "1 tbsp almond butter"], p: 22, carb: 55, f: 12, cal: 400 },
    { time: "Post-WO", name: "Recovery Window", items: ["200g tempeh", "1.5 cups white rice", "Edamame", "Berries"], p: 42, carb: 60, f: 16, cal: 560 },
    { time: "8:00 PM", name: "Overnight Build", items: ["Lentil + chickpea bowl", "1 cup quinoa", "Greens + pumpkin seeds", "Olive oil"], p: 38, carb: 58, f: 18, cal: 560 },
  ];
  var supps = [
    ["Creatine Monohydrate", "5g daily", "Most researched supplement. Increases explosive power and sprint speed."],
    ["Vitamin B12 (Methylcobalamin)", "1,000mcg daily", "Non-negotiable on a vegan diet. Deficiency causes nerve damage, fatigue, and brain fog. Take with breakfast."],
    ["Vitamin D3 + K2", "4,000 IU + 100mcg", "Critical for testosterone, bones, and immunity. Most tall athletes are deficient."],
    ["Magnesium Glycinate", "300-400mg before bed", "Dramatically improves deep sleep quality. Most people are deficient."],
    ["Algal Omega-3", "2-3g EPA+DHA", "Vegan alternative to fish oil. Same anti-inflammatory and joint benefits from algae source."],
    ["Caffeine", "200-300mg pre-train", "Proven power output increase. Cycle off 1 week/month."],
  ];
  var macroDisplay = [["Calories", sel.cals], ["Protein", sel.protein + "g"], ["Carbs", sel.carbs + "g"], ["Fat", sel.fat + "g"]];
  return (
    <div>
      <Section title="Calorie and Macro Targets" subtitle="Select your current goal to see adjusted targets.">
        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
          {Object.keys(goals).map(function(k) { return <Btn key={k} label={goals[k].label} active={goal === k} onClick={function() { setGoal(k); }} />; })}
        </div>
        <div style={{ background: bgCard, border: "1px solid " + bdr, borderRadius: 10, padding: sm ? 14 : 20 }}>
          <p style={{ fontSize: 13, color: textS, margin: "0 0 14px", lineHeight: 1.6 }}>{sel.desc}</p>
          <div style={{ display: "grid", gridTemplateColumns: sm ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 8 }}>
            {macroDisplay.map(function(item) {
              return (
                <div key={item[0]} style={{ textAlign: "center", background: bgPage, borderRadius: 8, padding: "10px 6px" }}>
                  <div style={{ fontSize: 10, color: textM, fontWeight: 600, textTransform: "uppercase", marginBottom: 2 }}>{item[0]}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: accent }}>{item[1]}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>
      <Section title="Full Day Meal Plan">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {meals.map(function(m, i) {
            var macros = [["P", m.p + "g"], ["C", m.carb + "g"], ["F", m.f + "g"], ["Cal", m.cal]];
            return (
              <div key={i} style={{ background: bgCard, border: "1px solid " + bdr, borderRadius: 10, padding: sm ? "12px 12px" : "14px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                  <div>
                    <div style={{ fontSize: 11, color: accent, fontWeight: 700, marginBottom: 1 }}>{m.time}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: textP }}>{m.name}</div>
                  </div>
                  <div style={{ display: "flex", gap: sm ? 10 : 14 }}>
                    {macros.map(function(mc) {
                      return (
                        <div key={mc[0]} style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 9, color: textM, fontWeight: 700 }}>{mc[0]}</div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: textP }}>{mc[1]}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: textS }}>{m.items.join(" · ")}</div>
              </div>
            );
          })}
        </div>
      </Section>
      <Section title="Supplement Stack">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {supps.map(function(s, i) {
            return (
              <div key={i} style={{ background: bgCard, border: "1px solid " + bdr, borderRadius: 10, padding: sm ? 12 : 16, display: "flex", gap: 12, alignItems: "start" }}>
                <div style={{ background: accentLight, borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: accent, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: textP }}>{s[0]}</div>
                  <div style={{ fontSize: 11, color: accent, fontWeight: 600, marginBottom: 3 }}>{s[1]}</div>
                  <div style={{ fontSize: 13, color: textS, lineHeight: 1.5 }}>{s[2]}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

function TrainingSection() {
  var w = useWidth(); var sm = w < 600;
  var tagColors = { SWAP: "#DC2626", ADD: "#16A34A", ADJUST: "#D97706", PRIORITIZE: "#7C3AED", "NON-NEGOTIABLE": "#DC2626" };
  var adjustments = [
    ["SWAP", "Replace Standard Squats with Bulgarian Split Squat + Hip Hinge", "Long femurs cause excessive forward lean in back squats. Split squats and RDLs load your legs correctly for your lever length."],
    ["ADD", "Daily Hip Mobility - 10 min every morning", "Highest-return addition. Tight hip flexors from long legs cap sprint speed and jump height. Couch stretch, 90/90, deep lunge every morning."],
    ["ADJUST", "Pull-Up Grip Width", "Wider grip matches your proportions and reduces elbow stress. Never fully lock out. Keep a soft bend to protect longer joints."],
    ["ADD", "Wall-Drive Acceleration Drills", "Taller athletes accelerate slower from stops. Wall drives 3x10 reps before speed work programs the short powerful strides needed."],
    ["PRIORITIZE", "Single-Leg Work at 60% of Lower Body", "Every sprint stride and jump is single-leg. Make 60% of lower body training unilateral."],
    ["ADD", "Double Calf and Ankle Volume", "Long legs mean your calf complex works harder per stride. Single-leg calf raises on a step, 4x20 daily."],
    ["NON-NEGOTIABLE", "Deload Every 4th Week", "Greater ROM per rep means more joint stress. Cut volume 50%, keep intensity, for 7 days every 4th week."],
  ];
  var mobility = [
    ["Couch Stretch", "90s/side", "Hip flexors"],
    ["Hip 90/90", "90s/side", "Int/ext rotation"],
    ["Deep Lunge + Rotation", "60s/side", "Hip flexor + thoracic"],
    ["Pigeon Pose", "60s/side", "Glute + ext rotator"],
    ["Deep Squat Hold", "2 min", "Ankle + hip + thoracic"],
    ["Doorframe Pec Stretch", "60s", "Chest + front shoulder"],
  ];
  return (
    <div>
      <Section title="Frame-Specific Adjustments" subtitle="Training modifications calibrated for your 6'3 frame and lever lengths.">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {adjustments.map(function(a, i) {
            var tc = tagColors[a[0]] || accent;
            return (
              <div key={i} style={{ background: bgCard, border: "1px solid " + bdr, borderRadius: 10, padding: sm ? 12 : 16 }}>
                <div style={{ marginBottom: 6, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6 }}>
                  <span style={{ display: "inline-block", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: tc + "18", color: tc, letterSpacing: 0.5 }}>{a[0]}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: textP }}>{a[1]}</span>
                </div>
                <div style={{ fontSize: 13, color: textS, lineHeight: 1.6 }}>{a[2]}</div>
              </div>
            );
          })}
        </div>
      </Section>
      <Section title="Daily Hip Mobility - 10 Minutes" subtitle="The single highest-return daily habit for your frame.">
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {mobility.map(function(m, i) {
            return (
              <div key={i} style={{ background: bgCard, border: "1px solid " + bdr, borderRadius: 8, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", minWidth: 0 }}>
                  <span style={{ fontSize: 12, color: accent, fontWeight: 700 }}>{i + 1}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: textP }}>{m[0]}</span>
                  {!sm && <span style={{ fontSize: 11, color: textM }}>{m[2]}</span>}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: textS, whiteSpace: "nowrap" }}>{m[1]}</div>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

function ExCard(props) {
  var w = useWidth(); var sm = w < 500;
  var macros = [["Sets", props.sets], ["Reps", props.reps], ["Rest", props.rest]];
  return (
    <div style={{ background: bgPage, border: "1px solid " + bdr, borderRadius: 8, padding: "10px 12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: sm ? "start" : "center", flexDirection: sm ? "column" : "row", gap: sm ? 6 : 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: textP }}>{props.name}</div>
          {props.notes && <div style={{ fontSize: 11, color: textM, lineHeight: 1.45, marginTop: 2 }}>{props.notes}</div>}
        </div>
        <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
          {macros.map(function(mc) {
            return (
              <div key={mc[0]} style={{ textAlign: "center", minWidth: 32 }}>
                <div style={{ fontSize: 8, color: textM, fontWeight: 700, textTransform: "uppercase" }}>{mc[0]}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: textP }}>{mc[1]}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DayCard(props) {
  var _s = useState(false); var open = _s[0]; var setOpen = _s[1];
  var isRest = props.exercises.length === 0;
  var lc = isRest ? bdr : (props.phaseColor || accent);
  return (
    <div style={{ background: bgCard, border: "1px solid " + bdr, borderRadius: 10, overflow: "hidden", marginBottom: 6, opacity: isRest ? 0.5 : 1 }}>
      <div onClick={function() { if (!isRest) setOpen(!open); }}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 14px", cursor: isRest ? "default" : "pointer", borderLeft: "3px solid " + lc, gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", minWidth: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: props.phaseColor || accent, flexShrink: 0 }}>{props.day}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: textP }}>{props.title}</span>
          {props.focus ? <span style={{ fontSize: 10, color: textM, fontWeight: 600 }}>{props.focus}</span> : null}
        </div>
        {!isRest && (
          <div style={{ display: "flex", alignItems: "center", gap: 4, color: textM, fontSize: 11, flexShrink: 0 }}>
            <span>{props.exercises.length}</span>
            <Icon d={open ? icons.chevUp : icons.chevDown} size={14} color={textM} />
          </div>
        )}
      </div>
      {open && !isRest && (
        <div style={{ padding: "0 14px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
          {props.exercises.map(function(ex, i) { return <ExCard key={i} name={ex.name} sets={ex.sets} reps={ex.reps} rest={ex.rest} notes={ex.notes} />; })}
        </div>
      )}
    </div>
  );
}

var pw = {
  0: [
    { day: "MON", title: "Full Body Push + Legs", focus: "STRENGTH", exercises: [
      { name: "Push-Ups (Incline to Flat)", sets: "4", reps: "8-12", rest: "90s", notes: "Start elevated if needed. Full ROM, elbows 45. Slow 3s eccentric." },
      { name: "Bulgarian Split Squats", sets: "3", reps: "8/leg", rest: "90s", notes: "Frame-specific squat swap. Rear foot on bench, torso upright." },
      { name: "Pike Push-Ups", sets: "3", reps: "6-10", rest: "90s", notes: "Feet elevated. Shoulder builder toward HSPUs." },
      { name: "Glute Bridges", sets: "3", reps: "15", rest: "60s", notes: "2s squeeze at top. Foundation for single-leg hip thrust." },
      { name: "Dead Hang", sets: "3", reps: "30-45s", rest: "60s", notes: "Grip + spine decompression for tall frames." },
      { name: "Single-Leg Calf Raises", sets: "4", reps: "20/leg", rest: "45s", notes: "Full ROM on step. Double volume for long legs." },
    ]},
    { day: "TUE", title: "Recovery + Mobility", focus: "", exercises: [
      { name: "Hip Mobility Flow", sets: "1", reps: "10 min", rest: "-", notes: "Couch stretch, 90/90, deep lunge, pigeon, deep squat." },
      { name: "Light Walk or Swim", sets: "1", reps: "20-30m", rest: "-", notes: "Low intensity. Blood flow recovery." },
      { name: "Foam Roll Full Body", sets: "1", reps: "10 min", rest: "-", notes: "Quads, IT band, lats, thoracic." },
    ]},
    { day: "WED", title: "Speed + Plyometrics", focus: "POWER", exercises: [
      { name: "Wall Drives", sets: "3", reps: "10/leg", rest: "60s", notes: "Explosive knee drive. Acceleration drill." },
      { name: "Broad Jumps", sets: "4", reps: "5", rest: "90s", notes: "Max distance. Full hip extension. Stick 2s." },
      { name: "Sprint Intervals (40 yd)", sets: "6", reps: "1", rest: "2 min", notes: "90% effort. Focus first 10 yards." },
      { name: "Box Jumps (step down)", sets: "3", reps: "5", rest: "90s", notes: "20-24in box. Explode up, step down." },
      { name: "Single-Leg Bounds", sets: "3", reps: "6/leg", rest: "90s", notes: "Max distance per bound." },
    ]},
    { day: "THU", title: "Rest Day", focus: "RECOVERY", exercises: [] },
    { day: "FRI", title: "Full Body Pull + Legs", focus: "STRENGTH", exercises: [
      { name: "Pull-Ups (or Negatives)", sets: "4", reps: "5-8", rest: "2 min", notes: "Wider grip. Soft lockout." },
      { name: "Single-Leg RDL", sets: "3", reps: "8/leg", rest: "90s", notes: "Hamstring and balance builder." },
      { name: "Australian Rows", sets: "4", reps: "10-12", rest: "90s", notes: "Feet elevated. Squeeze scapulae." },
      { name: "Single-Leg Hip Thrusts", sets: "3", reps: "10/leg", rest: "60s", notes: "Glute power for sprints." },
      { name: "Dip Negatives", sets: "3", reps: "5-8", rest: "90s", notes: "Slow 4s lowering." },
      { name: "Single-Leg Calf Raises", sets: "4", reps: "20/leg", rest: "45s", notes: "Daily calf volume." },
    ]},
    { day: "SAT", title: "Conditioning + Core", focus: "ENDURANCE", exercises: [
      { name: "Burpee Intervals", sets: "5", reps: "10", rest: "60s", notes: "Full extension top, chest to floor." },
      { name: "Hollow Body Hold", sets: "4", reps: "30s", rest: "45s", notes: "Lower back pressed to floor." },
      { name: "Mountain Climbers", sets: "4", reps: "20/side", rest: "45s", notes: "Controlled. Hip flexor activation." },
      { name: "L-Sit Progression", sets: "3", reps: "15-20s", rest: "60s", notes: "Tuck if needed." },
      { name: "Bear Crawl", sets: "3", reps: "40 yd", rest: "60s", notes: "Knees 1in off ground." },
    ]},
    { day: "SUN", title: "Full Rest", focus: "RECOVERY", exercises: [] },
  ],
  1: [
    { day: "MON", title: "Upper Push", focus: "HYPERTROPHY", exercises: [
      { name: "Diamond Push-Ups", sets: "4", reps: "10-15", rest: "90s", notes: "Tricep dominant." },
      { name: "Pike Push-Ups (elevated)", sets: "4", reps: "8-10", rest: "90s", notes: "Approaching HSPU territory." },
      { name: "Pseudo Planche Push-Ups", sets: "3", reps: "6-10", rest: "2 min", notes: "Lean forward. Advanced." },
      { name: "Dips", sets: "4", reps: "8-12", rest: "90s", notes: "Slight forward lean." },
      { name: "Archer Push-Ups", sets: "3", reps: "6/side", rest: "90s", notes: "One-arm push-up progression." },
      { name: "Tricep Bench Dips", sets: "3", reps: "15", rest: "60s", notes: "Burnout finisher." },
    ]},
    { day: "TUE", title: "Lower Power", focus: "STR + SPEED", exercises: [
      { name: "Pistol Squat Progressions", sets: "4", reps: "5/leg", rest: "2 min", notes: "Assisted to full." },
      { name: "Nordic Hamstring Curls", sets: "3", reps: "5-8", rest: "2 min", notes: "Eccentric focus." },
      { name: "Depth Jumps (12-18in)", sets: "4", reps: "5", rest: "2 min", notes: "Step off, land, explode." },
      { name: "Single-Leg Hip Thrusts", sets: "4", reps: "10/leg", rest: "90s", notes: "Backpack or band." },
      { name: "Sprint Intervals (60 yd)", sets: "8", reps: "1", rest: "2 min", notes: "95% effort." },
      { name: "Single-Leg Calf Raises", sets: "4", reps: "25/leg", rest: "45s", notes: "Building spring." },
    ]},
    { day: "WED", title: "Upper Pull", focus: "HYPERTROPHY", exercises: [
      { name: "Pull-Ups (wide)", sets: "4", reps: "8-10", rest: "2 min", notes: "Full scapular engagement." },
      { name: "Chin-Ups", sets: "3", reps: "8-10", rest: "90s", notes: "Bicep emphasis." },
      { name: "Typewriter Pull-Ups", sets: "3", reps: "4/side", rest: "2 min", notes: "One-arm progression." },
      { name: "Australian Rows", sets: "4", reps: "12", rest: "60s", notes: "1s pause at top." },
      { name: "Face Pulls (band)", sets: "3", reps: "15", rest: "45s", notes: "Shoulder health." },
      { name: "Hanging Leg Raises", sets: "4", reps: "10", rest: "60s", notes: "Straight legs to parallel." },
    ]},
    { day: "THU", title: "Active Recovery", focus: "MOBILITY", exercises: [
      { name: "Full Hip Mobility Flow", sets: "1", reps: "15 min", rest: "-", notes: "Extended routine." },
      { name: "Light Jog or Swim", sets: "1", reps: "20 min", rest: "-", notes: "Zone 2 only." },
      { name: "Foam Roll + Lacrosse Ball", sets: "1", reps: "15 min", rest: "-", notes: "Quads, hip flexors, lats." },
    ]},
    { day: "FRI", title: "Lower Strength", focus: "MAX EFFORT", exercises: [
      { name: "Bulgarian Split Squats (wtd)", sets: "5", reps: "6/leg", rest: "2 min", notes: "Primary lower strength." },
      { name: "Single-Leg RDL (wtd)", sets: "4", reps: "8/leg", rest: "90s", notes: "Posterior chain + balance." },
      { name: "Shrimp Squat Progressions", sets: "3", reps: "5/leg", rest: "2 min", notes: "Advanced single-leg." },
      { name: "Box Jumps (30+in)", sets: "4", reps: "5", rest: "2 min", notes: "Explosive. Step down." },
      { name: "Broad Jump + Sprint", sets: "5", reps: "1 combo", rest: "2 min", notes: "Power into acceleration." },
      { name: "Single-Leg Calf Raises", sets: "4", reps: "25/leg", rest: "45s", notes: "Non-negotiable volume." },
    ]},
    { day: "SAT", title: "Conditioning + Core", focus: "CAPACITY", exercises: [
      { name: "Muscle-Up Progressions", sets: "5", reps: "3-5", rest: "2 min", notes: "Jumping to kipping to strict." },
      { name: "Hollow Body Rocks", sets: "4", reps: "20", rest: "45s", notes: "Dynamic core tension." },
      { name: "L-Sit Hold", sets: "4", reps: "20-30s", rest: "60s", notes: "Full extension." },
      { name: "Burpee Broad Jumps", sets: "5", reps: "8", rest: "60s", notes: "Power endurance." },
      { name: "Planche Lean Hold", sets: "4", reps: "15-20s", rest: "60s", notes: "Building toward planche." },
      { name: "Dragon Flag Negatives", sets: "3", reps: "5", rest: "60s", notes: "Slow 5s lowering." },
    ]},
    { day: "SUN", title: "Full Rest", focus: "RECOVERY", exercises: [] },
  ],
  2: [
    { day: "MON", title: "Upper Push Heavy", focus: "MAX STR", exercises: [
      { name: "Handstand Push-Ups (wall)", sets: "5", reps: "5-8", rest: "2 min", notes: "Forehead to floor." },
      { name: "One-Arm Push-Up Prog.", sets: "4", reps: "3-5/side", rest: "2 min", notes: "Straddle to feet together." },
      { name: "Ring Dips (weighted)", sets: "4", reps: "8-10", rest: "2 min", notes: "Instability + deeper ROM." },
      { name: "Pseudo Planche Push-Ups", sets: "4", reps: "8-10", rest: "90s", notes: "Aggressive lean." },
      { name: "Planche Progressions", sets: "5", reps: "10-15s", rest: "90s", notes: "Tuck to straddle." },
      { name: "Freestanding Handstand", sets: "5", reps: "20-30s", rest: "60s", notes: "Balance + stability." },
    ]},
    { day: "TUE", title: "Lower Power + Speed", focus: "EXPLOSIVE", exercises: [
      { name: "Pistol Squats (weighted)", sets: "5", reps: "5/leg", rest: "2 min", notes: "Full depth." },
      { name: "Depth Jumps (24in)", sets: "5", reps: "4", rest: "2 min", notes: "Max reactive strength." },
      { name: "Nordic Curls (full)", sets: "4", reps: "6-8", rest: "2 min", notes: "Full eccentric + concentric." },
      { name: "Sprint Intervals (80 yd)", sets: "8", reps: "1", rest: "2.5m", notes: "97% effort." },
      { name: "Single-Leg Bounds", sets: "4", reps: "8/leg", rest: "90s", notes: "Power transfer." },
      { name: "Weighted Calf Raises", sets: "4", reps: "25/leg", rest: "45s", notes: "Peak spring." },
    ]},
    { day: "WED", title: "Upper Pull Heavy", focus: "MAX STR", exercises: [
      { name: "One-Arm Pull-Up Prog.", sets: "5", reps: "2-4/side", rest: "2.5m", notes: "Assisted to full." },
      { name: "Muscle-Ups (strict)", sets: "4", reps: "4-6", rest: "2 min", notes: "Clean transition. No kip." },
      { name: "Front Lever Prog.", sets: "5", reps: "10-15s", rest: "90s", notes: "Tuck to full." },
      { name: "Weighted Pull-Ups", sets: "4", reps: "5-6", rest: "2 min", notes: "Strength base." },
      { name: "Archer Rows (rings)", sets: "3", reps: "6/side", rest: "90s", notes: "Unilateral back." },
      { name: "Hanging Windshield Wipers", sets: "3", reps: "8/side", rest: "60s", notes: "Rotational core." },
    ]},
    { day: "THU", title: "Recovery + Skills", focus: "MOBILITY", exercises: [
      { name: "Extended Hip Mobility", sets: "1", reps: "15 min", rest: "-", notes: "Full routine." },
      { name: "Handstand Practice", sets: "1", reps: "15 min", rest: "-", notes: "Freestanding balance." },
      { name: "Skill Work", sets: "1", reps: "15 min", rest: "-", notes: "Levers, L-sits. Low intensity." },
      { name: "Foam Roll + Stretch", sets: "1", reps: "10 min", rest: "-", notes: "Focus tight spots." },
    ]},
    { day: "FRI", title: "Lower Strength + Plyo", focus: "HYBRID", exercises: [
      { name: "Shrimp Squats (weighted)", sets: "4", reps: "5/leg", rest: "2 min", notes: "Deep single-leg." },
      { name: "Bulgarian Split Squat (heavy)", sets: "4", reps: "6/leg", rest: "2 min", notes: "Maximal loading." },
      { name: "Box Jump to Broad Jump", sets: "5", reps: "3", rest: "2 min", notes: "Multi-directional power." },
      { name: "Single-Leg RDL (heavy)", sets: "4", reps: "6/leg", rest: "90s", notes: "Posterior chain." },
      { name: "Sprint/Backpedal/Sprint", sets: "6", reps: "20yd ea", rest: "2 min", notes: "Re-acceleration." },
      { name: "Weighted Calf Raises", sets: "4", reps: "25/leg", rest: "45s", notes: "Peak loading." },
    ]},
    { day: "SAT", title: "Full Body Skills", focus: "PEAK", exercises: [
      { name: "Muscle-Up Complexes", sets: "4", reps: "3+3 dips", rest: "2 min", notes: "MU into ring dips." },
      { name: "Planche + Front Lever SS", sets: "5", reps: "10s ea", rest: "90s", notes: "Alternate holds." },
      { name: "Pistol + Box Jump SS", sets: "4", reps: "3+3", rest: "2 min", notes: "Post-activation." },
      { name: "Dragon Flags (full)", sets: "4", reps: "6-8", rest: "60s", notes: "Peak core." },
      { name: "Conditioning Circuit x4", sets: "4", reps: "full", rest: "60s", notes: "10 burpees, 5 PU, 10 jump sq, 20 mtn climbers." },
      { name: "Handstand Walk", sets: "5", reps: "max", rest: "60s", notes: "Balance + endurance." },
    ]},
    { day: "SUN", title: "Full Rest", focus: "RECOVERY", exercises: [] },
  ],
};

function RoadmapSection() {
  var w = useWidth(); var sm = w < 600;
  var _s = useState(0); var ap = _s[0]; var setAp = _s[1];
  var phases = [
    { phase: "Phase 1", title: "Foundation", months: "Mo 1-6", color: "#2563EB",
      goal: "Build the base. Fix movement patterns. Establish nutrition habits. Lock in sleep.",
      milestones: ["Protein 190g daily", "Sleep 8+ hrs consistently", "Hip mobility daily", "Movement patterns dialed", "Creatine loaded daily"],
      expected: ["15-20% strength increase", "2-4% body fat reduction", "Noticeable composition change", "Sprint mechanics improved", "1-3in vertical increase"],
      training: "3-4 days/week full body. Form over intensity. Wednesday speed non-negotiable.",
      nutrition: "Recomp. Maintenance 3,050 cal. Nail protein above all else.",
    },
    { phase: "Phase 2", title: "Development", months: "Mo 7-12", color: "#16A34A",
      goal: "Stack intensity across all pillars. This is where exponential change happens.",
      milestones: ["Overload every 2 weeks", "Sprint volume increasing", "Track vertical monthly", "Blood work done", "Depth jumps introduced"],
      expected: ["20-30% more strength", "3-5% more fat loss", "3-6in vertical increase", "Faster sprint times", "Visible transformation"],
      training: "5-6 days/week. Upper/lower split. Speed 2x/week. Deload every 4th week.",
      nutrition: "Under 15% BF: bulk 3,350. Over 15%: cut 2,650. Reassess month 9.",
    },
    { phase: "Phase 3", title: "Optimization", months: "Mo 13-18", color: "#D97706",
      goal: "Reach 60% of genetic ceiling. Fine-tune everything. Training becomes identity.",
      milestones: ["10-12% body fat", "188-198 lbs lean", "Vertical 6-10in up", "40yd dash faster", "Protocol on autopilot"],
      expected: ["Top 10-15% athletically", "Near-elite composition", "Reaction time improved", "Full transformation", "Platform for 80%+"],
      training: "6 days/week. Periodized. Sport-specific layers. Performance peaks.",
      nutrition: "Maintenance 3,050. Precision carb timing. Composition maintained.",
    },
  ];
  var p = phases[ap];
  var weekData = pw[ap] || [];
  var projections = [
    ["Month 0", "200 lbs", "~18%", "~164 lbs"],
    ["Month 3", "196 lbs", "~15%", "~167 lbs"],
    ["Month 6", "193 lbs", "~13%", "~168 lbs"],
    ["Month 9", "191 lbs", "~12%", "~168 lbs"],
    ["Month 12", "192 lbs", "~11%", "~171 lbs"],
    ["Month 18", "195 lbs", "~10%", "~176 lbs"],
  ];
  var focusMsgs = [
    "Focus: master every movement with perfect form before adding difficulty. If you can't do 4x10 clean reps, regress and build up.",
    "Focus: progressive overload every 2 weeks. Harder variations, more volume, added load. Hit the top of rep range, then progress.",
    "Focus: skill mastery and peak expression. Muscle-ups, HSPUs, pistols, front levers are your benchmarks."
  ];
  return (
    <div>
      <Section title="18-Month Roadmap" subtitle="Select a phase to see the full plan, milestones, and weekly sessions.">
        <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
          {phases.map(function(ph, i) { return <Btn key={i} label={sm ? ph.phase : ph.phase + " - " + ph.months} active={ap === i} onClick={function() { setAp(i); }} color={ph.color} />; })}
        </div>
        <div style={{ borderLeft: "3px solid " + p.color, paddingLeft: sm ? 14 : 20, marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: p.color, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>{p.phase}</div>
          <div style={{ fontSize: sm ? 18 : 22, fontWeight: 700, color: textP, marginBottom: 6, fontFamily: "Georgia, serif" }}>{p.title}</div>
          <div style={{ fontSize: 13, color: textS, marginBottom: 16, lineHeight: 1.6 }}>{p.goal}</div>
          <div style={{ display: "grid", gridTemplateColumns: sm ? "1fr" : "1fr 1fr", gap: 14, marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: p.color, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Milestones</div>
              {p.milestones.map(function(m, i) {
                return (<div key={i} style={{ display: "flex", gap: 6, marginBottom: 5, fontSize: 12, color: textS, lineHeight: 1.5 }}>
                  <span style={{ color: p.color, fontWeight: 700, flexShrink: 0 }}>{">"}</span><span>{m}</span>
                </div>);
              })}
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: textM, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Expected Results</div>
              {p.expected.map(function(e, i) {
                return (<div key={i} style={{ display: "flex", gap: 6, marginBottom: 5, fontSize: 12, color: textS, lineHeight: 1.5 }}>
                  <span style={{ color: "#16A34A", flexShrink: 0 }}>{"✓"}</span><span>{e}</span>
                </div>);
              })}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: sm ? "1fr" : "1fr 1fr", gap: 8 }}>
            {[["Training", p.training], ["Nutrition", p.nutrition]].map(function(item) {
              return (<div key={item[0]} style={{ background: bgPage, border: "1px solid " + bdr, borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: p.color, letterSpacing: 1, marginBottom: 3, textTransform: "uppercase" }}>{item[0]}</div>
                <div style={{ fontSize: 12, color: textS, lineHeight: 1.6 }}>{item[1]}</div>
              </div>);
            })}
          </div>
        </div>
      </Section>
      <Section title={p.phase + " Weekly Sessions"} subtitle="Tap any day to expand exercises. Every 4th week: deload, cut volume 50%.">
        {weekData.map(function(d, i) { return <DayCard key={i} day={d.day} title={d.title} focus={d.focus} exercises={d.exercises} phaseColor={p.color} />; })}
        <div style={{ marginTop: 10, background: p.color + "12", border: "1px solid " + p.color + "33", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: p.color, lineHeight: 1.6 }}>
          {focusMsgs[ap]}
        </div>
      </Section>
      <Section title="Body Composition Projections">
        <div style={{ display: "grid", gridTemplateColumns: sm ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(130px, 1fr))", gap: 8 }}>
          {projections.map(function(pr, i) {
            return (<div key={i} style={{ background: bgCard, border: "1px solid " + bdr, borderRadius: 10, padding: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: accent, letterSpacing: 0.5, marginBottom: 4 }}>{pr[0]}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: textP }}>{pr[1]}</div>
              <div style={{ fontSize: 11, color: textS }}>{"BF: " + pr[2]}</div>
              <div style={{ fontSize: 11, color: textM }}>{"Lean: " + pr[3]}</div>
            </div>);
          })}
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: textM, lineHeight: 1.6 }}>
          Realistic projections with consistent training and nutrition. 164 to 176 lbs lean mass is about 12 lbs of muscle over 18 months, near the natural ceiling for your frame.
        </div>
      </Section>
    </div>
  );
}

function DailySection() {
  var w = useWidth(); var sm = w < 600;
  var nonnegData = [
    ["droplet", "Hydration", "100+ oz", "BW/2 = oz min"],
    ["trending", "Protein", "190-200g", "Every day"],
    ["moon", "Sleep", "8.5 hrs", "Same wake time"],
    ["zap", "Creatine", "5g", "Any time, daily"],
    ["activity", "Hip Mob.", "10 min", "Every morning"],
    ["eye", "Eye-Hand", "10 min", "Coordination"],
    ["heart", "Movement", "Train/walk", "Never sedentary"],
  ];
  var schedule = [
    ["6:30 AM", "Wake up", "Same time every day. Hormone release is timed to this."],
    ["6:35 AM", "16 oz water", "Before coffee or phone. Rehydrate overnight loss."],
    ["6:40 AM", "Hip mobility", "Couch stretch, 90/90, deep lunge. 10 min."],
    ["7:00 AM", "Breakfast", "30-35g protein. 4 eggs + oats + berries."],
    ["7:30 AM", "Eye-hand work", "Wall ball, juggling, reaction drops. 10 min."],
    ["10:00 AM", "Snack", "Pea protein shake + banana + pumpkin seeds."],
    ["12:30 PM", "Lunch", "40-45g protein. Seitan + rice + edamame + veg."],
    ["Pre-WO", "Pre-workout", "60-90 min before. Oats + protein + fruit."],
    ["Training", "Session", "Follow the plan. Trust the structure."],
    ["Post-WO", "Post-workout", "Protein + fast carbs within 45 min."],
    ["8:00 PM", "Dinner", "38-42g protein. Lentils + quinoa + greens + seeds."],
    ["9:00 PM", "Screens off", "Blue light suppresses melatonin."],
    ["9:30 PM", "Magnesium", "300mg glycinate before sleep."],
    ["10:00 PM", "Sleep", "8.5 hr target. Room dark, cool (65-68F)."],
  ];
  return (
    <div>
      <Section title="7 Daily Non-Negotiables" subtitle="These compound daily. Miss one occasionally, fine. Miss them habitually and your ceiling drops.">
        <div style={{ display: "grid", gridTemplateColumns: sm ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(115px, 1fr))", gap: 8 }}>
          {nonnegData.map(function(item, i) {
            return (
              <div key={i} style={{ background: bgCard, border: "1px solid " + bdr, borderRadius: 10, padding: sm ? 12 : 14, textAlign: "center" }}>
                <div style={{ marginBottom: 4, display: "flex", justifyContent: "center" }}>
                  <Icon d={icons[item[0]]} size={20} color={accent} />
                </div>
                <div style={{ fontSize: 9, fontWeight: 700, color: textM, textTransform: "uppercase", letterSpacing: 0.3, marginBottom: 2 }}>{item[1]}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: textP }}>{item[2]}</div>
                <div style={{ fontSize: 10, color: textM, marginTop: 1 }}>{item[3]}</div>
              </div>
            );
          })}
        </div>
      </Section>
      <Section title="Ideal Day Schedule">
        <div style={{ background: bgCard, border: "1px solid " + bdr, borderRadius: 10, overflow: "hidden" }}>
          {schedule.map(function(s, i) {
            return (
              <div key={i} style={{ display: "grid", gridTemplateColumns: sm ? "70px 1fr" : "90px 1fr", gap: sm ? 8 : 14, padding: sm ? "10px 12px" : "12px 16px", borderBottom: i < schedule.length - 1 ? "1px solid " + bdr : "none" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: accent, paddingTop: 1 }}>{s[0]}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: textP, marginBottom: 1 }}>{s[1]}</div>
                  <div style={{ fontSize: 12, color: textS, lineHeight: 1.45 }}>{s[2]}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

export default function TransformationPlan() {
  var w = useWidth(); var sm = w < 600;
  var _s = useState("body"); var active = _s[0]; var setActive = _s[1];
  var render = function() {
    if (active === "body") return <BodySection />;
    if (active === "nutrition") return <NutritionSection />;
    if (active === "training") return <TrainingSection />;
    if (active === "roadmap") return <RoadmapSection />;
    if (active === "daily") return <DailySection />;
    return null;
  };
  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: bgPage, minHeight: "100vh", color: textP }}>
      <div style={{ background: "#fff", borderBottom: "1px solid " + bdr, position: "sticky", top: 0, zIndex: 10, padding: sm ? "12px 14px 0" : "16px 20px 0" }}>
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: accent, letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>Performance Blueprint</div>
          <h1 style={{ margin: 0, fontSize: sm ? 18 : 24, fontWeight: 800, color: textP, lineHeight: 1.2 }}>
            Complete Transformation Plan
          </h1>
          {!sm && <p style={{ margin: "3px 0 0", fontSize: 13, color: textS }}>{"Personalized for 6'3\" \u00B7 200 lbs \u00B7 Calisthenics focus"}</p>}
        </div>
        <div style={{ display: "flex", gap: 2, overflowX: "auto", WebkitOverflowScrolling: "touch", marginBottom: -1, scrollbarWidth: "none" }}>
          {tabList.map(function(tab) {
            var isActive = active === tab.key;
            return (
              <button key={tab.key} onClick={function() { setActive(tab.key); }} style={{
                background: isActive ? "#fff" : "transparent",
                border: "1px solid " + (isActive ? bdr : "transparent"),
                borderBottom: isActive ? "1px solid #fff" : "1px solid " + bdr,
                borderRadius: "8px 8px 0 0",
                color: isActive ? accent : textM,
                padding: sm ? "7px 10px" : "8px 14px", cursor: "pointer",
                fontSize: sm ? 11 : 12, fontWeight: isActive ? 700 : 500,
                display: "flex", alignItems: "center", gap: 5,
                whiteSpace: "nowrap", flexShrink: 0,
              }}>
                <Icon d={icons[tab.icon]} size={sm ? 12 : 14} color={isActive ? accent : textM} />
                <span>{sm ? tab.label : tab.full}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ padding: sm ? "16px 14px" : "24px 20px", maxWidth: 920, margin: "0 auto" }}>
        {render()}
      </div>
    </div>
  );
}
