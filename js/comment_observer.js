class CommentObserver {
  constructor(emoji_counter) {
    this.emoji_counter = emoji_counter;
  };

  startObservation = async () => {
    const comments = document.getElementById('item-offset').firstElementChild;
    const observer = new MutationObserver(() => {
      const message = comments.lastElementChild.querySelector('#message');
      if (message.querySelectorAll('img').length <= 0) return;
      this.emoji_counter.countUp();
    });
    const config = { childList: true };
    observer.observe(comments, config);
  };
}
