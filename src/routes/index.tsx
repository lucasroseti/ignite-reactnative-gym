import { Box, useTheme } from 'native-base'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'

import { useAuth } from '@hooks/useAuth'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

export function Routes() {
  const { colors } = useTheme()
  const theme = DefaultTheme

  const { user } = useAuth()

  theme.colors.background = colors.gray[700]

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}