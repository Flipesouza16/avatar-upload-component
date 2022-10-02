export type ImageModel = {
  path?: string;
  preview?: string;
  name?: string;
  type?: string;
  zoomValue?: number;
  size?: number
};

export interface PropsModel<T> {
  onChange?: (args: T) => void
  defaultImage?: T
}