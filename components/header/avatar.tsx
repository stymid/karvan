import { Avatar as HeroUIAvatar } from "@heroui/avatar";
import AvatarSkeleton from "../avatar-skeleton";

const Avatar = ({
  src,
  pending = false,
}: {
  src?: string;
  pending?: boolean;
}) => {
  return (
    <HeroUIAvatar
      fallback={<AvatarSkeleton />}
      size="sm"
      isBordered
      color="success"
      src={src}
      showFallback={pending}
    />
  );
};

export default Avatar;
