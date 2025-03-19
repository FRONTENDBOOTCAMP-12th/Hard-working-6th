import path from 'node:path';
import fs from 'fs-extra';
import sharp from 'sharp';

// 입력 폴더
const INPUT = './src/assets/tarot-image';

// 출력 폴더
const OUTPUT = './public/assets/tarot-image';

// 리사이즈 크기
const RESIZE = 600;

fs.ensureDirSync(OUTPUT);

fs.readdir(INPUT, (err, files) => {
  if (err) {
    console.error('디렉토리를 읽는 중 오류 발생:', err);
    return;
  }

  files
    .filter((file) => /.(jpe?g|png|gif|avif|webp)$/.test(file))
    .forEach((file) => {
      const inputFile = path.join(INPUT, file);
      const outputFile = path.join(OUTPUT, file);

      sharp(inputFile)
        .resize(RESIZE)
        .toFile(outputFile, (err, info) => {
          if (err) {
            console.error(`최적화 중 오류 발생: ${inputFile}`, err);
          } else {
            console.log(`최적화 완료: ${outputFile}`);
          }
        });
    });
});
