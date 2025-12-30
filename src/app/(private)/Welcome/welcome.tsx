import { Text, View, ScrollView } from 'react-native';
import Menu from '../../../components/Menu';
import styles from './welcome.styles';

interface WelcomeProps {
  onNavigate?: (screen: string) => void;
  onLogout?: () => void;
}

export default function Welcome({ onNavigate, onLogout }: WelcomeProps) {
  const userName = 'Usuário'; // TODO: Buscar do contexto/perfil
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
          <View style={styles.headerSection}>
            <Text style={styles.headerTitle}>
              Olá, {userName}! <Text style={styles.welcomeEmoji}>👋</Text>
            </Text>
            <Text style={styles.headerSubtitle}>
              Que bom ter você de volta! Vamos organizar suas finanças?
            </Text>
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
                  <View style={[styles.cardIcon, styles.entradaIcon]} />
                  <Text style={styles.cardTitle}>Entradas</Text>
                </View>
                <Text style={[styles.cardValue, styles.entradaValue]}>
                  {formatCurrency(yearTotals.entradas)}
                </Text>
              </View>

              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={[styles.cardIcon, styles.saidaIcon]} />
                  <Text style={styles.cardTitle}>Saídas</Text>
                </View>
                <Text style={[styles.cardValue, styles.saidaValue]}>
                  {formatCurrency(yearTotals.saidas)}
                </Text>
              </View>

              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={[styles.cardIcon, styles.saldoIcon]} />
                  <Text style={styles.cardTitle}>Saldo</Text>
                </View>
                <Text style={[styles.cardValue, styles.saldoValue]}>
                  {formatCurrency(yearTotals.saldo)}
                </Text>
              </View>

              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={[styles.cardIcon, styles.guardadoIcon]} />
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

