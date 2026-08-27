"use strict";

/* =========================================================
   LAB ESCAPE: The Missing Sample
   Vanilla JS game logic. No external dependencies.
   ========================================================= */

/* ---------------- Safe storage (falls back to memory) ---------------- */
const safeStorage = (() => {
  let ok = true;
  try {
    localStorage.setItem("__le_test__", "1");
    localStorage.removeItem("__le_test__");
  } catch (e) {
    ok = false;
  }
  const mem = {};
  return {
    get(key, fallback) {
      try {
        if (ok) {
          const v = localStorage.getItem(key);
          return v === null ? fallback : JSON.parse(v);
        }
      } catch (e) {}
      return key in mem ? mem[key] : fallback;
    },
    set(key, val) {
      try {
        if (ok) {
          localStorage.setItem(key, JSON.stringify(val));
          return;
        }
      } catch (e) {}
      mem[key] = val;
    },
  };
})();

/* ---------------- Translations ---------------- */
const T = {
  en: {
    appTitle: "LAB ESCAPE",
    appSubtitle: "The Missing Sample",
    introLine1: "The lab was supposed to be quiet today...",
    introLine2: "Until one sample disappeared.",
    startBtn: "START INVESTIGATION",
    chooseLanguage: "Choose your language",
    continueBtn: "Continue",
    backBtn: "Back",
    closeBtn: "Close",
    settingsTitle: "Settings",
    languageLabel: "Language",
    menuBreakRoom: "Break Room",
    menuBreakRoomLocked: "Locked — finish the case first",
    menuSettings: "Settings",
    menuBestScore: "Best Score",
    hudScore: "Score",
    hudCombo: "Combo",
    hudXP: "XP",
    rankJunior: "Junior Technician",
    rankMid: "Technician",
    rankSenior: "Lead Investigator",

    l1Title: "Level 1 · Sample Sorting",
    l1Instructions: "Tap a tube, then tap the bin where it belongs.",
    l1Complete: "Nice start. 🔬",
    l1MistakeToast: "Wrong bin — try again.",
    l1BinCulture: "Culture",
    l1BinFluid: "Fluid",
    l1BinCell: "Cell",
    l1BinPowder: "Powder",
    l1TimeUp: "Time's up!",
    l1Mistakes: "Mistakes",
    l1Time: "Time",

    l2Title: "Level 2 · Find the Error",
    l2Instructions: "Report B has one wrong detail. Tap the row that doesn't match Report A.",
    l2ReportA: "Report A",
    l2ReportB: "Report B",
    l2Correct: "Good catch! 👀",
    l2Wrong: "Not that one 😅",
    l2Complete: "Sharp eyes. The report really was changed.",
    l2Round: "Round",
    f_id: "Sample ID",
    f_weight: "Weight (g)",
    f_temp: "Temp (°C)",
    f_ph: "pH",
    f_tech: "Technician",

    l3Title: "Level 3 · Memory Test",
    l3Instructions: "Watch the sequence, then repeat it in the same order.",
    l3Watch: "Watch closely...",
    l3YourTurn: "Your turn!",
    l3Correct: "Perfect memory! ⭐",
    l3Wrong: "That's not quite the order 😅",
    l3Complete: "That sequence meant something...",
    l3Round: "Round",

    l4Title: "Level 4 · Microscope Hunt",
    l4Instructions: "Find all the unusual samples before time runs out.",
    l4Found: "Found",
    l4TimeUp: "Time's up!",
    l4Complete: "Something was hidden in these records...",
    l4Accuracy: "Accuracy",
    l4Time: "Time",

    l5Title: "Level 5 · The Missing Sample",
    l5Intro: "The missing sample was last seen somewhere in the lab. Check every location.",
    l5RoomMicroscope: "Microscope Room",
    l5RoomChemistry: "Chemistry Room",
    l5RoomStorage: "Storage",
    l5RoomDesk: "Computer Desk",
    l5ClueFound: "Clue found!",
    l5AllClues: "You've gathered every clue. Ready to solve the case?",
    l5SolveBtn: "Solve the Case",
    l5Checked: "Checked",

    clueMicroscope: "A sticky note under the microscope: 'Borrowed for open-day demo — will return by 5!'",
    clueChemistry: "An empty shelf where the sample should be, and a faint smell of orange peel.",
    clueStorage: "A box labeled 'DEMO KIT' pushed behind the spare gloves.",
    clueDesk: "The sign-out sheet has one name circled twice — a very familiar colleague.",

    endingTitle: "CASE SOLVED! 🧪🏆",
    endingTwist: "The 'missing' sample wasn't stolen — it was borrowed for the open-day demo and never logged back in.",
    endingLine1: "Looks like you still know your way around a lab. 😌",
    endingLine2: "Whatever comes next, you're pretty good at figuring things out. ❤️",
    playAgainBtn: "PLAY AGAIN",
    statsScore: "Final Score",
    statsXP: "Total XP",
    statsAchievements: "Achievements",

    storyLevel1: "A sample is missing.",
    storyLevel2: "Someone changed the report.",
    storyLevel3: "The sample log contains a strange sequence.",
    storyLevel4: "Something was hidden in the microscope records.",
    storyLevel5: "The clues point to one location.",

    d_afterL1_naina: "Nice sorting! Though I'm pretty sure tube #3 was judging you. 😂",
    d_beforeL2_ira: "Wait. Something about that report doesn't match.",
    d_afterL2_naina: "Told you something was fishy!",
    d_beforeL3_sana: "Let's look at the sample log again — maybe the order means something.",
    d_afterL3_ira: "That sequence isn't random. It's a pattern.",
    d_beforeL4_naina: "Ooh, microscope time. Try not to blink.",
    d_afterL4_sana: "Something was hidden in these records...",
    d_afterL4_naina_hint: "By the way... did you check the storage room? 😂",

    missionPerfectTitle: "Perfect Technician",
    missionPerfectDesc: "Complete 3 challenges without a mistake.",
    achievementUnlocked: "Achievement unlocked!",
    achSpeed: "Speed Runner",
    achSpeedDesc: "Finish Level 1 with time to spare.",
    achSharp: "Sharp Eyes",
    achSharpDesc: "Spot every error on the first try.",
    achSherlock: "Sherlock",
    achSherlockDesc: "Find every clue in the lab.",

    gameOverTitle: "Out of lives!",
    gameOverDesc: "Take a breath and try again.",
    retryBtn: "Try Again",
    menuBtn: "Main Menu",

    breakRoomTitle: "Break Room",
    br1: "Naina: One more coffee mix-up and I'm writing an incident report. ☕😂",
    br2: "Ira: Please update the sample log on time next round.",
    br3: "Sana: You solved the whole case. Nicely done.",
    bonusXp: "Bonus XP!",
    livePlus: "Extra life earned!",
  },

  hi: {
    appTitle: "LAB ESCAPE",
    appSubtitle: "गायब सैंपल",
    introLine1: "आज लैब में सन्नाटा होना चाहिए था...",
    introLine2: "फिर एक सैंपल गायब हो गया।",
    startBtn: "जांच शुरू करें",
    chooseLanguage: "अपनी भाषा चुनें",
    continueBtn: "आगे बढ़ें",
    backBtn: "वापस",
    closeBtn: "बंद करें",
    settingsTitle: "सेटिंग्स",
    languageLabel: "भाषा",
    menuBreakRoom: "ब्रेक रूम",
    menuBreakRoomLocked: "लॉक है — पहले केस सुलझाओ",
    menuSettings: "सेटिंग्स",
    menuBestScore: "सर्वश्रेष्ठ स्कोर",
    hudScore: "स्कोर",
    hudCombo: "कॉम्बो",
    hudXP: "एक्सपी",
    rankJunior: "जूनियर टेक्नीशियन",
    rankMid: "टेक्नीशियन",
    rankSenior: "लीड इन्वेस्टिगेटर",

    l1Title: "लेवल 1 · सैंपल छाँटना",
    l1Instructions: "एक ट्यूब पर टैप करो, फिर सही डिब्बे पर टैप करो।",
    l1Complete: "अच्छी शुरुआत। 🔬",
    l1MistakeToast: "गलत डिब्बा — फिर कोशिश करो।",
    l1BinCulture: "कल्चर",
    l1BinFluid: "फ्लूइड",
    l1BinCell: "सेल",
    l1BinPowder: "पाउडर",
    l1TimeUp: "समय खत्म!",
    l1Mistakes: "गलतियाँ",
    l1Time: "समय",

    l2Title: "लेवल 2 · गलती ढूँढो",
    l2Instructions: "रिपोर्ट B में एक गलत जानकारी है। जो लाइन रिपोर्ट A से मेल नहीं खाती, उस पर टैप करो।",
    l2ReportA: "रिपोर्ट A",
    l2ReportB: "रिपोर्ट B",
    l2Correct: "पकड़ लिया! 👀",
    l2Wrong: "ये वाली नहीं थी 😅",
    l2Complete: "नज़र तो तेज़ है तुम्हारी। रिपोर्ट सच में बदली गई थी।",
    l2Round: "राउंड",
    f_id: "सैंपल आईडी",
    f_weight: "वज़न (g)",
    f_temp: "तापमान (°C)",
    f_ph: "pH",
    f_tech: "टेक्नीशियन",

    l3Title: "लेवल 3 · याददाश्त टेस्ट",
    l3Instructions: "क्रम को ध्यान से देखो, फिर वैसे ही दोहराओ।",
    l3Watch: "ध्यान से देखो...",
    l3YourTurn: "अब तुम्हारी बारी!",
    l3Correct: "याददाश्त एकदम सही! ⭐",
    l3Wrong: "क्रम थोड़ा गड़बड़ है 😅",
    l3Complete: "इस क्रम का कोई मतलब जरूर है...",
    l3Round: "राउंड",

    l4Title: "लेवल 4 · माइक्रोस्कोप हंट",
    l4Instructions: "समय खत्म होने से पहले सारे अजीब सैंपल ढूँढो।",
    l4Found: "मिले",
    l4TimeUp: "समय खत्म!",
    l4Complete: "इन रिकॉर्ड्स में कुछ छुपाया गया था...",
    l4Accuracy: "सटीकता",
    l4Time: "समय",

    l5Title: "लेवल 5 · गायब सैंपल",
    l5Intro: "गायब सैंपल आखिरी बार लैब में कहीं देखा गया था। हर जगह चेक करो।",
    l5RoomMicroscope: "माइक्रोस्कोप रूम",
    l5RoomChemistry: "केमिस्ट्री रूम",
    l5RoomStorage: "स्टोरेज",
    l5RoomDesk: "कंप्यूटर डेस्क",
    l5ClueFound: "सुराग मिला!",
    l5AllClues: "सारे सुराग मिल गए। अब केस सुलझाने के लिए तैयार हो?",
    l5SolveBtn: "केस सुलझाओ",
    l5Checked: "चेक हो गया",

    clueMicroscope: "माइक्रोस्कोप के नीचे एक चिपकाई हुई पर्ची: 'ओपन-डे डेमो के लिए उधार लिया — 5 बजे तक वापस!'",
    clueChemistry: "एक खाली शेल्फ, जहाँ सैंपल होना चाहिए था, और संतरे के छिलके जैसी हल्की सी खुशबू।",
    clueStorage: "'DEMO KIT' लिखा एक डिब्बा, दस्तानों के पीछे छुपाया हुआ।",
    clueDesk: "साइन-आउट शीट में एक नाम दो बार गोल किया हुआ है — किसी बहुत जाने-पहचाने साथी का।",

    endingTitle: "केस सुलझ गया! 🧪🏆",
    endingTwist: "'गायब' सैंपल चोरी नहीं हुआ था — उसे ओपन-डे डेमो के लिए उधार लिया गया था और वापस लॉग करना कोई भूल गया।",
    endingLine1: "लगता है लैब में अब भी तुम्हारी अच्छी पकड़ है। 😌",
    endingLine2: "आगे जो भी हो, चीज़ें सुलझाने में तो तुम माहिर हो। ❤️",
    playAgainBtn: "फिर से खेलो",
    statsScore: "फाइनल स्कोर",
    statsXP: "कुल एक्सपी",
    statsAchievements: "उपलब्धियाँ",

    storyLevel1: "एक सैंपल गायब है।",
    storyLevel2: "किसी ने रिपोर्ट बदल दी।",
    storyLevel3: "सैंपल लॉग में एक अजीब क्रम है।",
    storyLevel4: "माइक्रोस्कोप रिकॉर्ड्स में कुछ छुपा था।",
    storyLevel5: "सारे सुराग एक ही जगह की तरफ इशारा कर रहे हैं।",

    d_afterL1_naina: "छँटाई तो बढ़िया की, पर मुझे लगता है ट्यूब नंबर 3 तुम्हें घूर रही थी। 😂",
    d_beforeL2_ira: "रुको। इस रिपोर्ट में कुछ तो गड़बड़ है।",
    d_afterL2_naina: "मैंने कहा था न, कुछ तो गड़बड़ है!",
    d_beforeL3_sana: "चलो सैंपल लॉग फिर से देखते हैं — शायद उस क्रम का कोई मतलब हो।",
    d_afterL3_ira: "ये क्रम रैंडम नहीं है। इसमें एक पैटर्न है।",
    d_beforeL4_naina: "ओहो, माइक्रोस्कोप टाइम! पलक झपकाना मत भूल जाना।",
    d_afterL4_sana: "इन रिकॉर्ड्स में कुछ छुपा था...",
    d_afterL4_naina_hint: "वैसे... स्टोरेज रूम चेक किया क्या? 😂",

    missionPerfectTitle: "परफेक्ट टेक्नीशियन",
    missionPerfectDesc: "बिना कोई गलती किए 3 चैलेंज पूरे करो।",
    achievementUnlocked: "उपलब्धि अनलॉक हुई!",
    achSpeed: "स्पीड रनर",
    achSpeedDesc: "लेवल 1 समय बचाकर पूरा करो।",
    achSharp: "तेज़ नज़र",
    achSharpDesc: "पहली बार में ही हर गलती पकड़ो।",
    achSherlock: "शरलॉक",
    achSherlockDesc: "लैब का हर सुराग ढूँढो।",

    gameOverTitle: "जानें खत्म!",
    gameOverDesc: "एक साँस लो और फिर कोशिश करो।",
    retryBtn: "फिर कोशिश करो",
    menuBtn: "मुख्य मेनू",

    breakRoomTitle: "ब्रेक रूम",
    br1: "नैना: कॉफी में एक और गड़बड़ हुई तो मैं रिपोर्ट लिख दूँगी। ☕😂",
    br2: "इरा: अगली बार सैंपल लॉग समय पर अपडेट करना, प्लीज़।",
    br3: "साना: तुमने पूरा केस सुलझा दिया। बढ़िया काम था।",
    bonusXp: "बोनस एक्सपी!",
    livePlus: "एक अतिरिक्त जान मिली!",
  },

  mr: {
    appTitle: "LAB ESCAPE",
    appSubtitle: "हरवलेला नमुना",
    introLine1: "आज लॅबमध्ये शांतता असायला हवी होती...",
    introLine2: "मग एक नमुना अचानक गायब झाला.",
    startBtn: "तपास सुरू करा",
    chooseLanguage: "तुमची भाषा निवडा",
    continueBtn: "पुढे जा",
    backBtn: "मागे",
    closeBtn: "बंद करा",
    settingsTitle: "सेटिंग्ज",
    languageLabel: "भाषा",
    menuBreakRoom: "ब्रेक रूम",
    menuBreakRoomLocked: "लॉक आहे — आधी केस सोडवा",
    menuSettings: "सेटिंग्ज",
    menuBestScore: "सर्वोत्तम गुण",
    hudScore: "गुण",
    hudCombo: "कॉम्बो",
    hudXP: "एक्सपी",
    rankJunior: "ज्युनियर टेक्निशियन",
    rankMid: "टेक्निशियन",
    rankSenior: "लीड इन्व्हेस्टिगेटर",

    l1Title: "लेव्हल 1 · नमुने वर्गीकरण",
    l1Instructions: "एका ट्यूबवर टॅप करा, मग योग्य डब्यावर टॅप करा.",
    l1Complete: "छान सुरुवात. 🔬",
    l1MistakeToast: "चुकीचा डबा — पुन्हा प्रयत्न करा.",
    l1BinCulture: "कल्चर",
    l1BinFluid: "फ्लुइड",
    l1BinCell: "सेल",
    l1BinPowder: "पावडर",
    l1TimeUp: "वेळ संपली!",
    l1Mistakes: "चुका",
    l1Time: "वेळ",

    l2Title: "लेव्हल 2 · चूक शोधा",
    l2Instructions: "रिपोर्ट B मध्ये एक चुकीची माहिती आहे. जी ओळ रिपोर्ट A शी जुळत नाही, तिच्यावर टॅप करा.",
    l2ReportA: "रिपोर्ट A",
    l2ReportB: "रिपोर्ट B",
    l2Correct: "बरोबर पकडलं! 👀",
    l2Wrong: "ही नाही 😅",
    l2Complete: "नजर एकदम तीक्ष्ण आहे तुझी. रिपोर्ट खरंच बदलली होती.",
    l2Round: "फेरी",
    f_id: "सॅम्पल आयडी",
    f_weight: "वजन (g)",
    f_temp: "तापमान (°C)",
    f_ph: "pH",
    f_tech: "टेक्निशियन",

    l3Title: "लेव्हल 3 · स्मरणशक्ती चाचणी",
    l3Instructions: "क्रम नीट बघा, मग तसाच पुन्हा करा.",
    l3Watch: "नीट बघा...",
    l3YourTurn: "आता तुमची पाळी!",
    l3Correct: "स्मरणशक्ती एकदम भारी! ⭐",
    l3Wrong: "क्रम थोडा चुकला 😅",
    l3Complete: "या क्रमाला नक्कीच काहीतरी अर्थ आहे...",
    l3Round: "फेरी",

    l4Title: "लेव्हल 4 · मायक्रोस्कोप हंट",
    l4Instructions: "वेळ संपण्याआधी सगळे विचित्र नमुने शोधा.",
    l4Found: "सापडले",
    l4TimeUp: "वेळ संपली!",
    l4Complete: "या नोंदींमध्ये काहीतरी लपवलं होतं...",
    l4Accuracy: "अचूकता",
    l4Time: "वेळ",

    l5Title: "लेव्हल 5 · हरवलेला नमुना",
    l5Intro: "हरवलेला नमुना शेवटचा लॅबमध्ये कुठेतरी दिसला होता. प्रत्येक जागा तपासा.",
    l5RoomMicroscope: "मायक्रोस्कोप रूम",
    l5RoomChemistry: "केमिस्ट्री रूम",
    l5RoomStorage: "स्टोरेज",
    l5RoomDesk: "कॉम्प्युटर डेस्क",
    l5ClueFound: "धागा सापडला!",
    l5AllClues: "सगळे धागे मिळाले. आता केस सोडवायला तयार आहात?",
    l5SolveBtn: "केस सोडवा",
    l5Checked: "तपासलं",

    clueMicroscope: "मायक्रोस्कोपखाली एक चिकटवलेली चिठ्ठी: 'ओपन-डे डेमोसाठी उसनं घेतलंय — ५ वाजेपर्यंत परत करेन!'",
    clueChemistry: "एक रिकामं शेल्फ, जिथे नमुना असायला हवा होता, आणि संत्र्याच्या सालीसारखा हलका वास.",
    clueStorage: "'DEMO KIT' लिहिलेला एक बॉक्स, हातमोज्यांच्या मागे लपवलेला.",
    clueDesk: "साइन-आउट शीटवर एका नावाला दोनदा गोल केलंय — एका खूप ओळखीच्या सहकाऱ्याचं.",

    endingTitle: "केस सुटली! 🧪🏆",
    endingTwist: "'हरवलेला' नमुना चोरीला गेला नव्हता — तो ओपन-डे डेमोसाठी उसना घेतला होता आणि परत नोंदवायचं कुणीतरी विसरलं.",
    endingLine1: "अजूनही लॅबमध्ये तुझी चांगली पकड आहे असं दिसतंय. 😌",
    endingLine2: "पुढे काहीही येवो, गोष्टी सोडवण्यात तू एकदम पटाईत आहेस. ❤️",
    playAgainBtn: "पुन्हा खेळा",
    statsScore: "अंतिम गुण",
    statsXP: "एकूण एक्सपी",
    statsAchievements: "यश",

    storyLevel1: "एक नमुना गायब आहे.",
    storyLevel2: "कुणीतरी रिपोर्ट बदलली.",
    storyLevel3: "सॅम्पल लॉगमध्ये एक विचित्र क्रम आहे.",
    storyLevel4: "मायक्रोस्कोप नोंदींमध्ये काहीतरी लपवलं होतं.",
    storyLevel5: "सगळे धागे एकाच जागेकडे इशारा करतायत.",

    d_afterL1_naina: "वर्गीकरण मस्त केलंस, पण मला वाटतं ट्यूब नंबर 3 तुझ्याकडे रागाने बघत होती. 😂",
    d_beforeL2_ira: "थांब. या रिपोर्टमध्ये काहीतरी गडबड आहे.",
    d_afterL2_naina: "मी आधीच म्हटलं होतं, काहीतरी गडबड आहे म्हणून!",
    d_beforeL3_sana: "चल, सॅम्पल लॉग परत बघूया — कदाचित त्या क्रमाला काही अर्थ असेल.",
    d_afterL3_ira: "हा क्रम रँडम नाहीये. यात एक पॅटर्न आहे.",
    d_beforeL4_naina: "अरे वा, मायक्रोस्कोप टाइम! डोळे मिचकावायला विसरू नकोस.",
    d_afterL4_sana: "या नोंदींमध्ये काहीतरी लपवलं होतं...",
    d_afterL4_naina_hint: "बाय द वे... स्टोरेज रूम तपासलीस का? 😂",

    missionPerfectTitle: "परफेक्ट टेक्निशियन",
    missionPerfectDesc: "एकही चूक न करता 3 चॅलेंज पूर्ण करा.",
    achievementUnlocked: "यश अनलॉक झालं!",
    achSpeed: "स्पीड रनर",
    achSpeedDesc: "लेव्हल 1 वेळ शिल्लक असताना पूर्ण करा.",
    achSharp: "तीक्ष्ण नजर",
    achSharpDesc: "पहिल्याच प्रयत्नात प्रत्येक चूक पकडा.",
    achSherlock: "शेरलॉक",
    achSherlockDesc: "लॅबमधला प्रत्येक धागा शोधा.",

    gameOverTitle: "जीव संपले!",
    gameOverDesc: "एक दीर्घ श्वास घ्या आणि पुन्हा प्रयत्न करा.",
    retryBtn: "पुन्हा प्रयत्न करा",
    menuBtn: "मुख्य मेनू",

    breakRoomTitle: "ब्रेक रूम",
    br1: "नैना: आणखी एक कॉफीची गडबड झाली तर मी रिपोर्ट लिहिणार. ☕😂",
    br2: "इरा: पुढच्या वेळी सॅम्पल लॉग वेळेवर अपडेट कर, प्लीज.",
    br3: "साना: तू संपूर्ण केस सोडवलीस. मस्त काम केलंस.",
    bonusXp: "बोनस एक्सपी!",
    livePlus: "एक अतिरिक्त जीव मिळाला!",
  },
};

