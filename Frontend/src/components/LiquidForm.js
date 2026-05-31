import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Snackbar, Alert, Divider } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import TerminalIcon from '@mui/icons-material/Terminal';
import WebIcon from '@mui/icons-material/Web';
import SmartToyIcon from '@mui/icons-material/SmartToy';

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

const avatarLiquidMorph = keyframes`
  0% { border-radius: 60% 40% 60% 40% / 40% 60% 40% 60%; }
  50% { border-radius: 45% 55% 40% 60% / 55% 45% 60% 40%; }
  100% { border-radius: 60% 40% 60% 40% / 40% 60% 40% 60%; }
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
  backgroundColor: '#0c0714', 
  backgroundImage: currenttheme.background, 
  position: 'relative',
  overflowX: 'hidden',
  overflowY: 'auto', 
  padding: '40px 16px',
  boxSizing: 'border-box'
}));

const UnifiedWorkspaceCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'currenttheme'
})(({ currenttheme }) => ({
  background: currenttheme.panelBg,
  backdropFilter: 'blur(30px) saturate(210%)',
  WebkitBackdropFilter: 'blur(30px) saturate(210%)',
  borderRadius: '32px',
  border: `1px solid ${currenttheme.panelBorder}`,
  width: '100%',
  maxWidth: '1150px',
  zIndex: 3,
  position: 'relative',
  boxShadow: '0 40px 80px rgba(0,0,0,0.18)',
  color: currenttheme.text,
  overflow: 'hidden',
  display: 'flex',
  boxSizing: 'border-box'
}));

const LeftInfoPanel = styled(Box)({
  flex: 1.1,
  padding: '44px 36px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxSizing: 'border-box',
  '@media (max-width: 600px)': {
    padding: '32px 20px',
  }
});

const RightFormPanel = styled(Box)({
  flex: 0.9,
  padding: '44px 36px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxSizing: 'border-box',
  borderLeft: '1px solid rgba(255, 255, 255, 0.15)',
  '@media (max-width: 900px)': {
    borderLeft: 'none',
    borderTop: '1px solid rgba(255, 255, 255, 0.15)',
  },
  '@media (max-width: 600px)': {
    padding: '32px 20px 24px 20px',
  }
});

const ImageLiquidWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'currenttheme'
})(({ currenttheme }) => ({
  width: '85px',
  height: '85px',
  marginBottom: '20px',
  padding: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: currenttheme.inputBg,
  border: currenttheme.name.includes('Liquid') ? '2px solid rgba(14, 165, 233, 0.4)' : '2px solid rgba(249, 212, 35, 0.4)',
  animation: `${avatarLiquidMorph} 7s infinite ease-in-out`,
  boxShadow: currenttheme.inputShadow,
  overflow: 'hidden'
}));

const AdaptiveAvatarImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit'
});

const ServiceBadge = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'currenttheme'
})(({ currenttheme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  padding: '14px 16px',
  borderRadius: '18px',
  background: currenttheme.inputBg,
  border: `1px solid ${currenttheme.panelBorder}`,
  boxSizing: 'border-box',
  marginBottom: '12px',
  '&:last-child': { marginBottom: 0 }
}));

const DNAVisualizerCanvas = styled(Box)({ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none', perspective: '1400px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' });
const DNADoubleHelix = styled(Box, { shouldForwardProp: (prop) => prop !== 'canvaswidth' })(({ canvaswidth }) => ({ position: 'relative', width: `${canvaswidth}px`, height: `${canvaswidth}px`, transformStyle: 'preserve-3d', animation: `${rotateHelixCanvas} 18s linear infinite` }));
const RungNode = styled(Box, { shouldForwardProp: (prop) => !['offsetangle', 'canvaswidth'].includes(prop) })(({ offsetangle, index, canvaswidth }) => ({ position: 'absolute', top: '50%', left: '50%', width: `${canvaswidth * 0.58}px`, height: '2px', background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.25) 0%, rgba(249, 212, 35, 0.7) 50%, rgba(56, 189, 248, 0.25) 100%)', transform: `translate(-50%, -50%) rotateY(${offsetangle}deg) translateZ(${index * (canvaswidth * 0.015) - (canvaswidth * 0.25)}px)`, transformStyle: 'preserve-3d', '&::before, &::after': { content: '""', position: 'absolute', width: '10px', height: '10px', borderRadius: '50%', top: '-4px', animation: `${glowPulseSegment} 4s infinite ease-in-out` }, '&::before': { left: 0, animationDelay: `${index * -0.12}s` }, '&::after': { right: 0, animationDelay: `${index * -0.12 + 2}s` } }));

const FloatingWaterPool = styled(Box, { shouldForwardProp: (prop) => prop !== 'currenttheme' })(({ currenttheme }) => ({ 
  position: 'relative', 
  width: '100%', 
  height: '56px', 
  display: 'flex', 
  alignItems: 'center', 
  boxSizing: 'border-box', 
  animation: `${waterLiquidMorph} 9s infinite ease-in-out`, 
  backgroundColor: currenttheme.inputBg, 
  border: currenttheme.name.includes('Liquid') ? '1px solid rgba(14, 165, 233, 0.25)' : '1px solid rgba(255, 255, 255, 0.2)', 
  boxShadow: currenttheme.inputShadow, 
  '&:focus-within': { 
    transform: 'scale(1.015)', 
    borderColor: currenttheme.name.includes('Liquid') ? '#0284c7' : '#FF4E50', 
    animation: `${ripplePulse} 1.5s infinite ease-in-out`, 
    boxShadow: currenttheme.inputFocusShadow 
  } 
}));

const SeamlessInput = styled(TextField, { shouldForwardProp: (prop) => prop !== 'currenttheme' })(({ currenttheme }) => ({ 
  width: '100%', 
  height: '100%', 
  '& .MuiOutlinedInput-root': { 
    height: '100%',
    padding: '0 24px', 
    '& fieldset': { border: 'none' } 
  }, 
  '& .MuiOutlinedInput-input': { 
    color: currenttheme.text, 
    fontWeight: 600, 
    fontSize: '0.92rem',
    padding: '0px'
  }, 
  '& .MuiInputLabel-root': { 
    color: currenttheme.name.includes('Liquid') ? '#3A5263' : '#F9D423', 
    fontWeight: 700, 
    fontSize: '0.85rem',
    transform: 'translate(4px, -24px) scale(1)', 
    '&.MuiInputLabel-shrink': { 
      transform: 'translate(4px, -24px) scale(1)', 
      color: currenttheme.name.includes('Liquid') ? '#0284c7' : '#F9D423' 
    } 
  } 
}));

const SeamlessMultilineInput = styled(TextField, { shouldForwardProp: (prop) => prop !== 'currenttheme' })(({ currenttheme }) => ({ 
  width: '100%', 
  '& .MuiOutlinedInput-root': { 
    padding: '16px 20px !important', 
    '& fieldset': { border: 'none' } 
  }, 
  '& .MuiOutlinedInput-input': { 
    color: currenttheme.text, 
    fontWeight: 600, 
    fontSize: '0.92rem' 
  }, 
  '& .MuiInputLabel-root': { 
    color: currenttheme.name.includes('Liquid') ? '#3A5263' : '#F9D423', 
    fontWeight: 700,
    fontSize: '0.85rem',
    transform: 'translate(4px, -24px) scale(1)', 
    '&.MuiInputLabel-shrink': { 
      transform: 'translate(4px, -24px) scale(1)', 
      color: currenttheme.name.includes('Liquid') ? '#0284c7' : '#F9D423' 
    } 
  } 
}));

const ToggleRegion = styled(Box)({ display: 'flex', justifyContent: 'center', marginBottom: '32px', cursor: 'pointer', position: 'relative', zIndex: 3 });
const ToggleTrack = styled(Box, { shouldForwardProp: (prop) => prop !== 'currenttheme' })(({ currenttheme }) => ({ width: '130px', height: '46px', borderRadius: '23px', backgroundColor: currenttheme.toggleTrack, border: `1px solid ${currenttheme.toggleTrackBorder}`, display: 'flex', alignItems: 'center', position: 'relative' }));
const SphericalThumb = styled(Box, { shouldForwardProp: (prop) => !['currenttheme', 'activeSide'].includes(prop) })(({ currenttheme, activeSide }) => ({ width: '54px', height: '54px', borderRadius: '50%', position: 'absolute', left: '-5px', transform: activeSide === 'liquid' ? 'translateX(0px)' : 'translateX(84px)', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)' }));
const SplashSubmitButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'currenttheme' })(({ currenttheme }) => ({ background: currenttheme.buttonGradient, color: '#FFF', textTransform: 'none', fontSize: '0.98rem', fontWeight: 700, borderRadius: '50px', padding: '11px 0', marginTop: '4px', boxShadow: `0 12px 28px ${currenttheme.buttonShadow}`, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-1px)' } }));


export default function SingleWorkspaceSplashApp() {
  const [currentMode, setCurrentMode] = useState('liquid');
  const currentTheme = localThemes[currentMode];
  const [formData, setFormData] = useState({ fullName: '', mobileNumber: '', email: '', address: '', requirements: '' });
  const [toast, setToast] = useState({ open: false, message: '' });
  const [dynamicCanvasWidth, setDynamicCanvasWidth] = useState(320);

  useEffect(() => {
    const handleResize = () => { setDynamicCanvasWidth(Math.min(window.innerWidth - 24, 440)); };
    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dnaRungs = Array.from({ length: 30 }, (_, i) => ({ angle: i * 16, id: i }));
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageError = (e) => {
    // If local file 'image_97203e.jpg' isn't found, smoothly swap in the open-source tech demo illustration
    e.target.src = "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=150&auto=format&fit=crop";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://businessform-2v60.onrender.com/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        setToast({ open: true, message: 'Project request received! Akash will contact you soon.' });
        setFormData({ fullName: '', mobileNumber: '', email: '', address: '', requirements: '' });
      } else { setToast({ open: true, message: result.message || 'Submission failed.' }); }
    } catch (error) { setToast({ open: true, message: 'Cannot connect to backend server.' }); }
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

      <UnifiedWorkspaceCard currenttheme={currentTheme} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
        
        {/* LEFT PANEL */}
        <LeftInfoPanel>
          <ImageLiquidWrapper currenttheme={currentTheme}>
            <AdaptiveAvatarImage 
              src="image_97203e.jpg" 
              alt="Akash Barman Profile" 
              onError={handleImageError} 
            />
          </ImageLiquidWrapper>

          <Typography variant="overline" sx={{ color: currentTheme.name.includes('Liquid') ? '#0284c7' : '#F9D423', fontWeight: 800, fontSize: '0.85rem' }}>
             Work With Akash Barman
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, mt: 0.5, letterSpacing: '-0.5px', fontSize: { xs: '1.6rem', md: '2.1rem' } }}>
            Full-Stack, Desktop & AI Integration Engineer
          </Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.8, mb: 2.5, fontWeight: 500, fontStyle: 'italic', fontSize: '0.92rem' }}>
            Transforming vision into premium, secure, and intelligent user ecosystems.
          </Typography>
          
          <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6, opacity: 0.95, fontSize: '0.88rem' }}>
            Welcome! I am an experienced frontend developer and full-stack systems builder. I specialize in crafting high-end responsive user interfaces with React.js/MUI, building secure administrative dashboards, and integrating intelligent AI automation models directly into functional production pipelines.
          </Typography>

          <Divider sx={{ mb: 3, borderColor: currentTheme.panelBorder }} />

          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2, fontSize: '0.95rem' }}>🛠️ Engineering Scope</Typography>
          
          <Box>
            <ServiceBadge currenttheme={currentTheme}>
              <SmartToyIcon sx={{ color: currentTheme.name.includes('Liquid') ? '#0284c7' : '#F9D423', mt: 0.2, fontSize: '1.2rem' }} />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.88rem' }}>Smart AI Automation</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', lineHeight: 1.3 }}>Intelligent workflows, custom assistant modules, and predictive analytics dashboards.</Typography>
              </Box>
            </ServiceBadge>

            <ServiceBadge currenttheme={currentTheme}>
              <WebIcon sx={{ color: currentTheme.name.includes('Liquid') ? '#0284c7' : '#F9D423', mt: 0.2, fontSize: '1.2rem' }} />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.88rem' }}>Web Solutions</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', lineHeight: 1.3 }}>Premium modular interfaces, real-time interactive portals, and robust gateway systems.</Typography>
              </Box>
            </ServiceBadge>

            <ServiceBadge currenttheme={currentTheme}>
              <TerminalIcon sx={{ color: currentTheme.name.includes('Liquid') ? '#0284c7' : '#F9D423', mt: 0.2, fontSize: '1.2rem' }} />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.88rem' }}>Desktop Management</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', lineHeight: 1.3 }}>Custom high-efficiency corporate management suites with role-based access limits.</Typography>
              </Box>
            </ServiceBadge>
          </Box>
        </LeftInfoPanel>

        {/* RIGHT PANEL */}
        <RightFormPanel component="form" onSubmit={handleSubmit}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: currentTheme.text, mb: 0.5, letterSpacing: '-0.5px', fontSize: '1.2rem' }}>
            Project Inquiry Form
          </Typography>
          <Typography variant="body2" sx={{ color: currentTheme.name.includes('Liquid') ? '#4A5D6B' : '#BCACCD', mb: 5, fontWeight: 500, fontSize: '0.8rem' }}>
            Fill out your parameters to secure technical pipeline booking.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4.2 }}>
            <FloatingWaterPool currenttheme={currentTheme}>
              <SeamlessInput currenttheme={currentTheme} label="Full Name " name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth required />
            </FloatingWaterPool>

            <FloatingWaterPool currenttheme={currentTheme} sx={{ animationDelay: '-2s' }}>
              <SeamlessInput currenttheme={currentTheme} label="Mobile Number " name="mobileNumber" placeholder="Enter your mobile number" value={formData.mobileNumber} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth required />
            </FloatingWaterPool>

            <FloatingWaterPool currenttheme={currentTheme} sx={{ animationDelay: '-4s' }}>
              <SeamlessInput currenttheme={currentTheme} label="Email Address " name="email" type="email" placeholder="Enter your email address" value={formData.email} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth required />
            </FloatingWaterPool>

            <FloatingWaterPool currenttheme={currentTheme} sx={{ animationDelay: '-6s' }}>
              <SeamlessInput currenttheme={currentTheme} label="Address " name="address" placeholder="Enter your current address" value={formData.address} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth required />
            </FloatingWaterPool>

            <Box sx={{ width: '100%', position: 'relative', backgroundColor: currentTheme.inputBg, borderRadius: '24px', border: currentTheme.name.includes('Liquid') ? '1px solid rgba(14, 165, 233, 0.25)' : '1px solid rgba(255, 255, 255, 0.2)', boxShadow: currentTheme.inputShadow, marginTop: '8px', overflow: 'visible', transition: 'all 0.3s ease', '&:focus-within': { borderColor: currentTheme.name.includes('Liquid') ? '#0284c7' : '#FF4E50', transform: 'scale(1.01)', boxShadow: currentTheme.inputFocusShadow } }}>
              <SeamlessMultilineInput currenttheme={currentTheme} label="Project Requirements " name="requirements" placeholder="Describe system details and target dates..." value={formData.requirements} onChange={handleChange} multiline rows={4} InputLabelProps={{ shrink: true }} fullWidth required />
            </Box>

            <SplashSubmitButton type="submit" currenttheme={currentTheme} fullWidth>
              Submit Project Request
            </SplashSubmitButton>
          </Box>
        </RightFormPanel>

      </UnifiedWorkspaceCard>

      <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast({ ...toast, open: false })}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: '50px' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </AppContainer>
  );
}