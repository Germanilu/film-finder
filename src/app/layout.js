"use client"

import { Inter } from 'next/font/google'
import './globals.css'
//Hace que el store.js este disponible para todos los componentes de la app sin pasarlo explicitamente (redux)
import { ReduxProvider, store } from '@/app/redux/store';

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  return (
    <ReduxProvider store = {store}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ReduxProvider>
  )
}
