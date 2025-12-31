import { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Menu from '../../../components/Menu';
import styles from './monthly.styles';

interface MonthlyProps {
  currentScreen?: string;
  onNavigate?: (screen: string) => void;
  onLogout?: () => void;
}

const monthNames = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export default function Monthly({ currentScreen = 'monthly', onNavigate, onLogout }: MonthlyProps) {
  const currentDate = new Date();
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const selectedMonth = monthNames[selectedMonthIndex];

  // Dados fake para visualização
  const totals = {
    totalEntrada: 4850.75,
    totalSaida: 3290.50,
    saldo: 1560.25,
  };

  const transactions = [
    { id: 1, description: 'Salário', value: 3500.00, type: 'entrada', date: '01/12/2024', category: 'Salário' },
    { id: 2, description: 'Freelance', value: 1350.75, type: 'entrada', date: '15/12/2024', category: 'Trabalho' },
    { id: 3, description: 'Aluguel', value: 1200.00, type: 'saida', date: '05/12/2024', category: 'Moradia' },
    { id: 4, description: 'Supermercado', value: 450.50, type: 'saida', date: '08/12/2024', category: 'Alimentação' },
    { id: 5, description: 'Conta de Luz', value: 180.00, type: 'saida', date: '10/12/2024', category: 'Utilidades' },
    { id: 6, description: 'Internet', value: 120.00, type: 'saida', date: '12/12/2024', category: 'Utilidades' },
    { id: 7, description: 'Transporte', value: 340.00, type: 'saida', date: '18/12/2024', category: 'Transporte' },
    { id: 8, description: 'Restaurante', value: 280.00, type: 'saida', date: '20/12/2024', category: 'Alimentação' },
    { id: 9, description: 'Presente', value: 320.00, type: 'saida', date: '22/12/2024', category: 'Outros' },
  ];

  const loading = false;

  const handleMonthChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (selectedMonthIndex === 0) {
        setSelectedMonthIndex(11);
        setSelectedYear(selectedYear - 1);
      } else {
        setSelectedMonthIndex(selectedMonthIndex - 1);
      }
    } else if (direction === 'next') {
      if (selectedMonthIndex === 11) {
        setSelectedMonthIndex(0);
        setSelectedYear(selectedYear + 1);
      } else {
        setSelectedMonthIndex(selectedMonthIndex + 1);
      }
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
            <Text style={styles.headerTitle}>Análise Mensal</Text>
            <Text style={styles.headerSubtitle}>
              Acompanhe suas finanças mês a mês de forma detalhada.
            </Text>

            <View style={styles.monthSelector}>
              <TouchableOpacity
                style={styles.monthButton}
                onPress={() => handleMonthChange('prev')}
                activeOpacity={0.7}
              >
                <Feather name="chevron-left" size={20} color="#ffffff" />
              </TouchableOpacity>
              <Text style={styles.monthSelectorText}>
                {selectedMonth} {selectedYear}
              </Text>
              <TouchableOpacity
                style={styles.monthButton}
                onPress={() => handleMonthChange('next')}
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
                  <Text style={styles.totalCardTitle}>Entradas</Text>
                </View>
                <Text style={[styles.totalCardValue, styles.entradaValue]}>
                  {formatCurrency(totals.totalEntrada)}
                </Text>
              </View>

              <View style={styles.totalCard}>
                <View style={styles.totalCardHeader}>
                  <Feather name="arrow-down" size={16} color="#ff4444" />
                  <Text style={styles.totalCardTitle}>Saídas</Text>
                </View>
                <Text style={[styles.totalCardValue, styles.saidaValue]}>
                  {formatCurrency(totals.totalSaida)}
                </Text>
              </View>
            </View>

              <View style={styles.totalCard}>
                <View style={styles.totalCardHeader}>
                  <Feather name="dollar-sign" size={16} color="#ffffff" />
                  <Text style={styles.totalCardTitle}>Saldo</Text>
                </View>
                <Text style={[styles.totalCardValue, styles.saldoValue]}>
                  {formatCurrency(totals.saldo)}
                </Text>
              </View>
          </View>

          <View style={styles.tableSection}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableTitle}>Transações do Mês</Text>
              <Text style={styles.tableDescription}>
                Lista completa de todas as transações realizadas em {selectedMonth} de {selectedYear}
              </Text>
            </View>

            {loading ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>Carregando transações...</Text>
              </View>
            ) : transactions.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  Nenhuma transação encontrada para {selectedMonth} de {selectedYear}
                </Text>
              </View>
            ) : (
              <View style={styles.transactionsList}>
                {transactions.map((transaction) => (
                  <View key={transaction.id} style={styles.transactionItem}>
                    <View style={styles.transactionLeft}>
                      <View style={[
                        styles.transactionIcon,
                        transaction.type === 'entrada' ? styles.transactionIconEntrada : styles.transactionIconSaida
                      ]}>
                        <Feather
                          name={transaction.type === 'entrada' ? 'arrow-up' : 'arrow-down'}
                          size={16}
                          color={transaction.type === 'entrada' ? '#14ba82' : '#ff4444'}
                        />
                      </View>
                      <View style={styles.transactionInfo}>
                        <Text style={styles.transactionDescription}>{transaction.description}</Text>
                        <Text style={styles.transactionCategory}>{transaction.category} • {transaction.date}</Text>
                      </View>
                    </View>
                    <Text style={[
                      styles.transactionValue,
                      transaction.type === 'entrada' ? styles.transactionValueEntrada : styles.transactionValueSaida
                    ]}>
                      {transaction.type === 'entrada' ? '+' : '-'} {formatCurrency(Math.abs(transaction.value))}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <Menu currentScreen={currentScreen} onNavigate={onNavigate} />
    </View>
  );
}

