import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function AboutPage() {
  return (
    <motion.section
      className="max-w-5xl mx-auto px-6 py-20"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-6 text-center"
        variants={fadeInUp}
      >
        About <span className="text-blue-500">RetinaDetect</span>
      </motion.h1>

      <motion.p
        className="text-gray-700 text-lg leading-relaxed mb-6 text-center max-w-3xl mx-auto"
        variants={fadeInUp}
      >
        RetinaDetect is a modern AI-powered platform designed to assist in the early detection of retinal diseases through intelligent image analysis.
        By enabling users to upload retinal images and receive real-time predictive feedback, the app helps bridge the gap between patients and early diagnosis—especially in underserved regions.
      </motion.p>

      <motion.div
        className="mt-12 grid gap-8 md:grid-cols-2"
        variants={staggerContainer}
      >
        <motion.div
          className="bg-blue-50 p-6 rounded-lg shadow"
          variants={fadeInUp}
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">🎯 Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            To make early retinal disease screening accessible to everyone, everywhere—regardless of geography, income, or access to specialists. We aim to empower patients and support healthcare professionals with fast, intelligent insights.
          </p>
        </motion.div>

        <motion.div
          className="bg-blue-50 p-6 rounded-lg shadow"
          variants={fadeInUp}
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">🌍 Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            A world where no one goes blind due to lack of early detection. RetinaDetect envisions a future where technology and healthcare work hand-in-hand to reduce preventable vision loss.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
