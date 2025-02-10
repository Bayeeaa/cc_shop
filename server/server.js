require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const app = express();
const port = 3000;

// 允许跨域请求
app.use(cors());
app.use(bodyParser.json());

// 连接 MySQL 数据库
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('数据库连接失败:', err);
        return;
    }
    console.log('✅ 数据库连接成功');
});

// 处理用户注册请求
app.post('/register', async (req, res) => {
    const { name, password } = req.body;

    // 先检查用户名是否已存在
    const checkUserQuery = 'SELECT * FROM users WHERE name = ?';
    db.query(checkUserQuery, [name], async (err, results) => {
        if (err) return res.status(500).json({ message: '服务器错误' });

        if (results.length > 0) {
            return res.status(400).json({ message: '用户名已存在' });
        }

        // 哈希密码
        const hashedPassword = await bcrypt.hash(password, 10);

        // 插入数据库
        const insertQuery = 'INSERT INTO users (name, password) VALUES (?, ?)';
        db.query(insertQuery, [name, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ message: '注册失败' });

            res.status(201).json({ message: '注册成功' });
        });
    });
});

// 登录接口
app.post('/login', (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ message: '用户名和密码不能为空' });
    }

    const query = 'SELECT * FROM users WHERE name = ?';
    db.query(query, [name], (err, result) => {
        if (err) {
            console.error('查询错误:', err);
            return res.status(500).json({ message: '服务器错误' });
        }

        if (result.length === 0) {
            return res.status(400).json({ message: '用户名不存在' });
        }

        // 验证密码
        const user = result[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('密码验证错误:', err);
                return res.status(500).json({ message: '服务器错误' });
            }

            if (!isMatch) {
                return res.status(400).json({ message: '密码错误' });
            }

            // 生成 JWT Token
            const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // 返回成功的响应
            res.status(200).json({
                message: '登录成功',
                token: token
            });
        });
    });
});

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
        return res.status(403).json({ message: "Invalid token" });
        }
        req.user = user; // 在请求对象中存储用户信息
        next();
    });
};
  
  // 获取当前用户信息接口
app.get('/currentUser', authenticateToken, (req, res) => {
    // 从 token 中获取用户信息
    const userId = req.user.id;  // userId 是从 token 中提取的
    const userName = req.user.name;  // 假设用户名保存在 token 的 payload 中
  
    // 如果 token 中没有用户名，则从数据库中查询
    if (!userName) {
      const query = 'SELECT name FROM users WHERE id = ?';
      db.query(query, [userId], (err, results) => {
        if (err) {
          return res.status(500).json({ message: '服务器错误' });
        }
  
        if (results.length === 0) {
          return res.status(404).json({ message: '用户未找到' });
        }
  
        // 返回用户名
        const username = results[0].name;
        res.json({ username });
      });
    } else {
      // 如果 token 中有用户名，直接返回
      res.json({ username: userName });
    }
});

router.put('/updateUserInfo', authenticateToken, (req, res) => {
    const { sex, birth, infomation } = req.body;
    const username = req.username;
  
    const sql = 'UPDATE users SET sex = ?, birth = ?, infomation = ? WHERE name = ?';
    db.query(sql, [sex, birth, infomation, username], (err, result) => {
      if (err) {
        return res.status(500).json({ message: '数据库更新失败', error: err });
      }
      res.json({ message: '用户信息更新成功' });
    });
  });
  
module.exports = router;

app.listen(port, () => {
    console.log(`🚀 服务器运行在 http://localhost:${port}`);
});
