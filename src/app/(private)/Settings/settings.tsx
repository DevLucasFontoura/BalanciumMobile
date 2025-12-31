import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Menu from '../../../components/Menu';
import { useTheme } from '../../../lib/contexts/ThemeContext';
import styles from './settings.styles';

interface SettingsProps {
  currentPlan?: string;
  currentScreen?: string;
  onNavigate?: (screen: string) => void;
  onLogout?: () => void;
}

export default function Settings({ currentPlan = 'Básico', currentScreen = 'settings', onNavigate, onLogout }: SettingsProps) {
  const { theme, toggleTheme, colors } = useTheme();
  
  // Estilos dinâmicos baseados no tema
  const dynamicStyles = {
    wrapper: [styles.wrapper, { backgroundColor: colors.background }],
    container: [styles.container, { backgroundColor: colors.background }],
    pageTitle: [styles.pageTitle, { color: colors.text }],
    profileCard: [styles.profileCard, { backgroundColor: colors.surface }],
    profileName: [styles.profileName, { color: colors.text }],
    profileSubtitle: [styles.profileSubtitle, { color: colors.textSecondary }],
    groupedCard: [styles.groupedCard, { backgroundColor: colors.surface }],
    rowTitle: [styles.rowTitle, { color: colors.text }],
    logoutButton: [styles.logoutButton, { backgroundColor: colors.surface }],
    logoutButtonText: [styles.logoutButtonText, { color: colors.text }],
    versionLabel: [styles.versionLabel, { color: colors.textSecondary }],
    versionText: [styles.versionText, { color: colors.text }],
    profileImageContainer: [styles.profileImageContainer, { backgroundColor: theme === 'light' ? 'rgba(20, 186, 130, 0.1)' : 'rgba(20, 186, 130, 0.2)' }],
  };
  const hasCategoriesAccess = currentPlan === 'Plus' || currentPlan === 'Premium';
  const hasDataExportAccess = currentPlan === 'Plus' || currentPlan === 'Premium';

  const userName = 'Lucas Fontoura';
  const userPhoto = null; // TODO: Buscar foto do usuário do contexto/perfil

  const settingsSections: Array<{
    id: string;
    title: string;
    icon: keyof typeof Feather.glyphMap;
    iconColor: string;
    locked: boolean;
    action?: () => void;
  }> = [
    {
      id: 'theme',
      title: 'Tema',
      icon: theme === 'light' ? 'sun' : 'moon',
      iconColor: '#ffc107',
      locked: false,
      action: toggleTheme,
    },
    {
      id: 'subscription',
      title: 'Plano e Assinatura',
      icon: 'credit-card',
      iconColor: '#3b82f6',
      locked: false,
    },
    {
      id: 'subscription-history',
      title: 'Histórico de Assinaturas',
      icon: 'clock',
      iconColor: '#10b981',
      locked: false,
    },
    {
      id: 'notifications',
      title: 'Notificações',
      icon: 'bell',
      iconColor: '#ef4444',
      locked: false,
    },
    {
      id: 'categories',
      title: 'Categorias',
      icon: 'folder',
      iconColor: '#3b82f6',
      locked: !hasCategoriesAccess,
    },
    {
      id: 'export',
      title: 'Exportação de Dados',
      icon: 'download',
      iconColor: '#3b82f6',
      locked: !hasDataExportAccess,
    },
    {
      id: 'delete',
      title: 'Excluir Dados',
      icon: 'trash-2',
      iconColor: '#ef4444',
      locked: false,
    },
  ];

  const handleCardPress = (sectionId: string, action?: () => void) => {
    if (sectionId === 'account') {
      if (onNavigate) {
        onNavigate('account-details');
      }
    } else if (action) {
      action();
    } else {
      // TODO: Implementar navegação para outras seções
      console.log('Navigate to:', sectionId);
    }
  };

  return (
    <View style={dynamicStyles.wrapper}>
      <ScrollView
        style={dynamicStyles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={dynamicStyles.pageTitle}>Settings</Text>
          
          {/* Profile Card */}
          <TouchableOpacity
            style={dynamicStyles.profileCard}
            onPress={() => handleCardPress('account')}
            activeOpacity={0.7}
          >
            <View style={dynamicStyles.profileImageContainer}>
              {userPhoto ? (
                <Image 
                  source={{ uri: userPhoto }} 
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              ) : (
                <Feather name="user" size={32} color={colors.primary} />
              )}
            </View>
            <View style={styles.profileInfo}>
              <Text style={dynamicStyles.profileName}>{userName}</Text>
              <Text style={dynamicStyles.profileSubtitle}>Dados da Conta, Plano e mais</Text>
            </View>
            <Feather
              name="chevron-right"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          {/* Grouped Settings Card */}
          <View style={dynamicStyles.groupedCard}>
            {settingsSections.map((section, index) => {
              const isLocked = section.locked;
              const isLast = index === settingsSections.length - 1;
              const rowStyle = [
                styles.settingsRow,
                { backgroundColor: colors.surface },
                !isLast && { borderBottomWidth: 1, borderBottomColor: theme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)' },
              ];
              return (
                <TouchableOpacity
                  key={section.id}
                  style={rowStyle}
                  onPress={() => handleCardPress(section.id, section.action)}
                  activeOpacity={0.6}
                >
                  <Feather
                    name={section.icon}
                    size={22}
                    color={isLocked ? colors.textSecondary : section.iconColor}
                  />
                  <Text style={[dynamicStyles.rowTitle, isLocked && styles.lockedTitle]}>
                    {section.title}
                    {section.id === 'theme' && ` (${theme === 'light' ? 'Claro' : 'Escuro'})`}
                  </Text>
                  {isLocked && (
                    <Text style={styles.upgradeBadge}>UPGRADE</Text>
                  )}
                  {section.action ? (
                    <Feather
                      name={section.icon}
                      size={20}
                      color={section.iconColor}
                    />
                  ) : (
                    <Feather
                      name="chevron-right"
                      size={20}
                      color={colors.textSecondary}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.footerSection}>
            {onLogout && (
              <TouchableOpacity style={dynamicStyles.logoutButton} onPress={onLogout} activeOpacity={0.7}>
                <Feather name="log-out" size={20} color={colors.text} />
                <Text style={dynamicStyles.logoutButtonText}>Sair</Text>
              </TouchableOpacity>
            )}

            <View style={styles.versionInfo}>
              <Text style={dynamicStyles.versionLabel}>Versão</Text>
              <Text style={dynamicStyles.versionText}>2.0.0</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Menu currentScreen={currentScreen} onNavigate={onNavigate} />
    </View>
  );
}