function tr(key) {
  const lang = state.lang || "en";
  return (T[lang] && T[lang][key]) || T.en[key] || key;
}

/* ---------------- Game data ---------------- */
const TUBE_CATEGORIES = ["culture", "fluid", "cell", "powder"];
const TUBE_ICON = { culture: "🧫", fluid: "💧", cell: "🔵", powder: "⚪" };
const TUBE_BIN_KEY = {
  culture: "l1BinCulture",
  fluid: "l1BinFluid",
  cell: "l1BinCell",
  powder: "l1BinPowder",
};

const REPORT_ROUNDS_POOL = [
  {
    a: { f_id: "S-204", f_weight: "18.4", f_temp: "22", f_ph: "7.1", f_tech: "R. Verma" },
    wrongField: "f_weight",
    wrongValue: "19.4",
  },
  {
    a: { f_id: "S-211", f_weight: "9.0", f_temp: "4", f_ph: "6.8", f_tech: "K. Iyer" },
    wrongField: "f_temp",
    wrongValue: "40",
  },
  {
    a: { f_id: "S-233", f_weight: "5.6", f_temp: "-18", f_ph: "7.4", f_tech: "A. Sheikh" },
    wrongField: "f_ph",
    wrongValue: "4.7",
  },
  {
    a: { f_id: "S-248", f_weight: "12.2", f_temp: "-4", f_ph: "6.5", f_tech: "M. Rao" },
    wrongField: "f_id",
    wrongValue: "S-249",
  },
  {
    a: { f_id: "S-260", f_weight: "3.3", f_temp: "37", f_ph: "7.0", f_tech: "P. Nair" },
    wrongField: "f_tech",
    wrongValue: "P. Naik",
  },
];
const REPORT_FIELDS = ["f_id", "f_weight", "f_temp", "f_ph", "f_tech"];

