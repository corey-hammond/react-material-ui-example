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

export function updateEmployee(data) {
  let employees = getEmployees();
  let recordIndex = employees.findIndex((x) => x.id === data.id);
  employees[recordIndex] = { ...data };
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function deleteEmployee(id) {
  let employees = getEmployees();
  employees = employees.filter((emp) => emp.id !== id);
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

  let employees = JSON.parse(localStorage.getItem(KEYS.employees));

  // map dept ID to dept title
  let departments = getDepartmentCollection();
  return employees.map((emp) => ({
    ...emp,
    department: departments[emp.departmentId - 1].title,
  }));
}
