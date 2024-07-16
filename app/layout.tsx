"use client"
import { Provider } from 'react-redux';
import { store } from './store';
import { LanguageProvider } from './context/LanguageContext';
import LanguageSwitcher from './components/languageSwitcher/languageSwitcher';
import { Inter } from "next/font/google";
import Nav from './components/nav/nav';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>My App</title>
      </head>
      <body className={inter.className}>
        <Provider store={store}>
          <LanguageProvider>
            <Nav />
            <main>
              <LanguageSwitcher/>
              {children}
            </main>
          </LanguageProvider>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;
