import { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
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
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
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

  const isDark = colors.background === '#000000';

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
      { backgroundColor: '#e6f4e1' },
      cardShadow
    ],
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
    groupedTotalsCard: [
      styles.groupedTotalsCard,
      { backgroundColor: colors.surface }
    ],
    totalCardTitle: [styles.totalCardTitle, { color: colors.textSecondary }],
    visibilityButtonInCard: [
      styles.visibilityButtonInCard,
      { backgroundColor: isDark ? '#000000' : '#ffffff' }
    ],
  };

  // Dados fake para visualização
  const yearTotals = {
    entradas: 45250.75,
    saidas: 32890.50,
    saldo: 12360.25,
    guardado: 8500.00,
  };

  // Cálculo de insights simples
  const calculateInsight = () => {
    const percentEconomizado = ((yearTotals.saldo / yearTotals.entradas) * 100).toFixed(0);
    const percentGastos = ((yearTotals.saidas / yearTotals.entradas) * 100).toFixed(0);
    
    if (parseFloat(percentEconomizado) >= 20) {
      return {
        text: `Você economizou ${percentEconomizado}% da sua renda em ${currentYear} 👏`,
        type: 'positive',
      };
    } else if (parseFloat(percentGastos) >= 80) {
      return {
        text: `Seus gastos representam ${percentGastos}% da sua renda. Considere economizar mais 💡`,
        type: 'warning',
      };
    } else {
      return {
        text: `Você está no caminho certo! Mantenha o controle dos seus gastos 📊`,
        type: 'neutral',
      };
    }
  };

  const insight = calculateInsight();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
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
            <View style={dynamicStyles.balanceCard}>
              <View style={styles.cardContent}>
                <Text style={styles.balanceLabelInCard}>Saldo disponível</Text>
                <View style={styles.balanceValueRow}>
                  <View style={styles.cardValueContainer}>
                    {isBalanceVisible ? (
                      <>
                        <Text style={styles.heroCurrencySymbol}>R$</Text>
                        <Text style={styles.heroBalanceValue}>
                          {new Intl.NumberFormat('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(yearTotals.saldo)}
                        </Text>
                      </>
                    ) : (
                      <Text style={styles.hiddenBalance}>
                        •••••••
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity 
                    onPress={toggleBalanceVisibility}
                    activeOpacity={0.7}
                    style={dynamicStyles.visibilityButtonInCard}
                  >
                    <Feather 
                      name={isBalanceVisible ? "eye" : "eye-off"} 
                      size={24} 
                      color="#14ba82" 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={dynamicStyles.sectionTitle}>Resumo de {currentYear}</Text>
            </View>

            <View style={styles.totalsSection}>
              <View style={dynamicStyles.groupedTotalsCard}>
                <View style={styles.totalsRow}>
                  <View style={[
                    styles.totalCard,
                    { borderRightColor: theme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.05)' }
                  ]}>
                    <View style={styles.totalCardHeader}>
                      <Feather name="arrow-up" size={16} color="#14ba82" />
                      <Text style={dynamicStyles.totalCardTitle}>Total Entradas</Text>
                    </View>
                    <Text style={[styles.totalCardValue, styles.entradaValue]}>
                      {formatCurrency(yearTotals.entradas)}
                    </Text>
                  </View>

                  <View style={[styles.totalCard, styles.totalCardLast]}>
                    <View style={styles.totalCardHeader}>
                      <Feather name="arrow-down" size={16} color="#ff4444" />
                      <Text style={dynamicStyles.totalCardTitle}>Total Saídas</Text>
                    </View>
                    <Text style={[styles.totalCardValue, styles.saidaValue]}>
                      {formatCurrency(yearTotals.saidas)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Insight Section */}
          <View style={styles.insightSection}>
            <View style={[styles.insightCard, { backgroundColor: colors.surface }]}>
              <MaterialCommunityIcons 
                name="lightbulb-on-outline"
                size={24} 
                color="#14ba82"
                style={styles.insightIcon}
              />
              <Text style={[styles.insightText, { color: colors.text }]}>
                {insight.text}
              </Text>
              <Feather 
                name="chevron-right"
                size={20}
                color={colors.textSecondary}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <Menu currentScreen={currentScreen} onNavigate={onNavigate} />
    </View>
  );
}

