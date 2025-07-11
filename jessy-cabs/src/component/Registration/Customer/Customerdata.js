import axios from 'axios';
// import React, { useState } from 'react';
import { APIURL } from "../../url";

const apiUrl = APIURL;

export const Organization = async () => {
  try {
    const response = await axios.get(`${apiUrl}/organizationoptions`);
    return response.data;
  } catch {
  }
};
// Customer Type
export const Customertype = [
  {
    Option: "Corporate",
    optionvalue: "corporate",
  },
  {
    Option: "Travels",
    optionvalue: "travels",
  },
  {
    Option: "Gen Customers",
    optionvalue: "gencustomers",
  },
];


export const Customertypefilterdata = [
  {
    Option: "Corporate",
    optionvalue: "corporate",
  },
  {
    Option: "Travels",
    optionvalue: "travels",
  },
  {
    Option: "Gen Customers",
    optionvalue: "gencustomers",
  },
  {
    Option: "All",
    optionvalue: "All",
  },
];

// dummy values for the state

// export const allStations = [
//   "anantapur", "chittoor", "east godavari", "guntur", "krishna", "kurnool", "prakasam", "srikakulam", 
//   "visakhapatnam", "west godavari", "ysr kadapa", "anjaw", "changlang", "east kameng", "east siang", 
//   "kurung kumey", "lohit", "longding", "lower dibang valley", "lower subansiri", "namsai", "papum pare", 
//   "tawang", "tirap", "upper siang", "upper subansiri", "west kameng", "west siang", "baksa", "barpeta", 
//   "biswanath", "bongaigaon", "cachar", "charaideo", "chirang", "darrang", "dhemaji", "dhubri", "dibrugarh", 
//   "goalpara", "golaghat", "hailakandi", "hojai", "jorhat", "kamrup", "kamrup metropolitan", "karbi anglong", 
//   "karimganj", "kokrajhar", "lakhimpur", "morigaon", "nagaon", "nalbari", "sivasagar", "sonitpur", 
//   "south salmara-mankachar", "tinsukia", "udalguri", "west karbi anglong", "araria", "arwal", 
//   "banka", "begusarai", "bhagalpur", "bhojpur", "buxar", "darbhanga", "east champaran", "gaya", "gopalganj", 
//   "jamui", "jehanabad", "kaimur", "katihar", "khagaria", "kishanganj", "lakhisarai", "madhepura", "madhubani", 
//   "munger", "muzaffarpur", "nalanda", "nawada", "patna", "purnia", "rohtas", "saharsa", "samastipur", "saran", 
//   "sheikhpura", "sheohar", "sitamarhi", "supaul", "vaishali", "west champaran", "balod", "baloda bazar", "balrampur", 
//   "bastar", "bemetara", "bijapur", "dantewada", "dhamtari", "durg", "gariaband", "janjgir-champa", 
//   "jashpur", "kabirdham", "kanker", "korba", "kondagaon", "mahasamund", "mungeli", "narayanpur", "raigarh", 
//   "raipur", "rajnandgaon", "sukma", "surajpur", "surguja", "north goa", "south goa", "ahmedabad", "amreli", "anand", 
//   "aravalli", "banas kantha", "bharuch", "bhavnagar", "botad", "chhota udepur", "dahod", "dangs", "gandhinagar", 
//   "gir somnath", "jamnagar", "junagadh", "kutch", "kheda", "mahisagar", "mehsana", "morbi", "narmada", "navsari", 
//   "panchmahal", "patan", "porbandar", "rajkot", "sabarkantha", "surat", "surendranagar", "tapi", "vadodara", 
//   "valsad", "ambala", "bhiwani", "charkhi dadri", "faridabad", "gurugram", "hisar", "jhajjar", "jind", "kaithal", 
//   "karnal", "kurukshetra", "mahendragarh", "mewat", "palwal", "panchkula", "panipat", "rewari", "rohtak", "sirsa", 
//   "sonipat", "yamunanagar", "bilaspur", "chamba", "hamirpur", "kangra", "kullu", "kinnaur", "mandi", "shimla", "sirmaur", 
//   "solan", "una", "bokaro", "chatra", "deoghar", "dhanbad", "dumka", "giridih", "godda", "gumla", "hazaribagh", 
//   "jamtara", "khunti", "koderma", "latehar", "lohardaga", "pakur", "palamu", "ramgarh", "ranchi", "sahebganj", 
//   "seraikela kharsawan", "simdega", "west singhbhum", "bagalkot", "ballari", "belagavi", "banglore", "bidar", "chamarajanagar", "chikkaballapur", "chikkamagaluru", "chitradurga", "dakshina kannada", 
//   "davanagere", "dharwad", "gadag", "hassan", "haveri", "kalaburagi", "kodagu", "kolar", "koppal", "mandya", "mysuru", 
//   "raichur", "ramanagara", "shivamogga", "tumakuru", "udupi", "uttara kannada", "vijayapura", "yadgir", "alappuzha", 
//   "ernakulam", "idukki", "kannur", "kasaragod", "kottayam", "kollam", "kozhikode", "malappuram", "palakkad", 
//   "pathanamthitta", "thiruvananthapuram", "thrissur", "wayanad", 
//   // **Tamil Nadu districts start here** 
//   "Ariyalur", "Chennai", "coimbatore", "cuddalore", "dharmapuri", "dindigul", "erode", "kanchipuram", "kanyakumari",
//    "karur", "krishnagiri", "madurai","nagapattinam", "namakkal", "nilgiris", "perambalur", "pudukkottai", "ramanathapuram",
//   "salem", "sivaganga", "thanjavur", "theni", "thoothukudi (tuticorin)", "tiruchirappalli",
//   "tirunelveli","tenkasi", "tiruppur", "tiruvallur", "tiruvannamalai", "tiruvarur", "vellore", "viluppuram", "virudhunagar", 
//   // **Tamil Nadu districts end here** 
//   "agar malwa", "alirajpur", "anuppur", "ashok nagar", "balaghat", "barwani", "betul", "bhind", "bhopal", "burhanpur", 
//   "chhatarpur", "chhindwara", "damoh", "datia", "dewas", "dhar", "dindori", "guna", "gwalior", "harda", "hoshangabad", 
//   "indore", "jabalpur", "jhabua", "katni", "khandwa", "khargone", "mandla", "mandsaur", "morena", "narsinghpur", 
//   "neemuch", "panna", "raisen", "rajgarh", "ratlam", "rewa", "sagar", "satna", "sehore", "seoni", "shahdol", 
//   "shajapur", "sheopur", "shivpuri", "sidhi", "singrauli", "tikamgarh", "ujjain", "umaria", "vidisha", 
//   "ahmednagar", "akola", "amravati", "aurangabad", "beed", "bhandara", "buldhana", "chandrapur", "dhule", "gadchiroli", 
//   "gondia", "hingoli", "jalgaon", "jalna", "kolhapur", "latur", "mumbai", "mumbai suburban", "nandurbar", "nashik", 
//   "osmanabad", "palghar", "parbhani", "pune", "raigad", "ratnagiri", "sangli", "satara", "sindhudurg", "solapur", 
//   "thane", "wardha", "washim", "yavatmal", "bishnupur", "chandel", "churachandpur", "imphal east", "imphal west", 
//   "jiribam", "kangpokpi", "noney", "senapati", "tamenglong", "tengnoupal", "thoubal", "ukhrul", "east garo hills", 
//   "east khasi hills", "jaintia hills", "ri bhoi", "west garo hills", "west khasi hills", "west jaintia hills"
// ];

