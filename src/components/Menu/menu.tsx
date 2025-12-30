import { View, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles, { PRIMARY_COLOR } from './menu.styles';

interface MenuItem {
  id: string;
  label: string;
  iconName: keyof typeof Feather.glyphMap;
}

interface MenuProps {
  currentScreen?: string;
  onNavigate?: (screen: string) => void;
}

export default function Menu({ currentScreen = 'welcome', onNavigate }: MenuProps) {
  const menuItems: MenuItem[] = [
    { id: 'welcome', label: 'Início', iconName: 'home' },
    { id: 'dashboard', label: 'Dashboard', iconName: 'bar-chart-2' },
    { id: 'monthly', label: 'Mês', iconName: 'calendar' },
    { id: 'settings', label: 'Ajustes', iconName: 'settings' },
  ];

  const handlePress = (item: MenuItem) => {
    if (onNavigate) {
      onNavigate(item.id);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pillContainer}>
        <View style={styles.menu}>
          {menuItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.menuItem, isActive && styles.menuItemActive]}
                onPress={() => handlePress(item)}
                activeOpacity={0.7}
              >
                <Feather
                  name={item.iconName}
                  size={20}
                  color={isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'}
                />
                <Text style={[styles.menuLabel, isActive && styles.menuLabelActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

