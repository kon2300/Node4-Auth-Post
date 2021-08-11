require('dotenv').config()
const { User, Article } = require('../models')

module.exports = {
  postArticle: async (req, res) => {
    await Article.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id,
    })
      .then((user) => {
        res.json({ user })
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
        res.json({ article })
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
      .then((articles) => {
        res.json({ articles })
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
}