export const allStations = [
  // kerala
  "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam",
  "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram",
  "Thrissur", "Wayanad", "Kerala",

  // Karnatka
  "Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar",
  "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere",
  "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu",
  "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara",
  "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir","Bangalore",

  // Tamil Nadu
  "Abiramam", "Adirampattinam", "Aduthurai", "Alagapuram", "Alandur", "Alanganallur", "Alangayam", "Alwa Tirunagari", "Ambasamudram",
  "Ambattur", "Ambur", "Ammapettai", "Anamalais", "Annavasal", "Annur", "Annamalainagar", "Anthiyur", "Arakkonam", "Arantangi", "Arcot",
  "Arimalam", "Ariyalur", "Arni", "Arumbavur", "Arumuganeri", "Aruppukkottai", "Aruvankad", "Attur", "Auroville", "Avinashi", "Ayakudi",
  "Ayyampettai", "Belur", "Bhavani", "Bodinayakkanur", "Chengam", "Chennai", "Chennimalai", "Chetput", "Chettipalaiyam", "Cheyyar",
  "Cheyyur", "Chidambaram", "Chingleput", "Chinna Salem", "Chinnamanur", "Chinnasekkadu", "Cholapuram", "Coimbatore", "Colachel",
  "Cuddalore", "Cumbum", "Denkanikota", "Desur", "Devadanappatti", "Devakottai", "Dhali", "Dharapuram", "Dharmapuri", "Dindigul", "Dusi",
  "Elumalai", "Elayirampannai", "Eral", "Eraniel", "Erode", "Erumaippatti", "Ettaiyapuram", "Gangaikondan", "Gangavalli", "Gingee",
  "Gobichettipalayam", "Gudalur", "Gudiyatham", "Gummidipundi", "Gandhi Nagar", "Guduvancheri", "Harur", "Hosur", "Idappadi", "Ilampillai",
  "Iluppur", "Injambakkam", "Irugur", "Jalakandapuram", "Jalarpet", "Jayamkondacholapuram", "Kadambur", "Kadayanallur", "Kalakkadu",
  "Kalavai", "Kallakkurichchi", "Kallidaikurichi", "Kallupatti", "Kalugumalai", "Kamuthi", "Kanadukattan", "Kancheepuram", "Kanchipuram",
  "Kangayam", "Kanniyakumari", "Karambakkudi", "Kariapatti", "Karumbakkam", "Karur", "Kattivakkam", "Kayalpattinam", "Kayattar",
  "Keelakarai", "Kelamangalam", "Kilvelur", "Kodaikanal", "Kodumudi", "Kombai", "Konganapuram", "Koothanallur", "Koradachcheri",
  "Korampallam", "Kotagiri", "Kottaiyur", "Kovilpatti", "Krishnagiri", "Kulattur", "Kulittalai", "Kumaralingam", "Kumbakonam", "Kunnattur",
  "Kurinjippadi", "Kuttalam", "Kuzhithurai", "Karaikkudi", "Karamadai", "Katpadi", "Kattupputtur", "Kaveripatnam", "Kil Bhuvanagiri",
  "Kiranur", "Lalgudi", "Madambakkam", "Madipakkam", "Madukkarai", "Madukkur", "Madurai", "Madurantakam", "Mallasamudram", "Mallapuram",
  "Manali", "Manalurpettai", "Manamadurai", "Manappakkam", "Manapparai", "Manavalakurichi", "Mandapam", "Mangalam", "Mannargudi",
  "Marakkanam", "Masinigudi", "Mayiladuthurai", "Melur", "Mettuppalaiyam", "Mettur", "Mohanur", "Mudukulattur", "Musiri", "Muttupet",
  "Mallur", "Marandahalli", "Mattur", "Minjur", "Mulanur", "Naduvattam", "Nagapattinam", "Namakkal", "Nambiyur", "Nambutalai",
  "Nandambakkam", "Nangavalli", "Nangilickondan", "Nanguneri", "Nannilam", "Nattam", "Needamangalam", "Neelankarai", "Negapatam",
  "Nellikkuppam", "Nilakottai", "Nilgiris", "Nagercoil", "Namagiripettai", "Naravarikuppam", "Nattarasankottai", "Odugattur", "Omalur",
  "Ooty", "Padmanabhapuram", "Palani", "Palavakkam", "Palladam", "Pallappatti", "Pallattur", "Pallikondai", "Pallipattu", "Pallippatti",
  "Pallavaram", "Panruti", "Papanasam", "Paramagudi", "Pattukkottai", "Pennadam", "Pennagaram", "Pennathur", "Peraiyur", "Perambalur",
  "Peranamallur", "Peranampattu", "Peravurani", "Periyakulam", "Periyanayakkanpalaiyam", "Periyanegamam", "Periyapatti", "Periyapattinam",
  "Perundurai", "Perungudi", "Perur", "Pollachi", "Polur", "Ponnamaravati", "Ponneri", "Poonamalle", "Porur", "Pudukkottai", "Puduppatti",
  "Puduvayal", "Pudur", "Puliyangudi", "Puliyur", "Pullambadi", "Punjai Puliyampatti", "Palakkodu", "Palamedu", "Papireddippatti",
  "Papparappatti", "Rajapalaiyam", "Ramanathapuram", "Rameswaram", "Rasipuram", "Saint Thomas Mount", "Salem", "Sathankulam",
  "Sathyamangalam", "Sattur", "Seven Pagodas", "Sholinghur", "Singapperumalkovil", "Singanallur", "Sirumugai", "Sivaganga", "Sivagiri",
  "Sivakasi", "Srivaikuntam", "Srivilliputhur", "Srimushnam", "Sriperumbudur", "Suchindram", "Sulur", "Swamimalai", "Sayalkudi", "Sirkazhi",
  "Surandai", "Tambaram", "Tanjore", "Thanjavur", "Tharangambadi", "Theni", "Thenkasi", "Thirukattupalli", "Thiruthani", "Thiruvaiyaru",
  "Thiruvallur", "Thiruvarur", "Thiruvidaimaruthur", "Thoothukudi", "Tindivanam", "Tinnanur", "Tiruchchendur", "Tiruchengode", "Tiruchirappalli",
  "Tirukkoyilur", "Tirumullaivasal", "Tirunelveli", "Tirunelveli Kattabo", "Tirupparangunram", "Tiruppur", "Tiruppuvanam", "Tiruppalaikudi", "Tiruttangal",
  "Tiruvannamalai", "Tiruvottiyur", "Tisaiyanvilai", "Tondi", "Turaiyur", "Taramangalam", "Tattayyangarpettai", "Udangudi", "Udumalaippettai", "Uppiliyapuram",
  "Usilampatti", "Uttamapalaiyam", "Uttiramerur", "V.S.K.Valasai (Dindigul-Dist.)", "Vadakku Valliyur", "Vadakku Viravanallur", "Vadamadurai", "Valangaiman", "Valavanur",
  "Vallam", "Valparai", "Vandalur", "Vandavasi", "Vaniyambadi", "Vattalkundu", "Vedaraniyam", "Vedasandur", "Velankanni", "Vellore", "Vellanur", "Velur",
  "Vengavasal", "Vettaikkaranpudur", "Vettavalam", "Vijayapuri", "Vikravandi", "Vilattikulam", "Villupuram", "Virudhunagar", "Vriddhachalam", "Vadippatti",
  "Vasudevanallur", "Viraganur", "Walajapet", "Wallajahbad", "Wellington", "Alangudi", "Alangulam", "Alappakkam", "Andippatti", "Attayyampatti", "Avadi",
  "Uttukkuli", "Ranipet",
  // Meghalaya
  "Cherrapunji", "East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "Mairang", "Mankachar",
  "Nongpoh", "Nongstoin", "North Garo Hills", "Ri-Bhoi", "Shillong", "South Garo Hills",
  "South West Garo Hills", "South West Khasi Hills", "Tura", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills", "Meghalaya",
  // Haryana
  "Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram",
  "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra",
  "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari",
  "Rohtak", "Sirsa", "Sonipat", "Yamunanagar", "Haryana",

  // Maharashtra
  "Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad",
  "Solapur", "Amravati", "Kolhapur", "Nanded", "Sangli", "Jalgaon",
  "Akola", "Latur", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani",
  "Ichalkaranji", "Jalna", "Ambarnath", "Bhivandi", "Osmanabad", "Panvel",
  "Satara", "Beed", "Wardha", "Gondia", "Baramati", "Yavatmal",
  "Ratnagiri", "Ulhasnagar", "Malegaon", "Nandurbar", "Hingoli", "Palghar",
  "Karad", "Buldhana", "Vasai-Virar", "Kalyan-Dombivli", "Mira-Bhayandar", "Navi Mumbai", "Maharashtra",

  // goa
  "Aldona", "Arambol", "Baga", "Bambolim", "Bandora", "Benaulim",
  "Calangute", "Candolim", "Carapur", "Cavelossim", "Chicalim", "Chinchinim",
  "Colovale", "Colva", "Cortalim", "Cuncolim", "Curchorem", "Curti",
  "Davorlim", "Dicholi", "Goa Velha", "Guirim", "Jua", "Kankon",
  "Madgaon", "Morjim", "Mormugao", "Mapuca", "Navelim", "North Goa",
  "Palle", "Panaji", "Pernem", "Ponda", "Quepem", "Queula",
  "Raia", "Saligao", "Sancoale", "Sanguem", "Sanquelim", "Sanvordem",
  "Serula", "Solim", "South Goa", "Taleigao", "Vagator", "Valpoy",
  "Varca", "Vasco da Gama", "Goa",
  // manipur
  "Bishnupur", "Churachandpur", "Imphal East", "Kakching", "Imphal West", "Senapati",
  "Tamenglong", "Thoubal", "Ukhrul", "Chandel", "Kangpokpi", "Tengnoupal",
  "Pherzawl", "Kamjong", "Jiribam", "Noney", "Manipur",
  // puducherry
  "Karaikal", "Mahe", "Puducherry", "Yanam",
  // Telangana
  "Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalapally",
  "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem", "Mahabubabad",
  "Mahabubnagar", "Mancherial", "Medak", "Medchal–Malkajgiri", "Mulugu", "Nagarkurnool",
  "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla",
  "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy",
  "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri","Telanagana",

  // odisha
  "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh",
  "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur",
  "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar",
  "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh",
  "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh", "odisha",
  ,
  // Rajasthan
  "Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer",
  "Alwar", "Bhilwara", "Sikar", "Bharatpur", "Pali", "Tonk",
  "Chittorgarh", "Sri Ganganagar", "Hanumangarh", "Jhunjhunu", "Dausa", "Barmer",
  "Banswara", "Nagaur", "Dholpur", "Churu", "Sawai Madhopur", "Sirohi",
  "Baran", "Bundi", "Jaisalmer", "Dungarpur", "Karauli", "Rajsamand",
  "Pratapgarh", "Jhalawar", "Rajasthan",

  // punjab
  "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali",
  "Hoshiarpur", "Pathankot", "Moga", "Batala", "Khanna", "Phagwara",
  "Barnala", "Firozpur", "Faridkot", "Muktsar", "Malerkotla", "Nabha",
  "Kapurthala", "Abohar", "Rajpura", "Sunam", "Tarn Taran", "Sangrur",
  "Samana", "Zirakpur", "Gurdaspur", "Dhuri", "Mansa", "Ropar",
  "Sirhind", "Fazilka", "Gobindgarh", "Jagraon", "Kotkapura", "Ahmedgarh", "Punjab",

  // uttarkhand
  "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar",
  "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi", "Uttarakhand",

  // Andhra pradesh
  "Srikakulam", "Vizianagaram", "Parvathipuram Manyam", "Alluri Sitharama Raju", "Visakhapatnam", "Anakapalli",
  "Kakinada", "East Godavari", "Konaseema", "West Godavari", "Eluru", "Krishna",
  "NTR", "Guntur", "Palnadu", "Bapatla", "Prakasam", "Nellore",
  "Annamayya", "Kadapa", "Chittoor", "Tirupati", "Kurnool", "Nandyal",
  "Anantapur", "Sri Sathya Sai", "Andhra pradesh",

  // Nagaland
  "Dimapur", "Kohima", "Mokokchung", "Mon", "Peren", "Phek",
  "Tuensang", "Tuensang District", "Wokha", "Zunheboto", "Nagaland",
  // Lakshadweep
  "Kavaratti", "Lakshadweep",
  // Himachal pradesh
  "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu",
  "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una", "Himachal pradesh",

  // Delhi
  "Alipur", "Bawana", "Central Delhi", "Delhi", "Deoli", "East Delhi",
  "Karol Bagh", "Najafgarh", "Narela", "New Delhi", "North Delhi", "North East Delhi",
  "North West Delhi", "Nangloi Jat", "Pitampura", "Rohini", "South Delhi", "South West Delhi",
  "West Delhi", "Delhi",
  // Uttar pradesh
  "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya",
  "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda",
  "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun",
  "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah",
  "Ayodhya", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad",
  "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi",
  "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat",
  "Kanpur Nagar", "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lalitpur",
  "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau",
  "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh",
  "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar",
  "Sant Ravidas Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur",
  "Sonbhadra", "Sultanpur", "Unnao", "Varanasi", "Noida", "Uttar Pradesh",
  // Arunachal Pradesh
  "Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kamle",
  "Kameng", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding",
  "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke Kessang", "Papum Pare",
  "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri",
  "West Kameng", "West Siang", "Arunachal Pradesh",
  // Jharkhand
  "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum",
  "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara",
  "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu",
  "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum", "Jharkhand",
  // Assam
  "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo",
  "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao",
  "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup",
  "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli",
  "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar",
  "Tinsukia", "Udalguri", "West Karbi Anglong", "Assam",
  // Jammu and khashmir
  "Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal",
  "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch",
  "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian",
  "Srinagar", "Udhampur", "Jammu and khashmir",
  // Gujarat
  "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch",
  "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka",
  "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch",
  "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal",
  "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar",
  "Tapi", "Vadodara", "Valsad", "Gujarat",
  // Chandigarh
  "Chandigarh",
  // sikkim
  "East Sikkim", "West Sikkim", "North Sikkim", "South Sikkim",
  "Pakeyong", "Soreng", "Namchi", "Gyalshing",
  "Mangan", "Gangtok", "sikkim",
  // Mizoram
  "Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai",
  "Lunglei", "Mamit", "Saiha", "Saitual", "Serchhip", "Mizoram",
  // Bihar
  "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur",
  "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj",
  "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj",
  "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda",
  "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur",
  "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul",
  "Vaishali", "West Champaran", "Bihar",
  // Tripura
  "Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura",
  "Unakoti", "West Tripura", "Tripura",
  // Madhya pradesh
  "Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani",
  "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara",
  "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna",
  "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua",
  "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena",
  "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam",
  "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol",
  "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh",
  "Ujjain", "Umaria", "Vidisha", "Madhya pradesh",
  // Chattisgarh
  "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur",
  "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi",
  "Janjgir Champa", "Jashpur", "Kanker", "Kawardha", "Kondagaon", "Korba",
  "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur",
  "Rajnandgaon", "Sukma", "Surajpur", "Surguja", "Chattisgarh",
  // Ladakh
  "Leh", "Kargil", "Ladakh",
  // west bengal
  "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling",
  "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata",
  "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur",
  "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur", "West Bengal",









]

