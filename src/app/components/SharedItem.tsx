'use client';
import { motion } from 'framer-motion';
import EarthCanvas from './canvas/Earth';

// Define type for section positions
interface SectionConfig {
  x?: string;
  y?: string;
  visible: boolean;
}

// Define type for section positions object
interface SectionPositions {
  [key: string]: SectionConfig;
}

// Define valid section keys as a type
type SectionKey = 'hero' | 'about' | 'skills' | 'projects' | 'contact';

// Define props interface for the component
interface SharedItemProps {
  section: SectionKey;
}

const sectionPositions: SectionPositions = {
  hero: { x: '20vw', y: '30vh', visible: true },
  about: { x: '80vw', y: '40vh', visible: true },
  skills: { visible: false },
  projects: { visible: false },
  contact: { visible: false },
};

const SharedItem = ({ section }: SharedItemProps) => {
  const config = sectionPositions[section] || { visible: false };

  if (!config.visible) return null;

  return (
    <motion.div
      animate={{ x: config.x, y: config.y }}
      initial={{ x: 0, y: 0 }}
      transition={{ duration: 1 }}
      className="fixed z-10 w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52"
    >
      <EarthCanvas />
    </motion.div>
  );
};

export default SharedItem;