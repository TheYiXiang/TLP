export interface TarotCard {
  id: number;
  name: string;
  image: string;
  meaning: string;
  reversedMeaning: string;
  isReversed?: boolean;
}

export interface SpreadType {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  positions: string[];
}

export const SPREADS: SpreadType[] = [
  {
    id: "single",
    name: "单牌阵",
    description: "每日运势、简单建议",
    cardCount: 1,
    positions: ["当前建议"],
  },
  {
    id: "three-card",
    name: "三牌阵",
    description: "过去 - 现在 - 未来",
    cardCount: 3,
    positions: ["过去", "现在", "未来"],
  },
  {
    id: "three-card-advice",
    name: "三牌阵 (挑战)",
    description: "现状 - 挑战 - 建议",
    cardCount: 3,
    positions: ["现状", "挑战", "建议"],
  },
  {
    id: "choice",
    name: "二择一牌阵",
    description: "A 选择 - B 选择 - 综合结果",
    cardCount: 3,
    positions: ["选择 A", "选择 B", "综合建议"],
  },
  {
    id: "holy-triangle",
    name: "圣三角牌阵",
    description: "身 - 心 - 灵的深度统一",
    cardCount: 3,
    positions: ["身体/物质", "心灵/情感", "精神/灵性"],
  },
  {
    id: "celtic-cross",
    name: "凯尔特十字",
    description: "深度分析复杂问题",
    cardCount: 10,
    positions: [
      "核心情况",
      "挑战/阻碍",
      "意识层面",
      "潜意识/基础",
      "过去的影响",
      "未来的可能性",
      "自我态度",
      "外界环境",
      "希望与恐惧",
      "最终结果",
    ],
  },
];

export const MAJOR_ARCANA: TarotCard[] = [
  {
    id: 0,
    name: "愚者 (The Fool)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg",
    meaning: "新的开始，自发性，自由。",
    reversedMeaning: "鲁莽，疏忽，停滞。",
  },
  {
    id: 1,
    name: "魔术师 (The Magician)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
    meaning: "意志力，创造力，技能。",
    reversedMeaning: "操纵，未开发的潜力。",
  },
  {
    id: 2,
    name: "女祭司 (The High Priestess)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg",
    meaning: "直觉，潜意识，神圣的知识。",
    reversedMeaning: "秘密，与直觉脱节。",
  },
  {
    id: 3,
    name: "皇后 (The Empress)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/af/RWS_Tarot_03_Empress.jpg",
    meaning: "丰饶，自然，母性。",
    reversedMeaning: "创造性受阻，依赖性。",
  },
  {
    id: 4,
    name: "皇帝 (The Emperor)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg",
    meaning: "权威，结构，控制。",
    reversedMeaning: "专制，缺乏纪律。",
  },
  {
    id: 5,
    name: "教皇 (The Hierophant)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg",
    meaning: "传统，信仰，共鸣。",
    reversedMeaning: "反叛，挑战现状。",
  },
  {
    id: 6,
    name: "恋人 (The Lovers)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg",
    meaning: "爱，和谐，关系，选择。",
    reversedMeaning: "失衡，价值观冲突。",
  },
  {
    id: 7,
    name: "战车 (The Chariot)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
    meaning: "胜利，意志，决心。",
    reversedMeaning: "缺乏方向，失控。",
  },
  {
    id: 8,
    name: "力量 (Strength)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg",
    meaning: "勇气，耐力，同情心。",
    reversedMeaning: "自我怀疑，软弱。",
  },
  {
    id: 9,
    name: "隐士 (The Hermit)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg",
    meaning: "内省，孤独，寻求真理。",
    reversedMeaning: "孤立，偏执。",
  },
  {
    id: 10,
    name: "命运之轮 (Wheel of Fortune)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg",
    meaning: "运气，循环，转折点。",
    reversedMeaning: "坏运气，抵抗变化。",
  },
  {
    id: 11,
    name: "正义 (Justice)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg",
    meaning: "公平，真相，法律，因果。",
    reversedMeaning: "不公正，不诚实。",
  },
  {
    id: 12,
    name: "倒吊人 (The Hanged Man)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg",
    meaning: "暂停，放手，新视角。",
    reversedMeaning: "拖延，无谓的牺牲。",
  },
  {
    id: 13,
    name: "死神 (Death)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg",
    meaning: "结束，转变，放手。",
    reversedMeaning: "停滞，抗拒改变。",
  },
  {
    id: 14,
    name: "节制 (Temperance)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg",
    meaning: "平衡，节制，耐心。",
    reversedMeaning: "失衡，过激。",
  },
  {
    id: 15,
    name: "恶魔 (The Devil)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg",
    meaning: "束缚，物质主义，阴暗面。",
    reversedMeaning: "释放，脱离束缚。",
  },
  {
    id: 16,
    name: "高塔 (The Tower)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg",
    meaning: "剧变，灾难，顿悟。",
    reversedMeaning: "延迟的危机，恐惧改变。",
  },
  {
    id: 17,
    name: "星星 (The Star)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg",
    meaning: "希望，灵感，宁静。",
    reversedMeaning: "绝望，缺乏信心。",
  },
  {
    id: 18,
    name: "月亮 (The Moon)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg",
    meaning: "幻觉，恐惧，焦虑，直觉。",
    reversedMeaning: "释放恐惧，清晰。",
  },
  {
    id: 19,
    name: "太阳 (The Sun)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg",
    meaning: "快乐，成功，活力。",
    reversedMeaning: "消极，暂时的阻碍。",
  },
  {
    id: 20,
    name: "审判 (Judgement)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg",
    meaning: "觉醒，决定，重生。",
    reversedMeaning: "自我怀疑，犹豫不决。",
  },
  {
    id: 21,
    name: "世界 (The World)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg",
    meaning: "完成，成就，旅行。",
    reversedMeaning: "未完成的事务，停滞不前。",
  },
];

