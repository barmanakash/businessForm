import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';


const localThemes = {
  liquid: {
    name: 'Liquid Splash',
    background: 'linear-gradient(135deg, rgba(226, 236, 241, 0.75) 0%, rgba(203, 220, 229, 0.75) 100%)',
    text: '#1C3545',
    panelBg: 'rgba(255, 255, 255, 0.1)', 
    panelBorder: 'rgba(255, 255, 255, 0.5)',
    inputBg: 'rgba(14, 165, 233, 0.05)',
    buttonGradient: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
    buttonShadow: 'rgba(2, 132, 199, 0.3)',
    toggleTrack: 'rgba(0, 0, 0, 0.05)',
    toggleTrackBorder: 'rgba(255, 255, 255, 0.4)',
    toggleThumbBg: 'rgba(14, 165, 233, 0.1)',
    inputShadow: `
      0 10px 20px -5px rgba(14, 165, 233, 0.12),
      inset 0 3px 6px rgba(255, 255, 255, 0.85),
      inset 0 -5px 10px rgba(14, 165, 233, 0.12),
      inset -3px 0 6px rgba(255, 255, 255, 0.3)
    `,
    inputFocusShadow: `
      0 16px 28px -4px rgba(2, 132, 199, 0.2),
      inset 0 4px 10px rgba(14, 165, 233, 0.05)
    `
  },
  sunset: {
    name: 'Sunset Splash',
    background: 'linear-gradient(135deg, rgba(18, 6, 38, 0.92) 0%, rgba(34, 11, 59, 0.92) 100%)',
    text: '#FFFFFF',
    panelBg: 'rgba(255, 100, 100, 0.02)',
    panelBorder: 'rgba(255, 110, 40, 0.2)',
    inputBg: 'rgba(60, 20, 80, 0.25)',
    buttonGradient: 'linear-gradient(135deg, #FF4E50 0%, #F9D423 100%)',
    buttonShadow: 'rgba(255, 78, 80, 0.35)',
    toggleTrack: 'rgba(0, 0, 0, 0.3)',
    toggleTrackBorder: 'rgba(255, 78, 80, 0.12)',
    toggleThumbBg: 'rgba(255, 140, 0, 0.1)',
    inputShadow: `
      0 12px 24px -8px rgba(255, 78, 80, 0.2),
      inset 0 4px 10px rgba(255, 255, 255, 0.35),
      inset 0 -6px 12px rgba(255, 78, 80, 0.2)
    `,
    inputFocusShadow: `
      0 15px 30px -5px rgba(255, 78, 80, 0.3),
      inset 0 4px 12px rgba(255, 78, 80, 0.3)
    `
  }
};


const waterLiquidMorph = keyframes`
  0% { border-radius: 55% 45% 50% 50% / 50% 52% 48% 50%; }
  33% { border-radius: 48% 52% 55% 45% / 52% 48% 53% 47%; }
  66% { border-radius: 52% 48% 46% 54% / 46% 54% 48% 52%; }
  100% { border-radius: 55% 45% 50% 50% / 50% 52% 48% 50%; }
`;

const ripplePulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.25); }
  70% { box-shadow: 0 0 0 12px rgba(14, 165, 233, 0); }
  100% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0); }
`;

const rotateHelixCanvas = keyframes`
  0% { transform: rotateX(65deg) rotateZ(0deg); }
  100% { transform: rotateX(65deg) rotateZ(360deg); }
