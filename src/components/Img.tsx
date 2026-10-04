import { useState } from "react";
export default function Img({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [bad, setBad] = useState(false);
  return bad ? (
    <div role="img" aria-label={alt} className={`bg-line ${className}`} />
  ) : (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setBad(true)}
      className={`object-cover ${className}`}
    />
  );
}
