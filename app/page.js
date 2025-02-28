"use client"
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [country, setCountry] = useState("");
  const [regulationText, setRegulationText] = useState("");
  const [regulationResponse, setRegulationResponse] = useState(null);

  const [regionData, setRegionData] = useState("");
  const [requirements, setRequirements] = useState("");
  const [networkResponse, setNetworkResponse] = useState(null);

  const [existingAssets, setExistingAssets] = useState("");
  const [connectivityGoals, setConnectivityGoals] = useState("");
  const [resourceResponse, setResourceResponse] = useState(null);

  const API_BASE_URL = "http://127.0.0.1:8000"; 

  const handleAnalyzeRegulation = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/analyze_regulation`, {
        country,
        regulation_text: regulationText,
      });
      setRegulationResponse(response.data.analysis);
    } catch (error) {
      console.error("Error analyzing regulation:", error);
    }
  };

  const handleOptimizeNetwork = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/optimize_network`, {
        region_data: regionData,
        requirements,
      });
      setNetworkResponse(response.data.network_plan);
    } catch (error) {
      console.error("Error optimizing network:", error);
    }
  };

  const handleOptimizeResources = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/optimize_resources`, {
        existing_assets: existingAssets,
        connectivity_goals: connectivityGoals,
      });
      setResourceResponse(response.data.optimization_suggestions);
    } catch (error) {
      console.error("Error optimizing resources:", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">NetOptimize AI Frontend</h1>
      
      {/* Regulation Analysis Section */}
      <div className="p-4 border rounded-lg shadow">
        <h2 className="text-xl font-semibold">Regulation Analysis</h2>
        <input
          type="text"
          className="border p-2 w-full mt-2"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <textarea
          className="border p-2 w-full mt-2"
          placeholder="Regulation Text"
          value={regulationText}
          onChange={(e) => setRegulationText(e.target.value)}
        ></textarea>
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAnalyzeRegulation}
        >
          Analyze Regulation
        </button>
        {regulationResponse && <p className="mt-2">{regulationResponse}</p>}
      </div>
      
      {/* Network Optimization Section */}
      <div className="p-4 border rounded-lg shadow">
        <h2 className="text-xl font-semibold">Network Design Optimization</h2>
        <textarea
          className="border p-2 w-full mt-2"
          placeholder="Region Data"
          value={regionData}
          onChange={(e) => setRegionData(e.target.value)}
        ></textarea>
        <textarea
          className="border p-2 w-full mt-2"
          placeholder="Requirements"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        ></textarea>
        <button
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleOptimizeNetwork}
        >
          Optimize Network
        </button>
        {networkResponse && <p className="mt-2">{networkResponse}</p>}
      </div>
      
      {/* Resource Optimization Section */}
      <div className="p-4 border rounded-lg shadow">
        <h2 className="text-xl font-semibold">Resource Allocation Optimization</h2>
        <textarea
          className="border p-2 w-full mt-2"
          placeholder="Existing Assets"
          value={existingAssets}
          onChange={(e) => setExistingAssets(e.target.value)}
        ></textarea>
        <textarea
          className="border p-2 w-full mt-2"
          placeholder="Connectivity Goals"
          value={connectivityGoals}
          onChange={(e) => setConnectivityGoals(e.target.value)}
        ></textarea>
        <button
          className="mt-2 bg-purple-500 text-white px-4 py-2 rounded"
          onClick={handleOptimizeResources}
        >
          Optimize Resources
        </button>
        {resourceResponse && <p className="mt-2">{resourceResponse}</p>}
      </div>
    </div>
  );
}
 