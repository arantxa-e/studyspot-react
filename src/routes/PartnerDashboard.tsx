import { selectCurrentPartner } from "../reducers";
import { useAppSelector } from "../hooks";

export const PartnerDashboard = () => {
  const partner = useAppSelector((state) => selectCurrentPartner(state));

  return <div>{partner?.company} Dashboard</div>;
};
