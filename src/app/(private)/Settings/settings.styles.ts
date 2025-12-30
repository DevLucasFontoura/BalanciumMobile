import { StyleSheet } from 'react-native';

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
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 100,
    paddingHorizontal: 16,
  },
  content: {
    width: '100%',
  },
  sectionsContainer: {
    width: '100%',
    gap: 8,
  },
  settingsCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    gap: 12,
  },
  lockedCard: {
    opacity: 0.6,
  },
  cardTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#ffffff',
  },
  lockedTitle: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  upgradeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: 'rgba(255, 193, 7, 0.2)',
    borderRadius: 4,
    fontSize: 9,
    fontWeight: '600',
    color: '#ffc107',
    letterSpacing: 0.5,
    marginRight: 4,
  },
  footerSection: {
    width: '100%',
    gap: 12,
    marginTop: 24,
  },
  logoutButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
  },
  logoutButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#ffffff',
  },
  versionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  versionLabel: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.4)',
  },
  versionText: {
    fontSize: 13,
    fontWeight: '600',
    color: PRIMARY_COLOR,
  },
});
