import { IMAGES } from "../assets";

export const dummyChartData = {
  "month": "2026-03",
  "start_date": "2026-03-01",
  "end_date": "2026-03-31",
  "weeks": [
    {
      "week_index": 1,
      "label": "Week 1",
      "range": "1–7",
      "total": 420,
      "days": [
        { "day": 1, "date": "2026-03-01", "amount": 20 },
        { "day": 2, "date": "2026-03-02", "amount": 35 },
        { "day": 3, "date": "2026-03-03", "amount": 50 },
        { "day": 4, "date": "2026-03-04", "amount": 60 },
        { "day": 5, "date": "2026-03-05", "amount": 80 },
        { "day": 6, "date": "2026-03-06", "amount": 90 },
        { "day": 7, "date": "2026-03-07", "amount": 85 }
      ]
    },
    {
      "week_index": 2,
      "label": "Week 2",
      "range": "8–14",
      "total": 760,
      "days": [
        { "day": 8, "date": "2026-03-08", "amount": 70 },
        { "day": 9, "date": "2026-03-09", "amount": 85 },
        { "day": 10, "date": "2026-03-10", "amount": 95 },
        { "day": 11, "date": "2026-03-11", "amount": 110 },
        { "day": 12, "date": "2026-03-12", "amount": 120 },
        { "day": 13, "date": "2026-03-13", "amount": 140 },
        { "day": 14, "date": "2026-03-14", "amount": 140 }
      ]
    },
    {
      "week_index": 3,
      "label": "Week 3",
      "range": "15–21",
      "total": 980,
      "days": [
        { "day": 15, "date": "2026-03-15", "amount": 120 },
        { "day": 16, "date": "2026-03-16", "amount": 135 },
        { "day": 17, "date": "2026-03-17", "amount": 150 },
        { "day": 18, "date": "2026-03-18", "amount": 160 },
        { "day": 19, "date": "2026-03-19", "amount": 170 },
        { "day": 20, "date": "2026-03-20", "amount": 130 },
        { "day": 21, "date": "2026-03-21", "amount": 115 }
      ]
    },
    {
      "week_index": 4,
      "label": "Week 4",
      "range": "22–28",
      "total": 720,
      "days": [
        { "day": 22, "date": "2026-03-22", "amount": 110 },
        { "day": 23, "date": "2026-03-23", "amount": 105 },
        { "day": 24, "date": "2026-03-24", "amount": 95 },
        { "day": 25, "date": "2026-03-25", "amount": 90 },
        { "day": 26, "date": "2026-03-26", "amount": 85 },
        { "day": 27, "date": "2026-03-27", "amount": 120 },
        { "day": 28, "date": "2026-03-28", "amount": 115 }
      ]
    },
    {
      "week_index": 5,
      "label": "Week 5",
      "range": "29–31",
      "total": 260,
      "days": [
        { "day": 29, "date": "2026-03-29", "amount": 70 },
        { "day": 30, "date": "2026-03-30", "amount": 90 },
        { "day": 31, "date": "2026-03-31", "amount": 100 }
      ]
    }
  ]
};

export const categoryList = [
  {
    id: "1",
    category_name: "DIY",
    category_logo: IMAGES.hammerImg,
  },
  {
    id: "2",
    category_name: "Housekeeping",
    category_logo: IMAGES.housekeeping,
  },
  {
    id: "3",
    category_name: "Childcare",
    category_logo: IMAGES.childCareImg,
  },
  {
    id: "4",
    category_name: "Pet",
    category_logo: IMAGES.petImg,
  },
  {
    id: "5",
    category_name: "Gardening",
    category_logo: IMAGES.gardeningImg,
  },
  {
    id: "6",
    category_name: "Tech Support",
    category_logo: IMAGES.tech_support,
  },
];

export const filteredSubCategories = [
  {
    id: "1",
    subcategory_name: "Furniture Assembly",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
  },
  {
    id: "2",
    subcategory_name: "Interior Painting",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828",
  },
  {
    id: "3",
    subcategory_name: "Installation of Lamps",
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
  },
  {
    id: "4",
    subcategory_name: "Other Installation",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
  },
  {
    id: "5",
    subcategory_name: "Small Repair",
    image: "https://images.unsplash.com/photo-1581147036324-c1c4e0e9f5f9",
  },
  {
    id: "6",
    subcategory_name: "Curtain Installation",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013",
  },
  {
    id: "7",
    subcategory_name: "Plumbing Services",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7",
  },
  {
    id: "8",
    subcategory_name: "Kitchen Furniture Install",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    id: "9",
    subcategory_name: "Repair Water Leak",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
  },
  {
    id: "10",
    subcategory_name: "Electrical Work",
    image: "https://images.unsplash.com/photo-1581091215367-59ab6b2b1a4b",
  },
  {
    id: "11",
    subcategory_name: "Fixing Elements On Wall",
    image: "https://images.unsplash.com/photo-1523419409543-a5b6f1c8b6d4",
  },
  {
    id: "12",
    subcategory_name: "Other Wall Renovation",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
  },
  {
    id: "13",
    subcategory_name: "Plastering A Wall",
    image: "https://images.unsplash.com/photo-1597093795039-3cbe3f3b50f3",
  },
  {
    id: "14",
    subcategory_name: "Other Furnishing Service",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
  },
  {
    id: "15",
    subcategory_name: "Bed Assembly",
    image: "https://images.unsplash.com/photo-1582582494700-4aefcb3a6a03",
  },
];

export const jobPhotos = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1599423300746-b62533397364',
  },
];


