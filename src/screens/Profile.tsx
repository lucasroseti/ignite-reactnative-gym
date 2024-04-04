import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Center, Heading, ScrollView, Skeleton, Text, VStack } from 'native-base'

import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'

const PHOTO_SIZE = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  return (
    <VStack flex={1}>
      <ScreenHeader title="Profile" />

      <ScrollView contentContainerStyle={{ paddingBottom: 56 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto 
              source={{ uri: 'https://github.com/lucasroseti.png' }}
              alt="user image"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>Update photo</Text>
          </TouchableOpacity>

          <Input
            placeholder="name"
            bg="gray.600"
          />

          <Input
            placeholder="e-mail"
            bg="gray.600"
            isDisabled
          />

          <Heading color="gray.200" fontSize="md" mb={2} alignSelf="flex-start" mt={12}>
            Update password
          </Heading>

          <Input
            bg="gray.600"
            placeholder="old password"
            secureTextEntry
          />

          <Input
            bg="gray.600"
            placeholder="new password"
            secureTextEntry
          />

          <Input
            bg="gray.600"
            placeholder="confirm new password"
            secureTextEntry
          />

          <Button title="Update" mt={4} />
        </Center>
      </ScrollView>
    </VStack>
  )
}