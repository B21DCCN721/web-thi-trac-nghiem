const buildParams = (searchValue, pageValue) => {
  const params = {};
  if (searchValue.trim() !== "") params.search = searchValue;
  params.page = String(pageValue);
  return params;
};
export default buildParams;
