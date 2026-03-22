// import emailjs from "@emailjs/browser";
// import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
// import {
//     ArrowUp, ChevronDown, Code2, Database, Download,
//     ExternalLink, FileText, Github, Linkedin, Mail,
//     Moon, Server, Sparkles, Sun, Twitter, Zap,
// } from "lucide-react";
// import { useEffect, useRef, useState } from "react";

// // ── Palette ──────────────────────────────────────────────────
// const P = {
//     baltic: "#22577a",   // deepest — dark bg tones, depth
//     teal: "#38a3a5",   // primary accent — buttons, borders
//     mint: "#57cc99",   // secondary — icons, bars
//     green: "#80ed99",   // highlight — glows, hover
//     tea: "#c7f9cc",   // softest — shimmer, badges, light accents

//     // gradients — dark to light
//     g1: "linear-gradient(135deg, #22577a, #38a3a5)",           // baltic → teal
//     g2: "linear-gradient(135deg, #38a3a5, #57cc99)",           // teal → mint
//     g3: "linear-gradient(135deg, #57cc99, #80ed99)",           // mint → green
//     g4: "linear-gradient(135deg, #80ed99, #c7f9cc)",           // green → tea
//     g5: "linear-gradient(135deg, #22577a, #38a3a5, #57cc99)",  // full deep
//     g6: "linear-gradient(135deg, #57cc99, #80ed99, #c7f9cc)",  // full light
//     g7: "linear-gradient(135deg, #22577a, #38a3a5, #57cc99, #80ed99)", // full span
//     ring: "conic-gradient(from 0deg, #c7f9cc, #80ed99, #57cc99, #38a3a5, #22577a, #38a3a5, #57cc99, #80ed99, #c7f9cc)",
// };

// // ── Skill card configs ───────────────────────────────────────
// const SKILL_CARDS = [
//     {
//         icon: Database, title: "Data Science",
//         desc: "Transforming raw data into meaningful insights through analysis and visualization.",
//         iconBg: P.g1, iconColor: P.tea,
//         accentBar: P.g1,
//         barColors: [P.tea, P.green, P.mint, P.teal],
//         skills: [
//             { label: "Python", level: 90 },
//             { label: "Pandas / NumPy", level: 85 },
//             { label: "Scikit-learn", level: 75 },
//             { label: "Data Visualization", level: 80 },
//         ],
//     },
//     {
//         icon: Server, title: "Backend",
//         desc: "Building robust, scalable APIs and server-side systems that power modern apps.",
//         iconBg: P.g2, iconColor: P.baltic,
//         accentBar: P.g2,
//         barColors: [P.green, P.mint, P.teal, P.baltic],
//         skills: [
//             { label: "Node.js / Express", level: 88 },
//             { label: "MongoDB", level: 82 },
//             { label: "PostgreSQL", level: 78 },
//             { label: "REST & GraphQL", level: 85 },
//         ],
//     },
//     {
//         icon: Code2, title: "Programming",
//         desc: "Writing clean, efficient code and solving complex algorithmic challenges.",
//         iconBg: P.g3, iconColor: P.baltic,
//         accentBar: P.g3,
//         barColors: [P.tea, P.green, P.mint, P.teal],
//         skills: [
//             { label: "C++", level: 85 },
//             { label: "JavaScript / TypeScript", level: 88 },
//             { label: "Algorithms & DSA", level: 80 },
//             { label: "Problem Solving", level: 90 },
//         ],
//     },
// ];

// // ── Projects ─────────────────────────────────────────────────
// const PROJECTS = [
//     {
//         title: "Multimodal Emotion Analysis",
//         type: "AI / Machine Learning",
//         description: "Multimodal sentiment model combining BERT + ResNet. Trained on 5,220 image–text pairs using PyTorch, achieving ~97% training accuracy across positive, neutral, and negative classes.",
//         tags: ["Python", "PyTorch", "BERT", "ResNet", "Transformers"],
//         links: [
//             { label: "Report", icon: FileText, href: "https://drive.google.com/file/d/1sWRQik73r7imClAodDVa5qSABPvO8pt-/view?usp=sharing" },
//             { label: "Kaggle", icon: Code2, href: "https://www.kaggle.com/code/arifulhaquenoman/capstone" },
//         ],
//         stat: { label: "Accuracy", value: "~97%" },
//         accentGrad: P.g1,
//         accentColor: P.teal,
//         iconBg: P.g1, iconColor: P.tea,
//         tagColor: P.tea, statColor: P.green,
//         topLine: P.g1,
//     },
//     {
//         title: "TaskMaster",
//         type: "Full-Stack Web App",
//         description: "MERN stack app with JWT auth, drag-and-drop reordering, category filtering, due dates & real-time search. Dark mode, daily goal tracking and streak statistics.",
//         tags: ["MongoDB", "Express", "React", "Node.js", "JWT"],
//         links: [
//             { label: "GitHub", icon: Github, href: "https://github.com/Rbn-Rmn/TaskMaster.git" },
//         ],
//         stat: { label: "Stack", value: "MERN" },
//         accentGrad: P.g2,
//         accentColor: P.mint,
//         iconBg: P.g2, iconColor: P.baltic,
//         tagColor: P.mint, statColor: P.mint,
//         topLine: P.g2,
//     },
//     {
//         title: "ZeroMiss",
//         type: "Android Application",
//         description: "Kotlin + Jetpack Compose productivity app with 5+ modules — task manager, contest tracker, tuition attendance, focus timer, calendar — using MVVM + Room DB.",
//         tags: ["Kotlin", "Jetpack Compose", "MVVM", "Room DB", "WorkManager"],
//         links: [
//             { label: "GitHub", icon: Github, href: "https://github.com/Rbn-Rmn/ZeroMiss" },
//         ],
//         stat: { label: "Modules", value: "5+" },
//         accentGrad: P.g3,
//         accentColor: P.green,
//         iconBg: P.g3, iconColor: P.baltic,
//         tagColor: P.green, statColor: P.tea,
//         topLine: P.g3,
//     },
// ];

// // ── Particles ────────────────────────────────────────────────
// const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
//     id: i,
//     style: {
//         width: Math.floor(Math.random() * 5) + 2,
//         height: Math.floor(Math.random() * 5) + 2,
//         left: `${Math.floor(Math.random() * 100)}%`,
//         top: `${Math.floor(Math.random() * 100)}%`,
//         background: [P.tea, P.green, P.mint, P.teal, P.baltic][i % 5],
//     },
// }));

// const SOCIALS = [
//     { href: "https://github.com/Rbn-Rmn", icon: Github, label: "GitHub" },
//     { href: "https://www.linkedin.com/in/dewansultan/", icon: Linkedin, label: "LinkedIn" },
//     { href: "https://x.com/YOUR_TWITTER_USERNAME", icon: Twitter, label: "Twitter" },
// ];

// // ── Sub-components ───────────────────────────────────────────
// function Particle({ style }) {
//     return (
//         <motion.div className="absolute rounded-full pointer-events-none" style={style}
//             animate={{ y: [0, -30, 0], opacity: [0.05, 0.25, 0.05], scale: [1, 1.5, 1] }}
//             transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 3 }}
//         />
//     );
// }

// function GridBackground({ darkMode }) {
//     return (
//         <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
//             {/* Subtle grid */}
//             <div className="absolute inset-0 opacity-[0.035]"
//                 style={{
//                     backgroundImage: `linear-gradient(${P.teal} 1px, transparent 1px), linear-gradient(to right, ${P.teal} 1px, transparent 1px)`,
//                     backgroundSize: "72px 72px",
//                 }}
//             />
//             {/* Baltic deep blob — top left */}
//             <motion.div className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full"
//                 style={{
//                     background: darkMode
//                         ? "radial-gradient(circle, rgba(34,87,122,0.35) 0%, transparent 65%)"
//                         : "radial-gradient(circle, rgba(34,87,122,0.08) 0%, transparent 65%)"
//                 }}
//                 animate={{ scale: [1, 1.1, 1] }}
//                 transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
//             />
//             {/* Teal blob — center */}
//             <motion.div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full"
//                 style={{
//                     background: darkMode
//                         ? "radial-gradient(circle, rgba(56,163,165,0.12) 0%, transparent 65%)"
//                         : "radial-gradient(circle, rgba(56,163,165,0.09) 0%, transparent 65%)"
//                 }}
//                 animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
//                 transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
//             />
//             {/* Mint/green blob — bottom right */}
//             <motion.div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full"
//                 style={{
//                     background: darkMode
//                         ? "radial-gradient(circle, rgba(87,204,153,0.1) 0%, transparent 65%)"
//                         : "radial-gradient(circle, rgba(128,237,153,0.12) 0%, transparent 65%)"
//                 }}
//                 animate={{ scale: [1.1, 1, 1.1], x: [0, -15, 0] }}
//                 transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//             />
//             {/* Tea green shimmer strip — bottom */}
//             <div className="absolute bottom-0 left-0 right-0 h-px opacity-20"
//                 style={{ background: `linear-gradient(to right, transparent, ${P.tea}, transparent)` }}
//             />
//         </div>
//     );
// }

// function SkillBar({ label, level, color, delay }) {
//     return (
//         <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }} transition={{ delay, duration: 0.5 }} className="mb-3">
//             <div className="flex justify-between text-xs mb-1 font-medium opacity-65">
//                 <span>{label}</span><span>{level}%</span>
//             </div>
//             <div className="h-1.5 rounded-full overflow-hidden"
//                 style={{ background: "rgba(56,163,165,0.12)" }}>
//                 <motion.div className="h-full rounded-full" style={{ background: color }}
//                     initial={{ width: 0 }} whileInView={{ width: `${level}%` }}
//                     viewport={{ once: true }}
//                     transition={{ delay: delay + 0.2, duration: 1, ease: "easeOut" }} />
//             </div>
//         </motion.div>
//     );
// }

