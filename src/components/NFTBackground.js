'use client';

const adminSelectedImage = {
  type: 'nft', // Change to 'custom' to use custom PNG
  image: '/admin-backgrounds/bg1.png',
};

export default function NFTBackground({ selectedNFT }) {
  const backgroundImage =
    adminSelectedImage.type === 'custom'
      ? adminSelectedImage.image
      : selectedNFT?.image;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.1,
          filter: 'blur(12px)',
          maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* Dark Top Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-40" />
    </div>
  );
}