const MEMORY_ICONS = ["🧪", "🔬", "🧫", "💉", "⭐", "📋", "❄️", "🧤"];

const L4_TARGET_ICON = "⭐";
const L4_DECOY_ICON = "🔷";
const L4_NORMAL_ICON = "🔵";

const L5_LOCATIONS = [
  { id: "microscope", icon: "🔬", labelKey: "l5RoomMicroscope", clueKey: "clueMicroscope" },
  { id: "chemistry", icon: "🧪", labelKey: "l5RoomChemistry", clueKey: "clueChemistry" },
  { id: "storage", icon: "📦", labelKey: "l5RoomStorage", clueKey: "clueStorage" },
  { id: "desk", icon: "🖥️", labelKey: "l5RoomDesk", clueKey: "clueDesk" },
];

/* ---------------- State ---------------- */
const state = {
  lang: safeStorage.get("le_lang", null),
  screen: "screen-lang",
  score: 0,
  combo: 0,
  maxCombo: 0,
  xp: 0,
  lives: 3,
  mistakesThisGame: 0,
  perfectLevelStreak: 0,
  perfectLevelsCount: 0,
  achievements: new Set(safeStorage.get("le_achievements", [])),
  bestScore: safeStorage.get("le_best_score", 0),
  breakRoomUnlocked: safeStorage.get("le_break_unlocked", false),
  levelsDone: 0,
};

