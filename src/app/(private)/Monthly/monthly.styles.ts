import { StyleSheet, Platform } from 'react-native';

const PRIMARY_COLOR = '#14ba82';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  contentContainer: {
    paddingTop: 60,
    paddingBottom: 100,
    paddingHorizontal: 24,
  },
  content: {
    width: '100%',
    gap: 24,
  },
  headerSection: {
    width: '100%',
    gap: 8,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.8,
    paddingHorizontal: 4,
    lineHeight: 40,
  },
  headerSubtitle: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.65)',
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  monthSelectorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  monthSelectorButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  monthButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalsSection: {
    width: '100%',
    gap: 12,
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  totalCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    gap: 10,
  },
  totalCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  totalCardTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  totalCardValue: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  entradaValue: {
    color: PRIMARY_COLOR,
  },
  saidaValue: {
    color: '#ff4444',
  },
  saldoValue: {
    // Cor será definida dinamicamente no componente
  },
  tableSection: {
    width: '100%',
    gap: 16,
    marginTop: 8,
  },
  tableHeader: {
    paddingHorizontal: 4,
    gap: 6,
  },
  tableTitle: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  tableDescription: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.65)',
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  emptyState: {
    width: '100%',
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  emptyStateText: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'center',
  },
  transactionsList: {
    width: '100%',
    gap: 12,
    marginTop: 8,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionIconEntrada: {
    backgroundColor: 'rgba(20, 186, 130, 0.2)',
  },
  transactionIconSaida: {
    backgroundColor: 'rgba(255, 68, 68, 0.2)',
  },
  transactionInfo: {
    flex: 1,
    gap: 4,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '600',
  },
  transactionCategory: {
    fontSize: 12,
    fontWeight: '400',
  },
  transactionValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  transactionValueEntrada: {
    color: PRIMARY_COLOR,
  },
  transactionValueSaida: {
    color: '#ff4444',
  },
});

