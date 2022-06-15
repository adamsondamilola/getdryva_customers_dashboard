import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  error:any
  resp: any;
  result: any;
  token: any;
  active = 0

  constructor(private httpClient: HttpClient) { }

//  webUrl="http://127.0.0.1:8000/"
   //apiUrl="http://127.0.0.1:8000/api/"
  //frontendUrl="http://localhost:4200/"
  webUrl = "https://customerapi.getdryva.com/"
  apiUrl = "https://customerapi.getdryva.com/api/"
  frontendUrl = "https://logistics.getdryva.com/"

getLoginToken(){
  const tok = localStorage.getItem("customer_login_token");
  return tok
}

signupCustomer(data:any) {
  return this.httpClient.post(this.apiUrl+'auth/register', data);
}

verifyCustomerEmail(data:any) {
  return this.httpClient.post(this.apiUrl+'auth/email_verification', data);
}

loginCustomer(data:any) {
  return this.httpClient.post(this.apiUrl+'auth/login', data);
}

requestPasswordReset(data:any) {
  return this.httpClient.post(this.apiUrl+'auth/password_reset', data);
}

confirmPasswordReset(data:any) {
  return this.httpClient.post(this.apiUrl+'auth/confirm_password_reset', data);
}


checkIfLoggedIn(token:any){
  return this.httpClient.get(this.apiUrl+'auth/'+token+'/verify_login_token');
  }

  trackOrder(id:any){
    return this.httpClient.get(this.apiUrl+'order/'+id+'/get_order_by_tracking_id');
    }

    addCompany(data:any) {
  return this.httpClient.post(this.apiUrl+'customer/add_company', data);
}

