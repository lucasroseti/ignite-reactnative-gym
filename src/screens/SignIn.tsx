import { Controller, useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { Center, Heading, Image, ScrollView, Text, VStack, useToast } from 'native-base'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useAuth } from '@hooks/useAuth'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { AppError } from '@utils/AppError'

import { Button } from '@components/Button'
import { Input } from '@components/Input'

import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png'

type FormDataProps = {
  email: string
  password: string
}

const signUpSchema = yup.object({
  email: yup.string().required('enter a e-mail').email('invalid e-mail'),
  password: yup.string().required('enter a password').min(6, 'password must have at least 6 digits'),
})

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const toast = useToast()

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  })

  const { signIn } = useAuth()

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  async function handleSignIn({ email, password }: FormDataProps){
    try {
      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Unable to access. Try again later'

      toast.show({
        title,
        placement: 'top',
        bgColor: isAppError ? 'yellow.600' : 'red.500'
      })
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} px={10}>
        <Image 
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="people training"
          resizeMode="contain"
          position="absolute"
        />
  
        <Center my={24}>
          <LogoSvg />
  
          <Text color="gray.100" fontSize="sm">Training your mind and body</Text>
        </Center>
  
        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Access your account
          </Heading>

          <Controller 
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
              <Input 
                placeholder="e-mail" 
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange }}) => (
              <Input
                placeholder="password"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />
  
          <Button title="Access" onPress={handleSubmit(handleSignIn)} />
        </Center>
  
        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Still don't have access?
          </Text>
  
          <Button
            title="Create account"
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}