export const requestData = {
  selectedFilter: "All",
  isMoreLoading: false,
  allRequests: [
    {
      id: 1,
      title: "Office Cleaning",
      subTitle: "Washroom Cleaning",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      status: "requested",

      budgetMin: 200,
      budgetMax: 500,

      jobDate: "2026-12-14",
      jobTime: "18:00",

      address: {
        banglo: "Plot 1234",
        city: "Gaborone West Industrial",
        state: "Gaborone",
        country: "Botswana",
      },
    },

    {
      id: 2,
      title: "Office Cleaning",
      subTitle: "Washroom Cleaning",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      status: "requested",

      budgetMin: 200,
      budgetMax: 500,

      jobDate: "2026-12-14",
      jobTime: "18:00",

      address: {
        banglo: "Plot 5438",
        city: "Broadhurst Industrial",
        state: "Gaborone",
        country: "Botswana",
      },
    },

    {
      id: 3,
      title: "Plumbing Service",
      subTitle: "Leak Fixing",
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4",
      status: "offered",

      budgetMin: 300,
      budgetMax: 800,

      jobDate: "2026-12-18",
      jobTime: "10:30",

      address: {
        banglo: "Plot 9987",
        city: "Central Business District",
        state: "Gaborone",
        country: "Botswana",
      },
    },

    {
      id: 4,
      title: "Electrical Work",
      subTitle: "Wiring Installation",
      image: "https://images.unsplash.com/photo-1581093458791-9f3c3900dfb4",
      status: "accepted",

      budgetMin: 500,
      budgetMax: 1200,

      jobDate: "2026-12-20",
      jobTime: "14:00",

      address: {
        banglo: "Plot 2222",
        city: "Extension 2",
        state: "Gaborone",
        country: "Botswana",
      },
    },

    {
      id: 5,
      title: "Painting Service",
      subTitle: "Interior Painting",
      image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828",
      status: "Expired",

      budgetMin: 400,
      budgetMax: 900,

      jobDate: "2026-11-10",
      jobTime: "09:00",

      address: {
        banglo: "Plot 1111",
        city: "Phakalane",
        state: "Gaborone",
        country: "Botswana",
      },
    },
  ],
  completedRequests: [
    {
      id: "1",
      title: "DIY Service",
      subTitle: "Furniture assembly",
      image: "https://picsum.photos/200/200",

      status: "completed",

      budgetMin: 200,
      budgetMax: 500,
      jobDate: "14 Dec",
      jobTime: "18:00 PM",

      address: {
        banglo: "Plot 2222",
        city: "Extension 2",
        state: "Gaborone",
        country: "Botswana",
      },

      isDisputed: false, // 👈 IMPORTANT
    },
    {
      id: "2",
      title: "DIY Service",
      subTitle: "Furniture assembly",
      image: "https://picsum.photos/201/200",

      status: "completed",

      budgetMin: 200,
      budgetMax: 500,
      jobDate: "14 Dec",
      jobTime: "18:00 PM",

      address: {
        banglo: "Plot 2222",
        city: "Extension 2",
        state: "Gaborone",
        country: "Botswana",
      },

      isDisputed: false,
    },
    {
      id: "3",
      title: "DIY Service",
      subTitle: "Furniture assembly",
      image: "https://picsum.photos/200/200",

      status: "completed",

      budgetMin: 200,
      budgetMax: 500,
      jobDate: "14 Dec",
      jobTime: "18:00 PM",

      address: {
        banglo: "Plot 2222",
        city: "Extension 2",
        state: "Gaborone",
        country: "Botswana",
      },

      isDisputed: true, // 👈 KEY CHANGE
      disputeStatus: "Pending", // optional
    },
    {
      id: "4",
      title: "DIY Service",
      subTitle: "Furniture assembly",
      image: "https://picsum.photos/201/200",

      status: "completed",

      budgetMin: 200,
      budgetMax: 500,
      jobDate: "14 Dec",
      jobTime: "18:00 PM",

      address: {
        banglo: "Plot 2222",
        city: "Extension 2",
        state: "Gaborone",
        country: "Botswana",
      },

      isDisputed: true,
      disputeStatus: "Resolved",
    },
  ],
  cancelRequest: [
    {
      id: "1",
      title: "DIY Service",
      subTitle: "Furniture assembly",
      image: "https://picsum.photos/200/200",

      status: "cancelled",

      budgetMin: 200,
      budgetMax: 500,
      jobDate: "14 Dec",
      jobTime: "18:00 PM",

      address: {
        banglo: "Plot 2222",
        city: "Extension 2",
        state: "Gaborone",
        country: "Botswana",
      },

      isDisputed: false,
    },
    {
      id: "2",
      title: "DIY Service",
      subTitle: "Furniture assembly",
      image: "https://picsum.photos/200/200",

      status: "cancelled",

      budgetMin: 200,
      budgetMax: 500,
      jobDate: "14 Dec",
      jobTime: "18:00 PM",

      address: {
        banglo: "Plot 2222",
        city: "Extension 2",
        state: "Gaborone",
        country: "Botswana",
      },

      isDisputed: false,
    },
  ]
};

export const serviceDetails = {
  security_code: "4821",

  lifecycle: [
    {
      id: 0,
      name: "Service Requested",
      time: "2026-03-18T10:00:00Z",
      completed: true,
      serviceRunning: false,
      isRejected: false,
    },
    {
      id: 1,
      name: "Expert Accepted",
      time: "2026-03-18T10:30:00Z",
      completed: true,
      serviceRunning: false,
      isRejected: false,
    },
    {
      id: 2,
      name: "Service Started",
      time: "2026-03-18T11:00:00Z",
      completed: true,
      serviceRunning: false,
      isRejected: false,
    },
    {
      id: 3,
      name: "Started service", // 👈 important (used in getImage)
      time: "2026-03-18T11:15:00Z",
      completed: false,
      serviceRunning: true, // 👈 running state
      isRejected: false,
    },
    {
      id: 4,
      name: "Payment received",
      time: "2026-03-18T12:00:00Z",
      completed: false,
      serviceRunning: false,
      isRejected: false,
    },
    {
      id: 5,
      name: "Service Completed",
      time: "2026-03-18T13:00:00Z",
      completed: false,
      serviceRunning: false,
      isRejected: false,
    },
  ],
};


export const chatListData = [
  {
    id: 1,
    name: "Emily Johnson",
    message: "I really appreciated your feedback on the project;",
    profile: "https://randomuser.me/api/portraits/women/1.jpg",
    readCount: 5,
    time: "9:41 AM",
  },
  {
    id: 2,
    name: "David Brown",
    message: "Do you think we could explore more options for the design?",
    profile: "https://randomuser.me/api/portraits/men/2.jpg",
    readCount: 0,
    time: "9:30 AM",
  },
  {
    id: 3,
    name: "Sarah Davis",
    message: "I loved the presentation! The visuals really brought the idea to life.",
    profile: "https://randomuser.me/api/portraits/women/3.jpg",
    readCount: 10,
    time: "Yesterday",
  },
  {
    id: 4,
    name: "Chris Wilson",
    message: "Can we schedule a follow-up meeting? I'd like to discuss more.",
    profile: "https://randomuser.me/api/portraits/men/4.jpg",
    readCount: 0,
    time: "Yesterday",
  },
  {
    id: 5,
    name: "Jessica Miller",
    message: "I have a few ideas that could enhance our current solution.",
    profile: "https://randomuser.me/api/portraits/women/5.jpg",
    readCount: 4,
    time: "Mon",
  },
  {
    id: 6,
    name: "Daniel Taylor",
    message: "Thank you for the update! It’s great to see the project progress.",
    profile: "https://randomuser.me/api/portraits/men/6.jpg",
    readCount: 6,
    time: "Mon",
  },
  {
    id: 7,
    name: "Laura Anderson",
    message: "Would you be available for a quick chat? I have some questions.",
    profile: "https://randomuser.me/api/portraits/women/7.jpg",
    readCount: 0,
    time: "Sun",
  },
  {
    id: 8,
    name: "James Martinez",
    message: "Your insights were invaluable, I can’t wait to implement them.",
    profile: "https://randomuser.me/api/portraits/men/8.jpg",
    readCount: 0,
    time: "Sun",
  },
];

export const dummyMessages = [
  {
    id: "1",
    senderId: "user_1", // 👈 current user
    receiverId: "user_2",
    text: "Hey! How are you?",
    type: "TEXT",
    createdAt: new Date(),
  },
  {
    id: "2",
    senderId: "user_2", // 👈 peer user
    receiverId: "user_1",
    text: "I'm good! What about you?",
    type: "TEXT",
    createdAt: new Date(),
  },
  {
    id: "3",
    senderId: "user_1",
    receiverId: "user_2",
    text: "Doing great! Just working on the project.",
    type: "TEXT",
    createdAt: new Date(),
  },

  // ✅ SINGLE IMAGE
  {
    id: "4",
    senderId: "user_2",
    receiverId: "user_1",
    text: "",
    type: "IMAGE",
    images: [
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    ],
    createdAt: new Date(),
  },

  // ✅ TWO IMAGES
  {
    id: "5",
    senderId: "user_1",
    receiverId: "user_2",
    text: "",
    type: "IMAGE",
    images: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    ],
    createdAt: new Date(),
  },

  // ✅ THREE IMAGES
  {
    id: "6",
    senderId: "user_2",
    receiverId: "user_1",
    text: "",
    type: "IMAGE",
    images: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    ],
    createdAt: new Date(),
  },

  // ✅ FOUR IMAGES
  {
    id: "7",
    senderId: "user_1",
    receiverId: "user_2",
    text: "",
    type: "IMAGE",
    images: [
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce",
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7",
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c",
    ],
    createdAt: new Date(),
  },

  // ✅ LAST TEXT
  {
    id: "8",
    senderId: "user_2",
    receiverId: "user_1",
    text: "Looks awesome! 👍",
    type: "TEXT",
    createdAt: new Date(),
  },
];