export const allStationss = [
  "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam",
  "Visakhapatnam", "West Godavari", "Ysr Kadapa", "Anjaw", "Changlang", "East Kameng", "East Siang",
  "Kurung Kumey", "Lohit", "Longding", "Lower Dibang Valley", "Lower Subansiri", "Namsai", "Papum Pare",
  "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang", "Baksa", "Barpeta",
  "Biswanath", "Bongaigaon", "Vijayawada", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh",
  "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong",
  "Karimganj", "Kokrajhar", "Lakhimpur", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur",
  "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong", "Araria", "Arwal",
  "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "Diu Island", "East Champaran", "Gaya", "Gopalganj",
  "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani",
  "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran",
  "Sheikhpura", "Sheohar", "Sitamarhi", "Supaul", "Vaishali", "West Champaran", "Balod", "Baloda Bazar", "Balrampur",
  "Bastar", "Bemetara", "Bijapur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Janjgir-Champa",
  "Jashpur", "Kabirdham", "Kanker", "Korba", "Kondagaon", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh",
  "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja", "North Goa", "South Goa", "Ahmedabad", "Amreli", "Anand",
  "Aravalli", "Banas Kantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udepur", "Dahod", "Dangs", "Gandhinagar",
  "Gir Somnath", "Jamnagar", "Junagadh", "Kutch", "Kheda", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari",
  "Panchmahal", "Patan", "Porbandar", "Gujarat", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara",
  "Valsad", "Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal",
  "Karnal", "Kurukshetra", "Mahendragarh", "Mewat", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa",
  "Sonipat", "Yamunanagar", "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kullu", "Kinnaur", "Mandi", "Shimla", "Sirmaur",
  "Solan", "Una", "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "Giridih", "Godda", "Gumla", "Hazaribagh",
  "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj",
  "Seraikela Kharsawan", "Simdega", "West Singhbhum", "Bagalkot", "Ballari", "Belagavi", "Bangalore", "Bidar", "Chamarajanagar", "Hubli", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada",
  "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Mangalore",
  "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir", "Alappuzha",
  "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kochin", "Kottayam", "Kollam", "Kozhikode", "Malappuram", "Palakkad",
  "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad",
  //odisa
  "Angul", "Balangir", "Balasore", "Bhadrak", "Boudh", "Cuttack", "Deogarh",
  "Dhenkanal", "Ganjam", "Gajapati", "Kendrapara", "Kalahandi", "Kandhamal",
  "Kendujhar", "Khurda", "Koraput", "Malkangiri", "Nabarangpur", "Nayagarh",
  "Nua Khar", "Rayagada", "Sambalpur", "Sonepur", "Sundargarh",
  //Delhi
  "Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East  Delhi", "North West  Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West  Delhi",
  "West Delhi",
  // Tamil Nadu

  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode",
  "Kallakurichi", "Kancheepuram", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Kanniyakumari",
  "Namakkal", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivagangai", "Tenkasi", "Thanjavur", "Theni",
  "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai",
  "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar", "Nilgiris",


  // 
  //Puducherry
  "Karaikal", "Mahe", "Pondicherry", "Yanam",
  //
  "Adilabad", "Hyderabad", "Jagtial", "Jangaon", "Janagaon", "Khammam", "Komaram Bheem Asifabad",
  "Kothagudem", "Mahbubnagar", "Mancherial", "Medak", "Medchal-Malkajgiri", "Mulugu",
  "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla",
  "Ranga Reddy", "Sangareddy", "Siddipet", "Suryapet", "Warangal", "Yadadri-Bhongir",
  "Agar Malwa", "Alirajpur", "Anuppur", "Ashok Nagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur",
  "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad",
  "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur",
  "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol",
  "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha",
  "Ahmednagar", "Nagpur", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli",
  "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai", "Mumbai Suburban", "Nandurbar", "Nashik",
  "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur",
  "Thane", "Wardha", "Washim", "Yavatmal", "Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West",
  "Jiribam", "Kangpokpi", "Noney", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul", "East Garo Hills",
  "East Khasi Hills", "Jaintia Hills", "Ri Bhoi", "West Garo Hills", "West Khasi Hills", "West Jaintia Hills", "Aizawl",
  "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip", "Dimapur", "Kohima", "Mokokchung", "Mon", "Peren",
  "Phek", "Tuensang", "Wokha", "Zunheboto",

  "Amritsar", "Barnala", "Bhatinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Gharinda",
  "Gurdaspur", "Hushiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga",
  "Muktsar", "Patiala", "Rupnagar", "S.A.S Nagar", "Sangrur", "Shaheed Bhagat Singh Nagar",
  "Sri Muktsar Sahib",
  "Dhalai", "North Tripura", "Sipahijala", "South Tripura", "West Tripura",

  //uttar
  "Agra", "Aligarh", "Allahabad", "Ambedkar Nagar", "Auraiya", "Azamgarh", "Baghpat",
  "Bahraich", "Ballia", "Banda", "Noida", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor",
  "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad",
  "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur",
  "Gonda", "Hamirpur", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Jind", "Kanpur",
  "Kanpur Dehat", "Kasganj", "Kaushambi", "Kushinagar", "Lucknow", "Mahooba",
  "Maurawan", "Mathura", "Meerut", "Mirzapur", "Mau", "Muzaffarnagar", "Pilibhit",
  "Pratapgarh", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar",
  "Shahjahanpur", "Shamli", "Siddharth Nagar", "Sitapur", "Sonbhadra", "Sultanpur",
  "Unnao", "Varanasi",

  //uttarkand
  "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Garhwal", "Haridwar",
  "Nainital", "Pauri", "Pithoragarh", "Rudraprayag", "Tehri", "Udham Singh Nagar",
  "Uttarkashi",

  //westbengal
  "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Darjeeling", "Hooghly",
  "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad",
  "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman",
  "Purba Medinipur", "South 24 Parganas", "Uttar Dinajpur"

]


// export const stateToStations = {
//   "Andhra Pradesh": 
//    ["anantapur", "chittoor", "east godavari", "guntur", "krishna", "kurnool",
//      "prakasam", "srikakulam", "visakhapatnam", "west godavari", "ysr kadapa"],

//   "Arunachal Pradesh":
//    ["anjaw", "changlang", "east kameng", "east siang", "kurung kumey", "lohit",
//      "longding", "lower dibang valley", "lower subansiri", "namsai", "papum pare",
//      "tawang", "tirap", "upper siang", "upper subansiri", "west kameng", "west siang"],
//   "Assam": 
//   ["baksa", "barpeta", "biswanath", "bongaigaon", "cachar", "charaideo", "chirang", "darrang", "dhemaji", "dhubri", "dibrugarh", "goalpara", "golaghat", "hailakandi", "hojai", "jorhat", "kamrup", "kamrup metropolitan", "karbi anglong", "karimganj", "kokrajhar", "lakhimpur", "morigaon", "nagaon", "nalbari", "sivasagar", "sonitpur", "south salmara-mankachar", "tinsukia", "udalguri", "west karbi anglong"],
//   "bihar": ["araria", "arwal", "aurangabad", "banka", "begusarai", "bhagalpur", "bhojpur", "buxar", "darbhanga", "east champaran", "gaya", "gopalganj", "jamui", "jehanabad", "kaimur", "katihar", "khagaria", "kishanganj", "lakhisarai", "madhepura", "madhubani", "munger", "muzaffarpur", "nalanda", "nawada", "patna", "purnia", "rohtas", "saharsa", "samastipur", "saran", "sheikhpura", "sheohar", "sitamarhi", "supaul", "vaishali", "west champaran"],
//   "chhattisgarh": ["balod", "baloda bazar", "balrampur", "bastar", "bemetara", "bijapur", "bilaspur", "dantewada", "dhamtari", "durg", "gariaband", "janjgir-champa", "jashpur", "kabirdham", "kanker", "korba", "kondagaon", "mahasamund", "mungeli", "narayanpur", "raigarh", "raipur", "rajnandgaon", "sukma", "surajpur", "surguja"],
//   "goa": ["north goa", "south goa"],
//   "Gujarat": 
//   ["ahmedabad", "amreli", "anand", "aravalli", "banas kantha", "bharuch", "bhavnagar", 
//     "botad", "chhota udepur", "dahod", "dangs", "gandhinagar", "gir somnath", "jamnagar", 
//     "junagadh", "kutch", "kheda", "mahisagar", "mehsana", "morbi", "narmada", "navsari", "panchmahal", 
//     "patan", "porbandar", "rajkot", "sabarkantha", "surat", "surendranagar", "tapi", "vadodara", "valsad"],
//   "Haryana":
//    ["ambala", "bhiwani", "charkhi dadri", "faridabad", "gurugram", "hisar", "jhajjar",
//      "jind", "kaithal", "karnal", "kurukshetra", "mahendragarh", "mewat", "palwal", "panchkula",
//       "panipat", "rewari", "rohtak", "sirsa", "sonipat", "yamunanagar"],
//   "Himachal Pradesh": 
//   ["bilaspur", "chamba", "hamirpur", "kangra", "kullu", "kinnaur", "mandi", "shimla", "sirmaur", "solan", "una"],
//   "Jharkhand":
//    ["bokaro", "chatra", "deoghar", "dhanbad", "dumka",
//      "giridih", "godda", "gumla", "hazaribagh", "jamtara", "khunti", "koderma", "latehar", "lohardaga", 
//      "pakur", "palamu", "ramgarh", "ranchi", "sahebganj", "seraikela kharsawan", "simdega", "west singhbhum"],
//   "Karnataka":
//    ["bagalkot", "ballari", "belagavi", "banglore", "bidar", "chamarajanagar", 
//     "chikkaballapur", "chikkamagaluru", "chitradurga", "dakshina kannada", "davanagere", "dharwad", "gadag",
//      "hassan", "haveri", "kalaburagi", "kodagu", "kolar", "koppal", "mandya", "mysuru", "raichur", "ramanagara", 
//      "shivamogga", "tumakuru", "udupi", "uttara kannada", "vijayapura", "yadgir"],
//   "Kerala":
//    ["alappuzha", "ernakulam", "idukki", "kannur", "kasaragod", "kottayam", "kollam", "kozhikode",
//      "malappuram", "palakkad", "pathanamthitta", "thiruvananthapuram", "thrissur", "wayanad"],
//   "Madhya Pradesh":
//    ["agar malwa", "alirajpur", "anuppur", "ashok nagar", "balaghat", "barwani", "betul", "bhind", "bhopal",
//      "burhanpur", "chhatarpur", "chhindwara", "damoh", "datia", "dewas", "dhar", "dindori", "guna", "gwalior", "harda", 
//      "hoshangabad", "indore", "jabalpur", "jhabua", "katni", "khandwa", "khargone", "mandla", "mandsaur", "morena", "narsinghpur", 
//      "neemuch", "panna", "raisen", "rajgarh", "ratlam", "rewa", "sagar", "satna", "sehore", "seoni", "shahdol", "shajapur", "sheopur",
//       "shivpuri", "sidhi", "singrauli", "tikamgarh", "ujjain", "umaria", "vidisha"],
//   "Maharashtra": 
//   ["ahmednagar", "akola", "amravati", "aurangabad", "beed", "bhandara", "buldhana", 
//     "chandrapur", "dhule", "gadchiroli", "gondia", "hingoli", "jalgaon", "jalna", "kolhapur", "latur", 
//      "mumbai", "mumbai suburban", "nandurbar", "nashik", "osmanabad", "palghar", "parbhani", "pune",
//      "raigad", "ratnagiri", "sangli", "satara", "sindhudurg", "solapur", "thane", "wardha", "washim", "yavatmal"],
//   "Manipur": 
//   ["bishnupur", "chandel", "churachandpur", "imphal east", "imphal west", "jiribam", "kangpokpi", 
//     "noney", "senapati", "tamenglong", "tengnoupal", "thoubal", "ukhrul"],
//   "Meghalaya": 
//   ["east garo hills", "east khasi hills", "jaintia hills", "ri bhoi", "west garo hills", "west khasi hills"],
//   "Mizoram":
//    ["aizawl", "champhai", "kolasib", "lawngtlai", "lunglei", "mamit", "saiha", "serchhip"],
//   "Nagaland":
//    ["dimapur", "kohima", "mokokchung", "mon", "peren", "phek", "tuensang", "wokha", "zunheboto"],
//   "Odisha":
//    ["angul", "balangir", "balasore", "bhadrak", "boudh", "cuttack", "deogarh", "dhenkanal", 
//      "ganjam", "gajapati", "kendrapara", "kalahandi", "kandhamal", "kendujhar", "khurda", "koraput", 
//      "malkangiri", "nabarangpur", "nayagarh", "nua khar", "rayagada", "sambalpur", "sonepur", "sundargarh"],
//   "Punjab":
//    ["amritsar", "barnala", "bhatinda", "faridkot", "fatehgarh sahib", "fazilka", "gharinda", "gurdaspur", 
//     "hushiarpur", "jalandhar", "kapurthala", "ludhiana", "mansa", "moga", "muktsar", "patiala", "rupnagar",
//     "s.a.s nagar", "sangrur", "shaheed bhagat singh nagar", "sri muktsar sahib"],
//   "Rajasthan":
//    ["ajmer", "alwar", "banswara", "baran", "bareilly", "bharatpur", "bhilwara", "bikaner", "bundi", "churu",
//     "dholpur", "dungarpur", "hanumangarh", "jaisalmer", "jalore", "jhalawar", "jhunjhunu", "jodhpur", 
//      "karauli", "kota", "nagaur", "pratapgarh", "rajsamand", "sawai madhopur", "sikar", "sirohi", "tonk", 
//      "udaipur"],
//   "Sikkim":
//     ["east sikkim", "north sikkim", "south sikkim", "west sikkim"],
//   "Tamil Nadu": 
//   ["Chennai", "coimbatore", "cuddalore", "dharmapuri", "dindigul", "erode", "kallakurichi", "kancheepuram", 
//     "karur", "krishnagiri", "madurai", "nagapattinam", "namakkal", "perambalur", "pudukkottai", "ramanathapuram", 
//      "salem", "sivagangai", "thanjavur", "theni", "theni", "tiruvarur", "tirunelveli","tenkasi", "tiruvarur", "tiruppur", 
//      "vellore", "virudhunagar"],
//   "Telangana":
//    ["adilabad", "hyderabad", "jagtial", "jangaon", "janagaon", "khammam", "komaram bheem asifabad", "kothagudem",
//      "mahbubnagar", "mancherial", "medak", "medchal-malkajgiri", "mulugu", "nagarkurnool", "nalgonda", "narayanpet",
//      "nirmal", "nizamabad", "peddapalli", "rajanna sircilla", "ranga reddy", "sangareddy", "siddipet", "suryapet",
//       "warangal", "yadadri-bhongir"],
//   "Tripura":
//    ["dhalai", "north tripura", "sipahijala", "south tripura", "west tripura"],
//   "Uttar Pradesh":
//    ["agra", "aligarh", "allahabad", "ambedkar nagar", "auraiya", "azamgarh", "baghpat", "bahraich", "ballia", 
//     "banda", "barabanki", "bareilly", "basti", "bhadohi", "bijnor", "bulandshahr", "chandauli", "chitrakoot", 
//     "deoria", "etah", "etawah", "faizabad", "farrukhabad", "fatehpur", "firozabad", "gautam buddha nagar", 
//     "ghaziabad", "ghazipur", "gonda", "hamirpur", "hathras", "jalaun", "jaunpur", "jhansi", "jind", "kanpur", 
//     "kanpur dehat", "kasganj", "kaushambi", "kushinagar", "lucknow", "mahooba", "maurawan", "mathura", "meerut", 
//     "mirzapur", "mau", "muzaffarnagar", "pilibhit", "pratapgarh", "raebareli", "rampur", "saharanpur", "sambhal", 
//     "sant kabir nagar", "shahjahanpur", "shamli", "siddharth nagar", "sitapur", "sonbhadra", "sultanpur", 
//     "unnao", "varanasi"],
//   "Uttarakhand":
//    ["almora", "bageshwar", "bharatpur", "chamoli", "champawat", "dehradun", "haridwar", "nainital", "pauri garhwal",
//     "pithoragarh", "rudraprayag", "tehri garhwal", "udham singh nagar", "uttarkashi"],
//   "West Bengal": 
//    ["hooghly", "howrah", "jalpaiguri", "kalimpong", "kochbihar", "malda", "maldah", "midnapore", "murshidabad", 
//     "north 24 parganas", "north dinajpur", "purba medinipur", "purulia", "south 24 parganas", "south dinajpur",
//     "west medinipur"]
// };

