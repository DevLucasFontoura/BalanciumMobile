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
    marginBottom: 20,
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
    gap: 16,
  },
  balanceLabel: {
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0.4,
    paddingHorizontal: 4,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  balanceCard: {
    width: '100%',
    padding: 24,
    borderRadius: 16,
    position: 'relative',
  },
  balanceValue: {
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  addButton: {
    position: 'absolute',
    right: 24,
    top: 24,
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
    gap: 8,
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
  entradaValue: {
    color: PRIMARY_COLOR,
  },
  saidaValue: {
    color: '#ff4444',
  },
  guardadoValue: {
    color: '#4A90E2',
  },
});

