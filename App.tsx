
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import Quiz from './components/Quiz';
import Home from './components/Home';
import ProfileView from './components/ProfileView';
import PremiumView from './components/PremiumView';
import EducationView from './components/EducationView';
import MaskAnalysisView from './components/MaskAnalysisView';
import SplashScreen from './components/SplashScreen';
import AuthView from './components/AuthView';
import RelationshipSelection from './components/RelationshipSelection';
import { geminiService } from './services/geminiService';
import { UserProfile, SubscriptionTier, RelationshipStatus } from './types';

export type View = 'home' | 'chat' | 'quiz' | 'premium' | 'profile' | 'user_profile' | 'education';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('home');
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Profile State with robust initialization
  const [profile, setProfile] = useState<UserProfile>(() => {
    const defaultProfile: UserProfile = {
      nickname: 'Delikanlı',
      avatarId: 'wolf',
      scores: [],
      tier: 'free',
      relationshipStatus: null,
      chatUsage: 0,
      analysisUsage: 0,
      violationCount: 0,
      isBanned: false
    };

    try {
      const saved = localStorage.getItem('mantor_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultProfile, ...parsed };
      }
    } catch (e) {
      console.error("Failed to load profile:", e);
    }
    return defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem('mantor_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    geminiService.initChat();
  }, []);

  const handleNav = (view: View) => {
    setCurrentView(view);
    setIsSidebarOpen(false);
  };

  const handleLogin = (nickname: string) => {
    setProfile(prev => ({ ...prev, nickname }));
    setIsAuthenticated(true);
  };

  const handleSelectRelationship = (status: RelationshipStatus) => {
    setProfile(prev => ({ ...prev, relationshipStatus: status }));
  };

  const handleUpgrade = (tier: SubscriptionTier) => {
    setProfile(prev => ({ ...prev, tier }));
    handleNav('home');
  };

  const incrementUsage = (type: 'chat' | 'analysis') => {
    setProfile(prev => ({
      ...prev,
      chatUsage: type === 'chat' ? prev.chatUsage + 1 : prev.chatUsage,
      analysisUsage: type === 'analysis' ? prev.analysisUsage + 1 : prev.analysisUsage
    }));
  };

  const handleViolation = () => {
    setProfile(prev => {
      const newCount = (prev.violationCount || 0) + 1;
      return {
        ...prev,
        violationCount: newCount,
        isBanned: newCount >= 3
      };
    });
  };

  if (isSplashVisible) {
    return <SplashScreen onFinish={() => setIsSplashVisible(false)} />;
  }

  if (!isAuthenticated) {
    return <AuthView onLogin={handleLogin} />;
  }

  if (!profile.relationshipStatus) {
    return <RelationshipSelection onSelect={handleSelectRelationship} />;
  }

  return (
    <div className="flex flex-col h-screen bg-[#000000] text-slate-200 overflow-hidden selection:bg-amber-500/30">
      <Header 
        onMenuClick={() => setIsSidebarOpen(true)} 
        onLogoClick={() => setCurrentView('home')}
        onChatClick={() => handleNav('chat')}
      />
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNav={handleNav}
        currentView={currentView}
        profile={profile}
      />
      
      <main className="flex-1 flex overflow-hidden justify-center relative">
        <div className="flex-1 flex flex-col min-w-0 max-w-5xl w-full h-full">
          {currentView === 'home' && <Home onNav={handleNav} />}
          {currentView === 'chat' && (
            <ChatInterface 
              profile={profile} 
              onIncrementUsage={() => incrementUsage('chat')}
              onUpgradeRequest={() => handleNav('premium')}
              onViolation={handleViolation}
            />
          )}
          
          {currentView === 'quiz' && (
            <Quiz 
              onBack={() => setCurrentView('home')} 
              onComplete={(s) => setProfile(prev => ({...prev, scores: [...prev.scores, {type: 'shit_test', score: s, date: new Date().toLocaleDateString()}]}))} 
            />
          )}

          {currentView === 'user_profile' && (
            <ProfileView 
              profile={profile} 
              onUpdate={setProfile} 
              onBack={() => setCurrentView('home')} 
            />
          )}

          {currentView === 'premium' && (
            <PremiumView 
              onBack={() => setCurrentView('home')} 
              onUpgrade={handleUpgrade}
              currentTier={profile.tier}
            />
          )}

          {currentView === 'education' && (
            <EducationView onBack={() => setCurrentView('home')} />
          )}
          
          {currentView === 'profile' && (
            <MaskAnalysisView 
              profile={profile}
              onIncrementUsage={() => incrementUsage('analysis')}
              onUpgradeRequest={() => handleNav('premium')}
              onBack={() => setCurrentView('home')} 
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
