import React, {useCallback, useRef} from 'react';
import {
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInButtonText,
} from './styles';

interface SignInFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(async (data: SignInFormData) => {
    // console.log(data);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // await signIn({
      //   email: data.email,
      //   password: data.password,
      // });

      // history.push('/dashboard');
    } catch (err) {
      // console.log(err);

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      // disparar um toast / Alert

      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, verifique as credenciais',
      );
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Crie sua conta</Title>
            </View>

            {/* <Form
              ref={formRef}
              onSubmit={data => {
                console.log(data);
              }}> */}

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCorrect={true}
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                textContentType="newPassword"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}>
                Entrar
              </Button>
            </Form>
          </Container>
        </ScrollView>

        <BackToSignInButton
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-left" size={20} color="#fff" />
          <BackToSignInButtonText>Voltar para logon</BackToSignInButtonText>
        </BackToSignInButton>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
