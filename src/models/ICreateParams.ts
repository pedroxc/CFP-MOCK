/* eslint-disable camelcase */
export interface ICreateParams {
  base_value: number;
  limit: number;
  net_margin: number;
  payment_date: string;
  modality: string;
  fees_group1?: number;
  fees_group2?: number;
  fees_group3?: number;
  fees_group4?: number;
  fees_group5?: number;
  quant_plots_params_max: number;
  quant_plots_params_min: number;
  TAC_value?: number;
  day_payment_due: number;
  hired_loans_limit?: number;
  months_risk?: number;
  perc_IOF?: number;
  company_id: string;
}
