import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Book, Video, FileText, Lightbulb, ExternalLink } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { fetchQuranLearningResources } from '../api';

const QuranLearningHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [resources, setResources] = useState<{ title: string; link: string }[]>([]);

  useEffect(() => {
    const loadResources = async () => {
      const data = await fetchQuranLearningResources();
      setResources(data);
    };
    loadResources();
  }, []);

  const tips = [
    "Set a daily reading goal, even if it's just one page.",
    "Listen to Quran recitations regularly to improve your own recitation.",
    "Study the context and historical background of the surahs.",
    "Join a local Quran study group or find an online community.",
    "Use a Quran app with audio and translation features for on-the-go learning.",
  ];

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-[#f2f1ec] to-[#e2e1dc] min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#365b6d]">Quran Learning Hub</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="videos">Video Lectures</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="tips">Learning Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-[#365b6d]">Welcome to the Quran Learning Hub</h2>
              <p className="mb-4">
                This hub is designed to provide you with comprehensive resources and guidance for your Quranic studies. 
                Explore video lectures, reading materials, and practical tips to enhance your understanding and connection with the Quran.
              </p>
              <p>
                Use the tabs above to navigate through different types of content and find what best suits your learning style.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <iframe 
                width="100%" 
                height="315" 
                src="https://www.youtube.com/embed/GCclvOkUdos" 
                title="Quran Lecture 1" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <iframe 
                width="100%" 
                height="315" 
                src="https://www.youtube.com/embed/TuXL9RN70Bo" 
                title="Quran Lecture 2" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-[#365b6d]">Quran Study Resources</h2>
              <ul className="space-y-4">
                {resources.map((resource, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <a 
                      href={resource.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-[#365b6d] hover:text-[#bcac88] transition-colors duration-200"
                    >
                      <FileText className="mr-2" size={20} />
                      {resource.title}
                      <ExternalLink className="ml-2" size={16} />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-[#365b6d]">Tips for Effective Quran Learning</h2>
              <ul className="space-y-4">
                {tips.map((tip, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <Lightbulb className="mr-2 mt-1 text-[#bcac88]" size={20} />
                    <span>{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuranLearningHub;
