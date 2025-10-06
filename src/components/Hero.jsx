import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import HyperspeedBackground from "./HyperspeedBackground.jsx";


const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export const Hero = () => {
  return (
    <motion.section
      id="home"
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* background goes first so it sits behind everything */}
      <HyperspeedBackground speed={1.6} density={0.18} fade={0.12} />

      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div className="hero-badge">
            <span>👋 Hello, I'm</span>
          </motion.div>

          <motion.h1 className="glitch" variants={fadeInUp} whileHover={{ scale: 1.02 }}>
            Erick Perez
          </motion.h1>

          <motion.h2 className="hero-subtitle" variants={fadeInUp}>
            Math and Computer Science student at Fordham University
          </motion.h2>

          <motion.p className="hero-description" variants={fadeInUp}>
          I love bringing machine learning to life — whether it’s a computer vision model or an AI app that solves real, everyday problems.
          </motion.p>

          <motion.div className="cta-buttons" variants={staggerContainer}>
            <motion.a href="#projects" className="cta-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              View My Work
            </motion.a>
            <motion.a href="#contact" className="cta-secondary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Contact Me
            </motion.a>
          </motion.div>

          <motion.div className="social-links" variants={staggerContainer}>
  <motion.a
    href="https://github.com/erickxvii"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="GitHub"
  >
    <i className="fa-brands fa-github" />
  </motion.a>

  <motion.a
    href="https://www.linkedin.com/in/erick-perez-06b3782a9"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
  >
    <i className="fa-brands fa-linkedin" />
  </motion.a>

  <motion.a
    href="https://twitter.com/br1an00524"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Twitter/X"
  >
    <i className="fa-brands fa-x-twitter" />
  </motion.a>
</motion.div>


        <motion.div
          className="hero-image-container"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="code-display">
            <SyntaxHighlighter
              language="typescript"
              customStyle={{
                margin: 0,
                padding: "2rem",
                height: "100%",
                borderRadius: "20px",
                background: "rgba(30, 41, 59, 0.8)",
                backdropFilter: "blur(10px)",
                marginBottom: 50,
              }}
              style={vscDarkPlus}
            >
{`const aboutMe: DeveloperProfile = {
  codename: "Erickxvii",
  origin: "🌇 Somewhere between a Fordham classroom and a terminal window",
  role: "AI & Software Engineer in training",
  stack: {
    languages: ["Python", "C++", "SQL", "TypeScript"],
    frameworks: ["Next.js", "React", "TailwindCSS", "Supabase"],
  },
  traits: [
    "detail-driven builder",
    "API tinkerer",
    "dark-mode minimalist",
    "terminal-aesthetic enjoyer",
  ],
  availability: "Open to internships and collaborations",
};`}
            </SyntaxHighlighter>
          </div>

          <motion.div
            className="floating-card"
            animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="card-content">
              <span className="card-icon">💻</span>
              <span className="card-text">Currently working on something awesome!</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
