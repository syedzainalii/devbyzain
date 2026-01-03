'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import { customRequestAPI } from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';

export default function AdminRequests() {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin');
      return;
    }
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await customRequestAPI.getAll();
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (requestId, status) => {
    try {
      await customRequestAPI.update(requestId, { status });
      fetchRequests();
    } catch (error) {
      console.error('Error updating request:', error);
      alert('Failed to update request status');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="flex items-center gap-4 mb-12">
          <Button variant="ghost" icon={<FaArrowLeft />} onClick={() => router.push('/admin')}>
            Back
          </Button>
          <h1 className="text-4xl font-bold">
            Custom <span className="gradient-text">Requests</span>
          </h1>
        </div>

        {requests.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">No custom requests yet</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <Card key={request.id}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-xl font-bold">{request.project_title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        request.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        request.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                        request.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {request.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-400">Customer</p>
                        <p className="font-semibold">{request.customer_name}</p>
                        <p className="text-gray-300 text-sm">{request.customer_email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Budget Range</p>
                        <p className="font-semibold">{request.budget_range || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Timeline</p>
                        <p className="font-semibold">{request.timeline || 'Not specified'}</p>
                      </div>
                    </div>

                    <div className="glass-card p-4 rounded-xl mb-4">
                      <p className="text-sm text-gray-400 mb-2">Project Scope:</p>
                      <p className="text-gray-300">{request.project_scope}</p>
                    </div>

                    {request.additional_details && (
                      <div className="glass-card p-4 rounded-xl">
                        <p className="text-sm text-gray-400 mb-2">Additional Details:</p>
                        <p className="text-gray-300">{request.additional_details}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    {request.status === 'pending' && (
                      <>
                        <Button
                          variant="primary"
                          onClick={() => updateRequestStatus(request.id, 'in_progress')}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => updateRequestStatus(request.id, 'rejected')}
                          className="text-red-400"
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    
                    {request.status === 'in_progress' && (
                      <Button
                        variant="primary"
                        onClick={() => updateRequestStatus(request.id, 'completed')}
                      >
                        Complete
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
