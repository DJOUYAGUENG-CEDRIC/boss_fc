'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PROFILE_IMAGE, ASSISTANT_NAME } from '@/lib/config';

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

function BurgerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect y="2" width="18" height="2" rx="1" fill="currentColor"/>
      <rect y="8" width="18" height="2" rx="1" fill="currentColor"/>
      <rect y="14" width="18" height="2" rx="1" fill="currentColor"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}

export default function Header({ isDark, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const headerBg = isDark ? '#0d1428' : '#854d0e';
  const borderColor = isDark ? '#1e2d4d' : '#a16207';
  const accentColor = '#facc15';

  return (
    <header
      className="shrink-0 flex items-center gap-3 px-4 py-3 shadow-md z-10 relative"
      style={{ background: headerBg, borderBottom: `1px solid ${borderColor}` }}
    >
      <div className="relative shrink-0">
        <img
          src={PROFILE_IMAGE}
          alt={ASSISTANT_NAME}
          className="w-11 h-11 rounded-full object-cover"
          style={{ outline: `2px solid ${accentColor}`, outlineOffset: '1px' }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='24' fill='%23facc15'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' fill='%231e293b' font-size='18' font-family='sans-serif' font-weight='bold'%3EBF%3C/text%3E%3C/svg%3E";
          }}
        />
        <span
          className="absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2"
          style={{ background: accentColor, ringColor: headerBg }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white text-sm truncate leading-tight">
          {ASSISTANT_NAME}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accentColor }} />
          <span className="text-xs font-medium" style={{ color: '#fde047' }}>En ligne</span>
        </div>
      </div>

      {/* Theme toggle */}
      <button
        type="button"
        onClick={onToggleTheme}
        className="p-2 rounded-full transition-colors shrink-0"
        style={{ color: '#fde047' }}
        aria-label="Changer le thème"
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>

      {/* Burger button */}
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        className="shrink-0 flex items-center justify-center w-9 h-9 rounded-xl transition-colors"
        style={{
          color: '#fde047',
          background: menuOpen ? 'rgba(250,204,21,0.15)' : undefined,
        }}
        aria-label="Menu"
      >
        {menuOpen ? <CloseIcon /> : <BurgerIcon />}
      </button>

      {/* Dropdown menu */}
      {menuOpen && (
        <div
          className="absolute top-full right-3 mt-2 w-52 rounded-xl overflow-hidden z-50 shadow-xl"
          style={{ background: '#0d1428', border: '1px solid #1e2d4d' }}
        >
          <button
            type="button"
            onClick={() => { setMenuOpen(false); router.push('/admin'); }}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-left transition-colors"
            style={{ color: '#fde047' }}
          >
            <span style={{ color: accentColor }}><LockIcon /></span>{' '}
            Connexion Admin
          </button>
        </div>
      )}

      {/* Overlay to close menu */}
      {menuOpen && (
        <button
          type="button"
          aria-label="Fermer le menu"
          className="fixed inset-0 z-40 cursor-default"
          style={{ background: 'transparent', border: 'none' }}
          onClick={() => setMenuOpen(false)}
          onKeyDown={(e) => { if (e.key === 'Escape') setMenuOpen(false); }}
        />
      )}
    </header>
  );
}
