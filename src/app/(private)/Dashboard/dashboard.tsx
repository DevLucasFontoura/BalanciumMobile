import { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Svg, Path, Circle, G, Text as SvgText, Rect } from 'react-native-svg';
import Menu from '../../../components/Menu';
import { useTheme } from '../../../lib/contexts/ThemeContext';
import styles from './dashboard.styles';

interface DashboardProps {
  currentScreen?: string;
  onNavigate?: (screen: string) => void;
  onLogout?: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 80;
const CHART_HEIGHT = 110;

export default function Dashboard({ currentScreen = 'dashboard', onNavigate, onLogout }: DashboardProps) {
  const { theme, colors } = useTheme();
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  // Dados mock - saldo acumulado ao longo dos meses
  const monthlyBalanceData = [
    { month: 'Jan', saldo: 1200 },
    { month: 'Fev', saldo: 2500 },
    { month: 'Mar', saldo: 3800 },
    { month: 'Abr', saldo: 5200 },
    { month: 'Mai', saldo: 6800 },
    { month: 'Jun', saldo: 8100 },
    { month: 'Jul', saldo: 9500 },
    { month: 'Ago', saldo: 10800 },
    { month: 'Set', saldo: 12100 },
    { month: 'Out', saldo: 13200 },
    { month: 'Nov', saldo: 14500 },
    { month: 'Dez', saldo: 15800 },
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

  // Filtrar meses para mostrar: Jan, Mar, Mai, Ago, Out, Dez
  const monthNamesToShow = ['Jan', 'Mar', 'Mai', 'Ago', 'Out', 'Dez'];
  const filteredMonthlyData = monthlyBalanceData.filter(data => 
    monthNamesToShow.includes(data.month)
  );
  
  // Gráfico de linha - Saldo ao longo do tempo
  const maxBalance = Math.max(...monthlyBalanceData.map(d => d.saldo));
  const minBalance = 0; // Sempre começar do zero como na imagem
  const range = maxBalance - minBalance || 1;
  
  const PADDING_LEFT = 0; // Começar logo após os labels do eixo Y
  const PADDING_RIGHT = 20;
  const PADDING_TOP = 20;
  const PADDING_BOTTOM = 30;
  const CHART_CONTENT_WIDTH = CHART_WIDTH - PADDING_LEFT - PADDING_RIGHT;
  const CHART_CONTENT_HEIGHT = CHART_HEIGHT - PADDING_TOP - PADDING_BOTTOM;
  
  // Calcular largura disponível para os meses (considerando o container do gráfico)
  // O container tem paddingLeft: 24 no lineChartContainer, então os meses começam em 0 relativo ao SVG
  const availableWidth = CHART_WIDTH - PADDING_RIGHT; // Largura disponível menos padding direito
  const numberOfMonths = filteredMonthlyData.length;
  
  // Calcular espaçamento proporcional: distribuir uniformemente os meses no espaço disponível
  // Deixar um pouco de margem nas extremidades
  const marginSides = 0; // Sem margem nas laterais para usar todo o espaço
  const usableWidth = availableWidth - (marginSides * 2);
  
  // Calcular a posição x de cada mês distribuída uniformemente
  const points = filteredMonthlyData.map((data, index) => {
    // Distribuir os meses uniformemente no espaço disponível
    const x = marginSides + (index / (numberOfMonths - 1)) * usableWidth;
    const y = PADDING_TOP + CHART_CONTENT_HEIGHT - ((data.saldo - minBalance) / range) * CHART_CONTENT_HEIGHT;
    return { x, y, ...data };
  });
  
  // A largura total do SVG é o espaço usado pelos meses
  const totalMonthsWidth = availableWidth;

  const pathData = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

  // Área preenchida: linha + fechar até a base
  const areaPathData = `${pathData} L ${points[points.length - 1].x} ${PADDING_TOP + CHART_CONTENT_HEIGHT} L ${points[0].x} ${PADDING_TOP + CHART_CONTENT_HEIGHT} Z`;

  const isIncreasing = monthlyBalanceData[monthlyBalanceData.length - 1].saldo > monthlyBalanceData[0].saldo;
  
  // Calcular crescimento do ano
  const crescimentoAno = monthlyBalanceData[monthlyBalanceData.length - 1].saldo - monthlyBalanceData[0].saldo;
  
  // Labels do eixo Y (formatar para "R$ X mil")
  const yAxisLabels = [];
  const numLabels = 3; // 0, meio, máximo
  for (let i = numLabels; i >= 0; i--) {
    const value = (maxBalance / numLabels) * i;
    if (value >= 1000) {
      yAxisLabels.push(`R$ ${(value / 1000).toFixed(0)} mil`);
    } else {
      yAxisLabels.push('R$ 0');
    }
  }

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
              {/* Labels do eixo Y - alinhados à esquerda, no nível do título */}
              <View style={styles.yAxisLabelsContainer}>
                {yAxisLabels.map((label, index) => (
                  <Text
                    key={index}
                    style={[styles.yAxisLabel, { color: colors.textSecondary }]}
                  >
                    {label}
                  </Text>
                ))}
              </View>
              {/* Gráfico SVG */}
              <View style={styles.chartSvgWrapper}>
                <Svg width={totalMonthsWidth} height={CHART_HEIGHT}>
                  {/* Área preenchida */}
                  <Path
                    d={areaPathData}
                    fill={isIncreasing ? '#14ba82' : '#ef4444'}
                    fillOpacity="0.2"
                  />
                  {/* Linha */}
                  <Path
                    d={pathData}
                    fill="none"
                    stroke={isIncreasing ? '#14ba82' : '#ef4444'}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Pontos */}
                  {points.map((point, index) => {
                    const isLastPoint = index === points.length - 1;
                    const isFirstPoint = index === 0;
                    
                    return (
                      <G key={index}>
                        <Circle
                          cx={point.x}
                          cy={point.y}
                          r="4"
                          fill={isIncreasing ? '#14ba82' : '#ef4444'}
                        />
                        {/* Tooltip no último ponto */}
                        {isLastPoint && (
                          <G>
                            {/* Linha conectando o ponto ao tooltip */}
                            <Path
                              d={`M ${point.x} ${point.y} L ${point.x} ${point.y - 30}`}
                              stroke="#14ba82"
                              strokeWidth="1.5"
                            />
                            {/* Retângulo do tooltip */}
                            <Rect
                              x={point.x - 55}
                              y={point.y - 48}
                              width="110"
                              height="18"
                              rx="6"
                              fill="#ffffff"
                              stroke="#14ba82"
                              strokeWidth="1"
                            />
                            {/* Texto do tooltip */}
                            <SvgText
                              x={point.x}
                              y={point.y - 37}
                              fontSize="10"
                              fontWeight="600"
                              fill="#14ba82"
                              textAnchor="middle"
                            >
                              {formatCurrency(point.saldo)}
                            </SvgText>
                          </G>
                        )}
                      </G>
                    );
                  })}
                </Svg>
                {/* Labels dos meses no eixo X */}
                <View style={styles.monthLabels}>
                  {filteredMonthlyData.map((data, index) => (
                    <Text key={index} style={dynamicStyles.monthLabel}>
                      {data.month}
                    </Text>
                  ))}
                </View>
              </View>
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
