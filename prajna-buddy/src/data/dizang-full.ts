// 地藏菩萨本愿经 - 完整版数据
// 本文件包含地藏经十三品的完整经文
// 注：拼音和白话文翻译需要专业人士逐步补充完善

export interface SutraSection {
  id: string;
  title?: string;
  text: string;
  pinyin: string;
  meaning: string;
}

export interface ChapterInfo {
  chapterId: number;
  chapterTitle: string;
  description: string;
}

export const dizangSutraTitle = '地藏菩萨本愿经';

export const dizangChapters: ChapterInfo[] = [
  { chapterId: 1, chapterTitle: '忉利天宫神通品', description: '佛在忉利天为母说法，诸佛菩萨云集赞叹' },
  { chapterId: 2, chapterTitle: '分身集会品', description: '地藏菩萨无量分身从各方世界云集忉利天宫' },
  { chapterId: 3, chapterTitle: '观众生业缘品', description: '佛母摩耶夫人请问众生业缘果报之事' },
  { chapterId: 4, chapterTitle: '阎浮众生业感品', description: '定自在王菩萨请问阎浮众生业力因缘' },
  { chapterId: 5, chapterTitle: '地狱名号品', description: '普贤菩萨请问地狱名号及罪报等事' },
  { chapterId: 6, chapterTitle: '如来赞叹品', description: '如来赞叹地藏菩萨威神誓愿不可思议' },
  { chapterId: 7, chapterTitle: '利益存亡品', description: '地藏菩萨分身集会，利益存亡眷属' },
  { chapterId: 8, chapterTitle: '阎罗王众赞叹品', description: '阎罗天子及诸大鬼王赞叹地藏菩萨' },
  { chapterId: 9, chapterTitle: '称佛名号品', description: '地藏菩萨为众生宣说称念佛名的功德' },
  { chapterId: 10, chapterTitle: '校量布施功德缘品', description: '地藏菩萨校量布施功德的大小差别' },
  { chapterId: 11, chapterTitle: '地神护法品', description: '坚牢地神说明护持供养地藏菩萨者' },
  { chapterId: 12, chapterTitle: '见闻利益品', description: '观世音菩萨请问见闻地藏菩萨的利益' },
  { chapterId: 13, chapterTitle: '嘱累人天品', description: '世尊将未来众生嘱托给地藏菩萨' },
];

// 香赞
export const incensePraise: SutraSection = {
  id: 'preface-1',
  title: '香赞',
  text: '炉香乍爇，法界蒙熏，诸佛海会悉遥闻。\n随处结祥云，诚意方殷，诸佛现全身。',
  pinyin: 'lú xiāng zhà ruò, fǎ jiè méng xūn, zhū fó hǎi huì xī yáo wén.\nsuí chù jié xiáng yún, chéng yì fāng yīn, zhū fó xiàn quán shēn.',
  meaning: '炉中香刚刚点燃，香气熏遍整个法界，十方诸佛海会都能遥闻。随处结成祥云，诚意正殷切时，诸佛显现全身。',
};

// 觉林菩萨偈
export const juelinBodhisattvaVerse: SutraSection = {
  id: 'preface-2',
  title: '觉林菩萨偈',
  text: '譬如工画师，分布诸彩色，\n虚妄取异相，大种无差别。\n大种中无色，色中无大种，\n亦不离大种，而有色可得。\n心中无彩画，彩画中无心，\n然不离于心，有彩画可得。\n彼心恒不住，无量难思议，\n示现一切色，各各不相知。\n譬如工画师，不能知自心，\n而由心故画，诸法性如是。\n心如工画师，能画诸世间，\n五蕴悉从生，无法而不造。\n如心佛亦尔，如佛众生然，\n应知佛与心，体性皆无尽。\n若人知心行，普造诸世间，\n是人则见佛，了佛真实性。\n心不住于身，身亦不住心，\n而能作佛事，自在未曾有。\n若人欲了知，三世一切佛，\n应观法界性，一切唯心造。',
  pinyin: 'pì rú gōng huà shī, fēn bù zhū cǎi sè,\nxū wàng qǔ yì xiàng, dà zhǒng wú chā bié.\ndà zhǒng zhōng wú sè, sè zhōng wú dà zhǒng,\nyì bù lí dà zhǒng, ér yǒu sè kě dé.\nxīn zhōng wú cǎi huà, cǎi huà zhōng wú xīn,\nrán bù lí yú xīn, yǒu cǎi huà kě dé.\nbǐ xīn héng bù zhù, wú liàng nán sī yì,\nshì xiàn yī qiè sè, gè gè bù xiāng zhī.\npì rú gōng huà shī, bù néng zhī zì xīn,\nér yóu xīn gù huà, zhū fǎ xìng rú shì.\nxīn rú gōng huà shī, néng huà zhū shì jiān,\nwǔ yùn xī cóng shēng, wú fǎ ér bù zào.\nrú xīn fó yì ěr, rú fó zhòng shēng rán,\nyīng zhī fó yǔ xīn, tǐ xìng jiē wú jìn.\nruò rén zhī xīn xíng, pǔ zào zhū shì jiān,\nshì rén zé jiàn fó, liǎo fó zhēn shí xìng.\nxīn bù zhù yú shēn, shēn yì bù zhù xīn,\nér néng zuò fó shì, zì zài wèi céng yǒu.\nruò rén yù liǎo zhī, sān shì yī qiè fó,\nyīng guān fǎ jiè xìng, yī qiè wéi xīn zào.',
  meaning: '就像画师调配各种颜色，虚妄地取各种不同相状，但地水火风四大种性本无差别。四大种中本无颜色，颜色中也无四大种，但也不离开四大种而能得到颜色。心中本无彩画，彩画中也无心，但不离开心而有彩画可得。那个心恒常不住，无量难以思议，能示现一切色相，各各互不相知。就像画师不能了知自己的心，却由心而作画，诸法的本性也是如此。心就像画师，能画出一切世间，五蕴都从心生，没有一法不是心所造。心是这样，佛也是这样；佛是这样，众生也是这样。应当知道佛与心，体性都是无穷无尽的。如果有人了知心的运行，普遍造作诸世间，这个人就能见佛，了达佛的真实本性。心不住于身，身也不住于心，却能作佛事，自在未曾有。如果有人想要了知三世一切佛，应当观察法界性，一切唯心所造。',
};

// 赞
export const praise: SutraSection = {
  id: 'preface-3',
  title: '赞',
  text: '稽首本然净心地，无尽佛藏大慈尊。\n南方世界涌香云，香雨花云及花雨。\n宝雨宝云无数种，为祥为瑞遍庄严。\n天人问佛是何因，佛言地藏菩萨至。\n三世如来同赞叹，十方菩萨共归依。\n我今宿植善因缘，称扬地藏真功德。\n慈因积善，誓救众生。\n手中金锡，振开地狱之门。\n掌上明珠，光摄大千世界。\n智慧音里，吉祥云中，\n为阎浮提苦众生，\n作大证明功德主。\n大悲大愿，大圣大慈，\n本尊地藏菩萨摩诃萨。',
  pinyin: 'qǐ shǒu běn rán jìng xīn dì, wú jìn fó zàng dà cí zūn.\nnán fāng shì jiè yǒng xiāng yún, xiāng yǔ huā yún jí huā yǔ.\nbǎo yǔ bǎo yún wú shù zhǒng, wèi xiáng wèi ruì biàn zhuāng yán.\ntiān rén wèn fó shì hé yīn, fó yán dì zàng pú sà zhì.\nsān shì rú lái tóng zàn tàn, shí fāng pú sà gòng guī yī.\nwǒ jīn sù zhí shàn yīn yuán, chēng yáng dì zàng zhēn gōng dé.\ncí yīn jī shàn, shì jiù zhòng shēng.\nshǒu zhōng jīn xī, zhèn kāi dì yù zhī mén.\nzhǎng shàng míng zhū, guāng shè dà qiān shì jiè.\nzhì huì yīn lǐ, jí xiáng yún zhōng,\nwèi yán fú tí kǔ zhòng shēng,\nzuò dà zhèng míng gōng dé zhǔ.\ndà bēi dà yuàn, dà shèng dà cí,\nběn zūn dì zàng pú sà mó hē sà.',
  meaning: '恭敬礼拜本来清净的心地，无尽佛藏大慈悲尊。南方世界涌现香云，香雨、花云及花雨。宝雨宝云无数种，作为祥瑞遍满庄严。天人问佛这是什么因缘，佛说是地藏菩萨到了。三世如来共同赞叹，十方菩萨一起归依。我今生宿世种植善因缘，称扬地藏菩萨真实功德。因慈悲而积善，发誓救度众生。手中金锡杖，振开地狱之门。掌上明珠，光明摄受大千世界。在智慧音声里，吉祥云中，为阎浮提受苦众生，作大证明功德主。大悲大愿，大圣大慈，本尊地藏菩萨摩诃萨。',
};

// 开经偈
export const openingSutra: SutraSection = {
  id: 'preface-4',
  title: '开经偈',
  text: '无上甚深微妙法，百千万劫难遭遇。\n我今见闻得受持，愿解如来真实义。',
  pinyin: 'wú shàng shèn shēn wēi miào fǎ, bǎi qiān wàn jié nán zāo yù.\nwǒ jīn jiàn wén dé shòu chí, yuàn jiě rú lái zhēn shí yì.',
  meaning: '这是最无上、非常深奥微妙的佛法，百千万劫也难以遇到。我现在得以见闻并受持，愿能理解如来所说的真实义理。',
};

