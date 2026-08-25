'use client';

import { useState } from 'react';

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

export default function ChatInput({ onSend, disabled, isDark }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 py-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Écrivez votre message..."
        disabled={disabled}
        autoComplete="off"
        className="flex-1 rounded-full px-4 py-2.5 text-sm border focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: isDark ? '#111c35' : '#ffffff',
          color: isDark ? '#e2e8f0' : '#0f172a',
          borderColor: isDark ? '#1e2d4d' : '#fde68a',
          '--tw-ring-color': '#facc15',
        }}
      />
      <button
        type="submit"
        disabled={!value.trim() || disabled}
        className="shrink-0 w-10 h-10 text-slate-800 rounded-full flex items-center justify-center transition-colors shadow disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: '#facc15' }}
        aria-label="Envoyer"
      >
        <SendIcon />
      </button>
    </form>
  );
}
