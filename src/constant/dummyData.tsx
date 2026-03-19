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
      status: "Requested",

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
      status: "Requested",

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
      status: "Offered",

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
      status: "Accepted",

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