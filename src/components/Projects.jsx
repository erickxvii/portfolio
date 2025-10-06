import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const Projects = () => {
  return (
    <motion.section
      id="projects"
      className="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        My Projects
      </motion.h2>
      <motion.div
        className="project-grid"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.div
          className="project-card"
          variants={fadeInUp}
          whileHover={{ y: -10, transition: { duration: 0.2 } }}
        >
          <motion.div
            className="project-image"
            style={{ backgroundImage: "url('/projects/studycoach.png')" }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          />
          <h3> StudyMode Coach
          </h3>
          <p>
          An AI study companion that turns your notes into quizzes, 
          summaries, and spaced-repetition decks—instantly—plus progress analytics to keep you on track.
          </p>
          <div className="project-tech">
            <span>Next.js</span>
            <span>OpenAI</span>
            <span>TailwindCSS</span>
          </div>
        </motion.div>

        <motion.div
          className="project-card"
          variants={fadeInUp}
          whileHover={{ y: -10, transition: { duration: 0.2 } }}
        >
          <motion.div
            className="project-image"
            style={{
              backgroundImage: "url('/projects/cloudflare_agent.png')",
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
          <h3>Cloudflare AI Security Agent</h3>
          <p>
          An intelligent edge-deployed agent that monitors incoming requests, ingests security logs, 
  and detects anomalies or attack patterns in real time. Built to automate triage and suggest 
  protective WAF rule updates using Cloudflare Workers and AI analysis.
          </p>
          <div className="project-tech">
            <span>Cloudflare Workers</span>
            <span>Wrangler</span>
            <span>AI Inference API</span>
            <span>TypeScript</span>
          </div>
        </motion.div>

        <motion.div
          className="project-card"
          variants={fadeInUp}
          whileHover={{ y: -10, transition: { duration: 0.2 } }}
        >
          <motion.div
            className="project-image"
            style={{
              backgroundImage: "url('/projects/intheworks.png')",
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
          <h3>Safe Route Recommender</h3>
          <p>
          Working on a machine learning project that ranks walking routes by predicted nighttime safety using open NYC 
  crime data, street light density, and traffic/activity signals. Outputs a route score and 
  highlights risk hotspots along the path.
          </p>
          <div className="project-tech">
            <span>Python</span>
            <span>scikit-learn</span>
            <span>Pandas</span>
            <span>Next.js</span>
            <span>TailwindCSS</span>

          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
