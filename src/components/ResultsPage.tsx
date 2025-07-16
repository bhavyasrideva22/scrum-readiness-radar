
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, XCircle, Target, BookOpen, TrendingUp, Users, Star, ArrowRight, Download } from "lucide-react";

interface ResultsPageProps {
  assessmentData: {
    psychometric: Record<number, number>;
    technical: Record<number, string>;
    wiscar: Record<string, Record<number, number>>;
  };
}

const ResultsPage: React.FC<ResultsPageProps> = ({ assessmentData }) => {
  
  const calculateScores = useMemo(() => {
    // Psychometric Score (0-100)
    const psychometricAnswers = Object.values(assessmentData.psychometric);
    const psychometricScore = psychometricAnswers.length > 0 
      ? (psychometricAnswers.reduce((sum, val) => sum + val, 0) / (psychometricAnswers.length * 5)) * 100
      : 0;

    // Technical Score (0-100) - based on correct answers
    const technicalAnswers = Object.values(assessmentData.technical);
    const correctAnswers = [1, 2, 1, 2, 2, 1, 2, 2]; // Correct answer indices
    let technicalCorrect = 0;
    Object.entries(assessmentData.technical).forEach(([index, answer]) => {
      if (parseInt(answer) === correctAnswers[parseInt(index)]) {
        technicalCorrect++;
      }
    });
    const technicalScore = technicalAnswers.length > 0 
      ? (technicalCorrect / technicalAnswers.length) * 100
      : 0;

    // WISCAR Scores
    const wiscarScores: Record<string, number> = {};
    Object.entries(assessmentData.wiscar).forEach(([dimension, answers]) => {
      const dimensionAnswers = Object.values(answers);
      if (dimensionAnswers.length > 0) {
        wiscarScores[dimension] = (dimensionAnswers.reduce((sum, val) => sum + val, 0) / (dimensionAnswers.length * 5)) * 100;
      } else {
        wiscarScores[dimension] = 0;
      }
    });

    const wiscarAverage = Object.values(wiscarScores).length > 0
      ? Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / Object.values(wiscarScores).length
      : 0;

    // Overall Score
    const overallScore = (psychometricScore + technicalScore + wiscarAverage) / 3;

    return {
      psychometric: Math.round(psychometricScore),
      technical: Math.round(technicalScore),
      wiscar: wiscarScores,
      wiscarAverage: Math.round(wiscarAverage),
      overall: Math.round(overallScore)
    };
  }, [assessmentData]);

  const getRecommendation = (score: number) => {
    if (score >= 75) return { verdict: "YES", icon: CheckCircle, color: "green", guidance: "Strong match — begin training" };
    if (score >= 55) return { verdict: "MAYBE", icon: AlertTriangle, color: "yellow", guidance: "Potential match; develop gaps" };
    return { verdict: "NO", icon: XCircle, color: "red", guidance: "Not the right fit — explore alternatives" };
  };

  const recommendation = getRecommendation(calculateScores.overall);
  const RecommendationIcon = recommendation.icon;

  const roles = [
    { name: "Scrum Master", description: "Lead teams through daily ceremonies and sprints" },
    { name: "Agile Coach", description: "Mentor multiple teams on agile transformation" },
    { name: "Delivery Lead", description: "Coordinate cross-team dependencies and deliveries" },
    { name: "Product Owner Associate", description: "Assist product owners with backlog prioritization" },
    { name: "Project Coordinator", description: "Facilitate resource and task planning in Agile envs" }
  ];

  const skillGaps = [
    { area: "Facilitation", yourLevel: "Beginner", required: "Intermediate", gap: "High" },
    { area: "Conflict Resolution", yourLevel: "Beginner", required: "Intermediate", gap: "High" },
    { area: "Scrum Knowledge", yourLevel: "Beginner", required: "Intermediate", gap: "High" },
    { area: "Data/Metric Handling", yourLevel: "Intermediate", required: "Intermediate", gap: "Low" },
    { area: "Adaptive Mindset", yourLevel: "Intermediate", required: "High", gap: "Medium" }
  ];

  const learningPath = [
    "Learn Scrum fundamentals (Scrum Guide, roles, artifacts)",
    "Shadow scrum events in real projects", 
    "Attend Certified ScrumMaster training",
    "Practice coaching and facilitation skills",
    "Build portfolio: lead a sprint, retrospectives",
    "Join Scrum Community (meetups, Guilds)"
  ];

  const alternativePaths = [
    "Agile Project Coordinator",
    "Product Support/ Delivery Specialist", 
    "Team Facilitator (non-Scrum frameworks)",
    "Project Management Foundations (PMP)"
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Main Results Header */}
      <Card className={`border-2 border-${recommendation.color}-200 bg-${recommendation.color}-50/50`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RecommendationIcon className={`w-8 h-8 text-${recommendation.color}-600`} />
              <div>
                <CardTitle className="text-3xl">
                  {recommendation.verdict === "YES" ? "✅ YES" : 
                   recommendation.verdict === "MAYBE" ? "⚠️ MAYBE" : "❌ NO"}
                </CardTitle>
                <p className="text-lg text-gray-600">{recommendation.guidance}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">{calculateScores.overall}%</div>
              <div className="text-sm text-gray-600">Overall Score</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Score Breakdown */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Psychometric Fit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600 mb-2">{calculateScores.psychometric}%</div>
            <Progress value={calculateScores.psychometric} className="mb-3" />
            <p className="text-sm text-gray-600">
              Personality traits & mindset alignment with Scrum Master role
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-600" />
              Technical Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 mb-2">{calculateScores.technical}%</div>
            <Progress value={calculateScores.technical} className="mb-3" />
            <p className="text-sm text-gray-600">
              Process understanding & aptitude for learning Agile frameworks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              WISCAR Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 mb-2">{calculateScores.wiscarAverage}%</div>
            <Progress value={calculateScores.wiscarAverage} className="mb-3" />
            <p className="text-sm text-gray-600">
              Comprehensive readiness across 6 critical dimensions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* WISCAR Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>📊 WISCAR Framework Detailed Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(calculateScores.wiscar).map(([dimension, score]) => {
              const dimensionNames: Record<string, string> = {
                W: "Will", I: "Interest", S: "Skill", 
                C: "Cognitive Readiness", A: "Ability to Learn", R: "Real-World Alignment"
              };
              
              return (
                <div key={dimension} className="flex items-center gap-3">
                  <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                    {dimension}
                  </Badge>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{dimensionNames[dimension]}</span>
                      <span className="text-sm font-bold">{Math.round(score)}%</span>
                    </div>
                    <Progress value={score} className="h-2" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Personalized Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>🗣️ Personalized Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendation.verdict === "YES" && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-800 mb-3">
                  <strong>Congratulations!</strong> Your assessment shows strong alignment with the Scrum Master role. 
                  Your facilitation mindset and team-oriented approach are excellent foundations.
                </p>
                <div className="text-sm text-green-700">
                  <strong>Next Steps:</strong> Focus on building Scrum framework knowledge and practicing facilitation techniques.
                </div>
              </div>
            )}
            
            {recommendation.verdict === "MAYBE" && (
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-yellow-800 mb-3">
                  You show good potential for the Scrum Master role, but there are some areas that need development. 
                  Your core interests align well, but technical knowledge and facilitation skills need strengthening.
                </p>
                <div className="text-sm text-yellow-700">
                  <strong>Recommendation:</strong> Build process understanding through the Scrum Guide and join Agile meetups.
                </div>
              </div>
            )}
            
            {recommendation.verdict === "NO" && (
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-800 mb-3">
                  Based on your responses, the Scrum Master role may not be the best fit at this time. 
                  Consider exploring related roles that better match your strengths and interests.
                </p>
                <div className="text-sm text-red-700">
                  <strong>Alternative suggestion:</strong> Look into Project Coordinator or Product Support roles as stepping stones.
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Career Guidance */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>🏁 Roles Enabled by Becoming a Scrum Master</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {roles.map((role, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <Star className="w-4 h-4 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{role.name}</h4>
                    <p className="text-sm text-gray-600">{role.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🛠 Skill Mapping Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {skillGaps.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.area}</span>
                    <Badge variant={skill.gap === "High" ? "destructive" : skill.gap === "Medium" ? "default" : "secondary"}>
                      {skill.gap === "High" ? "❗High" : skill.gap === "Medium" ? "⚠️Medium" : "✅Low"} Gap
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    Your Level: {skill.yourLevel} → Required: {skill.required}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Pathway or Alternatives */}
      {recommendation.verdict !== "NO" ? (
        <Card>
          <CardHeader>
            <CardTitle>📚 Your Learning Pathway</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {learningPath.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center text-xs">
                    {index + 1}
                  </Badge>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>📣 Alternative Career Paths</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {alternativePaths.map((path, index) => (
                <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-800 font-medium">{path}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pt-6">
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download Results
        </Button>
        <Button className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          Find Learning Resources
        </Button>
      </div>
    </div>
  );
};

export default ResultsPage;
