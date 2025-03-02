'use client';
import React, { useEffect, useState } from 'react';

export default function History() {
  const [networkHistory, setNetworkHistory] = useState([]);
  const [regulationHistory, setRegulationHistory] = useState([]);
  const [resourceHistory, setResourceHistory] = useState([]);
  const [expandedItems, setExpandedItems] = useState({}); // Track expanded items

  useEffect(() => {
    const storedNetworkHistory = JSON.parse(localStorage.getItem('networkResponses')) || [];
    const storedRegulationHistory = JSON.parse(localStorage.getItem('regulationResponses')) || [];
    const storedResourceHistory = JSON.parse(localStorage.getItem('resourceResponses')) || [];

    setNetworkHistory(storedNetworkHistory);
    setRegulationHistory(storedRegulationHistory);
    setResourceHistory(storedResourceHistory);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('networkResponses');
    localStorage.removeItem('regulationResponses');
    localStorage.removeItem('resourceResponses');
    setNetworkHistory([]);
    setRegulationHistory([]);
    setResourceHistory([]);
    setExpandedItems({}); // Clear expanded items
  };

  const toggleExpand = (index, type) => {
    setExpandedItems((prev) => ({
      ...prev,
      [`${type}-${index}`]: !prev[`${type}-${index}`],
    }));
  };

  const getDisplayedResponse = (response, index, type) => {
    const words = response.split(' ');
    const isExpanded = expandedItems[`${type}-${index}`];
    const initialWordCount = 50;

    if (words.length <= initialWordCount || isExpanded) {
      return response;
    } else {
      return words.slice(0, initialWordCount).join(' ') + '...';
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">Your Browsing History</h2>

      {/* Network History */}
      {networkHistory.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Network Optimization History</h3>
          <ul className="space-y-2">
            {networkHistory.map((response, index) => (
              <li key={index} className="p-4 border rounded-md bg-gray-100">
                <div className="whitespace-pre-wrap break-words">
                  {getDisplayedResponse(response, index, 'network')}
                </div>
                {response.split(' ').length > 100 && (
                  <button
                    onClick={() => toggleExpand(index, 'network')}
                    className="mt-2 text-blue-500 hover:text-blue-400"
                  >
                    {expandedItems[`network-${index}`] ? 'Read Less' : 'Read More'}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Regulation History */}
      {regulationHistory.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Regulation Analysis History</h3>
          <ul className="space-y-2">
            {regulationHistory.map((response, index) => (
              <li key={index} className="p-4 border rounded-md bg-gray-100">
                <div className="whitespace-pre-wrap break-words">
                  {getDisplayedResponse(response, index, 'regulation')}
                </div>
                {response.split(' ').length > 100 && (
                  <button
                    onClick={() => toggleExpand(index, 'regulation')}
                    className="mt-2 text-blue-500 hover:text-blue-400"
                  >
                    {expandedItems[`regulation-${index}`] ? 'Read Less' : 'Read More'}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Resource History */}
      {resourceHistory.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Resource Allocation History</h3>
          <ul className="space-y-2">
            {resourceHistory.map((response, index) => (
              <li key={index} className="p-4 border rounded-md bg-gray-100">
                <div className="whitespace-pre-wrap break-words">
                  {getDisplayedResponse(response, index, 'resource')}
                </div>
                {response.split(' ').length > 100 && (
                  <button
                    onClick={() => toggleExpand(index, 'resource')}
                    className="mt-2 text-blue-500 hover:text-blue-400"
                  >
                    {expandedItems[`resource-${index}`] ? 'Read Less' : 'Read More'}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {(networkHistory.length > 0 || regulationHistory.length > 0 || resourceHistory.length > 0) && (
        <button
          onClick={clearHistory}
          className="mt-6 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Clear History
        </button>
      )}

      {(networkHistory.length === 0 && regulationHistory.length === 0 && resourceHistory.length === 0) && (
        <p className="mt-4 text-gray-600">No History Found</p>
      )}
    </div>
  );
}