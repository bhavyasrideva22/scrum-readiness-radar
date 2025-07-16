
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Target, Heart, Zap, Brain, TrendingUp, Globe } from "lucide-react";

interface WISCARSectionProps {
  onNext: () => void;
  onPrev: () => void;
  onUpdateData: (section: string, data: any) => void;
}

const WISCARSection: React.FC<WISCARSectionProps> = ({ 
  onNext, 
  onPrev, 
  onUpdateData 
}) => {
  const [currentDimension, setCurrentDimension] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Record<number, number>>>({
    W: {}, I: {}, S: {}, C: {}, A: {}, R: {}
  });

  const dimensions = [
    {
      code: "W",
      name: "Will",
      icon: Target,
      color: "red",
      description: "Grit, resilience to support teams consistently",
      questions: [
        "I persist through challenges even when team dynamics become difficult",
        "I maintain consistent energy and commitment during long project cycles"
      ]
    },
    {
      code: "I", 
      name: "Interest",
      icon: Heart,
      color: "pink",
      description: "Desire to coach, facilitate, and improve team dynamics",
      questions: [
        "I genuinely enjoy helping others develop their skills and capabilities",
        "I find team facilitation and group dynamics fascinating and energizing"
      ]
    },
    {
      code: "S",
      name: "Skill", 
      icon: Zap,
      color: "blue",
      description: "Facilitation, communication, conflict resolution",
      questions: [
        "I can effectively mediate disagreements and help people find common ground",
        "I communicate clearly and adapt my style to different audiences"
      ]
    },
    {
      code: "C",
      name: "Cognitive Readiness",
      icon: Brain,
      color: "purple", 
      description: "Logical process thinking, charting, retrospectives",
      questions: [
        "I can think systematically about processes and identify improvement opportunities",
        "I enjoy analyzing data and metrics to understand team performance patterns"
      ]
    },
    {
      code: "A",
      name: "Ability to Learn",
      icon: TrendingUp,
      color: "green",
      description: "Reflection on feedback, Kaizen mindset", 
      questions: [
        "I actively seek feedback and use it to improve my approach",
        "I embrace continuous learning and see failures as learning opportunities"
      ]
    },
    {
      code: "R",
      name: "Real-World Alignment",
      icon: Globe,
      color: "orange",
      description: "Understanding of Scrum Master roles and context",
      questions: [
        "I understand the servant leadership aspect of the Scrum Master role",
        "I can see myself successfully working in fast-paced, iterative environments"
      ]
    }
  ];

  const scaleLabels = [
    "Strongly Disagree",
    "Disagree", 
    "Neutral",
    "Agree",
    "Strongly Agree"
  ];

  const currentDim = dimensions[currentDimension];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  const handleAnswerChange = (value: string) => {
    const newAnswers = {
      ...answers,
      [currentDim.code]: {
        ...answers[currentDim.code],
        [currentQuestion]: parseInt(value)
      }
    };
    setAnswers(newAnswers);
    onUpdateData('wiscar', newAnswers);
  };

  const canProceedToDimension = () => {
    return Object.keys(answers[currentDim.code]).length === currentDim.questions.length;
  };

  const canCompleteSection = () => {
    return dimensions.every(dim => 
      Object.keys(answers[dim.code]).length === dim.questions.length
    );
  };

  const nextQuestion = () => {
    if (currentQuestion < currentDim.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentDimension < dimensions.length - 1) {
      setCurrentDimension(currentDimension + 1);
      setCurrentQuestion(0);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentDimension > 0) {
      setCurrentDimension(currentDimension - 1);
      setCurrentQuestion(dimensions[currentDimension - 1].questions.length - 1);
    }
  };

  const totalQuestions = dimensions.reduce((sum, dim) => sum + dim.questions.length, 0);
  const answeredQuestions = Object.values(answers).reduce((sum, dimAnswers) => 
    sum + Object.keys(dimAnswers).length, 0
  );
  const progress = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Section Header */}
      <Card className="border-2 border-orange-200 bg-orange-50/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="w-6 h-6 text-orange-600" />
            <CardTitle className="text-2xl text-orange-900">WISCAR Framework Analysis</CardTitle>
          </div>
          <CardDescription className="text-lg">
            Assess overall readiness across six critical dimensions for Scrum Master success
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Framework Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">📊 WISCAR Dimensions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {dimensions.map((dim, index) => {
              const Icon = dim.icon;
              const isCompleted = Object.keys(answers[dim.code]).length === dim.questions.length;
              const isCurrent = index === currentDimension;
              
              return (
                <div 
                  key={dim.code} 
                  className={`p-4 rounded-lg border-2 ${
                    isCurrent ? `border-${dim.color}-300 bg-${dim.color}-50` : 
                    isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-5 h-5 ${
                      isCurrent ? `text-${dim.color}-600` : 
                      isCompleted ? 'text-green-600' : 'text-gray-400'
                    }`} />
                    <Badge variant={isCurrent ? "default" : isCompleted ? "secondary" : "outline"}>
                      {dim.code} - {dim.name}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{dim.description}</p>
                  {isCompleted && (
                    <div className="mt-2 text-xs text-green-600 font-medium">✅ Complete</div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Current Question */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium">
              {currentDim.name} - Question {currentQuestion + 1} of {currentDim.questions.length}
            </span>
            <span className="text-sm text-gray-500">
              Overall: {answeredQuestions} / {totalQuestions} ({Math.round(progress)}%)
            </span>
          </div>
          <Progress value={progress} className="mb-6" />
          
          <div className="mb-4">
            <Badge variant="outline" className={`text-${currentDim.color}-700 border-${currentDim.color}-300`}>
              {currentDim.code} - {currentDim.name}: {currentDim.description}
            </Badge>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            {currentDim.questions[currentQuestion]}
          </h3>

          <RadioGroup 
            value={answers[currentDim.code][currentQuestion]?.toString() || ""} 
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
              disabled={currentDimension === 0 && currentQuestion === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <div className="flex gap-2">
              {(currentDimension < dimensions.length - 1 || currentQuestion < currentDim.questions.length - 1) ? (
                <Button 
                  onClick={nextQuestion}
                  disabled={!answers[currentDim.code][currentQuestion]}
                  className="flex items-center gap-2"
                >
                  {currentQuestion === currentDim.questions.length - 1 ? 'Next Dimension' : 'Next Question'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">
                    Completed: {answeredQuestions} / {totalQuestions}
                  </div>
                  {canCompleteSection() && (
                    <div className="text-sm text-green-600 font-medium">
                      ✅ WISCAR Framework Complete
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
          Back to Technical Assessment
        </Button>
        
        <Button 
          onClick={onNext} 
          disabled={!canCompleteSection()}
          className="flex items-center gap-2"
        >
          View Results & Recommendations
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default WISCARSection;
