/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import { 
  Search, 
  ChevronRight, 
  Menu, 
  Moon, 
  Sun, 
  BookOpen, 
  Droplets, 
  HardHat, 
  Sprout, 
  CloudLightning,
  Filter,
  X,
  ArrowRight,
  Sparkles,
  Languages,
  FileText,
  Download,
  Upload,
  ExternalLink,
  ChevronDown,
  HelpCircle,
  Mail,
  User,
  Send,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DATA, MasterCategory, SubCategory, Work } from "./data";
import { translations, Language } from "./translations";
import { FAQ_DATA } from "./faqData";
import { incrementVisitorCount } from "./lib/firebase";
import bannerImg from "./assets/images/vb_gram_g_banner_1779003862167.png";
import logoImg from "./assets/images/vision_prototype_logo_1779004228627.png";

const getSubCategoryNumber = (subName: string, fallbackIdx: number) => {
  const match = subName.match(/^(\d+)\)\./);
  return match ? match[1] : (fallbackIdx + 1).toString();
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MasterCategory | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isGlobalSearch, setIsGlobalSearch] = useState(false);
  const [activeWorkDetail, setActiveWorkDetail] = useState<(Work & { subName?: string; catName?: string; catId?: string }) | null>(null);
  const [showAIOverview, setShowAIOverview] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [lang, setLang] = useState<Language>('en');
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    // Increment and fetch real visitor count from Firestore
    const updateCounter = async () => {
      const count = await incrementVisitorCount();
      if (count > 0) {
        setVisitorCount(count);
      }
    };
    updateCounter();
  }, []);

  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const t = translations[lang];

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackStatus('submitting');
    
    // Simulate API call and open mailto
    setTimeout(() => {
      const subject = encodeURIComponent(`VB-G RAM G Feedback from ${feedbackName}`);
      const body = encodeURIComponent(`${feedbackMessage}\n\nFrom: ${feedbackName}\nEmail: ${feedbackEmail}`);
      window.location.href = `mailto:visprotocol@gmail.com?subject=${subject}&body=${body}`;
      
      setFeedbackStatus('success');
      setTimeout(() => {
        setShowFeedback(false);
        setFeedbackStatus('idle');
        setFeedbackName("");
        setFeedbackEmail("");
        setFeedbackMessage("");
      }, 2000);
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadStatus('uploading');
      // Simulate upload
      setTimeout(() => {
        setUploadStatus('success');
        setTimeout(() => setUploadStatus('idle'), 3000);
      }, 2000);
    }
  };

  // Initialize with the first category and subcategory
  useEffect(() => {
    if (DATA.length > 0) {
      setSelectedCategory(DATA[0]);
      if (DATA[0].subCategories.length > 0) {
        setSelectedSubCategory(DATA[0].subCategories[0]);
      }
    }
  }, []);

  const handleCategoryChange = (category: MasterCategory) => {
    setSelectedCategory(category);
    setSelectedSubCategory(category.subCategories[0] || null);
    setSearchQuery("");
    setIsGlobalSearch(false);
  };

  const filteredWorks = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (isGlobalSearch) {
      if (!query) return [];
      const results: (Work & { subName: string; catId: string; fullCode: string })[] = [];
      
      DATA.forEach((cat, cIdx) => {
        cat.subCategories.forEach((sub, sIdx) => {
          const subNum = getSubCategoryNumber(sub.name, sIdx);
          sub.works.forEach((work, wIdx) => {
            const fullCode = `${cIdx + 1}.${subNum}.${work.id}`;
            if (
              work.name.toLowerCase().includes(query) || 
              work.id.toString() === query ||
              fullCode.includes(query)
            ) {
              results.push({ ...work, subName: sub.name, catId: cat.id, fullCode });
            }
          });
        });
      });
      return results;
    }

    if (!selectedSubCategory) return [];
    if (!query) return selectedSubCategory.works;
    
    const catIdx = selectedCategory ? DATA.findIndex(c => c.id === selectedCategory.id) + 1 : 0;
    const subIdx = selectedCategory ? selectedCategory.subCategories.findIndex(s => s.id === selectedSubCategory.id) : 0;
    const subNum = getSubCategoryNumber(selectedSubCategory.name, subIdx);

    return selectedSubCategory.works.filter(work => {
      const fullCode = `${catIdx}.${subNum}.${work.id}`;
      return (
        work.name.toLowerCase().includes(query) || 
        work.id.toString() === query ||
        fullCode.includes(query)
      );
    });
  }, [selectedSubCategory, selectedCategory, searchQuery, isGlobalSearch]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getCategoryIcon = (id: string) => {
    switch(id) {
      case "cat1": return <Droplets className="w-5 h-5" />;
      case "cat2": return <HardHat className="w-5 h-5" />;
      case "cat3": return <Sprout className="w-5 h-5" />;
      case "cat4": return <CloudLightning className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const getSubCategoryLabel = () => {
    if (!selectedCategory || !selectedSubCategory) return "";
    const catIdx = DATA.findIndex(c => c.id === selectedCategory.id) + 1;
    const subIdx = selectedCategory.subCategories.findIndex(s => s.id === selectedSubCategory.id);
    const subNum = getSubCategoryNumber(selectedSubCategory.name, subIdx);
    return `${catIdx}.${subNum}`;
  };

  const getWorkFullCode = (workId: number) => {
    for (let cIdx = 0; cIdx < DATA.length; cIdx++) {
      const cat = DATA[cIdx];
      for (let sIdx = 0; sIdx < cat.subCategories.length; sIdx++) {
        const sub = cat.subCategories[sIdx];
        const work = sub.works.find(w => w.id === workId);
        if (work) {
          const subNum = getSubCategoryNumber(sub.name, sIdx);
          return `${cIdx + 1}.${subNum}.${work.id}`;
        }
      }
    }
    return "";
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-white text-zinc-900'} font-sans`}>
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between font-sans">
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
            <div className="bg-emerald-600 p-1 sm:p-2 rounded-lg sm:rounded-xl text-white shadow-lg shadow-emerald-600/20 shrink-0">
              <BookOpen className="w-4 h-4 sm:w-6 h-6" />
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-xs sm:text-lg leading-tight tracking-tight text-zinc-900 dark:text-zinc-100 truncate sm:whitespace-normal uppercase">{t.appTitle}</h1>
              <p className="text-[7px] sm:text-[10px] uppercase font-black tracking-widest text-zinc-600 dark:text-zinc-500 truncate">{t.appSubtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <div className="relative group">
              <button 
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 transition-all cursor-pointer active:scale-95"
              >
                <Languages className="w-3.5 h-3.5 sm:w-4 h-4" />
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">{lang}</span>
                <ChevronDown className={`w-2.5 h-2.5 sm:w-3 h-3 text-zinc-400 transition-transform ${showLangMenu ? 'rotate-180 text-emerald-500' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showLangMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowLangMenu(false)} 
                    />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl py-2 z-20"
                    >
                      {(['en', 'as', 'hi'] as const).map(l => (
                        <button 
                          key={l}
                          onClick={() => {
                            setLang(l);
                            setShowLangMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 transition-colors ${lang === l ? 'text-emerald-600 bg-emerald-50/50 dark:bg-emerald-900/20' : 'text-zinc-600 dark:text-zinc-400'}`}
                        >
                          {l === 'en' ? 'English' : l === 'as' ? 'অসমীয়া' : 'हिन्दी'}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setShowResources(true)}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-all active:scale-95 shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 sm:w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider hidden lg:inline">{t.resources}</span>
            </button>

            <button
              onClick={() => setShowAIOverview(true)}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all active:scale-95 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">{t.overview}</span>
            </button>
            <button
              onClick={toggleDarkMode}
              id="theme-toggle"
              className="p-1.5 sm:p-2.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors border border-transparent active:border-zinc-200 dark:active:border-zinc-800"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 h-5 text-amber-400" /> : <Moon className="w-4 h-4 sm:w-5 h-5 text-zinc-900" />}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Visitor Counter */}
        <AnimatePresence>
          {visitorCount !== null && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex justify-center sm:justify-end"
            >
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm group hover:border-emerald-500/30 transition-all">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">{t.visitorCounter}</span>
                <div className="h-3 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-1" />
                <span className="text-xs font-black text-zinc-900 dark:text-zinc-100 font-mono tabular-nums tracking-tighter">
                  {visitorCount.toLocaleString()}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Banner Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-center"
        >
          <div className="w-full max-w-4xl overflow-hidden rounded-[2.5rem] shadow-2xl shadow-orange-500/10 border-4 border-white dark:border-zinc-900 bg-gradient-to-r from-orange-500 to-red-600 aspect-[21/9] flex items-center justify-center">
            <img 
              src={bannerImg} 
              alt="Viksit Bharat G RAM G Bill 2025 Banner"
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
              onLoad={(e) => (e.currentTarget.parentElement!.style.aspectRatio = "auto")}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar: Categories */}
          <div className="lg:col-span-3 space-y-6">
            <section id="categories-section">
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-500 mb-4 px-2">{t.masterCategories}</h2>
              <div className="space-y-1">
                {DATA.map((cat, index) => (
                  <button
                    key={cat.id}
                    id={`cat-btn-${cat.id}`}
                    onClick={() => handleCategoryChange(cat)}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 border border-transparent ${
                      selectedCategory?.id === cat.id 
                        ? 'bg-emerald-100/50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-400 font-bold shadow-sm border-emerald-200/50 dark:border-emerald-900/40'
                        : 'bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-400 font-bold shadow-sm border-zinc-100 dark:border-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg transition-colors ${selectedCategory?.id === cat.id ? 'bg-emerald-100 dark:bg-emerald-900/50' : 'bg-zinc-100 dark:bg-zinc-800'}`}>
                        {getCategoryIcon(cat.id)}
                      </div>
                      <span className="text-sm line-clamp-1">
                        {index + 1} : {cat.name.split('-')[1].trim()}
                      </span>
                    </div>
                    {selectedCategory?.id === cat.id && (
                      <motion.div layoutId="active-indicator">
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Selected Stats or Info */}
            <section className="hidden lg:block">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <h3 className="font-bold text-zinc-400 text-xs mb-3 flex items-center gap-2">
                  <Filter className="w-3 h-3" /> {t.quickInfo}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t.totalWorks}: <strong className="text-emerald-800">318</strong>.
                </p>
                <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-medium text-zinc-500">
                  <span>{t.masterCategories}</span>
                  <span className="text-zinc-900 dark:text-zinc-100">4</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs font-medium text-zinc-500">
                  <span>{t.subCategories}</span>
                  <span className="text-zinc-900 dark:text-zinc-100">29</span>
                </div>
              </div>
            </section>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* FAQ Link */}
            <div className="flex justify-end">
              <button 
                onClick={() => setShowFAQ(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-emerald-500/50 hover:bg-emerald-50/10 transition-all text-xs font-bold text-zinc-600 dark:text-zinc-400 group active:scale-95 shadow-sm"
              >
                <HelpCircle className="w-4 h-4 text-emerald-500 group-hover:animate-pulse" />
                <span className="uppercase tracking-widest">{t.faq}</span>
              </button>
            </div>

            {/* Sub Category Selection (Horizontal Scroll or Flex Wrap) */}
            <section id="sub-categories">
              <div className="flex items-baseline justify-between mb-4 px-1">
                <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-500">{t.subCategories}</h2>
                <span className="text-[10px] font-mono text-zinc-400 font-bold">{selectedCategory?.subCategories.length} {t.items}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                {selectedCategory?.subCategories.map((sub) => (
                  <button
                    key={sub.id}
                    id={`sub-btn-${sub.id}`}
                    onClick={() => {
                      setSelectedSubCategory(sub);
                      setSearchQuery("");
                    }}
                    className={`h-full flex items-center p-3 rounded-2xl text-xs font-bold border transition-all duration-300 text-left relative overflow-hidden group ${
                      selectedSubCategory?.id === sub.id
                        ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-xl shadow-zinc-500/10 scale-[1.02] z-10'
                        : 'bg-white dark:bg-zinc-900/60 text-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-emerald-700 dark:hover:text-emerald-400 shadow-sm'
                    }`}
                  >
                    {selectedSubCategory?.id === sub.id && (
                      <motion.div 
                        layoutId="sub-active-bg"
                        className="absolute inset-0 bg-zinc-900 dark:bg-zinc-100 -z-10"
                      />
                    )}
                    <span className="line-clamp-3 leading-relaxed">{sub.name}</span>
                    <div className={`absolute right-2 bottom-2 transition-transform duration-300 ${selectedSubCategory?.id === sub.id ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
                      <ChevronRight className="w-3 h-3 text-emerald-500" />
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Works List Area */}
            <section className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
              {/* Search Bar */}
              <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row gap-4 items-center bg-zinc-50/50 dark:bg-zinc-900/80">
                <div className="relative w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    id="works-search"
                    placeholder={isGlobalSearch ? t.searchPlaceholderGlobal : `${t.searchPlaceholderLocal} ${selectedSubCategory?.name.substring(0, 20)}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-10 py-3 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 text-sm transition-all shadow-sm text-zinc-900 dark:text-zinc-100 font-medium placeholder:text-zinc-500/70"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full text-zinc-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                
                <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/50 p-1 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-inner">
                  <button
                    onClick={() => setIsGlobalSearch(false)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
                      !isGlobalSearch 
                        ? 'bg-white dark:bg-zinc-100 text-zinc-900 dark:text-zinc-900 shadow-md' 
                        : 'text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
                    }`}
                  >
                    {t.searchLocal}
                  </button>
                  <button
                    onClick={() => setIsGlobalSearch(true)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
                      isGlobalSearch 
                        ? 'bg-emerald-600 text-white shadow-md' 
                        : 'text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
                    }`}
                  >
                    {t.searchGlobal}
                  </button>
                </div>
              </div>

              {!isGlobalSearch && selectedSubCategory && (
                <div className="px-4 pb-3 flex items-center gap-2">
                  <div className="h-px flex-grow bg-zinc-200 dark:bg-zinc-800" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/40 shadow-sm">
                    {t.workUnderSub} {getSubCategoryLabel()}
                  </span>
                  <div className="h-px flex-grow bg-zinc-200 dark:bg-zinc-800" />
                </div>
              )}

              {/* Works List Container */}
              <div className="p-2 sm:p-6 flex-grow flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isGlobalSearch ? `global-${searchQuery}` : `sub-${selectedSubCategory?.id}-${searchQuery}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex-grow flex flex-col"
                  >
                    {isGlobalSearch && !searchQuery.trim() ? (
                      <div className="flex-grow flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
                        <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-950/20 rounded-full flex items-center justify-center mb-6 relative">
                          <motion.div 
                            animate={{ scale: [1, 1.1, 1] }} 
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute inset-0 bg-emerald-500/5 rounded-full"
                          />
                          <Search className="w-8 h-8 text-emerald-500" />
                        </div>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Global Search Ready</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-sm font-medium leading-relaxed">
                          Discover all 318 interim works across all categories. <br/>Enter a keyword like <span className="text-emerald-700 dark:text-emerald-500 italic">"Pond"</span>, <span className="text-emerald-700 dark:text-emerald-500 italic">"Canal"</span> or <span className="text-emerald-700 dark:text-emerald-500 italic">"SHG"</span>.
                        </p>
                      </div>
                    ) : filteredWorks.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredWorks.map((work: any, index: number) => (
                          <motion.div
                            key={`${work.id}-${work.catId || 'local'}`}
                            id={`work-item-${work.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03, duration: 0.4 }}
                            onClick={() => {
                              setActiveWorkDetail({
                                ...work,
                                subName: work.subName || selectedSubCategory?.name,
                                catName: DATA.find(c => c.id === (work.catId || selectedCategory?.id))?.name,
                                catId: work.catId || selectedCategory?.id
                              });
                            }}
                            className="group p-5 bg-white dark:bg-zinc-800/20 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all flex items-start justify-between gap-4 cursor-pointer active:scale-[0.98]"
                          >
                            <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                                {work.id}
                              </div>
                              <div className="min-w-0">
                                {isGlobalSearch && work.catId && (
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <div className="p-0.5 bg-emerald-50 dark:bg-emerald-950/40 rounded text-emerald-600 dark:text-emerald-500">
                                      {getCategoryIcon(work.catId)}
                                    </div>
                                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-500 truncate max-w-[150px]">
                                      {DATA.find(c => c.id === work.catId)?.name.split('-')[1].trim()}
                                    </span>
                                  </div>
                                )}
                                <h4 className="text-sm font-bold leading-relaxed text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                                  {work.name}
                                </h4>
                                {isGlobalSearch && work.subName && (
                                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1 line-clamp-1 italic font-medium">
                                    {work.subName}
                                  </p>
                                )}
                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                  <span className={`text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest border ${
                                    work.name.toLowerCase().includes('individual') 
                                      ? 'bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/30' 
                                      : work.name.toLowerCase().includes('community')
                                      ? 'bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/30'
                                      : 'bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-500 border-zinc-100 dark:border-zinc-800'
                                  }`}>
                                    {work.name.toLowerCase().includes('individual') ? 'Individual' : work.name.toLowerCase().includes('community') ? 'Community' : 'Common'}
                                  </span>
                                  {work.name.toLowerCase().includes('maintenance') && (
                                    <span className="text-[9px] px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-500 border border-amber-100 dark:border-amber-900/30 font-bold uppercase tracking-widest">
                                      Maintenance
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0 pt-1">
                              <ArrowRight className="w-4 h-4 text-emerald-500" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex-grow flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-24 h-24 bg-zinc-50 dark:bg-zinc-900 rounded-3xl flex items-center justify-center mb-6 border border-zinc-100 dark:border-zinc-800 shadow-inner">
                          <Search className="w-10 h-10 text-zinc-300 dark:text-zinc-700" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">No works found</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-xs mx-auto font-medium leading-relaxed">
                          We couldn't find any results matching <span className="text-zinc-900 dark:text-zinc-200 font-bold">"{searchQuery}"</span>. <br/>Try checking your spelling or using simplified terms.
                        </p>
                        <button 
                          onClick={() => setSearchQuery("")}
                          className="mt-8 px-6 py-2.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-sm active:scale-95"
                        >
                          Clear all filters
                        </button>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-20 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="bg-zinc-900 dark:bg-zinc-100 p-2 rounded-lg">
                <BookOpen className="w-5 h-5 text-white dark:text-zinc-900" />
              </div>
              <div>
                <p className="text-sm font-bold tracking-tight">Interim Permissible Works Explorer</p>
                <p className="text-xs text-zinc-500 font-medium">Prepared in alignment with VB-G RAM G Act, 2025</p>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-900">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <a 
                  href="https://www.facebook.com/visionprototype" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-12 w-auto overflow-hidden rounded-lg brightness-110 contrast-125 transition-transform hover:scale-105 active:scale-95"
                >
                  <img 
                    src={logoImg} 
                    alt="Vision Prototype Logo" 
                    className="h-full w-auto object-contain" 
                  />
                </a>
                <div className="text-left">
                  <p className="text-[10px] text-zinc-600 dark:text-zinc-300 font-black uppercase tracking-widest leading-normal">
                    {t.designedBy} {t.engineerName}
                  </p>
                  <p className="text-[9px] text-zinc-500 dark:text-zinc-400 font-bold italic mb-1">
                    {t.engineerTitle}
                  </p>
                  <a 
                    href="https://www.facebook.com/visionprototype" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider hover:text-emerald-500 transition-colors"
                  >
                    {t.atVisionProto}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setShowTerms(true)}
                  className="text-[10px] text-zinc-500 hover:text-emerald-600 transition-colors font-bold uppercase tracking-[0.2em] cursor-pointer"
                >
                  {t.termsOfUse}
                </button>
                <div className="w-[1px] h-3 bg-zinc-200 dark:bg-zinc-800 hidden md:block" />
                <button 
                  onClick={() => setShowFeedback(true)}
                  className="text-[10px] text-zinc-500 hover:text-emerald-600 transition-colors font-bold uppercase tracking-[0.2em] cursor-pointer flex items-center gap-2 group"
                >
                  <MessageSquare className="w-3 h-3 group-hover:scale-110 transition-transform" />
                  {t.feedback}
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Work Detail Modal Overlay */}
      <AnimatePresence>
        {activeWorkDetail && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveWorkDetail(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-lg bg-white dark:bg-zinc-950 z-[101] shadow-2xl overflow-y-auto"
            >
              <div className="p-6">
                  <div className="flex items-center justify-between mb-8">
                   <div className="bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded-full flex items-center gap-2">
                     <span className="text-[10px] font-black text-emerald-800 dark:text-emerald-400">{t.workId}{activeWorkDetail.id}</span>
                   </div>
                   <button 
                     onClick={() => setActiveWorkDetail(null)}
                     className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors"
                   >
                     <X className="w-5 h-5 text-zinc-500" />
                   </button>
                 </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                      <span className="text-emerald-600 dark:text-emerald-500 mr-2">{getWorkFullCode(activeWorkDetail.id)} :</span>
                      {activeWorkDetail.name}
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] font-bold rounded uppercase tracking-wider">
                        VB-G RAM G Act, 2025
                      </span>
                      {activeWorkDetail.catId && (
                        <span className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 text-[10px] font-bold rounded uppercase tracking-wider flex items-center gap-1">
                          {getCategoryIcon(activeWorkDetail.catId)}
                          {activeWorkDetail.catName?.split('-')[1].trim()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-100 dark:border-zinc-900">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">{t.hierarchicalLocation}</h3>
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase mb-1">{t.masterCategories}</p>
                        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{activeWorkDetail.catName}</p>
                      </div>
                      <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase mb-1">{t.subCategories}</p>
                        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-relaxed">{activeWorkDetail.subName}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-100 dark:border-zinc-900">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">{t.implementationGuidelines}</h3>
                    <div className="space-y-3">
                      {[ 
                        "Technical sanction required from designated authority.",
                        "Material procurement must follow state procurement rules.",
                        "Measurement entries in M-Book at start, middle and completion stage.",
                        "Geo-tagging of asset is mandatory at three stages (Before, During, After)."
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-3">
                          <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-100 dark:border-zinc-900">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">{t.targetAudience}</h3>
                    <div className="flex gap-4">
                      <div className={`flex-1 p-4 rounded-2xl border border-dashed text-center transition-all ${
                        activeWorkDetail.name.toLowerCase().includes('individual') 
                          ? 'border-emerald-500/50 bg-emerald-50/30' 
                          : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/10'
                      }`}>
                        <span className={`block text-xl font-black mb-1 ${
                          activeWorkDetail.name.toLowerCase().includes('individual') 
                            ? "text-emerald-600 dark:text-emerald-400" 
                            : "text-zinc-400 dark:text-zinc-600 opacity-40"
                        }`}>
                          {activeWorkDetail.name.toLowerCase().includes('individual') ? t.yes : t.no}
                        </span>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${
                          activeWorkDetail.name.toLowerCase().includes('individual') 
                            ? "text-emerald-800/70 dark:text-emerald-300/60" 
                            : "text-zinc-400 dark:text-zinc-500"
                        }`}>
                          {t.individual}
                        </span>
                      </div>
                      <div className={`flex-1 p-4 rounded-2xl border border-dashed text-center transition-all ${
                        activeWorkDetail.name.toLowerCase().includes('community') 
                          ? 'border-emerald-500/50 bg-emerald-50/30' 
                          : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/10'
                      }`}>
                        <span className={`block text-xl font-black mb-1 ${
                          activeWorkDetail.name.toLowerCase().includes('community') 
                            ? "text-emerald-600 dark:text-emerald-400" 
                            : "text-zinc-400 dark:text-zinc-600 opacity-40"
                        }`}>
                          {activeWorkDetail.name.toLowerCase().includes('community') ? t.yes : t.no}
                        </span>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${
                          activeWorkDetail.name.toLowerCase().includes('community') 
                            ? "text-emerald-800/70 dark:text-emerald-300/60" 
                            : "text-zinc-400 dark:text-zinc-500"
                        }`}>
                          {t.community}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-100 dark:border-zinc-900 space-y-6">
                    <div>
                      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">{t.downloadEstimate}</h3>
                      <button className="w-full flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl group hover:bg-emerald-500 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl text-emerald-600 group-hover:bg-white group-hover:text-emerald-600 transition-colors">
                            <Download className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-bold text-emerald-900 dark:text-emerald-400 group-hover:text-white">Model_Estimate_{activeWorkDetail.id}.pdf</p>
                            <p className="text-[10px] font-medium text-emerald-600 dark:text-emerald-500 group-hover:text-emerald-100 uppercase tracking-wider">Standard PDF • 2.4 MB</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-emerald-300 group-hover:text-white" />
                      </button>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">{t.uploadEstimate}</h3>
                      <div className="relative group/upload">
                        <input 
                          type="file" 
                          onChange={handleFileUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                        />
                        <div className={`p-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center transition-all ${
                          uploadStatus === 'success' 
                            ? 'border-emerald-500 bg-emerald-50/30' 
                            : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30 group-hover/upload:border-emerald-500/50 group-hover/upload:bg-emerald-50/10'
                        }`}>
                          <div className={`p-3 rounded-2xl shadow-sm border transition-all ${
                            uploadStatus === 'success'
                              ? 'bg-emerald-500 border-emerald-400 text-white scale-110'
                              : 'bg-white dark:bg-zinc-800 border-zinc-100 dark:border-zinc-800 text-emerald-500 group-hover/upload:scale-110'
                          }`}>
                            {uploadStatus === 'uploading' ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                              >
                                <CloudLightning className="w-6 h-6" />
                              </motion.div>
                            ) : uploadStatus === 'success' ? (
                              <ArrowRight className="w-6 h-6 rotate-[-45deg]" />
                            ) : (
                              <Upload className="w-6 h-6" />
                            )}
                          </div>
                          <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mt-4 mb-1">
                            {uploadStatus === 'uploading' ? 'Uploading...' : uploadStatus === 'success' ? 'Uploaded Successfully!' : t.uploadEstimate}
                          </p>
                          <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 max-w-[200px] leading-relaxed italic">
                            {uploadStatus === 'success' ? 'Your estimate is being processed.' : t.dropZoneText}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <button 
                    onClick={() => setActiveWorkDetail(null)}
                    className="w-full py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl font-bold text-sm shadow-xl shadow-zinc-500/10 active:scale-[0.98] transition-all"
                  >
                    {t.close}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* AI Overview Modal */}
      <AnimatePresence>
        {showAIOverview && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAIOverview(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[110]"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl max-h-[90vh] bg-white dark:bg-zinc-950 z-[111] shadow-2xl rounded-3xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl text-emerald-600 dark:text-emerald-400">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Overview</h2>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">VB-G RAM G Act, 2025</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAIOverview(false)}
                  className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8 overflow-y-auto custom-scrollbar">
                <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
                  <section>
                    <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium">
                      The <strong className="text-emerald-800 dark:text-emerald-500">Viksit Bharat-Guarantee for Rozgar and Ajeevika Mission (Gramin) (VB-G RAM G) Act, 2025</strong>, effective July 1, 2026, focuses on four key domains: water security, core rural infrastructure, livelihood-related infrastructure, and extreme weather mitigation. It enhances rural employment to 125 days annually, shifting focus to sustainable asset creation.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-[2px] text-zinc-400 flex items-center gap-2">
                      <div className="w-4 h-[2px] bg-emerald-500" /> Permissible Works under Four Main Pillars
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { title: "Water Security Works", desc: "Includes constructing farm ponds, check dams, wells, irrigation canals, and groundwater recharge structures to enhance agricultural resilience." },
                        { title: "Core Rural Infrastructure", desc: "Covers development of rural roads, connectivity projects, and public infrastructure." },
                        { title: "Livelihood-related Infrastructure", desc: "Focuses on creating productive assets such as SHG buildings, work sheds, training centers, compost units, nurseries, fisheries infrastructure, and rural haats." },
                        { title: "Extreme Weather Mitigation", desc: "Involves projects to combat climate risks, such as flood control structures, drainage systems, and disaster shelters." }
                      ].map((pillar, i) => (
                        <div key={i} className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm mb-1">{pillar.title}</h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{pillar.desc}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-[2px] text-zinc-400 flex items-center gap-2">
                      <div className="w-4 h-[2px] bg-emerald-500" /> Key Features & Focus Areas
                    </h3>
                    <div className="space-y-3">
                      {[
                        { label: "Individual Land Development", value: "Retains provisions for improving land owned by vulnerable households." },
                        { label: "Post-Harvest Management", value: "Includes infrastructure like storage and cold storage to improve farmer income." },
                        { label: "Women Empowerment", value: "Prioritizes SHG-led initiatives; mandatory crèche facilities at work sites if 5+ children are present." },
                        { label: "Technology Integration", value: "Uses AI-based attendance, geo-tagging, and real-time monitoring for transparency." },
                        { label: "Asset Sustainability", value: "Focuses on durable assets to align with the Viksit Bharat 2047 vision." }
                      ].map((feature, i) => (
                        <div key={i} className="flex gap-4 p-3 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-xl transition-colors">
                          <div className="mt-1-5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                          <div>
                            <span className="font-bold text-sm text-zinc-800 dark:text-zinc-200">{feature.label}: </span>
                            <span className="text-sm text-zinc-600 dark:text-zinc-400">{feature.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <footer className="pt-8 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-zinc-500 italic">
                      The Act replaces MGNREGA to ensure better planning and accountability at the panchayat level.
                    </p>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setShowTerms(true)}
                        className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-emerald-600 transition-colors px-3 py-1 border border-zinc-200 dark:border-zinc-800 rounded-full cursor-pointer"
                      >
                        Terms of Use
                      </button>
                    </div>
                  </footer>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-900">
                <button 
                  onClick={() => setShowAIOverview(false)}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98]"
                >
                  Got it, thank you
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Resource Center Modal */}
      <AnimatePresence>
        {showResources && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResources(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[120]"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl max-h-[90vh] bg-white dark:bg-zinc-950 z-[121] shadow-2xl rounded-[2.5rem] overflow-hidden flex flex-col border border-zinc-200 dark:border-zinc-800"
            >
              {/* Header */}
              <div className="p-8 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/20">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-2xl text-amber-600 dark:text-amber-400 shadow-sm">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">{t.resourceCenter}</h2>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">{t.officialDocuments}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowResources(false)}
                  className="p-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors group"
                >
                  <X className="w-6 h-6 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8 overflow-y-auto custom-scrollbar flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Category 1: G RAM G Bill & Notifications */}
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                       <BookOpen className="w-3 h-3" /> {t.actDocument}
                    </h3>
                    <div className="space-y-4">
                      <a 
                        href="https://prsindia.org/files/bills_acts/bills_parliament/2025/Viksit_Bharat%E2%80%93Guarantee_for_Rozgar_and_Ajeevika_Mission_(Gramin)_VB%E2%80%93G_RAM_G_Bill,2025.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-6 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl text-white shadow-xl shadow-emerald-500/20 group cursor-pointer active:scale-[0.98] transition-all"
                      >
                        <p className="text-xl font-bold leading-tight mb-1">VB-G RAM G Bill, 2025</p>
                        <p className="text-[10px] font-medium text-emerald-100/80 mb-6 uppercase tracking-wider italic">Full Draft Bill • PRS India Official Annexure</p>
                        <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-white/20 group-hover:bg-white/30 px-5 py-2.5 rounded-xl transition-colors">
                          <Download className="w-4 h-4" /> {t.download}
                        </div>
                      </a>

                      <div 
                        className="block p-5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-3xl group transition-all shadow-sm opacity-80"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-zinc-50 dark:bg-zinc-950/40 rounded-2xl text-zinc-400">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase">Interim Permissible Works Order</p>
                              <p className="text-[9px] font-medium text-zinc-400 uppercase tracking-tighter italic">Ministry Notification • May 13, 2026 • NREGA Portal</p>
                            </div>
                          </div>
                          <div className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-[8px] font-black uppercase text-zinc-400 tracking-widest">
                            Official Archive Link Pending
                          </div>
                        </div>
                      </div>

                      <a 
                        href="https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/dec/doc20251222741501.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-3xl group hover:border-emerald-500/30 transition-all cursor-pointer shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-2xl text-blue-600">
                              <ExternalLink className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-blue-600 transition-colors">Official PIB Notification (Dec 2025)</p>
                              <p className="text-[9px] font-medium text-zinc-400 uppercase tracking-tighter italic">Press Information Bureau • Govt Notification</p>
                            </div>
                          </div>
                          <Download className="w-5 h-5 text-zinc-300 group-hover:text-blue-500 transition-colors" />
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Category 2: Government Orders & Circulars */}
                  <div className="space-y-6">
                    <div className="pt-2">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 mb-4">
                         <CloudLightning className="w-3 h-3" /> {t.circulars}
                      </h3>
                      <div className="grid grid-cols-1 gap-3">
                        {[ 
                          "Technical Specifications for SHG Livelihood Sheds",
                          "Climate Resilient Road Standards (Interim 2025)"
                        ].map((circular, i) => (
                          <div key={i} className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all group cursor-pointer">
                            <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-3 leading-relaxed group-hover:text-emerald-600">{circular}</p>
                            <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
                              <span className="text-[9px] font-bold text-zinc-400 uppercase italic">May 15, 2026</span>
                              <Download className="w-3 h-3 text-zinc-400 group-hover:text-emerald-500" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-900 text-center">
                <p className="text-xs text-zinc-500 font-medium mb-6 italic max-w-lg mx-auto">
                  All documents provided above are for public awareness. Please consult the official Ministry of Rural Development portal for certified copies.
                </p>
                <button 
                  onClick={() => setShowResources(false)}
                  className="px-8 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-zinc-500/10 active:scale-[0.98] transition-all"
                >
                  {t.close}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Terms of Use Modal */}
      <AnimatePresence>
        {showTerms && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTerms(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[120]"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-xl max-h-[80vh] bg-white dark:bg-zinc-950 z-[121] shadow-2xl rounded-3xl overflow-hidden flex flex-col border border-zinc-200 dark:border-zinc-800"
            >
              <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Terms of Use</h2>
                <button 
                  onClick={() => setShowTerms(false)}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-500" />
                </button>
              </div>
              <div className="p-8 overflow-y-auto space-y-6 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <section>
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">1. Educational Purpose</h3>
                  <p>This application is provided exclusively for informational and public awareness purposes regarding the interim guidelines of the VB-G RAM G Act, 2025. It is not an official government platform.</p>
                </section>
                <section>
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">2. Accuracy of Data</h3>
                  <p>While we strive for precision, the list of permissible works is subject to change by the Ministry of Rural Development. Users are advised to cross-reference with official gazette notifications.</p>
                </section>
                <section>
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">3. Limitation of Liability</h3>
                  <p>The developers (Vision Prototype) shall not be held liable for any administrative decisions, financial planning, or field executions based solely on the data presented within this interface.</p>
                </section>
                <section>
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">4. User Responsibility</h3>
                  <p>It is the responsibility of the user (e.g., GP secretaries, engineers, citizens) to ensure that any work undertaken complies with current state-specific and national implementation rules.</p>
                </section>
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 text-center">
                    Version 1.0.2 (Interim) • May 2026
                  </p>
                </div>
              </div>
              <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-900">
                <button 
                  onClick={() => setShowTerms(false)}
                  className="w-full py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold transition-all active:scale-[0.98]"
                >
                  I Understand
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* FAQ Modal */}
      <AnimatePresence>
        {showFAQ && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFAQ(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[130]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-2xl bg-zinc-50 dark:bg-zinc-950 z-[131] shadow-2xl flex flex-col border-l border-zinc-200 dark:border-zinc-800"
            >
              {/* Header */}
              <div className="p-8 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-white dark:bg-zinc-950">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-900/40 rounded-2xl text-emerald-600 dark:text-emerald-400 shadow-sm">
                    <HelpCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">{t.faq}</h2>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">{t.pibDate}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowFAQ(false)}
                  className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors group"
                >
                  <X className="w-6 h-6 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100" />
                </button>
              </div>

              {/* Content */}
              <div className="p-0 overflow-y-auto flex-grow custom-scrollbar">
                <div className="p-8 space-y-6">
                  {FAQ_DATA.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.02 }}
                      className="group bg-white dark:bg-zinc-900/50 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-emerald-500/30 transition-all"
                    >
                      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex gap-3">
                        <span className="text-emerald-500 font-mono">Q.</span>
                        {item.question}
                      </h3>
                      <div className="flex gap-3">
                        <span className="text-amber-500 font-mono text-sm leading-relaxed">A.</span>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="p-6 bg-zinc-100 dark:bg-zinc-900 rounded-2xl text-center">
                      <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-2">Reference</p>
                      <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Ministry of Rural Development, PIB Research</p>
                      <a 
                        href="https://static.pib.gov.in/WriteReadData/specificdocs/documents/2026/may/doc2026511867701.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 mt-3 hover:underline transition-all group/link"
                      >
                        <Download className="w-3 h-3 group-hover/link:scale-110 transition-transform" />
                        <span>DOWNLOAD OFFICIAL FAQ PDF (MAY 11, 2026)</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-8 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
                <button 
                  onClick={() => setShowFAQ(false)}
                  className="w-full py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl shadow-zinc-500/10 active:scale-[0.98] transition-all"
                >
                  {t.close}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Feedback Modal */}
      <AnimatePresence>
        {showFeedback && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (feedbackStatus !== 'submitting') setShowFeedback(false);
              }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[140]"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md bg-white dark:bg-zinc-950 z-[141] shadow-2xl rounded-[2rem] overflow-hidden flex flex-col border border-zinc-200 dark:border-zinc-800"
            >
              <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl text-emerald-600 dark:text-emerald-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{t.feedbackTitle}</h2>
                </div>
                <button 
                  onClick={() => setShowFeedback(false)}
                  className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors"
                  disabled={feedbackStatus === 'submitting'}
                >
                  <X className="w-5 h-5 text-zinc-500" />
                </button>
              </div>

              <div className="p-8">
                {feedbackStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Sparkles className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{t.feedbackSuccess}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Thank you for helping us improve this platform.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFeedbackSubmit} className="space-y-5">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 ml-1">{t.feedbackLabelName}</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                          required
                          type="text"
                          value={feedbackName}
                          onChange={(e) => setFeedbackName(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all font-medium text-sm text-zinc-900 dark:text-zinc-100"
                          placeholder="Enter Your Name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 ml-1">{t.feedbackLabelEmail}</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                          required
                          type="email"
                          value={feedbackEmail}
                          onChange={(e) => setFeedbackEmail(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all font-medium text-sm text-zinc-900 dark:text-zinc-100"
                          placeholder="your_mail@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 ml-1">{t.feedbackLabelMessage}</label>
                      <textarea
                        required
                        value={feedbackMessage}
                        onChange={(e) => setFeedbackMessage(e.target.value)}
                        rows={4}
                        className="w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all font-medium text-sm text-zinc-900 dark:text-zinc-100 resize-none"
                        placeholder="Tell us what you think..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={feedbackStatus === 'submitting'}
                      className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-emerald-500/10 active:scale-[0.98] ${
                        feedbackStatus === 'submitting' 
                          ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 pointer-events-none' 
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }`}
                    >
                      {feedbackStatus === 'submitting' ? (
                        <div className="w-5 h-5 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span className="uppercase tracking-widest text-xs">{t.feedbackSubmit}</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
