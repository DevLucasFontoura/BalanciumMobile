import { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Menu from '../../../components/Menu';
import styles from './newTransition.styles';

interface NewTransitionProps {
  onNavigate?: (screen: string) => void;
  onGoBack?: () => void;
  onSave?: (transaction: any) => void;
}

export default function NewTransition({ onNavigate, onGoBack, onSave }: NewTransitionProps) {
  const [type, setType] = useState<'entrada' | 'saida'>('saida');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString('pt-BR'));

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

  return (
    <View style={styles.wrapper}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <Text style={styles.pageTitle}>Nova Transação</Text>

            {/* Type Selector */}
            <View style={styles.typeSelectorCard}>
              <TouchableOpacity
                style={[styles.typeButton, type === 'entrada' && styles.typeButtonActive]}
                onPress={() => setType('entrada')}
                activeOpacity={0.7}
              >
                <Feather name="arrow-up" size={20} color={type === 'entrada' ? '#ffffff' : '#14ba82'} />
                <Text style={[styles.typeButtonText, type === 'entrada' && styles.typeButtonTextActive]}>
                  Entrada
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeButton, type === 'saida' && styles.typeButtonActiveSaida]}
                onPress={() => setType('saida')}
                activeOpacity={0.7}
              >
                <Feather name="arrow-down" size={20} color={type === 'saida' ? '#ffffff' : '#ff4444'} />
                <Text style={[styles.typeButtonText, type === 'saida' && styles.typeButtonTextActive]}>
                  Saída
                </Text>
              </TouchableOpacity>
            </View>

            {/* Form Card */}
            <View style={styles.formCard}>
              {/* Value Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Valor</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.currencySymbol}>R$</Text>
                  <TextInput
                    style={styles.valueInput}
                    value={value}
                    onChangeText={(text) => setValue(formatCurrency(text))}
                    placeholder="0,00"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* Description Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Descrição</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Ex: Almoço no restaurante"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  />
                </View>
              </View>

              {/* Category Selector */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Categoria</Text>
                <View style={styles.categoryGrid}>
                  {categories.map((cat) => (
                    <TouchableOpacity
                      key={cat}
                      style={[styles.categoryButton, category === cat && styles.categoryButtonActive]}
                      onPress={() => setCategory(cat)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.categoryButtonText, category === cat && styles.categoryButtonTextActive]}>
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Date Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Data</Text>
                <View style={styles.inputContainer}>
                  <Feather name="calendar" size={20} color="rgba(255, 255, 255, 0.6)" />
                  <TextInput
                    style={styles.textInput}
                    value={date}
                    onChangeText={setDate}
                    placeholder="DD/MM/AAAA"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  />
                </View>
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
      <Menu currentScreen="new-transition" onNavigate={onNavigate} />
    </View>
  );
}

