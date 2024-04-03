import { useNavigation } from '@react-navigation/native'
import { Center, Heading, Image, ScrollView, Text, VStack } from 'native-base'

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { Button } from '@components/Button'
import { Input } from '@components/Input'

import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png'

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} px={10}>
        <Image 
          source={BackgroundImg}
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
  
          <Input
            placeholder="e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            placeholder="password"
            secureTextEntry
          />
  
          <Button title="Access" />
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