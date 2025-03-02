"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Nav from "./component/nav/Nav";
import Footer from "./component/footer/Footer";
import countryList from "react-select-country-list";
import Hero from "./component/hero/Hero";

// import ReactMarkdown from "react-markdown";

const API_BASE_URL = "https://netoptimizebackend-production.up.railway.app"; // Backend URL

function App() {
  // Policy Analysis State
  const [country, setCountry] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
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
      // const formattedResponse = "```json\n" + JSON.stringify(response.data, null, 2) + "\n```";
      const formattedResponse = JSON.stringify(response.data, null, 2)
      setRegulationResponse(formattedResponse);

      console.log("data", formattedResponse);

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
      // const formattedResponse = "```json\n" + JSON.stringify(response.data, null, 2) + "\n```";
      const formattedResponse = JSON.stringify(response.data, null, 2)

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
      const formattedResponse = JSON.stringify(response.data, null, 2);
      setResourceResponse(formattedResponse);
      // setCountry("")
      // setRegion("")
      // setExistingAssets("")
      // setResourceBudget("")
      // setConnectivityGoals("")

    } catch (error) {
      setResourceError("Failed to optimize resources. Please try again.");
      console.error("Error optimizing resources:", error);
    } finally {
      setLoadingResource(false);
    }
  };
  const [isExpanded, setIsExpanded] = useState(false);
  const [designOp, setDesignOp] = useState(false)
  const [resAll, setResAll] = useState(false)
  const initialWordCount = 100;

  const getDisplayedResponse = () => {
    if (!regulationResponse) return '';

    const words = regulationResponse.split(' ');
    if (words.length <= initialWordCount || isExpanded) {
      return regulationResponse;
    } else {
      return words.slice(0, initialWordCount).join(' ') + '...';
    }
  };

  const getDisplayedResponse2 = () => {
    if (!networkResponse) return '';

    const words = networkResponse.split(' ');
    if (words.length <= initialWordCount || designOp) {
      return networkResponse;
    } else {
      return words.slice(0, initialWordCount).join(' ') + '...';
    }
  };
  const getDisplayedResponse3 = () => {
    if (!resourceResponse) return '';

    const words = resourceResponse.split(' ');
    if (words.length <= initialWordCount || resAll) {
      return resourceResponse;
    } else {
      return words.slice(0, initialWordCount).join(' ') + '...';
    }
  };

  useEffect(() => {
    if (networkResponse) {
      const storedNetworkResponses = JSON.parse(localStorage.getItem("networkResponses")) || [];
      const updatedNetworkResponses = [...storedNetworkResponses, networkResponse];
      localStorage.setItem("networkResponses", JSON.stringify(updatedNetworkResponses));
    }

    if (regulationResponse) {
      const storedRegulationResponses = JSON.parse(localStorage.getItem("regulationResponses")) || [];
      const updatedRegulationResponses = [...storedRegulationResponses, regulationResponse];
      localStorage.setItem("regulationResponses", JSON.stringify(updatedRegulationResponses));
    }

    if (resourceResponse) {
      const storedResourceResponses = JSON.parse(localStorage.getItem("resourceResponses")) || [];
      const updatedResourceResponses = [...storedResourceResponses, resourceResponse];
      localStorage.setItem("resourceResponses", JSON.stringify(updatedResourceResponses));
    }
  }, [networkResponse, regulationResponse, resourceResponse]);
  const handleCountryChange = (e) => {
    const input = e.target.value;
    setCountry(input);

    const countries = countryList().getLabels();
    const filtered = input
      ? countries.filter((c) => c.toLowerCase().startsWith(input.toLowerCase()))
      : [];
    setFilteredCountries(filtered);
  };

  const getUserCountry = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_API_KEY`
        );
        const data = await response.json();
        if (data.results.length > 0) {
          const countryName = data.results
            .find((result) =>
              result.types.includes("country")
            )?.formatted_address;
          setCountry(countryName || "");
        }
      });
    }
  };
  const policyAnalysisRef = useRef(null);
  const networkAnalysisRef = useRef(null);
  const regulationAnalysisRef = useRef(null);

  return (
    <div className=" " style={{ padding: "20px" }}>
      <Nav networkAnalysisRef={networkAnalysisRef} regulationAnalysisRef={regulationAnalysisRef} policyAnalysisRef={policyAnalysisRef}/>
      <div className="">
        <Hero className="" />
      </div>
      <div className="text-center mt-4 w-screen min-h-screen  p-8">
        <h2 
        ref={policyAnalysisRef} className="bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white font-bold text-3xl py-4 px-8 shadow-2xl border-b-2 border-gray-600">
          Policy & Regulation Analysis
        </h2>
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
          <input
            className="bg-gray-200 text-gray-800 w-full mt-6 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-colors duration-300"
            type="text"
            placeholder="Country"
            value={country}
            onChange={handleCountryChange}
            onFocus={getUserCountry} />
          {filteredCountries.length > 0 && (
            <ul className="absolute bg-white border align-item-start mt-1 w-full max-h-40 overflow-y-auto shadow-lg">
              {filteredCountries.map((c, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setCountry(c);
                    setFilteredCountries([]);
                  }}
                >
                  {c}
                </li>
              ))}
            </ul>
          )}
          <textarea
            className="w-full text-black bg-gray-200 mt-3 py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition-colors duration-300 resize-none h-48"
            placeholder="Enter telecom policy text"
            value={regulationText}
            onChange={(e) => setRegulationText(e.target.value)}
          />
          <button
            onClick={handleAnalyzeRegulation}
            disabled={loadingRegulation}
            className={`w-full mt-6 py-3 px-6 rounded-lg text-gray-200 font-semibold border border-gray-700 ${loadingRegulation
                ? "bg-gray-800 cursor-not-allowed"
                : "bg-gray-900 hover:bg-black transition-colors duration-300"
              }`}
          >
            {loadingRegulation ? "Analyzing..." : "Analyze Policy"}
          </button>
        </div>

        {regulationError && (
          <p className="text-red-500 mt-4">{regulationError}</p>
        )}

        {regulationError && (
          <p className="text-red-500 mt-4">{regulationError}</p>
        )}

        {regulationResponse && (
          <div className="mt-8 p-6 bg-gray-800 text-white rounded-lg max-w-4xl mx-auto text-left overflow-x-auto">
            <h3 className="text-2xl font-semibold mb-4">Analysis Result:</h3>
            <div className="whitespace-pre-wrap break-words">
              {getDisplayedResponse()}
            </div>
            {regulationResponse.split(' ').length > initialWordCount && !isExpanded && (
              <button
                onClick={() => setIsExpanded(true)}
                className="mt-4 text-gray-400 hover:text-gray-500"
              >
                Read More
              </button>
            )}
            {regulationResponse.split(' ').length > initialWordCount && isExpanded && (
              <button
                onClick={() => setIsExpanded(false)}
                className="mt-4 text-gray-400 hover:text-gray-300"
              >
                Read Less
              </button>
            )}
          </div>
        )}
      </div>
      {/* Network Optimization Section */}
      <div className="text-center w-screen min-h-screen  p-8">
        <h2 ref={ networkAnalysisRef} className="bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white font-bold text-3xl py-4 px-8 shadow-2xl border-b-2 border-gray-600">Network Design Optimization</h2>
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
          <input className="bg-gray-100 bg-gray-200 text-gray-800 w-full mt-6 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-300"

            type="text"
            placeholder="Region"
            value={networkRegion}
            onChange={(e) => setNetworkRegion(e.target.value)}
          />
          <input className="bg-gray-100 bg-gray-200 text-gray-800 w-full mt-6 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-300"

            type="text"
            placeholder="Terrain Data"
            value={terrainData}
            onChange={(e) => setTerrainData(e.target.value)}
          />
          <input className="bg-gray-100 bg-gray-200 text-gray-800 w-full mt-6 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-300"

            type="text"
            placeholder="Existing Infrastructure (comma-separated)"
            value={existingInfrastructure}
            onChange={(e) => setExistingInfrastructure(e.target.value)}
          />
          <input className="bg-gray-100 bg-gray-200 text-gray-800 w-full mt-6 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-300"

            type="number"
            placeholder="Budget"
            value={networkBudget}
            onChange={(e) => setNetworkBudget(e.target.value)}
          />
          <button
            className={`w-full mt-6 py-3 px-6 rounded-lg text-gray-200 font-semibold border border-gray-700 ${loadingNetwork
              ? "bg-gray-800 cursor-not-allowed"
              : "bg-gray-900 hover:bg-black transition-colors duration-300"
              }`}
            onClick={handleOptimizeNetwork}
            disabled={loadingNetwork}
          >
            {loadingNetwork ? "Optimizing..." : "Optimize Network"}
          </button>
        </div>
        {networkError && <p style={{ color: "red" }}>{networkError}</p>}
        {networkError && <p className="text-red-500 mt-4">{networkError}</p>}
        {networkResponse && (
          <div className="mt-8 p-6 bg-gray-800 text-white rounded-lg max-w-4xl mx-auto text-left overflow-x-auto">
            <h3 className="text-2xl font-semibold mb-4">Analysis Result:</h3>
            <div className="whitespace-pre-wrap break-words">
              {getDisplayedResponse2()}
            </div>
            {networkResponse.split(' ').length > initialWordCount && !designOp && (
              <button
                onClick={() => setDesignOp(true)}
                className="mt-4 text-blue-500 hover:text-blue-400"
              >
                Read More
              </button>
            )}
            {networkResponse.split(' ').length > initialWordCount && designOp && (
              <button
                onClick={() => setDesignOp(false)}
                className="mt-4 text-blue-500 hover:text-blue-400"
              >
                Read Less
              </button>
            )}
          </div>
        )}
      </div>

      {/* Resource Allocation Section */}

      <div className="text-center w-screen min-h-screen  p-8">
        <h2 ref={regulationAnalysisRef} className="bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white font-bold text-3xl py-4 px-8 shadow-2xl border-b-2 border-gray-600">Resource Allocation Optimization</h2>
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
          <input className="bg-gray-100 bg-gray-200 text-gray-800 w-full mt-6 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-300"

            type="text"
            placeholder="Region"
            value={resourceRegion}
            onChange={(e) => setResourceRegion(e.target.value)}
          />
          <input className="bg-gray-100 bg-gray-200 text-gray-800 w-full mt-6 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-300"

            type="text"
            placeholder="Existing Assets (comma-separated)"
            value={existingAssets}
            onChange={(e) => setExistingAssets(e.target.value)}
          />
          <input className="bg-gray-100 bg-gray-200 text-gray-800 w-full mt-6 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-300"

            type="text"
            placeholder="User Demand"
            value={connectivityGoals}
            onChange={(e) => setConnectivityGoals(e.target.value)}
          />
          <input className="bg-gray-100 bg-gray-200 text-gray-800 w-full mt-6 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-300"

            type="number"
            placeholder="Budget"
            value={resourceBudget}
            onChange={(e) => setResourceBudget(e.target.value)}
          />
          <button
            className={`w-full mt-6 py-3 px-6 rounded-lg text-gray-200 font-semibold border border-gray-700 ${loadingResource
              ? "bg-gray-800 cursor-not-allowed"
              : "bg-gray-900 hover:bg-black transition-colors duration-300"
              }`}
            onClick={handleOptimizeResources}
            disabled={loadingResource}
          >
            {loadingResource ? "Optimizing..." : "Optimize Resources"}
          </button>
        </div>
        {resourceError && <p className="text-red-500 mt-4">{resourceError}</p>}
        {resourceResponse && (
          <div className="mt-8 p-6 bg-gray-800 text-white rounded-lg max-w-4xl mx-auto text-left overflow-x-auto">
            <h3 className="text-2xl font-semibold mb-4">Resource Analysis Result:</h3>

            <div className="whitespace-pre-wrap break-words">
              {getDisplayedResponse3()}
            </div>
            {resourceResponse.split(' ').length > initialWordCount && !resAll && (
              <button
                onClick={() => setResAll(true)}
                className="mt-4 text-gray-600 hover:text-gray-500"
              >
                Read More
              </button>
            )}
            {resourceResponse.split(' ').length > initialWordCount && resAll && (
              <button
                onClick={() => setResAll(false)}
                className="mt-4 text-gray-600 hover:text-gray-500"
              >
                Read Less
              </button>
            )}
          </div>
        )}

      </div>



      <Footer />

    </div>
  );
}

export default App;