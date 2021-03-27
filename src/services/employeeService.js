const KEYS = {
  employees: 'employees',
  employeeId: 'employeeId',
};

export const getDepartmentCollection = () => [
  { id: '1', title: 'Development' },
  { id: '2', title: 'Marketing' },
  { id: '3', title: 'Accounting' },
  { id: '4', title: 'HR' },
  { id: '5', title: 'Sales' },
];

export function insertEmployee(data) {
  let employees = getEmployees();
  data['id'] = generateEmployeeId();

  employees.push(data);
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function generateEmployeeId() {
  if (localStorage.getItem(KEYS.employeeId) === null)
    localStorage.setItem(KEYS.employeeId, '0');

  let id = parseInt(localStorage.getItem(KEYS.employeeId));
  localStorage.setItem(KEYS.employeeId, (++id).toString());

  return id;
}

export function getEmployees() {
  if (localStorage.getItem(KEYS.employees) === null)
    localStorage.setItem(KEYS.employees, JSON.stringify([]));

  return JSON.parse(localStorage.getItem(KEYS.employees));
}
