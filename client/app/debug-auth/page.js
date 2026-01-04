'use client';
import { useEffect, useState } from 'react';
import { productAPI, uploadAPI } from '@/lib/api';

export default function DebugAuth() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    setToken(storedToken);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const testAPI = async () => {
    const results = [];
    
    // Test 1: Check localStorage
    const localToken = localStorage.getItem('token');
    results.push({
      test: 'localStorage token',
      status: localToken ? 'PASS' : 'FAIL',
      value: localToken ? localToken.substring(0, 30) + '...' : 'No token found'
    });

    // Test 2: Try to fetch products
    try {
      const response = await productAPI.getAll();
      results.push({
        test: 'GET /api/products',
        status: 'PASS',
        value: `Status: ${response.status}, Products: ${response.data.length}`
      });
    } catch (error) {
      results.push({
        test: 'GET /api/products',
        status: 'FAIL',
        value: error.response?.status + ' - ' + error.message
      });
    }

    // Test 3: Check if Authorization header is being sent
    results.push({
      test: 'Check request headers',
      status: 'INFO',
      value: 'Open browser DevTools Network tab to verify Authorization header'
    });

    setTestResults(results);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Authentication Debug</h1>

        <div className="bg-slate-800 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Stored Data</h2>
          <div className="space-y-2">
            <p><strong>Token:</strong> {token ? token.substring(0, 50) + '...' : 'Not found'}</p>
            <p><strong>User:</strong> {user ? JSON.stringify(user, null, 2) : 'Not found'}</p>
          </div>
        </div>

        <button
          onClick={testAPI}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold mb-6"
        >
          Run API Tests
        </button>

        {testResults.length > 0 && (
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Test Results</h2>
            <div className="space-y-4">
              {testResults.map((result, index) => (
                <div key={index} className="border-b border-slate-700 pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded text-sm font-bold ${
                      result.status === 'PASS' ? 'bg-green-600' :
                      result.status === 'FAIL' ? 'bg-red-600' :
                      'bg-blue-600'
                    }`}>
                      {result.status}
                    </span>
                    <span className="font-semibold">{result.test}</span>
                  </div>
                  <p className="text-gray-400 text-sm pl-16">{result.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 bg-yellow-900/20 border border-yellow-600 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-3">Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Make sure you're logged in at <a href="/login" className="text-purple-400 underline">/login</a></li>
            <li>Come back to this page</li>
            <li>Click "Run API Tests"</li>
            <li>Open Browser DevTools (F12) → Network tab</li>
            <li>Look for requests to localhost:8000</li>
            <li>Check if "Authorization: Bearer ..." header is present</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
