
export const themes = {
  liquid: {
    name: 'Liquid Splash',
    background: 'linear-gradient(135deg, #E2ECF1 0%, #CBDCE5 100%)',
    text: '#1C3545',
    panelBg: 'rgba(255, 255, 255, 0.25)',
    panelBorder: 'rgba(255, 255, 255, 0.6)',
    inputBg: 'rgba(207, 225, 235, 0.6)', 
    buttonGradient: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
    buttonShadow: 'rgba(2, 132, 199, 0.35)',
    toggleTrack: 'rgba(0, 0, 0, 0.08)',
    toggleTrackBorder: 'rgba(255, 255, 255, 0.5)',
    toggleThumbBg: 'rgba(14, 165, 233, 0.15)',
    inputShadow: `
      0 10px 20px -5px rgba(14, 165, 233, 0.22),
      0 4px 6px -2px rgba(28, 53, 69, 0.12),
      inset 0 3px 6px rgba(255, 255, 255, 0.95),
      inset 0 -5px 10px rgba(14, 165, 233, 0.25),
      inset -3px 0 6px rgba(255, 255, 255, 0.4)
    `,
    inputFocusShadow: `
      0 16px 28px -4px rgba(2, 132, 199, 0.35),
      0 6px 10px -2px rgba(28, 53, 69, 0.15),
      inset 0 2px 4px rgba(0, 0, 0, 0.06),
      inset 0 4px 10px rgba(14, 165, 233, 0.1)
    `
  },
  sunset: {
    name: 'Sunset Splash',
    background: 'linear-gradient(135deg, #120626 0%, #220B3B 100%)',
    text: '#FFFFFF',
    panelBg: 'rgba(255, 100, 100, 0.04)',
    panelBorder: 'rgba(255, 110, 40, 0.25)',
    inputBg: 'rgba(60, 20, 80, 0.4)',
    buttonGradient: 'linear-gradient(135deg, #FF4E50 0%, #F9D423 100%)',
    buttonShadow: 'rgba(255, 78, 80, 0.4)',
    toggleTrack: 'rgba(0, 0, 0, 0.4)',
    toggleTrackBorder: 'rgba(255, 78, 80, 0.15)',
    toggleThumbBg: 'rgba(255, 140, 0, 0.15)',
    inputShadow: `
      0 12px 24px -8px rgba(255, 78, 80, 0.25),
      inset 0 4px 10px rgba(255, 255, 255, 0.4),
      inset 0 -6px 12px rgba(255, 78, 80, 0.25),
      inset -4px 0 8px rgba(255, 255, 255, 0.15)
    `,
    inputFocusShadow: `
      0 15px 30px -5px rgba(255, 78, 80, 0.4),
      inset 0 4px 12px rgba(255, 78, 80, 0.4),
      inset 0 2px 4px rgba(255, 255, 255, 0.3)
    `
  }
};