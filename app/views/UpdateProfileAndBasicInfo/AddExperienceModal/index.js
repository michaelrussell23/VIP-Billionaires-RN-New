import React, { useState } from 'react';
import { View, Text } from 'react-native';
import CsAutocompleteSelect from '../../../containers/CsAutocompleteSelect';
import FloatingTextInput from '../../../containers/FloatingTextInput';
import I18n from '../../../i18n';
import styles from './style';
import Button from '../../../containers/Button';
import { CsSelect } from '../../../containers/CsSelect';
import i18n from '../../../i18n';
import ModalView from '../../../containers/ModalView';
import { COLOR_BLACK, COLOR_RED, COLOR_YELLOW, themes } from '../../../constants/colors';

const theme = 'light';

const AddExperienceModal = ({ isVisible, close, onUpdate }) => {
  const [job, setJob] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [yearsOfService, setYearsOfService] = useState('');
  const [salary, setSalary] = useState('');
  const [jobError, setJobError] = useState('');
  const [companyError, setCompanyError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [yearsOfServiceError, setYearsOfServiceError] = useState('');
  const [salaryError, setSalaryError] = useState('');

  const isValid = () => {
    setJobError('');
    setCompanyError('');
    setRoleError('');
    setYearsOfServiceError('');
    setSalaryError('');

    if (!job.length) {
      setJobError(i18n.t('please_enter_job_name'));
      return false;
    }

    if (!company.length) {
      setCompanyError(i18n.t('please_enter_company_name'));
      return false;
    }

    if (!role.length) {
      setRoleError(i18n.t('please_enter_role'));
      return false;
    }

    if (!yearsOfService.length) {
      setYearsOfServiceError(i18n.t('please_select_years_of_service'));
      return false;
    }

    if (!salary.length) {
      setSalaryError(i18n.t('please_select_salary'));
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    if (isValid()) {
      onUpdate({
        job,
        company,
        salary,
        role,
        years_of_service: yearsOfService,
      });
      close();
    }
  };

  return (
    <ModalView isShow={isVisible} onClose={close} theme="light" title={i18n.t('add_experience')}>
      <View style={{ marginBottom: 30 }}>
        <Text style={styles.descriptionText}>
          Thank you for your registration, before we move forward please verify your email address
        </Text>
        <CsAutocompleteSelect
          theme={theme}
          title="Job"
          placeholder={'Type Your Job Name'}
          label="Job"
          containerStyle={{ borderColor: jobError ? COLOR_RED : themes[theme].borderColor }}
          onSelectItem={item => {
            if (item) setJob(item.title);
          }}
          data={[
            { id: 1, title: 'IT' },
            { id: 2, title: 'Sales Manager' },
          ]}
        />
        <FloatingTextInput
          value={company}
          returnKeyType="next"
          keyboardType="default"
          textContentType="oneTimeCode"
          label={I18n.t('Company')}
          placeholder={'Type Company Name'}
          placeholderTextColor={'#C4C4C4'}
          onChangeText={job => setCompany(job)}
          theme={theme}
          error={companyError}
        />
        <FloatingTextInput
          value={role}
          returnKeyType="next"
          keyboardType="default"
          textContentType="oneTimeCode"
          label={I18n.t('Role')}
          placeholderTextColor={'#C4C4C4'}
          placeholder={'Type Role Name'}
          onChangeText={job => setRole(job)}
          theme={theme}
          error={roleError}
        />
        <CsSelect
          placeholder="Select"
          label="Years of Service"
          options={['0 - 2 years', '2 - 5 years', '5 - 7 years', '7 - 10 years', '10 - 12 years']}
          onSelect={value => setYearsOfService(value)}
          theme={theme}
          value={yearsOfService}
          containerStyle={{ borderColor: yearsOfServiceError ? COLOR_RED : themes[theme].borderColor }}
        />
        <CsSelect
          placeholder="Select Sallery"
          label="Salary"
          options={['$0-$50,000', '$50,000-$60,000', '$70,000-$80,000', '$80,000-$100,000']}
          theme={theme}
          value={salary}
          onSelect={value => setSalary(value)}
          containerStyle={{ borderColor: salaryError ? COLOR_RED : themes[theme].borderColor }}
        />
        <Button
          style={styles.submitBtn}
          title={I18n.t('update')}
          size="W"
          fontSize={14}
          backgroundColor={COLOR_YELLOW}
          textColor={COLOR_BLACK}
          onPress={onSubmit}
          testID="login-submit"
          theme={theme}
          pressingHighlight
        />
      </View>
    </ModalView>
  );
};

export default AddExperienceModal;
