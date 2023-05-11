import { View, Text } from 'react-native'
import React from 'react'

import styles from './stlye'
import { VectorIcon } from '../VectorIcon'
import { themes } from '../../constants/colors'

const ExperienceUploaded = ({
  salary,
  jobTitle,
  companyName,
  numberOfYears,
  showCloseIcon,
  theme,
  onCancel,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.jobTitle, { color: themes[theme].titleColor }]}>{jobTitle}</Text>
        <Text style={[styles.companyNameAndNumberOfYears, { color: themes[theme].textColor }]}>
          {companyName} | {numberOfYears} years
        </Text>
        <Text style={{ color: themes[theme].textColor }}>
          {' '}
          <Text style={[styles.salaryText]}>{salary} USD</Text> / per month{' '}
        </Text>
      </View>
      {showCloseIcon && (
        <VectorIcon
          type="Ionicons"
          name="close-outline"
          size={18}
          color="#585858"
          style={styles.closeIcon}
          onPress={onCancel}
        />
      )}
    </View>
  )
}

export default ExperienceUploaded
