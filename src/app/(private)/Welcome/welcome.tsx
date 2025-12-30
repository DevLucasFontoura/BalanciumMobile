import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Menu from '../../../components/Menu';
import styles from './welcome.styles';

interface WelcomeProps {
  onNavigate?: (screen: string) => void;
  onLogout?: () => void;
}

export default function Welcome({ onNavigate, onLogout }: WelcomeProps) {
  const userName = 'Lucas Fontoura'; // TODO: Buscar do contexto/perfil
  const currentYear = new Date().getFullYear();

  // Dados fake para visualização
  const yearTotals = {
    entradas: 45250.75,
    saidas: 32890.50,
    saldo: 12360.25,
    guardado: 8500.00,
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.topHeader}>
            <View style={styles.greetingContainer}>
              <Text style={styles.greetingText}>Hello,</Text>
              <Text style={styles.userNameText}>{userName}!</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
              <Feather name="bell" size={22} color="#000000" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>

          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Current Balance</Text>
            <Text style={styles.balanceValue}>
              {formatCurrency(yearTotals.saldo)}
            </Text>
            <TouchableOpacity style={styles.addButton} activeOpacity={0.7}>
              <Feather name="plus" size={24} color="#000000" />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Resumo do Ano {currentYear}</Text>
              <Text style={styles.sectionDescription}>
                Totais gerais de todas as transações
              </Text>
            </View>

            <View style={styles.cardsContainer}>
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Feather name="arrow-up-circle" size={20} color="#14ba82" />
                  <Text style={styles.cardTitle}>Entradas</Text>
                </View>
                <Text style={[styles.cardValue, styles.entradaValue]}>
                  {formatCurrency(yearTotals.entradas)}
                </Text>
              </View>

              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Feather name="arrow-down-circle" size={20} color="#ff4444" />
                  <Text style={styles.cardTitle}>Saídas</Text>
                </View>
                <Text style={[styles.cardValue, styles.saidaValue]}>
                  {formatCurrency(yearTotals.saidas)}
                </Text>
              </View>

              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Feather name="save" size={20} color="#4A90E2" />
                  <Text style={styles.cardTitle}>Guardado</Text>
                </View>
                <Text style={[styles.cardValue, styles.guardadoValue]}>
                  {formatCurrency(yearTotals.guardado)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Menu currentScreen="welcome" onNavigate={onNavigate} />
    </View>
  );
}

