/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx,vue,css}'],
    theme: {
        colors: {
            primary: '#32e3a6',
            transparent: 'transparent',
            current: 'currentColor',
            white: '#ffffff',
            black: '#000000',
            theme: '#30A5FF',
            warning: '#eeaf3a',
            green: '#529b2e',
            red: '#FF5A40',
            blue: '#4683ED',

            text: {
                primary: '#32e3a6',
                regular: '#606266',
                secondary: '#909399',
                placeHolder: '#A8ABB2',
                disable: '#C0C4CC'
            },
            border: {
                darker: '#CDD0D6',
                dark: '#D4D7DE',
                base: '#DCDFE6',
                light: '#E4E7ED',
                lighter: '#EBEEF5',
                extraLight: '#F2F6FC'
            },
            fill: {
                darker: '#E6E8EB',
                dark: '#EBEDF0',
                base: '#F0F2F5',
                light: '#F5F7FA',
                lighter: '#FAFAFA',
                extraLight: '#FAFCFF'
            },
            gradient: {
                start: '#0072ff44',
                end: '#00c6ff44'
            }
        },
        rotate: {
            135: '135deg',
            315: '315deg'
        },

    },
    plugins: []
};
