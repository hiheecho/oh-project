import { Alert, useColorScheme, KeyboardAvoidingView } from "react-native";
import styled from "@emotion/native";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

import { BRAND_COLOR } from "../color";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../util";

import { Feather } from "@expo/vector-icons";

const SignUp = () => {
  const { navigate } = useNavigation();
  const isDark = useColorScheme() === "dark";
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [userPassword, setUserPassword] = useState();
  const [userPasswordCheck, setUserPasswordCheck] = useState();

  const [pwShow, setPwShow] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleSignUp = async () => {
    if (!userId) {
      Alert.alert("아이디를 입력해주세요");
      return;
    }
    if (userId.indexOf("@") == -1) {
      Alert.alert("아이디는 이메일 형식으로 입력해주세요");
      return;
    }
    if (userId.indexOf(".") == -1) {
      Alert.alert("아이디는 이메일 형식으로 입력해주세요");
      return;
    }
    if (!userName) {
      Alert.alert("닉네임을 입력해주세요");
      return;
    }
    if (!userPassword) {
      Alert.alert("비밀번호를 입력해주세요");
      return;
    }
    if (!userPasswordCheck) {
      Alert.alert("비밀번호 확인을 입력해주세요");
      return;
    }

    if (userPassword != userPasswordCheck) {
      Alert.alert("비밀번호를 확인해주세요");
      return;
    }

    await createUserWithEmailAndPassword(auth, userId, userPassword)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await updateProfile(auth.currentUser, { displayName: userName })
          .then(() => {
            console.log(auth.currentUser);
            console.log(userCredential);
            Alert.alert("회원가입 성공!");
          })
          .catch((error) => {
            Alert.alert(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorCode, errorMessage);
      });
  };

  return (
    <SignUpContainer isDark={isDark}>
      <ImageContainer>
        {isDark ? (
          <ImageBox source={require("../assets/mainLogoDark.png")} />
        ) : (
          <ImageBox source={require("../assets/mainLogoLight.png")} />
        )}
      </ImageContainer>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
        <InputContainer>
          <InputBox
            placeholder="아이디를 입력해주세요. (이메일)"
            placeholderTextColor="#a1a1a1"
            value={userId}
            onChangeText={setUserId}
          />
          <InputBox
            placeholder="닉네임을 입력해주세요."
            placeholderTextColor="#a1a1a1"
            value={userName}
            onChangeText={setUserName}
          />
        </InputContainer>
        <InputContainer>
          <InputBox
            placeholder="비밀번호를 입력해주세요"
            placeholderTextColor="#a1a1a1"
            value={userPassword}
            secureTextEntry={visible}
            onChangeText={setUserPassword}
          />

          <InputBox
            placeholder="비밀번호를 한번 더 입력해주세요"
            placeholderTextColor="#a1a1a1"
            value={userPasswordCheck}
            secureTextEntry={visible}
            onChangeText={setUserPasswordCheck}
            onSubmitEditing={() => {
              handleSignUp();
            }}
          />
          <PwHideTouchInput
            onPress={() => {
              setVisible(!visible), setPwShow(!pwShow);
            }}
          >
            <Feather
              name={pwShow === false ? "eye-off" : "eye"}
              size={24}
              color={"#6b6b6b79"}
            />
          </PwHideTouchInput>
          <PwHideTouchCheck
            onPress={() => {
              setVisible(!visible), setPwShow(!pwShow);
            }}
          >
            <Feather
              name={pwShow === false ? "eye-off" : "eye"}
              size={24}
              color={"#6b6b6b79"}
            />
          </PwHideTouchCheck>
        </InputContainer>
      </KeyboardAvoidingView>
      <SignUpButton
        onPress={() => {
          handleSignUp();
        }}
      >
        <TextBox>회원가입</TextBox>
      </SignUpButton>
      <LoginButton onPress={() => navigate("Stacks", { screen: "Login" })}>
        <TextBox>로그인</TextBox>
      </LoginButton>
    </SignUpContainer>
  );
};

const SignUpContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.background};
`;

const ImageContainer = styled.View`
  width: ${SCREEN_WIDTH / 2 + "px"};
  height: ${SCREEN_HEIGHT / 7 + "px"};
  position: absolute;
  right: 32%;
  top: 24%;
`;

const ImageBox = styled.Image`
  width: 130%;
  height: 100%;
`;

const InputBox = styled.TextInput`
  width: ${SCREEN_WIDTH / 1.25 + "px"};
  height: 40px;

  border-radius: 10px;
  padding: 5px 15px;
  margin-bottom: 10px;

  background-color: #eee;
`;

const InputContainer = styled.View`
  margin-bottom: 10px;
  width: 80%;
  top: 12%;
`;

const LoginButton = styled.TouchableOpacity`
  width: 80%;
  height: 50px;
  border-radius: 10px;

  justify-content: center;
  align-items: center;

  background-color: ${BRAND_COLOR};
  position: absolute;
  bottom: 24.5%;
`;

const SignUpButton = styled.TouchableOpacity`
  width: 80%;
  height: 50px;
  border-radius: 10px;

  margin-bottom: 10px;

  justify-content: center;
  align-items: center;

  background-color: ${BRAND_COLOR};
  position: absolute;
  bottom: 30%;
`;

const TextBox = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
const PwHideTouchInput = styled.TouchableOpacity`
  bottom: 62%;
  left: 87%;
`;
const PwHideTouchCheck = styled.TouchableOpacity`
  bottom: 45%;
  left: 87%;
`;

export default SignUp;
