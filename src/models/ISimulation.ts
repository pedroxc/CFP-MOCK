export interface ISimulation {
  cpf: string,
  limitAvailable: number,
  companyPaymentDate: string,
  loanValue: number,
  gridPlot: [];
  gridPlotSelected: any;
  employeeId: string,
  employeeName: string,
  employeeEmail: string,
  employeePhone: string,
  companyEmails: [],
  simulationId: string,
  nameAssignor: string,
  cnpjAssignor: string,
  bankMatched: { label: string, value: string },
  valueDocument: number,
  paymentDate: string,
  barcodeValue: string,
  typeTitle: string,
  bankCode: string,
  integerValueDocument: number,
  hasPayment: false,
  titleType: string,
  paymentValue: number,
  email: string,
  phone: string,
  requestValue: number,
  simulationData: string,
  attendanceType: string,
}

export interface IData {
  cpf: string;
  limitAvailable: number;
  loanValue: number;
  gridPlot: any;
  gridPlotSelected: any;
  companyPaymentDate: string;
  employeeId: string;
  employeeName: string;
  simulationId: string;
  companyEmails: string[];
  employeeEmail: string;
  employeePhone: string;
  nameAssignor: string;
  cnpjAssignor: string;
  bankMatched: IBankMatched;
  valueDocument: number;
  paymentDate: string;
  barcodeValue: string;
  typeTitle: string;
  bankCode: string;
  integerValueDocument: number;
  hasPayment: boolean;
}
interface IBankMatched {
  label: string;
  value: string;
}
