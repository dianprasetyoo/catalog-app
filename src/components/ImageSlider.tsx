import React, { useEffect, useState } from "react";

interface ImageSliderProps {
  images: string[];
  onImageChange: (index: number) => void;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, onImageChange }) => {
  const [imgId, setImgId] = useState(1);

  useEffect(() => {
    slideImage();
  }, [imgId]);

  const handleImageClick = (id: number) => {
    setImgId(id);
    onImageChange(id)
  };

  const slideImage = () => {
    const displayWidth = document.querySelector('.img-showcase img')?.clientWidth || 0;
    const imgShowcase = document.querySelector('.img-showcase') as HTMLElement;
    imgShowcase.style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="overflow-hidden w-full">
        <div className="img-showcase flex transition-all ease-in-out duration-500">
          {images.map((image, index) => (
            <img
              key={index}
              className="w-full flex-shrink-0"
              src={image}
              alt={`shoe image ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="flex mt-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="m-1 cursor-pointer"
            onClick={() => handleImageClick(index + 1)}
          >
            <img
              className="w-16 h-16 object-cover"
              src={image}
              alt={`thumbnail ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
