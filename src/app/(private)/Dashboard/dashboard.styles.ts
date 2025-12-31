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
    paddingHorizontal: 20,
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
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  yearSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  yearSelectorText: {
    fontSize: 18,
    fontWeight: '600',
  },
  yearSelectorButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  yearButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalsSection: {
    width: '100%',
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 0,
  },
  groupedTotalsCard: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1.5,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  totalCard: {
    flex: 1,
    padding: 18,
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderWidth: 0,
    borderColor: 'transparent',
    gap: 8,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.05)',
  },
  totalCardLast: {
    borderRightWidth: 0,
  },
  totalCardFull: {
    width: '100%',
    padding: 18,
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderWidth: 0,
    borderColor: 'transparent',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
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
  chartContainer: {
    width: '100%',
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1.5,
    minHeight: 300,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  chartPlaceholder: {
    fontSize: 16,
    textAlign: 'center',
  },
  chartContent: {
    width: '100%',
    gap: 16,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.3,
    textAlign: 'center',
    marginBottom: 8,
  },
  monthlyBars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 180,
    paddingHorizontal: 8,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  bars: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 2,
  },
  bar: {
    width: '48%',
    minHeight: 4,
    borderRadius: 4,
  },
  entradaBar: {
    backgroundColor: PRIMARY_COLOR,
  },
  saidaBar: {
    backgroundColor: '#ff4444',
  },
  monthLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  entradaDot: {
    backgroundColor: PRIMARY_COLOR,
  },
  saidaDot: {
    backgroundColor: '#ff4444',
  },
  legendText: {
    fontSize: 12,
  },
});

