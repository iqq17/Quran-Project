import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, FileText, Plus, Edit, Trash2, MessageCircle, Users, Calendar, ThumbsUp, MessageSquare } from 'lucide-react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { fetchResources, addResource, fetchDiscussions, addDiscussion, fetchEvents, addEvent } from '../api';

interface Resource {
  id: string;
  title: string;
  link: string;
  category: string;
}

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  replies: number;
  likes: number;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  attendees: number;
  location: string;
}

const CommunityPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [newResource, setNewResource] = useState({ title: '', link: '', category: '' });
  const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '' });
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', location: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedResources, fetchedDiscussions, fetchedEvents] = await Promise.all([
          fetchResources(),
          fetchDiscussions(),
          fetchEvents()
        ]);
        setResources(fetchedResources);
        setDiscussions(fetchedDiscussions);
        setEvents(fetchedEvents);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error('Error loading data:', err);
      }
    };
    loadData();
  }, []);

  const handleAddResource = async () => {
    try {
      const addedResource = await addResource(newResource);
      setResources([...resources, addedResource]);
      setNewResource({ title: '', link: '', category: '' });
    } catch (err) {
      setError('Failed to add resource. Please try again.');
      console.error('Error adding resource:', err);
    }
  };

  const handleAddDiscussion = async () => {
    try {
      const addedDiscussion = await addDiscussion(newDiscussion);
      setDiscussions([...discussions, addedDiscussion]);
      setNewDiscussion({ title: '', content: '' });
    } catch (err) {
      setError('Failed to add discussion. Please try again.');
      console.error('Error adding discussion:', err);
    }
  };

  const handleAddEvent = async () => {
    try {
      const addedEvent = await addEvent(newEvent);
      setEvents([...events, addedEvent]);
      setNewEvent({ title: '', description: '', date: '', location: '' });
    } catch (err) {
      setError('Failed to add event. Please try again.');
      console.error('Error adding event:', err);
    }
  };

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDiscussions = discussions.filter(discussion =>
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-[#f2f1ec] to-white min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 text-center text-[#365b6d]"
      >
        Qira'at Ashr Community Hub
      </motion.h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="mb-8">
        <Input 
          placeholder="Search resources, discussions, or events..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md mx-auto"
        />
      </div>

      <Tabs defaultValue="resources" className="mb-12">
        <TabsList className="w-full justify-center mb-8">
          <TabsTrigger value="resources">Learning Resources</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="events">Community Events</TabsTrigger>
        </TabsList>

        <TabsContent value="resources">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Book className="mr-2 text-[#365b6d]" /> Learning Resources
              </h2>
              <div className="space-y-4 mb-4">
                <AnimatePresence>
                  {filteredResources.map(resource => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex justify-between items-center p-3 bg-white rounded-lg shadow"
                    >
                      <div>
                        <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline font-semibold">
                          {resource.title}
                        </a>
                        <p className="text-sm text-gray-500">{resource.category}</p>
                      </div>
                      <div>
                        <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="space-y-2">
                <Input 
                  placeholder="Resource Title" 
                  value={newResource.title}
                  onChange={e => setNewResource({...newResource, title: e.target.value})}
                />
                <Input 
                  placeholder="Resource Link" 
                  value={newResource.link}
                  onChange={e => setNewResource({...newResource, link: e.target.value})}
                />
                <Input 
                  placeholder="Category" 
                  value={newResource.category}
                  onChange={e => setNewResource({...newResource, category: e.target.value})}
                />
                <Button onClick={handleAddResource} className="w-full bg-[#365b6d] text-white">Add Resource</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discussions">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <MessageCircle className="mr-2 text-[#365b6d]" /> Discussions
              </h2>
              <div className="space-y-4 mb-4">
                <AnimatePresence>
                  {filteredDiscussions.map(discussion => (
                    <motion.div
                      key={discussion.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-4 bg-white rounded-lg shadow"
                    >
                      <h3 className="font-semibold text-lg">{discussion.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{discussion.content.substring(0, 100)}...</p>
                      <div className="text-xs text-gray-500 mt-2 flex justify-between items-center">
                        <span>By {discussion.author} | {discussion.date}</span>
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center"><ThumbsUp className="h-4 w-4 mr-1" /> {discussion.likes}</span>
                          <span className="flex items-center"><MessageSquare className="h-4 w-4 mr-1" /> {discussion.replies}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="space-y-2">
                <Input 
                  placeholder="Discussion Title" 
                  value={newDiscussion.title}
                  onChange={e => setNewDiscussion({...newDiscussion, title: e.target.value})}
                />
                <Textarea 
                  placeholder="Start a discussion..." 
                  value={newDiscussion.content}
                  onChange={e => setNewDiscussion({...newDiscussion, content: e.target.value})}
                />
                <Button onClick={handleAddDiscussion} className="w-full bg-[#365b6d] text-white">Post Discussion</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Calendar className="mr-2 text-[#365b6d]" /> Community Events
              </h2>
              <div className="space-y-4 mb-4">
                <AnimatePresence>
                  {filteredEvents.map(event => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-4 bg-white rounded-lg shadow"
                    >
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      <div className="text-xs text-gray-500 mt-2 flex justify-between items-center">
                        <span>{event.date} | {event.location}</span>
                        <span className="flex items-center"><Users className="h-4 w-4 mr-1" /> {event.attendees} attendees</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="space-y-2">
                <Input 
                  placeholder="Event Title" 
                  value={newEvent.title}
                  onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                />
                <Textarea 
                  placeholder="Event Description" 
                  value={newEvent.description}
                  onChange={e => setNewEvent({...newEvent, description: e.target.value})}
                />
                <Input 
                  type="date" 
                  value={newEvent.date}
                  onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                />
                <Input 
                  placeholder="Event Location" 
                  value={newEvent.location}
                  onChange={e => setNewEvent({...newEvent, location: e.target.value})}
                />
                <Button onClick={handleAddEvent} className="w-full bg-[#365b6d] text-white">Create Event</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityPage;
