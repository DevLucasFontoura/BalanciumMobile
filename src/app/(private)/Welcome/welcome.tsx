import { Text, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Menu from '../../../components/Menu';
import { useTheme } from '../../../lib/contexts/ThemeContext';
import styles from './welcome.styles';

interface WelcomeProps {
  currentScreen?: string;
  onNavigate?: (screen: string) => void;
  onLogout?: () => void;
}

export default function Welcome({ currentScreen = 'welcome', onNavigate, onLogout }: WelcomeProps) {
  const { theme, colors } = useTheme();
  const userName = 'Lucas Fontoura'; // TODO: Buscar do contexto/perfil
  const currentYear = new Date().getFullYear();

  // Estilos dinâmicos baseados no tema
  const cardShadow = theme === 'light' ? {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  } : {};

  const dynamicStyles = {
    wrapper: [styles.wrapper, { backgroundColor: colors.background }],
    container: [styles.container, { backgroundColor: colors.background }],
    greetingText: [styles.greetingText, { color: colors.textSecondary }],
    userNameText: [styles.userNameText, { color: colors.text }],
    notificationButton: [
      styles.notificationButton,
      { backgroundColor: colors.surface }
    ],
    balanceLabel: [styles.balanceLabel, { color: colors.textSecondary }],
    balanceCard: [
      styles.balanceCard,
      { backgroundColor: colors.surface }
    ],
    balanceValue: [styles.balanceValue, { color: colors.text }],
    addButton: [
      styles.addButton,
      { backgroundColor: colors.surface }
    ],
    sectionTitle: [styles.sectionTitle, { color: colors.text }],
    sectionDescription: [styles.sectionDescription, { color: colors.textSecondary }],
    card: [
      styles.card,
      { backgroundColor: colors.surface }
    ],
    cardTitle: [styles.cardTitle, { color: colors.text }],
    notificationBadge: [styles.notificationBadge, { borderColor: colors.background }],
  };

  // Dados fake para visualização
  const yearTotals = {
    entradas: 45250.75,
    saidas: 32890.50,
    saldo: 12360.25,
    guardado: 8500.00,
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <View style={dynamicStyles.wrapper}>
      <ScrollView 
        style={dynamicStyles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.topHeader}>
            <View style={styles.greetingContainer}>
              <Text style={dynamicStyles.greetingText}>Hello,</Text>
              <Text style={dynamicStyles.userNameText}>{userName}!</Text>
            </View>
            <TouchableOpacity style={dynamicStyles.notificationButton} activeOpacity={0.7}>
              <Feather name="bell" size={22} color={colors.text} />
              <View style={dynamicStyles.notificationBadge} />
            </TouchableOpacity>
          </View>

          <View style={styles.balanceSection}>
            <Text style={dynamicStyles.balanceLabel}>Current Balance</Text>
            <View style={dynamicStyles.balanceCard}>
              <Text style={dynamicStyles.balanceValue}>
                {formatCurrency(yearTotals.saldo)}
              </Text>
              <TouchableOpacity style={dynamicStyles.addButton} activeOpacity={0.7}>
                <Feather name="plus" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={dynamicStyles.sectionTitle}>Resumo do Ano {currentYear}</Text>
              <Text style={dynamicStyles.sectionDescription}>
                Totais gerais de todas as transações
              </Text>
            </View>

            <View style={styles.cardsContainer}>
              <View style={dynamicStyles.card}>
                <Feather name="arrow-up-circle" size={40} color={colors.primary} style={styles.cardIcon} />
                <View style={styles.cardContent}>
                  <Text style={dynamicStyles.cardTitle}>Entradas</Text>
                  <View style={styles.cardValueContainer}>
                    <Text style={[styles.currencySymbol, styles.entradaValue]}>R$</Text>
                    <Text style={[styles.cardValue, styles.entradaValue]}>
                      {new Intl.NumberFormat('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(yearTotals.entradas)}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={dynamicStyles.card}>
                <Feather name="arrow-down-circle" size={40} color="#ff4444" style={styles.cardIcon} />
                <View style={styles.cardContent}>
                  <Text style={dynamicStyles.cardTitle}>Saídas</Text>
                  <View style={styles.cardValueContainer}>
                    <Text style={[styles.currencySymbol, styles.saidaValue]}>R$</Text>
                    <Text style={[styles.cardValue, styles.saidaValue]}>
                      {new Intl.NumberFormat('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(yearTotals.saidas)}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={dynamicStyles.card}>
                <Feather name="lock" size={40} color="#4A90E2" style={styles.cardIcon} />
                <View style={styles.cardContent}>
                  <Text style={dynamicStyles.cardTitle}>Guardado</Text>
                  <View style={styles.cardValueContainer}>
                    <Text style={[styles.currencySymbol, styles.guardadoValue]}>R$</Text>
                    <Text style={[styles.cardValue, styles.guardadoValue]}>
                      {new Intl.NumberFormat('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(yearTotals.guardado)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Menu currentScreen={currentScreen} onNavigate={onNavigate} />
    </View>
  );
}

