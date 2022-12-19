import MessageListener from './PubSub';

async function main() {
  const messageListener = new MessageListener();
  messageListener.listenForMessages();
}

main();
