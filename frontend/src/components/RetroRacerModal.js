import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTrophy, FaGamepad, FaPlay, FaRedo, FaUser, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import './RetroRacerModal.css';

const DEFAULT_LEADERBOARD = [
  { id: 1, name: 'John Louie (Owner)', time: '0:28.45', score: 2850, date: '2026-08-10' },
  { id: 2, name: 'TurboCoder', time: '0:31.12', score: 2620, date: '2026-08-09' },
  { id: 3, name: 'BugSlayer_99', time: '0:34.80', score: 2380, date: '2026-08-08' },
  { id: 4, name: 'AsyncRacer', time: '0:37.20', score: 2150, date: '2026-08-07' },
  { id: 5, name: 'SyntaxNinja', time: '0:41.05', score: 1900, date: '2026-08-06' }
];

const RetroRacerModal = ({ isOpen, onClose }) => {
  const [nickname, setNickname] = useState(() => {
    return localStorage.getItem('devRacer_nickname') || '';
  });
  const [tempName, setTempName] = useState('');
  const [activeTab, setActiveTab] = useState('gate'); // 'gate', 'game', 'leaderboard'
  const [gameKey, setGameKey] = useState(0); // Forces fresh game restart
  const [leaderboard, setLeaderboard] = useState(() => {
    const saved = localStorage.getItem('devRacer_leaderboard');
    return saved ? JSON.parse(saved) : DEFAULT_LEADERBOARD;
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameResult, setGameResult] = useState(null);

  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    if (nickname) {
      setTempName(nickname);
    }
  }, [nickname]);

  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'beep') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(600, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'go') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(1200, now);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'start') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'boost') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'crash') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.4);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'finish') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        osc.frequency.setValueAtTime(783.99, now + 0.2);
        osc.frequency.setValueAtTime(1046.50, now + 0.3);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      }
    } catch (e) {
      console.log('Audio Context error:', e);
    }
  };

  const handleRegisterNickname = (e) => {
    e.preventDefault();
    if (!tempName.trim()) return;
    const cleanName = tempName.trim().substring(0, 15);
    setNickname(cleanName);
    localStorage.setItem('devRacer_nickname', cleanName);
    playSound('start');
    restartGame();
  };

  const restartGame = () => {
    setGameResult(null);
    setGameKey((prev) => prev + 1);
    setActiveTab('game');
  };

  const saveScoreToLeaderboard = (scoreVal, timeSec) => {
    const formattedTime = `0:${timeSec.toFixed(2).padStart(5, '0')}`;
    const newEntry = {
      id: Date.now(),
      name: nickname || 'Anonymous Racer',
      time: formattedTime,
      score: Math.round(scoreVal),
      date: new Date().toISOString().split('T')[0]
    };

    setLeaderboard((prev) => {
      const updated = [...prev, newEntry].sort((a, b) => b.score - a.score).slice(0, 10);
      localStorage.setItem('devRacer_leaderboard', JSON.stringify(updated));
      return updated;
    });

    setGameResult({
      score: Math.round(scoreVal),
      time: formattedTime
    });
  };

  // 60FPS Game Loop with 3, 2, 1, GO! Countdown
  useEffect(() => {
    if (activeTab !== 'game' || !isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = 480);
    let height = (canvas.height = 360);

    let playerX = width / 2 - 16;
    const playerY = height - 60;
    const carWidth = 32;
    const carHeight = 50;

    let speed = 4;
    let score = 0;
    let distance = 0;
    let maxDistance = 1000;
    let isGameOver = false;
    let isFinished = false;

    // Countdown State: 3, 2, 1, 0 (GO!)
    let countdownTimer = 3;
    let countdownText = '3';
    let countdownLastTick = performance.now();

    playSound('beep');

    let obstacles = [];
    let boosts = [];

    const keys = { left: false, right: false };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = true;
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let lastTime = performance.now();

    const spawnObstacle = () => {
      if (obstacles.length < 4 && Math.random() < 0.03) {
        obstacles.push({
          x: 100 + Math.random() * (width - 200 - 30),
          y: -50,
          type: Math.random() > 0.5 ? '🐛 Bug' : '🚫 404',
          speed: 2 + Math.random() * 2
        });
      }
    };

    const spawnBoost = () => {
      if (boosts.length < 2 && Math.random() < 0.015) {
        boosts.push({
          x: 110 + Math.random() * (width - 220 - 20),
          y: -50,
          speed: 3
        });
      }
    };

    const loop = (currentTime) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Handle Countdown
      if (countdownTimer > -1) {
        if (currentTime - countdownLastTick >= 800) {
          countdownTimer--;
          countdownLastTick = currentTime;
          if (countdownTimer === 2) {
            countdownText = '2';
            playSound('beep');
          } else if (countdownTimer === 1) {
            countdownText = '1';
            playSound('beep');
          } else if (countdownTimer === 0) {
            countdownText = 'GO!';
            playSound('go');
          }
        }
      }

      // Update positions & progressive speed after countdown finishes
      if (countdownTimer <= 0 && !isGameOver && !isFinished) {
        // Progressive Speed: starts at 3.0 and accelerates up to 10.0+ as distance increases
        speed = 3.0 + (distance / maxDistance) * 7.0;

        const steerSpeed = 220 + speed * 10;
        if (keys.left && playerX > 90) playerX -= steerSpeed * dt;
        if (keys.right && playerX < width - 90 - carWidth) playerX += steerSpeed * dt;

        distance += speed;
        score += speed * 1.2;

        if (distance >= maxDistance) {
          isFinished = true;
          playSound('finish');
          const finalTime = distance / (speed * 10);
          saveScoreToLeaderboard(score, finalTime);
        }

        spawnObstacle();
        obstacles.forEach((obs) => {
          obs.y += (speed + obs.speed);
        });

        spawnBoost();
        boosts.forEach((b) => {
          b.y += (speed + b.speed);
        });

        obstacles.forEach((obs) => {
          if (
            playerX < obs.x + 28 &&
            playerX + carWidth > obs.x &&
            playerY < obs.y + 28 &&
            playerY + carHeight > obs.y
          ) {
            isGameOver = true;
            playSound('crash');
          }
        });

        boosts = boosts.filter((b) => {
          if (
            playerX < b.x + 24 &&
            playerX + carWidth > b.x &&
            playerY < b.y + 24 &&
            playerY + carHeight > b.y
          ) {
            score += 250;
            playSound('boost');
            return false;
          }
          return b.y < height + 50;
        });

        obstacles = obstacles.filter((o) => o.y < height + 50);
      }

      // DRAW CANVAS (Minimalist Black & Charcoal)
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      // Track background
      ctx.fillStyle = '#171717';
      ctx.fillRect(80, 0, width - 160, height);

      // Track borders
      ctx.fillStyle = '#262626';
      ctx.fillRect(75, 0, 5, height);
      ctx.fillRect(width - 80, 0, 5, height);

      // White lane lines
      ctx.strokeStyle = '#ffffff';
      ctx.setLineDash([20, 20]);
      ctx.lineDashOffset = -distance % 40;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Player Car (Sleek White & Monochrome)
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(playerX, playerY, carWidth, carHeight);
      ctx.fillStyle = '#18181b';
      ctx.fillRect(playerX + 4, playerY + 10, carWidth - 8, 15);

      // Obstacles
      obstacles.forEach((obs) => {
        ctx.fillStyle = '#52525b';
        ctx.fillRect(obs.x, obs.y, 28, 28);
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px monospace';
        ctx.fillText(obs.type, obs.x - 2, obs.y + 18);
      });

      // Boosts
      boosts.forEach((b) => {
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(b.x, b.y, 24, 24);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('⚡', b.x + 4, b.y + 17);
      });

      // HUD Overlay
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px monospace';
      ctx.fillText(`DRIVER: ${nickname || 'Racer'}`, 15, 25);
      ctx.fillText(`SCORE: ${Math.round(score)}`, 15, 43);
      ctx.fillText(`SPEED: ${Math.round(speed * 20)} MPH`, 15, 61);
      ctx.fillText(`DIST: ${Math.min(100, Math.round((distance / maxDistance) * 100))}%`, width - 120, 25);

      // Progress bar
      ctx.fillStyle = '#27272a';
      ctx.fillRect(width - 125, 35, 110, 8);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(width - 125, 35, (Math.min(1, distance / maxDistance)) * 110, 8);

      // COUNTDOWN OVERLAY
      if (countdownTimer > -1) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 64px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(countdownText, width / 2, height / 2 + 20);
        ctx.textAlign = 'left';
      }

      if (isGameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.88)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 22px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CRASHED INTO BUG!', width / 2, height / 2 - 20);
        ctx.fillStyle = '#a1a1aa';
        ctx.font = '14px monospace';
        ctx.fillText(`Final Score: ${Math.round(score)}`, width / 2, height / 2 + 15);
        ctx.fillText('Click Restart to try again', width / 2, height / 2 + 45);
        ctx.textAlign = 'left';
      } else if (isFinished) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.88)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#22c55e';
        ctx.font = 'bold 22px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('FINISH LINE CLEARED!', width / 2, height / 2 - 20);
        ctx.fillStyle = '#ffffff';
        ctx.font = '14px monospace';
        ctx.fillText(`Score Saved: ${Math.round(score)}`, width / 2, height / 2 + 15);
        ctx.textAlign = 'left';
      } else {
        gameLoopRef.current = requestAnimationFrame(loop);
      }
    };

    gameLoopRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, isOpen, nickname, gameKey]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="retro-modal-overlay" onClick={onClose}>
        <motion.div
          className="retro-modal-container"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="retro-modal-header">
            <div className="retro-title">
              <FaGamepad className="retro-title-icon" />
              <span>ARCADE RACER</span>
            </div>
            <div className="retro-header-actions">
              <button
                className="sound-toggle-btn"
                onClick={() => setSoundEnabled(!soundEnabled)}
                title="Toggle Sound Effects"
              >
                {soundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
              </button>
              <button className="close-btn" onClick={onClose}>
                <FaTimes />
              </button>
            </div>
          </div>

          <div className="retro-tabs">
            <button
              className={`retro-tab ${activeTab === 'gate' ? 'active' : ''}`}
              onClick={() => setActiveTab('gate')}
            >
              <FaUser /> Driver
            </button>
            <button
              className={`retro-tab ${activeTab === 'game' ? 'active' : ''}`}
              onClick={() => {
                if (!nickname) {
                  setActiveTab('gate');
                } else {
                  restartGame();
                }
              }}
            >
              <FaPlay /> Track
            </button>
            <button
              className={`retro-tab ${activeTab === 'leaderboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('leaderboard')}
            >
              <FaTrophy /> Leaderboard
            </button>
          </div>

          {activeTab === 'gate' && (
            <div className="retro-gate-container">
              <div className="gate-arcade-badge">RACER REGISTRATION</div>
              <h2>Enter Driver Nickname</h2>
              <p>Register your nickname to display on the leaderboard standings.</p>

              <form onSubmit={handleRegisterNickname} className="nickname-form">
                <div className="input-group">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder="e.g. SpeedRacer, JohnDev..."
                    maxLength={15}
                    required
                    autoFocus
                  />
                </div>
                <button type="submit" className="retro-btn start-race-btn">
                  <FaPlay /> START RACE
                </button>
              </form>
            </div>
          )}

          {activeTab === 'game' && (
            <div className="retro-game-view">
              <canvas ref={canvasRef} className="retro-canvas" />
              <div className="game-controls-hint">
                <span>Steer: <strong>←</strong> / <strong>→</strong> or <strong>A</strong> / <strong>D</strong></span>
                <button className="retro-btn restart-btn" onClick={restartGame}>
                  <FaRedo /> Restart Track
                </button>
                {gameResult && (
                  <button className="retro-btn leaderboard-view-btn" onClick={() => setActiveTab('leaderboard')}>
                    <FaTrophy /> Standings
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div className="retro-leaderboard-view">
              <div className="leaderboard-header">
                <h2>LEADERBOARD STANDINGS</h2>
                <span className="racer-active-tag">Driver: <strong>{nickname || 'Not Set'}</strong></span>
              </div>

              <div className="leaderboard-table-container">
                <table className="leaderboard-table">
                  <thead>
                    <tr>
                      <th>RANK</th>
                      <th>DRIVER</th>
                      <th>SCORE</th>
                      <th>TIME</th>
                      <th>DATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, index) => {
                      const isCurrentUser = entry.name === nickname;
                      return (
                        <tr key={entry.id || index} className={isCurrentUser ? 'current-user-row' : ''}>
                          <td className="rank-cell">#{index + 1}</td>
                          <td className="name-cell">
                            {entry.name} {isCurrentUser && <span className="you-badge">(YOU)</span>}
                          </td>
                          <td className="score-cell">{entry.score} pts</td>
                          <td className="time-cell">{entry.time}</td>
                          <td className="date-cell">{entry.date}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="leaderboard-footer">
                <button className="retro-btn start-race-btn" onClick={restartGame}>
                  <FaPlay /> RACE AGAIN
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RetroRacerModal;