let level1Timer = null,
  level4Timer = null;

/* ---------------- DOM refs ---------------- */
const $ = (id) => document.getElementById(id);
let els = {};

document.addEventListener("DOMContentLoaded", init);

function init() {
  els = {
    hud: $("hud"),
    hudScoreVal: $("hud-score-val"),
    hudComboVal: $("hud-combo-val"),
    hudComboWrap: $("hud-combo-wrap"),
    hudXpVal: $("hud-xp-val"),
    hudLives: $("hud-lives"),
    hudTubes: $("hud-tubes"),
    btnSettings: $("btn-settings"),
    overlaySettings: $("overlay-settings"),
    overlayDialogue: $("overlay-dialogue"),
    dialogueAvatar: $("dialogue-avatar"),
    dialogueSpeaker: $("dialogue-speaker"),
    dialogueText: $("dialogue-text"),
    dialogueContinue: $("dialogue-continue"),
    overlayToast: $("overlay-toast"),
  };

  if (!state.lang) {
    showScreen("screen-lang");
  } else {
    applyI18nStatic();
    showScreen("screen-menu");
  }

  bindStaticEvents();
  applyI18nStatic();
  renderMenu();
  updateHud();
}

/* ---------------- Screen management ---------------- */
function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  $(id).classList.add("active");
  state.screen = id;
  const inLevel = /^screen-level/.test(id);
  document.body.classList.toggle("in-level", inLevel);
  window.scrollTo(0, 0);
}

