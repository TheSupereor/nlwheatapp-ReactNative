import React from 'react'
import { TouchableOpacity, TouchableOpacityProps, Text, ColorValue, ActivityIndicator } from 'react-native'
import { styles } from './styles'

import { AntDesign } from '@expo/vector-icons'

type Props = TouchableOpacityProps &{
	title: string;
	color: ColorValue;
	backgroundColor: ColorValue;
	//passando o ícone de forma opcional dinamicamente
	icon?: React.ComponentProps<typeof AntDesign>['name']
	isLoading?: boolean
}

export function Button({ 
	title, 
	color, 
	backgroundColor, 
	icon, 
	isLoading = false, 
	...rest }:Props) {

  return (
    <TouchableOpacity
		style={[styles.button, { backgroundColor }]}
		//colocando propriedades adicionais passadas como atributos do botão
		activeOpacity={0.7}
		disabled={isLoading}
		{...rest}
	>

		{
			isLoading ? 
			<ActivityIndicator color={color}/>
			:
			<>
				<AntDesign name={icon} size={24} style={styles.icon}/>

				<Text style={[styles.title, { color }]}>
					{title}
				</Text>
			</>
		}

    </TouchableOpacity>
	)
}