export const stateToStations = {
  "Andhra Pradesh":
    [
      "Srikakulam", "Vizianagaram", "Parvathipuram Manyam", "Alluri Sitharama Raju", "Visakhapatnam", "Anakapalli",
      "Kakinada", "East Godavari", "Konaseema", "West Godavari", "Eluru", "Krishna",
      "NTR", "Guntur", "Palnadu", "Bapatla", "Prakasam", "Nellore",
      "Annamayya", "Kadapa", "Chittoor", "Tirupati", "Kurnool", "Nandyal",
      "Anantapur", "Sri Sathya Sai", "Andhra pradesh",
    ],

  "Arunachal Pradesh":
    [
      "Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kamle",
      "Kameng", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding",
      "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke Kessang", "Papum Pare",
      "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri",
      "West Kameng", "West Siang", "Arunachal Pradesh",
    ],
  "Assam":
    [
      "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo",
      "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao",
      "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup",
      "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli",
      "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar",
      "Tinsukia", "Udalguri", "West Karbi Anglong", "Assam",
    ],
  "Bihar":
    [
      "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur",
      "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj",
      "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj",
      "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda",
      "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur",
      "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul",
      "Vaishali", "West Champaran", "Bihar",
    ],
  "Chhattisgarh":
    [
      "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur",
      "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi",
      "Janjgir Champa", "Jashpur", "Kanker", "Kawardha", "Kondagaon", "Korba",
      "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur",
      "Rajnandgaon", "Sukma", "Surajpur", "Surguja", "Chattisgarh",
    ],
    "Chandigarh":[
      "Chandigarh",
    ],
  "New Delhi": [
    "Alipur", "Bawana", "Central Delhi", "Delhi", "Deoli", "East Delhi",
    "Karol Bagh", "Najafgarh", "Narela", "New Delhi", "North Delhi", "North East Delhi",
    "North West Delhi", "Nangloi Jat", "Pitampura", "Rohini", "South Delhi", "South West Delhi",
    "West Delhi", "Delhi",
  ],
  "Goa":
    [
      "Aldona", "Arambol", "Baga", "Bambolim", "Bandora", "Benaulim",
      "Calangute", "Candolim", "Carapur", "Cavelossim", "Chicalim", "Chinchinim",
      "Colovale", "Colva", "Cortalim", "Cuncolim", "Curchorem", "Curti",
      "Davorlim", "Dicholi", "Goa Velha", "Guirim", "Jua", "Kankon",
      "Madgaon", "Morjim", "Mormugao", "Mapuca", "Navelim", "North Goa",
      "Palle", "Panaji", "Pernem", "Ponda", "Quepem", "Queula",
      "Raia", "Saligao", "Sancoale", "Sanguem", "Sanquelim", "Sanvordem",
      "Serula", "Solim", "South Goa", "Taleigao", "Vagator", "Valpoy",
      "Varca", "Vasco da Gama", "Goa",
    ],
  "Gujarat":
    [
      "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch",
      "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka",
      "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch",
      "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal",
      "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar",
      "Tapi", "Vadodara", "Valsad", "Gujarat",
    ],
  "Haryana":
    [
      "Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram",
      "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra",
      "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari",
      "Rohtak", "Sirsa", "Sonipat", "Yamunanagar", "Haryana",
    ],
  "Himachal Pradesh":
    [
      "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu",
      "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una", "Himachal pradesh",
    ],
    "Jammu and khashmir":
    [
    "Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal",
    "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch",
    "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian",
    "Srinagar", "Udhampur", "Jammu and khashmir",
    ],
  "Jharkhand":
    [
      "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum",
      "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara",
      "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu",
      "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum", "Jharkhand",
    ],
  "Karnataka":
    [
      "Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar",
      "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere",
      "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu",
      "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara",
      "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir","Bangalore",
    ],
  "Kerala":
    [
      "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam",
      "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram",
      "Thrissur", "Wayanad", "Kerala",
    ],
    "Lakshadweep":
    [
    "Kavaratti", "Lakshadweep",
    ],
    "Ladakh":
    [
      "Leh", "Kargil", "Ladakh",

    ],

  "Madhya Pradesh":
    [
      "Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani",
      "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara",
      "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna",
      "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua",
      "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena",
      "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam",
      "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol",
      "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh",
      "Ujjain", "Umaria", "Vidisha", "Madhya pradesh",
    ],
  "Maharashtra":
    [
      "Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad",
      "Solapur", "Amravati", "Kolhapur", "Nanded", "Sangli", "Jalgaon",
      "Akola", "Latur", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani",
      "Ichalkaranji", "Jalna", "Ambarnath", "Bhivandi", "Osmanabad", "Panvel",
      "Satara", "Beed", "Wardha", "Gondia", "Baramati", "Yavatmal",
      "Ratnagiri", "Ulhasnagar", "Malegaon", "Nandurbar", "Hingoli", "Palghar",
      "Karad", "Buldhana", "Vasai-Virar", "Kalyan-Dombivli", "Mira-Bhayandar", "Navi Mumbai", "Maharashtra",
    ],
  "Manipur":
    [
      "Bishnupur", "Churachandpur", "Imphal East", "Kakching", "Imphal West", "Senapati",
      "Tamenglong", "Thoubal", "Ukhrul", "Chandel", "Kangpokpi", "Tengnoupal",
      "Pherzawl", "Kamjong", "Jiribam", "Noney", "Manipur",
    ],
  "Meghalaya":
    [
      "Cherrapunji", "East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "Mairang", "Mankachar",
      "Nongpoh", "Nongstoin", "North Garo Hills", "Ri-Bhoi", "Shillong", "South Garo Hills",
      "South West Garo Hills", "South West Khasi Hills", "Tura", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills", "Meghalaya",
    ],
  "Mizoram":
    [
      "Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai",
      "Lunglei", "Mamit", "Saiha", "Saitual", "Serchhip", "Mizoram",    ],
  "Nagaland":
    [
      "Dimapur", "Kohima", "Mokokchung", "Mon", "Peren", "Phek",
      "Tuensang", "Tuensang District", "Wokha", "Zunheboto", "Nagaland",    ],
  "Odisha":
    [
      "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh",
      "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur",
      "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar",
      "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh",
      "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh", "odisha",
    ],
  "Punjab":
    [
      "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali",
      "Hoshiarpur", "Pathankot", "Moga", "Batala", "Khanna", "Phagwara",
      "Barnala", "Firozpur", "Faridkot", "Muktsar", "Malerkotla", "Nabha",
      "Kapurthala", "Abohar", "Rajpura", "Sunam", "Tarn Taran", "Sangrur",
      "Samana", "Zirakpur", "Gurdaspur", "Dhuri", "Mansa", "Ropar",
      "Sirhind", "Fazilka", "Gobindgarh", "Jagraon", "Kotkapura", "Ahmedgarh", "Punjab",
    ],
  "Puducherry": [
    "Karaikal", "Mahe", "Pondicherry", "Yanam",
  ],
  "Rajasthan":
    [
      "Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer",
      "Alwar", "Bhilwara", "Sikar", "Bharatpur", "Pali", "Tonk",
      "Chittorgarh", "Sri Ganganagar", "Hanumangarh", "Jhunjhunu", "Dausa", "Barmer",
      "Banswara", "Nagaur", "Dholpur", "Churu", "Sawai Madhopur", "Sirohi",
      "Baran", "Bundi", "Jaisalmer", "Dungarpur", "Karauli", "Rajsamand",
      "Pratapgarh", "Jhalawar", "Rajasthan",
    ],
  "Sikkim":
    [
      "East Sikkim", "West Sikkim", "North Sikkim", "South Sikkim",
      "Pakeyong", "Soreng", "Namchi", "Gyalshing",
      "Mangan", "Gangtok", "sikkim",
    ],
  "Tamil Nadu":
    // [
    //   "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode",
    //   "Kallakurichi", "Kancheepuram", "Karur", "Krishnagiri", "Madurai", "Nagapattinam",
    //   "Namakkal", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivagangai",
    //   "Thanjavur", "Theni", "Tiruvarur", "Tirunelveli", "Tenkasi", "Tiruvarur", "Tiruppur",
    //   "Vellore", "Virudhunagar", "Kanyakumari","Tiruchirappalli","Nilgiris"
    //   ],
    [
      "Abiramam", "Adirampattinam", "Aduthurai", "Alagapuram", "Alandur", "Alanganallur", "Alangayam", "Alwa Tirunagari", "Ambasamudram",
      "Ambattur", "Ambur", "Ammapettai", "Anamalais", "Annavasal", "Annur", "Annamalainagar", "Anthiyur", "Arakkonam", "Arantangi", "Arcot",
      "Arimalam", "Ariyalur", "Arni", "Arumbavur", "Arumuganeri", "Aruppukkottai", "Aruvankad", "Attur", "Auroville", "Avinashi", "Ayakudi",
      "Ayyampettai", "Belur", "Bhavani", "Bodinayakkanur", "Chengam", "Chennai", "Chennimalai", "Chetput", "Chettipalaiyam", "Cheyyar",
      "Cheyyur", "Chidambaram", "Chingleput", "Chinna Salem", "Chinnamanur", "Chinnasekkadu", "Cholapuram", "Coimbatore", "Colachel",
      "Cuddalore", "Cumbum", "Denkanikota", "Desur", "Devadanappatti", "Devakottai", "Dhali", "Dharapuram", "Dharmapuri", "Dindigul", "Dusi",
      "Elumalai", "Elayirampannai", "Eral", "Eraniel", "Erode", "Erumaippatti", "Ettaiyapuram", "Gangaikondan", "Gangavalli", "Gingee",
      "Gobichettipalayam", "Gudalur", "Gudiyatham", "Gummidipundi", "Gandhi Nagar", "Guduvancheri", "Harur", "Hosur", "Idappadi", "Ilampillai",
      "Iluppur", "Injambakkam", "Irugur", "Jalakandapuram", "Jalarpet", "Jayamkondacholapuram", "Kadambur", "Kadayanallur", "Kalakkadu",
      "Kalavai", "Kallakkurichchi", "Kallidaikurichi", "Kallupatti", "Kalugumalai", "Kamuthi", "Kanadukattan", "Kancheepuram", "Kanchipuram",
      "Kangayam", "Kanniyakumari", "Karambakkudi", "Kariapatti", "Karumbakkam", "Karur", "Kattivakkam", "Kayalpattinam", "Kayattar",
      "Keelakarai", "Kelamangalam", "Kilvelur", "Kodaikanal", "Kodumudi", "Kombai", "Konganapuram", "Koothanallur", "Koradachcheri",
      "Korampallam", "Kotagiri", "Kottaiyur", "Kovilpatti", "Krishnagiri", "Kulattur", "Kulittalai", "Kumaralingam", "Kumbakonam", "Kunnattur",
      "Kurinjippadi", "Kuttalam", "Kuzhithurai", "Karaikkudi", "Karamadai", "Katpadi", "Kattupputtur", "Kaveripatnam", "Kil Bhuvanagiri",
      "Kiranur", "Lalgudi", "Madambakkam", "Madipakkam", "Madukkarai", "Madukkur", "Madurai", "Madurantakam", "Mallasamudram", "Mallapuram",
      "Manali", "Manalurpettai", "Manamadurai", "Manappakkam", "Manapparai", "Manavalakurichi", "Mandapam", "Mangalam", "Mannargudi",
      "Marakkanam", "Masinigudi", "Mayiladuthurai", "Melur", "Mettuppalaiyam", "Mettur", "Mohanur", "Mudukulattur", "Musiri", "Muttupet",
      "Mallur", "Marandahalli", "Mattur", "Minjur", "Mulanur", "Naduvattam", "Nagapattinam", "Namakkal", "Nambiyur", "Nambutalai",
      "Nandambakkam", "Nangavalli", "Nangilickondan", "Nanguneri", "Nannilam", "Nattam", "Needamangalam", "Neelankarai", "Negapatam",
      "Nellikkuppam", "Nilakottai", "Nilgiris", "Nagercoil", "Namagiripettai", "Naravarikuppam", "Nattarasankottai", "Odugattur", "Omalur",
      "Ooty", "Padmanabhapuram", "Palani", "Palavakkam", "Palladam", "Pallappatti", "Pallattur", "Pallikondai", "Pallipattu", "Pallippatti",
      "Pallavaram", "Panruti", "Papanasam", "Paramagudi", "Pattukkottai", "Pennadam", "Pennagaram", "Pennathur", "Peraiyur", "Perambalur",
      "Peranamallur", "Peranampattu", "Peravurani", "Periyakulam", "Periyanayakkanpalaiyam", "Periyanegamam", "Periyapatti", "Periyapattinam",
      "Perundurai", "Perungudi", "Perur", "Pollachi", "Polur", "Ponnamaravati", "Ponneri", "Poonamalle", "Porur", "Pudukkottai", "Puduppatti",
      "Puduvayal", "Pudur", "Puliyangudi", "Puliyur", "Pullambadi", "Punjai Puliyampatti", "Palakkodu", "Palamedu", "Papireddippatti",
      "Papparappatti", "Rajapalaiyam", "Ramanathapuram", "Rameswaram", "Rasipuram", "Saint Thomas Mount", "Salem", "Sathankulam",
      "Sathyamangalam", "Sattur", "Seven Pagodas", "Sholinghur", "Singapperumalkovil", "Singanallur", "Sirumugai", "Sivaganga", "Sivagiri",
      "Sivakasi", "Srivaikuntam", "Srivilliputhur", "Srimushnam", "Sriperumbudur", "Suchindram", "Sulur", "Swamimalai", "Sayalkudi", "Sirkazhi",
      "Surandai", "Tambaram", "Tanjore", "Thanjavur", "Tharangambadi", "Theni", "Thenkasi", "Thirukattupalli", "Thiruthani", "Thiruvaiyaru",
      "Thiruvallur", "Thiruvarur", "Thiruvidaimaruthur", "Thoothukudi", "Tindivanam", "Tinnanur", "Tiruchchendur", "Tiruchengode", "Tiruchirappalli",
      "Tirukkoyilur", "Tirumullaivasal", "Tirunelveli", "Tirunelveli Kattabo", "Tirupparangunram", "Tiruppur", "Tiruppuvanam", "Tiruppalaikudi", "Tiruttangal",
      "Tiruvannamalai", "Tiruvottiyur", "Tisaiyanvilai", "Tondi", "Turaiyur", "Taramangalam", "Tattayyangarpettai", "Udangudi", "Udumalaippettai", "Uppiliyapuram",
      "Usilampatti", "Uttamapalaiyam", "Uttiramerur", "V.S.K.Valasai (Dindigul-Dist.)", "Vadakku Valliyur", "Vadakku Viravanallur", "Vadamadurai", "Valangaiman", "Valavanur",
      "Vallam", "Valparai", "Vandalur", "Vandavasi", "Vaniyambadi", "Vattalkundu", "Vedaraniyam", "Vedasandur", "Velankanni", "Vellore", "Vellanur", "Velur",
      "Vengavasal", "Vettaikkaranpudur", "Vettavalam", "Vijayapuri", "Vikravandi", "Vilattikulam", "Villupuram", "Virudhunagar", "Vriddhachalam", "Vadippatti",
      "Vasudevanallur", "Viraganur", "Walajapet", "Wallajahbad", "Wellington", "Alangudi", "Alangulam", "Alappakkam", "Andippatti", "Attayyampatti", "Avadi",
      "Uttukkuli", "Ranipet",
    ],

  "Telangana":
    [
      "Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalapally",
      "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem", "Mahabubabad",
      "Mahabubnagar", "Mancherial", "Medak", "Medchal–Malkajgiri", "Mulugu", "Nagarkurnool",
      "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla",
      "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy",
      "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri","Telanagana",
    ],
  "Tripura":
    [
      "Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura",
      "Unakoti", "West Tripura", "Tripura",
    ],
  "Uttar Pradesh":
    [
      "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya",
      "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda",
      "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun",
      "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah",
      "Ayodhya", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad",
      "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi",
      "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat",
      "Kanpur Nagar", "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lalitpur",
      "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau",
      "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh",
      "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar",
      "Sant Ravidas Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur",
      "Sonbhadra", "Sultanpur", "Unnao", "Varanasi", "Noida", "Uttar Pradesh",
    ],
  "Uttarakhand":
    [
      "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar",
      "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi", "Uttarakhand",
    ],
  "West Bengal":
    [
      "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling",
      "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata",
      "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur",
      "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur", "West Bengal",
    ]
};

