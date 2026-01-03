import { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart } from 'react-native-chart-kit';
import Menu from '../../../components/Menu';
import { useTheme } from '../../../lib/contexts/ThemeContext';
import styles from './dashboard.styles';

interface DashboardProps {
  currentScreen?: string;
  onNavigate?: (screen: string) => void;
  onLogout?: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 40;
const CHART_HEIGHT = 200;

export default function Dashboard({ currentScreen = 'dashboard', onNavigate, onLogout }: DashboardProps) {
  const { theme, colors } = useTheme();
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  // Dados mock - saldo acumulado ao longo dos meses
  const monthlyBalanceData = [
    { month: 'Jan', saldo: 800 },
    { month: 'Fev', saldo: 650 },   // pequena queda
    { month: 'Mar', saldo: 1_200 },
    { month: 'Abr', saldo: 1_050 }, // leve ajuste
    { month: 'Mai', saldo: 2_300 },
    { month: 'Jun', saldo: 4_800 }, // crescimento forte
    { month: 'Jul', saldo: 7_200 },
    { month: 'Ago', saldo: 7_050 }, // estabilidade
    { month: 'Set', saldo: 8_300 },
    { month: 'Out', saldo: 9_100 },
    { month: 'Nov', saldo: 10_900 },
    { month: 'Dez', saldo: 12_360 }, // valor final destacado
  ];

  const monthlyData = [
    { month: 'Jan', entrada: 3800, saida: 2600 },
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

  const categoryData = [
    { name: 'Aluguel', value: 32, color: '#14ba82' },
    { name: 'Alimentação', value: 18, color: '#3b82f6' },
    { name: 'Lazer', value: 12, color: '#f59e0b' },
    { name: 'Transporte', value: 10, color: '#ef4444' },
    { name: 'Assinaturas', value: 8, color: '#8b5cf6' },
    { name: 'Outros', value: 20, color: '#6b7280' },
  ];

  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];
  
  const entradasDiff = ((currentMonth.entrada - previousMonth.entrada) / previousMonth.entrada) * 100;
  const saidasDiff = ((currentMonth.saida - previousMonth.saida) / previousMonth.saida) * 100;
  const saldoCurrent = currentMonth.entrada - currentMonth.saida;
  const saldoPrevious = previousMonth.entrada - previousMonth.saida;
  const saldoDiff = ((saldoCurrent - saldoPrevious) / saldoPrevious) * 100;

  // Calcular melhor mês
  const bestMonth = monthlyData.reduce((best, current) => {
    const currentSaldo = current.entrada - current.saida;
    const bestSaldo = best.entrada - best.saida;
    return currentSaldo > bestSaldo ? current : best;
  }, monthlyData[0]);

  // Mostrar todos os meses
  const filteredMonthlyData = monthlyBalanceData;

  const isIncreasing = monthlyBalanceData[monthlyBalanceData.length - 1].saldo > monthlyBalanceData[0].saldo;
  
  // Calcular crescimento do ano
  const crescimentoAno = monthlyBalanceData[monthlyBalanceData.length - 1].saldo - monthlyBalanceData[0].saldo;
  
  // Preparar dados para o gráfico
  const chartData = {
    labels: filteredMonthlyData.map(d => d.month),
    datasets: [
      {
        data: filteredMonthlyData.map(d => d.saldo),
        color: (opacity = 1) => `rgba(35, 190, 137, ${opacity})`,
        strokeWidth: 3
      }
    ]
  };

  const isDark = colors.background === '#000000';
  
  const chartConfig = {
    backgroundColor: 'transparent',
    backgroundGradientFrom: 'transparent',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: 'transparent',
    backgroundGradientToOpacity: 0,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(35, 190, 137, ${opacity})`,
    labelColor: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity * 0.87})` : `rgba(0, 0, 0, ${opacity * 0.87})`,
    fillShadowGradient: '#23be89',
    fillShadowGradientOpacity: 1,
    propsForDots: {
      r: '4',
      strokeWidth: '0',
      stroke: '#23be89'
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: colors.textSecondary,
      strokeOpacity: 0.1
    },
    propsForVerticalLabels: {
      fill: isDark ? '#ffffff' : '#000000'
    }
  };

  // Gráfico de pizza simples - Categorias
  let currentAngle = -90;
  const categorySegments = categoryData.map((cat) => {
    const angle = (cat.value / 100) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    return { ...cat, startAngle, angle };
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatPercent = (value: number) => {
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(0)}%`;
  };

  const handleYearChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedYear(selectedYear - 1);
    } else if (direction === 'next') {
      setSelectedYear(selectedYear + 1);
    }
  };

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
    yearSelector: [styles.yearSelector, { backgroundColor: colors.surface }],
    yearSelectorText: [styles.yearSelectorText, { color: colors.text }],
    balanceChartContainer: [
      styles.balanceChartContainer,
      cardShadow
    ],
    balanceChartTitle: [styles.balanceChartTitle, { color: '#000000' }],
    chartContainer: [styles.chartContainer, { backgroundColor: colors.surface }],
    chartTitle: [styles.chartTitle, { color: colors.text }],
    chartSubtitle: [styles.chartSubtitle, { color: colors.textSecondary }],
    legendText: [styles.legendText, { color: colors.textSecondary }],
    monthLabel: [styles.monthLabel, { color: colors.textSecondary }],
    categoryItem: [styles.categoryItem, { borderBottomColor: theme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)' }],
    categoryName: [styles.categoryName, { color: colors.text }],
    categoryValue: [styles.categoryValue, { color: colors.textSecondary }],
    comparisonCard: [styles.comparisonCard, { backgroundColor: colors.surface }],
    comparisonLabel: [styles.comparisonLabel, { color: colors.textSecondary }],
    comparisonValue: [styles.comparisonValue, { color: colors.text }],
    insightCard: [styles.insightCard, { backgroundColor: colors.surface }],
    insightText: [styles.insightText, { color: colors.text }],
  };

  return (
    <View style={dynamicStyles.wrapper}>
      <ScrollView
        style={dynamicStyles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Header */}
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

          {/* Gráfico 1: Evolução do Saldo */}
          <LinearGradient
            colors={['#e6f4e1', colors.surface]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={dynamicStyles.balanceChartContainer}
          >
            <View style={styles.balanceChartHeader}>
              <Text style={dynamicStyles.balanceChartTitle}>Evolução do Saldo no Ano</Text>
              <Text style={styles.balanceGrowthIndicator}>
                ↑ {formatCurrency(crescimentoAno)}
              </Text>
            </View>
            <View style={styles.lineChartContainer}>
              <LineChart
                data={chartData}
                width={CHART_WIDTH}
                height={CHART_HEIGHT}
                chartConfig={chartConfig}
                bezier
                style={styles.chartStyle}
                withVerticalLabels={true}
                withHorizontalLabels={true}
                withDots={true}
                withShadow={true}
                withHorizontalLines={true}
                withVerticalLines={false}
                withInnerLines={false}
                withOuterLines={false}
                fromZero={true}
                formatYLabel={(value) => `R$ ${value}`}
              />
            </View>
          </LinearGradient>

          {/* Gráfico 2: Entradas vs Saídas Mensal (Melhorado) */}
          <View style={dynamicStyles.chartContainer}>
            <Text style={dynamicStyles.chartTitle}>Entradas x Saídas por Mês</Text>
            <View style={styles.monthlyBars}>
              {monthlyData.map((data, index) => {
                const maxValue = Math.max(...monthlyData.map(d => Math.max(d.entrada, d.saida)));
                const entradaHeight = (data.entrada / maxValue) * 100;
                const saidaHeight = (data.saida / maxValue) * 100;
                const saldo = data.entrada - data.saida;
                
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
            <View style={styles.bestMonthInfo}>
              <Feather name="award" size={16} color="#f59e0b" />
              <Text style={[styles.bestMonthText, { color: colors.textSecondary }]}>
                {bestMonth.month} foi seu melhor mês (+{formatCurrency(bestMonth.entrada - bestMonth.saida)})
              </Text>
            </View>
          </View>

          {/* Gráfico 3: Gastos por Categoria */}
          <View style={dynamicStyles.chartContainer}>
            <Text style={dynamicStyles.chartTitle}>Gastos por Categoria</Text>
            <View style={styles.categoryList}>
              {categoryData.map((category, index) => (
                <View
                  key={index}
                  style={[
                    dynamicStyles.categoryItem,
                    index === categoryData.length - 1 && styles.categoryItemLast,
                  ]}
                >
                  <View style={styles.categoryLeft}>
                    <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
                    <Text style={dynamicStyles.categoryName}>{category.name}</Text>
                  </View>
                  <Text style={dynamicStyles.categoryValue}>{category.value}%</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Gráfico 4: Comparação Mês Atual vs Anterior */}
          <View style={styles.comparisonSection}>
            <Text style={[dynamicStyles.chartTitle, styles.comparisonTitle]}>
              Comparação: {currentMonth.month} vs {previousMonth.month}
            </Text>
            <View style={styles.comparisonGrid}>
              <View style={dynamicStyles.comparisonCard}>
                <Text style={dynamicStyles.comparisonLabel}>Entradas</Text>
                <Text style={dynamicStyles.comparisonValue}>
                  {formatPercent(entradasDiff)}
                </Text>
                <Feather
                  name={entradasDiff > 0 ? "arrow-up" : "arrow-down"}
                  size={20}
                  color={entradasDiff > 0 ? '#14ba82' : '#ef4444'}
                />
              </View>
              <View style={dynamicStyles.comparisonCard}>
                <Text style={dynamicStyles.comparisonLabel}>Saídas</Text>
                <Text style={dynamicStyles.comparisonValue}>
                  {formatPercent(saidasDiff)}
                </Text>
                <Feather
                  name={saidasDiff < 0 ? "arrow-up" : "arrow-down"}
                  size={20}
                  color={saidasDiff < 0 ? '#14ba82' : '#ef4444'}
                />
              </View>
              <View style={dynamicStyles.comparisonCard}>
                <Text style={dynamicStyles.comparisonLabel}>Saldo</Text>
                <Text style={dynamicStyles.comparisonValue}>
                  {formatPercent(saldoDiff)}
                </Text>
                <Feather
                  name={saldoDiff > 0 ? "arrow-up" : "arrow-down"}
                  size={20}
                  color={saldoDiff > 0 ? '#14ba82' : '#ef4444'}
                />
              </View>
            </View>
          </View>

          {/* Insights Automáticos */}
          <View style={dynamicStyles.chartContainer}>
            <View style={styles.insightsHeader}>
              <MaterialCommunityIcons name="lightbulb-on-outline" size={24} color="#14ba82" />
              <Text style={dynamicStyles.chartTitle}>Insights</Text>
            </View>
            <View style={dynamicStyles.insightCard}>
              <Feather name="trending-up" size={20} color="#14ba82" />
              <Text style={dynamicStyles.insightText}>
                Seu saldo cresceu {formatPercent(((monthlyBalanceData[monthlyBalanceData.length - 1].saldo - monthlyBalanceData[0].saldo) / monthlyBalanceData[0].saldo) * 100)} este ano
              </Text>
            </View>
            <View style={dynamicStyles.insightCard}>
              <Feather name="alert-circle" size={20} color="#f59e0b" />
              <Text style={dynamicStyles.insightText}>
                Aluguel representa {categoryData[0].value}% dos seus gastos. Considere negociar ou buscar alternativas.
              </Text>
            </View>
            <View style={dynamicStyles.insightCard}>
              <Feather name="target" size={20} color="#3b82f6" />
              <Text style={dynamicStyles.insightText}>
                Mantendo esse ritmo, você terá {formatCurrency(monthlyBalanceData[monthlyBalanceData.length - 1].saldo * 1.3)} no próximo ano
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Menu currentScreen={currentScreen} onNavigate={onNavigate} />
    </View>
  );
}
