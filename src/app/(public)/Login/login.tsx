import { useState, useRef } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './login.styles';

interface LoginProps {
  onNavigateToRegister?: () => void;
  onNavigateToWelcome?: () => void;
}

export default function Login({ onNavigateToRegister, onNavigateToWelcome }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <ScrollView 
        ref={scrollViewRef}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        scrollEnabled={scrollEnabled}
        nestedScrollEnabled={false}
      >
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../../../assets/img_login_page.png')}
          style={styles.topImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.welcomeTitle}>
            Bem-vindo ao
          </Text>
          <Text style={styles.appTitle}>Balancium</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <View style={[styles.inputContainer, emailFocused && styles.inputContainerFocused]}>
              <Feather name="mail" size={20} color="#000000" style={styles.inputIcon} />
              <TextInput
                ref={emailInputRef}
                style={[styles.input, emailFocused && styles.inputFocused]}
                placeholder="Email"
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                value={email}
                onChangeText={setEmail}
                onFocus={() => {
                  setEmailFocused(true);
                  setScrollEnabled(true);
                  setTimeout(() => {
                    scrollViewRef.current?.scrollTo({ y: 250, animated: true });
                  }, 150);
                }}
                onBlur={() => {
                  setEmailFocused(false);
                  setTimeout(() => {
                    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
                    setScrollEnabled(false);
                  }, 100);
                }}
              />
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <View style={[styles.inputContainer, passwordFocused && styles.inputContainerFocused]}>
              <Feather name="lock" size={20} color="#000000" style={styles.inputIcon} />
              <TextInput
                ref={passwordInputRef}
                style={[styles.input, passwordFocused && styles.inputFocused]}
                placeholder="Senha"
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password"
                value={password}
                onChangeText={setPassword}
                onFocus={() => {
                  setPasswordFocused(true);
                  setScrollEnabled(true);
                  setTimeout(() => {
                    scrollViewRef.current?.scrollTo({ y: 330, animated: true });
                  }, 150);
                }}
                onBlur={() => {
                  setPasswordFocused(false);
                  setTimeout(() => {
                    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
                    setScrollEnabled(false);
                  }, 100);
                }}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
                activeOpacity={0.7}
              >
                <Feather
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="#000000"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.loginButton} 
            activeOpacity={0.8}
            onPress={onNavigateToWelcome}
          >
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPasswordButton} activeOpacity={0.7}>
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
    </KeyboardAvoidingView>
  );
}

