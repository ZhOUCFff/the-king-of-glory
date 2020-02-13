module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')

  const Ad = mongoose.model('Ad')
  const Category = mongoose.model('Category')
  const Article = mongoose.model('Article')
  const Hero = mongoose.model('Hero')
  const Item = mongoose.model('Item')

  app.use('/web/api', router)

  //轮播图接口
  router.get('/ads', async (req, res) => {
    const model = await Ad.find()
    res.send(model)
  })

  //插入新闻数据>>>>>>>>>>>>>>>>>>>>>>

  // router.get('/news/init', async (req, res) => {
  //   const parent = await Category.find().where({ name: '新闻资讯' }).lean()
  //   const cats = await Category.find().where({ parent: parent }).lean()
  //   const newsTitls = ["五岳皮肤研发全纪实丨鼠年限定首曝，还原五岳东方之美", "新版本预告②丨S18荣耀战令更新，昭君新衣抢先看！", "新版本预告①丨S18赛季即将来袭，峡谷调整抢先知", "新皮肤爆料丨脚踏火箭，手持星星！猫鼠组合星际奇妙冒险", "新英雄蒙犽丨子弹分裂转弯，全图支援跟踪导弹！", "1月6日全服不停机更新公告", "【已开服】1月2日抢先服“强者之路”版本更新公告", "1月4日体验服停机更新公告", "1月3日抢先服不停机更新公告", "1月3日体验服停机更新公告", "抢先服新赛季更新 新版本福利等你来拿", "新年有心意 峡谷送好礼", "欢喜迎双旦 暖心好礼邀你峡谷狂欢", "恭喜AG超玩会获得秋季赛总冠军！冠军庆典惊喜不断", "KPL限定皮肤【天狼征服者】全服购买开启公告", "聚有荣耀！冬冠团聚夜今日18:00正式开启，观看直播赢团聚机票", "QGhappy夺得冰凤凰杯成为“五冠王”，王者荣耀冬季冠军杯广州完美落幕", "王者荣耀冬季冠军杯总决赛今日17:30开战，观赛赢貂蝉FMVP永久皮肤！", "校园共创，第六届王者荣耀高校联赛主题曲《王者少年英雄梦》强势来袭！", "高校自制57S动画短片：见证历届高校联赛荣耀时刻！"]
  //   const newsList = newsTitls.map(title => {
  //     const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
  //     return {
  //       title,
  //       cate: randomCats.slice(0, 2)
  //     }
  //   })
  //   await Article.deleteMany({})
  //   await Article.insertMany(newsList)
  //   res.send(newsList)
  // })

  //新闻数据接口
  router.get('/news', async (req, res) => {

    //普通populate查询>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // const parent = await Category.findOne({
    //   name: '新闻资讯'
    // }).populate({
    //   path: 'children',
    //   populate: {
    //     path: 'news_list'
    //   }
    // }).lean()

    //聚合查询>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const parent = await Category.findOne({ name: '新闻资讯' })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'cate',
          as: 'news_list'
        }
      },
      {
        $addFields: {
          news_list: { $slice: ['$news_list', 5] }
        }
      }
    ])
    subCates = cats.map(item => {
      return item._id
    })
    // 在最前面插入热门分类
    cats.unshift({
      name: '热门',
      news_list: await Article.find().populate('cate').where({
        cate: { $in: subCates }
      }).limit(5).lean()
    })
    //判断分类是否为热门，如果为热门，则直接取该分类名
    cats.map(cat => {
      cat.news_list.map(news => {
        news.cate_name = cat.name === '热门' ? news.cate[0].name : cat.name
        return news
      })
      return cat
    })
    res.send(cats)
  })

  //插入英雄数据>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // router.get('/heros/init', async (req, res) => {
  // const data = [
  //   {
  //     "name": "战士",
  //     "hero_list": [
  //       {
  //         "name": "赵云",
  //         "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"
  //       },
  //       {
  //         "name": "墨子",
  //         "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"
  //       },
  //       {
  //         "name": "钟无艳",
  //         "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"
  //       }
  //     ]
  //   }
  // ]

  //   const Heros = []
  //   for (let cate of data) {
  //     if (cate.name !== '热门') {
  //       const currentCate = await Category.find({ name: cate.name })
  //       const heroList = cate.hero_list.map(hero => {
  //         return {
  //           name: hero.name,
  //           avatar: hero.avatar,
  //           cate: currentCate
  //         }
  //       })
  //       Heros.push(...heroList)
  //     }
  //   }
  //   await Hero.deleteMany({})
  //   await Hero.insertMany(Heros)
  //   res.send(Heros)
  // })

  // 英雄列表数据请求接口
  router.get('/heros', async (req, res) => {
    // const cates = await Category.findOne({
    //   name: '英雄列表'
    // }).populate({
    //   path: 'children'
    // }).lean()

    const parent = await Category.findOne({ name: '英雄列表' })
    const cates = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'heros',
          localField: '_id',
          foreignField: 'cate',
          as: 'hero_list'
        }
      }
    ])
    const subCates = cates.map(cate => cate._id)
    cates.unshift({
      name: '热门',
      hero_list: await Hero.find().where({
        cate: { $in: subCates }
      }).limit(10).lean()
    })
    res.send(cates)
  })

  //根据id获取文章详情
  router.get('/article/:id', async (req, res) => {
    const model = await Article.findById(req.params.id).lean()
    model.related = await Article.find().where({
      cate: { $in: model.cate }
    }).skip(1).limit(2)
    res.send(model)
  })

  // 根据id获取单个英雄数据
  router.get('/hero/:id', async (req, res) => {
    res.send(await Hero.findById(req.params.id).populate('cate downWind.equipment upWind.equipment partners.hero restrained.hero restraint.hero'))
  })

}