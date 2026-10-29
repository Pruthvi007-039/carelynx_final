const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

const themeToggle = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('carelynx-theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (storedTheme === 'dark' || (!storedTheme && systemDark)) document.body.classList.add('dark');
function updateThemeButton(){ themeToggle.textContent = document.body.classList.contains('dark') ? '☀' : '☾'; }
updateThemeButton();
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('carelynx-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  updateThemeButton();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.getElementById('year').textContent = new Date().getFullYear();

// Full-site translations. Every visible text node, form label, placeholder,
// navigation link, FAQ, status note and footer is translated together.
const siteTranslations = {
  gu: {
    'Home':'હોમ','About':'અમારા વિશે','Platform':'પ્લેટફોર્મ','Applications':'એપ્લિકેશન્સ','Partners':'ભાગીદારો','Contact':'સંપર્ક',
    'BETTER HEALTHCARE. TOGETHER.':'સાથે મળીને વધુ સારી આરોગ્યસેવા.','Connected care.':'જોડાયેલી આરોગ્યસેવા.','Clearer possibilities.':'વધુ સ્પષ્ટ શક્યતાઓ.',
    'CareLynx is building a connected healthcare ecosystem for patients, hospitals, pharmacies and laboratories.':'CareLynx દર્દીઓ, હોસ્પિટલો, ફાર્મસીઓ અને લેબોરેટરીઝ માટે જોડાયેલું હેલ્થકેર ઇકોસિસ્ટમ વિકસાવી રહ્યું છે.',
    'Explore the platform':'પ્લેટફોર્મ જુઓ','Discover CareLynx':'CareLynx વિશે જાણો','Designed around connection, clarity and care':'જોડાણ, સ્પષ્ટતા અને કાળજી પર આધારિત',
    'One connected ecosystem':'એક જોડાયેલું ઇકોસિસ્ટમ','Built for a healthier tomorrow':'સ્વસ્થ આવતીકાલ માટે', 'Patients':'દર્દીઓ','Hospitals':'હોસ્પિટલો','Pharmacies':'ફાર્મસીઓ','Laboratories':'લેબોરેટરીઝ',
    'Care access':'આરોગ્યસેવાની પહોંચ','Care coordination':'આરોગ્યસેવાનું સંકલન','Prescription workflows':'પ્રિસ્ક્રિપ્શન પ્રક્રિયાઓ','Testing coordination':'ટેસ્ટિંગનું સંકલન',
    'ABOUT CARELYNX':'CARELYNX વિશે','A more connected way to think about healthcare.':'આરોગ્યસેવા માટે વધુ જોડાયેલો અભિગમ.',
    'CareLynx Pvt. Ltd. is working toward a connected digital healthcare experience that helps different parts of the care journey work together more smoothly.':'CareLynx Pvt. Ltd. એવી ડિજિટલ આરોગ્યસેવા વિકસાવી રહી છે જે સારવારની પ્રક્રિયામાં જોડાયેલા વિવિધ ભાગોને વધુ સારી રીતે સાથે કામ કરવામાં મદદ કરે.',
    'Our focus is to make healthcare workflows clearer, more coordinated and easier to navigate—while respecting privacy and appropriate access to information.':'અમારો હેતુ આરોગ્યસેવાની પ્રક્રિયાઓને વધુ સ્પષ્ટ, સંકલિત અને સરળ બનાવવાનો છે—સાથે જ ગોપનીયતા અને માહિતીની યોગ્ય પહોંચનું ધ્યાન રાખવાનો છે.',
    'Explore our approach':'અમારો અભિગમ જાણો','People at the centre':'લોકો કેન્દ્રમાં','Technology with a human purpose':'માનવીય હેતુ સાથેની ટેક્નોલોજી',
    'THE CARELYNX PLATFORM':'CARELYNX પ્લેટફોર્મ','Different roles. One shared direction.':'અલગ ભૂમિકાઓ. એક સહિયારી દિશા.','Explore how a connected ecosystem can support the people and teams involved in care.':'જોડાયેલું ઇકોસિસ્ટમ આરોગ્યસેવા સાથે સંકળાયેલા લોકો અને ટીમોને કેવી રીતે મદદ કરી શકે તે જાણો.',
    'Navigate the care journey':'સારવારની પ્રક્રિયામાં માર્ગદર્શન','Coordinate operations':'કામકાજનું સંકલન','Support medicine workflows':'દવાઓની પ્રક્રિયામાં સહાય','Support testing workflows':'ટેસ્ટિંગની પ્રક્રિયામાં સહાય',
    'For Patients':'દર્દીઓ માટે','For Hospitals':'હોસ્પિટલો માટે','For Pharmacies':'ફાર્મસીઓ માટે','For Laboratories':'લેબોરેટરીઝ માટે',
    'A clearer way to engage with healthcare services and manage the steps in a care journey.':'આરોગ્યસેવાનો ઉપયોગ કરવા અને સારવારના પગલાં સંભાળવાની વધુ સ્પષ્ટ રીત.',
    'Digital workflow concepts designed to support teams and improve coordination.':'ટીમને સહાય અને સંકલન સુધારવા માટે રચાયેલા ડિજિટલ વર્કફ્લોના વિચારો.',
    'Explore ways pharmacy-related steps could connect with the wider care journey.':'ફાર્મસી સંબંધિત પગલાં સારવારની સમગ્ર પ્રક્રિયા સાથે કેવી રીતે જોડાઈ શકે તે જાણો.',
    'Ideas for clearer coordination between testing services and healthcare teams.':'ટેસ્ટિંગ સેવાઓ અને આરોગ્યસેવા ટીમો વચ્ચે વધુ સ્પષ્ટ સંકલન માટેના વિચારો.',
    'Patient-focused information':'દર્દી-કેન્દ્રિત માહિતી','Appointment workflow concepts':'અપોઇન્ટમેન્ટ પ્રક્રિયાના વિકલ્પો','Prescription-related coordination':'પ્રિસ્ક્રિપ્શન સંબંધિત સંકલન',
    'Hospital workflow support':'હોસ્પિટલ વર્કફ્લોમાં સહાય','Patient and service coordination':'દર્દી અને સેવાઓનું સંકલન','Operational visibility concepts':'કામકાજની સ્પષ્ટતા માટેના વિકલ્પો',
    'Prescription workflow concepts':'પ્રિસ્ક્રિપ્શન પ્રક્રિયાના વિકલ્પો','Refill coordination ideas':'દવા ફરી મેળવવાના સંકલનના વિચારો','Connected service workflows':'જોડાયેલી સેવા પ્રક્રિયાઓ',
    'Testing workflow concepts':'ટેસ્ટિંગ પ્રક્રિયાના વિકલ્પો','Result coordination ideas':'પરિણામોના સંકલનના વિચારો','Service communication':'સેવા સંચાર',
    'Learn more':'વધુ જાણો','Partner with us':'અમારી સાથે ભાગીદારી કરો',
    'Note: CareLynx applications and features are under development/testing. The examples above describe intended directions, not a claim that these services are currently live.':'નોંધ: CareLynx એપ્લિકેશન્સ અને સુવિધાઓ વિકાસ/પરીક્ષણ હેઠળ છે. ઉપરના ઉદાહરણો ભવિષ્યની દિશા દર્શાવે છે; આ સેવાઓ અત્યારે ઉપલબ્ધ હોવાનો દાવો નથી.',
    'APPLICATIONS':'એપ્લિકેશન્સ','Designed for the devices people use.':'લોકો વાપરે છે તે ઉપકરણો માટે રચાયેલું.','CareLynx is exploring application experiences for desktop and mobile. Availability and supported features will be announced when confirmed.':'CareLynx ડેસ્કટોપ અને મોબાઇલ માટે એપ્લિકેશન વિકલ્પો વિકસાવી રહ્યું છે. ઉપલબ્ધતા અને સુવિધાઓની પુષ્ટિ થયા પછી જાહેરાત કરવામાં આવશે.',
    'Desktop experience':'ડેસ્કટોપ અનુભવ','Windows application — status to be confirmed':'Windows એપ્લિકેશન — સ્થિતિની પુષ્ટિ બાકી','Mobile experience':'મોબાઇલ અનુભવ','Android application — status to be confirmed':'Android એપ્લિકેશન — સ્થિતિની પુષ્ટિ બાકી','In development':'વિકાસ હેઠળ',
    'OUR DIRECTION':'અમારી દિશા','Building with purpose, step by step.':'હેતુ સાથે, પગલું-દર-પગલું આગળ વધવું.','A high-level roadmap that can be updated as milestones are confirmed.':'મુખ્ય તબક્કાઓની પુષ્ટિ થતાં અપડેટ કરી શકાય એવો રોડમેપ.',
    'PHASE 1':'તબક્કો ૧','Build & validate':'વિકાસ અને ચકાસણી','Refine the product, test core workflows and gather feedback.':'ઉત્પાદન સુધારવું, મુખ્ય પ્રક્રિયાઓનું પરીક્ષણ કરવું અને પ્રતિસાદ મેળવવો.',
    'PHASE 2':'તબક્કો ૨','Partner & improve':'ભાગીદારી અને સુધારો','Work with relevant healthcare partners and improve the experience.':'યોગ્ય આરોગ્યસેવા ભાગીદારો સાથે કામ કરીને અનુભવ સુધારવો.',
    'PHASE 3':'તબક્કો ૩','Expand carefully':'સાવચેતીપૂર્વક વિસ્તરણ','Explore additional capabilities based on needs, readiness and trust.':'જરૂરિયાત, તૈયારી અને વિશ્વાસના આધારે નવી સુવિધાઓ શોધવી.',
    'GROW WITH CARELYNX':'CARELYNX સાથે આગળ વધો',"Let's build a more connected healthcare future.":'ચાલો, વધુ જોડાયેલું આરોગ્યસેવાનું ભવિષ્ય બનાવીએ.',
    'Are you a hospital, pharmacy or laboratory interested in exploring a partnership? Send us an inquiry and our team can follow up.':'શું તમારી હોસ્પિટલ, ફાર્મસી અથવા લેબોરેટરી ભાગીદારીમાં રસ ધરાવે છે? અમને પૂછપરછ મોકલો; અમારી ટીમ સંપર્ક કરશે.',
    'Partnership conversations':'ભાગીદારી અંગે ચર્ચા','Shared learning and feedback':'સહિયારું જ્ઞાન અને પ્રતિસાદ','Responsible, privacy-aware approach':'જવાબદાર અને ગોપનીયતા-સચેત અભિગમ',
    'Partnership inquiry':'ભાગીદારી પૂછપરછ','Tell us a little about your organisation.':'તમારી સંસ્થા વિશે થોડી માહિતી આપો.','Full name *':'પૂરું નામ *','Organisation name *':'સંસ્થાનું નામ *','Email address *':'ઇમેઇલ સરનામું *','Phone number':'ફોન નંબર','Organisation type *':'સંસ્થાનો પ્રકાર *','Select a type':'પ્રકાર પસંદ કરો','Other healthcare organisation':'અન્ય આરોગ્યસેવા સંસ્થા','How would you like to collaborate? *':'તમે કેવી રીતે સહકાર આપવા માંગો છો? *','Your name':'તમારું નામ','Organisation':'સંસ્થા','Optional':'વૈકલ્પિક','Tell us briefly about your interest':'તમારા રસ વિશે ટૂંકમાં જણાવો','Prepare inquiry':'પૂછપરછ તૈયાર કરો',
    'Demo form: it opens your email app. Connect a secure form service before publishing.':'ડેમો ફોર્મ: તે તમારી ઇમેઇલ એપ્લિકેશન ખોલે છે. પ્રકાશિત કરતાં પહેલાં સુરક્ષિત ફોર્મ સેવા જોડો.',
    'QUICK ANSWERS':'ઝડપી જવાબો','Frequently asked questions':'વારંવાર પૂછાતા પ્રશ્નો','Is CareLynx available to use today?':'શું CareLynx અત્યારે ઉપયોગ માટે ઉપલબ્ધ છે?',
    'The applications are described as being in development/testing. Please contact CareLynx for the latest confirmed status.':'એપ્લિકેશન્સ વિકાસ/પરીક્ષણ હેઠળ છે. તાજી અને પુષ્ટિ કરેલી સ્થિતિ માટે CareLynx નો સંપર્ક કરો.',
    'Who is CareLynx being designed for?':'CareLynx કોના માટે બનાવવામાં આવી રહ્યું છે?','The intended ecosystem includes patients, hospitals, pharmacies and laboratories.':'આ ઇકોસિસ્ટમમાં દર્દીઓ, હોસ્પિટલો, ફાર્મસીઓ અને લેબોરેટરીઝનો સમાવેશ કરવાનો હેતુ છે.',
    'How can my organisation connect with CareLynx?':'મારી સંસ્થા CareLynx સાથે કેવી રીતે જોડાઈ શકે?','Use the partnership inquiry form on this page to express interest. The form must be connected to a working email or backend before the website launches.':'રસ દર્શાવવા આ પેજનું ભાગીદારી ફોર્મ વાપરો. વેબસાઇટ શરૂ કરતાં પહેલાં ફોર્મને કાર્યરત ઇમેઇલ અથવા બેકએન્ડ સાથે જોડવું જરૂરી છે.',
    'How does CareLynx approach privacy?':'CareLynx ગોપનીયતાને કેવી રીતે મહત્વ આપે છે?','Privacy and appropriate, role-based access should be central to the platform. Review the final data practices and legal documents before making specific compliance claims.':'ગોપનીયતા અને ભૂમિકા-આધારિત યોગ્ય પહોંચ પ્લેટફોર્મના કેન્દ્રમાં હોવી જોઈએ. કાયદાકીય અનુપાલન અંગે દાવો કરતાં પહેલાં ડેટા પ્રક્રિયા અને કાનૂની દસ્તાવેજોની સમીક્ષા કરો.',
    'CONTACT CARELYNX':'CARELYNX નો સંપર્ક કરો','Have a question or an idea?':'કોઈ પ્રશ્ન કે વિચાર છે?','We would like to hear from healthcare professionals and organisations interested in a more connected care experience.':'વધુ જોડાયેલા આરોગ્યસેવા અનુભવમાં રસ ધરાવતા નિષ્ણાતો અને સંસ્થાઓ પાસેથી અમને સાંભળવું ગમશે.',
    'Email':'ઇમેઇલ','Add your official business email before launch':'વેબસાઇટ શરૂ કરતાં પહેલાં સત્તાવાર બિઝનેસ ઇમેઇલ ઉમેરો','Public business address to be confirmed':'જાહેર બિઝનેસ સરનામાની પુષ્ટિ બાકી','Send a message':'સંદેશ મોકલો','Message *':'સંદેશ *','How can we help?':'અમે કેવી રીતે મદદ કરી શકીએ?','Prepare message':'સંદેશ તૈયાર કરો','Demo form: connect an email or backend service before launch.':'ડેમો ફોર્મ: શરૂ કરતાં પહેલાં ઇમેઇલ અથવા બેકએન્ડ સેવા જોડો.',
    'Smarter connections for a more coordinated healthcare future.':'વધુ સંકલિત આરોગ્યસેવાના ભવિષ્ય માટે સ્માર્ટ જોડાણો.','Explore':'જાણો','Connect':'જોડાઓ','Legal':'કાનૂની','Privacy policy*':'ગોપનીયતા નીતિ*','Terms*':'નિયમો અને શરતો*','Data protection*':'ડેટા સુરક્ષા*','All rights reserved.':'સર્વાધિકાર સુરક્ષિત.','*Publish reviewed legal documents before launch.':'*વેબસાઇટ શરૂ કરતાં પહેલાં સમીક્ષા કરેલા કાનૂની દસ્તાવેજો પ્રકાશિત કરો.','Back to top ↑':'ઉપર જાઓ ↑'
  },
  hi: {
    'Home':'होम','About':'हमारे बारे में','Platform':'प्लेटफ़ॉर्म','Applications':'ऐप्लिकेशन','Partners':'भागीदार','Contact':'संपर्क',
    'BETTER HEALTHCARE. TOGETHER.':'मिलकर बेहतर स्वास्थ्य सेवा।','Connected care.':'जुड़ी हुई स्वास्थ्य सेवा।','Clearer possibilities.':'बेहतर संभावनाएँ।',
    'CareLynx is building a connected healthcare ecosystem for patients, hospitals, pharmacies and laboratories.':'CareLynx मरीजों, अस्पतालों, फार्मेसियों और प्रयोगशालाओं के लिए एक जुड़ा हुआ हेल्थकेयर इकोसिस्टम विकसित कर रहा है।',
    'Explore the platform':'प्लेटफ़ॉर्म देखें','Discover CareLynx':'CareLynx को जानें','Designed around connection, clarity and care':'जुड़ाव, स्पष्टता और देखभाल पर आधारित',
    'One connected ecosystem':'एक जुड़ा हुआ इकोसिस्टम','Built for a healthier tomorrow':'स्वस्थ कल के लिए','Patients':'मरीज','Hospitals':'अस्पताल','Pharmacies':'फार्मेसियाँ','Laboratories':'प्रयोगशालाएँ',
    'Care access':'स्वास्थ्य सेवा तक पहुँच','Care coordination':'देखभाल का समन्वय','Prescription workflows':'प्रिस्क्रिप्शन प्रक्रियाएँ','Testing coordination':'जाँच का समन्वय',
    'ABOUT CARELYNX':'CARELYNX के बारे में','A more connected way to think about healthcare.':'स्वास्थ्य सेवा के लिए अधिक जुड़ा हुआ दृष्टिकोण।',
    'CareLynx Pvt. Ltd. is working toward a connected digital healthcare experience that helps different parts of the care journey work together more smoothly.':'CareLynx Pvt. Ltd. ऐसा जुड़ा हुआ डिजिटल स्वास्थ्य अनुभव विकसित कर रहा है जो देखभाल की यात्रा के अलग-अलग हिस्सों को बेहतर तालमेल से काम करने में मदद करे।',
    'Our focus is to make healthcare workflows clearer, more coordinated and easier to navigate—while respecting privacy and appropriate access to information.':'हमारा लक्ष्य स्वास्थ्य सेवाओं की प्रक्रियाओं को अधिक स्पष्ट, समन्वित और आसान बनाना है—साथ ही गोपनीयता और जानकारी तक उचित पहुँच का सम्मान करना है।',
    'Explore our approach':'हमारा दृष्टिकोण जानें','People at the centre':'लोग केंद्र में','Technology with a human purpose':'मानवीय उद्देश्य वाली तकनीक',
    'THE CARELYNX PLATFORM':'CARELYNX प्लेटफ़ॉर्म','Different roles. One shared direction.':'अलग भूमिकाएँ। एक साझा दिशा।','Explore how a connected ecosystem can support the people and teams involved in care.':'जानें कि जुड़ा हुआ इकोसिस्टम स्वास्थ्य सेवा से जुड़े लोगों और टीमों की मदद कैसे कर सकता है।',
    'Navigate the care journey':'देखभाल की यात्रा में मार्गदर्शन','Coordinate operations':'कामकाज का समन्वय','Support medicine workflows':'दवा प्रक्रियाओं में सहायता','Support testing workflows':'जाँच प्रक्रियाओं में सहायता',
    'For Patients':'मरीजों के लिए','For Hospitals':'अस्पतालों के लिए','For Pharmacies':'फार्मेसियों के लिए','For Laboratories':'प्रयोगशालाओं के लिए',
    'A clearer way to engage with healthcare services and manage the steps in a care journey.':'स्वास्थ्य सेवाओं से जुड़ने और देखभाल के चरणों को संभालने का अधिक स्पष्ट तरीका।',
    'Digital workflow concepts designed to support teams and improve coordination.':'टीमों की सहायता और समन्वय सुधारने के लिए डिज़ाइन की गई डिजिटल प्रक्रिया अवधारणाएँ।',
    'Explore ways pharmacy-related steps could connect with the wider care journey.':'जानें कि फार्मेसी से जुड़े चरण व्यापक देखभाल प्रक्रिया से कैसे जुड़ सकते हैं।',
    'Ideas for clearer coordination between testing services and healthcare teams.':'जाँच सेवाओं और स्वास्थ्य टीमों के बीच बेहतर समन्वय के विचार।',
    'Patient-focused information':'मरीज-केंद्रित जानकारी','Appointment workflow concepts':'अपॉइंटमेंट प्रक्रिया की अवधारणाएँ','Prescription-related coordination':'प्रिस्क्रिप्शन संबंधी समन्वय','Hospital workflow support':'अस्पताल प्रक्रिया में सहायता','Patient and service coordination':'मरीज और सेवा समन्वय','Operational visibility concepts':'कामकाज की स्पष्टता की अवधारणाएँ','Prescription workflow concepts':'प्रिस्क्रिप्शन प्रक्रिया की अवधारणाएँ','Refill coordination ideas':'दवा दोबारा लेने के समन्वय के विचार','Connected service workflows':'जुड़ी हुई सेवा प्रक्रियाएँ','Testing workflow concepts':'जाँच प्रक्रिया की अवधारणाएँ','Result coordination ideas':'रिपोर्ट समन्वय के विचार','Service communication':'सेवा संचार','Learn more':'और जानें','Partner with us':'हमारे साथ भागीदारी करें',
    'Note: CareLynx applications and features are under development/testing. The examples above describe intended directions, not a claim that these services are currently live.':'नोट: CareLynx ऐप्लिकेशन और सुविधाएँ विकास/परीक्षण के चरण में हैं। ऊपर दिए उदाहरण भविष्य की दिशा बताते हैं, ये सेवाएँ अभी उपलब्ध होने का दावा नहीं हैं।',
    'APPLICATIONS':'ऐप्लिकेशन','Designed for the devices people use.':'लोगों के इस्तेमाल वाले उपकरणों के लिए डिज़ाइन किया गया।','CareLynx is exploring application experiences for desktop and mobile. Availability and supported features will be announced when confirmed.':'CareLynx डेस्कटॉप और मोबाइल ऐप अनुभवों पर काम कर रहा है। उपलब्धता और सुविधाओं की पुष्टि होने पर घोषणा की जाएगी।','Desktop experience':'डेस्कटॉप अनुभव','Windows application — status to be confirmed':'Windows ऐप — स्थिति की पुष्टि बाकी','Mobile experience':'मोबाइल अनुभव','Android application — status to be confirmed':'Android ऐप — स्थिति की पुष्टि बाकी','In development':'विकासाधीन',
    'OUR DIRECTION':'हमारी दिशा','Building with purpose, step by step.':'उद्देश्य के साथ, कदम-दर-कदम आगे बढ़ना।','A high-level roadmap that can be updated as milestones are confirmed.':'मुख्य चरणों की पुष्टि होने पर अपडेट किया जा सकने वाला रोडमैप।','PHASE 1':'चरण १','Build & validate':'निर्माण और परीक्षण','Refine the product, test core workflows and gather feedback.':'उत्पाद में सुधार, मुख्य प्रक्रियाओं का परीक्षण और सुझाव एकत्र करना।','PHASE 2':'चरण २','Partner & improve':'भागीदारी और सुधार','Work with relevant healthcare partners and improve the experience.':'स्वास्थ्य सेवा भागीदारों के साथ काम करके अनुभव सुधारना।','PHASE 3':'चरण ३','Expand carefully':'सावधानी से विस्तार','Explore additional capabilities based on needs, readiness and trust.':'ज़रूरत, तैयारी और भरोसे के आधार पर अतिरिक्त सुविधाएँ तलाशना।',
    'GROW WITH CARELYNX':'CARELYNX के साथ आगे बढ़ें',"Let's build a more connected healthcare future.":'आइए, अधिक जुड़ा हुआ स्वास्थ्य सेवा भविष्य बनाएँ।','Are you a hospital, pharmacy or laboratory interested in exploring a partnership? Send us an inquiry and our team can follow up.':'क्या आपका अस्पताल, फार्मेसी या प्रयोगशाला साझेदारी में रुचि रखती है? हमें पूछताछ भेजें, हमारी टीम संपर्क करेगी।','Partnership conversations':'साझेदारी पर बातचीत','Shared learning and feedback':'साझा सीख और सुझाव','Responsible, privacy-aware approach':'जिम्मेदार और गोपनीयता-सचेत दृष्टिकोण','Partnership inquiry':'साझेदारी पूछताछ','Tell us a little about your organisation.':'अपने संगठन के बारे में कुछ जानकारी दें।','Full name *':'पूरा नाम *','Organisation name *':'संगठन का नाम *','Email address *':'ईमेल पता *','Phone number':'फ़ोन नंबर','Organisation type *':'संगठन का प्रकार *','Select a type':'प्रकार चुनें','Other healthcare organisation':'अन्य स्वास्थ्य संगठन','How would you like to collaborate? *':'आप किस तरह सहयोग करना चाहेंगे? *','Your name':'आपका नाम','Organisation':'संगठन','Optional':'वैकल्पिक','Tell us briefly about your interest':'अपनी रुचि के बारे में संक्षेप में बताएँ','Prepare inquiry':'पूछताछ तैयार करें','Demo form: it opens your email app. Connect a secure form service before publishing.':'डेमो फ़ॉर्म: यह आपका ईमेल ऐप खोलता है। प्रकाशित करने से पहले सुरक्षित फ़ॉर्म सेवा जोड़ें।','QUICK ANSWERS':'त्वरित जवाब','Frequently asked questions':'अक्सर पूछे जाने वाले प्रश्न','Is CareLynx available to use today?':'क्या CareLynx आज उपयोग के लिए उपलब्ध है?','The applications are described as being in development/testing. Please contact CareLynx for the latest confirmed status.':'ऐप्लिकेशन विकास/परीक्षण के चरण में हैं। नवीनतम पुष्ट स्थिति के लिए CareLynx से संपर्क करें।','Who is CareLynx being designed for?':'CareLynx किसके लिए बनाया जा रहा है?','The intended ecosystem includes patients, hospitals, pharmacies and laboratories.':'इस इकोसिस्टम में मरीज, अस्पताल, फार्मेसियाँ और प्रयोगशालाएँ शामिल हैं।','How can my organisation connect with CareLynx?':'मेरा संगठन CareLynx से कैसे जुड़ सकता है?','Use the partnership inquiry form on this page to express interest. The form must be connected to a working email or backend before the website launches.':'रुचि जताने के लिए इस पेज का साझेदारी फ़ॉर्म इस्तेमाल करें। वेबसाइट शुरू करने से पहले इसे काम करने वाले ईमेल या बैकएंड से जोड़ना होगा।','How does CareLynx approach privacy?':'CareLynx गोपनीयता को कैसे देखता है?','Privacy and appropriate, role-based access should be central to the platform. Review the final data practices and legal documents before making specific compliance claims.':'गोपनीयता और भूमिका-आधारित उचित पहुँच प्लेटफ़ॉर्म के केंद्र में होनी चाहिए। अनुपालन का दावा करने से पहले डेटा प्रक्रियाओं और कानूनी दस्तावेज़ों की समीक्षा करें।','CONTACT CARELYNX':'CARELYNX से संपर्क करें','Have a question or an idea?':'कोई सवाल या विचार है?','We would like to hear from healthcare professionals and organisations interested in a more connected care experience.':'हम अधिक जुड़ी हुई स्वास्थ्य सेवा में रुचि रखने वाले विशेषज्ञों और संगठनों से सुनना चाहेंगे।','Email':'ईमेल','Add your official business email before launch':'शुरू करने से पहले आधिकारिक व्यावसायिक ईमेल जोड़ें','Public business address to be confirmed':'सार्वजनिक व्यावसायिक पते की पुष्टि बाकी','Send a message':'संदेश भेजें','Message *':'संदेश *','How can we help?':'हम कैसे मदद कर सकते हैं?','Prepare message':'संदेश तैयार करें','Demo form: connect an email or backend service before launch.':'डेमो फ़ॉर्म: शुरू करने से पहले ईमेल या बैकएंड सेवा जोड़ें।','Smarter connections for a more coordinated healthcare future.':'अधिक समन्वित स्वास्थ्य सेवा भविष्य के लिए बेहतर जुड़ाव।','Explore':'जानें','Connect':'जुड़ें','Legal':'कानूनी','Privacy policy*':'गोपनीयता नीति*','Terms*':'नियम और शर्तें*','Data protection*':'डेटा सुरक्षा*','All rights reserved.':'सर्वाधिकार सुरक्षित।','*Publish reviewed legal documents before launch.':'*शुरू करने से पहले समीक्षा किए गए कानूनी दस्तावेज़ प्रकाशित करें।','Back to top ↑':'ऊपर जाएँ ↑'
  }
};

const originalText = new WeakMap();
const originalAttrs = new WeakMap();
function translateWholeSite(lang) {
  const dict = siteTranslations[lang] || {};
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const original = originalText.get(node);
    const trimmed = original.trim();
    if (!trimmed) continue;
    const translated = dict[trimmed];
    if (translated) node.nodeValue = original.replace(trimmed, translated);
    else node.nodeValue = original;
  }
  const attrSelectors = ['placeholder', 'aria-label', 'title'];
  document.querySelectorAll('input, textarea, button, select, a, nav, form, summary').forEach(el => {
    attrSelectors.forEach(attr => {
      if (!el.hasAttribute(attr)) return;
      if (!originalAttrs.has(el)) originalAttrs.set(el, {});
      const saved = originalAttrs.get(el);
      if (!(attr in saved)) saved[attr] = el.getAttribute(attr);
      const original = saved[attr];
      el.setAttribute(attr, dict[original] || original);
    });
  });
  // Translate select options as well, without changing their submitted values.
  document.querySelectorAll('option').forEach(el => {
    if (!originalText.has(el.firstChild) && el.firstChild) originalText.set(el.firstChild, el.textContent);
    if (el.firstChild) {
      const original = originalText.get(el.firstChild);
      el.textContent = dict[original] || original;
    }
  });
  document.documentElement.lang = lang;
}
const languageSelect = document.getElementById('languageSelect');
const savedLanguage = localStorage.getItem('carelynx-language') || 'en';
languageSelect.value = savedLanguage;
if (savedLanguage !== 'en') translateWholeSite(savedLanguage);
languageSelect.addEventListener('change', event => {
  const lang = event.target.value;
  if (lang === 'en') {
    // Restore every original text and attribute by applying the saved English source.
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) if (originalText.has(node)) node.nodeValue = originalText.get(node);
    document.querySelectorAll('option').forEach(el => { if (el.firstChild && originalText.has(el.firstChild)) el.textContent = originalText.get(el.firstChild); });
    document.querySelectorAll('input, textarea, button, select, a, nav, form, summary').forEach(el => {
      const saved = originalAttrs.get(el); if (saved) Object.entries(saved).forEach(([attr, value]) => el.setAttribute(attr, value));
    });
    document.documentElement.lang = 'en';
  } else translateWholeSite(lang);
  localStorage.setItem('carelynx-language', lang);
});

// Contact form posts securely to the configured FormSubmit endpoint.

