import {useState} from "react";

const StationDataFile = ()=>{
    const [allStations, setAllStations] = useState([  "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam",
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
      
        "Ariyalur","Chengalpattu","Chennai","Coimbatore","Cuddalore","Dharmapuri","Dindigul","Erode",
        "Kallakurichi","Kancheepuram","Karur","Krishnagiri","Madurai","Mayiladuthurai","Nagapattinam","Kanniyakumari",
        "Namakkal","Perambalur","Pudukkottai","Ramanathapuram","Ranipet","Salem","Sivagangai","Tenkasi","Thanjavur","Theni",
        "Thoothukudi","Tiruchirappalli","Tirunelveli","Tirupathur","Tiruppur","Tiruvallur","Tiruvannamalai",
        "Tiruvarur","Vellore","Viluppuram","Virudhunagar","Nilgiris",
      
      
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
        "Purba Medinipur", "South 24 Parganas", "Uttar Dinajpur"]);
    const [stationDatas,setStationDatas] = useState({
        station:"",
        state:""
    })
    const handleSubmiStation = () => {
        setAllStations(prev => [...prev, stationDatas?.station]);
        console.log("added", stationDatas?.station);
    };
    return{
handleSubmiStation,
allStations
}
}
export default StationDataFile;