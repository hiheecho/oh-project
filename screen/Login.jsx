import { Alert, useColorScheme } from "react-native";
import React, { useState } from "react";
import styled from "@emotion/native";

import { BRAND_COLOR } from "../color";
import { useNavigation } from "@react-navigation/native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const { navigate } = useNavigation();
  const isDark = useColorScheme() === "dark";

  const [idValue, setIdValue] = useState();
  const [passwordValue, setPasswordValue] = useState();

  const handleOnPressLogin = () => {
    signInWithEmailAndPassword(auth, idValue, passwordValue)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("로그인 성공!");
        navigate("Tabs", { screen: "Main" });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        if (errorMessage.includes("user-not-found")) {
          Alert.alert("가입되지 않은 회원입니다.");
          return;
        }
        if (errorMessage.includes("wrong-password")) {
          Alert.alert("비밀번호가 올바르지 않습니다.");
        }
      });
  };

  return (
    <SignUpContainer>
      {isDark ? (
        <ImageBox source={require("../assets/mainLogoDark.png")} />
      ) : (
        <ImageBox source={require("../assets/mainLogoLight.png")} />
      )}
      <IdInputBox placeholder="아이디" onChangeText={setIdValue} />
      <PasswordInputBox
        placeholder="비밀번호"
        onChangeText={setPasswordValue}
      />
      <ButtonBox>
        <LoginButton
          onPress={() => {
            handleOnPressLogin();
          }}
        >
          <TextBox>로그인</TextBox>
        </LoginButton>
        <SignUpButton onPress={() => navigate("Tabs", { screen: "SignUp" })}>
          <TextBox>회원가입</TextBox>
        </SignUpButton>
      </ButtonBox>
    </SignUpContainer>
  );
};

const SignUpContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const IdInputBox = styled.TextInput`
  width: 80%;
  height: 40px;

  border-radius: 10px;
  padding: 5px 15px;
  margin-bottom: 10px;

  background-color: #eee;
`;

const PasswordInputBox = styled.TextInput`
  width: 80%;
  height: 40px;

  border-radius: 10px;
  padding: 5px 15px;
  margin-bottom: 20px;

  background-color: #eee;
`;

const ImageBox = styled.Image``;

const ButtonBox = styled.View`
  width: 80%;

  flex-direction: row;
  justify-content: space-between;
`;

const LoginButton = styled.TouchableOpacity`
  width: 48%;
  height: 40px;
  border-radius: 10px;

  justify-content: center;
  align-items: center;

  background-color: ${BRAND_COLOR};
`;

const SignUpButton = styled.TouchableOpacity`
  width: 48%;
  height: 40px;
  border-radius: 10px;

  justify-content: center;
  align-items: center;

  background-color: ${BRAND_COLOR};
`;

const TextBox = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

export default Login;
