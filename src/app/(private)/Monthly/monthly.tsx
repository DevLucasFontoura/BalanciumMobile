import { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Platform, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Menu from '../../../components/Menu';
import { useTheme } from '../../../lib/contexts/ThemeContext';
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
  const { theme, colors } = useTheme();
  const currentDate = new Date();
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const selectedMonth = monthNames[selectedMonthIndex];
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

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
    monthSelector: [
      styles.monthSelector, 
      { backgroundColor: colors.surface }
    ],
    monthSelectorText: [styles.monthSelectorText, { color: colors.text }],
    totalCard: [
      styles.totalCard, 
      { backgroundColor: colors.surface }
    ],
    totalCardTitle: [styles.totalCardTitle, { color: colors.textSecondary }],
    saldoValue: [styles.totalCardValue, styles.saldoValue, { color: colors.text }],
    tableTitle: [styles.tableTitle, { color: colors.text }],
    tableDescription: [styles.tableDescription, { color: colors.textSecondary }],
    groupedTransactionsCard: [
      styles.groupedTransactionsCard,
      { backgroundColor: colors.surface },
      cardShadow
    ],
    transactionDescription: [styles.transactionDescription, { color: colors.text }],
    emptyStateText: [styles.emptyStateText, { color: colors.textSecondary }],
    transactionModalContainer: [styles.transactionModalContainer, { backgroundColor: colors.surface }],
    transactionModalHeader: [styles.transactionModalHeader, { borderBottomColor: theme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)' }],
    transactionModalDetail: [styles.transactionModalDetail, { color: colors.text }],
    transactionModalLabel: [styles.transactionModalLabel, { color: colors.textSecondary }],
    transactionModalValue: [styles.transactionModalValue, { color: colors.text }],
  };

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
    <View style={dynamicStyles.wrapper}>
      <ScrollView
        style={dynamicStyles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.headerSection}>
            <Text style={dynamicStyles.headerTitle}>Controle Mensal</Text>

            <View style={dynamicStyles.monthSelector}>
              <TouchableOpacity
                style={styles.monthButton}
                onPress={() => handleMonthChange('prev')}
                activeOpacity={0.7}
              >
                <Feather name="chevron-left" size={20} color={colors.text} />
              </TouchableOpacity>
              <Text style={dynamicStyles.monthSelectorText}>
                {selectedMonth} {selectedYear}
              </Text>
              <TouchableOpacity
                style={styles.monthButton}
                onPress={() => handleMonthChange('next')}
                activeOpacity={0.7}
              >
                <Feather name="chevron-right" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.totalsSection}>
            <View style={styles.totalsRow}>
              <View style={dynamicStyles.totalCard}>
                <View style={styles.totalCardHeader}>
                  <Feather name="arrow-up" size={18} color={colors.primary} />
                  <Text style={dynamicStyles.totalCardTitle}>Entradas</Text>
                </View>
                <Text style={[styles.totalCardValue, styles.transactionValueEntrada]}>
                  {formatCurrency(totals.totalEntrada)}
                </Text>
              </View>

              <View style={dynamicStyles.totalCard}>
                <View style={styles.totalCardHeader}>
                  <Feather name="arrow-down" size={18} color="#ff4444" />
                  <Text style={dynamicStyles.totalCardTitle}>Saídas</Text>
                </View>
                <Text style={[styles.totalCardValue, styles.transactionValueSaida]}>
                  {formatCurrency(totals.totalSaida)}
                </Text>
              </View>
            </View>

              <View style={dynamicStyles.totalCard}>
                <View style={styles.totalCardHeader}>
                  <Feather name="dollar-sign" size={18} color={colors.text} />
                  <Text style={dynamicStyles.totalCardTitle}>Saldo</Text>
                </View>
                <Text style={dynamicStyles.saldoValue}>
                  {formatCurrency(totals.saldo)}
                </Text>
              </View>
          </View>

          <View style={styles.tableSection}>
            <View style={styles.tableHeader}>
              <Text style={dynamicStyles.tableTitle}>Transações do Mês</Text>
              <Text style={dynamicStyles.tableDescription}>
                Lista completa de todas as transações realizadas em {selectedMonth} de {selectedYear}
              </Text>
            </View>

            {loading ? (
              <View style={styles.emptyState}>
                <Text style={dynamicStyles.emptyStateText}>Carregando transações...</Text>
              </View>
            ) : transactions.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={dynamicStyles.emptyStateText}>
                  Nenhuma transação encontrada para {selectedMonth} de {selectedYear}
                </Text>
              </View>
            ) : (
              <View style={dynamicStyles.groupedTransactionsCard}>
                {transactions.map((transaction, index) => {
                  const isLast = index === transactions.length - 1;
                  const rowStyle = [
                    styles.transactionRow,
                    { backgroundColor: colors.surface },
                    !isLast && { borderBottomWidth: 1, borderBottomColor: theme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)' },
                  ];
                  return (
                    <TouchableOpacity
                      key={transaction.id}
                      style={rowStyle}
                      onPress={() => setSelectedTransaction(transaction)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.transactionLeft}>
                        <View style={[
                          styles.transactionIcon,
                          transaction.type === 'entrada' ? styles.transactionIconEntrada : styles.transactionIconSaida
                        ]}>
                          <Feather
                            name={transaction.type === 'entrada' ? 'arrow-up' : 'arrow-down'}
                            size={18}
                            color={transaction.type === 'entrada' ? colors.primary : '#ff4444'}
                          />
                        </View>
                        <Text style={dynamicStyles.transactionDescription}>{transaction.description}</Text>
                      </View>
                      <Text style={[
                        styles.transactionValue,
                        transaction.type === 'entrada' ? styles.transactionValueEntrada : styles.transactionValueSaida
                      ]}>
                        {transaction.type === 'entrada' ? '+' : '-'} {formatCurrency(Math.abs(transaction.value))}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Transaction Detail Modal */}
      <Modal
        visible={selectedTransaction !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedTransaction(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={dynamicStyles.transactionModalContainer}>
            <View style={dynamicStyles.transactionModalHeader}>
              <Text style={dynamicStyles.transactionDescription}>
                {selectedTransaction?.description || ''}
              </Text>
              <TouchableOpacity
                onPress={() => setSelectedTransaction(null)}
                style={styles.transactionModalCloseButton}
              >
                <Feather name="x" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.transactionModalContent}>
              <View style={styles.transactionModalRow}>
                <Text style={dynamicStyles.transactionModalLabel}>Valor</Text>
                <Text style={[
                  dynamicStyles.transactionModalValue,
                  selectedTransaction?.type === 'entrada' ? styles.transactionValueEntrada : styles.transactionValueSaida
                ]}>
                  {selectedTransaction ? (
                    `${selectedTransaction.type === 'entrada' ? '+' : '-'} ${formatCurrency(Math.abs(selectedTransaction.value))}`
                  ) : ''}
                </Text>
              </View>

              <View style={styles.transactionModalRow}>
                <Text style={dynamicStyles.transactionModalLabel}>Categoria</Text>
                <Text style={dynamicStyles.transactionModalDetail}>
                  {selectedTransaction?.category || ''}
                </Text>
              </View>

              <View style={styles.transactionModalRow}>
                <Text style={dynamicStyles.transactionModalLabel}>Data</Text>
                <Text style={dynamicStyles.transactionModalDetail}>
                  {selectedTransaction?.date || ''}
                </Text>
              </View>

              <View style={styles.transactionModalRow}>
                <Text style={dynamicStyles.transactionModalLabel}>Tipo</Text>
                <Text style={[
                  dynamicStyles.transactionModalDetail,
                  selectedTransaction?.type === 'entrada' ? { color: colors.primary } : { color: '#ff4444' }
                ]}>
                  {selectedTransaction?.type === 'entrada' ? 'Entrada' : 'Saída'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Menu currentScreen={currentScreen} onNavigate={onNavigate} />
    </View>
  );
}

