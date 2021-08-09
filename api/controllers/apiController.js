require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User, Article } = require('../models')

module.exports = {
  createUser: async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    await User.findOrCreate({
      where: { email: req.body.email },
      defaults: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    })
      .then(([user, created]) => {
        if (created) {
          const jwtToken = jwt.sign(
            {
              userid: user.id,
              username: user.name,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: '60m',
            }
          )
          res.json({ jwtToken: jwtToken, id: user.id })
        } else {
          res.json({
            error: '入力されたメールアドレスはすでに使用されています。',
          })
        }
      })
      .catch((error) => {
        res.json({ createError: error })
      })
  },
  isAuthenticated: (req, res) => {
    if (req.isAuthenticated()) {
      const jwtToken = jwt.sign(
        {
          userid: req.user.id,
          username: req.user.name,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '60m',
        }
      )
      res.json({ jwtToken: jwtToken, id: req.user.id })
    } else {
      res.json({ isAuthenticatedError: error })
    }
  },
  verifyToken: async (req, res) => {
    try {
      if (req.headers['authorization']) {
        const bearToken = req.headers['authorization']
        const bearer = bearToken.split(' ')
        const token = bearer[1]
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        res.json({ decoded })
      } else {
        res.json({ tokon: 'faulse' })
      }
    } catch (error) {
      res.json({ verifyError: error })
    }
  },
  postArticle: async (req, res) => {
    await Article.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id,
    })
      .then((user) => {
        res.json({ success: user })
      })
      .catch((error) => {
        res.json({ postArticleError: error })
      })
  },
  editArticle: async (req, res) => {
    await Article.findByPk(req.body.article_id)
      .then((article) => {
        res.json({ article })
      })
      .catch((error) => {
        res.json({ editArticleError: error })
      })
  },
  updateArticle: async (req, res) => {
    await Article.update(
      { title: req.body.title, content: req.body.content },
      { where: { id: req.body.article_id } }
    )
      .then((article) => {
        res.json({ success: article })
      })
      .catch((error) => {
        res.json({ updateArticleError: error })
      })
  },
  showArticles: async (req, res) => {
    await Article.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
      ],
      order: [['updatedAt', 'DESC']],
      attributes: ['id', 'title', 'content', 'createdAt', 'updatedAt'],
    })
      .then((users) => {
        res.json({ users })
      })
      .catch((error) => {
        res.json({ showArticlesError: error })
      })
  },
  removeArticle: async (req, res) => {
    await Article.destroy({ where: { id: req.body.article_id } })
      .then((article) => {
        res.json({ success: article })
      })
      .catch((error) => {
        res.json({ removeArticleError: error })
      })
  },
  logout: (req, res) => {
    req.logout()
    res.json({ logout: 'OK' })
  },
  error: (req, res) => {
    res.json({ error: '入力に誤りがあります。' })
  },
}
