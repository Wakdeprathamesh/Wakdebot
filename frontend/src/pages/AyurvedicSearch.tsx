import React, { useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";

export function AyurvedicSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [herbDetails, setHerbDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError("");
    setHerbDetails(null);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/herbs/${searchQuery}`
      );
      setHerbDetails(response.data);
    } catch (err) {
      setError("Herb not found or an error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Popular herbs for the landing page
  const popularHerbs = [
    {
      name: "Ashwagandha",
      scientific_name: "Withania somnifera",
      description: "Known for its adaptogenic properties and stress relief.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREmeQ3bu74HuS5vyo4NXYpVY0qozeyX2kG_Q&s",
    },
    {
      name: "Tulsi",
      scientific_name: "Ocimum sanctum",
      description: "Holy Basil, used for respiratory health and immunity.",
      image: "https://media.post.rvohealth.io/wp-content/uploads/2020/09/1296x728_Holy_Basil-1200x628.jpg",
    },
    {
      name: "Neem",
      scientific_name: "Azadirachta indica",
      description: "Famous for its antimicrobial and skin health benefits.",
      image: "https://static.toiimg.com/photo/68670559.cms",
    },
    {
      name: "Triphala",
      scientific_name: "Combination of three fruits",
      description: "A powerful detoxifier and digestive aid.",
      image: "https://i0.wp.com/www.cultivatornatural.com/wp-content/uploads/2022/05/Organic-Triphala.jpg?fit=1536%2C1091&ssl=1",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4E7D1] to-white">
      {/* Search Section */}
      <div className="py-16 bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-serif font-bold text-[#4F7942] text-center mb-6">
            Ayurvedic Herb Search
          </h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5A7184]" />
            <input
              type="text"
              placeholder="Search for an Ayurvedic herb..."
              className="w-full pl-12 pr-16 py-4 rounded-full border border-[#4F7942]/20 focus:ring-2 focus:ring-[#4F7942] focus:border-transparent text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown} // Trigger search on Enter key
            />
            <button
              onClick={handleSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#4F7942] text-white px-4 py-2 rounded-full hover:bg-[#3E5F34] transition"
            >
              Search
            </button>
          </div>
          {isLoading && <p className="text-center text-[#5A7184] mt-4">Loading...</p>}
          {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        </div>
      </div>

      {/* Initial Data Section */}
      {!herbDetails && !isLoading && !error && (
        <div className="py-16 bg-[#F4E7D1]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-[#4F7942] mb-8 text-center">
              Popular Herbs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {popularHerbs.map((herb, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center"
                >
                  <img
                    src={herb.image}
                    alt={herb.name}
                    className="w-32 h-32 object-cover rounded-full mb-4"
                  />
                  <h3 className="text-xl font-bold text-[#4F7942]">{herb.name}</h3>
                  <p className="text-sm italic text-[#5A7184]">
                    {herb.scientific_name}
                  </p>
                  <p className="text-sm text-[#5A7184] mt-2">{herb.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Herb Details Section */}
      {herbDetails && (
        <div className="py-16 bg-[#F4E7D1]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-xl shadow-lg p-8">
            {/* Herb Header */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex-shrink-0">
                <img
                  src={herbDetails.images?.[0] || "https://via.placeholder.com/150"}
                  alt={herbDetails.name}
                  className="w-64 h-64 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
              </div>
              <div>
                <h2 className="text-4xl font-serif font-bold text-[#4F7942]">
                  {herbDetails.name}
                </h2>
                <p className="text-lg text-[#5A7184] italic">
                  {herbDetails.scientific_name}
                </p>
                <p className="text-md text-[#5A7184] mt-2">
                  <strong>Family:</strong> {herbDetails.family}
                </p>
              </div>
            </div>

{/* Two-Column Layout */}
<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
  {/* Column 1 */}
  <div>
    <h3 className="text-2xl font-serif font-bold text-[#4F7942] mb-4">
      Ayurvedic Properties
    </h3>
    <p>
      <strong>Rasa:</strong> {herbDetails.rasa}
    </p>
    <p>
      <strong>Guna:</strong> {herbDetails.guna}
    </p>
    <p>
      <strong>Virya:</strong> {herbDetails.virya}
    </p>
    <p>
      <strong>Vipaka:</strong> {herbDetails.vipaka}
    </p>
    <p>
      <strong>Prabhava:</strong> {herbDetails.prabhava}
    </p>

    <h3 className="text-2xl font-serif font-bold text-[#4F7942] mt-8 mb-4">
      Uses
    </h3>
    <ul className="list-disc list-inside text-[#5A7184]">
      {herbDetails.uses?.map((use, index) => (
        <li key={index}>{use}</li>
      ))}
    </ul>

    <h3 className="text-2xl font-serif font-bold text-[#4F7942] mt-8 mb-4">
      Parts Used
    </h3>
    <ul className="list-disc list-inside text-[#5A7184]">
      {herbDetails.parts_used?.map((part, index) => (
        <li key={index}>{part}</li>
      ))}
    </ul>

    <h3 className="text-2xl font-serif font-bold text-[#4F7942] mt-8 mb-4">
      Preparations
    </h3>
    <ul className="list-disc list-inside text-[#5A7184]">
      {herbDetails.preparations?.map((prep, index) => (
        <li key={index}>{prep}</li>
      ))}
    </ul>
  </div>

  {/* Column 2 */}
  <div>
    <h3 className="text-2xl font-serif font-bold text-[#4F7942] mb-4">
      Dosha Effects
    </h3>
    <p>
      <strong>Vata:</strong> {herbDetails.dosha_effects?.vata}
    </p>
    <p>
      <strong>Pitta:</strong> {herbDetails.dosha_effects?.pitta}
    </p>
    <p>
      <strong>Kapha:</strong> {herbDetails.dosha_effects?.kapha}
    </p>

    <h3 className="text-2xl font-serif font-bold text-[#4F7942] mt-8 mb-4">
      Contraindications
    </h3>
    <ul className="list-disc list-inside text-[#5A7184]">
      {herbDetails.contraindications?.map((contra, index) => (
        <li key={index}>{contra}</li>
      ))}
    </ul>

    <h3 className="text-2xl font-serif font-bold text-[#4F7942] mt-8 mb-4">
      Side Effects
    </h3>
    <ul className="list-disc list-inside text-[#5A7184]">
      {herbDetails.side_effects?.map((effect, index) => (
        <li key={index}>{effect}</li>
      ))}
    </ul>

    <h3 className="text-2xl font-serif font-bold text-[#4F7942] mt-8 mb-4">
      Nutrients
    </h3>
    <p>
      <strong>Protein:</strong> {herbDetails.nutrients?.protein}
    </p>
    <p>
      <strong>Fiber:</strong> {herbDetails.nutrients?.fiber}
    </p>
    <p>
      <strong>Vitamins:</strong> {herbDetails.nutrients?.vitamins?.join(", ")}
    </p>

    <h3 className="text-2xl font-serif font-bold text-[#4F7942] mt-8 mb-4">
      Origin
    </h3>
    <p className="text-[#5A7184]">{herbDetails.origin}</p>

    <h3 className="text-2xl font-serif font-bold text-[#4F7942] mt-8 mb-4">
      Cultivation
    </h3>
    <p className="text-[#5A7184]">{herbDetails.cultivation}</p>

    <h3 className="text-2xl font-serif font-bold text-[#4F7942] mt-8 mb-4">
      References
    </h3>
    <ul className="list-disc list-inside text-[#5A7184]">
      {herbDetails.references?.map((ref, index) => (
        <li key={index}>{ref}</li>
      ))}
    </ul>
  </div>
</div>
          </div>
        </div>
      )}
    </div>
  );
}