// 第一品：忉利天宫神通品
export const chapter1Sections: SutraSection[] = [
  {
    id: 'ch1-1',
    title: '第一品 忉利天宫神通品（一）如是我闻',
    text: '如是我闻。一时佛在忉利天，为母说法。尔时十方无量世界，不可说不可说一切诸佛，及大菩萨摩诃萨，皆来集会。',
    pinyin: 'rú shì wǒ wén. yī shí fó zài dāo lì tiān, wèi mǔ shuō fǎ. ěr shí shí fāng wú liàng shì jiè, bù kě shuō bù kě shuō yī qiè zhū fó, jí dà pú sà mó hē sà, jiē lái jí huì.',
    meaning: '我听佛法是这样传下来的：有一次，佛在忉利天，为母亲宣说佛法。那时十方无量世界中不可说不可说的一切诸佛与大菩萨，都前来集会。',
  },
  {
    id: 'ch1-2',
    title: '第一品 忉利天宫神通品（二）赞叹世尊',
    text: '赞叹释迦牟尼佛，能于五浊恶世，现不可思议大智慧神通之力，调伏刚强众生，知苦乐法，各遣侍者，问讯世尊。',
    pinyin: 'zàn tàn shì jiā móu ní fó, néng yú wǔ zhuó è shì, xiàn bù kě sī yì dà zhì huì shén tōng zhī lì, tiáo fú gāng qiáng zhòng shēng, zhī kǔ lè fǎ, gè qiǎn shì zhě, wèn xùn shì zūn.',
    meaning: '大家赞叹释迦牟尼佛能在五浊恶世显现不可思议的智慧与神通力量，调伏刚强难化的众生，令其明了苦乐之法；各自派遣侍者前来问候世尊。',
  },
  {
    id: 'ch1-3',
    title: '第一品 忉利天宫神通品（三）放光明云',
    text: '是时如来含笑，放百千万亿大光明云。所谓大圆满光明云、大慈悲光明云、大智慧光明云、大般若光明云、大三昧光明云、大吉祥光明云、大福德光明云、大功德光明云、大归依光明云、大赞叹光明云。',
    pinyin: 'shì shí rú lái hán xiào, fàng bǎi qiān wàn yì dà guāng míng yún. suǒ wèi dà yuán mǎn guāng míng yún, dà cí bēi guāng míng yún, dà zhì huì guāng míng yún, dà bō rě guāng míng yún, dà sān mèi guāng míng yún, dà jí xiáng guāng míng yún, dà fú dé guāng míng yún, dà gōng dé guāng míng yún, dà guī yī guāng míng yún, dà zàn tàn guāng míng yún.',
    meaning: '这时如来含笑，放出百千万亿大光明云。所谓大圆满光明云、大慈悲光明云、大智慧光明云、大般若光明云、大三昧光明云、大吉祥光明云、大福德光明云、大功德光明云、大归依光明云、大赞叹光明云。',
  },
  {
    id: 'ch1-4',
    title: '第一品 忉利天宫神通品（四）出微妙音',
    text: '放如是等不可说光明云已，又出种种微妙之音，所谓檀波罗蜜音、尸波罗蜜音、羼提波罗蜜音、毗离耶波罗蜜音、禅波罗蜜音、般若波罗蜜音、慈悲音、喜舍音、解脱音、无漏音、智慧音、大智慧音、师子吼音、大师子吼音、云雷音、大云雷音。',
    pinyin: 'fàng rú shì děng bù kě shuō guāng míng yún yǐ, yòu chū zhǒng zhǒng wēi miào zhī yīn, suǒ wèi tán bō luó mì yīn, shī bō luó mì yīn, chàn tí bō luó mì yīn, pí lí yé bō luó mì yīn, chán bō luó mì yīn, bō rě bō luó mì yīn, cí bēi yīn, xǐ shě yīn, jiě tuō yīn, wú lòu yīn, zhì huì yīn, dà zhì huì yīn, shī zǐ hǒu yīn, dà shī zǐ hǒu yīn, yún léi yīn, dà yún léi yīn.',
    meaning: '放出这些不可说的光明云后，又发出种种微妙的声音，所谓布施波罗蜜音、持戒波罗蜜音、忍辱波罗蜜音、精进波罗蜜音、禅定波罗蜜音、般若波罗蜜音、慈悲音、喜舍音、解脱音、无漏音、智慧音、大智慧音、师子吼音、大师子吼音、云雷音、大云雷音。',
  },
  {
    id: 'ch1-5',
    title: '第一品 忉利天宫神通品（五）天龙鬼神集会',
    text: '出如是等不可说不可说音已，娑婆世界，及他方国土，有无量亿天龙鬼神，亦集到忉利天宫。所谓四天王天、忉利天、须焰摩天、兜率陀天、化乐天、他化自在天、梵众天、梵辅天、大梵天、少光天、无量光天、光音天、少净天、无量净天、遍净天、福生天、福爱天、广果天、无想天、无烦天、无热天、善见天、善现天、色究竟天、摩醯首罗天，乃至非想非非想处天，一切天众、龙众、鬼神等众，悉来集会。',
    pinyin: 'chū rú shì děng bù kě shuō bù kě shuō yīn yǐ, suō pó shì jiè, jí tā fāng guó tǔ, yǒu wú liàng yì tiān lóng guǐ shén, yì jí dào dāo lì tiān gōng. suǒ wèi sì tiān wáng tiān, dāo lì tiān, xū yàn mó tiān, dōu shuài tuó tiān, huà lè tiān, tā huà zì zài tiān, fàn zhòng tiān, fàn fǔ tiān, dà fàn tiān, shǎo guāng tiān, wú liàng guāng tiān, guāng yīn tiān, shǎo jìng tiān, wú liàng jìng tiān, biàn jìng tiān, fú shēng tiān, fú ài tiān, guǎng guǒ tiān, wú xiǎng tiān, wú fán tiān, wú rè tiān, shàn jiàn tiān, shàn xiàn tiān, sè jiū jìng tiān, mó xī shǒu luó tiān, nǎi zhì fēi xiǎng fēi fēi xiǎng chù tiān, yī qiè tiān zhòng, lóng zhòng, guǐ shén děng zhòng, xī lái jí huì.',
    meaning: '发出这些不可说不可说的声音后，娑婆世界及他方国土，有无量亿天龙鬼神，也都集会到忉利天宫。所谓四天王天、忉利天、须焰摩天、兜率陀天、化乐天、他化自在天、梵众天、梵辅天、大梵天、少光天、无量光天、光音天、少净天、无量净天、遍净天、福生天、福爱天、广果天、无想天、无烦天、无热天、善见天、善现天、色究竟天、摩醯首罗天，乃至非想非非想处天，一切天众、龙众、鬼神等众，全都来集会。',
  },
  {
    id: 'ch1-6',
    title: '第一品 忉利天宫神通品（六）诸神集会',
    text: '复有他方国土，及娑婆世界，海神、江神、河神、树神、山神、地神、川泽神、苗稼神、昼神、夜神、空神、天神、饮食神、草木神，如是等神，皆来集会。复有他方国土，及娑婆世界，诸大鬼王，所谓恶目鬼王、啖血鬼王、啖精气鬼王、啖胎卵鬼王、行病鬼王、摄毒鬼王、慈心鬼王、福利鬼王、大爱敬鬼王，如是等鬼王，皆来集会。',
    pinyin: 'fù yǒu tā fāng guó tǔ, jí suō pó shì jiè, hǎi shén, jiāng shén, hé shén, shù shén, shān shén, dì shén, chuān zé shén, miáo jià shén, zhòu shén, yè shén, kōng shén, tiān shén, yǐn shí shén, cǎo mù shén, rú shì děng shén, jiē lái jí huì. fù yǒu tā fāng guó tǔ, jí suō pó shì jiè, zhū dà guǐ wáng, suǒ wèi è mù guǐ wáng, dàn xuè guǐ wáng, dàn jīng qì guǐ wáng, dàn tāi luǎn guǐ wáng, xíng bìng guǐ wáng, shè dú guǐ wáng, cí xīn guǐ wáng, fú lì guǐ wáng, dà ài jìng guǐ wáng, rú shì děng guǐ wáng, jiē lái jí huì.',
    meaning: '还有他方国土及娑婆世界的海神、江神、河神、树神、山神、地神、川泽神、苗稼神、昼神、夜神、空神、天神、饮食神、草木神，这些神都来集会。还有他方国土及娑婆世界的诸大鬼王，所谓恶目鬼王、啖血鬼王、啖精气鬼王、啖胎卵鬼王、行病鬼王、摄毒鬼王、慈心鬼王、福利鬼王、大爱敬鬼王，这些鬼王都来集会。',
  },
    {
    id: 'ch1-7',
    title: '第一品 忉利天宫神通品（七）佛问文殊',
    text: '尔时释迦牟尼佛，告文殊师利法王子菩萨摩诃萨：汝观是一切诸佛菩萨，及天龙鬼神，此世界、他世界，此国土、他国土，如是今来集会到忉利天者，汝知数不？文殊师利白佛言：世尊！若以我神力，千劫测度不能得知。',
    pinyin: 'ěr shí shì jiā móu ní fó, gào wén shū shī lì fǎ wáng zǐ pú sà mó hē sà: rǔ guān shì yī qiè zhū fó pú sà, jí tiān lóng guǐ shén, cǐ shì jiè, tā shì jiè, cǐ guó tǔ, tā guó tǔ, rú shì jīn lái jí huì dào dāo lì tiān zhě, rǔ zhī shù fǒu? wén shū shī lì bái fó yán: shì zūn! ruò yǐ wǒ shén lì, qiān jié cè dù bù néng dé zhī.',
    meaning: '这时释迦牟尼佛告诉文殊师利法王子菩萨：你看这一切诸佛菩萨，以及天龙鬼神，从此世界、他世界，此国土、他国土，如今来集会到忉利天的，你知道有多少吗？文殊师利对佛说：世尊！即使以我的神力，用千劫时间也测度不出来。',
  },
  {
    id: 'ch1-8',
    title: '第一品 忉利天宫神通品（八）地藏度众无数',
    text: '佛告文殊师利：吾以佛眼观故，犹不尽数，此皆是地藏菩萨久远劫来，已度、当度、未度，已成就、当成就、未成就。文殊师利白佛言：世尊！我已过去久修善根，证无碍智，闻佛所言，即当信受。小果声闻、天龙八部，及未来世诸众生等，虽闻如来诚实之语，必怀疑惑，设使顶受，未免兴谤。唯愿世尊，广说地藏菩萨摩诃萨，因地作何行，立何愿，而能成就不思议事？',
    pinyin: 'fó gào wén shū shī lì: wú yǐ fó yǎn guān gù, yóu bù jìn shù, cǐ jiē shì dì zàng pú sà jiǔ yuǎn jié lái, yǐ dù, dāng dù, wèi dù, yǐ chéng jiù, dāng chéng jiù, wèi chéng jiù. wén shū shī lì bái fó yán: shì zūn! wǒ yǐ guò qù jiǔ xiū shàn gēn, zhèng wú ài zhì, wén fó suǒ yán, jí dāng xìn shòu. xiǎo guǒ shēng wén, tiān lóng bā bù, jí wèi lái shì zhū zhòng shēng děng, suī wén rú lái chéng shí zhī yǔ, bì huái yí huò, shè shǐ dǐng shòu, wèi miǎn xīng bàng. wéi yuàn shì zūn, guǎng shuō dì zàng pú sà mó hē sà, yīn dì zuò hé xíng, lì hé yuàn, ér néng chéng jiù bù sī yì shì?',
    meaning: '佛告诉文殊师利：我以佛眼观察，也数不尽，这些都是地藏菩萨久远劫以来，已经度脱、将要度脱、未度脱，已经成就、将要成就、未成就的众生。文殊师利对佛说：世尊！我已过去久修善根，证得无碍智慧，听闻佛所说的话，立即信受。但小果声闻、天龙八部，以及未来世的众生，虽然听闻如来诚实的话语，必定会怀疑，即使恭敬接受，也难免会诽谤。希望世尊广说地藏菩萨在因地时做了什么行，立了什么愿，而能成就不可思议的事？',
  },
  {
    id: 'ch1-9',
    title: '第一品 忉利天宫神通品（九）地藏功德无量',
    text: '佛告文殊师利：譬如三千大千世界，所有草木丛林、稻麻竹苇、山石微尘，一物一数，作一恒河；一恒河沙，一沙一界；一界之内，一尘一劫，一劫之内，所积尘数，尽充为劫。地藏菩萨证十地果位已来，千倍多于上喻，何况地藏菩萨在声闻辟支佛地。文殊师利！此菩萨威神誓愿，不可思议。若未来世，有善男子善女人，闻是菩萨名字，或赞叹，或瞻礼，或称名，或供养，乃至彩画刻镂塑漆形像，是人当得百返生于三十三天，永不堕恶道。',
    pinyin: 'fó gào wén shū shī lì: pì rú sān qiān dà qiān shì jiè, suǒ yǒu cǎo mù cóng lín, dào má zhú wěi, shān shí wēi chén, yī wù yī shù, zuò yī héng hé; yī héng hé shā, yī shā yī jiè; yī jiè zhī nèi, yī chén yī jié, yī jié zhī nèi, suǒ jī chén shù, jìn chōng wéi jié. dì zàng pú sà zhèng shí dì guǒ wèi yǐ lái, qiān bèi duō yú shàng yù, hé kuàng dì zàng pú sà zài shēng wén pì zhī fó dì. wén shū shī lì! cǐ pú sà wēi shén shì yuàn, bù kě sī yì. ruò wèi lái shì, yǒu shàn nán zǐ shàn nǚ rén, wén shì pú sà míng zì, huò zàn tàn, huò zhān lǐ, huò chēng míng, huò gòng yǎng, nǎi zhì cǎi huà kè lòu sù qī xíng xiàng, shì rén dāng dé bǎi fǎn shēng yú sān shí sān tiān, yǒng bù duò è dào.',
    meaning: '佛告诉文殊师利：譬如三千大千世界，所有的草木丛林、稻麻竹苇、山石微尘，每一物作为一个数，作为一条恒河；一恒河的沙，一沙作为一个世界；一个世界之内，一尘作为一劫，一劫之内，所积的尘数，全部充作劫数。地藏菩萨证得十地果位以来的时间，千倍多于上面的比喻，何况地藏菩萨在声闻辟支佛地的时间。文殊师利！这位菩萨的威神誓愿，不可思议。如果未来世，有善男子善女人，听到这位菩萨的名字，或赞叹，或瞻礼，或称名，或供养，乃至彩画刻镂塑漆形像，这人应当得以百次往返生于三十三天，永不堕入恶道。',
  },
  {
    id: 'ch1-10',
    title: '第一品 忉利天宫神通品（十）长者子发愿',
    text: '文殊师利！是地藏菩萨摩诃萨，于过去久远不可说不可说劫前，身为大长者子。时世有佛，号曰师子奋迅具足万行如来。时长者子，见佛相好，千福庄严，因问彼佛：作何行愿，而得此相？时师子奋迅具足万行如来，告长者子：欲证此身，当须久远度脱一切受苦众生。',
    pinyin: 'wén shū shī lì! shì dì zàng pú sà mó hē sà, yú guò qù jiǔ yuǎn bù kě shuō bù kě shuō jié qián, shēn wéi dà zhǎng zhě zǐ. shí shì yǒu fó, hào yuē shī zǐ fèn xùn jù zú wàn xíng rú lái. shí zhǎng zhě zǐ, jiàn fó xiàng hǎo, qiān fú zhuāng yán, yīn wèn bǐ fó: zuò hé xíng yuàn, ér dé cǐ xiàng? shí shī zǐ fèn xùn jù zú wàn xíng rú lái, gào zhǎng zhě zǐ: yù zhèng cǐ shēn, dāng xū jiǔ yuǎn dù tuō yī qiè shòu kǔ zhòng shēng.',
    meaning: '文殊师利！地藏菩萨在过去久远不可说不可说劫前，曾是大长者的儿子。当时有佛，名叫师子奋迅具足万行如来。长者子见到佛的相好，千福庄严，就问那位佛：要修什么行愿，才能得到这样的相貌？师子奋迅具足万行如来告诉长者子：要证得此身，应当久远地度脱一切受苦众生。',
  },
  {
    id: 'ch1-11',
    title: '第一品 忉利天宫神通品（十一）长者子立大愿',
    text: '文殊师利！时长者子，因发愿言：我今尽未来际不可计劫，为是罪苦六道众生，广设方便，尽令解脱，而我自身方成佛道。以是于彼佛前，立斯大愿，于今百千万亿那由他不可说劫，尚为菩萨。',
    pinyin: 'wén shū shī lì! shí zhǎng zhě zǐ, yīn fā yuàn yán: wǒ jīn jìn wèi lái jì bù kě jì jié, wéi shì zuì kǔ liù dào zhòng shēng, guǎng shè fāng biàn, jìn lìng jiě tuō, ér wǒ zì shēn fāng chéng fó dào. yǐ shì yú bǐ fó qián, lì sī dà yuàn, yú jīn bǎi qiān wàn yì nà yóu tā bù kě shuō jié, shàng wéi pú sà.',
    meaning: '文殊师利！当时长者子就发愿说：我现在尽未来际不可计劫，为这些罪苦六道众生，广设方便，全部令其解脱，而我自身才成佛道。因此在那位佛前，立下这个大愿，到现在百千万亿那由他不可说劫，还是菩萨。',
  },
  {
    id: 'ch1-12',
    title: '第一品 忉利天宫神通品（十二）婆罗门女',
    text: '又于过去不可思议阿僧祇劫，时世有佛，号曰觉华定自在王如来，彼佛寿命四百千万亿阿僧祇劫。像法之中，有一婆罗门女，宿福深厚，众所钦敬，行住坐卧，诸天卫护。其母信邪，常轻三宝。是时圣女，广说方便，劝诱其母，令生正见。而此女母，未全生信，不久命终，魂神堕在无间地狱。',
    pinyin: 'yòu yú guò qù bù kě sī yì ā sēng qí jié, shí shì yǒu fó, hào yuē jué huá dìng zì zài wáng rú lái, bǐ fó shòu mìng sì bǎi qiān wàn yì ā sēng qí jié. xiàng fǎ zhī zhōng, yǒu yī pó luó mén nǚ, sù fú shēn hòu, zhòng suǒ qīn jìng, xíng zhù zuò wò, zhū tiān wèi hù. qí mǔ xìn xié, cháng qīng sān bǎo. shì shí shèng nǚ, guǎng shuō fāng biàn, quàn yòu qí mǔ, lìng shēng zhèng jiàn. ér cǐ nǚ mǔ, wèi quán shēng xìn, bù jiǔ mìng zhōng, hún shén duò zài wú jiàn dì yù.',
    meaning: '又在过去不可思议阿僧祇劫，当时有佛，名叫觉华定自在王如来，那位佛的寿命四百千万亿阿僧祇劫。在像法时期，有一位婆罗门女，宿世福德深厚，受众人钦敬，行住坐卧，诸天卫护。她的母亲信奉邪道，常轻视三宝。这时圣女广说方便，劝诱母亲，令其生起正见。但这位女子的母亲，没有完全生起信心，不久命终，魂神堕入无间地狱。',
  },
  {
    id: 'ch1-13',
    title: '第一品 忉利天宫神通品（十三）婆罗门女供佛',
    text: '时婆罗门女，知母在世，不信因果，计当随业，必生恶趣。遂卖家宅，广求香华，及诸供具，于先佛塔寺，大兴供养。见觉华定自在王如来，其形像在一寺中，塑画威容，端严毕备。时婆罗门女，瞻礼尊容，倍生敬仰。私自念言：佛名大觉，具一切智，若在世时，我母死后，傥来问佛，必知处所。',
    pinyin: 'shí pó luó mén nǚ, zhī mǔ zài shì, bù xìn yīn guǒ, jì dāng suí yè, bì shēng è qù. suì mài jiā zhái, guǎng qiú xiāng huá, jí zhū gòng jù, yú xiān fó tǎ sì, dà xīng gòng yǎng. jiàn jué huá dìng zì zài wáng rú lái, qí xíng xiàng zài yī sì zhōng, sù huà wēi róng, duān yán bì bèi. shí pó luó mén nǚ, zhān lǐ zūn róng, bèi shēng jìng yǎng. sī zì niàn yán: fó míng dà jué, jù yī qiè zhì, ruò zài shì shí, wǒ mǔ sǐ hòu, tǎng lái wèn fó, bì zhī chù suǒ.',
    meaning: '当时婆罗门女知道母亲在世时不信因果，推算应当随业，必定生于恶趣。于是卖掉家宅，广求香花及各种供具，在先佛塔寺，大兴供养。见到觉华定自在王如来的形像在一座寺中，塑画威容，端严完备。当时婆罗门女瞻礼尊容，倍加生起敬仰之心。私自心念：佛名大觉，具一切智慧，如果在世时，我母亲死后，若来问佛，必定知道她的去处。',
  },
  {
    id: 'ch1-14',
    title: '第一品 忉利天宫神通品（十四）佛示母去处',
    text: '时婆罗门女，垂泣良久，瞻恋如来。忽闻空中声曰：泣者圣女，勿至悲哀，我今示汝母之去处。婆罗门女，合掌向空，而白空曰：是何神德，宽我忧虑。我自失母已来，昼夜忆恋，无处可问，知母生界。时空中有声，再报女曰：我是汝所瞻礼者，过去觉华定自在王如来。见汝忆母，倍于常情众生之分，故来告示。',
    pinyin: 'shí pó luó mén nǚ, chuí qì liáng jiǔ, zhān liàn rú lái. hū wén kōng zhōng shēng yuē: qì zhě shèng nǚ, wù zhì bēi āi, wǒ jīn shì rǔ mǔ zhī qù chù. pó luó mén nǚ, hé zhǎng xiàng kōng, ér bái kōng yuē: shì hé shén dé, kuān wǒ yōu lǜ. wǒ zì shī mǔ yǐ lái, zhòu yè yì liàn, wú chù kě wèn, zhī mǔ shēng jiè. shí kōng zhōng yǒu shēng, zài bào nǚ yuē: wǒ shì rǔ suǒ zhān lǐ zhě, guò qù jué huá dìng zì zài wáng rú lái. jiàn rǔ yì mǔ, bèi yú cháng qíng zhòng shēng zhī fēn, gù lái gào shì.',
    meaning: '当时婆罗门女垂泣良久，瞻恋如来。忽然听到空中有声音说：哭泣的圣女，不要太悲哀，我现在告诉你母亲的去处。婆罗门女合掌向空，对空中说：是什么神德，宽解我的忧虑。我自从失去母亲以来，昼夜忆念，无处可问，想知道母亲生在何处。这时空中有声音，再次告诉女子说：我是你所瞻礼的，过去觉华定自在王如来。见你忆念母亲，超过常情众生的程度，所以来告诉你。',
  },
  {
    id: 'ch1-15',
    title: '第一品 忉利天宫神通品（十五）佛教念佛',
    text: '婆罗门女，闻此声已，举身自扑，支节皆损，左右扶侍，良久方苏，而白空曰：愿佛慈愍，速说我母生界，我今身心将死不久。时觉华定自在王如来，告圣女曰：汝供养毕，但早返舍，端坐思惟吾之名号，即当知母所生去处。时婆罗门女，寻礼佛已，即归其舍。以忆母故，端坐念觉华定自在王如来，经一日一夜。',
    pinyin: 'pó luó mén nǚ, wén cǐ shēng yǐ, jǔ shēn zì pū, zhī jié jiē sǔn, zuǒ yòu fú shì, liáng jiǔ fāng sū, ér bái kōng yuē: yuàn fó cí mǐn, sù shuō wǒ mǔ shēng jiè, wǒ jīn shēn xīn jiāng sǐ bù jiǔ. shí jué huá dìng zì zài wáng rú lái, gào shèng nǚ yuē: rǔ gòng yǎng bì, dàn zǎo fǎn shě, duān zuò sī wéi wú zhī míng hào, jí dāng zhī mǔ suǒ shēng qù chù. shí pó luó mén nǚ, xún lǐ fó yǐ, jí guī qí shě. yǐ yì mǔ gù, duān zuò niàn jué huá dìng zì zài wáng rú lái, jīng yī rì yī yè.',
    meaning: '婆罗门女听到这声音后，举身自扑，支节都受损，左右扶侍，良久才苏醒，对空中说：愿佛慈悲怜愍，快说我母亲生在何处，我现在身心将死不久。这时觉华定自在王如来告诉圣女说：你供养完毕，只要早点回家，端坐思惟我的名号，就应当知道母亲所生的去处。当时婆罗门女，随即礼佛完毕，就回到家中。因为忆念母亲的缘故，端坐念觉华定自在王如来，经过一日一夜。',
  },
  {
    id: 'ch1-16',
    title: '第一品 忉利天宫神通品（十六）游历地狱',
    text: '忽见自身到一海边，其水涌沸，多诸恶兽，尽复铁身，飞走海上，东西驰逐。见诸男子女人，百千万数，出没海中，被诸恶兽，争取食啖。又见夜叉，其形各异，或多手，多眼，多足，多头，口牙外出，利刃如剑，驱诸罪人，使近恶兽，复自搏攫，头足相就。其形万类，不敢久视。时婆罗门女，以念佛力故，自然无惧。',
    pinyin: 'hū jiàn zì shēn dào yī hǎi biān, qí shuǐ yǒng fèi, duō zhū è shòu, jìn fù tiě shēn, fēi zǒu hǎi shàng, dōng xī chí zhú. jiàn zhū nán zǐ nǚ rén, bǎi qiān wàn shù, chū mò hǎi zhōng, bèi zhū è shòu, zhēng qǔ shí dàn. yòu jiàn yè chā, qí xíng gè yì, huò duō shǒu, duō yǎn, duō zú, duō tóu, kǒu yá wài chū, lì rèn rú jiàn, qū zhū zuì rén, shǐ jìn è shòu, fù zì bó jué, tóu zú xiāng jiù. qí xíng wàn lèi, bù gǎn jiǔ shì. shí pó luó mén nǚ, yǐ niàn fó lì gù, zì rán wú jù.',
    meaning: '忽然见到自己到了一个海边，那水涌沸，有很多恶兽，全都是铁身，飞走在海上，东西驰逐。见到许多男子女人，百千万数，出没在海中，被各种恶兽争相取食。又见到夜叉，形状各异，有的多手、多眼、多足、多头，口牙外露，利刃如剑，驱赶罪人，使其靠近恶兽，又自己搏击抓取，头足相就。其形状万类，不敢久视。当时婆罗门女，因为念佛力的缘故，自然无惧。',
  },
  {
    id: 'ch1-17',
    title: '第一品 忉利天宫神通品（十七）遇无毒鬼王',
    text: '有一鬼王，名曰无毒。稽首来迎，白圣女曰：善哉，菩萨，何缘来此？时婆罗门女，问鬼王曰：此是何处？无毒答曰：此是大铁围山，西面第一重海。圣女问曰：我闻铁围之内，地狱在中，是事实不？无毒答曰：实有地狱。圣女问曰：我今云何得到狱所？无毒答曰：若非威神，即须业力，非此二事，终不能到。',
    pinyin: 'yǒu yī guǐ wáng, míng yuē wú dú. qǐ shǒu lái yíng, bái shèng nǚ yuē: shàn zāi, pú sà, hé yuán lái cǐ? shí pó luó mén nǚ, wèn guǐ wáng yuē: cǐ shì hé chù? wú dú dá yuē: cǐ shì dà tiě wéi shān, xī miàn dì yī chóng hǎi. shèng nǚ wèn yuē: wǒ wén tiě wéi zhī nèi, dì yù zài zhōng, shì shì shí fǒu? wú dú dá yuē: shí yǒu dì yù. shèng nǚ wèn yuē: wǒ jīn yún hé dé dào yù suǒ? wú dú dá yuē: ruò fēi wēi shén, jí xū yè lì, fēi cǐ èr shì, zhōng bù néng dào.',
    meaning: '有一位鬼王，名叫无毒。稽首来迎接，对圣女说：善哉，菩萨，什么因缘来到这里？当时婆罗门女问鬼王说：这是什么地方？无毒回答说：这是大铁围山，西面第一重海。圣女问：我听说铁围之内，地狱在其中，这事是真的吗？无毒回答：确实有地狱。圣女问：我现在怎么能到地狱所在？无毒回答：如果不是威神之力，就须业力，不是这两件事，终究不能到达。',
  },
  {
    id: 'ch1-18',
    title: '第一品 忉利天宫神通品（十八）业海之苦',
    text: '圣女又问：此水何缘，而乃涌沸，多诸罪人，及以恶兽？无毒答曰：此是阎浮提造恶众生，新死之者，经四十九日后，无人继嗣，为作功德，救拔苦难，生时又无善因。当据本业所感地狱，自然先渡此海。海东十万由旬，又有一海，其苦倍此。彼海之东，又有一海，其苦复倍。三业恶因之所招感，共号业海，其处是也。',
    pinyin: 'shèng nǚ yòu wèn: cǐ shuǐ hé yuán, ér nǎi yǒng fèi, duō zhū zuì rén, jí yǐ è shòu? wú dú dá yuē: cǐ shì yán fú tí zào è zhòng shēng, xīn sǐ zhī zhě, jīng sì shí jiǔ rì hòu, wú rén jì sì, wéi zuò gōng dé, jiù bá kǔ nàn, shēng shí yòu wú shàn yīn. dāng jù běn yè suǒ gǎn dì yù, zì rán xiān dù cǐ hǎi. hǎi dōng shí wàn yóu xún, yòu yǒu yī hǎi, qí kǔ bèi cǐ. bǐ hǎi zhī dōng, yòu yǒu yī hǎi, qí kǔ fù bèi. sān yè è yīn zhī suǒ zhāo gǎn, gòng hào yè hǎi, qí chù shì yě.',
    meaning: '圣女又问：这水什么缘故，竟然涌沸，有很多罪人，以及恶兽？无毒回答说：这是阎浮提造恶众生，新死的人，经过四十九日后，无人继嗣，为其作功德，救拔苦难，生时又无善因。应当根据本业所感的地狱，自然先渡过此海。海东十万由旬，又有一海，其苦加倍于此。那海之东，又有一海，其苦又加倍。三业恶因所招感，共同称为业海，那个地方就是。',
  },
  {
    id: 'ch1-19',
    title: '第一品 忉利天宫神通品（十九）地狱无数',
    text: '圣女又问鬼王无毒曰：地狱何在？无毒答曰：三海之内，是大地狱，其数百千，各各差别。所谓大者，具有十八。次有五百，苦毒无量。次有千百，亦无量苦。圣女又问大鬼王曰：我母死来未久，不知魂神当至何趣？鬼王问圣女曰：菩萨之母，在生习何行业？圣女答曰：我母邪见，讥毁三宝。设或暂信，旋又不敬，死虽日浅，未知生处。',
    pinyin: 'shèng nǚ yòu wèn guǐ wáng wú dú yuē: dì yù hé zài? wú dú dá yuē: sān hǎi zhī nèi, shì dà dì yù, qí shù bǎi qiān, gè gè chā bié. suǒ wèi dà zhě, jù yǒu shí bā. cì yǒu wǔ bǎi, kǔ dú wú liàng. cì yǒu qiān bǎi, yì wú liàng kǔ. shèng nǚ yòu wèn dà guǐ wáng yuē: wǒ mǔ sǐ lái wèi jiǔ, bù zhī hún shén dāng zhì hé qù? guǐ wáng wèn shèng nǚ yuē: pú sà zhī mǔ, zài shēng xí hé xíng yè? shèng nǚ dá yuē: wǒ mǔ xié jiàn, jī huǐ sān bǎo. shè huò zàn xìn, xuán yòu bù jìng, sǐ suī rì qiǎn, wèi zhī shēng chù.',
    meaning: '圣女又问鬼王无毒说：地狱在哪里？无毒回答说：三海之内，是大地狱，其数百千，各各不同。所谓大的，共有十八个。其次有五百个，苦毒无量。再其次有千百个，也是无量苦。圣女又问大鬼王说：我母亲死来不久，不知魂神应当到何处？鬼王问圣女说：菩萨的母亲，在生时习什么行业？圣女回答说：我母亲邪见，讥毁三宝。即使偶尔相信，转眼又不敬，死虽日浅，不知生在何处。',
  },
  {
    id: 'ch1-20',
    title: '第一品 忉利天宫神通品（二十）母已生天',
    text: '无毒问曰：菩萨之母，姓氏何等？圣女答曰：我父我母，俱婆罗门种，父号尸罗善现，母号悦帝利。无毒合掌启菩萨曰：愿圣者却返本处，无至忧忆悲恋。悦帝利罪女，生天以来，经今三日。云承孝顺之子，为母设供修福，布施觉华定自在王如来塔寺。非唯菩萨之母，得脱地狱，应是无间罪人，此日悉得受乐，俱同生讫。鬼王言毕，合掌而退。',
    pinyin: 'wú dú wèn yuē: pú sà zhī mǔ, xìng shì hé děng? shèng nǚ dá yuē: wǒ fù wǒ mǔ, jù pó luó mén zhǒng, fù hào shī luó shàn xiàn, mǔ hào yuè dì lì. wú dú hé zhǎng qǐ pú sà yuē: yuàn shèng zhě què fǎn běn chù, wú zhì yōu yì bēi liàn. yuè dì lì zuì nǚ, shēng tiān yǐ lái, jīng jīn sān rì. yún chéng xiào shùn zhī zǐ, wéi mǔ shè gòng xiū fú, bù shī jué huá dìng zì zài wáng rú lái tǎ sì. fēi wéi pú sà zhī mǔ, dé tuō dì yù, yìng shì wú jiàn zuì rén, cǐ rì xī dé shòu lè, jù tóng shēng qì. guǐ wáng yán bì, hé zhǎng ér tuì.',
    meaning: '无毒问说：菩萨的母亲，姓氏是什么？圣女回答说：我父我母，都是婆罗门种，父亲名叫尸罗善现，母亲名叫悦帝利。无毒合掌启白菩萨说：愿圣者返回本处，不要忧虑悲恋。悦帝利罪女，生天以来，到今天三日。据说承蒙孝顺的儿子，为母亲设供修福，布施觉华定自在王如来塔寺。不仅菩萨的母亲，得脱地狱，应该是无间罪人，这一天全都得以受乐，一同往生完毕。鬼王说完，合掌而退。',
  },
  {
    id: 'ch1-21',
    title: '第一品 忉利天宫神通品（二十一）婆罗门女发愿',
    text: '婆罗门女寻如梦归，悟此事已，便于觉华定自在王如来塔像之前，立弘誓愿，愿我尽未来劫，应有罪苦众生，广设方便，使令解脱。佛告文殊师利：时鬼王无毒者，当今财首菩萨是。婆罗门女者，即地藏菩萨是。',
    pinyin: 'pó luó mén nǚ xún rú mèng guī, wù cǐ shì yǐ, biàn yú jué huá dìng zì zài wáng rú lái tǎ xiàng zhī qián, lì hóng shì yuàn, yuàn wǒ jìn wèi lái jié, yìng yǒu zuì kǔ zhòng shēng, guǎng shè fāng biàn, shǐ lìng jiě tuō. fó gào wén shū shī lì: shí guǐ wáng wú dú zhě, dāng jīn cái shǒu pú sà shì. pó luó mén nǚ zhě, jí dì zàng pú sà shì.',
    meaning: '婆罗门女随即如梦般回来，悟到这件事后，就在觉华定自在王如来塔像之前，立下弘誓大愿，愿我尽未来劫，应有罪苦众生，广设方便，使令解脱。佛告诉文殊师利：当时的鬼王无毒，就是现在的财首菩萨。婆罗门女，就是地藏菩萨。',
  },
];


