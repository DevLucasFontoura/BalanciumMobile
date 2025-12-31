import { useEffect, useRef, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Animated, Dimensions, Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../../../lib/contexts/ThemeContext';
import styles from './notifications.styles';

interface NotificationsProps {
  onGoBack?: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Notifications({ onGoBack }: NotificationsProps) {
  const { theme, colors } = useTheme();
  const effectiveTheme = theme === 'system' ? (colors.background === '#000000' ? 'dark' : 'light') : theme;
  const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    transactions: true,
    reminders: false,
    reports: true,
    marketing: false,
  });

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

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const notificationOptions = [
    {
      id: 'push',
      label: 'Notificações Push',
      description: 'Receba notificações no dispositivo',
      icon: 'bell' as const,
      iconColor: '#ef4444',
    },
    {
      id: 'email',
      label: 'Notificações por Email',
      description: 'Receba atualizações por email',
      icon: 'mail' as const,
      iconColor: '#3b82f6',
    },
    {
      id: 'transactions',
      label: 'Transações',
      description: 'Notificações sobre novas transações',
      icon: 'dollar-sign' as const,
      iconColor: '#10b981',
    },
    {
      id: 'reminders',
      label: 'Lembretes',
      description: 'Lembretes de pagamentos e metas',
      icon: 'clock' as const,
      iconColor: '#f59e0b',
    },
    {
      id: 'reports',
      label: 'Relatórios',
      description: 'Relatórios mensais e resumos',
      icon: 'file-text' as const,
      iconColor: '#8b5cf6',
    },
    {
      id: 'marketing',
      label: 'Marketing',
      description: 'Ofertas e novidades do app',
      icon: 'gift' as const,
      iconColor: '#ec4899',
    },
  ];

  const dynamicStyles = {
    wrapper: [styles.wrapper, { backgroundColor: colors.background }],
    container: [styles.container, { backgroundColor: colors.background }],
    headerTitle: [styles.headerTitle, { color: colors.text }],
    backButton: [styles.backButton, { backgroundColor: colors.surface }],
    groupedCard: [styles.groupedCard, { backgroundColor: colors.surface }],
    rowTitle: [styles.rowTitle, { color: colors.text }],
    rowDescription: [styles.rowDescription, { color: colors.textSecondary }],
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
              <Text style={dynamicStyles.headerTitle}>Notificações</Text>
              <View style={{ width: 40 }} />
            </View>

            {/* Grouped Notifications Card */}
            <View style={dynamicStyles.groupedCard}>
              {notificationOptions.map((option, index) => {
                const isLast = index === notificationOptions.length - 1;
                const isEnabled = notifications[option.id as keyof typeof notifications];
                const rowStyle = [
                  styles.settingsRow,
                  { backgroundColor: colors.surface },
                  !isLast && { borderBottomWidth: 1, borderBottomColor: effectiveTheme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)' },
                ];
                return (
                  <View key={option.id} style={rowStyle}>
                    <Feather
                      name={option.icon}
                      size={22}
                      color={option.iconColor}
                    />
                    <View style={styles.rowContent}>
                      <Text style={dynamicStyles.rowTitle}>{option.label}</Text>
                      <Text style={dynamicStyles.rowDescription}>{option.description}</Text>
                    </View>
                    <Switch
                      value={isEnabled}
                      onValueChange={() => toggleNotification(option.id as keyof typeof notifications)}
                      trackColor={{ false: effectiveTheme === 'light' ? '#e5e7eb' : '#374151', true: colors.primary }}
                      thumbColor={isEnabled ? '#ffffff' : '#f3f4f6'}
                      ios_backgroundColor={effectiveTheme === 'light' ? '#e5e7eb' : '#374151'}
                    />
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

