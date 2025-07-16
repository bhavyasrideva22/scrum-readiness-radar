
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Users, TrendingUp, CheckCircle, ArrowRight, Lightbulb, Heart, Cog } from "lucide-react";

interface AssessmentIntroProps {
  onNext: () => void;
}

const AssessmentIntro: React.FC<AssessmentIntroProps> = ({ onNext }) => {
  const roles = [
    "Scrum Master",
    "Agile Coach", 
    "Project Manager (Agile)",
    "Delivery Lead",
    "Product Owner Associate"
  ];

  const traits = [
    { icon: Users, text: "Facilitation & conflict resolution" },
    { icon: Heart, text: "Empathy and active listening" },
    { icon: Cog, text: "Structured mindset with flexibility" },
    { icon: TrendingUp, text: "Communication and stakeholder management" },
    { icon: Lightbulb, text: "Resilience and continuous improvement" }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Purpose Card */}
      <Card className="border-2 border-blue-200 bg-blue-50/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600" />
            <CardTitle className="text-2xl text-blue-900">Assessment Purpose</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-700 leading-relaxed">
            To evaluate if you have the right <strong>mindset, skills, disposition, and career fit</strong> to pursue a role as a Scrum Master. This comprehensive assessment is designed from perspectives of engineering, psychology, design, coaching, and AI.
          </p>
        </CardContent>
      </Card>

      {/* What Does a Scrum Master Do */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">📘 What Does a Scrum Master Do?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Facilitates Agile Scrum teams, enabling efficient collaboration, removal of impediments, coaching in Scrum values, and ensuring smooth delivery cycles.
          </p>
          
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">💼 Typical Roles</h4>
            <div className="flex flex-wrap gap-2">
              {roles.map((role, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {role}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">✅ Traits That Drive Success</h4>
            <div className="grid md:grid-cols-2 gap-3">
              {traits.map((trait, index) => (
                <div key={index} className="flex items-center gap-2">
                  <trait.icon className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">{trait.text}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Structure */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">🔬 Assessment Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-purple-50 border border-purple-200">
              <div className="text-2xl mb-2">🧠</div>
              <h4 className="font-semibold text-purple-900">Psychometric</h4>
              <p className="text-sm text-purple-700">Personality traits & mindset alignment</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="text-2xl mb-2">⚙️</div>
              <h4 className="font-semibold text-green-900">Technical</h4>
              <p className="text-sm text-green-700">Process understanding & aptitude</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="text-2xl mb-2">📊</div>
              <h4 className="font-semibold text-orange-900">WISCAR</h4>
              <p className="text-sm text-orange-700">Comprehensive readiness framework</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Start Button */}
      <div className="text-center pt-6">
        <Button onClick={onNext} size="lg" className="px-8 py-4 text-lg">
          Start Assessment
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <p className="text-sm text-gray-500 mt-2">
          All responses are confidential and used only for your personalized assessment
        </p>
      </div>
    </div>
  );
};

export default AssessmentIntro;