/* ---------------- i18n ---------------- */
function applyI18nStatic() {
  document.querySelectorAll("[data-key]").forEach((el) => {
    el.textContent = tr(el.getAttribute("data-key"));
  });
  document.documentElement.lang = state.lang || "en";
  renderMenu();
  updateHud();
}

function selectLanguage(lang) {
  const cameFromLangScreen = state.screen === "screen-lang";
  state.lang = lang;
  safeStorage.set("le_lang", lang);
  applyI18nStatic();
  reRenderActiveLevel();
  if (cameFromLangScreen) showScreen("screen-menu");
}

function reRenderActiveLevel() {
  switch (state.screen) {
    case "screen-level1":
      renderLevel1();
      break;
    case "screen-level2":
      renderLevel2();
      break;
    case "screen-level4":
      renderLevel4();
      break;
    case "screen-level5":
      renderLevel5();
      break;
  }
}

/* ---------------- Static events ---------------- */
function bindStaticEvents() {
  document.querySelectorAll("#screen-lang .lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => selectLanguage(btn.dataset.lang));
  });

  $("btn-start").addEventListener("click", startNewRun);
  $("btn-play-again").addEventListener("click", startNewRun);
  $("btn-retry").addEventListener("click", startNewRun);
  $("btn-menu-from-gameover").addEventListener("click", () => {
    showScreen("screen-menu");
    renderMenu();
  });
  $("btn-breakroom").addEventListener("click", openBreakRoom);
  $("btn-breakroom-back").addEventListener("click", () => showScreen("screen-menu"));

  els.btnSettings.addEventListener("click", () => els.overlaySettings.classList.add("open"));
  $("btn-open-settings-from-menu").addEventListener("click", () => els.overlaySettings.classList.add("open"));
  $("btn-settings-close").addEventListener("click", () => els.overlaySettings.classList.remove("open"));
  document.querySelectorAll("#overlay-settings .lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectLanguage(btn.dataset.lang);
      els.overlaySettings.classList.remove("open");
    });
  });

  $("l5-solve-btn").addEventListener("click", solveCase);
}

function renderMenu() {
  const locked = !state.breakRoomUnlocked;
  $("btn-breakroom").classList.toggle("locked", locked);
  $("btn-breakroom-label").textContent = locked ? tr("menuBreakRoomLocked") : tr("menuBreakRoom");
  $("menu-best-score").textContent = state.bestScore > 0 ? tr("menuBestScore") + ": " + state.bestScore : "";
}

/* ---------------- HUD ---------------- */
function updateHud() {
  els.hudScoreVal.textContent = state.score;
  els.hudComboVal.textContent = "x" + state.combo;
  els.hudComboWrap.classList.toggle("hot", state.combo >= 3);
  els.hudXpVal.textContent = state.xp;

  els.hudLives.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const span = document.createElement("span");
    span.className = "heart" + (i < state.lives ? " full" : " empty");
    span.textContent = i < state.lives ? "❤️" : "🤍";
    els.hudLives.appendChild(span);
  }

  els.hudTubes.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const span = document.createElement("span");
    span.className = "hud-tube" + (i < state.levelsDone ? " filled" : "");
    span.textContent = "🧪";
    els.hudTubes.appendChild(span);
  }
}

function addScore(n) {
  state.score += n;
  updateHud();
}
function addXp(n) {
  state.xp += n;
  updateHud();
  maybeUnlockRankFlash();
}
function maybeUnlockRankFlash() {}

function getRankKey(xp) {
  if (xp >= 100) return "rankSenior";
  if (xp >= 50) return "rankMid";
  return "rankJunior";
}

function registerCorrect() {
  state.combo++;
  state.maxCombo = Math.max(state.maxCombo, state.combo);
  updateHud();
  document.body.dispatchEvent(new Event("le-correct"));
}

function registerMistake(levelMistakeCounterRef) {
  state.combo = 0;
  state.mistakesThisGame++;
  if (levelMistakeCounterRef) levelMistakeCounterRef.count++;
  loseLife();
  updateHud();
}

function loseLife() {
  state.lives = Math.max(0, state.lives - 1);
  updateHud();
  if (state.lives <= 0) {
    setTimeout(() => showScreen("screen-gameover"), 400);
  }
}

function gainLifeIfRoom() {
  if (state.lives < 3) {
    state.lives++;
    updateHud();
    showToast(tr("livePlus"));
  }
}

/* ---------------- Toast ---------------- */
let toastTimer = null;
function showToast(text) {
  els.overlayToast.textContent = text;
  els.overlayToast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.overlayToast.classList.remove("show"), 1800);
}

/* ---------------- Avatar animation helper ---------------- */
function pulseAvatar(el, cls) {
  if (!el) return;
  el.classList.remove("anim-happy", "anim-oops", "anim-think");
  void el.offsetWidth;
  el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), 650);
}