export const MINOR_ARCANA: TarotCard[] = [
  // Wands
  {
    id: 22,
    name: "权杖一 (Ace of Wands)",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/11/Wands01.jpg",
    meaning: "新的开始，创意，灵感，行动。",
    reversedMeaning: "延误，缺乏动力，创意受阻。",
  },
  {
    id: 23,
    name: "权杖二 (Two of Wands)",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Wands02.jpg",
    meaning: "规划，决策，远见，进取。",
    reversedMeaning: "缺乏计划，恐惧未知，停滞。",
  },
  {
    id: 24,
    name: "权杖三 (Three of Wands)",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Wands03.jpg",
    meaning: "展望未来，扩张，探索，商业成功。",
    reversedMeaning: "缺乏远见，计划落空，延误。",
  },
  {
    id: 25,
    name: "权杖四 (Four of Wands)",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Wands04.jpg",
    meaning: "庆祝，稳定，和谐，家庭归属感。",
    reversedMeaning: "不安全感，家庭冲突，缺乏凝聚力。",
  },
  {
    id: 26,
    name: "权杖五 (Five of Wands)",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Wands05.jpg",
    meaning: "竞争，冲突，分歧，挑战。",
    reversedMeaning: "回避冲突，达成共识，内耗结束。",
  },
  {
    id: 27,
    name: "权杖六 (Six of Wands)",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Wands06.jpg",
    meaning: "胜利，成功，公众认可，自豪感。",
    reversedMeaning: "自满，跌落神坛，缺乏认可。",
  },
  {
    id: 28,
    name: "权杖七 (Seven of Wands)",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Wands07.jpg",
    meaning: "防御，坚持立场，毅力，竞争压力。",
    reversedMeaning: "退缩，不知所措，放弃防御。",
  },
  {
    id: 29,
    name: "权杖八 (Eight of Wands)",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Wands08.jpg",
    meaning: "迅速行动，消息传播，旅行，进展。",
    reversedMeaning: "混乱，延误，鲁莽，进展缓慢。",
  },
  {
    id: 30,
    name: "权杖九 (Nine of Wands)",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Wands09.jpg",
    meaning: "韧性，防御，坚持，最后的挑战。",
    reversedMeaning: "疲惫不堪，防线崩溃，偏执。",
  },
  {
    id: 31,
    name: "权杖十 (Ten of Wands)",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Wands10.jpg",
    meaning: "负担，责任，辛劳，压力过重。",
    reversedMeaning: "卸下重担，权力下放，不堪重负。",
  },
  {
    id: 32,
    name: "权杖侍从 (Page of Wands)",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Wands11.jpg",
    meaning: "热情，好奇心，探索，新的消息。",
    reversedMeaning: "鲁莽，缺乏经验，坏消息。",
  },
  {
    id: 33,
    name: "权杖骑士 (Knight of Wands)",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/16/Wands12.jpg",
    meaning: "冒险，行动，冲动，激情。",
    reversedMeaning: "焦躁不安，傲慢，缺乏方向。",
  },
  {
    id: 34,
    name: "权杖女王 (Queen of Wands)",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Wands13.jpg",
    meaning: "自信，魅力，独立，社交。 ",
    reversedMeaning: "自负，嫉妒，自私，易怒。",
  },
  {
    id: 35,
    name: "权杖国王 (King of Wands)",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Wands14.jpg",
    meaning: "领导力，远见，企业家精神，勇气。",
    reversedMeaning: "独裁，冲动，缺乏耐性。",
  },

  // Cups
  {
    id: 36,
    name: "圣杯一 (Ace of Cups)",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Cups01.jpg",
    meaning: "新情感，灵性，直觉，溢出的爱。",
    reversedMeaning: "情感受阻，压抑，缺乏同情心。",
  },
  {
    id: 37,
    name: "圣杯二 (Two of Cups)",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Cups02.jpg",
    meaning: "伙伴关系，统一，吸引力，合作。",
    reversedMeaning: "不和谐，分手，情感不平衡。",
  },
  {
    id: 38,
    name: "圣杯三 (Three of Cups)",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Cups03.jpg",
    meaning: "庆祝，友谊，社区，团队精神。",
    reversedMeaning: "社交过度，孤立，流言蜚语。",
  },
  {
    id: 39,
    name: "圣杯四 (Four of Cups)",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/35/Cups04.jpg",
    meaning: "沉思，冷漠，厌倦，向内看。",
    reversedMeaning: "新的认识，接受机会，振作。",
  },
  {
    id: 40,
    name: "圣杯五 (Five of Cups)",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Cups05.jpg",
    meaning: "失落，悲伤，后悔，关注负面。",
    reversedMeaning: "释怀，接受现实，继续前行。",
  },
  {
    id: 41,
    name: "圣杯六 (Six of Cups)",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/17/Cups06.jpg",
    meaning: "怀旧，童年，天真，旧友重逢。",
    reversedMeaning: "沉溺过去，脱离现实，停滞不前。",
  },
  {
    id: 42,
    name: "圣杯七 (Seven of Cups)",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Cups07.jpg",
    meaning: "幻想，多种选择，白日梦，诱惑。",
    reversedMeaning: "清晰，做出选择，脚踏实地。",
  },
  {
    id: 43,
    name: "圣杯八 (Eight of Cups)",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/60/Cups08.jpg",
    meaning: "离开，寻求更高真理，情感退缩。",
    reversedMeaning: "犹豫不决，恐惧改变，停滞。",
  },
  {
    id: 44,
    name: "圣杯九 (Nine of Cups)",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Cups09.jpg",
    meaning: "愿望成真，满足，满足感，快乐。",
    reversedMeaning: "贪婪，过度沉溺，不满足。",
  },
  {
    id: 45,
    name: "圣杯十 (Ten of Cups)",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Cups10.jpg",
    meaning: "和谐，美满，家庭幸福，情感充实。",
    reversedMeaning: "家庭不和，情感断裂，缺乏连接。",
  },
  {
    id: 46,
    name: "圣杯侍从 (Page of Cups)",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Cups11.jpg",
    meaning: "敏感，创意，情感邀约，新灵感。",
    reversedMeaning: "情感幼稚，创意受阻，嫉妒。",
  },
  {
    id: 47,
    name: "圣杯骑士 (Knight of Cups)",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Cups12.jpg",
    meaning: "浪漫，迷人，理想主义者，情感提议。",
    reversedMeaning: "反复无常，不切实际，情感操纵。",
  },
  {
    id: 48,
    name: "圣杯女王 (Queen of Cups)",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/62/Cups13.jpg",
    meaning: "富有同情心，直觉敏锐，情感支持。",
    reversedMeaning: "情感依赖，不安全感，过度敏感。",
  },
  {
    id: 49,
    name: "圣杯国王 (King of Cups)",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Cups14.jpg",
    meaning: "情感稳定，智慧，平衡，宽容。",
    reversedMeaning: "情感冷漠，操纵，不诚实。",
  },

  // Swords
  {
    id: 50,
    name: "宝剑一 (Ace of Swords)",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Swords01.jpg",
    meaning: "突破，清晰度，正义，理智胜利。",
    reversedMeaning: "混乱，缺乏视野，武断。",
  },
  {
    id: 51,
    name: "宝剑二 (Two of Swords)",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Swords02.jpg",
    meaning: "僵局，艰难抉择，回避现实。",
    reversedMeaning: "混乱，信息过载，优柔寡断。",
  },
  {
    id: 52,
    name: "宝剑三 (Three of Swords)",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/02/Swords03.jpg",
    meaning: "心碎，悲伤，分离，痛苦的真理。",
    reversedMeaning: "疗愈，原谅，缓解痛苦。",
  },
  {
    id: 53,
    name: "宝剑四 (Four of Swords)",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Swords04.jpg",
    meaning: "休息，康复，冥想，暂时撤退。",
    reversedMeaning: "精疲力竭，躁动不安，重新行动。",
  },
  {
    id: 54,
    name: "宝剑五 (Five of Swords)",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/23/Swords05.jpg",
    meaning: "自私，胜利带来的代价，背叛。",
    reversedMeaning: "冲突缓解，和解，内疚感。",
  },
  {
    id: 55,
    name: "宝剑六 (Six of Swords)",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/29/Swords06.jpg",
    meaning: "过渡，离开痛苦，寻找平静。",
    reversedMeaning: "受困于过去，逃避困难，无法过渡。",
  },
  {
    id: 56,
    name: "宝剑七 (Seven of Swords)",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/34/Swords07.jpg",
    meaning: "欺骗，策略，逃避责任，暗中行事。",
    reversedMeaning: "诚实，良心发现，计划被揭穿。",
  },
  {
    id: 57,
    name: "宝剑八 (Eight of Swords)",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Swords08.jpg",
    meaning: "受困，被束缚，思想的牢笼，无助。",
    reversedMeaning: "自由，自我赋能，突破限制。",
  },
  {
    id: 58,
    name: "宝剑九 (Nine of Swords)",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Swords09.jpg",
    meaning: "焦虑，噩梦，压力，心理负担。",
    reversedMeaning: "希望，绝望感减轻，面对恐惧。",
  },
  {
    id: 59,
    name: "宝剑十 (Ten of Swords)",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Swords10.jpg",
    meaning: "背叛，彻底失败，触底反弹。",
    reversedMeaning: "复苏，最坏的已经过去，重生。",
  },
  {
    id: 60,
    name: "宝剑侍从 (Page of Swords)",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Swords11.jpg",
    meaning: "警觉，好奇心，沟通，新的观点。",
    reversedMeaning: "多疑，言语中伤，缺乏远见。",
  },
  {
    id: 61,
    name: "宝剑骑士 (Knight of Swords)",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Swords12.jpg",
    meaning: "果断，野心，迅速行动，逻辑性强。",
    reversedMeaning: "鲁莽，挑衅，缺乏耐性。",
  },
  {
    id: 62,
    name: "宝剑女王 (Queen of Swords)",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Swords13.jpg",
    meaning: "理智，独立，清晰的边界，直言不讳。",
    reversedMeaning: "冷漠，刻薄，过度挑剔。",
  },
  {
    id: 63,
    name: "宝剑国王 (King of Swords)",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/33/Swords14.jpg",
    meaning: "权威，真理，理智，客观决策。",
    reversedMeaning: "独裁，滥用权力，严厉。",
  },

  // Pentacles
  {
    id: 64,
    name: "星币一 (Ace of Pentacles)",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Pents01.jpg",
    meaning: "丰盈，新的机会，财务稳定。",
    reversedMeaning: "错失机会，不切实际，资源匮乏。",
  },
  {
    id: 65,
    name: "星币二 (Two of Pentacles)",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Pents02.jpg",
    meaning: "平衡，多任务处理，适应性。",
    reversedMeaning: "失衡，由于过度承诺而焦虑。",
  },
  {
    id: 66,
    name: "星币三 (Three of Pentacles)",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/42/Pents03.jpg",
    meaning: "团队合作，协作，学习，工艺精湛。",
    reversedMeaning: "缺乏协作，技能不足，冲突。",
  },
  {
    id: 67,
    name: "星币四 (Four of Pentacles)",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/35/Pents04.jpg",
    meaning: "守财，稳定，掌控，吝啬。",
    reversedMeaning: "慷慨，放手，不安全感。",
  },
  {
    id: 68,
    name: "星币五 (Five of Pentacles)",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/96/Pents05.jpg",
    meaning: "财务困境，孤立，匮乏，不安全感。",
    reversedMeaning: "复苏，寻求帮助，状况改善。",
  },
  {
    id: 69,
    name: "星币六 (Six of Pentacles)",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Pents06.jpg",
    meaning: "慷慨，慈善，公平分配资源。",
    reversedMeaning: "自私，不公平，债务。",
  },
  {
    id: 70,
    name: "星币七 (Seven of Pentacles)",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Pents07.jpg",
    meaning: "长期规划，评估进度，耐心。",
    reversedMeaning: "缺乏耐性，投资回报差，停滞。",
  },
  {
    id: 71,
    name: "星币八 (Eight of Pentacles)",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/49/Pents08.jpg",
    meaning: "勤奋，精通，对细节的关注。",
    reversedMeaning: "缺乏动力，草率，完美主义受挫。",
  },
  {
    id: 72,
    name: "星币九 (Nine of Pentacles)",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Pents09.jpg",
    meaning: "富足，自给自足，奢华，独立。",
    reversedMeaning: "过度依赖，财务损失，虚假外观。",
  },
  {
    id: 73,
    name: "星币十 (Ten of Pentacles)",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/42/Pents10.jpg",
    meaning: "传承，繁荣，稳定的家庭基础。",
    reversedMeaning: "遗产纠纷，家庭财务不稳定。",
  },
  {
    id: 74,
    name: "星币侍从 (Page of Pentacles)",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Pents11.jpg",
    meaning: "雄心，学习，财务机会，务实。",
    reversedMeaning: "缺乏视野，短视，贪婪。",
  },
  {
    id: 75,
    name: "星币骑士 (Knight of Pentacles)",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Pents12.jpg",
    meaning: "可靠，努力，常规，坚定不移。",
    reversedMeaning: "墨守成规，停滞，冷漠。",
  },
  {
    id: 76,
    name: "星币女王 (Queen of Pentacles)",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/88/Pents13.jpg",
    meaning: "务实，慷慨，培育，安全感。",
    reversedMeaning: "物质主义，自我怀疑，不安全感。",
  },
  {
    id: 77,
    name: "星币国王 (King of Pentacles)",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Pents14.jpg",
    meaning: "财务智慧，繁荣，稳定的领导力。",
    reversedMeaning: "贪婪，腐败，短视。",
  },
];

export const TAROT_DECK: TarotCard[] = [...MAJOR_ARCANA, ...MINOR_ARCANA];
