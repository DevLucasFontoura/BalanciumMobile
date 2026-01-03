import { StyleSheet, Platform } from 'react-native';

const PRIMARY_COLOR = '#14ba82';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    paddingTop: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  pillContainer: {
    width: '100%',
    maxWidth: 600,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 24,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  blurContainer: {
    width: '100%',
    borderRadius: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    overflow: 'visible',
    position: 'relative',
  },
  blurOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -8,
    bottom: -8,
    zIndex: 1,
  },
  neonTriangle: {
    position: 'absolute',
    left: '50%',
    bottom: -8,
    width: 12,
    height: 40,
    zIndex: 0,
    ...Platform.select({
      ios: {
        shadowColor: PRIMARY_COLOR,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  neonLine: {
    position: 'absolute',
    left: '50%',
    marginLeft: -2,
    width: 4,
    top: -8,
    bottom: -8,
    backgroundColor: PRIMARY_COLOR,
    opacity: 1,
    zIndex: 0,
    ...Platform.select({
      ios: {
        shadowColor: PRIMARY_COLOR,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  neonLineWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 4,
    zIndex: 0,
  },
  neonTriangleSaida: {
    position: 'absolute',
    left: '50%',
    bottom: -8,
    width: 12,
    height: 40,
    zIndex: 0,
    ...Platform.select({
      ios: {
        shadowColor: '#ff4444',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  neonLineSaida: {
    position: 'absolute',
    left: '50%',
    marginLeft: -2,
    width: 4,
    top: -8,
    bottom: -8,
    backgroundColor: '#ff4444',
    opacity: 1,
    zIndex: 0,
    ...Platform.select({
      ios: {
        shadowColor: '#ff4444',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  neonLineBlur: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -8,
    bottom: -8,
    zIndex: 1,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  menuItemWrapper: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    minHeight: 48,
    borderRadius: 20,
    width: '100%',
    zIndex: 2,
  },
  menuItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 0.5,
    borderColor: 'rgba(20, 186, 130, 0.3)',
  },
  iconGlowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGlow: {
    ...Platform.select({
      ios: {
        shadowColor: PRIMARY_COLOR,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.8,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  addButtonWrapper: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    minHeight: 48,
    borderRadius: 20,
    width: '100%',
    zIndex: 2,
  },
  addButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 0.5,
    borderColor: 'rgba(20, 186, 130, 0.3)',
  },
  addButtonActiveSaida: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 68, 68, 0.3)',
  },
  menuLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: -0.1,
    marginTop: 2,
  },
  menuLabelActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
});

export { PRIMARY_COLOR };

