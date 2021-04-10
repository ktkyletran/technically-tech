const router = require('express').Router();
const { Blog, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await Blog.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: ['id', 'name'],
      },
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: req.session.logged_in
    });
  }
  catch (err) {
    res.status(400).json("Failed to load dashboard")
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this ID' });
      return;
    }

    res.status(200).json(blogData)
  }
  catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;