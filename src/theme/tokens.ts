export const designTokens = {
  colors: {
    primary: '#0f766e',
    primaryForeground: '#f8fafc',
    secondary: '#e2e8f0',
    surface: '#ffffff',
    background: '#f8fafc',
    foreground: '#0f172a',
    muted: '#f1f5f9',
    border: '#e2e8f0'
  },
  typography: {
    fontSans: 'Inter, system-ui, sans-serif',
    fontHeading: 'Inter, system-ui, sans-serif',
    fontMono: 'ui-monospace, SFMono-Regular, monospace'
  },
  spacing: {
    section: '6rem',
    containerX: '1.5rem'
  },
  radius: {
    base: '14px',
    lg: '18px'
  },
  shadows: {
    soft: '0 8px 30px rgba(15, 23, 42, 0.08)',
    elevated: '0 16px 40px rgba(15, 23, 42, 0.14)'
  },
  animation: {
    fast: '150ms',
    base: '250ms',
    slow: '400ms'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
} as const;
