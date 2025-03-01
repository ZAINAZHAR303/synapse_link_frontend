"use client";

import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const API_BASE_URL = "https://netoptimizebackend-production.up.railway.app"; // Backend URL

function App() {
  // Policy Analysis State
  const [country, setCountry] = useState("");
  const [regulationText, setRegulationText] = useState("");
  const [regulationResponse, setRegulationResponse] = useState("");
  const [loadingRegulation, setLoadingRegulation] = useState(false);
  const [regulationError, setRegulationError] = useState("");

  // Network Optimization State
  const [networkRegion, setNetworkRegion] = useState("");
  const [terrainData, setTerrainData] = useState("");
  const [existingInfrastructure, setExistingInfrastructure] = useState("");
  const [networkBudget, setNetworkBudget] = useState("");
  const [networkResponse, setNetworkResponse] = useState("");
  const [loadingNetwork, setLoadingNetwork] = useState(false);
  const [networkError, setNetworkError] = useState("");

  // Resource Allocation State
  const [resourceRegion, setResourceRegion] = useState("");
  const [existingAssets, setExistingAssets] = useState("");
  const [connectivityGoals, setConnectivityGoals] = useState("");
  const [resourceBudget, setResourceBudget] = useState("");
  const [resourceResponse, setResourceResponse] = useState("");
  const [loadingResource, setLoadingResource] = useState(false);
  const [resourceError, setResourceError] = useState("");

  // Analyze Telecom Policy
  const handleAnalyzeRegulation = async () => {
    if (!country || !regulationText) {
      alert("Please fill in all fields.");
      return;
    }

    setLoadingRegulation(true);
    setRegulationError("");

    try {
      const response = await axios.post(`${API_BASE_URL}/analyze_policy/`, {
        country,
        policy_text: regulationText,
      });
      const formattedResponse = "```json\n" + JSON.stringify(response.data, null, 2) + "\n```";
      setRegulationResponse(formattedResponse);
    } catch (error) {
      setRegulationError("Failed to analyze regulation. Please try again.");
      console.error("Error analyzing regulation:", error);
    } finally {
      setLoadingRegulation(false);
    }
  };

  // Optimize Network Design
  const handleOptimizeNetwork = async () => {
    if (!networkRegion || !terrainData || !existingInfrastructure || !networkBudget) {
      alert("Please fill in all fields.");
      return;
    }

    setLoadingNetwork(true);
    setNetworkError("");

    try {
      const response = await axios.post(`${API_BASE_URL}/optimize_network/`, {
        region: networkRegion,
        budget: Number(networkBudget),
        existing_infrastructure: existingInfrastructure.split(","),
        terrain_data: terrainData,
      });
      const formattedResponse = "```json\n" + JSON.stringify(response.data, null, 2) + "\n```";
      setNetworkResponse(formattedResponse);
    } catch (error) {
      setNetworkError("Failed to optimize network. Please try again.");
      console.error("Error optimizing network:", error);
    } finally {
      setLoadingNetwork(false);
    }
  };

  // Optimize Resource Allocation
  const handleOptimizeResources = async () => {
    if (!resourceRegion || !existingAssets || !connectivityGoals || !resourceBudget) {
      alert("Please fill in all fields.");
      return;
    }

    setLoadingResource(true);
    setResourceError("");

    try {
      const response = await axios.post(`${API_BASE_URL}/resource_allocation/`, {
        region: resourceRegion,
        budget: Number(resourceBudget),
        existing_assets: existingAssets.split(","),
        user_demand: connectivityGoals,
      });
      const formattedResponse = "```json\n" + JSON.stringify(response.data, null, 2) + "\n```";
      setResourceResponse(formattedResponse);
    } catch (error) {
      setResourceError("Failed to optimize resources. Please try again.");
      console.error("Error optimizing resources:", error);
    } finally {
      setLoadingResource(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>NetOptimize AI</h1>

      {/* Policy Analysis Section */}
      <div>
        <h2>Policy & Regulation Analysis</h2>
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <textarea
          placeholder="Enter telecom policy text"
          value={regulationText}
          onChange={(e) => setRegulationText(e.target.value)}
        />
        <button onClick={handleAnalyzeRegulation} disabled={loadingRegulation}>
          {loadingRegulation ? "Analyzing..." : "Analyze Policy"}
        </button>
        {regulationError && <p style={{ color: "red" }}>{regulationError}</p>}
        <ReactMarkdown>{regulationResponse}</ReactMarkdown>
      </div>

      {/* Network Optimization Section */}
      <div>
        <h2>Network Design Optimization</h2>
        <input
          type="text"
          placeholder="Region"
          value={networkRegion}
          onChange={(e) => setNetworkRegion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Terrain Data"
          value={terrainData}
          onChange={(e) => setTerrainData(e.target.value)}
        />
        <input
          type="text"
          placeholder="Existing Infrastructure (comma-separated)"
          value={existingInfrastructure}
          onChange={(e) => setExistingInfrastructure(e.target.value)}
        />
        <input
          type="number"
          placeholder="Budget"
          value={networkBudget}
          onChange={(e) => setNetworkBudget(e.target.value)}
        />
        <button onClick={handleOptimizeNetwork} disabled={loadingNetwork}>
          {loadingNetwork ? "Optimizing..." : "Optimize Network"}
        </button>
        {networkError && <p style={{ color: "red" }}>{networkError}</p>}
        <ReactMarkdown>{networkResponse}</ReactMarkdown>
      </div>

      {/* Resource Allocation Section */}
      <div>
        <h2>Resource Allocation Optimization</h2>
        <input
          type="text"
          placeholder="Region"
          value={resourceRegion}
          onChange={(e) => setResourceRegion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Existing Assets (comma-separated)"
          value={existingAssets}
          onChange={(e) => setExistingAssets(e.target.value)}
        />
        <input
          type="text"
          placeholder="User Demand"
          value={connectivityGoals}
          onChange={(e) => setConnectivityGoals(e.target.value)}
        />
        <input
          type="number"
          placeholder="Budget"
          value={resourceBudget}
          onChange={(e) => setResourceBudget(e.target.value)}
        />
        <button onClick={handleOptimizeResources} disabled={loadingResource}>
          {loadingResource ? "Optimizing..." : "Optimize Resources"}
        </button>
        {resourceError && <p style={{ color: "red" }}>{resourceError}</p>}
        <ReactMarkdown>{resourceResponse}</ReactMarkdown>
      </div>
    </div>
  );
}

export default App;