type QuranData = {
  id: number
  title: string
  link: string
  meaning: string
  image: string
  verse: number
  surah: number
  juz: number
  info: string
  ayah: {
    ayah: number
    quran: string
    meaning: string
    explanation: string
    page?: number
  }[]
}

export const quranData: QuranData[] = [
  {
    id: 1,
    title: 'Al-Fatiha',
    link: 'al-fatiha',
    meaning: 'The Opening',
    image: '/images/surah-al-fatiha.jpg', // optional image path
    verse: 7, // total verses
    surah: 1, // surah number
    juz: 1, // juz number
    info: 'Al-Fatiha is the opening chapter of the Quran and is recited in every unit of the Muslim prayer. It emphasizes praise of Allah, guidance, and mercy.',
    ayah: [
      {
        ayah: 1,
        quran: 'بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ',
        meaning: 'In the name of Allah, the Most Gracious, the Most Merciful.',
        explanation:
          'This verse begins every chapter (except one) and signifies seeking Allah’s help and blessings before any act.',
        page: 1,
      },
      {
        ayah: 2,
        quran: 'الْـحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        meaning: 'All praise is due to Allah, Lord of the worlds.',
        explanation: 'It expresses gratitude to Allah for His creation, sustenance, and mercy over all beings.',
        page: 1,
      },
      {
        ayah: 3,
        quran: 'الرَّحْمَـٰنِ الرَّحِيمِ',
        meaning: 'The Most Gracious, the Most Merciful.',
        explanation: 'It highlights Allah’s infinite mercy and compassion, available to all His creation.',
        page: 1,
      },
      {
        ayah: 4,
        quran: 'مَالِكِ يَوْمِ الدِّينِ',
        meaning: 'Master of the Day of Judgment.',
        explanation: 'Affirms that ultimate justice belongs to Allah alone, reminding believers of accountability.',
        page: 1,
      },
      {
        ayah: 5,
        quran: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        meaning: 'You alone we worship, and You alone we ask for help.',
        explanation: 'Declares complete devotion and dependence on Allah for guidance and strength.',
        page: 1,
      },
      {
        ayah: 6,
        quran: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        meaning: 'Guide us to the straight path.',
        explanation: 'A plea to remain steadfast on the righteous path of truth and obedience to Allah.',
        page: 1,
      },
      {
        ayah: 7,
        quran: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        meaning:
          'The path of those who have received Your grace; not the path of those who have brought down wrath upon themselves, nor of those who have gone astray.',
        explanation:
          'Seeks the path of the guided believers and protection from the way of those who earned Allah’s anger or went astray.',
        page: 1,
      },
    ],
  },
  {
    id: 2,
    title: 'Al-Baqarah',
    link: 'al-baqarah',
    meaning: 'The Cow',
    image: '/images/surah-al-baqarah.jpg',
    verse: 286,
    surah: 2,
    juz: 1,
    info: 'Al-Baqarah is the longest surah of the Quran, revealed in Madinah. It covers faith, law, guidance, morality, and the history of past prophets.',
    ayah: [
      {
        ayah: 1,
        quran: 'الم',
        meaning: 'Alif, Lam, Meem.',
        explanation: 'These are disjointed Arabic letters; their precise meaning is known only to Allah.',
        page: 2,
      },
      {
        ayah: 2,
        quran: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ هُدًى لِّلْمُتَّقِينَ',
        meaning: 'This is the Book about which there is no doubt, a guidance for those conscious of Allah.',
        explanation: 'The Quran provides absolute guidance for those who fear Allah and seek truth.',
        page: 2,
      },
      {
        ayah: 3,
        quran: 'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ',
        meaning: 'Who believe in the unseen, establish prayer, and spend out of what We have provided for them.',
        explanation: 'Faith in the unseen, prayer, and charity are core qualities of believers.',
        page: 2,
      },
      {
        ayah: 4,
        quran:
          'وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ',
        meaning:
          'And who believe in what has been revealed to you, [O Muhammad], and what was revealed before you, and of the Hereafter they are certain.',
        explanation: 'True believers accept all divine revelations and believe firmly in the Hereafter.',
        page: 2,
      },
      {
        ayah: 5,
        quran: 'أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ',
        meaning: 'Those are upon [right] guidance from their Lord, and it is those who are the successful.',
        explanation: 'Believers enjoy divine guidance and are promised success in this world and the next.',
        page: 2,
      },
      {
        ayah: 6,
        quran: 'إِنَّ الَّذِينَ كَفَرُوا سَوَاءٌ عَلَيْهِمْ أَأَنذَرْتَهُمْ أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ',
        meaning:
          'Indeed, those who disbelieve—it is all the same for them whether you warn them or do not warn them—they will not believe.',
        explanation: 'Disbelievers who reject truth knowingly are not affected by warnings.',
        page: 3,
      },
      {
        ayah: 7,
        quran:
          'خَتَمَ اللَّهُ عَلَىٰ قُلُوبِهِمْ وَعَلَىٰ سَمْعِهِمْ وَعَلَىٰ أَبْصَارِهِمْ غِشَاوَةٌ وَلَهُمْ عَذَابٌ عَظِيمٌ',
        meaning:
          'Allah has set a seal upon their hearts and upon their hearing, and over their vision is a veil. And for them is a great punishment.',
        explanation: 'Persistent rejection of truth leads to spiritual blindness and divine punishment.',
        page: 3,
      },
      {
        ayah: 8,
        quran: 'وَمِنَ النَّاسِ مَن يَقُولُ آمَنَّا بِاللَّهِ وَبِالْيَوْمِ الْآخِرِ وَمَا هُم بِمُؤْمِنِينَ',
        meaning:
          "And of the people are some who say, 'We believe in Allah and the Last Day,' but they are not believers.",
        explanation: 'This verse exposes the hypocrisy of those who claim faith outwardly but disbelieve inwardly.',
        page: 3,
      },
      {
        ayah: 9,
        quran: 'يُخَادِعُونَ اللَّهَ وَالَّذِينَ آمَنُوا وَمَا يَخْدَعُونَ إِلَّا أَنفُسَهُمْ وَمَا يَشْعُرُونَ',
        meaning:
          'They [think to] deceive Allah and those who believe, but they deceive only themselves and perceive [it] not.',
        explanation: 'Hypocrites harm themselves spiritually, thinking they can deceive Allah and believers.',
        page: 3,
      },
      {
        ayah: 10,
        quran: 'فِي قُلُوبِهِم مَّرَضٌ فَزَادَهُمُ اللَّهُ مَرَضًا وَلَهُمْ عَذَابٌ أَلِيمٌ بِمَا كَانُوا يَكْذِبُونَ',
        meaning:
          'In their hearts is a disease, so Allah has increased their disease; and for them is a painful punishment because they [habitually] used to lie.',
        explanation: 'Hypocrisy corrupts hearts, and constant deceit worsens their spiritual illness.',
        page: 3,
      },
      {
        ayah: 11,
        quran: 'وَإِذَا قِيلَ لَهُمْ لَا تُفْسِدُوا فِي الْأَرْضِ قَالُوا إِنَّمَا نَحْنُ مُصْلِحُونَ',
        meaning:
          "And when it is said to them, 'Do not cause corruption on the earth,' they say, 'We are but reformers.'",
        explanation: 'Hypocrites claim good intentions while spreading corruption and discord.',
        page: 3,
      },
      {
        ayah: 12,
        quran: 'أَلَا إِنَّهُمْ هُمُ الْمُفْسِدُونَ وَلَٰكِن لَّا يَشْعُرُونَ',
        meaning: 'Unquestionably, it is they who are the corrupters, but they perceive [it] not.',
        explanation: 'Their actions contradict their claims of reform, causing real harm to society.',
        page: 3,
      },
      {
        ayah: 13,
        quran:
          'وَإِذَا قِيلَ لَهُمْ آمِنُوا كَمَا آمَنَ النَّاسُ قَالُوا أَنُؤْمِنُ كَمَا آمَنَ السُّفَهَاءُ ۗ أَلَا إِنَّهُمْ هُمُ السُّفَهَاءُ وَلَٰكِن لَّا يَعْلَمُونَ',
        meaning:
          "And when it is said to them, 'Believe as the people have believed,' they say, 'Should we believe as the foolish have believed?' Unquestionably, it is they who are the foolish, but they know [it] not.",
        explanation: 'They mock true believers as naive, but in reality, their arrogance blinds them.',
        page: 3,
      },
      {
        ayah: 14,
        quran:
          'وَإِذَا لَقُوا الَّذِينَ آمَنُوا قَالُوا آمَنَّا وَإِذَا خَلَوْا إِلَىٰ شَيَاطِينِهِمْ قَالُوا إِنَّا مَعَكُمْ إِنَّمَا نَحْنُ مُسْتَهْزِئُونَ',
        meaning:
          "And when they meet those who believe, they say, 'We believe'; but when they are alone with their evil ones, they say, 'Indeed, we are with you; we were only mocking.'",
        explanation: 'Hypocrites pretend to believe but secretly mock the faithful.',
        page: 3,
      },
      {
        ayah: 15,
        quran: 'اللَّهُ يَسْتَهْزِئُ بِهِمْ وَيَمُدُّهُمْ فِي طُغْيَانِهِمْ يَعْمَهُونَ',
        meaning: 'Allah mocks them and prolongs them in their transgression while they wander blindly.',
        explanation: 'Their deception is turned against them by divine justice.',
        page: 3,
      },
      {
        ayah: 16,
        quran:
          'أُولَٰئِكَ الَّذِينَ اشْتَرَوُا الضَّلَالَةَ بِالْهُدَىٰ فَمَا رَبِحَت تِّجَارَتُهُمْ وَمَا كَانُوا مُهْتَدِينَ',
        meaning:
          'Those are the ones who have purchased error [in exchange] for guidance, so their transaction has brought no profit, nor were they guided.',
        explanation: 'Rejecting truth for falsehood is a losing bargain spiritually and morally.',
        page: 3,
      },
      {
        ayah: 17,
        quran: 'مَثَلُهُمْ كَمَثَلِ الَّذِي اسْتَوْقَدَ نَارًا',
        meaning:
          'Their example is that of one who kindled a fire, but when it illuminated what was around him, Allah took away their light and left them in darkness [so] they could not see.',
        explanation: 'Hypocrites initially receive some light of faith but lose it due to insincerity.',
        page: 4,
      },
      {
        ayah: 18,
        quran: 'صُمٌّ بُكْمٌ عُمْيٌ فَهُمْ لَا يَرْجِعُونَ',
        meaning: 'Deaf, dumb, and blind – so they will not return [to the right path].',
        explanation: 'Their rejection of truth makes them spiritually deaf and blind.',
        page: 4,
      },
      {
        ayah: 19,
        quran: 'أَوْ كَصَيِّبٍ مِّنَ السَّمَاءِ',
        meaning:
          'Or [it is] like a rainstorm from the sky within which is darkness, thunder, and lightning. They put their fingers in their ears against the thunderclaps in dread of death. But Allah is encompassing of the disbelievers.',
        explanation: 'A parable showing their fear of truth and unwillingness to face divine warnings.',
        page: 4,
      },
      {
        ayah: 20,
        quran: 'يَكَادُ الْبَرْقُ يَخْطَفُ أَبْصَارَهُمْ',
        meaning:
          'The lightning almost snatches away their sight. Every time it lights [the way] for them, they walk therein; but when darkness comes over them, they stand [still]. And if Allah had willed, He could have taken away their hearing and their sight. Indeed, Allah is over all things competent.',
        explanation: 'Their faith flickers between belief and doubt; divine power encompasses all.',
        page: 4,
      },
      {
        ayah: 21,
        quran:
          'يَا أَيُّهَا النَّاسُ اعْبُدُوا رَبَّكُمُ الَّذِي خَلَقَكُمْ وَالَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
        meaning: 'O mankind, worship your Lord, who created you and those before you, that you may become righteous.',
        explanation: 'A universal call for all humanity to worship Allah, the Creator of all.',
        page: 4,
      },
      {
        ayah: 22,
        quran: 'الَّذِي جَعَلَ لَكُمُ الْأَرْضَ فِرَاشًا وَالسَّمَاءَ بِنَاءً',
        meaning:
          'He who made for you the earth a bed and the sky a canopy and sent down from the sky rain and brought forth thereby fruits as provision for you. So do not attribute to Allah equals while you know.',
        explanation: 'Allah reminds humanity of His blessings and warns against associating partners with Him.',
        page: 4,
      },
      {
        ayah: 23,
        quran: 'وَإِن كُنتُمْ فِي رَيْبٍ مِّمَّا نَزَّلْنَا عَلَىٰ عَبْدِنَا',
        meaning:
          'And if you are in doubt about what We have sent down upon Our Servant [Muhammad], then produce a surah the like thereof and call upon your witnesses other than Allah, if you should be truthful.',
        explanation: 'A challenge to those who doubt the Quran’s divine origin to produce something comparable.',
        page: 4,
      },
      {
        ayah: 24,
        quran: 'فَإِن لَّمْ تَفْعَلُوا وَلَن تَفْعَلُوا',
        meaning:
          'But if you do not—and you will never be able to—then fear the Fire, whose fuel is people and stones, prepared for the disbelievers.',
        explanation: 'It affirms the miraculous nature of the Quran and warns of the consequences of disbelief.',
        page: 4,
      },
      {
        ayah: 25,
        quran: 'وَبَشِّرِ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ',
        meaning:
          'And give good tidings to those who believe and do righteous deeds that they will have gardens [in Paradise] beneath which rivers flow...',
        explanation: 'A promise of Paradise for the believers who act righteously.',
        page: 5,
      },
      {
        ayah: 26,
        quran: 'إِنَّ اللَّهَ لَا يَسْتَحْيِي أَن يَضْرِبَ مَثَلًا مَّا بَعُوضَةً',
        meaning: 'Indeed, Allah is not timid to present an example—even that of a mosquito or what is smaller...',
        explanation: 'Allah uses examples, however small, to teach truth; believers understand, but disbelievers mock.',
        page: 5,
      },
      {
        ayah: 27,
        quran: 'الَّذِينَ يَنقُضُونَ عَهْدَ اللَّهِ',
        meaning:
          'Those who break the covenant of Allah after contracting it and sever that which Allah has ordered to be joined and cause corruption on earth—it is they who are the losers.',
        explanation: 'Breaking divine commandments leads to spiritual and worldly loss.',
        page: 5,
      },
      {
        ayah: 28,
        quran: 'كَيْفَ تَكْفُرُونَ بِاللَّهِ وَكُنتُمْ أَمْوَاتًا',
        meaning:
          'How can you disbelieve in Allah when you were lifeless and He brought you to life; then He will cause you to die, then He will bring you [back] to life, and then to Him you will be returned?',
        explanation: 'Reminds humanity of the cycle of life and resurrection, affirming Allah’s power.',
        page: 5,
      },
      {
        ayah: 29,
        quran: 'هُوَ الَّذِي خَلَقَ لَكُم مَّا فِي الْأَرْضِ جَمِيعًا',
        meaning:
          'It is He who created for you all of that which is on the earth. Then He directed Himself to the heaven, and made them seven heavens, and He is Knowing of all things.',
        explanation: 'Allah created everything for mankind’s benefit and knows all that exists.',
        page: 5,
      },
      {
        ayah: 30,
        quran: 'وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ',
        meaning:
          "And when your Lord said to the angels, 'Indeed, I will make upon the earth a successive authority,' they said, 'Will You place upon it one who causes corruption therein and sheds blood, while we declare Your praise and sanctify You?' He said, 'Indeed, I know that which you do not know.'",
        explanation: 'The announcement of mankind’s creation and the wisdom behind Allah’s plan.',
        page: 6,
      },
      {
        ayah: 31,
        quran: 'وَعَلَّمَ آدَمَ الْأَسْمَاءَ كُلَّهَا',
        meaning:
          "And He taught Adam the names—all of them. Then He showed them to the angels and said, 'Inform Me of the names of these, if you are truthful.'",
        explanation: 'Allah honored Adam with knowledge, showing mankind’s potential.',
        page: 6,
      },
      {
        ayah: 32,
        quran: 'قَالُوا سُبْحَانَكَ لَا عِلْمَ لَنَا',
        meaning:
          "They said, 'Exalted are You; we have no knowledge except what You have taught us. Indeed, it is You who is the Knowing, the Wise.'",
        explanation: 'The angels acknowledge Allah’s supreme wisdom and knowledge.',
      },
      {
        ayah: 33,
        quran: 'قَالَ يَا آدَمُ أَنبِئْهُم بِأَسْمَائِهِمْ',
        meaning:
          "He said, 'O Adam, inform them of their names.' And when he had informed them of their names, He said, 'Did I not tell you that I know the unseen of the heavens and the earth?'",
        explanation: 'Adam’s knowledge demonstrated mankind’s special status.',
      },
      {
        ayah: 34,
        quran: 'وَإِذْ قُلْنَا لِلْمَلَائِكَةِ اسْجُدُوا لِآدَمَ',
        meaning:
          "And [mention] when We said to the angels, 'Prostrate before Adam'; so they prostrated, except for Iblis. He refused and was arrogant and became of the disbelievers.",
        explanation: 'The refusal of Iblis (Satan) marks the beginning of enmity toward mankind.',
      },
      {
        ayah: 35,
        quran: 'وَقُلْنَا يَا آدَمُ اسْكُنْ أَنتَ وَزَوْجُكَ الْجَنَّةَ',
        meaning:
          "And We said, 'O Adam, dwell, you and your wife, in Paradise and eat therefrom in [ease and] abundance...'",
        explanation: 'Adam and his wife were granted Paradise with freedom except for one prohibition.',
      },
      {
        ayah: 36,
        quran: 'فَأَزَلَّهُمَا الشَّيْطَانُ',
        meaning:
          'But Satan caused them to slip out of it and removed them from that condition in which they had been...',
        explanation: 'Satan deceived Adam and Eve, leading to their descent to earth.',
      },
      {
        ayah: 37,
        quran: 'فَتَلَقَّىٰ آدَمُ مِن رَّبِّهِ كَلِمَاتٍ',
        meaning:
          'Then Adam received from his Lord some words, and He accepted his repentance. Indeed, it is He who is the Accepting of repentance, the Merciful.',
        explanation: 'Adam repented sincerely and Allah forgave him, teaching mercy and repentance.',
      },
      {
        ayah: 38,
        quran: 'قُلْنَا اهْبِطُوا مِنْهَا جَمِيعًا',
        meaning:
          "We said, 'Go down from it, all of you. And when guidance comes to you from Me, whoever follows My guidance—there will be no fear concerning them, nor will they grieve.'",
        explanation: 'Allah’s mercy ensured continued guidance for humanity after their descent.',
      },
      {
        ayah: 39,
        quran: 'وَالَّذِينَ كَفَرُوا وَكَذَّبُوا',
        meaning:
          'But those who disbelieve and deny Our signs—those will be companions of the Fire; they will abide therein eternally.',
        explanation: 'Rejecting divine signs leads to eternal punishment.',
      },
      {
        ayah: 40,
        quran: 'يَا بَنِي إِسْرَائِيلَ اذْكُرُوا نِعْمَتِيَ',
        meaning:
          'O Children of Israel, remember My favor which I have bestowed upon you and fulfill My covenant that I will fulfill your covenant—and be afraid of [only] Me.',
        explanation: 'A reminder to the Israelites to uphold their covenant with Allah.',
      },
      {
        ayah: 41,
        quran: 'وَآمِنُوا بِمَا أَنزَلْتُ',
        meaning:
          'And believe in what I have sent down confirming that which is already with you, and do not be the first to disbelieve in it...',
        explanation: 'They are urged to believe in the Quran, which confirms their scriptures.',
      },
      {
        ayah: 42,
        quran: 'وَلَا تَلْبِسُوا الْحَقَّ بِالْبَاطِلِ',
        meaning: 'And do not mix the truth with falsehood or conceal the truth while you know [it].',
        explanation: 'A warning against corrupting or hiding divine truth.',
      },
      {
        ayah: 43,
        quran: 'وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ',
        meaning: 'And establish prayer and give zakah and bow with those who bow [in worship and obedience].',
        explanation: 'They are instructed to uphold prayer, charity, and humility with the believers.',
      },
      {
        ayah: 44,
        quran: 'أَتَأْمُرُونَ النَّاسَ بِالْبِرِّ',
        meaning:
          'Do you order righteousness of the people and forget yourselves while you recite the Scripture? Then will you not reason?',
        explanation: 'Hypocrisy is condemned—preaching virtue while neglecting self-practice.',
      },
      {
        ayah: 45,
        quran: 'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ',
        meaning:
          'And seek help through patience and prayer, and indeed, it is difficult except for the humbly submissive [to Allah].',
        explanation: 'Patience and prayer are keys to spiritual strength and divine assistance.',
      },
      {
        ayah: 46,
        quran: 'الَّذِينَ يَظُنُّونَ أَنَّهُم مُّلَاقُو رَبِّهِمْ',
        meaning: 'Who are certain that they will meet their Lord and that they will return to Him.',
        explanation: 'True believers act with awareness of their return to Allah.',
      },
      {
        ayah: 47,
        quran: 'يَا بَنِي إِسْرَائِيلَ اذْكُرُوا نِعْمَتِيَ',
        meaning:
          'O Children of Israel, remember My favor that I have bestowed upon you and that I preferred you over the worlds.',
        explanation: 'A reminder of Allah’s past blessings and their duty to remain faithful.',
      },
      {
        ayah: 48,
        quran: 'وَاتَّقُوا يَوْمًا لَّا تَجْزِي نَفْسٌ عَن نَّفْسٍ شَيْئًا',
        meaning:
          'And fear a Day when no soul will suffice for another at all, nor will intercession be accepted from it...',
        explanation: 'Emphasizes individual accountability on the Day of Judgment.',
      },
      {
        ayah: 49,
        quran: 'وَإِذْ نَجَّيْنَاكُم مِّنْ آلِ فِرْعَوْنَ',
        meaning:
          'And [recall] when We saved you from the people of Pharaoh, who were afflicting you with the worst torment...',
        explanation: 'Recalls Allah’s deliverance of the Israelites from Pharaoh’s oppression.',
      },
      {
        ayah: 50,
        quran: 'وَإِذْ فَرَقْنَا بِكُمُ الْبَحْرَ',
        meaning:
          'And [recall] when We parted the sea for you and saved you and drowned the people of Pharaoh while you were looking on.',
        explanation: 'The miraculous parting of the sea and the destruction of Pharaoh’s army.',
      },
      {
        ayah: 51,
        quran:
          'وَإِذْ وَاعَدْنَا مُوسَىٰ أَرْبَعِينَ لَيْلَةً ثُمَّ اتَّخَذْتُمُ الْعِجْلَ مِن بَعْدِهِ وَأَنتُمْ ظَالِمُونَ',
        meaning:
          'And when We appointed for Moses forty nights, then you took the calf after him while you were wrongdoers.',
        explanation: 'The Israelites worshipped the golden calf during Moses’ absence, committing a grave sin.',
      },
      {
        ayah: 52,
        quran: 'ثُمَّ عَفَوْنَا عَنكُم مِّن بَعْدِ ذَٰلِكَ لَعَلَّكُمْ تَشْكُرُونَ',
        meaning: 'Then We forgave you after that so perhaps you would be grateful.',
        explanation: 'Allah forgave their sin to give them a chance to repent and be thankful.',
      },
      {
        ayah: 53,
        quran: 'وَإِذْ آتَيْنَا مُوسَى الْكِتَابَ وَالْفُرْقَانَ لَعَلَّكُمْ تَهْتَدُونَ',
        meaning: 'And when We gave Moses the Scripture and the criterion that perhaps you would be guided.',
        explanation: 'Moses was given the Torah to distinguish truth from falsehood and guide his people.',
      },
      {
        ayah: 54,
        quran:
          'وَإِذْ قَالَ مُوسَىٰ لِقَوْمِهِ يَا قَوْمِ إِنَّكُمْ ظَلَمْتُمْ أَنفُسَكُم بِاتِّخَاذِكُمُ الْعِجْلَ فَتُوبُوا إِلَىٰ بَارِئِكُمْ فَاقْتُلُوا أَنفُسَكُمْ ذَٰلِكُمْ خَيْرٌ لَّكُمْ عِندَ بَارِئِكُمْ فَتَابَ عَلَيْكُمْ ۚ إِنَّهُ هُوَ التَّوَّابُ الرَّحِيمُ',
        meaning:
          "And when Moses said to his people, 'O my people, indeed you have wronged yourselves by your taking of the calf, so repent to your Creator and kill yourselves; that is best for you in the sight of your Creator.' Then He accepted your repentance; indeed, He is the Accepting of repentance, the Merciful.",
        explanation: 'True repentance required severe self-sacrifice for the forgiveness of their idolatry.',
      },
      {
        ayah: 55,
        quran:
          'وَإِذْ قُلْتُمْ يَا مُوسَىٰ لَن نُّؤْمِنَ لَكَ حَتَّىٰ نَرَى اللَّهَ جَهْرَةً فَأَخَذَتْكُمُ الصَّاعِقَةُ وَأَنتُمْ تَنظُرُونَ',
        meaning:
          "And when you said, 'O Moses, we will never believe you until we see Allah outright'; so the thunderbolt took you while you were looking on.",
        explanation: 'Their demand to see Allah physically led to a punishment by a thunderbolt.',
      },
      {
        ayah: 56,
        quran: 'ثُمَّ بَعَثْنَاكُم مِّن بَعْدِ مَوْتِكُمْ لَعَلَّكُمْ تَشْكُرُونَ',
        meaning: 'Then We revived you after your death that perhaps you would be grateful.',
        explanation: 'After the thunderbolt struck them dead, Allah revived them as a sign of His mercy.',
      },
      {
        ayah: 57,
        quran:
          'وَظَلَّلْنَا عَلَيْكُمُ الْغَمَامَ وَأَنزَلْنَا عَلَيْكُمُ الْمَنَّ وَالسَّلْوَىٰ ۖ كُلُوا مِن طَيِّبَاتِ مَا رَزَقْنَاكُمْ ۚ وَمَا ظَلَمُونَا وَلَـٰكِن كَانُوا أَنفُسَهُمْ يَظْلِمُونَ',
        meaning:
          "And We shaded you with clouds and sent down to you manna and quails, saying, 'Eat from the good things We have provided you.' They wronged not Us but they wronged themselves.",
        explanation: 'Allah provided food and shade in the desert, but they remained ungrateful.',
      },
      {
        ayah: 58,
        quran:
          'وَإِذْ قُلْنَا ادْخُلُوا هَـٰذِهِ الْقَرْيَةَ فَكُلُوا مِنْهَا حَيْثُ شِئْتُمْ رَغَدًا وَادْخُلُوا الْبَابَ سُجَّدًا وَقُولُوا حِطَّةٌ نَّغْفِرْ لَكُمْ خَطَايَاكُمْ ۚ وَسَنَزِيدُ الْمُحْسِنِينَ',
        meaning:
          "And [recall] when We said, 'Enter this city and eat from it wherever you will in [ease and] abundance, and enter the gate bowing humbly and say, “Relieve us of our burdens”; We will forgive your sins for you, and We will increase the doers of good.'",
        explanation: 'They were instructed to enter humbly and seek forgiveness, but many disobeyed.',
      },
      {
        ayah: 59,
        quran:
          'فَبَدَّلَ الَّذِينَ ظَلَمُوا قَوْلًا غَيْرَ الَّذِي قِيلَ لَهُمْ فَأَنزَلْنَا عَلَى الَّذِينَ ظَلَمُوا رِجْزًا مِّنَ السَّمَاءِ بِمَا كَانُوا يَفْسُقُونَ',
        meaning:
          'But those who wronged changed the word to something other than that which had been said to them, so We sent down upon those who wronged a punishment from the sky because they were defiantly disobedient.',
        explanation: 'They altered the command mockingly, leading to divine punishment.',
      },
      {
        ayah: 60,
        quran:
          'وَإِذِ اسْتَسْقَىٰ مُوسَىٰ لِقَوْمِهِ فَقُلْنَا اضْرِب بِّعَصَاكَ الْحَجَرَ ۖ فَانفَجَرَتْ مِنْهُ اثْنَتَا عَشْرَةَ عَيْنًا ۖ قَدْ عَلِمَ كُلُّ أُنَاسٍ مَّشْرَبَهُمْ ۖ كُلُوا وَاشْرَبُوا مِن رِّزْقِ اللَّهِ وَلَا تَعْثَوْا فِي الْأَرْضِ مُفْسِدِينَ',
        meaning:
          "And when Moses prayed for water for his people, We said, 'Strike with your staff the stone.' And there gushed forth from it twelve springs; every people knew its watering place. 'Eat and drink from the provision of Allah, and do not commit abuse on the earth, spreading corruption.'",
        explanation: 'Allah miraculously provided water from a rock for each tribe of Israel.',
      },
      {
        ayah: 61,
        quran:
          'وَإِذْ قُلْتُمْ يَا مُوسَىٰ لَن نَّصْبِرَ عَلَىٰ طَعَامٍ وَاحِدٍ فَادْعُ لَنَا رَبَّكَ يُخْرِجْ لَنَا مِمَّا تُنبِتُ الْأَرْضُ',
        meaning:
          "And when you said, 'O Moses, we can never endure one kind of food. So call upon your Lord to bring forth for us of what the earth grows...'",
        explanation: 'The people grew ungrateful for the heavenly food and demanded earthly produce.',
      },
      {
        ayah: 62,
        quran:
          'إِنَّ الَّذِينَ آمَنُوا وَالَّذِينَ هَادُوا وَالنَّصَارَىٰ وَالصَّابِئِينَ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ وَعَمِلَ صَالِحًا فَلَهُمْ أَجْرُهُمْ',
        meaning:
          'Indeed, those who believed and those who were Jews or Christians or Sabeans – those who believed in Allah and the Last Day and did righteousness – will have their reward with their Lord, and no fear will there be concerning them, nor will they grieve.',
        explanation: 'Faith in Allah and righteous deeds ensure salvation for all true believers.',
      },
      {
        ayah: 63,
        quran: 'وَإِذْ أَخَذْنَا مِيثَاقَكُمْ وَرَفَعْنَا فَوْقَكُمُ الطُّورَ',
        meaning:
          "And [recall] when We took your covenant and raised over you the mount, saying, 'Take what We have given you with determination and remember what is in it that you might fear Allah.'",
        explanation: 'Allah made them pledge obedience, symbolized by raising Mount Sinai over them.',
      },
      {
        ayah: 64,
        quran:
          'ثُمَّ تَوَلَّيْتُم مِّن بَعْدِ ذَٰلِكَ ۖ فَلَوْلَا فَضْلُ اللَّهِ عَلَيْكُمْ وَرَحْمَتُهُ لَكُنتُم مِّنَ الْخَاسِرِينَ',
        meaning:
          'Then you turned away after that. If not for the favor of Allah upon you and His mercy, you would have been among the losers.',
        explanation: 'Despite their defiance, Allah’s mercy saved them from destruction.',
      },
      {
        ayah: 65,
        quran: 'وَلَقَدْ عَلِمْتُمُ الَّذِينَ اعْتَدَوْا مِنكُمْ فِي السَّبْتِ',
        meaning:
          "And you had already known about those who transgressed among you concerning the Sabbath, and We said to them, 'Be apes, despised.'",
        explanation: 'Those who broke the Sabbath were transformed as a punishment.',
      },
      {
        ayah: 66,
        quran: 'فَجَعَلْنَاهَا نَكَالًا لِّمَا بَيْنَ يَدَيْهَا وَمَا خَلْفَهَا وَمَوْعِظَةً لِّلْمُتَّقِينَ',
        meaning:
          'And We made it a deterrent punishment for those who were present and those after them and a lesson for the righteous.',
        explanation: 'The punishment served as a warning for future generations.',
      },
      {
        ayah: 67,
        quran: 'وَإِذْ قَالَ مُوسَىٰ لِقَوْمِهِ إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تَذْبَحُوا بَقَرَةً',
        meaning:
          "And when Moses said to his people, 'Indeed, Allah commands you to slaughter a cow,' they said, 'Do you take us in ridicule?' He said, 'I seek refuge in Allah from being among the ignorant.'",
        explanation: 'This incident gives the surah its name; the people doubted and mocked the command.',
      },
      {
        ayah: 68,
        quran: 'قَالُوا ادْعُ لَنَا رَبَّكَ يُبَيِّن لَّنَا مَا هِيَ',
        meaning:
          "They said, 'Call upon your Lord to make clear to us what it is.' He said, 'Allah says, “It is a cow neither old nor young but between that,” so do what you are commanded.'",
        explanation: 'They kept questioning instead of obeying immediately.',
      },
      {
        ayah: 69,
        quran: 'قَالُوا ادْعُ لَنَا رَبَّكَ يُبَيِّن لَّنَا مَا لَوْنُهَا',
        meaning:
          "They said, 'Call upon your Lord to show us what her color is.' He said, 'He says, “It is a yellow cow, bright in color—pleasing to the observers.”'",
        explanation: 'They demanded further details, making the task more complicated.',
      },
      {
        ayah: 70,
        quran: 'قَالُوا ادْعُ لَنَا رَبَّكَ يُبَيِّن لَّنَا مَا هِيَ',
        meaning:
          "They said, 'Call upon your Lord to make clear to us what it is; indeed, all cows look alike to us. And indeed we, if Allah wills, will be guided.'",
        explanation: 'Their excessive questioning showed reluctance to obey.',
      },
      {
        ayah: 71,
        quran: 'قَالَ إِنَّهُ يَقُولُ إِنَّهَا بَقَرَةٌ لَّا ذَلُولٌ تُثِيرُ الْأَرْضَ وَلَا تَسْقِي الْحَرْثَ',
        meaning:
          "He said, 'He says, “It is a cow neither trained to plow the earth nor to irrigate the field, one free from fault with no spot upon her.”' They said, 'Now you have come with the truth.' So they slaughtered her, though they almost did not.",
        explanation: 'Eventually they complied, reluctantly, after making matters difficult.',
      },
      {
        ayah: 72,
        quran: 'وَإِذْ قَتَلْتُمْ نَفْسًا فَادَّارَأْتُمْ فِيهَا',
        meaning:
          'And when you killed a man and disputed over it, but Allah was to bring out that which you were concealing.',
        explanation: 'Allah revealed the murderer through the miracle of the slaughtered cow.',
      },
      {
        ayah: 73,
        quran: 'فَقُلْنَا اضْرِبُوهُ بِبَعْضِهَا',
        meaning:
          "So We said, 'Strike him with part of it.' Thus does Allah bring the dead to life, and He shows you His signs that you might reason.",
        explanation: 'Allah revived the slain man as proof of His power to resurrect.',
      },
      {
        ayah: 74,
        quran: 'ثُمَّ قَسَتْ قُلُوبُكُم مِّن بَعْدِ ذَٰلِكَ',
        meaning: 'Then your hearts became hardened after that, being like stones or even harder...',
        explanation: 'Despite witnessing miracles, their hearts grew cold and unyielding.',
      },
      {
        ayah: 75,
        quran: 'أَفَتَطْمَعُونَ أَن يُؤْمِنُوا لَكُمْ',
        meaning:
          'Do you covet [the hope] that they would believe for you while a party of them used to hear the words of Allah then distort it after they had understood it...',
        explanation: 'The verse rebukes those who knowingly alter divine revelation.',
      },
      {
        ayah: 76,
        quran: 'وَإِذَا لَقُوا الَّذِينَ آمَنُوا قَالُوا آمَنَّا',
        meaning:
          "And when they meet those who believe, they say, 'We have believed'; but when alone with one another, they say, 'Do you talk to them about what Allah has revealed to you...'",
        explanation: 'It exposes the hypocrisy of those who feigned belief before Muslims.',
      },
      {
        ayah: 77,
        quran: 'أَوَلَا يَعْلَمُونَ أَنَّ اللَّهَ يَعْلَمُ مَا يُسِرُّونَ وَمَا يُعْلِنُونَ',
        meaning: 'Do they not know that Allah knows what they conceal and what they declare?',
        explanation: 'Allah reminds that nothing escapes His knowledge.',
      },
      {
        ayah: 78,
        quran: 'وَمِنْهُمْ أُمِّيُّونَ لَا يَعْلَمُونَ الْكِتَابَ إِلَّا أَمَانِيَّ',
        meaning:
          'And among them are unlettered ones who do not know the Scripture except [indulgence in] wishful thinking, but they are only assuming.',
        explanation: 'Many among them followed conjecture rather than true knowledge.',
      },
      {
        ayah: 79,
        quran: 'فَوَيْلٌ لِّلَّذِينَ يَكْتُبُونَ الْكِتَابَ',
        meaning:
          "So woe to those who write the Scripture with their own hands then say, 'This is from Allah,' to exchange it for a small price...",
        explanation: 'Condemnation for corrupting divine texts for worldly gain.',
      },
      {
        ayah: 80,
        quran: 'وَقَالُوا لَن تَمَسَّنَا النَّارُ إِلَّا أَيَّامًا مَّعْدُودَةً',
        meaning:
          "And they say, 'Never will the Fire touch us, except for a few days.' Say, 'Have you taken a covenant with Allah?'...",
        explanation: 'Refutes false assumptions of guaranteed salvation.',
      },
      {
        ayah: 81,
        quran: 'بَلَىٰ مَن كَسَبَ سَيِّئَةً',
        meaning:
          'Yes, whoever earns evil and his sin has encompassed him – those are the companions of the Fire; they will abide therein eternally.',
        explanation: 'Eternal punishment awaits those who persist in disbelief and sin.',
      },
      {
        ayah: 82,
        quran: 'وَالَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ',
        meaning:
          'But they who believe and do righteous deeds – those are the companions of Paradise; they will abide therein eternally.',
        explanation: 'Believers with good deeds will dwell forever in Paradise.',
      },
      {
        ayah: 83,
        quran: 'وَإِذْ أَخَذْنَا مِيثَاقَ بَنِي إِسْرَائِيلَ',
        meaning:
          "And when We took the covenant from the Children of Israel: 'Do not worship except Allah; and be good to parents and relatives...'",
        explanation: 'A reminder of the moral and spiritual covenant made with the Israelites.',
      },
      {
        ayah: 84,
        quran: 'ثُمَّ أَنتُمْ هَـٰؤُلَاءِ تَقْتُلُونَ أَنفُسَكُمْ',
        meaning:
          'Then you are those [same ones] killing one another and evicting a party of your people from their homes...',
        explanation: 'They violated their own covenant by committing injustice among themselves.',
      },
      {
        ayah: 85,
        quran: 'أَفَتُؤْمِنُونَ بِبَعْضِ الْكِتَابِ وَتَكْفُرُونَ بِبَعْضٍ',
        meaning:
          'Do you believe in part of the Scripture and disbelieve in part? Then what is the recompense for those who do so except disgrace in worldly life...',
        explanation: 'Selective obedience to divine laws leads to humiliation.',
      },
      {
        ayah: 86,
        quran: 'أُولَٰئِكَ الَّذِينَ اشْتَرَوُا الْحَيَاةَ الدُّنْيَا بِالْآخِرَةِ',
        meaning:
          'Those are the ones who have bought the worldly life [in exchange] for the Hereafter, so the punishment will not be lightened for them...',
        explanation: 'Preferring worldly gain over faith leads to eternal loss.',
      },
      {
        ayah: 87,
        quran: 'وَلَقَدْ آتَيْنَا مُوسَى الْكِتَابَ',
        meaning:
          'And We gave Moses the Scripture and followed up after him with messengers; and We gave Jesus, the son of Mary, clear proofs...',
        explanation: 'All prophets brought truth, but many were rejected by their people.',
      },
      {
        ayah: 88,
        quran: 'وَقَالُوا قُلُوبُنَا غُلْفٌ',
        meaning: "And they said, 'Our hearts are wrapped.' But, in fact, Allah has cursed them for their disbelief...",
        explanation: 'Their rejection of faith hardened their hearts.',
      },
      {
        ayah: 89,
        quran: 'وَلَمَّا جَاءَهُمْ كِتَابٌ مِّنْ عِندِ اللَّهِ',
        meaning:
          'And when there came to them a Book from Allah confirming that which was with them... they disbelieved in it...',
        explanation: 'They rejected the Quran despite recognizing its truth.',
      },
      {
        ayah: 90,
        quran: 'بِئْسَمَا اشْتَرَوْا بِهِ أَنفُسَهُمْ',
        meaning:
          'How wretched is that for which they sold themselves – that they would disbelieve in what Allah has sent down...',
        explanation: 'They traded faith for jealousy and pride.',
      },
      {
        ayah: 91,
        quran: 'وَإِذَا قِيلَ لَهُمْ آمِنُوا بِمَا أَنزَلَ اللَّهُ',
        meaning:
          "And when it is said to them, 'Believe in what Allah has revealed,' they say, 'We believe only in what was revealed to us.'...",
        explanation: 'They denied later revelations out of arrogance.',
      },
      {
        ayah: 92,
        quran: 'وَلَقَدْ جَاءَكُم مُّوسَىٰ بِالْبَيِّنَاتِ',
        meaning:
          'And Moses had certainly brought you clear proofs. Then you took the calf after him while you were wrongdoers.',
        explanation: 'Reminds them of their repeated rebellion even after witnessing miracles.',
      },
      {
        ayah: 93,
        quran: 'وَإِذْ أَخَذْنَا مِيثَاقَكُمْ وَرَفَعْنَا فَوْقَكُمُ الطُّورَ',
        meaning: 'And [recall] when We took your covenant and raised over you the mount...',
        explanation: 'Reinforces their obligation to follow divine commandments.',
      },
      {
        ayah: 94,
        quran: 'قُلْ إِن كَانَتْ لَكُمُ الدَّارُ الْآخِرَةُ',
        meaning:
          "Say, 'If the home of the Hereafter with Allah is for you alone and not the [other] people, then wish for death, if you should be truthful.'",
        explanation: 'Challenges their claim of being exclusively favored by Allah.',
      },
      {
        ayah: 95,
        quran: 'وَلَن يَتَمَنَّوْهُ أَبَدًا',
        meaning: 'But they will never wish for it, ever, because of what their hands have put forth...',
        explanation: 'They fear death because of their misdeeds.',
      },
      {
        ayah: 96,
        quran: 'وَلَتَجِدَنَّهُمْ أَحْرَصَ النَّاسِ عَلَىٰ حَيَاةٍ',
        meaning: 'And you will surely find them the most greedy of people for life...',
        explanation: 'Their love for worldly life prevents them from seeking truth.',
      },
      {
        ayah: 97,
        quran: 'قُلْ مَن كَانَ عَدُوًّا لِّجِبْرِيلَ',
        meaning:
          "Say, 'Whoever is an enemy to Gabriel—it is none but he who has brought it [the revelation] down upon your heart by permission of Allah...'",
        explanation: 'Rejecting Gabriel equates to rejecting divine revelation.',
      },
      {
        ayah: 98,
        quran: 'مَن كَانَ عَدُوًّا لِّلَّهِ وَمَلَائِكَتِهِ',
        meaning:
          'Whoever is an enemy to Allah and His angels and His messengers and Gabriel and Michael—then indeed, Allah is an enemy to the disbelievers.',
        explanation: 'Declares enmity toward divine messengers as disbelief.',
      },
      {
        ayah: 99,
        quran: 'وَلَقَدْ أَنزَلْنَا إِلَيْكَ آيَاتٍ بَيِّنَاتٍ',
        meaning:
          'And We have certainly revealed to you verses which are clear proofs, and no one would deny them except the defiantly disobedient.',
        explanation: 'The Quran’s clarity is undeniable except by the rebellious.',
      },
      {
        ayah: 100,
        quran: 'أَوَكُلَّمَا عَاهَدُوا عَهْدًا نَّبَذَهُ فَرِيقٌ مِّنْهُمْ',
        meaning:
          'Is it not that every time they took a covenant a party of them threw it away? But, in fact, most of them do not believe.',
        explanation: 'Rebukes their repeated betrayal of divine agreements.',
      },
      {
        ayah: 101,
        quran: 'وَلَمَّا جَاءَهُمْ رَسُولٌ مِّنْ عِندِ اللَّهِ مُصَدِّقٌ لِّمَا مَعَهُمْ...',
        meaning:
          'And when a Messenger from Allah came to them confirming that which was with them, a party of those who had been given the Scripture threw away the Book of Allah behind their backs as if they did not know.',
        explanation: 'They disregarded their own Scripture when the Prophet confirmed its message.',
      },
      {
        ayah: 102,
        quran: 'وَاتَّبَعُوا مَا تَتْلُوا الشَّيَاطِينُ عَلَىٰ مُلْكِ سُلَيْمَانَ...',
        meaning:
          'They followed what the devils recited during the reign of Solomon... Solomon did not disbelieve, but the devils disbelieved, teaching people magic...',
        explanation: 'Clarifies that Solomon was not a magician but a prophet; sorcery is condemned.',
      },
      {
        ayah: 103,
        quran: 'وَلَوْ أَنَّهُمْ آمَنُوا وَاتَّقَوْا...',
        meaning: 'And if they had believed and feared Allah, then the reward from Allah would have been better...',
        explanation: 'Faith and piety bring blessings, unlike their pursuit of magic.',
      },
      {
        ayah: 104,
        quran: 'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَقُولُوا رَاعِنَا...',
        meaning: "O you who have believed, do not say 'Rāʿinā' but say 'Unẓurnā' and listen...",
        explanation: 'Muslims are instructed to use respectful language when addressing the Prophet.',
      },
      {
        ayah: 105,
        quran: 'مَّا يَوَدُّ الَّذِينَ كَفَرُوا مِنْ أَهْلِ الْكِتَابِ...',
        meaning:
          'Neither those who disbelieve from the People of the Scripture nor the polytheists wish that any good should be sent down to you from your Lord...',
        explanation: 'Out of envy, they dislike that Muslims receive divine guidance.',
      },
      {
        ayah: 106,
        quran: 'مَا نَنسَخْ مِنْ آيَةٍ أَوْ نُنسِهَا...',
        meaning:
          'We do not abrogate a verse or cause it to be forgotten except that We bring forth one better than it or similar...',
        explanation: 'Affirms Allah’s authority in revealing and replacing laws as He wills.',
      },
      {
        ayah: 107,
        quran: 'أَلَمْ تَعْلَمْ أَنَّ اللَّهَ لَهُ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ...',
        meaning: 'Do you not know that to Allah belongs the dominion of the heavens and the earth...',
        explanation: 'Reminds that ultimate power and wisdom belong solely to Allah.',
      },
      {
        ayah: 108,
        quran: 'أَمْ تُرِيدُونَ أَن تَسْأَلُوا رَسُولَكُمْ...',
        meaning:
          'Or do you wish to question your Messenger as Moses was questioned before? Whoever exchanges faith for disbelief has certainly strayed from the sound way.',
        explanation: 'Warns against demanding unnecessary proofs from the Prophet.',
      },
      {
        ayah: 109,
        quran: 'وَدَّ كَثِيرٌ مِّنْ أَهْلِ الْكِتَابِ...',
        meaning:
          'Many of the People of the Scripture wish they could turn you back to disbelief after you have believed...',
        explanation: 'Out of jealousy, they wish to mislead believers; patience and forgiveness are advised.',
      },
      {
        ayah: 110,
        quran: 'وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ...',
        meaning:
          'And establish prayer and give zakah, and whatever good you put forward for yourselves—you will find it with Allah.',
        explanation: 'Encourages consistent prayer, charity, and good deeds.',
      },
      {
        ayah: 111,
        quran: 'وَقَالُوا لَن يَدْخُلَ الْجَنَّةَ إِلَّا مَن كَانَ هُودًا أَوْ نَصَارَىٰ...',
        meaning:
          "And they say, 'None will enter Paradise except one who is a Jew or a Christian.' That is merely their wishful thinking...",
        explanation: 'Faith and obedience, not identity, determine salvation.',
      },
      {
        ayah: 112,
        quran: 'بَلَىٰ مَنْ أَسْلَمَ وَجْهَهُ لِلَّهِ وَهُوَ مُحْسِنٌ...',
        meaning: 'Yes, whoever submits himself to Allah and is a doer of good will have his reward with his Lord...',
        explanation: 'Submission to Allah and righteous deeds ensure peace and reward.',
      },
      {
        ayah: 113,
        quran: 'وَقَالَتِ الْيَهُودُ لَيْسَتِ النَّصَارَىٰ عَلَىٰ شَيْءٍ...',
        meaning:
          "The Jews say, 'The Christians have nothing [true] to stand on,' and the Christians say, 'The Jews have nothing to stand on,' while they both recite the Scripture...",
        explanation: 'Each group rejects the other despite shared divine origins.',
      },
      {
        ayah: 114,
        quran: 'وَمَنْ أَظْلَمُ مِمَّن مَّنَعَ مَسَاجِدَ اللَّهِ...',
        meaning:
          'And who are more unjust than those who prevent the name of Allah from being mentioned in His mosques and strive toward their destruction...',
        explanation: 'Condemns those who block worship or desecrate holy places.',
      },
      {
        ayah: 115,
        quran: 'وَلِلَّهِ الْمَشْرِقُ وَالْمَغْرِبُ...',
        meaning:
          'And to Allah belong the east and the west. So wherever you [might] turn, there is the Face of Allah...',
        explanation: 'Allah’s presence encompasses all directions.',
      },
      {
        ayah: 116,
        quran: 'وَقَالُوا اتَّخَذَ اللَّهُ وَلَدًا...',
        meaning:
          "They say, 'Allah has taken a son.' Exalted is He! Rather, to Him belongs whatever is in the heavens and the earth...",
        explanation: 'Refutes the claim that Allah has offspring.',
      },
      {
        ayah: 117,
        quran: 'بَدِيعُ السَّمَاوَاتِ وَالْأَرْضِ...',
        meaning:
          "Originator of the heavens and the earth. When He decrees a matter, He only says to it, 'Be,' and it is.",
        explanation: 'Affirms Allah’s creative power and command.',
      },
      {
        ayah: 118,
        quran: 'وَقَالَ الَّذِينَ لَا يَعْلَمُونَ...',
        meaning: "Those who do not know say, 'Why does Allah not speak to us or there come to us a sign?'...",
        explanation: 'Their demands for miracles resemble the obstinacy of earlier nations.',
      },
      {
        ayah: 119,
        quran: 'إِنَّا أَرْسَلْنَاكَ بِالْحَقِّ بَشِيرًا وَنَذِيرًا...',
        meaning: 'Indeed, We have sent you with the truth as a bringer of good tidings and a warner...',
        explanation: 'The Prophet’s duty is to convey the message, not control belief.',
      },
      {
        ayah: 120,
        quran: 'وَلَن تَرْضَىٰ عَنكَ الْيَهُودُ وَلَا النَّصَارَىٰ...',
        meaning: 'And never will the Jews or the Christians approve of you until you follow their religion...',
        explanation: 'Believers are commanded to follow divine guidance, not please others.',
      },
      {
        ayah: 121,
        quran: 'الَّذِينَ آتَيْنَاهُمُ الْكِتَابَ يَتْلُونَهُ حَقَّ تِلَاوَتِهِ...',
        meaning: 'Those to whom We have given the Book recite it with its true recital—they believe in it...',
        explanation: 'True followers of previous scriptures recognize the Quran’s truth.',
      },
      {
        ayah: 122,
        quran: 'يَا بَنِي إِسْرَائِيلَ اذْكُرُوا نِعْمَتِيَ...',
        meaning:
          'O Children of Israel, remember My favor which I have bestowed upon you and that I preferred you over the worlds.',
        explanation: 'A reminder to the Israelites to be grateful for Allah’s blessings.',
      },
      {
        ayah: 123,
        quran: 'وَاتَّقُوا يَوْمًا لَّا تَجْزِي نَفْسٌ...',
        meaning: 'And fear a Day when no soul will suffice for another...',
        explanation: 'Each soul will be accountable for its own deeds.',
      },
      {
        ayah: 124,
        quran: 'وَإِذِ ابْتَلَىٰ إِبْرَاهِيمَ رَبُّهُ بِكَلِمَاتٍ...',
        meaning: 'And [mention] when Abraham was tried by his Lord with commands and he fulfilled them...',
        explanation: 'Abraham’s faith and obedience earned him leadership.',
      },
      {
        ayah: 125,
        quran: 'وَإِذْ جَعَلْنَا الْبَيْتَ مَثَابَةً لِّلنَّاسِ...',
        meaning: 'And when We made the House a place of return for the people and security...',
        explanation: 'The Ka‘bah is established as a sacred and peaceful place of worship.',
      },
      {
        ayah: 126,
        quran: 'وَإِذْ قَالَ إِبْرَاهِيمُ رَبِّ اجْعَلْ هَـٰذَا بَلَدًا آمِنًا...',
        meaning:
          "And [mention] when Abraham said, 'My Lord, make this a secure city and provide its people with fruits...'",
        explanation: 'Abraham prayed for Makkah’s safety and sustenance.',
      },
      {
        ayah: 127,
        quran: 'وَإِذْ يَرْفَعُ إِبْرَاهِيمُ الْقَوَاعِدَ مِنَ الْبَيْتِ...',
        meaning:
          "And [mention] when Abraham was raising the foundations of the House and [with him] Ishmael, saying, 'Our Lord, accept [this] from us...'",
        explanation: 'Their humility and devotion during the Ka‘bah’s construction are praised.',
      },
      {
        ayah: 128,
        quran: 'رَبَّنَا وَاجْعَلْنَا مُسْلِمَيْنِ لَكَ...',
        meaning:
          'Our Lord, and make us Muslims [in submission] to You and from our descendants a Muslim nation to You...',
        explanation: 'A prayer for a faithful lineage devoted to Allah.',
      },
      {
        ayah: 129,
        quran: 'رَبَّنَا وَابْعَثْ فِيهِمْ رَسُولًا...',
        meaning:
          'Our Lord, and send among them a messenger from themselves who will recite to them Your verses and teach them the Book and wisdom...',
        explanation: 'This supplication was fulfilled through Prophet Muhammad ﷺ.',
      },
      {
        ayah: 130,
        quran: 'وَمَن يَرْغَبُ عَن مِّلَّةِ إِبْرَاهِيمَ...',
        meaning: 'And who would be averse to the religion of Abraham except one who makes a fool of himself...',
        explanation: 'Abraham’s monotheistic path is the pure and true religion.',
      },
      {
        ayah: 131,
        quran: 'إِذْ قَالَ لَهُ رَبُّهُ أَسْلِمْ...',
        meaning: "When his Lord said to him, 'Submit,' he said, 'I have submitted to the Lord of the worlds.'",
        explanation: 'Abraham’s complete surrender exemplifies true faith.',
      },
      {
        ayah: 132,
        quran: 'وَوَصَّىٰ بِهَا إِبْرَاهِيمُ بَنِيهِ...',
        meaning:
          "And Abraham instructed his sons [to do the same] and [so did] Jacob, [saying], 'O my sons, indeed Allah has chosen for you this religion...'",
        explanation: 'The prophets emphasized steadfastness in Islam.',
      },
      {
        ayah: 133,
        quran: 'أَمْ كُنتُمْ شُهَدَاءَ إِذْ حَضَرَ يَعْقُوبَ الْمَوْتُ...',
        meaning:
          "Or were you witnesses when death approached Jacob, when he said to his sons, 'What will you worship after me?'...",
        explanation: 'Jacob’s final counsel affirmed devotion to one God.',
      },
      {
        ayah: 134,
        quran: 'تِلْكَ أُمَّةٌ قَدْ خَلَتْ...',
        meaning:
          'That was a nation which has passed on. It will have [the consequence of] what it earned, and you will have what you earn...',
        explanation: 'Each generation is accountable for its own deeds.',
      },
      {
        ayah: 135,
        quran: 'وَقَالُوا كُونُوا هُودًا أَوْ نَصَارَىٰ تَهْتَدُوا...',
        meaning:
          "They say, 'Be Jews or Christians [so] you will be guided.' Say, 'Rather, [we follow] the religion of Abraham, inclining toward truth...'",
        explanation: 'True guidance is found in following Abraham’s monotheism.',
      },
      {
        ayah: 136,
        quran: 'قُولُوا آمَنَّا بِاللَّهِ وَمَا أُنزِلَ إِلَيْنَا...',
        meaning:
          "Say, 'We have believed in Allah and what has been revealed to us and what was revealed to Abraham, Ishmael, Isaac, Jacob, and the Descendants...'",
        explanation: 'Islam affirms belief in all prophets and scriptures.',
      },
      {
        ayah: 137,
        quran: 'فَإِنْ آمَنُوا بِمِثْلِ مَا آمَنتُم بِهِ...',
        meaning: 'So if they believe in the same as you believe in, then they have been rightly guided...',
        explanation: 'Unity in faith brings guidance; rejection leads to division.',
      },
      {
        ayah: 138,
        quran: 'صِبْغَةَ اللَّهِ وَمَنْ أَحْسَنُ مِنَ اللَّهِ صِبْغَةً...',
        meaning: 'The color of Allah – and who is better than Allah in coloring? And we are worshippers of Him.',
        explanation: 'Faith in Allah purifies one’s identity and purpose.',
      },
      {
        ayah: 139,
        quran: 'قُلْ أَتُحَاجُّونَنَا فِي اللَّهِ...',
        meaning: "Say, 'Do you argue with us about Allah while He is our Lord and your Lord?...'",
        explanation: 'Faith is not inherited identity but conscious submission to Allah.',
      },
      {
        ayah: 140,
        quran: 'أَمْ تَقُولُونَ إِنَّ إِبْرَاهِيمَ وَإِسْمَاعِيلَ...',
        meaning:
          'Or do you say that Abraham and Ishmael and Isaac and Jacob and the Descendants were Jews or Christians?...',
        explanation: 'Rejects the false claim that earlier prophets followed later religions.',
      },
      {
        ayah: 141,
        quran: 'تِلْكَ أُمَّةٌ قَدْ خَلَتْ...',
        meaning:
          'That was a nation which has passed on. It will have what it earned, and you will have what you earn...',
        explanation: 'Reiterates accountability of every community.',
      },
      {
        ayah: 142,
        quran: 'سَيَقُولُ السُّفَهَاءُ مِنَ النَّاسِ مَا وَلَّاهُمْ...',
        meaning:
          "The foolish among the people will say, 'What has turned them away from their qiblah, which they used to face?'...",
        explanation: 'Refers to the change of prayer direction from Jerusalem to Makkah.',
      },
      {
        ayah: 143,
        quran: 'وَكَذَٰلِكَ جَعَلْنَاكُمْ أُمَّةً وَسَطًا...',
        meaning: 'And thus We have made you a just community that you will be witnesses over the people...',
        explanation: 'Muslims are made a balanced nation to uphold justice and faith.',
      },
      {
        ayah: 144,
        quran: 'قَدْ نَرَىٰ تَقَلُّبَ وَجْهِكَ فِي السَّمَاءِ...',
        meaning:
          'We have certainly seen the turning of your face toward the heaven, and We will surely turn you to a qiblah with which you will be pleased...',
        explanation: 'Allah commands the Prophet to face the Ka‘bah in prayer.',
      },
      {
        ayah: 145,
        quran: 'وَلَئِنْ أَتَيْتَ الَّذِينَ أُوتُوا الْكِتَابَ بِكُلِّ آيَةٍ مَّا تَبِعُوا قِبْلَتَكَ...',
        meaning:
          'And even if you brought to those who were given the Scripture every sign, they would not follow your qiblah...',
        explanation:
          'Despite clear signs, some people refuse to accept the change of qiblah due to arrogance and pride.',
      },
      {
        ayah: 146,
        quran: 'الَّذِينَ آتَيْنَاهُمُ الْكِتَابَ يَعْرِفُونَهُ كَمَا يَعْرِفُونَ أَبْنَاءَهُمْ...',
        meaning:
          'Those to whom We gave the Scripture recognize him as they recognize their own sons. But indeed, a party of them conceal the truth while they know it.',
        explanation: 'Many from the People of the Book knew the Prophet’s truth yet hid it deliberately.',
      },
      {
        ayah: 147,
        quran: 'الْحَقُّ مِن رَّبِّكَ فَلَا تَكُونَنَّ مِنَ الْمُمْتَرِينَ',
        meaning: 'The truth is from your Lord, so never be among the doubters.',
        explanation: 'Allah affirms that His revelation is the absolute truth, leaving no room for doubt.',
      },
      {
        ayah: 148,
        quran: 'وَلِكُلٍّ وِجْهَةٌ هُوَ مُوَلِّيهَا فَاسْتَبِقُوا الْخَيْرَاتِ...',
        meaning: 'For each is a direction toward which it faces, so race to [all that is] good...',
        explanation: 'All people face different directions, but believers should compete in doing good deeds.',
      },
      {
        ayah: 149,
        quran: 'وَمِنْ حَيْثُ خَرَجْتَ فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ...',
        meaning: 'So from wherever you go out [for prayer], turn your face toward al-Masjid al-Haram...',
        explanation: 'Reaffirms the command for Muslims to face the Ka‘bah during prayer.',
      },
      {
        ayah: 150,
        quran: 'وَمِنْ حَيْثُ خَرَجْتَ فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ...',
        meaning:
          'And from wherever you go out [for prayer], turn your face toward al-Masjid al-Haram and wherever you [believers] may be, turn your faces toward it...',
        explanation: 'The change of qiblah is emphasized for all believers as a mark of unity.',
      },
      {
        ayah: 151,
        quran: 'كَمَا أَرْسَلْنَا فِيكُمْ رَسُولًا مِّنكُمْ...',
        meaning:
          'Just as We have sent among you a Messenger from yourselves reciting to you Our verses and purifying you...',
        explanation: 'The Prophet’s mission is to teach, purify, and guide believers through divine revelation.',
      },
      {
        ayah: 152,
        quran: 'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ',
        meaning: 'So remember Me; I will remember you. And be grateful to Me and do not deny Me.',
        explanation: 'A mutual remembrance — Allah honors those who remember and thank Him.',
      },
      {
        ayah: 153,
        quran: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ...',
        meaning: 'O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.',
        explanation: 'Patience and prayer are keys to endurance and divine support.',
      },
      {
        ayah: 154,
        quran: 'وَلَا تَقُولُوا لِمَن يُقْتَلُ فِي سَبِيلِ اللَّهِ أَمْوَاتٌ...',
        meaning:
          "And do not say about those who are killed in the way of Allah, 'They are dead.' Rather, they are alive, but you perceive not.",
        explanation: 'Martyrs live on in a higher state of existence with their Lord.',
      },
      {
        ayah: 155,
        quran: 'وَلَنَبْلُوَنَّكُم بِشَيْءٍ مِّنَ الْخَوْفِ وَالْجُوعِ...',
        meaning:
          'And We will surely test you with something of fear and hunger and a loss of wealth and lives and fruits, but give good tidings to the patient.',
        explanation: 'Tests are part of life, meant to strengthen faith and patience.',
      },
      {
        ayah: 156,
        quran: 'الَّذِينَ إِذَا أَصَابَتْهُم مُّصِيبَةٌ قَالُوا إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ',
        meaning: "Who, when disaster strikes them, say, 'Indeed we belong to Allah, and indeed to Him we will return.'",
        explanation: 'A statement of surrender and acceptance in the face of trials.',
      },
      {
        ayah: 157,
        quran: 'أُولَٰئِكَ عَلَيْهِمْ صَلَوَاتٌ مِّن رَّبِّهِمْ وَرَحْمَةٌ...',
        meaning:
          'Those are the ones upon whom are blessings from their Lord and mercy. And it is those who are rightly guided.',
        explanation: 'Allah rewards the patient with mercy and guidance.',
      },
      {
        ayah: 158,
        quran: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ...',
        meaning:
          'Indeed, Safa and Marwah are among the symbols of Allah. So whoever makes Hajj or ‘Umrah – there is no blame upon him for walking between them...',
        explanation: 'Clarifies the religious legitimacy of Sa‘i (walking between Safa and Marwah).',
      },
      {
        ayah: 159,
        quran: 'إِنَّ الَّذِينَ يَكْتُمُونَ مَا أَنزَلْنَا...',
        meaning:
          'Indeed, those who conceal what We sent down of clear proofs and guidance after We made it clear for the people...',
        explanation: 'Condemns those who hide divine truths for worldly gain.',
      },
      {
        ayah: 160,
        quran: 'إِلَّا الَّذِينَ تَابُوا وَأَصْلَحُوا وَبَيَّنُوا...',
        meaning: 'Except for those who repent and correct themselves and make evident what they concealed...',
        explanation: 'Repentance and transparency earn Allah’s forgiveness.',
      },
      {
        ayah: 161,
        quran: 'إِنَّ الَّذِينَ كَفَرُوا وَمَاتُوا وَهُمْ كُفَّارٌ...',
        meaning:
          'Indeed, those who disbelieve and die while they are disbelievers – upon them will be the curse of Allah and of the angels and the people, all together.',
        explanation: 'The eternal consequence of disbelief is divine rejection.',
      },
      {
        ayah: 162,
        quran: 'خَالِدِينَ فِيهَا لَا يُخَفَّفُ عَنْهُمُ الْعَذَابُ...',
        meaning:
          'Abiding eternally therein; the punishment will not be lightened for them, nor will they be reprieved.',
        explanation: 'Their punishment is unending and without relief.',
      },
      {
        ayah: 163,
        quran: 'وَإِلَٰهُكُمْ إِلَٰهٌ وَاحِدٌ لَّا إِلَٰهَ إِلَّا هُوَ الرَّحْمَٰنُ الرَّحِيمُ',
        meaning:
          'And your god is one God. There is no deity except Him, the Entirely Merciful, the Especially Merciful.',
        explanation: 'Reaffirms monotheism—the foundation of faith.',
      },
      {
        ayah: 164,
        quran: 'إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ...',
        meaning:
          'Indeed, in the creation of the heavens and the earth, and the alternation of the night and day, and the ships that sail through the sea...',
        explanation: 'The universe itself is a sign of Allah’s wisdom and power.',
      },
      {
        ayah: 165,
        quran: 'وَمِنَ النَّاسِ مَن يَتَّخِذُ مِن دُونِ اللَّهِ أَندَادًا...',
        meaning:
          'And [yet], among the people are those who take other than Allah as equals [to Him]; they love them as they [should] love Allah...',
        explanation: 'Condemns associating partners with Allah; true love belongs to Him alone.',
      },
      {
        ayah: 166,
        quran: 'إِذْ تَبَرَّأَ الَّذِينَ اتُّبِعُوا مِنَ الَّذِينَ اتَّبَعُوا...',
        meaning:
          'When those who were followed disassociate themselves from those who followed [them], and they all see the punishment...',
        explanation: 'Leaders and followers of falsehood will turn against each other in regret.',
      },
      {
        ayah: 167,
        quran: 'وَقَالَ الَّذِينَ اتَّبَعُوا لَوْ أَنَّ لَنَا كَرَّةً...',
        meaning:
          "And those who followed will say, 'If only we had another turn, we would disassociate ourselves from them as they have disassociated from us.'...",
        explanation: 'Regret will be useless on the Day of Judgment.',
      },
      {
        ayah: 168,
        quran: 'يَا أَيُّهَا النَّاسُ كُلُوا مِمَّا فِي الْأَرْضِ حَلَالًا طَيِّبًا...',
        meaning:
          'O mankind, eat from whatever is on earth [that is] lawful and good and do not follow the footsteps of Satan...',
        explanation: 'Encourages lawful consumption and warns against Satanic temptation.',
      },
      {
        ayah: 169,
        quran: 'إِنَّمَا يَأْمُرُكُم بِالسُّوءِ وَالْفَحْشَاءِ...',
        meaning: 'He only orders you to evil and immorality and to say about Allah what you do not know.',
        explanation: 'Satan’s aim is to mislead people into sin and falsehood.',
      },
      {
        ayah: 170,
        quran: 'وَإِذَا قِيلَ لَهُمُ اتَّبِعُوا مَا أَنزَلَ اللَّهُ...',
        meaning:
          "And when it is said to them, 'Follow what Allah has revealed,' they say, 'Rather, we will follow that which we found our fathers doing.'...",
        explanation: 'Warns against blind imitation of ancestral traditions without truth.',
      },
      {
        ayah: 171,
        quran: 'وَمَثَلُ الَّذِينَ كَفَرُوا كَمَثَلِ الَّذِي يَنْعِقُ...',
        meaning:
          'The example of those who disbelieve is like that of one who shouts at what hears nothing but calls and cries...',
        explanation: 'Compares the heedless disbelievers to animals hearing sounds but not understanding meaning.',
      },
      {
        ayah: 172,
        quran: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُلُوا مِن طَيِّبَاتِ...',
        meaning:
          'O you who have believed, eat from the good things which We have provided for you and be grateful to Allah...',
        explanation: 'Believers are reminded to enjoy lawful food with gratitude.',
      },
      {
        ayah: 173,
        quran: 'إِنَّمَا حَرَّمَ عَلَيْكُمُ الْمَيْتَةَ وَالدَّمَ...',
        meaning:
          'He has only forbidden to you carrion, blood, the flesh of swine, and that which has been dedicated to other than Allah...',
        explanation: 'Clarifies forbidden foods, emphasizing necessity exceptions.',
      },
      {
        ayah: 174,
        quran: 'إِنَّ الَّذِينَ يَكْتُمُونَ مَا أَنزَلَ اللَّهُ...',
        meaning: 'Indeed, those who conceal what Allah has sent down of the Book and exchange it for a small price...',
        explanation: 'Condemns those who distort divine scripture for worldly gain.',
      },
      {
        ayah: 175,
        quran: 'أُولَٰئِكَ الَّذِينَ اشْتَرَوُا الضَّلَالَةَ بِالْهُدَىٰ...',
        meaning: 'Those are the ones who have purchased error [in exchange] for guidance...',
        explanation: 'Choosing misguidance over truth leads to torment.',
      },
      {
        ayah: 176,
        quran: 'ذَٰلِكَ بِأَنَّ اللَّهَ نَزَّلَ الْكِتَابَ بِالْحَقِّ...',
        meaning:
          'That is because Allah has sent down the Book in truth. And indeed, those who differ over the Book are in extreme dissension.',
        explanation: 'Those who reject Allah’s revelations fall into confusion and conflict.',
      },
      {
        ayah: 177,
        quran: 'لَّيْسَ الْبِرَّ أَن تُوَلُّوا وُجُوهَكُمْ...',
        meaning:
          'Righteousness is not that you turn your faces toward the east or the west, but [true] righteousness is in one who believes in Allah...',
        explanation: 'Defines true piety as faith, charity, patience, and righteousness, not rituals alone.',
      },
      {
        ayah: 178,
        quran: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الْقِصَاصُ...',
        meaning: 'O you who have believed, prescribed for you is legal retribution for those murdered...',
        explanation: 'Introduces the law of equal justice (qisas) for murder.',
      },
      {
        ayah: 179,
        quran: 'وَلَكُمْ فِي الْقِصَاصِ حَيَاةٌ...',
        meaning: 'And there is for you in legal retribution [saving of] life, O you [people] of understanding...',
        explanation: 'Retribution preserves social order and deters crime.',
      },
      {
        ayah: 180,
        quran: 'كُتِبَ عَلَيْكُمْ إِذَا حَضَرَ أَحَدَكُمُ الْمَوْتُ...',
        meaning:
          'Prescribed for you when death approaches any of you, if he leaves wealth, is that he should make a bequest...',
        explanation: 'Encourages fair will-making for parents and relatives.',
      },
      {
        ayah: 181,
        quran: 'فَمَن بَدَّلَهُ بَعْدَمَا سَمِعَهُ...',
        meaning: 'Then whoever alters it after he has heard it – the sin is only upon those who have altered it...',
        explanation: 'Tampering with wills is a grave sin.',
      },
      {
        ayah: 182,
        quran: 'فَمَنْ خَافَ مِن مُّوصٍ جَنَفًا أَوْ إِثْمًا...',
        meaning: 'But if one fears from the bequeather [some] error or sin and corrects that which is between them...',
        explanation: 'Permits mediation if a will is unjust or biased.',
      },
      {
        ayah: 183,
        quran: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ...',
        meaning:
          'O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous.',
        explanation: 'Fasting is prescribed for spiritual purification and discipline.',
      },
      {
        ayah: 184,
        quran: 'أَيَّامًا مَّعْدُودَاتٍ...',
        meaning:
          'Fasting [for] a limited number of days. So whoever among you is ill or on a journey [during them] – then an equal number of days [are to be made up]...',
        explanation: 'Allows exemptions and compensations for fasting difficulties.',
      },
      {
        ayah: 185,
        quran: 'شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ...',
        meaning: "The month of Ramadan [is that] in which was revealed the Qur'an, a guidance for the people...",
        explanation: 'Defines Ramadan as a month of fasting and divine revelation.',
      },
      {
        ayah: 186,
        quran: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي...',
        meaning:
          'And when My servants ask you concerning Me – indeed I am near. I respond to the invocation of the supplicant when he calls upon Me...',
        explanation: 'Allah’s closeness encourages direct prayer and faith.',
      },
      {
        ayah: 187,
        quran: 'أُحِلَّ لَكُمْ لَيْلَةَ الصِّيَامِ الرَّفَثُ إِلَىٰ نِسَائِكُمْ...',
        meaning:
          'It has been made permissible for you the night preceding fasting to go to your wives [for sexual relations]...',
        explanation: 'Clarifies lawful marital relations and rules during fasting nights.',
      },
      {
        ayah: 188,
        quran: 'وَلَا تَأْكُلُوا أَمْوَالَكُم بَيْنَكُم بِالْبَاطِلِ...',
        meaning: 'And do not consume one another’s wealth unjustly or send it [in bribery] to the rulers...',
        explanation: 'Prohibits corruption, bribery, and unjust enrichment.',
      },
      {
        ayah: 189,
        quran: 'يَسْأَلُونَكَ عَنِ الْأَهِلَّةِ...',
        meaning:
          "They ask you about the new moons. Say, 'They are measurements of time for the people and for Hajj.'...",
        explanation: 'The moon cycles mark religious and social timings like Ramadan and Hajj.',
      },
      {
        ayah: 190,
        quran: 'وَقَاتِلُوا فِي سَبِيلِ اللَّهِ الَّذِينَ يُقَاتِلُونَكُمْ...',
        meaning:
          'Fight in the way of Allah those who fight you but do not transgress. Indeed, Allah does not like transgressors.',
        explanation: 'Permits self-defense but forbids aggression.',
      },
      {
        ayah: 191,
        quran: 'وَاقْتُلُوهُمْ حَيْثُ ثَقِفْتُمُوهُمْ...',
        meaning: 'And kill them wherever you overtake them and expel them from wherever they have expelled you...',
        explanation: 'Fighting oppression is just; however, limits must be observed.',
      },
      {
        ayah: 192,
        quran: 'فَإِنِ انتَهَوْا فَإِنَّ اللَّهَ غَفُورٌ رَّحِيمٌ',
        meaning: 'But if they cease, then indeed, Allah is Forgiving and Merciful.',
        explanation: 'If the enemy stops hostilities, peace is the preferred path.',
      },
      {
        ayah: 193,
        quran: 'وَقَاتِلُوهُمْ حَتَّىٰ لَا تَكُونَ فِتْنَةٌ...',
        meaning: 'Fight them until there is no [more] oppression and [until] worship is for Allah...',
        explanation: 'The goal of combat is justice and religious freedom, not domination.',
      },
      {
        ayah: 194,
        quran: 'الشَّهْرُ الْحَرَامُ بِالشَّهْرِ الْحَرَامِ...',
        meaning: 'Fighting in the sacred month is for [aggression committed in] the sacred month...',
        explanation: 'Justice must be maintained even in sacred times.',
      },
      {
        ayah: 195,
        quran: 'وَأَنفِقُوا فِي سَبِيلِ اللَّهِ وَلَا تُلْقُوا بِأَيْدِيكُمْ...',
        meaning:
          'And spend in the way of Allah and do not throw [yourselves] with your [own] hands into destruction...',
        explanation: 'Encourages charity and warns against withholding wealth or self-destruction.',
      },
      {
        ayah: 196,
        quran: 'وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ...',
        meaning:
          'And complete the Hajj and ‘Umrah for Allah. But if you are prevented, then [offer] what can be obtained with ease of sacrificial animals...',
        explanation: 'Outlines rulings for performing Hajj and ‘Umrah properly.',
      },
      {
        ayah: 197,
        quran: 'الْحَجُّ أَشْهُرٌ مَّعْلُومَاتٌ...',
        meaning:
          'Hajj is [during] well-known months, so whoever has made Hajj obligatory upon himself therein [by entering the state of ihram] – there is to be no sexual relations, disobedience, or disputing during Hajj...',
        explanation: 'Sets the moral and spiritual etiquette for Hajj.',
      },
      {
        ayah: 198,
        quran: 'لَيْسَ عَلَيْكُمْ جُنَاحٌ أَن تَبْتَغُوا فَضْلًا مِّن رَّبِّكُمْ...',
        meaning: 'There is no blame upon you for seeking bounty from your Lord [during Hajj, e.g., trade]...',
        explanation: 'Permits lawful trade during pilgrimage while maintaining devotion.',
      },
      {
        ayah: 199,
        quran: 'ثُمَّ أَفِيضُوا مِنْ حَيْثُ أَفَاضَ النَّاسُ...',
        meaning: 'Then depart from the place from where [all] the people depart and ask forgiveness of Allah...',
        explanation: 'Instructs pilgrims to follow the collective rites and seek Allah’s mercy.',
      },
      {
        ayah: 200,
        quran: 'فَإِذَا قَضَيْتُم مَّنَاسِكَكُمْ فَاذْكُرُوا اللَّهَ...',
        meaning:
          'And when you have completed your rites, remember Allah like your remembrance of your fathers or with much greater remembrance...',
        explanation: 'After Hajj, believers are urged to keep Allah’s remembrance alive.',
      },
      {
        ayah: 201,
        quran:
          'وَمِنْهُم مَّن يَقُولُ رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
        meaning:
          "And among them are those who say, 'Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.'",
        explanation: 'A balanced supplication seeking both worldly and eternal well-being.',
      },
      {
        ayah: 202,
        quran: 'أُولَٰئِكَ لَهُمْ نَصِيبٌ مِّمَّا كَسَبُوا وَاللَّهُ سَرِيعُ الْحِسَابِ',
        meaning: 'Those will have a share of what they have earned, and Allah is swift in account.',
        explanation: 'Rewards are based on one’s deeds, and Allah’s judgment is just and quick.',
      },
      {
        ayah: 203,
        quran: 'وَاذْكُرُوا اللَّهَ فِي أَيَّامٍ مَّعْدُودَاتٍ...',
        meaning:
          'And remember Allah during [specific] numbered days. Then whoever hastens [his departure] in two days – there is no sin upon him...',
        explanation: 'Refers to the days of Tashreeq during Hajj and the flexibility in their observance.',
      },
      {
        ayah: 204,
        quran: 'وَمِنَ النَّاسِ مَن يُعْجِبُكَ قَوْلُهُ فِي الْحَيَاةِ الدُّنْيَا...',
        meaning:
          'And of the people is he whose speech pleases you in worldly life, and he calls Allah to witness as to what is in his heart, yet he is the fiercest of opponents.',
        explanation: 'Describes hypocrites who use persuasive speech but act with hostility.',
      },
      {
        ayah: 205,
        quran: 'وَإِذَا تَوَلَّىٰ سَعَىٰ فِي الْأَرْضِ لِيُفْسِدَ فِيهَا...',
        meaning:
          'And when he goes away, he strives throughout the land to cause corruption therein and destroy crops and animals...',
        explanation: 'Warns against hypocritical behavior that causes destruction and harm.',
      },
      {
        ayah: 206,
        quran: 'وَإِذَا قِيلَ لَهُ اتَّقِ اللَّهَ أَخَذَتْهُ الْعِزَّةُ بِالْإِثْمِ...',
        meaning: "And when it is said to him, 'Fear Allah,' pride in the sin takes hold of him...",
        explanation: 'Arrogance blinds the sinner from accepting guidance or correction.',
      },
      {
        ayah: 207,
        quran: 'وَمِنَ النَّاسِ مَن يَشْرِي نَفْسَهُ ابْتِغَاءَ مَرْضَاتِ اللَّهِ...',
        meaning: 'And of the people is he who sells himself, seeking means to the approval of Allah...',
        explanation: 'Praises those who sacrifice themselves for the sake of Allah’s pleasure.',
      },
      {
        ayah: 208,
        quran: 'يَا أَيُّهَا الَّذِينَ آمَنُوا ادْخُلُوا فِي السِّلْمِ كَافَّةً...',
        meaning: 'O you who have believed, enter into Islam completely and do not follow the footsteps of Satan...',
        explanation: 'Encourages full submission to Islam and warns against partial faith.',
      },
      {
        ayah: 209,
        quran: 'فَإِن زَلَلْتُم مِّن بَعْدِ مَا جَاءَتْكُمُ الْبَيِّنَاتُ...',
        meaning:
          'But if you slip after clear proofs have come to you, then know that Allah is Exalted in Might and Wise.',
        explanation: 'Falling into sin after receiving guidance invites Allah’s justice.',
      },
      {
        ayah: 210,
        quran: 'هَلْ يَنظُرُونَ إِلَّا أَن يَأْتِيَهُمُ اللَّهُ فِي ظُلَلٍ مِّنَ الْغَمَامِ...',
        meaning: 'Do they await but that Allah should come to them in covers of clouds and the angels [as well]...',
        explanation: 'Criticizes disbelief until witnessing divine signs when it’s too late.',
      },
      {
        ayah: 211,
        quran: 'سَلْ بَنِي إِسْرَائِيلَ كَمْ آتَيْنَاهُم مِّنْ آيَةٍ بَيِّنَةٍ...',
        meaning: 'Ask the Children of Israel how many a clear sign We gave them...',
        explanation: 'Recalls Israel’s repeated receipt of signs and their continued defiance.',
      },
      {
        ayah: 212,
        quran: 'زُيِّنَ لِلَّذِينَ كَفَرُوا الْحَيَاةُ الدُّنْيَا...',
        meaning: 'Beautified for those who disbelieve is the worldly life, and they ridicule those who believe...',
        explanation: 'Worldly allure deceives disbelievers, but believers gain higher rewards.',
      },
      {
        ayah: 213,
        quran: 'كَانَ النَّاسُ أُمَّةً وَاحِدَةً...',
        meaning:
          'Mankind was [of] one religion [before their deviation]; then Allah sent the prophets as bringers of good tidings and warners...',
        explanation: 'Prophets were sent to resolve disputes and restore divine unity.',
      },
      {
        ayah: 214,
        quran: 'أَمْ حَسِبْتُمْ أَن تَدْخُلُوا الْجَنَّةَ...',
        meaning:
          'Or do you think that you will enter Paradise while such [trial] has not yet come to you as came to those who passed before you?...',
        explanation: 'Believers must expect trials like earlier nations faced to attain faith’s reward.',
      },
      {
        ayah: 215,
        quran: 'يَسْأَلُونَكَ مَاذَا يُنفِقُونَ...',
        meaning:
          "They ask you, [O Muhammad], what they should spend. Say, 'Whatever you spend of good is [to be] for parents and relatives and orphans and the needy and the traveler.'...",
        explanation: 'Charity should begin with close kin and extend to all in need.',
      },
      {
        ayah: 216,
        quran: 'كُتِبَ عَلَيْكُمُ الْقِتَالُ وَهُوَ كُرْهٌ لَّكُمْ...',
        meaning: 'Fighting has been enjoined upon you while it is hateful to you...',
        explanation: 'Sometimes what believers dislike (struggle) is ultimately for their good.',
      },
      {
        ayah: 217,
        quran: 'يَسْأَلُونَكَ عَنِ الشَّهْرِ الْحَرَامِ قِتَالٍ فِيهِ...',
        meaning: 'They ask you about fighting in the sacred month...',
        explanation: 'Clarifies rulings on combat during sacred months and the hypocrisy of opponents.',
      },
      {
        ayah: 218,
        quran: 'إِنَّ الَّذِينَ آمَنُوا وَالَّذِينَ هَاجَرُوا وَجَاهَدُوا...',
        meaning: 'Indeed, those who have believed and those who have emigrated and fought in the cause of Allah...',
        explanation: 'Honors those who sacrifice for Allah through migration and striving.',
      },
      {
        ayah: 219,
        quran: 'يَسْأَلُونَكَ عَنِ الْخَمْرِ وَالْمَيْسِرِ...',
        meaning: 'They ask you about wine and gambling...',
        explanation: 'Acknowledges some benefit but emphasizes their greater sin and harm.',
      },
      {
        ayah: 220,
        quran: 'فِي الدُّنْيَا وَالْآخِرَةِ ۗ وَيَسْأَلُونَكَ عَنِ الْيَتَامَىٰ...',
        meaning: "And they ask you about orphans. Say, 'Improvement for them is best.'...",
        explanation: 'Encourages care and fairness in dealing with orphans’ property.',
      },
      {
        ayah: 221,
        quran: 'وَلَا تَنكِحُوا الْمُشْرِكَاتِ حَتَّىٰ يُؤْمِنَّ...',
        meaning: 'Do not marry polytheistic women until they believe...',
        explanation: 'Prohibits intermarriage with idolaters to preserve faith and family values.',
      },
      {
        ayah: 222,
        quran: 'وَيَسْأَلُونَكَ عَنِ الْمَحِيضِ...',
        meaning: "They ask you about menstruation. Say, 'It is harm, so keep away from wives during menstruation...' ",
        explanation: 'Explains rulings on sexual relations during menstruation.',
      },
      {
        ayah: 223,
        quran: 'نِسَاؤُكُمْ حَرْثٌ لَّكُمْ...',
        meaning:
          'Your wives are a place of sowing of seed for you, so come to your place of cultivation however you wish...',
        explanation: 'Encourages mutual respect and understanding in marital relations.',
      },
      {
        ayah: 224,
        quran: 'وَلَا تَجْعَلُوا اللَّهَ عُرْضَةً لِّأَيْمَانِكُمْ...',
        meaning: 'Do not make [your oath by] Allah an excuse against being righteous and fearing Allah...',
        explanation: 'Prohibits misuse of oaths to avoid good deeds or justice.',
      },
      {
        ayah: 225,
        quran: 'لَّا يُؤَاخِذُكُمُ اللَّهُ بِاللَّغْوِ فِي أَيْمَانِكُمْ...',
        meaning: 'Allah will not impose blame upon you for what is meaningless in your oaths...',
        explanation: 'Unintentional oaths are excused, but deliberate ones require accountability.',
      },
      {
        ayah: 226,
        quran: 'لِّلَّذِينَ يُؤْلُونَ مِن نِّسَائِهِمْ...',
        meaning:
          'For those who swear not to have sexual relations with their wives is a waiting time of four months...',
        explanation: 'Sets limits on separation vows to protect marital harmony.',
      },
      {
        ayah: 227,
        quran: 'وَإِنْ عَزَمُوا الطَّلَاقَ فَإِنَّ اللَّهَ سَمِيعٌ عَلِيمٌ',
        meaning: 'And if they decide on divorce – then indeed, Allah is Hearing and Knowing.',
        explanation: 'Confirms that Allah is aware of all marital intentions and actions.',
      },
      {
        ayah: 228,
        quran: 'وَالْمُطَلَّقَاتُ يَتَرَبَّصْنَ بِأَنفُسِهِنَّ ثَلَاثَةَ قُرُوءٍ...',
        meaning: 'Divorced women shall wait three menstrual cycles before remarrying...',
        explanation: 'Defines the waiting period (‘iddah) for divorced women to ensure clarity and justice.',
      },
      {
        ayah: 229,
        quran: 'الطَّلَاقُ مَرَّتَانِ...',
        meaning:
          'Divorce is twice. Then, either keep [her] in an acceptable manner or release [her] with good treatment...',
        explanation: 'Limits divorce to two revocable instances and enforces fairness.',
      },
      {
        ayah: 230,
        quran: 'فَإِن طَلَّقَهَا فَلَا تَحِلُّ لَهُ مِن بَعْدُ...',
        meaning:
          'And if he has divorced her [for the third time], then she is not lawful to him afterward until she marries another husband...',
        explanation: 'After a third divorce, reunion requires lawful remarriage first.',
      },
      {
        ayah: 231,
        quran: 'وَإِذَا طَلَّقْتُمُ النِّسَاءَ فَبَلَغْنَ أَجَلَهُنَّ...',
        meaning:
          'When you divorce women and they reach their waiting period, then either retain them honorably or release them honorably...',
        explanation: 'Commanded to act with dignity and fairness in divorce matters.',
      },
      {
        ayah: 232,
        quran: 'وَإِذَا طَلَّقْتُمُ النِّسَاءَ فَبَلَغْنَ أَجَلَهُنَّ فَلَا تَعْضُلُوهُنَّ...',
        meaning:
          'When you divorce women and they reach their term, do not prevent them from remarrying their [former] husbands if they agree among themselves in a lawful manner...',
        explanation: 'Protects women’s freedom to remarry and prohibits unjust restrictions.',
      },
      {
        ayah: 233,
        quran: 'وَالْوَالِدَاتُ يُرْضِعْنَ أَوْلَادَهُنَّ حَوْلَيْنِ كَامِلَيْنِ...',
        meaning:
          'Mothers may breastfeed their children two complete years for whoever wishes to complete the nursing [period]...',
        explanation: 'Encourages breastfeeding and fair parental responsibility.',
      },
      {
        ayah: 234,
        quran: 'وَالَّذِينَ يُتَوَفَّوْنَ مِنكُمْ وَيَذَرُونَ أَزْوَاجًا...',
        meaning:
          'And those who are taken in death among you and leave wives behind – they shall wait four months and ten [days]...',
        explanation: 'Defines the ‘iddah for widows to observe before remarrying.',
      },
      {
        ayah: 235,
        quran: 'وَلَا جُنَاحَ عَلَيْكُمْ فِيمَا عَرَّضْتُم بِهِ...',
        meaning:
          'There is no blame upon you for that to which you [indirectly] allude concerning a proposal to women...',
        explanation: 'Allows indirect marriage proposals during the waiting period with modesty.',
      },
      {
        ayah: 236,
        quran: 'لَّا جُنَاحَ عَلَيْكُمْ إِن طَلَّقْتُمُ النِّسَاءَ مَا لَمْ تَمَسُّوهُنَّ...',
        meaning:
          'There is no blame upon you if you divorce women you have not touched nor specified for them an obligation...',
        explanation: 'Clarifies rulings on divorce before consummation or dowry agreement.',
      },
      {
        ayah: 237,
        quran: 'وَإِن طَلَّقْتُمُوهُنَّ مِن قَبْلِ أَن تَمَسُّوهُنَّ...',
        meaning:
          'And if you divorce them before you have touched them and you have already specified for them an obligation...',
        explanation: 'Half the dowry is due unless waived by the woman or the husband.',
      },
      {
        ayah: 238,
        quran: 'حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ...',
        meaning:
          'Maintain with care the [obligatory] prayers and [especially] the middle prayer and stand before Allah devoutly obedient.',
        explanation: 'Stresses consistency and humility in performing prayers.',
      },
      {
        ayah: 239,
        quran: 'فَإِنْ خِفْتُمْ فَرِجَالًا أَوْ رُكْبَانًا...',
        meaning: 'And if you fear [an enemy], then pray on foot or riding...',
        explanation: 'Allows flexibility in prayer during times of fear or travel.',
      },
      {
        ayah: 240,
        quran: 'وَالَّذِينَ يُتَوَفَّوْنَ مِنكُمْ وَيَذَرُونَ أَزْوَاجًا وَصِيَّةً...',
        meaning:
          'Those who are taken in death among you and leave wives behind – a bequest must be made for them of maintenance for one year without turning them out...',
        explanation: 'Initially granted widows a year of support before abrogation by the ‘iddah rule.',
      },
      {
        ayah: 241,
        quran: 'وَلِلْمُطَلَّقَاتِ مَتَاعٌ بِالْمَعْرُوفِ...',
        meaning: 'And for divorced women is a provision according to what is acceptable – a duty upon the righteous.',
        explanation: 'Encourages kindness and financial support for divorced women.',
      },
      {
        ayah: 242,
        quran: 'كَذَٰلِكَ يُبَيِّنُ اللَّهُ لَكُمْ آيَاتِهِ...',
        meaning: 'Thus does Allah make clear to you His verses that you might use reason.',
        explanation: 'Reinforces reflection and wisdom in understanding divine laws.',
      },
      {
        ayah: 243,
        quran: 'أَلَمْ تَرَ إِلَى الَّذِينَ خَرَجُوا مِن دِيَارِهِمْ...',
        meaning: 'Have you not considered those who left their homes in many thousands, fearing death?...',
        explanation: 'A parable showing that life and death are in Allah’s hands alone.',
      },
      {
        ayah: 244,
        quran: 'وَقَاتِلُوا فِي سَبِيلِ اللَّهِ وَاعْلَمُوا أَنَّ اللَّهَ سَمِيعٌ عَلِيمٌ',
        meaning: 'And fight in the cause of Allah and know that Allah is Hearing and Knowing.',
        explanation: 'Encourages believers to stand for justice with faith and awareness.',
      },
      {
        ayah: 245,
        quran: 'مَّن ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا...',
        meaning: 'Who is it that would loan Allah a goodly loan so He may multiply it for him many times over?',
        explanation: 'Encourages charity with the metaphor of a divine loan rewarded manifold.',
      },
      {
        ayah: 246,
        quran: 'أَلَمْ تَرَ إِلَى الْمَلَإِ مِن بَنِي إِسْرَائِيلَ...',
        meaning:
          "Have you not considered the assembly of the Children of Israel after [the time of] Moses when they said to a prophet of theirs, 'Send to us a king, and we will fight in the way of Allah'...",
        explanation: 'Introduces the story of Saul (Talut) and Israel’s request for leadership.',
      },
      {
        ayah: 247,
        quran: 'وَقَالَ لَهُمْ نَبِيُّهُمْ إِنَّ اللَّهَ قَدْ بَعَثَ لَكُمْ طَالُوتَ مَلِكًا...',
        meaning: "Their prophet said to them, 'Indeed, Allah has appointed Saul (Talut) as king over you.'...",
        explanation: 'Describes the divine selection of Saul and the people’s initial objection.',
      },
      {
        ayah: 248,
        quran: 'وَقَالَ لَهُمْ نَبِيُّهُمْ إِنَّ آيَةَ مُلْكِهِ...',
        meaning:
          "And their prophet said to them, 'Indeed, a sign of his kingship is that the chest (Ark of the Covenant) will come to you...' ",
        explanation: 'Confirms Saul’s kingship through a miraculous return of the sacred Ark.',
      },
      {
        ayah: 249,
        quran: 'فَلَمَّا فَصَلَ طَالُوتُ بِالْجُنُودِ...',
        meaning:
          "And when Saul went forth with the soldiers, he said, 'Indeed, Allah will be testing you with a river...' ",
        explanation: 'Narrates the divine test of obedience during Saul’s campaign.',
      },
      {
        ayah: 250,
        quran: 'وَلَمَّا بَرَزُوا لِجَالُوتَ وَجُنُودِهِ...',
        meaning:
          "And when they went forth to [face] Goliath and his soldiers, they said, 'Our Lord, pour upon us patience and plant firmly our feet and give us victory over the disbelieving people.'",
        explanation: 'A powerful prayer of steadfastness uttered before the battle with Goliath.',
      },
      {
        ayah: 251,
        quran: 'فَهَزَمُوهُم بِإِذْنِ اللَّهِ وَقَتَلَ دَاوُودُ جَالُوتَ...',
        meaning:
          'So they defeated them by permission of Allah, and David killed Goliath, and Allah gave him the kingship and wisdom and taught him of what He willed...',
        explanation: 'Describes David’s victory over Goliath and Allah’s favor upon him.',
      },
      {
        ayah: 252,
        quran: 'تِلْكَ آيَاتُ اللَّهِ نَتْلُوهَا عَلَيْكَ بِالْحَقِّ...',
        meaning:
          'These are the verses of Allah which We recite to you, [O Muhammad], in truth. And indeed, you are among the messengers.',
        explanation: 'Affirms the divine truth of the revelations and Muhammad’s prophethood.',
      },
      {
        ayah: 253,
        quran: 'تِلْكَ الرُّسُلُ فَضَّلْنَا بَعْضَهُمْ عَلَىٰ بَعْضٍ...',
        meaning:
          'Those messengers—We have preferred some over others. Among them were those to whom Allah spoke, and He raised some of them in degree...',
        explanation: 'Acknowledges the varying ranks among prophets, all serving divine purpose.',
      },
      {
        ayah: 254,
        quran: 'يَا أَيُّهَا الَّذِينَ آمَنُوا أَنفِقُوا مِمَّا رَزَقْنَاكُم...',
        meaning:
          'O you who have believed, spend from that which We have provided for you before there comes a Day in which there is no exchange or friendship or intercession...',
        explanation: 'Urges charity and good deeds before the Day of Judgment.',
      },
      {
        ayah: 255,
        quran: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...',
        meaning: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of [all] existence...',
        explanation: 'Known as *Ayat-ul-Kursi*, this verse exalts Allah’s absolute sovereignty and knowledge.',
      },
      {
        ayah: 256,
        quran: 'لَا إِكْرَاهَ فِي الدِّينِ...',
        meaning:
          'There shall be no compulsion in [acceptance of] the religion. The right course has become clear from the wrong...',
        explanation: 'Affirms freedom of faith and clarity of truth.',
      },
      {
        ayah: 257,
        quran: 'اللَّهُ وَلِيُّ الَّذِينَ آمَنُوا يُخْرِجُهُم مِّنَ الظُّلُمَاتِ إِلَى النُّورِ...',
        meaning: 'Allah is the ally of those who believe. He brings them out from darknesses into the light...',
        explanation: 'Describes Allah’s guidance versus the deception of false deities.',
      },
      {
        ayah: 258,
        quran: 'أَلَمْ تَرَ إِلَى الَّذِي حَاجَّ إِبْرَاهِيمَ فِي رَبِّهِ...',
        meaning:
          'Have you not considered the one who argued with Abraham about his Lord because Allah had given him kingship?...',
        explanation: 'Recounts Abraham’s debate with a tyrant about Allah’s power over life and death.',
      },
      {
        ayah: 259,
        quran: 'أَوْ كَالَّذِي مَرَّ عَلَىٰ قَرْيَةٍ وَهِيَ خَاوِيَةٌ عَلَىٰ عُرُوشِهَا...',
        meaning:
          "Or [consider] the one who passed by a township which had fallen into ruin. He said, 'How will Allah bring this to life after its death?'...",
        explanation: 'Allah revives him after 100 years as a sign of His power to resurrect.',
      },
      {
        ayah: 260,
        quran: 'وَإِذْ قَالَ إِبْرَاهِيمُ رَبِّ أَرِنِي كَيْفَ تُحْيِي الْمَوْتَىٰ...',
        meaning: "And [mention] when Abraham said, 'My Lord, show me how You give life to the dead.'...",
        explanation: 'Abraham’s request for reassurance leads to the parable of reviving birds.',
      },
      {
        ayah: 261,
        quran: 'مَثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ...',
        meaning:
          'The example of those who spend their wealth in the way of Allah is like a seed [of grain] that grows seven spikes...',
        explanation: 'Illustrates the immense reward of charity multiplied manifold.',
      },
      {
        ayah: 262,
        quran: 'الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ ثُمَّ لَا يُتْبِعُونَ...',
        meaning:
          'Those who spend their wealth in the way of Allah and then do not follow up what they have spent with reminders or injury...',
        explanation: 'True charity is sincere and not followed by boasting or harm.',
      },
      {
        ayah: 263,
        quran: 'قَوْلٌ مَّعْرُوفٌ وَمَغْفِرَةٌ خَيْرٌ مِّن صَدَقَةٍ...',
        meaning: 'Kind speech and forgiveness are better than charity followed by injury...',
        explanation: 'Gentle words and forgiveness surpass boastful giving.',
      },
      {
        ayah: 264,
        quran: 'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تُبْطِلُوا صَدَقَاتِكُم بِالْمَنِّ وَالْأَذَىٰ...',
        meaning: 'O you who have believed, do not invalidate your charities with reminders or injury...',
        explanation: 'Warns that insincere charity loses its reward.',
      },
      {
        ayah: 265,
        quran: 'وَمَثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمُ ابْتِغَاءَ مَرْضَاتِ اللَّهِ...',
        meaning:
          'And the example of those who spend their wealth seeking Allah’s approval is like a garden on high ground...',
        explanation: 'A parable showing that sincere giving yields multiplied blessings.',
      },
      {
        ayah: 266,
        quran: 'أَيَوَدُّ أَحَدُكُمْ أَن تَكُونَ لَهُ جَنَّةٌ مِّن نَّخِيلٍ وَأَعْنَابٍ...',
        meaning:
          'Would one of you like to have a garden of palm trees and grapevines with rivers flowing beneath it, but then be struck by a whirlwind containing fire?',
        explanation: 'Warns against losing good deeds through hypocrisy or bad endings.',
      },
      {
        ayah: 267,
        quran: 'يَا أَيُّهَا الَّذِينَ آمَنُوا أَنفِقُوا مِن طَيِّبَاتِ مَا كَسَبْتُمْ...',
        meaning: 'O you who have believed, spend from the good things which you have earned...',
        explanation: 'Encourages giving from lawful, quality earnings—not the inferior.',
      },
      {
        ayah: 268,
        quran: 'الشَّيْطَانُ يَعِدُكُمُ الْفَقْرَ وَيَأْمُرُكُم بِالْفَحْشَاءِ...',
        meaning:
          'Satan threatens you with poverty and orders you to immorality, while Allah promises you forgiveness and bounty.',
        explanation: 'Contrasts Satan’s deceit with Allah’s generosity.',
      },
      {
        ayah: 269,
        quran: 'يُؤْتِي الْحِكْمَةَ مَن يَشَاءُ...',
        meaning:
          'He gives wisdom to whom He wills, and whoever has been given wisdom has certainly been given much good...',
        explanation: 'Wisdom is a divine gift leading to righteousness and good judgment.',
      },
      {
        ayah: 270,
        quran: 'وَمَا أَنفَقْتُم مِّن نَّفَقَةٍ أَوْ نَذَرْتُم مِّن نَّذْرٍ...',
        meaning: 'Whatever you spend of expenditures or make of vows—indeed, Allah knows of it...',
        explanation: 'Allah is fully aware of all intentions behind charity and vows.',
      },
      {
        ayah: 271,
        quran: 'إِن تُبْدُوا الصَّدَقَاتِ فَنِعِمَّا هِيَ...',
        meaning:
          'If you disclose your charitable expenditures, they are good; but if you conceal them and give them to the poor, it is better for you...',
        explanation: 'Secret charity is more rewarding and purifies the giver.',
      },
      {
        ayah: 272,
        quran: 'لَّيْسَ عَلَيْكَ هُدَاهُمْ وَلَٰكِنَّ اللَّهَ يَهْدِي مَن يَشَاءُ...',
        meaning: 'Not upon you [O Muhammad] is [responsibility for] their guidance, but Allah guides whom He wills...',
        explanation: 'Reminds that guidance is Allah’s domain; humans must only deliver truth.',
      },
      {
        ayah: 273,
        quran: 'لِلْفُقَرَاءِ الَّذِينَ أُحْصِرُوا فِي سَبِيلِ اللَّهِ...',
        meaning: '[Charity is] for the poor who have been restricted for the cause of Allah...',
        explanation: 'Defines those most deserving of charity—those devoted to Allah’s cause.',
      },
      {
        ayah: 274,
        quran: 'الَّذِينَ يُنفِقُونَ أَمْوَالَهُم بِاللَّيْلِ وَالنَّهَارِ...',
        meaning:
          'Those who spend their wealth [in Allah’s way] by night and by day, secretly and publicly, will have their reward with their Lord...',
        explanation: 'Praise for continuous, sincere giving regardless of time or manner.',
      },
      {
        ayah: 275,
        quran: 'الَّذِينَ يَأْكُلُونَ الرِّبَا لَا يَقُومُونَ إِلَّا كَمَا يَقُومُ...',
        meaning:
          'Those who consume interest cannot stand [on the Day of Resurrection] except as one stands who is being beaten by Satan into insanity...',
        explanation: 'Condemns usury and its corrupting moral and social impact.',
      },
      {
        ayah: 276,
        quran: 'يَمْحَقُ اللَّهُ الرِّبَا وَيُرْبِي الصَّدَقَاتِ...',
        meaning: 'Allah destroys interest and gives increase for charities...',
        explanation: 'Contrasts the ruinous effect of usury with the blessing in charity.',
      },
      {
        ayah: 277,
        quran: 'إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ...',
        meaning:
          'Indeed, those who believe and do righteous deeds and establish prayer and give zakah will have their reward with their Lord...',
        explanation: 'Defines the righteous as those devoted to faith, prayer, and charity.',
      },
      {
        ayah: 278,
        quran: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَذَرُوا مَا بَقِيَ...',
        meaning:
          'O you who have believed, fear Allah and give up what remains [due to you] of interest, if you should be believers.',
        explanation: 'Commands believers to abandon all forms of interest.',
      },
      {
        ayah: 279,
        quran: 'فَإِن لَّمْ تَفْعَلُوا فَأْذَنُوا بِحَرْبٍ...',
        meaning: 'If you do not, then be informed of a war [against you] from Allah and His Messenger...',
        explanation: 'Severe warning against those who persist in usury.',
      },
      {
        ayah: 280,
        quran: 'وَإِن كَانَ ذُو عُسْرَةٍ فَنَظِرَةٌ إِلَىٰ مَيْسَرَةٍ...',
        meaning: 'If the debtor is in difficulty, then grant him time until it is easy [for him to repay]...',
        explanation: 'Encourages compassion and patience toward debtors in hardship.',
      },
      {
        ayah: 281,
        quran: 'وَاتَّقُوا يَوْمًا تُرْجَعُونَ فِيهِ إِلَى اللَّهِ...',
        meaning:
          'And fear a Day when you will be returned to Allah. Then every soul will be compensated for what it earned...',
        explanation: 'Final warning about accountability before Allah.',
      },
      {
        ayah: 282,
        quran: 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا تَدَايَنتُم بِدَيْنٍ إِلَىٰ أَجَلٍ مُّسَمًّى فَاكْتُبُوهُ...',
        meaning: 'O you who have believed, when you contract a debt for a specified term, write it down...',
        explanation: 'Longest verse in the Qur’an—outlines comprehensive financial ethics.',
      },
      {
        ayah: 283,
        quran: 'وَإِن كُنتُمْ عَلَىٰ سَفَرٍ وَلَمْ تَجِدُوا كَاتِبًا...',
        meaning: 'And if you are on a journey and cannot find a scribe, then a security deposit should be taken...',
        explanation: 'Provides guidance for securing trust and documentation during transactions.',
      },
      {
        ayah: 284,
        quran: 'لِّلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ...',
        meaning: 'To Allah belongs whatever is in the heavens and whatever is in the earth...',
        explanation: 'Emphasizes Allah’s absolute ownership and knowledge of all deeds.',
      },
      {
        ayah: 285,
        quran: 'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ...',
        meaning: 'The Messenger has believed in what was revealed to him from his Lord, and [so have] the believers...',
        explanation: 'Expresses the faith and submission of the Prophet and believers.',
      },
      {
        ayah: 286,
        quran: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا...',
        meaning: 'Allah does not burden a soul beyond that it can bear...',
        explanation: 'Concludes with mercy, forgiveness, and reliance upon Allah’s justice.',
      },
    ],
  },
]