export const dummyNotifications = [
  // ✅ 1. SERVICE STARTED (Security Code UI)
  {
    title: "Service Started",
    body: "",
    sent_at: new Date().toISOString(),
    data: {
      event: "SERVICE_STARTED",
      SECURITY_CODE: "123",
      service_id: 101,
      sender_name: "David Brown",
      sender_profile_photo_url: "",
    },
  },

  // ✅ 2. RENEGOTIATION REQUEST
  {
    title: "New Budget Request",
    body: "Provider has requested a new budget of P350",
    sent_at: new Date().toISOString(),
    data: {
      event: "RENEGOTIATION_REQUEST",
      service_id: 102,
      renegotiation_id: 5001,
      difference_amount: "350",
      action_required: true,
      sender_name: "Emily Johnson",
      sender_profile_photo_url: "",
    },
  },

  // ✅ 3. PROVIDER REACHED
  {
    title: "Provider Reached",
    body: "Your service provider has arrived at your location",
    sent_at: new Date().toISOString(),
    data: {
      event: "PROVIDER_REACHED",
      service_id: 103,
      service_code: "12*45*",
      sender_name: "Chris Wilson",
      sender_profile_photo_url: "",
    },
  },

  // ✅ 4. SERVICE REQUEST MADE (Task Details Button)
  {
    title: "Service Request Created",
    body: "Your request has been successfully created",
    sent_at: new Date().toISOString(),
    data: {
      event: "SERVICE_REQUEST_MADE",
      service_id: 104,
      sender_name: "System",
      sender_profile_photo_url: "",
    },
  },

  // ✅ 5. QUOTE SENT
  {
    title: "Quote Received",
    body: "You received a quote from provider",
    sent_at: new Date().toISOString(),
    data: {
      event: "SERVICE_QUOTE_SENT",
      service_id: 105,
      sender_name: "Sarah Davis",
      sender_profile_photo_url:
        "https://randomuser.me/api/portraits/women/3.jpg",
    },
  },

  // ✅ 6. PAYMENT DONE
  {
    title: "Payment Successful",
    body: "Your payment has been completed",
    sent_at: new Date().toISOString(),
    data: {
      event: "SEVICES PAYMENT DONE",
      service_id: 106,
      sender_name: "System",
      sender_profile_photo_url: "",
    },
  },

  // ✅ 7. SERVICE COMPLETED
  {
    title: "Service Completed",
    body: "Your service has been successfully completed",
    sent_at: new Date().toISOString(),
    data: {
      event: "SERVICE_COMPLETED",
      service_id: 107,
      sender_name: "Daniel Taylor",
      sender_profile_photo_url:
        "https://randomuser.me/api/portraits/men/6.jpg",
    },
  },

  // ✅ 8. PROVIDER SIDE EVENT (for service_provider userType)
  {
    title: "Quote Accepted",
    body: "Your quote has been accepted by the user",
    sent_at: new Date().toISOString(),
    data: {
      event: "QUOTE_ACCEPTED",
      service_id: 108,
      sender_name: "Jessica Miller",
      sender_profile_photo_url:
        "https://randomuser.me/api/portraits/women/5.jpg",
    },
  },

  // ✅ 9. MONEY TRANSFERRED
  {
    title: "Payment Released",
    body: "Your earnings have been transferred",
    sent_at: new Date().toISOString(),
    data: {
      event: "SERVICE_MONEY_TRANSFERRED",
      service_id: 109,
      sender_name: "System",
      sender_profile_photo_url: "",
    },
  },
];


export const dummyRatingsReviews = [
  {
    id: 1,
    user_name: "John Doe",
    user_profile_photo_url: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 3,
    review:
      "Bessie’s TV mounting service was outstanding! She was prompt, courteous, and her workmanship surpassed my expectations. I would highly recommend her for any home service needs.",
    days_ago: "2026-03-20T10:30:00Z",
    like_count: 12,
    dislike_count: 2,
  },
  {
    id: 2,
    user_name: "Jane Smith",
    user_profile_photo_url: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 3,
    review:
      "Bessie efficiently resolved a plumbing issue I had. Her expertise was clear, and I valued her transparent communication throughout. I will definitely be reaching out for future projects.",
    days_ago: "2026-03-20T10:30:00Z",
    like_count: 18,
    dislike_count: 1,
  },
  {
    id: 3,
    user_name: "Michael Johnson",
    user_profile_photo_url: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 3,
    review:
      "Bessie’s shelf and mirror installation was impeccable. Her work is both practical and beautiful. I’m thrilled with the final result and would hire her again without hesitation.",
    days_ago: "2026-03-20T10:30:00Z",
    like_count: 9,
    dislike_count: 0,
  },
];


// export const dummyNegotiationMessages = [
//   {
//     _id: "1",
//     id: "1",
//     type: "NEGOTIATION",
//     senderId: "provider_1",
//     createdAt: 1700000000000,

//     serviceId: "service_101",
//     quoteId: "quote_101",
//     serviceName: "Home Cleaning",
//     servicePhoto: "",

//     negotiation: {
//       status: "PENDING",
//       serviceName: "Home Cleaning",
//       currentAmount: "500",

//       offers: [
//         {
//           amount: "500",
//           label: "ORIGINAL_VALUATION",
//           userName: "System",
//           createdAt: 1699990000000,
//         },
//         {
//           amount: "300",
//           label: "PROVIDER_QUOTE",
//           userName: "Jordan Smith",
//           createdAt: 1699995000000,
//         },
//       ],
//     },
//   },

//   // 👉 USER COUNTER OFFER
//   {
//     _id: "2",
//     id: "2",
//     type: "NEGOTIATION",
//     senderId: "user_1",
//     createdAt: 1700001000000,

//     serviceId: "service_101",
//     quoteId: "quote_101",
//     serviceName: "Home Cleaning",

//     negotiation: {
//       status: "PENDING",
//       serviceName: "Home Cleaning",
//       currentAmount: "400",

//       offers: [
//         {
//           amount: "500",
//           label: "ORIGINAL_VALUATION",
//           userName: "System",
//         },
//         {
//           amount: "300",
//           label: "PROVIDER_QUOTE",
//           userName: "Jordan Smith",
//         },
//         {
//           amount: "400",
//           label: "COUNTER",
//           userName: "You",
//         },
//       ],
//     },
//   },

//   // 👉 PROVIDER COUNTER AGAIN
//   {
//     _id: "3",
//     id: "3",
//     type: "NEGOTIATION",
//     senderId: "provider_1",
//     createdAt: 1700002000000,

//     serviceId: "service_101",
//     quoteId: "quote_101",
//     serviceName: "Home Cleaning",

//     negotiation: {
//       status: "PENDING",
//       serviceName: "Home Cleaning",
//       currentAmount: "450",

//       offers: [
//         {
//           amount: "500",
//           label: "ORIGINAL_VALUATION",
//           userName: "System",
//         },
//         {
//           amount: "300",
//           label: "PROVIDER_QUOTE",
//           userName: "Jordan Smith",
//         },
//         {
//           amount: "400",
//           label: "COUNTER",
//           userName: "You",
//         },
//         {
//           amount: "450",
//           label: "COUNTER",
//           userName: "Jordan Smith",
//         },
//       ],
//     },
//   },

//   // 👉 FINAL ACCEPTED STATE
//   {
//     _id: "4",
//     id: "4",
//     type: "NEGOTIATION",
//     senderId: "user_1",
//     createdAt: 1700003000000,

//     serviceId: "service_101",
//     quoteId: "quote_101",
//     serviceName: "Home Cleaning",

//     negotiation: {
//       status: "ACCEPTED", // 🔥 IMPORTANT
//       serviceName: "Home Cleaning",
//       currentAmount: "450",