`;

const glowPulseSegment = keyframes`
  0%, 100% { background: #F9D423; box-shadow: 0 0 10px #FF4E50, 0 0 18px #F9D423; }
  50% { background: #38bdf8; box-shadow: 0 0 14px #0284c7, 0 0 25px #38bdf8; }
`;


const AppContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'currenttheme'
})(({ currenttheme }) => ({
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start', 
  backgroundColor: '#0c0714', 
  backgroundImage: currenttheme.background, 
  position: 'relative',
  overflowX: 'hidden',
  overflowY: 'auto', 
  padding: '30px 16px',
  boxSizing: 'border-box'
}));

const DNAVisualizerCanvas = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1, 
  pointerEvents: 'none', 
  perspective: '1400px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden'
});

const DNADoubleHelix = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'canvaswidth'
})(({ canvaswidth }) => ({
  position: 'relative',
  width: `${canvaswidth}px`,
  height: `${canvaswidth}px`,
  transformStyle: 'preserve-3d',
  animation: `${rotateHelixCanvas} 18s linear infinite`,
}));

const RungNode = styled(Box, {
  shouldForwardProp: (prop) => !['offsetangle', 'canvaswidth'].includes(prop)
})(({ offsetangle, index, canvaswidth }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: `${canvaswidth * 0.58}px`, 
  height: '2px',
  background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.25) 0%, rgba(249, 212, 35, 0.7) 50%, rgba(56, 189, 248, 0.25) 100%)',
  transform: `translate(-50%, -50%) rotateY(${offsetangle}deg) translateZ(${index * (canvaswidth * 0.015) - (canvaswidth * 0.25)}px)`,
  transformStyle: 'preserve-3d',
  
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    width: '10px', 
    height: '10px',
    borderRadius: '50%',
    top: '-4px',
    animation: `${glowPulseSegment} 4s infinite ease-in-out`,
  },
  '&::before': { left: 0, animationDelay: `${index * -0.12}s` },
  '&::after': { right: 0, animationDelay: `${index * -0.12 + 2}s` },
}));

const SplashCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'currenttheme'
})(({ currenttheme }) => ({
  background: currenttheme.panelBg,
  backdropFilter: 'blur(30px) saturate(210%)', 
  WebkitBackdropFilter: 'blur(30px) saturate(210%)',
  borderRadius: '28px', 
  border: `1px solid ${currenttheme.panelBorder}`,
  width: '100%',
  maxWidth: '450px', 
  position: 'relative',
  zIndex: 3, 
  boxSizing: 'border-box',
  padding: '40px 28px',
  boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
  '@media (max-width:400px)': {
    padding: '32px 16px 24px 16px', 
  }
}));

const FloatingWaterPool = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'currenttheme'
})(({ currenttheme }) => ({
  position: 'relative',
  width: '100%',
  height: '54px', 
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  animation: `${waterLiquidMorph} 9s infinite ease-in-out`,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  backgroundColor: currenttheme.inputBg,
  border: currenttheme.name.includes('Liquid')
    ? '1px solid rgba(14, 165, 233, 0.25)'
    : '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: currenttheme.inputShadow,

  '&:focus-within': {
    transform: 'scale(1.015)',
    animationPlayState: 'paused',
    borderColor: currenttheme.name.includes('Liquid') ? '#0284c7' : '#FF4E50',
    animation: `${ripplePulse} 1.5s infinite ease-in-out`,
    boxShadow: currenttheme.inputFocusShadow
  }
}));

const SeamlessInput = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'currenttheme'
})(({ currenttheme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  '& .MuiOutlinedInput-root': {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent !important',
    padding: '0 24px', 
    '& fieldset': { border: 'none' },
    '&.Mui-focused fieldset': { border: 'none' }
  },
  '& .MuiOutlinedInput-input': {
    color: currenttheme.text,
    fontWeight: 600,
    fontSize: '0.95rem', 
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    padding: '0 !important',
    '&::placeholder': {
      color: currenttheme.name.includes('Liquid') ? '#4A5D6B' : '#BCACCD',
      opacity: 0.7,
      fontWeight: 500
    }
  },
  '& .MuiInputLabel-root': {
    color: currenttheme.name.includes('Liquid') ? '#3A5263' : '#CBBCCF',
    fontWeight: 600,
    fontSize: '0.92rem',
    transform: 'translate(24px, 16px) scale(1)', 
    pointerEvents: 'none',
    transition: 'transform 220ms cubic-bezier(0.4, 0, 0.2, 1), color 220ms',
    
    '&.MuiInputLabel-shrink': {
      transform: 'translate(14px, -20px) scale(0.82)', 
      color: currenttheme.name.includes('Liquid') ? '#0284c7' : '#F9D423',
      fontWeight: 700,
      
      '@media (max-width:380px)': {
        transform: 'translate(10px, -18px) scale(0.8)', 
      }
    }
  }
}));

const SeamlessMultilineInput = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'currenttheme'
})(({ currenttheme }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    width: '100%',
    backgroundColor: 'transparent !important',
    padding: '24px 16px 14px 16px !important', 
    '& fieldset': { border: 'none' },
    '&.Mui-focused fieldset': { border: 'none' }
  },
  '& .MuiOutlinedInput-input': {
    color: currenttheme.text,
    fontWeight: 600,
    fontSize: '0.95rem', 
    lineHeight: '1.4',
    overflowY: 'auto',
    '&::placeholder': {
      color: currenttheme.name.includes('Liquid') ? '#4A5D6B' : '#BCACCD',
      opacity: 0.7,
      fontWeight: 500
    }
  },
  '& .MuiInputLabel-root': {
    color: currenttheme.name.includes('Liquid') ? '#3A5263' : '#CBBCCF',
    fontWeight: 600,
    fontSize: '0.92rem',
    transform: 'translate(18px, 22px) scale(1)', 
    pointerEvents: 'none',
    transition: 'transform 220ms cubic-bezier(0.4, 0, 0.2, 1), color 220ms',
    
    '&.MuiInputLabel-shrink': {
      transform: 'translate(14px, -14px) scale(0.82)', 
      color: currenttheme.name.includes('Liquid') ? '#0284c7' : '#F9D423',
      fontWeight: 700,
      
      '@media (max-width:380px)': {
        transform: 'translate(10px, -14px) scale(0.78)', 
      }
    }
  }
}));

const ToggleRegion = styled(Box)({ display: 'flex', justifyContent: 'center', marginBottom: '24px', cursor: 'pointer', position: 'relative', zIndex: 3 });

const ToggleTrack = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'currenttheme'
})(({ currenttheme }) => ({
  width: '130px', height: '46px', borderRadius: '23px', backgroundColor: currenttheme.toggleTrack,
  border: `1px solid ${currenttheme.toggleTrackBorder}`, display: 'flex', alignItems: 'center', position: 'relative',
}));

const SphericalThumb = styled(Box, {
  shouldForwardProp: (prop) => !['currenttheme', 'activeSide'].includes(prop)
})(({ currenttheme, activeSide }) => ({
  width: '54px', height: '54px', borderRadius: '50%', position: 'absolute', left: '-5px',
  transform: activeSide === 'liquid' ? 'translateX(0px)' : 'translateX(84px)',
  background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.5)',
  display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
}));

const SplashSubmitButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'currenttheme'
})(({ currenttheme }) => ({
  background: currenttheme.buttonGradient,
  color: '#FFF',
  textTransform: 'none',
  fontSize: '0.98rem',
  fontWeight: 700,
  borderRadius: '50px',
  padding: '12px 0',
  marginTop: '8px',
  boxShadow: `0 12px 28px ${currenttheme.buttonShadow}`,
  transition: 'all 0.3s ease',
  '&:hover': { transform: 'translateY(-1px)' },
}));


export default function LiquidResponsiveSplashForm() {
  const [currentMode, setCurrentMode] = useState('liquid');
  const currentTheme = localThemes[currentMode];
  const [formData, setFormData] = useState({ fullName: '', mobileNumber: '', email: '', address: '', requirements: '' });
  const [toast, setToast] = useState({ open: false, message: '' });
  const [dynamicCanvasWidth, setDynamicCanvasWidth] = useState(320);

  useEffect(() => {
    const handleResize = () => {
      setDynamicCanvasWidth(Math.min(window.innerWidth - 24, 440));
    };
    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dnaRungs = Array.from({ length: 30 }, (_, i) => ({ angle: i * 16, id: i }));
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://businessform-2v60.onrender.com/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setToast({ open: true, message: result.message || 'Data logged successfully!' });
        setFormData({ fullName: '', mobileNumber: '', email: '', address: '', requirements: '' });
      } else {
        setToast({ open: true, message: result.message || 'Submission failed.' });
      }
    } catch (error) {
      console.error('Frontend error sending data:', error);
      setToast({ open: true, message: 'Cannot connect to backend server.' });
    }
  };

  return (
    <AppContainer currenttheme={currentTheme}>
      
      <DNAVisualizerCanvas>
        <DNADoubleHelix canvaswidth={dynamicCanvasWidth}>
          {dnaRungs.map((rung) => (
            <RungNode key={rung.id} offsetangle={rung.angle} index={rung.id} canvaswidth={dynamicCanvasWidth} />
          ))}
        </DNADoubleHelix>
      </DNAVisualizerCanvas>

      <ToggleRegion onClick={() => setCurrentMode(prev => prev === 'liquid' ? 'sunset' : 'liquid')}>
        <ToggleTrack currenttheme={currentTheme}>
          <SphericalThumb currenttheme={currentTheme} activeSide={currentMode}>
            <Box sx={{ width: 34, height: 34, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)' }}>
              {currentMode === 'liquid' ? <WbSunnyIcon sx={{ color: '#0284c7', fontSize: '1.05rem' }} /> : <DarkModeIcon sx={{ color: '#FF8C00', fontSize: '1.05rem' }} />}
            </Box>
          </SphericalThumb>
        </ToggleTrack>
      </ToggleRegion>

      <SplashCard component="form" onSubmit={handleSubmit} currenttheme={currentTheme}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: currentTheme.text, mb: 0.5, letterSpacing: '-0.5px', fontFamily: 'system-ui', fontSize: '1.3rem' }}>
          {currentTheme.name === 'Liquid Splash' ? 'Searchralism UI' : 'Sunset Splash'}
        </Typography>
        <Typography variant="body2" sx={{ color: currentTheme.name.includes('Liquid') ? '#4A5D6B' : '#BCACCD', mb: 4, fontWeight: 500, fontSize: '0.82rem' }}>
          Fluid organic water-molded elements
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4.5 }}>
          
          <FloatingWaterPool currenttheme={currentTheme}>
            <SeamlessInput currenttheme={currentTheme} label="Full Name" name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} fullWidth required />
          </FloatingWaterPool>

          <FloatingWaterPool currenttheme={currentTheme} sx={{ animationDelay: '-2s' }}>
            <SeamlessInput currenttheme={currentTheme} label="Mobile Number" name="mobileNumber" placeholder="Enter your mobile number" value={formData.mobileNumber} onChange={handleChange} fullWidth required />
          </FloatingWaterPool>

          <FloatingWaterPool currenttheme={currentTheme} sx={{ animationDelay: '-4s' }}>
            <SeamlessInput currenttheme={currentTheme} label="Email Address" name="email" type="email" placeholder="Enter your email address" value={formData.email} onChange={handleChange} fullWidth required />
          </FloatingWaterPool>

          <FloatingWaterPool currenttheme={currentTheme} sx={{ animationDelay: '-6s' }}>
            <SeamlessInput currenttheme={currentTheme} label="Address" name="address" placeholder="Enter your current address" value={formData.address} onChange={handleChange} fullWidth required />
          </FloatingWaterPool>

          <Box sx={{ 
            width: '100%', 
            backgroundColor: currentTheme.inputBg, 
            borderRadius: '24px', 
            border: currentTheme.name.includes('Liquid') ? '1px solid rgba(14, 165, 233, 0.25)' : '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: currentTheme.inputShadow,
            marginTop: '4px',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            '&:focus-within': {
              borderColor: currentTheme.name.includes('Liquid') ? '#0284c7' : '#FF4E50',
              transform: 'scale(1.01)',
              boxShadow: currentTheme.inputFocusShadow
            }
          }}>
            <SeamlessMultilineInput 
              currenttheme={currentTheme} 
              label="Explain your requirements" 
              name="requirements" 
              placeholder="Tell us what you are looking to build..."
              value={formData.requirements} 
              onChange={handleChange} 
              multiline 
              rows={3} 
              fullWidth 
              required 
            />
          </Box>

          <SplashSubmitButton type="submit" currenttheme={currentTheme} fullWidth>
            Submit Data
          </SplashSubmitButton>
        </Box>
      </SplashCard>

      <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast({ ...toast, open: false })}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: '50px' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </AppContainer>
  );
}