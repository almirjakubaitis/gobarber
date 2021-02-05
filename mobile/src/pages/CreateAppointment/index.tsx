import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Platform} from 'react-native';

import {useAuth} from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProviderListContainer,
  ProviderList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
} from './styles';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} />

  const {user} = useAuth();
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const {goBack} = useNavigation();

  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, [setProviders]);

  useEffect(() => {
    api
      .get(`providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => setAvailability(response.data));
  }, [selectedDate, selectedProvider]);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectedProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleTooglePicker = useCallback(() => {
    setShowDatePicker(state => !state);
    // setShowDatePicker(!showDatePicker);
  }, []);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }

      if (date) {
        setSelectedDate(date);
      }
    },
    [],
  );

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

      <ProviderListContainer>
        <ProviderList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({item: provider}) => (
            <ProviderContainer
              onPress={() => {
                handleSelectedProvider(provider.id);
              }}
              selected={provider.id === selectedProvider}>
              <ProviderAvatar source={{uri: provider.avatar_url}} />

              <ProviderName selected={provider.id === selectedProvider}>
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProviderListContainer>

      <Calendar>
        <Title>Escolha a data</Title>
        <OpenDatePickerButton onPress={handleTooglePicker}>
          <OpenDatePickerButtonText>
            Selecionar outra data
          </OpenDatePickerButtonText>
        </OpenDatePickerButton>

        {showDatePicker && (
          <DateTimePicker
            {...(Platform.OS === 'ios' && {textColor: '#f4ede8'})} // hack for ios and android
            mode="date"
            display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
            value={selectedDate}
            onChange={handleDateChanged}
          />
        )}
      </Calendar>
    </Container>
  );
};

export default CreateAppointment;
