export const openCCBDocument = (proposalCodeMp: string): void => {
  window.open(`${process.env.REACT_APP_MONEYPLUS_CCB}?impressao=S&tipo=ccb&code=${proposalCodeMp}`);
};
