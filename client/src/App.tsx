import { useState, useEffect, useRef } from 'react';
import ShaderBackground from '@/components/ui/shader-background';

const PLATFORMS = [
    { id: 'linkedin', name: 'LinkedIn' },
    { id: 'twitter', name: 'Twitter (X)' },
    { id: 'instagram', name: 'Instagram' },
    { id: 'facebook', name: 'Facebook' },
    { id: 'tiktok', name: 'TikTok' },
    { id: 'youtube', name: 'YouTube' },
    { id: 'threads', name: 'Threads' },
] as const;

type PlatformId = (typeof PLATFORMS)[number]['id'];

function App() {
    const [topic, setTopic] = useState('');
    const [platform, setPlatform] = useState<PlatformId>('linkedin');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [additionalDetails, setAdditionalDetails] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const generateContent = async () => {
        if (!topic) return;

        setLoading(true);
        setGeneratedContent('');
        setCopied(false);

        try {
            const response = await fetch('http://localhost:5000/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    topic,
                    platform,
                    additionalDetails
                }),
            });

            const data = await response.json();
            if (data.content) {
                setGeneratedContent(data.content);
            } else {
                setGeneratedContent('Error: ' + (data.error || 'Something went wrong.'));
            }
        } catch (error) {
            console.error('Error:', error);
            setGeneratedContent('Error: Could not connect to the backend server.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
            <ShaderBackground />

            <div className="w-full max-w-2xl bg-black border border-white/10 p-8 shadow-2xl relative z-10">
                <h1 className="text-4xl font-bold tracking-tighter text-white mb-2">Content Alchemist</h1>
                <p className="text-white/50 mb-8 font-medium">Transform topics into viral social media magic</p>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/40">What do you want to post about?</label>
                        <textarea
                            className="w-full bg-white/5 border border-white/10 p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
                            placeholder="e.g. My journey as a full-stack engineer, or 5 tips for better productivity..."
                            rows={3}
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Target Platform</label>
                            <div className="relative" ref={dropdownRef}>
                                <div
                                    className={`flex items-center justify-between w-full bg-white/5 border border-white/10 p-4 text-white cursor-pointer hover:bg-white/10 transition-colors ${isDropdownOpen ? 'border-white/30' : ''}`}
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <span className="font-medium">
                                        {PLATFORMS.find(p => p.id === platform)?.name}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                                    </svg>
                                </div>

                                {isDropdownOpen && (
                                    <div className="absolute bottom-full left-0 w-full bg-[#0a0a0a] border border-white/10 mb-2 shadow-2xl z-50 overflow-hidden py-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
                                        <div className="max-h-60 overflow-y-auto">
                                            {PLATFORMS.map((p) => (
                                                <div
                                                    key={p.id}
                                                    className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${platform === p.id ? 'bg-white text-black' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                                                    onClick={() => {
                                                        setPlatform(p.id);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                >
                                                    <span className="text-sm font-medium">{p.name}</span>
                                                    {platform === p.id && (
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Tone / Context</label>
                            <input
                                className="w-full bg-white/5 border border-white/10 p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                                type="text"
                                placeholder="e.g. Funny, Professional..."
                                value={additionalDetails}
                                onChange={(e) => setAdditionalDetails(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        className="w-full bg-white text-black font-bold py-4 hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                        onClick={generateContent}
                        disabled={loading || !topic}
                    >
                        {loading ? 'TRANSMUTING...' : 'GENERATE CONTENT'}
                    </button>

                    {(loading || generatedContent) && (
                        <div className="mt-8 border-t border-white/10 pt-8 animate-in fade-in slide-in-from-top-4 duration-500">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                                    <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                    <p className="text-white/40 font-mono text-sm animate-pulse">Brewing your viral post...</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="px-3 py-1 bg-white text-black text-[10px] font-black uppercase tracking-widest">
                                            {platform}
                                        </span>
                                        <button
                                            className="text-xs font-bold text-white/60 hover:text-white transition-colors"
                                            onClick={copyToClipboard}
                                        >
                                            {copied ? '✓ COPIED' : 'COPY TO CLIPBOARD'}
                                        </button>
                                    </div>
                                    <div className="bg-white/5 border border-white/5 p-6 text-white leading-relaxed whitespace-pre-wrap font-medium">
                                        {generatedContent}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
