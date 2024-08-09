/* eslint-disable jsx-a11y/alt-text */
import React, { forwardRef, ImgHTMLAttributes, useState } from 'react';
import images from '~/assets/images'; // Giả sử bạn đang nhập các tài sản hình ảnh

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string | File | undefined;
}

// eslint-disable-next-line react/display-name
const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
    const { src, className, fallbackSrc: imgFallback = images.avatar, ...otherProps } = props;
    const [fallBack, setFallBack] = useState(imgFallback);

    const handleError = () => {
        setFallBack(imgFallback);
    };

    return <img {...otherProps} src={fallBack || src} className={className} ref={ref} onError={handleError} />;
});

export default Image;
