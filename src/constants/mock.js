export const MOCK_PEOPLE = [
  {
    id: "1",
    firstname: "John",
    lastname: "Doe",
    birthdate: "1978-02-10",
    latestContact: "2021-12-07",
    address: "Street 1",
    notes: "It's a dude, non-descript!",
    jobs: [
      {
        company: "Big pharma",
        title: "Frontend Developer",
        startdate: "2021-06-17",
        enddate: "ongoing",
      },
      {
        company: "Cool consulting firm",
        title: "Consultant",
        startdate: "2010-05-05",
        enddate: "ongoing",
      },
    ],
    gifts: {
      given: [
        {
          name: "Airpods Pro",
          price: 2800,
          when: "2019-05-24",
        },
      ],
      received: [
        {
          name: "Airpods Bro",
          price: 1800,
          when: "2020-05-24",
        },
      ],
    },
  },
];
