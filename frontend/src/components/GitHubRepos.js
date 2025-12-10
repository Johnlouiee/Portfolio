import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch, FaCircle } from 'react-icons/fa';
import './GitHubRepos.css';

const GitHubRepos = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const GITHUB_USERNAME = 'Johnlouiee';

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
    try {
      setLoading(true);
      // Fetch repositories from GitHub API
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
      );

      if (!response.ok) {
        throw new Error(`GitHub API error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Filter out forks if you only want original repos, or keep all
      // You can change `!repo.fork` to `true` if you want to include forks
      const filteredRepos = data
        .filter(repo => !repo.fork) // Remove forked repositories
        .map(repo => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || 'No description available',
          language: repo.language || 'Other',
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          url: repo.html_url,
          homepage: repo.homepage,
          updated: repo.updated_at,
          topics: repo.topics || [],
          size: repo.size
        }))
        .sort((a, b) => new Date(b.updated) - new Date(a.updated)); // Sort by most recently updated

      setRepos(filteredRepos);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error);
      setError('Failed to load repositories. Please try again later.');
      setLoading(false);
    }
  };

  const getLanguageColor = (language) => {
    const colors = {
      'JavaScript': '#f1e05a',
      'TypeScript': '#2b7489',
      'HTML': '#e34c26',
      'CSS': '#563d7c',
      'PHP': '#4F5D95',
      'Python': '#3572A5',
      'Java': '#b07219',
      'C++': '#f34b7d',
      'C': '#555555',
      'Ruby': '#701516',
      'Go': '#00ADD8',
      'Rust': '#dea584',
      'Other': '#586e75'
    };
    return colors[language] || colors['Other'];
  };

  if (loading) {
    return (
      <section id="github-repos" className="section github-repos">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading repositories...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="github-repos" className="section github-repos">
        <div className="container">
          <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchRepositories} className="retry-btn">
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="github-repos" className="section github-repos">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            My GitHub Repositories
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Check out my projects on{' '}
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              GitHub
            </a>
          </motion.p>
        </motion.div>

        <motion.div
          className="repos-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {repos.map((repo, index) => (
            <motion.div
              key={repo.id}
              className="repo-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onClick={() => window.open(repo.url, '_blank')}
            >
              <div className="repo-header">
                <div className="repo-icon">
                  <FaGithub />
                </div>
                <h3 className="repo-name">{repo.name}</h3>
              </div>

              <p className="repo-description">{repo.description}</p>

              <div className="repo-footer">
                <div className="repo-meta">
                  <div className="repo-language">
                    <FaCircle
                      style={{ color: getLanguageColor(repo.language) }}
                    />
                    <span>{repo.language}</span>
                  </div>
                  <div className="repo-stats">
                    <span className="repo-stat">
                      <FaStar />
                      {repo.stars}
                    </span>
                    <span className="repo-stat">
                      <FaCodeBranch />
                      {repo.forks}
                    </span>
                  </div>
                </div>

                {repo.topics.length > 0 && (
                  <div className="repo-topics">
                    {repo.topics.slice(0, 3).map((topic, topicIndex) => (
                      <span key={topicIndex} className="topic-tag">
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="repo-link-overlay">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  View on GitHub <FaGithub />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {repos.length === 0 && (
          <motion.div
            className="no-repos"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p>No repositories found.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GitHubRepos;

