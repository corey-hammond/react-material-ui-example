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
          <Controls.Input
            name='phone'
            label='Phone Number'
            value={values.phone}
            onChange={handleInputChange}
          />
          <Controls.Input
            name='city'
            label='City'
            value={values.city}
            onChange={handleInputChange}
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
          />
          <Controls.DatePicker
            name='hireDate'
            label='Hire Date'
            value={values.hireDate}
            onChange={handleInputChange}
          />

          <div>
            <Controls.Button type='submit' text='Submit' />
            <Controls.Button color='default' text='Reset' />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
