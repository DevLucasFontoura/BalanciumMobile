import { StyleSheet, Platform } from 'react-native';

const PRIMARY_COLOR = '#14ba82';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 60,
    paddingBottom: 100,
    paddingHorizontal: 24,
  },
  content: {
    width: '100%',
    gap: 16,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.8,
    paddingHorizontal: 4,
    lineHeight: 40,
    marginBottom: 8,
  },
  typeSelectorCard: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 16,
    padding: 4,
    gap: 4,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  typeButtonActive: {
    backgroundColor: PRIMARY_COLOR,
  },
  typeButtonActiveSaida: {
    backgroundColor: '#ff4444',
  },
  typeButtonText: {
    fontSize: 17,
    fontWeight: '600',
  },
  typeButtonTextActive: {
    color: '#ffffff',
  },
  formCard: {
    width: '100%',
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  inputGroup: {
    width: '100%',
    gap: 6,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    borderWidth: 1.5,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: '700',
  },
  valueInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1.5,
  },
  pickerButtonText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  pickerModalContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    maxHeight: '60%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  pickerModalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  pickerModalCloseButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  pickerModalCloseText: {
    fontSize: 16,
    fontWeight: '600',
  },
  picker: {
    width: '100%',
    height: 200,
    alignSelf: 'center',
  },
  datePickerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  saveButton: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  saveButtonEntrada: {
    backgroundColor: PRIMARY_COLOR,
  },
  saveButtonSaida: {
    backgroundColor: '#ff4444',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
});