/* ---------------- Dialogue / story overlay ---------------- */
const FRIEND_META = {
  narrator: { name: "", symbol: null },
  maya: { name: "Maya", symbol: "sym-maya" },
  naina: { name: "Naina", symbol: "sym-naina" },
  ira: { name: "Ira", symbol: "sym-ira" },
  sana: { name: "Sana", symbol: "sym-sana" },
};

function showDialogueQueue(items, onDone) {
  let i = 0;
  function next() {
    if (i >= items.length) {
      els.overlayDialogue.classList.remove("open");
      if (onDone) onDone();
      return;
    }
    const item = items[i++];
    const meta = FRIEND_META[item.speaker] || FRIEND_META.narrator;
    els.dialogueSpeaker.textContent = meta.name;
    els.dialogueText.textContent = tr(item.textKey);
    const vb = item.speaker === "maya" ? "0 0 120 220" : "0 0 100 100";
    els.dialogueAvatar.innerHTML = meta.symbol
      ? `<svg class="avatar avatar-${item.speaker}" viewBox="${vb}"><use href="#${meta.symbol}"></use></svg>`
      : "";
    els.dialogueAvatar.classList.toggle("hidden", !meta.symbol);
    els.overlayDialogue.classList.add("open");
  }
  els.dialogueContinue.onclick = next;
  next();
}

/* ---------------- Achievements & missions ---------------- */
function unlockAchievement(key, titleKey, descKey) {
  if (state.achievements.has(key)) return;
  state.achievements.add(key);
  safeStorage.set("le_achievements", Array.from(state.achievements));
  showToast("🏅 " + tr(titleKey));
}

function onLevelComplete(levelMistakes) {
  state.levelsDone++;
  if (levelMistakes === 0) {
    state.perfectLevelStreak++;
    state.perfectLevelsCount++;
    if (state.perfectLevelsCount >= 3) {
      unlockAchievement("perfect3", "missionPerfectTitle", "missionPerfectDesc");
    }
    if (Math.random() < 0.35) {
      addXp(10);
      showToast("🎁 " + tr("bonusXp"));
    }
    if (state.perfectLevelStreak === 2) gainLifeIfRoom();
  } else {
    state.perfectLevelStreak = 0;
  }
  addXp(20);
  updateHud();
}

/* ---------------- Run lifecycle ---------------- */
function startNewRun() {
  state.score = 0;
  state.combo = 0;
  state.maxCombo = 0;
  state.xp = 0;
  state.lives = 3;
  state.mistakesThisGame = 0;
  state.perfectLevelStreak = 0;
  state.perfectLevelsCount = 0;
  state.levelsDone = 0;
  updateHud();
  clearInterval(level1Timer);
  clearInterval(level4Timer);

  showDialogueQueue(
    [
      { speaker: "narrator", textKey: "introLine1" },
      { speaker: "narrator", textKey: "introLine2" },
      { speaker: "narrator", textKey: "storyLevel1" },
    ],
    startLevel1
  );
}

function finishRun() {
  state.bestScore = Math.max(state.bestScore, state.score);
  safeStorage.set("le_best_score", state.bestScore);
  state.breakRoomUnlocked = true;
  safeStorage.set("le_break_unlocked", true);
  renderMenu();

  $("ending-stats-score").textContent = tr("statsScore") + ": " + state.score;
  $("ending-stats-xp").textContent = tr("statsXP") + ": " + state.xp;
  $("ending-stats-rank").textContent = tr(getRankKey(state.xp));
  $("ending-stats-ach").textContent = tr("statsAchievements") + ": " + state.achievements.size;

  showScreen("screen-ending");
}

/* =========================================================
   LEVEL 1 — Sample Sorting
   ========================================================= */
let l1 = { tubes: [], selected: null, mistakes: { count: 0 }, remaining: 0, timeLeft: 60 };

function startLevel1() {
  showScreen("screen-level1");
  l1.tubes = [];
  l1.selected = null;
  l1.mistakes.count = 0;
  l1.timeLeft = 60;

  const cats = [];
  TUBE_CATEGORIES.forEach((c) => {
    cats.push(c, c);
  });
  shuffle(cats);
  cats.forEach((cat, idx) => {
    l1.tubes.push({ id: "t" + idx, cat, sorted: false, code: "S-0" + (100 + Math.floor(Math.random() * 900)) });
  });
  l1.remaining = l1.tubes.length;

  renderLevel1();
  clearInterval(level1Timer);
  level1Timer = setInterval(() => {
    l1.timeLeft--;
    $("l1-time-val").textContent = l1.timeLeft;
    if (l1.timeLeft <= 0) {
      clearInterval(level1Timer);
      showToast(tr("l1TimeUp"));
      setTimeout(finishLevel1, 500);
    }
  }, 1000);
}

function renderLevel1() {
  $("l1-mistakes-val").textContent = l1.mistakes.count;
  $("l1-time-val").textContent = l1.timeLeft;

  const tubesWrap = $("l1-tubes");
  tubesWrap.innerHTML = "";
  l1.tubes.forEach((t) => {
    if (t.sorted) return;
    const b = document.createElement("button");
    b.className = "tube" + (l1.selected === t.id ? " selected" : "");
    b.innerHTML = `<span class="tube-icon">${TUBE_ICON[t.cat]}</span><span class="tube-code">${t.code}</span>`;
    b.addEventListener("click", () => {
      l1.selected = l1.selected === t.id ? null : t.id;
      renderLevel1();
    });
    tubesWrap.appendChild(b);
  });

  const binsWrap = $("l1-bins");
  binsWrap.innerHTML = "";
  TUBE_CATEGORIES.forEach((cat) => {
    const b = document.createElement("button");
    b.className = "bin";
    b.innerHTML = `<span class="bin-icon">${TUBE_ICON[cat]}</span><span class="bin-label">${tr(TUBE_BIN_KEY[cat])}</span>`;
    b.addEventListener("click", () => handleL1BinTap(cat, b));
    binsWrap.appendChild(b);
  });
}

function handleL1BinTap(cat, binEl) {
  if (!l1.selected) return;
  const tube = l1.tubes.find((t) => t.id === l1.selected);
  if (!tube) return;
  if (tube.cat === cat) {
    tube.sorted = true;
    l1.remaining--;
    l1.selected = null;
    addScore(10 + state.combo * 2);
    registerCorrect();
    binEl.classList.add("bin-pop");
    setTimeout(() => binEl.classList.remove("bin-pop"), 400);
    renderLevel1();
    if (l1.remaining <= 0) {
      clearInterval(level1Timer);
      setTimeout(finishLevel1, 400);
    }
  } else {
    l1.selected = null;
    showToast(tr("l1MistakeToast"));
    registerMistake(l1.mistakes);
    renderLevel1();
  }
}

