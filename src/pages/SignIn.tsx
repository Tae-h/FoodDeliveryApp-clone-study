import {
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const onChangeEmail = useCallback((text: string) => {
    // e.target.value  아님 text가 바로 들어 있음!!
    setEmail(text.trim());
  }, []);

  const onChangePassword = useCallback((text: string) => {
    // e.target.value  아님 text가 바로 들어 있음!!
    setPassword(text.trim());
  }, []);

  const onSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해 주세요.');
    }

    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해 주세요.');
    }

    Alert.alert('알림', '로그인 되었습니다.!');
  }, [email, password]);

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const canGoNext = email && password;

  return (
    <View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.textInput}
          placeholder={'이메일을 입력해 주세요.'}
          value={email}
          onChangeText={onChangeEmail}
          importantForAutofill={'yes'} // 디바이스 저장
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType={'email-address'} // 키보드에 @ 보여줌
          ref={emailRef}
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          blurOnSubmit={true}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          placeholder={'비밀번호를 입력해 주세요.'}
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry
          importantForAutofill={'yes'} // 디바이스 비밀번호 저장
          autoComplete="password"
          textContentType="password"
          ref={passwordRef}
          onSubmitEditing={onSubmit}
        />
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          onPress={onSubmit}
          style={
            !canGoNext
              ? styles.loginButton
              : /*: [styles.loginButton, styles.loginButtonActive]*/
                StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
          }
          disabled={!canGoNext}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </Pressable>
        <Pressable onPress={toSignUp}>
          <Text>회원가입</Text>
        </Pressable>
      </View>
      <View />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputWrapper: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  buttonZone: {
    alignItems: 'center',
  },
});

export default SignIn;
