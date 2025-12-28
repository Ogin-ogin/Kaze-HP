import { v2 as cloudinary } from 'cloudinary';

// Cloudinaryの設定
if (process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export async function uploadImageToCloudinary(
  fileBuffer: Buffer,
  fileName: string
): Promise<string> {
  // Cloudinaryが設定されているか確認
  if (!process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinaryが設定されていません。環境変数を確認してください。');
  }

  return new Promise((resolve, reject) => {
    // BufferをBase64に変換してアップロード
    const base64File = `data:image/jpeg;base64,${fileBuffer.toString('base64')}`;

    cloudinary.uploader.upload(
      base64File,
      {
        folder: 'kaze-chorus', // Cloudinary内のフォルダ名
        public_id: fileName.replace(/\.[^/.]+$/, ''), // 拡張子を除いたファイル名
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          reject(new Error(`Cloudinaryアップロードエラー: ${error.message}`));
        } else if (result) {
          // 最適化されたURLを返す
          resolve(result.secure_url);
        } else {
          reject(new Error('アップロードに失敗しました'));
        }
      }
    );
  });
}