// export const stateToStations = [
//   {
//     Option: "Andhra Pradesh",
//     optionvalue: "andhra pradesh",
//     stations: [
//       "anantapur", "chittoor", "east godavari", "guntur", "krishna", "kurnool", 
//       "prakasam", "srikakulam", "visakhapatnam", "west godavari", "ysr kadapa"
//     ]
//   },
//   {
//     Option: "Arunachal Pradesh",
//     optionvalue: "arunachal pradesh",
//     stations: [
//       "anjaw", "changlang", "east kameng", "east siang", "kurung kumey", "lohit", 
//       "longding", "lower dibang valley", "lower subansiri", "namsai", "papum pare", 
//       "tawang", "tirap", "upper siang", "upper subansiri", "west kameng", "west siang"
//     ]
//   },
//   {
//     Option: "Assam",
//     optionvalue: "assam",
//     stations: [
//       "baksa", "barpeta", "biswanath", "bongaigaon", "cachar", "charaideo", "chirang", 
//       "darrang", "dhemaji", "dhubri", "dibrugarh", "goalpara", "golaghat", "hailakandi", 
//       "hojai", "jorhat", "kamrup", "kamrup metropolitan", "karbi anglong", "karimganj", 
//       "kokrajhar", "lakhimpur", "morigaon", "nagaon", "nalbari", "sivasagar", "sonitpur", 
//       "south salmara-mankachar", "tinsukia", "udalguri", "west karbi anglong"
//     ]
//   },
//   {
//     Option: "Bihar",
//     optionvalue: "bihar",
//     stations: [
//       "araria", "arwal", "aurangabad", "banka", "begusarai", "bhagalpur", "bhojpur", "buxar", 
//       "darbhanga", "east champaran", "gaya", "gopalganj", "jamui", "jehanabad", "kaimur", 
//       "katihar", "khagaria", "kishanganj", "lakhisarai", "madhepura", "madhubani", "munger", 
//       "muzaffarpur", "nalanda", "nawada", "patna", "purnia", "rohtas", "saharsa", "samastipur", 
//       "saran", "sheikhpura", "sheohar", "sitamarhi", "supaul", "vaishali", "west champaran"
//     ]
//   },
//   {
//     Option: "Chhattisgarh",
//     optionvalue: "chhattisgarh",
//     stations: [
//       "balod", "baloda bazar", "balrampur", "bastar", "bemetara", "bijapur", "bilaspur", 
//       "dantewada", "dhamtari", "durg", "gariaband", "janjgir-champa", "jashpur", "kabirdham", 
//       "kanker", "korba", "kondagaon", "mahasamund", "mungeli", "narayanpur", "raigarh", "raipur", 
//       "rajnandgaon", "sukma", "surajpur", "surguja"
//     ]
//   },
//   {
//     Option: "Goa",
//     optionvalue: "goa",
//     stations: [
//       "north goa", "south goa"
//     ]
//   },
//   {
//     Option: "Gujarat",
//     optionvalue: "gujarat",
//     stations: [
//       "ahmedabad", "amreli", "anand", "aravalli", "banas kantha", "bharuch", "bhavnagar", 
//       "botad", "chhota udepur", "dahod", "dangs", "gandhinagar", "gir somnath", "jamnagar", 
//       "junagadh", "kutch", "kheda", "mahisagar", "mehsana", "morbi", "narmada", "navsari", 
//       "panchmahal", "patan", "porbandar", "rajkot", "sabarkantha", "surat", "surendranagar", 
//       "tapi", "vadodara", "valsad"
//     ]
//   },
//   {
//     Option: "Haryana",
//     optionvalue: "haryana",
//     stations: [
//       "ambala", "bhiwani", "charkhi dadri", "faridabad", "gurugram", "hisar", "jhajjar", 
//       "jind", "kaithal", "karnal", "kurukshetra", "mahendragarh", "mewat", "palwal", "panchkula", 
//       "panipat", "rewari", "rohtak", "sirsa", "sonipat", "yamunanagar"
//     ]
//   },
//   {
//     Option: "Himachal Pradesh",
//     optionvalue: "himachal pradesh",
//     stations: [
//       "bilaspur", "chamba", "hamirpur", "kangra", "kullu", "kinnaur", "mandi", "shimla", 
//       "sirmaur", "solan", "una"
//     ]
//   },
//   {
//     Option: "Jharkhand",
//     optionvalue: "jharkhand",
//     stations: [
//       "bokaro", "chatra", "deoghar", "dhanbad", "dumka", "giridih", "godda", "gumla", 
//       "hazaribagh", "jamtara", "khunti", "koderma", "latehar", "lohardaga", "pakur", "palamu", 
//       "ramgarh", "ranchi", "sahebganj", "seraikela kharsawan", "simdega", "west singhbhum"
//     ]
//   },
//   {
//     Option: "Karnataka",
//     optionvalue: "karnataka",
//     stations: [
//       "bagalkot", "ballari", "belagavi", "bengaluru rural", "bengaluru urban", "bidar", 
//       "chamarajanagar", "chikkaballapur", "chikkamagaluru", "chitradurga", "dakshina kannada", 
//       "davanagere", "dharwad", "gadag", "hassan", "haveri", "kalaburagi", "kodagu", "kolar", 
//       "koppal", "mandya", "mysuru", "raichur", "ramanagara", "shivamogga", "tumakuru", "udupi", 
//       "uttara kannada", "vijayapura", "yadgir"
//     ]
//   },
//   {
//     Option: "Kerala",
//     optionvalue: "kerala",
//     stations: [
//       "alappuzha", "ernakulam", "idukki", "kannur", "kasaragod", "kottayam", "kollam", "kozhikode",
//       "malappuram", "palakkad", "pathanamthitta", "thiruvananthapuram", "thrissur", "wayanad"
//     ]
//   },
//   {
//     Option: "Madhya Pradesh",
//     optionvalue: "madhya pradesh",
//     stations: [
//       "agar malwa", "alirajpur", "anuppur", "ashok nagar", "balaghat", "barwani", "betul", "bhind", 
//       "bhopal", "burhanpur", "chhatarpur", "chhindwara", "damoh", "datia", "dewas", "dhar", "dindori", 
//       "guna", "gwalior", "harda", "hoshangabad", "indore", "jabalpur", "jhabua", "katni", "khandwa", 
//       "khargone", "mandla", "mandsaur", "morena", "narsinghpur", "neemuch", "panna", "raisen", 
//       "rajgarh", "ratlam", "rewa", "sagar", "satna", "sehore", "seoni", "shahdol", "shajapur", 
//       "sheopur", "shivpuri", "sidhi", "singrauli", "tikamgarh", "ujjain", "umaria", "vidisha"
//     ]
//   },
//   {
//     Option: "Maharashtra",
//     optionvalue: "maharashtra",
//     stations: [
//       "ahmednagar", "akola", "amravati", "aurangabad", "beed", "bhandara", "buldhana", "chandrapur", 
//       "dhule", "gadchiroli", "gondia", "hatkanangle", "jalgaon", "jalna", "kolhapur", "latur", "mumbai", 
//       "nagpur", "nanded", "nandurbar", "nashik", "osmanabad", "palghar", "parbhani", "pendharkar", 
//       "pune", "raigad", "ratnagiri", "sangli", "satara", "sindhudurg", "solapur", "thane", "wardha", 
//       "washim", "yavatmal"
//     ]
//   },
//   {
//     Option: "Manipur",
//     optionvalue: "manipur",
//     stations: [
//       "bishnupur", "chandel", "churachandpur", "imphal east", "imphal west", "jiribam", "kakching", 
//       "kamjong", "kangpokpi", "noney", "punchang", "senapati", "tengnoupal", "thoubal", "ukhrul"
//     ]
//   },
//   {
//     Option: "Meghalaya",
//     optionvalue: "meghalaya",
//     stations: [
//       "east garo hills", "east khasi hills", "jaintia hills", "west garo hills", "west khasi hills"
//     ]
//   },
//   {
//     Option: "Mizoram",
//     optionvalue: "mizoram",
//     stations: [
//       "aizawl", "champhai", "kolasib", "lawngtlai", "lungle", "mammit", "serchhip", "siaha", "southeast mizoram"
//     ]
//   },
//   {
//     Option: "Nagaland",
//     optionvalue: "nagaland",
//     stations: [
//       "dimapur", "kohima", "mokokchung", "mon", "peren", "tuensang", "wokha", "zunheboto"
//     ]
//   },
//   {
//     Option: "Odisha",
//     optionvalue: "odisha",
//     stations: [
//       "angul", "balangir", "balasore", "bargarh", "bhadrak", "cuttack", "deogarh", "dhenkanal", "ganjam", 
//       "ganapati", "kalahandi", "kendrapara", "khurda", "koraput", "malkangiri", "mayurbhanj", "nabarangpur", 
//       "nayagarh", "puri", "rayagada", "sambalpur", "sundargarh"
//     ]
//   },
//   {
//     Option: "Rajasthan",
//     optionvalue: "rajasthan",
//     stations: [
//       "ajmer", "alwar", "banswara", "baran", "barmer", "bhilwara", "bikaner", "bundi", "chittorgarh", "churu",
//       "dholpur", "dungarpur", "hanumangarh", "jaipur", "jaisalmer", "jalore", "jhalawar", "jodhpur", "karauli",
//       "kota", "nagaur", "pali", "rajsamand", "sawai madhopur", "sikar", "sirohi", "tonk", "udaipur"
//     ]
//   },
//   {
//     Option: "Tamil Nadu",
//     optionvalue: "tamil nadu",
//     stations: [
//       "ariyalur", "chennai", "coimbatore", "cuddalore", "dharmapuri", "dindigul", "erode", "kanchipuram", 
//       "kangayam", "karur", "krishnagiri", "madurai", "nagapattinam", "namakkal", "perambalur", "pudukkottai", 
//       "ramanathapuram", "salem", "sivaganga", "thanjavur", "the nilgiris", "theni", "thoothukudi", "tiruchirappalli", 
//       "tirunelveli", "tiruvarur", "vellore", "villupuram", "virudhunagar"
//     ]
//   },
//   {
//     Option: "Telangana",
//     optionvalue: "telangana",
//     stations: [
//       "adilabad", "hyderabad", "jagtial", "jangaon", "jayashankar", "jhagadia", "kamareddy", "karimnagar", 
//       "khammam", "kothagudem", "mahaboobnagar", "mancherial", "medchal", "mulugu", "nagarkurnool", "nalgonda", 
//       "nizamabad", "peddapalli", "rajanna sircilla", "ranga reddy", "sangareddy", "sarangapur", "suryapet", 
//       "warangal", "west godavari"
//     ]
//   },
//   {
//     Option: "Uttar Pradesh",
//     optionvalue: "uttar pradesh",
//     stations: [
//       "agra", "allahabad", "ambedkar nagar", "auraiya", "baghpat", "banda", "barabanki", "bareilly", "basti", 
//       "bhadohi", "bijnor", "ballia", "ballabgarh", "bahraich", "bulandshahr", "chandauli", "chitrakoot", "deoria", 
//       "etah", "etawah", "firozabad", "gorakhpur", "hamirpur", "hardoi", "hathras", "jalaun", "jaunpur", "kanpur", 
//       "kanpur dehat", "khiri", "kushinagar", "lucknow", "mahoba", "mau", "meja", "mathura", "meerut", "mirzapur", 
//       "moradabad", "muzaffarnagar", "raebareli", "ramabai nagar", "rampur", "saharanpur", "shahjahanpur", "shravasti", 
//       "sonbhadra", "sultanpur", "unnao", "varanasi"
//     ]
//   },
//   {
//     Option: "Uttarakhand",
//     optionvalue: "uttarakhand",
//     stations: [
//       "almora", "bageshwar", "bharatpur", "chamoli", "champawat", "dehradun", "haridwar", "nainital", 
//       "pauri garhwal", "pithoragarh", "rudraprayag", "tehri garhwal", "udham singh nagar", "uttarkashi"
//     ]
//   },
//   {
//     Option: "West Bengal",
//     optionvalue: "west bengal",
//     stations: [
//       "bankura", "bardhaman", "birbhum", "dakshin dinajpur", "darjeeling", "hugli", "howrah", "jalpaiguri", 
//       "malda", "murshidabad", "north 24 parganas", "north dinajpur", "south 24 parganas", "south dinajpur", 
//       "siliguri", "purulia", "hooghly", "kolkata"
//     ]
//   },
//   {
//     Option: "Andaman and Nicobar Islands",
//     optionvalue: "andaman and nicobar islands",
//     stations: [
//       "andaman", "nicobar", "port blair"
//     ]
//   },
//   {
//     Option: "Chandigarh",
//     optionvalue: "chandigarh",
//     stations: [
//       "chandigarh"
//     ]
//   },
//   {
//     Option: "Dadra and Nagar Haveli and Daman and Diu",
//     optionvalue: "dadra and nagar haveli and daman and diu",
//     stations: [
//       "daman", "dadar", "silvassa"
//     ]
//   },
//   {
//     Option: "Lakshadweep",
//     optionvalue: "lakshadweep",
//     stations: [
//       "kavaratti", "minicoy", "agatti"
//     ]
//   },
//   {
//     Option: "Delhi",
//     optionvalue: "delhi",
//     stations: [
//       "new delhi"
//     ]
//   },
//   {
//     Option: "Puducherry",
//     optionvalue: "puducherry",
//     stations: [
//       "puducherry", "karaikal", "mahe", "yanam"
//     ]
//   }
// ];


