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
  content: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
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
  profileSection: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 4,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  profileEmail: {
    fontSize: 15,
    textAlign: 'center',
  },
  sectionTitle: {
    width: '100%',
    paddingHorizontal: 4,
    marginTop: 4,
    marginBottom: 4,
  },
  sectionTitleText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 16,
  },
  rowContent: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  rowValue: {
    fontSize: 13,
    fontWeight: '400',
  },
});

