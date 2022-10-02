export type ImageModel = File & {
  path?: string;
  preview?: string;
  name?: string;
  type?: string;
  zoomValue?: number;
};