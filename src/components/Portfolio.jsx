import emailjs from "@emailjs/browser";
import { motion, useScroll, useSpring } from "framer-motion";
import {
    ArrowUp,
    Code2,
    Database,
    Download,
    Github,
    Linkedin,
    Mail,
    Moon,
    Server,
    Sun,
    Twitter,
} from "lucide-react";
import { useEffect, useState } from "react";

// ──────────────────────────────────────────────
// Theme configuration
// ──────────────────────────────────────────────
const themes = {
    dark: {
        bg: "bg-slate-950",
        text: "text-slate-100",
        textMuted: "text-slate-400",
        card: "bg-slate-900/70 backdrop-blur-xl border border-slate-800/50",
        accent: "from-blue-500 via-indigo-600 to-violet-700",
        accentText: "text-indigo-400",
        button: "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700",
        input: "bg-slate-800/50 border-slate-700 focus:border-cyan-500/50 focus:ring-cyan-500/20",
    },
    light: {
        bg: "bg-slate-50",
        text: "text-slate-900",
        textMuted: "text-slate-600",
        card: "bg-white/80 backdrop-blur-xl border border-slate-200 shadow-sm",
        accent: "from-blue-600 via-indigo-700 to-violet-800",
        accentText: "text-indigo-600",
        button: "bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700",
        input: "bg-white border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20",
    },
};