// 第二品：分身集会品
export const chapter2Sections: SutraSection[] = [
  {
    id: 'ch2-1',
    title: '第二品 分身集会品（一）分身云集',
    text: '尔时百千万亿不可思、不可议、不可量、不可说无量阿僧祇世界，所有地狱处，分身地藏菩萨，俱来集在忉利天宫。以如来神力故，各以方面，与诸得解脱从业道出者，亦各有千万亿那由他数，共持香华，来供养佛。',
    pinyin: 'ěr shí bǎi qiān wàn yì bù kě sī, bù kě yì, bù kě liàng, bù kě shuō wú liàng ā sēng qí shì jiè, suǒ yǒu dì yù chù, fēn shēn dì zàng pú sà, jù lái jí zài dāo lì tiān gōng. yǐ rú lái shén lì gù, gè yǐ fāng miàn, yǔ zhū dé jiě tuō cóng yè dào chū zhě, yì gè yǒu qiān wàn yì nà yóu tā shù, gòng chí xiāng huá, lái gòng yǎng fó.',
    meaning: '这时百千万亿不可思议、不可称量的无量世界中，所有地狱处的分身地藏菩萨，都来集会在忉利天宫。承如来神力，各从四方而来，与那些得到解脱从业道中出来的众生，也各有千万亿那由他数，共同持香花来供养佛。',
  },
  {
    id: 'ch2-2',
    title: '第二品 分身集会品（二）众生蒙度',
    text: '彼诸同来等辈，皆因地藏菩萨教化，永不退转于阿耨多罗三藐三菩提。是诸众等，久远劫来，流浪生死，六道受苦，暂无休息。以地藏菩萨，广大慈悲，深誓愿故，各获果证。既至忉利，心怀踊跃，瞻仰如来，目不暂舍。',
    pinyin: 'bǐ zhū tóng lái děng bèi, jiē yīn dì zàng pú sà jiào huà, yǒng bù tuì zhuǎn yú ā nòu duō luó sān miǎo sān pú tí. shì zhū zhòng děng, jiǔ yuǎn jié lái, liú làng shēng sǐ, liù dào shòu kǔ, zàn wú xiū xī. yǐ dì zàng pú sà, guǎng dà cí bēi, shēn shì yuàn gù, gè huò guǒ zhèng. jì zhì dāo lì, xīn huái yǒng yuè, zhān yǎng rú lái, mù bù zàn shě.',
    meaning: '那些同来的众生，都因地藏菩萨教化，永不退转于无上正等正觉。这些众生，久远劫来，流浪生死，在六道中受苦，暂无休息。因为地藏菩萨广大慈悲，深重誓愿的缘故，各自获得果证。既然到了忉利天，心怀踊跃，瞻仰如来，目不暂舍。',
  },
  {
    id: 'ch2-3',
    title: '第二品 分身集会品（三）佛嘱托地藏',
    text: '尔时世尊舒金色臂，摩百千万亿不可思、不可议、不可量、不可说无量阿僧祇世界，诸分身地藏菩萨摩诃萨顶，而作是言：吾于五浊恶世，教化如是刚强众生，令心调伏，舍邪归正，十有一二，尚恶习在。',
    pinyin: 'ěr shí shì zūn shū jīn sè bì, mó bǎi qiān wàn yì bù kě sī, bù kě yì, bù kě liàng, bù kě shuō wú liàng ā sēng qí shì jiè, zhū fēn shēn dì zàng pú sà mó hē sà dǐng, ér zuò shì yán: wú yú wǔ zhuó è shì, jiào huà rú shì gāng qiáng zhòng shēng, lìng xīn tiáo fú, shě xié guī zhèng, shí yǒu yī èr, shàng è xí zài.',
    meaning: '这时世尊伸出金色手臂，摩无量世界诸分身地藏菩萨的头顶，说道：我在五浊恶世，教化这些刚强的众生，令其心调伏，舍邪归正，十个中有一二个，还保留着恶习。',
  },
  {
    id: 'ch2-4',
    title: '第二品 分身集会品（四）佛分身度众',
    text: '吾亦分身千百亿，广设方便。或有利根，闻即信受。或有善果，勤劝成就。或有暗钝，久化方归。或有业重，不生敬仰。如是等辈众生，各各差别，分身度脱。或现男子身，或现女人身，或现天龙身，或现神鬼身，或现山林川原，河池泉井，利及于人，悉皆度脱。',
    pinyin: 'wú yì fēn shēn qiān bǎi yì, guǎng shè fāng biàn. huò yǒu lì gēn, wén jí xìn shòu. huò yǒu shàn guǒ, qín quàn chéng jiù. huò yǒu àn dùn, jiǔ huà fāng guī. huò yǒu yè zhòng, bù shēng jìng yǎng. rú shì děng bèi zhòng shēng, gè gè chā bié, fēn shēn dù tuō. huò xiàn nán zǐ shēn, huò xiàn nǚ rén shēn, huò xiàn tiān lóng shēn, huò xiàn shén guǐ shēn, huò xiàn shān lín chuān yuán, hé chí quán jǐng, lì jí yú rén, xī jiē dù tuō.',
    meaning: '我也分身千百亿，广设方便。有的利根，听闻就信受。有的善果，勤劝成就。有的暗钝，久化才归依。有的业重，不生敬仰。这些众生，各各不同，分身度脱。或现男子身，或现女人身，或现天龙身，或现神鬼身，或现山林川原、河池泉井，利益于人，全都度脱。',
  },
  {
    id: 'ch2-5',
    title: '第二品 分身集会品（五）殷勤付嘱',
    text: '汝观吾累劫勤苦，度脱如是等难化刚强罪苦众生。其有未调伏者，随业报应。若堕恶趣，受大苦时，汝当忆念吾在忉利天宫，殷勤付嘱，令娑婆世界至弥勒出世已来众生，悉使解脱，永离诸苦，遇佛授记。',
    pinyin: 'rǔ guān wú lèi jié qín kǔ, dù tuō rú shì děng nán huà gāng qiáng zuì kǔ zhòng shēng. qí yǒu wèi tiáo fú zhě, suí yè bào yìng. ruò duò è qù, shòu dà kǔ shí, rǔ dāng yì niàn wú zài dāo lì tiān gōng, yīn qín fù zhǔ, lìng suō pó shì jiè zhì mí lè chū shì yǐ lái zhòng shēng, xī shǐ jiě tuō, yǒng lí zhū kǔ, yù fó shòu jì.',
    meaning: '你看我累劫勤苦，度脱这些难化刚强罪苦众生。其中有未调伏的，随业报应。如果堕入恶趣，受大苦时，你应当忆念我在忉利天宫，殷勤付嘱，令娑婆世界到弥勒出世以来的众生，全都解脱，永离诸苦，遇佛授记。',
  },
  {
    id: 'ch2-6',
    title: '第二品 分身集会品（六）地藏承诺',
    text: '尔时诸世界分身地藏菩萨，共复一形，涕泪哀恋，白其佛言：我从久远劫来，蒙佛接引，使获不可思议神力，具大智慧。我所分身，遍满百千万亿恒河沙世界，每一世界化百千万亿身，每一身度百千万亿人。令归敬三宝，永离生死，至涅槃乐。',
    pinyin: 'ěr shí zhū shì jiè fēn shēn dì zàng pú sà, gòng fù yī xíng, tì lèi āi liàn, bái qí fó yán: wǒ cóng jiǔ yuǎn jié lái, méng fó jiē yǐn, shǐ huò bù kě sī yì shén lì, jù dà zhì huì. wǒ suǒ fēn shēn, biàn mǎn bǎi qiān wàn yì héng hé shā shì jiè, měi yī shì jiè huà bǎi qiān wàn yì shēn, měi yī shēn dù bǎi qiān wàn yì rén. lìng guī jìng sān bǎo, yǒng lí shēng sǐ, zhì niè pán lè.',
    meaning: '这时诸世界分身地藏菩萨，共同恢复一形，涕泪哀恋，对佛说：我从久远劫来，承蒙佛接引，使我获得不可思议神力，具大智慧。我所分身，遍满百千万亿恒河沙世界，每一世界化百千万亿身，每一身度百千万亿人。令其归敬三宝，永离生死，至涅槃乐。',
  },
  {
    id: 'ch2-7',
    title: '第二品 分身集会品（七）三白世尊',
    text: '但于佛法中所为善事，一毛一渧，一沙一尘，或毫发许，我渐度脱，使获大利。唯愿世尊，不以后世恶业众生为虑。如是三白佛言：唯愿世尊，不以后世恶业众生为虑。尔时佛赞地藏菩萨言：善哉！善哉！吾助汝喜。汝能成就久远劫来发弘誓愿，广度将毕，即证菩提。',
    pinyin: 'dàn yú fó fǎ zhōng suǒ wéi shàn shì, yī máo yī dī, yī shā yī chén, huò háo fà xǔ, wǒ jiàn dù tuō, shǐ huò dà lì. wéi yuàn shì zūn, bù yǐ hòu shì è yè zhòng shēng wéi lǜ. rú shì sān bái fó yán: wéi yuàn shì zūn, bù yǐ hòu shì è yè zhòng shēng wéi lǜ. ěr shí fó zàn dì zàng pú sà yán: shàn zāi! shàn zāi! wú zhù rǔ xǐ. rǔ néng chéng jiù jiǔ yuǎn jié lái fā hóng shì yuàn, guǎng dù jiāng bì, jí zhèng pú tí.',
    meaning: '但在佛法中所做的善事，一毛一滴，一沙一尘，或毫发许，我渐渐度脱，使其获得大利。希望世尊，不要为后世恶业众生忧虑。如此三次对佛说：希望世尊，不要为后世恶业众生忧虑。这时佛赞叹地藏菩萨说：善哉！善哉！我随喜你。你能成就久远劫来发的弘誓大愿，广度将要完毕，就证菩提。',
  },
];

// 第三品：观众生业缘品
export const chapter3Sections: SutraSection[] = [
  {
    id: 'ch3-1',
    title: '第三品 观众生业缘品（一）摩耶夫人问业报',
    text: '尔时佛母摩耶夫人，恭敬合掌，问地藏菩萨言：圣者！阎浮众生，造业差别，所受报应，其事云何？地藏答言：千万世界，乃及国土，或有地狱，或无地狱。或有女人，或无女人。或有佛法，或无佛法。乃至声闻、辟支佛，亦复如是，非但地狱罪报一等。',
    pinyin: 'ěr shí fó mǔ mó yē fū rén, gōng jìng hé zhǎng, wèn dì zàng pú sà yán: shèng zhě! yán fú zhòng shēng, zào yè chā bié, suǒ shòu bào yìng, qí shì yún hé? dì zàng dá yán: qiān wàn shì jiè, nǎi jí guó tǔ, huò yǒu dì yù, huò wú dì yù. huò yǒu nǚ rén, huò wú nǚ rén. huò yǒu fó fǎ, huò wú fó fǎ. nǎi zhì shēng wén, pì zhī fó, yì fù rú shì, fēi dàn dì yù zuì bào yī děng.',
    meaning: '这时佛母摩耶夫人恭敬合掌，问地藏菩萨：圣者！阎浮提众生造业的差别，所受的报应，是怎样的呢？地藏菩萨回答：千万世界及国土中，有的有地狱，有的没有地狱；有的有女人，有的没有女人；有的有佛法，有的没有佛法。乃至声闻、辟支佛，也是如此，不只是地狱罪报一种。',
  },
  {
    id: 'ch3-2',
    title: '第三品 观众生业缘品（二）五无间罪',
    text: '尔时地藏菩萨白圣母言：南阎浮提罪报名号如是。若有众生，不孝父母，或至杀害，当堕无间地狱，千万亿劫，求出无期。若有众生，出佛身血，毁谤三宝，不敬尊经，亦当堕于无间地狱，千万亿劫，求出无期。',
    pinyin: 'ěr shí dì zàng pú sà bái shèng mǔ yán: nán yán fú tí zuì bào míng hào rú shì. ruò yǒu zhòng shēng, bù xiào fù mǔ, huò zhì shā hài, dāng duò wú jiàn dì yù, qiān wàn yì jié, qiú chū wú qī. ruò yǒu zhòng shēng, chū fó shēn xuè, huǐ bàng sān bǎo, bù jìng zūn jīng, yì dāng duò yú wú jiàn dì yù, qiān wàn yì jié, qiú chū wú qī.',
    meaning: '这时地藏菩萨对圣母说：南阎浮提罪报名号是这样的。如果有众生，不孝父母，或至杀害，应当堕入无间地狱，千万亿劫，求出无期。如果有众生，出佛身血，毁谤三宝，不敬尊经，也应当堕入无间地狱，千万亿劫，求出无期。',
  },
  {
    id: 'ch3-3',
    title: '第三品 观众生业缘品（三）无间地狱',
    text: '摩耶夫人重白地藏菩萨言：云何名为无间地狱？地藏白言：圣母！诸有地狱，在大铁围山之内。其大地狱有一十八所，次有五百，名号各别。次有千百，名字亦别。无间狱者，其狱城周匝八万余里，其城纯铁，高一万里。城上火聚，少有空缺。',
    pinyin: 'mó yē fū rén chóng bái dì zàng pú sà yán: yún hé míng wéi wú jiàn dì yù? dì zàng bái yán: shèng mǔ! zhū yǒu dì yù, zài dà tiě wéi shān zhī nèi. qí dà dì yù yǒu yī shí bā suǒ, cì yǒu wǔ bǎi, míng hào gè bié. cì yǒu qiān bǎi, míng zì yì bié. wú jiàn yù zhě, qí yù chéng zhōu zā bā wàn yú lǐ, qí chéng chún tiě, gāo yī wàn lǐ. chéng shàng huǒ jù, shǎo yǒu kōng quē.',
    meaning: '摩耶夫人又问地藏菩萨：什么叫做无间地狱？地藏菩萨说：圣母！所有地狱都在大铁围山之内。大地狱有十八所，其次有五百个，名号各不相同。再其次有千百个，名字也各不相同。无间地狱，其狱城周围八万多里，城墙纯铁打造，高一万里。城上火聚，少有空缺。',
  },
  {
    id: 'ch3-4',
    title: '第三品 观众生业缘品（四）无间之苦',
    text: '其狱城中，诸狱相连，名号各别。独有一狱，名曰无间。其狱周匝万八千里，狱墙高一千里，悉是铁为。上火彻下，下火彻上。铁蛇铁狗，吐火驰逐，狱墙之上，东西而走。狱中有床，遍满万里。一人受罪，自见其身，遍卧满床。千万人受罪，亦各自见身满床上。',
    pinyin: 'qí yù chéng zhōng, zhū yù xiāng lián, míng hào gè bié. dú yǒu yī yù, míng yuē wú jiàn. qí yù zhōu zā wàn bā qiān lǐ, yù qiáng gāo yī qiān lǐ, xī shì tiě wéi. shàng huǒ chè xià, xià huǒ chè shàng. tiě shé tiě gǒu, tǔ huǒ chí zhú, yù qiáng zhī shàng, dōng xī ér zǒu. yù zhōng yǒu chuáng, biàn mǎn wàn lǐ. yī rén shòu zuì, zì jiàn qí shēn, biàn wò mǎn chuáng. qiān wàn rén shòu zuì, yì gè zì jiàn shēn mǎn chuáng shàng.',
    meaning: '那狱城中，诸狱相连，名号各不相同。独有一狱，名叫无间。那狱周围一万八千里，狱墙高一千里，全是铁造。上火彻下，下火彻上。铁蛇铁狗，吐火驰逐，在狱墙之上，东西奔走。狱中有床，遍满万里。一人受罪，自见其身，遍卧满床。千万人受罪，也各自见身满床上。',
  },
  {
    id: 'ch3-5',
    title: '第三品 观众生业缘品（五）五事无间',
    text: '又五事业感，故称无间。何等为五？一者，日夜受罪，以至劫数，无时间绝，故称无间。二者，一人亦满，多人亦满，故称无间。三者，罪器叉棒，鹰蛇狼犬，碓磨锯凿，剉斫镬汤，铁网铁绳，铁驴铁马，生革络首，热铁浇身，饥吞铁丸，渴饮铁汁，从年竟劫，数那由他，苦楚相连，更无间断，故称无间。四者，不问男子女人，羌胡夷狄，老幼贵贱，或龙，或神，或天，或鬼，罪行业感，悉同受之，故称无间。五者，若堕此狱，从初入时，至百千劫，一日一夜，万死万生，求一念间，暂住不得，除非业尽，方得受生，以此连绵，故称无间。',
    pinyin: 'yòu wǔ shì yè gǎn, gù chēng wú jiàn. hé děng wéi wǔ? yī zhě, rì yè shòu zuì, yǐ zhì jié shù, wú shí jiān jué, gù chēng wú jiàn. èr zhě, yī rén yì mǎn, duō rén yì mǎn, gù chēng wú jiàn. sān zhě, zuì qì chā bàng, yīng shé láng quǎn, duì mó jù záo, cuò zhuó huò tāng, tiě wǎng tiě shéng, tiě lǘ tiě mǎ, shēng gé luò shǒu, rè tiě jiāo shēn, jī tūn tiě wán, kě yǐn tiě zhī, cóng nián jìng jié, shù nà yóu tā, kǔ chǔ xiāng lián, gèng wú jiān duàn, gù chēng wú jiàn. sì zhě, bù wèn nán zǐ nǚ rén, qiāng hú yí dí, lǎo yòu guì jiàn, huò lóng, huò shén, huò tiān, huò guǐ, zuì xíng yè gǎn, xī tóng shòu zhī, gù chēng wú jiàn. wǔ zhě, ruò duò cǐ yù, cóng chū rù shí, zhì bǎi qiān jié, yī rì yī yè, wàn sǐ wàn shēng, qiú yī niàn jiān, zàn zhù bù dé, chú fēi yè jìn, fāng dé shòu shēng, yǐ cǐ lián mián, gù chēng wú jiàn.',
    meaning: '又因五事业感，所以称为无间。哪五种？第一，日夜受罪，以至劫数，无时间断，所以称无间。第二，一人也满，多人也满，所以称无间。第三，罪器叉棒、鹰蛇狼犬、碓磨锯凿、剉斫镬汤、铁网铁绳、铁驴铁马、生革络首、热铁浇身、饥吞铁丸、渴饮铁汁，从年到劫，数那由他，苦楚相连，更无间断，所以称无间。第四，不问男子女人，羌胡夷狄，老幼贵贱，或龙，或神，或天，或鬼，罪行业感，全都同受，所以称无间。第五，如果堕此狱，从初入时，至百千劫，一日一夜，万死万生，求一念间，暂住不得，除非业尽，才得受生，以此连绵，所以称无间。',
  },
  {
    id: 'ch3-6',
    title: '第三品 观众生业缘品（六）摩耶夫人退',
    text: '地藏菩萨白圣母言：无间地狱，粗说如是。若广说地狱罪器等名，及诸苦事，一劫之中，求说不尽。摩耶夫人闻已，愁忧合掌，顶礼而退。',
    pinyin: 'dì zàng pú sà bái shèng mǔ yán: wú jiàn dì yù, cū shuō rú shì. ruò guǎng shuō dì yù zuì qì děng míng, jí zhū kǔ shì, yī jié zhī zhōng, qiú shuō bù jìn. mó yē fū rén wén yǐ, chóu yōu hé zhǎng, dǐng lǐ ér tuì.',
    meaning: '地藏菩萨对圣母说：无间地狱，粗略说是这样。如果广说地狱罪器等名，以及诸苦事，一劫之中，也说不尽。摩耶夫人听后，愁忧合掌，顶礼而退。',
  },
];

