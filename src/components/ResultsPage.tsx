
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Target, TrendingUp, ArrowRight, ArrowLeft, Award, BookOpen, Users } from "lucide-react";

interface ResultsPageProps {
  onNext?: () => void;
  onPrev: () => void;
  onUpdateData?: (section: string, data: any) => void;
  assessmentData: any;
  currentStep?: number;
  totalSteps?: number;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ onPrev, assessmentData }) => {
  // Calculate sample scores (in a real app, this would be based on actual assessment data)
  const psychometricScore = 78;
  const technicalScore = 85;
  const wiscarScore = 82;
  const overallScore = Math.round((psychometricScore + technicalScore + wiscarScore) / 3);

  const getRecommendation = (score: number) => {
    if (score >= 75) return { verdict: "✅ YES", status: "Strong Match", color: "green" };
    if (score >= 55) return { verdict: "⚠️ MAYBE", status: "Potential Match", color: "yellow" };
    return { verdict: "❌ NO", status: "Not the Right Fit", color: "red" };
  };

  const recommendation = getRecommendation(overallScore);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Results Header */}
      <Card className="border-2 border-blue-200 bg-blue-50/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-blue-600" />
            <CardTitle className="text-2xl text-blue-900">Assessment Results</CardTitle>
          </div>
          <CardDescription className="text-lg">
            Your comprehensive Scrum Master readiness evaluation
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-center">Overall Readiness Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-blue-600">{overallScore}%</div>
            <div className={`text-2xl font-semibold ${
              recommendation.color === 'green' ? 'text-green-600' : 
              recommendation.color === 'yellow' ? 'text-yellow-600' : 
              'text-red-600'
            }`}>
              {recommendation.verdict} - {recommendation.status}
            </div>
            <Progress value={overallScore} className="h-4" />
          </div>
        </CardContent>
      </Card>

      {/* Section Breakdown */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Psychometric
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 mb-2">{psychometricScore}%</div>
            <Progress value={psychometricScore} className="mb-3" />
            <p className="text-sm text-gray-600">Personality traits and mindset alignment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-600" />
              Technical
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">{technicalScore}%</div>
            <Progress value={technicalScore} className="mb-3" />
            <p className="text-sm text-gray-600">Process understanding and aptitude</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-600" />
              WISCAR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600 mb-2">{wiscarScore}%</div>
            <Progress value={wiscarScore} className="mb-3" />
            <p className="text-sm text-gray-600">Comprehensive readiness framework</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">🎯 Your Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          {overallScore >= 75 ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Strong Match - Begin Training</h3>
                <p className="text-green-700 mb-3">You show excellent potential for becoming a Scrum Master!</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Recommended Actions:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Enroll in Certified ScrumMaster (CSM) training</li>
                  <li>Join local Agile meetups and communities</li>
                  <li>Shadow experienced Scrum Masters</li>
                  <li>Practice facilitation skills in your current role</li>
                </ul>
              </div>
            </div>
          ) : overallScore >= 55 ? (
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold text-yellow-900 mb-2">Potential Match - Develop Gaps</h3>
                <p className="text-yellow-700 mb-3">You have good potential with some areas for improvement.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Focus Areas:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Study the Scrum Guide thoroughly</li>
                  <li>Improve process understanding</li>
                  <li>Practice conflict resolution techniques</li>
                  <li>Develop facilitation skills</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="font-semibold text-red-900 mb-2">Consider Alternative Paths</h3>
                <p className="text-red-700 mb-3">Scrum Master may not be the best fit. Consider these alternatives:</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Alternative Roles:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Project Coordinator</li>
                  <li>Product Owner Associate</li>
                  <li>Agile Delivery Support</li>
                  <li>Business Analyst</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button onClick={onPrev} variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to WISCAR Assessment
        </Button>
        
        <Button className="flex items-center gap-2">
          Download Report
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ResultsPage;
