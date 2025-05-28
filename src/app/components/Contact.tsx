'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Send, CheckCircle, RotateCcw } from 'lucide-react';

type FormStage = 'default' | 'sending' | 'success';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const [stage, setStage] = useState<FormStage>('default');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Move to sending stage
    setStage('sending');
    
    // Simulate API call or actual email sending
    await new Promise(resolve => setTimeout(resolve, 3500));
    
    // Move to success stage
    setStage('success');
  };

  const resetForm = () => {
    setStage('default');
    setFormData({ name: '', email: '', message: '' });
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.message.trim();

  return (
    <section id="contact" className="min-h-screen py-20 px-4 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-indigo-400 text-sm uppercase mb-4 tracking-[0.3em] font-medium"
          >
            Get in touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-400 bg-clip-text text-transparent"
          >
            Contact Me
          </motion.h2>
        </motion.div>

        {/* Main Content */}
        <div className="relative min-h-[600px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {/* Stage 1: Default View */}
            {stage === 'default' && (
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full grid lg:grid-cols-2 gap-12 items-center"
              >
                {/* Left Side - Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6"
                >
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
                    <h3 className="text-2xl font-bold text-white mb-6">Send me a message</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                          placeholder="John Doe"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                          placeholder="john@example.com"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={5}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
                          placeholder="Tell me about your project..."
                          required
                        />
                      </div>

                      <motion.button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send size={20} />
                        Launch Message
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Right Side - Rocket */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-center justify-center lg:justify-end"
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 2, -2, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                    <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20">
                      <Rocket size={48} className="text-white transform rotate-45" />
                    </div>
                    
                    {/* Ground effect */}
                    <motion.div
                      animate={{
                        scaleX: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-3 bg-white/20 rounded-full blur-sm"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* Stage 2: Sending Animation */}
            {stage === 'sending' && (
              <motion.div
                key="sending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center"
              >
                <motion.div
                  initial={{ scale: 1, y: 0 }}
                  animate={{ 
                    y: [-300, -400, -500],
                    scale: [1, 0.8, 0.5],
                    rotate: [45, 45, 45]
                  }}
                  transition={{ 
                    duration: 3,
                    ease: "easeOut",
                    times: [0, 0.6, 1]
                  }}
                  className="relative mb-8"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                    <Rocket size={32} className="text-white" />
                  </div>
                  
                  {/* Rocket trail */}
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: [0, 1, 0.8], scaleY: [0, 1, 2] }}
                    transition={{ duration: 3, ease: "easeOut" }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 w-4 h-20 bg-gradient-to-b from-orange-400 via-red-500 to-transparent rounded-full origin-top"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full"
                    />
                    <span className="text-xl text-white font-semibold">Launching your message...</span>
                  </div>
                  <p className="text-gray-400">Please wait while we send your message to space</p>
                </motion.div>
              </motion.div>
            )}

            {/* Stage 3: Success Message */}
            {stage === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-md mx-auto"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, type: "spring", bounce: 0.5 }}
                  className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                >
                  <CheckCircle size={48} className="text-white" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="space-y-4 mb-8"
                >
                  <h3 className="text-3xl font-bold text-white">Message Sent Successfully! 🚀</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Thank you for reaching out! Your message has been delivered successfully. 
                    I'll get back to you as soon as possible.
                  </p>
                  <div className="text-4xl">👋</div>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetForm}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 flex items-center gap-2 mx-auto"
                >
                  <RotateCcw size={20} />
                  Send Another Message
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating particles during sending */}
      {/* <AnimatePresence>
        {stage === 'sending' && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-indigo-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -100],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 1.5,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence> */}
    </section>
  );
};

export default Contact;
