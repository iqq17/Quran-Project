import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Book, FileText, Plus, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { fetchResources, addResource, fetchAssignments, addAssignment, gradeAssignment } from '../api';

interface Resource {
  id: string;
  title: string;
  link: string;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  submissions: Submission[];
}

interface Submission {
  id: string;
  studentName: string;
  submissionDate: string;
  content: string;
  grade: number | null;
}

const ClassroomPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [newResource, setNewResource] = useState({ title: '', link: '' });
  const [newAssignment, setNewAssignment] = useState({ title: '', description: '', dueDate: '' });
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const fetchedResources = await fetchResources();
      const fetchedAssignments = await fetchAssignments();
      setResources(fetchedResources);
      setAssignments(fetchedAssignments);
    };
    loadData();
  }, []);

  const handleAddResource = async () => {
    const addedResource = await addResource(newResource);
    setResources([...resources, addedResource]);
    setNewResource({ title: '', link: '' });
  };

  const handleAddAssignment = async () => {
    const addedAssignment = await addAssignment(newAssignment);
    setAssignments([...assignments, addedAssignment]);
    setNewAssignment({ title: '', description: '', dueDate: '' });
  };

  const handleGradeSubmission = async (assignmentId: string, submissionId: string, grade: number) => {
    await gradeAssignment(assignmentId, submissionId, grade);
    const updatedAssignments = assignments.map(assignment => 
      assignment.id === assignmentId
        ? {
            ...assignment,
            submissions: assignment.submissions.map(submission =>
              submission.id === submissionId ? { ...submission, grade } : submission
            )
          }
        : assignment
    );
    setAssignments(updatedAssignments);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center text-[#365b6d]"
      >
        Classroom
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Book className="mr-2" /> Resources
            </h2>
            <div className="space-y-4 mb-4">
              {resources.map(resource => (
                <div key={resource.id} className="flex justify-between items-center">
                  <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {resource.title}
                  </a>
                  <div>
                    <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
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
              <Button onClick={handleAddResource}><Plus className="h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <FileText className="mr-2" /> Assignments
            </h2>
            <div className="space-y-4 mb-4">
              {assignments.map(assignment => (
                <div key={assignment.id} className="flex justify-between items-center">
                  <button onClick={() => setSelectedAssignment(assignment)} className="text-left">
                    <div className="font-semibold">{assignment.title}</div>
                    <div className="text-sm text-gray-500">Due: {assignment.dueDate}</div>
                  </button>
                  <div>
                    <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <Input 
                placeholder="Assignment Title" 
                value={newAssignment.title}
                onChange={e => setNewAssignment({...newAssignment, title: e.target.value})}
              />
              <Textarea 
                placeholder="Assignment Description" 
                value={newAssignment.description}
                onChange={e => setNewAssignment({...newAssignment, description: e.target.value})}
              />
              <Input 
                type="date" 
                value={newAssignment.dueDate}
                onChange={e => setNewAssignment({...newAssignment, dueDate: e.target.value})}
              />
              <Button onClick={handleAddAssignment} className="w-full">Add Assignment</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedAssignment && (
        <Card className="mt-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">{selectedAssignment.title}</h2>
            <p className="mb-4">{selectedAssignment.description}</p>
            <h3 className="text-xl font-semibold mb-2">Submissions</h3>
            {selectedAssignment.submissions.map(submission => (
              <div key={submission.id} className="mb-4 p-4 border rounded">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-semibold">{submission.studentName}</div>
                  <div className="text-sm text-gray-500">Submitted: {submission.submissionDate}</div>
                </div>
                <p className="mb-2">{submission.content}</p>
                <div className="flex items-center">
                  <Input 
                    type="number" 
                    placeholder="Grade" 
                    value={submission.grade || ''} 
                    onChange={e => handleGradeSubmission(selectedAssignment.id, submission.id, Number(e.target.value))}
                    className="w-20 mr-2"
                  />
                  <Button onClick={() => handleGradeSubmission(selectedAssignment.id, submission.id, Number(submission.grade))}>
                    Submit Grade
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClassroomPage;
