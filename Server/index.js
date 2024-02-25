const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const secret = 'aswu352tgwefwfw'
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer();
const fs = require('fs');
const axios = require('axios');
const cron = require('node-cron');

app.use(cors({
    // origin: 'http://localhost:5173',
    origin: 'https://express-blog-zeta.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(upload.array());
// app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error',(error)=> console.log(error));
db.once('open',() => console.log('Connected to database'));

// cron.schedule('*/10 * * * *', () => {
//     axios.get('https://blog-application-backend-a9xe.onrender.com/')
//        .then(resonse => {
//          console.log('Server Pinged successfully');
//        })
//        .catch(error => {
//          console.log(error);
//        });
//   })




app.get('/', (req,res) => {
    res.send('Hello Wordld');
})

app.post('/register',async (req,res) => {
    const {username,password} = req.body;
   try {
    const user = await User.create({       
        username,
        password: bcrypt.hashSync(password,salt)
        });
    res.json(user);
    console.log(user);
   } catch (error) {
    console.log(error);
    res.status(404).json({error});
   }
});

app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const user = await User.findOne({username});
    if(!user){
        return res.status(404).json({error:'User not found'});
    }
  const passok = bcrypt.compareSync(password,user.password);
     if(passok) {
      jwt.sign({username,id: user._id},secret,{},(err,token)=> {
        if(err) {
            throw err;
        }else {
            console.log("it goes from here");
            console.log(token);
            res.cookie('token',token,{httpOnly: true, sameSite: "none", secure: true }).json({
                id: user._id,
                username,
                token
            });
        }
      })
     }else {
        res.status(400).json({error:'Password is incorrect'});
     }

})


app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err,info) => {
        if (err) throw err;
        res.json(info);
    })
})

app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
})

app.post('/post', async (req, res) => {
    const { token } = req.cookies;

    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to verify token' });
            return;
        }

        console.log(info.id);

        const { title, summary, content } = req.body;
        console.log(title);
        console.log(summary);
        console.log(content);

        try {
            const PostDoc = await Post.create({
                title,
                summary,
                content,
                author: info.id,
            });
            res.json(PostDoc);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create post' });
        }
    });
});

app.get('/post', async (req,res) => {
    res.json( 
        await Post.find().
        populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20)
        );
})

app.get('/post/:id', async (req,res) => {
    const {id} = req.params;
   const PostDoc = await Post.findById(id).populate('author', ['username']);
   console.log(PostDoc);
   res.json(PostDoc);
})

app.put('/post', async (req,res) => {
    const {token} = req.cookies;
    console.log(req.cookies);
    
    if(!token) {
        return res.status(401).json({error:'You are not logged in'});
    }

    jwt.verify(token, secret, {}, async (err,info) => {
        console.log("Here is the info");
        if (err) {
            console.log("Here is the error");
            console.log(err);
            throw err;
            
        };
        const {id,title,summary,content} = req.body;
        console.log(id);
        console.log(info);
        console.log(title);
        console.log(summary);
        const PostDoc = await Post.findById(id);
        console.log(PostDoc);
        const isAuthor = JSON.stringify(PostDoc.author) === JSON.stringify(info.id);
        if(!isAuthor) {
         return res.status(401).json({error:'you are not the author of this post'});
        }
        await PostDoc.updateOne({
            title,
            summary,
            content
        });

        res.json(PostDoc);
    })

})



app.listen(4000, () => {
    console.log('Server is running on port 4000');
})

module.exports = app;