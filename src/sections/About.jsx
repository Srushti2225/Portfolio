import { GraduationCap, FolderGit2, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  const stats = [
    {
      icon: <GraduationCap size={24} />,
      title: "Education",
      desc: "B.Tech. in Computer Science Engineering",
      subdesc: "Rajarambapu Institute of Technology, Ishwarpur, Maharashtra"
    },
    
    {
      icon: <FolderGit2 size={24} />,
      title: "Projects",
      desc: "4+ Completed Projects",
      subdesc: "Disney Clone, E-commerce"
    },
    {
      icon: <Cpu size={24} />,
      title: "Tech Stack",
      desc: "15+ Technologies",
      subdesc: "Languages, DB & Tools"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] }
    }
  };

  return (
    <section id="about">
      <div className="about-container">
        
        {/* Left Side: Biography */}
        <motion.div 
          className="about-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={textVariants}
        >
          <h2 className="section-title about-title">About Me</h2>
          
          <p className="about-text">
            I'm a Computer Science Engineering student passionate about software development and problem-solving. Skilled in HTML, CSS, JavaScript, MySQL, Java, and Data Structures, I enjoy developing efficient applications and exploring new technologies to enhance my technical expertise.
          </p>

          <p className="about-text">
            My goal is to become a skilled Software Engineer capable of building impactful digital solutions. 
            I love translating complex engineering requirements into beautiful, accessible user experiences that perform seamlessly.
          </p>

          <div className="about-tech-focus">
            <span className="tech-tag">Java</span>
            <span className="tech-tag">Frontend Development</span>
            <span className="tech-tag">Database Integration</span>
            <span className="tech-tag">Responsive UI/UX Design</span>
          </div>
        </motion.div>

        {/* Right Side: Stats Grid */}
        <motion.div 
          className="about-stats-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx} 
              className="glass-card stat-card interactive"
              variants={cardVariants}
            >
              <div className="stat-icon-wrapper">
                {stat.icon}
              </div>
              <h3 className="stat-number">{stat.title}</h3>
              <p className="stat-label">{stat.desc}</p>
              <span className="stat-desc">{stat.subdesc}</span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default About;
