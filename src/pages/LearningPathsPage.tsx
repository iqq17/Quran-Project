import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Book, Award, Star, CheckCircle } from 'lucide-react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
// Remove this line: import { Progress } from "../components/ui/progress";
import { fetchLearningPaths, updateUserProgress } from '../api';

interface LearningPath {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  modules: Module[];
}

interface Module {
  id: number;
  title: string;
  completed: boolean;
}

const LearningPathsPage: React.FC = () => {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);

  useEffect(() => {
    const loadLearningPaths = async () => {
      const paths = await fetchLearningPaths();
      setLearningPaths(paths);
    };
    loadLearningPaths();
  }, []);

  const handleModuleCompletion = async (pathId: number, moduleId: number) => {
    const updatedPaths = learningPaths.map(path => {
      if (path.id === pathId) {
        const updatedModules = path.modules.map(module => 
          module.id === moduleId ? { ...module, completed: true } : module
        );
        return { ...path, modules: updatedModules };
      }
      return path;
    });
    setLearningPaths(updatedPaths);
    await updateUserProgress(pathId, moduleId);
  };

  const calculateProgress = (path: LearningPath) => {
    const completedModules = path.modules.filter(module => module.completed).length;
    return Math.round((completedModules / path.modules.length) * 100);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center text-[#365b6d]"
      >
        Qira'at Ashr Learning Paths
      </motion.h1>

      {!selectedPath ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {learningPaths.map((path) => (
            <Card key={path.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <Book className="w-12 h-12 text-[#365b6d] mb-4" />
                <h2 className="text-xl font-semibold mb-2">{path.title}</h2>
                <p className="text-gray-600 mb-4">{path.description}</p>
                <p className="text-gray-600 mb-4">Level: {path.level}</p>
                <p className="text-gray-600 mb-4">Duration: {path.duration}</p>
                <p className="mb-4">Progress: {calculateProgress(path)}%</p>
                <Button onClick={() => setSelectedPath(path)} className="w-full bg-[#365b6d] text-white">
                  Continue Learning
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <Button onClick={() => setSelectedPath(null)} className="mb-4">
            Back to All Paths
          </Button>
          <h2 className="text-2xl font-semibold mb-4">{selectedPath.title}</h2>
          <p className="text-gray-600 mb-4">{selectedPath.description}</p>
          <p className="mb-4">Progress: {calculateProgress(selectedPath)}%</p>
          {selectedPath.modules.map((module) => (
            <Card key={module.id} className="mb-4">
              <CardContent className="p-4 flex justify-between items-center">
                <span>{module.title}</span>
                {module.completed ? (
                  <CheckCircle className="text-green-500" />
                ) : (
                  <Button onClick={() => handleModuleCompletion(selectedPath.id, module.id)}>
                    Mark as Completed
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningPathsPage;
