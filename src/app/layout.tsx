import React from 'react';
import './globals.css';
import Navbar from './components/navbar';
export const metadata = {
  title: 'TimeWise',
  description: 'Task management app',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <footer className="footer">
          <p>
            Organize, track, and prioritize your tasks with ease. Focus on what matters the most and stay on top of your schedule.
          </p>
        </footer>
      </body>
    </html>
  );
}