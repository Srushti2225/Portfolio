import { Terminal, Globe, Server, Wrench, BookOpen, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import './Skills.css';

const Skills = () => {
  const skillsData = [
    {
      category: "Programming Languages",
      icon: <Terminal size={22} className="category-icon" />,
      skills: [
        { name: "Java", level: "95%" },
        { name: "C++", level: "85%" },
        { name: "C", level: "75%" },
        { name: "JavaScript", level: "80%" }
      ]
    },
    {
      category: "Frontend Dev",
      icon: <Globe size={22} className="category-icon" />,
      skills: [
        { name: "HTML5", level: "97%" },
        { name: "CSS3", level: "95%" },
        { name: "Tailwind CSS", level: "95%" },
        { name: "React.js", level: "90%" }
      ]
    },
    {
      category: "Backend & Database",
      icon: <Server size={22} className="category-icon" />,
      skills: [
        { name: "MySQL / SQL", level: "90%" },
        { name: "Node.js", level: "Learning", numericVal: "45%" }
      ]
    },
    {
      category: "UI/UX & Design",
      icon: <Palette size={22} className="category-icon" />,
      skills: [
        { name: "UI/UX Design", level: "85%" },
        { name: "Figma", level: "90%" },
        { name: "Canva", level: "85%" }
      ]
    },
    {
      category: "Tools & Technologies",
      icon: <Wrench size={22} className="category-icon" />,
      skills: [
        { name: "Git & GitHub", level: "85%" },
        { name: "VS Code", level: "90%" },
        { name: "Eclipse", level: "75%" },
        { name: "Intellij IDEA", level: "80%" }

      ]
    },
    {
      category: "Core CS Concepts",
      icon: <BookOpen size={22} className="category-icon" />,
      skills: [
        { name: "OOP (Object Oriented)", level: "95%" },
        { name: "DSA (Data Structures)", level: "85%" },
        { name: "DBMS (Database Systems)", level: "90%" },
        { name: "Computer Networks & OS", level: "75%" }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, cubicBezier: [0.19, 1, 0.22, 1] }
    }
  };

  return (
    <section id="skills">
      <h2 className="section-title">My Skills</h2>

      <motion.div 
        className="skills-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
      >
        {skillsData.map((cat, catIdx) => (
          <motion.div 
            key={catIdx} 
            className="glass-card skills-category-card interactive"
            variants={cardVariants}
          >
            <div className="category-header">
              {cat.icon}
              <h3 className="category-title">{cat.category}</h3>
            </div>

            <div className="skills-list">
              {cat.skills.map((skill, skillIdx) => {
                const isLearning = skill.level === 'Learning';
                const targetWidth = isLearning ? (skill.numericVal || '35%') : skill.level;

                return (
                  <div key={skillIdx} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      {isLearning ? (
                        <span className="learning-tag">Learning</span>
                      ) : (
                        <span className="skill-level">{skill.level}</span>
                      )}
                    </div>
                    
                    <div className="progress-bar-track">
                      <motion.div 
                        className="progress-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: targetWidth }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
