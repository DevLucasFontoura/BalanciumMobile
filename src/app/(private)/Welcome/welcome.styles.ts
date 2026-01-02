import { StyleSheet, Platform } from 'react-native';

const PRIMARY_COLOR = '#14ba82';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
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
  topHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  greetingContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  userNameText: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff4444',
    borderWidth: 1,
  },
  balanceSection: {
    width: '100%',
    gap: 12,
    marginTop: -8,
  },
  balanceLabel: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.3,
    textTransform: 'none',
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  visibilityButton: {
    padding: 4,
  },
  visibilityButtonInCard: {
    padding: 8,
    borderRadius: 20,
  },
  balanceCard: {
    width: '100%',
    padding: 24,
    borderRadius: 20,
    flexDirection: 'column',
    gap: 16,
    position: 'relative',
    minHeight: 100,
  },
  balanceLabelInCard: {
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0.3,
    textTransform: 'none',
    marginBottom: 4,
    color: '#000000',
  },
  balanceValueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  heroCurrencySymbol: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.8,
    color: '#000000',
  },
  heroBalanceValue: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -1,
    color: '#000000',
  },
  hiddenBalance: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: 4,
    color: '#000000',
  },
  balanceValue: {
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  addButton: {
    position: 'absolute',
    right: 18,
    top: 18,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    width: '100%',
    gap: 16,
  },
  sectionHeader: {
    paddingHorizontal: 4,
    gap: 8,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.8,
    paddingHorizontal: 4,
    lineHeight: 40,
  },
  sectionDescription: {
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  cardsContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 12,
  },
  card: {
    width: '100%',
    padding: 18,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cardIcon: {
    marginRight: 8,
  },
  cardContent: {
    flex: 1,
    gap: 12,
    width: '100%',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  currencySymbol: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
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
    borderRadius: 16,
    overflow: 'hidden',
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
    color: '#14ba82', // Verde primário
  },
  saidaValue: {
    color: '#ff4444', // Vermelho
  },
  guardadoValue: {
    color: '#00A8FF', // Azul mais vivo
  },
  saldoValue: {
    color: '#14ba82', // Verde primário
  },
  insightSection: {
    width: '100%',
    marginTop: 8,
  },
  insightCard: {
    width: '100%',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  insightIcon: {
    marginRight: 0,
  },
  insightText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  tipsSection: {
    width: '100%',
    marginTop: 24,
  },
  tipsDivider: {
    width: '100%',
    height: 1,
    marginBottom: 16,
  },
  tipsHeader: {
    width: '100%',
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tipsHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tipsHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  tipsContent: {
    width: '100%',
    marginTop: 8,
    paddingVertical: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    gap: 12,
  },
  tipIcon: {
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.1,
  },
});

