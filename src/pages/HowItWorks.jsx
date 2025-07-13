import {
  UserPlus,
  UploadCloud,
  BrainCircuit,
  Stethoscope,
} from 'lucide-react';

export default function HowItWorks({ hideAuthStep = false }) {
  const steps = [
    {
      icon: <UserPlus className="mx-auto mb-4 text-blue-600" size={40} />,
      title: '1. Sign Up / Login',
      desc: 'Create your secure RetinaDetect account or log in to begin.',
      show: !hideAuthStep,
    },
    {
      icon: <UploadCloud className="mx-auto mb-4 text-blue-600" size={40} />,
      title: `${hideAuthStep ? '1' : '2'}. Upload Retina Image`,
      desc: 'Upload a clear, high-resolution retinal scan to our platform.',
      show: true,
    },
    {
      icon: <BrainCircuit className="mx-auto mb-4 text-blue-600" size={40} />,
      title: `${hideAuthStep ? '2' : '3'}. AI Analysis`,
      desc: 'Our AI system quickly analyzes the image for possible diseases.',
      show: true,
    },
    {
      icon: <Stethoscope className="mx-auto mb-4 text-blue-600" size={40} />,
      title: `${hideAuthStep ? '3' : '4'}. Get Result & Consult`,
      desc: 'View results instantly and share them with your healthcare provider.',
      show: true,
    },
  ];

  const visibleSteps = steps.filter((step) => step.show);

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 text-center">
      <h2 className="text-4xl font-extrabold text-blue-700 mb-12">
        How It Works
      </h2>

      <div
        className={`grid gap-6 ${
          visibleSteps.length === 1
            ? 'justify-center grid-cols-1'
            : visibleSteps.length === 2
            ? 'sm:grid-cols-2 justify-center'
            : visibleSteps.length === 3
            ? 'sm:grid-cols-2 lg:grid-cols-3 justify-center'
            : 'sm:grid-cols-2 lg:grid-cols-4'
        }`}
      >
        {visibleSteps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center max-w-xs w-full mx-auto"
          >
            {step.icon}
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
