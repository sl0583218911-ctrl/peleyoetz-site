const fs=require('fs');
let h=fs.readFileSync('index.html','utf8');

/* ---- structural ---- */
h=h.replace('<html lang="he" dir="rtl">','<html lang="en" dir="ltr">');
// fonts: Playfair Display (headings) + Inter (body)
h=h.replace(
 'https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@400;500;600;700;900&family=Assistant:wght@300;400;500;600;700;800&display=swap',
 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');
h=h.replace("--font-h:'Frank Ruhl Libre',serif; --font-b:'Assistant','Frank Ruhl Libre',sans-serif;",
            "--font-h:'Playfair Display',serif; --font-b:'Inter',sans-serif;");
// about h2 inline align
h=h.replace('style="text-align:right"','style="text-align:left"');
// map language
h=h.replace('&z=15&hl=he&output=embed','&z=15&hl=en&output=embed');
// SEO tags for the English page
h=h.replace('<link rel="canonical" href="https://kpyb.org/">','<link rel="canonical" href="https://kpyb.org/en.html">');
h=h.replace('<meta property="og:url" content="https://kpyb.org/">','<meta property="og:url" content="https://kpyb.org/en.html">');
h=h.replace('content="he_IL"','content="en_US"');
// counters number locale
h=h.split("toLocaleString('he')").join("toLocaleString('en-US')");
// carousel direction for LTR (swap next/prev signs)
h=h.replace("document.getElementById('svcNext').onclick=()=>_caro.scrollBy({left:-_amt(),behavior:'smooth'});",
            "document.getElementById('svcNext').onclick=()=>_caro.scrollBy({left:_amt(),behavior:'smooth'});");
h=h.replace("document.getElementById('svcPrev').onclick=()=>_caro.scrollBy({left:_amt(),behavior:'smooth'});",
            "document.getElementById('svcPrev').onclick=()=>_caro.scrollBy({left:-_amt(),behavior:'smooth'});");
// svc-link chevron point right + hover
h=h.replace('<path d="M15 18l-6-6 6-6"/>','<path d="M9 18l6-6-6-6"/>');
h=h.replace('.svc-slide:hover .svc-link svg{transform:translateX(-5px)}','.svc-slide:hover .svc-link svg{transform:translateX(5px)}');
// language toggle in nav -> point back to Hebrew
h=h.replace('<a href="en.html" class="lang-switch">EN</a>','<a href="index.html" class="lang-switch">עברית</a>');

/* ---- string translations (whole phrases; applied longest-first) ---- */
const map=[
["הקרן למורשת פלא יועץ | הציון הקדוש בסיליסטרה, בולגריה","Pele Yoetz Heritage Foundation | The Holy Resting Place, Silistra, Bulgaria"],
["הקרן למורשת פלא יועץ — הציון הקדוש של הרב אליעזר פאפו זצ״ל בסיליסטרה, בולגריה. תכנון ביקור, שליחת שמות לתפילה, מורשת הספר, ושותפות בהחזקת הציון.","Pele Yoetz Heritage Foundation — the holy resting place of Rabbi Eliezer Papo zt\"l in Silistra, Bulgaria. Plan a visit, send names for prayer, explore the book's legacy, and partner in maintaining the site."],
["הקרן למורשת פלא יועץ — הציון הקדוש","Pele Yoetz Heritage Foundation — The Holy Resting Place"],
["הקרן למורשת פלא יועץ פועלת לשימור מורשתו של הרב אליעזר פאפו זצ״ל ולהמשך פיתוח הציון הקדוש בסיליסטרה, בולגריה.","The Pele Yoetz Heritage Foundation works to preserve the legacy of Rabbi Eliezer Papo zt\"l and to continue developing the holy resting place in Silistra, Bulgaria."],
["הקרן למורשת פלא יועץ","Pele Yoetz Heritage Foundation"],
// hero
["הציון הקדוש · סיליסטרה, בולגריה","The Holy Resting Place · Silistra, Bulgaria"],
["פלא ישועות אצל","Wondrous Salvations at"],
["הפלא יועץ","The Pele Yoetz"],
["בבולגריה","in Bulgaria"],
["מקום של תפילה, ישועה והתעוררות הלב — ציונו של הרב אליעזר פאפו זצ״ל, מחבר ספר המוסר הנודע ״פלא יועץ״. מדי שנה מגיעים לכאן יהודים מכל העולם.","A place of prayer, salvation and awakening of the heart — the resting place of Rabbi Eliezer Papo zt\"l, author of the renowned mussar work \"Pele Yoetz.\" Each year, Jews from around the world make their way here."],
["לשליחת שמות לתפילה — לחצו כאן ←","Send Names for Prayer — Click Here →"],
["תכננו את הביקור","Plan Your Visit"],
["הציון הקדוש של בעל הפלא יועץ בסיליסטרה","The holy resting place of the Pele Yoetz in Silistra"],
["גלול למטה","Scroll down"],
["תפריט","Menu"],
// about
["מוקד תפילה עולמי","A Global Prayer Center"],
["ציונו של הרב אליעזר פאפו זצ״ל מהווה מוקד תפילה והתעוררות ליהודים מכל העולם.","The resting place of Rabbi Eliezer Papo zt\"l is a center of prayer and awakening for Jews from around the world."],
["במהלך השנים האחרונות נעשתה במקום פעילות רחבת היקף לשיקום, פיתוח והנגשת הציון, במטרה לאפשר לכל מבקר להגיע, להתפלל ולשהות במקום בכבוד ובנוחות.","In recent years, extensive work has been carried out at the site — restoration, development and accessibility — so that every visitor can arrive, pray and stay with dignity and comfort."],
["קרן ״פלא יועץ״ פועלת לשימור מורשתו של הרב אליעזר פאפו ולהמשך פיתוח הציון הקדוש — פיתוח ושדרוג מתחם הציון, תחזוקה שוטפת, קבלת מבקרים לאורך כל השנה, הפצת ספרי הצדיק, הפקת מעמדי תפילה והתעוררות, וסיוע לקבוצות מהארץ ומהעולם.","The Pele Yoetz Foundation works to preserve the legacy of Rabbi Eliezer Papo and to continue developing the holy site — upgrading the complex, ongoing maintenance, welcoming visitors year-round, distributing the tzaddik's books, holding prayer and awakening gatherings, and assisting groups from Israel and abroad."],
["קרא עוד ↓","Read more ↓"],
["הצג פחות ↑","Show less ↑"],
// counters
["מתפללים בציון בשנה","Worshippers at the site yearly"],
["קבוצות מאורחות","Groups hosted"],
["שמות שנשלחו לתפילה","Names sent for prayer"],
["שנות מורשת","Years of legacy"],
// amenities
["מתחם הציון הקדוש שופץ, הורחב והונגש — כדי שכל מבקר יוכל להתפלל, לטבול ולשהות בכבוד ובנוחות, בכל עונה ובכל שעה.","The holy site has been renovated, expanded and made accessible — so every visitor can pray, immerse and stay with dignity and comfort, in every season and at any hour."],
["מתחם הציון","The Site Complex"],
["מה מחכה לכם במקום","What Awaits You On Site"],
["הציון הקדוש","The Holy Resting Place"],
// amenities items
["ממוזג ומחומם","Climate controlled"],
["מתחם כהנים","Kohanim Area"],
["מקווה טהרה","Mikveh"],
["מהודר","Premium"],
["בית כנסת","Synagogue"],
["הכנסת אורחים","Hospitality"],
["שתייה חמה/קרה","Hot & Cold Drinks"],
["24 שעות","24 hours"],
// services section
["כל מה שצריך כדי להגיע לציון בנוחות","Everything You Need for a Comfortable Visit"],
["ריכזנו עבורכם את כל השירותים הדרושים לקראת הביקור — מתיאום הכניסה ועד האירוח והחזרה הביתה.","We've gathered every service you need for your visit — from arranging entry to lodging and the journey home."],
["שירותים למבקרים","Visitor Services"],
["גררו לצדדים לגלילה · לחצו על שירות לפנייה מהירה בוואטסאפ","Drag sideways to scroll · Tap a service to reach us on WhatsApp"],
// services items (data)
["פתיחת שערי הכניסה","Opening the Gates"],
["תיאום מראש של כניסה לציון הקדוש בשעות הנוחות לכם.","Arrange entry to the holy site in advance, at hours convenient for you."],
["שער הציון","Site Gate"],
["הזמנת ארוחות כשרות","Kosher Meals"],
["ארוחות בכשרות מהודרת ליחידים ולקבוצות.","Meals under premium kosher supervision, for individuals and groups."],
["כשרות מהודרת","Premium Kosher"],
["מלון ואירוח","Hotel & Lodging"],
["סידורי לינה ואירוח נוחים בסמוך לציון, על גדות הדנובה.","Comfortable lodging and accommodation near the site, on the banks of the Danube."],
["על הדנובה","On the Danube"],
["אירוח קבוצות","Group Hosting"],
["ליווי מלא לקבוצות מהארץ ומהעולם, כולל ארוחות.","Full support for groups from Israel and abroad, meals included."],
["הזמנת הסעות","Transportation"],
["הסעות מסודרות ומפוארות אל הציון וממנו.","Organized, upscale transportation to and from the site."],
["הסעות","Transport"],
["שמות לתפילה","Names for Prayer"],
["שליחת קוויטל לתפילה על הציון, גם מרחוק.","Send a kvittel for prayer at the site — even from afar."],
// gallery
["רגעים של קדושה","Moments of Holiness"],
["גלריית הציון","Site Gallery"],
["תמונות מהמקום הקדוש, ממעמדי תפילה, מאירועים מיוחדים ומהפעילות השוטפת לאורך השנה.","Photos of the holy site, prayer gatherings, special events and ongoing activity throughout the year."],
// legacy
["אוצר רוחני","A Spiritual Treasure"],
["מורשת ה״פלא יועץ״","The Legacy of the \"Pele Yoetz\""],
["ספר ״פלא יועץ״ נחשב לאחד מספרי המוסר החשובים והנפוצים ביותר בעולם היהודי. ייחודו בכך שהוא מעניק הדרכה מעשית לעבודת ה׳, לתיקון המידות ולחיי היום־יום — בלשון בהירה, קצרה ונגישה.","The \"Pele Yoetz\" is considered one of the most important and widely studied mussar works in the Jewish world. Its uniqueness lies in offering practical guidance for the service of God, character refinement and daily life — in clear, concise and accessible language."],
["מורשתו של הרב אליעזר פאפו ממשיכה להאיר את דרכם של רבבות יהודים בכל דור. חפשו ערכים לפי אותיות ונושאים, עיינו בתוכן, ורכשו את ספרי הצדיק.","The legacy of Rabbi Eliezer Papo continues to light the path of countless Jews in every generation. Search entries by letter and topic, study the content, and purchase the tzaddik's books."],
["שלום, אשמח לפרטים על עיון ורכישת ספרי ה׳פלא יועץ׳.","Hello, I'd love details about studying and purchasing the Pele Yoetz books."],
["לעיון ורכישת הספרים ←","Browse & Purchase the Books →"],
["ספר פלא יועץ — הרב אליעזר פאפו זצ״ל","The Pele Yoetz book — Rabbi Eliezer Papo zt\"l"],
// donate
["שותפות ותרומה","Partnership & Donation"],
["היו שותפים בהחזקת הציון","Partner in Maintaining the Site"],
["כל תרומה מסייעת להרחבת הפעילות, לקליטת המבקרים ולהפצת תורתו של בעל ה״פלא יועץ״. בחרו מסלול שותפות:","Every donation helps expand our activity, welcome visitors and spread the teachings of the Pele Yoetz. Choose a partnership tier:"],
["החזקת הציון ליום אחד","Maintain the site for one day"],
["תחזוקת המקום לשבוע + הזכרה בתפילה","Upkeep of the site for a week + mention in prayer"],
["המסלול הפופולרי","Most Popular"],
["שותפות חודשית בפיתוח והפצת הספרים","Monthly partnership in development & book distribution"],
["כל התרומות מתבצעות בסליקה מאובטחת דרך <strong>נדרים פלוס</strong> · ניתן לתרום גם בסכום חופשי","All donations are processed securely via <strong>Nedarim Plus</strong> · you may also give any amount"],
["לתרומה בסכום חופשי ←","Donate Any Amount →"],
// contact
["נשמח לעמוד לרשותכם","We're Here to Help"],
["יצירת קשר","Contact Us"],
["זקוקים לישועה?","In Need of Salvation?"],
["שלחו קוויטל — שמות לתפילה על הציון הקדוש","Send a kvittel — names for prayer at the holy site"],
["שם המבקש/ת","Name"],
["שם האם","Mother's Name"],
["לתפילה מדויקת","For precise prayer"],
["בקשה לתפילה","Prayer Request"],
["פרטו את הבקשה...","Describe your request..."],
["נא להזין שם","Please enter a name"],
["שליחת הקוויטל בוואטסאפ ←","Send the Kvittel via WhatsApp →"],
["🔒 הפרטים נשלחים ישירות לוואטסאפ של הקרן","🔒 Details are sent directly to the Foundation's WhatsApp"],
["צור קשר ותיאום ביקור","Contact & Visit Coordination"],
["מלאו את הפרטים ונציגי הקרן יחזרו אליכם בהקדם","Fill in your details and our representatives will get back to you shortly"],
["שם מלא","Full Name"],
["ישראל ישראלי","John Smith"],
["נא להזין שם מלא","Please enter your full name"],
["מספר טלפון","Phone Number"],
["נא להזין טלפון תקין","Please enter a valid phone"],
["נא להזין טלפון","Please enter a phone"],
["כתובת דוא״ל","Email Address"],
["מדינה / עיר","Country / City"],
["ישראל, ירושלים","USA, New York"],
["בחרו את נושא הפנייה...","Choose a subject..."],
["אירוח קבוצה","Group hosting"],
["הזמנת מלון ואירוח","Hotel & lodging"],
["פתיחת שערי כניסה","Opening the gates"],
["תרומה ושותפות","Donation & partnership"],
["שאלה כללית","General question"],
["נא לבחור נושא","Please choose a subject"],
["נושא הפנייה","Subject"],
["תוכן ההודעה","Message"],
["פירוט נוסף...","Additional details..."],
["שליחת הפנייה בוואטסאפ ←","Send via WhatsApp →"],
["🔒 הפנייה נשלחת ישירות לוואטסאפ של הקרן — ללא שמירת פרטים","🔒 Sent directly to the Foundation's WhatsApp — no data stored"],
// soon
["בקרוב · LIVE","COMING SOON · LIVE"],
["שידורים חיים ממעמדי תפילה בציון הקדוש","Live Broadcasts from Prayer Gatherings at the Holy Site"],
["בקרוב תוכלו להצטרף למעמדי התפילה וההתעוררות בציון בעל ה״פלא יועץ״ — בשידור חי, מכל מקום בעולם.","Soon you'll be able to join the prayer and awakening gatherings at the resting place of the Pele Yoetz — live, from anywhere in the world."],
// footer / map
["הציון הקדוש — סיליסטרה","The Holy Site — Silistra"],
["מפת הציון הקדוש","Map of the holy site"],
["איך מגיעים","How to Get There"],
["הציון הקדוש בסיליסטרה","The Holy Site in Silistra"],
["ניווט בגוגל מפות","Navigate with Google Maps"],
["ניווט בוויז","Navigate with Waze"],
["ניווט מהיר","Quick Links"],
["וואטסאפ הקרן","Foundation WhatsApp"],
["שליחת שמות לתפילה","Send names for prayer"],
["תיאום ביקור","Coordinate a visit"],
["לתרומה מאובטחת","Secure Donation"],
["© הקרן למורשת פלא יועץ · הציון הקדוש בסיליסטרה, בולגריה · כל הזכויות שמורות","© Pele Yoetz Heritage Foundation · The Holy Site in Silistra, Bulgaria · All rights reserved"],
["פלא ישועות (ע״ר) 580680239","Pele Yeshuot (Reg. Assoc.) 580680239"],
["וואטסאפ","WhatsApp"],
// nav bare items (short) — after longer ones
["מורשת הספר","The Book's Legacy"],
["גלריה","Gallery"],
["שותפות","Partnership"],
// JS dynamic strings
["מקום לתמונה","Add photo"],
["לפנייה ותיאום ","Contact & coordinate "],
["לתרומה ושותפות ←","Donate & Partner →"],
["הציון הקדוש — תמונה ","The Holy Site — photo "],
["שלום, הגעתי דרך אתר הקרן למורשת פלא יועץ ואשמח לפרטים.","Hello, I found you through the Pele Yoetz Heritage Foundation website and would love more information."],
["קוויטל — שמות לתפילה","Kvittel — Names for Prayer"],
["פנייה חדשה מהאתר","New inquiry from the website"],
["נא למלא את שדות החובה","Please fill in the required fields"],
["נפתח וואטסאפ לשליחת הפנייה ✓","Opening WhatsApp to send ✓"],
["(נשלח מאתר הקרן למורשת פלא יועץ)","(Sent from the Pele Yoetz Heritage Foundation website)"],
// form field NAME attributes (labels in WA message)
["name=\"שם האם\"","name=\"Mother's Name\""],
["name=\"שם מלא\"","name=\"Full Name\""],
["name=\"טלפון\"","name=\"Phone\""],
["name=\"בקשה\"","name=\"Request\""],
["name=\"דוא״ל\"","name=\"Email\""],
["name=\"מיקום\"","name=\"Location\""],
["name=\"נושא\"","name=\"Subject\""],
["name=\"הודעה\"","name=\"Message\""],
["name=\"שם\"","name=\"Name\""],
// modals — about
["אודות הפעילות","About Our Work"],
["הקרן למורשת פלא יועץ הוקמה כדי לשמר את מורשתו של הרב אליעזר פאפו זצ״ל — בעל ה״פלא יועץ״ — ולהפוך את ציונו הקדוש בסיליסטרה שבבולגריה למקום תפילה, ישועה והתעוררות הראוי לכל יהודי.","The Pele Yoetz Heritage Foundation was established to preserve the legacy of Rabbi Eliezer Papo zt\"l — author of the \"Pele Yoetz\" — and to make his holy resting place in Silistra, Bulgaria a place of prayer, salvation and awakening worthy of every Jew."],
["מדי שנה עולים לציון יהודים מכל רחבי העולם. הקרן דואגת שכל מבקר יתקבל בכבוד, יתפלל בנוחות, וימצא במקום בית חם.","Each year, Jews from around the world visit the site. The Foundation ensures that every visitor is received with dignity, prays in comfort, and finds a warm home here."],
["תחומי הפעילות שלנו","What We Do"],
["פיתוח ושדרוג מתחם הציון — בניית מבנה קבע מפואר, מקווה טהרה מהודר, בית כנסת ומתחם כהנים.","Developing and upgrading the site — building a magnificent permanent structure, a premium mikveh, a synagogue and a Kohanim area."],
["קליטת מבקרים לאורך כל השנה — אירוח, ארוחות כשרות, הסעות והכנסת אורחים.","Welcoming visitors year-round — lodging, kosher meals, transportation and hospitality."],
["הפצת תורתו של בעל ה״פלא יועץ״ — ספרים, שיעורים ומעמדי תפילה.","Spreading the teachings of the Pele Yoetz — books, classes and prayer gatherings."],
["שליחת שמות לתפילה על הציון הקדוש, מכל מקום בעולם.","Sending names for prayer at the holy site, from anywhere in the world."],
["כל יהודי מוזמן להיות שותף בהחזקת הציון ובהפצת מורשתו — בביקור, בתפילה ובתרומה.","Every Jew is invited to partner in maintaining the site and spreading its legacy — through a visit, a prayer and a donation."],
["לשליחת שמות לתפילה","Send Names for Prayer"],
["לשותפות ותרומה","Partner & Donate"],
// modals — stories
["הרב אליעזר פאפו זצ״ל — בעל ה״פלא יועץ״ — נמנה עם גדולי חכמי המוסר, ונודע באהבת ישראל העצומה שלו ובמסירותו לכל יהודי.","Rabbi Eliezer Papo zt\"l — author of the \"Pele Yoetz\" — was among the greatest masters of mussar, renowned for his boundless love of every Jew and his devotion to them."],
["מסירות נפש למען הקהילה","Self-Sacrifice for His Community"],
["מסופר כי בעת מגפה קשה שפרצה בסיליסטרה, קיבל הרב על עצמו את ייסורי הציבור והתפלל שהמגפה תיפסק ולא תפגע בבני קהילתו. תפילתו נענתה — והרב נפטר בכ׳ בתשרי תקפ״ח, בהיותו כבן 43 בלבד, לאחר שמסר נפשו על צאן מרעיתו.","It is told that during a severe plague that struck Silistra, the Rabbi took the community's suffering upon himself and prayed that the plague would cease and spare his congregants. His prayer was answered — and he passed away on the 20th of Tishrei 5588 (1827), at just 43 years old, having given his life for his flock."],
["אבן שואבת לכל יהודי","A Magnet for Every Jew"],
["עד היום נוהרים לציונו יהודים מכל העדות ומכל רחבי העולם. רבים מספרים על ישועות שנפעלו בזכות תפילה במקום — בבריאות, בפרנסה, בזיווג ובזרע של קיימא.","To this day, Jews of every background and from around the world flock to his resting place. Many tell of salvations brought about through prayer here — in health, livelihood, finding a match and children."],
["יש לכם סיפור ישועה מהציון הקדוש? נשמח לשמוע ולשתף — פנו אלינו דרך הטופס באתר.","Do you have a story of salvation from the holy site? We'd love to hear and share it — reach out through the form on this site."],
["סיפורי צדיקים","Tzaddik Stories"],
["מורשת","Legacy"],
["אודות","About"],
["סגור","Close"],
// SEO meta content
["הציון הקדוש של הרב אליעזר פאפו זצ״ל — בעל ה״פלא יועץ״. תכנון ביקור, שליחת שמות לתפילה, ושותפות בהחזקת הציון.","The holy resting place of Rabbi Eliezer Papo zt\"l — author of the \"Pele Yoetz.\" Plan a visit, send names for prayer, and partner in maintaining the site."],
["הקרן למורשת פלא יועץ — שימור ופיתוח ציונו הקדוש של הרב אליעזר פאפו זצ״ל בסיליסטרה, בולגריה.","Pele Yoetz Heritage Foundation — preserving and developing the holy resting place of Rabbi Eliezer Papo zt\"l in Silistra, Bulgaria."],
["ציון הפלא יועץ","Tomb of the Pele Yoetz"],
// nav dropdown + modal headings (chrome). Bodies remain Hebrew for now.
["אודות ▾","About ▾"],
["אודות הקרן","About the Foundation"],
["תולדות רבנו","The Rabbi's Life"],
["סיפורי ישועה","Stories of Salvation"],
["הקרן למורשת ה״פלא יועץ״","The Pele Yoetz Heritage Foundation"],
["מאחורי הקלעים של המהפכה בציונו הקדוש","Behind the scenes of the revival of his holy resting place"],
["תולדותיו של רבנו הקדוש","The Life of Our Holy Rabbi"],
["צדיק יסוד עולם","A Pillar of the World"],
["רבי אליעזר פאפו זיע״א — בעל ה״פלא יועץ״","Rabbi Eliezer Papo — author of the \"Pele Yoetz\""],
["מציונו של בעל ה״פלא יועץ״ זיע״א","From the resting place of the Pele Yoetz"],
// hero slideshow + about image
["פנים הציון הקדוש של בעל הפלא יועץ","Interior of the holy resting place of the Pele Yoetz"],
["הדמיית מתחם הציון החדש","Rendering of the new site complex"],
["שער הכניסה לציון הקדוש — ברוכים הבאים","The entrance gate — Welcome to the holy site"],
["הציון כיום","The site today"],
["הדמיית הפיתוח","Development rendering"],
// missed visible bits
["ישראל בן שרה","Yisrael ben Sarah"],
["הקודם","Previous"],
["הבא","Next"],
["טלפון","Phone"],
["בקשה","Request"],
// JS comments (invisible, cleaned for tidiness)
["הגדרות — החלף את שני הערכים האלה בפרטים האמיתיים","Config — replace these two values with the real details"],
["מספר WhatsApp בפורמט בינלאומי ללא + וללא 0 מוביל (972 = ישראל)","WhatsApp number in international format, no + and no leading 0 (972 = Israel)"],
["וואטסאפ הקרן: 02-570-3060 (ודא WhatsApp Business על הקו)","Foundation WhatsApp: 02-570-3060 (ensure WhatsApp Business on the line)"],
["קישור דף התרומות בנדרים פלוס","Nedarim Plus donation page link"],
["נתונים","data"],["רינדור","render"],["אינטראקציות","interactions"],
["marquee (כפול לגלילה חלקה)","marquee (duplicated for smooth scroll)"],
["carousel arrows (RTL)","carousel arrows"],
["amenities (מתקני המתחם)","amenities"],
["rotating dial — spin with mouse/finger, top item enlarged","rotating dial"],
["gallery (עם פריטים גדולים לעניין ויזואלי)","gallery"],
["header scroll","header scroll"],["mobile nav","mobile nav"],["about read more","about read more"],
["reveal on scroll","reveal on scroll"],
["fail-safe: reveal anything already/near viewport on scroll (in case observer misfires)","fail-safe reveal"],
["nedarim links — קישורים אמיתיים (עובדים תמיד, גם בלי JS פעיל)","nedarim links (real hrefs)"],
["whatsapp links","whatsapp links"],
["form → whatsapp","form to whatsapp"],
["שדות עם כוכבית = חובה","fields with asterisk = required"],
["הסרת שגיאה בהקלדה","clear error on input"],
// leftover standalone
["פלא ישועות","Pele Yeshuot"],
["פלא יועץ","Pele Yoetz"]
];
// apply longest-first
map.sort((a,b)=>b[0].length-a[0].length).forEach(([he,en])=>{h=h.split(he).join(en)});

/* ---- whole-modal English swap (long essays) ---- */
function swapModal(id,enHtml){
  const start=h.indexOf('<div class="modal-overlay" id="modal-'+id+'">');
  if(start<0)return;
  const nextOv=h.indexOf('<div class="modal-overlay"',start+60);
  const toast=h.indexOf('<div class="toast"',start);
  let end=(nextOv>=0&&(toast<0||nextOv<toast))?nextOv:toast;
  if(end<0)return;
  h=h.slice(0,start)+enHtml+'\n\n'+h.slice(end);
}
const EN_ABOUT=`<div class="modal-overlay" id="modal-about">
  <div class="modal">
    <div class="modal-head">
      <button class="modal-close" data-close aria-label="Close">&times;</button>
      <span class="eyebrow">About</span>
      <h3>The Pele Yoetz Heritage Foundation</h3>
    </div>
    <div class="modal-body">
      <p class="m-sub">Behind the scenes of the revival of his holy resting place</p>
      <h4 class="sec">The Founding</h4>
      <p>The Pele Yoetz Heritage Foundation was established to preserve, honor and pass down for generations the legacy of the wondrous tzaddik, Rabbi Eliezer Papo zt"l — author of the "Pele Yoetz." His illuminating teachings and many works have accompanied the Jewish people for generations, an inexhaustible source of faith, ethics, awe of Heaven and guidance for life.</p>
      <p>For many years the holy site in Silistra, Bulgaria stood neglected and without basic conditions. The grave itself had almost no proper shelter from the harsh winter cold or the summer sun, and there was no suitable infrastructure, no orderly space to receive the public, and no mikveh for those wishing to immerse before ascending to the site.</p>
      <p>Some time ago, Rabbi Chaim Ravad of Jerusalem felt he could no longer accept the situation. Together with a group of friends who had visited the site for years, he took upon himself the great task: to raise the needed resources, restore the place and rebuild the complex in great splendor. Since then, the Foundation's members work with great devotion, traveling many times a year and closely overseeing the works.</p>
      <h4 class="sec">The Revival Already Underway</h4>
      <p>In the past year the site has changed beyond recognition. Construction and restoration are in full swing. The mikveh was restored with great beauty and uncompromising adherence to the highest standards of kashrus, in consultation with leading poskim and mikveh experts — among them Rabbi Brandsdorfer and Rabbi Fishhof.</p>
      <p>The grave area was enclosed by a tent giving visitors shelter from heat and cold, and a new building was placed for hospitality and separate facilities. Visitors on cold days can now find refuge in the hall, warm up and quench their thirst. After years of neglect, the place is beginning to receive the honor it deserves.</p>
      <h4 class="sec">The Vision</h4>
      <p>A large-scale plan is currently being advanced before the Silistra municipality, to establish a spacious, magnificent and modern complex that will worthily receive the multitudes of Jews who come to pray at our Rabbi's holy resting place.</p>
      <div class="vision">
        <div class="vitem"><b>The Ohel</b><span>The temporary tent will be replaced by a large, spacious, climate-controlled permanent structure, with an orderly women's section and libraries of Tehillim and the works of the Pele Yoetz.</span></div>
        <div class="vitem"><b>The Hospitality Complex</b><span>A large, elegant building with a modern kitchen, serving hot meals and varied refreshments to visitors year-round.</span></div>
        <div class="vitem"><b>The Mikveh</b><span>Already active and in its final stages — awaiting an advanced heating system and the necessary furnishings.</span></div>
        <div class="vitem"><b>The Beis Medrash</b><span>A new study hall will be built beside the site — rooms for prayer and study, a magnificent library and an inviting space to engage with the tzaddik's Torah.</span></div>
        <div class="vitem"><b>Institute for the Rabbi's Works</b><span>An institute to edit, publish and distribute our Rabbi's works, alongside a kollel dedicated to studying his writings and preparing them for print.</span></div>
        <div class="vitem"><b>Travel & Hospitality</b><span>Arranging regular routes to the site in Bulgaria, transportation, lodging solutions and full support for visitors throughout the journey.</span></div>
        <div class="vitem"><b>Spreading the Pele Yoetz's Torah</b><span>All of our Rabbi's works will be reissued in beautiful editions. A special segulah book drawn from his teachings was recently published, and scholarships will be granted to those who study his holy works.</span></div>
      </div>
      <h4 class="sec">Realizing the Vision</h4>
      <p>Realizing this vision requires great resources. Alongside construction and development, the Foundation must fund ongoing electricity and water, hospitality, catering, security, cleaning and maintenance. This is a historic effort, transforming the site in the distant town into a living, vibrant center of prayer, Torah and kindness — and a rare opportunity to partner in restoring the honor of Torah and building a fitting home for the tzaddik.</p>
      <div class="m-quote">
        <div class="q">&ldquo;I shall repay with the best&rdquo;</div>
        <small>The renowned promise of the Pele Yoetz to those who honor his legacy</small>
      </div>
      <p>Fortunate is one who merits to take part in this holy endeavor — to help build the site and preserve the legacy of the Pele Yoetz, so it may stand and shine for the Jewish people for many years to come.</p>
      <div class="mcta">
        <a href="#" class="btn btn-gold" data-nedarim data-close>Become a Partner — Donate</a>
        <a href="#kvittel" class="btn btn-navy" data-close>Send Names for Prayer</a>
      </div>
    </div>
  </div>
</div>`;
const EN_HISTORY=`<div class="modal-overlay" id="modal-history">
  <div class="modal">
    <div class="modal-head">
      <button class="modal-close" data-close aria-label="Close">&times;</button>
      <span class="eyebrow">A Pillar of the World</span>
      <h3>The Life of Our Holy Rabbi</h3>
    </div>
    <div class="modal-body">
      <p class="m-sub">Rabbi Eliezer Papo zt"l — author of the "Pele Yoetz"</p>
      <h4 class="sec">His Early Years</h4>
      <p>In 1786, in the city of Sarajevo, Bosnia, our Rabbi, Rabbi Eliezer Papo zt"l, was born — one who would go on to illuminate the world of Torah and mussar. His parents, the pious Rabbi Yitzchak and Mrs. Blanca, raised their son in a home steeped in love of Torah, awe of Heaven and fine character.</p>
      <p>Already in childhood his purity of heart and lofty aspirations were evident. It is told that when asked what he wished to be when he grew up, he answered simply:</p>
      <p class="pull">&ldquo;I want to be a good Jew.&rdquo;</p>
      <p>This brief answer captured the essence of his life: a ceaseless striving for perfection in the service of the Creator — in Torah, prayer, character, and in relationships between people.</p>
      <h4 class="sec">His Father's Home</h4>
      <p>In a moving passage, our Rabbi writes of his father's final days, from which we glimpse the exalted home in which he was raised:</p>
      <blockquote>"My honored father of blessed memory, every day of that illness recited the prayer 'To You, my God, is my longing' and other confessions and supplications of Yom Kippur, and streams of water flowed from his eyes… and to everyone who came to him he would say: 'See the end of flesh and blood.' Fortunate is he and fortunate is his portion."</blockquote>
      <p>Our Rabbi and his wife merited two sons and two daughters. He mentions his brilliant sons in several of his works, and after his passing his sons took a central role in publishing his writings — and thanks to their devotion the Jewish world gained spiritual treasures whose influence is felt to this day.</p>
      <h4 class="sec">Rabbi of Silistra</h4>
      <p>Around 1820, at about thirty-four, our Rabbi was called to serve as rabbi of Silistra, Bulgaria. Despite his young age he was already known as an outstanding Torah scholar and a leader whose community's welfare was always before his eyes. He carried the burden of the public, cared for the poor and weak, and made peace between people.</p>
      <p>One famous episode tells of a Jew falsely accused and sentenced to death, for whom the authorities demanded an enormous sum. Our Rabbi gathered the townspeople and declared with emotion that if they had no money to redeem him — even the Torah scrolls and sacred vessels should be sold, for saving a life overrides all. His words pierced their hearts, the sum was raised, and the man's life was saved. Such was his way: Torah that does not remain on the page, but descends into life and becomes responsibility, devotion and kindness.</p>
      <h4 class="sec">His Holy Works</h4>
      <p>Alongside leading his community, our Rabbi bore a vast Torah enterprise, authoring many works of halacha, mussar, homiletics and prayer. The crown jewel is his renowned <strong>"Pele Yoetz"</strong> — a comprehensive mussar work arranged by topic in alphabetical order, guiding a person in the service of the Creator, refining character, family life and raising children.</p>
      <p>Its uniqueness is its ability to touch every person — clear, practical words full of love, combining lofty spiritual demand with deep understanding of the human soul. Among his other works is <strong>"Chodesh HaAviv"</strong> on tractates Berachos and Shabbos, on which he labored seven years. When asked how he found the time, he answered:</p>
      <p class="pull">&ldquo;If a person wants to, he will always find time for Torah.&rdquo;</p>
      <h4 class="sec">His Final Days</h4>
      <p>In 1827 our Rabbi fell gravely ill, and during his illness the name "Yechezkel" was added to him as a segulah for healing. On Thursday, the 20th of Tishrei 5588, during Chol HaMoed Sukkos, he returned his pure soul to its Maker — at just forty-one years old.</p>
      <p>According to tradition, before his passing our Rabbi learned that a plague was to strike the city, and from Heaven he was given the possibility to take the decree upon himself and save his community. Our Rabbi, who all his life gave himself for the public, chose to sacrifice himself for the people of his city.</p>
      <h4 class="sec">The Power of Prayer at His Site</h4>
      <p>His holy resting place has, over the generations, become a focus of prayer and pleas for mercy. In the work <strong>"Melitzei Esh"</strong> a special testimony about the site is brought:</p>
      <blockquote>"Whoever goes to his grave after immersing in a mikveh and prays with a broken heart — it is assured that his prayer will be accepted… and indeed great salvations have come to those who do so."</blockquote>
      <p>Many are careful to this day to immerse in a mikveh, ascend to the grave in purity, and pour out prayer with humility and a broken heart.</p>
      <h4 class="sec">The Headstone That Would Not Move</h4>
      <p>A wondrous tradition passed among the local Jews from generation to generation. When the authorities sought to build a church on the Jewish cemetery grounds, they began clearing graves and uprooting headstones. When the workers reached the headstone of the Pele Yoetz — they could not move it. Repeated attempts to uproot it came to nothing.</p>
      <p>According to tradition, before those present the headstone began to sink whole into the ground. The astonished Russians understood that a holy man lay there and abandoned their plan — and so the site was miraculously preserved for generations.</p>
      <h4 class="sec">His Living Legacy</h4>
      <p>Though nearly two hundred years have passed, our Rabbi's Torah continues to shine. The "Pele Yoetz" is studied in study halls and homes around the world, giving guidance, strength and comfort to countless people to this day. Our Rabbi left behind a whole way of life: to serve the Creator with simplicity, increase peace, bear the burden of others, and do everything out of love of God and love of Israel. His childhood wish — <strong>"to be a good Jew"</strong> — became an eternal testament to each and every one of us.</p>
      <blockquote class="center">May the merit of our holy Rabbi, Rabbi Eliezer Papo zt"l, protect us and all Israel, Amen.</blockquote>
      <div class="mcta">
        <a href="#kvittel" class="btn btn-gold" data-close>Send Names for Prayer</a>
      </div>
    </div>
  </div>
</div>`;
const EN_STORIES=`<div class="modal-overlay" id="modal-stories">
  <div class="modal">
    <div class="modal-head">
      <button class="modal-close" data-close aria-label="Close">&times;</button>
      <span class="eyebrow">Wondrous Salvations</span>
      <h3>Stories of Salvation</h3>
    </div>
    <div class="modal-body">
      <p class="m-sub">From the resting place of the Pele Yoetz zt"l</p>
      <p>There are places where prayer takes on a different meaning. In Silistra, Bulgaria, far from the bustle of life, lies the resting place of the holy gaon Rabbi Eliezer Papo zt"l. Over the years Jews from around the world visit, pour out their hearts and seek to arouse Heavenly mercy in the tzaddik's merit. Three stories that reached us from those who lived them tell of moments of prayer — and of salvations that followed.</p>
      <div class="story">
        <h4>&ldquo;Dad, find me a yeshiva&rdquo;</h4>
        <p class="attrib">From Rabbi Binyamin Gringras, a regular visitor to the site</p>
        <p>A son of a prominent Torah family in Beit Shemesh returned one day from yeshiva, shut himself in his room, and told his worried parents one short, painful sentence:</p>
        <p class="pull">&ldquo;I'm done with the yeshiva world.&rdquo;</p>
        <p>The decline was swift. He bought a smartphone, sank into it for hours and nearly stopped communicating. Seven months passed. One day Rabbi Gringras met the father, asked to meet the young man, and when he entered did not open with rebuke — but with an unexpected offer: <strong>"Come with me to Bulgaria."</strong></p>
        <p>After much urging he agreed. In Silistra the Rabbi told him of the power of prayer at the site, and suggested he immerse and go in to pray. The young man went in, prayed, and left — with no outward sign. Yet perhaps there, quietly, the first crack in the wall was formed.</p>
        <p><strong>Just three days after they returned home</strong>, the young man approached his father with a request that left him stunned:</p>
        <p class="pull">&ldquo;Dad, find me a yeshiva.&rdquo;</p>
        <p>Time passed. A friend of the Foundation visited the yeshiva, unaware of the story, and the rosh yeshiva pointed to a student and said with emotion: "That's the son of Rabbi… he is about to make a siyum on a tractate." It was that same young man. The boy who had left everything returned to the beis medrash — and merited to complete a tractate.</p>
      </div>
      <div class="story">
        <h4>The Match Waiting at the Landing</h4>
        <p class="attrib">From Rabbi Binyamin Gringras</p>
        <p>On his way to the site, Rabbi Gringras passed through Bucharest, where he met a G-d-fearing Jewish couple. When they asked him about a nice place to visit, he told them he was on his way to the resting place of the Pele Yoetz. The words touched their hearts, and shortly they decided: <strong>we're joining too.</strong></p>
        <p>On the way he gave them advice: when they reach the site, focus on one request and pour out their hearts over it. Only on the way back did he understand they carried one great worry — <strong>a match for their son</strong>.</p>
        <p>About two weeks passed, and the phone rang. On the line, the father, his voice trembling:</p>
        <p class="pull">Their son was engaged.</p>
        <p>And then he added a staggering detail: the match proposal reached them <strong>the moment they landed back home</strong>, after returning from prayer at the site. The timing was unmistakable — they felt their prayer had opened a gate of salvation.</p>
      </div>
      <div class="story">
        <h4>The Call That Came Before He Left the Cemetery</h4>
        <p class="attrib">From Rabbi Moshe Levi of New York</p>
        <p>His brother-in-law, a father of eight, fell ill with severe kidney disease. His kidneys failed and he had to undergo dialysis three times a week. He was placed on a transplant waiting list — but estimates spoke of a year or more. Rabbi Moshe inquired and pulled every connection, but nothing progressed. When it seemed nothing more could be done by natural means, he turned to the ancient way: <strong>prayer.</strong></p>
        <p>He traveled specially to Silistra, immersed in the mikveh and entered the site. There, alone, he opened a book of Tehillim — chapter after chapter, weeping until he finished it all. And then came the moment he can hardly forget:</p>
        <p class="pull">Before he could even leave the cemetery — the phone rang.</p>
        <p>His wife was on the line, shaken: "I have no way to explain what happened — but your brother-in-law is already on his way to transplant surgery." He ends his story with a line etched in the heart: <strong>"Apparently, when the tzaddik vouches for something — he does not wish to remain in debt for long…"</strong></p>
      </div>
      <div class="divider-o">&#9670; &#10022; &#9670;</div>
      <p>Three people. Three hardships. Three prayers. We hold no Heavenly accounts, and no one knows how a prayer is answered. Yet these stories recall an ancient, simple truth: <strong>even when the way looks blocked — a Jew never stops praying.</strong></p>
      <div class="m-quote">
        <div class="q">In the tzaddik's merit — send us salvation</div>
        <small>Do you have a story of salvation from the site? We'd love to hear and share it — reach out through the form.</small>
      </div>
      <div class="mcta">
        <a href="#kvittel" class="btn btn-gold" data-close>Send Names for Prayer</a>
      </div>
    </div>
  </div>
</div>`;
swapModal('about',EN_ABOUT);
swapModal('history',EN_HISTORY);
swapModal('stories',EN_STORIES);

// post cleanup of remaining Hebrew inside comments (invisible)
h=h.replace('// מספר WhatsApp בפורמט בינלאומי ללא + וללא 0 מוביל (972 = ישראל)','// WhatsApp number, international format, no + / no leading 0 (972 = Israel)');
h=h.replace('WhatsApp הקרן: 02-570-3060 (ודא WhatsApp Business על הקו)','Foundation WhatsApp: 02-570-3060');
h=h.replace('<!-- רכיב נגישות — Enable -->','<!-- Accessibility widget — Enable -->');
fs.writeFileSync('en.html',h,'utf8');
// report any leftover Hebrew in the OUTPUT (excluding the deliberate 'עברית' toggle)
const heb=(h.replace('>עברית<','><').match(/[֐-׿]/g)||[]).length;
console.log('en.html written. leftover Hebrew chars (should be ~0):',heb);
if(heb){const ctx=h.replace('>עברית<','><').match(/.{0,25}[֐-׿]{2,}.{0,25}/g);console.log('samples:',(ctx||[]).slice(0,12))}
