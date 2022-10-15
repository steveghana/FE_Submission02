import { customersData } from "../components/modal/dummy";
export function autocomplete(data) {
  let filter = customersData.filter((item) =>
    item.ProjectName.toLowerCase().includes(data.toLowerCase())
  );
  return filter;
}