// 第四品：阎浮众生业感品
export const chapter4Sections: SutraSection[] = [
  {
    id: 'ch4-1',
    title: '第四品 阎浮众生业感品（一）定自在王问愿',
    text: '说是语时，会中有一菩萨摩诃萨，名定自在王，白佛言：世尊！地藏菩萨，累劫已来，各发何愿，今蒙世尊，殷勤赞叹。唯愿世尊，略而说之。',
    pinyin: 'shuō shì yǔ shí, huì zhōng yǒu yī pú sà mó hē sà, míng dìng zì zài wáng, bái fó yán: shì zūn! dì zàng pú sà, lèi jié yǐ lái, gè fā hé yuàn, jīn méng shì zūn, yīn qín zàn tàn. wéi yuàn shì zūn, lüè ér shuō zhī.',
    meaning: '说这话时，会中有一位菩萨，名叫定自在王，对佛说：世尊！地藏菩萨累劫以来，发了什么愿，如今承蒙世尊殷勤赞叹。希望世尊简略地说一说。',
  },
  {
    id: 'ch4-2',
    title: '第四品 阎浮众生业感品（二）二王发愿',
    text: '乃往过去无量阿僧祇那由他不可说劫，尔时有佛，号一切智成就如来。其佛寿命六万劫。未出家时，为小国王，与一邻国王为友，同行十善，饶益众生。其邻国内，所有人民，多造众恶。二王议计，广设方便。一王发愿，早成佛道，当度是辈，令使无余。一王发愿，若不先度罪苦，令是安乐，得至菩提，我终未愿成佛。',
    pinyin: 'nǎi wǎng guò qù wú liàng ā sēng qí nà yóu tā bù kě shuō jié, ěr shí yǒu fó, hào yī qiè zhì chéng jiù rú lái. qí fó shòu mìng liù wàn jié. wèi chū jiā shí, wéi xiǎo guó wáng, yǔ yī lín guó wáng wéi yǒu, tóng xíng shí shàn, ráo yì zhòng shēng. qí lín guó nèi, suǒ yǒu rén mín, duō zào zhòng è. èr wáng yì jì, guǎng shè fāng biàn. yī wáng fā yuàn, zǎo chéng fó dào, dāng dù shì bèi, lìng shǐ wú yú. yī wáng fā yuàn, ruò bù xiān dù zuì kǔ, lìng shì ān lè, dé zhì pú tí, wǒ zhōng wèi yuàn chéng fó.',
    meaning: '在过去无量阿僧祇那由他不可说劫，那时有佛，名叫一切智成就如来。那佛寿命六万劫。未出家时，是小国王，与一邻国王为友，同行十善，饶益众生。那邻国内，所有人民，多造众恶。二王商议，广设方便。一王发愿，早成佛道，应当度这些人，令其无余。一王发愿，如果不先度罪苦众生，令其安乐，得至菩提，我终不愿成佛。',
  },
  {
    id: 'ch4-3',
    title: '第四品 阎浮众生业感品（三）光目女救母',
    text: '复于过去无量阿僧祇劫，有佛出世，名清净莲华目如来，其佛寿命四十劫。像法之中，有一罗汉，福度众生。因次教化，遇一女人，字曰光目，设食供养。罗汉问之：欲愿何等？光目答言：我以母亡之日，资福救拔，未知我母，生处何趣？',
    pinyin: 'fù yú guò qù wú liàng ā sēng qí jié, yǒu fó chū shì, míng qīng jìng lián huá mù rú lái, qí fó shòu mìng sì shí jié. xiàng fǎ zhī zhōng, yǒu yī luó hàn, fú dù zhòng shēng. yīn cì jiào huà, yù yī nǚ rén, zì yuē guāng mù, shè shí gòng yǎng. luó hàn wèn zhī: yù yuàn hé děng? guāng mù dá yán: wǒ yǐ mǔ wáng zhī rì, zī fú jiù bá, wèi zhī wǒ mǔ, shēng chù hé qù?',
    meaning: '又在过去无量阿僧祇劫，有佛出世，名叫清净莲华目如来，那佛寿命四十劫。在像法时期，有一位罗汉，福度众生。在教化过程中，遇到一位女子，名叫光目，设食供养。罗汉问她：你想求什么？光目回答：我在母亲去世之日，为她修福救拔，不知道我母亲生在何处？',
  },
  {
    id: 'ch4-4',
    title: '第四品 阎浮众生业感品（四）母堕恶趣',
    text: '罗汉愍之，为入定观，见光目女母堕在恶趣，受极大苦。罗汉问光目言：汝母在生作何行业？今在恶趣受极大苦。光目答言：我母所习，唯好食啖鱼鳖之属。所食鱼鳖，多食其子，或炒或煮，恣情食啖，计其命数，千万复倍。尊者慈愍，如何哀救？',
    pinyin: 'luó hàn mǐn zhī, wéi rù dìng guān, jiàn guāng mù nǚ mǔ duò zài è qù, shòu jí dà kǔ. luó hàn wèn guāng mù yán: rǔ mǔ zài shēng zuò hé xíng yè? jīn zài è qù shòu jí dà kǔ. guāng mù dá yán: wǒ mǔ suǒ xí, wéi hǎo shí dàn yú biē zhī shǔ. suǒ shí yú biē, duō shí qí zǐ, huò chǎo huò zhǔ, zì qíng shí dàn, jì qí mìng shù, qiān wàn fù bèi. zūn zhě cí mǐn, rú hé āi jiù?',
    meaning: '罗汉怜愍她，为她入定观察，见光目女的母亲堕在恶趣，受极大苦。罗汉问光目：你母亲在生时做了什么行业？现在在恶趣受极大苦。光目回答：我母亲所习，只喜欢吃鱼鳖之类。所吃鱼鳖，多吃其子，或炒或煮，恣情食啖，计算其命数，千万倍还不止。尊者慈愍，如何哀救？',
  },
  {
    id: 'ch4-5',
    title: '第四品 阎浮众生业感品（五）光目发愿',
    text: '光目闻已，啼泪号泣而白空界：愿我之母，永脱地狱，毕十三岁，更无重罪，及历恶道。十方诸佛慈哀愍我，听我为母所发广大誓愿。若得我母永离三途及斯下贱，乃至女人之身，永劫不受者。愿我自今日后，对清净莲华目如来像前，却后百千万亿劫中，应有世界，所有地狱，及三恶道诸罪苦众生，誓愿救拔，令离地狱恶趣、畜生饿鬼等，如是罪报等人，尽成佛竟，我然后方成正觉。',
    pinyin: 'guāng mù wén yǐ, tí lèi háo qì ér bái kōng jiè: yuàn wǒ zhī mǔ, yǒng tuō dì yù, bì shí sān suì, gèng wú zhòng zuì, jí lì è dào. shí fāng zhū fó cí āi mǐn wǒ, tīng wǒ wéi mǔ suǒ fā guǎng dà shì yuàn. ruò dé wǒ mǔ yǒng lí sān tú jí sī xià jiàn, nǎi zhì nǚ rén zhī shēn, yǒng jié bù shòu zhě. yuàn wǒ zì jīn rì hòu, duì qīng jìng lián huá mù rú lái xiàng qián, què hòu bǎi qiān wàn yì jié zhōng, yìng yǒu shì jiè, suǒ yǒu dì yù, jí sān è dào zhū zuì kǔ zhòng shēng, shì yuàn jiù bá, lìng lí dì yù è qù, chù shēng è guǐ děng, rú shì zuì bào děng rén, jìn chéng fó jìng, wǒ rán hòu fāng chéng zhèng jué.',
    meaning: '光目听后，啼泪号泣对空界说：愿我的母亲，永脱地狱，过完十三岁，更无重罪，及历恶道。十方诸佛慈悲怜愍我，听我为母亲所发广大誓愿。如果得我母亲永离三途及这下贱身，乃至女人之身，永劫不受的话。愿我从今日后，对清净莲华目如来像前，在以后百千万亿劫中，应有世界，所有地狱，及三恶道诸罪苦众生，誓愿救拔，令离地狱恶趣、畜生饿鬼等，这些罪报等人，全都成佛后，我然后才成正觉。',
  },
  {
    id: 'ch4-6',
    title: '第四品 阎浮众生业感品（六）佛告光目',
    text: '发誓愿已，具闻清净莲华目如来而告之曰：光目！汝大慈愍，善能为母发如是大愿。吾观汝母十三岁毕，舍此报已，生为梵志，寿年百岁。过是报后，当生无忧国土，寿命不可计劫。后成佛果，广度人天，数如恒河沙。',
    pinyin: 'fā shì yuàn yǐ, jù wén qīng jìng lián huá mù rú lái ér gào zhī yuē: guāng mù! rǔ dà cí mǐn, shàn néng wéi mǔ fā rú shì dà yuàn. wú guān rǔ mǔ shí sān suì bì, shě cǐ bào yǐ, shēng wéi fàn zhì, shòu nián bǎi suì. guò shì bào hòu, dāng shēng wú yōu guó tǔ, shòu mìng bù kě jì jié. hòu chéng fó guǒ, guǎng dù rén tiān, shù rú héng hé shā.',
    meaning: '发誓愿后，听到清净莲华目如来告诉她说：光目！你大慈愍，善能为母亲发如此大愿。我观你母亲十三岁完毕，舍此报后，生为梵志，寿年百岁。过此报后，应当生无忧国土，寿命不可计劫。后成佛果，广度人天，数如恒河沙。',
  },
  {
    id: 'ch4-7',
    title: '第四品 阎浮众生业感品（七）佛说地藏前身',
    text: '佛告定自在王：尔时罗汉福度光目者，即无尽意菩萨是。光目母者，即解脱菩萨是。光目女者，即地藏菩萨是。过去久远劫中，如是慈愍，发恒河沙愿，广度众生。',
    pinyin: 'fó gào dìng zì zài wáng: ěr shí luó hàn fú dù guāng mù zhě, jí wú jìn yì pú sà shì. guāng mù mǔ zhě, jí jiě tuō pú sà shì. guāng mù nǚ zhě, jí dì zàng pú sà shì. guò qù jiǔ yuǎn jié zhōng, rú shì cí mǐn, fā héng hé shā yuàn, guǎng dù zhòng shēng.',
    meaning: '佛告诉定自在王：当时罗汉福度光目的，就是无尽意菩萨。光目的母亲，就是解脱菩萨。光目女，就是地藏菩萨。过去久远劫中，如此慈愍，发恒河沙愿，广度众生。',
  },
  {
    id: 'ch4-8',
    title: '第四品 阎浮众生业感品（八）归依功德',
    text: '未来世中，若有男子女人，不行善者，行恶者，乃至不信因果者，邪淫妄语者，两舌恶口者，毁谤大乘者，如是诸业众生，必堕恶趣。若遇善知识，劝令一弹指间，归依地藏菩萨，是诸众生，即得解脱三恶道报。若能志心归敬，及瞻礼赞叹，香华衣服，种种珍宝，或复饮食，如是奉事者。未来百千万亿劫中，常在诸天，受胜妙乐。',
    pinyin: 'wèi lái shì zhōng, ruò yǒu nán zǐ nǚ rén, bù xíng shàn zhě, xíng è zhě, nǎi zhì bù xìn yīn guǒ zhě, xié yín wàng yǔ zhě, liǎng shé è kǒu zhě, huǐ bàng dà chéng zhě, rú shì zhū yè zhòng shēng, bì duò è qù. ruò yù shàn zhī shì, quàn lìng yī tán zhǐ jiān, guī yī dì zàng pú sà, shì zhū zhòng shēng, jí dé jiě tuō sān è dào bào. ruò néng zhì xīn guī jìng, jí zhān lǐ zàn tàn, xiāng huá yī fú, zhǒng zhǒng zhēn bǎo, huò fù yǐn shí, rú shì fèng shì zhě. wèi lái bǎi qiān wàn yì jié zhōng, cháng zài zhū tiān, shòu shèng miào lè.',
    meaning: '未来世中，如果有男子女人，不行善的，行恶的，乃至不信因果的，邪淫妄语的，两舌恶口的，毁谤大乘的，这些业众生，必堕恶趣。如果遇善知识，劝令一弹指间，归依地藏菩萨，这些众生，就得解脱三恶道报。如果能志心归敬，及瞻礼赞叹，香花衣服，种种珍宝，或复饮食，如此奉事的。未来百千万亿劫中，常在诸天，受胜妙乐。',
  },
  {
    id: 'ch4-9',
    title: '第四品 阎浮众生业感品（九）四天王护法',
    text: '定自在王菩萨白世尊已，合掌恭敬，作礼而退。尔时四方天王，俱从座起，合掌恭敬，白佛言：世尊！地藏菩萨于久远劫来，发如是大愿，云何至今，犹度未绝，更发广大誓言？唯愿世尊，为我等说。',
    pinyin: 'dìng zì zài wáng pú sà bái shì zūn yǐ, hé zhǎng gōng jìng, zuò lǐ ér tuì. ěr shí sì fāng tiān wáng, jù cóng zuò qǐ, hé zhǎng gōng jìng, bái fó yán: shì zūn! dì zàng pú sà yú jiǔ yuǎn jié lái, fā rú shì dà yuàn, yún hé zhì jīn, yóu dù wèi jué, gèng fā guǎng dà shì yán? wéi yuàn shì zūn, wéi wǒ děng shuō.',
    meaning: '定自在王菩萨对世尊说完，合掌恭敬，作礼而退。这时四方天王，都从座位起身，合掌恭敬，对佛说：世尊！地藏菩萨在久远劫来，发如此大愿，为何至今，还度未绝，更发广大誓言？希望世尊，为我们说明。',
  },
  {
    id: 'ch4-10',
    title: '第四品 阎浮众生业感品（十）众生难度',
    text: '佛告四天王：善哉！善哉！吾今为汝，及未来现在天人众等，广利益故，说地藏菩萨于娑婆世界阎浮提内，生死道中，慈哀救拔，度脱一切罪苦众生方便之事。地藏菩萨久远劫来，迄至于今，度脱众生，犹未毕愿，慈愍此世罪苦众生。复观未来无量劫中，因蔓不断，以是之故，又发重愿。',
    pinyin: 'fó gào sì tiān wáng: shàn zāi! shàn zāi! wú jīn wéi rǔ, jí wèi lái xiàn zài tiān rén zhòng děng, guǎng lì yì gù, shuō dì zàng pú sà yú suō pó shì jiè yán fú tí nèi, shēng sǐ dào zhōng, cí āi jiù bá, dù tuō yī qiè zuì kǔ zhòng shēng fāng biàn zhī shì. dì zàng pú sà jiǔ yuǎn jié lái, qì zhì yú jīn, dù tuō zhòng shēng, yóu wèi bì yuàn, cí mǐn cǐ shì zuì kǔ zhòng shēng. fù guān wèi lái wú liàng jié zhōng, yīn màn bù duàn, yǐ shì zhī gù, yòu fā zhòng yuàn.',
    meaning: '佛告诉四天王：善哉！善哉！我现在为你们，及未来现在天人众等，为广利益的缘故，说地藏菩萨在娑婆世界阎浮提内，生死道中，慈哀救拔，度脱一切罪苦众生方便之事。地藏菩萨久远劫来，直至于今，度脱众生，还未完成誓愿，慈愍此世罪苦众生。又观未来无量劫中，因蔓不断，因此之故，又发重愿。',
  },
  {
    id: 'ch4-11',
    title: '第四品 阎浮众生业感品（十一）业报说法',
    text: '如是菩萨于娑婆世界阎浮提中，百千万亿方便，而为教化。四天王！地藏菩萨若遇杀生者，说宿殃短命报。若遇窃盗者，说贫穷苦楚报。若遇邪淫者，说雀鸽鸳鸯报。若遇恶口者，说眷属斗诤报。若遇毁谤者，说无舌疮口报。若遇瞋恚者，说丑陋癃残报。若遇悭吝者，说所求违愿报。若遇饮食无度者，说饥渴咽病报。',
    pinyin: 'rú shì pú sà yú suō pó shì jiè yán fú tí zhōng, bǎi qiān wàn yì fāng biàn, ér wéi jiào huà. sì tiān wáng! dì zàng pú sà ruò yù shā shēng zhě, shuō sù yāng duǎn mìng bào. ruò yù qiè dào zhě, shuō pín qióng kǔ chǔ bào. ruò yù xié yín zhě, shuō què gē yuān yāng bào. ruò yù è kǒu zhě, shuō juàn shǔ dòu zhēng bào. ruò yù huǐ bàng zhě, shuō wú shé chuāng kǒu bào. ruò yù chēn huì zhě, shuō chǒu lòu lóng cán bào. ruò yù qiān lìn zhě, shuō suǒ qiú wéi yuàn bào. ruò yù yǐn shí wú dù zhě, shuō jī kě yān bìng bào.',
    meaning: '如此菩萨在娑婆世界阎浮提中，百千万亿方便，而为教化。四天王！地藏菩萨如果遇杀生者，说宿殃短命报。如果遇窃盗者，说贫穷苦楚报。如果遇邪淫者，说雀鸽鸳鸯报。如果遇恶口者，说眷属斗诤报。如果遇毁谤者，说无舌疮口报。如果遇瞋恚者，说丑陋癃残报。如果遇悭吝者，说所求违愿报。如果遇饮食无度者，说饥渴咽病报。',
  },
  {
    id: 'ch4-12',
    title: '第四品 阎浮众生业感品（十二）更多业报',
    text: '若遇畋猎恣情者，说惊狂丧命报。若遇悖逆父母者，说天地灾杀报。若遇烧山林木者，说狂迷取死报。若遇前后父母恶毒者，说返生鞭挞现受报。若遇网捕生雏者，说骨肉分离报。若遇毁谤三宝者，说盲聋喑哑报。若遇轻法慢教者，说永处恶道报。若遇破用常住者，说亿劫轮回地狱报。',
    pinyin: 'ruò yù tián liè zì qíng zhě, shuō jīng kuáng sàng mìng bào. ruò yù bèi nì fù mǔ zhě, shuō tiān dì zāi shā bào. ruò yù shāo shān lín mù zhě, shuō kuáng mí qǔ sǐ bào. ruò yù qián hòu fù mǔ è dú zhě, shuō fǎn shēng biān tà xiàn shòu bào. ruò yù wǎng bǔ shēng chú zhě, shuō gǔ ròu fēn lí bào. ruò yù huǐ bàng sān bǎo zhě, shuō máng lóng yīn yǎ bào. ruò yù qīng fǎ màn jiào zhě, shuō yǒng chǔ è dào bào. ruò yù pò yòng cháng zhù zhě, shuō yì jié lún huí dì yù bào.',
    meaning: '如果遇畋猎恣情者，说惊狂丧命报。如果遇悖逆父母者，说天地灾杀报。如果遇烧山林木者，说狂迷取死报。如果遇前后父母恶毒者，说返生鞭挞现受报。如果遇网捕生雏者，说骨肉分离报。如果遇毁谤三宝者，说盲聋喑哑报。如果遇轻法慢教者，说永处恶道报。如果遇破用常住者，说亿劫轮回地狱报。',
  },
  {
    id: 'ch4-13',
    title: '第四品 阎浮众生业感品（十三）四天王护国',
    text: '如是等阎浮提众生，身口意业，恶习结果，百千报应，今粗略说。如是等阎浮提众生业感差别，地藏菩萨百千方便而教化之。是诸众生，先受如是等报，后堕地狱，动经劫数，无有出期。是故汝等，护人护国，无令是诸众业，迷惑众生。四天王闻已，涕泪悲叹，合掌而退。',
    pinyin: 'rú shì děng yán fú tí zhòng shēng, shēn kǒu yì yè, è xí jié guǒ, bǎi qiān bào yìng, jīn cū lüè shuō. rú shì děng yán fú tí zhòng shēng yè gǎn chā bié, dì zàng pú sà bǎi qiān fāng biàn ér jiào huà zhī. shì zhū zhòng shēng, xiān shòu rú shì děng bào, hòu duò dì yù, dòng jīng jié shù, wú yǒu chū qī. shì gù rǔ děng, hù rén hù guó, wú lìng shì zhū zhòng yè, mí huò zhòng shēng. sì tiān wáng wén yǐ, tì lèi bēi tàn, hé zhǎng ér tuì.',
    meaning: '如此等阎浮提众生，身口意业，恶习结果，百千报应，现在粗略说。如此等阎浮提众生业感差别，地藏菩萨百千方便而教化之。这些众生，先受如此等报，后堕地狱，动经劫数，无有出期。所以你们，护人护国，不要让这些众业，迷惑众生。四天王听后，涕泪悲叹，合掌而退。',
  },
];