// function SectionHeading({ children }) {
//     return (
//         <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }} className="text-center mb-20">
//             <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-tight bg-clip-text text-transparent"
//                 style={{ backgroundImage: P.g7, fontFamily: "'Syne', sans-serif" }}>
//                 {children}
//             </h2>
//             <motion.div className="mt-4 h-[2px] mx-auto rounded-full"
//                 style={{ background: P.g7, maxWidth: 240 }}
//                 initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
//                 viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.9 }}
//             />
//         </motion.div>
//     );
// }

// // ── Main ─────────────────────────────────────────────────────
// export default function Portfolio() {
//     const [darkMode, setDarkMode] = useState(() => { try { return localStorage.getItem("theme") !== "light"; } catch { return true; } });
//     const [scrolled, setScrolled] = useState(false);
//     const [showBackToTop, setShowBackToTop] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [text, setText] = useState("");
//     const [roleIndex, setRoleIndex] = useState(0);
//     const [charIndex, setCharIndex] = useState(0);
//     const [formStatus, setFormStatus] = useState(null);
//     const [activeNav, setActiveNav] = useState("about");
//     const formRef = useRef();

//     const roles = ["Backend Developer", "Data Analyst", "Problem Solver", "Code Craftsman"];
//     const { scrollYProgress } = useScroll();
//     const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

//     useEffect(() => {
//         try { localStorage.setItem("theme", darkMode ? "dark" : "light"); } catch { }
//         document.documentElement.classList.toggle("dark", darkMode);
//     }, [darkMode]);

//     useEffect(() => {
//         const fn = () => {
//             setScrolled(window.scrollY > 50);
//             setShowBackToTop(window.scrollY > 500);
//             for (const id of ["contact", "projects", "skills", "about"]) {
//                 const el = document.getElementById(id);
//                 if (el && window.scrollY >= el.offsetTop - 120) { setActiveNav(id); break; }
//             }
//         };
//         window.addEventListener("scroll", fn);
//         return () => window.removeEventListener("scroll", fn);
//     }, []);

//     useEffect(() => { const t = setTimeout(() => setLoading(false), 1600); return () => clearTimeout(t); }, []);

//     useEffect(() => {
//         if (loading) return;
//         const t = setTimeout(() => {
//             if (charIndex < roles[roleIndex].length) {
//                 setText(p => p + roles[roleIndex][charIndex]);
//                 setCharIndex(p => p + 1);
//             } else {
//                 setTimeout(() => { setText(""); setCharIndex(0); setRoleIndex(p => (p + 1) % roles.length); }, 1400);
//             }
//         }, 65);
//         return () => clearTimeout(t);
//     }, [charIndex, roleIndex, loading]);

//     const sendEmail = (e) => {
//         e.preventDefault(); setFormStatus("sending");
//         emailjs.sendForm(
//             import.meta.env.VITE_EMAILJS_SERVICE_ID,
//             import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
//             formRef.current,
//             { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
//         ).then(() => { setFormStatus("ok"); formRef.current.reset(); })
//             .catch(err => { console.error(err); setFormStatus("err"); });
//     };

//     // ── Theme-aware classes ──────────────────────────────────
//     const bg = darkMode ? "bg-[#071520]" : "bg-[#f0fdf4]";
//     const text_ = darkMode ? "text-[#c7f9cc]" : "text-[#0f2d3d]";
//     const muted = darkMode ? "text-[#38a3a5]" : "text-[#22577a]";

//     // Two card styles that alternate through sections
//     const cardD1 = "bg-[#0c1f2e]/85 border border-[#22577a]/50 backdrop-blur-2xl";
//     const cardD2 = "bg-[#0a1a28]/80 border border-[#38a3a5]/20 backdrop-blur-2xl";
//     const cardL1 = "bg-white/85 border border-[#57cc99]/40 backdrop-blur-2xl shadow-lg shadow-[#22577a]/8";
//     const cardL2 = "bg-[#f0fdf4]/90 border border-[#38a3a5]/30 backdrop-blur-2xl shadow-md shadow-[#38a3a5]/6";

//     const card1 = darkMode ? cardD1 : cardL1;
//     const card2 = darkMode ? cardD2 : cardL2;

//     const inputCls = darkMode
//         ? "bg-[#071520] border border-[#22577a]/60 text-[#c7f9cc] placeholder:text-[#38a3a5]/60 focus:border-[#57cc99] focus:ring-2 focus:ring-[#57cc99]/15"
//         : "bg-white border border-[#57cc99]/50 text-[#0f2d3d] placeholder:text-[#38a3a5] focus:border-[#38a3a5] focus:ring-2 focus:ring-[#38a3a5]/20";

//     const navBg = darkMode ? "bg-[#071520]/93" : "bg-[#f0fdf4]/93";
//     const pillBg = darkMode ? "rgba(34,87,122,0.45)" : "rgba(199,249,204,0.55)";

//     // Nav active gradient per section index
//     const navGrads = [P.g1, P.g2, P.g1, P.g2];

//     // ── Loading ──────────────────────────────────────────────
//     if (loading) {
//         return (
//             <div className={`h-screen flex flex-col items-center justify-center ${bg}`}>
//                 <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative">
//                     <div className="absolute inset-0 rounded-full blur-3xl"
//                         style={{ background: "radial-gradient(circle, rgba(56,163,165,0.35), rgba(87,204,153,0.15), transparent)", transform: "scale(2.2)" }} />
//                     <div className="relative text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent px-6 py-2"
//                         style={{ backgroundImage: P.g7, fontFamily: "'Syne', sans-serif" }}>
//                         Dewan Sultan
//                     </div>
//                 </motion.div>
//                 <motion.div className="mt-8 flex gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
//                     {[P.teal, P.mint, P.tea].map((color, i) => (
//                         <motion.div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: color }}
//                             animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4] }}
//                             transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }} />
//                     ))}
//                 </motion.div>
//             </div>
//         );
//     }

//     return (
//         <div className={`min-h-screen ${bg} ${text_} transition-colors duration-700`}
//             style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

//             <div className="noise" />
//             <GridBackground darkMode={darkMode} />
//             <div className="fixed inset-0 pointer-events-none z-0">
//                 {PARTICLES.map(p => <Particle key={p.id} style={p.style} />)}
//             </div>

//             {/* Progress bar — full palette sweep */}
//             <motion.div className="fixed top-0 left-0 right-0 h-[3px] origin-left z-50"
//                 style={{ scaleX, background: P.g7 }} />

//             {/* ── Navbar ──────────────────────────────────── */}
//             <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.7, ease: "easeOut" }}
//                 className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? `py-3 ${navBg} backdrop-blur-2xl shadow-xl shadow-[#071520]/40` : "py-5 bg-transparent"
//                     }`}>
//                 <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

//                     {/* Logo — original SVG, no filter */}
//                     <motion.a href="#about" whileHover={{ scale: 1.08, rotate: 3 }} whileTap={{ scale: 0.95 }}
//                         transition={{ type: "spring", stiffness: 300 }} aria-label="Home">
//                         <img src="/logo.svg" alt="Dewan Sultan" width="44" height="44" />
//                     </motion.a>

//                     {/* Nav pill */}
//                     <div className="hidden md:flex items-center gap-1 p-1 rounded-full border"
//                         style={{ background: pillBg, borderColor: darkMode ? "rgba(56,163,165,0.25)" : "rgba(87,204,153,0.4)" }}>
//                         {["about", "skills", "projects", "contact"].map((link, i) => (
//                             <a key={link} href={`#${link}`}
//                                 className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-300 ${activeNav === link ? "text-white" : muted
//                                     }`}
//                                 style={activeNav === link ? { background: navGrads[i] } : {}}>
//                                 {link}
//                             </a>
//                         ))}
//                     </div>

//                     {/* Theme toggle */}
//                     <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
//                         onClick={() => setDarkMode(!darkMode)}
//                         className="p-2.5 rounded-xl transition border"
//                         style={{
//                             background: darkMode ? "rgba(34,87,122,0.4)" : "rgba(199,249,204,0.5)",
//                             borderColor: darkMode ? "rgba(56,163,165,0.3)" : "rgba(87,204,153,0.4)",
//                         }}
//                         aria-label="Toggle theme">
//                         <AnimatePresence mode="wait">
//                             <motion.div key={darkMode ? "sun" : "moon"}
//                                 initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
//                                 exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
//                                 {darkMode
//                                     ? <Sun size={18} style={{ color: P.tea }} />
//                                     : <Moon size={18} style={{ color: P.baltic }} />}
//                             </motion.div>
//                         </AnimatePresence>
//                     </motion.button>
//                 </div>
//             </motion.nav>

//             <main className="relative z-10 pt-24 pb-20 px-6 max-w-7xl mx-auto">

//                 {/* ── Hero ──────────────────────────────────── */}
//                 <section id="about"
//                     className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-16 py-20 relative">

//                     {/* Avatar */}
//                     <div className="relative flex-shrink-0">
//                         {/* Outer soft glow */}
//                         <div className="absolute -inset-4 rounded-full blur-2xl opacity-30"
//                             style={{ background: P.ring }} />
//                         {/* Spinning ring */}
//                         <motion.div className="absolute inset-0 rounded-full"
//                             style={{ background: P.ring, padding: 3 }}
//                             animate={{ rotate: 360 }}
//                             transition={{ duration: 12, repeat: Infinity, ease: "linear" }} />
//                         {/* Mint glow pulse */}
//                         <motion.div className="absolute -inset-6 rounded-full blur-3xl"
//                             style={{ background: "radial-gradient(circle, rgba(87,204,153,0.2) 0%, rgba(56,163,165,0.1) 50%, transparent 70%)" }}
//                             animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
//                             transition={{ duration: 4, repeat: Infinity }} />

