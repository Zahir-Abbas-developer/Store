type ResultFilterType = {
  id: string;
  labelName: string;
  placeholder: string;
  optionsArray: { value: string; label: string }[];
};

export const myResultsFilter: ResultFilterType[] = [
  // {
  //   id: "01",
  //   labelName: "Course Type",
  //   placeholder: "Course Type",
  //   optionsArray: [
  //     {
  //       value: "Optional",
  //       label: "Optional",
  //     },
  //     {
  //       value: "Mandatory",
  //       label: "Mandatory",
  //     },
  //     {
  //       value: "Most Popular",
  //       label: "Most Popular",
  //     },
  //   ],
  // },
  {
    id: "01",
    labelName: "Category",
    placeholder: "Category",
    optionsArray: [
      {
        value: "",
        label: "Everyone",
      },
      {
        value: "All Carer Types",
        label: "All Carer Types",
      },
    ],
  },
];
