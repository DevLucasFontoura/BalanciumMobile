import { StyleSheet, Platform } from 'react-native';

const PRIMARY_COLOR = '#14ba82';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  contentContainer: {
    paddingTop: 80,
    paddingBottom: 0,
    paddingHorizontal: 24,
    flexGrow: 1,
  },
  content: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
    gap: 48,
  },
  header: {
    width: '100%',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  welcomeTitle: {
    fontSize: 56,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'left',
    lineHeight: 64,
    letterSpacing: -0.5,
  },
  balanciumWrapper: {
    position: 'relative',
  },
  balanciumOutline: {
    position: 'absolute',
    fontSize: 56,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 64,
    letterSpacing: -0.5,
  },
  balanciumHighlight: {
    fontSize: 56,
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 64,
    letterSpacing: -0.5,
    position: 'relative',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'left',
    lineHeight: 24,
  },
  formContainer: {
    width: '100%',
    gap: 24,
    marginTop: 32,
  },
  inputContainer: {
    width: '100%',
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    opacity: 0.9,
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#000000',
  },
  loginButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
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
  loginButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: PRIMARY_COLOR,
  },
  forgotPasswordButton: {
    alignItems: 'center',
    marginTop: 8,
  },
  forgotPasswordText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 24,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  signupText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  signupLink: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '600',
  },
});

