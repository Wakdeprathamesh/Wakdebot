// dosha.ts

export type DoshaFormData = {
  basicInfo: {
    age: string;
    gender: string;
    lifestyle: string;
  };
  sections: {
    energyAndSleep: string[];
    digestion: string[];
    emotional: string[];
    physical: string[];
    lifestyle: string[];
  };
};

export type QuestionWeight = {
  vata: number;
  pitta: number;
  kapha: number;
};

export type DoshaQuestion = {
  text: string;
  options: {
    text: string;
    weights: QuestionWeight;
  }[];
  isHighWeightage?: boolean;
};

export type DoshaResult = {
  vata: number;
  pitta: number;
  kapha: number;
  vataPercentage: number;
  pittaPercentage: number;
  kaphaPercentage: number;
  dominantDosha: string;
  constitution: string;
  recommendations: {
    diet: string[];
    exercise: string[];
    lifestyle: string[];
  };
};

export const calculateDoshaPercentages = (vata: number, pitta: number, kapha: number): {
  vataPercentage: number;
  pittaPercentage: number;
  kaphaPercentage: number;
} => {
  const total = vata + pitta + kapha;
  return {
    vataPercentage: Number(((vata / total) * 100).toFixed(1)),
    pittaPercentage: Number(((pitta / total) * 100).toFixed(1)),
    kaphaPercentage: Number(((kapha / total) * 100).toFixed(1)),
  };
};

export const determineConstitution = (vata: number, pitta: number, kapha: number): string => {
  const scores = [
    { type: 'Vata', score: vata },
    { type: 'Pitta', score: pitta },
    { type: 'Kapha', score: kapha }
  ].sort((a, b) => b.score - a.score);

  // Check for dual dosha (within 5 points)
  if (Math.abs(scores[0].score - scores[1].score) <= 5) {
    return `${scores[0].type}-${scores[1].type}`;
  }

  return scores[0].type;
};