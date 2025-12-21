import IdentityBoundary from "./identity-boundary";
import IdentityGate from "./identity-gate";

const IdentityItem = () => {
  return (
    <IdentityBoundary>
      <IdentityGate />
    </IdentityBoundary>
  );
};

export default IdentityItem;
