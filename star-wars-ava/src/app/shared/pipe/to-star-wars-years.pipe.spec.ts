import { ToStarWarsYearsPipe } from './to-star-wars-years.pipe';

describe('ToStarWarsYearsPipe', () => {
  it('create an instance', () => {
    const pipe = new ToStarWarsYearsPipe();
    expect(pipe).toBeTruthy();
  });
});