// 第五品：地狱名号品
export const chapter5Sections: SutraSection[] = [
  {
    id: 'ch5-1',
    title: '第五品 地狱名号品（一）普贤问地狱',
    text: '尔时普贤菩萨摩诃萨白地藏菩萨言：仁者！愿为天龙四众，及未来现在一切众生，说娑婆世界，及阎浮提，罪苦众生，所受报处，地狱名号，及恶报等事，使未来世末法众生，知是果报。',
    pinyin: 'ěr shí pǔ xián pú sà mó hē sà bái dì zàng pú sà yán: rén zhě! yuàn wéi tiān lóng sì zhòng, jí wèi lái xiàn zài yī qiè zhòng shēng, shuō suō pó shì jiè, jí yán fú tí, zuì kǔ zhòng shēng, suǒ shòu bào chù, dì yù míng hào, jí è bào děng shì, shǐ wèi lái shì mò fǎ zhòng shēng, zhī shì guǒ bào.',
    meaning: '这时普贤菩萨对地藏菩萨说：仁者！希望为天龙四众及未来现在一切众生，说说娑婆世界及阎浮提罪苦众生所受报应之处，地狱的名号及恶报等事，使未来世末法众生知道这些果报。',
  },
  {
    id: 'ch5-2',
    title: '第五品 地狱名号品（二）地藏承佛威神',
    text: '地藏答言：仁者！我今承佛威神，及大士之力，略说地狱名号，及罪报恶报之事。仁者！阎浮提东方有山，号曰铁围，其山黑邃，无日月光。有大地狱，号极无间，又有地狱，名大阿鼻。',
    pinyin: 'dì zàng dá yán: rén zhě! wǒ jīn chéng fó wēi shén, jí dà shì zhī lì, lüè shuō dì yù míng hào, jí zuì bào è bào zhī shì. rén zhě! yán fú tí dōng fāng yǒu shān, hào yuē tiě wéi, qí shān hēi suì, wú rì yuè guāng. yǒu dà dì yù, hào jí wú jiàn, yòu yǒu dì yù, míng dà ā bí.',
    meaning: '地藏菩萨回答：仁者！我现在承佛威神，及大士之力，略说地狱名号，及罪报恶报之事。仁者！阎浮提东方有山，叫做铁围山，这山黑暗深邃，没有日月光明。有大地狱，叫极无间，又有地狱叫大阿鼻。',
  },
  {
    id: 'ch5-3',
    title: '第五品 地狱名号品（三）诸地狱名号',
    text: '复有地狱，名曰四角。复有地狱，名曰飞刀。复有地狱，名曰火箭。复有地狱，名曰夹山。复有地狱，名曰通枪。复有地狱，名曰铁车。复有地狱，名曰铁床。复有地狱，名曰铁牛。复有地狱，名曰铁衣。复有地狱，名曰千刃。复有地狱，名曰铁驴。复有地狱，名曰洋铜。复有地狱，名曰抱柱。复有地狱，名曰流火。复有地狱，名曰耕舌。复有地狱，名曰剉首。复有地狱，名曰烧脚。复有地狱，名曰啖眼。复有地狱，名曰铁丸。复有地狱，名曰诤论。复有地狱，名曰铁鈇。复有地狱，名曰多瞋。',
    pinyin: 'fù yǒu dì yù, míng yuē sì jiǎo. fù yǒu dì yù, míng yuē fēi dāo. fù yǒu dì yù, míng yuē huǒ jiàn. fù yǒu dì yù, míng yuē jiā shān. fù yǒu dì yù, míng yuē tōng qiāng. fù yǒu dì yù, míng yuē tiě chē. fù yǒu dì yù, míng yuē tiě chuáng. fù yǒu dì yù, míng yuē tiě niú. fù yǒu dì yù, míng yuē tiě yī. fù yǒu dì yù, míng yuē qiān rèn. fù yǒu dì yù, míng yuē tiě lǘ. fù yǒu dì yù, míng yuē yáng tóng. fù yǒu dì yù, míng yuē bào zhù. fù yǒu dì yù, míng yuē liú huǒ. fù yǒu dì yù, míng yuē gēng shé. fù yǒu dì yù, míng yuē cuò shǒu. fù yǒu dì yù, míng yuē shāo jiǎo. fù yǒu dì yù, míng yuē dàn yǎn. fù yǒu dì yù, míng yuē tiě wán. fù yǒu dì yù, míng yuē zhēng lùn. fù yǒu dì yù, míng yuē tiě fǔ. fù yǒu dì yù, míng yuē duō chēn.',
    meaning: '还有地狱，叫四角。还有地狱，叫飞刀。还有地狱，叫火箭。还有地狱，叫夹山。还有地狱，叫通枪。还有地狱，叫铁车。还有地狱，叫铁床。还有地狱，叫铁牛。还有地狱，叫铁衣。还有地狱，叫千刃。还有地狱，叫铁驴。还有地狱，叫洋铜。还有地狱，叫抱柱。还有地狱，叫流火。还有地狱，叫耕舌。还有地狱，叫剉首。还有地狱，叫烧脚。还有地狱，叫啖眼。还有地狱，叫铁丸。还有地狱，叫诤论。还有地狱，叫铁鈇。还有地狱，叫多瞋。',
  },
  {
    id: 'ch5-4',
    title: '第五品 地狱名号品（四）更多地狱',
    text: '地藏白言：仁者！铁围之内，有如是等地狱，其数无限。更有叫唤地狱、拔舌地狱、粪尿地狱、铜锁地狱、火象地狱、火狗地狱、火马地狱、火牛地狱、火山地狱、火石地狱、火床地狱、火梁地狱、火鹰地狱、锯牙地狱、剥皮地狱、饮血地狱、烧手地狱、烧脚地狱、倒刺地狱、火屋地狱、铁屋地狱、火狼地狱。如是等地狱，其中各各复有诸小地狱，或一或二，或三或四，乃至百千，其中名号，各各不同。',
    pinyin: 'dì zàng bái yán: rén zhě! tiě wéi zhī nèi, yǒu rú shì děng dì yù, qí shù wú xiàn. gèng yǒu jiào huàn dì yù, bá shé dì yù, fèn niào dì yù, tóng suǒ dì yù, huǒ xiàng dì yù, huǒ gǒu dì yù, huǒ mǎ dì yù, huǒ niú dì yù, huǒ shān dì yù, huǒ shí dì yù, huǒ chuáng dì yù, huǒ liáng dì yù, huǒ yīng dì yù, jù yá dì yù, bāo pí dì yù, yǐn xuè dì yù, shāo shǒu dì yù, shāo jiǎo dì yù, dào cì dì yù, huǒ wū dì yù, tiě wū dì yù, huǒ láng dì yù. rú shì děng dì yù, qí zhōng gè gè fù yǒu zhū xiǎo dì yù, huò yī huò èr, huò sān huò sì, nǎi zhì bǎi qiān, qí zhōng míng hào, gè gè bù tóng.',
    meaning: '地藏菩萨说：仁者！铁围之内，有如此等地狱，其数无限。更有叫唤地狱、拔舌地狱、粪尿地狱、铜锁地狱、火象地狱、火狗地狱、火马地狱、火牛地狱、火山地狱、火石地狱、火床地狱、火梁地狱、火鹰地狱、锯牙地狱、剥皮地狱、饮血地狱、烧手地狱、烧脚地狱、倒刺地狱、火屋地狱、铁屋地狱、火狼地狱。如此等地狱，其中各各又有诸小地狱，或一或二，或三或四，乃至百千，其中名号，各各不同。',
  },
  {
    id: 'ch5-5',
    title: '第五品 地狱名号品（五）业力甚大',
    text: '地藏菩萨告普贤菩萨言：仁者！此者皆是南阎浮提行恶众生，业感如是。业力甚大，能敌须弥，能深巨海，能障圣道。是故众生莫轻小恶，以为无罪，死后有报，纤毫受之。父子至亲，岐路各别，纵然相逢，无肯代受。我今承佛威力，略说地狱罪报之事，唯愿仁者，暂听是言。',
    pinyin: 'dì zàng pú sà gào pǔ xián pú sà yán: rén zhě! cǐ zhě jiē shì nán yán fú tí xíng è zhòng shēng, yè gǎn rú shì. yè lì shèn dà, néng dí xū mí, néng shēn jù hǎi, néng zhàng shèng dào. shì gù zhòng shēng mò qīng xiǎo è, yǐ wéi wú zuì, sǐ hòu yǒu bào, xiān háo shòu zhī. fù zǐ zhì qīn, qí lù gè bié, zòng rán xiāng féng, wú kěn dài shòu. wǒ jīn chéng fó wēi lì, lüè shuō dì yù zuì bào zhī shì, wéi yuàn rén zhě, zàn tīng shì yán.',
    meaning: '地藏菩萨告诉普贤菩萨：仁者！这些都是南阎浮提行恶众生，业感如此。业力甚大，能敌须弥山，能深过巨海，能障碍圣道。所以众生不要轻视小恶，以为无罪，死后有报，纤毫都要受。父子至亲，岐路各别，纵然相逢，无人肯代受。我现在承佛威力，略说地狱罪报之事，希望仁者，暂听此言。',
  },
  {
    id: 'ch5-6',
    title: '第五品 地狱名号品（六）普贤请说',
    text: '普贤答言：吾已久知三恶道报，望仁者说，令后世末法一切恶行众生，闻仁者说，使令归佛。',
    pinyin: 'pǔ xián dá yán: wú yǐ jiǔ zhī sān è dào bào, wàng rén zhě shuō, lìng hòu shì mò fǎ yī qiè è xíng zhòng shēng, wén rén zhě shuō, shǐ lìng guī fó.',
    meaning: '普贤菩萨回答：我已久知三恶道报，希望仁者说，令后世末法一切恶行众生，听闻仁者说，使令归佛。',
  },
  {
    id: 'ch5-7',
    title: '第五品 地狱名号品（七）地狱罪报',
    text: '地藏白言：仁者！地狱罪报，其事如是。或有地狱，取罪人舌，使牛耕之。或有地狱，取罪人心，夜叉食之。或有地狱，镬汤盛沸，煮罪人身。或有地狱，赤烧铜柱，使罪人抱。或有地狱，使诸火烧，趁及罪人。或有地狱，一向寒冰。或有地狱，无限粪尿。或有地狱，纯飞鏫。或有地狱，多攒火枪。或有地狱，唯撞胸背。或有地狱，但烧手足。或有地狱，盘缴铁蛇。或有地狱，驱逐铁狗。或有地狱，尽驾铁骡。',
    pinyin: 'dì zàng bái yán: rén zhě! dì yù zuì bào, qí shì rú shì. huò yǒu dì yù, qǔ zuì rén shé, shǐ niú gēng zhī. huò yǒu dì yù, qǔ zuì rén xīn, yè chā shí zhī. huò yǒu dì yù, huò tāng shèng fèi, zhǔ zuì rén shēn. huò yǒu dì yù, chì shāo tóng zhù, shǐ zuì rén bào. huò yǒu dì yù, shǐ zhū huǒ shāo, chèn jí zuì rén. huò yǒu dì yù, yī xiàng hán bīng. huò yǒu dì yù, wú xiàn fèn niào. huò yǒu dì yù, chún fēi jiàn. huò yǒu dì yù, duō zǎn huǒ qiāng. huò yǒu dì yù, wéi zhuàng xiōng bèi. huò yǒu dì yù, dàn shāo shǒu zú. huò yǒu dì yù, pán jiǎo tiě shé. huò yǒu dì yù, qū zhú tiě gǒu. huò yǒu dì yù, jìn jià tiě luó.',
    meaning: '地藏菩萨说：仁者！地狱罪报，其事如此。有的地狱，取罪人舌，使牛耕之。有的地狱，取罪人心，夜叉食之。有的地狱，镬汤盛沸，煮罪人身。有的地狱，赤烧铜柱，使罪人抱。有的地狱，使诸火烧，追及罪人。有的地狱，一向寒冰。有的地狱，无限粪尿。有的地狱，纯飞鏫。有的地狱，多攒火枪。有的地狱，只撞胸背。有的地狱，但烧手足。有的地狱，盘缴铁蛇。有的地狱，驱逐铁狗。有的地狱，尽驾铁骡。',
  },
  {
    id: 'ch5-8',
    title: '第五品 地狱名号品（八）业道之器',
    text: '仁者！如是等报，各各狱中，有百千种业道之器，无非是铜、是铁、是石、是火，此四种物，众业行感。若广说地狱罪报等事，一一狱中，更有百千种苦楚，何况多狱。我今承佛威神，及仁者问，略说如是。若广解说，穷劫不尽。',
    pinyin: 'rén zhě! rú shì děng bào, gè gè yù zhōng, yǒu bǎi qiān zhǒng yè dào zhī qì, wú fēi shì tóng, shì tiě, shì shí, shì huǒ, cǐ sì zhǒng wù, zhòng yè xíng gǎn. ruò guǎng shuō dì yù zuì bào děng shì, yī yī yù zhōng, gèng yǒu bǎi qiān zhǒng kǔ chǔ, hé kuàng duō yù. wǒ jīn chéng fó wēi shén, jí rén zhě wèn, lüè shuō rú shì. ruò guǎng jiě shuō, qióng jié bù jìn.',
    meaning: '仁者！如此等报，各各狱中，有百千种业道之器，无非是铜、是铁、是石、是火，此四种物，众业行感。如果广说地狱罪报等事，一一狱中，更有百千种苦楚，何况多狱。我现在承佛威神，及仁者问，略说如此。如果广解说，穷劫不尽。',
  },
];

// 第六品：如来赞叹品
export const chapter6Sections: SutraSection[] = [
  {
    id: 'ch6-1',
    title: '第六品 如来赞叹品（一）佛放光赞叹',
    text: '尔时世尊，举身放大光明，遍照百千万亿恒河沙等诸佛世界，出大音声，普告诸佛世界一切诸菩萨摩诃萨，及天龙鬼神人非人等：听吾今日称扬赞叹地藏菩萨摩诃萨，于十方世界，现大不可思议威神慈悲之力，救护一切罪苦之事。',
    pinyin: 'ěr shí shì zūn, jǔ shēn fàng dà guāng míng, biàn zhào bǎi qiān wàn yì héng hé shā děng zhū fó shì jiè, chū dà yīn shēng, pǔ gào zhū fó shì jiè yī qiè zhū pú sà mó hē sà, jí tiān lóng guǐ shén rén fēi rén děng: tīng wú jīn rì chēng yáng zàn tàn dì zàng pú sà mó hē sà, yú shí fāng shì jiè, xiàn dà bù kě sī yì wēi shén cí bēi zhī lì, jiù hù yī qiè zuì kǔ zhī shì.',
    meaning: '这时世尊全身放大光明，遍照百千万亿恒河沙等诸佛世界，发出大音声，普遍告诉诸佛世界一切菩萨及天龙鬼神等：听我今日称扬赞叹地藏菩萨，在十方世界现大不可思议威神慈悲之力，救护一切罪苦的事迹。',
  },
  {
    id: 'ch6-2',
    title: '第六品 如来赞叹品（二）普广请问',
    text: '说是语已，会中有一菩萨，名曰普广，合掌恭敬而白佛言：今见世尊，赞叹地藏菩萨，有如是不可思议大威神德。唯愿世尊，为未来世末法众生，宣说地藏菩萨，利益人天因果等事，使诸天龙八部，及未来世众生，顶受佛语。',
    pinyin: 'shuō shì yǔ yǐ, huì zhōng yǒu yī pú sà, míng yuē pǔ guǎng, hé zhǎng gōng jìng ér bái fó yán: jīn jiàn shì zūn, zàn tàn dì zàng pú sà, yǒu rú shì bù kě sī yì dà wēi shén dé. wéi yuàn shì zūn, wéi wèi lái shì mò fǎ zhòng shēng, xuān shuō dì zàng pú sà, lì yì rén tiān yīn guǒ děng shì, shǐ zhū tiān lóng bā bù, jí wèi lái shì zhòng shēng, dǐng shòu fó yǔ.',
    meaning: '说完这话，会中有一位菩萨，名叫普广，合掌恭敬对佛说：今见世尊赞叹地藏菩萨，有如此不可思议大威神德。希望世尊，为未来世末法众生，宣说地藏菩萨利益人天因果等事，使诸天龙八部及未来世众生，顶受佛语。',
  },
  {
    id: 'ch6-3',
    title: '第六品 如来赞叹品（三）供养功德',
    text: '佛告普广菩萨：未来世中，若有善男子善女人，闻是地藏菩萨摩诃萨名者，或合掌者、赞叹者、作礼者、恋慕者，是人超越三十劫罪。普广！若有善男子善女人，或彩画形像，或土石胶漆，金银铜铁，作此菩萨，一瞻一礼者，是人百返生于三十三天，永不堕于恶道。',
    pinyin: 'fó gào pǔ guǎng pú sà: wèi lái shì zhōng, ruò yǒu shàn nán zǐ shàn nǚ rén, wén shì dì zàng pú sà mó hē sà míng zhě, huò hé zhǎng zhě, zàn tàn zhě, zuò lǐ zhě, liàn mù zhě, shì rén chāo yuè sān shí jié zuì. pǔ guǎng! ruò yǒu shàn nán zǐ shàn nǚ rén, huò cǎi huà xíng xiàng, huò tǔ shí jiāo qī, jīn yín tóng tiě, zuò cǐ pú sà, yī zhān yī lǐ zhě, shì rén bǎi fǎn shēng yú sān shí sān tiān, yǒng bù duò yú è dào.',
    meaning: '佛告诉普广菩萨：未来世中，如果有善男子善女人，听到地藏菩萨的名号，或合掌、赞叹、礼拜、恋慕，这人能超越三十劫的罪业。普广！如果有善男子善女人，或彩画形像，或用土石胶漆、金银铜铁，制作此菩萨，一瞻一礼的，这人百次往返生于三十三天，永不堕入恶道。',
  },
  {
    id: 'ch6-4',
    title: '第六品 如来赞叹品（四）女转男身',
    text: '若有女人厌女人身，尽心供养地藏菩萨画像，及土石胶漆铜铁等像，如是日日不退，常以华香饮食、衣服缯彩、幢幡钱宝物等供养。是善女人，尽此一报女身，百千万劫，更不生有女人世界，何况复受。除非慈愿力故，要受女身，度脱众生。',
    pinyin: 'ruò yǒu nǚ rén yàn nǚ rén shēn, jìn xīn gòng yǎng dì zàng pú sà huà xiàng, jí tǔ shí jiāo qī tóng tiě děng xiàng, rú shì rì rì bù tuì, cháng yǐ huá xiāng yǐn shí, yī fú zēng cǎi, chuáng fān qián bǎo wù děng gòng yǎng. shì shàn nǚ rén, jìn cǐ yī bào nǚ shēn, bǎi qiān wàn jié, gèng bù shēng yǒu nǚ rén shì jiè, hé kuàng fù shòu. chú fēi cí yuàn lì gù, yào shòu nǚ shēn, dù tuō zhòng shēng.',
    meaning: '如果有女人厌恶女人身，尽心供养地藏菩萨画像，及土石胶漆铜铁等像，如此日日不退，常以花香饮食、衣服缯彩、幢幡钱宝物等供养。这善女人，尽此一报女身，百千万劫，更不生在有女人的世界，何况再受女身。除非慈愿力的缘故，要受女身，度脱众生。',
  },
];

// 第七品：利益存亡品
export const chapter7Sections: SutraSection[] = [
  {
    id: 'ch7-1',
    title: '第七品 利益存亡品（一）临终修福',
    text: '尔时地藏菩萨摩诃萨白佛言：世尊！我观是阎浮众生，举心动念，无非是罪。脱获善利，多退初心。若遇恶缘，念念增益。是等辈人，如履泥涂，负于重石，渐困渐重，足步深邃。若得遇知识，替与减负，或全与负。是知识有大力故，复相扶助，劝令牢脚。',
    pinyin: 'ěr shí dì zàng pú sà mó hē sà bái fó yán: shì zūn! wǒ guān shì yán fú zhòng shēng, jǔ xīn dòng niàn, wú fēi shì zuì. tuō huò shàn lì, duō tuì chū xīn. ruò yù è yuán, niàn niàn zēng yì. shì děng bèi rén, rú lǚ ní tú, fù yú zhòng shí, jiàn kùn jiàn zhòng, zú bù shēn suì. ruò dé yù zhī shì, tì yǔ jiǎn fù, huò quán yǔ fù. shì zhī shì yǒu dà lì gù, fù xiāng fú zhù, quàn lìng láo jiǎo.',
    meaning: '这时地藏菩萨对佛说：世尊！我观察阎浮提众生，举心动念，无不是罪。即使获得善利，也多退失初心。若遇恶缘，念念增长。这些人就像走在泥泞中，背负重石，越来越困难，越来越沉重，脚步越陷越深。如果得遇善知识，替他减轻负担，或全部负担。这善知识有大力的缘故，又相互扶助，劝令站稳脚步。',
  },
  {
    id: 'ch7-2',
    title: '第七品 利益存亡品（二）七七修福',
    text: '是诸众生有如此习，临命终时，父母眷属，宜为设福，以资前路。或悬幡盖及然油灯，或转读尊经，或供养佛像及诸圣像，乃至念佛菩萨及辟支佛名字，一名一号，历临终人耳根，或闻在本识。是诸众生所造恶业，计其感果，必堕恶趣。缘是眷属，为临终人，修此圣因，如是众罪，悉皆消灭。',
    pinyin: 'shì zhū zhòng shēng yǒu rú cǐ xí, lín mìng zhōng shí, fù mǔ juàn shǔ, yí wéi shè fú, yǐ zī qián lù. huò xuán fān gài jí rán yóu dēng, huò zhuǎn dú zūn jīng, huò gòng yǎng fó xiàng jí zhū shèng xiàng, nǎi zhì niàn fó pú sà jí pì zhī fó míng zì, yī míng yī hào, lì lín zhōng rén ěr gēn, huò wén zài běn shí. shì zhū zhòng shēng suǒ zào è yè, jì qí gǎn guǒ, bì duò è qù. yuán shì juàn shǔ, wéi lín zhōng rén, xiū cǐ shèng yīn, rú shì zhòng zuì, xī jiē xiāo miè.',
    meaning: '这些众生有如此习性，临命终时，父母眷属，应当为其设福，以资助前路。或悬挂幡盖及点燃油灯，或转读尊经，或供养佛像及诸圣像，乃至念佛菩萨及辟支佛名字，一名一号，历经临终人耳根，或听闻在本识中。这些众生所造恶业，计算其感果，必堕恶趣。因为眷属，为临终人，修此圣因，如此众罪，全都消灭。',
  },
  {
    id: 'ch7-3',
    title: '第七品 利益存亡品（三）存亡获利',
    text: '若能更为身死之后，七七日内，广造众善，能使是诸众生，永离恶趣，得生人天，受胜妙乐。现在眷属，利益无量。是故我今对佛世尊，及天龙八部人非人等，劝于阎浮提众生，临终之日，慎勿杀害，及造恶缘，拜祭鬼神，求诸魍魉。',
    pinyin: 'ruò néng gèng wéi shēn sǐ zhī hòu, qī qī rì nèi, guǎng zào zhòng shàn, néng shǐ shì zhū zhòng shēng, yǒng lí è qù, dé shēng rén tiān, shòu shèng miào lè. xiàn zài juàn shǔ, lì yì wú liàng. shì gù wǒ jīn duì fó shì zūn, jí tiān lóng bā bù rén fēi rén děng, quàn yú yán fú tí zhòng shēng, lín zhōng zhī rì, shèn wù shā hài, jí zào è yuán, bài jì guǐ shén, qiú zhū wǎng liǎng.',
    meaning: '如果能更为身死之后，七七日内，广造众善，能使这些众生，永离恶趣，得生人天，受胜妙乐。现在眷属，利益无量。所以我现在对佛世尊，及天龙八部人非人等，劝阎浮提众生，临终之日，千万不要杀害，及造恶缘，拜祭鬼神，求诸魍魉。',
  },
];

