export interface SlicerSupport {
  name: string;
  path: {
    darwin: string;
    win32: string;
    linux: string;
  };
}
