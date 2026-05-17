/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from "react";
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
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DATA, MasterCategory, SubCategory, Work } from "./data";
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
  const [showTerms, setShowTerms] = useState(false);

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
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-zinc-50/50 text-zinc-900'} font-sans`}>
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between font-sans">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-xl text-white shadow-lg shadow-emerald-600/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight tracking-tight text-zinc-900 dark:text-zinc-100">VB-G RAM G</h1>
              <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 dark:text-zinc-500">Permissible Works 2025 (Interim)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAIOverview(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Overview</span>
            </button>
            <button
              onClick={toggleDarkMode}
              id="theme-toggle"
              className="p-2.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors border border-transparent active:border-zinc-200 dark:active:border-zinc-800"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-zinc-900" />}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
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
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-500 mb-4 px-2">Master Categories</h2>
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
              <div className="bg-gradient-to-br from-zinc-100 to-white dark:from-zinc-900 dark:to-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <h3 className="font-bold text-zinc-400 text-xs mb-3 flex items-center gap-2">
                  <Filter className="w-3 h-3" /> QUICK INFO
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Total available works in the full interim list: <strong className="text-emerald-800">318</strong>.
                </p>
                <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-medium text-zinc-500">
                  <span>Categories</span>
                  <span className="text-zinc-900 dark:text-zinc-100">4</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs font-medium text-zinc-500">
                  <span>Sub-categories</span>
                  <span className="text-zinc-900 dark:text-zinc-100">29</span>
                </div>
              </div>
            </section>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* Sub Category Selection (Horizontal Scroll or Flex Wrap) */}
            <section id="sub-categories">
              <div className="flex items-baseline justify-between mb-4 px-1">
                <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-500">Sub Categories</h2>
                <span className="text-[10px] font-mono text-zinc-400 font-bold">{selectedCategory?.subCategories.length} Items</span>
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
            <section className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
              {/* Search Bar */}
              <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row gap-4 items-center bg-zinc-100/50 dark:bg-zinc-900/30">
                <div className="relative w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    id="works-search"
                    placeholder={isGlobalSearch ? "Search across all 318 works..." : `Search in ${selectedSubCategory?.name.substring(0, 20)}...`}
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
                
                <div className="flex items-center gap-1 bg-zinc-200/50 dark:bg-zinc-800/50 p-1 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-inner">
                  <button
                    onClick={() => setIsGlobalSearch(false)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
                      !isGlobalSearch 
                        ? 'bg-white dark:bg-zinc-100 text-zinc-900 dark:text-zinc-900 shadow-md' 
                        : 'text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
                    }`}
                  >
                    Local
                  </button>
                  <button
                    onClick={() => setIsGlobalSearch(true)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
                      isGlobalSearch 
                        ? 'bg-emerald-600 text-white shadow-md' 
                        : 'text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
                    }`}
                  >
                    Global
                  </button>
                </div>
              </div>

              {!isGlobalSearch && selectedSubCategory && (
                <div className="px-4 pb-3 flex items-center gap-2">
                  <div className="h-px flex-grow bg-zinc-200 dark:bg-zinc-800" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/40 shadow-sm">
                    Work under sub Category- {getSubCategoryLabel()}
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
                              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-mono font-bold text-zinc-500 dark:text-zinc-500 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
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
                <div className="h-12 w-auto overflow-hidden rounded-lg brightness-110 contrast-125">
                  <img 
                    src={logoImg} 
                    alt="Vision Prototype Logo" 
                    className="h-full w-auto object-contain" 
                  />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-zinc-600 dark:text-zinc-300 font-black uppercase tracking-widest leading-normal">
                    Designed & Developed by Fakhar Uddin Chowdhury
                  </p>
                  <p className="text-[9px] text-zinc-500 dark:text-zinc-400 font-bold italic mb-1">
                    Junior Engineer, Juria Dev Block, Nagaon, Assam
                  </p>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
                    at Vision Prototype for public awareness
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowTerms(true)}
                className="text-[10px] text-zinc-500 hover:text-emerald-600 transition-colors font-bold uppercase tracking-[0.2em] cursor-pointer"
              >
                Terms of Use
              </button>
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
                    <span className="text-[10px] font-black text-emerald-800 dark:text-emerald-400">WORK ID #{activeWorkDetail.id}</span>
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
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Hierarchical Location</h3>
                    <div className="space-y-4">
                      <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase mb-1">Master Category</p>
                        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{activeWorkDetail.catName}</p>
                      </div>
                      <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase mb-1">Sub Category</p>
                        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-relaxed">{activeWorkDetail.subName}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-100 dark:border-zinc-900">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Implementation Guidelines</h3>
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
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Target Audience</h3>
                    <div className="flex gap-4">
                      <div className="flex-1 p-4 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 text-center">
                        <span className="block text-lg font-bold">
                          {activeWorkDetail.name.toLowerCase().includes('individual') ? "Yes" : "No"}
                        </span>
                        <span className="text-[10px] font-bold text-zinc-400 uppercase">Individual</span>
                      </div>
                      <div className="flex-1 p-4 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 text-center">
                        <span className="block text-lg font-bold">
                          {activeWorkDetail.name.toLowerCase().includes('community') ? "Yes" : "No"}
                        </span>
                        <span className="text-[10px] font-bold text-zinc-400 uppercase">Community</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <button 
                    onClick={() => setActiveWorkDetail(null)}
                    className="w-full py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl font-bold text-sm shadow-xl shadow-zinc-500/10 active:scale-[0.98] transition-all"
                  >
                    Close Details
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
    </div>
  );
}
