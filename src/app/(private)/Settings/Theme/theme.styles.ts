import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  animatedContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 100,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '400',
    letterSpacing: -0.3,
    lineHeight: 32,
  },
  content: {
    width: '100%',
  },
  groupedCard: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingsRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 16,
  },
  rowTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
});

