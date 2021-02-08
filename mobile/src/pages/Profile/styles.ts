import styled from 'styled-components/native';
import {Platform} from 'react-native';

export const Container = styled.View`
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 0px;
  top: 100px;
  left: 0px;
  z-index: 2;
`;

export const UserAvatarButton = styled.TouchableOpacity``;
export const UserAvatar = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
  margin-top: 60px;

  align-self: center;
`;
