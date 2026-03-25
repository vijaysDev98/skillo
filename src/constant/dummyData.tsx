import { IMAGES } from "../assets";

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
    url:IMAGES.furnitureAssemblyImg
  },
  {
    id: 1, type: "photo",
    url:IMAGES.furnitureAssemblyImg
  }
  ],
};