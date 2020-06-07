module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')
  const Category = mongoose.model('Category')
  const Strategy = mongoose.model('Strategy')

  app.use('/web/api', router)

  router.get('/heros', async (req, res) => {
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
    res.send(cates)
  })

  // router.get('/strategy/init', async (req, res) => {
  //   const data = [{ "title": "【王者克制论】一骑当千，杀敌如探囊取物？李九教你完美克制关羽", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=609164&e_code=pvpweb_m.statictypenew.type587", "img": "https://itea-cdn.qq.com/file/tgl/2020042214/53873bcaec5c3fe56e9d681410452d30.1587538275.ecba2b7520c79058430c2c27302cd93d.230x140_41610.jpg", "play_volume": 2228000, "time": "06:26" }, { "title": "【王者克制论】无视地形，制霸峡谷？李九教你完美克制云中君", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=607052&e_code=pvpweb_m.statictypenew.type587", "img": "https://img.crawler.qq.com/lolwebvideo/0/71f17796f6b063fa33520942133e60a01587015247/0/", "play_volume": 4753000, "time": "05:47" }, { "title": "【王者克制论】崭露锋芒，无线位移？李九教你完美克制新英雄镜", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=602861&e_code=pvpweb_m.statictypenew.type587", "img": "https://itea-cdn.qq.com/file/tgl/2020040117/fc03efaba6a1fe9db8ebc33d0fd5c441.1585735036.8e1e4096f953a98395770e2b43acc973.686x385_209600.jpg", "play_volume": 4579000, "time": "05:32" }, { "title": "【王者克制论】嚣狂之镰，钩钩夺魂？李九教你完美克制百里玄策", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=600704&e_code=pvpweb_m.statictypenew.type587", "img": "https://itea-cdn.qq.com/file/tgl/2020032516/53873bcaec5c3fe56e9d681410452d30.1585126492.53ff77743e1bd1b4a17daf9d634d0a11.230x140_43423.jpg", "play_volume": 4449000, "time": "09:50" }, { "title": "【王者克制论】峡谷插秧王，来无影去无踪？李九教你完美克制马超", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=598572&e_code=pvpweb_m.statictypenew.type587", "img": "https://itea-cdn.qq.com/file/tgl/2020031822/53873bcaec5c3fe56e9d681410452d30.1584542847.ae99efc6ca0bbcdc3ef3b6309e421265.230x140_40213.jpg", "play_volume": 4526000, "time": "07:39" }, { "title": "【王者克制论】野区乱不乱，大圣说了算？李九教你完美克制孙悟空", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=596661&e_code=pvpweb_m.statictypenew.type587", "img": "https://itea-cdn.qq.com/file/tgl/2020031116/53873bcaec5c3fe56e9d681410452d30.1583916718.e2ed8ac7c18aed051b2259a790c81352.230x140_44077.jpg", "play_volume": 4463000, "time": "06:00" }, { "title": "【王者克制论】站撸霸主，一打五？李九教你完美克制站桩射手", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=594720&e_code=pvpweb_m.statictypenew.type588", "img": "https://itea-cdn.qq.com/file/tgl/20200304/53873bcaec5c3fe56e9d681410452d30.1583330174.ff46bee6e5a5198879fed0ce66624866.230x140_43188.jpg", "play_volume": 4462000, "time": "06:50" }, { "title": "【王者克制论】打不死来又难缠？李九教你完美克制弱化流", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=592944&e_code=pvpweb_m.statictypenew.type588", "img": "https://itea-cdn.qq.com/file/tgl/20200227/53873bcaec5c3fe56e9d681410452d30.1582782497.d4408c8c7c1e93a587a489218f2d1afc.230x140_42564.jpg", "play_volume": 4540000, "time": "05:34" }, { "title": "【王者克制论】万箭齐发伤害爆表？李九教你完美克制T0法师嬴政", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=591036&e_code=pvpweb_m.statictypenew.type587", "img": "https://itea-cdn.qq.com/file/tgl/20200219/53873bcaec5c3fe56e9d681410452d30.1582125542.617b1066f513256e6a2c6c6420595616.230x140_43369.jpg", "play_volume": 4692000, "time": "04:37" }, { "title": "【王者克制论】天外飞钩，钩钩致命？李九教你完美克制神钩钟馗", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=589366&e_code=pvpweb_m.statictypenew.type587", "img": "https://itea-cdn.qq.com/file/tgl/20200212/53873bcaec5c3fe56e9d681410452d30.1581501239.0149d243c4699d8cdc6a7bd6e78db3ee.230x140_46217.jpg", "play_volume": 5879000, "time": "04:38" }, { "title": "【王者克制论】边路战神一戟真伤？李九教你完美克制砍王吕布", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=588025&e_code=pvpweb_m.statictypenew.type588", "img": "https://itea-cdn.qq.com/file/tgl/20200205/53873bcaec5c3fe56e9d681410452d30.1580895350.18695fcec04739780c7696b82ff638f8.230x140_45203.jpg", "play_volume": 5845000, "time": "05:03" }, { "title": "【王者克制论】老牌野王非扳即选？李九教你完美克制李白", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=584824&e_code=pvpweb_m.statictypenew.type587", "img": "https://itea-cdn.qq.com/file/tgl/20200120/53873bcaec5c3fe56e9d681410452d30.1579506536.d8d988f6837b72c7bdcadcd39a926f6c.230x140_42938.jpg", "play_volume": 4359000, "time": "05:17" }, { "title": "【王者克制论】弹弹弹又粘又烦人？李九教你完美克制团控女神甄姬", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=584977&e_code=pvpweb_m.statictypenew.type588", "img": "https://itea-cdn.qq.com/file/tgl/20200120/53873bcaec5c3fe56e9d681410452d30.1579535284.244a2a3ac22cc46aedf101c98e0c15ea.230x140_49626.jpg", "play_volume": 6023000, "time": "06:00" }, { "title": "【王者克制论】炮台法师一箭穿心？李九教你完美克制干将莫邪", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=583458&e_code=pvpweb_m.statictypenew.type587", "img": "https://itea-cdn.qq.com/file/tgl/20200115/53873bcaec5c3fe56e9d681410452d30.1579093310.c60eebd16f695d896c8d9727e5498e22.230x140_44546.jpg", "play_volume": 4961000, "time": "05:36" }, { "title": "【王者克制论】新英雄自带追踪？李九教你完美克制蒙犽", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=581719&e_code=pvpweb_m.statictypenew.type587", "img": "https://itea-cdn.qq.com/file/tgl/20200108/53873bcaec5c3fe56e9d681410452d30.1578479742.6dff227b4a43a46bd24c3c8bf52b098b.230x140_46648.jpg", "play_volume": 191000, "time": "04:47" }, { "title": "【王者克制论】增益型辅助太暴力？李九教你完美克制增益型辅助", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=580342&e_code=pvpweb_m.statictypenew.type588", "img": "https://itea-cdn.qq.com/file/tgl/20200102/53873bcaec5c3fe56e9d681410452d30.1577975703.97425e48451003132d30219b23b8225d.230x140_42760.jpg", "play_volume": 140000, "time": "07:34" }, { "title": "【王者克制论】无伤越塔太凶悍？李九教你完美克制芈月", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=578379&e_code=pvpweb_m.statictypenew.type588", "img": "https://itea-cdn.qq.com/file/tgl/20191225/53873bcaec5c3fe56e9d681410452d30.1577264788.4698e2884ce51ca1896df0c9fd0521c1.230x140_43599.jpg", "play_volume": 180000, "time": "04:31" }, { "title": "【王者克制论】移动泉水奶到你发慌？李九教你完美克制蔡文姬", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=575491&e_code=pvpweb_m.statictypenew.type587", "img": "https://itea-cdn.qq.com/file/tgl/20191211/53873bcaec5c3fe56e9d681410452d30.1576071212.8e6a6bb08a9733d4fca76b8ff96e2c11.230x140_39344.jpg", "play_volume": 154000, "time": "04:32" }, { "title": "【王者克制论】曹三刀丝血反杀太霸道？李九教你完美克制曹操", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=574314&e_code=pvpweb_m.statictypenew.type587", "img": "https://itea-cdn.qq.com/file/tgl/20191205/53873bcaec5c3fe56e9d681410452d30.1575515228.9709ee46fe3e77ce42d027339f038d77.230x140_38347.jpg", "play_volume": 174000, "time": "04:56" }, { "title": "【王者克制论】对线遇新英雄束手无策？李九教你完美克制鲁班大师", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=572755&e_code=pvpweb_m.statictypenew.type587", "img": "https://itea-cdn.qq.com/file/tgl/20191128/53873bcaec5c3fe56e9d681410452d30.1574912684.91dcefb78154c452ef3a141af46d731b.230x140_38722.jpg", "play_volume": 165000, "time": "05:32" }, { "title": "【王者克制论】草丛阴人太无敌？李九教你完美克制安琪拉", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=571587&e_code=pvpweb_m.statictypenew.type588", "img": "https://itea-cdn.qq.com/file/tgl/20191122/53873bcaec5c3fe56e9d681410452d30.1574400412.42d8c67919caea7732306981e8e37e27.230x140_43604.jpg", "play_volume": 213000, "time": "05:39" }, { "title": "【王者克制论】神出鬼没太无敌？李九教你完美克制司马懿", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=569788&e_code=pvpweb_m.statictypenew.type588", "img": "https://itea-cdn.qq.com/file/tgl/20191113/53873bcaec5c3fe56e9d681410452d30.1573628368.4248ef44e4559fd7b6532f36879bb448.230x140_41444.jpg", "play_volume": 149000, "time": "05:46" }, { "title": "【王者克制论】不做狼狗嘴边肉，李九教你克制高胜率射手成吉思汗", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=566826&e_code=pvpweb_m.statictypenew.type588", "img": "https://itea-cdn.qq.com/file/tgl/20191031/53873bcaec5c3fe56e9d681410452d30.1572500771.7889203312eb436162c3fb17bf11b556.230x140_42191.jpg", "play_volume": 191000, "time": "05:25" }, { "title": "【王者克制论】新版本来袭！李九教你全面克制T1射手公孙离", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=564954&e_code=pvpweb_m.statictypenew.type587", "img": "https://itea-cdn.qq.com/file/tgl/20191023/eca1c85662adb6952202ad3080d69623.1571844136.d968f911e7c1500fbb321679fb515310.230x140_8664.jpg", "play_volume": 248000, "time": "05:25" }, { "title": "【王者克制论】上天入地韩跳跳，教你技巧来压倒", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=561028&e_code=pvpweb_m.statictypenew.type587", "img": "https://itea-cdn.qq.com/file/tgl/20191009/53873bcaec5c3fe56e9d681410452d30.1570608389.c0d724d482255fc3912e801693f5cba7.230x140_8523.jpg", "play_volume": 291000, "time": "04:43" }, { "title": "【王者克制论】克制西施小技巧，抗衡沉鱼美人计", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=558702&e_code=pvpweb_m.statictypenew.type588", "img": "https://itea-cdn.qq.com/file/tgl/20190930/53873bcaec5c3fe56e9d681410452d30.1569833477.81ca57ea563f89315432a2e6d508105a.230x140_7673.jpg", "play_volume": 127000, "time": "05:05" }, { "title": "【王者克制论】T1中路诸葛亮 全面克制没商量", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=557231&e_code=pvpweb_m.statictypenew.type588", "img": "https://itea-cdn.qq.com/file/tgl/20190925/53873bcaec5c3fe56e9d681410452d30.1569399425.15ffb53e35713004ad9de01618210e83.230x140_9502.jpg", "play_volume": 156000, "time": "05:12" }, { "title": "【王者克制论】扼杀马超骚走位 枪王折戟秒成渣", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=553219&e_code=pvpweb_m.statictypenew.type588", "img": "https://itea-cdn.qq.com/file/tgl/20190910/53873bcaec5c3fe56e9d681410452d30.1568101583.169a4261270f4a76233040ba4861c127.230x140_9295.jpg", "play_volume": 76000, "time": "06:00" }, { "title": "【王者克制论】长腿虞姬打不过？李九教你全面压制！", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=549670&e_code=pvpweb_m.statictypenew.type0", "img": "https://itea-cdn.qq.com/file/tgl/20190829/53873bcaec5c3fe56e9d681410452d30.1567068249.c133d2f4a5e8400a7803ae67d72cadbe.230x140_27260.jpg", "play_volume": 281000, "time": "06:07" }, { "title": "【王者克制论】橘右京无解？李九教你夺刀切橘子！", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=545590&e_code=pvpweb_m.statictypenew.type623", "img": "https://itea-cdn.qq.com/file/tgl/20190814/53873bcaec5c3fe56e9d681410452d30.1565751673.7f48af494a57b160371a6476e5d9193a.230x140_26615.jpg", "play_volume": 132000, "time": "05:07" }, { "title": "【王者克制论】完美克制米莱狄！女王秒变小猫咪", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=541620&e_code=pvpweb_m.statictypenew.type0", "img": "https://itea-cdn.qq.com/file/tgl/20190801/53873bcaec5c3fe56e9d681410452d30.1564638741.a6f6f8c3b136a9fe6e02c5f30cc14fd2.230x140_26387.jpg", "play_volume": 326000, "time": "04:54" }, { "title": "【王者克制论】孙策克制全解析峡谷漂移飙车王在线翻船没商量", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=536331&e_code=pvpweb_m.statictypenew.type0", "img": "https://itea-cdn.qq.com/file/tgl/20190716/53873bcaec5c3fe56e9d681410452d30.1563261488.ff77f33093568d9726458af16d9fafb4.230x140_24659.jpg", "play_volume": 200000, "time": "04:30" }, { "title": "【王者克制论】曜克制解析 先发控人擒纵自如 学会就能为所欲为", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=531777&e_code=pvpweb_m.statictypenew.type677", "img": "https://itea-cdn.qq.com/file/tgl/20190702/53873bcaec5c3fe56e9d681410452d30.1562060274.cd7894b6c243c4b726e06d83115f53f2.230x140_23619.jpg", "play_volume": 307000, "time": "03:58" }, { "title": "【王者克制论】沈梦溪克制解析 看完秒变拆弹专家 铲屎都有底气", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=528197&e_code=pvpweb_m.statictypenew.type677", "img": "https://itea-cdn.qq.com/file/tgl/20190620/53873bcaec5c3fe56e9d681410452d30.1561021335.57fe51d58a64819b96f4760e634e21ef.230x140_28597.jpg", "play_volume": 135000, "time": "04:48" }, { "title": "【王者克制论】第37期：李九教你全面克制孙尚香", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=523549&e_code=pvpweb_m.statictypenew.type677", "img": "https://itea-cdn.qq.com/file/tgl/20190605/daa9ee6d8d2af2c4495d17df674c3c89.1559714900.c430058648740702e6f19c8fbb39e456.960x600_204376.jpg", "play_volume": 4421000, "time": "05:14" }, { "title": "【王者克制论】第36期：李九教你全面克制云中君", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=519026&e_code=pvpweb_m.statictypenew.type677", "img": "https://itea-cdn.qq.com/file/tgl/20190522/daa9ee6d8d2af2c4495d17df674c3c89.1558506469.5001e15268577fdab2506514ed43cdbb.960x600_201538.jpg", "play_volume": 199000, "time": "06:54" }, { "title": "【王者克制论】第35期：李九教你全面克制狂暴形态李信", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=514123&e_code=pvpweb_m.statictypenew.type677", "img": "https://itea-cdn.qq.com/file/tgl/20190508/daa9ee6d8d2af2c4495d17df674c3c89.1557288075.fd5eea91e3d124c27c6cb06599ee7921.960x600_219815.jpg", "play_volume": 215000, "time": "06:09" }, { "title": "【王者克制论】第34期：李九教你全面克制新英雄·瑶", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=507436&e_code=pvpweb_m.statictypenew.type677", "img": "https://itea-cdn.qq.com/file/tgl/20190424/daa9ee6d8d2af2c4495d17df674c3c89.1556091001.a1d84bb066f6b44f0be942a4f070e37d.960x600_168041.jpg", "play_volume": 112000, "time": "06:55" }, { "title": "【王者克制论】第33期：李九教你全面克制王昭君", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=503049&e_code=pvpweb_m.statictypenew.type677", "img": "https://shp.qpic.cn/cfwebcap/0/e19abe6bd30bb7ef3dac735596a135e9/0/?width=230&height=140", "play_volume": 135000, "time": "05:37" }, { "title": "【王者克制论】第32期：李九教你全面克制射手体系", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=499441&e_code=pvpweb_m.statictypenew.type677", "img": "https://itea-cdn.qq.com/file/tgl/20190327/daa9ee6d8d2af2c4495d17df674c3c89.1553668272.577d5fb3c1ebe8f11604a916e6993197.960x600_286652.jpg", "play_volume": 334000, "time": "05:25" }, { "title": "【王者克制论】第31期：李九教你全面克制盘古", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=495432&e_code=pvpweb_m.statictypenew.type677", "img": "https://itea-cdn.qq.com/file/tgl/20190306/daa9ee6d8d2af2c4495d17df674c3c89.1551844817.18850ab6480b6616b155e0dc26e6ba68.960x600_235177.jpg", "play_volume": 114000, "time": "05:14" }, { "title": "【王者克制论】第30期：李九教你全面克制猪八戒", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=492311&e_code=pvpweb_m.statictypenew.type677", "img": "https://itea-cdn.qq.com/file/tgl/20190220/daa9ee6d8d2af2c4495d17df674c3c89.1550658027.2b6a6032a6ece6d3253bdf637d2d89ce.960x600_202959.jpg", "play_volume": 306000, "time": "04:28" }, { "title": "【王者克制论】第29期：李九教你全面克制嫦娥", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=478996&e_code=pvpweb_m.statictypenew.type677", "img": "https://itea-cdn.qq.com/file/tgl/20190131/daa9ee6d8d2af2c4495d17df674c3c89.1548922311.f3a72db107c72fd851ae65fed4debc35.960x600_187919.jpg", "play_volume": 349000, "time": "04:04" }, { "title": "【王者克制论】第28期：李九教你全面克制上官婉儿", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=477775&e_code=pvpweb_m.statictypenew.type616", "img": "https://itea-cdn.qq.com/file/tgl/20190123/75f40321a9355fa58957f5b688dd1ac8.1548213983.b4fc3a4758249b5e3788fecc702614ad.960x500_88011.jpg", "play_volume": 352000, "time": "03:52" }, { "title": "王者克制论 第27期：李九教你全面克制伽罗", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=473212&e_code=pvpweb_m.statictypenew.type677", "img": "https://puui.qpic.cn/vpic/0/n0825fyud67.png/0", "play_volume": 10814000, "time": "03:49" }, { "title": "王者克制论 第26期：李九教你全面克制四保一战术", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=467792&e_code=pvpweb_m.statictypenew.type0", "img": "https://itea-cdn.qq.com/file/tgl/20181227/75f40321a9355fa58957f5b688dd1ac8.1545883038.7fe686b6e61bcd115435690ede5564d7.960x500_88787.jpg", "play_volume": 415000, "time": "04:34" }, { "title": "【王者克制论】 第25期：李九教你全面克制盾山", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=458997&e_code=pvpweb_m.statictypenew.type676", "img": "https://itea-cdn.qq.com/file/tgl/20181212/07debd460de09ba3509d91f1bc922f40.1544613089.5406c171c77f416445c6f972f2739b62.750x422_36718.jpg", "play_volume": 386000, "time": "04:21" }, { "title": "【王者克制论】 第24期：李九教你全面克制娜可露露", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=453006&e_code=pvpweb_m.statictypenew.type677", "img": "https://itea-cdn.qq.com/file/tgl/20181128/07debd460de09ba3509d91f1bc922f40.1543376594.4a744cb87293752186117f8363b32d08.750x422_55114.jpg", "play_volume": 423000, "time": "04:37" }, { "title": "【王者克制论】 第23期：李九教你全面克制老夫子", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=449441&e_code=pvpweb_m.statictypenew.type0", "img": "https://itea-cdn.qq.com/file/tgl/20181114/1d234e823dae91a0ba8f5ca7bcbff460.1542199132.bb6f75401638baa4790179559adb9bd6.670x320_51649.jpg", "play_volume": 910000, "time": "05:00" }, { "title": "【王者克制论】第22期：李九教你全面克制干将莫邪", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=446072&e_code=pvpweb_m.statictypenew.type619", "img": "https://itea-cdn.qq.com/file/tgl/20181031/07debd460de09ba3509d91f1bc922f40.1540980969.2800c48e92e01d5e65864b8c43e875bb.750x422_42493.jpg", "play_volume": 3683000, "time": "05:11" }, { "title": "【王者克制论】第21期：李九教你全面克制马可波罗", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=441035&e_code=pvpweb_m.statictypenew.type0", "img": "https://itea-cdn.qq.com/file/tgl/20181018/53873bcaec5c3fe56e9d681410452d30.1539864729.7b645526b2d074d25048f12d11cc5d4e.230x140_29558.jpg", "play_volume": 3975000, "time": "05:57" }, { "title": "【王者克制论】第20期：李九教你全面克制达摩", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=435386&e_code=pvpweb_m.statictypenew.type819", "img": "https://itea-cdn.qq.com/file/tgl/20181003/07debd460de09ba3509d91f1bc922f40.1538558182.08585cdee3904c32b09163c8dc95c576.750x422_50367.jpg", "play_volume": 3670000, "time": "06:20" }, { "title": "【王者克制论】第19期：李九教你全面克制鬼谷子", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=431146&e_code=pvpweb_m.statictypenew.type676", "img": "https://itea-cdn.qq.com/file/tgl/20180919/900x500.1537349088.c2e6a85ccf849127737fa6a8e0325c8c.900x500_75818.jpg", "play_volume": 3702000, "time": "06:50" }, { "title": "【王者克制论】第18期：李九教你全面克制白起", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=418403&e_code=pvpweb_m.statictypenew.type677", "img": "https://itea-cdn.qq.com/file/tgl/20180905/3d8f20bcdd5905a086795b99b523b2a1.1536143019.ba5413fb09e2bae86e3e3bdc26dd33c8.750x422_58076.jpg", "play_volume": 3259000, "time": "06:56" }, { "title": "【王者克制论】第16期：李九教你全面克制狂战典韦", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=391827&e_code=pvpweb_m.statictypenew.type623", "img": "https://itea-cdn.qq.com/file/tgl/20180808/750x422.1533723934.a621f2d959d073a21c5c476cbccd933a.750x422_50143.jpg", "play_volume": 3499000, "time": "09:50" }, { "title": "【王者克制论】第15期：李九教你全面克制中单霸主张良", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=383068&e_code=pvpweb_m.statictypenew.type677", "img": "https://itea-cdn.qq.com/file/tgl/20180725/230x140.1532492518.17238f554101747bf4c2b1d3a19c3616.230x140_38506.jpg", "play_volume": 3805000, "time": "10:36" }, { "title": "【王者克制论】第14期：李九教你全面克制元歌", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=374509&e_code=pvpweb_m.statictypenew.type627", "img": "https://itea-cdn.qq.com/file/tgl/20180711/QQ20180711173118.1531301490.fe2029c2d9e76fac286322bca5c375f5.750x422_32298.jpg", "play_volume": 3962000, "time": "13:34" }, { "title": "【王者克制论】第13期：天生克制关羽的三大英雄", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=366895&e_code=pvpweb_m.statictypenew.type623", "img": "https://itea-cdn.qq.com/file/tgl/20180627/230x140.1530097610.8c9dc266097342cea89f89abaef7cd97.230x140_14255.jpg", "play_volume": 3516000, "time": "12:29" }, { "title": "【王者克制论】第12期：东皇太一的三个最强克星", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=365279&e_code=pvpweb_m.statictypenew.type839", "img": "https://itea-cdn.qq.com/file/tgl/20180613/750x4221.1528884534.b1ff5f418d441596488bd5b0820b964e.750x422_45966.jpg", "play_volume": 3096000, "time": "12:44" }, { "title": "【王者克制论】第11期：套路克制花木兰双剑形态", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=363760&e_code=pvpweb_m.statictypenew.type627", "img": "https://itea-cdn.qq.com/file/tgl/20180531/230x140.1527752896.f8c58e1b6f67799bfeb7fa6605b47b27.230x140_13667.jpg", "play_volume": 3874000, "time": "11:44" }, { "title": "【王者克制论】第10期：克制峡谷最强单挑王铠", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=362142&e_code=pvpweb_m.statictypenew.type819", "img": "https://shp.qpic.cn/cfwebcap/1546387229/188069b1214e89b24cef192500b4a621/0/?width=230&height=140", "play_volume": 4633000, "time": "08:37" }, { "title": "【王者克制论】特别篇：五五开黑节，克制强势团战阵容", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=279069&e_code=pvpweb_m.statictypenew.type819", "img": "https://itea-cdn.qq.com/file/tgl/20180501/230x140.1525172063.061d55799772934226e1ac972948eb47.230x140_13130.jpg", "play_volume": 3429000, "time": "10:30" }, { "title": "【王者克制论】第8期：轻松应对裴擒虎双形态切换", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=246656&e_code=pvpweb_m.statictypenew.type627", "img": "https://itea-cdn.qq.com/file/tgl/20180418/750x4221.1524034974.eb36d5f0e02138f1ee756ada1bd627ce.750x422_34985.jpg", "play_volume": 2818000, "time": "10:45" }, { "title": "【王者克制论】第7期：教你克制神奇女侠雅典娜", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=245430&e_code=pvpweb_m.statictypenew.type819", "img": "https://itea-cdn.qq.com/file/tgl/20180404/230x140.1522852016.6f81e7bd06cda1e84554cdd49ac738ca.234x140_13475.jpg", "play_volume": 2515000, "time": "10:45" }, { "title": "【王者克制论】第6期：制裁隐于暗夜的刺客阿轲", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=243786&e_code=pvpweb_m.statictypenew.type0", "img": "https://itea-cdn.qq.com/file/tgl/20180321/750x4221.1521609369.17738a7d7ad7c1f707ea4fc13da692b9.750x422_38993.jpg", "play_volume": 2611000, "time": "11:26" }, { "title": "【王者克制论】VOL.2：你的貂蝉不可能秀的过我", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=229592&e_code=pvpweb_m.statictypenew.type0", "img": "https://itea-cdn.qq.com/file/tgl/20180124/Q750422.1516755685.58c2acdde6d35fa3bcbf336f5e6a0395.750x422_29058.jpg", "play_volume": 2184000, "time": "13:02" }, { "title": "【王者克制论】VOL.1：我有一万种方法吊打你的兰陵王", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=218928&e_code=pvpweb_m.statictypenew.type627", "img": "https://itea-cdn.qq.com/file/tgl/20180109/230x140.1515487616.60a1e57b8b3c04b0d59429fe4d234c9b.230x140_14214.jpg", "play_volume": 1693000, "time": "12:06" }]
  //   const cate = await Category.find({ name: "王者麦炸了" })
  //   const _data = data.map(item => {
  //     return {
  //       title: item.title,
  //       url: item.url,
  //       img: item.img,
  //       play_volume: item.play_volume + '',
  //       time: item.time,
  //       cate
  //     }
  //   })
  //   await Strategy.insertMany(_data)
  //   res.send('ok')
  // })

}