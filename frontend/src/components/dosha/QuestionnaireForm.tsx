// QuestionnaireForm.tsx

import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { DoshaQuestion, QuestionWeight } from 'C:/Users/Mohit/Downloads/AyurMarg UI Version_1/project/frontend/src/types/dosha.ts';

const questions: Record<string, DoshaQuestion[]> = { energyAndSleep: [
  {
    text: "How would you describe your daily energy levels?",
    isHighWeightage: true,
    options: [
      {
        text: "Variable, fluctuating throughout the day",
        weights: { vata: 2, pitta: 0, kapha: 0 }
      },
      {
        text: "Strong and purposeful",
        weights: { vata: 0, pitta: 2, kapha: 0 }
      },
      {
        text: "Steady but slow to start",
        weights: { vata: 0, pitta: 0, kapha: 2 }
      }
    ]
  },
  {
    text: "What is your typical sleep pattern?",
    options: [
      {
        text: "Light and irregular",
        weights: { vata: 1, pitta: 0, kapha: 0 }
      },
      {
        text: "Moderate but regular",
        weights: { vata: 0, pitta: 1, kapha: 0 }
      },
      {
        text: "Deep and long",
        weights: { vata: 0, pitta: 0, kapha: 1 }
      }
    ]
  },
  {
    text: "How do you feel upon waking up?",
    options: [
      {
        text: "Variable, sometimes tired",
        weights: { vata: 1, pitta: 0, kapha: 0 }
      },
      {
        text: "Alert and ready to go",
        weights: { vata: 0, pitta: 1, kapha: 0 }
      },
      {
        text: "Slow to wake up, groggy",
        weights: { vata: 0, pitta: 0, kapha: 1 }
      }
    ]
  }
],
digestion: [
  {
    text: "How would you describe your appetite?",
    isHighWeightage: true,
    options: [
      {
        text: "Variable, irregular",
        weights: { vata: 2, pitta: 0, kapha: 0 }
      },
      {
        text: "Strong, gets irritable when hungry",
        weights: { vata: 0, pitta: 2, kapha: 0 }
      },
      {
        text: "Steady, can skip meals easily",
        weights: { vata: 0, pitta: 0, kapha: 2 }
      }
    ]
  },
  {
    text: "How regular are your meal timings?",
    options: [
      {
        text: "Irregular, often skip meals",
        weights: { vata: 1, pitta: 0, kapha: 0 }
      },
      {
        text: "Regular, eat when hungry",
        weights: { vata: 0, pitta: 1, kapha: 0 }
      },
      {
        text: "Regular, can eat anytime",
        weights: { vata: 0, pitta: 0, kapha: 1 }
      }
    ]
  },
  {
    text: "How is your digestion generally?",
    options: [
      {
        text: "Variable, sometimes gassy",
        weights: { vata: 1, pitta: 0, kapha: 0 }
      },
      {
        text: "Quick, strong digestion",
        weights: { vata: 0, pitta: 1, kapha: 0 }
      },
      {
        text: "Slow but steady",
        weights: { vata: 0, pitta: 0, kapha: 1 }
      }
    ]
  }
],
emotional: [
  {
    text: "How do you typically handle stress?",
    isHighWeightage: true,
    options: [
      {
        text: "Anxious and worried",
        weights: { vata: 2, pitta: 0, kapha: 0 }
      },
      {
        text: "Irritable and intense",
        weights: { vata: 0, pitta: 2, kapha: 0 }
      },
      {
        text: "Calm and steady",
        weights: { vata: 0, pitta: 0, kapha: 2 }
      }
    ]
  },
  {
    text: "What is your usual emotional state?",
    options: [
      {
        text: "Changeable, easily excited",
        weights: { vata: 1, pitta: 0, kapha: 0 }
      },
      {
        text: "Focused and determined",
        weights: { vata: 0, pitta: 1, kapha: 0 }
      },
      {
        text: "Stable and grounded",
        weights: { vata: 0, pitta: 0, kapha: 1 }
      }
    ]
  },
  {
    text: "How do you make decisions?",
    options: [
      {
        text: "Quick but often changing",
        weights: { vata: 1, pitta: 0, kapha: 0 }
      },
      {
        text: "Decisive and clear",
        weights: { vata: 0, pitta: 1, kapha: 0 }
      },
      {
        text: "Careful and methodical",
        weights: { vata: 0, pitta: 0, kapha: 1 }
      }
    ]
  }
],
physical: [
  {
    text: "How would you describe your body frame?",
    isHighWeightage: true,
    options: [
      {
        text: "Thin, light boned",
        weights: { vata: 2, pitta: 0, kapha: 0 }
      },
      {
        text: "Medium, muscular",
        weights: { vata: 0, pitta: 2, kapha: 0 }
      },
      {
        text: "Large, well-built",
        weights: { vata: 0, pitta: 0, kapha: 2 }
      }
    ]
  },
  {
    text: "What is your typical body temperature?",
    options: [
      {
        text: "Often cold",
        weights: { vata: 1, pitta: 0, kapha: 0 }
      },
      {
        text: "Warm, gets hot easily",
        weights: { vata: 0, pitta: 1, kapha: 0 }
      },
      {
        text: "Cool and steady",
        weights: { vata: 0, pitta: 0, kapha: 1 }
      }
    ]
  },
  {
    text: "How is your skin type generally?",
    options: [
      {
        text: "Dry and rough",
        weights: { vata: 1, pitta: 0, kapha: 0 }
      },
      {
        text: "Warm and sensitive",
        weights: { vata: 0, pitta: 1, kapha: 0 }
      },
      {
        text: "Smooth and oily",
        weights: { vata: 0, pitta: 0, kapha: 1 }
      }
    ]
  }
],
lifestyle: [
  {
    text: "What type of exercise do you prefer?",
    isHighWeightage: true,
    options: [
      {
        text: "Light and variable",
        weights: { vata: 2, pitta: 0, kapha: 0 }
      },
      {
        text: "Intense and competitive",
        weights: { vata: 0, pitta: 2, kapha: 0 }
      },
      {
        text: "Steady and enduring",
        weights: { vata: 0, pitta: 0, kapha: 2 }
      }
    ]
  },
  {
    text: "How do you prefer to spend your free time?",
    options: [
      {
        text: "Creative activities",
        weights: { vata: 1, pitta: 0, kapha: 0 }
      },
      {
        text: "Goal-oriented activities",
        weights: { vata: 0, pitta: 1, kapha: 0 }
      },
      {
        text: "Relaxing activities",
        weights: { vata: 0, pitta: 0, kapha: 1 }
      }
    ]
  },
  {
    text: "What weather conditions do you enjoy most?",
    options: [
      {
        text: "Warm and dry",
        weights: { vata: 1, pitta: 0, kapha: 0 }
      },
      {
        text: "Cool and refreshing",
        weights: { vata: 0, pitta: 1, kapha: 0 }
      },
      {
        text: "Warm and humid",
        weights: { vata: 0, pitta: 0, kapha: 1 }
      }
    ]
  }]};