//service station


export const Service_Station = [
  {
    Option: "All Station",
    optionvalue: "allstation",
  },
  {
    Option: "Ahmedabad",
    optionvalue: "ahmedabad",
  },
  {
    Option: "Bangalore",
    optionvalue: "bangalore",
  },
  {
    Option: "Chennai",
    optionvalue: "chennai",
  },
  {
    Option: "Coimbatore",
    optionvalue: "coimbatore",
  },
  {
    Option: "Delhi",
    optionvalue: "delhi",
  },
  {
    Option: "Erode",
    optionvalue: "erode",
  },
  {
    Option: "Goa",
    optionvalue: "goa",
  },
  {
    Option: "Hyderabad",
    optionvalue: "hyderabad",
  },
  {
    Option: "Indore",
    optionvalue: "indore",
  },
  {
    Option: "Jaipur",
    optionvalue: "jaipur",
  },
  {
    Option: "Kerala",
    optionvalue: "kerala",
  },
  {
    Option: "Kolkata",
    optionvalue: "kolkata",
  },
  {
    Option: "Lucknow",
    optionvalue: "lucknow",
  },
  {
    Option: "Madurai",
    optionvalue: "madurai",
  },
  {
    Option: "Mangalore",
    optionvalue: "mangalore",
  },
  {
    Option: "Mumbai",
    optionvalue: "mumbai",
  },
  {
    Option: "Nagpur",
    optionvalue: "nagpur",
  },
  {
    Option: "New one",
    optionvalue: "new one",
  },
  {
    Option: "Pune",
    optionvalue: "pune",
  },
  {
    Option: "Tiruchi",
    optionvalue: "tiruchi",
  },
  {
    Option: "Vijayawada",
    optionvalue: "Vijayawada",
  },
];


// Select

export const Select = [
  {
    Option: "Percentage",
    optionvalue: "percentage",
  },
  {
    Option: "Pay Type Percentage",
    optionvalue: "paytypePercentage",
  },
  {
    Option: "Pay Type",
    optionvalue: "paytype",
  },
];


