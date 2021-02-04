import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useAuth} from '../../hooks/auth';

import {Container, Header, BackButton, HeaderTitle, UserAvatar} from './styles';

interface RouteParams {
  providerId: string;
}

const CreateAppointment: React.FC = () => {
  // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} />
  const route = useRoute();
  const {providerId} = route.params as RouteParams;

  const {goBack} = useNavigation();

  const {user} = useAuth();

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  // console.log(routeParams.providerId);

  return (
    <Container>
      <Header>
        <BackButton
          onPress={() => {
            navigateBack();
          }}>
          <Icon name="chevron-left" size={24} color="#959991" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{uri: user.avatar_url}} />
      </Header>
    </Container>
  );
};

export default CreateAppointment;
