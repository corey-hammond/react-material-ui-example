import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect } from 'react';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';

const genderItems = [
  { id: 'male', title: 'Male' },
  { id: 'female', title: 'Female' },
];

const initialFieldValues = {
  id: 0,
  fullName: '',
  email: '',
  mobile: '',
  city: '',
  gender: 'male',
  departmentId: '',
  hireDate: new Date(),
  isPermanent: false,
};

export default function EmployeeForm() {
  const { values, setValues, handleInputChange } = useForm(initialFieldValues);

  return (
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name='fullName'
            label='Full Name'
            value={values.fullName}
            onChange={handleInputChange}
          />
          <Controls.Input
            name='email'
            label='Email'
            value={values.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            name='gender'
            value={values.gender}
            label='Gender'
            items={genderItems}
            onChange={handleInputChange}
          ></Controls.RadioGroup>
        </Grid>
      </Grid>
    </Form>
  );
}