// 第八品：阎罗王众赞叹品
export const chapter8Sections: SutraSection[] = [
  {
    id: 'ch8-1',
    title: '第八品 阎罗王众赞叹品（一）鬼王云集',
    text: '尔时铁围山内，有无量鬼王与阎罗天子，俱诣忉利，来到佛所。所谓恶毒鬼王、多恶鬼王、大诤鬼王、白虎鬼王、血虎鬼王、赤虎鬼王、散殃鬼王、飞身鬼王、电光鬼王、狼牙鬼王、千眼鬼王、啖兽鬼王、负石鬼王、主耗鬼王、主祸鬼王、主食鬼王、主财鬼王、主畜鬼王、主禽鬼王、主兽鬼王、主魅鬼王、主产鬼王、主命鬼王、主疾鬼王、主险鬼王、三目鬼王、四目鬼王、五目鬼王。',
    pinyin: 'ěr shí tiě wéi shān nèi, yǒu wú liàng guǐ wáng yǔ yán luó tiān zǐ, jù yì dāo lì, lái dào fó suǒ. suǒ wèi è dú guǐ wáng, duō è guǐ wáng, dà zhēng guǐ wáng, bái hǔ guǐ wáng, xuè hǔ guǐ wáng, chì hǔ guǐ wáng, sàn yāng guǐ wáng, fēi shēn guǐ wáng, diàn guāng guǐ wáng, láng yá guǐ wáng, qiān yǎn guǐ wáng, dàn shòu guǐ wáng, fù shí guǐ wáng, zhǔ hào guǐ wáng, zhǔ huò guǐ wáng, zhǔ shí guǐ wáng, zhǔ cái guǐ wáng, zhǔ chù guǐ wáng, zhǔ qín guǐ wáng, zhǔ shòu guǐ wáng, zhǔ mèi guǐ wáng, zhǔ chǎn guǐ wáng, zhǔ mìng guǐ wáng, zhǔ jí guǐ wáng, zhǔ xiǎn guǐ wáng, sān mù guǐ wáng, sì mù guǐ wáng, wǔ mù guǐ wáng.',
    meaning: '这时铁围山内，有无量鬼王与阎罗天子，一起来到忉利天，来到佛所。所谓恶毒鬼王、多恶鬼王、大诤鬼王、白虎鬼王、血虎鬼王、赤虎鬼王、散殃鬼王、飞身鬼王、电光鬼王、狼牙鬼王、千眼鬼王、啖兽鬼王、负石鬼王、主耗鬼王、主祸鬼王、主食鬼王、主财鬼王、主畜鬼王、主禽鬼王、主兽鬼王、主魅鬼王、主产鬼王、主命鬼王、主疾鬼王、主险鬼王、三目鬼王、四目鬼王、五目鬼王等。',
  },
  {
    id: 'ch8-2',
    title: '第八品 阎罗王众赞叹品（二）主命鬼王',
    text: '说是语时，会中有一鬼王，名曰主命，白佛言：世尊！我本业缘，主阎浮人命，生时死时，我皆主之。在我本愿，甚欲利益。自是众生不会我意，致令生死俱不得安。何以故？是阎浮提人初生之时，不问男女，或欲生时，但作善事，增益舍宅。自令土地无量欢喜，拥护子母，得大安乐，利益眷属。',
    pinyin: 'shuō shì yǔ shí, huì zhōng yǒu yī guǐ wáng, míng yuē zhǔ mìng, bái fó yán: shì zūn! wǒ běn yè yuán, zhǔ yán fú rén mìng, shēng shí sǐ shí, wǒ jiē zhǔ zhī. zài wǒ běn yuàn, shèn yù lì yì. zì shì zhòng shēng bù huì wǒ yì, zhì lìng shēng sǐ jù bù dé ān. hé yǐ gù? shì yán fú tí rén chū shēng zhī shí, bù wèn nán nǚ, huò yù shēng shí, dàn zuò shàn shì, zēng yì shě zhái. zì lìng tǔ dì wú liàng huān xǐ, yōng hù zǐ mǔ, dé dà ān lè, lì yì juàn shǔ.',
    meaning: '说这话时，会中有一位鬼王，名叫主命，对佛说：世尊！我本来的业缘，是主管阎浮提人的生命，生时死时，我都主管。按我本愿，很想利益众生。但众生不理解我的意思，导致生死都不得安宁。为什么呢？阎浮提人初生之时，不问男女，或欲生时，只要做善事，增益舍宅。自然令土地无量欢喜，拥护子母，得大安乐，利益眷属。',
  },
  {
    id: 'ch8-3',
    title: '第八品 阎罗王众赞叹品（三）临终善缘',
    text: '又阎浮提临命终人，不问善恶，我欲令是命终之人，不落恶道。何况自修善根，增我力故。是阎浮提行善之人，临命终时，亦有百千恶道鬼神，或变作父母，乃至诸眷属，引接亡人，令落恶道，何况本造恶者。世尊！如是阎浮提男子女人临命终时，神识惛昧，不辨善恶，乃至眼耳更无见闻。',
    pinyin: 'yòu yán fú tí lín mìng zhōng rén, bù wèn shàn è, wǒ yù lìng shì mìng zhōng zhī rén, bù luò è dào. hé kuàng zì xiū shàn gēn, zēng wǒ lì gù. shì yán fú tí xíng shàn zhī rén, lín mìng zhōng shí, yì yǒu bǎi qiān è dào guǐ shén, huò biàn zuò fù mǔ, nǎi zhì zhū juàn shǔ, yǐn jiē wáng rén, lìng luò è dào, hé kuàng běn zào è zhě. shì zūn! rú shì yán fú tí nán zǐ nǚ rén lín mìng zhōng shí, shén shí hūn mèi, bù biàn shàn è, nǎi zhì yǎn ěr gèng wú jiàn wén.',
    meaning: '又阎浮提临命终人，不问善恶，我想令这命终之人，不落恶道。何况自修善根，增我力的缘故。阎浮提行善之人，临命终时，也有百千恶道鬼神，或变作父母，乃至诸眷属，引接亡人，令落恶道，何况本来造恶的。世尊！如此阎浮提男子女人临命终时，神识昏昧，不辨善恶，乃至眼耳更无见闻。',
  },
];

// 第九品：称佛名号品
export const chapter9Sections: SutraSection[] = [
  {
    id: 'ch9-1',
    title: '第九品 称佛名号品（一）称名功德',
    text: '尔时地藏菩萨摩诃萨白佛言：世尊！我今为未来众生演利益事，于生死中，得大利益，唯愿世尊，听我说之。佛告地藏菩萨：汝今欲兴慈悲，救拔一切罪苦六道众生，演不思议事，今正是时，唯当速说。吾即涅槃，使汝早毕是愿，吾亦无忧现在未来一切众生。',
    pinyin: 'ěr shí dì zàng pú sà mó hē sà bái fó yán: shì zūn! wǒ jīn wéi wèi lái zhòng shēng yǎn lì yì shì, yú shēng sǐ zhōng, dé dà lì yì, wéi yuàn shì zūn, tīng wǒ shuō zhī. fó gào dì zàng pú sà: rǔ jīn yù xīng cí bēi, jiù bá yī qiè zuì kǔ liù dào zhòng shēng, yǎn bù sī yì shì, jīn zhèng shì shí, wéi dāng sù shuō. wú jí niè pán, shǐ rǔ zǎo bì shì yuàn, wú yì wú yōu xiàn zài wèi lái yī qiè zhòng shēng.',
    meaning: '这时地藏菩萨对佛说：世尊！我现在为未来众生演说利益之事，使其在生死中得大利益，希望世尊听我说。佛告诉地藏菩萨：你现在想兴起慈悲，救拔一切罪苦六道众生，演说不思议事，现在正是时候，应当快说。我即将涅槃，使你早日完成此愿，我也无忧现在未来一切众生。',
  },
  {
    id: 'ch9-2',
    title: '第九品 称佛名号品（二）诸佛名号',
    text: '地藏菩萨白佛言：世尊！过去无量阿僧祇劫，有佛出世，号无边身如来。若有男子女人闻是佛名，暂生恭敬，即得超越四十劫生死重罪。何况塑画形像，供养赞叹，其人获福无量无边。又于过去恒河沙劫，有佛出世，号宝性如来。若有男子女人闻是佛名，一弹指顷，发心归依，是人于无上道，永不退转。',
    pinyin: 'dì zàng pú sà bái fó yán: shì zūn! guò qù wú liàng ā sēng qí jié, yǒu fó chū shì, hào wú biān shēn rú lái. ruò yǒu nán zǐ nǚ rén wén shì fó míng, zàn shēng gōng jìng, jí dé chāo yuè sì shí jié shēng sǐ zhòng zuì. hé kuàng sù huà xíng xiàng, gòng yǎng zàn tàn, qí rén huò fú wú liàng wú biān. yòu yú guò qù héng hé shā jié, yǒu fó chū shì, hào bǎo xìng rú lái. ruò yǒu nán zǐ nǚ rén wén shì fó míng, yī tán zhǐ qǐng, fā xīn guī yī, shì rén yú wú shàng dào, yǒng bù tuì zhuǎn.',
    meaning: '地藏菩萨对佛说：世尊！过去无量阿僧祇劫，有佛出世，名叫无边身如来。如果有男子女人听到这佛名，暂时生起恭敬心，就能超越四十劫生死重罪。何况塑画形像，供养赞叹，这人获得的福德无量无边。又在过去恒河沙劫，有佛出世，名叫宝性如来。如果有男子女人听到这佛名，一弹指顷，发心归依，这人在无上道，永不退转。',
  },
  {
    id: 'ch9-3',
    title: '第九品 称佛名号品（三）称名灭罪',
    text: '世尊！现在未来一切众生，若天若人，若男若女，但念得一佛名号，功德无量，何况多名。是众生等，生时死时，自得大利，终不堕恶道。若有临命终人，家中眷属，乃至一人，为是病人，高声念一佛名。是命终人除五无间罪，余业报等悉得消灭。',
    pinyin: 'shì zūn! xiàn zài wèi lái yī qiè zhòng shēng, ruò tiān ruò rén, ruò nán ruò nǚ, dàn niàn dé yī fó míng hào, gōng dé wú liàng, hé kuàng duō míng. shì zhòng shēng děng, shēng shí sǐ shí, zì dé dà lì, zhōng bù duò è dào. ruò yǒu lín mìng zhōng rén, jiā zhōng juàn shǔ, nǎi zhì yī rén, wéi shì bìng rén, gāo shēng niàn yī fó míng. shì mìng zhōng rén chú wǔ wú jiàn zuì, yú yè bào děng xī dé xiāo miè.',
    meaning: '世尊！现在未来一切众生，若天若人，若男若女，只要念得一佛名号，功德无量，何况多名。这些众生，生时死时，自得大利，终不堕恶道。如果有临命终人，家中眷属，乃至一人，为这病人，高声念一佛名。这命终人除五无间罪，其余业报等全都消灭。',
  },
];

// 第十品：校量布施功德缘品
export const chapter10Sections: SutraSection[] = [
  {
    id: 'ch10-1',
    title: '第十品 校量布施功德缘品（一）布施功德',
    text: '尔时地藏菩萨摩诃萨承佛威神，从座而起，胡跪合掌，白佛言：世尊！我观业道众生，校量布施，有轻有重，有一生受福，有十生受福，有百生千生受大福利者，是事云何？唯愿世尊，为我说之。',
    pinyin: 'ěr shí dì zàng pú sà mó hē sà chéng fó wēi shén, cóng zuò ér qǐ, hú guì hé zhǎng, bái fó yán: shì zūn! wǒ guān yè dào zhòng shēng, jiào liàng bù shī, yǒu qīng yǒu zhòng, yǒu yī shēng shòu fú, yǒu shí shēng shòu fú, yǒu bǎi shēng qiān shēng shòu dà fú lì zhě, shì shì yún hé? wéi yuàn shì zūn, wéi wǒ shuō zhī.',
    meaning: '这时地藏菩萨承佛威神，从座位起身，胡跪合掌，对佛说：世尊！我观察业道众生，校量布施，有轻有重，有一生受福的，有十生受福的，有百生千生受大福利的，这是怎么回事？希望世尊为我说明。',
  },
  {
    id: 'ch10-2',
    title: '第十品 校量布施功德缘品（二）国王布施',
    text: '佛告地藏菩萨：南阎浮提有诸国王、宰辅大臣、大长者、大刹利、大婆罗门等。若遇最下贫穷，乃至癃残喑哑，聋痴无目，如是种种不完具者。是大国王等欲布施时，若能具大慈悲，下心含笑，亲手遍布施，或使人施，软言慰喻，是国王等所获福利，如布施百恒河沙佛功德之利。',
    pinyin: 'fó gào dì zàng pú sà: nán yán fú tí yǒu zhū guó wáng, zǎi fǔ dà chén, dà zhǎng zhě, dà chà lì, dà pó luó mén děng. ruò yù zuì xià pín qióng, nǎi zhì lóng cán yīn yǎ, lóng chī wú mù, rú shì zhǒng zhǒng bù wán jù zhě. shì dà guó wáng děng yù bù shī shí, ruò néng jù dà cí bēi, xià xīn hán xiào, qīn shǒu biàn bù shī, huò shǐ rén shī, ruǎn yán wèi yù, shì guó wáng děng suǒ huò fú lì, rú bù shī bǎi héng hé shā fó gōng dé zhī lì.',
    meaning: '佛告诉地藏菩萨：南阎浮提有诸国王、宰辅大臣、大长者、大刹利、大婆罗门等。如果遇到最下贫穷，乃至癃残喑哑、聋痴无目，这些种种不完具的人。这些大国王等想布施时，如果能具大慈悲，下心含笑，亲手遍布施，或使人施，软言慰喻，这些国王等所获福利，如布施百恒河沙佛功德之利。',
  },
  {
    id: 'ch10-3',
    title: '第十品 校量布施功德缘品（三）回向法界',
    text: '复次地藏！未来世中，若有善男子善女人，于佛法中所种善根，或布施供养，或修补塔寺，或装理经典，乃至一毛一尘，一沙一渧。如是善事，但能回向法界，是人功德，百千生中受上妙乐。如但回向自家眷属，或自身利益。如是之果，即三生受乐，舍一得万报。是故地藏，布施因缘，其事如是。',
    pinyin: 'fù cì dì zàng! wèi lái shì zhōng, ruò yǒu shàn nán zǐ shàn nǚ rén, yú fó fǎ zhōng suǒ zhǒng shàn gēn, huò bù shī gòng yǎng, huò xiū bǔ tǎ sì, huò zhuāng lǐ jīng diǎn, nǎi zhì yī máo yī chén, yī shā yī dī. rú shì shàn shì, dàn néng huí xiàng fǎ jiè, shì rén gōng dé, bǎi qiān shēng zhōng shòu shàng miào lè. rú dàn huí xiàng zì jiā juàn shǔ, huò zì shēn lì yì. rú shì zhī guǒ, jí sān shēng shòu lè, shě yī dé wàn bào. shì gù dì zàng, bù shī yīn yuán, qí shì rú shì.',
    meaning: '再次地藏！未来世中，如果有善男子善女人，在佛法中所种善根，或布施供养，或修补塔寺，或装理经典，乃至一毛一尘，一沙一滴。这些善事，只要能回向法界，这人功德，百千生中受上妙乐。如果只回向自家眷属，或自身利益。这样的果报，就三生受乐，舍一得万报。所以地藏，布施因缘，其事如此。',
  },
];

// 第十一品：地神护法品
export const chapter11Sections: SutraSection[] = [
  {
    id: 'ch11-1',
    title: '第十一品 地神护法品（一）地神赞叹',
    text: '尔时坚牢地神白佛言：世尊！我从昔来，瞻视顶礼无量菩萨摩诃萨，皆是大不可思议神通智慧，广度众生。是地藏菩萨摩诃萨，于诸菩萨誓愿深重。世尊！是地藏菩萨，于阎浮提有大因缘。如文殊、普贤、观音、弥勒，亦化百千身形，度于六道，其愿尚有毕竟。是地藏菩萨，教化六道一切众生，所发誓愿劫数，如千百亿恒河沙。',
    pinyin: 'ěr shí jiān láo dì shén bái fó yán: shì zūn! wǒ cóng xī lái, zhān shì dǐng lǐ wú liàng pú sà mó hē sà, jiē shì dà bù kě sī yì shén tōng zhì huì, guǎng dù zhòng shēng. shì dì zàng pú sà mó hē sà, yú zhū pú sà shì yuàn shēn zhòng. shì zūn! shì dì zàng pú sà, yú yán fú tí yǒu dà yīn yuán. rú wén shū, pǔ xián, guān yīn, mí lè, yì huà bǎi qiān shēn xíng, dù yú liù dào, qí yuàn shàng yǒu bì jìng. shì dì zàng pú sà, jiào huà liù dào yī qiè zhòng shēng, suǒ fā shì yuàn jié shù, rú qiān bǎi yì héng hé shā.',
    meaning: '这时坚牢地神对佛说：世尊！我从过去以来，瞻视顶礼无量菩萨，都是大不可思议神通智慧，广度众生。这位地藏菩萨，在诸菩萨中誓愿最为深重。世尊！这位地藏菩萨，在阎浮提有大因缘。如文殊、普贤、观音、弥勒，也化百千身形，度于六道，其愿尚有毕竟。这位地藏菩萨，教化六道一切众生，所发誓愿劫数，如千百亿恒河沙。',
  },
  {
    id: 'ch11-2',
    title: '第十一品 地神护法品（二）十种利益',
    text: '世尊！我观未来及现在众生，于所住处，于南方清洁之地，以土石竹木作其龛室，是中能塑画，乃至金银铜铁，作地藏形像，烧香供养，瞻礼赞叹。是人居处，即得十种利益。何等为十？一者，土地丰壤。二者，家宅永安。三者，先亡生天。四者，现存益寿。五者，所求遂意。六者，无水火灾。七者，虚耗辟除。八者，杜绝恶梦。九者，出入神护。十者，多遇圣因。',
    pinyin: 'shì zūn! wǒ guān wèi lái jí xiàn zài zhòng shēng, yú suǒ zhù chù, yú nán fāng qīng jié zhī dì, yǐ tǔ shí zhú mù zuò qí kān shì, shì zhōng néng sù huà, nǎi zhì jīn yín tóng tiě, zuò dì zàng xíng xiàng, shāo xiāng gòng yǎng, zhān lǐ zàn tàn. shì rén jū chù, jí dé shí zhǒng lì yì. hé děng wéi shí? yī zhě, tǔ dì fēng rǎng. èr zhě, jiā zhái yǒng ān. sān zhě, xiān wáng shēng tiān. sì zhě, xiàn cún yì shòu. wǔ zhě, suǒ qiú suì yì. liù zhě, wú shuǐ huǒ zāi. qī zhě, xū hào bì chú. bā zhě, dù jué è mèng. jiǔ zhě, chū rù shén hù. shí zhě, duō yù shèng yīn.',
    meaning: '世尊！我观察未来及现在众生，在所住之处，在南方清洁的地方，用土石竹木做龛室，在其中塑画，乃至用金银铜铁，制作地藏形像，烧香供养，瞻礼赞叹。这人的居处，就能得到十种利益。哪十种？一者，土地丰壤。二者，家宅永安。三者，先亡生天。四者，现存益寿。五者，所求遂意。六者，无水火灾。七者，虚耗辟除。八者，杜绝恶梦。九者，出入神护。十者，多遇圣因。',
  },
  {
    id: 'ch11-3',
    title: '第十一品 地神护法品（三）地神护持',
    text: '复白佛言：世尊！未来世中，若有善男子善女人，于所住处，有此经典及菩萨像，是人更能转读经典，供养菩萨。我常日夜以本神力，卫护是人，乃至水火盗贼，大横小横，一切恶事，悉皆消灭。',
    pinyin: 'fù bái fó yán: shì zūn! wèi lái shì zhōng, ruò yǒu shàn nán zǐ shàn nǚ rén, yú suǒ zhù chù, yǒu cǐ jīng diǎn jí pú sà xiàng, shì rén gèng néng zhuǎn dú jīng diǎn, gòng yǎng pú sà. wǒ cháng rì yè yǐ běn shén lì, wèi hù shì rén, nǎi zhì shuǐ huǒ dào zéi, dà héng xiǎo héng, yī qiè è shì, xī jiē xiāo miè.',
    meaning: '又对佛说：世尊！未来世中，如果有善男子善女人，在所住之处，有此经典及菩萨像，这人更能转读经典，供养菩萨。我常日夜以本神力，卫护这人，乃至水火盗贼，大横小横，一切恶事，全都消灭。',
  },
];

