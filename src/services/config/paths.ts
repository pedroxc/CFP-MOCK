export default {
  contaFuturoApi: {
    company: '/companies',
    companyCheck: '/companies/check-registration',
    login: '/sessions/company',
    forgetPassword: '/password/forgot',
    resetPassword: '/password/reset',
    address: '/addresses',
    params: '/params',
    solicitations: '/solicitations',
    solicitationsByCompany: '/solicitations/company',
    importcsv: '/employees/import-csv',
    employees: '/employees/companies',
  },
  simulationApi: {
    solicitations: {
      aprrove: '/users/solicitations/moneyplus/approve-solicitation',
      cancel: '/users/solicitations/moneyplus/cancel-solicitation',
      assign: '/users/solicitations/moneyplus/assign-solicitation',
      updateBankDetais: '/users/solicitations/moneyplus/update-bank-details',
    },
    employees: {
      updateBankDetails: '/users/employees/update-bank-details',
    },
  },
};
