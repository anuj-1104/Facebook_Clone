 export  const getImageGridClass = (imageCount) => {
    if (imageCount === 1) return "grid-cols-1 item-center";
    if (imageCount === 2) return "grid-cols-2";
    if (imageCount === 3) return "grid-cols-3";
    if (imageCount === 4) return "grid-cols-2";
    return "grid-cols-2 sm:grid-cols-3";
  };