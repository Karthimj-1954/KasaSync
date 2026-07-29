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
      <body className="bg-[#F8FAFC] text-[#425466] antialiased min-h-screen font-sans text-base font-normal">
        <AuthProvider>
          <SocketProvider>
            <ThemeProvider>
              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    background: '#FFFFFF',
                    color: '#183153',
                    border: '1px solid #C7D7EA',
                    borderRadius: '14px',
                    fontSize: '14px',
                    boxShadow: '0 8px 30px rgba(24, 49, 83, 0.08)',
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
