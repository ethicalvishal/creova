import React, { useState, useEffect } from 'react';
import { getTimeUntilLaunch, getPreLaunchMessage, getLaunchDayMessage } from '../utils/launchNotification';
import { isLaunched } from '../constants';

const LaunchCountdown = () => {
  const [countdown, setCountdown] = useState(getTimeUntilLaunch());
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Update countdown every second
    const interval = setInterval(() => {
      const newCountdown = getTimeUntilLaunch();
      setCountdown(newCountdown);
      
      // Update message based on launch status
      if (newCountdown.isLaunched) {
        setMessage(getLaunchDayMessage());
      } else {
        setMessage(getPreLaunchMessage());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Don't show countdown if already launched
  if (isLaunched()) {
    return null;
  }

  return (
    <div className="launch-countdown" style={{
      background: 'linear-gradient(135deg, #0FC2C0 0%, #12c2e9 100%)',
      color: 'white',
      padding: '2.5rem 0 2rem 0',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 28,
      boxShadow: '0 8px 32px 0 rgba(25,118,210,0.13)',
      marginBottom: 0,
      maxWidth: 520,
      marginLeft: 'auto',
      marginRight: 'auto',
      backdropFilter: 'blur(10px)',
      border: '2.5px solid rgba(25,118,210,0.10)'
    }}>
      {/* Background pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.08,
        background: 'radial-gradient(circle at 30% 70%, #43cea2 0%, transparent 60%), radial-gradient(circle at 80% 20%, #1976d2 0%, transparent 60%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div className="container position-relative" style={{zIndex: 2}}>
        <div className="row justify-content-center">
          <div className="col-12">
            {message && (
              <>
                <h2 className="mb-3" style={{ fontSize: '2.2rem', fontWeight: '800', letterSpacing: '-1px', textShadow: '0 2px 12px #43cea233' }}>
                  {message.title}
                </h2>
                <p className="lead mb-4" style={{ fontSize: '1.15rem', opacity: 0.92, fontWeight: 600 }}>
                  {message.subtitle}
                </p>
              </>
            )}
            <div className="countdown-timer mb-2" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, flexWrap: 'nowrap'}}>
              {[
                {label: 'Days', value: countdown.days},
                {label: 'Hours', value: countdown.hours.toString().padStart(2, '0')},
                {label: 'Minutes', value: countdown.minutes.toString().padStart(2, '0')},
                {label: 'Seconds', value: countdown.seconds.toString().padStart(2, '0')}
              ].map((unit, idx, arr) => (
                <React.Fragment key={unit.label}>
                  <div className="countdown-item" style={{
                    background: 'rgba(255,255,255,0.18)',
                    borderRadius: '12px',
                    padding: '0.5rem 0.4rem',
                    margin: 0,
                    minWidth: 44,
                    boxShadow: '0 2px 8px 0 #43cea233',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    fontFamily: 'monospace, Segoe UI, Arial, sans-serif',
                    fontWeight: 900,
                    fontSize: '1.3rem',
                    color: '#fff',
                    textShadow: '0 0 8px #43cea299, 0 2px 4px #1976d2cc',
                    letterSpacing: '1px',
                    transition: 'box-shadow 0.2s',
                    animation: 'glowCountdown 2s infinite alternate'
                  }}>
                    <span style={{fontSize: '1.3rem', fontWeight: 900, lineHeight: 1}}>{unit.value}</span>
                    <span style={{
                      fontSize: '0.7rem',
                      opacity: 0.85,
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      letterSpacing: '0.5px',
                      marginTop: 4
                    }}>{unit.label}</span>
                  </div>
                  {idx < arr.length - 1 && (
                    <div style={{
                      width: 10,
                      height: 5,
                      borderRadius: 8,
                      background: 'linear-gradient(90deg, #1976d2 0%, #43cea2 100%)',
                      opacity: 0.32,
                      margin: '0 2px',
                      alignSelf: 'center',
                      animation: 'pulseAccent 1.5s infinite alternate, moveAccent 3s linear infinite'
                    }}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
            {message && message.message && (
              <p className="mb-0 mt-3" style={{ fontSize: '1.02rem', opacity: 0.85, fontWeight: 500 }}>
                {message.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes glowCountdown {
          0% { box-shadow: 0 2px 8px 0 #43cea233; }
          100% { box-shadow: 0 2px 16px 0 #43cea299; }
        }
        @keyframes pulseAccent {
          0% { opacity: 0.18; }
          100% { opacity: 0.38; }
        }
        @keyframes moveAccent {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @media (max-width: 600px) {
          .countdown-timer {
            gap: 2px !important;
            flex-wrap: wrap !important;
          }
          .countdown-item {
            min-width: 36px !important;
            padding: 0.4rem 0.2rem !important;
            font-size: 1.1rem !important;
          }
          .countdown-item span:first-child {
            font-size: 1.1rem !important;
          }
          .countdown-item span:last-child {
            font-size: 0.65rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LaunchCountdown; 