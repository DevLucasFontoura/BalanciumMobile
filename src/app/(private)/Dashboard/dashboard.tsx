import { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Menu from '../../../components/Menu';
import styles from './dashboard.styles';

interface DashboardProps {
  onNavigate?: (screen: string) => void;
  onLogout?: () => void;
}

export default function Dashboard({ onNavigate, onLogout }: DashboardProps) {
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

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
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.headerSection}>
            <Text style={styles.headerTitle}>Dashboard</Text>
            <Text style={styles.headerSubtitle}>
              Visualização de gráficos e análises financeiras em tempo real
            </Text>

            <View style={styles.yearSelector}>
              <TouchableOpacity
                style={styles.yearButton}
                onPress={() => handleYearChange('prev')}
                activeOpacity={0.7}
              >
                <Feather name="chevron-left" size={20} color="#ffffff" />
              </TouchableOpacity>
              <Text style={styles.yearSelectorText}>{selectedYear}</Text>
              <TouchableOpacity
                style={styles.yearButton}
                onPress={() => handleYearChange('next')}
                activeOpacity={0.7}
              >
                <Feather name="chevron-right" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.totalsSection}>
            <View style={styles.totalsRow}>
              <View style={styles.totalCard}>
                <View style={styles.totalCardHeader}>
                  <Feather name="arrow-up" size={16} color="#14ba82" />
                  <Text style={styles.totalCardTitle}>Total Entradas</Text>
                </View>
                <Text style={[styles.totalCardValue, styles.entradaValue]}>
                  {formatCurrency(yearTotals.entradas)}
                </Text>
              </View>

              <View style={styles.totalCard}>
                <View style={styles.totalCardHeader}>
                  <Feather name="arrow-down" size={16} color="#ff4444" />
                  <Text style={styles.totalCardTitle}>Total Saídas</Text>
                </View>
                <Text style={[styles.totalCardValue, styles.saidaValue]}>
                  {formatCurrency(yearTotals.saidas)}
                </Text>
              </View>
            </View>

            <View style={styles.totalCard}>
              <View style={styles.totalCardHeader}>
                <Feather name="dollar-sign" size={16} color="#ffffff" />
                <Text style={styles.totalCardTitle}>Saldo Total</Text>
              </View>
              <Text style={[styles.totalCardValue, styles.saldoValue]}>
                {formatCurrency(yearTotals.saldo)}
              </Text>
            </View>
          </View>

          <View style={styles.chartContainer}>
            {loading ? (
              <Text style={styles.chartPlaceholder}>Carregando gráfico...</Text>
            ) : (
              <View style={styles.chartContent}>
                <Text style={styles.chartTitle}>Análise Mensal - {selectedYear}</Text>
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
                        <Text style={styles.monthLabel}>{data.month}</Text>
                      </View>
                    );
                  })}
                </View>
                <View style={styles.chartLegend}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, styles.entradaDot]} />
                    <Text style={styles.legendText}>Entradas</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, styles.saidaDot]} />
                    <Text style={styles.legendText}>Saídas</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <Menu currentScreen="dashboard" onNavigate={onNavigate} />
    </View>
  );
}

