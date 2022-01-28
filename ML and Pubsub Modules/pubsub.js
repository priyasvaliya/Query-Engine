const express = require('express')
const { PubSub } = require('@google-cloud/pubsub');
const app = express()

const pubSubClient = new PubSub({
    projectId: 'serverlessproject-25849'
});

const topicName = 'testtopic2';
const subscriptionName = 'test_subscription';

app.get('/createtopic', async (req, res) => {
  await createTopic();
  res.send('Hello World!');
})


app.get('/createsub', async (req, res) => {
  await createSubscription();
  res.send("Subscription Created");
})


app.post('/sendmsg', async (req, res) => {
  await publishMessage(req.body.message);
  res.send(req.body.message);
})

app.get('/rmsg', async (req, res) => {

  // References an existing subscription
  const subscription = pubSubClient.subscription(subscriptionName);

  // Create an event handler to handle messages

  const messageHandler = message => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);


    message.ack();
    res.send(message.data)
  };

  subscription.on('message', messageHandler);

})



async function createTopic() {
    await pubSubClient.createTopic(topicName);
    console.log(`Topic ${topicName} created.`);
}



async function publishMessage(data) {
    const dataBuffer = Buffer.from(data);

    try {
        const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
        console.log(`Message ${messageId} published.`);
    } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        process.exitCode = 1;
    }
}


async function createSubscription() {

    await pubSubClient.topic(topicName).createSubscription(subscriptionName);
    console.log(`Subscription ${subscriptionName} created.`);
  }




exports.helloWorld = app