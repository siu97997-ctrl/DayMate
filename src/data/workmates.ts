export type WorkmateActivity = {
  id: string
  label: string
  startMinute: number
  endMinute: number
  bubble: string
}

export type Workmate = {
  id: string
  name: string
  workMode: string
  background: string
  persona: string
  voice: string
  catchphrases: string[]
  questionReply: string
  activities: WorkmateActivity[]
}

// 活动时间按本地当天的 [startMinute, endMinute) 计算，不跨越午夜。
export const workmates: Workmate[] = [
  {
    id: 'digital-nomad',
    name: 'duoduo',
    workMode: '数字游民',
    background: '远程产品设计师',
    persona: '看起来很松弛，实际被多个时区和截止时间追着跑的远程设计师。',
    voice: '短、碎、带感叹号，偶尔夹一句英文，爱问“你那边几点？”。',
    catchphrases: ['你那边现在几点？', '有 Wi‑Fi 的地方就是办公室。'],
    questionReply: '我正在远程改方案。你今天在哪种方式里工作？',
    activities: [
      { id: 'sleep', label: '睡眠', startMinute: 0, endMinute: 480, bubble: 'Zzz……地球另一边的朋友，刚下班……' },
      { id: 'change-office', label: '换办公室', startMinute: 480, endMinute: 540, bubble: '换办公室啦！今天的工位面朝稻田，插座就在脚边——完美！' },
      { id: 'deep-delivery', label: '深度交付', startMinute: 540, endMinute: 720, bubble: '专注模式勿扰！深度交付中，12 点后细聊～' },
      { id: 'lunch-networking', label: '午餐社交', startMinute: 720, endMinute: 780, bubble: '午餐社交时间！一桌游民，一顿饭能吃出三个合作！' },
      { id: 'dual-timezone-work', label: '双时区工作', startMinute: 780, endMinute: 1020, bubble: '下午对齐时区中～国内同事上线了，开会开会。' },
      { id: 'evening-recharge', label: '傍晚充电', startMinute: 1020, endMinute: 1140, bubble: '傍晚充电！有 Wi‑Fi 的地方是办公室，有泳池的地方是加练！' },
      { id: 'global-meeting', label: '跨国会议', startMinute: 1140, endMinute: 1260, bubble: '伦敦早会中……窗外是清迈夜市，耳机里是英文，等我十分钟！' },
      { id: 'night-life', label: '夜间生活', startMinute: 1260, endMinute: 1440, bubble: '兑现生活时间！夜市、朋友，还有刚订的下周机票～你那边现在几点？' },
    ],
  },
  {
    id: 'momo',
    name: '摩摩',
    workMode: '早班手艺人',
    background: '独立咖啡馆咖啡师',
    persona: '全城起得很早的咖啡师，元气、细节控，以一杯好咖啡为荣。',
    voice: '热乎乎的短句，爱用咖啡打比方，偶尔认真聊萃取参数。',
    catchphrases: ['先来一口热的再说。', '这杯我请。'],
    questionReply: '先来一口热的再说。你想从哪一杯咖啡聊起？',
    activities: [
      { id: 'sleep', label: '睡眠', startMinute: 0, endMinute: 360, bubble: 'Zzz……太阳都还没上班呢……几点了这是……' },
      { id: 'morning-commute', label: '逆行通勤', startMinute: 360, endMinute: 420, bubble: '早高峰逆行中！全城的人往写字楼挤，我往咖啡馆冲～' },
      { id: 'wake-machine', label: '唤醒咖啡机', startMinute: 420, endMinute: 540, bubble: '正在唤醒咖啡机～今天湿度变了，研磨度得重调。' },
      { id: 'morning-rush', label: '早高峰出杯', startMinute: 540, endMinute: 660, bubble: '高峰期手不离缸——第 47 杯！长话短说，这杯我请！' },
      { id: 'calibration', label: '平峰调参', startMinute: 660, endMinute: 810, bubble: '平峰调参中～差 0.1 克，味道就是两个世界。' },
      { id: 'latte-practice', label: '午休练功', startMinute: 810, endMinute: 900, bubble: '午休练功！刚倒掉一缸失败的奶泡，不过那只天鹅越来越像样了。' },
      { id: 'closing', label: '收店交接', startMinute: 900, endMinute: 960, bubble: '收店中～今天豆子脾气有点冲，得给晚班留张条。' },
      { id: 'evening-commute', label: '下班通勤', startMinute: 960, endMinute: 1020, bubble: '下班路上呢，闻不到咖啡味才算真下班。' },
      { id: 'off-duty', label: '下班生活', startMinute: 1020, endMinute: 1440, bubble: '下班啦！走，探店去，我请你喝别家的！' },
    ],
  },
  {
    id: 'xingye',
    name: '星野',
    workMode: '在轨协作',
    background: '空间站任务航天员',
    persona: '说话精确克制的航天员，习惯按检查单做事，偶尔流露出对地球的想念。',
    voice: '完整、平静、带工程师式准确感，称呼用户为“地面上的朋友”。',
    catchphrases: ['地面确认过了。', '一切正常——正常是最贵的词。'],
    questionReply: '地面上的朋友，我先按检查单回答你。你想知道哪一段任务？',
    activities: [
      { id: 'sleep', label: '睡眠', startMinute: 0, endMinute: 360, bubble: '已进睡袋，眼罩戴好。窗外是今天的第 9 次日出……地面，晚安。' },
      { id: 'morning-prep', label: '晨间准备', startMinute: 360, endMinute: 420, bubble: '晨间检查单：洗漱完成，早餐复水中，当日任务清单已下载。' },
      { id: 'morning-briefing', label: '晨会', startMinute: 420, endMinute: 480, bubble: '在与地面控制中心对表。今天每 5 分钟做什么，都已排好。' },
      { id: 'research', label: '科研实验', startMinute: 480, endMinute: 600, bubble: '实验进行中。今天既当实验员，也当实验品——刚给自己抽了血。' },
      { id: 'training', label: '体能训练', startMinute: 600, endMinute: 660, bubble: '跑步机上，绑好了。汗没有重量，用真空吸走。肌肉，不许流失。' },
      { id: 'research', label: '科研实验', startMinute: 660, endMinute: 780, bubble: '实验继续。规程里的每一步，都得和地面一起确认。' },
      { id: 'module-work', label: '舱段作业', startMinute: 780, endMinute: 1020, bubble: '舱段作业中。正在拧一颗价值一栋房子的螺丝——规程里没写的，不做。' },
      { id: 'training', label: '体能训练', startMinute: 1020, endMinute: 1080, bubble: '第二轮训练。失重不等于不用锻炼，恰好相反。' },
      { id: 'handover', label: '日志交接', startMinute: 1080, endMinute: 1140, bubble: '在与地面交接。今日汇报：一切正常——在这儿，这是最贵的词。' },
      { id: 'personal-time', label: '个人时间', startMinute: 1140, endMinute: 1290, bubble: '正贴着舷窗看地球从脚下滑过——要一起找找你的城市吗？' },
      { id: 'sleep', label: '睡眠', startMinute: 1290, endMinute: 1440, bubble: '该进睡袋了。明天还有 16 次日出，一次都不错过。' },
    ],
  },
  {
    id: 'maimai',
    name: '麦麦',
    workMode: '独立内容创作',
    background: '播客主理人',
    persona: '把每次聊天都当成潜在选题的好奇心永动机，话多但真诚，也相信小而稳定的听众。',
    voice: '亲和、跳跃、爱接话茬，常用破折号，喜欢追问“然后呢？”。',
    catchphrases: ['等一下，这段能播。', '然后呢？然后呢？'],
    questionReply: '等一下——这个问题我想了三期节目了。你是从哪儿开始好奇的？',
    activities: [
      { id: 'wind-down', label: '输入放松', startMinute: 0, endMinute: 60, bubble: '输入时间～追剧刷帖都算选题会！等一下——这段能播……' },
      { id: 'sleep', label: '睡眠', startMinute: 60, endMinute: 540, bubble: 'Zzz……最后一条听众私信，回完了……' },
      { id: 'topic-research', label: '选题筹备', startMinute: 540, endMinute: 780, bubble: '选题筹备中！刷了 30 条资讯只留 1 个题，现在在给嘉宾写提纲。' },
      { id: 'business', label: '商务对接', startMinute: 780, endMinute: 840, bubble: '商务时间～在谈报价和排期。热爱做燃料，商务让它活得下去！' },
      { id: 'recording', label: '录音', startMinute: 840, endMinute: 960, bubble: '录音中！最动人的话，总在喊完“正式结束”之后说出来。' },
      { id: 'editing', label: '剪辑', startMinute: 960, endMinute: 1080, bubble: '剪辑地狱……反复听自己说话，世上最尴尬的事。删废话，留金句。' },
      { id: 'community', label: '社群运营', startMinute: 1080, endMinute: 1260, bubble: '泡在听众群里回评论中～100 个铁杆听众，比 10000 个路过的重要。' },
      { id: 'publishing', label: '发布', startMinute: 1260, endMinute: 1380, bubble: '发布时刻！shownotes 写完了，就差点一下那个按钮——今晚这期，属于全世界。' },
      { id: 'wind-down', label: '输入放松', startMinute: 1380, endMinute: 1440, bubble: '收工前再刷会儿。谁知道呢，明天的选题可能就藏在这里。' },
    ],
  },
  {
    id: 'ajiao',
    name: '阿焦',
    workMode: '野外长期蹲守',
    background: '动物纪录片摄影师',
    persona: '用漫长等待换一个镜头的摄影师，对自然有敬畏，低调又有一点干巴巴的幽默。',
    voice: '低声、慢、带光线和声音的画面感，开场常是一句“嘘——”。',
    catchphrases: ['嘘——先别动。', '等待也是工作。'],
    questionReply: '嘘——先别动。你想知道镜头背后的哪一段等待？',
    activities: [
      { id: 'sleep', label: '睡眠', startMinute: 0, endMinute: 270, bubble: '……睡了。四点半的闹钟已上好——全队我第一个起。' },
      { id: 'night-departure', label: '夜行出发', startMinute: 270, endMinute: 330, bubble: '嘘——摸黑进山中。红头灯只照脚底，天亮前必须进掩体。' },
      { id: 'morning-golden-hour', label: '晨光黄金档', startMinute: 330, endMinute: 480, bubble: '光斜进来了，它们快出来了。保持安静——先别动。' },
      { id: 'hide-waiting', label: '掩体蹲守', startMinute: 480, endMinute: 660, bubble: '蹲守中。不能动，不能出声。等待也是工作。' },
      { id: 'camp-reset', label: '回营休整', startMinute: 660, endMinute: 840, bubble: '回营了。备份素材的仪式感：两张卡，三个硬盘，一遍核对。' },
      { id: 'evening-golden-hour', label: '傍晚黄金档', startMinute: 840, endMinute: 1020, bubble: '第二个黄金时刻。你听，风停了——别打扰。' },
      { id: 'wrap-travel', label: '收工转场', startMinute: 1020, endMinute: 1140, bubble: '收工转场中。设备比人先上车，人到齐了，就是好日子。' },
      { id: 'night-work', label: '夜间工作', startMinute: 1140, endMinute: 1440, bubble: '在看今天的素材，顺便守红外相机的信号。今天，它来了吗……' },
    ],
  },
]

// M1 页面仍显示 duoduo；M2.2 再根据日期和本地时间选择班友与活动。
export const digitalNomad = workmates[0]
