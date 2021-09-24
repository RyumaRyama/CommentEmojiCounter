const main = async () => {
  const emoji_count_viewer = new EmojiCountViewer();
  const comment_observer = new CommentObserver(emoji_count_viewer);

  await comment_observer.startObservation();
}

main();
