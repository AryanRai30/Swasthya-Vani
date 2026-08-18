import React, { useState, useEffect, useRef } from 'react';
import { 
  HeartHandshake, 
  Bot, 
  BookOpen, 
  Stethoscope, 
  AlertTriangle, 
  PhoneCall, 
  User, 
  LogOut, 
  Globe, 
  Menu, 
  X, 
  ShieldCheck, 
  ChevronDown, 
  Building2, 
  Activity, 
  HelpCircle, 
  Info 
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, UI_TRANSLATIONS } from '../data/translations';
import { UserProfile } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  user: UserProfile | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenEmergency: () => void;
  activeAlertsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedLanguage,
  setSelectedLanguage,
  user,
  onOpenAuth,
  onLogout,
  onOpenEmergency,
  activeAlertsCount
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const moreDropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];
  const t = UI_TRANSLATIONS[selectedLanguage] || UI_TRANSLATIONS['en'];

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(target)) {
        setIsMoreOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(target)) {
        setIsLangOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(target)) {
        setIsProfileOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMoreOpen(false);
        setIsLangOpen(false);
        setIsProfileOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMoreOpen(false);
    setIsLangOpen(false);
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  };

  const isMoreActive = ['health-alerts', 'facilities', 'admin'].includes(activeTab);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs w-full" id="main-header">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 w-full gap-2 sm:gap-4">
          
          {/* ========================================================= */}
          {/* ZONE 1: BRAND AREA (Isolated, shrink-0, dedicated width) */}
          {/* ========================================================= */}
          <div 
            className="flex items-center gap-3 shrink-0 pr-4 lg:pr-8 cursor-pointer select-none" 
            onClick={() => handleNavClick('home')}
            id="brand-logo-btn"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-700/15 ring-2 ring-teal-500/20 shrink-0">
              <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-black text-xl sm:text-2xl tracking-tight text-slate-900 leading-none">
                Swasthya<span className="text-teal-600">Vani</span>
              </span>
              <span className="text-[11px] font-medium text-slate-500 hidden sm:block leading-tight mt-1 truncate">
                Disease Awareness & Triage
              </span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* ZONE 2: PRIMARY NAVIGATION (Desktop xl: 1280px+) */}
          {/* Starts strictly after the brand area */}
          {/* ========================================================= */}
          <nav className="hidden xl:flex items-center justify-start gap-1 2xl:gap-2 flex-1" aria-label="Primary Navigation">
            
            {/* Home */}
            <button
              id="nav-link-home"
              onClick={() => handleNavClick('home')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm transition-all whitespace-nowrap ${
                activeTab === 'home'
                  ? 'text-teal-900 bg-teal-50/90 font-bold border border-teal-200/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 font-semibold'
              }`}
            >
              <HeartHandshake className={`w-4 h-4 shrink-0 ${activeTab === 'home' ? 'text-teal-600' : 'text-slate-400'}`} />
              <span>{selectedLanguage === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}</span>
            </button>

            {/* AI Assistant */}
            <button
              id="nav-link-chat"
              onClick={() => handleNavClick('chat')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm transition-all whitespace-nowrap ${
                activeTab === 'chat'
                  ? 'text-teal-900 bg-teal-50/90 font-bold border border-teal-200/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 font-semibold'
              }`}
            >
              <Bot className={`w-4 h-4 shrink-0 ${activeTab === 'chat' ? 'text-teal-600' : 'text-slate-400'}`} />
              <span>{t.askAi || 'AI Assistant'}</span>
              <span className="px-1.5 py-0.2 rounded-md text-[9px] font-black bg-teal-600 text-white">AI</span>
            </button>

            {/* Symptoms */}
            <button
              id="nav-link-symptoms"
              onClick={() => handleNavClick('symptom-checker')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm transition-all whitespace-nowrap ${
                activeTab === 'symptom-checker'
                  ? 'text-teal-900 bg-teal-50/90 font-bold border border-teal-200/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 font-semibold'
              }`}
            >
              <Stethoscope className={`w-4 h-4 shrink-0 ${activeTab === 'symptom-checker' ? 'text-teal-600' : 'text-slate-400'}`} />
              <span>{t.checkSymptoms || 'Symptoms'}</span>
            </button>

            {/* Diseases */}
            <button
              id="nav-link-diseases"
              onClick={() => handleNavClick('disease-library')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm transition-all whitespace-nowrap ${
                activeTab === 'disease-library'
                  ? 'text-teal-900 bg-teal-50/90 font-bold border border-teal-200/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 font-semibold'
              }`}
            >
              <BookOpen className={`w-4 h-4 shrink-0 ${activeTab === 'disease-library' ? 'text-teal-600' : 'text-slate-400'}`} />
              <span>{t.exploreDiseases || 'Diseases'}</span>
            </button>

            {/* More ▾ Dropdown */}
            <div className="relative" ref={moreDropdownRef}>
              <button
                id="nav-link-more"
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm transition-all whitespace-nowrap ${
                  isMoreActive || isMoreOpen
                    ? 'text-teal-900 bg-teal-50/90 font-bold border border-teal-200/80 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 font-semibold'
                }`}
                aria-expanded={isMoreOpen}
              >
                <span>More</span>
                {activeAlertsCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                )}
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMoreOpen && (
                <div 
                  className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                  id="more-dropdown-menu"
                >
                  <div className="px-3 py-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    Public Health Services
                  </div>
                  
                  {/* Health Alerts */}
                  <button
                    id="more-opt-alerts"
                    onClick={() => handleNavClick('health-alerts')}
                    className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between transition ${
                      activeTab === 'health-alerts' ? 'bg-teal-50 text-teal-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{t.healthAlerts || 'Health Alerts & IDSP'}</span>
                    </div>
                    {activeAlertsCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-white">
                        {activeAlertsCount}
                      </span>
                    )}
                  </button>

                  {/* Health Facilities */}
                  <button
                    id="more-opt-facilities"
                    onClick={() => handleNavClick('facilities')}
                    className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center gap-2.5 transition ${
                      activeTab === 'facilities' ? 'bg-teal-50 text-teal-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{t.healthFacilities || 'Govt Health Facilities (PHC/CHC)'}</span>
                  </button>

                  <div className="my-1.5 border-t border-slate-100" />
                  
                  <div className="px-3 py-1 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    Information & Resources
                  </div>

                  {/* About / How it works */}
                  <button
                    id="more-opt-about"
                    onClick={() => {
                      handleNavClick('home');
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition"
                  >
                    <Info className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>About / How It Works</span>
                  </button>

                  {/* Help & Protocol Guidance */}
                  <button
                    id="more-opt-help"
                    onClick={() => {
                      handleNavClick('home');
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition"
                  >
                    <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>ICMR & WHO Protocols / FAQ</span>
                  </button>
                </div>
              )}
            </div>

          </nav>

          {/* ========================================================= */}
          {/* TABLET INTERMEDIATE NAV (768px – 1279px) */}
          {/* Simplified to avoid overcrowding on laptops/tablets */}
          {/* ========================================================= */}
          <div className="hidden md:flex xl:hidden items-center gap-1.5 flex-1 justify-start">
            <button
              onClick={() => handleNavClick('chat')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === 'chat' ? 'text-teal-900 bg-teal-50 font-bold border border-teal-200' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-teal-600" />
              <span>AI Assistant</span>
            </button>

            <button
              onClick={() => handleNavClick('symptom-checker')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === 'symptom-checker' ? 'text-teal-900 bg-teal-50 font-bold border border-teal-200' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
              <span>Symptoms</span>
            </button>

            <button
              onClick={() => handleNavClick('disease-library')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === 'disease-library' ? 'text-teal-900 bg-teal-50 font-bold border border-teal-200' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-teal-600" />
              <span>Diseases</span>
            </button>
          </div>

          {/* ========================================================= */}
          {/* ZONE 3: UTILITY ACTIONS (Language, SOS 108, Profile) */}
          {/* ========================================================= */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                id="lang-selector-btn"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition"
                title="Change Platform Language"
                aria-expanded={isLangOpen}
              >
                <Globe className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span className="hidden sm:inline">{currentLang.nativeName}</span>
                <span className="sm:hidden">{currentLang.code.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
              </button>

              {isLangOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                  id="language-dropdown-menu"
                >
                  <div className="px-3 py-1 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    Select Language / भाषा
                  </div>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      id={`lang-opt-${lang.code}`}
                      onClick={() => {
                        setSelectedLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition ${
                        selectedLanguage === lang.code 
                          ? 'bg-teal-50 text-teal-900 font-bold' 
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.nativeName}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Compact Professional SOS 108 Button */}
            <button
              id="sos-emergency-btn"
              onClick={onOpenEmergency}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs transition shadow-xs active:scale-95 shrink-0"
              title="24x7 Emergency SOS (108 / 112 / 104)"
            >
              <PhoneCall className="w-3.5 h-3.5 shrink-0 animate-pulse" />
              <span className="tracking-wide">SOS 108</span>
            </button>

            {/* Profile Dropdown / Sign In (Desktop & Tablet) */}
            <div className="hidden sm:block relative" ref={profileDropdownRef}>
              {user ? (
                <div>
                  <button
                    id="user-profile-btn"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-left transition"
                    aria-expanded={isProfileOpen}
                    title="User Profile & Settings"
                  >
                    <div className="w-7 h-7 rounded-lg bg-teal-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <div className="hidden 2xl:block text-left">
                      <p className="text-xs font-bold text-slate-800 leading-none truncate max-w-[90px]">{user.name}</p>
                      <p className="text-[10px] text-teal-600 font-medium leading-none mt-0.5">{user.role}</p>
                    </div>
                    <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
                  </button>

                  {isProfileOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                      id="profile-dropdown-menu"
                    >
                      <div className="px-3.5 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900">{user.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                          {user.role} Privilege
                        </span>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            setActiveTab('home');
                          }}
                          className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                        >
                          <User className="w-4 h-4 text-slate-400" />
                          <span>My Profile</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            setActiveTab('symptom-checker');
                          }}
                          className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                        >
                          <Activity className="w-4 h-4 text-slate-400" />
                          <span>My Triage Activity</span>
                        </button>

                        {/* Admin Panel (ONLY for Administrators) */}
                        {user.role === 'ADMIN' && (
                          <button
                            id="profile-opt-admin"
                            onClick={() => {
                              handleNavClick('admin');
                            }}
                            className="w-full text-left px-3.5 py-2 text-xs text-teal-800 font-bold bg-teal-50/70 hover:bg-teal-50 flex items-center gap-2.5"
                          >
                            <ShieldCheck className="w-4 h-4 text-teal-600" />
                            <span>Surveillance Admin Panel</span>
                          </button>
                        )}
                      </div>

                      <div className="pt-1 border-t border-slate-100">
                        <button
                          id="profile-opt-logout"
                          onClick={() => {
                            setIsProfileOpen(false);
                            onLogout();
                          }}
                          className="w-full text-left px-3.5 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 font-semibold"
                        >
                          <LogOut className="w-4 h-4 text-rose-500" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  id="login-modal-btn"
                  onClick={onOpenAuth}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition shrink-0"
                >
                  <User className="w-3.5 h-3.5 shrink-0" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile & Tablet Hamburger Menu Button (xl:hidden) */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition shrink-0"
              aria-label="Toggle navigation drawer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>

        {/* ========================================================= */}
        {/* MOBILE & TABLET EXPANDABLE NAVIGATION DRAWER */}
        {/* ========================================================= */}
        {isMobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 py-4 space-y-4 animate-in fade-in slide-in-from-top-2" id="mobile-nav-menu">
            
            {/* Primary Nav List */}
            <div className="space-y-1">
              <div className="px-2 py-1 text-[11px] font-black text-slate-400 uppercase tracking-wider">
                Menu
              </div>

              <button
                onClick={() => handleNavClick('home')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition min-h-[44px] ${
                  activeTab === 'home' ? 'bg-teal-50 text-teal-900 ring-1 ring-teal-200' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <HeartHandshake className="w-5 h-5 text-teal-600" />
                  <span>Home</span>
                </div>
              </button>

              <button
                onClick={() => handleNavClick('chat')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition min-h-[44px] ${
                  activeTab === 'chat' ? 'bg-teal-50 text-teal-900 ring-1 ring-teal-200' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Bot className="w-5 h-5 text-teal-600" />
                  <span>AI Health Assistant</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-black bg-teal-600 text-white">AI</span>
              </button>

              <button
                onClick={() => handleNavClick('symptom-checker')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition min-h-[44px] ${
                  activeTab === 'symptom-checker' ? 'bg-teal-50 text-teal-900 ring-1 ring-teal-200' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Stethoscope className="w-5 h-5 text-teal-600" />
                  <span>Check Symptoms</span>
                </div>
              </button>

              <button
                onClick={() => handleNavClick('disease-library')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition min-h-[44px] ${
                  activeTab === 'disease-library' ? 'bg-teal-50 text-teal-900 ring-1 ring-teal-200' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-teal-600" />
                  <span>Disease Library (28+)</span>
                </div>
              </button>

              <button
                onClick={() => handleNavClick('health-alerts')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition min-h-[44px] ${
                  activeTab === 'health-alerts' ? 'bg-teal-50 text-teal-900 ring-1 ring-teal-200' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <span>Health Outbreak Alerts</span>
                </div>
                {activeAlertsCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-black bg-amber-500 text-white">
                    {activeAlertsCount} Live
                  </span>
                )}
              </button>

              <button
                onClick={() => handleNavClick('facilities')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition min-h-[44px] ${
                  activeTab === 'facilities' ? 'bg-teal-50 text-teal-900 ring-1 ring-teal-200' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-teal-600" />
                  <span>Health Facilities Locator</span>
                </div>
              </button>

              {user?.role === 'ADMIN' && (
                <button
                  onClick={() => handleNavClick('admin')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition min-h-[44px] ${
                    activeTab === 'admin' ? 'bg-teal-50 text-teal-900 ring-1 ring-teal-200' : 'text-teal-800 bg-teal-50/50 hover:bg-teal-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-teal-700" />
                    <span>Admin Surveillance Portal</span>
                  </div>
                </button>
              )}
            </div>

            {/* Mobile User Profile / Auth */}
            <div className="pt-3 border-t border-slate-100">
              {user ? (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{user.name}</p>
                      <p className="text-[11px] text-slate-500">{user.email}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800">
                      {user.role}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full py-2 rounded-xl bg-white hover:bg-rose-50 border border-slate-200 text-rose-600 text-xs font-bold flex items-center justify-center gap-2 transition"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition min-h-[44px]"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In / Create Account</span>
                </button>
              )}
            </div>

            {/* Mobile SOS Call Trigger */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenEmergency();
                }}
                className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm min-h-[44px]"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Emergency SOS (108 / 112 / 104)</span>
              </button>
            </div>

          </div>
        )}
      </div>
    </header>
  );
};
