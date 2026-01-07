'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaCode, FaPalette, FaRocket, FaMobile, FaSearch, FaCog } from 'react-icons/fa';
import Button from '@/components/Button';
import Input, { TextArea } from '@/components/Input';
import Card from '@/components/Card';
import { customRequestAPI, contentAPI } from '@/lib/api';

export default function Services() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pageContent, setPageContent] = useState({
    hero_title: 'Custom Website Design Services',
    hero_description: 'Need a custom website built specifically for your business? Fill out the form below and we\'ll create a unique design tailored to your needs.',
    features: [
      {
        icon: 'FaCode',
        title: 'Modern Technology Stack',
        description: 'Built with React, Next.js, and the latest web technologies for best performance.',
      },
      {
        icon: 'FaPalette',
        title: 'Custom Design',
        description: 'Unique designs tailored to your brand identity and business requirements.',
      },
      {
        icon: 'FaMobile',
        title: 'Fully Responsive',
        description: 'Works perfectly on all devices - desktop, tablet, and mobile phones.',
      },
      {
        icon: 'FaRocket',
        title: 'Fast Delivery',
        description: 'Quick turnaround time to get your website up and running fast.',
      },
      {
        icon: 'FaSearch',
        title: 'SEO Ready',
        description: 'Optimized structure and code for better search engine rankings.',
      },
      {
        icon: 'FaCog',
        title: 'Easy to Customize',
        description: 'Clean code that is easy to modify and extend for future needs.',
      },
    ],
    tier_system: {
      basic: { price: '500', services: 'Basic website, 3 pages, responsive design', delivery_time: '5-7 days' },
      standard: { price: '1500', services: 'Standard website, 5 pages, responsive design, SEO optimization, contact forms', delivery_time: '10-14 days' },
      premium: { price: '3500', services: 'Premium website, 10+ pages, responsive design, SEO optimization, contact forms, custom features, CMS integration', delivery_time: '3-4 weeks' }
    }
  });
  const [selectedTier, setSelectedTier] = useState('basic');
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    project_title: '',
    project_scope: '',
    budget_range: '',
    timeline: '',
    additional_details: '',
    selected_tier: 'basic',
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await contentAPI.getByKey('custom_page');
      if (response.data) {
        setPageContent(JSON.parse(response.data.content));
      }
    } catch (error) {
      console.log('Using default content');
    }
  };

  const getIcon = (iconName) => {
    const icons = {
      FaCode: <FaCode />,
      FaPalette: <FaPalette />,
      FaMobile: <FaMobile />,
      FaRocket: <FaRocket />,
      FaSearch: <FaSearch />,
      FaCog: <FaCog />,
    };
    return icons[iconName] || <FaCode />;
  };

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
      // Show success message with contact info
      alert('✅ Request submitted successfully!\n\n📧 You will receive a confirmation email shortly.\n💬 Our admin will contact you via WhatsApp or Email to discuss your project.');
      setFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        project_title: '',
        project_scope: '',
        budget_range: '',
        timeline: '',
        additional_details: '',
        selected_tier: 'basic',
      });
      setSelectedTier('basic');
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

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
              {pageContent.hero_title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8">
              {pageContent.hero_description}
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              We'll review your requirements and get back to you within 24 hours with a detailed quote and timeline.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your <span className="gradient-text">Package</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Select the package that best fits your needs and budget
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {['basic', 'standard', 'premium'].map((tier, index) => (
              <motion.div
                key={tier}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  hover={true}
                  className={`h-full cursor-pointer transition-all ${
                    selectedTier === tier ? 'ring-2 ring-purple-500 scale-105' : ''
                  }`}
                  onClick={() => {
                    setSelectedTier(tier);
                    setFormData({ ...formData, selected_tier: tier });
                  }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${
                    tier === 'basic' ? 'from-blue-500 to-cyan-500' :
                    tier === 'standard' ? 'from-indigo-500 to-purple-500' :
                    'from-purple-500 to-pink-500'
                  } rounded-xl flex items-center justify-center mb-6 text-3xl`}>
                    {tier === 'basic' ? '🌟' : tier === 'standard' ? '🚀' : '💎'}
                  </div>
                  <h3 className="text-3xl font-bold mb-2 capitalize">{tier}</h3>
                  <div className="text-5xl font-bold gradient-text mb-4">
                    ${pageContent.tier_system[tier].price}
                  </div>
                  <p className="text-gray-400 mb-4">
                    ⏱️ {pageContent.tier_system[tier].delivery_time}
                  </p>
                  <div className="mb-6 p-4 bg-white/5 rounded-lg">
                    <h4 className="font-semibold mb-2 text-purple-400">Includes:</h4>
                    {(() => {
                      const services = pageContent.tier_system[tier].services;
                      if (Array.isArray(services)) {
                        return (
                          <ul className="space-y-2">
                            {services.map((service, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                                <span className="text-purple-400 mt-0.5">✓</span>
                                <span>{service}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      return (
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {services}
                        </p>
                      );
                    })()}
                  </div>
                  {selectedTier === tier && (
                    <div className="mt-4 text-center">
                      <span className="inline-block bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        ✓ Selected
                      </span>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What You Get
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Every custom website includes these features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageContent.features.map((feature, index) => (
              <Card key={index} delay={index * 0.1}>
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 text-3xl">
                  {getIcon(feature.icon)}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 text-lg">{feature.description}</p>
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
              Get Started
            </h2>
            <p className="text-xl text-gray-400">
              Share your project details and requirements
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
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                  >
                    <option value="" className="bg-slate-900 text-white">Select a range</option>
                    <option value="$1,000 - $5,000" className="bg-slate-900 text-white">$1,000 - $5,000</option>
                    <option value="$5,000 - $10,000" className="bg-slate-900 text-white">$5,000 - $10,000</option>
                    <option value="$10,000 - $25,000" className="bg-slate-900 text-white">$10,000 - $25,000</option>
                    <option value="$25,000+" className="bg-slate-900 text-white">$25,000+</option>
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
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                  >
                    <option value="" className="bg-slate-900 text-white">Select a timeline</option>
                    <option value="1-2 weeks" className="bg-slate-900 text-white">1-2 weeks</option>
                    <option value="3-4 weeks" className="bg-slate-900 text-white">3-4 weeks</option>
                    <option value="1-2 months" className="bg-slate-900 text-white">1-2 months</option>
                    <option value="3+ months" className="bg-slate-900 text-white">3+ months</option>
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
