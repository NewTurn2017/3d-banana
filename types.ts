
export enum AppStep {
  SELECT_ASPECT_RATIO = 1,
  CREATE_COMPOSITION = 2,
  UPLOAD_IMAGE = 3,
  GENERATE_IMAGES = 4,
  SHOW_RESULTS = 5,
}

export type AspectRatio = '1:1' | '16:9' | '9:16';
