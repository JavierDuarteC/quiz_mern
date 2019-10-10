require("dotenv/config");
const cors = require("cors");
const bodyParser =require('body-parser');
const express =require('express');

const {models} =require('./models/index');
const {connectDb} =require('./models/index');
const routes =require('./routes');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin('rwieruch'),
  };
  next();
});



app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);


const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Message.deleteMany({}),
    ]);

    createUsersWithMessages();
  }

  var server = app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});


const createUsersWithMessages = async () => {
  const user1 = new models.User({
    username: 'usuario',
  });

  const user2 = new models.User({
    username: 'javito',
  });

  const message1 = new models.Message({
    text: 'Mensaje1',
    user: user1.id,
  });

  const message2 = new models.Message({
    text: 'Mensaje2',
    user: user2.id,
  });

  const message3 = new models.Message({
    text: 'Mensaje3',
    user: user2.id,
  });

  await message1.save();
  await message2.save();
  await message3.save();

  await user1.save();
  await user2.save();
};
