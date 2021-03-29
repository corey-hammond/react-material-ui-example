import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect } from 'react';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
import * as employeeService from '../../services/employeeService';

const genderItems = [
  { id: 'male', title: 'Male' },
  { id: 'female', title: 'Female' },
];

const initialFieldValues = {
  id: 0,
  fullName: '',
  email: '',
  phone: '',
  city: '',
  gender: 'male',
  departmentId: '',
  hireDate: new Date(),
  isPermanent: false,
};

export default function EmployeeForm(props) {
  const { addOrEdit, recordForEdit } = props;

  // Employee form validation
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ('fullName' in fieldValues)
      temp.fullName = fieldValues.fullName ? '' : 'Full name is required';

    if ('email' in fieldValues)
      temp.email =
        /$^|.+@.+..+/.test(fieldValues.email) && fieldValues.email
          ? ''
          : 'Please enter a valid email address';

    if ('phone' in fieldValues)
      temp.phone =
        fieldValues.phone.length > 8 && fieldValues.phone
          ? ''
          : 'A valid phone number is required';

    if ('city' in fieldValues)
      temp.city = fieldValues.city ? '' : 'City is required';

    if ('departmentId' in fieldValues)
      temp.departmentId =
        fieldValues.departmentId.length !== 0 ? '' : 'Department is required';

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === '');
  };

  // useForm Custom Hook
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFieldValues, true, validate);
  console.log('useForm Running from EmployeeForm.js');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  // Pass selected employee to form if 'edit' is clicked
  useEffect(() => {
    if (recordForEdit !== null) setValues({ ...recordForEdit });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name='fullName'
            label='Full Name'
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <Controls.Input
            name='email'
            label='Email'
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            name='phone'
            label='Phone Number'
            value={values.phone}
            onChange={handleInputChange}
            error={errors.phone}
          />
          <Controls.Input
            name='city'
            label='City'
            value={values.city}
            onChange={handleInputChange}
            error={errors.city}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Checkbox
            name='isPermanent'
            label='Permanent Employee'
            value={values.isPermanent}
            onChange={handleInputChange}
          />
          <Controls.RadioGroup
            name='gender'
            value={values.gender}
            label='Gender'
            items={genderItems}
            onChange={handleInputChange}
          />
          <Controls.Select
            name='departmentId'
            label='Department'
            value={values.departmentId}
            onChange={handleInputChange}
            options={employeeService.getDepartmentCollection()}
            error={errors.departmentId}
          />
          <Controls.DatePicker
            name='hireDate'
            label='Hire Date'
            value={values.hireDate}
            onChange={handleInputChange}
          />

          <div>
            <Controls.Button type='submit' text='Submit' />
            <Controls.Button color='default' text='Reset' onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
