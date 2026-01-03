'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaCode, FaPalette, FaRocket, FaMobile, FaSearch, FaCog } from 'react-icons/fa';
import Button from '@/components/Button';
import Input, { TextArea } from '@/components/Input';
import Card from '@/components/Card';
import { customRequestAPI } from '@/lib/api';

export default function Services() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    project_title: '',
    project_scope: '',
    budget_range: '',
    timeline: '',
    additional_details: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await customRequestAPI.create(formData);
      setSuccess(true);
      setFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        project_title: '',
        project_scope: '',
        budget_range: '',
        timeline: '',
        additional_details: '',
      });
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const services = [
    {
      icon: <FaCode />,
      title: 'Custom Web Development',
      description: 'Full-stack web applications built with modern technologies and best practices.',
    },
    {
      icon: <FaPalette />,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces designed to enhance user experience.',
    },
    {
      icon: <FaMobile />,
      title: 'Responsive Design',
      description: 'Websites that look perfect on all devices, from mobile to desktop.',
    },
    {
      icon: <FaRocket />,
      title: 'Performance Optimization',
      description: 'Lightning-fast websites optimized for speed and performance.',
    },
    {
      icon: <FaSearch />,
      title: 'SEO Optimization',
      description: 'Search engine optimization to improve your online visibility.',
    },
    {
      icon: <FaCog />,
      title: 'Maintenance & Support',
      description: 'Ongoing support and maintenance to keep your site running smoothly.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We offer comprehensive web development services tailored to your unique needs.
              From custom designs to full-stack development, we've got you covered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} delay={index * 0.1}>
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 text-3xl">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Request Form */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Request a <span className="gradient-text">Custom Project</span>
            </h2>
            <p className="text-xl text-gray-400">
              Tell us about your project and we'll get back to you with a detailed proposal
            </p>
          </motion.div>

          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-8 text-center mb-8"
            >
              <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Request Submitted!</h3>
              <p className="text-gray-400">
                We'll review your project details and get back to you within 24 hours.
              </p>
            </motion.div>
          )}

          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Full Name *
                  </label>
                  <Input
                    name="customer_name"
                    placeholder="John Doe"
                    value={formData.customer_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    name="customer_email"
                    placeholder="john@example.com"
                    value={formData.customer_email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="customer_phone"
                    placeholder="+1 (555) 123-4567"
                    value={formData.customer_phone}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Project Title *
                  </label>
                  <Input
                    name="project_title"
                    placeholder="My Awesome Project"
                    value={formData.project_title}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Project Scope *
                </label>
                <TextArea
                  name="project_scope"
                  placeholder="Describe your project requirements, features, and goals..."
                  value={formData.project_scope}
                  onChange={handleChange}
                  rows={6}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Budget Range
                  </label>
                  <select
                    name="budget_range"
                    value={formData.budget_range}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select a range</option>
                    <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000+">$25,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Expected Timeline
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select a timeline</option>
                    <option value="1-2 weeks">1-2 weeks</option>
                    <option value="3-4 weeks">3-4 weeks</option>
                    <option value="1-2 months">1-2 months</option>
                    <option value="3+ months">3+ months</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Additional Details
                </label>
                <TextArea
                  name="additional_details"
                  placeholder="Any other information you'd like to share..."
                  value={formData.additional_details}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
}
