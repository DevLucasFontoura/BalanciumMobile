import { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';
import Menu from '../../../components/Menu';
import { useTheme } from '../../../lib/contexts/ThemeContext';
import styles from './newTransition.styles';

interface NewTransitionProps {
  onNavigate?: (screen: string) => void;
  onGoBack?: () => void;
  onSave?: (transaction: any) => void;
}

export default function NewTransition({ onNavigate, onGoBack, onSave }: NewTransitionProps) {
  const { theme, colors } = useTheme();
  const [type, setType] = useState<'entrada' | 'saida'>('entrada');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerModalVisible, setPickerModalVisible] = useState(false);

  // Formatar data para exibição
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('pt-BR');
  };

  const date = formatDate(selectedDate);

  // Estilos dinâmicos baseados no tema
  const inputBorderColor = theme === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.15)';
  const cardShadow = theme === 'light' ? {
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
        elevation: 3,
      },
    }),
  } : {};

  const dynamicStyles = {
    wrapper: [styles.wrapper, { backgroundColor: colors.background }],
    container: [styles.container, { backgroundColor: colors.background }],
    pageTitle: [styles.pageTitle, { color: colors.text }],
    typeSelectorCard: [
      styles.typeSelectorCard,
      { backgroundColor: colors.surface }
    ],
    formCard: [
      styles.formCard,
      { backgroundColor: colors.surface }
    ],
    inputLabel: [styles.inputLabel, { color: colors.textSecondary }],
    inputContainer: [
      styles.inputContainer,
      {
        backgroundColor: theme === 'light' ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.05)',
        borderColor: inputBorderColor,
      }
    ],
    currencySymbol: [styles.currencySymbol, { color: colors.text }],
    valueInput: [styles.valueInput, { color: colors.text }],
    textInput: [styles.textInput, { color: colors.text }],
    calendarIcon: { color: colors.textSecondary },
    typeButtonText: [styles.typeButtonText, { color: colors.textSecondary }],
    pickerButton: [
      styles.pickerButton,
      {
        backgroundColor: theme === 'light' ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.05)',
        borderColor: inputBorderColor,
      }
    ],
    pickerButtonText: [styles.pickerButtonText, { color: colors.text }],
    pickerModalContainer: [styles.pickerModalContainer, { backgroundColor: colors.surface }],
    pickerModalHeader: [styles.pickerModalHeader, { borderBottomColor: theme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)' }],
  };

  const categories = [
    'Alimentação',
    'Transporte',
    'Moradia',
    'Saúde',
    'Educação',
    'Lazer',
    'Trabalho',
    'Outros',
  ];

  const handleSave = () => {
    if (onSave) {
      onSave({
        type,
        value: parseFloat(value.replace(',', '.')),
        description,
        category,
        date,
      });
    }
    if (onGoBack) {
      onGoBack();
    }
  };

  const formatCurrency = (text: string) => {
    // Remove tudo que não é número ou vírgula/ponto
    const numbers = text.replace(/[^\d,.-]/g, '');
    return numbers;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    // Atualiza a data enquanto o usuário seleciona
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
    // No Android, fecha automaticamente quando confirma
    if (Platform.OS === 'android' && event.type === 'set') {
      setShowDatePicker(false);
    }
  };

  return (
    <View style={dynamicStyles.wrapper}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={dynamicStyles.container}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <Text style={dynamicStyles.pageTitle}>Nova Transação</Text>

            {/* Type Selector */}
            <View style={dynamicStyles.typeSelectorCard}>
              <TouchableOpacity
                style={[styles.typeButton, type === 'entrada' && styles.typeButtonActive]}
                onPress={() => setType('entrada')}
                activeOpacity={0.7}
              >
                <Feather name="arrow-up" size={22} color={type === 'entrada' ? '#ffffff' : colors.primary} />
                <Text style={[dynamicStyles.typeButtonText, type === 'entrada' && styles.typeButtonTextActive]}>
                  Entrada
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeButton, type === 'saida' && styles.typeButtonActiveSaida]}
                onPress={() => setType('saida')}
                activeOpacity={0.7}
              >
                <Feather name="arrow-down" size={22} color={type === 'saida' ? '#ffffff' : '#ff4444'} />
                <Text style={[dynamicStyles.typeButtonText, type === 'saida' && styles.typeButtonTextActive]}>
                  Saída
                </Text>
              </TouchableOpacity>
            </View>

            {/* Form Card */}
            <View style={dynamicStyles.formCard}>
              {/* Value Input */}
              <View style={styles.inputGroup}>
                <Text style={dynamicStyles.inputLabel}>Valor</Text>
                <View style={dynamicStyles.inputContainer}>
                  <Text style={dynamicStyles.currencySymbol}>R$</Text>
                  <TextInput
                    style={dynamicStyles.valueInput}
                    value={value}
                    onChangeText={(text) => setValue(formatCurrency(text))}
                    placeholder="0,00"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* Description Input */}
              <View style={styles.inputGroup}>
                <Text style={dynamicStyles.inputLabel}>Descrição</Text>
                <View style={dynamicStyles.inputContainer}>
                  <TextInput
                    style={dynamicStyles.textInput}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Ex: Almoço no restaurante"
                    placeholderTextColor={colors.textSecondary}
                  />
                </View>
              </View>

              {/* Category Selector */}
              <View style={styles.inputGroup}>
                <Text style={dynamicStyles.inputLabel}>Categoria</Text>
                <TouchableOpacity
                  style={dynamicStyles.pickerButton}
                  onPress={() => setPickerModalVisible(true)}
                  activeOpacity={0.7}
                >
                  <Text style={dynamicStyles.pickerButtonText}>
                    {category || 'Selecione uma categoria'}
                  </Text>
                  <Feather name="chevron-down" size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              {/* Date Input */}
              <View style={styles.inputGroup}>
                <Text style={dynamicStyles.inputLabel}>Data</Text>
                <TouchableOpacity
                  style={dynamicStyles.inputContainer}
                  onPress={() => setShowDatePicker(true)}
                  activeOpacity={0.7}
                >
                  <Feather name="calendar" size={20} color={colors.textSecondary} />
                  <Text style={dynamicStyles.textInput}>
                    {date}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Save Button */}
            <TouchableOpacity
              style={[styles.saveButton, type === 'entrada' ? styles.saveButtonEntrada : styles.saveButtonSaida]}
              onPress={handleSave}
              activeOpacity={0.7}
            >
              <Text style={styles.saveButtonText}>Salvar Transação</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={dynamicStyles.pickerModalContainer}>
            <View style={dynamicStyles.pickerModalHeader}>
              <TouchableOpacity
                onPress={() => setShowDatePicker(false)}
                style={styles.pickerModalCloseButton}
              >
                <Text style={[styles.pickerModalCloseText, { color: colors.primary }]}>Concluir</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.datePickerContainer}>
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                locale="pt-BR"
                style={styles.picker}
                textColor={colors.text}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Picker Modal */}
      <Modal
        visible={pickerModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setPickerModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={dynamicStyles.pickerModalContainer}>
            <View style={dynamicStyles.pickerModalHeader}>
              <TouchableOpacity
                onPress={() => setPickerModalVisible(false)}
                style={styles.pickerModalCloseButton}
              >
                <Text style={[styles.pickerModalCloseText, { color: colors.primary }]}>Concluir</Text>
              </TouchableOpacity>
            </View>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={[styles.picker, { color: colors.text }]}
              itemStyle={{ color: colors.text }}
            >
              <Picker.Item label="Selecione uma categoria" value="" color={colors.text} />
              {categories.map((cat) => (
                <Picker.Item key={cat} label={cat} value={cat} color={colors.text} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>

      <Menu currentScreen="new-transition" onNavigate={onNavigate} />
    </View>
  );
}

