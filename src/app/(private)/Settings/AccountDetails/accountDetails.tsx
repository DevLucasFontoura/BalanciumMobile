import { useEffect, useRef } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, Animated, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../../../lib/contexts/ThemeContext';
import styles from './accountDetails.styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface AccountDetailsProps {
  onNavigate?: (screen: string) => void;
  onLogout?: () => void;
  onGoBack?: () => void;
}

export default function AccountDetails({ onNavigate, onLogout, onGoBack }: AccountDetailsProps) {
  const { theme, colors } = useTheme();
  const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // Dados do usuário
  const userName = 'Lucas Fontoura';
  const userEmail = 'lucasfontoura@email.com';
  const userPhoto = null; // TODO: Buscar foto do usuário do contexto/perfil
  
  // Informações da Conta
  const accountPlan = 'Básico';
  const accountCreatedDate = '15 de Janeiro de 2024';
  const accountId = 'ACC-123456789';
  
  // Informações de Segurança
  const emailVerified = true;
  const lastLogin = 'Hoje às 14:30';
  
  // Configurações Financeiras
  const defaultCurrency = 'BRL - Real Brasileiro';
  const country = 'Brasil';

  useEffect(() => {
    // Animação de entrada da direita para a esquerda
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGoBack = () => {
    // Animação de saída
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onGoBack) {
        onGoBack();
      }
    });
  };

  const effectiveTheme = theme === 'system' ? (colors.background === '#000000' ? 'dark' : 'light') : theme;

  const accountInfoSections = [
    {
      id: 'plan',
      label: 'Plano',
      value: accountPlan,
      icon: 'credit-card' as const,
      iconColor: '#3b82f6',
    },
    {
      id: 'created',
      label: 'Data de Criação',
      value: accountCreatedDate,
      icon: 'calendar' as const,
      iconColor: '#10b981',
    },
    {
      id: 'id',
      label: 'ID da Conta',
      value: accountId,
      icon: 'hash' as const,
      iconColor: '#6b7280',
    },
  ];

  const securitySections = [
    {
      id: 'email-verified',
      label: 'Email Verificado',
      value: emailVerified ? 'Verificado' : 'Não Verificado',
      icon: emailVerified ? 'check-circle' as const : 'x-circle' as const,
      iconColor: emailVerified ? '#10b981' : '#ef4444',
    },
    {
      id: 'last-login',
      label: 'Último Login',
      value: lastLogin,
      icon: 'clock' as const,
      iconColor: '#6b7280',
    },
  ];

  const financialSections = [
    {
      id: 'currency',
      label: 'Moeda Padrão',
      value: defaultCurrency,
      icon: 'dollar-sign' as const,
      iconColor: '#10b981',
    },
    {
      id: 'country',
      label: 'País/Região',
      value: country,
      icon: 'map-pin' as const,
      iconColor: '#3b82f6',
    },
  ];

  const dynamicStyles = {
    wrapper: [styles.wrapper, { backgroundColor: colors.background }],
    container: [styles.container, { backgroundColor: colors.background }],
    headerTitle: [styles.headerTitle, { color: colors.text }],
    backButton: [styles.backButton, { backgroundColor: colors.surface }],
    profileImageContainer: [styles.profileImageContainer, { backgroundColor: colors.surface }],
    profileName: [styles.profileName, { color: colors.text }],
    profileEmail: [styles.profileEmail, { color: colors.textSecondary }],
    groupedCard: [styles.groupedCard, { backgroundColor: colors.surface }],
    rowTitle: [styles.rowTitle, { color: colors.text }],
    rowValue: [styles.rowValue, { color: colors.textSecondary }],
  };

  return (
    <View style={dynamicStyles.wrapper}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [{ translateX: slideAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        <ScrollView
          style={dynamicStyles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <TouchableOpacity
                style={dynamicStyles.backButton}
                onPress={handleGoBack}
                activeOpacity={0.7}
              >
                <Feather name="chevron-left" size={24} color={colors.text} />
              </TouchableOpacity>
              <Text style={dynamicStyles.headerTitle}>Balancium Account</Text>
              <View style={{ width: 40 }} />
            </View>

            <View style={styles.profileSection}>
              <View style={dynamicStyles.profileImageContainer}>
                {userPhoto ? (
                  <Image 
                    source={{ uri: userPhoto }} 
                    style={styles.profileImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Feather name="user" size={56} color={colors.primary} />
                )}
              </View>
              <Text style={dynamicStyles.profileName}>{userName}</Text>
              <Text style={dynamicStyles.profileEmail}>{userEmail}</Text>
            </View>

            {/* Informações da Conta */}
            <View style={styles.sectionTitle}>
              <Text style={[styles.sectionTitleText, { color: colors.textSecondary }]}>Informações da Conta</Text>
            </View>
            <View style={dynamicStyles.groupedCard}>
              {accountInfoSections.map((section, index) => {
                const isLast = index === accountInfoSections.length - 1;
                const rowStyle = [
                  styles.settingsRow,
                  { backgroundColor: colors.surface },
                  !isLast && { borderBottomWidth: 1, borderBottomColor: effectiveTheme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)' },
                ];
                return (
                  <View key={section.id} style={rowStyle}>
                    <Feather
                      name={section.icon}
                      size={22}
                      color={section.iconColor}
                    />
                    <View style={styles.rowContent}>
                      <Text style={dynamicStyles.rowTitle}>{section.label}</Text>
                      <Text style={dynamicStyles.rowValue}>{section.value}</Text>
                    </View>
                  </View>
                );
              })}
            </View>

            {/* Informações de Segurança */}
            <View style={styles.sectionTitle}>
              <Text style={[styles.sectionTitleText, { color: colors.textSecondary }]}>Segurança</Text>
            </View>
            <View style={dynamicStyles.groupedCard}>
              {securitySections.map((section, index) => {
                const isLast = index === securitySections.length - 1;
                const rowStyle = [
                  styles.settingsRow,
                  { backgroundColor: colors.surface },
                  !isLast && { borderBottomWidth: 1, borderBottomColor: effectiveTheme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)' },
                ];
                return (
                  <View key={section.id} style={rowStyle}>
                    <Feather
                      name={section.icon}
                      size={22}
                      color={section.iconColor}
                    />
                    <View style={styles.rowContent}>
                      <Text style={dynamicStyles.rowTitle}>{section.label}</Text>
                      <Text style={dynamicStyles.rowValue}>{section.value}</Text>
                    </View>
                  </View>
                );
              })}
            </View>

            {/* Configurações Financeiras */}
            <View style={styles.sectionTitle}>
              <Text style={[styles.sectionTitleText, { color: colors.textSecondary }]}>Configurações Financeiras</Text>
            </View>
            <View style={dynamicStyles.groupedCard}>
              {financialSections.map((section, index) => {
                const isLast = index === financialSections.length - 1;
                const rowStyle = [
                  styles.settingsRow,
                  { backgroundColor: colors.surface },
                  !isLast && { borderBottomWidth: 1, borderBottomColor: effectiveTheme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)' },
                ];
                return (
                  <View key={section.id} style={rowStyle}>
                    <Feather
                      name={section.icon}
                      size={22}
                      color={section.iconColor}
                    />
                    <View style={styles.rowContent}>
                      <Text style={dynamicStyles.rowTitle}>{section.label}</Text>
                      <Text style={dynamicStyles.rowValue}>{section.value}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