nigeriaStatesAndLga(){
return  [
    {
      "state": "Adamawa",
      "alias": "adamawa",
      "lgas": [
        "Demsa",
        "Fufure",
        "Ganye",
        "Gayuk",
        "Gombi",
        "Grie",
        "Hong",
        "Jada",
        "Larmurde",
        "Madagali",
        "Maiha",
        "Mayo Belwa",
        "Michika",
        "Mubi North",
        "Mubi South",
        "Numan",
        "Shelleng",
        "Song",
        "Toungo",
        "Yola North",
        "Yola South"
      ]
    },
    {
      "state": "Akwa Ibom",
      "alias": "akwa_ibom",
      "lgas": [
        "Abak",
        "Eastern Obolo",
        "Eket",
        "Esit Eket",
        "Essien Udim",
        "Etim Ekpo",
        "Etinan",
        "Ibeno",
        "Ibesikpo Asutan",
        "Ibiono-Ibom",
        "Ikot Abasi",
        "Ika",
        "Ikono",
        "Ikot Ekpene",
        "Ini",
        "Mkpat-Enin",
        "Itu",
        "Mbo",
        "Nsit-Atai",
        "Nsit-Ibom",
        "Nsit-Ubium",
        "Obot Akara",
        "Okobo",
        "Onna",
        "Oron",
        "Udung-Uko",
        "Ukanafun",
        "Oruk Anam",
        "Uruan",
        "Urue-Offong/Oruko",
        "Uyo"
      ]
    },
    {
      "state": "Anambra",
      "alias": "anambra",
      "lgas": [
        "Aguata",
        "Anambra East",
        "Anaocha",
        "Awka North",
        "Anambra West",
        "Awka South",
        "Ayamelum",
        "Dunukofia",
        "Ekwusigo",
        "Idemili North",
        "Idemili South",
        "Ihiala",
        "Njikoka",
        "Nnewi North",
        "Nnewi South",
        "Ogbaru",
        "Onitsha North",
        "Onitsha South",
        "Orumba North",
        "Orumba South",
        "Oyi"
      ]
    },
    {
      "state": "Ogun",
      "alias": "ogun",
      "lgas": [
        "Abeokuta North",
        "Abeokuta South",
        "Ado-Odo/Ota",
        "Egbado North",
        "Ewekoro",
        "Egbado South",
        "Ijebu North",
        "Ijebu East",
        "Ifo",
        "Ijebu Ode",
        "Ijebu North East",
        "Imeko Afon",
        "Ikenne",
        "Ipokia",
        "Odeda",
        "Obafemi Owode",
        "Odogbolu",
        "Remo North",
        "Ogun Waterside",
        "Shagamu"
      ]
    },
    {
      "state": "Ondo",
      "alias": "ondo",
      "lgas": [
        "Akoko North-East",
        "Akoko North-West",
        "Akoko South-West",
        "Akoko South-East",
        "Akure North",
        "Akure South",
        "Ese Odo",
        "Idanre",
        "Ifedore",
        "Ilaje",
        "Irele",
        "Ile Oluji/Okeigbo",
        "Odigbo",
        "Okitipupa",
        "Ondo West",
        "Ose",
        "Ondo East",
        "Owo"
      ]
    },
    {
      "state": "Rivers",
      "alias": "rivers",
      "lgas": [
        "Abua/Odual",
        "Ahoada East",
        "Ahoada West",
        "Andoni",
        "Akuku-Toru",
        "Asari-Toru",
        "Bonny",
        "Degema",
        "Emuoha",
        "Eleme",
        "Ikwerre",
        "Etche",
        "Gokana",
        "Khana",
        "Obio/Akpor",
        "Ogba/Egbema/Ndoni",
        "Ogu/Bolo",
        "Okrika",
        "Omuma",
        "Opobo/Nkoro",
        "Oyigbo",
        "Port Harcourt",
        "Tai"
      ]
    },
    {
      "state": "Bauchi",
      "alias": "bauchi",
      "lgas": [
        "Alkaleri",
        "Bauchi",
        "Bogoro",
        "Damban",
        "Darazo",
        "Dass",
        "Gamawa",
        "Ganjuwa",
        "Giade",
        "Itas/Gadau",
        "Jama'are",
        "Katagum",
        "Kirfi",
        "Misau",
        "Ningi",
        "Shira",
        "Tafawa Balewa",
        "Toro",
        "Warji",
        "Zaki"
      ]
    },
    {
      "state": "Benue",
      "alias": "benue",
      "lgas": [
        "Agatu",
        "Apa",
        "Ado",
        "Buruku",
        "Gboko",
        "Guma",
        "Gwer East",
        "Gwer West",
        "Katsina-Ala",
        "Konshisha",
        "Kwande",
        "Logo",
        "Makurdi",
        "Obi",
        "Ogbadibo",
        "Ohimini",
        "Oju",
        "Okpokwu",
        "Oturkpo",
        "Tarka",
        "Ukum",
        "Ushongo",
        "Vandeikya"
      ]
    },
    {
      "state": "Borno",
      "alias": "borno",
      "lgas": [
        "Abadam",
        "Askira/Uba",
        "Bama",
        "Bayo",
        "Biu",
        "Chibok",
        "Damboa",
        "Dikwa",
        "Guzamala",
        "Gubio",
        "Hawul",
        "Gwoza",
        "Jere",
        "Kaga",
        "Kala/Balge",
        "Konduga",
        "Kukawa",
        "Kwaya Kusar",
        "Mafa",
        "Magumeri",
        "Maiduguri",
        "Mobbar",
        "Marte",
        "Monguno",
        "Ngala",
        "Nganzai",
        "Shani"
      ]
    },
    {
      "state": "Bayelsa",
      "alias": "bayelsa",
      "lgas": [
        "Brass",
        "Ekeremor",
        "Kolokuma/Opokuma",
        "Nembe",
        "Ogbia",
        "Sagbama",
        "Southern Ijaw",
        "Yenagoa"
      ]
    },
    {
      "state": "Cross River",
      "alias": "cross_river",
      "lgas": [
        "Abi",
        "Akamkpa",
        "Akpabuyo",
        "Bakassi",
        "Bekwarra",
        "Biase",
        "Boki",
        "Calabar Municipal",
        "Calabar South",
        "Etung",
        "Ikom",
        "Obanliku",
        "Obubra",
        "Obudu",
        "Odukpani",
        "Ogoja",
        "Yakuur",
        "Yala"
      ]
    },
    {
      "state": "Delta",
      "alias": "delta",
      "lgas": [
        "Aniocha North",
        "Aniocha South",
        "Bomadi",
        "Burutu",
        "Ethiope West",
        "Ethiope East",
        "Ika North East",
        "Ika South",
        "Isoko North",
        "Isoko South",
        "Ndokwa East",
        "Ndokwa West",
        "Okpe",
        "Oshimili North",
        "Oshimili South",
        "Patani",
        "Sapele",
        "Udu",
        "Ughelli North",
        "Ukwuani",
        "Ughelli South",
        "Uvwie",
        "Warri North",
        "Warri South",
        "Warri South West"
      ]
    },
    {
      "state": "Ebonyi",
      "alias": "ebonyi",
      "lgas": [
        "Abakaliki",
        "Afikpo North",
        "Ebonyi",
        "Afikpo South",
        "Ezza North",
        "Ikwo",
        "Ezza South",
        "Ivo",
        "Ishielu",
        "Izzi",
        "Ohaozara",
        "Ohaukwu",
        "Onicha"
      ]
    },
    {
      "state": "Edo",
      "alias": "edo",
      "lgas": [
        "Akoko-Edo",
        "Egor",
        "Esan Central",
        "Esan North-East",
        "Esan South-East",
        "Esan West",
        "Etsako Central",
        "Etsako East",
        "Etsako West",
        "Igueben",
        "Ikpoba Okha",
        "Orhionmwon",
        "Oredo",
        "Ovia North-East",
        "Ovia South-West",
        "Owan East",
        "Owan West",
        "Uhunmwonde"
      ]
    },
    {
      "state": "Ekiti",
      "alias": "ekiti",
      "lgas": [
        "Ado Ekiti",
        "Efon",
        "Ekiti East",
        "Ekiti South-West",
        "Ekiti West",
        "Emure",
        "Gbonyin",
        "Ido Osi",
        "Ijero",
        "Ikere",
        "Ilejemeje",
        "Irepodun/Ifelodun",
        "Ikole",
        "Ise/Orun",
        "Moba",
        "Oye"
      ]
    },
    {
      "state": "Enugu",
      "alias": "enugu",
      "lgas": [
        "Awgu",
        "Aninri",
        "Enugu East",
        "Enugu North",
        "Ezeagu",
        "Enugu South",
        "Igbo Etiti",
        "Igbo Eze North",
        "Igbo Eze South",
        "Isi Uzo",
        "Nkanu East",
        "Nkanu West",
        "Nsukka",
        "Udenu",
        "Oji River",
        "Uzo Uwani",
        "Udi"
      ]
    },
    {
      "state": "Federal Capital Territory",
      "alias": "abuja",
      "lgas": [
        "Abaji",
        "Bwari",
        "Gwagwalada",
        "Kuje",
        "Kwali",
        "Municipal Area Council"
      ]
    },
    {
      "state": "Gombe",
      "alias": "gombe",
      "lgas": [
        "Akko",
        "Balanga",
        "Billiri",
        "Dukku",
        "Funakaye",
        "Gombe",
        "Kaltungo",
        "Kwami",
        "Nafada",
        "Shongom",
        "Yamaltu/Deba"
      ]
    },
    {
      "state": "Jigawa",
      "alias": "jigawa",
      "lgas": [
        "Auyo",
        "Babura",
        "Buji",
        "Biriniwa",
        "Birnin Kudu",
        "Dutse",
        "Gagarawa",
        "Garki",
        "Gumel",
        "Guri",
        "Gwaram",
        "Gwiwa",
        "Hadejia",
        "Jahun",
        "Kafin Hausa",
        "Kazaure",
        "Kiri Kasama",
        "Kiyawa",
        "Kaugama",
        "Maigatari",
        "Malam Madori",
        "Miga",
        "Sule Tankarkar",
        "Roni",
        "Ringim",
        "Yankwashi",
        "Taura"
      ]
    },
    {
      "state": "Oyo",
      "alias": "oyo",
      "lgas": [
        "Afijio",
        "Akinyele",
        "Atiba",
        "Atisbo",
        "Egbeda",
        "Ibadan North",
        "Ibadan North-East",
        "Ibadan North-West",
        "Ibadan South-East",
        "Ibarapa Central",
        "Ibadan South-West",
        "Ibarapa East",
        "Ido",
        "Ibarapa North",
        "Irepo",
        "Iseyin",
        "Itesiwaju",
        "Iwajowa",
        "Kajola",
        "Lagelu",
        "Ogbomosho North",
        "Ogbomosho South",
        "Ogo Oluwa",
        "Olorunsogo",
        "Oluyole",
        "Ona Ara",
        "Orelope",
        "Ori Ire",
        "Oyo",
        "Oyo East",
        "Saki East",
        "Saki West",
        "Surulere Oyo State"
      ]
    },
    {
      "state": "Imo",
      "alias": "imo",
      "lgas": [
        "Aboh Mbaise",
        "Ahiazu Mbaise",
        "Ehime Mbano",
        "Ezinihitte",
        "Ideato North",
        "Ideato South",
        "Ihitte/Uboma",
        "Ikeduru",
        "Isiala Mbano",
        "Mbaitoli",
        "Isu",
        "Ngor Okpala",
        "Njaba",
        "Nkwerre",
        "Nwangele",
        "Obowo",
        "Oguta",
        "Ohaji/Egbema",
        "Okigwe",
        "Orlu",
        "Orsu",
        "Oru East",
        "Oru West",
        "Owerri Municipal",
        "Owerri North",
        "Unuimo",
        "Owerri West"
      ]
    },
    {
      "state": "Kaduna",
      "alias": "kaduna",
      "lgas": [
        "Birnin Gwari",
        "Chikun",
        "Giwa",
        "Ikara",
        "Igabi",
        "Jaba",
        "Jema'a",
        "Kachia",
        "Kaduna North",
        "Kaduna South",
        "Kagarko",
        "Kajuru",
        "Kaura",
        "Kauru",
        "Kubau",
        "Kudan",
        "Lere",
        "Makarfi",
        "Sabon Gari",
        "Sanga",
        "Soba",
        "Zangon Kataf",
        "Zaria"
      ]
    },
    {
      "state": "Kebbi",
      "alias": "kebbi",
      "lgas": [
        "Aleiro",
        "Argungu",
        "Arewa Dandi",
        "Augie",
        "Bagudo",
        "Birnin Kebbi",
        "Bunza",
        "Dandi",
        "Fakai",
        "Gwandu",
        "Jega",
        "Kalgo",
        "Koko/Besse",
        "Maiyama",
        "Ngaski",
        "Shanga",
        "Suru",
        "Sakaba",
        "Wasagu/Danko",
        "Yauri",
        "Zuru"
      ]
    },
    {
      "state": "Kano",
      "alias": "kano",
      "lgas": [
        "Ajingi",
        "Albasu",
        "Bagwai",
        "Bebeji",
        "Bichi",
        "Bunkure",
        "Dala",
        "Dambatta",
        "Dawakin Kudu",
        "Dawakin Tofa",
        "Doguwa",
        "Fagge",
        "Gabasawa",
        "Garko",
        "Garun Mallam",
        "Gezawa",
        "Gaya",
        "Gwale",
        "Gwarzo",
        "Kabo",
        "Kano Municipal",
        "Karaye",
        "Kibiya",
        "Kiru",
        "Kumbotso",
        "Kunchi",
        "Kura",
        "Madobi",
        "Makoda",
        "Minjibir",
        "Nasarawa",
        "Rano",
        "Rimin Gado",
        "Rogo",
        "Shanono",
        "Takai",
        "Sumaila",
        "Tarauni",
        "Tofa",
        "Tsanyawa",
        "Tudun Wada",
        "Ungogo",
        "Warawa",
        "Wudil"
      ]
    },
    {
      "state": "Kogi",
      "alias": "kogi",
      "lgas": [
        "Ajaokuta",
        "Adavi",
        "Ankpa",
        "Bassa",
        "Dekina",
        "Ibaji",
        "Idah",
        "Igalamela Odolu",
        "Ijumu",
        "Kogi",
        "Kabba/Bunu",
        "Lokoja",
        "Ofu",
        "Mopa Muro",
        "Ogori/Magongo",
        "Okehi",
        "Okene",
        "Olamaboro",
        "Omala",
        "Yagba East",
        "Yagba West"
      ]
    },
    {
      "state": "Osun",
      "alias": "osun",
      "lgas": [
        "Aiyedire",
        "Atakunmosa West",
        "Atakunmosa East",
        "Aiyedaade",
        "Boluwaduro",
        "Boripe",
        "Ife East",
        "Ede South",
        "Ife North",
        "Ede North",
        "Ife South",
        "Ejigbo",
        "Ife Central",
        "Ifedayo",
        "Egbedore",
        "Ila",
        "Ifelodun",
        "Ilesa East",
        "Ilesa West",
        "Irepodun",
        "Irewole",
        "Isokan",
        "Iwo",
        "Obokun",
        "Odo Otin",
        "Ola Oluwa",
        "Olorunda",
        "Oriade",
        "Orolu",
        "Osogbo"
      ]
    },
    {
      "state": "Sokoto",
      "alias": "sokoto",
      "lgas": [
        "Gudu",
        "Gwadabawa",
        "Illela",
        "Isa",
        "Kebbe",
        "Kware",
        "Rabah",
        "Sabon Birni",
        "Shagari",
        "Silame",
        "Sokoto North",
        "Sokoto South",
        "Tambuwal",
        "Tangaza",
        "Tureta",
        "Wamako",
        "Wurno",
        "Yabo",
        "Binji",
        "Bodinga",
        "Dange Shuni",
        "Goronyo",
        "Gada"
      ]
    },
    {
      "state": "Plateau",
      "alias": "plateau",
      "lgas": [
        "Bokkos",
        "Barkin Ladi",
        "Bassa",
        "Jos East",
        "Jos North",
        "Jos South",
        "Kanam",
        "Kanke",
        "Langtang South",
        "Langtang North",
        "Mangu",
        "Mikang",
        "Pankshin",
        "Qua'an Pan",
        "Riyom",
        "Shendam",
        "Wase"
      ]
    },
    {
      "state": "Taraba",
      "alias": "taraba",
      "lgas": [
        "Ardo Kola",
        "Bali",
        "Donga",
        "Gashaka",
        "Gassol",
        "Ibi",
        "Jalingo",
        "Karim Lamido",
        "Kumi",
        "Lau",
        "Sardauna",
        "Takum",
        "Ussa",
        "Wukari",
        "Yorro",
        "Zing"
      ]
    },
    {
      "state": "Yobe",
      "alias": "yobe",
      "lgas": [
        "Bade",
        "Bursari",
        "Damaturu",
        "Fika",
        "Fune",
        "Geidam",
        "Gujba",
        "Gulani",
        "Jakusko",
        "Karasuwa",
        "Machina",
        "Nangere",
        "Nguru",
        "Potiskum",
        "Tarmuwa",
        "Yunusari",
        "Yusufari"
      ]
    },
    {
      "state": "Zamfara",
      "alias": "zamfara",
      "lgas": [
        "Anka",
        "Birnin Magaji/Kiyaw",
        "Bakura",
        "Bukkuyum",
        "Bungudu",
        "Gummi",
        "Gusau",
        "Kaura Namoda",
        "Maradun",
        "Shinkafi",
        "Maru",
        "Talata Mafara",
        "Tsafe",
        "Zurmi"
      ]
    },
    {
      "state": "Lagos",
      "alias": "lagos",
      "lgas": [
        "Agege",
        "Ajeromi-Ifelodun",
        "Alimosho",
        "Amuwo-Odofin",
        "Badagry",
        "Apapa",
        "Epe",
        "Eti Osa",
        "Ibeju-Lekki",
        "Ifako-Ijaiye",
        "Ikeja",
        "Ikorodu",
        "Kosofe",
        "Lagos Island",
        "Mushin",
        "Lagos Mainland",
        "Ojo",
        "Oshodi-Isolo",
        "Shomolu",
        "Surulere Lagos State"
      ]
    },
    {
      "state": "Katsina",
      "alias": "katsina",
      "lgas": [
        "Bakori",
        "Batagarawa",
        "Batsari",
        "Baure",
        "Bindawa",
        "Charanchi",
        "Danja",
        "Dandume",
        "Dan Musa",
        "Daura",
        "Dutsi",
        "Dutsin Ma",
        "Faskari",
        "Funtua",
        "Ingawa",
        "Jibia",
        "Kafur",
        "Kaita",
        "Kankara",
        "Kankia",
        "Katsina",
        "Kurfi",
        "Kusada",
        "Mai'Adua",
        "Malumfashi",
        "Mani",
        "Mashi",
        "Matazu",
        "Musawa",
        "Rimi",
        "Sabuwa",
        "Safana",
        "Sandamu",
        "Zango"
      ]
    },
    {
      "state": "Kwara",
      "alias": "kwara",
      "lgas": [
        "Asa",
        "Baruten",
        "Edu",
        "Ilorin East",
        "Ifelodun",
        "Ilorin South",
        "Ekiti Kwara State",
        "Ilorin West",
        "Irepodun",
        "Isin",
        "Kaiama",
        "Moro",
        "Offa",
        "Oke Ero",
        "Oyun",
        "Pategi"
      ]
    },
    {
      "state": "Nasarawa",
      "alias": "nasarawa",
      "lgas": [
        "Akwanga",
        "Awe",
        "Doma",
        "Karu",
        "Keana",
        "Keffi",
        "Lafia",
        "Kokona",
        "Nasarawa Egon",
        "Nasarawa",
        "Obi",
        "Toto",
        "Wamba"
      ]
    },
    {
      "state": "Niger",
      "alias": "niger",
      "lgas": [
        "Agaie",
        "Agwara",
        "Bida",
        "Borgu",
        "Bosso",
        "Chanchaga",
        "Edati",
        "Gbako",
        "Gurara",
        "Katcha",
        "Kontagora",
        "Lapai",
        "Lavun",
        "Mariga",
        "Magama",
        "Mokwa",
        "Mashegu",
        "Moya",
        "Paikoro",
        "Rafi",
        "Rijau",
        "Shiroro",
        "Suleja",
        "Tafa",
        "Wushishi"
      ]
    },
    {
      "state": "Abia",
      "alias": "abia",
      "lgas": [
        "Aba North",
        "Arochukwu",
        "Aba South",
        "Bende",
        "Isiala Ngwa North",
        "Ikwuano",
        "Isiala Ngwa South",
        "Isuikwuato",
        "Obi Ngwa",
        "Ohafia",
        "Osisioma",
        "Ugwunagbo",
        "Ukwa East",
        "Ukwa West",
        "Umuahia North",
        "Umuahia South",
        "Umu Nneochi"
      ]
    }
  ]
}

