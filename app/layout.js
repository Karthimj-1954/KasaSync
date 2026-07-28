import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { SocketProvider } from '../context/SocketContext';
import { ThemeProvider } from '../context/ThemeContext';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'KasaSync - Real-Time Property, Maintenance & Amenity Management',
  description: 'Enterprise-grade property rental, maintenance dispatching, and conflict-free amenity booking platform.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        <AuthProvider>
          <SocketProvider>
            <ThemeProvider>
              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    background: '#0f172a',
                    color: '#f8fafc',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    fontSize: '13px',
                  },
                }}
              />
              {children}
            </ThemeProvider>
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