//       offers: [
//         {
//           amount: "500",
//           label: "ORIGINAL_VALUATION",
//           userName: "System",
//         },
//         {
//           amount: "300",
//           label: "PROVIDER_QUOTE",
//           userName: "Jordan Smith",
//         },
//         {
//           amount: "400",
//           label: "COUNTER",
//           userName: "You",
//         },
//         {
//           amount: "450",
//           label: "COUNTER",
//           userName: "Jordan Smith",
//         },
//       ],
//     },
//   },
// ];

export const NegotiationScreenData = {
  profile: {
    user: {
      id: "user_1",
      first_name: "You",
      role: "elderly_user",
      profile_photo_url: "https://i.pravatar.cc/150?img=3",
    },
  },

  peerUser: {
    user_id: "provider_1",
    name: "Jordan Smith",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
  },

  dummyNegotiationMessages: [
    {
      _id: "msg1",
      id: "msg1",
      type: "TEXT",
      senderId: "provider_1",
      text: "I’m looking forward to discussing the service details with you 😊",
      createdAt: 1700000000000,
    },

    {
      _id: "msg2",
      id: "msg2",
      type: "TEXT",
      senderId: "user_1",
      text: "Hi Jordan 👋 Let’s finalize the terms.",
      createdAt: 1700000500000,
    },

    {
      _id: "msg3",
      id: "msg3",
      type: "NEGOTIATION",
      senderId: "provider_1",
      createdAt: 1700001000000,
      serviceId: "service_101",
      quoteId: "quote_101",
      serviceName: "Home Cleaning",

      negotiation: {
        status: "PENDING",
        serviceName: "Home Cleaning",
        currentAmount: "450",

        offers: [
          {
            amount: "500",
            label: "ORIGINAL_VALUATION",
            userName: "System",
          },
          {
            amount: "300",
            label: "PROVIDER_QUOTE",
            userName: "Jordan Smith",
          },
          {
            amount: "400",
            label: "COUNTER",
            userName: "You",
          },
          {
            amount: "450",
            label: "COUNTER",
            userName: "Jordan Smith",
          },
        ],
      },
    },
  ],
};


export const subscriptionPlansData = [
  {
    id: "monthly",
    label: "Monthly",
    price: 200,
    currency: "₱",
    selected: true,
    isExpanded: true,
    billingText: "*Billed & recurring monthly cancel anytime",

    features: [
      "Apply to service requests",
      "Profile visibility in search",
      "Customer chat access",
      "Earnings dashboard",
    ],
  },

  {
    id: "quarterly",
    label: "Quarterly",
    price: 500,
    currency: "₱",
    selected: false,
    isExpanded: false,
    saveText: "Save ₱100",
    billingText: "*Billed & recurring Quarterly cancel anytime",
    features: [
      "Apply to service requests",
      "Profile visibility in search",
      "Customer chat access",
      "Earnings dashboard",
    ],
  },

  {
    id: "yearly",
    label: "Yearly",
    price: 2000,
    currency: "₱",
    selected: false,
    isExpanded: false,
    saveText: "Save ₱400",
    billingText: "*Billed & recurring Yearly cancel anytime",
    features: [
      "Apply to service requests",
      "Profile visibility in search",
      "Customer chat access",
      "Earnings dashboard",
    ],
  },
]

export const taskDetailsOngoingDummyData = {
  id: "task_001",

  task_status: [
    {
      id: 0,
      name: "Quote Sent",
      time: "2025-01-18T19:07:00Z",
      completed: true,
    },
    {
      id: 1,
      name: "Quote Accepted",
      time: "2025-01-18T19:07:00Z",
      completed: true,
    },
    {
      id: 2,
      name: "Out for Service",
      time: "2025-01-18T19:07:00Z",
      completed: false,
    },
    {
      id: 3,
      name: "Started Service",
      time: null, // expected → will show "-"
      completed: false,
    },
    {
      id: 4,
      name: "Service Completed",
      time: null,
      completed: false,
    },
    {
      id: 5,
      name: "Payment received",
      time: null,
      completed: false,
    },
  ],
};

export const taskDetailsDummyData = {
  id: "task_001",

  service: {
    title: "Office Cleaning",
    subtitle: "Washroom Cleaning",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
  },

  job_details: {
    budget: {
      min: 300,
      max: 500,
      currency: "P",
    },
    date: "2026-12-14",
    time: "18:00",

    formatted: {
      budget: "P300 to P500",
      date: "14 Dec",
      time: "18:00 Pm",
    },
  },

  client: {
    name: "Jhon Doe",
    profile_image:
      "https://randomuser.me/api/portraits/men/32.jpg",
    id: "client_001",
  },

  // ✅ UPDATED FOR StatusItem
  task_status: [
    {
      id: 0,
      name: "Quote Sent",
      time: "2025-01-20T15:15:00Z", // ISO format (important for moment)
      completed: true,
    },
    {
      id: 1,
      name: "Waiting for Quote Acceptance",
      time: null,
      completed: false,
    },
  ],

  description: `Transform your space with our expert furniture assembly services...`,

  job_photos: [{
    id: 1, type: "photo",
    url: IMAGES.furnitureAssemblyImg
  },
  {
    id: 1, type: "photo",
    url: IMAGES.furnitureAssemblyImg
  }
  ],
};

// COMPREHENSIVE USER DUMMY DATA
export const userData = {
  id: 1,
  email: "demo@example.com",
  password: "demo123",
  first_name: "John",
  last_name: "Doe",
  phone_number: "+1234567890",
  role: "customer_individual",
  profile: {
    full_name: "John Doe",
    profile_photo: {
      url: "https://picsum.photos/seed/johndoe/200/200.jpg"
    },
    address: "123 Main St, New York, NY 10001",
    bio: "Looking for reliable home services",
    rating: 4.8,
    total_reviews: 12,
    member_since: "2024-01-15",
    preferences: {
      language: "English",
      notifications: true,
      location_sharing: true
    }
  },
  stats: {
    total_requests: 8,
    completed_requests: 6,
    pending_requests: 2,
    total_spent: 1250.00,
    saved_professionals: 5
  }
};

// PROFILE PAGE DUMMY DATA
export const profileData = {
  // User profile information
  user: {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "demo@example.com",
    phone_number: "+1234567890",
    role: "customer_individual",
    profile_photo: "https://picsum.photos/seed/johndoe/200/200.jpg",
    address: "123 Main St, New York, NY 10001",
    bio: "Looking for reliable home services for my apartment. Prefer experienced professionals.",
    rating: 4.8,
    total_reviews: 12,
    member_since: "2024-01-15",
    verified: true,
    languages: ["English", "Spanish"],
    availability: "Flexible"
  },
  
  // User statistics
  statistics: {
    total_requests: 8,
    completed_requests: 6,
    pending_requests: 2,
    cancelled_requests: 0,
    total_spent: 1250.00,
    saved_professionals: 5,
    average_response_time: "2 hours"
  },
  
  // Recent activity
  recent_activity: [
    {
      id: 1,
      type: "request",
      title: "Kitchen Cleaning",
      date: "2024-01-15",
      status: "completed",
      professional: "Sarah Johnson",
      rating: 5,
      cost: 150.00
    },
    {
      id: 2,
      type: "request", 
      title: "Bathroom Plumbing",
      date: "2024-01-10",
      status: "completed",
      professional: "Mike Wilson",
      rating: 4,
      cost: 200.00
    },
    {
      id: 3,
      type: "request",
      title: "Living Room Painting",
      date: "2024-01-12",
      status: "in_progress",
      professional: "Tom Brown",
      rating: null,
      cost: 300.00
    }
  ],
  
  // Saved professionals
  saved_professionals: [
    {
      id: 1,
      name: "Sarah Johnson",
      profession: "Cleaner",
      rating: 4.9,
      reviews: 45,
      avatar: "https://picsum.photos/seed/sarah/48/48.jpg",
      response_time: "30 min",
      completed_jobs: 127
    },
    {
      id: 2,
      name: "Mike Wilson",
      profession: "Plumber",
      rating: 4.7,
      reviews: 32,
      avatar: "https://picsum.photos/seed/mike/48/48.jpg",
      response_time: "1 hour",
      completed_jobs: 89
    },
    {
      id: 3,
      name: "Tom Brown",
      profession: "Painter",
      rating: 4.8,
      reviews: 28,
      avatar: "https://picsum.photos/seed/tom/48/48.jpg",
      response_time: "45 min",
      completed_jobs: 56
    }
  ],
  
  // User preferences
  preferences: {
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    privacy: {
      profile_visibility: "public",
      phone_visibility: "professionals_only",
      location_sharing: true
    },
    services: {
      preferred_categories: ["Cleaning", "Plumbing", "Electrical"],
      budget_range: "$100-$500",
      preferred_time: "Weekends"
    }
  },
  
  // Payment methods
  payment_methods: [
    {
      id: 1,
      type: "credit_card",
      last_four: "1234",
      brand: "Visa",
      expiry: "12/25",
      is_default: true
    },
    {
      id: 2,
      type: "paypal",
      email: "demo@example.com",
      is_default: false
    }
  ],
  
  // Addresses
  addresses: [
    {
      id: 1,
      type: "home",
      address: "123 Main St, New York, NY 10001",
      coordinates: { lat: 40.7128, lng: -74.0060 },
      is_default: true
    },
    {
      id: 2,
      type: "work",
      address: "456 Business Ave, New York, NY 10002",
      coordinates: { lat: 40.7130, lng: -74.0065 },
      is_default: false
    }
  ]
};

