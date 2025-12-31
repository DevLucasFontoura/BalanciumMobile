import { View, TouchableOpacity, Text } from 'react-native';
import { BlurView } from 'expo-blur';
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

interface MenuItemComponentProps {
  item: MenuItem;
  isActive: boolean;
  onPress: () => void;
}

const MenuItemComponent = ({ item, isActive, onPress }: MenuItemComponentProps) => {
  return (
    <TouchableOpacity
      style={[styles.menuItem, isActive && styles.menuItemActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Feather
        name={item.iconName}
        size={24}
        color={isActive ? PRIMARY_COLOR : 'rgba(255, 255, 255, 0.6)'}
      />
    </TouchableOpacity>
  );
};

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

  const handleAddTransaction = () => {
    if (onNavigate) {
      onNavigate('new-transition');
    }
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={60} tint="dark" style={styles.pillContainer}>
        <View style={styles.menu}>
          {menuItems.slice(0, 2).map((item) => (
            <MenuItemComponent
              key={item.id}
              item={item}
              isActive={currentScreen === item.id}
              onPress={() => handlePress(item)}
            />
          ))}
          
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddTransaction}
            activeOpacity={0.7}
          >
            <Feather name="plus" size={24} color="rgba(255, 255, 255, 0.6)" />
          </TouchableOpacity>

          {menuItems.slice(2).map((item) => (
            <MenuItemComponent
              key={item.id}
              item={item}
              isActive={currentScreen === item.id}
              onPress={() => handlePress(item)}
            />
          ))}
        </View>
      </BlurView>
    </View>
  );
}

