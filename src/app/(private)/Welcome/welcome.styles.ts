import { StyleSheet, Platform } from 'react-native';

const PRIMARY_COLOR = '#14ba82';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
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
    padding: 28,
    backgroundColor: 'rgba(20, 186, 130, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(20, 186, 130, 0.2)',
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: PRIMARY_COLOR,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  welcomeEmoji: {
    fontSize: 32,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 24,
    fontWeight: '400',
  },
  section: {
    width: '100%',
    gap: 16,
  },
  sectionHeader: {
    paddingHorizontal: 4,
    gap: 6,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: -0.3,
  },
  sectionDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '400',
  },
  cardsContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    padding: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    gap: 12,
    marginBottom: 12,
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
        elevation: 2,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardIcon: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  entradaIcon: {
    backgroundColor: PRIMARY_COLOR,
  },
  saidaIcon: {
    backgroundColor: '#ff4444',
  },
  saldoIcon: {
    backgroundColor: '#ffffff',
  },
  guardadoIcon: {
    backgroundColor: '#4A90E2',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  cardValue: {
    fontSize: 24,
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
    color: '#ffffff',
  },
  guardadoValue: {
    color: '#4A90E2',
  },
});

