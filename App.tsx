import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Login from './src/app/(public)/Login';
import Register from './src/app/(public)/Register';
import Welcome from './src/app/(private)/Welcome';
import Settings from './src/app/(private)/Settings';
import Monthly from './src/app/(private)/Monthly';
import Dashboard from './src/app/(private)/Dashboard';
import AccountDetails from './src/app/(private)/Settings/AccountDetails';

type Screen = 'login' | 'register' | 'welcome' | 'settings' | 'dashboard' | 'monthly' | 'account-details';

const VALID_SCREENS: Screen[] = ['login', 'register', 'welcome', 'settings', 'dashboard', 'monthly', 'account-details'];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');

  const handleNavigate = (screen: string) => {
    // Validar se a tela existe antes de navegar
    if (VALID_SCREENS.includes(screen as Screen)) {
      setCurrentScreen(screen as Screen);
    } else {
      console.log('Tela inválida:', screen);
      console.log('Telas válidas:', VALID_SCREENS);
    }
  };

  const handleLogout = () => {
    setCurrentScreen('login');
  };

  return (
    <>
      {currentScreen === 'login' ? (
        <Login 
          onNavigateToRegister={() => setCurrentScreen('register')}
          onNavigateToWelcome={() => setCurrentScreen('welcome')}
        />
      ) : currentScreen === 'register' ? (
        <Register onNavigateToLogin={() => setCurrentScreen('login')} />
      ) : currentScreen === 'welcome' ? (
        <Welcome onNavigate={handleNavigate} onLogout={handleLogout} />
      ) : currentScreen === 'settings' ? (
        <Settings onNavigate={handleNavigate} onLogout={handleLogout} />
      ) : currentScreen === 'monthly' ? (
        <Monthly onNavigate={handleNavigate} onLogout={handleLogout} />
      ) : currentScreen === 'dashboard' ? (
        <Dashboard onNavigate={handleNavigate} onLogout={handleLogout} />
      ) : currentScreen === 'account-details' ? (
        <AccountDetails 
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
          onGoBack={() => setCurrentScreen('settings')}
        />
      ) : (
        <Welcome onNavigate={handleNavigate} onLogout={handleLogout} />
      )}
      <StatusBar style="light" />
    </>
  );
}
