interface AvatarProps {
  src?: string | null;
  className?: string;
}

export function Avatar({ src, className = "h-6 w-6" }: AvatarProps) {
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden rounded-full bg-slate-300 ${className}`}
    >
      <img
        alt=""
        src={src || "/no-profile.jpg"}
        referrerPolicy="no-referrer"
        className="h-full w-full object-cover"
      />
    </span>
  );
}
