import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Menu from '../../../components/Menu';
import styles from './settings.styles';

interface SettingsProps {
  currentPlan?: string;
  onNavigate?: (screen: string) => void;
  onLogout?: () => void;
}

export default function Settings({ currentPlan = 'Básico', onNavigate, onLogout }: SettingsProps) {
  const hasCategoriesAccess = currentPlan === 'Plus' || currentPlan === 'Premium';
  const hasDataExportAccess = currentPlan === 'Plus' || currentPlan === 'Premium';

  const settingsSections = [
    {
      id: 'account',
      title: 'Dados da Conta',
      icon: 'user' as keyof typeof Feather.glyphMap,
      iconColor: '#ef4444',
      locked: false,
    },
    {
      id: 'subscription',
      title: 'Plano e Assinatura',
      icon: 'credit-card' as keyof typeof Feather.glyphMap,
      iconColor: '#3b82f6',
      locked: false,
    },
    {
      id: 'subscription-history',
      title: 'Histórico de Assinaturas',
      icon: 'clock' as keyof typeof Feather.glyphMap,
      iconColor: '#10b981',
      locked: false,
    },
    {
      id: 'notifications',
      title: 'Notificações',
      icon: 'bell' as keyof typeof Feather.glyphMap,
      iconColor: '#ef4444',
      locked: false,
    },
    {
      id: 'categories',
      title: 'Categorias',
      icon: 'folder' as keyof typeof Feather.glyphMap,
      iconColor: '#3b82f6',
      locked: !hasCategoriesAccess,
    },
    {
      id: 'export',
      title: 'Exportação de Dados',
      icon: 'download' as keyof typeof Feather.glyphMap,
      iconColor: '#3b82f6',
      locked: !hasDataExportAccess,
    },
    {
      id: 'delete',
      title: 'Excluir Dados',
      icon: 'trash-2' as keyof typeof Feather.glyphMap,
      iconColor: '#ef4444',
      locked: false,
    },
  ];

  const handleCardPress = (sectionId: string) => {
    if (sectionId === 'account') {
      if (onNavigate) {
        onNavigate('account-details');
      }
    } else {
      // TODO: Implementar navegação para outras seções
      console.log('Navigate to:', sectionId);
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
          <View style={styles.sectionsContainer}>
            {settingsSections.map((section) => {
              const isLocked = section.locked;
              return (
                <TouchableOpacity
                  key={section.id}
                  style={[styles.settingsCard, isLocked && styles.lockedCard]}
                  onPress={() => handleCardPress(section.id)}
                  activeOpacity={0.7}
                >
                  <Feather
                    name={section.icon}
                    size={20}
                    color={isLocked ? 'rgba(255, 193, 7, 0.6)' : section.iconColor}
                  />
                  <Text style={[styles.cardTitle, isLocked && styles.lockedTitle]}>
                    {section.title}
                  </Text>
                  {isLocked && (
                    <Text style={styles.upgradeBadge}>UPGRADE</Text>
                  )}
                  <Feather
                    name="chevron-right"
                    size={18}
                    color="rgba(255, 255, 255, 0.3)"
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.footerSection}>
            {onLogout && (
              <TouchableOpacity style={styles.logoutButton} onPress={onLogout} activeOpacity={0.7}>
                <Feather name="log-out" size={18} color="#ffffff" />
                <Text style={styles.logoutButtonText}>Sair</Text>
              </TouchableOpacity>
            )}

            <View style={styles.versionInfo}>
              <Text style={styles.versionLabel}>Versão</Text>
              <Text style={styles.versionText}>2.0.0</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Menu currentScreen="settings" onNavigate={onNavigate} />
    </View>
  );
}
