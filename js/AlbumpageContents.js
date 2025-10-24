export let PageAContents = [
  {
    id: "1",
    title: "Wanbang Life",
    date: "November 25, 2025",
    images: [
      "photo1.jpg",
      "photo1.jpg",
      "photo1.jpg",
      "photo1.jpg",
      "photo1.jpg",
      "photo5.jpg",
      "photo1.jpg",
      "photo1.jpg",
      "photo1.jpg",
      "photo1.jpg",
    ],
  },
  {
    id: "2",
    title: "Wanbang Life",
    date: "November 25, 2025",
    images: [
      "photo5.jpg",
      "photo5.jpg",
      "photo5.jpg",
      "photo5.jpg",
      "photo5.jpg",
      "photo5.jpg",
      "photo5.jpg",
      "photo5.jpg",
      "photo5.jpg",
      "photo5.jpg",
      "photo5.jpg",
      "photo5.jpg",
    ],
  },
  {
    id: "3",
    title: "Wanbang Li",
    date: "November 25, 2025",
    images: [
      "photo11.jpg",
      "photo11.jpg",
      "photo11.jpg",
      "photo11.jpg",
      "photo11.jpg",
      "photo11.jpg",
      "photo11.jpg",
      "photo11.jpg",
      "photo11.jpg",
      "photo11.jpg",
    ],
  },
  {
    id: "4",
    title: "Wanbang Life",
    date: "November 25, 2025",
    images: [],
  },
  {
    id: "5",
    title: "Wanbang Life",
    date: "November 25, 2025",
    images: [],
  },
  {
    id: "6",
    title: "Wanbang Life",
    date: "November 25, 2025",
    images: [],
  },
  {
    id: "7",
    title: "Wanbang Life",
    date: "November 25, 2025",
    images: [],
  },
  {
    id: "8",
    title: "Wanbang Life",
    date: "November 25, 2025",
    images: [],
  },
  {
    id: "9",
    title: "Wanbang Life",
    date: "November 25, 2025",
    images: [],
  },
  {
    id: "10",
    title: "Wanbang Life",
    date: "November 25, 2025",
    images: [],
  },
  {
    id: "11",
    title: "Wanbang Life",
    date: "November 25, 2025",
    images: [],
  },
  {
    id: "12",
    title: "Wanbang Life",
    date: "November 25, 2025",
    images: [],
  },
  {
    id: "13",
    title: "Wanbang Life",
    date: "November 25, 2025",
    images: [],
  },
  {
    id: "14",
    title: "Wanbang Life",
    date: "November 25, 2025",
    images: [],
  },
  {
    id: "15",
    title: "Wanbang Life",
    date: "November 25, 2025",
    images: [],
  },
];
export function findPageAContent(id) {
  for (let i = 0; i < PageAContents.length; i++) {
    if (PageAContents[i].id === id) {
      return PageAContents[i];
    }
  }
}
