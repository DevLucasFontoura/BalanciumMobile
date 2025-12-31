import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import SplashScreen from './src/components/SplashScreen';
import Login from './src/app/(public)/Login';
import Register from './src/app/(public)/Register';
import Welcome from './src/app/(private)/Welcome';
import Settings from './src/app/(private)/Settings';
import Monthly from './src/app/(private)/Monthly';
import Dashboard from './src/app/(private)/Dashboard';
import AccountDetails from './src/app/(private)/Settings/AccountDetails';
import NewTransition from './src/app/(private)/NewTransition';

type Screen = 'login' | 'register' | 'welcome' | 'settings' | 'dashboard' | 'monthly' | 'account-details' | 'new-transition';

const VALID_SCREENS: Screen[] = ['login', 'register', 'welcome', 'settings', 'dashboard', 'monthly', 'account-details', 'new-transition'];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [pendingScreen, setPendingScreen] = useState<Screen | null>(null);

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

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const handleLoadingFinish = () => {
    setShowLoading(false);
    if (pendingScreen) {
      setCurrentScreen(pendingScreen);
      setPendingScreen(null);
    }
  };

  const handleLogin = () => {
    setShowLoading(true);
    setPendingScreen('welcome');
  };

  if (showSplash) {
    return (
      <>
        <SplashScreen onFinish={handleSplashFinish} />
        <StatusBar style="light" />
      </>
    );
  }

  if (showLoading) {
    return (
      <>
        <SplashScreen onFinish={handleLoadingFinish} />
        <StatusBar style="light" />
      </>
    );
  }

  return (
    <>
      {currentScreen === 'login' ? (
        <Login 
          onNavigateToRegister={() => setCurrentScreen('register')}
          onNavigateToWelcome={handleLogin}
        />
      ) : currentScreen === 'register' ? (
        <Register onNavigateToLogin={() => setCurrentScreen('login')} />
      ) : currentScreen === 'welcome' ? (
        <Welcome currentScreen={currentScreen} onNavigate={handleNavigate} onLogout={handleLogout} />
      ) : currentScreen === 'settings' ? (
        <Settings currentScreen={currentScreen} onNavigate={handleNavigate} onLogout={handleLogout} />
      ) : currentScreen === 'monthly' ? (
        <Monthly currentScreen={currentScreen} onNavigate={handleNavigate} onLogout={handleLogout} />
      ) : currentScreen === 'dashboard' ? (
        <Dashboard currentScreen={currentScreen} onNavigate={handleNavigate} onLogout={handleLogout} />
      ) : currentScreen === 'account-details' ? (
        <AccountDetails 
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
          onGoBack={() => setCurrentScreen('settings')}
        />
      ) : currentScreen === 'new-transition' ? (
        <NewTransition 
          onNavigate={handleNavigate}
          onGoBack={() => setCurrentScreen('welcome')}
          onSave={(transaction) => {
            console.log('Transação salva:', transaction);
            setCurrentScreen('welcome');
          }}
        />
      ) : (
        <Welcome onNavigate={handleNavigate} onLogout={handleLogout} />
      )}
      <StatusBar style="light" />
    </>
  );
}