const sections = [
  'energyAndSleep',
  'digestion',
  'emotional',
  'physical',
  'lifestyle'
] as const;

const sectionTitles = {
  energyAndSleep: 'Energy & Sleep Patterns',
  digestion: 'Digestive Health',
  emotional: 'Emotional Well-being',
  physical: 'Physical Characteristics',
  lifestyle: 'Lifestyle Preferences'
};

type Section = keyof typeof questions;

type QuestionnaireFormProps = {
  onComplete: (scores: { vata: number; pitta: number; kapha: number }) => void;
  onBack: () => void;
};

export function QuestionnaireForm({ onComplete, onBack }: QuestionnaireFormProps) {
  const [currentSection, setCurrentSection] = React.useState<Section>('energyAndSleep');
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [scores, setScores] = React.useState({
    vata: 0,
    pitta: 0,
    kapha: 0
  });

  const handleAnswer = (weights: QuestionWeight) => {
    const question = questions[currentSection][currentQuestionIndex];
    const multiplier = question.isHighWeightage ? 2 : 1;

    setScores({
      vata: scores.vata + weights.vata * multiplier,
      pitta: scores.pitta + weights.pitta * multiplier,
      kapha: scores.kapha + weights.kapha * multiplier
    });

    if (currentQuestionIndex < questions[currentSection].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const currentSectionIndex = sections.indexOf(currentSection);
      if (currentSectionIndex < sections.length - 1) {
        setCurrentSection(sections[currentSectionIndex + 1]);
        setCurrentQuestionIndex(0);
      } else {
        onComplete(scores);
      }
    }
  };

  const progress = ((sections.indexOf(currentSection) * questions[currentSection].length + currentQuestionIndex + 1) /
    (sections.length * questions[currentSection].length)) * 100;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-serif font-bold text-[#4F7942]">
              {sectionTitles[currentSection]}
            </h3>
            <span className="text-[#5A7184]">
              Question {currentQuestionIndex + 1} of {questions[currentSection].length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#4F7942] h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-xl text-[#5A7184] mb-6">
            {questions[currentSection][currentQuestionIndex].text}
          </h4>
          <div className="grid gap-4">
            {questions[currentSection][currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.weights)}
                className="p-4 text-left rounded-lg border border-gray-300 hover:border-[#4F7942] hover:bg-[#F4E7D1]/20
                         transition-all duration-200 flex justify-between items-center"
              >
                <span>{option.text}</span>
                <ArrowRight className="h-5 w-5 text-[#4F7942] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="flex items-center text-[#5A7184] hover:text-[#4F7942] transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          <div className="text-[#5A7184]">
            Section {sections.indexOf(currentSection) + 1} of {sections.length}
          </div>
        </div>
      </div>
    </div>
  );
}