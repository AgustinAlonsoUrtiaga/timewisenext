"use client";

import React from 'react';
import './globals.css';
import Navbar from './components/navbar';
import { AppProvider } from '../context/AppContext';
import { AuthProvider } from '../context/AuthContext';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNavbar = !pathname.includes('/auth');

  return (
    <AuthProvider>
      <AppProvider>
        <html lang="en">
          <body>
            {showNavbar && <Navbar />}
            <main>{children}</main>
            <footer className="footer">
              <p>
                Organize, track, and prioritize your tasks with ease. Focus on what matters the most and stay on top of your schedule.
              </p>
            </footer>
          </body>
        </html>
      </AppProvider>
    </AuthProvider>
  );
}