// HOME PAGE USER DATA
export const homeUserData = {
  // User info for home page header
  user_info: {
    name: "John Doe",
    avatar: "https://picsum.photos/seed/johndoe/48/48.jpg",
    role: "customer_individual",
    member_since: "2024-01-15"
  },
  
  // Quick stats for home page
  quick_stats: {
    active_requests: 2,
    completed_this_month: 3,
    saved_professionals: 5,
    total_spent_this_month: 450.00
  },
  
  // Recent requests for home page
  recent_requests: [
    {
      id: 1,
      title: "Kitchen Cleaning",
      status: "in_progress",
      professional: "Sarah Johnson",
      date: "2024-01-15",
      estimated_completion: "2024-01-16"
    },
    {
      id: 2,
      title: "Bathroom Plumbing",
      status: "pending",
      professional: "Not assigned yet",
      date: "2024-01-14",
      estimated_completion: "2024-01-17"
    }
  ],
  
  // Recommended professionals
  recommended_professionals: [
    {
      id: 1,
      name: "Sarah Johnson",
      profession: "Cleaner",
      rating: 4.9,
      reviews: 45,
      avatar: "https://picsum.photos/seed/sarah/64/64.jpg",
      response_time: "30 min",
      hourly_rate: 25.00,
      match_score: 95
    },
    {
      id: 2,
      name: "Mike Wilson", 
      profession: "Plumber",
      rating: 4.7,
      reviews: 32,
      avatar: "https://picsum.photos/seed/mike/64/64.jpg",
      response_time: "1 hour",
      hourly_rate: 45.00,
      match_score: 88
    }
  ]
};

// TRANSACTION DUMMY DATA
export const transactionData = {
  // API response format - months with transactions
  months: [
    {
      year: 2024,
      month: 1,
      transactions: [
        {
          id: "txn_001",
          amount: "150.00",
          status: "completed",
          payment_method: "credit_card",
          description: "Kitchen Cleaning Service",
          date: "2024-01-15T10:30:00Z",
          professional: {
            name: "Sarah Johnson",
            avatar: "https://picsum.photos/seed/sarah/48/48.jpg"
          },
          service_category: "Cleaning"
        },
        {
          id: "txn_002", 
          amount: "200.00",
          status: "completed",
          payment_method: "paypal",
          description: "Bathroom Plumbing Repair",
          date: "2024-01-10T14:20:00Z",
          professional: {
            name: "Mike Wilson",
            avatar: "https://picsum.photos/seed/mike/48/48.jpg"
          },
          service_category: "Plumbing"
        },
        {
          id: "txn_003",
          amount: "300.00",
          status: "pending",
          payment_method: "credit_card",
          description: "Living Room Painting",
          date: "2024-01-12T09:15:00Z",
          professional: {
            name: "Tom Brown",
            avatar: "https://picsum.photos/seed/tom/48/48.jpg"
          },
          service_category: "Painting"
        }
      ]
    },
    {
      year: 2024,
      month: 2,
      transactions: [
        {
          id: "txn_004",
          amount: "75.00",
          status: "completed",
          payment_method: "credit_card",
          description: "Garden Maintenance",
          date: "2024-02-05T11:00:00Z",
          professional: {
            name: "Lisa Green",
            avatar: "https://picsum.photos/seed/lisa/48/48.jpg"
          },
          service_category: "Gardening"
        },
        {
          id: "txn_005",
          amount: "180.00",
          status: "completed",
          payment_method: "paypal",
          description: "Electrical Outlet Installation",
          date: "2024-02-08T16:45:00Z",
          professional: {
            name: "John Electric",
            avatar: "https://picsum.photos/seed/john/48/48.jpg"
          },
          service_category: "Electrical"
        }
      ]
    },
    {
      year: 2024,
      month: 3,
      transactions: [
        {
          id: "txn_006",
          amount: "120.00",
          status: "completed",
          payment_method: "credit_card",
          description: "Window Cleaning",
          date: "2024-03-03T08:30:00Z",
          professional: {
            name: "Maria Clean",
            avatar: "https://picsum.photos/seed/maria/48/48.jpg"
          },
          service_category: "Cleaning"
        },
        {
          id: "txn_007",
          amount: "250.00",
          status: "cancelled",
          payment_method: "credit_card",
          description: "Floor Installation",
          date: "2024-03-10T13:20:00Z",
          professional: {
            name: "Bob Builder",
            avatar: "https://picsum.photos/seed/bob/48/48.jpg"
          },
          service_category: "Carpentry"
        }
      ]
    }
  ],

  // Status options for filter
  statusOptions: [
    { label: "All", value: "" },
    { label: "Completed", value: "completed" },
    { label: "Pending", value: "pending" },
    { label: "Cancelled", value: "cancelled" }
  ],

  // Payment methods
  paymentMethods: [
    { label: "All", value: "" },
    { label: "Credit Card", value: "credit_card" },
    { label: "PayPal", value: "paypal" },
    { label: "Cash", value: "cash" }
  ],

  // Service categories
  serviceCategories: [
    { label: "All", value: "" },
    { label: "Cleaning", value: "Cleaning" },
    { label: "Plumbing", value: "Plumbing" },
    { label: "Electrical", value: "Electrical" },
    { label: "Painting", value: "Painting" },
    { label: "Gardening", value: "Gardening" },
    { label: "Carpentry", value: "Carpentry" }
  ]
};

// PROFESSIONAL HOME DUMMY DATA
// export const professionalHomeData = {
//   // API response structure for professional home
//   status: {
//     verified_providers_today: {
//       count: 15
//     }
//   },
  