getUserDetails(data:any) {
  return this.httpClient.get(this.apiUrl+'customer/'+data+'/get_user_details');
}

getCompanyDetails(data:any, id:any) {
  return this.httpClient.get(this.apiUrl+'customer/'+data+'/'+id+'/get_company_details');
}

getCompany(data:any) {
  return this.httpClient.get(this.apiUrl+'customer/'+data+'/get_company');
}

getOrderList(data:any) {
  return this.httpClient.get(this.apiUrl+'customer/'+data+'/get_order_list');
}

getOrderListNum(data:any, num: any) {
  return this.httpClient.get(this.apiUrl+'customer/'+data+'/'+num+'/get_order_list_num');
}

getOrderListByType(data:any, type: any) {
  return this.httpClient.get(this.apiUrl+'customer/'+data+'/'+type+'/get_order_list_by_type');
}

getOrderListById(data:any, id:any) {
  return this.httpClient.get(this.apiUrl+'order/'+data+'/'+id+'/get_order_list_by_id');
}

getOrderVendorById(data:any, id:any) {
  return this.httpClient.get(this.apiUrl+'order/'+data+'/'+id+'/get_order_vendor_by_id');
}

getOrderDriverAndRouteById(data:any, id:any) {
  return this.httpClient.get(this.apiUrl+'order/'+data+'/'+id+'/get_order_driver_by_id');
}

