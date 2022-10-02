export type ImageModel = File & {
  path?: string;
  preview?: string;
  name?: string;
  type?: string;
  zoomValue?: number;
};

export interface PropsModel<T> {
  onChange?: (args: T) => void
  defaultImage?: T
}