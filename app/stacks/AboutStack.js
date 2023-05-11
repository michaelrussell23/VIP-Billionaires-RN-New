import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { outsideHeader, themedHeader, StackAnimation } from '../utils/navigation'
import PrivacyPolicy from '../views/About/PrivacyPolicy'
import TermsOfServices from '../views/About/TermsOfServices'
import Eula from '../views/About/Eula'
import { ThemeContext } from '../theme'

// About
const About = createStackNavigator()
const AboutStack = () => {
  const { theme } = React.useContext(ThemeContext)
  return (
    <About.Navigator
      screenOptions={{
        gestureEnabled: false,
        ...outsideHeader,
        ...themedHeader(theme),
        ...StackAnimation,
      }}
    >
      <About.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <About.Screen name="TermsOfServices" component={TermsOfServices} />
      <About.Screen name="Eula" component={Eula} />
    </About.Navigator>
  )
}

export default AboutStack
