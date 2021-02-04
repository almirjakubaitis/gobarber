adb reverse tcp:3333 tcp:3333

adb devices
yarn android


adb shell input text "RR"


cd android && ./gradlew clean && ./gradlew :app:bundleRelease

Vector icons
Abrir o arquivo build.gradle em android/app
e adicionar a seguinte linha

Para o ANDROID:

Entre na pasta android/app, abra o arquivo build.gradle e no final do arquivo adicione o seguinte:

######

project.ext.vectoricons = [
    iconFontNames: [ 'Feather.ttf' ]
]

apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"


#######

IOS

Entre na pasta ios pelo terminal e rode pod install. Após isso, entre no arquivo Info.plist que está dentro da pasta ios/appgobarber e dentro da tag **array** **onde estão nossas fontes adicione a seguinte linha:
<string>Feather.ttf</string>
