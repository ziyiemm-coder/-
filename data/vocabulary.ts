
import { Word } from '../types';

export const VOCABULARY_DATA: Word[] = [
  {
    id: 1,
    term: "advent",
    phonetic: "/ˈæd.vent/",
    pos: "n.",
    definitionZh: "出现；到来",
    definitionEn: "the arrival of a notable person, thing, or event",
    exampleEn: "The advent of the Internet has changed people's lives greatly.",
    exampleZh: "互联网的出现极大地改变了人们的生活。",
    derivatives: [
      { word: "adventure", pos: "n.", definition: "冒险" },
      { word: "adventurous", pos: "adj.", definition: "爱冒险的" }
    ],
    roots: "ad- (to) + ven- (come)"
  },
  {
    id: 2,
    term: "constraint",
    phonetic: "/kənˈstreɪnt/",
    pos: "n.",
    definitionZh: "限制；约束",
    definitionEn: "a limitation or restriction",
    exampleEn: "Time constraints make it difficult to finish the project.",
    exampleZh: "时间限制使得完成这项项目变得很困难。",
    derivatives: [
      { word: "constrain", pos: "v.", definition: "强迫；限制" },
      { word: "constrained", pos: "adj.", definition: "受限的；不自然的" }
    ],
    roots: "con- (together) + stringere (bind)"
  },
  {
    id: 3,
    term: "anonymous",
    phonetic: "/əˈnɒn.ɪ.məs/",
    pos: "adj.",
    definitionZh: "匿名的",
    definitionEn: "of a person) not identified by name; of unknown name",
    exampleEn: "An anonymous donor gave a large sum of money to the charity.",
    exampleZh: "一位匿名捐赠者向慈善机构捐了一大笔钱。",
    derivatives: [
      { word: "anonymity", pos: "n.", definition: "匿名状态" },
      { word: "anonymously", pos: "adv.", definition: "匿名地" }
    ],
    roots: "an- (without) + onoma (name)"
  },
  {
    id: 4,
    term: "apprehensive",
    phonetic: "/ˌæp.rɪˈhen.sɪv/",
    pos: "adj.",
    definitionZh: "担忧的；不安的",
    definitionEn: "anxious or fearful that something bad or unpleasant will happen",
    exampleEn: "She felt apprehensive about her future.",
    exampleZh: "她对自己的未来感到担忧。",
    derivatives: [
      { word: "apprehend", pos: "v.", definition: "理解；逮捕" },
      { word: "apprehension", pos: "n.", definition: "忧虑；领悟" },
      { word: "apprehensively", pos: "adv.", definition: "担心地" }
    ]
  },
  {
    id: 5,
    term: "agile",
    phonetic: "/ˈædʒ.aɪl/",
    pos: "adj.",
    definitionZh: "敏捷的；灵活的",
    definitionEn: "able to move quickly and easily",
    exampleEn: "The athlete is agile in movement.",
    exampleZh: "这位运动员动作敏捷。",
    derivatives: [
      { word: "agility", pos: "n.", definition: "敏捷；灵活" },
      { word: "agilely", pos: "adv.", definition: "敏捷地" }
    ]
  },
  {
    id: 6,
    term: "atrophy",
    phonetic: "/ˈæt.rə.fi/",
    pos: "v./n.",
    definitionZh: "（使）萎缩；衰退",
    definitionEn: "gradually decline in effectiveness or vigor due to underuse or neglect",
    exampleEn: "Our unused muscles will atrophy.",
    exampleZh: "我们不用的肌肉会萎缩。",
    derivatives: [
      { word: "atrophied", pos: "adj.", definition: "萎缩的" }
    ]
  },
  {
    id: 7,
    term: "benevolent",
    phonetic: "/bəˈnev.əl.ənt/",
    pos: "adj.",
    definitionZh: "仁慈的；慷慨的",
    definitionEn: "well meaning and kindly",
    exampleEn: "The benevolent old man often helps the poor.",
    exampleZh: "这位仁慈的老人经常帮助穷人。",
    derivatives: [
      { word: "benevolence", pos: "n.", definition: "仁慈；善行" },
      { word: "benevolently", pos: "adv.", definition: "仁慈地" }
    ]
  },
  {
    id: 8,
    term: "breach",
    phonetic: "/briːtʃ/",
    pos: "v./n.",
    definitionZh: "违反；破坏；缺口",
    definitionEn: "an act of breaking or failing to observe a law, agreement, or code of conduct",
    exampleEn: "He breached the contract by failing to deliver goods on time.",
    exampleZh: "他因未按时交货而违反了合同。",
    derivatives: []
  },
  {
    id: 9,
    term: "censure",
    phonetic: "/ˈsen.ʃər/",
    pos: "v./n.",
    definitionZh: "严厉批评；谴责",
    definitionEn: "express severe disapproval of (someone or something), especially in a formal statement",
    exampleEn: "He was censured for corruption.",
    exampleZh: "他因腐败受到了严厉谴责。",
    derivatives: [
      { word: "censurable", pos: "adj.", definition: "该责备的" }
    ]
  },
  {
    id: 10,
    term: "cloister",
    phonetic: "/ˈklɔɪ.stər/",
    pos: "v./n.",
    definitionZh: "使与世隔绝；修道院回廊",
    definitionEn: "seclude or shut up in or as if in a convent or monastery",
    exampleEn: "She cloistered herself in her room to finish the work.",
    exampleZh: "她闭门不出，以便完成工作。",
    derivatives: [
      { word: "cloistered", pos: "adj.", definition: "隐居的；与世隔绝的" }
    ]
  },
  {
    id: 11,
    term: "compliant",
    phonetic: "/kəmˈplaɪ.ənt/",
    pos: "adj.",
    definitionZh: "顺从的；符合的",
    definitionEn: "inclined to agree with others or obey rules, especially to an excessive degree",
    exampleEn: "A compliant workforce is essential for smooth factory operations.",
    exampleZh: "顺从的劳动力对于工厂的平稳运行至关重要。",
    derivatives: [
      { word: "compliance", pos: "n.", definition: "服从；顺从" },
      { word: "comply", pos: "v.", definition: "遵守；遵从" }
    ]
  },
  {
    id: 12,
    term: "conceive",
    phonetic: "/kənˈsiːv/",
    pos: "v.",
    definitionZh: "构想；设想；怀孕",
    definitionEn: "form or devise (a plan or idea) in the mind",
    exampleEn: "It is hard to conceive of a world without technology.",
    exampleZh: "很难想象一个没有科技的世界。",
    derivatives: [
      { word: "concept", pos: "n.", definition: "概念；观念" },
      { word: "conception", pos: "n.", definition: "受孕；设想" },
      { word: "conceivable", pos: "adj.", definition: "可想象的" }
    ]
  },
  {
    id: 13,
    term: "conjugal",
    phonetic: "/ˈkɒn.dʒə.ɡəl/",
    pos: "adj.",
    definitionZh: "婚姻的；夫妻的",
    definitionEn: "relating to marriage or the relationship between a married couple",
    exampleEn: "They are entitled to conjugal visits.",
    exampleZh: "他们有权进行探亲假（夫妻团聚）。",
    derivatives: []
  },
  {
    id: 14,
    term: "console",
    phonetic: "/kənˈsəʊl/",
    pos: "v./n.",
    definitionZh: "安慰；慰藉；控制台",
    definitionEn: "comfort (someone) at a time of grief or disappointment",
    exampleEn: "She tried to console her sobbing friend.",
    exampleZh: "她试图安慰她那泣不成声的朋友。",
    derivatives: [
      { word: "consolation", pos: "n.", definition: "安慰；慰藉" },
      { word: "consoling", pos: "adj.", definition: "令人欣慰的" }
    ]
  },
  {
    id: 15,
    term: "cosmopolitan",
    phonetic: "/ˌkɒz.məˈpɒl.ɪ.tən/",
    pos: "adj.",
    definitionZh: "国际化的；世界性的",
    definitionEn: "including or containing people from many different countries",
    exampleEn: "London is a truly cosmopolitan city.",
    exampleZh: "伦敦是一个真正的国际化大都市。",
    derivatives: [
      { word: "cosmopolitanism", pos: "n.", definition: "世界主义" }
    ]
  },
  {
    id: 16,
    term: "ascertainable",
    phonetic: "/ˌæs.əˈteɪ.nə.bəl/",
    pos: "adj.",
    definitionZh: "可确定的；可查明的",
    definitionEn: "able to be found out or learned with certainty",
    exampleEn: "The facts of the case are easily ascertainable.",
    exampleZh: "案件事实很容易查明。",
    derivatives: [
      { word: "ascertain", pos: "v.", definition: "查明；确定" }
    ]
  },
  {
    id: 17,
    term: "disintegrate",
    phonetic: "/dɪˈsɪn.tɪ.ɡreɪt/",
    pos: "v.",
    definitionZh: "瓦解；碎裂",
    definitionEn: "break up into small parts as the result of impact or decay",
    exampleEn: "The old building is starting to disintegrate.",
    exampleZh: "旧建筑开始瓦解了。",
    derivatives: [
      { word: "disintegration", pos: "n.", definition: "解体；瓦解" }
    ]
  },
  {
    id: 18,
    term: "subsistence",
    phonetic: "/səbˈsɪs.təns/",
    pos: "n.",
    definitionZh: "生计；生存",
    definitionEn: "the action or fact of maintaining or supporting oneself at a minimum level",
    exampleEn: "The family lived on a subsistence level.",
    exampleZh: "全家过着维持生计的生活。",
    derivatives: [
      { word: "subsist", pos: "v.", definition: "生存；维持" }
    ]
  },
  {
    id: 19,
    term: "persist",
    phonetic: "/pəˈsɪst/",
    pos: "v.",
    definitionZh: "坚持；持续",
    definitionEn: "continue firmly or obstinately in an opinion or a course of action in spite of difficulty",
    exampleEn: "If symptoms persist, consult a doctor.",
    exampleZh: "如果症状持续，请咨询医生。",
    derivatives: [
      { word: "persistence", pos: "n.", definition: "毅力；持续" },
      { word: "persistent", pos: "adj.", definition: "持续的；执着的" }
    ]
  },
  {
    id: 20,
    term: "disparity",
    phonetic: "/dɪˈspær.ə.ti/",
    pos: "n.",
    definitionZh: "巨大差异；悬殊",
    definitionEn: "a great difference",
    exampleEn: "There is a growing disparity between rich and poor.",
    exampleZh: "贫富差距正在日益扩大。",
    derivatives: []
  },
  {
    id: 21,
    term: "rigorous",
    phonetic: "/ˈrɪɡ.ər.əs/",
    pos: "adj.",
    definitionZh: "严格的；严谨的",
    definitionEn: "extremely thorough, exhaustive, or accurate",
    exampleEn: "The students underwent rigorous training.",
    exampleZh: "学生们接受了严格的训练。",
    derivatives: [
      { word: "rigor", pos: "n.", definition: "严厉；严格" },
      { word: "rigorously", pos: "adv.", definition: "严格地" }
    ]
  },
  {
    id: 22,
    term: "disruptive",
    phonetic: "/dɪsˈrʌp.tɪv/",
    pos: "adj.",
    definitionZh: "破坏性的；扰乱性的",
    definitionEn: "causing or tending to cause disruption",
    exampleEn: "Disruptive behavior in the classroom will not be tolerated.",
    exampleZh: "教室内扰乱秩序的行为是不能容忍的。",
    derivatives: [
      { word: "disrupt", pos: "v.", definition: "中断；破坏" },
      { word: "disruption", pos: "n.", definition: "破坏；扰乱" }
    ]
  },
  {
    id: 23,
    term: "elicit",
    phonetic: "/iˈlɪs.ɪt/",
    pos: "v.",
    definitionZh: "引出；诱发",
    definitionEn: "evoke or draw out (a response, answer, or fact) from someone in reaction to one's own actions or questions",
    exampleEn: "The questionnaire was intended to elicit information on eating habits.",
    exampleZh: "该问卷旨在引出有关饮食习惯的信息。",
    derivatives: []
  },
  {
    id: 24,
    term: "enormity",
    phonetic: "/ɪˈnɔː.mə.ti/",
    pos: "n.",
    definitionZh: "严重性；巨大",
    definitionEn: "the great or extreme scale, seriousness, or extent of something perceived as bad or morally wrong",
    exampleEn: "They were overwhelmed by the enormity of the task.",
    exampleZh: "他们被这项任务的巨大性压垮了。",
    derivatives: [
      { word: "enormous", pos: "adj.", definition: "巨大的" }
    ]
  },
  {
    id: 25,
    term: "dictate",
    phonetic: "/dɪkˈteɪt/",
    pos: "v./n.",
    definitionZh: "命令；口述",
    definitionEn: "lay down authoritatively; prescribe",
    exampleEn: "The rules dictate that you must wear a uniform.",
    exampleZh: "规则规定你必须穿制服。",
    derivatives: [
      { word: "dictation", pos: "n.", definition: "听写" },
      { word: "dictator", pos: "n.", definition: "独裁者" },
      { word: "dictionary", pos: "n.", definition: "字典" }
    ]
  },
  {
    id: 26,
    term: "exactitude",
    phonetic: "/ɪɡˈzæk.tɪ.tʃuːd/",
    pos: "n.",
    definitionZh: "精确；准确",
    definitionEn: "the quality of being exact",
    exampleEn: "He performed his duties with great exactitude.",
    exampleZh: "他非常准确地履行了自己的职责。",
    derivatives: [
      { word: "exact", pos: "adj.", definition: "准确的" },
      { word: "exactly", pos: "adv.", definition: "准确地" }
    ]
  },
  {
    id: 27,
    term: "contemporaneous",
    phonetic: "/kənˌtem.pəˈreɪ.ni.əs/",
    pos: "adj.",
    definitionZh: "同时期的",
    definitionEn: "existing or occurring in the same period of time",
    exampleEn: "The two events were contemporaneous.",
    exampleZh: "这两起事件发生在同一时期。",
    derivatives: [
      { word: "contemporary", pos: "n./adj.", definition: "同时代的人；当代的" }
    ]
  },
  {
    id: 28,
    term: "persistent",
    phonetic: "/pəˈsɪs.tənt/",
    pos: "adj.",
    definitionZh: "持续的；固执的",
    definitionEn: "continuing firmly or obstinately in a course of action in spite of difficulty or opposition",
    exampleEn: "He has been a persistent critic of the government.",
    exampleZh: "他一直是政府坚持不懈的批评者。",
    derivatives: [
      { word: "persist", pos: "v.", definition: "坚持" },
      { word: "persistence", pos: "n.", definition: "毅力" }
    ]
  },
  {
    id: 29,
    term: "exasperate",
    phonetic: "/ɪɡˈzæz.pə.reɪt/",
    pos: "v.",
    definitionZh: "激怒；使恼怒",
    definitionEn: "irritate and frustrate (someone) intensely",
    exampleEn: "The constant noise exasperated the neighbors.",
    exampleZh: "持续不断的噪音激怒了邻居们。",
    derivatives: [
      { word: "exasperation", pos: "n.", definition: "恼怒" }
    ]
  },
  {
    id: 30,
    term: "prodigy",
    phonetic: "/ˈprɒd.ɪ.dʒi/",
    pos: "n.",
    definitionZh: "神童；奇才",
    definitionEn: "a person, especially a young one, endowed with exceptional qualities or abilities",
    exampleEn: "Mozart was a musical prodigy.",
    exampleZh: "莫扎特是一位音乐神童。",
    derivatives: [
      { word: "prodigious", pos: "adj.", definition: "巨大的；惊人的" }
    ]
  },
  {
    id: 31,
    term: "devolution",
    phonetic: "/ˌdiː.vəˈluː.ʃən/",
    pos: "n.",
    definitionZh: "权力下放；转移",
    definitionEn: "the transfer or delegation of power to a lower level",
    exampleEn: "The devolution of power to local governments.",
    exampleZh: "权力向地方政府下放。",
    derivatives: [
      { word: "devolve", pos: "v.", definition: "移交；退化" }
    ]
  },
  {
    id: 32,
    term: "prioritize",
    phonetic: "/praɪˈɒr.ɪ.taɪz/",
    pos: "v.",
    definitionZh: "优先考虑",
    definitionEn: "determine the order for dealing with (a series of items or tasks) according to their relative importance",
    exampleEn: "You need to prioritize your tasks.",
    exampleZh: "你需要确定任务的优先级。",
    derivatives: [
      { word: "priority", pos: "n.", definition: "优先权" }
    ]
  },
  {
    id: 33,
    term: "judicious",
    phonetic: "/dʒuːˈdɪʃ.əs/",
    pos: "adj.",
    definitionZh: "明智的；审慎的",
    definitionEn: "having, showing, or done with good judgment or sense",
    exampleEn: "We should make a judicious use of our resources.",
    exampleZh: "我们应该明智地利用资源。",
    derivatives: [
      { word: "judiciously", pos: "adv.", definition: "明智地" }
    ]
  },
  {
    id: 34,
    term: "manifest",
    phonetic: "/ˈmæn.ɪ.fest/",
    pos: "adj./v.",
    definitionZh: "明显的；显现",
    definitionEn: "clear or obvious to the eye or mind",
    exampleEn: "His anger was manifest to everyone.",
    exampleZh: "他的愤怒对每个人来说都是显而易见的。",
    derivatives: [
      { word: "manifestation", pos: "n.", definition: "表现；显示" }
    ]
  },
  {
    id: 35,
    term: "ooze",
    phonetic: "/uːz/",
    pos: "v./n.",
    definitionZh: "渗出；渗漏",
    definitionEn: "(of a fluid) slowly trickle or seep out of an expression or gradually",
    exampleEn: "Blood began to ooze from the wound.",
    exampleZh: "血开始从伤口渗出。",
    derivatives: []
  },
  {
    id: 36,
    term: "overbearing",
    phonetic: "/ˌəʊ.vəˈbeə.rɪŋ/",
    pos: "adj.",
    definitionZh: "专横的；傲慢的",
    definitionEn: "unpleasantly overpowering",
    exampleEn: "She found him overbearing and arrogant.",
    exampleZh: "她觉得他专横跋扈，傲慢自大。",
    derivatives: []
  },
  {
    id: 37,
    term: "plight",
    phonetic: "/plaɪt/",
    pos: "n.",
    definitionZh: "困境；苦境",
    definitionEn: "a dangerous, difficult, or otherwise unfortunate situation",
    exampleEn: "We must consider the plight of the homeless.",
    exampleZh: "我们必须考虑无家可归者的境遇。",
    derivatives: []
  },
  {
    id: 38,
    term: "precarious",
    phonetic: "/prɪˈkeə.ri.əs/",
    pos: "adj.",
    definitionZh: "不稳定的；危险的",
    definitionEn: "not securely held or in position; dangerously likely to fall or collapse",
    exampleEn: "He earned a precarious living as a musician.",
    exampleZh: "他作为一名音乐家过着不稳定的生活。",
    derivatives: [
      { word: "precariously", pos: "adv.", definition: "不稳固地" }
    ]
  },
  {
    id: 39,
    term: "dismay",
    phonetic: "/dɪsˈmeɪ/",
    pos: "n./v.",
    definitionZh: "沮丧；失望",
    definitionEn: "consternation and distress, typically caused by something unexpected",
    exampleEn: "To her dismay, the project was cancelled.",
    exampleZh: "令她沮丧的是，该项目被取消了。",
    derivatives: []
  },
  {
    id: 40,
    term: "rebuke",
    phonetic: "/rɪˈbjuːk/",
    pos: "v./n.",
    definitionZh: "斥责；指责",
    definitionEn: "express sharp disapproval or criticism of (someone) because of their actions or behavior",
    exampleEn: "The teacher rebuked the student for being late.",
    exampleZh: "老师斥责该学生迟到。",
    derivatives: []
  },
  {
    id: 41,
    term: "recalcitrant",
    phonetic: "/rɪˈkæl.sɪ.trənt/",
    pos: "adj.",
    definitionZh: "顽固的；不服从的",
    definitionEn: "having an obstinately uncooperative attitude toward authority or discipline",
    exampleEn: "The recalcitrant child refused to eat his vegetables.",
    exampleZh: "那个倔强的孩子拒绝吃蔬菜。",
    derivatives: []
  },
  {
    id: 42,
    term: "replenish",
    phonetic: "/rɪˈplen.ɪʃ/",
    pos: "v.",
    definitionZh: "补充；重新装满",
    definitionEn: "fill (something) up again",
    exampleEn: "We need to replenish our food supplies.",
    exampleZh: "我们需要补充我们的食物供应。",
    derivatives: [
      { word: "replenishment", pos: "n.", definition: "补充" }
    ]
  },
  {
    id: 43,
    term: "relish",
    phonetic: "/ˈrel.ɪʃ/",
    pos: "v./n.",
    definitionZh: "享受；喜爱",
    definitionEn: "enjoy greatly",
    exampleEn: "He relishes the challenge of a new job.",
    exampleZh: "他喜欢新工作的挑战。",
    derivatives: []
  },
  {
    id: 44,
    term: "spawn",
    phonetic: "/spɔːn/",
    pos: "v./n.",
    definitionZh: "产卵；产生",
    definitionEn: "produce or generate a large number of",
    exampleEn: "The success of the movie spawned several sequels.",
    exampleZh: "该电影的成功催生了几部续集。",
    derivatives: []
  },
  {
    id: 45,
    term: "adhere to",
    phonetic: "/ədˈhɪər tuː/",
    pos: "phr.v.",
    definitionZh: "坚持；遵守",
    definitionEn: "stick fast to (a surface or substance)",
    exampleEn: "We must adhere to the rules.",
    exampleZh: "我们必须遵守规则。",
    derivatives: []
  },
  {
    id: 46,
    term: "lash out",
    phonetic: "/læʃ aʊt/",
    pos: "phr.v.",
    definitionZh: "猛烈抨击",
    definitionEn: "attack someone physically or with words",
    exampleEn: "The politician lashed out at his critics.",
    exampleZh: "这位政治家猛烈抨击了他的批评者。",
    derivatives: []
  },
  {
    id: 47,
    term: "culminate in",
    phonetic: "/ˈkʌl.mɪ.neɪt ɪn/",
    pos: "phr.v.",
    definitionZh: "以...告终；达到顶点",
    definitionEn: "reach a climax or point of highest development",
    exampleEn: "His years of hard work culminated in success.",
    exampleZh: "他多年的努力最终以成功告终。",
    derivatives: [
      { word: "culmination", pos: "n.", definition: "顶点；终点" }
    ]
  },
  {
    id: 48,
    term: "cut back on",
    phonetic: "/kʌt bæk ɒn/",
    pos: "phr.v.",
    definitionZh: "削减；减少",
    definitionEn: "reduce the amount of something being used",
    exampleEn: "We need to cut back on expenses.",
    exampleZh: "我们需要削减开支。",
    derivatives: []
  },
  {
    id: 49,
    term: "embark on",
    phonetic: "/ɪmˈbɑːk ɒn/",
    pos: "phr.v.",
    definitionZh: "开始；从事",
    definitionEn: "begin (a course of action, especially one that is important or demanding)",
    exampleEn: "She is about to embark on a new career.",
    exampleZh: "她即将开始一段新的职业生涯。",
    derivatives: []
  },
  {
    id: 50,
    term: "heedless of",
    phonetic: "/ˈhiːd.ləs ɒv/",
    pos: "phr.v.",
    definitionZh: "不顾；不注意",
    definitionEn: "showing a reckless lack of care or attention",
    exampleEn: "He ran into the burning building, heedless of the danger.",
    exampleZh: "他不顾危险，跑进了燃烧的大楼。",
    derivatives: []
  },
  {
    id: 51,
    term: "pare down",
    phonetic: "/peə daʊn/",
    pos: "phr.v.",
    definitionZh: "削减；精简",
    definitionEn: "reduce something in size, extent, or quantity in a number of small stages",
    exampleEn: "The company had to pare down its staff.",
    exampleZh: "公司不得不裁减人员。",
    derivatives: []
  },
  {
    id: 52,
    term: "pass for",
    phonetic: "/pɑːs fɔːr/",
    pos: "phr.v.",
    definitionZh: "被当作",
    definitionEn: "be accepted as or mistaken for someone or something else",
    exampleEn: "With his new haircut, he could pass for a teenager.",
    exampleZh: "剪了新发型，他可以被当作一个青少年。",
    derivatives: []
  },
  {
    id: 53,
    term: "phase out",
    phonetic: "/feɪz aʊt/",
    pos: "phr.v.",
    definitionZh: "逐步淘汰",
    definitionEn: "discontinue something gradually or in stages",
    exampleEn: "The old models are being phased out.",
    exampleZh: "旧型号正在被逐步淘汰。",
    derivatives: []
  },
  {
    id: 54,
    term: "succumb to",
    phonetic: "/səˈkʌm tuː/",
    pos: "phr.v.",
    definitionZh: "屈服于；死于",
    definitionEn: "fail to resist pressure, temptation, or some other negative force",
    exampleEn: "He finally succumbed to his illness.",
    exampleZh: "他最终死于疾病。",
    derivatives: []
  }
];
