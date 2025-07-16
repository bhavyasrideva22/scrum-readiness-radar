
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Brain, Users, Target } from "lucide-react";

interface PsychometricSectionProps {
  onNext: () => void;
  onPrev: () => void;
  onUpdateData: (section: string, data: any) => void;
}

const PsychometricSection: React.FC<PsychometricSectionProps> = ({ 
  onNext, 
  onPrev, 
  onUpdateData 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const questions = [
    {
      category: "Facilitation & Leadership",
      text: "I enjoy coaching individuals to achieve their potential.",
      construct: "Big Five: Agreeableness"
    },
    {
      category: "Emotional Stability", 
      text: "I stay calm when conflicts arise in team settings.",
      construct: "Big Five: Emotional Stability"
    },
    {
      category: "Adaptability",
      text: "I adapt quickly to changing team dynamics and priorities.",
      construct: "Growth Mindset"
    },
    {
      category: "Communication",
      text: "I find it easy to facilitate discussions between different viewpoints.",
      construct: "Holland: Social"
    },
    {
      category: "Process Orientation",
      text: "I prefer structured approaches to problem-solving while remaining flexible.",
      construct: "Big Five: Conscientiousness"
    },
    {
      category: "Team Focus",
      text: "I am more energized by helping teams succeed than individual recognition.",
      construct: "Intrinsic Motivation"
    },
    {
      category: "Resilience",
      text: "When faced with setbacks, I focus on learning and continuous improvement.",
      construct: "Grit & Growth Mindset"
    },
    {
      category: "Active Listening",
      text: "I can understand different perspectives even when I disagree.",
      construct: "Big Five: Agreeableness"
    },
    {
      category: "Change Management",
      text: "I thrive in environments where priorities and processes evolve regularly.",
      construct: "Holland: Enterprising"
    },
    {
      category: "Stakeholder Management",
      text: "I enjoy building bridges between different departments and stakeholders.",
      construct: "Holland: Social + Enterprising"
    }
  ];

  const scaleLabels = [
    "Strongly Disagree",
    "Disagree", 
    "Neutral",
    "Agree",
    "Strongly Agree"
  ];

  const handleAnswerChange = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion]: parseInt(value) };
    setAnswers(newAnswers);
    onUpdateData('psychometric', newAnswers);
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
      <Card className="border-2 border-purple-200 bg-purple-50/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            <CardTitle className="text-2xl text-purple-900">Psychometric Assessment</CardTitle>
          </div>
          <CardDescription className="text-lg">
            Measure key psychological traits aligning with Scrum Master responsibilities
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Constructs Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">🔬 What We're Measuring</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Badge variant="outline">Big Five Personality</Badge>
              <p className="text-sm text-gray-600">Agreeableness, Conscientiousness, Emotional Stability</p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline">Holland Codes</Badge>
              <p className="text-sm text-gray-600">Social, Enterprising, Conventional orientations</p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline">Grit & Growth Mindset</Badge>
              <p className="text-sm text-gray-600">Perseverance and belief in development</p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline">Motivation Style</Badge>
              <p className="text-sm text-gray-600">Intrinsic (coaching) vs Extrinsic (status) drivers</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="mb-4" />
          
          <div className="mb-2">
            <Badge variant="secondary" className="text-xs">
              {questions[currentQuestion].construct}
            </Badge>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            {questions[currentQuestion].text}
          </h3>

          <RadioGroup 
            value={answers[currentQuestion]?.toString() || ""} 
            onValueChange={handleAnswerChange}
            className="space-y-3"
          >
            {scaleLabels.map((label, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-200">
                <RadioGroupItem value={(index + 1).toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <span>{label}</span>
                    <Badge variant="outline" className="text-xs">{index + 1}</Badge>
                  </div>
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
          Back to Introduction
        </Button>
        
        <Button 
          onClick={onNext} 
          disabled={!canProceed()}
          className="flex items-center gap-2"
        >
          Continue to Technical Assessment
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default PsychometricSection;
