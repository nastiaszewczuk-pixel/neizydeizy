import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Copy, Check, ExternalLink, Link as LinkIcon, Plus, Trash2, RotateCcw } from 'lucide-react';
import { AlbumMediaItem } from '../utils/usePortfolioAlbums';

export const ProjectAlbumModal = ({ projectId, isOpen, onClose, albumItems }: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSelectedIndex(0);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, projectId]);

  if (!isOpen || !projectId) return null;

  const currentItem = albumItems[selectedIndex] || albumItems[0];
  const safeIndex = selectedIndex >= albumItems.length ? Math.max(0, albumItems.length - 1) : selectedIndex;

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : albumItems.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < albumItems.length - 1 ? prev + 1 : 0));
  };

  const projectMetaMap: Record<string, any> = {
    '01': { role: 'Content Creator', tag: 'Viral', title: 'Dior Paris FW Backstage', metric: '10M+ Reach' },
    '02': { role: 'Content Creator', tag: 'Growth', title: 'Fluently English App', metric: '100K+ Followers' },
    '03': { role: 'SMM', tag: 'Organic', title: 'Hair Salon (Paramatma)', metric: '5K+ New Clients' },
    '04': { role: 'Photo & Video Production', tag: 'Production', title: 'Fashion Show Backstage', metric: 'Brand Campaign' },
    '05': { role: 'Creative Director', tag: 'Set Design', title: 'Music Video "Gaucho"', metric: '100K+ Views' },
    '06': { role: 'Creative Director & Visual Storyteller', tag: 'Creative', title: 'Visual Storytelling & Lifestyle Directing', metric: 'Aesthetic Direction' }
  };
  
  const projectMeta = projectMetaMap[projectId] || { role: 'Project', tag: 'Media', title: 'Project Details', metric: '' };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in font-sans">
      <div 
        className="bg-white w-full max-w-5xl max-h-full overflow-y-auto border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col p-3 sm:p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-3 border-black bg-[#FFE600] p-3 sm:p-4 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3">
            <span className="bg-black text-[#39FF14] px-2.5 py-1 text-xs font-mono font-black border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              ALBUM {projectId}
            </span>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider block text-black/80">
                {projectMeta.role} // {projectMeta.tag}
              </span>
              <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-black">
                {projectMeta.title}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-white text-black font-mono text-xs font-black px-2.5 py-1 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hidden sm:inline-block">
              {projectMeta.metric}
            </span>
            <button
              onClick={onClose}
              className="bg-black text-white hover:bg-[#0022FF] border-2 border-black p-2 font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              title="Close [ESC]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-black">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold">
            <span className="bg-zinc-100 px-2.5 py-1 border border-black font-black">
              {albumItems.length} MEDIA {albumItems.length === 1 ? 'FILE' : 'FILES'}
            </span>
          </div>
        </div>

        <div className="relative border-3 border-black bg-zinc-950 p-2 sm:p-3 mb-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          {albumItems.length > 0 && currentItem ? (
            <div className="relative aspect-video sm:aspect-[16/10] max-h-[46vh] w-full bg-black border-2 border-zinc-800 flex items-center justify-center overflow-hidden">
              {currentItem.type === 'video' ? (
                <video
                  key={currentItem.id}
                  src={currentItem.url}
                  controls
                  autoPlay
                  playsInline
                  loop
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  key={currentItem.id}
                  src={currentItem.url}
                  alt=""
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              )}
              {albumItems.length > 1 && (
                <>
                  <button onClick={handlePrev} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/80 text-white hover:bg-[#FFE600] hover:text-black border-2 border-white hover:border-black p-2 font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer z-10"><ChevronLeft className="w-6 h-6" /></button>
                  <button onClick={handleNext} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/80 text-white hover:bg-[#FFE600] hover:text-black border-2 border-white hover:border-black p-2 font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer z-10"><ChevronRight className="w-6 h-6" /></button>
                </>
              )}
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 flex justify-between items-end pointer-events-none">
                <div className="bg-black/85 text-white border border-zinc-600 px-2.5 py-1 text-xs font-mono font-bold flex items-center gap-2">
                  <span className="text-[#39FF14]">{safeIndex + 1} / {albumItems.length}</span>
                  <span className="truncate max-w-[200px] sm:max-w-md">Media</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="aspect-video w-full flex items-center justify-center bg-zinc-900 border-2 border-zinc-700 text-zinc-500 font-mono text-sm uppercase font-bold">No Media Found</div>
          )}
        </div>

        {albumItems.length > 1 && (
          <div className="mb-4">
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {albumItems.map((item: any, idx: number) => {
                const isSelected = safeIndex === idx;
                return (
                  <button key={item.id} onClick={() => setSelectedIndex(idx)} className={`relative aspect-square border-2 transition-all cursor-pointer overflow-hidden ${isSelected ? 'border-[#39FF14] shadow-[0px_0px_0px_2px_rgba(57,255,20,1)] -translate-y-1' : 'border-black hover:border-[#0022FF] opacity-70 hover:opacity-100'}`}>
                    {item.type === 'video' ? (
                      <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                        <div className="w-6 h-6 border border-zinc-600 flex items-center justify-center bg-zinc-700 text-zinc-400">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>
                        </div>
                      </div>
                    ) : (
                      <img src={item.url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    )}
                    <span className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-[9px] font-mono text-center truncate px-1">0{idx + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
