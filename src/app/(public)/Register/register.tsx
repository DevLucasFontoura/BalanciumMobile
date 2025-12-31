import { useState, useRef } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './register.styles';

interface RegisterProps {
  onNavigateToLogin?: () => void;
}

export default function Register({ onNavigateToLogin }: RegisterProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

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
        nestedScrollEnabled={false}
      >
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../../../assets/img_register_page.png')}
          style={styles.topImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.welcomeTitle}>
            Crie sua conta no
          </Text>
          <Text style={styles.appTitle}>Balancium</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <View style={[styles.inputContainer, nameFocused && styles.inputContainerFocused]}>
              <Feather name="user" size={20} color="#000000" style={styles.inputIcon} />
              <TextInput
                ref={nameInputRef}
                style={[styles.input, nameFocused && styles.inputFocused]}
                placeholder="Nome"
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                autoCapitalize="words"
                value={name}
                onChangeText={setName}
                onFocus={() => {
                  setNameFocused(true);
                  setTimeout(() => {
                    scrollViewRef.current?.scrollTo({ y: 200, animated: true });
                  }, 150);
                }}
                onBlur={() => {
                  setNameFocused(false);
                }}
              />
            </View>
          </View>

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
                  setTimeout(() => {
                    scrollViewRef.current?.scrollTo({ y: 280, animated: true });
                  }, 150);
                }}
                onBlur={() => {
                  setEmailFocused(false);
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
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
                value={password}
                onChangeText={setPassword}
                onFocus={() => {
                  setPasswordFocused(true);
                  setTimeout(() => {
                    scrollViewRef.current?.scrollTo({ y: 360, animated: true });
                  }, 150);
                }}
                onBlur={() => {
                  setPasswordFocused(false);
                }}
              />
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <View style={[styles.inputContainer, confirmPasswordFocused && styles.inputContainerFocused]}>
              <Feather name="lock" size={20} color="#000000" style={styles.inputIcon} />
              <TextInput
                ref={confirmPasswordInputRef}
                style={[styles.input, confirmPasswordFocused && styles.inputFocused]}
                placeholder="Confirmar Senha"
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onFocus={() => {
                  setConfirmPasswordFocused(true);
                  setTimeout(() => {
                    scrollViewRef.current?.scrollTo({ y: 440, animated: true });
                  }, 150);
                }}
                onBlur={() => {
                  setConfirmPasswordFocused(false);
                }}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.registerButton} activeOpacity={0.7}>
            <Text style={styles.registerButtonText}>Criar Conta</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Já tem uma conta? </Text>
          <TouchableOpacity onPress={onNavigateToLogin}>
            <Text style={styles.loginLink}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

