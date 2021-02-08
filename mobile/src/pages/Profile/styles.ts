import styled from 'styled-components/native';

export const Container = styled.View`
  justify-content: center;
  padding: 60px 30px 0px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 0px;
  top: 40px;
  left: 0px;
  z-index: 2;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  position: relative;
`;

export const UserAvatar = styled.Image`
  width: 170px;
  height: 170px;
  border-radius: 90px;

  align-self: center;
`;

export const UserAvatarChangeIcon = styled.View`
  position: absolute;
  z-index: 3;
  flex: 1;
  align-items: center;
  justify-content: center;

  bottom: 0;
  right: 25%;

  width: 50px;
  height: 50px;
  border-radius: 25px;

  background: #ff9000;
`;
