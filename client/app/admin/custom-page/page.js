'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { contentAPI } from '@/lib/api';

export default function EditCustomPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState({
    hero_title: 'Custom Website Design Services',
    hero_description: 'Need a custom website built specifically for your business? Fill out the form below and we\'ll create a unique design tailored to your needs.',
    features: [
      { title: 'Modern Technology Stack', description: 'Built with React, Next.js, and the latest web technologies for best performance.' },
      { title: 'Custom Design', description: 'Unique designs tailored to your brand identity and business requirements.' },
      { title: 'Fully Responsive', description: 'Works perfectly on all devices - desktop, tablet, and mobile phones.' },
      { title: 'Fast Delivery', description: 'Quick turnaround time to get your website up and running fast.' },
      { title: 'SEO Ready', description: 'Optimized structure and code for better search engine rankings.' },
      { title: 'Easy to Customize', description: 'Clean code that is easy to modify and extend for future needs.' },
    ],
    tier_system: {
      basic: { price: '500', services: 'Basic website, 3 pages, responsive design', delivery_time: '5-7 days' },
      standard: { price: '1500', services: 'Standard website, 5 pages, responsive design, SEO optimization, contact forms', delivery_time: '10-14 days' },
      premium: { price: '3500', services: 'Premium website, 10+ pages, responsive design, SEO optimization, contact forms, custom features, CMS integration', delivery_time: '3-4 weeks' }
    }
  });

  useEffect(() => {
    // Check admin access
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (!token || !userData) {
        router.push('/login');
        return;
      }

      try {
        const parsedUser = JSON.parse(userData);
        if (!parsedUser.is_admin) {
          router.push('/');
          return;
        }
        
        loadContent();
      } catch (error) {
        console.error('Error parsing user data:', error);
        router.push('/login');
      }
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadContent = async () => {
    try {
      const response = await contentAPI.getByKey('custom_page');
      if (response.data) {
        setContent(JSON.parse(response.data.content));
      }
    } catch (error) {
      console.log('No existing content found, using defaults');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await contentAPI.update('custom_page', {
        content_type: 'json',
        content: JSON.stringify(content)
      });
      alert('Custom page content updated successfully!');
    } catch (error) {
      // If content doesn't exist, create it
      try {
        await contentAPI.create({
          page_key: 'custom_page',
          content_type: 'json',
          content: JSON.stringify(content)
        });
        alert('Custom page content created successfully!');
      } catch (createError) {
        alert('Failed to save content. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  const updateFeature = (index, field, value) => {
    const newFeatures = [...content.features];
    newFeatures[index][field] = value;
    setContent({ ...content, features: newFeatures });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="section-padding min-h-screen">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/admin">
            <Button variant="ghost" icon={<FaArrowLeft />} className="mb-4">
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-5xl font-bold mb-4">
            Edit <span className="gradient-text">Custom Page</span>
          </h1>
          <p className="text-xl text-gray-400">
            Customize the content displayed on your Custom Design services page
          </p>
        </motion.div>

        {/* Hero Section */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Hero Section</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Title
              </label>
              <Input
                type="text"
                value={content.hero_title}
                onChange={(e) => setContent({ ...content, hero_title: e.target.value })}
                placeholder="Page title"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Description
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={4}
                value={content.hero_description}
                onChange={(e) => setContent({ ...content, hero_description: e.target.value })}
                placeholder="Page description"
              />
            </div>
          </div>
        </Card>

        {/* Features Section */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Features</h2>
          
          <div className="space-y-6">
            {content.features.map((feature, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="text-lg font-semibold mb-4 text-purple-400">Feature {index + 1}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                      Title
                    </label>
                    <Input
                      type="text"
                      value={feature.title}
                      onChange={(e) => updateFeature(index, 'title', e.target.value)}
                      placeholder="Feature title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                      Description
                    </label>
                    <textarea
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={2}
                      value={feature.description}
                      onChange={(e) => updateFeature(index, 'description', e.target.value)}
                      placeholder="Feature description"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Tier System Section */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Tier System</h2>
          <p className="text-gray-400 mb-6">Configure different pricing tiers for custom design services.</p>
          
          <div className="space-y-6">
            {['basic', 'standard', 'premium'].map((tier) => (
              <div key={tier} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="text-lg font-semibold capitalize mb-4 text-purple-400">{tier} Tier</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                      Price (Rs)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={content.tier_system[tier].price}
                      onChange={(e) => setContent({
                        ...content,
                        tier_system: {
                          ...content.tier_system,
                          [tier]: { ...content.tier_system[tier], price: e.target.value }
                        }
                      })}
                      placeholder="500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                      Services Included
                    </label>
                    <textarea
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={2}
                      value={content.tier_system[tier].services}
                      onChange={(e) => setContent({
                        ...content,
                        tier_system: {
                          ...content.tier_system,
                          [tier]: { ...content.tier_system[tier], services: e.target.value }
                        }
                      })}
                      placeholder="List of services included in this tier"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                      Delivery Time
                    </label>
                    <Input
                      type="text"
                      value={content.tier_system[tier].delivery_time}
                      onChange={(e) => setContent({
                        ...content,
                        tier_system: {
                          ...content.tier_system,
                          [tier]: { ...content.tier_system[tier], delivery_time: e.target.value }
                        }
                      })}
                      placeholder="5-7 days"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <Link href="/admin">
            <Button variant="secondary">
              Cancel
            </Button>
          </Link>
          <Button
            variant="primary"
            icon={<FaSave />}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
