import React, { useState } from 'react';
import Starfield from './Starfield';
import { 
    Cpu, Menu, X, ShoppingCart, 
    ShieldAlert, RadioTower, Copy, 
    Instagram, Youtube, MessageCircle 
} from 'lucide-react';
import { SITE_CONFIG } from './constants';

const App: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // Contact Form State
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
    };

    const copyToClipboard = () => {
        const text = SITE_CONFIG.socials.copyText;
        navigator.clipboard.writeText(text).then(() => {
            alert("Copied to clipboard!");
        });
    };

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            alert(SITE_CONFIG.content.contact.form.messages.invalidEmail);
            return;
        }

        if (!message.trim()) {
            alert(SITE_CONFIG.content.contact.form.messages.empty);
            return;
        }

        setFormStatus('submitting');

        const GOOGLE_FORM_URL = SITE_CONFIG.urls.googleForm;
        const formData = new FormData();
        formData.append(SITE_CONFIG.content.contact.form.fields.email, email);
        formData.append(SITE_CONFIG.content.contact.form.fields.message, message);

        try {
            await fetch(GOOGLE_FORM_URL, {
                method: 'POST',
                mode: 'no-cors', // Necessary to bypass CORS policies for Google Forms
                body: formData
            });

            setFormStatus('success');
            setEmail('');
            setMessage('');

            // Reset status after system defined timeout
            setTimeout(() => setFormStatus('idle'), SITE_CONFIG.system.formTimeout);
        } catch (error) {
            console.error("Transmission failed", error);
            setFormStatus('error');
        }
    };

    return (
        <>
            <div className="relative min-h-screen text-white">
                <Starfield />
                <div className="fixed top-0 left-0 w-full h-full -z-10 hex-bg pointer-events-none"></div>

                {/* Navigation */}
                <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur border-b border-gray-800 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <div className="flex items-center space-x-3 relative z-50">
                            <Cpu className="text-cyan-400 w-6 h-6 animate-pulse" />
                            <span className="font-cyber text-lg md:text-xl tracking-widest text-white">
                                {SITE_CONFIG.meta.navbarTitle.text}<span className="text-cyan-400">{SITE_CONFIG.meta.navbarTitle.highlight}</span>
                            </span>
                        </div>

                        <div className="hidden md:flex space-x-8 font-cyber text-xs tracking-widest">
                            {SITE_CONFIG.navigation.map((item) => (
                                <a 
                                    key={item.id} 
                                    href={`#${item.id}`} 
                                    className={`${item.highlight ? 'hover:text-yellow-400 text-yellow-500' : 'hover:text-cyan-400'} transition-colors`}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        <button 
                            onClick={toggleMenu} 
                            className="md:hidden text-cyan-400 relative z-50 p-2"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Fullscreen Menu */}
                <div 
                    className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center space-y-8 font-cyber text-xl tracking-widest transition-all duration-300 ease-in-out ${
                        isMenuOpen ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-full pointer-events-none'
                    }`}
                >
                    {SITE_CONFIG.navigation.map((item) => (
                        <a 
                            key={item.id}
                            href={`#${item.id}`} 
                            onClick={closeMenu} 
                            className={`${item.highlight ? 'text-yellow-500 hover:text-yellow-300' : 'hover:text-cyan-400 text-gray-300'} flex items-center`}
                        >
                            <span className={`text-xs mr-2 ${item.highlight ? 'text-yellow-800' : 'text-gray-600'}`}>{item.number} //</span> {item.label}
                        </a>
                    ))}
                    <a href={SITE_CONFIG.navCta.link} onClick={closeMenu} className="border border-cyan-500 px-8 py-3 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-colors">
                        {SITE_CONFIG.navCta.label}
                    </a>
                </div>

                <main className="relative z-10 pt-20">
                    {/* SECTION 1: THE PRODUCT (The Book) */}
                    <section id="hero" className="min-h-screen flex items-center justify-center relative px-4 md:px-6 border-b border-gray-900 py-16 md:py-0">
                        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6 order-2 lg:order-1 text-center lg:text-left">
                                <div className="inline-flex items-center space-x-2 px-3 py-1 border border-cyan-500/50 bg-cyan-900/10 text-cyan-400 text-[10px] font-cyber tracking-widest uppercase mb-4">
                                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                                    <span>{SITE_CONFIG.content.hero.badge}</span>
                                </div>

                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-cyber leading-tight text-white break-words">
                                    {SITE_CONFIG.content.hero.title.main}
                                    <div className="glitch-wrapper mt-2 block">
                                        <span className="glitch text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500" data-text={SITE_CONFIG.content.hero.title.glitch}>{SITE_CONFIG.content.hero.title.glitch}</span>
                                    </div>
                                </h1>

                                <p className="text-base md:text-xl text-gray-300 font-light leading-relaxed max-w-lg mx-auto lg:mx-0 border-l-2 border-yellow-500 pl-4 text-left">
                                    {SITE_CONFIG.content.hero.description.prefix} <span className="text-white font-bold">{SITE_CONFIG.content.hero.description.highlight}</span> <br />
                                    {SITE_CONFIG.content.hero.description.suffix}
                                </p>
                                
                                <div className="flex flex-col md:flex-row gap-4 pt-4 w-full md:w-auto justify-center lg:justify-start">
                                    <a href={SITE_CONFIG.urls.amazon} target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-gray-200 text-black font-bold py-4 px-8 skew-x-[-10deg] transition-all flex items-center justify-center group shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                        <span className="skew-x-[10deg] font-cyber flex items-center text-sm md:text-base">
                                            {SITE_CONFIG.content.hero.buttons.primary} <ShoppingCart className="ml-2 w-4 h-4" />
                                        </span>
                                    </a>
                                    <a href="#saga" className="border border-yellow-600 text-yellow-500 hover:bg-yellow-500/10 font-bold py-4 px-8 skew-x-[-10deg] transition-all flex items-center justify-center">
                                        <span className="skew-x-[10deg] font-cyber text-sm md:text-base">{SITE_CONFIG.content.hero.buttons.secondary}</span>
                                    </a>
                                </div>
                            </div>

                            {/* Book Visual */}
                            <div className="order-1 lg:order-2 flex flex-col justify-center items-center relative">
                                <div className="relative w-64 md:w-80 lg:w-96 aspect-[2/3] group perspective-1000 mb-8 transform hover:scale-105 transition-transform duration-500">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-600 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                                    <img src={SITE_CONFIG.content.hero.coverImage} alt="Book Cover" className="w-full h-full object-cover rounded border border-gray-700 relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]" />
                                    <div className="absolute -right-4 top-8 bg-black/90 border border-cyan-500 p-2 z-20 backdrop-blur">
                                        <div className="text-[10px] font-cyber text-cyan-400">{SITE_CONFIG.content.hero.genre}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2: THE SAGA (The Story Hook) */}
                    <section id="saga" className="py-16 md:py-24 px-4 md:px-6 border-b border-gray-900 bg-gray-900/20 relative">
                        <div className="container mx-auto max-w-5xl">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-5xl font-cyber text-white mb-4">
                                    {SITE_CONFIG.content.saga.heading.prefix} <span className="text-yellow-500">{SITE_CONFIG.content.saga.heading.highlight}</span>
                                </h2>
                                <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                {SITE_CONFIG.content.saga.cards.map((card, idx) => (
                                    <div key={idx} className={`bg-black/50 p-8 ${idx === 0 ? 'border-l-4 border-cyan-500' : 'border-r-4 border-red-500 text-right'}`}>
                                        <h3 className={`font-cyber text-xl mb-2 ${card.theme === 'cyan' ? 'text-cyan-400' : 'text-red-500'}`}>{card.title}</h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            {card.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            
                            <p className="text-center text-lg md:text-xl text-white mt-12 font-light max-w-3xl mx-auto">
                                {SITE_CONFIG.content.saga.quote}
                            </p>
                        </div>
                    </section>

                    {/* SECTION 3: THE CREATOR (The Person) */}
                    <section id="architect" className="py-16 md:py-24 px-4 md:px-6 bg-black relative border-b border-gray-900">
                        <div className="container mx-auto max-w-5xl">
                            <div className="flex flex-col md:flex-row gap-12 items-center">
                                
                                {/* Creator Stats */}
                                <div className="w-full md:w-1/3">
                                    <div className="aspect-square bg-gray-900 border border-gray-700 relative overflow-hidden flex items-center justify-center group">
                                        <img 
                                            src={SITE_CONFIG.content.creator.image} 
                                            alt={SITE_CONFIG.content.creator.name} 
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                        <div className="absolute bottom-0 left-0 w-full bg-gray-800/80 p-2 text-center">
                                            <span className="font-cyber text-xs text-cyan-400">{SITE_CONFIG.content.creator.name}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2 mt-4">
                                        {SITE_CONFIG.content.creator.stats.map((stat, idx) => (
                                            <div key={idx} className="bg-gray-900 p-2 text-[10px] font-mono text-gray-400 flex justify-between">
                                                <span>{stat.label}</span> <span className={stat.color}>{stat.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Creator Bio */}
                                <div className="w-full md:w-2/3">
                                    <h2 className="text-3xl md:text-4xl font-cyber text-white mb-6">
                                        {SITE_CONFIG.content.creator.title.prefix} <span className="text-cyan-400">{SITE_CONFIG.content.creator.title.highlight}</span>
                                    </h2>
                                    <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6">
                                        {SITE_CONFIG.content.creator.bio.intro}
                                    </p>
                                    <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6">
                                        {SITE_CONFIG.content.creator.bio.details.prefix} <strong className="text-white">{SITE_CONFIG.content.creator.bio.details.highlight}</strong> {SITE_CONFIG.content.creator.bio.details.suffix}
                                    </p>
                                    
                                    <div className="flex gap-4">
                                        <a href={`mailto:${SITE_CONFIG.content.creator.email}`} className="px-6 py-3 border border-gray-600 text-gray-300 hover:border-white hover:text-white font-cyber text-xs tracking-widest transition-colors">
                                            {SITE_CONFIG.content.creator.cta}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 4: THE MISSION (The Struggle) */}
                    <section id="mission" className="py-16 md:py-24 px-4 md:px-6 bg-red-900/5 relative overflow-hidden">
                        {/* Background Grid */}
                        <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(rgba(255, 0, 60, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 60, 0.03) 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>

                        <div className="container mx-auto max-w-4xl relative z-10 text-center">
                            <div className="inline-block p-3 rounded-full bg-red-500/10 mb-6">
                                <ShieldAlert className="w-8 h-8 text-red-500" />
                            </div>
                            <h2 className="text-2xl md:text-4xl font-cyber text-white mb-6">
                                {SITE_CONFIG.content.mission.heading.prefix} <span className="text-red-500">{SITE_CONFIG.content.mission.heading.highlight}</span>
                            </h2>
                            <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed mb-8">
                                {SITE_CONFIG.content.mission.intro.text} <br />
                                <span className="text-white font-bold text-xl block mt-4">{SITE_CONFIG.content.mission.intro.highlight}</span>
                            </p>
                            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                                {SITE_CONFIG.content.mission.subtext.text} <br />
                                <strong>{SITE_CONFIG.content.mission.subtext.highlight}</strong>
                            </p>

                            {/* Action Protocols */}
                            <div id="purchase" className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-12">
                                
                                {/* Action 1: Buy Book */}
                                <div className="bg-black/80 border border-gray-700 p-6 rounded hover:border-yellow-500 transition-colors group">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-cyber text-yellow-500">{SITE_CONFIG.content.mission.protocolA.title}</h3>
                                        <ShoppingCart className="text-gray-600 group-hover:text-yellow-500 transition-colors" />
                                    </div>
                                    <p className="text-xs text-gray-500 mb-4">{SITE_CONFIG.content.mission.protocolA.desc}</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {SITE_CONFIG.content.mission.protocolA.vendors.map((vendor, idx) => (
                                            <a key={idx} href={vendor.url} target="_blank" rel="noopener noreferrer" className={`vendor-btn text-xs ${vendor.className}`}>
                                                <span>{vendor.name}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Action 2: The Signal */}
                                <div className="bg-black/80 border border-gray-700 p-6 rounded hover:border-cyan-500 transition-colors group">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-cyber text-cyan-400">{SITE_CONFIG.content.mission.protocolB.title}</h3>
                                        <RadioTower className="text-gray-600 group-hover:text-cyan-500 transition-colors" />
                                    </div>
                                    <p className="text-xs text-gray-500 mb-4">{SITE_CONFIG.content.mission.protocolB.desc}</p>
                                    <div className="bg-gray-900 p-3 rounded font-mono text-[10px] text-gray-400 mb-3 relative">
                                        {SITE_CONFIG.content.mission.protocolB.copyInstruction}
                                        <button onClick={copyToClipboard} className="absolute top-2 right-2 text-cyan-400 hover:text-white transition-colors">
                                            <Copy className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <a href={SITE_CONFIG.urls.twitterIntent} target="_blank" rel="noopener noreferrer" className="block text-center border border-cyan-500/50 text-cyan-400 py-3 font-cyber text-xs hover:bg-cyan-500 hover:text-black transition-colors">
                                        {SITE_CONFIG.content.mission.protocolB.cta}
                                    </a>
                                </div>

                            </div>
                        </div>
                    </section>

                    {/* SECTION: CONTACT */}
                    <section id="contact" className="py-16 px-4 md:px-6 bg-black border-t border-gray-900">
                        <div className="container mx-auto max-w-2xl text-center">
                            <h2 className="text-xl font-cyber text-gray-500 mb-8">{SITE_CONFIG.content.contact.title}</h2>
                            <form className="space-y-4 text-left" onSubmit={handleContactSubmit}>
                                <input 
                                    type="email" 
                                    placeholder={SITE_CONFIG.content.contact.form.placeholders.email}
                                    className="term-input" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={formStatus === 'submitting'}
                                    required
                                />
                                <textarea 
                                    rows={3} 
                                    placeholder={SITE_CONFIG.content.contact.form.placeholders.message}
                                    className="term-input resize-none"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    disabled={formStatus === 'submitting'}
                                    required
                                ></textarea>
                                <button 
                                    type="submit"
                                    disabled={formStatus === 'submitting'}
                                    className={`w-full font-bold py-3 font-cyber transition-colors ${
                                        formStatus === 'success' 
                                        ? 'bg-green-500 text-black cursor-default' 
                                        : formStatus === 'error'
                                        ? 'bg-red-500 text-white'
                                        : 'bg-white text-black hover:bg-cyan-400'
                                    }`}
                                >
                                    {formStatus === 'submitting' ? SITE_CONFIG.content.contact.form.buttons.sending : 
                                     formStatus === 'success' ? SITE_CONFIG.content.contact.form.buttons.success : 
                                     formStatus === 'error' ? SITE_CONFIG.content.contact.form.buttons.error : 
                                     SITE_CONFIG.content.contact.form.buttons.send}
                                </button>
                                
                                {formStatus === 'success' && (
                                    <p className="text-green-400 text-xs font-mono text-center mt-2 animate-pulse">
                                        {SITE_CONFIG.content.contact.form.messages.success}
                                    </p>
                                )}
                            </form>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="py-12 border-t border-gray-900 bg-black text-center relative z-10">
                        <div className="flex justify-center items-center space-x-8 mb-8 opacity-60">
                            <a href={SITE_CONFIG.urls.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors"><Instagram className="w-6 h-6" /></a>
                            <a href={SITE_CONFIG.urls.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors"><Youtube className="w-6 h-6" /></a>
                        </div>
                        <p className="text-[10px] text-gray-700 font-mono">
                            {SITE_CONFIG.content.footer.copyright}
                        </p>
                        <p className="text-[10px] text-gray-700 font-mono mt-2 flex items-center justify-center gap-1">
                            {SITE_CONFIG.content.footer.credit} 
                            <a href={SITE_CONFIG.urls.mxsStudio} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors underline underline-offset-2 decoration-gray-800 hover:decoration-cyan-400">
                                {SITE_CONFIG.content.footer.designer}
                            </a> 
                            with <span className="text-red-500">❤️</span>
                        </p>
                    </footer>
                </main>
                
                {/* Sticky WhatsApp - Moved inside to ensure proper stacking and structure */}
                <a 
                    href={SITE_CONFIG.urls.whatsapp} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="fixed bottom-8 right-6 z-[100] group transition-transform hover:scale-110"
                    style={{
                        bottom: 'calc(2rem + env(safe-area-inset-bottom))',
                        right: 'calc(1.5rem + env(safe-area-inset-right))'
                    }}
                >
                    <div className="whatsapp-icon-box">
                        <div className="ping-ring"></div>
                        <MessageCircle className="w-6 h-6 text-green-500 relative z-10" />
                    </div>
                </a>
            </div>
        </>
    );
};

export default App;