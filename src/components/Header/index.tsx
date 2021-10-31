import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { useAuth } from '../../hooks/auth';

import { styles } from './styles';

import LogoSvg from '../../assets/logo.svg';
import { UserPhoto } from '../UserPhoto';

export function Header() {
	const { user, signOut } = useAuth();

	return (
		<View style={styles.container}>
			<LogoSvg/>

			<View style={styles.logoutButton}>

				{ //Botão só aparece se estiver logado
				  user && 
					/* Touchable opacity para botão */
					<TouchableOpacity onPress={signOut}>
						<Text style={styles.logoutText}>
							Sair
						</Text>
					</TouchableOpacity>
				}

				<UserPhoto 
					imageUri={user?.avatar_url}
				/>
			</View>
			
		</View>
	)
}