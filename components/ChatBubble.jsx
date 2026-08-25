'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const mdComponents = {
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
  ),
};

export default function ChatBubble({ sender, text, children }) {
  const isUser = sender === 'user';

  let content;
  if (isUser) {
    content = <p>{text ?? children}</p>;
  } else if (text) {
    content = (
      <div className="markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
          {text}
        </ReactMarkdown>
      </div>
    );
  } else {
    content = children;
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm shadow-sm"
        style={isUser ? {
          background: 'linear-gradient(135deg, #eab308, #facc15)',
          color: '#1e293b',
          borderBottomRightRadius: '4px',
          lineHeight: '1.5',
        } : {
          background: '#111c35',
          color: '#e2e8f0',
          border: '1px solid #1e2d4d',
          borderBottomLeftRadius: '4px',
        }}
      >
        {content}
      </div>
    </div>
  );
}
