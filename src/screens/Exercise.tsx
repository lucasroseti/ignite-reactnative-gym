import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Box, HStack, Heading, Icon, Image, ScrollView, Text, VStack } from 'native-base'
import { Feather } from '@expo/vector-icons'

import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { Button } from '@components/Button'

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon 
            as={Feather}
            name="arrow-left"
            color="green.500"
            size={6}
          />
        </TouchableOpacity>

        <HStack justifyContent="space-between" mt={4} mb={8} alignItems="center">
          <Heading color="gray.100" fontSize="lg" fontFamily="heading" flexShrink={1}>Pull-Up</Heading>
          
          <HStack alignItems="center">
            <BodySvg />
            <Text color="gray.200" ml={1} textTransform="capitalize">back</Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack p={8}>
          <Image
            source={{ uri: 'http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg' }}
            alt="exercise name"
            w="full"
            h={80}
            mb={3}
            resizeMode="cover"
            rounded="lg"
          />

          <Box bg="gray.600" rounded="md" pb={4} px={4}>
            <HStack alignItems="center" justifyContent="space-around" mb={6} mt={5}>
              <HStack>
                <SeriesSvg />
                <Text color="gray.200" ml={2}>3 sets</Text>
              </HStack>

              <HStack>
                <RepetitionsSvg />
                <Text color="gray.200" ml={2}>12 reps</Text>
              </HStack>
            </HStack>

            <Button
              title="Marked as done"
            />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}