//                         <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
//                             transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
//                             className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden float"
//                             style={{ border: `3px solid ${P.teal}` }}>
//                             <img src="/profile.jpg" alt="Dewan Sultan"
//                                 className="w-full h-full object-cover rounded-full"
//                                 onError={e => {
//                                     e.currentTarget.style.display = "none";
//                                     const p = e.currentTarget.parentElement;
//                                     if (p) {
//                                         p.style.background = `linear-gradient(135deg, ${P.baltic}, ${P.teal}, ${P.mint})`;
//                                         const fb = document.createElement("div");
//                                         fb.style.cssText = `display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:72px;font-weight:900;color:${P.tea};font-family:Syne,sans-serif;`;
//                                         fb.textContent = "DS";
//                                         p.appendChild(fb);
//                                     }
//                                 }}
//                             />
//                         </motion.div>

//                         {/* Badges — different palette colors */}
//                         <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
//                             transition={{ delay: 1, type: "spring", bounce: 0.5 }}
//                             className="absolute text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-xl"
//                             style={{ top: "5%", right: "-22%", background: P.g1, color: P.tea, border: `1px solid ${P.teal}` }}>
//                             ⚡ Open to Work
//                         </motion.div>
//                         <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
//                             transition={{ delay: 1.3, type: "spring", bounce: 0.5 }}
//                             className="absolute text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-xl"
//                             style={{ bottom: "10%", left: "-20%", background: P.g3, color: P.baltic, border: `1px solid ${P.mint}` }}>
//                             🧠 Problem Solver
//                         </motion.div>
//                     </div>

//                     {/* Text */}
//                     <div className="max-w-2xl text-center lg:text-left">
//                         {/* Available pill */}
//                         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.2 }}
//                             className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8"
//                             style={{
//                                 background: darkMode ? "rgba(34,87,122,0.35)" : "rgba(199,249,204,0.6)",
//                                 border: `1px solid ${darkMode ? P.teal : P.mint}`,
//                                 color: darkMode ? P.tea : P.baltic,
//                             }}>
//                             <Sparkles size={14} style={{ color: darkMode ? P.mint : P.teal }} />
//                             Available for freelance projects
//                         </motion.div>

//                         <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.35, duration: 0.8 }}
//                             className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05]"
//                             style={{ fontFamily: "'Syne', sans-serif" }}>
//                             Hi, I'm{" "}
//                             <span className="shimmer-text">Dewan Sultan</span>
//                         </motion.h1>

//                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
//                             className="mt-6 text-2xl md:text-3xl font-semibold h-12 flex items-center justify-center lg:justify-start gap-2"
//                             style={{ color: darkMode ? P.mint : P.teal }}>
//                             <Zap size={22} className="flex-shrink-0" style={{ color: darkMode ? P.green : P.teal }} />
//                             {text}
//                             <span className="blink inline-block w-0.5 h-8 ml-0.5"
//                                 style={{ background: darkMode ? P.mint : P.teal }} />
//                         </motion.div>

//                         <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.75, duration: 0.7 }}
//                             className={`mt-8 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 ${muted}`}>
//                             Passionate about building{" "}
//                             <strong style={{ color: darkMode ? P.tea : P.baltic }}>
//                                 scalable backend systems
//                             </strong>
//                             , turning data into insights, and solving complex problems with clean, efficient code.
//                         </motion.p>

//                         {/* CTAs */}
//                         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.9 }}
//                             className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
//                             {/* Download — g1 (baltic→teal) */}
//                             <motion.a href="/cv.pdf" download
//                                 whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
//                                 className="px-8 py-4 rounded-2xl font-bold text-white flex items-center gap-3"
//                                 style={{ background: P.g5, boxShadow: `0 8px 24px rgba(34,87,122,0.4)` }}>
//                                 <Download size={18} /> Download CV
//                             </motion.a>
//                             {/* Get in Touch — tea border */}
//                             <motion.a href="mailto:dwnsultan@gmail.com"
//                                 whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
//                                 className="px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all"
//                                 style={{
//                                     background: darkMode ? "rgba(34,87,122,0.25)" : "rgba(199,249,204,0.45)",
//                                     border: `2px solid ${darkMode ? P.mint : P.teal}`,
//                                     color: darkMode ? P.tea : P.baltic,
//                                 }}
//                                 onMouseEnter={e => { e.currentTarget.style.background = P.g2; e.currentTarget.style.color = P.baltic; e.currentTarget.style.borderColor = "transparent"; }}
//                                 onMouseLeave={e => { e.currentTarget.style.background = darkMode ? "rgba(34,87,122,0.25)" : "rgba(199,249,204,0.45)"; e.currentTarget.style.color = darkMode ? P.tea : P.baltic; e.currentTarget.style.borderColor = darkMode ? P.mint : P.teal; }}>
//                                 <Mail size={18} /> Get in Touch
//                             </motion.a>
//                         </motion.div>

//                         {/* Socials — three palette shades */}
//                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
//                             className="mt-10 flex gap-3 justify-center lg:justify-start">
//                             {SOCIALS.map(({ href, icon: Icon, label }, i) => {
//                                 const configs = [
//                                     { bg: darkMode ? "rgba(34,87,122,0.45)" : "rgba(34,87,122,0.08)", border: P.baltic, color: darkMode ? P.teal : P.baltic },
//                                     { bg: darkMode ? "rgba(56,163,165,0.2)" : "rgba(56,163,165,0.12)", border: P.teal, color: darkMode ? P.mint : P.teal },
//                                     { bg: darkMode ? "rgba(87,204,153,0.15)" : "rgba(87,204,153,0.15)", border: P.mint, color: darkMode ? P.green : P.mint },
//                                 ];
//                                 const c = configs[i];
//                                 return (
//                                     <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
//                                         aria-label={label} whileHover={{ scale: 1.15, y: -3 }} whileTap={{ scale: 0.9 }}
//                                         className="p-3 rounded-xl transition-all"
//                                         style={{ background: c.bg, border: `1px solid ${c.border}40`, color: c.color }}
//                                         onMouseEnter={e => { e.currentTarget.style.background = P.g2; e.currentTarget.style.color = P.baltic; }}
//                                         onMouseLeave={e => { e.currentTarget.style.background = c.bg; e.currentTarget.style.color = c.color; }}>
//                                         <Icon size={20} />
//                                     </motion.a>
//                                 );
//                             })}
//                         </motion.div>
//                     </div>

//                     {/* Scroll arrow — no text */}
//                     <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2"
//                         animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
//                         initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
//                         <ChevronDown size={22} style={{ color: darkMode ? P.teal : P.teal }} />
//                     </motion.div>
//                 </section>

//                 {/* ── Skills ────────────────────────────────── */}
//                 <section id="skills" className="py-28">
//                     <SectionHeading>Skills & Expertise</SectionHeading>
//                     <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
//                         {SKILL_CARDS.map((skill, i) => (
//                             <motion.div key={skill.title}
//                                 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
//                                 viewport={{ once: true }}
//                                 transition={{ delay: i * 0.15, duration: 0.7, ease: "easeOut" }}
//                                 whileHover={{ y: -8, transition: { duration: 0.25 } }}
//                                 className={`p-8 rounded-3xl card-glow relative overflow-hidden group transition-all duration-300 ${i % 2 === 0 ? card1 : card2}`}>

//                                 {/* Corner glow — unique per card */}
//                                 <div className="absolute top-0 right-0 w-44 h-44 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//                                     style={{
//                                         background: [
//                                             "rgba(56,163,165,0.2)",
//                                             "rgba(87,204,153,0.2)",
//                                             "rgba(128,237,153,0.18)"
//                                         ][i], transform: "translate(35%,-35%)"
//                                     }} />

//                                 {/* Left accent bar — each card different gradient */}
//                                 <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full"
//                                     style={{ background: skill.accentBar }} />

//                                 {/* Icon */}
//                                 <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-xl"
//                                     style={{ background: skill.iconBg }}>
//                                     <skill.icon size={26} strokeWidth={1.5} style={{ color: skill.iconColor }} />
//                                 </div>

//                                 <h3 className="text-xl font-black mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
//                                     {skill.title}
//                                 </h3>
//                                 <p className={`text-sm ${muted} mb-6 leading-relaxed`}>{skill.desc}</p>

//                                 {skill.skills.map((s, j) => (
//                                     <SkillBar key={s.label} label={s.label} level={s.level}
//                                         color={skill.barColors[j]} delay={i * 0.15 + j * 0.08} />
//                                 ))}
//                             </motion.div>
//                         ))}
//                     </div>

