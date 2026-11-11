import sharp from 'sharp';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  console.log(
    'Tässä välissä älä tee muuta kuin tallenna thumbnail ja sitten next (async / await)'
  );
  console.log(req.file.path);
  // TODO: use file path to create 160x160 png thumbnail with sharp
  try {
    await sharp(req.file.path)
      .resize(160, 160)
      .png()
      .toFile(`uploads/${req.file.filename}_thumb.png`);

    next();
  } catch (error) {
    next(error);
  }
};

export {createThumbnail};
