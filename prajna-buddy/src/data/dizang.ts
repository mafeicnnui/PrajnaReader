export interface SutraSection {
  id: string;
  title?: string;
  text: string;
  pinyin: string;
  meaning: string;
}

export const dizangSutraTitle = '地藏菩萨本愿经';

export const dizangSections: SutraSection[] = [
  {
    id: 'preface-1',
    title: '开经偈',
    text: '无上甚深微妙法，百千万劫难遭遇。\n我今见闻得受持，愿解如来真实义。',
    pinyin:
      'wú shàng shèn shēn wēi miào fǎ，bǎi qiān wàn jié nán zāo yù。\n' +
      'wǒ jīn jiàn wén dé shòu chí，yuàn jiě rú lái zhēn shí yì。',
    meaning:
      '这是最无上、非常深奥微妙的佛法，百千万劫也难以遇到。\n我现在得以见闻并受持，愿能理解如来所说的真实义理。',
  },
  {
    id: 'chapter-1-1',
    title: '第一品 忉利天宫神通品（节选）',
    text:
      '如是我闻：一时佛在忉利天，为母说法。\n尔时十方无量世界，不可说不可说一切诸佛及大菩萨摩诃萨，皆来集会。',
    pinyin:
      'rú shì wǒ wén：yī shí fó zài dāo lì tiān，wèi mǔ shuō fǎ。\n' +
      'ěr shí shí fāng wú liàng shì jiè，bù kě shuō bù kě shuō yī qiè zhū fó jí dà pú sà mó hē sà，jiē lái jí huì。',
    meaning:
      '我听佛法是这样传下来的：有一次，佛在忉利天，为母亲宣说佛法。\n那时十方无量世界中不可说不可说的一切诸佛与大菩萨，都前来集会。',
  },
  {
    id: 'chapter-1-2',
    text:
      '赞叹释迦牟尼佛，能于五浊恶世，现不可思议大智慧神通之力，调伏刚强众生，知苦乐法，各遣侍者，问讯世尊。',
    pinyin:
      'zàn tàn shì jiā móu ní fó，néng yú wǔ zhuó è shì，xiàn bù kě sī yì dà zhì huì shén tōng zhī lì，\n' +
      'tiáo fú gāng qiáng zhòng shēng，zhī kǔ lè fǎ，gè qiǎn shì zhě，wèn xùn shì zūn。',
    meaning:
      '大家赞叹释迦牟尼佛能在五浊恶世显现不可思议的智慧与神通力量，调伏刚强难化的众生，令其明了苦乐之法；各自派遣侍者前来问候世尊。',
  },
];
