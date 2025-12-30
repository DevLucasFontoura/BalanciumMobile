import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from './login.styles';

interface LoginProps {
  onNavigateToRegister?: () => void;
  onNavigateToWelcome?: () => void;
}

export default function Login({ onNavigateToRegister, onNavigateToWelcome }: LoginProps) {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.welcomeTitle}>
              Bem vindo ao{' '}
            </Text>
            <View style={styles.balanciumWrapper}>
              {/* Contorno preto - 8 direções */}
              <Text style={[styles.balanciumOutline, { top: -1.5, left: -1.5 }]}>Balancium</Text>
              <Text style={[styles.balanciumOutline, { top: -1.5, left: 0 }]}>Balancium</Text>
              <Text style={[styles.balanciumOutline, { top: -1.5, left: 1.5 }]}>Balancium</Text>
              <Text style={[styles.balanciumOutline, { top: 0, left: -1.5 }]}>Balancium</Text>
              <Text style={[styles.balanciumOutline, { top: 0, left: 1.5 }]}>Balancium</Text>
              <Text style={[styles.balanciumOutline, { top: 1.5, left: -1.5 }]}>Balancium</Text>
              <Text style={[styles.balanciumOutline, { top: 1.5, left: 0 }]}>Balancium</Text>
              <Text style={[styles.balanciumOutline, { top: 1.5, left: 1.5 }]}>Balancium</Text>
              {/* Texto branco por cima */}
              <Text style={styles.balanciumHighlight}>Balancium</Text>
            </View>
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="seu@email.com"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Sua senha"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
            />
          </View>

          <TouchableOpacity 
            style={styles.loginButton} 
            activeOpacity={0.7}
            onPress={onNavigateToWelcome}
          >
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Não tem uma conta? </Text>
          <TouchableOpacity onPress={onNavigateToRegister}>
            <Text style={styles.signupLink}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

