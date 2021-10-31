import React from 'react'
import { View, Text } from 'react-native'
import { COLORS } from '../../theme'

import { useAuth } from '../../hooks/auth'

import { Button } from '../Button'

import { styles } from './styles'

export function SignInBox () {
	const { signIn, isSigningIn } = useAuth();

	return (
		<View style={styles.container}>
			
			<Button 
			  title="ENTRAR COM GITHUB"
				color={COLORS.BLACK_PRIMARY}
				backgroundColor={COLORS.YELLOW}
				//passando o ícone para o componente
				icon="github"
				onPress={signIn}
				isLoading={isSigningIn}
			></Button>

		</View>
	)
}