export const UnderGroup = [
  {
    optionvalue: "adityabrila",
    option: "ADITYA BRILA",
  },
  {
    optionvalue: "aequs",
    option: "AEQUS",
  },
  {
    optionvalue: "automotive",
    option: "AUTO MOTIVE",
  },
  {
    optionvalue: "bharathicement",
    option: "BHARATHI CEMENT",
  },
  {
    optionvalue: "checktronix",
    option: "CHECKTRONIX",
  },
  {
    optionvalue: "citec",
    option: "CITEC",
  },
  {
    optionvalue: "cle",
    option: "CLE",
  },
  {
    optionvalue: "counculatedenmark",
    option: "COUNCULTE DEMARK",
  },
  {
    optionvalue: "d.bank",
    option: "D.BANK",
  },
  {
    optionvalue: "david",
    option: "DAVID",
  },
  {
    optionvalue: "deriohealthcare",
    option: "DERIO HEALTHCARE",
  },
  {
    optionvalue: "evoquawater",
    option: "EVOQUA WATER",
  },
  {
    optionvalue: "firefly",
    option: "FIRE FLY",
  },
  {
    optionvalue: "geethanjaliinstitute",
    option: "GEETHANJAILI INSTITUTE",
  },
  {
    optionvalue: "gen",
    option: "GEN",
  },
  {
    optionvalue: "gohypetechnologiespvtltd",
    option: "GOHYPE TECHNOLOIES PVT LTD",
  },
  {
    optionvalue: "hcl",
    option: "HCL",
  },
  {
    optionvalue: "hcl(bangalore)",
    option: "HCL (BANGALORE)",
  },
  {
    optionvalue: "hclcorp",
    option: "HCL CROP",
  },
  {
    optionvalue: "icici",
    option: "ICICI",
  },
  {
    optionvalue: "infosys",
    option: "INFOSYS",
  },
  {
    optionvalue: "knightfrank",
    option: "KNIGHT FRANK",
  },
  {
    optionvalue: "ktsindia",
    option: "KTS INDIA",
  },
  {
    optionvalue: "millward",
    option: "MILL WARD",
  },
  {
    optionvalue: "mr.samdavid",
    option: "MR.SAM DAVID",
  },
  {
    optionvalue: "ncclimited",
    option: "NCC LIMITED",
  },
  {
    optionvalue: "nipponsteel",
    option: "NIPPON STEEL",
  },
  {
    optionvalue: "nisseielectric",
    option: "NISSE ELECTRIC",
  },
  {
    optionvalue: "nskbearings",
    option: "NSK BEARINGS",
  },
  {
    optionvalue: "prodapt",
    option: "PRODAPT",
  },
  {
    optionvalue: "rapid",
    option: "RAPID",
  },
  {
    optionvalue: "rbdshelters",
    option: "RBD SHELTERS",
  },
  {
    optionvalue: "rrd(donnelley)",
    option: "RRD (DONNELLEY)",
  },
  {
    optionvalue: "sadan",
    option: "SADAN",
  },
  {
    optionvalue: "samunnati",
    option: "SAMUNNATI",
  },
  {
    optionvalue: "sharpgarudafarm",
    option: "SHARP GARUDA FARM",
  },
  {
    optionvalue: "shreekrishna",
    option: "SHREE KRISHNA",
  },
  {
    optionvalue: "shriramtransport",
    option: "SHRIRAM TRANSPORT",
  },
  {
    optionvalue: "ssgroups",
    option: "SS GROUPS",
  },
  {
    optionvalue: "tangoit",
    option: "TANGO IT",
  },
  {
    optionvalue: "tvscredit",
    option: "TVS CREDIT",
  },
  {
    optionvalue: "unicornadventures",
    option: "UNICORN ADVETURESS",
  },
  {
    optionvalue: "weworkindia",
    option: "WE WORKINDIA",
  },
];

// States

