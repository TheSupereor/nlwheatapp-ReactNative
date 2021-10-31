import React from 'react'
import { Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { styles } from './styles'
import avatarIMG from '../../assets/avatar.png'
import { COLORS } from '../../theme'

const SIZES = {
	SMALL: {
		containerSize: 32,
		avatarSize: 28,
	},
	NORMAL: {
		containerSize: 48,
		avatarSize: 42,
	}
}

//definindo tipos que podem ser recebidos no componente
type Props = {
	imageUri: string | undefined;
	sizes?: 'SMALL' | 'NORMAL'
}

//extrair valor de uma imagem, como dimensões ou caminho
const AVATAR_DEFAULT = Image.resolveAssetSource(avatarIMG).uri;

//aplicando tipos e, caso não tenha tamanho especificado, definir como NORMAL
export function UserPhoto({ imageUri, sizes = 'NORMAL' }:Props) {
	const { containerSize, avatarSize } = SIZES[sizes]
;
	return (
		<LinearGradient
			colors={[COLORS.PINK, COLORS.YELLOW]}
			start={{x: 0, y: 0.8}}
			end={{x:0.9, y:1}}
			style={[
				styles.container,
				{
					width: containerSize,
					height: containerSize,
					borderRadius: containerSize /2,
				}
			]}
		>
			<Image 
				//se a primeira não está disponível, carrega a segunda
				source={{uri:imageUri || AVATAR_DEFAULT}}
				//passando mais de um estilo por array
				style={
					[
						styles.avatar,
						{
							width: avatarSize,
							height: avatarSize,
							borderRadius: avatarSize /2,
						}
					]
				}
			/>
		</LinearGradient>
	)
	}