getPendingOrderList(data:any) {
  return this.httpClient.get(this.apiUrl+'customer/'+data+'/get_pending_list');
}

getPendingCartOrderList(data:any) {
  return this.httpClient.get(this.apiUrl+'customer/'+data+'/get_pending_cart_list');
}

SubmitOrderList(token:any, vendor_id: any) {
  return this.httpClient.get(this.apiUrl+'customer/'+token+'/'+vendor_id+'/submit_order');
}

getCompanyList(data:any) {
  return this.httpClient.get(this.apiUrl+'customer/'+data+'/get_company_list');
}

vendorsList() {
  return this.httpClient.get(this.apiUrl+'customer/get_vendor_list');
}

vendorsDetails(vendorId: any) {
  return this.httpClient.get(this.apiUrl+'customer/'+vendorId+'/vendor_details');
}

getOrderDetails(data:any, id:any) {
  return this.httpClient.get(this.apiUrl+'customer/'+data+'/'+id+'/get_order_details');
}

deleteOrder(data:any, id:any) {
  return this.httpClient.get(this.apiUrl+'customer/'+data+'/'+id+'/delete_order');
}

getOrderCount(data:any) {
  return this.httpClient.get(this.apiUrl+'customer/'+data+'/get_order_count');
}

updateProfileDetails(data:any) {
  return this.httpClient.post(this.apiUrl+'customer/update_customer_account', data);
}

