import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

const ImageWithFallback = ({
  fallback = '/news-placeholder.jpg',
  alt,
  src,
  ...props
}: ImageProps & { fallback?: string }) => {
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={e => {
        setError(e);
      }}
      src={error ? fallback : src}
      {...props}
    />
  );
};

export default ImageWithFallback;
