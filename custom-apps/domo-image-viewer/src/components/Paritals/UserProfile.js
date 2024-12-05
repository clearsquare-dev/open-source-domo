import { classNames } from "src/helpers";

export default function UserProfile({ user, size = "base" }) {
  if (!user) return;
  let { avatarKey, displayName } = user;

  let sizeClasses = {
    xs: "max-h-[18px]",
    sm: "",
    base: "",
    md: "",
    lg: "",
  };

  let imageClasses = {
    xs: "h-5 w-5",
    sm: "",
    base: "h-6 w-6",
    md: "",
    lg: "",
  };

  return (
    <div className={classNames("flex items-center", sizeClasses[size])}>
      <img
        src={avatarKey || "https://clearsquare-co-partner.domo.com/api/content/v1/avatar/USER/1063446937?size=100&cacheBuster=1708224012151"}
        alt={displayName}
        className={classNames("rounded-full", imageClasses[size])}
      />
      <p className="ml-3 text-sm font-medium text-gray-500">{displayName}</p>
    </div>
  );
}