updatePassword(data:any) {
  return this.httpClient.post(this.apiUrl+'auth/update_password', data);
}

addOrder(data:any) {
  return this.httpClient.post(this.apiUrl+'customer/add_order', data);
}

updateTruckingOrder(data:any) {
  return this.httpClient.post(this.apiUrl+'customer/update_trucking_order', data);
}

transactionList(data:any) {
  return this.httpClient.get(this.apiUrl+'customer/'+data+'/transactions');
}

updateWarehousingOrder(data:any) {
  return this.httpClient.post(this.apiUrl+'customer/update_warehouse_order', data);
}

checkIfOrderHasNCC(data:any) {
  return this.httpClient.get(this.apiUrl+'customer/'+data+'/check_order_company_type');
}

logOut() {
  localStorage.removeItem("customer_login_token")
}

format_date(data:any){
return formatDate(data, 'MMMM dd, YYYY', 'en-US')
}

spinner(data: any){
return  `<ngx-spinner
bdColor="rgba(51,51,51,0.8)"
size="medium"
color="#fff"
type="ball-scale-multiple"
>
<p style="font-size: 20px; color: white">xLogistics...</p>
</ngx-spinner>
`
}

convertDataUrlToBlob(dataUrl: any): Blob {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], {type: mime});
}

numberFormatToNaira(x: any){
x = parseFloat(x);
  let y = new Intl.NumberFormat('en-us', {minimumFractionDigits: 2}).format(x)
  return "₦"+y;
}

checkPendingPayment(data: any){
  return this.httpClient.get(this.apiUrl+'customer/'+data+'/get_pending_order_payment');
}

}
