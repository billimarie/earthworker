"use client";

// Auth
import { createContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Session } from '@supabase/supabase-js';

// Vercel Layout
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
import type React from "react" // Added import for React
import { metadata } from "./metadata";
import './globals.css'

// Font
const inter = Inter({ subsets: ["latin"] })

// Auth
export const AuthContext = createContext<{ session: Session | null }>({
  session: null,
});

// Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error(error);
      } else {
        setSession(data.session);
      }
    });
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 overflow-auto">
                <AuthContext.Provider value={{ session }}>
                  {children}
                </AuthContext.Provider>
              </main>
            </div>
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}