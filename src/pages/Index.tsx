
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Target, BookOpen, Users, TrendingUp, ArrowRight, Clock, Star } from "lucide-react";
import AssessmentIntro from '@/components/AssessmentIntro';
import PsychometricSection from '@/components/PsychometricSection';
import TechnicalSection from '@/components/TechnicalSection';
import WISCARSection from '@/components/WISCARSection';
import ResultsPage from '@/components/ResultsPage';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentData, setAssessmentData] = useState({
    psychometric: {},
    technical: {},
    wiscar: {}
  });

  const steps = [
    { title: "Introduction", component: AssessmentIntro },
    { title: "Psychometric Assessment", component: PsychometricSection },
    { title: "Technical & Aptitude", component: TechnicalSection },
    { title: "WISCAR Framework", component: WISCARSection },
    { title: "Results & Recommendations", component: ResultsPage }
  ];

  const updateAssessmentData = (section: string, data: any) => {
    setAssessmentData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CAREER COMPASS
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Should You Learn to Become a Scrum Master?
          </p>
          <Badge variant="secondary" className="text-sm">
            <Clock className="w-4 h-4 mr-1" />
            ~25 minutes assessment
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </span>
          </div>
          <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
          
          {/* Step indicators */}
          <div className="flex justify-between mt-4">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {index < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
                </div>
                <span className="text-xs text-gray-600 mt-1 text-center max-w-20">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <CurrentComponent 
          onNext={nextStep}
          onPrev={prevStep}
          onUpdateData={updateAssessmentData}
          assessmentData={assessmentData}
          currentStep={currentStep}
          totalSteps={steps.length}
        />
      </div>
    </div>
  );
};

export default Index;
