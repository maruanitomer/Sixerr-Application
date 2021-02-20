import React from 'react'
import FullscreenIcon from '@material-ui/icons/Fullscreen';


export function ImgGallery({ gig, numImgChoosen, onChooseImg, onToggleImgLightbox }) {
    return (
        <>
            <div className="img-details-conatiner" onClick={() => onToggleImgLightbox()}>
                <FullscreenIcon className="full-screen-icon" />
                <img src={gig.imgUrls[numImgChoosen]} alt="" />
            </div>
            <div className="main-imgs-container">
                <div className="imgs-gallery-container flex">
                    {gig.imgUrls.map((imgUrl, idx) => {
                        var className = "img-gallery"
                        if (numImgChoosen === idx) className += " active"
                        return <div key={idx} onClick={() => onChooseImg(idx)} className={className}>
                            <img src={imgUrl} alt="" />
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}