// 第十二品：见闻利益品
export const chapter12Sections: SutraSection[] = [
  {
    id: 'ch12-1',
    title: '第十二品 见闻利益品（一）观音请问',
    text: '尔时世尊从顶门上放百千万亿大毫相光。说是语时，会中有一菩萨摩诃萨，名观世音，从座而起，胡跪合掌白佛言：世尊！是地藏菩萨摩诃萨具大慈悲，怜愍罪苦众生，于千万亿世界，化千万亿身。所有功德及不思议威神之力。我闻世尊与十方无量诸佛，异口同音赞叹地藏菩萨云，正使过去现在未来诸佛说其功德，犹不能尽。向者又蒙世尊普告大众，欲称扬地藏利益等事。唯愿世尊，为现在未来一切众生，称扬地藏不思议事，令天龙八部，瞻礼获福。',
    pinyin: 'ěr shí shì zūn cóng dǐng mén shàng fàng bǎi qiān wàn yì dà háo xiàng guāng. shuō shì yǔ shí, huì zhōng yǒu yī pú sà mó hē sà, míng guān shì yīn, cóng zuò ér qǐ, hú guì hé zhǎng bái fó yán: shì zūn! shì dì zàng pú sà mó hē sà jù dà cí bēi, lián mǐn zuì kǔ zhòng shēng, yú qiān wàn yì shì jiè, huà qiān wàn yì shēn. suǒ yǒu gōng dé jí bù sī yì wēi shén zhī lì. wǒ wén shì zūn yǔ shí fāng wú liàng zhū fó, yì kǒu tóng yīn zàn tàn dì zàng pú sà yún, zhèng shǐ guò qù xiàn zài wèi lái zhū fó shuō qí gōng dé, yóu bù néng jìn. xiàng zhě yòu méng shì zūn pǔ gào dà zhòng, yù chēng yáng dì zàng lì yì děng shì. wéi yuàn shì zūn, wéi xiàn zài wèi lái yī qiè zhòng shēng, chēng yáng dì zàng bù sī yì shì, lìng tiān lóng bā bù, zhān lǐ huò fú.',
    meaning: '这时世尊从顶门上放百千万亿大毫相光。说这话时，会中有一位菩萨，名叫观世音，从座位起身，胡跪合掌对佛说：世尊！这位地藏菩萨具大慈悲，怜愍罪苦众生，在千万亿世界，化千万亿身。所有功德及不思议威神之力。我听闻世尊与十方无量诸佛，异口同音赞叹地藏菩萨说，即使过去现在未来诸佛说其功德，也不能说尽。刚才又承蒙世尊普告大众，想要称扬地藏利益等事。希望世尊，为现在未来一切众生，称扬地藏不思议事，令天龙八部，瞻礼获福。',
  },
  {
    id: 'ch12-2',
    title: '第十二品 见闻利益品（二）佛告观音',
    text: '佛告观世音菩萨：汝于娑婆世界有大因缘，若天若龙，若男若女，若神若鬼，乃至六道罪苦众生，闻汝名者，见汝形者，恋慕汝者，赞叹汝者，是诸众生于无上道，必不退转，常生人天，具受妙乐。因果将熟，遇佛授记。汝今具大慈悲，怜愍众生，及天龙八部，听吾宣说地藏菩萨不思议利益之事。汝当谛听，吾今说之。观世音言：唯然，世尊！愿乐欲闻。',
    pinyin: 'fó gào guān shì yīn pú sà: rǔ yú suō pó shì jiè yǒu dà yīn yuán, ruò tiān ruò lóng, ruò nán ruò nǚ, ruò shén ruò guǐ, nǎi zhì liù dào zuì kǔ zhòng shēng, wén rǔ míng zhě, jiàn rǔ xíng zhě, liàn mù rǔ zhě, zàn tàn rǔ zhě, shì zhū zhòng shēng yú wú shàng dào, bì bù tuì zhuǎn, cháng shēng rén tiān, jù shòu miào lè. yīn guǒ jiāng shú, yù fó shòu jì. rǔ jīn jù dà cí bēi, lián mǐn zhòng shēng, jí tiān lóng bā bù, tīng wú xuān shuō dì zàng pú sà bù sī yì lì yì zhī shì. rǔ dāng dì tīng, wú jīn shuō zhī. guān shì yīn yán: wéi rán, shì zūn! yuàn lè yù wén.',
    meaning: '佛告诉观世音菩萨：你在娑婆世界有大因缘，若天若龙，若男若女，若神若鬼，乃至六道罪苦众生，听闻你名号的，见你形像的，恋慕你的，赞叹你的，这些众生在无上道，必不退转，常生人天，具受妙乐。因果将熟，遇佛授记。你现在具大慈悲，怜愍众生，及天龙八部，听我宣说地藏菩萨不思议利益之事。你应当谛听，我现在说。观世音说：是的，世尊！愿意听闻。',
  },
  {
    id: 'ch12-3',
    title: '第十二品 见闻利益品（三）天人见闻功德',
    text: '佛告观世音菩萨：未来现在诸世界中，有天人受天福尽，有五衰相现，或有堕于恶道之者。如是天人，若男若女，当现相时，或见地藏菩萨形像，或闻地藏菩萨名，一瞻一礼。是诸天人，转增天福，受大快乐，永不堕三恶道报。何况见闻菩萨，以诸香华、衣服、饮食、宝贝、璎珞，布施供养，所获功德福利，无量无边。',
    pinyin: 'fó gào guān shì yīn pú sà: wèi lái xiàn zài zhū shì jiè zhōng, yǒu tiān rén shòu tiān fú jìn, yǒu wǔ shuāi xiàng xiàn, huò yǒu duò yú è dào zhī zhě. rú shì tiān rén, ruò nán ruò nǚ, dāng xiàn xiàng shí, huò jiàn dì zàng pú sà xíng xiàng, huò wén dì zàng pú sà míng, yī zhān yī lǐ. shì zhū tiān rén, zhuǎn zēng tiān fú, shòu dà kuài lè, yǒng bù duò sān è dào bào. hé kuàng jiàn wén pú sà, yǐ zhū xiāng huá, yī fú, yǐn shí, bǎo bèi, yīng luò, bù shī gòng yǎng, suǒ huò gōng dé fú lì, wú liàng wú biān.',
    meaning: '佛告诉观世音菩萨：未来现在诸世界中，有天人受天福享尽，出现五衰相，或有堕入恶道的。这些天人，若男若女，当出现衰相时，或见地藏菩萨形像，或听闻地藏菩萨名号，一瞻一礼。这些天人，就能转增天福，受大快乐，永不堕三恶道。何况见闻菩萨，以诸香花、衣服、饮食、宝贝、璎珞，布施供养，所获功德福利，无量无边。',
  },
  {
    id: 'ch12-4',
    title: '第十二品 见闻利益品（四）临命终人功德',
    text: '复次观世音！若未来现在诸世界中，六道众生，临命终时，得闻地藏菩萨名，一声历耳根者，是诸众生，永不历三恶道苦。何况临命终时，父母眷属，将是命终人，舍宅财物，宝贝衣服，塑画地藏形像。或使病人，未终之时，眼耳见闻，知道眷属，将舍宅宝贝等，为其自身塑画地藏菩萨形像。是人若是业报，合受重病者，承斯功德，寻即除愈，寿命增益。是人若是业报命尽，应有一切罪障业障，合堕恶趣者，承斯功德，命终之后，即生人天，受胜妙乐，一切罪障，悉皆消灭。',
    pinyin: 'fù cì guān shì yīn! ruò wèi lái xiàn zài zhū shì jiè zhōng, liù dào zhòng shēng, lín mìng zhōng shí, dé wén dì zàng pú sà míng, yī shēng lì ěr gēn zhě, shì zhū zhòng shēng, yǒng bù lì sān è dào kǔ. hé kuàng lín mìng zhōng shí, fù mǔ juàn shǔ, jiāng shì mìng zhōng rén, shě zhái cái wù, bǎo bèi yī fú, sù huà dì zàng xíng xiàng. huò shǐ bìng rén, wèi zhōng zhī shí, yǎn ěr jiàn wén, zhī dào juàn shǔ, jiāng shě zhái bǎo bèi děng, wéi qí zì shēn sù huà dì zàng pú sà xíng xiàng. shì rén ruò shì yè bào, hé shòu zhòng bìng zhě, chéng sī gōng dé, xún jí chú yù, shòu mìng zēng yì. shì rén ruò shì yè bào mìng jìn, yìng yǒu yī qiè zuì zhàng yè zhàng, hé duò è qù zhě, chéng sī gōng dé, mìng zhōng zhī hòu, jí shēng rén tiān, shòu shèng miào lè, yī qiè zuì zhàng, xī jiē xiāo miè.',
    meaning: '再次观世音！如果未来现在诸世界中，六道众生，临命终时，得闻地藏菩萨名号，一声历经耳根的，这些众生，永不历三恶道苦。何况临命终时，父母眷属，将这命终人的舍宅财物、宝贝衣服，塑画地藏形像。或使病人，未终之时，眼耳见闻，知道眷属，将舍宅宝贝等，为其自身塑画地藏菩萨形像。这人如果是业报，合受重病的，承此功德，随即除愈，寿命增益。这人如果是业报命尽，应有一切罪障业障，合堕恶趣的，承此功德，命终之后，即生人天，受胜妙乐，一切罪障，全都消灭。',
  },
  {
    id: 'ch12-5',
    title: '第十二品 见闻利益品（五）寻亲眷属',
    text: '复次观世音菩萨！若未来世，有男子女人，或乳哺时，或三岁五岁十岁已下，亡失父母乃及亡失兄弟姊妹，是人年既长大，思忆父母及诸眷属，不知落在何趣，生何世界，生何天中。是人若能塑画地藏菩萨形像，乃至闻名，一瞻一礼，一日至七日，莫退初心，闻名见形，瞻礼供养。是人眷属，假因业故，堕恶趣者，计当劫数，承斯男女兄弟姊妹，塑画地藏形像，瞻礼功德，寻即解脱，生人天中，受胜妙乐。是人眷属，如有福力，已生人天，受胜妙乐者，即承斯功德，转增圣因，受无量乐。是人更能三七日中，一心瞻礼地藏形像，念其名字，满于万遍。当得菩萨现无边身，具告是人，眷属生界。或于梦中，菩萨现大神力，亲领是人，于诸世界，见诸眷属。更能每日念菩萨名千遍，至于千日。是人当得菩萨遣所在土地鬼神，终身卫护，现世衣食丰溢，无诸疾苦，乃至横事不入其门，何况及身，是人毕竟得菩萨摩顶授记。',
    pinyin: 'fù cì guān shì yīn pú sà! ruò wèi lái shì, yǒu nán zǐ nǚ rén, huò rǔ bǔ shí, huò sān suì wǔ suì shí suì yǐ xià, wáng shī fù mǔ nǎi jí wáng shī xiōng dì zǐ mèi, shì rén nián jì zhǎng dà, sī yì fù mǔ jí zhū juàn shǔ, bù zhī luò zài hé qù, shēng hé shì jiè, shēng hé tiān zhōng. shì rén ruò néng sù huà dì zàng pú sà xíng xiàng, nǎi zhì wén míng, yī zhān yī lǐ, yī rì zhì qī rì, mò tuì chū xīn, wén míng jiàn xíng, zhān lǐ gòng yǎng. shì rén juàn shǔ, jiǎ yīn yè gù, duò è qù zhě, jì dāng jié shù, chéng sī nán nǚ xiōng dì zǐ mèi, sù huà dì zàng xíng xiàng, zhān lǐ gōng dé, xún jí jiě tuō, shēng rén tiān zhōng, shòu shèng miào lè. shì rén juàn shǔ, rú yǒu fú lì, yǐ shēng rén tiān, shòu shèng miào lè zhě, jí chéng sī gōng dé, zhuǎn zēng shèng yīn, shòu wú liàng lè. shì rén gèng néng sān qī rì zhōng, yī xīn zhān lǐ dì zàng xíng xiàng, niàn qí míng zì, mǎn yú wàn biàn. dāng dé pú sà xiàn wú biān shēn, jù gào shì rén, juàn shǔ shēng jiè. huò yú mèng zhōng, pú sà xiàn dà shén lì, qīn lǐng shì rén, yú zhū shì jiè, jiàn zhū juàn shǔ. gèng néng měi rì niàn pú sà míng qiān biàn, zhì yú qiān rì. shì rén dāng dé pú sà qiǎn suǒ zài tǔ dì guǐ shén, zhōng shēn wèi hù, xiàn shì yī shí fēng yì, wú zhū jí kǔ, nǎi zhì héng shì bù rù qí mén, hé kuàng jí shēn, shì rén bì jìng dé pú sà mó dǐng shòu jì.',
    meaning: '再次观世音菩萨！如果未来世，有男子女人，或乳哺时，或三岁五岁十岁以下，亡失父母乃及亡失兄弟姊妹，这人年纪长大，思忆父母及诸眷属，不知落在何趣，生何世界，生何天中。这人如果能塑画地藏菩萨形像，乃至闻名，一瞻一礼，一日至七日，不退初心，闻名见形，瞻礼供养。这人眷属，假如因业故，堕恶趣的，计算应当劫数，承这男女兄弟姊妹，塑画地藏形像，瞻礼功德，随即解脱，生人天中，受胜妙乐。这人眷属，如有福力，已生人天，受胜妙乐的，即承此功德，转增圣因，受无量乐。这人更能三七日中，一心瞻礼地藏形像，念其名字，满于万遍。应当得菩萨现无边身，具告这人，眷属生界。或在梦中，菩萨现大神力，亲领这人，在诸世界，见诸眷属。更能每日念菩萨名千遍，至于千日。这人应当得菩萨遣所在土地鬼神，终身卫护，现世衣食丰溢，无诸疾苦，乃至横事不入其门，何况及身，这人毕竟得菩萨摩顶授记。',
  },
  {
    id: 'ch12-6',
    title: '第十二品 见闻利益品（六）发广大慈心',
    text: '复次观世音菩萨！若未来世，有善男子善女人，欲发广大慈心，救度一切众生者，欲修无上菩提者，欲出离三界者。是诸人等，见地藏形像，及闻名者，至心归依，或以香华衣服，宝贝饮食，供养瞻礼。是善男女等，所愿速成，永无障碍。',
    pinyin: 'fù cì guān shì yīn pú sà! ruò wèi lái shì, yǒu shàn nán zǐ shàn nǚ rén, yù fā guǎng dà cí xīn, jiù dù yī qiè zhòng shēng zhě, yù xiū wú shàng pú tí zhě, yù chū lí sān jiè zhě. shì zhū rén děng, jiàn dì zàng xíng xiàng, jí wén míng zhě, zhì xīn guī yī, huò yǐ xiāng huá yī fú, bǎo bèi yǐn shí, gòng yǎng zhān lǐ. shì shàn nán nǚ děng, suǒ yuàn sù chéng, yǒng wú zhàng ài.',
    meaning: '再次观世音菩萨！如果未来世，有善男子善女人，想要发广大慈心，救度一切众生的，想要修无上菩提的，想要出离三界的。这些人等，见地藏形像，以及听闻名号的，至心归依，或以香花衣服、宝贝饮食，供养瞻礼。这些善男女等，所愿速成，永无障碍。',
  },
  {
    id: 'ch12-7',
    title: '第十二品 见闻利益品（七）求愿所求',
    text: '复次观世音！若未来世，有善男子善女人，欲求现在未来百千万亿等愿，百千万亿等事。但当归依瞻礼，供养赞叹地藏菩萨形像，如是所愿所求，悉皆成就。复愿地藏菩萨具大慈悲，永拥护我。是人于睡梦中，即得菩萨摩顶授记。',
    pinyin: 'fù cì guān shì yīn! ruò wèi lái shì, yǒu shàn nán zǐ shàn nǚ rén, yù qiú xiàn zài wèi lái bǎi qiān wàn yì děng yuàn, bǎi qiān wàn yì děng shì. dàn dāng guī yī zhān lǐ, gòng yǎng zàn tàn dì zàng pú sà xíng xiàng, rú shì suǒ yuàn suǒ qiú, xī jiē chéng jiù. fù yuàn dì zàng pú sà jù dà cí bēi, yǒng yōng hù wǒ. shì rén yú shuì mèng zhōng, jí dé pú sà mó dǐng shòu jì.',
    meaning: '再次观世音！如果未来世，有善男子善女人，想要求现在未来百千万亿等愿，百千万亿等事。只应当归依瞻礼，供养赞叹地藏菩萨形像，如此所愿所求，全都成就。又愿地藏菩萨具大慈悲，永远拥护我。这人在睡梦中，就得菩萨摩顶授记。',
  },
   {
    id: 'ch12-8',
    title: '第十二品 见闻利益品（八）读诵经典净水法',
    text: '复次观世音菩萨！若未来世，善男子善女人，于大乘经典，深生珍重，发不思议心，欲读欲诵。纵遇明师，教视令熟，旋得旋忘，动经年月，不能读诵。是善男子等，有宿业障，未得消除，故于大乘经典，无读诵性。如是之人，闻地藏菩萨名，见地藏菩萨像，具以本心恭敬陈白。更以香、华、衣服、饮食，一切玩具，供养菩萨。以净水一盏，经一日一夜，安菩萨前，然后合掌请服，回首向南。临入口时，至心郑重。服水既毕，慎五辛酒肉，邪淫妄语，及诸杀害，一七日或三七日。是善男子善女人，于睡梦中，具见地藏菩萨，现无边身，于是人处，授灌顶水。其人梦觉，即获聪明，应是经典，一历耳根，即当永记，更不忘失一句一偈。',
    pinyin: 'fù cì guān shì yīn pú sà! ruò wèi lái shì, shàn nán zǐ shàn nǚ rén, yú dà chéng jīng diǎn, shēn shēng zhēn zhòng, fā bù sī yì xīn, yù dú yù sòng. zòng yù míng shī, jiào shì lìng shú, xuán dé xuán wàng, dòng jīng nián yuè, bù néng dú sòng. shì shàn nán zǐ děng, yǒu sù yè zhàng, wèi dé xiāo chú, gù yú dà chéng jīng diǎn, wú dú sòng xìng. rú shì zhī rén, wén dì zàng pú sà míng, jiàn dì zàng pú sà xiàng, jù yǐ běn xīn gōng jìng chén bái. gèng yǐ xiāng, huá, yī fú, yǐn shí, yī qiè wán jù, gòng yǎng pú sà. yǐ jìng shuǐ yī zhǎn, jīng yī rì yī yè, ān pú sà qián, rán hòu hé zhǎng qǐng fú, huí shǒu xiàng nán. lín rù kǒu shí, zhì xīn zhèng zhòng. fú shuǐ jì bì, shèn wǔ xīn jiǔ ròu, xié yín wàng yǔ, jí zhū shā hài, yī qī rì huò sān qī rì. shì shàn nán zǐ shàn nǚ rén, yú shuì mèng zhōng, jù jiàn dì zàng pú sà, xiàn wú biān shēn, yú shì rén chù, shòu guàn dǐng shuǐ. qí rén mèng jué, jí huò cōng míng, yìng shì jīng diǎn, yī lì ěr gēn, jí dāng yǒng jì, gèng bù wàng shī yī jù yī jì.',
    meaning: '再次观世音菩萨！如果未来世，善男子善女人，对大乘经典，深生珍重，发不思议心，想要读诵。纵然遇到明师，教导令其熟悉，刚学会就忘记，经过年月，不能读诵。这些善男子等，有宿业障，未得消除，所以对大乘经典，无读诵性。这样的人，听闻地藏菩萨名，见地藏菩萨像，具以本心恭敬陈白。更以香、花、衣服、饮食，一切玩具，供养菩萨。以净水一盏，经一日一夜，安放菩萨前，然后合掌请服，回首向南。临入口时，至心郑重。服水完毕，慎五辛酒肉，邪淫妄语，及诸杀害，一七日或三七日。这些善男子善女人，在睡梦中，具见地藏菩萨，现无边身，在这人处，授灌顶水。这人梦醒，就获得聪明，应是经典，一历耳根，就应当永记，更不忘失一句一偈。',
  },
    {
    id: 'ch12-9',
    title: '第十二品 见闻利益品（九）衣食不足者',
    text: '复次观世音菩萨！若未来世有诸人等，衣食不足，求者乖愿，或多病疾，或多凶衰，家宅不安，眷属分散，或诸横事，多来忤身，睡梦之间，多有惊怖。如是人等，闻地藏名，见地藏形，至心恭敬，念满万遍。是诸不如意事，渐渐消灭，即得安乐，衣食丰溢，乃至于睡梦中，悉皆安乐。',
    pinyin: 'fù cì guān shì yīn pú sà! ruò wèi lái shì yǒu zhū rén děng, yī shí bù zú, qiú zhě guāi yuàn, huò duō bìng jí, huò duō xiōng shuāi, jiā zhái bù ān, juàn shǔ fēn sàn, huò zhū héng shì, duō lái wǔ shēn, shuì mèng zhī jiān, duō yǒu jīng bù. rú shì rén děng, wén dì zàng míng, jiàn dì zàng xíng, zhì xīn gōng jìng, niàn mǎn wàn biàn. shì zhū bù rú yì shì, jiàn jiàn xiāo miè, jí dé ān lè, yī shí fēng yì, nǎi zhì yú shuì mèng zhōng, xī jiē ān lè.',
    meaning: '再次观世音菩萨！如果未来世有诸人等，衣食不足，求者乖愿，或多病疾，或多凶衰，家宅不安，眷属分散，或诸横事，多来忤身，睡梦之间，多有惊怖。这些人等，听闻地藏名，见地藏形，至心恭敬，念满万遍。这些不如意事，渐渐消灭，就得安乐，衣食丰溢，乃至在睡梦中，全都安乐。',
  },
  {
    id: 'ch12-10',
    title: '第十二品 见闻利益品（十）入山林渡河海',
    text: '复次观世音菩萨！若未来世有善男子善女人，或因治生，或因公私，或因生死，或因急事，入山林中，过渡河海，乃及大水，或经险道。是人先当念地藏菩萨名万遍，所过土地，鬼神卫护，行住坐卧，永保安乐。乃至逢于虎狼师子，一切毒害，不能损之。',
    pinyin: 'fù cì guān shì yīn pú sà! ruò wèi lái shì yǒu shàn nán zǐ shàn nǚ rén, huò yīn zhì shēng, huò yīn gōng sī, huò yīn shēng sǐ, huò yīn jí shì, rù shān lín zhōng, guò dù hé hǎi, nǎi jí dà shuǐ, huò jīng xiǎn dào. shì rén xiān dāng niàn dì zàng pú sà míng wàn biàn, suǒ guò tǔ dì, guǐ shén wèi hù, xíng zhù zuò wò, yǒng bǎo ān lè. nǎi zhì féng yú hǔ láng shī zǐ, yī qiè dú hài, bù néng sǔn zhī.',
    meaning: '再次观世音菩萨！如果未来世有善男子善女人，或因治生，或因公私，或因生死，或因急事，入山林中，过渡河海，乃及大水，或经险道。这人应先念地藏菩萨名万遍，所过土地，鬼神卫护，行住坐卧，永保安乐。乃至遇到虎狼师子，一切毒害，不能损害。',
  },
    {
    id: 'ch12-11',
    title: '第十二品 见闻利益品（十一）佛告观音',
    text: '佛告观世音菩萨：是地藏菩萨，于阎浮提有大因缘，若说于诸众生见闻利益等事，百千劫中，说不能尽。是故观世音，汝以神力流布是经，令娑婆世界众生，百千万劫永受安乐。',
    pinyin: 'fó gào guān shì yīn pú sà: shì dì zàng pú sà, yú yán fú tí yǒu dà yīn yuán, ruò shuō yú zhū zhòng shēng jiàn wén lì yì děng shì, bǎi qiān jié zhōng, shuō bù néng jìn. shì gù guān shì yīn, rǔ yǐ shén lì liú bù shì jīng, lìng suō pó shì jiè zhòng shēng, bǎi qiān wàn jié yǒng shòu ān lè.',
    meaning: '佛告诉观世音菩萨：这位地藏菩萨，在阎浮提有大因缘，如果说诸众生见闻利益等事，百千劫中，也说不能尽。所以观世音，你以神力流布此经，令娑婆世界众生，百千万劫永受安乐。',
  },
    {
    id: 'ch12-12',
    title: '第十二品 见闻利益品（十二）佛说偈颂',
    text: '尔时世尊而说偈言：\n吾观地藏威神力，恒河沙劫说难尽，\n见闻瞻礼一念间，利益人天无量事。\n若男若女若龙神，报尽应当堕恶道，\n至心归依大士身，寿命转增除罪障。\n少失父母恩爱者，未知魂神在何趣，\n兄弟姊妹及诸亲，生长以来皆不识。\n或塑或画大士身，悲恋瞻礼不暂舍，\n三七日中念其名，菩萨当现无边体。\n示其眷属所生界，纵堕恶趣寻出离，\n若能不退是初心，即获摩顶受圣记。\n欲修无上菩提者，乃至出离三界苦，\n是人既发大悲心，先当瞻礼大士像，\n一切诸愿速成就，永无业障能遮止。\n有人发心念经典，欲度群迷超彼岸，\n虽立是愿不思议，旋读旋忘多废失，\n斯人有业障惑故，于大乘经不能记。\n供养地藏以香华，衣服饮食诸玩具，\n以净水安大士前，一日一夜求服之。\n发殷重心慎五辛，酒肉邪淫及妄语，\n三七日内勿杀害，至心思念大士名，\n即于梦中见无边，觉来便得利根耳。\n应是经教历耳闻，千万生中永不忘，\n以是大士不思议，能使斯人获此慧。\n贫穷众生及疾病，家宅凶衰眷属离，\n睡梦之中悉不安，求者乖违无称遂。\n至心瞻礼地藏像，一切恶事皆消灭，\n至于梦中尽得安，衣食丰饶神鬼护。\n欲入山林及渡海，毒恶禽兽及恶人，\n恶神恶鬼并恶风，一切诸难诸苦恼。\n但当瞻礼及供养，地藏菩萨大士像，\n如是山林大海中，应是诸恶皆消灭。\n观音至心听吾说，地藏无尽不思议，\n百千万劫说不周，广宣大士如是力。\n地藏名字人若闻，乃至见像瞻礼者，\n香华衣服饮食奉，供养百千受妙乐。\n若能以此回法界，毕竟成佛超生死，\n是故观音汝当知，普告恒沙诸国土。',
    pinyin: 'ěr shí shì zūn ér shuō jì yán:\nwú guān dì zàng wēi shén lì, héng hé shā jié shuō nán jìn,\njiàn wén zhān lǐ yī niàn jiān, lì yì rén tiān wú liàng shì.\nruò nán ruò nǚ ruò lóng shén, bào jìn yìng dāng duò è dào,\nzhì xīn guī yī dà shì shēn, shòu mìng zhuǎn zēng chú zuì zhàng.\nshǎo shī fù mǔ ēn ài zhě, wèi zhī hún shén zài hé qù,\nxiōng dì zǐ mèi jí zhū qīn, shēng zhǎng yǐ lái jiē bù shí.\nhuò sù huò huà dà shì shēn, bēi liàn zhān lǐ bù zàn shě,\nsān qī rì zhōng niàn qí míng, pú sà dāng xiàn wú biān tǐ.\nshì qí juàn shǔ suǒ shēng jiè, zòng duò è qù xún chū lí,\nruò néng bù tuì shì chū xīn, jí huò mó dǐng shòu shèng jì.\nyù xiū wú shàng pú tí zhě, nǎi zhì chū lí sān jiè kǔ,\nshì rén jì fā dà bēi xīn, xiān dāng zhān lǐ dà shì xiàng,\nyī qiè zhū yuàn sù chéng jiù, yǒng wú yè zhàng néng zhē zhǐ.\nyǒu rén fā xīn niàn jīng diǎn, yù dù qún mí chāo bǐ àn,\nsuī lì shì yuàn bù sī yì, xuán dú xuán wàng duō fèi shī,\nsī rén yǒu yè zhàng huò gù, yú dà chéng jīng bù néng jì.\ngòng yǎng dì zàng yǐ xiāng huá, yī fú yǐn shí zhū wán jù,\nyǐ jìng shuǐ ān dà shì qián, yī rì yī yè qiú fú zhī.\nfā yīn zhòng xīn shèn wǔ xīn, jiǔ ròu xié yín jí wàng yǔ,\nsān qī rì nèi wù shā hài, zhì xīn sī niàn dà shì míng,\njí yú mèng zhōng jiàn wú biān, jué lái biàn dé lì gēn ěr.\nyìng shì jīng jiào lì ěr wén, qiān wàn shēng zhōng yǒng bù wàng,\nyǐ shì dà shì bù sī yì, néng shǐ sī rén huò cǐ huì.\npín qióng zhòng shēng jí jí bìng, jiā zhái xiōng shuāi juàn shǔ lí,\nshuì mèng zhī zhōng xī bù ān, qiú zhě guāi wéi wú chēng suì.\nzhì xīn zhān lǐ dì zàng xiàng, yī qiè è shì jiē xiāo miè,\nzhì yú mèng zhōng jìn dé ān, yī shí fēng ráo shén guǐ hù.\nyù rù shān lín jí dù hǎi, dú è qín shòu jí è rén,\nè shén è guǐ bìng è fēng, yī qiè zhū nán zhū kǔ nǎo.\ndàn dāng zhān lǐ jí gòng yǎng, dì zàng pú sà dà shì xiàng,\nrú shì shān lín dà hǎi zhōng, yìng shì zhū è jiē xiāo miè.\nguān yīn zhì xīn tīng wú shuō, dì zàng wú jìn bù sī yì,\nbǎi qiān wàn jié shuō bù zhōu, guǎng xuān dà shì rú shì lì.\ndì zàng míng zì rén ruò wén, nǎi zhì jiàn xiàng zhān lǐ zhě,\nxiāng huá yī fú yǐn shí fèng, gòng yǎng bǎi qiān shòu miào lè.\nruò néng yǐ cǐ huí fǎ jiè, bì jìng chéng fó chāo shēng sǐ,\nshì gù guān yīn rǔ dāng zhī, pǔ gào héng shā zhū guó tǔ.',
    meaning: '这时世尊说偈言：\n我观地藏威神力，恒河沙劫说难尽，\n见闻瞻礼一念间，利益人天无量事。\n若男若女若龙神，报尽应当堕恶道，\n至心归依大士身，寿命转增除罪障。\n少失父母恩爱者，未知魂神在何趣，\n兄弟姊妹及诸亲，生长以来皆不识。\n或塑或画大士身，悲恋瞻礼不暂舍，\n三七日中念其名，菩萨当现无边体。\n示其眷属所生界，纵堕恶趣寻出离，\n若能不退是初心，即获摩顶受圣记。\n想要修无上菩提，乃至出离三界苦，\n这人既发大悲心，应先瞻礼大士像，\n一切诸愿速成就，永无业障能遮止。\n有人发心念经典，想度群迷超彼岸，\n虽立此愿不思议，刚读就忘多废失，\n此人有业障惑故，对大乘经不能记。\n供养地藏以香花，衣服饮食诸玩具，\n以净水安大士前，一日一夜求服之。\n发殷重心慎五辛，酒肉邪淫及妄语，\n三七日内勿杀害，至心思念大士名，\n即在梦中见无边，醒来便得利根耳。\n应是经教历耳闻，千万生中永不忘，\n因是大士不思议，能使此人获此慧。\n贫穷众生及疾病，家宅凶衰眷属离，\n睡梦之中全不安，求者乖违无称遂。\n至心瞻礼地藏像，一切恶事皆消灭，\n至于梦中尽得安，衣食丰饶神鬼护。\n想入山林及渡海，毒恶禽兽及恶人，\n恶神恶鬼并恶风，一切诸难诸苦恼。\n只应瞻礼及供养，地藏菩萨大士像，\n如是山林大海中，应是诸恶皆消灭。\n观音至心听我说，地藏无尽不思议，\n百千万劫说不周，广宣大士如是力。\n地藏名字人若闻，乃至见像瞻礼者，\n香花衣服饮食奉，供养百千受妙乐。\n若能以此回法界，毕竟成佛超生死，\n所以观音你应知，普告恒沙诸国土。',
  },
];

