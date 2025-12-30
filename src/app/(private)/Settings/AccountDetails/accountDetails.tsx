import { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Menu from '../../../../components/Menu';
import styles from './accountDetails.styles';

interface AccountDetailsProps {
  onNavigate?: (screen: string) => void;
  onLogout?: () => void;
  onGoBack?: () => void;
}

export default function AccountDetails({ onNavigate, onLogout, onGoBack }: AccountDetailsProps) {
  // Dados fake para visualização
  const [formData, setFormData] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    plan: 'Básico',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // TODO: Implementar salvamento dos dados
    console.log('Salvando dados:', formData);
    if (onGoBack) {
      onGoBack();
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onGoBack}
            activeOpacity={0.7}
          >
            <Feather name="arrow-left" size={20} color="#ffffff" />
          </TouchableOpacity>

          <View style={styles.headerSection}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerTitle}>Dados da Conta</Text>
              <Text style={styles.headerSubtitle}>
                Atualize suas informações pessoais e dados de contato
              </Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                placeholder="Seu nome completo"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={[styles.input, styles.inputDisabled]}
                value={formData.email}
                editable={false}
                placeholder="seu.email@example.com"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Text style={styles.helpText}>
                O e-mail não pode ser alterado por questões de segurança
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Plano</Text>
              <TextInput
                style={[styles.input, styles.inputDisabled]}
                value={formData.plan}
                editable={false}
                placeholder="Seu plano atual"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
              />
              <Text style={styles.helpText}>
                Para alterar seu plano, acesse "Plano e Assinatura" nas configurações
              </Text>
            </View>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onGoBack}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              activeOpacity={0.7}
            >
              <Text style={styles.saveButtonText}>Salvar Alterações</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Menu currentScreen="settings" onNavigate={onNavigate} />
    </View>
  );
}

