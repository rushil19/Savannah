/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  CheckCircle2, 
  ChevronRight, 
  PlayCircle, 
  User, 
  Phone, 
  Mail, 
  Building2, 
  ArrowRight,
  Trophy,
  AlertCircle,
  Check,
  Send
} from 'lucide-react';
import { MODULES, QuestionType, UserData, QuizResult, Question } from './constants';

// --- Types ---
type AppStep = 'registration' | 'module-intro' | 'video' | 'quiz' | 'result' | 'final-summary';

// --- Components ---

const Header = () => (
  <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-50 flex items-center px-6">
    <h1 className="text-2xl font-bold tracking-tighter text-orange-600">Savannah</h1>
  </header>
);

const ProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="fixed top-16 left-0 right-0 h-1 bg-gray-100 z-40">
    <motion.div 
      className="h-full bg-orange-500"
      initial={{ width: 0 }}
      animate={{ width: `${(current / total) * 100}%` }}
      transition={{ duration: 0.5 }}
    />
  </div>
);

const RegistrationView = ({ onRegister }: { onRegister: (data: UserData) => void }) => {
  const [form, setForm] = useState<UserData>({ name: '', phone: '', email: '', organization: '' });
  const isValid = form.name && form.phone && form.organization;

  return (
    <div className="flex flex-col gap-8 max-w-md mx-auto py-12 px-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Welcome to Savannah</h2>
        <p className="text-gray-500">Please register to start your job readiness journey.</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Full Name (Required)" 
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
          />
        </div>
        <div className="relative">
          <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <input 
            type="tel" 
            placeholder="Phone Number (Required)" 
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            value={form.phone}
            onChange={e => setForm({...form, phone: e.target.value})}
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <input 
            type="email" 
            placeholder="Email (Optional)" 
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
          />
        </div>
        <div className="relative">
          <Building2 className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Organization / Orphanage (Required)" 
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            value={form.organization}
            onChange={e => setForm({...form, organization: e.target.value})}
          />
        </div>
      </div>

      <button 
        disabled={!isValid}
        onClick={() => onRegister(form)}
        className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${isValid ? 'bg-orange-600 hover:bg-orange-700 shadow-lg' : 'bg-gray-300 cursor-not-allowed'}`}
      >
        Start Training <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
};

const ModuleIntroView = ({ 
  currentModuleIndex, 
  totalModules, 
  title, 
  onStart 
}: { 
  currentModuleIndex: number; 
  totalModules: number; 
  title: string; 
  onStart: () => void 
}) => (
  <div className="flex flex-col items-center justify-center gap-8 py-12 px-6 text-center max-w-md mx-auto h-[calc(100vh-80px)]">
    <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
      <BookOpen className="h-10 w-10 text-orange-600" />
    </div>
    <div className="space-y-4">
      <p className="text-orange-600 font-bold uppercase tracking-widest text-sm">Module {currentModuleIndex + 1} of {totalModules}</p>
      <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
      <p className="text-gray-500">Watch the video carefully before starting the quiz.</p>
    </div>
    <button 
      onClick={onStart}
      className="w-full py-4 bg-orange-600 text-white rounded-xl font-bold shadow-lg hover:bg-orange-700 transition-all flex items-center justify-center gap-2"
    >
      Watch Video <PlayCircle className="h-5 w-5" />
    </button>
  </div>
);

const VideoView = ({ 
  title, 
  videoUrl, 
  onStartQuiz 
}: { 
  title: string; 
  videoUrl: string; 
  onStartQuiz: () => void 
}) => (
  <div className="flex flex-col gap-6 py-8 px-4 max-w-4xl mx-auto">
    <h2 className="text-2xl font-bold text-gray-900 px-2">{title}</h2>
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
      <iframe 
        src={videoUrl} 
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
      />
    </div>
    <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 space-y-4">
      <h3 className="font-bold text-orange-900 flex items-center gap-2">
        <AlertCircle className="h-5 w-5" /> Learning Tip
      </h3>
      <p className="text-orange-800 text-sm leading-relaxed">
        Pay close attention to the key concepts mentioned in the video. You can re-watch any part if you need to. Once you're ready, click the button below to start the assessment.
      </p>
    </div>
    <button 
      onClick={onStartQuiz}
      className="w-full py-4 bg-orange-600 text-white rounded-xl font-bold shadow-lg hover:bg-orange-700 transition-all flex items-center justify-center gap-2"
    >
      Start Quiz <ChevronRight className="h-5 w-5" />
    </button>
  </div>
);

const QuizView = ({ 
  currentQuestion, 
  currentQuestionIndex, 
  totalQuestions, 
  currentAnswer, 
  onAnswer, 
  onNext 
}: { 
  currentQuestion: Question; 
  currentQuestionIndex: number; 
  totalQuestions: number; 
  currentAnswer: string | undefined; 
  onAnswer: (answer: string) => void; 
  onNext: () => void 
}) => {
  const isAnswered = currentAnswer !== undefined;

  return (
    <div className="flex flex-col gap-8 py-8 px-6 max-w-md mx-auto">
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-orange-600 uppercase tracking-tighter">Question {currentQuestionIndex + 1} / {totalQuestions}</span>
        <div className="flex gap-1">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div key={i} className={`h-1.5 w-4 rounded-full ${i <= currentQuestionIndex ? 'bg-orange-500' : 'bg-gray-200'}`} />
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 leading-tight">{currentQuestion.question}</h2>

      <div className="space-y-3">
        {currentQuestion.type === QuestionType.TEXT ? (
          <textarea 
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none min-h-[150px]"
            placeholder="Write your answer here..."
            value={currentAnswer || ''}
            onChange={e => onAnswer(e.target.value)}
          />
        ) : (
          currentQuestion.options?.map((option, i) => (
            <button
              key={i}
              onClick={() => onAnswer(option)}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all flex items-center justify-between gap-3 ${
                currentAnswer === option 
                ? 'border-orange-500 bg-orange-50 text-orange-900 font-medium' 
                : 'border-gray-100 bg-white hover:border-gray-200 text-gray-700'
              }`}
            >
              <span>{option}</span>
              {currentAnswer === option && <CheckCircle2 className="h-5 w-5 text-orange-500 shrink-0" />}
            </button>
          ))
        )}
      </div>

      <button 
        disabled={!isAnswered}
        onClick={onNext}
        className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${isAnswered ? 'bg-orange-600 hover:bg-orange-700 shadow-lg' : 'bg-gray-300 cursor-not-allowed'}`}
      >
        {currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'} <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

const ResultView = ({ 
  title, 
  score, 
  totalMCQs, 
  onNext, 
  isLastModule 
}: { 
  title: string; 
  score: number; 
  totalMCQs: number; 
  onNext: () => void; 
  isLastModule: boolean 
}) => {
  const percentage = (score / totalMCQs) * 100;

  const getFeedback = () => {
    if (percentage >= 80) return { text: 'Strong Understanding', color: 'text-green-600', bg: 'bg-green-50' };
    if (percentage >= 50) return { text: 'Good Progress', color: 'text-blue-600', bg: 'bg-blue-50' };
    return { text: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const feedback = getFeedback();

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12 px-6 text-center max-w-md mx-auto h-[calc(100vh-80px)]">
      <div className={`w-24 h-24 rounded-full flex items-center justify-center ${feedback.bg}`}>
        <Trophy className={`h-12 w-12 ${feedback.color}`} />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Module Complete!</h2>
        <p className="text-gray-500">You've finished the assessment for {title}.</p>
      </div>
      
      <div className="w-full bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-1">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Your Score</p>
        <p className={`text-5xl font-black ${feedback.color}`}>{score} / {totalMCQs}</p>
        <p className={`font-bold ${feedback.color}`}>{feedback.text}</p>
      </div>

      <button 
        onClick={onNext}
        className="w-full py-4 bg-orange-600 text-white rounded-xl font-bold shadow-lg hover:bg-orange-700 transition-all flex items-center justify-center gap-2"
      >
        {isLastModule ? 'View Final Summary' : 'Next Module'} <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

const FinalSummaryView = ({ 
  moduleScores, 
  onSubmit, 
  isSubmitting, 
  submissionStatus 
}: { 
  moduleScores: Record<string, number>; 
  onSubmit: () => void; 
  isSubmitting: boolean; 
  submissionStatus: 'idle' | 'success' | 'error' 
}) => {
  const totalScore = Object.values(moduleScores).reduce((a: number, b: number) => a + b, 0);
  const totalMCQs = MODULES.reduce((acc, m) => acc + m.questions.filter(q => q.type !== QuestionType.TEXT).length, 0);

  return (
    <div className="flex flex-col gap-8 py-12 px-6 max-w-md mx-auto">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900">Congratulations!</h2>
        <p className="text-gray-500">You have completed all modules in the Savannah Job Readiness Program.</p>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-gray-900 text-lg">Program Summary</h3>
        <div className="grid grid-cols-1 gap-3">
          {MODULES.map(m => {
            const score = moduleScores[m.id] || 0;
            const mcqs = m.questions.filter(q => q.type !== QuestionType.TEXT).length;
            return (
              <div key={m.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <span className="font-medium text-gray-700">{m.title}</span>
                <span className="font-bold text-orange-600">{score} / {mcqs}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-orange-600 p-6 rounded-2xl text-white text-center space-y-1 shadow-xl">
        <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Total Program Score</p>
        <p className="text-5xl font-black">{totalScore} / {totalMCQs}</p>
      </div>

      {submissionStatus === 'idle' ? (
        <button 
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all bg-gray-900 hover:bg-black shadow-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Final Results'} <Send className="h-5 w-5" />
        </button>
      ) : submissionStatus === 'success' ? (
        <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-green-700 text-center font-medium flex items-center justify-center gap-2">
          <CheckCircle2 className="h-5 w-5" /> Results submitted successfully!
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-center font-medium flex items-center justify-center gap-2">
            <AlertCircle className="h-5 w-5" /> Error submitting results.
          </div>
          <button 
            onClick={onSubmit}
            className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold shadow-lg hover:bg-black transition-all"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState<AppStep>('registration');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [moduleScores, setModuleScores] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const currentModule = MODULES[currentModuleIndex];
  const currentQuestion = currentModule?.questions[currentQuestionIndex];

  // --- Handlers ---

  const handleRegistration = (data: UserData) => {
    setUserData(data);
    setStep('module-intro');
  };

  const startModule = () => {
    setStep('video');
  };

  const startQuiz = () => {
    setStep('quiz');
    setCurrentQuestionIndex(0);
  };

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentModule.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateModuleScore();
      setStep('result');
    }
  };

  const calculateModuleScore = () => {
    let score = 0;
    currentModule.questions.forEach(q => {
      if (q.type !== QuestionType.TEXT && answers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    setModuleScores(prev => ({ ...prev, [currentModule.id]: score }));
  };

  const nextModule = () => {
    if (currentModuleIndex < MODULES.length - 1) {
      setCurrentModuleIndex(prev => prev + 1);
      setStep('module-intro');
    } else {
      setStep('final-summary');
    }
  };

const submitData = async () => {
    setIsSubmitting(true);
    
    // This gathers written text responses that aren't part of the MCQ score
    const textResponses: Record<string, string> = {};
    MODULES.forEach(m => {
      m.questions.forEach(q => {
        if (q.type === QuestionType.TEXT) {
          textResponses[q.id] = answers[q.id] || '';
        }
      });
    });

    try {
      const scriptURL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;
      
      if (!scriptURL) {
        throw new Error('Submission URL not configured in Vercel');
      }

      const payload = {
        user: userData,
        moduleScores,
        answers,
        textResponses,
        timestamp: new Date().toISOString()
      };

      const finalURL = `${scriptURL}?data=${encodeURIComponent(JSON.stringify(payload))}`;

      await fetch(finalURL, {
        mode: 'no-cors',
        method: 'GET'
      });

      setSubmissionStatus('success');
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pt-16">
      <Header />
      {step !== 'registration' && (
        <ProgressBar 
          current={currentModuleIndex + (step === 'final-summary' ? 1 : 0)} 
          total={MODULES.length} 
        />
      )}

      <main className="pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={step + (currentModule?.id || '') + currentQuestionIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {step === 'registration' && (
              <RegistrationView onRegister={handleRegistration} />
            )}
            {step === 'module-intro' && (
              <ModuleIntroView 
                currentModuleIndex={currentModuleIndex}
                totalModules={MODULES.length}
                title={currentModule.title}
                onStart={startModule}
              />
            )}
            {step === 'video' && (
              <VideoView 
                title={currentModule.title}
                videoUrl={currentModule.videoUrl}
                onStartQuiz={startQuiz}
              />
            )}
            {step === 'quiz' && (
              <QuizView 
                currentQuestion={currentQuestion}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={currentModule.questions.length}
                currentAnswer={answers[currentQuestion.id]}
                onAnswer={handleAnswer}
                onNext={nextQuestion}
              />
            )}
            {step === 'result' && (
              <ResultView 
                title={currentModule.title}
                score={moduleScores[currentModule.id] || 0}
                totalMCQs={currentModule.questions.filter(q => q.type !== QuestionType.TEXT).length}
                onNext={nextModule}
                isLastModule={currentModuleIndex === MODULES.length - 1}
              />
            )}
            {step === 'final-summary' && (
              <FinalSummaryView 
                moduleScores={moduleScores}
                onSubmit={submitData}
                isSubmitting={isSubmitting}
                submissionStatus={submissionStatus}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
