'use client';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaAward, FaRocket } from 'react-icons/fa';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Link from 'next/link';

export default function About() {
  const timeline = [
    {
      year: '2024',
      title: 'NextGen Launch',
      description: 'Launched NextGen Portfolio & Marketplace platform, revolutionizing how designers sell their work.',
      icon: <FaRocket />,
    },
    {
      year: '2022',
      title: 'Senior Developer',
      description: 'Promoted to Senior Full-Stack Developer, leading major client projects and mentoring junior developers.',
      icon: <FaBriefcase />,
    },
    {
      year: '2020',
      title: 'Industry Recognition',
      description: 'Awarded "Developer of the Year" for outstanding contributions to web development community.',
      icon: <FaAward />,
    },
    {
      year: '2018',
      title: 'Started Journey',
      description: 'Began professional career as a web developer, focusing on modern JavaScript frameworks.',
      icon: <FaGraduationCap />,
    },
  ];

  const skills = [
    { name: 'React & Next.js', level: 95 },
    { name: 'Python & FastAPI', level: 90 },
    { name: 'UI/UX Design', level: 85 },
    { name: 'Database Design', level: 88 },
    { name: 'DevOps & Deployment', level: 82 },
    { name: 'API Development', level: 92 },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                About <span className="gradient-text">NextGen</span>
              </h1>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                We're passionate about creating exceptional web experiences that combine stunning
                design with powerful functionality. With years of experience in full-stack development,
                we've helped countless clients bring their digital visions to life.
              </p>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Our mission is to democratize access to high-quality web design by offering both
                ready-made solutions and custom development services that fit any budget.
              </p>
              <Link href="/services">
                <Button variant="primary">Work With Us</Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="glass-card p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-6">Why Choose Us?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 text-xl">✓</span>
                      <span className="text-gray-300">5+ years of professional experience</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 text-xl">✓</span>
                      <span className="text-gray-300">100+ successful projects delivered</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 text-xl">✓</span>
                      <span className="text-gray-300">Modern tech stack & best practices</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 text-xl">✓</span>
                      <span className="text-gray-300">Responsive design for all devices</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 text-xl">✓</span>
                      <span className="text-gray-300">Ongoing support & maintenance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Proficient in the latest technologies and frameworks
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">{skill.name}</span>
                      <span className="text-purple-400">{skill.level}%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A timeline of milestones and achievements
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"></div>

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative pl-24"
                  >
                    {/* Icon */}
                    <div className="absolute left-0 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                      {item.icon}
                    </div>

                    {/* Content */}
                    <Card>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                          <p className="text-purple-400 font-semibold">{item.year}</p>
                        </div>
                      </div>
                      <p className="text-gray-400 leading-relaxed">{item.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Build Something <span className="gradient-text">Amazing</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Ready to start your next project? Get in touch and let's discuss how we can help
              bring your vision to life.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/services">
                <Button variant="primary">Start a Project</Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="secondary">View Portfolio</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