//                     {/* Stats — each a different palette color */}
//                     <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
//                         {[
//                             { label: "Projects Built", value: "20+", bg: darkMode ? "rgba(34,87,122,0.5)" : "rgba(34,87,122,0.07)", border: `${P.baltic}50`, color: P.tea, labelColor: darkMode ? P.teal : P.baltic },
//                             { label: "Algorithms Solved", value: "300+", bg: darkMode ? "rgba(56,163,165,0.25)" : "rgba(56,163,165,0.09)", border: `${P.teal}45`, color: P.green, labelColor: darkMode ? P.mint : P.teal },
//                             { label: "Coffee Consumed", value: "∞", bg: darkMode ? "rgba(87,204,153,0.18)" : "rgba(87,204,153,0.1)", border: `${P.mint}40`, color: P.tea, labelColor: darkMode ? P.green : P.mint },
//                             { label: "Years Learning", value: "3+", bg: darkMode ? "rgba(128,237,153,0.12)" : "rgba(199,249,204,0.45)", border: `${P.green}40`, color: P.tea, labelColor: darkMode ? P.tea : P.teal },
//                         ].map((stat, i) => (
//                             <motion.div key={stat.label}
//                                 initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
//                                 viewport={{ once: true }}
//                                 transition={{ delay: i * 0.1, type: "spring", bounce: 0.4 }}
//                                 className="p-6 rounded-2xl text-center backdrop-blur-xl"
//                                 style={{ background: stat.bg, border: `1px solid ${stat.border}` }}>
//                                 <div className="text-3xl font-black mb-1" style={{ color: stat.color }}>{stat.value}</div>
//                                 <div className="text-xs font-semibold" style={{ color: stat.labelColor }}>{stat.label}</div>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </section>

//                 {/* ── Projects ──────────────────────────────── */}
//                 <section id="projects" className="py-28">
//                     <SectionHeading>Projects</SectionHeading>
//                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//                         {PROJECTS.map((project, i) => (
//                             <motion.div key={project.title}
//                                 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
//                                 viewport={{ once: true }}
//                                 transition={{ delay: i * 0.15, duration: 0.7, ease: "easeOut" }}
//                                 whileHover={{ y: -6, transition: { duration: 0.25 } }}
//                                 className="p-7 rounded-3xl relative overflow-hidden group flex flex-col card-glow transition-all duration-300"
//                                 style={{
//                                     background: darkMode
//                                         ? ["linear-gradient(145deg,#071520,#0c1f2e)",
//                                             "linear-gradient(145deg,#0a1a28,#0f2535)",
//                                             "linear-gradient(145deg,#071520,#0a1a28)"][i]
//                                         : ["linear-gradient(145deg,#f0fdf4,#fff)",
//                                             "linear-gradient(145deg,#fff,#f0fdf4)",
//                                             "linear-gradient(145deg,#f0fdf4,#dcfce7)"][i],
//                                     border: `1px solid ${darkMode
//                                         ? [P.teal + "28", P.mint + "22", P.green + "1a"][i]
//                                         : [P.mint + "40", P.teal + "35", P.green + "30"][i]}`,
//                                 }}>

//                                 {/* Top palette accent line */}
//                                 <div className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full"
//                                     style={{ background: project.topLine }} />

//                                 {/* Hover glow */}
//                                 <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
//                                     style={{
//                                         background: [
//                                             "rgba(56,163,165,0.14)",
//                                             "rgba(87,204,153,0.14)",
//                                             "rgba(128,237,153,0.12)",
//                                         ][i], transform: "translate(40%,-40%)"
//                                     }} />

//                                 {/* Icon + stat */}
//                                 <div className="flex items-start justify-between mb-5">
//                                     <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
//                                         style={{ background: project.iconBg }}>
//                                         <Github size={22} strokeWidth={1.5} style={{ color: project.iconColor }} />
//                                     </div>
//                                     <div className="px-3 py-1 rounded-full text-xs font-bold"
//                                         style={{
//                                             background: darkMode ? `${project.accentColor}18` : `${project.accentColor}14`,
//                                             border: `1px solid ${project.accentColor}35`,
//                                             color: project.statColor,
//                                         }}>
//                                         {project.stat.value} <span className="opacity-60 font-normal">{project.stat.label}</span>
//                                     </div>
//                                 </div>

//                                 <p className="text-xs font-bold uppercase tracking-widest mb-1.5"
//                                     style={{ color: project.accentColor }}>{project.type}</p>
//                                 <h3 className="text-lg font-black leading-snug mb-3"
//                                     style={{ fontFamily: "'Syne', sans-serif", color: darkMode ? P.tea : P.baltic }}>
//                                     {project.title}
//                                 </h3>
//                                 <p className="text-sm leading-relaxed mb-5 flex-1"
//                                     style={{ color: darkMode ? P.teal : P.baltic + "cc" }}>{project.description}</p>

//                                 {/* Tags */}
//                                 <div className="flex flex-wrap gap-1.5 mb-5">
//                                     {project.tags.map(tag => (
//                                         <span key={tag} className="text-xs px-2.5 py-1 rounded-full font-semibold"
//                                             style={{
//                                                 background: darkMode ? `${project.accentColor}12` : `${project.accentColor}10`,
//                                                 border: `1px solid ${project.accentColor}28`,
//                                                 color: project.tagColor,
//                                             }}>
//                                             {tag}
//                                         </span>
//                                     ))}
//                                 </div>

//                                 {/* Links */}
//                                 <div className="flex gap-2 mt-auto">
//                                     {project.links.map(link => (
//                                         <motion.a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
//                                             whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
//                                             className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all"
//                                             style={{
//                                                 background: darkMode ? `${project.accentColor}14` : `${project.accentColor}10`,
//                                                 border: `1px solid ${project.accentColor}30`,
//                                                 color: project.accentColor,
//                                             }}
//                                             onMouseEnter={e => { e.currentTarget.style.background = project.accentGrad; e.currentTarget.style.color = P.baltic; e.currentTarget.style.border = "1px solid transparent"; }}
//                                             onMouseLeave={e => { e.currentTarget.style.background = darkMode ? `${project.accentColor}14` : `${project.accentColor}10`; e.currentTarget.style.color = project.accentColor; e.currentTarget.style.border = `1px solid ${project.accentColor}30`; }}>
//                                             <link.icon size={13} />{link.label}
//                                             <ExternalLink size={11} className="opacity-50" />
//                                         </motion.a>
//                                     ))}
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>

//                     {/* View all */}
//                     <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }} transition={{ delay: 0.4 }}
//                         className="flex justify-center mt-12">
//                         <motion.a href="https://github.com/Rbn-Rmn" target="_blank" rel="noopener noreferrer"
//                             whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
//                             className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all"
//                             style={{
//                                 background: darkMode ? "rgba(34,87,122,0.3)" : "rgba(199,249,204,0.5)",
//                                 border: `2px solid ${darkMode ? P.teal : P.mint}`,
//                                 color: darkMode ? P.tea : P.baltic,
//                             }}
//                             onMouseEnter={e => { e.currentTarget.style.background = P.g5; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "transparent"; }}
//                             onMouseLeave={e => { e.currentTarget.style.background = darkMode ? "rgba(34,87,122,0.3)" : "rgba(199,249,204,0.5)"; e.currentTarget.style.color = darkMode ? P.tea : P.baltic; e.currentTarget.style.borderColor = darkMode ? P.teal : P.mint; }}>
//                             <Github size={18} /> View All on GitHub <ExternalLink size={15} className="opacity-60" />
//                         </motion.a>
//                     </motion.div>
//                 </section>

//                 {/* ── Contact ───────────────────────────────── */}
//                 <section id="contact" className="py-28">
//                     <SectionHeading>Let's Connect</SectionHeading>
//                     <div className="max-w-2xl mx-auto">
//                         <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
//                             className={`text-center ${muted} mb-12 text-lg leading-relaxed`}>
//                             Have a project in mind or just want to say hi? My inbox is always open.
//                         </motion.p>
//                         <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
//                             viewport={{ once: true }} transition={{ duration: 0.7 }} className={`${card2} p-8 md:p-10 rounded-3xl`}>
//                             <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
//                                 {[
//                                     { name: "name", placeholder: "Your Name", type: "text" },
//                                     { name: "email", placeholder: "your@email.com", type: "email" },
//                                 ].map(field => (
//                                     <motion.input key={field.name} name={field.name} type={field.type}
//                                         required placeholder={field.placeholder} whileFocus={{ scale: 1.01 }}
//                                         className={`w-full px-5 py-4 rounded-2xl text-sm outline-none transition-all duration-300 ${inputCls}`}
//                                     />
//                                 ))}
//                                 <motion.textarea name="message" required placeholder="Tell me about your project..."
//                                     rows={5} whileFocus={{ scale: 1.01 }}
//                                     className={`w-full px-5 py-4 rounded-2xl text-sm outline-none transition-all duration-300 resize-none ${inputCls}`}
//                                 />
//                                 <AnimatePresence mode="wait">
//                                     {formStatus === "ok" ? (
//                                         <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
//                                             className="w-full py-4 rounded-2xl font-bold text-center"
//                                             style={{ background: darkMode ? "rgba(87,204,153,0.12)" : "rgba(87,204,153,0.15)", border: `1px solid ${P.mint}40`, color: P.mint }}>
//                                             ✅ Message sent successfully!
//                                         </motion.div>
//                                     ) : formStatus === "err" ? (
//                                         <motion.div key="err" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
//                                             className="w-full py-4 rounded-2xl font-bold text-center"
//                                             style={{ background: "linear-gradient(135deg,#2d1010,#1a0808)", border: "1px solid rgba(252,165,165,0.2)", color: "#fca5a5" }}>
//                                             ❌ Failed to send. Try again.
//                                         </motion.div>
//                                     ) : (
//                                         <motion.button key="btn" type="submit" disabled={formStatus === "sending"}
//                                             whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
//                                             className="w-full py-4 rounded-2xl font-bold text-white text-lg shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//                                             style={{ background: P.g5, boxShadow: "0 8px 32px rgba(34,87,122,0.4)" }}>
//                                             {formStatus === "sending" ? (
//                                                 <span className="flex items-center justify-center gap-3">
//                                                     <motion.span animate={{ rotate: 360 }}
//                                                         transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
//                                                         className="inline-block w-5 h-5 border-2 border-white/20 border-t-white rounded-full" />
//                                                     Sending...
//                                                 </span>
//                                             ) : "Send Message 🚀"}
//                                         </motion.button>
//                                     )}
//                                 </AnimatePresence>
//                             </form>
//                         </motion.div>
//                     </div>
//                 </section>

