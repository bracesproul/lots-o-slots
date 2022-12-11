import MessageListener from './PubSub';

const listener = new MessageListener();
listener.watch().then(() => {
  console.log('Watch re-initialized!');
});
