import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HowItWorks from "../pages/HowItWorks";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Clock } from "lucide-react";

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-6">
            Welcome to <span className="text-blue-500">RetinaDetect</span>
          </h1>

          <motion.p
            className="text-lg md:text-xl text-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Upload a retinal image and detect possible diseases instantly using
            AI-powered analysis.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <Link
              to={user ? "/predict" : "/signup"}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-full shadow transition duration-300"
            >
              {user ? "Go to Prediction" : "Get Started"}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ perspective: 1000 }}
          animate={{
            rotateY: [0, 15, 0, -15, 0],
            scale: [1, 1, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
          }}
        >
          <img
            src="https://media.springernature.com/lw725/springer-cms/rest/v1/content/25249428/data/v5"
            alt="AI Retina Analysis"
            className="w-full rounded-xl shadow-lg border border-gray-200"
          />
        </motion.div>
      </div>

      <section className="bg-white py-20 px-6">
        <motion.h2
          className="text-4xl font-extrabold text-center text-blue-700 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why RetinaDetect?
        </motion.h2>

        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3 text-center">
          {[
            {
              icon: (
                <ShieldCheck size={40} className="mx-auto text-blue-600 mb-4" />
              ),
              title: "Secure & Private",
              desc: "Your retinal images are handled securely and never shared. We prioritize patient confidentiality.",
            },
            {
              icon: (
                <Sparkles size={40} className="mx-auto text-blue-600 mb-4" />
              ),
              title: "AI-Powered Accuracy",
              desc: "Advanced machine learning provides rapid, reliable predictions trained on medical-grade datasets.",
            },
            {
              icon: <Clock size={40} className="mx-auto text-blue-600 mb-4" />,
              title: "Instant Results",
              desc: "No waiting. Get disease detection results within seconds of uploading an image.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-blue-50 rounded-xl p-6 shadow hover:shadow-md transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
            >
              {item.icon}
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <HowItWorks hideAuthStep={!!user} />
    </section>
  );
}
