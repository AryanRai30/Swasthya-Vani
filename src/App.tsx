/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EmergencyModal } from './components/EmergencyModal';
import { AuthModal } from './components/AuthModal';
import { HomeSection } from './components/HomeSection';
import { ChatbotSection } from './components/ChatbotSection';
import { DiseaseLibrarySection } from './components/DiseaseLibrarySection';
import { SymptomCheckerSection } from './components/SymptomCheckerSection';
import { HealthAlertsSection } from './components/HealthAlertsSection';
import { HealthFacilitiesSection } from './components/HealthFacilitiesSection';
import { AdminSection } from './components/AdminSection';
import { INITIAL_HEALTH_ALERTS } from './data/healthAlerts';
import { HealthAlert, UserProfile } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [user, setUser] = useState<UserProfile | null>({
    id: 'guest-1',
    name: 'Community Citizen',
    email: 'citizen@swasthyavani.in',
    role: 'USER',
    preferredLanguage: 'en',
    bookmarkedDiseaseIds: ['dengue', 'malaria'],
    savedAssessmentsCount: 1
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [alerts, setAlerts] = useState<HealthAlert[]>(INITIAL_HEALTH_ALERTS);
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string | null>(null);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string>('');
  const [bookmarkedDiseaseIds, setBookmarkedDiseaseIds] = useState<string[]>(['dengue', 'malaria']);

  const handleAskAi = (prompt: string) => {
    setChatInitialPrompt(prompt);
    setActiveTab('chat');
  };

  const handleSelectDisease = (diseaseId: string) => {
    setSelectedDiseaseId(diseaseId);
    setActiveTab('disease-library');
  };

  const handleToggleBookmark = (id: string) => {
    if (bookmarkedDiseaseIds.includes(id)) {
      setBookmarkedDiseaseIds(bookmarkedDiseaseIds.filter(b => b !== id));
    } else {
      setBookmarkedDiseaseIds([...bookmarkedDiseaseIds, id]);
    }
  };

  const handleAddAlert = (newAlert: HealthAlert) => {
    setAlerts([newAlert, ...alerts]);
  };

  const handleToggleAlertStatus = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const handleLogout = () => {
    setUser(null);
    if (activeTab === 'admin') {
      setActiveTab('home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60 text-slate-900 font-sans antialiased selection:bg-teal-500 selection:text-white" id="app-root">
      
      {/* Global Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenEmergency={() => setIsEmergencyModalOpen(true)}
        activeAlertsCount={alerts.filter(a => a.active).length}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeSection
            setActiveTab={setActiveTab}
            onOpenEmergency={() => setIsEmergencyModalOpen(true)}
            onSelectDisease={handleSelectDisease}
            alerts={alerts}
          />
        )}

        {activeTab === 'chat' && (
          <ChatbotSection
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            initialPrompt={chatInitialPrompt}
            onClearInitialPrompt={() => setChatInitialPrompt('')}
          />
        )}

        {activeTab === 'symptom-checker' && (
          <SymptomCheckerSection
            onTransferToChat={handleAskAi}
            onOpenEmergency={() => setIsEmergencyModalOpen(true)}
          />
        )}

        {activeTab === 'disease-library' && (
          <DiseaseLibrarySection
            selectedDiseaseId={selectedDiseaseId}
            onAskAi={handleAskAi}
            bookmarkedIds={bookmarkedDiseaseIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeTab === 'health-alerts' && (
          <HealthAlertsSection
            alerts={alerts}
            onSelectDiseaseTab={() => setActiveTab('disease-library')}
          />
        )}

        {activeTab === 'facilities' && (
          <HealthFacilitiesSection
            onAskAi={handleAskAi}
            onOpenEmergency={() => setIsEmergencyModalOpen(true)}
          />
        )}

        {activeTab === 'admin' && (
          <AdminSection
            alerts={alerts}
            user={user}
            onAddAlert={handleAddAlert}
            onToggleAlertStatus={handleToggleAlertStatus}
            onSwitchToAdmin={() => {
              setUser({
                id: 'admin-1',
                name: 'Dr. Rajesh Sharma (IDSP Epidemiologist)',
                email: 'rajesh.sharma@nhm.gov.in',
                role: 'ADMIN',
                preferredLanguage: 'en',
                bookmarkedDiseaseIds: [],
                savedAssessmentsCount: 12
              });
            }}
            onReturnHome={() => setActiveTab('home')}
          />
        )}
      </main>

      {/* Global Footer with Medical Disclaimer & Partner Authorities */}
      <Footer
        onOpenEmergency={() => setIsEmergencyModalOpen(true)}
        setActiveTab={setActiveTab}
      />

      {/* 24x7 Emergency Helplines SOS Modal */}
      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(loggedUser) => {
          setUser(loggedUser);
          if (loggedUser.role === 'ADMIN') {
            setActiveTab('admin');
          }
        }}
      />

    </div>
  );
}