//   // Recent tasks (instant requests and ongoing tasks)
//   recent_tasks: {
//     data: [
//       {
//         id: "task_001",
//         title: "Kitchen Cleaning",
//         description: "Need thorough kitchen cleaning including cabinets and floors",
//         status: "pending",
//         priority: "high",
//         budget: "150-200",
//         location: "123 Main St, New York, NY",
//         posted_date: "2024-01-15T10:30:00Z",
//         client: {
//           name: "John Doe",
//           avatar: "https://picsum.photos/seed/john/48/48.jpg",
//           rating: 4.5
//         },
//         service_category: "Cleaning",
//         estimated_duration: "2-3 hours",
//         distance: "2.5 km"
//       },
//       {
//         id: "task_002",
//         title: "Bathroom Plumbing Repair",
//         description: "Leaky faucet needs repair and pipe replacement",
//         status: "in_progress",
//         priority: "medium",
//         budget: "200-300",
//         location: "456 Oak Ave, Brooklyn, NY",
//         posted_date: "2024-01-14T14:20:00Z",
//         client: {
//           name: "Sarah Smith",
//           avatar: "https://picsum.photos/seed/sarah/48/48.jpg",
//           rating: 4.8
//         },
//         service_category: "Plumbing",
//         estimated_duration: "1-2 hours",
//         distance: "3.1 km"
//       },
//       {
//         id: "task_003",
//         title: "Living Room Painting",
//         description: "Paint living room walls and ceiling",
//         status: "completed",
//         priority: "low",
//         budget: "400-500",
//         location: "789 Pine St, Queens, NY",
//         posted_date: "2024-01-12T09:15:00Z",
//         client: {
//           name: "Mike Johnson",
//           avatar: "https://picsum.photos/seed/mike/48/48.jpg",
//           rating: 4.2
//         },
//         service_category: "Painting",
//         estimated_duration: "4-5 hours",
//         distance: "5.2 km"
//       }
//     ]
//   },
  
//   // Open services (quotes/explore quotes)
//   open_services: [
//     {
//       id: "service_001",
//       title: "Full House Cleaning",
//       description: "Complete house cleaning for 3-bedroom apartment",
//       client_name: "Emily Brown",
//       client_avatar: "https://picsum.photos/seed/emily/48/48.jpg",
//       budget_range: "$300-400",
//       location: "321 Elm St, Manhattan, NY",
//       posted_date: "2024-01-16T08:00:00Z",
//       service_category: "Cleaning",
//       urgency: "normal",
//       square_footage: "1200 sq ft",
//       rooms: "3 bedrooms, 2 bathrooms, living room, kitchen",
//       special_requirements: "Eco-friendly products preferred"
//     },
//     {
//       id: "service_002",
//       title: "Electrical Panel Upgrade",
//       description: "Upgrade electrical panel to 200 amp service",
//       client_name: "David Wilson",
//       client_avatar: "https://picsum.photos/seed/david/48/48.jpg",
//       budget_range: "$800-1200",
//       location: "654 Maple Dr, Bronx, NY",
//       posted_date: "2024-01-15T16:30:00Z",
//       service_category: "Electrical",
//       urgency: "high",
//       square_footage: "1800 sq ft",
//       special_requirements: "Licensed electrician required"
//     },
//     {
//       id: "service_003",
//       title: "Garden Landscaping",
//       description: "Backyard landscaping and garden design",
//       client_name: "Lisa Anderson",
//       client_avatar: "https://picsum.photos/seed/lisa/48/48.jpg",
//       budget_range: "$500-800",
//       location: "987 Cedar Ln, Staten Island, NY",
//       posted_date: "2024-01-14T11:45:00Z",
//       service_category: "Gardening",
//       urgency: "normal",
//       area_size: "500 sq ft",
//       special_requirements: "Drought-resistant plants preferred"
//     },
//     {
//       id: "service_004",
//       title: "Kitchen Cabinet Installation",
//       description: "Install new kitchen cabinets and countertops",
//       client_name: "Robert Taylor",
//       client_avatar: "https://picsum.photos/seed/robert/48/48.jpg",
//       budget_range: "$1500-2500",
//       location: "147 Birch Rd, Brooklyn, NY",
//       posted_date: "2024-01-13T13:20:00Z",
//       service_category: "Carpentry",
//       urgency: "medium",
//       special_requirements: "Custom measurements needed"
//     }
//   ],
  
//   // Professional stats
//   professional_stats: {
//     total_earnings: 12500.00,
//     completed_jobs: 45,
//     average_rating: 4.7,
//     response_rate: 98,
//     total_clients: 32
//   },
  
//   // Professional profile info
//   professional_info: {
//     name: "Tom Professional",
//     profession: "General Contractor",
//     avatar: "https://picsum.photos/seed/tompro/64/64.jpg",
//     rating: 4.7,
//     reviews: 45,
//     verified: true,
//     member_since: "2023-06-15",
//     response_time: "30 min",
//     completed_jobs: 45,
//     specialties: ["Cleaning", "Plumbing", "Electrical", "Painting"],
//     service_area: "New York City Metro Area",
//     languages: ["English", "Spanish"]
//   }
// };


export const professionalHomeData = {
  status: {
    verified_providers_today: {
      count: 15
    }
  },

  recent_tasks: {
    data: [
      {
        id: "task_001",
        title: "Kitchen Cleaning",
        description: "Need thorough kitchen cleaning including cabinets and floors",
        status: "pending",
        priority: "high",
        budget: "150-200",
        location: "123 Main St, New York, NY",
        posted_date: "2024-01-15T10:30:00Z",
        client: {
          name: "John Doe",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          rating: 4.5
        },
        service_category: "Cleaning",
        estimated_duration: "2-3 hours",
        service_image: "https://images.unsplash.com/photo-1627905646269-7f034dcc5738?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        distance: "2.5 km"
      },
      {
        id: "task_002",
        title: "Bathroom Plumbing Repair",
        description: "Leaky faucet needs repair and pipe replacement",
        status: "in_progress",
        priority: "medium",
        budget: "200-300",
        location: "456 Oak Ave, Brooklyn, NY",
        posted_date: "2024-01-14T14:20:00Z",
        client: {
          name: "Sarah Smith",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          rating: 4.8
        },
        service_category: "Plumbing",
        service_image: "https://images.unsplash.com/photo-1627905646269-7f034dcc5738?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        estimated_duration: "1-2 hours",
        distance: "3.1 km"
      },
      {
        id: "task_003",
        title: "Living Room Painting",
        description: "Paint living room walls and ceiling",
        status: "completed",
        priority: "low",
        budget: "400-500",
        location: "789 Pine St, Queens, NY",
        posted_date: "2024-01-12T09:15:00Z",
        client: {
          name: "Mike Johnson",
          avatar: "https://randomuser.me/api/portraits/men/45.jpg",
          rating: 4.2
        },
        service_category: "Painting",
        service_image: "https://images.unsplash.com/photo-1627905646269-7f034dcc5738?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        estimated_duration: "4-5 hours",
        distance: "5.2 km"
      }
    ]
  },

  open_services: [
    {
      id: "service_001",
      title: "Full House Cleaning",
      description: "Complete house cleaning for 3-bedroom apartment",
      client_name: "Emily Brown",
      client_avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      service_image: "https://images.unsplash.com/photo-1627905646269-7f034dcc5738?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      budget_range: "$300-400",
      location: "321 Elm St, Manhattan, NY",
      posted_date: "2024-01-16T08:00:00Z",
      service_category: "Cleaning",
      urgency: "normal"
    },
    {
      id: "service_002",
      title: "Electrical Panel Upgrade",
      description: "Upgrade electrical panel to 200 amp service",
      client_name: "David Wilson",
      client_avatar: "https://randomuser.me/api/portraits/men/66.jpg",
      service_image: "https://images.unsplash.com/photo-1627905646269-7f034dcc5738?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      budget_range: "$800-1200",
      location: "654 Maple Dr, Bronx, NY",
      posted_date: "2024-01-15T16:30:00Z",
      service_category: "Electrical",
      urgency: "high"
    },
    {
      id: "service_003",
      title: "Garden Landscaping",
      description: "Backyard landscaping and garden design",
      client_name: "Lisa Anderson",
      client_avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      service_image: "https://images.unsplash.com/photo-1627905646269-7f034dcc5738?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      budget_range: "$500-800",
      location: "987 Cedar Ln, Staten Island, NY",
      posted_date: "2024-01-14T11:45:00Z",
      service_category: "Gardening",
      urgency: "normal"
    },
    {
      id: "service_004",
      title: "Kitchen Cabinet Installation",
      description: "Install new kitchen cabinets and countertops",
      client_name: "Robert Taylor",
      client_avatar: "https://randomuser.me/api/portraits/men/70.jpg",
      service_image: "https://images.unsplash.com/photo-1627905646269-7f034dcc5738?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      budget_range: "$1500-2500",
      location: "147 Birch Rd, Brooklyn, NY",
      posted_date: "2024-01-13T13:20:00Z",
      service_category: "Carpentry",
      urgency: "medium"
    }
  ],

  professional_stats: {
    total_earnings: 12500.0,
    completed_jobs: 45,
    average_rating: 4.7,
    response_rate: 98,
    total_clients: 32
  },

  professional_info: {
    name: "Tom Professional",
    profession: "General Contractor",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 4.7,
    reviews: 45,
    verified: true,
    member_since: "2023-06-15",
    response_time: "30 min",
    completed_jobs: 45,
    specialties: ["Cleaning", "Plumbing", "Electrical", "Painting"],
    service_area: "New York City Metro Area",
    languages: ["English", "Spanish"]
  }
};

