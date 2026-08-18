import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Bot, 
  BookOpen, 
  Stethoscope, 
  AlertTriangle, 
  ShieldAlert, 
  PhoneCall, 
  User, 
  LogOut, 
  Globe, 
  Menu, 
  X, 
  ShieldCheck,
  ChevronDown,
  Building2
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
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];
  const t = UI_TRANSLATIONS[selectedLanguage] || UI_TRANSLATIONS['en'];

  const navItems = [
    { id: 'home', label: selectedLanguage === 'hi' ? 'मुख्य पृष्ठ' : 'Home', icon: HeartHandshake },
    { id: 'chat', label: t.askAi || 'AI Health Assistant', icon: Bot, badge: 'AI' },
    { id: 'symptom-checker', label: t.checkSymptoms || 'Symptom Checker', icon: Stethoscope },
    { id: 'disease-library', label: t.exploreDiseases || 'Disease Library', icon: BookOpen },
    { id: 'health-alerts', label: t.healthAlerts || 'Health Alerts', icon: AlertTriangle, badgeCount: activeAlertsCount },
    { id: 'facilities', label: t.healthFacilities || 'Health Facilities', icon: Building2 },
    { id: 'admin', label: t.adminDashboard || 'Admin Portal', icon: ShieldCheck, badge: 'Nodal' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs" id="main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none" 
            onClick={() => handleNavClick('home')}
            id="brand-logo-btn"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-teal-700/20 ring-2 ring-teal-500/20">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900">
                  Swasthya<span className="text-teal-600">Vani</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-200 uppercase tracking-wider">
                  Public Health AI
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 hidden md:block">
                AI Public Health & Disease Awareness Platform
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'text-teal-700 bg-teal-50/80 font-semibold shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  
                  {item.badge && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-teal-600 text-white leading-tight">
                      {item.badge}
                    </span>
                  )}

                  {item.badgeCount !== undefined && item.badgeCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-white animate-pulse">
                      {item.badgeCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Selector */}
            <div className="relative">
              <button
                id="lang-selector-btn"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 transition"
                title="Select Preferred Language"
              >
                <Globe className="w-3.5 h-3.5 text-teal-600" />
                <span className="hidden sm:inline">{currentLang.nativeName}</span>
                <span className="sm:hidden">{currentLang.code.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isLangDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2"
                  id="language-dropdown-menu"
                >
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Language / भाषा चुनें
                  </div>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      id={`lang-opt-${lang.code}`}
                      onClick={() => {
                        setSelectedLanguage(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition ${
                        selectedLanguage === lang.code 
                          ? 'bg-teal-50 text-teal-800 font-semibold' 
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.nativeName}</span>
                      </span>
                      <span className="text-[10px] text-slate-400">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Emergency SOS Button */}
            <button
              id="sos-emergency-btn"
              onClick={onOpenEmergency}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition shadow-sm hover:shadow-rose-600/20 active:scale-95 animate-subtle"
              title="24x7 National Emergency & Health Helplines"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">SOS 108</span>
              <span className="sm:hidden">108</span>
            </button>

            {/* User Auth Profile */}
            {user ? (
              <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-slate-200">
                <button
                  id="user-profile-btn"
                  onClick={() => handleNavClick(user.role === 'ADMIN' ? 'admin' : 'home')}
                  className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 text-left transition"
                  title={`Logged in as ${user.name} (${user.role})`}
                >
                  <div className="w-8 h-8 rounded-full bg-teal-100 border border-teal-300 text-teal-800 font-bold text-xs flex items-center justify-center">
                    {user.name.charAt(0)}
                  </div>
                  <div className="hidden xl:block">
                    <p className="text-xs font-semibold text-slate-800 leading-tight truncate max-w-[100px]">{user.name}</p>
                    <p className="text-[10px] font-medium text-teal-600">{user.role}</p>
                  </div>
                </button>
                <button
                  id="logout-btn"
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  title="Log Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="login-modal-btn"
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-3 space-y-1 animate-in slide-in-from-top-2" id="mobile-nav-menu">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive 
                      ? 'bg-teal-50 text-teal-800 font-semibold' 
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badgeCount !== undefined && item.badgeCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-white">
                      {item.badgeCount} Alerts
                    </span>
                  )}
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-teal-600 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
