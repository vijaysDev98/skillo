import React, { memo } from 'react';
import { Text as RNText, StyleProp, TextStyle, TextProps } from 'react-native';

//CONSTANT
import { FONTS } from '../assets'

interface TextPProps {
    style?: StyleProp<TextStyle>,
    font?: string,
    color?: string,
    align?: "auto" | "left" | "right" | "center" | "justify" | undefined,
    size?: number,
    lineHeight?: number,
    children: any,
}

function Text(props: TextPProps & TextProps) {


    const fontFamily: string | undefined = props.font ? props.font : undefined
    const fontSize: number = props.size ? props.size : 13
    const lineHeight: number | undefined = props.lineHeight
    const fontColor: string = props?.color ?? '#000'
    const align: "auto" | "left" | "right" | "center" | "justify" | undefined = props?.align ?? 'left'

    return (
        <RNText
            {...props}
            style={[
                props.style,
                {
                    color: fontColor,
                    fontSize: fontSize,
                    fontFamily: fontFamily,
                    lineHeight: lineHeight,
                    textAlign: align
                },
            ]}>
            {props.children}
        </RNText>
    )
}


Text.defaultValue = {
    style: {},
    size: 12,
    color: '#000',
    font: FONTS.Lato.Regular,
    align: 'left'
};

export default memo(Text);