// PROFESSIONAL PROFILE DUMMY DATA
export const professionalProfileData = {
  // User information
  user: {
    id: 101,
    first_name: "Tom",
    last_name: "Professional",
    email: "tom.professional@example.com",
    phone_number: "+1234567890",
    profile_photo_url: "https://randomuser.me/api/portraits/men/75.jpg",
    role: "provider_individual",
    verified: true,
    member_since: "2023-06-15"
  },
  
  // Provider specific information
  provider_info: {
    bio: "Experienced general contractor with over 8 years in the industry. Specialized in residential and commercial projects including plumbing, electrical, painting, and general construction. Committed to delivering high-quality work and exceptional customer service.",
    experience_speciality: "Specialized in residential and commercial construction with expertise in:\n\n• Plumbing installations and repairs\n• Electrical wiring and panel upgrades\n• Interior and exterior painting\n• Kitchen and bathroom remodeling\n• General construction and maintenance\n• Emergency repairs and troubleshooting\n\nLicensed and insured contractor with excellent track record of completed projects and satisfied clients.",
    achievements: "• Licensed General Contractor (License #GC-2023-4567)\n• 2022 Excellence in Service Award\n• 150+ successful projects completed\n• 98% client satisfaction rate\n• Emergency response certification\n• Advanced safety training certification\n• Member of National Contractors Association",
    is_docs_verified: true,
    verification_status: "verified",
    service_categories: ["Plumbing", "Electrical", "Painting", "General Construction", "Emergency Repairs"],
    service_area: "New York City Metro Area",
    response_time: "30 minutes",
    completed_jobs: 156,
    years_experience: 8
  },
  
  // Customer ratings and reviews
  customer_ratings: {
    average_rating: 4.8,
    total_ratings: 127,
    criteria_averages: {
      overall: 4.8,
      reliability: 4.9,
      punctuality: 4.7,
      solution: 4.8,
      payout: 4.6
    },
    rating_distribution: {
      5: 89,
      4: 28,
      3: 7,
      2: 2,
      1: 1
    }
  },
  
  // Recent customer reviews
  recent_reviews: [
    {
      id: "review_001",
      customer_name: "Sarah Johnson",
      customer_avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      review_text: "Tom did an excellent job with our bathroom plumbing issue. He was professional, arrived on time, and fixed the problem quickly. The pricing was very reasonable too!",
      service_date: "2024-01-15",
      service_type: "Plumbing Repair"
    },
    {
      id: "review_002", 
      customer_name: "Mike Wilson",
      customer_avatar: "https://randomuser.me/api/portraits/men/66.jpg",
      rating: 4,
      review_text: "Good work on the electrical panel upgrade. Tom was knowledgeable and completed the job as promised. Minor delay in materials but overall satisfied with the service.",
      service_date: "2024-01-10",
      service_type: "Electrical Work"
    },
    {
      id: "review_003",
      customer_name: "Emily Brown",
      customer_avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 5,
      review_text: "Fantastic painting job! Tom transformed our living room and was very detail-oriented. Clean, professional, and great attention to detail. Highly recommend!",
      service_date: "2024-01-05",
      service_type: "Interior Painting"
    },
    {
      id: "review_004",
      customer_name: "David Chen",
      customer_avatar: "https://randomuser.me/api/portraits/men/70.jpg",
      rating: 5,
      review_text: "Emergency plumbing call at 2AM and Tom responded within 30 minutes. Fixed the burst pipe and prevented major water damage. True lifesaver!",
      service_date: "2023-12-28",
      service_type: "Emergency Plumbing"
    }
  ],
  
  // Past work photos
  past_work_files: [
    {
      id: "work_001",
      url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
      title: "Kitchen Remodeling",
      description: "Complete kitchen renovation with custom cabinets"
    },
    {
      id: "work_002", 
      url: "https://images.unsplash.com/photo-1556911220-bda9f7f7597e",
      title: "Bathroom Renovation",
      description: "Modern bathroom with custom fixtures"
    },
    {
      id: "work_003",
      url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      title: "Electrical Panel Upgrade",
      description: "200 amp service panel installation"
    },
    {
      id: "work_004",
      url: "https://images.unsplash.com/photo-1598902108854-10e335adac99",
      title: "Exterior Painting",
      description: "Complete house exterior painting project"
    },
    {
      id: "work_005",
      url: "https://images.unsplash.com/photo-1581092796779-f5c2e8e754c7",
      title: "Plumbing Installation",
      description: "New bathroom plumbing installation"
    }
  ],
  
  // Professional statistics
  unique_clients_count: 89,
  total_earnings: 125000.00,
  active_projects: 3,
  pending_quotes: 7,
  completion_rate: 98.5,
  repeat_clients: 23
};