//                 {/* ── Footer ────────────────────────────────── */}
//                 <footer className="text-center py-12 text-sm"
//                     style={{ borderTop: `1px solid ${darkMode ? P.teal + "22" : P.mint + "45"}`, color: darkMode ? P.teal : P.baltic }}>
//                     <div className="flex justify-center gap-3 mb-6">
//                         {SOCIALS.map(({ href, icon: Icon, label }, i) => {
//                             const bgs = [darkMode ? "rgba(34,87,122,0.4)" : "rgba(34,87,122,0.07)", darkMode ? "rgba(56,163,165,0.25)" : "rgba(56,163,165,0.1)", darkMode ? "rgba(87,204,153,0.18)" : "rgba(87,204,153,0.12)"];
//                             const cols = [darkMode ? P.teal : P.baltic, darkMode ? P.mint : P.teal, darkMode ? P.green : P.mint];
//                             return (
//                                 <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
//                                     aria-label={label} whileHover={{ scale: 1.15, y: -2 }}
//                                     className="p-2.5 rounded-xl transition-all"
//                                     style={{ background: bgs[i], border: `1px solid ${cols[i]}35`, color: cols[i] }}
//                                     onMouseEnter={e => { e.currentTarget.style.background = P.g2; e.currentTarget.style.color = P.baltic; }}
//                                     onMouseLeave={e => { e.currentTarget.style.background = bgs[i]; e.currentTarget.style.color = cols[i]; }}>
//                                     <Icon size={19} />
//                                 </motion.a>
//                             );
//                         })}
//                     </div>
//                     <p>
//                         © {new Date().getFullYear()}{" "}
//                         <span className="shimmer-text font-bold">Dewan Sultan</span>
//                         {" "}• Built with ❤️
//                     </p>
//                 </footer>
//             </main>

//             {/* Back to top — g5 */}
//             <AnimatePresence>
//                 {showBackToTop && (
//                     <motion.button
//                         initial={{ opacity: 0, scale: 0.5, y: 20 }}
//                         animate={{ opacity: 1, scale: 1, y: 0 }}
//                         exit={{ opacity: 0, scale: 0.5, y: 20 }}
//                         whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.9 }}
//                         onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//                         className="fixed bottom-8 right-8 p-4 rounded-2xl text-white shadow-2xl z-40"
//                         style={{ background: P.g5, boxShadow: "0 8px 32px rgba(34,87,122,0.5)" }}
//                         aria-label="Back to top">
//                         <ArrowUp size={20} />
//                     </motion.button>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// }

import emailjs from "@emailjs/browser";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
    ArrowUp, ChevronDown, Code2, Database, Download,
    ExternalLink, FileText, Github, Linkedin, Mail,
    Moon, Server, Sparkles, Sun, Twitter, Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ── Palette ──────────────────────────────────────────────────
const P = {
    baltic: "#22577a",
    teal: "#38a3a5",
    mint: "#57cc99",
    green: "#80ed99",
    tea: "#c7f9cc",

    g1: "linear-gradient(135deg, #22577a, #38a3a5)",
    g2: "linear-gradient(135deg, #38a3a5, #57cc99)",
    g3: "linear-gradient(135deg, #57cc99, #80ed99)",
    g4: "linear-gradient(135deg, #80ed99, #c7f9cc)",
    g5: "linear-gradient(135deg, #22577a, #38a3a5, #57cc99)",
    g6: "linear-gradient(135deg, #57cc99, #80ed99, #c7f9cc)",
    g7: "linear-gradient(135deg, #22577a, #38a3a5, #57cc99, #80ed99)",
    ring: "conic-gradient(from 0deg, #c7f9cc, #80ed99, #57cc99, #38a3a5, #22577a, #38a3a5, #57cc99, #80ed99, #c7f9cc)",
};

// ── Unified project card theme ────────────────────────────────
// All 3 project cards share EXACTLY the same color design
const CARD_THEME = {
    // dark mode
    tagBgDark: "rgba(56,163,165,0.2)",
    tagBorderDark: "rgba(56,163,165,0.55)",
    tagTextDark: "#7dd8da",
    btnBgDark: "rgba(56,163,165,0.15)",
    btnBorderDark: "rgba(56,163,165,0.6)",
    btnTextDark: "#5ecfcf",
    cardBgDark: "linear-gradient(145deg, #081f2d, #0c2b3a)",
    cardBorderDark: "rgba(56,163,165,0.28)",
    glowDark: "rgba(56,163,165,0.2)",
    statColorDark: "#7dd8da",
    accentDark: "#38a3a5",
    // light mode
    tagBgLight: "rgba(56,163,165,0.12)",
    tagBorderLight: "rgba(34,87,122,0.45)",
    tagTextLight: "#145f6e",
    btnBgLight: "rgba(56,163,165,0.1)",
    btnBorderLight: "rgba(34,87,122,0.5)",
    btnTextLight: "#145f6e",
    cardBgLight: "linear-gradient(145deg, #edfbfb, #f0fdf9)",
    cardBorderLight: "rgba(56,163,165,0.35)",
    glowLight: "rgba(56,163,165,0.1)",
    statColorLight: "#145f6e",
    accentLight: "#22577a",
    // shared
    iconBg: P.g1,
    iconColor: P.tea,
    topLine: P.g7,
    btnHoverBg: P.g5,
    btnHoverText: "#c7f9cc",
};
// Keep array so PROJECTS can still reference theme (now all same)
const PROJECT_THEMES = [CARD_THEME, CARD_THEME, CARD_THEME];

// ── Skill card configs ───────────────────────────────────────
const SKILL_CARDS = [
    {
        icon: Database, title: "Data Science",
        desc: "Transforming raw data into meaningful insights through analysis and visualization.",
        iconBg: P.g1, iconColor: P.tea,
        accentBar: P.g1,
        barColors: [P.tea, P.green, P.mint, P.teal],
        skills: [
            { label: "Python", level: 90 },
            { label: "Pandas / NumPy", level: 85 },
            { label: "Scikit-learn", level: 75 },
            { label: "Data Visualization", level: 80 },
        ],
    },
    {
        icon: Server, title: "Backend",
        desc: "Building robust, scalable APIs and server-side systems that power modern apps.",
        iconBg: P.g2, iconColor: P.baltic,
        accentBar: P.g2,
        barColors: [P.green, P.mint, P.teal, P.baltic],
        skills: [
            { label: "Node.js / Express", level: 88 },
            { label: "MongoDB", level: 82 },
            { label: "PostgreSQL", level: 78 },
            { label: "REST & GraphQL", level: 85 },
        ],
    },
    {
        icon: Code2, title: "Programming",
        desc: "Writing clean, efficient code and solving complex algorithmic challenges.",
        iconBg: P.g3, iconColor: P.baltic,
        accentBar: P.g3,
        barColors: [P.tea, P.green, P.mint, P.teal],
        skills: [
            { label: "C++", level: 85 },
            { label: "JavaScript / TypeScript", level: 88 },
            { label: "Algorithms & DSA", level: 80 },
            { label: "Problem Solving", level: 90 },
        ],
    },
];

// ── Projects ─────────────────────────────────────────────────
const PROJECTS = [
    {
        title: "Multimodal Emotion Analysis",
        type: "AI / Machine Learning",
        description: "Multimodal sentiment model combining BERT + ResNet. Trained on 5,220 image–text pairs using PyTorch, achieving ~97% training accuracy across positive, neutral, and negative classes.",
        tags: ["Python", "PyTorch", "BERT", "ResNet", "Transformers"],
        links: [
            { label: "Report", icon: FileText, href: "https://drive.google.com/file/d/1sWRQik73r7imClAodDVa5qSABPvO8pt-/view?usp=sharing" },
            { label: "Kaggle", icon: Code2, href: "https://www.kaggle.com/code/arifulhaquenoman/capstone" },
        ],
        stat: { label: "Accuracy", value: "~97%" },
        theme: PROJECT_THEMES[0],
    },
    {
        title: "TaskMaster",
        type: "Full-Stack Web App",
        description: "MERN stack app with JWT auth, drag-and-drop reordering, category filtering, due dates & real-time search. Dark mode, daily goal tracking and streak statistics.",
        tags: ["MongoDB", "Express", "React", "Node.js", "JWT"],
        links: [
            { label: "GitHub", icon: Github, href: "https://github.com/Rbn-Rmn/TaskMaster.git" },
        ],
        stat: { label: "Stack", value: "MERN" },
        theme: PROJECT_THEMES[1],
    },
    {
        title: "ZeroMiss",
        type: "Android Application",
        description: "Kotlin + Jetpack Compose productivity app with 5+ modules — task manager, contest tracker, tuition attendance, focus timer, calendar — using MVVM + Room DB.",
        tags: ["Kotlin", "Jetpack Compose", "MVVM", "Room DB", "WorkManager"],
        links: [
            { label: "GitHub", icon: Github, href: "https://github.com/Rbn-Rmn/ZeroMiss" },
        ],
        stat: { label: "Modules", value: "5+" },
        theme: PROJECT_THEMES[2],
    },
];

// ── Particles ────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    style: {
        width: Math.floor(Math.random() * 5) + 2,
        height: Math.floor(Math.random() * 5) + 2,
        left: `${Math.floor(Math.random() * 100)}%`,
        top: `${Math.floor(Math.random() * 100)}%`,
        background: [P.tea, P.green, P.mint, P.teal, P.baltic][i % 5],
    },
}));

