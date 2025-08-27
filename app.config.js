
module.exports = function (_config) {
  return {
    expo: {
      name: "simulador-de-emprestimo",
      slug: "simulador-de-emprestimo",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/caixa_x_positivo.png",
      scheme: "simuladordeemprestimo",
      userInterfaceStyle: "automatic",
      newArchEnabled: true,
      ios: {
        supportsTablet: true
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/images/adaptive-icon.png",
          backgroundColor: "#ffffff"
        },
        edgeToEdgeEnabled: true
      },
      web: {
        bundler: "metro",
        favicon: "./assets/images/favicon.png"
      },
      plugins: [
        [
          'expo-splash-screen',
          {
            backgroundColor: '#0c7cff',
            image: './assets/caixa_x_positivo.png',
            imageWidth: 150,
            dark: {
              backgroundColor: '#0c2a49',
              image: './assets/caixa_x_negativo.png',
              imageWidth: '150'
            }
          }
        ],
        [
          "expo-font",
          {
            fonts: [
              "./assets/fonts/inter/InterVariable.woff2",
              "./assets/fonts/inter/InterVariable-Italic.woff2",
              // Android only
              "./assets/fonts/inter/Inter-Regular.otf",
              "./assets/fonts/inter/Inter-Italic.otf",
              "./assets/fonts/inter/Inter-Medium.otf",
              "./assets/fonts/inter/Inter-MediumItalic.otf",
              "./assets/fonts/inter/Inter-SemiBold.otf",
              "./assets/fonts/inter/Inter-SemiBoldItalic.otf",
              "./assets/fonts/inter/Inter-Bold.otf",
              "./assets/fonts/inter/Inter-BoldItalic.otf",
            ]
          }
        ]
      ],
      experiments: {},
      extra: {
        apiUrl: "http://localhost:3000",
        eas: {
          "projectId": "bc6ea297-fc52-4044-8509-28c0ecc11790"
        }
      }
    }

  }
}
