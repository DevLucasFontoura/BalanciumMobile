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
    gap: 0,
  },
  greetingText: {
    fontSize: 36,
    fontWeight: '400',
    color: '#000000',
  },
  userNameText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#000000',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#000000',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
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
    borderColor: '#ffffff',
  },
  balanceSection: {
    width: '100%',
    gap: 16,
  },
  balanceLabel: {
    fontSize: 26,
    fontWeight: '600',
    fontStyle: 'italic',
    color: '#000000',
    letterSpacing: 0.5,
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  balanceCard: {
    width: '100%',
    padding: 24,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000000',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  balanceValue: {
    fontSize: 36,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -0.5,
  },
  addButton: {
    position: 'absolute',
    right: 24,
    top: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
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
    fontSize: 26,
    fontWeight: '600',
    fontStyle: 'italic',
    color: '#000000',
    letterSpacing: 0.5,
  },
  sectionDescription: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.7)',
    fontWeight: '500',
  },
  cardsContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 12,
  },
  card: {
    width: '100%',
    padding: 18,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
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
    color: '#000000',
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

