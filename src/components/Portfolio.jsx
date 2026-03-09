import emailjs from "@emailjs/browser";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
    ArrowUp,
    ChevronDown,
    Code2, Database, Download, Github, Linkedin,
    Mail, Moon, Server,
    Sparkles,
    Sun, Twitter,
    Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

function Particle({ style }) {
    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={style}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2], scale: [1, 1.3, 1] }}
            transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 3,
            }}
        />
    );
}

function GridBackground({ darkMode }) {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(${darkMode ? "#60a5fa" : "#6366f1"} 1px, transparent 1px),
                        linear-gradient(to right, ${darkMode ? "#60a5fa" : "#6366f1"} 1px, transparent 1px)`,
                    backgroundSize: "64px 64px",
                }}
            />
            <motion.div
                className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
                style={{
                    background: darkMode
                        ? "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)"
                        : "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
                }}
                animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
                style={{
                    background: darkMode
                        ? "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)"
                        : "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
                }}
                animate={{ scale: [1.15, 1, 1.15], x: [0, -20, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
}

function SkillBar({ label, level, color, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="mb-3"
        >
            <div className="flex justify-between text-xs mb-1 font-medium opacity-70">
                <span>{label}</span>
                <span>{level}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: delay + 0.2, duration: 1, ease: "easeOut" }}
                />
            </div>
        </motion.div>
    );
}

function SectionHeading({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
        >
            <h2
                className="text-5xl md:text-6xl font-black tracking-tight leading-tight bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #06b6d4, #6366f1, #a855f7)" }}
            >
                {children}
            </h2>
            <motion.div
                className="mt-4 h-px mx-auto"
                style={{
                    background: "linear-gradient(to right, transparent, #6366f1, transparent)",
                    maxWidth: 200,
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
            />
        </motion.div>
    );
}

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    style: {
        width: Math.floor(Math.random() * 6) + 2,
        height: Math.floor(Math.random() * 6) + 2,
        left: `${Math.floor(Math.random() * 100)}%`,
        top: `${Math.floor(Math.random() * 100)}%`,
        background: i % 3 === 0 ? "#06b6d4" : i % 3 === 1 ? "#6366f1" : "#a855f7",
    },
}));

const SOCIALS = [
    { href: "https://github.com/Rbn-Rmn", icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/in/dewansultan/", icon: Linkedin, label: "LinkedIn" },
    { href: "https://x.com/YOUR_TWITTER_USERNAME", icon: Twitter, label: "Twitter" },
];

export default function Portfolio() {
    const [darkMode, setDarkMode] = useState(() => {
        try { return localStorage.getItem("theme") !== "light"; } catch { return true; }
    });
    const [scrolled, setScrolled] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState("");
    const [roleIndex, setRoleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [formStatus, setFormStatus] = useState(null); // null | 'sending' | 'ok' | 'err'
    const [activeNav, setActiveNav] = useState("about");

    const formRef = useRef();

    const roles = ["Backend Developer", "Data Analyst", "Problem Solver", "Code Craftsman"];

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 400], [0, -80]);
    const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

    useEffect(() => {
        try { localStorage.setItem("theme", darkMode ? "dark" : "light"); } catch { }
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    useEffect(() => {
        const fn = () => {
            setScrolled(window.scrollY > 50);
            setShowBackToTop(window.scrollY > 500);
            const sections = ["about", "skills", "contact"];
            for (const id of [...sections].reverse()) {
                const el = document.getElementById(id);
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActiveNav(id);
                    break;
                }
            }
        };
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 1600);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (loading) return;
        const t = setTimeout(() => {
            if (charIndex < roles[roleIndex].length) {
                setText(prev => prev + roles[roleIndex][charIndex]);
                setCharIndex(prev => prev + 1);
            } else {
                setTimeout(() => {
                    setText("");
                    setCharIndex(0);
                    setRoleIndex(prev => (prev + 1) % roles.length);
                }, 1400);
            }
        }, 65);
        return () => clearTimeout(t);
    }, [charIndex, roleIndex, loading]);

    const sendEmail = (e) => {
        e.preventDefault();
        setFormStatus("sending");
        emailjs
            .sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                formRef.current,
                { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
            )
            .then(() => {
                setFormStatus("ok");
                formRef.current.reset();
            })
            .catch((err) => {
                console.error("EmailJS error:", err);
                setFormStatus("err");
            });
    };

    const bg = darkMode ? "bg-slate-950" : "bg-slate-50";
    const text_ = darkMode ? "text-slate-100" : "text-slate-900";
    const muted = darkMode ? "text-slate-400" : "text-slate-500";
    const card = darkMode
        ? "bg-slate-900/60 border border-slate-800/60 backdrop-blur-2xl"
        : "bg-white/80 border border-slate-200/80 backdrop-blur-2xl shadow-lg";
    const inputCls = darkMode
        ? "bg-slate-800/60 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        : "bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20";

    if (loading) {
        return (
            <div className={`h-screen flex flex-col items-center justify-center ${bg}`}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative"
                >
                    <motion.div
                        className="absolute inset-0 rounded-full blur-2xl"
                        style={{ background: "linear-gradient(135deg, #06b6d4, #6366f1, #a855f7)" }}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <div
                        className="relative text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent px-4"
                        style={{
                            backgroundImage: "linear-gradient(135deg, #06b6d4, #6366f1, #a855f7)",
                            fontFamily: "'Syne', sans-serif",
                        }}
                    >
                        Dewan Sultan
                    </div>
                </motion.div>
                <motion.div
                    className="mt-8 flex gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {[0, 1, 2].map(i => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full"
                            style={{ background: "#6366f1" }}
                            animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                        />
                    ))}
                </motion.div>
            </div>
        );
    }

    return (
        <div
            className={`min-h-screen ${bg} ${text_} transition-colors duration-700`}
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
        >
            <div className="noise" />

            <GridBackground darkMode={darkMode} />

            {/* Floating particles */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {PARTICLES.map(p => <Particle key={p.id} style={p.style} />)}
            </div>

            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] origin-left z-50"
                style={{
                    scaleX,
                    background: "linear-gradient(to right, #06b6d4, #6366f1, #a855f7)",
                }}
            />

            <motion.nav
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled
                    ? `py-3 ${darkMode ? "bg-slate-950/80" : "bg-white/80"} backdrop-blur-2xl shadow-lg shadow-black/5`
                    : "py-5 bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

                    <motion.a
                        href="#about"
                        whileHover={{ scale: 1.08, rotate: 3 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        aria-label="Home"
                    >
                        <img src="/logo.svg" alt="Dewan Sultan" width="44" height="44" />
                    </motion.a>

                    <div
                        className="hidden md:flex items-center gap-1 p-1 rounded-full"
                        style={{ background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)" }}
                    >
                        {["about", "skills", "contact"].map(link => (
                            <a
                                key={link}
                                href={`#${link}`}
                                className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-300 ${activeNav === link ? "text-white" : muted
                                    }`}
                                style={
                                    activeNav === link
                                        ? { background: "linear-gradient(135deg, #6366f1, #a855f7)" }
                                        : {}
                                }
                            >
                                {link}
                            </a>
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setDarkMode(!darkMode)}
                        className={`p-2.5 rounded-xl transition ${darkMode ? "bg-slate-800 hover:bg-slate-700" : "bg-slate-100 hover:bg-slate-200"
                            }`}
                        aria-label="Toggle theme"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={darkMode ? "sun" : "moon"}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>
                </div>
            </motion.nav>

            <main className="relative z-10 pt-24 pb-20 px-6 max-w-7xl mx-auto">

                <section
                    id="about"
                    className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-16 py-20 relative"
                >
                    <motion.div
                        style={{ y: heroY, opacity: heroOpacity }}
                        className="relative flex-shrink-0"
                    >
                        <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: "conic-gradient(from 0deg, #06b6d4, #6366f1, #a855f7, #06b6d4)",
                                padding: 3,
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        />

                        <motion.div
                            className="absolute -inset-6 rounded-full blur-3xl opacity-30"
                            style={{ background: "linear-gradient(135deg, #06b6d4, #6366f1, #a855f7)" }}
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
                            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden float"
                        >
                            <img
                                src="/profile.jpg"
                                alt="Dewan Sultan"
                                className="w-full h-full object-cover rounded-full"
                                onError={e => {
                                    e.currentTarget.style.display = "none";
                                    const parent = e.currentTarget.parentElement;
                                    if (parent) {
                                        parent.style.background =
                                            "linear-gradient(135deg,#06b6d4,#6366f1,#a855f7)";
                                        const fb = document.createElement("div");
                                        fb.style.cssText =
                                            "display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:72px;font-weight:900;color:white;font-family:Syne,sans-serif;";
                                        fb.textContent = "DS";
                                        parent.appendChild(fb);
                                    }
                                }}
                            />
                        </motion.div>

                        {[
                            { label: "🚀 Open to Work", style: { top: "5%", right: "-20%" } },
                            { label: "💡 Problem Solver", style: { bottom: "10%", left: "-18%" } },
                        ].map((b, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1 + i * 0.3, type: "spring", bounce: 0.5 }}
                                className={`absolute text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap shadow-xl border ${darkMode
                                    ? "bg-slate-800 text-slate-200 border-slate-700"
                                    : "bg-white text-slate-700 border-slate-200"
                                    }`}
                                style={b.style}
                            >
                                {b.label}
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        style={{ y: heroY, opacity: heroOpacity }}
                        className="max-w-2xl text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 ${darkMode
                                ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                                : "bg-indigo-50 text-indigo-600 border border-indigo-200"
                                }`}
                        >
                            <Sparkles size={14} />
                            Available for freelance projects
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.8 }}
                            className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05]"
                            style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                            Hi, I'm{" "}
                            <span className="shimmer-text">Dewan Sultan</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-6 text-2xl md:text-3xl font-semibold h-12 flex items-center justify-center lg:justify-start gap-2"
                            style={{ color: "#6366f1" }}
                        >
                            <Zap size={22} className="text-cyan-400 flex-shrink-0" />
                            {text}
                            <span className="blink inline-block w-0.5 h-8 bg-indigo-400 ml-0.5" />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.75, duration: 0.7 }}
                            className={`mt-8 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 ${muted}`}
                        >
                            Passionate about building{" "}
                            <strong className={darkMode ? "text-cyan-400" : "text-indigo-600"}>
                                scalable backend systems
                            </strong>
                            , turning data into insights, and solving complex problems with clean,
                            efficient code.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start"
                        >
                            <motion.a
                                href="/cv.pdf"
                                download
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-8 py-4 rounded-2xl font-bold text-white flex items-center gap-3 shadow-xl"
                                style={{ background: "linear-gradient(135deg, #06b6d4, #6366f1)" }}
                            >
                                <Download size={18} /> Download CV
                            </motion.a>
                            <motion.a
                                href="mailto:dwnsultan@gmail.com"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className={`px-8 py-4 rounded-2xl font-bold flex items-center gap-3 border-2 transition-colors ${darkMode
                                    ? "border-indigo-500/40 hover:border-indigo-400 text-indigo-300"
                                    : "border-indigo-300 hover:border-indigo-500 text-indigo-600"
                                    }`}
                            >
                                <Mail size={18} /> Get in Touch
                            </motion.a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.1 }}
                            className="mt-10 flex gap-4 justify-center lg:justify-start"
                        >
                            {SOCIALS.map(({ href, icon: Icon, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    whileHover={{ scale: 1.15, y: -3 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`p-3 rounded-xl transition-colors ${darkMode
                                        ? "bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400"
                                        : "bg-slate-100 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600"
                                        }`}
                                >
                                    <Icon size={20} />
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                    >
                        <span className={`text-xs font-medium ${muted}`}>scroll</span>
                        <ChevronDown size={16} className={muted} />
                    </motion.div>
                </section>
                <section id="skills" className="py-28">
                    <SectionHeading>Skills & Expertise</SectionHeading>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            {
                                icon: Database,
                                title: "Data Science",
                                desc: "Transforming raw data into meaningful insights through analysis and visualization.",
                                skills: [
                                    { label: "Python", level: 90, color: "#06b6d4" },
                                    { label: "Pandas / NumPy", level: 85, color: "#6366f1" },
                                    { label: "Scikit-learn", level: 75, color: "#a855f7" },
                                    { label: "Data Visualization", level: 80, color: "#f59e0b" },
                                ],
                                gradient: "from-cyan-500 to-blue-600",
                                glow: "rgba(6,182,212,0.15)",
                            },
                            {
                                icon: Server,
                                title: "Backend",
                                desc: "Building robust, scalable APIs and server-side systems that power modern apps.",
                                skills: [
                                    { label: "Node.js / Express", level: 88, color: "#06b6d4" },
                                    { label: "MongoDB", level: 82, color: "#6366f1" },
                                    { label: "PostgreSQL", level: 78, color: "#a855f7" },
                                    { label: "REST & GraphQL", level: 85, color: "#10b981" },
                                ],
                                gradient: "from-violet-500 to-purple-700",
                                glow: "rgba(139,92,246,0.15)",
                            },
                            {
                                icon: Code2,
                                title: "Programming",
                                desc: "Writing clean, efficient code and solving complex algorithmic challenges.",
                                skills: [
                                    { label: "C++", level: 85, color: "#06b6d4" },
                                    { label: "JavaScript / TypeScript", level: 88, color: "#6366f1" },
                                    { label: "Algorithms & DSA", level: 80, color: "#a855f7" },
                                    { label: "Problem Solving", level: 90, color: "#f59e0b" },
                                ],
                                gradient: "from-blue-500 to-indigo-600",
                                glow: "rgba(99,102,241,0.15)",
                            },
                        ].map((skill, i) => (
                            <motion.div
                                key={skill.title}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, duration: 0.7, ease: "easeOut" }}
                                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                                className={`${card} p-8 rounded-3xl card-glow relative overflow-hidden group`}
                            >
                                <div
                                    className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ background: skill.glow, transform: "translate(30%, -30%)" }}
                                />

                                <div
                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${skill.gradient} shadow-lg`}
                                >
                                    <skill.icon size={26} className="text-white" strokeWidth={1.5} />
                                </div>

                                <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                                <p className={`text-sm ${muted} mb-6 leading-relaxed`}>{skill.desc}</p>

                                {skill.skills.map((s, j) => (
                                    <SkillBar key={s.label} {...s} delay={i * 0.15 + j * 0.08} />
                                ))}
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        {[
                            { label: "Projects Built", value: "...", color: "#06b6d4" },
                            { label: "Algorithms Solved", value: "...", color: "#6366f1" },
                            { label: "Coffee Consumed", value: "∞", color: "#a855f7" },
                            { label: "Years Learning", value: "3+", color: "#f59e0b" },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, type: "spring", bounce: 0.4 }}
                                className={`${card} p-6 rounded-2xl text-center`}
                            >
                                <div className="text-3xl font-black mb-1" style={{ color: stat.color }}>
                                    {stat.value}
                                </div>
                                <div className={`text-xs font-medium ${muted}`}>{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section id="contact" className="py-28">
                    <SectionHeading>Let's Connect</SectionHeading>

                    <div className="max-w-2xl mx-auto">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className={`text-center ${muted} mb-12 text-lg leading-relaxed`}
                        >
                            Have a project in mind or just want to say hi? My inbox is always open.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className={`${card} p-8 md:p-10 rounded-3xl`}
                        >

                            <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
                                {[
                                    { name: "name", placeholder: "Your Name", type: "text" },
                                    { name: "email", placeholder: "your@email.com", type: "email" },
                                ].map(field => (
                                    <motion.input
                                        key={field.name}
                                        name={field.name}
                                        type={field.type}
                                        required
                                        placeholder={field.placeholder}
                                        whileFocus={{ scale: 1.01 }}
                                        className={`w-full px-5 py-4 rounded-2xl text-sm outline-none transition-all duration-300 ${inputCls}`}
                                    />
                                ))}

                                <motion.textarea
                                    name="message"
                                    required
                                    placeholder="Tell me about your project..."
                                    rows={5}
                                    whileFocus={{ scale: 1.01 }}
                                    className={`w-full px-5 py-4 rounded-2xl text-sm outline-none transition-all duration-300 resize-none ${inputCls}`}
                                />

                                <AnimatePresence mode="wait">
                                    {formStatus === "ok" ? (
                                        <motion.div
                                            key="ok"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="w-full py-4 rounded-2xl font-bold text-center text-white"
                                            style={{ background: "linear-gradient(135deg,#10b981,#059669)" }}
                                        >
                                            ✅ Message sent successfully!
                                        </motion.div>
                                    ) : formStatus === "err" ? (
                                        <motion.div
                                            key="err"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="w-full py-4 rounded-2xl font-bold text-center text-white"
                                            style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}
                                        >
                                            ❌ Failed to send. Try again.
                                        </motion.div>
                                    ) : (
                                        <motion.button
                                            key="btn"
                                            type="submit"
                                            disabled={formStatus === "sending"}
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full py-4 rounded-2xl font-bold text-white text-lg shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                                            style={{ background: "linear-gradient(135deg, #06b6d4, #6366f1, #a855f7)" }}
                                        >
                                            {formStatus === "sending" ? (
                                                <span className="flex items-center justify-center gap-3">
                                                    <motion.span
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                                        className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                    />
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


                <footer
                    className={`text-center py-12 border-t ${darkMode ? "border-slate-800" : "border-slate-200"
                        } ${muted} text-sm`}
                >
                    <div className="flex justify-center gap-4 mb-6">
                        {SOCIALS.map(({ href, icon: Icon, label }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                whileHover={{ scale: 1.15, y: -2 }}
                                className={`p-2.5 rounded-xl transition-colors ${darkMode ? "hover:bg-slate-800" : "hover:bg-slate-100"
                                    }`}
                            >
                                <Icon size={20} />
                            </motion.a>
                        ))}
                    </div>
                    <p>
                        © {new Date().getFullYear()}{" "}
                        <span className="shimmer-text font-semibold">Dewan Sultan</span>
                        {" "}• Built with ❤️
                    </p>
                </footer>
            </main>


            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="fixed bottom-8 right-8 p-4 rounded-2xl text-white shadow-2xl z-40"
                        style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
                        aria-label="Back to top"
                    >
                        <ArrowUp size={20} />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}