export default function Portfolio() {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("theme");
        return saved ? saved === "dark" : true;
    });

    const [scrolled, setScrolled] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    const { scrollY, scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    useEffect(() => {
        localStorage.setItem("theme", darkMode ? "dark" : "light");
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            setShowBackToTop(window.scrollY > 500);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const theme = darkMode ? themes.dark : themes.light;

    const [loading, setLoading] = useState(true);
    const roles = ["Backend Developer", "Data Analyst", "Problem Solver"];
    const [text, setText] = useState("");
    const [roleIndex, setRoleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    // Loading screen
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1800);
        return () => clearTimeout(timer);
    }, []);

    // Typing animation
    useEffect(() => {
        if (loading) return;
        const typing = setTimeout(() => {
            if (charIndex < roles[roleIndex].length) {
                setText((prev) => prev + roles[roleIndex][charIndex]);
                setCharIndex((prev) => prev + 1);
            } else {
                setTimeout(() => {
                    setText("");
                    setCharIndex(0);
                    setRoleIndex((prev) => (prev + 1) % roles.length);
                }, 1400);
            }
        }, 70);
        return () => clearTimeout(typing);
    }, [charIndex, roleIndex, loading]);

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
            .sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_nj1945j",
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_xxxxxxx",
                e.target,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "wYmhSDA1TZieiw0Aq"
            )
            .then(() => alert("Message sent successfully 🚀"))
            .catch(() => alert("Failed to send message ❌"));
        e.target.reset();
    };

    if (loading) {
        return (
            <div
                className={`h-screen flex items-center justify-center ${theme.bg} ${theme.textMuted} text-4xl font-bold tracking-wider animate-pulse`}
            >
                Dewan Sultan • Loading...
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-700 font-sans`}>
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 origin-left z-50"
                style={{ scaleX }}
            />

            {/* Navbar */}
            <nav
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled
                    ? "py-3 shadow-lg backdrop-blur-xl bg-black/30 dark:bg-slate-950/60"
                    : "py-5 bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent"
                    >
                        Dewan
                    </motion.h1>

                    <div className="flex items-center gap-8 text-sm font-medium">
                        <a href="#about" className="hover:text-cyan-400 transition-colors">
                            About
                        </a>
                        <a href="#skills" className="hover:text-cyan-400 transition-colors">
                            Skills
                        </a>
                        <a href="#contact" className="hover:text-cyan-400 transition-colors">
                            Contact
                        </a>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-full hover:bg-white/10 transition"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                </div>
            </nav>

            <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
                {/* Hero / About */}
                <section
                    id="about"
                    className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-center gap-16 py-20"
                >
                    {/* Profile Image with orb effect */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative w-72 h-72 md:w-96 md:h-96"
                    >
                        <div
                            className={`absolute inset-0 rounded-full bg-gradient-to-r ${theme.accent} blur-3xl opacity-40 animate-pulse-slow`}
                        />
                        <div
                            className={`absolute inset-2 rounded-full bg-gradient-to-r ${theme.accent} blur-xl opacity-20 animate-spin-slow`}
                        />
                        <img
                            src="/profile.jpg"
                            alt="Dewan Sultan"
                            className="relative w-full h-full rounded-full object-cover border-4 border-transparent bg-gradient-to-r from-cyan-500/30 to-violet-500/30 p-1 shadow-2xl"
                        />
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.9 }}
                        className="max-w-2xl text-center lg:text-left"
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                            Hi, I'm{" "}
                            <span className={`bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}>
                                Dewan Sultan
                            </span>
                        </h1>

                        <div
                            className={`mt-6 text-3xl md:text-4xl font-medium h-12 ${theme.accentText} flex items-center justify-center lg:justify-start`}
                        >
                            {text}
                            <span className="inline-block w-1 h-10 bg-current animate-blink ml-1" />
                        </div>

                        <p
                            className={`mt-8 text-lg ${theme.textMuted} max-w-xl mx-auto lg:mx-0 leading-relaxed`}
                        >
                            Passionate about building scalable backend systems, turning data into insights, and
                            solving complex problems with clean, efficient code.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-5 justify-center lg:justify-start">
                            <a
                                href="/cv.pdf"
                                download
                                className={`px-8 py-4 rounded-full font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl ${theme.button} flex items-center gap-3`}
                            >
                                <Download size={20} /> Download CV
                            </a>
                            <a
                                href="mailto:dwnsultan@gmail.com"
                                className={`px-8 py-4 rounded-full font-semibold border-2 transition-all hover:scale-105 hover:shadow-lg border-current ${theme.accentText} flex items-center gap-3`}
                            >
                                <Mail size={20} /> Get in Touch
                            </a>
                        </div>

                        {/* Social Links - Hero */}
                        <div className="mt-10 flex gap-6 justify-center lg:justify-start">
                            <a
                                href="https://github.com/Rbn-Rmn"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-2xl hover:text-cyan-400 transition-transform hover:scale-110"
                                aria-label="GitHub"
                            >
                                <Github />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/dewansultan/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-2xl hover:text-cyan-400 transition-transform hover:scale-110"
                                aria-label="LinkedIn"
                            >
                                <Linkedin />
                            </a>
                            <a
                                href="https://x.com/YOUR_TWITTER_USERNAME"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-2xl hover:text-cyan-400 transition-transform hover:scale-110"
                                aria-label="X / Twitter"
                            >
                                <Twitter />
                            </a>
                        </div>
                    </motion.div>
                </section>

                {/* Skills */}
                <section id="skills" className="py-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent"
                    >
                        Skills
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                icon: Database,
                                title: "Data Science",
                                desc: "Python • Pandas • NumPy • Scikit-learn • Data Visualization",
                            },
                            {
                                icon: Server,
                                title: "Backend",
                                desc: "Node.js • Express • MongoDB • PostgreSQL • REST & GraphQL APIs",
                            },
                            {
                                icon: Code2,
                                title: "Programming",
                                desc: "C++ • JavaScript/TypeScript • Competitive Programming • Algorithms",
                            },
                        ].map((skill, i) => (
                            <motion.div
                                key={skill.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, duration: 0.7 }}
                                whileHover={{ scale: 1.04, y: -8 }}
                                className={`${theme.card} p-8 rounded-3xl transition-all duration-300 group hover:border-cyan-500/30 hover:shadow-2xl`}
                            >
                                <skill.icon className={`mb-6 ${theme.accentText}`} size={40} strokeWidth={1.5} />
                                <h3 className="text-2xl font-semibold mb-4">{skill.title}</h3>
                                <p className={`${theme.textMuted} leading-relaxed`}>{skill.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Contact */}
                <section id="contact" className="py-32">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent"
                    >
                        Let's Connect
                    </motion.h2>

                    <motion.form
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onSubmit={sendEmail}
                        className="max-w-2xl mx-auto space-y-6"
                    >
                        <input
                            name="name"
                            required
                            placeholder="Your Name"
                            className={`w-full p-5 rounded-2xl ${theme.input} focus:outline-none focus:ring-2 transition-all duration-300`}
                        />
                        <input
                            name="email"
                            required
                            type="email"
                            placeholder="Your Email"
                            className={`w-full p-5 rounded-2xl ${theme.input} focus:outline-none focus:ring-2 transition-all duration-300`}
                        />
                        <textarea
                            name="message"
                            required
                            placeholder="Your Message"
                            rows={6}
                            className={`w-full p-5 rounded-2xl ${theme.input} focus:outline-none focus:ring-2 transition-all duration-300 resize-none`}
                        />
                        <button
                            type="submit"
                            className={`w-full py-5 rounded-2xl font-bold text-lg text-white shadow-xl transition-all hover:scale-[1.02] hover:shadow-2xl ${theme.button}`}
                        >
                            Send Message
                        </button>
                    </motion.form>
                </section>

                <footer
                    className={`text-center py-12 ${theme.textMuted} text-sm border-t ${darkMode ? "border-slate-800" : "border-slate-200"
                        }`}
                >
                    <div className="flex justify-center gap-8 mb-4">
                        <a
                            href="https://github.com/Rbn-Rmn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-cyan-400 transition"
                            aria-label="GitHub"
                        >
                            <Github size={24} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/dewansultan/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-cyan-400 transition"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={24} />
                        </a>
                        <a
                            href="https://x.com/YOUR_TWITTER_USERNAME"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-cyan-400 transition"
                            aria-label="X / Twitter"
                        >
                            <Twitter size={24} />
                        </a>
                    </div>
                    © {new Date().getFullYear()} Dewan Sultan • Built with React & ❤️
                </footer>
            </main>

            {/* Back to Top Button */}
            {showBackToTop && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className={`fixed bottom-8 right-8 p-4 rounded-full ${theme.button} text-white shadow-lg hover:shadow-xl transition-all z-40`}
                    aria-label="Back to top"
                >
                    <ArrowUp size={24} />
                </motion.button>
            )}
        </div>
    );
}