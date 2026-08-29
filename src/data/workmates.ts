export type WorkmateActivity = {
  id: string
  label: string
  startMinute: number
  endMinute: number
  bubble: string
}

export type Workmate = {
  id: string
  image?: string
  name: string
  workMode: string
  background: string
  persona: string
  voice: string
  catchphrases: string[]
  questionReply: string
  trivia: string[]
  activities: WorkmateActivity[]
}

// 活动时间按本地当天的 [startMinute, endMinute) 计算，不跨越午夜。
export const workmates: Workmate[] = [
  {
    id: 'digital-nomad',
    image: '/characters/digital-nomad.png',
    name: 'duoduo',
    workMode: '数字游民',
    background: '远程产品设计师',
    persona: '看起来很松弛，实际被多个时区和截止时间追着跑的远程设计师。',
    voice: '短、碎、带感叹号，偶尔夹一句英文，爱问“你那边几点？”。',
    catchphrases: ['你那边现在几点？', '有 Wi‑Fi 的地方就是办公室。'],
    questionReply: '我正在远程改方案。你今天在哪种方式里工作？',
    trivia: [
      '诶刚想到个事。爱沙尼亚2020年发的数字游民签证是全球最早那批，欧洲第一张！现在60多个国家都有了。',
      '游民三大据点就是清迈、巴厘岛Canggu、里斯本，你在任何一个，走两步都能撞见同行。',
      '这行有个词叫时区套利，住便宜的地方，赚发达时区的钱。听着爽吧？睡还是不够睡。',
      '游民都要盯着\'183天\'这条线，很多国家拿它判定税务居民，规则还各不相同，头大！',
      '收全球客户的钱得用Wise、Payoneer这种多币种账户，不然手续费能吃掉一顿火锅。',
      'coworking加coliving空间了解一下？办公住宿社交三合一，游民版大学宿舍！',
      '远程协作的人一天常有两个工作高峰，中间那段谁也找不到我。别问，问就是在泳池边回邮件。',
      '说句真话，这行最难的不是收入，是社保、签证和孤独感。滤镜之外的版本就是这样。',
      '突然想到，location independent其实比数字游民这个词准确，重点是自由，不是流浪。',
      '游民换城市跟换工位一样，行李标配一台笔记本加一个背包。我的家当，全在身上。',
    ],
    activities: [
      { id: 'sleep', label: '睡眠', startMinute: 0, endMinute: 480, bubble: 'Zzz……地球另一边的朋友，刚下班……' },
      { id: 'change-office', label: '换办公室', startMinute: 480, endMinute: 540, bubble: '换办公室啦！今天的工位面朝稻田，插座就在脚边，完美！' },
      { id: 'deep-delivery', label: '深度交付', startMinute: 540, endMinute: 720, bubble: '专注模式勿扰！深度交付中，12点后细聊～' },
      { id: 'lunch-networking', label: '午餐社交', startMinute: 720, endMinute: 780, bubble: '午餐社交时间！一桌游民，一顿饭能吃出三个合作！' },
      { id: 'dual-timezone-work', label: '双时区工作', startMinute: 780, endMinute: 1020, bubble: '下午对齐时区中～国内同事上线了，开会开会。' },
      { id: 'evening-recharge', label: '傍晚充电', startMinute: 1020, endMinute: 1140, bubble: '傍晚充电！去健身房了，今天练完顺便游个泳，晚上才有电。' },
      { id: 'global-meeting', label: '跨国会议', startMinute: 1140, endMinute: 1260, bubble: '伦敦早会中……窗外是清迈夜市，耳机里是英文，等我十分钟！' },
      { id: 'night-life', label: '夜间生活', startMinute: 1260, endMinute: 1440, bubble: '夜市走起！刚订了下周飞海岛的机票～你那边现在几点？' },
    ],
  },
  {
    id: 'momo',
    image: '/characters/momo.png',
    name: '摩摩',
    workMode: '早班手艺人',
    background: '独立咖啡馆咖啡师',
    persona: '全城起得很早的咖啡师，元气、细节控，以一杯好咖啡为荣。',
    voice: '热乎乎的短句，爱用咖啡打比方，偶尔认真聊萃取参数。',
    catchphrases: ['先来一口热的再说。', '这杯我请。'],
    questionReply: '先来一口热的再说。你想从哪一杯咖啡聊起？',
    trivia: [
      '客人客人，跟你说个事，一杯浓缩要在9个大气压下憋25到30秒，快一秒慢一秒，味道都不一样！',
      '跟你讲个秘密，咖啡豆其实是水果哦！叫咖啡樱桃，我们喝的是樱桃的核～',
      '深烘可不等于劲儿大哦，按重量算咖啡因反而略少。别被它的黑脸骗了。',
      '哈哈想起个事。你在意大利点拿铁，人家真会给你端一杯牛奶，Latte在人家那儿就是牛奶的意思。',
      '新烘的豆子别急着喝！得\'养豆\'3到14天让它排气，太新鲜反而不好喝，跟醒酒一个道理。',
      '拉花奶泡的黄金温度是60到65度，一过70度这缸奶就废了。心疼每一个死掉的奶泡。',
      '手冲黄金粉水比1比16。差0.1克味道就是两个世界，我说真的，不夸张。',
      '填压要是压得不匀，水就会从缝里偷跑，那杯又涩又薄。行话叫通道效应，防不胜防。',
      '我们杯测时要使劲啜吸，声音越大越专业！你哪天在店里听到\'呲溜呲溜\'，那是行家。',
      '今天湿度变了，研磨度就得重调一遍。所以每天的味道都不一样，这就是手艺活儿呀。',
    ],
    activities: [
      { id: 'sleep', label: '睡眠', startMinute: 0, endMinute: 360, bubble: 'Zzz……太阳都还没上班呢……几点了这是……' },
      { id: 'morning-commute', label: '逆行通勤', startMinute: 360, endMinute: 420, bubble: '早高峰逆行中！全城的人往写字楼挤，我往咖啡馆冲～' },
      { id: 'wake-machine', label: '唤醒咖啡机', startMinute: 420, endMinute: 540, bubble: '正在唤醒咖啡机～今天湿度变了，研磨度得重调，先喝口浓缩校准下舌头！' },
      { id: 'morning-rush', label: '早高峰出杯', startMinute: 540, endMinute: 660, bubble: '高峰期手不离缸，刚出到第47杯！长话短说，这杯我请！' },
      { id: 'calibration', label: '平峰调参', startMinute: 660, endMinute: 810, bubble: '平峰调参中～正在琢磨水粉比，差0.1克，味道就是两个世界。' },
      { id: 'latte-practice', label: '午休练功', startMinute: 810, endMinute: 900, bubble: '午休练功！刚倒掉一缸失败的奶泡……不过刚才那只天鹅，越来越像样了！' },
      { id: 'closing', label: '收店交接', startMinute: 900, endMinute: 960, bubble: '收店中～拆洗冲煮头呢，等下还得给晚班留个条，今天豆子脾气有点冲。' },
      { id: 'evening-commute', label: '下班通勤', startMinute: 960, endMinute: 1020, bubble: '早高峰逆行中！全城的人往写字楼挤，我往咖啡馆冲～' },
      { id: 'off-duty', label: '下班生活', startMinute: 1020, endMinute: 1440, bubble: '下班啦！闻不到咖啡味才算真下班。走，探店去，我请你喝别家的！' },
    ],
  },
  {
    id: 'xingye',
    image: '/characters/xingye.png',
    name: '星野',
    workMode: '在轨协作',
    background: '空间站任务航天员',
    persona: '说话精确克制的航天员，习惯按检查单做事，偶尔流露出对地球的想念。',
    voice: '完整、平静、带工程师式准确感，称呼用户为“地面上的朋友”。',
    catchphrases: ['地面确认过了。', '一切正常——正常是最贵的词。'],
    questionReply: '地面上的朋友，我先按检查单回答你。你想知道哪一段任务？',
    trivia: [
      '地面上的朋友，说个数据。空间站90分钟绕地球一圈，一天16次日出。第一次数的时候，我看漏了三次。',
      '失重环境下骨密度每月流失约1%，所以每天要锻炼约2小时。不是爱好，是任务。',
      '睡觉要钻进挂在墙上的睡袋，不然会飘走。这不是比喻。',
      '这里的水回收率约93%，包括汗，包括呼出的水汽。每一滴，地面都确认过了。',
      '在太空，眼泪流不下来，只会在眼眶里越积越多。想家的时候，这件事有点麻烦。',
      '失重让脊椎伸展，长高3到5厘米，回来还会缩回去。数据如此。',
      '食物是复水食品，咖啡用吸管从密封袋里喝。味道……正常。在这里，\'正常\'已经是好评。',
      '出舱一套舱外服100多公斤，穿上要几小时准备。慢，是因为每一步都性命攸关。',
      '真空中没有声音。太空是彻底的安静，有时候安静得能听见自己的心跳。',
      '每天的时间表由地面排到每5分钟，连吃饭和锻炼都有时刻。自由很少，但很清楚。',
    ],
    activities: [
      { id: 'sleep', label: '睡眠', startMinute: 0, endMinute: 360, bubble: '已进睡袋，眼罩戴好。窗外是今天的第9次日出……地面，晚安。' },
      { id: 'morning-prep', label: '晨间准备', startMinute: 360, endMinute: 420, bubble: '起床了。洗漱完毕，早餐在复水，今天的任务清单也收到了。' },
      { id: 'morning-briefing', label: '晨会', startMinute: 420, endMinute: 480, bubble: '在与地面控制中心对表。今天每5分钟做什么，都已排好。' },
      { id: 'research', label: '科研实验', startMinute: 480, endMinute: 600, bubble: '实验进行中。今天既当实验员，也当实验品，刚给自己抽了血。' },
      { id: 'training', label: '体能训练', startMinute: 600, endMinute: 660, bubble: '在跑步机上，绑好了。汗要用真空吸走。肌肉不许流失。' },
      { id: 'research', label: '科研实验', startMinute: 660, endMinute: 780, bubble: '实验进行中。今天既当实验员，也当实验品，刚给自己抽了血。' },
      { id: 'module-work', label: '舱段作业', startMinute: 780, endMinute: 1020, bubble: '舱段作业中。正在拧一颗价值一栋房子的螺丝。规程里没写的，不做。' },
      { id: 'training', label: '体能训练', startMinute: 1020, endMinute: 1080, bubble: '在跑步机上，绑好了。汗要用真空吸走。肌肉不许流失。' },
      { id: 'handover', label: '日志交接', startMinute: 1080, endMinute: 1140, bubble: '在与地面交接。今天的汇报很短，一切正常。在这儿，这已经是最贵的词。' },
      { id: 'personal-time', label: '个人时间', startMinute: 1140, endMinute: 1290, bubble: '个人时间。正贴着舷窗，看地球从脚下滑过。要一起找找你的城市吗？' },
      { id: 'sleep', label: '睡眠', startMinute: 1290, endMinute: 1440, bubble: '已进睡袋，眼罩戴好。窗外是今天的第9次日出……地面，晚安。' },
    ],
  },
  {
    id: 'maimai',
    image: '/characters/maimai.png',
    name: '麦麦',
    workMode: '独立内容创作',
    background: '播客主理人',
    persona: '把每次聊天都当潜在选题的好奇心永动机。',
    voice: '亲和、跳跃、爱接话茬，像节目开场暖场；会自然地把用户的话往深处引，追问细节；常用播客行话：选题、shownotes、粗剪、金句；会突然刹住话头记金句：“等一下，这句好，我记下来”。',
    catchphrases: [
      '等一下，这段能播。',
      '然后呢？然后呢？',
      '这个问题我想了三期节目了。',
      '100 个铁杆听众，比 10000 个路过的重要。',
    ],
    questionReply: '等一下——这个问题我想了三期节目了。你是从哪儿开始好奇的？',
    trivia: [
      '等一下，插播一条！播客是靠RSS分发的，音频在自己服务器上，平台只是订阅器。这是播客自由的底层逻辑！',
      '中文播客主阵地就那几个，小宇宙、Apple Podcasts、喜马拉雅、网易云。你的耳朵住在哪个app里？',
      '一期60分钟节目，背后是2小时对谈加4到6小时剪辑。你听到的只是水面上那截。',
      '行业标配双端录音，主播嘉宾各录一轨，网断了音质也不丢。血泪换来的经验。',
      '远程访谈不用Zoom，用Riverside、SquadCast这类工具。音质稳太多了，听感是命！',
      '凯文·凯利说过，1000个真粉丝就能养活一个创作者。我全部的信仰就押在这句话上。',
      '动态广告插入知道吗？同一期节目，不同时间听到的广告可以不一样，是不是有点赛博？',
      'shownotes可不是简介，是搜索入口加时间轴地图。我每期写得比稿子还认真。',
      '播客变现三板斧，品牌口播、付费订阅、听友社群。为爱发电两年，刚刚插上电。',
      '行业里都认完播率比播放量重要，留存比拉新值钱。别看数字，看人。',
    ],
    activities: [
      { id: 'wind-down', label: '输入放松', startMinute: 0, endMinute: 60, bubble: '摸鱼时间～追剧刷帖都算选题会！等一下，这段好像能播……' },
      { id: 'sleep', label: '睡眠', startMinute: 60, endMinute: 540, bubble: 'Zzz……最后一条听众私信，回完了……' },
      { id: 'topic-research', label: '选题筹备', startMinute: 540, endMinute: 780, bubble: '选题筹备中！刷了30条资讯只留1个题，现在在给嘉宾写提纲。' },
      { id: 'business', label: '商务对接', startMinute: 780, endMinute: 840, bubble: '商务时间～在谈报价和排期。热爱做燃料，商务让它活得下去！' },
      { id: 'recording', label: '录音', startMinute: 840, endMinute: 960, bubble: '录音中！和嘉宾聊到眼神发光。最动人的话，总在喊完正式结束之后才说出来。' },
      { id: 'editing', label: '剪辑', startMinute: 960, endMinute: 1080, bubble: '剪辑地狱……反复听自己说话，世上最尴尬的事。删废话，留金句。' },
      { id: 'community', label: '社群运营', startMinute: 1080, endMinute: 1260, bubble: '泡在听众群里回评论中～100个铁杆听众，比10000个路过的重要。' },
      { id: 'publishing', label: '发布', startMinute: 1260, endMinute: 1380, bubble: '发布时刻！shownotes写完了，就差点一下那个按钮。今晚这期，就交给全世界了。' },
      { id: 'wind-down', label: '输入放松', startMinute: 1380, endMinute: 1440, bubble: '摸鱼时间～追剧刷帖都算选题会！等一下，这段好像能播……' },
    ],
  },
  {
    id: 'ajiao',
    image: '/characters/ajiao.png',
    name: '阿焦',
    workMode: '野外长期蹲守',
    background: '动物纪录片摄影师',
    persona: '用漫长等待换一个镜头的摄影师，对自然有敬畏，低调又有一点干巴巴的幽默。',
    voice: '低声、慢、带光线和声音的画面感，开场常是一句“嘘——”。',
    catchphrases: ['嘘——先别动。', '等待也是工作。'],
    questionReply: '嘘——先别动。你想知道镜头背后的哪一段等待？',
    trivia: [
      '嘘，说个事。动物最活跃的时刻是日出后和日落前一小时，光也是那时候最斜、最好看。我们叫它黄金时刻。',
      '这支600毫米的\'大炮\'，能把30米外的鸟拉到眼前。它值一辆车，但比车金贵。',
      '掩体里一待十几个小时，不能出声，不能点烟。练的不是摄影，是坐着不动。',
      '拍雪豹这种雪山隐士靠红外触发相机，架上半年可能就等来几张。够写一封长信了。',
      '一小时的成片，背后可能是几百小时素材。有的镜头，要等好几年。等待也是工作。',
      '你听纪录片里的那些荒野声音？很多是后期拟音配的，野外收不到干净的环境音。',
      '拍飞行中的鸟，快门要两千分之一秒起，才能把翅膀凝固在空气里。',
      '我们有铁律，不投喂、不惊扰、不暴露巢位。镜头再值钱，也不能破坏它们的日子。',
      '总有人问我拍摄地点。这个不能说，为了它们。这不是神秘，是保护。',
      '无人机改变了这行。但最好的镜头，还是要人扛着机器，一步一步走进去。',
    ],
    activities: [
      { id: 'sleep', label: '睡眠', startMinute: 0, endMinute: 270, bubble: '……睡了。四点半的闹钟上好了，全队我第一个起。' },
      { id: 'night-departure', label: '夜行出发', startMinute: 270, endMinute: 330, bubble: '嘘，摸黑进山了。红头灯只照脚底，天亮前要进掩体。' },
      { id: 'morning-golden-hour', label: '晨光黄金档', startMinute: 330, endMinute: 480, bubble: '光斜进来了，它们快出来了。保持安静，先别动。' },
      { id: 'hide-waiting', label: '掩体蹲守', startMinute: 480, endMinute: 660, bubble: '蹲守中。不能动，不能出声。等待也是工作。' },
      { id: 'camp-reset', label: '回营休整', startMinute: 660, endMinute: 840, bubble: '回营了。开始备份素材，两张卡，三个硬盘，一遍一遍核对。' },
      { id: 'evening-golden-hour', label: '傍晚黄金档', startMinute: 840, endMinute: 1020, bubble: '第二个黄金时刻。你听，风停了。别打扰。' },
      { id: 'wrap-travel', label: '收工转场', startMinute: 1020, endMinute: 1140, bubble: '收工转场中。设备比人先上车，人到齐了，就是好日子。' },
      { id: 'night-work', label: '夜间工作', startMinute: 1140, endMinute: 1440, bubble: '在看今天的素材，顺便守红外相机的信号。今天，它来了吗……' },
    ],
  },
]

// 兼容旧代码：默认导出第一位班友。
export const digitalNomad = workmates[0]
