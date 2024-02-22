export const links = [
  {
    url: "/projects",
    title: "Projects",
    hoverColor: "purple-600",
    textColor: "white",
    redirectNewTab: false,
  },
  {
    url: "https://blogs.utkarshrajput.com",
    title: "Blogs",
    hoverColor: "red-500",
    textColor: "white",
    redirectNewTab: true,
  },
  {
    url: "/education",
    title: "Education",
    hoverColor: "green-500",
    textColor: "white",
    redirectNewTab: false,
  },
  // {
  //   url: "/experience",
  //   title: "Experience",
  //   hoverColor: "yellow-600",
  //   textColor: "white",
  //   redirectNewTab: true,
  // },
  // {
  //   url: "/contact",
  //   title: "Contact",
  //   hoverColor: "emerald-700",
  //   textColor: "white",
  //   redirectNewTab: false,
  // },
  // {
  //   url: "/games",
  //   title: "Games",
  //   hoverColor: "slate-600",
  //   textColor: "white",
  //   redirectNewTab: false,
  // },
] as const;

export const topVariants = {
  closed: {
    rotate: 0,
  },
  opened: {
    rotate: 45,
    backgroundColor: "rgb(255,255,255)",
  },
} as const;

export const centerVariants = {
  closed: {
    opacity: 1,
  },
  opened: {
    opacity: 0,
  },
} as const;

export const bottomVariants = {
  closed: {
    rotate: 0,
  },
  opened: {
    rotate: -45,
    backgroundColor: "rgb(255,255,255)",
  },
} as const;

export const listVariants = {
  closed: {
    x: "100vw",
  },
  opened: {
    x: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
} as const;

export const listItemVariants = {
  closed: {
    x: -10,
    opacity: 0,
  },
  opened: {
    x: 0,
    opacity: 1,
  },
} as const;
