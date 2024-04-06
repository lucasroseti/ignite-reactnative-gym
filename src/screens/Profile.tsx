import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from 'native-base'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import * as yup from 'yup'

import { useAuth } from '@hooks/useAuth'

import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'

const PHOTO_SIZE = 33

type FormDataProps = {
  name: string
  email: string
  password: string
  old_password: string
  confirm_password: string
}

const profileSchema = yup.object({
  name: yup.string().required('enter a name'),
})

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/lucasroseti.png')

  const toast = useToast()
  const { user } = useAuth()
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({ 
    defaultValues: { 
      name: user.name,
      email: user.email
    },
    resolver: yupResolver(profileSchema) 
  })

  async function handleProfileUpdate(data: FormDataProps) {
    console.log(data);
  }

  async function handleUserPhotoSelect() {
    try {
      setPhotoIsLoading(true)

      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      })
  
      if (photoSelected.canceled) {
        return
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri) as FileSystem.FileInfo

        if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
          return toast.show({
            title: 'This image is very large. Choose one up to 5mb',
            placement: 'top',
            bgColor: 'red.500'
          })
        }

        setUserPhoto(photoSelected.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

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
              source={{ uri: userPhoto }}
              alt="user image"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>Update photo</Text>
          </TouchableOpacity>

          <Controller 
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input 
                bg="gray.600" 
                placeholder='name'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input 
                bg="gray.600" 
                placeholder="e-mail"
                isDisabled
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Heading color="gray.200" fontSize="md" fontFamily="heading" mb={2} alignSelf="flex-start" mt={12}>
            Update password
          </Heading>

          <Controller 
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input 
                bg="gray.600"
                placeholder="old password"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />

          <Controller 
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input 
                bg="gray.600"
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) => (
              <Input 
                bg="gray.600"
                placeholder="confirm new password"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button title="Update" mt={4} onPress={handleSubmit(handleProfileUpdate)} />
        </Center>
      </ScrollView>
    </VStack>
  )
}