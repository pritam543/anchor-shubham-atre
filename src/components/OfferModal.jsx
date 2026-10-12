import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, CheckCircle, MessageSquare } from 'lucide-react';

const OfferModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">

        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          className="bg-white border-4 border-[#FF007F] rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl text-center"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-[#1E293B] text-white p-2 rounded-full hover:bg-[#FF007F] transition-all"
          >
            <X size={20} />
          </button>

          <div className="inline-flex items-center gap-2 bg-[#FF007F] text-white px-4 py-1 rounded-full font-funky font-black text-xs uppercase mb-3 animate-bounce">
            <Gift className="w-4 h-4" /> SPECIAL EVENT DISCOUNT
          </div>

          <h3 className="text-3xl font-black font-funky text-[#1E293B] mb-2">
            UNLOCK <span className="text-[#FF007F]">FLAT 20% OFF!</span> 🎉
          </h3>

          <p className="text-[#475569] font-semibold text-sm mb-6">
            Book Anchor Shubham Atre for your upcoming Wedding, Sangeet, or Haldi Games & get exclusive complimentary games hosting!
          </p>

          <div className="bg-[#FFFBEB] border-2 border-[#D4AF37] p-4 rounded-2xl text-left space-y-2 mb-6">
            <div className="flex items-center gap-2 text-xs font-black text-[#1E293B]">
              <CheckCircle className="w-4 h-4 text-[#FF007F]" /> Free Custom Family Game Scripting
            </div>
            <div className="flex items-center gap-2 text-xs font-black text-[#1E293B]">
              <CheckCircle className="w-4 h-4 text-[#FF007F]" /> Haldi & Mehendi Stage Couple Showdown
            </div>
            <div className="flex items-center gap-2 text-xs font-black text-[#1E293B]">
              <CheckCircle className="w-4 h-4 text-[#FF007F]" /> High Voltage Crowd Engagement
            </div>
          </div>

          <a
            href="https://wa.me/916232091754?text=Hi%20Shubham,%20I%20want%20to%20claim%20the%20Special%2020%25%20Offer!"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full bg-[#FF007F] hover:bg-[#D4AF37] text-white font-funky font-black py-4 rounded-2xl uppercase tracking-wider transition-all shadow-lg border-2 border-[#1E293B] flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-5 h-5" /> Claim Offer On WhatsApp Now
          </a>
        </motion.div>

      </div>
    </AnimatePresence>
  );
};

export default OfferModal;