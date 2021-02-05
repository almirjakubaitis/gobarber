import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Platform, Alert} from 'react-native';

import {format} from 'date-fns';

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
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  Content,
  CreateAppoitmentButton,
  CreateAppoitmentButtonText,
} from './styles';
import {parseISO} from 'date-fns';

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

  const {goBack, navigate} = useNavigation();

  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);

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

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);
      // this date before has timezone
      //
      const newDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()} ${selectedHour}:00:00`;

      console.log(newDate);

      await api.post('/appointments', {
        provider_id: selectedProvider,
        date: newDate,
      });

      navigate('AppointmentCreated', {date: date.getTime()});
    } catch (err) {
      Alert.alert(
        'Erro ao criar agendamento',
        'Ocorreu um erro ao tentar criar o agendamento, tente novamente',
      );
    }
  }, [selectedDate, selectedHour, selectedProvider, navigate]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({hour}) => hour < 12)
      .map(({hour, available}) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({hour}) => hour >= 12)
      .map(({hour, available}) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const showSelectedDate = useMemo(() => {
    const thisDate = format(selectedDate, 'dd/MM');
    //console.log(thisDate);
    return thisDate;
  }, [selectedDate]);

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

      <Content>
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
              Data: {showSelectedDate}
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

        <Schedule>
          <Title>Escolha o horário</Title>

          <Section>
            <SectionTitle>Manhã</SectionTitle>
          </Section>

          <SectionContent>
            {morningAvailability.map(({hour, hourFormatted, available}) => (
              <Hour
                onPress={() => {
                  handleSelectHour(hour);
                }}
                enabled={available}
                selected={selectedHour === hour}
                available={available}
                key={hourFormatted}>
                <HourText selected={selectedHour === hour}>
                  {hourFormatted}
                </HourText>
              </Hour>
            ))}
          </SectionContent>

          <Section>
            <SectionTitle>Tarde</SectionTitle>
          </Section>

          <SectionContent>
            {afternoonAvailability.map(({hour, hourFormatted, available}) => (
              <Hour
                onPress={() => {
                  handleSelectHour(hour);
                }}
                enabled={available}
                selected={selectedHour === hour}
                available={available}
                key={hourFormatted}>
                <HourText selected={selectedHour === hour}>
                  {hourFormatted}
                </HourText>
              </Hour>
            ))}
          </SectionContent>
        </Schedule>

        <CreateAppoitmentButton onPress={handleCreateAppointment}>
          <CreateAppoitmentButtonText>Agendar</CreateAppoitmentButtonText>
        </CreateAppoitmentButton>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
