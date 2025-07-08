import { useState, useEffect } from 'react';
import { Prediction } from '@/types/match';

// Mock user ID - in real app, this would come from authentication
const MOCK_USER_ID = 'user-123';

export const usePredictions = () => {
  const [predictions, setPredictions] = useState<Record<number, Prediction>>({});

  // Load predictions from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(`predictions-${MOCK_USER_ID}`);
    if (stored) {
      try {
        const parsedPredictions = JSON.parse(stored);
        setPredictions(parsedPredictions);
      } catch (error) {
        console.error('Error parsing stored predictions:', error);
      }
    }
  }, []);

  // Save predictions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`predictions-${MOCK_USER_ID}`, JSON.stringify(predictions));
  }, [predictions]);

  const addPrediction = (matchId: number, homeScore: number, awayScore: number) => {
    const prediction: Prediction = {
      id: `${matchId}-${MOCK_USER_ID}-${Date.now()}`,
      matchId,
      userId: MOCK_USER_ID,
      homeScore,
      awayScore,
      createdAt: new Date().toISOString()
    };

    setPredictions(prev => ({
      ...prev,
      [matchId]: prediction
    }));

    return prediction;
  };

  const updatePredictionResult = (matchId: number, isCorrect: boolean, points: number) => {
    setPredictions(prev => {
      const prediction = prev[matchId];
      if (!prediction) return prev;

      return {
        ...prev,
        [matchId]: {
          ...prediction,
          isCorrect,
          points
        }
      };
    });
  };

  const getPrediction = (matchId: number): Prediction | undefined => {
    return predictions[matchId];
  };

  const getAllPredictions = (): Prediction[] => {
    return Object.values(predictions);
  };

  const getStats = () => {
    const allPredictions = getAllPredictions();
    const completedPredictions = allPredictions.filter(p => p.isCorrect !== undefined);
    const correctPredictions = completedPredictions.filter(p => p.isCorrect);
    const totalEarnings = correctPredictions.reduce((sum, p) => sum + (p.points || 0), 0);

    return {
      totalPredictions: allPredictions.length,
      completedPredictions: completedPredictions.length,
      correctPredictions: correctPredictions.length,
      winRate: completedPredictions.length > 0 ? (correctPredictions.length / completedPredictions.length) * 100 : 0,
      totalEarnings,
      pendingPredictions: allPredictions.length - completedPredictions.length
    };
  };

  return {
    predictions,
    addPrediction,
    updatePredictionResult,
    getPrediction,
    getAllPredictions,
    getStats
  };
};