import Image from "next/image";

type Photo = { src: string; alt: string; caption: string };

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  return (
    <div className="mb-5 grid grid-cols-2 gap-3">
      {photos.map((photo) => (
        <div
          key={photo.src}
          className="shadow-float-sm relative aspect-[4/3] overflow-hidden rounded-2xl"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 640px) 50vw, 300px"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent px-3 pt-6 pb-2">
            <span className="text-xs font-medium text-white">
              {photo.caption}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
