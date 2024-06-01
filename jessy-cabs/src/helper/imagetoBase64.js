// // imageToBase64.js
// const imageToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//             resolve(reader.result);
//         };
//         reader.onerror = (error) => {
//             reject(error);
//         };
//         reader.readAsDataURL(file);


//     });
// };




const imageToBase64 = (file, maxSize = 12 * 1024) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                const isPng = file.type === 'image/png';
                let mimeType = isPng ? 'image/png' : 'image/jpeg';
                let quality = isPng ? 1.0 : 0.7; // Initial quality for PNG is 1, JPEG is 0.7

                let width = img.width;
                let height = img.height;

                const scaleDown = () => {
                    // Scale down dimensions
                    const scaleFactor = 0.9; // Reduce dimensions by 10% each step
                    width *= scaleFactor;
                    height *= scaleFactor;
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    // Adjust quality for JPEG images
                    if (!isPng) {
                        quality -= 0.05;
                    }
                };

                const resizeAndCompress = () => {
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    return canvas.toDataURL(mimeType, quality);
                };

                let base64String = resizeAndCompress();

                // Loop to reduce image size below maxSize
                while (base64String.length > maxSize * 1.33) {
                    scaleDown();
                    base64String = resizeAndCompress();

                    if (width < 50 || height < 50 || quality < 0.1) {
                        reject(new Error('Could not compress image to below 12KB'));
                        return;
                    }
                }

                resolve(base64String);
            };

            img.onerror = (error) => {
                reject(error);
            };

            img.src = event.target.result;
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
};

export default imageToBase64;
