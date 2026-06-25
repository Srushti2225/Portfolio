import { useState } from 'react';
import { ExternalLink, Sparkles, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';


// Custom inline SVG for Github (deprecated in recent lucide-react)
const Github = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'React.js', 'Tailwind CSS', 'Full Stack', 'HTML & CSS'];

  const projectsData = [
    {
      id: 1,
      title: "Disney+ Clone",
      category: "React.js",
      description: "Developed a Disney+ inspired streaming platform UI using React.js and Tailwind CSS. Implemented dynamic movie fetching, responsive layouts, and reusable components.",
      image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=600",
      tags: ["React.js", "Tailwind CSS", "JavaScript", "TMDB API"],
      demoLink: "https://disney-clone-alpha.vercel.app",
      codeLink: "https://github.com/srushti2225/disney-clone"
    },
    {
      id: 2,
      title: "Tailwind CSS Landing Page",
      category: "Tailwind CSS",
      description: "A modern responsive landing page built using Tailwind CSS with clean UI design and mobile-first responsiveness.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
      tags: ["HTML", "Tailwind CSS"],
      demoLink: "https://srushti2225.github.io/Tailwindcss-project/",
      codeLink: "https://github.com/srushti2225/Tailwindcss-project"
    },
    {
      id: 3,
      title: "Restaurant Menu Website",
      category: "HTML & CSS",
      description: "Interactive restaurant menu application featuring category filtering and responsive design.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600",
      tags: ["HTML", "CSS"],
      demoLink: "https://srushti2225.github.io/Restaurant-menu/",
      codeLink: "https://github.com/srushti2225/Restaurant-menu"
    },
    
  ];

  // Separated Featured project as requested (Camping Booking Website)
  const featuredProject = {
    title: "Camping Booking Website",
    category: "Full Stack",
    description: "A complete full-stack camping booking platform developed independently using HTML, CSS, JavaScript, PHP, and MySQL. Features include booking management, admin panel, review system, dynamic content management, and database integration.",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800",
    tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    highlights: [
      "Booking management flow",
      "Dynamic Admin Panel",
      "Interactive Review system",
      "Database integration (MySQL)"
    ],
    demoLink: "#contact", // custom scroll anchor to contact since it was developed locally
  };

  // Filter projects based on selection
  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter(project => {
        if (activeFilter === 'React.js') return project.tags.includes('React.js');
        if (activeFilter === 'Tailwind CSS') return project.tags.includes('Tailwind CSS');
        if (activeFilter === 'HTML & CSS') return project.tags.includes('CSS') || (project.tags.includes('HTML') && !project.tags.includes('Tailwind CSS'));
        if (activeFilter === 'Full Stack') return false; // featured project handles Full Stack
        return true;
      });

  const shouldShowFeatured = activeFilter === 'All' || activeFilter === 'Full Stack';

  return (
    <section id="projects">
      <h2 className="section-title">My Projects</h2>

      <div className="projects-container">
        {/* Filter Navigation */}
        <div className="filter-tabs">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-tab interactive ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Featured Project Section */}
        <AnimatePresence mode="wait">
          {shouldShowFeatured && (
            <motion.div
              key="featured"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="glass-card featured-project-card interactive"
            >
              <div className="featured-image-wrapper">
                <img 
                  src={featuredProject.image} 
                  alt={featuredProject.title} 
                  className="featured-image" 
                />
              </div>

              <div className="featured-info">
                <span className="featured-badge">
                  <Sparkles size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                  Featured Project
                </span>
                <h3 className="featured-title">{featuredProject.title}</h3>
                
                <p className="featured-desc">
                  {featuredProject.description}
                </p>

                <div className="featured-highlights">
                  {featuredProject.highlights.map((highlight, index) => (
                    <span key={index} className="highlight-item">
                      <CheckCircle size={14} style={{ color: 'var(--accent-cyan)' }} />
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="project-tags">
                  {featuredProject.tags.map((tag, idx) => (
                    <span key={idx} className="project-tag">{tag}</span>
                  ))}
                </div>

                <div className="project-actions">
                  <a 
                    href={featuredProject.demoLink} 
                    className="glow-btn project-btn interactive"
                    onClick={(e) => {
                      if (featuredProject.demoLink.startsWith('#')) {
                        e.preventDefault();
                        document.getElementById(featuredProject.demoLink.substring(1)).scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <span>Request Demo</span>
                    <ExternalLink size={14} />
                  </a>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Standard Projects Grid */}
        <motion.div 
          className="projects-grid"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="glass-card project-card interactive"
              >
                <div className="project-image-wrapper">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="project-image" 
                  />
                </div>

                <div className="project-card-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  
                  <div className="project-tags">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="project-tag">{tag}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <a 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="glow-btn project-btn interactive"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={14} />
                    </a>
                    <a 
                      href={project.codeLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="outline-btn project-btn interactive"
                    >
                      <Github size={14} />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