const SOCIALS = [
    { href: "https://github.com/Rbn-Rmn", icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/in/dewansultan/", icon: Linkedin, label: "LinkedIn" },
    { href: "https://x.com/YOUR_TWITTER_USERNAME", icon: Twitter, label: "Twitter" },
];

// ── Sub-components ───────────────────────────────────────────
function Particle({ style }) {
    return (
        <motion.div className="absolute rounded-full pointer-events-none" style={style}
            animate={{ y: [0, -30, 0], opacity: [0.05, 0.25, 0.05], scale: [1, 1.5, 1] }}
            transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 3 }}
        />
    );
}

function GridBackground({ darkMode }) {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage: `linear-gradient(${P.teal} 1px, transparent 1px), linear-gradient(to right, ${P.teal} 1px, transparent 1px)`,
                    backgroundSize: "72px 72px",
                }}
            />
            <motion.div className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full"
                style={{ background: darkMode ? "radial-gradient(circle, rgba(34,87,122,0.35) 0%, transparent 65%)" : "radial-gradient(circle, rgba(34,87,122,0.08) 0%, transparent 65%)" }}
                animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full"
                style={{ background: darkMode ? "radial-gradient(circle, rgba(56,163,165,0.12) 0%, transparent 65%)" : "radial-gradient(circle, rgba(56,163,165,0.09) 0%, transparent 65%)" }}
                animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full"
                style={{ background: darkMode ? "radial-gradient(circle, rgba(87,204,153,0.1) 0%, transparent 65%)" : "radial-gradient(circle, rgba(128,237,153,0.12) 0%, transparent 65%)" }}
                animate={{ scale: [1.1, 1, 1.1], x: [0, -15, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-px opacity-20"
                style={{ background: `linear-gradient(to right, transparent, ${P.tea}, transparent)` }} />
        </div>
    );
}

function SkillBar({ label, level, color, delay }) {
    return (
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay, duration: 0.5 }} className="mb-3">
            <div className="flex justify-between text-xs mb-1 font-medium opacity-65">
                <span>{label}</span><span>{level}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(56,163,165,0.12)" }}>
                <motion.div className="h-full rounded-full" style={{ background: color }}
                    initial={{ width: 0 }} whileInView={{ width: `${level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: delay + 0.2, duration: 1, ease: "easeOut" }} />
            </div>
        </motion.div>
    );
}

function SectionHeading({ children }) {
    return (
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-tight bg-clip-text text-transparent"
                style={{ backgroundImage: P.g7, fontFamily: "'Syne', sans-serif" }}>
                {children}
            </h2>
            <motion.div className="mt-4 h-[2px] mx-auto rounded-full"
                style={{ background: P.g7, maxWidth: 240 }}
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.9 }}
            />
        </motion.div>
    );
}

// ── Project Card ─────────────────────────────────────────────
function ProjectCard({ project, darkMode }) {
    const t = project.theme;
    const tagBg = darkMode ? t.tagBgDark : t.tagBgLight;
    const tagBorder = darkMode ? t.tagBorderDark : t.tagBorderLight;
    const tagText = darkMode ? t.tagTextDark : t.tagTextLight;
    const btnBg = darkMode ? t.btnBgDark : t.btnBgLight;
    const btnBorder = darkMode ? t.btnBorderDark : t.btnBorderLight;
    const btnText = darkMode ? t.btnTextDark : t.btnTextLight;
    const cardBg = darkMode ? t.cardBgDark : t.cardBgLight;
    const cardBorder = darkMode ? t.cardBorderDark : t.cardBorderLight;
    const glowColor = darkMode ? t.glowDark : t.glowLight;
    const statColor = darkMode ? t.statColorDark : t.statColorLight;
    const accent = darkMode ? t.accentDark : t.accentLight;

    return (
        <div className="h-full p-7 rounded-3xl relative overflow-hidden group flex flex-col card-glow transition-all duration-300"
            style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>

            {/* Top accent line */}
            <div className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full"
                style={{ background: t.topLine }} />

            {/* Hover glow */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: glowColor, transform: "translate(40%,-40%)" }} />

            {/* Icon + stat */}
            <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
                    style={{ background: t.iconBg }}>
                    <Github size={22} strokeWidth={1.5} style={{ color: t.iconColor }} />
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: tagBg, border: `1px solid ${tagBorder}`, color: statColor }}>
                    {project.stat.value}{" "}
                    <span style={{ opacity: 0.65, fontWeight: 400 }}>{project.stat.label}</span>
                </div>
            </div>

            {/* Type label */}
            <p className="text-xs font-bold uppercase tracking-widest mb-1.5"
                style={{ color: accent }}>{project.type}</p>

            {/* Title — fixed 2-line height so all cards align below */}
            <h3 className="text-lg font-black leading-snug mb-3 min-h-[3.5rem]"
                style={{ fontFamily: "'Syne', sans-serif", color: darkMode ? P.tea : P.baltic }}>
                {project.title}
            </h3>

            {/* Description — clamped to 4 lines, grows to fill space */}
            <p className="text-sm leading-relaxed mb-5 flex-1 line-clamp-4"
                style={{ color: darkMode ? "rgba(56,163,165,0.85)" : "rgba(34,87,122,0.8)" }}>
                {project.description}
            </p>

            {/* Tags — fixed min-height so button row always starts at same position */}
            <div className="flex flex-wrap gap-1.5 mb-5 min-h-[4.5rem] content-start">
                {project.tags.map(tag => (
                    <span key={tag} className="h-fit text-xs px-2.5 py-1 rounded-full font-semibold"
                        style={{ background: tagBg, border: `1px solid ${tagBorder}`, color: tagText }}>
                        {tag}
                    </span>
                ))}
            </div>

            {/* Link buttons — always at bottom */}
            <div className="flex gap-2">
                {project.links.map(link => (
                    <motion.a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all"
                        style={{ background: btnBg, border: `1px solid ${btnBorder}`, color: btnText }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = t.btnHoverBg;
                            e.currentTarget.style.color = t.btnHoverText;
                            e.currentTarget.style.border = "1px solid transparent";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = btnBg;
                            e.currentTarget.style.color = btnText;
                            e.currentTarget.style.border = `1px solid ${btnBorder}`;
                        }}>
                        <link.icon size={13} />
                        {link.label}
                        <ExternalLink size={11} style={{ opacity: 0.5 }} />
                    </motion.a>
                ))}
            </div>
        </div>
    );
}

// ── Main ─────────────────────────────────────────────────────
export default function Portfolio() {
    const [darkMode, setDarkMode] = useState(() => { try { return localStorage.getItem("theme") !== "light"; } catch { return true; } });
    const [scrolled, setScrolled] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState("");
    const [roleIndex, setRoleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [formStatus, setFormStatus] = useState(null);
    const [activeNav, setActiveNav] = useState("about");
    const formRef = useRef();

    const roles = ["Backend Developer", "Data Analyst", "Problem Solver", "Code Craftsman"];
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    useEffect(() => {
        try { localStorage.setItem("theme", darkMode ? "dark" : "light"); } catch { }
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    useEffect(() => {
        const fn = () => {
            setScrolled(window.scrollY > 50);
            setShowBackToTop(window.scrollY > 500);
            for (const id of ["contact", "projects", "skills", "about"]) {
                const el = document.getElementById(id);
                if (el && window.scrollY >= el.offsetTop - 120) { setActiveNav(id); break; }
            }
        };
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    useEffect(() => { const t = setTimeout(() => setLoading(false), 1600); return () => clearTimeout(t); }, []);

    useEffect(() => {
        if (loading) return;
        const t = setTimeout(() => {
            if (charIndex < roles[roleIndex].length) {
                setText(p => p + roles[roleIndex][charIndex]);
                setCharIndex(p => p + 1);
            } else {
                setTimeout(() => { setText(""); setCharIndex(0); setRoleIndex(p => (p + 1) % roles.length); }, 1400);
            }
        }, 65);
        return () => clearTimeout(t);
    }, [charIndex, roleIndex, loading]);

    const sendEmail = (e) => {
        e.preventDefault(); setFormStatus("sending");
        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            formRef.current,
            { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
        ).then(() => { setFormStatus("ok"); formRef.current.reset(); })
            .catch(err => { console.error(err); setFormStatus("err"); });
    };

    // ── Theme helpers ────────────────────────────────────────
    const bg = darkMode ? "bg-[#071520]" : "bg-[#f0fdf4]";
    const text_ = darkMode ? "text-[#c7f9cc]" : "text-[#0f2d3d]";
    const muted = darkMode ? "text-[#38a3a5]" : "text-[#22577a]";
    const cardD1 = "bg-[#0c1f2e]/85 border border-[#22577a]/50 backdrop-blur-2xl";
    const cardD2 = "bg-[#0a1a28]/80 border border-[#38a3a5]/20 backdrop-blur-2xl";
    const cardL1 = "bg-white border-2 border-[#57cc99]/55 backdrop-blur-2xl shadow-lg shadow-[#22577a]/10";
    const cardL2 = "bg-white border-2 border-[#57cc99]/50 backdrop-blur-2xl shadow-lg shadow-[#22577a]/10";
    const card1 = darkMode ? cardD1 : cardL1;
    const card2 = darkMode ? cardD2 : cardL2;
    const inputCls = darkMode
        ? "bg-[#071520] border border-[#22577a]/60 text-[#c7f9cc] placeholder:text-[#38a3a5]/60 focus:border-[#57cc99] focus:ring-2 focus:ring-[#57cc99]/15"
        : "bg-white border-2 border-[#57cc99]/60 text-[#0f2d3d] placeholder:text-[#38a3a5]/70 focus:border-[#38a3a5] focus:ring-2 focus:ring-[#38a3a5]/20";
    const navBg = darkMode ? "bg-[#071520]/93" : "bg-[#f0fdf4]/93";
    const pillBg = darkMode ? "rgba(34,87,122,0.45)" : "rgba(199,249,204,0.55)";
    const navGrads = [P.g1, P.g2, P.g1, P.g2];

    // ── Loading ──────────────────────────────────────────────
    if (loading) {
        return (
            <div className={`h-screen flex flex-col items-center justify-center ${bg}`}>
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative">
                    <div className="absolute inset-0 rounded-full blur-3xl"
                        style={{ background: "radial-gradient(circle, rgba(56,163,165,0.35), rgba(87,204,153,0.15), transparent)", transform: "scale(2.2)" }} />
                    <div className="relative text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent px-6 py-2"
                        style={{ backgroundImage: P.g7, fontFamily: "'Syne', sans-serif" }}>
                        Dewan Sultan
                    </div>
                </motion.div>
                <motion.div className="mt-8 flex gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                    {[P.teal, P.mint, P.tea].map((color, i) => (
                        <motion.div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: color }}
                            animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }} />
                    ))}
                </motion.div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${bg} ${text_} transition-colors duration-700`}
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

            <div className="noise" />
            <GridBackground darkMode={darkMode} />
            <div className="fixed inset-0 pointer-events-none z-0">
                {PARTICLES.map(p => <Particle key={p.id} style={p.style} />)}
            </div>

            <motion.div className="fixed top-0 left-0 right-0 h-[3px] origin-left z-50"
                style={{ scaleX, background: P.g7 }} />

            {/* ── Navbar ──────────────────────────────────── */}
            <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? `py-3 ${navBg} backdrop-blur-2xl shadow-xl shadow-[#071520]/40` : "py-5 bg-transparent"
                    }`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <motion.a href="#about" whileHover={{ scale: 1.08, rotate: 3 }} whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }} aria-label="Home">
                        <img src="/logo.svg" alt="Dewan Sultan" width="56" height="56" />
                    </motion.a>
                    <div className="hidden md:flex items-center gap-1 p-1 rounded-full border"
                        style={{ background: pillBg, borderColor: darkMode ? "rgba(56,163,165,0.25)" : "rgba(87,204,153,0.4)" }}>
                        {["about", "skills", "projects", "contact"].map((link, i) => (
                            <a key={link} href={`#${link}`}
                                className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-300 ${activeNav === link ? "text-white" : muted}`}
                                style={activeNav === link ? { background: navGrads[i] } : {}}>
                                {link}
                            </a>
                        ))}
                    </div>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2.5 rounded-xl transition border"
                        style={{ background: darkMode ? "rgba(34,87,122,0.4)" : "rgba(199,249,204,0.5)", borderColor: darkMode ? "rgba(56,163,165,0.3)" : "rgba(87,204,153,0.4)" }}
                        aria-label="Toggle theme">
                        <AnimatePresence mode="wait">
                            <motion.div key={darkMode ? "sun" : "moon"}
                                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                {darkMode ? <Sun size={18} style={{ color: P.tea }} /> : <Moon size={18} style={{ color: P.baltic }} />}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>
                </div>
            </motion.nav>

            <main className="relative z-10 pt-24 pb-20 px-6 max-w-7xl mx-auto">

                {/* ── Hero ──────────────────────────────────── */}
                <section id="about" className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-16 py-20 relative">
                    <div className="relative flex-shrink-0">
                        <div className="absolute -inset-4 rounded-full blur-2xl opacity-30" style={{ background: P.ring }} />
                        <motion.div className="absolute inset-0 rounded-full"
                            style={{ background: P.ring, padding: 3 }}
                            animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} />
                        <motion.div className="absolute -inset-6 rounded-full blur-3xl"
                            style={{ background: "radial-gradient(circle, rgba(87,204,153,0.2) 0%, rgba(56,163,165,0.1) 50%, transparent 70%)" }}
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity }} />
                        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
                            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden float"
                            style={{ border: `3px solid ${P.teal}` }}>
                            <img src="/profile.jpg" alt="Dewan Sultan"
                                className="w-full h-full object-cover rounded-full"
                                onError={e => {
                                    e.currentTarget.style.display = "none";
                                    const p = e.currentTarget.parentElement;
                                    if (p) {
                                        p.style.background = `linear-gradient(135deg, ${P.baltic}, ${P.teal}, ${P.mint})`;
                                        const fb = document.createElement("div");
                                        fb.style.cssText = `display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:72px;font-weight:900;color:${P.tea};font-family:Syne,sans-serif;`;
                                        fb.textContent = "DS";
                                        p.appendChild(fb);
                                    }
                                }}
                            />
                        </motion.div>
                        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1, type: "spring", bounce: 0.5 }}
                            className="absolute text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-xl"
                            style={{ top: "5%", right: "-22%", background: P.g1, color: P.tea, border: `1px solid ${P.teal}` }}>
                            ⚡ Open to Work
                        </motion.div>
                        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.3, type: "spring", bounce: 0.5 }}
                            className="absolute text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-xl"
                            style={{ bottom: "10%", left: "-20%", background: P.g3, color: P.baltic, border: `1px solid ${P.mint}` }}>
                            🧠 Problem Solver
                        </motion.div>
                    </div>

                    <div className="max-w-2xl text-center lg:text-left">
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8"
                            style={{ background: darkMode ? "rgba(34,87,122,0.35)" : "rgba(199,249,204,0.6)", border: `1px solid ${darkMode ? P.teal : P.mint}`, color: darkMode ? P.tea : P.baltic }}>
                            <Sparkles size={14} style={{ color: darkMode ? P.mint : P.teal }} />
                            Available for freelance projects
                        </motion.div>
                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.8 }}
                            className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05]"
                            style={{ fontFamily: "'Syne', sans-serif" }}>
                            Hi, I'm <span className="shimmer-text">Dewan Sultan</span>
                        </motion.h1>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                            className="mt-6 text-2xl md:text-3xl font-semibold h-12 flex items-center justify-center lg:justify-start gap-2"
                            style={{ color: darkMode ? P.mint : P.teal }}>
                            <Zap size={22} className="flex-shrink-0" style={{ color: darkMode ? P.green : P.teal }} />
                            {text}
                            <span className="blink inline-block w-0.5 h-8 ml-0.5" style={{ background: darkMode ? P.mint : P.teal }} />
                        </motion.div>
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.75, duration: 0.7 }}
                            className={`mt-8 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 ${muted}`}>
                            Passionate about building{" "}
                            <strong style={{ color: darkMode ? P.tea : P.baltic }}>scalable backend systems</strong>
                            , turning data into insights, and solving complex problems with clean, efficient code.
                        </motion.p>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
                            className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
                            <motion.a href="/cv.pdf" download
                                whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
                                className="px-8 py-4 rounded-2xl font-bold text-white flex items-center gap-3"
                                style={{ background: P.g5, boxShadow: "0 8px 24px rgba(34,87,122,0.4)" }}>
                                <Download size={18} /> Download CV
                            </motion.a>
                            <motion.a href="mailto:dwnsultan@gmail.com"
                                whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
                                className="px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all"
                                style={{ background: darkMode ? "rgba(34,87,122,0.25)" : "rgba(199,249,204,0.45)", border: `2px solid ${darkMode ? P.mint : P.teal}`, color: darkMode ? P.tea : P.baltic }}
                                onMouseEnter={e => { e.currentTarget.style.background = P.g2; e.currentTarget.style.color = P.baltic; e.currentTarget.style.borderColor = "transparent"; }}
                                onMouseLeave={e => { e.currentTarget.style.background = darkMode ? "rgba(34,87,122,0.25)" : "rgba(199,249,204,0.45)"; e.currentTarget.style.color = darkMode ? P.tea : P.baltic; e.currentTarget.style.borderColor = darkMode ? P.mint : P.teal; }}>
                                <Mail size={18} /> Get in Touch
                            </motion.a>
                        </motion.div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
                            className="mt-10 flex gap-3 justify-center lg:justify-start">
                            {SOCIALS.map(({ href, icon: Icon, label }, i) => {
                                const configs = [
                                    { bg: darkMode ? "rgba(34,87,122,0.45)" : "rgba(34,87,122,0.08)", border: P.baltic, color: darkMode ? P.teal : P.baltic },
                                    { bg: darkMode ? "rgba(56,163,165,0.2)" : "rgba(56,163,165,0.12)", border: P.teal, color: darkMode ? P.mint : P.teal },
                                    { bg: darkMode ? "rgba(87,204,153,0.15)" : "rgba(87,204,153,0.15)", border: P.mint, color: darkMode ? P.green : P.mint },
                                ];
                                const c = configs[i];
                                return (
                                    <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                                        aria-label={label} whileHover={{ scale: 1.15, y: -3 }} whileTap={{ scale: 0.9 }}
                                        className="p-3 rounded-xl transition-all"
                                        style={{ background: c.bg, border: `1px solid ${c.border}40`, color: c.color }}
                                        onMouseEnter={e => { e.currentTarget.style.background = P.g2; e.currentTarget.style.color = P.baltic; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = c.bg; e.currentTarget.style.color = c.color; }}>
                                        <Icon size={20} />
                                    </motion.a>
                                );
                            })}
                        </motion.div>
                    </div>

                    <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2"
                        animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                        <ChevronDown size={22} style={{ color: P.teal }} />
                    </motion.div>
                </section>

                {/* ── Skills ────────────────────────────────── */}
                <section id="skills" className="py-28">
                    <SectionHeading>Skills & Expertise</SectionHeading>
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {SKILL_CARDS.map((skill, i) => (
                            <motion.div key={skill.title}
                                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, duration: 0.7, ease: "easeOut" }}
                                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                                className={`p-8 rounded-3xl card-glow relative overflow-hidden group transition-all duration-300 ${i % 2 === 0 ? card1 : card2}`}>
                                <div className="absolute top-0 right-0 w-44 h-44 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ background: ["rgba(56,163,165,0.2)", "rgba(87,204,153,0.2)", "rgba(128,237,153,0.18)"][i], transform: "translate(35%,-35%)" }} />
                                <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full" style={{ background: skill.accentBar }} />
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-xl" style={{ background: skill.iconBg }}>
                                    <skill.icon size={26} strokeWidth={1.5} style={{ color: skill.iconColor }} />
                                </div>
                                <h3 className="text-xl font-black mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>{skill.title}</h3>
                                <p className={`text-sm ${muted} mb-6 leading-relaxed`}>{skill.desc}</p>
                                {skill.skills.map((s, j) => (
                                    <SkillBar key={s.label} label={s.label} level={s.level} color={skill.barColors[j]} delay={i * 0.15 + j * 0.08} />
                                ))}
                            </motion.div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        {[
                            {
                                label: "Projects Built", value: "20+",
                                bgDark: "rgba(34,87,122,0.55)", bgLight: "rgba(34,87,122,0.08)",
                                borderDark: "rgba(56,163,165,0.5)", borderLight: "rgba(34,87,122,0.35)",
                                valueDark: "#5ecfcf", valueLight: "#145f6e",
                                labelDark: "#38a3a5", labelLight: "#22577a",
                            },
                            {
                                label: "Algorithms Solved", value: "300+",
                                bgDark: "rgba(56,163,165,0.3)", bgLight: "rgba(56,163,165,0.1)",
                                borderDark: "rgba(87,204,153,0.5)", borderLight: "rgba(56,163,165,0.4)",
                                valueDark: "#80ed99", valueLight: "#12694a",
                                labelDark: "#57cc99", labelLight: "#1a7a4e",
                            },
                            {
                                label: "Coffee Consumed", value: "∞",
                                bgDark: "rgba(87,204,153,0.22)", bgLight: "rgba(87,204,153,0.12)",
                                borderDark: "rgba(128,237,153,0.45)", borderLight: "rgba(87,204,153,0.4)",
                                valueDark: "#c7f9cc", valueLight: "#0f5c30",
                                labelDark: "#80ed99", labelLight: "#12694a",
                            },
                            {
                                label: "Years Learning", value: "3+",
                                bgDark: "rgba(128,237,153,0.18)", bgLight: "rgba(199,249,204,0.5)",
                                borderDark: "rgba(199,249,204,0.4)", borderLight: "rgba(128,237,153,0.45)",
                                valueDark: "#c7f9cc", valueLight: "#145f6e",
                                labelDark: "#80ed99", labelLight: "#22577a",
                            },
                        ].map((stat, i) => (
                            <motion.div key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, type: "spring", bounce: 0.4 }}
                                className="p-6 rounded-2xl text-center backdrop-blur-xl"
                                style={{
                                    background: darkMode ? stat.bgDark : stat.bgLight,
                                    border: `1px solid ${darkMode ? stat.borderDark : stat.borderLight}`,
                                }}>
                                <div className="text-3xl font-black mb-1"
                                    style={{ color: darkMode ? stat.valueDark : stat.valueLight }}>
                                    {stat.value}
                                </div>
                                <div className="text-xs font-semibold"
                                    style={{ color: darkMode ? stat.labelDark : stat.labelLight }}>
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── Projects ──────────────────────────────── */}
                <section id="projects" className="py-28">
                    <SectionHeading>Projects</SectionHeading>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
                        {PROJECTS.map((project, i) => (
                            <motion.div key={project.title}
                                className="flex flex-col"
                                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, duration: 0.7, ease: "easeOut" }}
                                whileHover={{ y: -6, transition: { duration: 0.25 } }}>
                                <ProjectCard project={project} darkMode={darkMode} />
                            </motion.div>
                        ))}
                    </div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.4 }}
                        className="flex justify-center mt-12">
                        <motion.a href="https://github.com/Rbn-Rmn" target="_blank" rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all"
                            style={{ background: darkMode ? "rgba(34,87,122,0.3)" : "rgba(199,249,204,0.5)", border: `2px solid ${darkMode ? P.teal : P.mint}`, color: darkMode ? P.tea : P.baltic }}
                            onMouseEnter={e => { e.currentTarget.style.background = P.g5; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "transparent"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = darkMode ? "rgba(34,87,122,0.3)" : "rgba(199,249,204,0.5)"; e.currentTarget.style.color = darkMode ? P.tea : P.baltic; e.currentTarget.style.borderColor = darkMode ? P.teal : P.mint; }}>
                            <Github size={18} /> View All on GitHub <ExternalLink size={15} style={{ opacity: 0.6 }} />
                        </motion.a>
                    </motion.div>
                </section>

                {/* ── Contact ───────────────────────────────── */}
                <section id="contact" className="py-28">
                    <SectionHeading>Let's Connect</SectionHeading>
                    <div className="max-w-2xl mx-auto">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            className={`text-center ${muted} mb-12 text-lg leading-relaxed`}>
                            Have a project in mind or just want to say hi? My inbox is always open.
                        </motion.p>
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.7 }}
                            className={`${card2} p-8 md:p-10 rounded-3xl`}>
                            <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
                                {[
                                    { name: "name", placeholder: "Your Name", type: "text" },
                                    { name: "email", placeholder: "your@email.com", type: "email" },
                                ].map(field => (
                                    <motion.input key={field.name} name={field.name} type={field.type}
                                        required placeholder={field.placeholder} whileFocus={{ scale: 1.01 }}
                                        className={`w-full px-5 py-4 rounded-2xl text-sm outline-none transition-all duration-300 ${inputCls}`} />
                                ))}
                                <motion.textarea name="message" required placeholder="Tell me about your project..."
                                    rows={5} whileFocus={{ scale: 1.01 }}
                                    className={`w-full px-5 py-4 rounded-2xl text-sm outline-none transition-all duration-300 resize-none ${inputCls}`} />
                                <AnimatePresence mode="wait">
                                    {formStatus === "ok" ? (
                                        <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                            className="w-full py-4 rounded-2xl font-bold text-center"
                                            style={{ background: darkMode ? "rgba(87,204,153,0.12)" : "rgba(87,204,153,0.15)", border: `1px solid ${P.mint}40`, color: P.mint }}>
                                            ✅ Message sent successfully!
                                        </motion.div>
                                    ) : formStatus === "err" ? (
                                        <motion.div key="err" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                            className="w-full py-4 rounded-2xl font-bold text-center"
                                            style={{ background: "linear-gradient(135deg,#2d1010,#1a0808)", border: "1px solid rgba(252,165,165,0.2)", color: "#fca5a5" }}>
                                            ❌ Failed to send. Try again.
                                        </motion.div>
                                    ) : (
                                        <motion.button key="btn" type="submit" disabled={formStatus === "sending"}
                                            whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
                                            className="w-full py-4 rounded-2xl font-bold text-white text-lg shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                            style={{ background: P.g5, boxShadow: "0 8px 32px rgba(34,87,122,0.4)" }}>
                                            {formStatus === "sending" ? (
                                                <span className="flex items-center justify-center gap-3">
                                                    <motion.span animate={{ rotate: 360 }}
                                                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                                        className="inline-block w-5 h-5 border-2 border-white/20 border-t-white rounded-full" />
                                                    Sending...
                                                </span>
                                            ) : "Send Message 🚀"}
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </form>
                        </motion.div>
                    </div>
                </section>

                {/* ── Footer ────────────────────────────────── */}
                <footer className="text-center py-12 text-sm"
                    style={{ borderTop: `1px solid ${darkMode ? P.teal + "22" : P.mint + "45"}`, color: darkMode ? P.teal : P.baltic }}>
                    <div className="flex justify-center gap-3 mb-6">
                        {SOCIALS.map(({ href, icon: Icon, label }, i) => {
                            const bgs = [darkMode ? "rgba(34,87,122,0.4)" : "rgba(34,87,122,0.07)", darkMode ? "rgba(56,163,165,0.25)" : "rgba(56,163,165,0.1)", darkMode ? "rgba(87,204,153,0.18)" : "rgba(87,204,153,0.12)"];
                            const cols = [darkMode ? P.teal : P.baltic, darkMode ? P.mint : P.teal, darkMode ? P.green : P.mint];
                            return (
                                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                                    aria-label={label} whileHover={{ scale: 1.15, y: -2 }}
                                    className="p-2.5 rounded-xl transition-all"
                                    style={{ background: bgs[i], border: `1px solid ${cols[i]}35`, color: cols[i] }}
                                    onMouseEnter={e => { e.currentTarget.style.background = P.g2; e.currentTarget.style.color = P.baltic; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = bgs[i]; e.currentTarget.style.color = cols[i]; }}>
                                    <Icon size={19} />
                                </motion.a>
                            );
                        })}
                    </div>
                    <p>© {new Date().getFullYear()}{" "}<span className="shimmer-text font-bold">Dewan Sultan</span>{" "}• Built with ❤️</p>
                </footer>
            </main>

            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.9 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="fixed bottom-8 right-8 p-4 rounded-2xl text-white shadow-2xl z-40"
                        style={{ background: P.g5, boxShadow: "0 8px 32px rgba(34,87,122,0.5)" }}
                        aria-label="Back to top">
                        <ArrowUp size={20} />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}