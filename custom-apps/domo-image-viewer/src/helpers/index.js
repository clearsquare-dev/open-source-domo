export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const formatFileSize = (size) => {
  if (size < 1024) {
    return size + " B";
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + " KB";
  } else {
    return (size / (1024 * 1024)).toFixed(2) + " MB";
  }
};