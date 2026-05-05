import { MaxUploadSizeGuard } from './max-upload-size.guard';

describe('MaxUploadSizeGuard', () => {
  it('should be defined', () => {
    expect(new MaxUploadSizeGuard()).toBeDefined();
  });
});
