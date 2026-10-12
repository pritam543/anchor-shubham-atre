import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Mic, Sparkles, PartyPopper, Flame } from 'lucide-react';

const Hero = ({ onOpenOffer }) => {
  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center text-white overflow-hidden">
      
      {/* Background Image with Adjustable Opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{ backgroundImage: `url('/images/Image1.jpeg')` }}
      />
      {/* Overlay Dark Tint for Opacity Adjustment */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19]/90 via-[#0B0F19]/80 to-[#1E293B]/85" />

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#FF007F]/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D4AF37]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center lg:text-left"
          >
            {/* SEO Location Badge */}
            <div className="inline-flex items-center gap-2 bg-[#FF007F] text-white border-2 border-white px-4 py-2 rounded-full shadow-lg transform -rotate-1">
              <PartyPopper className="w-5 h-5 animate-bounce" />
              <span className="text-xs sm:text-sm font-black tracking-widest font-funky uppercase">
                Best Anchor in Indore & Stage Host
              </span>
            </div>

            {/* SEO H1 Tag with Main Keywords */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight font-funky">
              ANCHOR <span className="text-[#FFBF00]">SHUBHAM</span> <span className="text-[#FF007F]">ATRE</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF007F] via-[#FFBF00] to-[#38BDF8] text-2xl sm:text-4xl lg:text-5xl block mt-2">
                Top Wedding & Corporate Host in Indore
              </span>
            </h1>

            {/* SEO Description Paragraph */}
            <p className="text-base sm:text-lg text-gray-200 max-w-xl mx-auto lg:mx-0 font-semibold leading-relaxed">
              Looking for the <strong className="text-[#FFBF00]">Best Anchor in Indore</strong>? Anchor Shubham Atre turns weddings, sangeet, haldi games, and corporate shows into a mega festival of laughter, crazy stage games, and 100% non-stop energy!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="https://wa.me/919754133022?text=Hello%20Anchor%20Shubham,%20I%20want%20to%20book%20a%20show!"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-[#FF007F] hover:bg-[#D4AF37] text-white px-8 py-4 rounded-full font-black font-funky text-sm uppercase tracking-wider transition-all transform hover:scale-105 shadow-xl border-2 border-white flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Book Your Show Now
              </a>

              <button
                onClick={onOpenOffer}
                className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#FF007F] text-[#1E293B] hover:text-white px-8 py-4 rounded-full font-black font-funky text-sm uppercase tracking-wider transition-all transform hover:scale-105 border-2 border-white flex items-center justify-center gap-2 shadow-lg"
              >
                <Flame className="w-5 h-5 text-red-600 animate-pulse" />
                Special Offers Pop-Up
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t-2 border-white/20">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-center">
                <h3 className="text-2xl sm:text-4xl font-black text-[#FFBF00] font-funky">500+</h3>
                <p className="text-xs sm:text-sm text-gray-200 font-bold uppercase">Mega Shows</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-center">
                <h3 className="text-2xl sm:text-4xl font-black text-[#FF007F] font-funky">100k+</h3>
                <p className="text-xs sm:text-sm text-gray-200 font-bold uppercase">Crazy Fans</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-center">
                <h3 className="text-2xl sm:text-4xl font-black text-[#38BDF8] font-funky">100%</h3>
                <p className="text-xs sm:text-sm text-gray-200 font-bold uppercase">Masti Guaranteed</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden border-4 border-[#FF007F] shadow-2xl transform rotate-2 hover:rotate-0 transition-transform">
              <img
                src="/images/Image1.jpeg"
                alt="Anchor Shubham Atre - Best Anchor in Indore for Wedding and Sangeet"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#1E293B]/90 backdrop-blur-md border-2 border-[#D4AF37] p-3 rounded-2xl text-center">
                <p className="font-funky font-black text-sm text-[#FFBF00]">? "No Boredom, Only High Voltage!"</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
