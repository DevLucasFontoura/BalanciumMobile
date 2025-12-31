import { useEffect, useRef } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../../../lib/contexts/ThemeContext';
import styles from './theme.styles';

interface ThemeProps {
  onGoBack?: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Theme({ onGoBack }: ThemeProps) {
  const { theme, setTheme, colors } = useTheme();
  const effectiveTheme = theme === 'system' ? (colors.background === '#000000' ? 'dark' : 'light') : theme;
  const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

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

  const themeOptions = [
    { id: 'light' as const, label: 'Claro', icon: 'sun' as const },
    { id: 'dark' as const, label: 'Escuro', icon: 'moon' as const },
    { id: 'system' as const, label: 'Sistema', icon: 'monitor' as const },
  ];

  const dynamicStyles = {
    wrapper: [styles.wrapper, { backgroundColor: colors.background }],
    container: [styles.container, { backgroundColor: colors.background }],
    headerTitle: [styles.headerTitle, { color: colors.text }],
    backButton: [styles.backButton, { backgroundColor: colors.surface }],
    groupedCard: [styles.groupedCard, { backgroundColor: colors.surface }],
    rowTitle: [styles.rowTitle, { color: colors.text }],
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
          <View style={styles.header}>
            <TouchableOpacity
              style={dynamicStyles.backButton}
              onPress={handleGoBack}
              activeOpacity={0.7}
            >
              <Feather name="chevron-left" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={dynamicStyles.headerTitle}>Tema</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.content}>
            {/* Grouped Theme Card */}
            <View style={dynamicStyles.groupedCard}>
              {themeOptions.map((option, index) => {
                const isSelected = theme === option.id;
                const isLast = index === themeOptions.length - 1;
                const rowStyle = [
                  styles.settingsRow,
                  { backgroundColor: colors.surface },
                  !isLast && { borderBottomWidth: 1, borderBottomColor: effectiveTheme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)' },
                ];
                return (
                  <TouchableOpacity
                    key={option.id}
                    style={rowStyle}
                    onPress={() => setTheme(option.id)}
                    activeOpacity={0.6}
                  >
                    <Feather
                      name={option.icon}
                      size={22}
                      color={isSelected ? colors.primary : colors.textSecondary}
                    />
                    <Text style={dynamicStyles.rowTitle}>{option.label}</Text>
                    {isSelected && (
                      <Feather
                        name="check"
                        size={20}
                        color={colors.primary}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

