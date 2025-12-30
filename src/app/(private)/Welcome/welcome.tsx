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
                <Feather name="arrow-up-circle" size={40} color="#14ba82" style={styles.cardIcon} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>Entradas</Text>
                  <View style={styles.cardValueContainer}>
                    <Text style={[styles.currencySymbol, styles.entradaValue]}>R$</Text>
                    <Text style={[styles.cardValue, styles.entradaValue]}>
                      {new Intl.NumberFormat('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(yearTotals.entradas)}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.card}>
                <Feather name="arrow-down-circle" size={40} color="#ff4444" style={styles.cardIcon} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>Saídas</Text>
                  <View style={styles.cardValueContainer}>
                    <Text style={[styles.currencySymbol, styles.saidaValue]}>R$</Text>
                    <Text style={[styles.cardValue, styles.saidaValue]}>
                      {new Intl.NumberFormat('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(yearTotals.saidas)}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.card}>
                <Feather name="lock" size={40} color="#4A90E2" style={styles.cardIcon} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>Guardado</Text>
                  <View style={styles.cardValueContainer}>
                    <Text style={[styles.currencySymbol, styles.guardadoValue]}>R$</Text>
                    <Text style={[styles.cardValue, styles.guardadoValue]}>
                      {new Intl.NumberFormat('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(yearTotals.guardado)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Menu currentScreen="welcome" onNavigate={onNavigate} />
    </View>
  );
}

