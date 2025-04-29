// DoshaAnalysis.tsx
import React from 'react';
import { QuestionnaireForm } from '../components/dosha/QuestionnaireForm';
import { ResultsPage } from '../components/dosha/ResultsPage';
import type { DoshaResult } from '../types/dosha';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function determineConstitution(vata: number, pitta: number, kapha: number): string {
  const scores = [
    { type: 'Vata', score: vata },
    { type: 'Pitta', score: pitta },
    { type: 'Kapha', score: kapha }
  ].sort((a, b) => b.score - a.score);

  if (Math.abs(scores[0].score - scores[1].score) <= 5) {
    return `${scores[0].type}-${scores[1].type}`;
  }

  return scores[0].type;
}

function getRecommendations(constitution: string) {
  return {
    diet: [
      "Eat warm, freshly cooked meals",
      "Include all six tastes in your diet",
      "Maintain regular meal times",
      "Choose fresh, seasonal foods"
    ],
    exercise: [
      "Practice balanced exercise routine",
      "Include yoga and breathing exercises",
      "Exercise during appropriate times of day",
      "Maintain consistency in activities"
    ],
    lifestyle: [
      "Maintain a regular daily routine",
      "Get adequate sleep",
      "Practice stress management techniques",
      "Create a balanced work-life schedule"
    ]
  };
}

export function DoshaAnalysis() {
  const [showResults, setShowResults] = React.useState(false);
  const [result, setResult] = React.useState<DoshaResult | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { user , updatePrakriti } = useAuth();

  const savePrakritiToDatabase = async (doshaResult: DoshaResult) => {
    console.log("saving prakriti to backend");
    if (!user) {
      setError("You must be logged in to save results");
      return;
    }

    setIsLoading(true);
    try {
      const prakritiData = {
        constitution: doshaResult.constitution,
        doshas: {
          vata: doshaResult.vataPercentage,
          pitta: doshaResult.pittaPercentage,
          kapha: doshaResult.kaphaPercentage
        },
        recommendations: doshaResult.recommendations,
        lastUpdated: new Date().toISOString(),
      };

      console.log(prakritiData,user);

      const response = await axios.put(
        `http://localhost:5000/api/prakriti/${user.id}`,
        prakritiData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      updatePrakriti(prakritiData);

      if (response.data) {
        setError(null);
      }
    } catch (err) {
      setError("Failed to save prakriti data");
      console.error("Error saving prakriti:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = async (scores: { vata: number; pitta: number; kapha: number }) => {
    const total = scores.vata + scores.pitta + scores.kapha;
    
    const doshaResult: DoshaResult = {
      vata: scores.vata,
      pitta: scores.pitta,
      kapha: scores.kapha,
      vataPercentage: Number(((scores.vata / total) * 100).toFixed(1)),
      pittaPercentage: Number(((scores.pitta / total) * 100).toFixed(1)),
      kaphaPercentage: Number(((scores.kapha / total) * 100).toFixed(1)),
      dominantDosha: determineConstitution(scores.vata, scores.pitta, scores.kapha),
      constitution: determineConstitution(scores.vata, scores.pitta, scores.kapha),
      recommendations: getRecommendations(determineConstitution(scores.vata, scores.pitta, scores.kapha))
    };

    console.log(3232);
    
    await savePrakritiToDatabase(doshaResult);
    
    setResult(doshaResult);
    setShowResults(true);
  };

  const handleBack = () => {
    setShowResults(false);
    setResult(null);
  };

  if (showResults && result) {
    return (
      <>
        <ResultsPage 
          result={result} 
          isLoading={isLoading} 
          error={error}
        />
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
              Saving your results...
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <QuestionnaireForm 
      onComplete={handleComplete}
      onBack={handleBack}
    />
  );
}