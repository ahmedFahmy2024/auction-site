import { useContext, useState, useEffect } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import '../css/myimage.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Myimage({ scraps }) {
    const { locale, setLocale } = useContext(LocalContext);
    const [mainImage, setMainImage] = useState('');

    useEffect(() => {
        if (scraps && scraps.images) {
            const imagesArray = scraps.images.split(',').map(image => image.trim());
            setMainImage(imagesArray[0]);
        }
    }, [scraps]);

    if (!scraps || !scraps.images) return null;

    const imagesArray = scraps.images.split(',').map(image => image.trim());

    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "myimage"].join(" ")}>
            <Swiper
                direction='vertical'
                dir={locale === "en" ? "ltr" : "rtl"}
                slidesPerView={3}
                spaceBetween={30}
                loop={true}
                breakpoints={{
                    768: {
                        slidesPerView: 3,
                    },
                }}
                style={{ height: '400px' }}
            >
                {imagesArray.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="slider-container">
                            <img src={image} alt="" onClick={() => setMainImage(image)} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className='myimage-container'>
                <img src={mainImage} alt="" />
            </div>
        </div>
    );
}
