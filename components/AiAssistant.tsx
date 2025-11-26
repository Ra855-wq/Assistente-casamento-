import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2, Bot, User } from 'lucide-react';
import { generateWeddingAdvice } from '../services/geminiService';
import { ChatMessage, WeddingData } from '../types';

interface AiAssistantProps {
  weddingData: WeddingData;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ weddingData }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Olá! Sou seu assistente de casamento virtual. Posso ajudar com sugestões de votos, ideias para o menu, cronograma do dia, ou dicas de etiqueta. Como posso ajudar os noivos ${weddingData.names} hoje?`,
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const context = `Casamento de ${weddingData.names}, Orçamento: ${weddingData.budget}, Local: ${weddingData.location}`;
    const responseText = await generateWeddingAdvice(input, context);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const suggestions = [
    "Escreva votos românticos e curtos",
    "Sugira um menu para jantar no verão",
    "Checklist para 1 mês antes",
    "Músicas para entrada da noiva"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] animate-in fade-in duration-500">
      <div className="mb-4">
         <h2 className="text-3xl font-serif font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="text-rose-500 w-8 h-8" />
            IA Planner
         </h2>
         <p className="text-slate-500">Seu assistente pessoal 24h para tirar dúvidas e ter ideias.</p>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden flex flex-col">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div 
                key={msg.id} 
                className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-slate-200' : 'bg-rose-100 text-rose-600'
                }`}>
                    {msg.role === 'user' ? <User className="w-5 h-5 text-slate-600" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                        ? 'bg-white text-slate-800 rounded-tr-none' 
                        : 'bg-rose-500 text-white rounded-tl-none'
                }`}>
                    {msg.text.split('\n').map((line, i) => (
                        <p key={i} className="min-h-[1rem]">{line}</p>
                    ))}
                    <span className={`text-[10px] block mt-2 opacity-70 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                        {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5" />
                </div>
                <div className="p-4 rounded-2xl rounded-tl-none bg-rose-500 text-white shadow-sm flex items-center">
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    <span>Pensando...</span>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
            {messages.length < 3 && (
                <div className="flex gap-2 overflow-x-auto pb-3 mb-2 no-scrollbar">
                    {suggestions.map(s => (
                        <button
                            key={s}
                            onClick={() => setInput(s)}
                            className="whitespace-nowrap px-3 py-1.5 bg-rose-50 text-rose-600 text-xs font-medium rounded-full hover:bg-rose-100 transition-colors border border-rose-100"
                        >
                            {s}
                        </button>
                    ))}
                </div>
            )}
            <form onSubmit={handleSend} className="relative flex items-center">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Pergunte algo ao Gemini..."
                    className="w-full pl-5 pr-12 py-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 p-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 disabled:opacity-50 disabled:hover:bg-rose-500 transition-all shadow-md shadow-rose-200"
                >
                    <Send className="w-4 h-4" />
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;