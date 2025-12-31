import { StyleSheet, Platform } from 'react-native';

const PRIMARY_COLOR = '#14ba82';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 300,
    paddingHorizontal: 24,
    flexGrow: 1,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: -20,
    marginTop: 10,
  },
  topImage: {
    width: '100%',
    height: 320,
  },
  content: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
    gap: 48,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    gap: 8,
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'center',
    lineHeight: 28,
    letterSpacing: 0.3,
  },
  appTitle: {
    fontSize: 64,
    fontWeight: '900',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 72,
    letterSpacing: -1.5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'left',
    lineHeight: 24,
    fontWeight: '400',
    marginTop: 4,
  },
  formContainer: {
    width: '100%',
    gap: 20,
    marginTop: -30,
  },
  inputWrapper: {
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000000',
    paddingHorizontal: 16,
  },
  inputContainerFocused: {
    backgroundColor: '#ffffff',
    borderColor: '#000000',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    padding: 0,
  },
  inputFocused: {
    color: '#000000',
  },
  eyeIcon: {
    padding: 4,
    marginLeft: 8,
  },
  loginButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#000000',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  loginButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
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
    borderTopColor: 'rgba(0, 0, 0, 0.3)',
  },
  signupText: {
    fontSize: 15,
    color: '#000000',
  },
  signupLink: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '600',
  },
});