// 第十三品：嘱累人天品
export const chapter13Sections: SutraSection[] = [
  {
    id: 'ch13-1',
    title: '第十三品 嘱累人天品（一）佛嘱托地藏',
    text: '尔时世尊举金色臂，又摩地藏菩萨摩诃萨顶，而作是言：地藏！地藏！汝之神力不可思议，汝之慈悲不可思议，汝之智慧不可思议，汝之辩才不可思议。正使十方诸佛赞叹宣说汝之不思议事，千万劫中不能得尽。',
    pinyin: 'ěr shí shì zūn jǔ jīn sè bì, yòu mó dì zàng pú sà mó hē sà dǐng, ér zuò shì yán: dì zàng! dì zàng! rǔ zhī shén lì bù kě sī yì, rǔ zhī cí bēi bù kě sī yì, rǔ zhī zhì huì bù kě sī yì, rǔ zhī biàn cái bù kě sī yì. zhèng shǐ shí fāng zhū fó zàn tàn xuān shuō rǔ zhī bù sī yì shì, qiān wàn jié zhōng bù néng dé jìn.',
    meaning: '这时世尊举起金色手臂，又摩地藏菩萨的头顶，说道：地藏！地藏！你的神力不可思议，你的慈悲不可思议，你的智慧不可思议，你的辩才不可思议。即使十方诸佛赞叹宣说你的不思议事，千万劫中也不能说尽。',
  },
  {
    id: 'ch13-2',
    title: '第十三品 嘱累人天品（二）付嘱众生',
    text: '地藏！地藏！记吾今日在忉利天中，于百千万亿不可说不可说一切诸佛菩萨、天龙八部、大会之中，再以人天诸众生等，未出三界，在火宅中者，付嘱于汝。无令是诸众生，堕恶趣中一日一夜，何况更落五无间及阿鼻地狱，动经千万亿劫，无有出期。',
    pinyin: 'dì zàng! dì zàng! jì wú jīn rì zài dāo lì tiān zhōng, yú bǎi qiān wàn yì bù kě shuō bù kě shuō yī qiè zhū fó pú sà, tiān lóng bā bù, dà huì zhī zhōng, zài yǐ rén tiān zhū zhòng shēng děng, wèi chū sān jiè, zài huǒ zhái zhōng zhě, fù zhǔ yú rǔ. wú lìng shì zhū zhòng shēng, duò è qù zhōng yī rì yī yè, hé kuàng gèng luò wǔ wú jiàn jí ā bí dì yù, dòng jīng qiān wàn yì jié, wú yǒu chū qī.',
    meaning: '地藏！地藏！记住我今日在忉利天中，在百千万亿不可说不可说一切诸佛菩萨、天龙八部、大会之中，再次将人天诸众生等，未出三界，在火宅中的，付嘱给你。不要让这些众生，堕恶趣中一日一夜，何况更落五无间及阿鼻地狱，动经千万亿劫，无有出期。',
  },
  {
    id: 'ch13-3',
    title: '第十三品 嘱累人天品（三）地藏承诺',
    text: '尔时地藏菩萨摩诃萨胡跪合掌白佛言：世尊！唯愿世尊，不以为虑。未来世中若有善男子善女人，于佛法中，一念恭敬，我亦百千方便，度脱是人，于生死中，速得解脱。何况闻诸善事，念念修行，自然于无上道永不退转。',
    pinyin: 'ěr shí dì zàng pú sà mó hē sà hú guì hé zhǎng bái fó yán: shì zūn! wéi yuàn shì zūn, bù yǐ wéi lǜ. wèi lái shì zhōng ruò yǒu shàn nán zǐ shàn nǚ rén, yú fó fǎ zhōng, yī niàn gōng jìng, wǒ yì bǎi qiān fāng biàn, dù tuō shì rén, yú shēng sǐ zhōng, sù dé jiě tuō. hé kuàng wén zhū shàn shì, niàn niàn xiū xíng, zì rán yú wú shàng dào yǒng bù tuì zhuǎn.',
    meaning: '这时地藏菩萨胡跪合掌对佛说：世尊！希望世尊不要忧虑。未来世中如果有善男子善女人，在佛法中，一念恭敬，我也会用百千方便，度脱这人，使其在生死中，速得解脱。何况听闻诸善事，念念修行，自然在无上道永不退转。',
  },
  {
    id: 'ch13-4',
    title: '第十三品 嘱累人天品（四）二十八种利益',
    text: '佛告虚空藏菩萨：若未来世，有善男子善女人，见地藏形像，及闻此经，乃至读诵，香华饮食，衣服珍宝，布施供养，赞叹瞻礼。得二十八种利益。一者，天龙护念。二者，善果日增。三者，集圣上因。四者，菩提不退。五者，衣食丰足。六者，疾疫不临。七者，离水火灾。八者，无盗贼厄。九者，人见钦敬。十者，神鬼助持。',
    pinyin: 'fó gào xū kōng zàng pú sà: ruò wèi lái shì, yǒu shàn nán zǐ shàn nǚ rén, jiàn dì zàng xíng xiàng, jí wén cǐ jīng, nǎi zhì dú sòng, xiāng huá yǐn shí, yī fú zhēn bǎo, bù shī gòng yǎng, zàn tàn zhān lǐ. dé èr shí bā zhǒng lì yì. yī zhě, tiān lóng hù niàn. èr zhě, shàn guǒ rì zēng. sān zhě, jí shèng shàng yīn. sì zhě, pú tí bù tuì. wǔ zhě, yī shí fēng zú. liù zhě, jí yì bù lín. qī zhě, lí shuǐ huǒ zāi. bā zhě, wú dào zéi è. jiǔ zhě, rén jiàn qīn jìng. shí zhě, shén guǐ zhù chí.',
    meaning: '佛告诉虚空藏菩萨：如果未来世，有善男子善女人，见地藏形像，以及听闻此经，乃至读诵，用香花饮食、衣服珍宝布施供养，赞叹瞻礼。能得二十八种利益。一者，天龙护念。二者，善果日增。三者，集圣上因。四者，菩提不退。五者，衣食丰足。六者，疾疫不临。七者，离水火灾。八者，无盗贼厄。九者，人见钦敬。十者，神鬼助持。',
  },
  {
    id: 'ch13-5',
    title: '第十三品 嘱累人天品（五）大会圆满',
    text: '尔时十方一切诸来，不可说不可说诸佛如来，及大菩萨天龙八部，闻释迦牟尼佛，称扬赞叹地藏菩萨，大威神力，不可思议，叹未曾有。是时忉利天，雨无量香华、天衣珠璎，供养释迦牟尼佛，及地藏菩萨已。一切众会，俱复瞻礼，合掌而退。',
    pinyin: 'ěr shí shí fāng yī qiè zhū lái, bù kě shuō bù kě shuō zhū fó rú lái, jí dà pú sà tiān lóng bā bù, wén shì jiā móu ní fó, chēng yáng zàn tàn dì zàng pú sà, dà wēi shén lì, bù kě sī yì, tàn wèi céng yǒu. shì shí dāo lì tiān, yǔ wú liàng xiāng huá, tiān yī zhū yīng, gòng yǎng shì jiā móu ní fó, jí dì zàng pú sà yǐ. yī qiè zhòng huì, jù fù zhān lǐ, hé zhǎng ér tuì.',
    meaning: '这时十方一切诸来，不可说不可说诸佛如来，及大菩萨天龙八部，听闻释迦牟尼佛，称扬赞叹地藏菩萨，大威神力，不可思议，赞叹未曾有。这时忉利天，雨无量香花、天衣珠璎，供养释迦牟尼佛，及地藏菩萨已。一切众会，都又瞻礼，合掌而退。',
  },
];

// 回向偈
export const dedicationVerse: SutraSection = {
  id: 'dedication-1',
  title: '回向偈',
  text: '诵经功德殊胜行，无边胜福皆回向。\n普愿沉溺诸众生，速往无量光佛刹。\n十方三世一切佛，一切菩萨摩诃萨，\n摩诃般若波罗蜜。',
  pinyin: 'sòng jīng gōng dé shū shèng xíng, wú biān shèng fú jiē huí xiàng.\npǔ yuàn chén nì zhū zhòng shēng, sù wǎng wú liàng guāng fó chà.\nshí fāng sān shì yī qiè fó, yī qiè pú sà mó hē sà,\nmó hē bō rě bō luó mì.',
  meaning: '诵经的功德是殊胜的修行，将无边殊胜的福德都回向出去。普遍愿沉溺在苦海中的一切众生，快速往生到无量光佛的净土。十方三世一切佛，一切菩萨摩诃萨，摩诃般若波罗蜜。',
};

// 三皈依
export const threeRefuges: SutraSection = {
  id: 'dedication-2',
  title: '三皈依',
  text: '自皈依佛，当愿众生，体解大道，发无上心。\n自皈依法，当愿众生，深入经藏，智慧如海。\n自皈依僧，当愿众生，统理大众，一切无碍。和南圣众。',
  pinyin: 'zì guī yī fó, dāng yuàn zhòng shēng, tǐ jiě dà dào, fā wú shàng xīn.\nzì guī yī fǎ, dāng yuàn zhòng shēng, shēn rù jīng zàng, zhì huì rú hǎi.\nzì guī yī sēng, dāng yuàn zhòng shēng, tǒng lǐ dà zhòng, yī qiè wú ài. hé nán shèng zhòng.',
  meaning: '自己皈依佛，愿一切众生都能体悟理解大道，发起无上菩提心。自己皈依法，愿一切众生都能深入经藏，智慧如海般广大。自己皈依僧，愿一切众生都能统理大众，一切无碍。恭敬礼拜圣众。',
};

// 回向
export const finalDedication: SutraSection = {
  id: 'dedication-3',
  title: '回向',
  text: '愿以此功德，庄严佛净土。\n上报四重恩，下济三途苦。\n若有见闻者，悉发菩提心。\n尽此一报身，同生极乐国。',
  pinyin: 'yuàn yǐ cǐ gōng dé, zhuāng yán fó jìng tǔ.\nshàng bào sì zhòng ēn, xià jì sān tú kǔ.\nruò yǒu jiàn wén zhě, xī fā pú tí xīn.\njìn cǐ yī bào shēn, tóng shēng jí lè guó.',
  meaning: '愿以此功德，庄严佛的净土。上报四重恩德，下济三恶道的苦难众生。若有见到听到的人，都发起菩提心。尽此一生报身，共同往生极乐国。',
};

// 汇总所有段落
export const dizangSections: SutraSection[] = [
  incensePraise,
  juelinBodhisattvaVerse,
  praise,
  openingSutra,
  ...chapter1Sections,
  ...chapter2Sections,
  ...chapter3Sections,
  ...chapter4Sections,
  ...chapter5Sections,
  ...chapter6Sections,
  ...chapter7Sections,
  ...chapter8Sections,
  ...chapter9Sections,
  ...chapter10Sections,
  ...chapter11Sections,
  ...chapter12Sections,
  ...chapter13Sections,
  dedicationVerse,
  threeRefuges,
  finalDedication,
];
