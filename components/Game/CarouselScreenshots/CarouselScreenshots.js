import React, { useState } from "react";
import { Image, Modal } from "semantic-ui-react";
import Slider from "react-slick";
import { map } from "lodash";

const settings = {
  className: "carousel-screenshots",
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  swipeToSlider: true,
};

export default function CarouselScreenshots(props) {
  const { title, screenshots } = props;
  const [showModal, setShowModal] = useState(false);
  const [urlImage, setUrlImage] = useState(null);

  const openImagen = (url) => {
    setUrlImage(url);
    setShowModal(true);
  };

  return (
    <>
      <Slider {...settings}>
        {map(screenshots.data, (screenshot) => (
          <Image
            key={screenshot.id}
            src={screenshot.attributes.url}
            alt={screenshot.attributes.name}
            onClick={() => openImagen(screenshot.attributes.url)}
          />
        ))}
      </Slider>
      <Modal open={showModal} onClose={() => setShowModal(false)} size="large">
        <Image src={urlImage} alt={title} />
      </Modal>
    </>
  );
}