function finishLevel1() {
  clearInterval(level1Timer);
  if (l1.mistakes.count === 0 && l1.timeLeft >= 10) {
    unlockAchievement("speedRunner", "achSpeed", "achSpeedDesc");
  }
  onLevelComplete(l1.mistakes.count);
  showDialogueQueue(
    [
      { speaker: "narrator", textKey: "l1Complete" },
      { speaker: "naina", textKey: "d_afterL1_naina" },
      { speaker: "narrator", textKey: "storyLevel2" },
      { speaker: "ira", textKey: "d_beforeL2_ira" },
    ],
    startLevel2
  );
}

/* =========================================================
   LEVEL 2 — Find the Error
   ========================================================= */
let l2 = { rounds: [], roundIndex: 0, mistakes: { count: 0 } };

function startLevel2() {
  showScreen("screen-level2");
  const pool = shuffle(REPORT_ROUNDS_POOL.slice());
  l2.rounds = pool.slice(0, 3);
  l2.roundIndex = 0;
  l2.mistakes.count = 0;
  renderLevel2();
}

function renderLevel2() {
  const round = l2.rounds[l2.roundIndex];
  $("l2-round-val").textContent = l2.roundIndex + 1 + " / " + l2.rounds.length;
  $("l2-feedback").textContent = "";

  const b = Object.assign({}, round.a);
  b[round.wrongField] = round.wrongValue;

  renderReportCard("l2-report-a", round.a, false, tr("l2ReportA"));
  renderReportCard("l2-report-b", b, true, tr("l2ReportB"), round.wrongField);
}

function renderReportCard(containerId, data, tappable, title, wrongField) {
  const el = $(containerId);
  el.innerHTML = `<h3 class="report-title">${title}</h3>`;
  REPORT_FIELDS.forEach((f) => {
    const row = document.createElement(tappable ? "button" : "div");
    row.className = "report-row" + (tappable ? " tappable" : "");
    row.innerHTML = `<span class="report-label">${tr(f)}</span><span class="report-val">${data[f]}</span>`;
    if (tappable) {
      row.addEventListener("click", () => handleL2Tap(f === wrongField, row));
    }
    el.appendChild(row);
  });
}

function handleL2Tap(isCorrect, rowEl) {
  const feedback = $("l2-feedback");
  if (isCorrect) {
    feedback.textContent = tr("l2Correct");
    feedback.className = "feedback good";
    rowEl.classList.add("row-correct");
    addScore(15 + state.combo * 2);
    registerCorrect();
    setTimeout(() => {
      l2.roundIndex++;
      if (l2.roundIndex >= l2.rounds.length) {
        finishLevel2();
      } else {
        renderLevel2();
      }
    }, 800);
  } else {
    feedback.textContent = tr("l2Wrong");
    feedback.className = "feedback bad";
    rowEl.classList.add("row-wrong");
    registerMistake(l2.mistakes);
    setTimeout(() => rowEl.classList.remove("row-wrong"), 400);
  }
}

function finishLevel2() {
  if (l2.mistakes.count === 0) {
    unlockAchievement("sharpEyes", "achSharp", "achSharpDesc");
  }
  onLevelComplete(l2.mistakes.count);
  showDialogueQueue(
    [
      { speaker: "narrator", textKey: "l2Complete" },
      { speaker: "naina", textKey: "d_afterL2_naina" },
      { speaker: "narrator", textKey: "storyLevel3" },
      { speaker: "sana", textKey: "d_beforeL3_sana" },
    ],
    startLevel3
  );
}

/* =========================================================
   LEVEL 3 — Memory Test
   ========================================================= */
let l3 = { round: 0, maxRounds: 3, sequence: [], input: [], mistakes: { count: 0 }, showing: false };

function startLevel3() {
  showScreen("screen-level3");
  l3.round = 0;
  l3.mistakes.count = 0;
  nextL3Round();
}

function nextL3Round() {
  l3.round++;
  $("l3-round-val").textContent = l3.round + " / " + l3.maxRounds;
  const len = l3.round + 2;
  l3.sequence = [];
  for (let i = 0; i < len; i++) {
    l3.sequence.push(MEMORY_ICONS[Math.floor(Math.random() * MEMORY_ICONS.length)]);
  }
  l3.input = [];
  renderL3Palette();
  playL3Sequence();
}

function renderL3Palette() {
  const wrap = $("l3-palette");
  wrap.innerHTML = "";
  MEMORY_ICONS.forEach((icon) => {
    const b = document.createElement("button");
    b.className = "mem-icon-btn";
    b.textContent = icon;
    b.disabled = true;
    b.addEventListener("click", () => handleL3Input(icon, b));
    wrap.appendChild(b);
  });
  $("l3-player-sequence").textContent = "";
}

function playL3Sequence() {
  l3.showing = true;
  const display = $("l3-sequence-display");
  const status = $("l3-status");
  status.textContent = tr("l3Watch");
  display.textContent = "";
  const avatar = $("l3-avatar");
  if (avatar) pulseAvatar(avatar, "anim-think");

  let i = 0;
  const flashOne = () => {
    if (i >= l3.sequence.length) {
      display.textContent = "";
      status.textContent = tr("l3YourTurn");
      l3.showing = false;
      document.querySelectorAll("#l3-palette .mem-icon-btn").forEach((b) => (b.disabled = false));
      return;
    }
    display.textContent = l3.sequence[i];
    display.classList.add("pop");
    setTimeout(() => {
      display.classList.remove("pop");
      display.textContent = "";
      i++;
      setTimeout(flashOne, 250);
    }, 650);
  };
  document.querySelectorAll("#l3-palette .mem-icon-btn").forEach((b) => (b.disabled = true));
  setTimeout(flashOne, 500);
}

function handleL3Input(icon, btnEl) {
  if (l3.showing) return;
  l3.input.push(icon);
  $("l3-player-sequence").textContent += icon;
  const idx = l3.input.length - 1;
  if (icon !== l3.sequence[idx]) {
    $("l3-status").textContent = tr("l3Wrong");
    $("l3-status").className = "level-status bad";
    registerMistake(l3.mistakes);
    const avatar = $("l3-avatar");
    if (avatar) pulseAvatar(avatar, "anim-oops");
    setTimeout(() => {
      $("l3-status").className = "level-status";
      l3.input = [];
      $("l3-player-sequence").textContent = "";
      playL3Sequence();
    }, 900);
    return;
  }
  if (l3.input.length === l3.sequence.length) {
    $("l3-status").textContent = tr("l3Correct");
    $("l3-status").className = "level-status good";
    addScore(20 + state.combo * 2);
    registerCorrect();
    const avatar = $("l3-avatar");
    if (avatar) pulseAvatar(avatar, "anim-happy");
    setTimeout(() => {
      $("l3-status").className = "level-status";
      if (l3.round >= l3.maxRounds) {
        finishLevel3();
      } else {
        nextL3Round();
      }
    }, 900);
  }
}

