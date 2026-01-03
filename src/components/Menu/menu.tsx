import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Svg, { Path } from 'react-native-svg';
import styles, { PRIMARY_COLOR } from './menu.styles';

interface MenuItem {
  id: string;
  label: string;
  iconName: keyof typeof Feather.glyphMap;
}

interface MenuProps {
  currentScreen?: string;
  onNavigate?: (screen: string) => void;
  transactionType?: 'entrada' | 'saida';
}

interface MenuItemComponentProps {
  item: MenuItem;
  isActive: boolean;
  onPress: () => void;
}

const MenuItemComponent = ({ item, isActive, onPress }: MenuItemComponentProps) => {
  const handlePress = () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  return (
    <View style={styles.menuItemWrapper}>
      {isActive && (
        <View style={styles.neonTriangle}>
          <Svg width={70} height={60} viewBox="0 0 70 60" style={{ position: 'absolute', left: -35 }}>
            <Path
              d="M 25 0 L 25 45 L 0 45 L 0 60 L 70 60 L 70 45 L 45 45 L 45 0 Z"
              fill={PRIMARY_COLOR}
              opacity={1}
            />
          </Svg>
        </View>
      )}
      <TouchableOpacity
        style={[styles.menuItem, isActive && styles.menuItemActive]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={isActive && styles.iconGlowContainer}>
          <Feather
            name={item.iconName}
            size={24}
            color={isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.6)'}
            style={isActive && styles.iconGlow}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default function Menu({ currentScreen = 'welcome', onNavigate, transactionType }: MenuProps) {
  const menuItems: MenuItem[] = [
    { id: 'welcome', label: 'Início', iconName: 'home' },
    { id: 'dashboard', label: 'Dashboard', iconName: 'bar-chart-2' },
    { id: 'monthly', label: 'Mês', iconName: 'calendar' },
    { id: 'settings', label: 'Ajustes', iconName: 'settings' },
  ];

  const handlePress = (item: MenuItem) => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    if (onNavigate) {
      onNavigate(item.id);
    }
  };

  const handleAddTransaction = () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    if (onNavigate) {
      onNavigate('new-transition');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pillContainer}>
        <View style={styles.blurContainer}>
          <BlurView intensity={40} tint="dark" style={styles.blurOverlay} />
          <View style={styles.menu}>
            {menuItems.slice(0, 2).map((item) => (
              <MenuItemComponent
                key={item.id}
                item={item}
                isActive={currentScreen === item.id}
                onPress={() => handlePress(item)}
              />
            ))}
            
            <View style={styles.addButtonWrapper}>
              {currentScreen === 'new-transition' && (
                <View style={transactionType === 'saida' ? styles.neonTriangleSaida : styles.neonTriangle}>
                  <Svg width={70} height={60} viewBox="0 0 70 60" style={{ position: 'absolute', left: -35 }}>
                    <Path
                      d="M 25 0 L 25 45 L 0 45 L 0 60 L 70 60 L 70 45 L 45 45 L 45 0 Z"
                      fill={transactionType === 'saida' ? '#ff4444' : PRIMARY_COLOR}
                      opacity={1}
                    />
                  </Svg>
                </View>
              )}
              <TouchableOpacity
                style={[
                  styles.addButton, 
                  currentScreen === 'new-transition' && styles.addButtonActive,
                  transactionType === 'saida' && styles.addButtonActiveSaida
                ]}
                onPress={handleAddTransaction}
                activeOpacity={0.7}
              >
                <View style={currentScreen === 'new-transition' && styles.iconGlowContainer}>
                  <Feather 
                    name="plus" 
                    size={24} 
                    color={
                      currentScreen === 'new-transition' 
                        ? '#ffffff' 
                        : 'rgba(255, 255, 255, 0.6)'
                    }
                    style={currentScreen === 'new-transition' && styles.iconGlow}
                  />
                </View>
              </TouchableOpacity>
            </View>

            {menuItems.slice(2).map((item) => (
              <MenuItemComponent
                key={item.id}
                item={item}
                isActive={currentScreen === item.id}
                onPress={() => handlePress(item)}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

