/*
 * Publish/Subscribe Pattern
 */
class PubSub {
  constructor() {
    this.handlers = [];
  }
  //add observer to the list
  subscribe(event, handler, context) {
    if (typeof context === 'undefined') { context = handler; }
    this.handlers.push({ event: event, handler: handler.bind(context) });
  }
  //publish message that will be received by all subscribers
  publish(event, args) {
    this.handlers.forEach(topic => {
      if (topic.event === event) {
        topic.handler(args)
      }
    })
  }
}

/*
 * Simple ChatRoom Class
 * uses the PubSub Class to notify other users when a message is sent.
 */
class ChatRoom {
  constructor() {
    this.pubsub = new PubSub();
    this.pubsub.subscribe('message', this.emitMessage, this);
  }

  emitMessage(msg) {
    console.log('user sent message!', msg);
  }

  sendMessage() {
    this.pubsub.publish('message', 'Hey, how are you?');
  }

}

var room = new ChatRoom();
room.sendMessage();
