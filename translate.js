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

// post cleanup of remaining Hebrew inside comments (invisible)
h=h.replace('// מספר WhatsApp בפורמט בינלאומי ללא + וללא 0 מוביל (972 = ישראל)','// WhatsApp number, international format, no + / no leading 0 (972 = Israel)');
h=h.replace('WhatsApp הקרן: 02-570-3060 (ודא WhatsApp Business על הקו)','Foundation WhatsApp: 02-570-3060');
h=h.replace('<!-- רכיב נגישות — Enable -->','<!-- Accessibility widget — Enable -->');
fs.writeFileSync('en.html',h,'utf8');
// report any leftover Hebrew in the OUTPUT (excluding the deliberate 'עברית' toggle)
const heb=(h.replace('>עברית<','><').match(/[֐-׿]/g)||[]).length;
console.log('en.html written. leftover Hebrew chars (should be ~0):',heb);
if(heb){const ctx=h.replace('>עברית<','><').match(/.{0,25}[֐-׿]{2,}.{0,25}/g);console.log('samples:',(ctx||[]).slice(0,12))}
