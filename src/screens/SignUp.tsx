import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { Center, Heading, Image, ScrollView, Text, VStack } from 'native-base'

import { Button } from '@components/Button'
import { Input } from '@components/Input'

import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png'

type FormDataProps = {
  name: string
  email: string
  password: string
  password_confirm: string
}

export function SignUp() {
  const navigation = useNavigation()
  const { control, handleSubmit } = useForm<FormDataProps>()

  function handleGoBack() {
    navigation.goBack()
  }

  function handleSignUp({ name, email, password, password_confirm }: FormDataProps) {
    console.log({ name, email, password, password_confirm })
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
            Create your account
          </Heading>

          <Controller
            control={control}
            name="name"
            rules={{
              required: 'Enter a name'
            }}
            render={({ field: { value, onChange }}) => (
              <Input
                placeholder="name"
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Enter a email'
            }}
            render={({ field: { value, onChange }}) => (
              <Input
                placeholder="e-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
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
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { value, onChange }}) => (
              <Input
                placeholder="confirm password"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
              />
            )}
          />
  
          <Button
            title="Create and access"
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>
  
        <Button
          title="Back to login"
          variant="outline"
          mt={24}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  )
}