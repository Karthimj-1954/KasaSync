import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { SocketProvider } from '../context/SocketContext';
import { ThemeProvider } from '../context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'KasaSync - Real-Time Property, Maintenance & Amenity Management',
  description: 'Enterprise-grade property rental, maintenance dispatching, and conflict-free amenity booking platform.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#F9E8A2] text-[#4F6475] antialiased min-h-screen font-sans">
        <AuthProvider>
          <SocketProvider>
            <ThemeProvider>
              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    background: '#FFFFFF',
                    color: '#24425C',
                    border: '1px solid #95BDD7',
                    borderRadius: '14px',
                    fontSize: '13px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                  },
                }}
              />
              {children}
              <Analytics />
            </ThemeProvider>
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
