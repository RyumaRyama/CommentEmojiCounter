class CommentObserver {
  constructor(emoji_counter) {
    this.emoji_counter = emoji_counter;
  };

  startObservation = () => {
    this.emojiObservation();
    this.eggObservation();
  };

  emojiObservation = () => {
    const comments = document.getElementById('item-offset').firstElementChild;
    const observer = new MutationObserver(() => {
      const message = comments.lastElementChild.querySelector('#message');
      if (message.querySelectorAll('img').length <= 0) return;
      this.emoji_counter.countUp();
    });
    const config = { childList: true };
    observer.observe(comments, config);
  };

  eggObservation = async () => {
    // E.G.G.が使われていれば参照する
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(1000);
    if (!localStorage.getItem('using_egg')) return;

    const gift_window = window.open('', 'gift-viewer');
    const gifts = gift_window.document.getElementById('gift-viewer');
    const observer = new MutationObserver(() => {
      const gift = gifts.lastElementChild;
      let count = 5;
      if (gift !== null)
        count = gift.alt.length;
      this.emoji_counter.countUp(count * 10);
    });
    const config = { childList: true };
    observer.observe(gifts, config);
  };
}
