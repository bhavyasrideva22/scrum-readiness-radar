
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Cog, BarChart, BookOpen } from "lucide-react";

interface TechnicalSectionProps {
  onNext: () => void;
  onPrev: () => void;
  onUpdateData: (section: string, data: any) => void;
}

const TechnicalSection: React.FC<TechnicalSectionProps> = ({ 
  onNext, 
  onPrev, 
  onUpdateData 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      category: "Logical Reasoning",
      type: "multiple-choice",
      text: "A team has 5 user stories in their sprint backlog. Story A depends on Story B being completed first. Story C can be done in parallel with A and B. Stories D and E are independent. What's the optimal sequence to minimize dependencies?",
      options: [
        "B → A → C → D → E",
        "B → (A, C) parallel → (D, E) parallel", 
        "A → B → C → D → E",
        "(B, C, D, E) parallel → A"
      ],
      correct: 1
    },
    {
      category: "Process Understanding",
      type: "multiple-choice", 
      text: "In Scrum, what is the maximum duration for a Sprint Retrospective in a 4-week Sprint?",
      options: [
        "1 hour",
        "2 hours", 
        "3 hours",
        "4 hours"
      ],
      correct: 2
    },
    {
      category: "Numerical Aptitude",
      type: "multiple-choice",
      text: "A team's velocity over the last 3 sprints was 23, 27, and 25 story points. They have 180 story points remaining in their backlog. Approximately how many sprints will they need?",
      options: [
        "6 sprints",
        "7 sprints",
        "8 sprints", 
        "9 sprints"
      ],
      correct: 1
    },
    {
      category: "Scrum Framework",
      type: "multiple-choice",
      text: "Who is responsible for ordering the Product Backlog?",
      options: [
        "Scrum Master",
        "Development Team",
        "Product Owner",
        "Stakeholders"
      ],
      correct: 2
    },
    {
      category: "Conflict Resolution",
      type: "multiple-choice",
      text: "Two developers disagree on the technical approach for a user story. As a Scrum Master, your best first step is:",
      options: [
        "Make the technical decision yourself",
        "Escalate to the Product Owner",
        "Facilitate a discussion to help them reach consensus",
        "Assign the story to a different developer"
      ],
      correct: 2
    },
    {
      category: "Metrics & Estimation",
      type: "multiple-choice",
      text: "A burndown chart shows the line trending above the ideal burndown line. This indicates:",
      options: [
        "The team is ahead of schedule",
        "The team is behind schedule", 
        "The estimates were too high",
        "The sprint goal will definitely be met"
      ],
      correct: 1
    },
    {
      category: "Agile Principles",
      type: "multiple-choice",
      text: "Which Agile principle best supports the Scrum Master's role in servant leadership?",
      options: [
        "Working software over comprehensive documentation",
        "Customer collaboration over contract negotiation",
        "Individuals and interactions over processes and tools",
        "Responding to change over following a plan"
      ],
      correct: 2
    },
    {
      category: "Team Dynamics",
      type: "multiple-choice",
      text: "A team member consistently misses Daily Scrum meetings. As Scrum Master, you should:",
      options: [
        "Remove them from the team",
        "Report them to management",
        "Have a private conversation to understand impediments",
        "Make attendance mandatory with penalties"
      ],
      correct: 2
    }
  ];

  const handleAnswerChange = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);
    onUpdateData('technical', newAnswers);
  };

  const canProceed = () => {
    return Object.keys(answers).length === questions.length;
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Section Header */}
      <Card className="border-2 border-green-200 bg-green-50/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cog className="w-6 h-6 text-green-600" />
            <CardTitle className="text-2xl text-green-900">Technical & Aptitude Assessment</CardTitle>
          </div>
          <CardDescription className="text-lg">
            Gauge critical thinking, process understanding, and ability to learn Agile frameworks
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Components Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">🔎 Assessment Components</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <BarChart className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Logical Reasoning</h4>
                <p className="text-sm text-gray-600">Sequencing, dependencies, priority handling</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Cog className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Numerical Aptitude</h4>
                <p className="text-sm text-gray-600">Estimation, burn-down charts, metrics</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-purple-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Domain Knowledge</h4>
                <p className="text-sm text-gray-600">Scrum roles, artifacts, process flow</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="mb-4" />
          
          <div className="mb-4">
            <Badge variant="secondary" className="text-xs">
              {questions[currentQuestion].category}
            </Badge>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {questions[currentQuestion].text}
          </h3>

          <RadioGroup 
            value={answers[currentQuestion] || ""} 
            onValueChange={handleAnswerChange}
            className="space-y-3"
          >
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-gray-50 border border-gray-200">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} className="mt-1" />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-sm">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* Question Navigation */}
          <div className="flex justify-between mt-8">
            <Button 
              onClick={prevQuestion} 
              variant="outline" 
              disabled={currentQuestion === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <div className="flex gap-2">
              {currentQuestion < questions.length - 1 ? (
                <Button 
                  onClick={nextQuestion}
                  disabled={!answers[currentQuestion]}
                  className="flex items-center gap-2"
                >
                  Next Question
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">
                    Answered: {Object.keys(answers).length} / {questions.length}
                  </div>
                  {canProceed() && (
                    <div className="text-sm text-green-600 font-medium">
                      ✅ Section Complete
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button onClick={onPrev} variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Psychometric
        </Button>
        
        <Button 
          onClick={onNext} 
          disabled={!canProceed()}
          className="flex items-center gap-2"
        >
          Continue to WISCAR Framework
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default TechnicalSection;