export const states = [
  {
    state: "Andhra Pradesh",
    statevalue: "andhra_pradesh",
    districts: [
      "Anantapur",
      "Chittoor",
      "East Godavari",
      "Guntur",
      "Krishna",
      "Kurnool",
      "Nellore",
      "Prakasam",
      "Srikakulam",
      "Visakhapatnam",
      "Vijayawada",
      "Vijayawada",
      "Vizianagaram",
      "West Godavari",
      "YSR Kadapa",
    ],
  },
  {
    state: "Arunachal Pradesh",
    statevalue: "arunachal_pradesh",
    districts: [
      "Tawang",
      "West Kameng",
      "East Kameng",
      "Papum Pare",
      "Kurung Kumey",
      "Kra Daadi",
      "Lower Subansiri",
      "Upper Subansiri",
      "West Siang",
      "East Siang",
      "Siang",
      "Upper Siang",
      "Lower Siang",
      "Lower Dibang Valley",
      "Dibang Valley",
      "Anjaw",
      "Lohit",
      "Namsai",
      "Changlang",
      "Tirap",
      "Longding",
    ],
  },
  {
    state: "Assam",
    statevalue: "assam",
    districts: [
      "Baksa",
      "Barpeta",
      "Biswanath",
      "Bongaigaon",
      "Cachar",
      "Charaideo",
      "Chirang",
      "Darrang",
      "Dhemaji",
      "Dhubri",
      "Dibrugarh",
      "Goalpara",
      "Golaghat",
      "Hailakandi",
      "Hojai",
      "Jorhat",
      "Kamrup Metropolitan",
      "Kamrup",
      "Karbi Anglong",
      "Karimganj",
      "Kokrajhar",
      "Lakhimpur",
      "Majuli",
      "Morigaon",
      "Nagaon",
      "Nalbari",
      "Dima Hasao",
      "Sivasagar",
      "Sonitpur",
      "South Salmara-Mankachar",
      "Tinsukia",
      "Udalguri",
      "West Karbi Anglong",
    ],
  },
  {
    state: "Bihar",
    statevalue: "bihar",
    districts: [
      "Araria",
      "Arwal",
      "Aurangabad",
      "Banka",
      "Begusarai",
      "Bhagalpur",
      "Bhojpur",
      "Buxar",
      "Darbhanga",
      "East Champaran (Motihari)",
      "Gaya",
      "Gopalganj",
      "Jamui",
      "Jehanabad",
      "Kaimur (Bhabua)",
      "Katihar",
      "Khagaria",
      "Kishanganj",
      "Lakhisarai",
      "Madhepura",
      "Madhubani",
      "Munger (Monghyr)",
      "Muzaffarpur",
      "Nalanda",
      "Nawada",
      "Patna",
      "Purnia (Purnea)",
      "Rohtas",
      "Saharsa",
      "Samastipur",
      "Saran",
      "Sheikhpura",
      "Sheohar",
      "Sitamarhi",
      "Siwan",
      "Supaul",
      "Vaishali",
      "West Champaran",
    ],
  },
  {
    state: "Chandigarh (UT)",
    statevalue: "chandigarh_(UT)",
    districts: ["Chandigarh"],
  },
  {
    state: "Chhattisgarh",
    statevalue: "chhattisgarh",
    districts: [
      "Balod",
      "Baloda Bazar",
      "Balrampur",
      "Bastar",
      "Bemetara",
      "Bijapur",
      "Bilaspur",
      "Dantewada (South Bastar)",
      "Dhamtari",
      "Durg",
      "Gariyaband",
      "Janjgir-Champa",
      "Jashpur",
      "Kabirdham (Kawardha)",
      "Kanker (North Bastar)",
      "Kondagaon",
      "Korba",
      "Korea (Koriya)",
      "Mahasamund",
      "Mungeli",
      "Narayanpur",
      "Raigarh",
      "Raipur",
      "Rajnandgaon",
      "Sukma",
      "Surajpur  ",
      "Surguja",
    ],
  },
  {
    state: "Dadra and Nagar Haveli (UT)",
    statevalue: "dadra_and_nagar_haveli_(UT)",
    districts: ["Dadra & Nagar Haveli"],
  },
  {
    state: "Daman and Diu (UT)",
    statevalue: "daman_and_diu_(UT)",
    districts: ["Daman", "Diu"],
  },
  {
    state: "Delhi (NCT)",
    statevalue: "delhi_(NCT)",
    districts: [
      "Central Delhi",
      "East Delhi",
      "New Delhi",
      "North Delhi",
      "North East  Delhi",
      "North West  Delhi",
      "Shahdara",
      "South Delhi",
      "South East Delhi",
      "South West  Delhi",
      "West Delhi",
    ],
  },
  {
    state: "Goa",
    statevalue: "goa",
    districts: ["North Goa", "South Goa"],
  },
  {
    state: "Gujarat",
    districts: [
      "Ahmedabad",
      "Amreli",
      "Anand",
      "Aravalli",
      "Banaskantha (Palanpur)",
      "Bharuch",
      "Bhavnagar",
      "Botad",
      "Chhota Udepur",
      "Dahod",
      "Dangs (Ahwa)",
      "Diu Island",
      "Devbhoomi Dwarka",
      "Gandhinagar",
      "Gir Somnath",
      "Jamnagar",
      "Junagadh",
      "Kachchh",
      "Kheda (Nadiad)",
      "Mahisagar",
      "Mehsana",
      "Morbi",
      "Narmada (Rajpipla)",
      "Navsari",
      "Panchmahal (Godhra)",
      "Patan",
      "Porbandar",
      "Gujarat",
      "Sabarkantha (Himmatnagar)",
      "Surat",
      "Surendranagar",
      "Tapi (Vyara)",
      "Vadodara",
      "Valsad",
    ],
  },
  {
    state: "Haryana",
    statevalue: "haryana",
    districts: [
      "Ambala",
      "Bhiwani",
      "Charkhi Dadri",
      "Faridabad",
      "Fatehabad",
      "Gurgaon",
      "Hisar",
      "Jhajjar",
      "Jind",
      "Kaithal",
      "Karnal",
      "Kurukshetra",
      "Mahendragarh",
      "Mewat",
      "Palwal",
      "Panchkula",
      "Panipat",
      "Rewari",
      "Rohtak",
      "Sirsa",
      "Sonipat",
      "Yamunanagar",
    ],
  },
  {
    state: "Himachal Pradesh",
    statevalue: "himachalpradesh",
    districts: [
      "Bilaspur",
      "Chamba",
      "Hamirpur",
      "Kangra",
      "Kinnaur",
      "Kullu",
      "Lahaul &amp; Spiti",
      "Mandi",
      "Shimla",
      "Sirmaur (Sirmour)",
      "Solan",
      "Una",
    ],
  },
  {
    state: "Jammu and Kashmir",
    statevalue: "jammu_and_kashmir",
    districts: [
      "Anantnag",
      "Bandipore",
      "Baramulla",
      "Budgam",
      "Doda",
      "Ganderbal",
      "Jammu",
      "Kargil",
      "Kathua",
      "Kishtwar",
      "Kulgam",
      "Kupwara",
      "Leh",
      "Poonch",
      "Pulwama",
      "Rajouri",
      "Ramban",
      "Reasi",
      "Samba",
      "Shopian",
      "Srinagar",
      "Udhampur",
    ],
  },
  {
    state: "Jharkhand",
    statevalue: "jharkhand",
    districts: [
      "Bokaro",
      "Chatra",
      "Deoghar",
      "Dhanbad",
      "Dumka",
      "East Singhbhum",
      "Garhwa",
      "Giridih",
      "Godda",
      "Gumla",
      "Hazaribag",
      "Jamtara",
      "Khunti",
      "Koderma",
      "Latehar",
      "Lohardaga",
      "Pakur",
      "Palamu",
      "Ramgarh",
      "Ranchi",
      "Sahibganj",
      "Seraikela-Kharsawan",
      "Simdega",
      "West Singhbhum",
    ],
  },
  {
    state: "Karnataka",
    statevalue: "karnataka",
    districts: [
      "Bagalkot",
      "Ballari (Bellary)",
      "Belagavi (Belgaum)",
      "Bengaluru (Bangalore) Rural",
      "Bengaluru (Bangalore) Urban",
      "Bidar",
      "Chamarajanagar",
      "Chikballapur",
      "Chikkamagaluru (Chikmagalur)",
      "Chitradurga",
      "Hubli",
      "Dakshina Kannada",
      "Davangere",
      "Dharwad",
      "Gadag",
      "Hassan",
      "Haveri",
      "Kalaburagi (Gulbarga)",
      "Kodagu",
      "Kolar",
      "Koppal",
      "Mandya",
      "Mysuru (Mysore)",
      "Mangalore",
      "Raichur",
      "Ramanagara",
      "Shivamogga (Shimoga)",
      "Tumakuru (Tumkur)",
      "Udupi",
      "Uttara Kannada (Karwar)",
      "Vijayapura (Bijapur)",
      "Yadgir",
    ],
  },
  {
    state: "Kerala",
    statevalue: "kerala",
    districts: [
      "Alappuzha",
      "Ernakulam",
      "Idukki",
      "Kannur",
      "Kasaragod",
      "Kollam",
      "Kochin",
      "Kottayam",
      "Kozhikode",
      "Malappuram",
      "Palakkad",
      "Pathanamthitta",
      "Thiruvananthapuram",
      "Thrissur",
      "Wayanad",
    ],
  },
  {
    state: "Lakshadweep (UT)",
    statevalue: "lakshadweep_(UT)",
    districts: [
      "Agatti",
      "Amini",
      "Androth",
      "Bithra",
      "Chethlath",
      "Kavaratti",
      "Kadmath",
      "Kalpeni",
      "Kilthan",
      "Minicoy",
    ],
  },
  {
    state: "Madhya Pradesh",
    statevalue: "madhya_pradesh",
    districts: [
      "Agar Malwa",
      "Alirajpur",
      "Anuppur",
      "Ashoknagar",
      "Balaghat",
      "Barwani",
      "Betul",
      "Bhind",
      "Bhopal",
      "Burhanpur",
      "Chhatarpur",
      "Chhindwara",
      "Damoh",
      "Datia",
      "Dewas",
      "Dhar",
      "Dindori",
      "Guna",
      "Gwalior",
      "Harda",
      "Hoshangabad",
      "Indore",
      "Jabalpur",
      "Jhabua",
      "Katni",
      "Khandwa",
      "Khargone",
      "Mandla",
      "Mandsaur",
      "Morena",
      "Narsinghpur",
      "Neemuch",
      "Panna",
      "Raisen",
      "Rajgarh",
      "Ratlam",
      "Rewa",
      "Sagar",
      "Satna",
      "Sehore",
      "Seoni",
      "Shahdol",
      "Shajapur",
      "Sheopur",
      "Shivpuri",
      "Sidhi",
      "Singrauli",
      "Tikamgarh",
      "Ujjain",
      "Umaria",
      "Vidisha",
    ],
  },
  {
    state: "Maharashtra",
    statevalue: "maharashtra",
    districts: [
      "Ahmednagar",
      "Akola",
      "Amravati",
      "Aurangabad",
      "Beed",
      "Bhandara",
      "Buldhana",
      "Chandrapur",
      "Dhule",
      "Gadchiroli",
      "Gondia",
      "Hingoli",
      "Jalgaon",
      "Jalna",
      "Kolhapur",
      "Latur",
      "Mumbai City",
      "Mumbai Suburban",
      "Nagpur",
      "Nanded",
      "Nandurbar",
      "Nashik",
      "Osmanabad",
      "Palghar",
      "Parbhani",
      "Pune",
      "Raigad",
      "Ratnagiri",
      "Sangli",
      "Satara",
      "Sindhudurg",
      "Solapur",
      "Thane",
      "Wardha",
      "Washim",
      "Yavatmal",
    ],
  },
  {
    state: "Manipur",
    statevalue: "manipur",
    districts: [
      "Bishnupur",
      "Chandel",
      "Churachandpur",
      "Imphal East",
      "Imphal West",
      "Jiribam",
      "Kakching",
      "Kamjong",
      "Kangpokpi",
      "Noney",
      "Pherzawl",
      "Senapati",
      "Tamenglong",
      "Tengnoupal",
      "Thoubal",
      "Ukhrul",
    ],
  },
  {
    state: "Meghalaya",
    statevalue: "meghalaya",
    districts: [
      "East Garo Hills",
      "East Jaintia Hills",
      "East Khasi Hills",
      "North Garo Hills",
      "Ri Bhoi",
      "South Garo Hills",
      "South West Garo Hills ",
      "South West Khasi Hills",
      "West Garo Hills",
      "West Jaintia Hills",
      "West Khasi Hills",
    ],
  },
  {
    state: "Mizoram",
    statevalue: "mizoram",
    districts: [
      "Aizawl",
      "Champhai",
      "Kolasib",
      "Lawngtlai",
      "Lunglei",
      "Mamit",
      "Saiha",
      "Serchhip",
    ],
  },
  {
    state: "Nagaland",
    statevalue: "nagaland",
    districts: [
      "Dimapur",
      "Kiphire",
      "Kohima",
      "Longleng",
      "Mokokchung",
      "Mon",
      "Peren",
      "Phek",
      "Tuensang",
      "Wokha",
      "Zunheboto",
    ],
  },
  {
    state: "Odisha",
    statevalue: "odisha",
    districts: [
      "Angul",
      "Balangir",
      "Balasore",
      "Bargarh",
      "Bhadrak",
      "Boudh",
      "Cuttack",
      "Deogarh",
      "Dhenkanal",
      "Gajapati",
      "Ganjam",
      "Jagatsinghapur",
      "Jajpur",
      "Jharsuguda",
      "Kalahandi",
      "Kandhamal",
      "Kendrapara",
      "Kendujhar (Keonjhar)",
      "Khordha",
      "Koraput",
      "Malkangiri",
      "Mayurbhanj",
      "Nabarangpur",
      "Nayagarh",
      "Nuapada",
      "Puri",
      "Rayagada",
      "Sambalpur",
      "Sonepur",
      "Sundargarh",
    ],
  },
  {
    state: "Puducherry (UT)",
    statevalue: "puducherry_(UT)",
    districts: ["Karaikal", "Mahe", "Pondicherry", "Yanam"],
  },
  {
    state: "Punjab",
    statevalue: "punjab",
    districts: [
      "Amritsar",
      "Barnala",
      "Bathinda",
      "Faridkot",
      "Fatehgarh Sahib",
      "Fazilka",
      "Ferozepur",
      "Gurdaspur",
      "Hoshiarpur",
      "Jalandhar",
      "Kapurthala",
      "Ludhiana",
      "Mansa",
      "Moga",
      "Muktsar",
      "Nawanshahr (Shahid Bhagat Singh Nagar)",
      "Pathankot",
      "Patiala",
      "Rupnagar",
      "Sahibzada Ajit Singh Nagar (Mohali)",
      "Sangrur",
      "Tarn Taran",
    ],
  },
  {
    state: "Rajasthan",
    statevalue: "rajasthan",
    districts: [
      "Ajmer",
      "Alwar",
      "Banswara",
      "Baran",
      "Barmer",
      "Bharatpur",
      "Bhilwara",
      "Bikaner",
      "Bundi",
      "Chittorgarh",
      "Churu",
      "Dausa",
      "Dholpur",
      "Dungarpur",
      "Hanumangarh",
      "Jaipur",
      "Jaisalmer",
      "Jalore",
      "Jhalawar",
      "Jhunjhunu",
      "Jodhpur",
      "Karauli",
      "Kota",
      "Nagaur",
      "Pali",
      "Pratapgarh",
      "Rajsamand",
      "Sawai Madhopur",
      "Sikar",
      "Sirohi",
      "Sri Ganganagar",
      "Tonk",
      "Udaipur",
    ],
  },
  {
    state: "Sikkim",
    statevalue: "sikkim",
    districts: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
  },
  {
    state: "Tamil Nadu",
    statevalue: "tamil_nadu",
    districts: [
      "Ariyalur",
      "Chennai",
      "Coimbatore",
      "Cuddalore",
      "Dharmapuri",
      "Dindigul",
      "Erode",
      "Kanchipuram",
      "Karur",
      "Krishnagiri",
      "Madurai",
      "Nagapattinam",
      "Namakkal",
      "Nilgiris",
      "Perambalur",
      "Pudukkottai",
      "Ramanathapuram",
      "Salem",
      "Sivaganga",
      "Thanjavur",
      "Theni",
      "Thoothukudi (Tuticorin)",
      "Tiruchirappalli",
      "Tirunelveli",
      "Tiruppur",
      "Tiruvallur",
      "Tiruvannamalai",
      "Tiruvarur",
      "Vellore",
      "Viluppuram",
      "Virudhunagar",
    ],
  },
  {
    state: "Telangana",
    statevalue: "telangana",
    districts: [
      "Adilabad",
      "Bhadradri Kothagudem",
      "Hyderabad",
      "Jagtial",
      "Jangaon",
      "Jayashankar Bhoopalpally",
      "Jogulamba Gadwal",
      "Kamareddy",
      "Karimnagar",
      "Khammam",
      "Komaram Bheem Asifabad",
      "Mahabubabad",
      "Mahabubnagar",
      "Mancherial",
      "Medak",
      "Medchal",
      "Nagarkurnool",
      "Nalgonda",
      "Nirmal",
      "Nizamabad",
      "Peddapalli",
      "Rajanna Sircilla",
      "Rangareddy",
      "Sangareddy",
      "Siddipet",
      "Suryapet",
      "Vikarabad",
      "Wanaparthy",
      "Warangal (Rural)",
      "Warangal (Urban)",
      "Yadadri Bhuvanagiri",
    ],
  },
  {
    state: "Tripura",
    statevalue: "tripura",
    districts: [
      "Dhalai",
      "Gomati",
      "Khowai",
      "North Tripura",
      "Sepahijala",
      "South Tripura",
      "Unakoti",
      "West Tripura",
    ],
  },
  {
    state: "Uttarakhand",
    statevalue: "uttarakhand",
    districts: [
      "Almora",
      "Bageshwar",
      "Chamoli",
      "Champawat",
      "Dehradun",
      "Haridwar",
      "Nainital",
      "Pauri Garhwal",
      "Pithoragarh",
      "Rudraprayag",
      "Tehri Garhwal",
      "Udham Singh Nagar",
      "Uttarkashi",
    ],
  },
  {
    state: "Uttar Pradesh",
    statevalue: "uttar_pradesh",
    districts: [
      "Agra",
      "Aligarh",
      "Allahabad",
      "Ambedkar Nagar",
      "Amethi (Chatrapati Sahuji Mahraj Nagar)",
      "Amroha (J.P. Nagar)",
      "Auraiya",
      "Azamgarh",
      "Baghpat",
      "Bahraich",
      "Ballia",
      "Balrampur",
      "Banda",
      "Barabanki",
      "Bareilly",
      "Basti",
      "Bhadohi",
      "Bijnor",
      "Budaun",
      "Bulandshahr",
      "Chandauli",
      "Chitrakoot",
      "Deoria",
      "Etah",
      "Etawah",
      "Faizabad",
      "Farrukhabad",
      "Fatehpur",
      "Firozabad",
      "Gautam Buddha Nagar",
      "Ghaziabad",
      "Ghazipur",
      "Gonda",
      "Gorakhpur",
      "Hamirpur",
      "Hapur (Panchsheel Nagar)",
      "Hardoi",
      "Hathras",
      "Jalaun",
      "Jaunpur",
      "Jhansi",
      "Kannauj",
      "Kanpur Dehat",
      "Kanpur Nagar",
      "Kanshiram Nagar (Kasganj)",
      "Kaushambi",
      "Kushinagar (Padrauna)",
      "Lakhimpur - Kheri",
      "Lalitpur",
      "Lucknow",
      "Maharajganj",
      "Mahoba",
      "Mainpuri",
      "Mathura",
      "Mau",
      "Meerut",
      "Mirzapur",
      "Moradabad",
      "Muzaffarnagar",
      "Noida",
      "Pilibhit",
      "Pratapgarh",
      "RaeBareli",
      "Rampur",
      "Saharanpur",
      "Sambhal (Bhim Nagar)",
      "Sant Kabir Nagar",
      "Shahjahanpur",
      "Shamali (Prabuddh Nagar)",
      "Shravasti",
      "Siddharth Nagar",
      "Sitapur",
      "Sonbhadra",
      "Sultanpur",
      "Unnao",
      "Varanasi",
    ],
  },
  {
    state: "West Bengal",
    statevalue: "west_bengal",
    districts: [
      "Alipurduar",
      "Bankura",
      "Birbhum",
      "Burdwan (Bardhaman)",
      "Cooch Behar",
      "Dakshin Dinajpur (South Dinajpur)",
      "Darjeeling",
      "Hooghly",
      "Howrah",
      "Jalpaiguri",
      "Kalimpong",
      "Kolkata",
      "Malda",
      "Murshidabad",
      "Nadia",
      "North 24 Parganas",
      "Paschim Medinipur (West Medinipur)",
      "Purba Medinipur (East Medinipur)",
      "Purulia",
      "South 24 Parganas",
      "Uttar Dinajpur (North Dinajpur)",
    ],
  },
];
