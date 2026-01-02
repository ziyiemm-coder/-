
import { Word } from '../types';

export const VOCABULARY_DATA: Word[] = [
  {
    id: 1, term: "advent", phonetic: "/ˈædvənt/", pos: "n.", definitionZh: "出现；到来", definitionEn: "arrival of events", exampleEn: "The advent of the Internet has changed people's lives greatly.", exampleZh: "互联网的出现极大地改变了人们的生活。",
    derivatives: [
      {word: "adventitious", pos: "adj.", definition: "偶然的；外来的"},
      {word: "adventurer", pos: "n.", definition: "冒险家；投机者"},
      {word: "adventurous", pos: "adj.", definition: "冒险的；大胆的"}
    ],
    roots: "ad- (to) + vent (come). Common collocation: adventurous spirit (冒险精神), adventitious circumstances (偶然情况)."
  },
  {
    id: 2, term: "constraint", phonetic: "/kənˈstreɪnt/", pos: "n.", definitionZh: "限制；约束", definitionEn: "a limit or restriction", exampleEn: "The time is the main constraint.", exampleZh: "时间是主要的限制因素。",
    derivatives: [
      {word: "constrain", pos: "v.", definition: "限制；约束；强迫"}
    ],
    roots: "con- (together) + stringere (bind). Collocation: constrain sb. to do sth. (强迫某人做某事), constrain the development (限制发展)."
  },
  {
    id: 3, term: "anonymous", phonetic: "/əˈnɒnɪməs/", pos: "adj.", definitionZh: "匿名的；无名的", definitionEn: "not named, or identified", exampleEn: "An anonymous donor gave a large sum of money to the charity.", exampleZh: "一位匿名捐赠者向慈善机构捐了一大笔钱。",
    derivatives: [
      {word: "anonymity", pos: "n.", definition: "匿名；匿名权"},
      {word: "anonymously", pos: "adv.", definition: "匿名地"}
    ],
    roots: "an- (without) + onyma (name). Collocation: preserve anonymity (保持匿名), submit an anonymous letter (提交匿名信)."
  },
  {
    id: 4, term: "apprehensive", phonetic: "/ˌæprɪˈhensɪv/", pos: "adj.", definitionZh: "担忧的；不安的", definitionEn: "anxious, worried about sth.", exampleEn: "She felt apprehensive about her future.", exampleZh: "她对自己的未来感到担忧。",
    derivatives: [
      {word: "apprehension", pos: "n.", definition: "担忧；理解；逮捕"},
      {word: "apprehend", pos: "v.", definition: "逮捕；理解；担忧"}
    ],
    roots: "ad- (to) + prehendere (seize). Collocation: apprehension about sth. (对某事的担忧), apprehend the meaning (理解含义)."
  },
  {
    id: 5, term: "agile", phonetic: "/ˈædʒaɪl/", pos: "adj.", definitionZh: "敏捷的；灵活的", definitionEn: "quick, flexible", exampleEn: "The athlete is agile in movement.", exampleZh: "这位运动员动作敏捷。",
    derivatives: [
      {word: "agility", pos: "n.", definition: "敏捷；灵活性"},
      {word: "agilely", pos: "adv.", definition: "敏捷地；灵活地"}
    ],
    roots: "agere (do/act). Collocation: physical agility (身体敏捷), mental agility (思维敏捷)."
  },
  {
    id: 6, term: "atrophy", phonetic: "/ˈætrəfi/", pos: "v./n.", definitionZh: "（使）萎缩；衰退", definitionEn: "to weaken, decrease in power or strength", exampleEn: "Our unused muscles will atrophy.", exampleZh: "我们不用的肌肉会萎缩。",
    derivatives: [
      {word: "atrophic", pos: "adj.", definition: "萎缩的；衰退的"}
    ],
    roots: "a- (not) + trophē (nourishment). Collocation: atrophic muscles (萎缩的肌肉), atrophic gastritis (萎缩性胃炎)."
  },
  {
    id: 7, term: "benevolent", phonetic: "/bəˈnevələnt/", pos: "adj.", definitionZh: "仁慈的；慷慨的", definitionEn: "kind, generous", exampleEn: "The benevolent old man often helps the poor.", exampleZh: "这位仁慈的老人经常帮助穷人。",
    derivatives: [
      {word: "benevolence", pos: "n.", definition: "仁慈；善意；捐赠"},
      {word: "benevolently", pos: "adv.", definition: "仁慈地；慷慨地"}
    ],
    roots: "bene (well) + velle (wish). Collocation: act with benevolence (以仁慈行事), benevolence fund (慈善基金)."
  },
  {
    id: 8, term: "breach", phonetic: "/briːtʃ/", pos: "v./n.", definitionZh: "违反；破坏；缺口", definitionEn: "violate or break", exampleEn: "He breached the contract by failing to deliver the goods on time.", exampleZh: "他因未按时交货而违反了合同。",
    derivatives: [
      {word: "breachable", pos: "adj.", definition: "可突破的；可违反的"},
      {word: "breacher", pos: "n.", definition: "突破者；破坏者"}
    ],
    roots: "Germanic break. Collocation: breachable defense (可突破的防御), a breach of trust (违背信任)."
  },
  {
    id: 9, term: "censure", phonetic: "/ˈsenʃər/", pos: "v./n.", definitionZh: "严厉批评；谴责", definitionEn: "to strongly criticize sb.", exampleEn: "He was censured for corruption.", exampleZh: "他因腐败受到了严厉谴责。",
    derivatives: [
      {word: "censurable", pos: "adj.", definition: "应受谴责的；该受责备的"},
      {word: "censorship", pos: "n.", definition: "审查制度；审查"},
      {word: "censurer", pos: "n.", definition: "谴责者；指责者"}
    ],
    roots: "censere (assess). Collocation: censorship of media (媒体审查), censurable behavior (应受谴责的行为)."
  },
  {
    id: 10, term: "cloister", phonetic: "/ˈklɔɪstər/", pos: "v./n.", definitionZh: "使与世隔绝；修道院回廊", definitionEn: "be enclosed", exampleEn: "She cloistered herself in her room to finish the work.", exampleZh: "她闭门不出，以便完成工作。",
    derivatives: [
      {word: "cloistered", pos: "adj.", definition: "与世隔绝的；隐居的；修道院的"}
    ],
    roots: "claudere (to close). Collocation: a cloistered life (隐居生活), cloistered gardens (修道院回廊花园)."
  },
  {
    id: 11, term: "compliant", phonetic: "/kəmˈplaɪənt/", pos: "adj.", definitionZh: "顺从的；遵守规则的", definitionEn: "be willing to obey rules (obedient to)", exampleEn: "The student is compliant with the school regulations.", exampleZh: "这位学生遵守学校规章制度。",
    derivatives: [
      {word: "comply", pos: "v.", definition: "遵守；顺从"},
      {word: "compliance", pos: "n.", definition: "遵守；顺从；符合"},
      {word: "compliantly", pos: "adv.", definition: "顺从地；遵守地"}
    ],
    roots: "com- (with) + plere (fill). Collocation: comply with rules (遵守规则), in compliance with (符合；遵照)."
  },
  {
    id: 12, term: "conceive", phonetic: "/kənˈsiːv/", pos: "v.", definitionZh: "构想；设想；怀孕", definitionEn: "to form an idea", exampleEn: "She conceived a new plan to solve the problem.", exampleZh: "她想出了一个解决问题的新方案。",
    derivatives: [
      {word: "conception", pos: "n.", definition: "概念；构想；怀孕"},
      {word: "conceivable", pos: "adj.", definition: "可想象的；可能的"},
      {word: "conceivably", pos: "adv.", definition: "可想象地；可能地"},
      {word: "conceiver", pos: "n.", definition: "构想者；怀孕者"}
    ],
    roots: "con- (together) + capere (take). Collocation: conceive of (构想), beyond conception (难以想象)."
  },
  {
    id: 13, term: "conjugal", phonetic: "/ˈkɒndʒʊɡəl/", pos: "adj.", definitionZh: "婚姻的；夫妻之间的", definitionEn: "related to marriage", exampleEn: "They have a happy conjugal relationship.", exampleZh: "他们有着幸福的夫妻关系。",
    derivatives: [
      {word: "conjugate", pos: "v.", definition: "结合；共轭；动词变位"},
      {word: "conjugation", pos: "n.", definition: "结合；动词变位；共轭"}
    ],
    roots: "con- (together) + jugum (yoke). Collocation: conjugate verbs (动词变位), conjugate pairs (共轭对)."
  },
  {
    id: 14, term: "console", phonetic: "/kənˈsəʊl/", pos: "v./n.", definitionZh: "安慰；慰藉；控制台", definitionEn: "to comfort sb.", exampleEn: "She tried to console him after his failure.", exampleZh: "他失败后，她试图安慰他。",
    derivatives: [
      {word: "consolation", pos: "n.", definition: "安慰；慰藉；令人安慰的人或事"},
      {word: "consolatory", pos: "adj.", definition: "安慰的；慰藉的"},
      {word: "consoler", pos: "n.", definition: "安慰者"}
    ],
    roots: "con- (together) + solari (soothe). Collocation: find consolation in (在……中寻求安慰), consolatory words (安慰的话)."
  },
  {
    id: 15, term: "cosmopolitan", phonetic: "/ˌkɒzməˈpɒlɪtən/", pos: "adj.", definitionZh: "国际化的；世界性的", definitionEn: "international, diverse", exampleEn: "Guangzhou is a cosmopolitan city.", exampleZh: "广州是一座国际化的城市。",
    derivatives: [
      {word: "cosmopolitanism", pos: "n.", definition: "世界主义；四海为家的精神"},
      {word: "cosmopolite", pos: "n.", definition: "世界主义者；四海为家的人"}
    ],
    roots: "kosmos (world) + politēs (citizen). Collocation: cosmopolitanism outlook (世界主义视野), cosmopolite lifestyle (四海为家的生活方式)."
  },
  {
    id: 16, term: "ascertainable", phonetic: "/ˌæsəˈteɪnəbl/", pos: "adj.", definitionZh: "可确定的；可查明的", definitionEn: "able to be found out", exampleEn: "There are ascertainable facts to support his claim.", exampleZh: "有可查明的事实支持他的主张。",
    derivatives: [
      {word: "ascertain", pos: "v.", definition: "确定；查明；弄清"},
      {word: "ascertainment", pos: "n.", definition: "确定；查明"}
    ],
    roots: "ad- (to) + certus (certain). Collocation: ascertain the truth (查明真相), ascertain sb.'s intentions (弄清某人的意图)."
  },
  {
    id: 17, term: "disintegrate", phonetic: "/dɪsˈɪntɪɡreɪt/", pos: "v.", definitionZh: "分解；瓦解；碎裂", definitionEn: "break into parts", exampleEn: "The building is disintegrating due to years of neglect.", exampleZh: "这座建筑因多年失修而逐渐破败。",
    derivatives: [
      {word: "disintegration", pos: "n.", definition: "分解；瓦解；碎裂"},
      {word: "disintegrative", pos: "adj.", definition: "分解的；瓦解的"},
      {word: "disintegrator", pos: "n.", definition: "分解器；粉碎机"}
    ],
    roots: "dis- (apart) + integrate. Collocation: disintegration of the empire (帝国的瓦解), nuclear disintegration (核裂变)."
  },
  {
    id: 18, term: "subsistence", phonetic: "/səbˈsɪstəns/", pos: "n.", definitionZh: "生计；生存", definitionEn: "basic means of living", exampleEn: "Farming is their subsistence.", exampleZh: "务农是他们的生计来源。",
    derivatives: [
      {word: "subsist", pos: "v.", definition: "生存；维持生活；存在"},
      {word: "subsistent", pos: "adj.", definition: "存在的；生存的"},
      {word: "subsistently", pos: "adv.", definition: "生存地；存在地"}
    ],
    roots: "sub- (below) + sistere (stand). Collocation: subsist on (靠……生存), subsistent farming (自给农业)."
  },
  {
    id: 19, term: "persist", phonetic: "/pəˈsɪst/", pos: "v.", definitionZh: "坚持；持续", definitionEn: "insist", exampleEn: "He persisted in his dream despite many difficulties.", exampleZh: "尽管面临许多困难，他仍坚持自己的梦想。",
    derivatives: [
      {word: "persistence", pos: "n.", definition: "坚持；持续；固执"},
      {word: "persistent", pos: "adj.", definition: "坚持不懈的；持续的；顽固的"},
      {word: "persistently", pos: "adv.", definition: "坚持不懈地；持续地"}
    ],
    roots: "per- (through) + sistere (stand). Collocation: persist in doing sth. (坚持做某事), persistence in efforts (坚持不懈的努力)."
  },
  {
    id: 20, term: "disparity", phonetic: "/dɪˈspærəti/", pos: "n.", definitionZh: "差异；悬殊", definitionEn: "a great difference", exampleEn: "There is a huge disparity between the rich and the poor in some countries.", exampleZh: "一些国家的贫富差距极为悬殊。",
    derivatives: [
      {word: "disparate", pos: "adj.", definition: "不同的；不相干的；迥异的"},
      {word: "disparately", pos: "adv.", definition: "不同地；迥异地"}
    ],
    roots: "dis- (not) + par (equal). Collocation: disparate ideas (不同的想法), disparate groups (不同的群体)."
  },
  {
    id: 21, term: "rigorous", phonetic: "/ˈrɪɡərəs/", pos: "adj.", definitionZh: "严格的；严厉的；严谨的", definitionEn: "very strict", exampleEn: "The training is rigorous and requires great effort.", exampleZh: "这项训练很严格，需要付出很大努力。",
    derivatives: [
      {word: "rigor", pos: "n.", definition: "严格；严谨；严寒；艰苦"},
      {word: "rigorously", pos: "adv.", definition: "严格地；严谨地；严厉地"},
      {word: "rigorism", pos: "n.", definition: "严格主义；严格"}
    ],
    roots: "rigere (stiff). Collocation: intellectual rigor (学术严谨), rigorously test (严格测试)."
  },
  {
    id: 22, term: "disruptive", phonetic: "/dɪsˈrʌptɪv/", pos: "adj.", definitionZh: "破坏性的；扰乱性的", definitionEn: "causing damage", exampleEn: "His disruptive behaviour in class affected other students.", exampleZh: "他在课堂上的扰乱行为影响了其他学生。",
    derivatives: [
      {word: "disrupt", pos: "v.", definition: "破坏；扰乱；使中断"},
      {word: "disruption", pos: "n.", definition: "破坏；扰乱；中断"},
      {word: "disruptively", pos: "adv.", definition: "破坏性地；扰乱性地"}
    ],
    roots: "dis- (apart) + rumpere (break). Collocation: disrupt the order (扰乱秩序), environmental disruption (环境破坏)."
  },
  {
    id: 23, term: "elicit", phonetic: "/iˈlɪsɪt/", pos: "v.", definitionZh: "引出；诱发", definitionEn: "to draw out", exampleEn: "The question elicited a burst of laughter from the audience.", exampleZh: "这个问题引得观众一阵大笑。",
    derivatives: [
      {word: "elicitation", pos: "n.", definition: "引出；诱发；获取"},
      {word: "elicitable", pos: "adj.", definition: "可引出的；可诱发的"}
    ],
    roots: "e- (out) + lacere (entice). Collocation: elicit information (获取信息), elicit a response (引发回应)."
  },
  {
    id: 24, term: "enormity", phonetic: "/ɪˈnɔːmɪti/", pos: "n.", definitionZh: "严重性；巨大", definitionEn: "extreme seriousness", exampleEn: "The enormity of his crime shocked the whole nation.", exampleZh: "他罪行的严重性震惊了全国。",
    derivatives: [
      {word: "enormous", pos: "adj.", definition: "巨大的；庞大的；极大的"},
      {word: "enormously", pos: "adv.", definition: "非常；极其；巨大地"}
    ],
    roots: "e- (out) + norma (norm). Collocation: enormous pressure (巨大的压力), enormously successful (极其成功)."
  },
  {
    id: 25, term: "dictate", phonetic: "/dɪkˈteɪt/", pos: "v./n.", definitionZh: "命令；口述；指令", definitionEn: "gives order to sb.", exampleEn: "The manager dictated the new rules to his secretary.", exampleZh: "经理向秘书口述了新规定。",
    derivatives: [
      {word: "dictation", pos: "n.", definition: "听写"},
      {word: "dictator", pos: "n.", definition: "独裁者"},
      {word: "dictionary", pos: "n.", definition: "字典"},
      {word: "dictatorial", pos: "adj.", definition: "独裁的；专横的"},
      {word: "dictatorially", pos: "adv.", definition: "独裁地；专横地"},
      {word: "dictationary", pos: "adj.", definition: "词典的；字典的"}
    ],
    roots: "dictare (to say). Collocation: dictatorial rule (独裁统治), take dictation (记录口述内容)."
  },
  {
    id: 26, term: "exactitude", phonetic: "/ɪɡˈzæktɪtjuːd/", pos: "n.", definitionZh: "精确；准确", definitionEn: "exact, accuracy, accurate", exampleEn: "The job requires great exactitude in measurement.", exampleZh: "这份工作对测量的精确性要求很高。",
    derivatives: [
      {word: "exact", pos: "adj./v.", definition: "精确的；严格的；要求；急需"},
      {word: "exactly", pos: "adv.", definition: "精确地；恰好；完全"},
      {word: "exacting", pos: "adj.", definition: "严格的；苛求的；费力的"}
    ],
    roots: "ex- (out) + agere (do). Collocation: exact standards (严格的标准), exacting work (费力的工作)."
  },
  {
    id: 27, term: "contemporaneous", phonetic: "/kənˌtempəˈreɪniəs/", pos: "adj.", definitionZh: "同时期的；同时发生的", definitionEn: "existing or occurring at the same time", exampleEn: "The two accidents are contemporaneous.", exampleZh: "这两起事故是同时发生的。",
    derivatives: [
      {word: "contemporary", pos: "adj./n.", definition: "当代的；同时代的；同时代的人"},
      {word: "contemporaneously", pos: "adv.", definition: "同时期地；同时发生地"},
      {word: "contemporaneity", pos: "n.", definition: "同时代；同时发生"}
    ],
    roots: "con- (together) + tempus (time). Collocation: contemporary art (当代艺术), contemporaneous events (同时发生的事件)."
  },
  {
    id: 28, term: "persistent", phonetic: "/pəˈsɪstənt/", pos: "adj.", definitionZh: "坚持不懈的；持续的", definitionEn: "continuing firmly, sustained", exampleEn: "Her persistent efforts finally paid off.", exampleZh: "她坚持不懈的努力终于有了回报。",
    derivatives: [
      {word: "persist", pos: "v.", definition: "坚持；持续；固执"},
      {word: "persistence", pos: "n.", definition: "坚持；持续；固执"},
      {word: "persistently", pos: "adv.", definition: "坚持不懈地；持续地"}
    ],
    roots: "per- (through) + sistere (stand). Collocation: persistent rain (持续降雨), persist in pursuing goals (坚持追求目标)."
  },
  {
    id: 29, term: "exasperate", phonetic: "/ɪɡˈzæspəreɪt/", pos: "v.", definitionZh: "激怒；使恼怒", definitionEn: "to annoy greatly", exampleEn: "She was exasperated by his constant interruptions.", exampleZh: "他不断打断她，让她很恼怒。",
    derivatives: [
      {word: "exasperation", pos: "n.", definition: "激怒；恼怒；愤慨"},
      {word: "exasperating", pos: "adj.", definition: "令人恼怒的；使人愤怒的"},
      {word: "exasperatingly", pos: "adv.", definition: "令人恼怒地"}
    ],
    roots: "ex- (out) + asper (rough). Collocation: to one's exasperation (令某人恼怒的是), exasperating delays (令人恼怒的延误)."
  },
  {
    id: 30, term: "prodigy", phonetic: "/ˈprɒdɪdʒi/", pos: "n.", definitionZh: "神童；奇才", definitionEn: "genius", exampleEn: "He is a musical prodigy who can play the piano at the age of three.", exampleZh: "他是个音乐神童，三岁就能弹钢琴。",
    derivatives: [
      {word: "prodigious", pos: "adj.", definition: "巨大的；惊人的；异常的"},
      {word: "prodigiously", pos: "adv.", definition: "巨大地；惊人地"}
    ],
    roots: "pro- (before) + aio (say). Collocation: prodigious talent (惊人的天赋), prodigious memory (惊人的记忆力)."
  },
  {
    id: 31, term: "devolution", phonetic: "/ˌdiːvəˈluːʃn/", pos: "n.", definitionZh: "权力下放；移交", definitionEn: "the transfer of power to lower level", exampleEn: "The devolution of power to local governments has improved efficiency.", exampleZh: "向地方政府下放权力提高了效率。",
    derivatives: [
      {word: "devolve", pos: "v.", definition: "移交；下放；转移；遗传"},
      {word: "devolvable", pos: "adj.", definition: "可移交的；可下放的"},
      {word: "devolutionary", pos: "adj.", definition: "权力下放的；移交的"}
    ],
    roots: "de- (down) + volvere (roll). Collocation: devolve power to (下放权力), devolve responsibility (移交责任)."
  },
  {
    id: 32, term: "prioritize", phonetic: "/praɪˈɒrɪtaɪz/", pos: "v.", definitionZh: "优先考虑；优先处理", definitionEn: "to put sth. in privileged position", exampleEn: "We must prioritize security in this project.", exampleZh: "我们在这个项目中必须优先考虑安全问题。",
    derivatives: [
      {word: "priority", pos: "n.", definition: "优先事项"},
      {word: "prior", pos: "adj./adv.", definition: "优先的；在前的；居先"},
      {word: "prioritization", pos: "n.", definition: "优先化；优先处理"},
      {word: "prioritized", pos: "adj.", definition: "优先的"}
    ],
    roots: "prior (former). Collocation: prior to (在……之前), give priority to (优先考虑)."
  },
  {
    id: 33, term: "judicious", phonetic: "/dʒuːˈdɪʃəs/", pos: "adj.", definitionZh: "明智的；审慎的", definitionEn: "wise, rational in decision making", exampleEn: "I made a judicious decision to invest in this project.", exampleZh: "我明智地决定投资这个项目。",
    derivatives: [
      {word: "judge", pos: "n./v.", definition: "法官；裁判；判断；认为"},
      {word: "judgment", pos: "n.", definition: "判断；判决；看法"},
      {word: "judiciously", pos: "adv.", definition: "明智地；审慎地"},
      {word: "judicial", pos: "adj.", definition: "司法的；法庭的；审判的"}
    ],
    roots: "judex (judge). Collocation: pass judgment on (作出判断), judicial system (司法系统)."
  },
  {
    id: 34, term: "manifest", phonetic: "/ˈmænɪfest/", pos: "adj./v.", definitionZh: "明显的；显现；表明", definitionEn: "clearly shown", exampleEn: "His anger is manifest in his facial expression.", exampleZh: "他的愤怒从面部表情中显而易见。",
    derivatives: [
      {word: "manifestation", pos: "n.", definition: "表现；显现；显示；征兆"},
      {word: "manifestly", pos: "adv.", definition: "明显地；显然地"},
      {word: "manifesto", pos: "n.", definition: "宣言；声明"}
    ],
    roots: "manus (hand) + festus (struck). Collocation: a manifestation of friendship (友谊的表现), political manifesto (政治宣言)."
  },
  {
    id: 35, term: "ooze", phonetic: "/uːz/", pos: "v./n.", definitionZh: "渗出；渗漏；软泥", definitionEn: "to flow slowly", exampleEn: "Mud oozed from the ground after the rain.", exampleZh: "雨后，泥浆从地里渗出来。",
    derivatives: [
      {word: "oozing", pos: "adj./n.", definition: "渗出的；洋溢着的；渗出"},
      {word: "oozingly", pos: "adv.", definition: "渗出地；慢慢地"},
      {word: "oozer", pos: "n.", definition: "渗出者；渗水的地方"}
    ],
    roots: "Old English wāse (mud). Collocation: oozing with charm (洋溢着魅力), muddy ooze (淤泥)."
  },
  {
    id: 36, term: "overbearing", phonetic: "/ˌəʊvəˈbeərɪŋ/", pos: "adj.", definitionZh: "专横的；霸道的", definitionEn: "very bossy", exampleEn: "He has an overbearing boss who never listens to others' opinions.", exampleZh: "他有个专横的老板，从不听取别人的意见。",
    derivatives: [
      {word: "overbear", pos: "v.", definition: "压倒；制服；专横对待"},
      {word: "overbearingly", pos: "adv.", definition: "专横地；霸道地；傲慢地"},
      {word: "overbearance", pos: "n.", definition: "专横；霸道；傲慢"}
    ],
    roots: "over + bearing. Collocation: overbear sb.'s will (压制某人的意志), overbearing manner (专横的态度)."
  },
  {
    id: 37, term: "plight", phonetic: "/plaɪt/", pos: "n.", definitionZh: "困境；苦境", definitionEn: "difficult situation", exampleEn: "The government is trying to help people out of their plight.", exampleZh: "政府正努力帮助人们摆脱困境。",
    derivatives: [
      {word: "plighted", pos: "adj.", definition: "盟誓的；约定的；订婚的"},
      {word: "plightful", pos: "adj.", definition: "陷入困境的；不幸的"},
      {word: "plightfully", pos: "adv.", definition: "不幸地；陷入困境地"}
    ],
    roots: "plicare (fold). Collocation: plighted troth (订婚；盟誓), a plightful family (不幸的家庭)."
  },
  {
    id: 38, term: "precarious", phonetic: "/prɪˈkeəriəs/", pos: "adj.", definitionZh: "不稳定的；危险的", definitionEn: "unstable", exampleEn: "His job is precarious as the company is facing financial problems.", exampleZh: "由于公司面临财务问题，他的工作很不稳定。",
    derivatives: [
      {word: "precariously", pos: "adv.", definition: "不稳定地；危险地；不确定地"},
      {word: "precarity", pos: "n.", definition: "不稳定；朝不保夕；危险"}
    ],
    roots: "precarius (obtained by prayer). Collocation: precarious living conditions (不稳定的生活条件), the precarity of employment (就业的不稳定性)."
  },
  {
    id: 39, term: "dismay", phonetic: "/dɪsˈmeɪ/", pos: "n./v.", definitionZh: "沮丧；使沮丧；失望", definitionEn: "sudden disappointment", exampleEn: "He was filled with dismay when he heard the bad news.", exampleZh: "听到这个坏消息，他满心沮丧。",
    derivatives: [
      {word: "dismayed", pos: "adj.", definition: "感到沮丧的；失望的"},
      {word: "dismaying", pos: "adj.", definition: "令人沮丧的；令人失望的"},
      {word: "dismayingly", pos: "adv.", definition: "令人沮丧地；令人失望地"}
    ],
    roots: "dis- (not) + magen (power). Collocation: be dismayed at (对……感到沮丧), a dismaying result (令人失望的结果)."
  },
  {
    id: 40, term: "rebuke", phonetic: "/rɪˈbjuːk/", pos: "v./n.", definitionZh: "斥责；指责", definitionEn: "to scold", exampleEn: "The teacher rebuked the student for being late again.", exampleZh: "老师斥责了那个再次迟到的学生。",
    derivatives: [
      {word: "rebukeful", pos: "adj.", definition: "斥责的；指责的"},
      {word: "rebukingly", pos: "adv.", definition: "斥责地；指责地"},
      {word: "rebuker", pos: "n.", definition: "斥责者；指责者"}
    ],
    roots: "re- (back) + busch (wood/brush). Collocation: a sharp rebuke (严厉的斥责), rebuke sb. for sth. (因某事斥责某人)."
  },
  {
    id: 41, term: "recalcitrant", phonetic: "/rɪˈkælsɪtrənt/", pos: "adj.", definitionZh: "顽固的；拒不服从的", definitionEn: "stubborn; resistant", exampleEn: "The recalcitrant boy refused to follow his parents' advice.", exampleZh: "那个顽固的男孩拒绝听从父母的劝告。",
    derivatives: [
      {word: "recalcitrance", pos: "n.", definition: "顽固；拒不服从；反抗"},
      {word: "recalcitrantly", pos: "adv.", definition: "顽固地；拒不服从地"}
    ],
    roots: "re- (back) + calcitrare (to kick). Collocation: recalcitrance towards authority (对权威的抗拒), recalcitrant employees (拒不服从的员工)."
  },
  {
    id: 42, term: "replenish", phonetic: "/rɪˈplenɪʃ/", pos: "v.", definitionZh: "补充；重新装满", definitionEn: "to refresh/refill", exampleEn: "We need to replenish our supplies before the trip.", exampleZh: "我们在旅行前需要补充物资。",
    derivatives: [
      {word: "replenishment", pos: "n.", definition: "补充；补给；装满"},
      {word: "replenishable", pos: "adj.", definition: "可补充的；可补给的"},
      {word: "replenisher", pos: "n.", definition: "补充物；补给者"}
    ],
    roots: "re- (again) + plenus (full). Collocation: replenishment of water (补水), replenish stocks (补充库存)."
  },
  {
    id: 43, term: "relish", phonetic: "/ˈrelɪʃ/", pos: "v./n.", definitionZh: "享受；喜爱；滋味；乐趣", definitionEn: "to enjoy greatly", exampleEn: "She relishes every challenge in her work.", exampleZh: "她享受工作中的每一个挑战。",
    derivatives: [
      {word: "relishable", pos: "adj.", definition: "美味的；令人享受的；可享受的"},
      {word: "relishingly", pos: "adv.", definition: "享受地；津津有味地"}
    ],
    roots: "re- (back) + laisser (leave). Collocation: relish the moment (享受当下), a relish for life (对生活的热爱)."
  },
  {
    id: 44, term: "spawn", phonetic: "/spɔːn/", pos: "v./n.", definitionZh: "产生；产卵；卵", definitionEn: "to produce", exampleEn: "The new policy spawned a series of positive changes.", exampleZh: "新政策带来了一系列积极的变化。",
    derivatives: [
      {word: "spawner", pos: "n.", definition: "产卵鱼；产卵动物；生产者"},
      {word: "spawning", pos: "n./v.", definition: "产卵；产生"},
      {word: "spawnable", pos: "adj.", definition: "可产卵的；可产生的"}
    ],
    roots: "ex- (out) + pandere (spread). Collocation: spawning grounds (产卵地), spawn new ideas (产生新想法)."
  },
  {
    id: 45, term: "adhere to", phonetic: "/ədˈhɪə tu/", pos: "phr.v.", definitionZh: "坚持；遵守；粘附", definitionEn: "stick to", exampleEn: "We must adhere to the rules of the company.", exampleZh: "我们必须遵守公司的规章制度。",
    derivatives: [
      {word: "adherence", pos: "n.", definition: "坚持；遵守；粘附；忠诚"},
      {word: "adherent", pos: "n./adj.", definition: "追随者；拥护者；粘附的；忠诚的"},
      {word: "adhesive", pos: "adj./n.", definition: "粘性的；粘合剂"}
    ],
    roots: "ad- (to) + haerere (stick). Collocation: adherence to principles (坚持原则), adhesive tape (胶带)."
  },
  {
    id: 46, term: "lash out", phonetic: "/læʃ aʊt/", pos: "phr.v.", definitionZh: "猛烈抨击；突然袭击", definitionEn: "attack suddenly", exampleEn: "He lashed out angrily at the reporter's question.", exampleZh: "他愤怒地抨击了记者的问题。",
    derivatives: [
      {word: "lash", pos: "v./n.", definition: "鞭打；抨击；猛击；鞭子；睫毛"},
      {word: "lashing", pos: "n./adj.", definition: "鞭打；抨击；捆扎；猛烈的"},
      {word: "lasher", pos: "n.", definition: "鞭打者；抨击者"}
    ],
    roots: "Germanic. Collocation: lash out at criticism (猛烈抨击批评), heavy lashings of rain (瓢泼大雨)."
  },
  {
    id: 47, term: "culminate in", phonetic: "/ˈkʌlmɪneɪt ɪn/", pos: "phr.v.", definitionZh: "以……告终；达到顶点", definitionEn: "end in sth.", exampleEn: "His years of hard work culminated in his success.", exampleZh: "他多年的努力最终换来了成功。",
    derivatives: [
      {word: "culmination", pos: "n.", definition: "顶点；高潮；结局"},
      {word: "culminant", pos: "adj.", definition: "顶点的；最高的；终极的"}
    ],
    roots: "culmen (summit). Collocation: the culmination of one's career (某人职业生涯的巅峰), culminant point (顶点)."
  },
  {
    id: 48, term: "cut back on", phonetic: "/kʌt bæk ɒn/", pos: "phr.v.", definitionZh: "削减；减少", definitionEn: "reduce cost, invest", exampleEn: "The company has to cut back on expenses to survive.", exampleZh: "为了生存，公司不得不削减开支。",
    derivatives: [
      {word: "cutback", pos: "n.", definition: "削减；缩减；裁员"},
      {word: "cutter", pos: "n.", definition: "刀具；裁剪者；切割机"},
      {word: "cutting", pos: "adj./n.", definition: "锋利的；刺骨的；切割；裁剪"}
    ],
    roots: "cut + back. Collocation: cutbacks in spending (开支削减), staff cutbacks (裁员)."
  },
  {
    id: 49, term: "embark on", phonetic: "/ɪmˈbɑːk ɒn/", pos: "phr.v.", definitionZh: "着手；开始从事", definitionEn: "begin sth.", exampleEn: "He embarked on his new journey of learning English.", exampleZh: "他开始了学习英语的新征程。",
    derivatives: [
      {word: "embarkation", pos: "n.", definition: "登机；登船；开始；着手"},
      {word: "embarkment", pos: "n.", definition: "上岸；登陆；登船；乘船"},
      {word: "embarker", pos: "n.", definition: "乘船者；登机者；开创者"}
    ],
    roots: "en- (into) + barca (bark/boat). Collocation: embarkation point (登船/登机地点), embark on a project (着手一个项目)."
  },
  {
    id: 50, term: "heedless of", phonetic: "/ˈhiːdləs əv/", pos: "phr.v.", definitionZh: "不顾；不注意", definitionEn: "regard/less of", exampleEn: "He escaped away heedless of the dangers ahead.", exampleZh: "他不顾前方的危险逃走了。",
    derivatives: [
      {word: "heed", pos: "v./n.", definition: "注意；留意；听从"},
      {word: "heedful", pos: "adj.", definition: "留意的；注意的；谨慎的"},
      {word: "heedfully", pos: "adv.", definition: "留意地；注意地"},
      {word: "heedfulness", pos: "n.", definition: "留意；谨慎"}
    ],
    roots: "Old English hēdan. Collocation: heed sb.'s warning (听从某人的警告), be heedful of safety (注意安全)."
  },
  {
    id: 51, term: "pare down", phonetic: "/peə daʊn/", pos: "phr.v.", definitionZh: "逐渐削减；精简", definitionEn: "reduce gradually", exampleEn: "Costs were pared down to improve the company's profit.", exampleZh: "为了提高公司利润，成本被逐步削减。",
    derivatives: [
      {word: "pare", pos: "v.", definition: "削减；削薄；修剪；削皮"},
      {word: "parer", pos: "n.", definition: "削皮器；削刀；修剪者"},
      {word: "pared", pos: "adj.", definition: "削减的；削薄的"}
    ],
    roots: "Latin parare (to prepare). Collocation: pare an apple (削苹果), pare expenses (削减开支)."
  },
  {
    id: 52, term: "pass for", phonetic: "/pɑːs fɔː/", pos: "phr.v.", definitionZh: "被当作；被认为是", definitionEn: "be accepted as", exampleEn: "She could pass for a teenager even though she is in her thirties.", exampleZh: "尽管她已经三十多岁了，却能被当作青少年。",
    derivatives: [
      {word: "pass", pos: "v./n.", definition: "通过；传递；经过；通行证；段落"},
      {word: "passable", pos: "adj.", definition: "可通过的；尚可的；过得去的"},
      {word: "passage", pos: "n.", definition: "通道；段落；航行"},
      {word: "passer", pos: "n.", definition: "过路人；经过者"}
    ],
    roots: "passus (step). Collocation: pass an exam (通过考试), passable road (可通行的道路)."
  },
  {
    id: 53, term: "phase out", phonetic: "/feɪz aʊt/", pos: "phr.v.", definitionZh: "逐步淘汰；逐步取消", definitionEn: "remove, get rid of", exampleEn: "The government plans to phase out the old cars to reduce pollution.", exampleZh: "政府计划逐步淘汰旧汽车以减少污染。",
    derivatives: [
      {word: "phase", pos: "n./v.", definition: "阶段；时期；分阶段进行"},
      {word: "phased", pos: "adj.", definition: "分阶段的；逐步的"},
      {word: "phaser", pos: "n.", definition: "相位器；定相器"}
    ],
    roots: "phasis (appearance). Collocation: a critical phase (关键阶段), phase in (逐步引入)."
  },
  {
    id: 54, term: "succumb to", phonetic: "/səˈkʌm tu/", pos: "phr.v.", definitionZh: "屈服于；屈从于；死于", definitionEn: "give in to", exampleEn: "He succumbed to her pressure and agreed to help.", exampleZh: "他屈服于她的压力，同意帮忙。",
    derivatives: [
      {word: "succumb", pos: "v.", definition: "屈服；屈从；死于；被压垮"},
      {word: "succumbing", pos: "n./v.", definition: "屈服；死亡"},
      {word: "succumbence", pos: "n.", definition: "屈服；顺从"},
      {word: "succumbent", pos: "adj.", definition: "易屈服的；易弯曲的"}
    ],
    roots: "sub- (under) + cumbere (lie down). Collocation: succumb to temptation (屈服于诱惑), succumb to illness (死于疾病)."
  }
];
