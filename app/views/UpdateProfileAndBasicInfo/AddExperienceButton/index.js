import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ExperienceUploaded from '../../../containers/ExperienceUploaded';
import i18n from '../../../i18n';
import AddExperienceModal from '../AddExperienceModal';
import {styles} from './styles';

const AddExperienceButton = ({userInfo, onUpdate}) => {
  const {job, role, years_of_service, company, salary} = userInfo;
  const [modalVisible, setModalVisible] = useState(false);

  const onCancel = () => {
    onUpdate({
      job: '',
      role: '',
      years_of_service: '',
      company: '',
      salary: '',
    });
  };

  if (!job)
    return (
      <>
        <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={() => setModalVisible(true)}>
          <Text style={styles.title}>{i18n.t('add_experience')}</Text>
        </TouchableOpacity>

        <AddExperienceModal
          isVisible={modalVisible}
          close={() => setModalVisible(false)}
          onUpdate={onUpdate}
        />
      </>
    );

  return (
    <ExperienceUploaded
      salary={salary}
      jobTitle={job}
      companyName={company}
      numberOfYears={years_of_service}
      showCloseIcon
      theme={'light'}
      onCancel={onCancel}
    />
  );
};

export default AddExperienceButton;