function finishLevel3() {
  onLevelComplete(l3.mistakes.count);
  showDialogueQueue(
    [
      { speaker: "narrator", textKey: "l3Complete" },
      { speaker: "ira", textKey: "d_afterL3_ira" },
      { speaker: "narrator", textKey: "storyLevel4" },
      { speaker: "naina", textKey: "d_beforeL4_naina" },
    ],
    startLevel4
  );
}

/* =========================================================
   LEVEL 4 — Microscope Hunt
   ========================================================= */
let l4 = { cells: [], targetTotal: 5, found: 0, correctTaps: 0, wrongTaps: 0, timeLeft: 35, mistakes: { count: 0 } };

function startLevel4() {
  showScreen("screen-level4");
  l4.found = 0;
  l4.correctTaps = 0;
  l4.wrongTaps = 0;
  l4.timeLeft = 35;
  l4.mistakes.count = 0;
  l4.targetTotal = 5;

  const total = 24;
  const decoys = 5;
  const cells = [];
  for (let i = 0; i < l4.targetTotal; i++) cells.push({ icon: L4_TARGET_ICON, isTarget: true, found: false });
  for (let i = 0; i < decoys; i++) cells.push({ icon: L4_DECOY_ICON, isTarget: false, found: false });
  while (cells.length < total) cells.push({ icon: L4_NORMAL_ICON, isTarget: false, found: false });
  shuffle(cells);
  l4.cells = cells;

  renderLevel4();
  clearInterval(level4Timer);
  level4Timer = setInterval(() => {
    l4.timeLeft--;
    $("l4-time-val").textContent = l4.timeLeft;
    if (l4.timeLeft <= 0) {
      clearInterval(level4Timer);
      showToast(tr("l4TimeUp"));
      setTimeout(finishLevel4, 500);
    }
  }, 1000);
}

function renderLevel4() {
  $("l4-found-val").textContent = l4.found + " / " + l4.targetTotal;
  $("l4-time-val").textContent = l4.timeLeft;
  updateL4Accuracy();

  const grid = $("l4-grid");
  grid.innerHTML = "";
  l4.cells.forEach((c, idx) => {
    const b = document.createElement("button");
    b.className = "ms-cell" + (c.found ? " found" : "");
    b.textContent = c.found ? "✅" : c.icon;
    b.disabled = c.found;
    b.addEventListener("click", () => handleL4Tap(idx, b));
    grid.appendChild(b);
  });
}

function updateL4Accuracy() {
  const total = l4.correctTaps + l4.wrongTaps;
  const acc = total === 0 ? 100 : Math.round((l4.correctTaps / total) * 100);
  $("l4-accuracy-val").textContent = acc + "%";
}

function handleL4Tap(idx, btnEl) {
  const c = l4.cells[idx];
  if (c.found) return;
  if (c.isTarget) {
    c.found = true;
    l4.found++;
    l4.correctTaps++;
    addScore(12 + state.combo * 2);
    registerCorrect();
    btnEl.classList.add("found");
    btnEl.textContent = "✅";
    btnEl.disabled = true;
    updateL4Accuracy();
    if (l4.found >= l4.targetTotal) {
      clearInterval(level4Timer);
      setTimeout(finishLevel4, 400);
    }
  } else {
    l4.wrongTaps++;
    registerMistake(l4.mistakes);
    btnEl.classList.add("shake");
    setTimeout(() => btnEl.classList.remove("shake"), 400);
    updateL4Accuracy();
  }
}

function finishLevel4() {
  clearInterval(level4Timer);
  onLevelComplete(l4.mistakes.count);
  showDialogueQueue(
    [
      { speaker: "narrator", textKey: "l4Complete" },
      { speaker: "sana", textKey: "d_afterL4_sana" },
      { speaker: "naina", textKey: "d_afterL4_naina_hint" },
      { speaker: "narrator", textKey: "storyLevel5" },
    ],
    startLevel5
  );
}

/* =========================================================
   LEVEL 5 — The Missing Sample
   ========================================================= */
let l5 = { checked: new Set() };

function startLevel5() {
  showScreen("screen-level5");
  l5.checked = new Set();
  renderLevel5();
}

function renderLevel5() {
  $("l5-intro").textContent = tr("l5Intro");
  const wrap = $("l5-locations");
  wrap.innerHTML = "";
  L5_LOCATIONS.forEach((loc) => {
    const b = document.createElement("button");
    const done = l5.checked.has(loc.id);
    b.className = "location-card" + (done ? " checked" : "");
    b.innerHTML = `<span class="loc-icon">${loc.icon}</span><span class="loc-label">${tr(loc.labelKey)}</span>${
      done ? `<span class="loc-check">✔ ${tr("l5Checked")}</span>` : ""
    }`;
    b.addEventListener("click", () => handleL5Tap(loc));
    wrap.appendChild(b);
  });
  $("l5-solve-btn").classList.toggle("hidden", l5.checked.size < L5_LOCATIONS.length);
  $("l5-progress").textContent = l5.checked.size + " / " + L5_LOCATIONS.length;
}

function handleL5Tap(loc) {
  if (!l5.checked.has(loc.id)) {
    l5.checked.add(loc.id);
    addScore(8);
    showToast(tr("l5ClueFound"));
    showDialogueQueue([{ speaker: "narrator", textKey: loc.clueKey }], () => {
      renderLevel5();
      if (l5.checked.size >= L5_LOCATIONS.length) {
        unlockAchievement("sherlock", "achSherlock", "achSherlockDesc");
        showToast(tr("l5AllClues"));
      }
    });
  } else {
    showDialogueQueue([{ speaker: "narrator", textKey: loc.clueKey }]);
  }
}

function solveCase() {
  if (l5.checked.size < L5_LOCATIONS.length) return;
  finishRun();
}

/* ---------------- Break room ---------------- */
function openBreakRoom() {
  if (!state.breakRoomUnlocked) return;
  const lines = ["br1", "br2", "br3"];
  $("breakroom-line").textContent = tr(lines[Math.floor(Math.random() * lines.length)]);
  showScreen("screen-breakroom");
}

/* ---------------- Utils ---------------- */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* Debug hook (read-only inspection, no gameplay effect) */
window.__LE_DEBUG__ = {
  get state() {
    return state;
  },
  get l1() {
    return l1;
  },
  get l2() {
    return l2;
  },
  get l3() {
    return l3;
  },
  get l4() {
    return l4;
  },
  get l5() {
    return l5;
  },
};
