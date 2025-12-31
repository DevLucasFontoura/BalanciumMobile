import { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Menu from '../../../components/Menu';
import { useTheme } from '../../../lib/contexts/ThemeContext';
import styles from './dashboard.styles';

interface DashboardProps {
  currentScreen?: string;
  onNavigate?: (screen: string) => void;
  onLogout?: () => void;
}

export default function Dashboard({ currentScreen = 'dashboard', onNavigate, onLogout }: DashboardProps) {
  const { theme, colors } = useTheme();
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

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
    headerTitle: [styles.headerTitle, { color: colors.text }],
    headerSubtitle: [styles.headerSubtitle, { color: colors.textSecondary }],
    yearSelector: [
      styles.yearSelector,
      { backgroundColor: colors.surface }
    ],
    yearSelectorText: [styles.yearSelectorText, { color: colors.text }],
    groupedTotalsCard: [
      styles.groupedTotalsCard,
      { backgroundColor: colors.surface }
    ],
    totalCardTitle: [styles.totalCardTitle, { color: colors.textSecondary }],
    saldoValue: [styles.totalCardValue, styles.saldoValue, { color: colors.text }],
    chartContainer: [
      styles.chartContainer,
      { backgroundColor: colors.surface }
    ],
    chartTitle: [styles.chartTitle, { color: colors.text }],
    chartPlaceholder: [styles.chartPlaceholder, { color: colors.textSecondary }],
    legendText: [styles.legendText, { color: colors.textSecondary }],
    monthLabel: [styles.monthLabel, { color: colors.textSecondary }],
  };

  // Dados fake para visualização
  const yearTotals = {
    entradas: 45250.75,
    saidas: 32890.50,
    saldo: 12360.25,
  };

  const monthlyData = [
    { month: 'Jan', entrada: 3800, saida: 2800 },
    { month: 'Fev', entrada: 4200, saida: 3100 },
    { month: 'Mar', entrada: 4500, saida: 2900 },
    { month: 'Abr', entrada: 4800, saida: 3200 },
    { month: 'Mai', entrada: 5100, saida: 3400 },
    { month: 'Jun', entrada: 3900, saida: 2800 },
    { month: 'Jul', entrada: 4400, saida: 3000 },
    { month: 'Ago', entrada: 4700, saida: 3100 },
    { month: 'Set', entrada: 5000, saida: 3300 },
    { month: 'Out', entrada: 4300, saida: 2900 },
    { month: 'Nov', entrada: 4600, saida: 3100 },
    { month: 'Dez', entrada: 4950, saida: 3290 },
  ];

  const loading = false;

  const handleYearChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedYear(selectedYear - 1);
    } else if (direction === 'next') {
      setSelectedYear(selectedYear + 1);
    }
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
          <View style={styles.headerSection}>
            <Text style={dynamicStyles.headerTitle}>Dashboard</Text>

            <View style={dynamicStyles.yearSelector}>
              <TouchableOpacity
                style={styles.yearButton}
                onPress={() => handleYearChange('prev')}
                activeOpacity={0.7}
              >
                <Feather name="chevron-left" size={20} color={colors.text} />
              </TouchableOpacity>
              <Text style={dynamicStyles.yearSelectorText}>{selectedYear}</Text>
              <TouchableOpacity
                style={styles.yearButton}
                onPress={() => handleYearChange('next')}
                activeOpacity={0.7}
              >
                <Feather name="chevron-right" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.totalsSection}>
            <View style={dynamicStyles.groupedTotalsCard}>
              <View style={styles.totalsRow}>
                <View style={[
                  styles.totalCard,
                  { borderRightColor: theme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.05)' }
                ]}>
                  <View style={styles.totalCardHeader}>
                    <Feather name="arrow-up" size={16} color={colors.primary} />
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

              <View style={[
                styles.totalCardFull,
                { borderTopColor: theme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.05)' }
              ]}>
                <View style={styles.totalCardHeader}>
                  <Feather name="dollar-sign" size={16} color={colors.text} />
                  <Text style={dynamicStyles.totalCardTitle}>Saldo Total</Text>
                </View>
                <Text style={dynamicStyles.saldoValue}>
                  {formatCurrency(yearTotals.saldo)}
                </Text>
              </View>
            </View>
          </View>

          <View style={dynamicStyles.chartContainer}>
            {loading ? (
              <Text style={dynamicStyles.chartPlaceholder}>Carregando gráfico...</Text>
            ) : (
              <View style={styles.chartContent}>
                <Text style={dynamicStyles.chartTitle}>Análise Mensal - {selectedYear}</Text>
                <View style={styles.monthlyBars}>
                  {monthlyData.map((data, index) => {
                    const maxValue = Math.max(...monthlyData.map(d => Math.max(d.entrada, d.saida)));
                    const entradaHeight = (data.entrada / maxValue) * 100;
                    const saidaHeight = (data.saida / maxValue) * 100;
                    
                    return (
                      <View key={index} style={styles.barContainer}>
                        <View style={styles.bars}>
                          <View style={[styles.bar, styles.entradaBar, { height: `${entradaHeight}%` }]} />
                          <View style={[styles.bar, styles.saidaBar, { height: `${saidaHeight}%` }]} />
                        </View>
                        <Text style={dynamicStyles.monthLabel}>{data.month}</Text>
                      </View>
                    );
                  })}
                </View>
                <View style={styles.chartLegend}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, styles.entradaDot]} />
                    <Text style={dynamicStyles.legendText}>Entradas</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, styles.saidaDot]} />
                    <Text style={dynamicStyles.legendText}>Saídas</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <Menu currentScreen={currentScreen} onNavigate={onNavigate} />
    </View>
  );
}

