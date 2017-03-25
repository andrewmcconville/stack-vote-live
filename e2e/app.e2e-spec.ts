import { StackVoteLivePage } from './app.po';

describe('stack-vote-live App', () => {
  let page: StackVoteLivePage;

  beforeEach(() => {
    page = new StackVoteLivePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
