"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type GalleryDetail = { fileName?: string; file?: string };
type Gallery = {
  galleryMaster_id?: number;
  galleryMaster_Title?: string;
  image?: string;
  galleryDetailList?: GalleryDetail[];
};

function safeKey(value?: string | number) {
  return String(value ?? Math.random().toString(36).slice(2, 9));
}

interface GalleryClientProps {
  galleries: Gallery[];
}

export default function GalleryClient({ galleries }: GalleryClientProps) {
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (gallery: Gallery) => {
    setSelectedGallery(gallery);
    setCurrentIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGallery(null);
  };

  const nextImage = () => {
    if (selectedGallery?.galleryDetailList) {
      setCurrentIndex(
        (prev) => (prev + 1) % selectedGallery.galleryDetailList!.length
      );
    }
  };

  const prevImage = () => {
    if (selectedGallery?.galleryDetailList) {
      setCurrentIndex(
        (prev) =>
          (prev - 1 + selectedGallery.galleryDetailList!.length) %
          selectedGallery.galleryDetailList!.length
      );
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Galleries</h1>
          <p className="text-lg text-gray-600">
            Discover our curated photo collections
          </p>
        </div>

        {galleries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No galleries found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleries.map((g) => (
              <article
                key={safeKey(g.galleryMaster_id ?? g.galleryMaster_Title)}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {g.image && (
                  <div className="w-full h-48 relative overflow-hidden">
                    <Image
                      src={g.image}
                      alt={g.galleryMaster_Title ?? "gallery"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 line-clamp-2">
                    {g.galleryMaster_Title}
                  </h2>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {(g.galleryDetailList ?? []).slice(0, 3).map((d) => {
                      const src = d.fileName ?? d.file ?? "";
                      return (
                        <div
                          key={safeKey(src)}
                          className="w-full h-20 relative rounded-lg overflow-hidden"
                        >
                          {src ? (
                            <Image
                              src={src}
                              alt="gallery-thumb"
                              fill
                              sizes="(max-width: 768px) 33vw, 10vw"
                              className="object-cover hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                              <span className="text-xs text-gray-400">
                                No image
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => openModal(g)}
                    className="w-full bg-accent-purple text-white py-2 px-4 rounded-lg hover:bg-accent-blue transition-colors font-medium"
                  >
                    View Gallery
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full max-h-full bg-white rounded-lg overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative h-96 md:h-[600px]">
              {selectedGallery.galleryDetailList &&
                selectedGallery.galleryDetailList.length > 0 && (
                  <Image
                    src={
                      selectedGallery.galleryDetailList[currentIndex]
                        .fileName ??
                      selectedGallery.galleryDetailList[currentIndex].file ??
                      ""
                    }
                    alt={`Gallery image ${currentIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="object-contain"
                  />
                )}
            </div>

            <div className="flex justify-between items-center p-4 bg-white">
              <button
                onClick={prevImage}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
                disabled={
                  !selectedGallery.galleryDetailList ||
                  selectedGallery.galleryDetailList.length <= 1
                }
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <span className="text-sm text-gray-600">
                {currentIndex + 1} /{" "}
                {selectedGallery.galleryDetailList?.length ?? 0}
              </span>

              <button
                onClick={nextImage}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
                disabled={
                  !selectedGallery.galleryDetailList ||
                  selectedGallery.galleryDetailList.length <= 1
                }
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