// EARNINGS DUMMY DATA
export const earningsData = {
  // Wallet balance information
  wallet: {
    total_balance: "3000",
    available_balance: "3000",
    pending_balance: "0",
    currency: "PHP"
  },
  
  // Amount breakdown
  online_amount: "1500",
  cash_amount: "1500", 
  commission_deducted: "200",
  commission_due: "300",
  
  // Chart data with weeks and days structure for EarningsChart component
  activities: {
    weeks: [
      {
        week_number: 1,
        days: [
          { day: 1, amount: 120 },
          { day: 2, amount: 85 },
          { day: 3, amount: 200 },
          { day: 4, amount: 150 },
          { day: 5, amount: 95 },
          { day: 6, amount: 180 },
          { day: 7, amount: 220 }
        ]
      },
      {
        week_number: 2,
        days: [
          { day: 8, amount: 160 },
          { day: 9, amount: 110 },
          { day: 10, amount: 190 },
          { day: 11, amount: 140 },
          { day: 12, amount: 175 },
          { day: 13, amount: 125 },
          { day: 14, amount: 210 }
        ]
      },
      {
        week_number: 3,
        days: [
          { day: 15, amount: 95 },
          { day: 16, amount: 135 },
          { day: 17, amount: 185 },
          { day: 18, amount: 165 },
          { day: 19, amount: 200 },
          { day: 20, amount: 145 },
          { day: 21, amount: 195 }
        ]
      },
      {
        week_number: 4,
        days: [
          { day: 22, amount: 170 },
          { day: 23, amount: 155 },
          { day: 24, amount: 205 },
          { day: 25, amount: 130 },
          { day: 26, amount: 185 },
          { day: 27, amount: 160 },
          { day: 28, amount: 225 }
        ]
      }
    ],
    total_earnings: "5800",
    total_transactions: 28,
    month: "2024-01"
  },
  
  // Latest transactions for TransactionItem component
  latest_transactions: {
    items: [
      {
        id: "txn_001",
        user: {
          name: "Sarah Johnson",
          profile_photo_url: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        amount: "450.00",
        status: "SUCCESS",
        date: "2024-01-28T14:30:00Z",
        type: "payment",
        description: "Kitchen cleaning service"
      },
      {
        id: "txn_002",
        user: {
          name: "Mike Wilson",
          profile_photo_url: "https://randomuser.me/api/portraits/men/66.jpg"
        },
        amount: "320.50",
        status: "SUCCESS", 
        date: "2024-01-27T10:15:00Z",
        type: "payment",
        description: "Electrical panel upgrade"
      },
      {
        id: "txn_003",
        user: {
          name: "Emily Brown",
          profile_photo_url: "https://randomuser.me/api/portraits/women/65.jpg"
        },
        amount: "280.00",
        status: "PENDING",
        date: "2024-01-26T16:45:00Z", 
        type: "payment",
        description: "Bathroom plumbing repair"
      },
      {
        id: "txn_004",
        user: {
          name: "David Chen",
          profile_photo_url: "https://randomuser.me/api/portraits/men/70.jpg"
        },
        amount: "580.00",
        status: "SUCCESS",
        date: "2024-01-25T09:20:00Z",
        type: "payment", 
        description: "Living room painting"
      },
      {
        id: "txn_005",
        user: {
          name: "Lisa Anderson",
          profile_photo_url: "https://randomuser.me/api/portraits/women/68.jpg"
        },
        amount: "195.75",
        status: "FAILED",
        date: "2024-01-24T13:10:00Z",
        type: "payment",
        description: "Garden landscaping"
      }
    ],
    total_count: 5,
    has_more: true
  },
  
  // Monthly summary
  monthly_summary: {
    total_earnings: "5800",
    total_transactions: 28,
    successful_transactions: 25,
    failed_transactions: 2,
    pending_transactions: 1,
    average_earnings_per_transaction: "207.14",
    best_day: "2024-01-14",
    best_day_earnings: "225.00"
  },
  
  // Commission details
  commission_details: {
    commission_rate: "10%",
    total_commission: "580.00",
    commission_paid: "280.00",
    commission_pending: "300.00",
    next_payout_date: "2024-02-01"
  }
};

// MANAGE SERVICES DUMMY DATA
export const manageServicesData = {
  // Services array structure
  services: [
    {
      category_id: 1,
      category_name: "Cleaning",
      category_logo: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1470&auto=format&fit=crop",
      subcategories: [
        {
          sub_category_id: 101,
          subcategory_name: "House Cleaning",
          image: "https://images.unsplash.com/photo-1627905646269-7f034dcc5738?q=80&w=1470&auto=format&fit=crop"
        },
        {
          sub_category_id: 102,
          subcategory_name: "Office Cleaning",
          image: "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?q=80&w=1470&auto=format&fit=crop"
        },
        {
          sub_category_id: 103,
          subcategory_name: "Deep Cleaning",
          image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?q=80&w=1470&auto=format&fit=crop"
        },
        {
          sub_category_id: 104,
          subcategory_name: "Carpet Cleaning",
          image: "https://images.unsplash.com/photo-1581092796779-f5c2e8e754c7?q=80&w=1470&auto=format&fit=crop"
        }
      ]
    },
    {
      category_id: 2,
      category_name: "Plumbing",
      category_logo: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=1470&auto=format&fit=crop",
      subcategories: [
        {
          sub_category_id: 201,
          subcategory_name: "Pipe Repair",
          image: "https://images.unsplash.com/photo-1627905646269-7f034dcc5738?q=80&w=1470&auto=format&fit=crop"
        },
        {
          sub_category_id: 202,
          subcategory_name: "Drain Cleaning",
          image: "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?q=80&w=1470&auto=format&fit=crop"
        },
        {
          sub_category_id: 203,
          subcategory_name: "Water Heater Installation",
          image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?q=80&w=1470&auto=format&fit=crop"
        },
        {
          sub_category_id: 204,
          subcategory_name: "Bathroom Plumbing",
          image: "https://images.unsplash.com/photo-1581092796779-f5c2e8e754c7?q=80&w=1470&auto=format&fit=crop"
        }
      ]
    },
    {
      category_id: 3,
      category_name: "Electrical",
      category_logo: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1470&auto=format&fit=crop",
      subcategories: [
        {
          sub_category_id: 301,
          subcategory_name: "Wiring Installation",
          image: "https://images.unsplash.com/photo-1627905646269-7f034dcc5738?q=80&w=1470&auto=format&fit=crop"
        },
        {
          sub_category_id: 302,
          subcategory_name: "Panel Upgrade",
          image: "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?q=80&w=1470&auto=format&fit=crop"
        },
        {
          sub_category_id: 303,
          subcategory_name: "Lighting Installation",
          image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?q=80&w=1470&auto=format&fit=crop"
        },
        {
          sub_category_id: 304,
          subcategory_name: "Electrical Repair",
          image: "https://images.unsplash.com/photo-1581092796779-f5c2e8e754c7?q=80&w=1470&auto=format&fit=crop"
        }
      ]
    },
    {
      category_id: 4,
      category_name: "Painting",
      category_logo: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1470&auto=format&fit=crop",
      subcategories: [
        {
          sub_category_id: 401,
          subcategory_name: "Interior Painting",
          image: "https://images.unsplash.com/photo-1627905646269-7f034dcc5738?q=80&w=1470&auto=format&fit=crop"
        },
        {
          sub_category_id: 402,
          subcategory_name: "Exterior Painting",
          image: "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?q=80&w=1470&auto=format&fit=crop"
        },
        {
          sub_category_id: 403,
          subcategory_name: "Wall Painting",
          image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?q=80&w=1470&auto=format&fit=crop"
        },
        {
          sub_category_id: 404,
          subcategory_name: "Furniture Painting",
          image: "https://images.unsplash.com/photo-1581092796779-f5c2e8e754c7?q=80&w=1470&auto=format&fit=crop"
        }
      ]
    },
    {
      category_id: 5,
      category_name: "Carpentry",
      category_logo: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1470&auto=format&fit=crop",
      subcategories: [
        {
          sub_category_id: 501,
          subcategory_name: "Furniture Assembly",
          image: "https://images.unsplash.com/photo-1627905646269-7f034dcc5738?q=80&w=1470&auto=format&fit=crop"
        },
        {
          sub_category_id: 502,
          subcategory_name: "Cabinet Installation",
          image: "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?q=80&w=1470&auto=format&fit=crop"
        },
        {
          sub_category_id: 503,
          subcategory_name: "Wood Repair",
          image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?q=80&w=1470&auto=format&fit=crop"
        },
        {
          sub_category_id: 504,
          subcategory_name: "Custom Woodwork",
          image: "https://images.unsplash.com/photo-1581092796779-f5c2e8e754c7?q=80&w=1470&auto=format&fit=crop"
        }
      ]
    },
    {
      category_id: 6,
      category_name: "Gardening",
      category_logo: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1470&auto=format&fit=crop",
      subcategories: [
        {
          sub_category_id: 601,
          subcategory_name: "Lawn Mowing",
          image: "https://images.unsplash.com/photo-1627905646269-7f034dcc5738?q=80&w=1470&auto=format&fit=crop"
        },
        {
          sub_category_id: 602,
          subcategory_name: "Landscaping",
          image: "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?q=80&w=1470&auto=format&fit=crop"
        },
        {
          sub_category_id: 603,
          subcategory_name: "Tree Trimming",
          image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?q=80&w=1470&auto=format&fit=crop"
        },
        {
          sub_category_id: 604,
          subcategory_name: "Garden Design",
          image: "https://images.unsplash.com/photo-1581092796779-f5c2e8e754c7?q=80&w=1470&auto=format&fit=crop"
        }
      ]
    }
  ],
  
  // Profile data for manage services
  profile: {
    has_purchased: true,
    user: {
      service_provider_type: "professional" // or "individual"
    }
  }
};