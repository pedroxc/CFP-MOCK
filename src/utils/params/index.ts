export const handleArrayParams = (name: string, params: string[]): string => {
  let queryParams = '';
  params.forEach((item) => { queryParams += `${name}[]=${item}&`; });
  return queryParams;
};
