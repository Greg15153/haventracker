import theme, { Theme } from '@chakra-ui/theme'
import { mode, Styles } from '@chakra-ui/theme-tools'

const scoundrel: Theme = {
    ...theme,
    styles: {
        global: (props) => ({
            bg: mode('blue.900', 'green.900')(props)
        })
    } as Styles,
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false
    },
    breakpoints: Object.assign([], theme.breakpoints),
    colors: {
        ...theme.colors,
        green: {
            50: '#f0fae3',
            100: '#d9eec1',
            200: '#c1e19c',
            300: '#a8d676',
            400: '#90ca50',
            500: '#76b037',
            600: '#5b8929',
            700: '#40621d',
            800: '#253b0f',
            900: '#091500'
        }
    }
}

export default scoundrel
