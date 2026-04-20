'use client';

import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  structured?: {
    traditional: string;
    scientific: string;
    advice: string;
  };
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        structured: data.structured,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      setError('Failed to get AI response. Please check your API key or network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-card-bg/95 p-6 shadow-2xl shadow-black/20">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-accent/90">Live Chat</p>
          <h2 className="text-2xl font-bold">Ask about rules, rituals, and daily habits</h2>
        </div>
        <span className="rounded-full bg-accent/15 px-3 py-1 text-sm text-accent">Balanced answers</span>
      </div>
      <div className="h-[420px] overflow-y-auto rounded-3xl border border-white/10 bg-background/95 p-4 shadow-inner shadow-black/10 mb-4">
        {messages.length === 0 && !loading ? (
          <div className="flex h-full items-center justify-center text-center text-foreground/60">
            Start the conversation with a question like “Why shouldn’t we eat late?”
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block max-w-xl rounded-3xl px-5 py-4 ${msg.role === 'user' ? 'bg-accent text-background' : 'bg-card-bg text-foreground border border-white/10'}`}>
                {msg.structured ? (
                  <div className="space-y-3 text-sm leading-7">
                    <p><span className="font-semibold">🪔 Traditional:</span> {msg.structured.traditional}</p>
                    <p><span className="font-semibold">🔬 Scientific:</span> {msg.structured.scientific}</p>
                    <p><span className="font-semibold">✅ Practical:</span> {msg.structured.advice}</p>
                  </div>
                ) : (
                  <p>{msg.content}</p>
                )}
              </div>
            </div>
          ))
        )}
        {loading && <div className="text-center text-accent">Thinking…</div>}
        {error && <div className="mt-4 rounded-2xl bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 rounded-3xl border border-white/10 bg-background/90 px-4 py-3 text-foreground outline-none focus:border-accent"
          placeholder="Ask something like: Why is Tulsi sacred?"
        />
        <button
          onClick={sendMessage}
          className="rounded-3xl bg-accent px-6 py-3 font-semibold text-background shadow-lg shadow-accent/20 hover:bg-accent/90"
        >
          Send
        </button>
      </div>
    </div>
  );
}