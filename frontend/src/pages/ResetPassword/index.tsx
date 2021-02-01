import React, { useRef, useCallback } from 'react';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, AnimationContainer, Background } from './styles';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const SignIn: React.FC = () => {
  // console.log(formRef);

  // api de contexto
  // const { name } = useContext(AuthContext);
  // console.log(name);

  // const { user, signIn } = useContext(AuthContext);

  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      // console.log(data);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Confirmação incorreta',
          ),

          // password_confirmation: Yup.string().oneOf(
          //   [Yup.ref('password'), null],
          //   'Confirmação incorreta',
          // ),

        });

        await schema.validate(data, {
          abortEarly: false,
        });



        history.push('/');
      } catch (err) {
        // console.log(err);

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          // formRef.current?.setErrors({
          //   name: 'Nome obrigatorio',
          // });

          formRef.current?.setErrors(errors);

          return;
        }

        // disparar um toast

        addToast({
          type: 'error',
          title: 'Erro na resetar senha',
          description:
            'Ocorreu um erro ao resetar sua senha, tente novamente',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>


            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />

            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmação de senha"
            />
            <Button type="submit">Alterar senha</Button>


          </Form>


        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
