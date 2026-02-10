export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();

    // برای جلوگیری از مشکل CORS در canvas
    img.crossOrigin = "anonymous";

    img.onload = () => {
      resolve(img);
    };

    img.onerror = (err) => {
      reject(new Error("Failed to load image"));
    };

    img.src = src;
  });
}
