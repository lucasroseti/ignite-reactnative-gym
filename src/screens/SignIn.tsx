import { Center, Heading, Image, Text, VStack } from 'native-base'

import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png'

export function SignIn() {
  return (
    <VStack flex={1} bg="gray.700">
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
      </Center>
    </VStack>
  )
}